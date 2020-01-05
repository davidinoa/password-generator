import React from 'react'
import { axe } from 'jest-axe'
import App from '../App.tsx'
import { render } from '../../test/utils'

test('renders input to display the generated password', () => {
  const { getByLabelText } = render(<App />)
  const input = getByLabelText(/generated password/i)
  expect(input).toBeDefined()
})

test('is accessible', async () => {
  const { container } = render(<App />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
