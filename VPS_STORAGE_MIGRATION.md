# VPS storage migration — 2026-10-03

Current operational instructions are in the vps-administration workspace README and the [maintained remote DEPLOY.md](https://github.com/gazooo/supreme-carnival/blob/claude/new-session-m8e15a/DEPLOY.md). Focused source/path maintenance was normally pushed as `55878f6`; website payload was not republished by this migration.

Source/Git: `/opt/lohrer.dev/repository`. Active server: `/opt/lohrer.dev/site-server.mjs`. Private configuration: `/home/deploy/project-data/lohrer-dev/config/app.env` (root:root,0600), backup artifacts under adjacent `backups`. Public `/var/www/lohrer.dev/dist` remains because the systemd service retains DynamicUser/ProtectHome. Caddy: `/opt/infrastructure`, container `infrastructure-caddy-1`, external `infrastructure_proxy` subnet172.18.0.0/16 gateway172.18.0.1. Main domain lohrer-digital.de and old-domain HTTPS redirects remain functional.

Both maintained remote publishers use dated private backups. During the migration, the prior local dirty source and documentation were deliberately preserved and not auto-synchronized, committed or deployed.

The Windows checkout was subsequently reconciled on 2026-10-03: both remote migration commits through `55878f6` were fast-forwarded locally, and the existing onepager changes and portrait files were restored. [README.md](README.md) and [DEPLOY.md](DEPLOY.md) now combine the onepager documentation with the current VPS paths. The website changes remain uncommitted; this reconciliation did not push or deploy them. Never expose mail credentials or trigger real test email without a direct instruction.
