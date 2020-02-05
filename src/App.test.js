import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, act, fireEvent } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'

afterEach(cleanup)

describe('<App />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Router>
        <App />
      </Router>
    )
  })

  test('renders login button in header', () => {
    const button = component.container.querySelector('.login-button-header')
    expect(button).toHaveTextContent(
      'Kirjaudu',
    )
  })

  test('does not render <Login /> at start', () => {
    const form = component.container.querySelector('.login-form')
    expect(component.container).not.toContainElement(form)
  })

  test('after clicking login button <Login /> is rendered', () => {
    const button = component.container.querySelector('.login-button-header')

    act(() => {
      fireEvent.click(button)
    })

    const form = component.container.querySelector('.login-form')
    expect(component.container).toContainElement(form)
  })
})
