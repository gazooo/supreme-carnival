<#
.SYNOPSIS
  Baut die Website und lädt sie auf den VPS — reines PowerShell, kein bash.

.DESCRIPTION
  Nutzt nur Bordmittel von Windows 10/11: tar.exe, scp.exe, ssh.exe.
  Bewusst kein Binär-Piping (PowerShell verfälscht Binärströme in der
  Pipeline) — stattdessen: Tarball anlegen, per scp übertragen, auf dem
  Server entpacken. Der Wechsel bleibt atomar (dist.new -> dist), die
  vorherige Version bleibt als dist.prev liegen.

.EXAMPLE
  .\deploy\publish.ps1
  .\deploy\publish.ps1 -SshTarget deploy@178.104.124.207
#>
[CmdletBinding()]
param(
  [string]$SshTarget = 'deploy@178.104.124.207',
  [string]$WebRoot   = '/var/www/lohrer.dev'
)

$ErrorActionPreference = 'Stop'

# Immer aus dem Repo-Root arbeiten, egal von wo aufgerufen
$repoRoot = Split-Path -Parent $PSScriptRoot
Push-Location $repoRoot

try {
  Write-Host '== Build ==' -ForegroundColor Cyan
  & npm run build
  if ($LASTEXITCODE -ne 0) { throw 'npm run build ist fehlgeschlagen.' }
  if (-not (Test-Path 'dist/index.html')) { throw 'dist/index.html fehlt — Build unvollständig.' }

  $tarball = Join-Path $env:TEMP 'lohrer-dist.tgz'
  Write-Host '== Paket schnueren ==' -ForegroundColor Cyan
  & tar czf $tarball -C dist .
  if ($LASTEXITCODE -ne 0) { throw 'tar ist fehlgeschlagen.' }
  $sizeKb = [math]::Round((Get-Item $tarball).Length / 1KB)
  Write-Host "   $tarball ($sizeKb kB)"

  Write-Host "== Upload nach ${SshTarget}:${WebRoot} ==" -ForegroundColor Cyan
  & scp $tarball "${SshTarget}:/tmp/lohrer-dist.tgz"
  if ($LASTEXITCODE -ne 0) { throw 'scp ist fehlgeschlagen.' }

  # Atomarer Wechsel auf dem Server. set -e, damit ein Teilfehler nicht
  # ein halb ausgetauschtes Verzeichnis hinterlaesst.
  #
  # WICHTIG: literaler Here-String (@'...'@) — in einem expandierenden
  # (@"..."@) wuerde PowerShell $(...) und $var im Shell-Code selbst
  # auswerten. Die Platzhalter werden deshalb per Replace ersetzt.
  $remoteTemplate = @'
set -e
rm -rf '__WEBROOT__/dist.new'
mkdir -p '__WEBROOT__/dist.new'
tar xzf /tmp/lohrer-dist.tgz -C '__WEBROOT__/dist.new'
rm -f /tmp/lohrer-dist.tgz
rm -rf '__WEBROOT__/dist.prev'
if [ -d '__WEBROOT__/dist' ]; then mv '__WEBROOT__/dist' '__WEBROOT__/dist.prev'; fi
mv '__WEBROOT__/dist.new' '__WEBROOT__/dist'
printf '   entpackt: '
find '__WEBROOT__/dist' -type f | wc -l
'@
  # der Server erwartet LF, nicht CRLF
  $remote = $remoteTemplate.Replace('__WEBROOT__', $WebRoot).Replace("`r`n", "`n")
  & ssh $SshTarget $remote
  if ($LASTEXITCODE -ne 0) { throw 'Entpacken auf dem Server ist fehlgeschlagen.' }

  Remove-Item $tarball -Force -ErrorAction SilentlyContinue

  Write-Host '== Pruefung ==' -ForegroundColor Cyan
  foreach ($path in '/', '/impressum', '/datenschutz') {
    $code = & curl.exe -s -o NUL -w '%{http_code}' "https://lohrer-digital.de$path"
    $color = if ($code -eq '200') { 'Green' } else { 'Yellow' }
    Write-Host ("   {0,-14} {1}" -f $path, $code) -ForegroundColor $color
  }

  Write-Host ''
  Write-Host 'Fertig: https://lohrer-digital.de' -ForegroundColor Green
}
finally {
  Pop-Location
}
