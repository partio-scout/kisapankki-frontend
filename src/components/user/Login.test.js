import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import Login from './Login'

afterEach(cleanup)

describe('<Login />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Router>
        <Login />
      </Router>,
    )
  })

  test('renders heading', () => {
    expect(component.container).toHaveTextContent(
      'Kirjaudu sisään',
    )
  })

  test('renders inputs for username and password', () => {
    const inputs = component.container.querySelectorAll('input')
    expect(inputs.length).toBe(2)
  })

  test('renders submit button', () => {
    const button = component.container.querySelector('.login-button')
    expect(button).toHaveTextContent(
      'Kirjaudu',
    )
  })
})
