import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SignUp from './SignUp'
jest.mock('../services/signup')

afterEach(cleanup)

describe('<SignUp />', () => {
  let component

  beforeEach(() => {
    component = render(
      <SignUp />,
    )
  })

  test('renders heading', () => {
    expect(component.container).toHaveTextContent(
      'Rekisteröidy',
    )
  })

  test('renders inputs for name, username, password and key', () => {
    const inputs = component.container.querySelectorAll('input')
    expect(inputs.length).toBe(4)
  })

  test('renders submit button', async () => {
    const button = component.container.querySelector('.signup-form')
    expect(button).toHaveTextContent(
      'Rekisteröidy',
    )
  })

  test('shows error message if name is less than 3 characters', () => {
    const button = component.container.querySelector('.signup-button')
    fireEvent.click(button)
  
    const div = component.container.querySelector('.signup-form')
    expect(div).toHaveTextContent('Nimessä pitää olla vähintään 3 kirjainta')
  })

  test('does not show error message if name is at least 3 characters', () => {
    const input = component.container.querySelector('.name')
    fireEvent.change(input, { target: { value: 'nimi' } })

    const button = component.container.querySelector('.signup-button')
    fireEvent.click(button)
  
    const div = component.container.querySelector('.signup-form')
    expect(div).not.toHaveTextContent('Nimessä pitää olla vähintään 3 kirjainta')
  })

  test('shows error message if username is less than 3 characters', () => {
    const button = component.container.querySelector('.signup-button')
    fireEvent.click(button)
  
    const div = component.container.querySelector('.signup-form')
    expect(div).toHaveTextContent('Käyttäjätunnuksessa pitää olla vähintään 3 kirjainta')
  })

  test('does not show error message if username is at least 3 characters', () => {
    const input = component.container.querySelector('.username')
    fireEvent.change(input, { target: { value: 'käyttäjätunnus' } })

    const button = component.container.querySelector('.signup-button')
    fireEvent.click(button)
  
    const div = component.container.querySelector('.signup-form')
    expect(div).not.toHaveTextContent('Käyttäjätunnuksessa pitää olla vähintään 3 kirjainta')
  })

  test('shows error message if password is less than 3 characters', () => {
    const button = component.container.querySelector('.signup-button')
    fireEvent.click(button)
  
    const div = component.container.querySelector('.signup-form')
    expect(div).toHaveTextContent('Salasanassa pitää olla vähintään 3 kirjainta')
  })

  test('does not show error message if password is at least 3 characters', () => {
    const input = component.container.querySelector('.password')
    fireEvent.change(input, { target: { value: 'salasana' } })

    const button = component.container.querySelector('.signup-button')
    fireEvent.click(button)
  
    const div = component.container.querySelector('.signup-form')
    expect(div).not.toHaveTextContent('Salasanassa pitää olla vähintään 3 kirjainta')
  })

})
