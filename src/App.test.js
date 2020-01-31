import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import App from './App'

afterEach(cleanup)

describe('<App />', () => {
  let component

  beforeEach(() => {
    component = render(
      <App />,
    )
  })

  test('renders login button in header', () => {
    const button = component.container.querySelector('.login-button-header')
    expect(button).toHaveTextContent(
      'Kirjaudu',
    )
  })

  test('renders signup button in header', () => {
    const button = component.container.querySelector('.signup-button-header')
    expect(button).toHaveTextContent(
      'Rekisteröidy',
    )
  })

  test('does not render <Login /> at start', () => {
    const form = component.container.querySelector('.login-form')
    expect(component.container).not.toContainElement(form)
  })

  test('does not render <SignUp /> at start', () => {
    const form = component.container.querySelector('.signup-form')
    expect(component.container).not.toContainElement(form)
  })

  test('after clicking login button <Login /> is rendered', () => {
    const button = component.container.querySelector('.login-button-header')
    fireEvent.click(button)
    const form = component.container.querySelector('.login-form')
    expect(component.container).toContainElement(form)
  })

  test('after clicking signup button <SignUp /> rendered', () => {
    const button = component.container.querySelector('.signup-button-header')
    fireEvent.click(button)
    const form = component.container.querySelector('.signup-form')
    expect(component.container).toContainElement(form)
  })

})
