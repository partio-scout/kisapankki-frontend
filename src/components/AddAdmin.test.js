import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent, act } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import AddAdmin from './AddAdmin'

jest.mock('../services/user')

afterEach(cleanup)

describe('<AddAdmin />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Router>
        <AddAdmin />
      </Router>,
    )
  })

  test('renders heading', () => {
    expect(component.container).toHaveTextContent(
      'Lisää ylläpitäjä',
    )
  })

  test('renders inputs for name, username and password', () => {
    const inputs = component.container.querySelectorAll('input')
    expect(inputs.length).toBe(3)
  })

  test('renders submit button', async () => {
    const button = component.container.querySelector('.signup-form')
    expect(button).toHaveTextContent(
      'Lisää',
    )
  })

  test('shows error message if name is less than 3 characters', () => {
    const button = component.container.querySelector('.signup-button')
    act(() => { fireEvent.click(button) })

    const div = component.container.querySelector('.signup-form')
    expect(div).toHaveTextContent('Nimessä pitää olla vähintään 3 kirjainta')
  })

  test('does not show error message if name is at least 3 characters', () => {
    const input = component.container.querySelector('.name')
    act(() => { fireEvent.change(input, { target: { value: 'nimi' } }) })

    const button = component.container.querySelector('.signup-button')
    act(() => { fireEvent.click(button) })

    const div = component.container.querySelector('.signup-form')
    expect(div).not.toHaveTextContent('Nimessä pitää olla vähintään 3 kirjainta')
  })

  test('shows error message if username is less than 3 characters', () => {
    const button = component.container.querySelector('.signup-button')
    act(() => { fireEvent.click(button) })

    const div = component.container.querySelector('.signup-form')
    expect(div).toHaveTextContent('Käyttäjätunnuksessa pitää olla vähintään 3 kirjainta')
  })

  test('does not show error message if username is at least 3 characters', () => {
    const input = component.container.querySelector('.username')
    act(() => { fireEvent.change(input, { target: { value: 'käyttäjätunnus' } }) })

    const button = component.container.querySelector('.signup-button')
    act(() => { fireEvent.click(button) })

    const div = component.container.querySelector('.signup-form')
    expect(div).not.toHaveTextContent('Käyttäjätunnuksessa pitää olla vähintään 3 kirjainta')
  })

  test('shows error message if password is less than 3 characters', () => {
    const button = component.container.querySelector('.signup-button')
    act(() => { fireEvent.click(button) })

    const div = component.container.querySelector('.signup-form')
    expect(div).toHaveTextContent('Salasanassa pitää olla vähintään 3 kirjainta')
  })

  test('does not show error message if password is at least 3 characters', () => {
    const input = component.container.querySelector('.password')
    act(() => { fireEvent.change(input, { target: { value: 'salasana' } }) })

    const button = component.container.querySelector('.signup-button')
    act(() => { fireEvent.click(button) })

    const div = component.container.querySelector('.signup-form')
    expect(div).not.toHaveTextContent('Salasanassa pitää olla vähintään 3 kirjainta')
  })
})
