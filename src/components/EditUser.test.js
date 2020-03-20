import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent, act } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import EditUser from './EditUser'
jest.mock('../services/user')

afterEach(cleanup)

describe('<EditUser />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Router>
        <EditUser user={{ name: 'name', username: 'username', email: 'email' }} setUser={''} setShowEdit={''} setMessage={''} />
      </Router>
    )
  })

  test('renders heading', () => {
    expect(component.container).toHaveTextContent(
      'Omat tiedot',
    )
  })

  test('renders inputs for name and username', () => {
    const inputs = component.container.querySelectorAll('input')
    expect(inputs.length).toBe(3)
  })

  test('renders submit button', async () => {
    const button = component.container.querySelector('.edit-button')
    expect(button).toHaveTextContent(
      'Tallenna',
    )
  })

  test('renders cancel button', async () => {
    const button = component.container.querySelector('.cancel-button')
    expect(button).toHaveTextContent(
      'Peruuta',
    )
  })

  test('shows error message if name is less than 3 characters', () => {
    const input = component.container.querySelector('.name')
    act(() => { fireEvent.change(input, { target: { value: 'n' } }) })

    const button = component.container.querySelector('.edit-button')
    act(() => { fireEvent.click(button) })
  
    const div = component.container.querySelector('.edit-user-form')
    expect(div).toHaveTextContent('Nimessä pitää olla vähintään 3 kirjainta')
  })

  test('does not show error message if name is at least 3 characters', () => {
    const input = component.container.querySelector('.name')
    act(() => { fireEvent.change(input, { target: { value: 'nimi' } }) })

    const button = component.container.querySelector('.edit-button')
    act(() => { fireEvent.click(button) })
  
    const div = component.container.querySelector('.edit-user-form')
    expect(div).not.toHaveTextContent('Nimessä pitää olla vähintään 3 kirjainta')
  })

  test('shows error message if username is less than 3 characters', () => {
    const input = component.container.querySelector('.username')
    act(() => { fireEvent.change(input, { target: { value: 'k' } }) })

    const button = component.container.querySelector('.edit-button')
    act(() => { fireEvent.click(button) })

    const div = component.container.querySelector('.edit-user-form')
    expect(div).toHaveTextContent('Käyttäjätunnuksessa pitää olla vähintään 3 kirjainta')
  })

  test('does not show error message if username is at least 3 characters', () => {
    const input = component.container.querySelector('.username')
    act(() => { fireEvent.change(input, { target: { value: 'käyttäjätunnus' } }) })

    const button = component.container.querySelector('.edit-button')
    act(() => { fireEvent.click(button) })

    const div = component.container.querySelector('.edit-user-form')
    expect(div).not.toHaveTextContent('Käyttäjätunnuksessa pitää olla vähintään 3 kirjainta')
  })

})