import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the one-pager with the wordmark', () => {
    window.history.pushState(null, '', '/')
    render(<App />)
    expect(screen.getAllByText(/Malte Lohrer/i).length).toBeGreaterThan(0)
  })
})
