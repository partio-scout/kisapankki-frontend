import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent, act } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import ChangePassword from './ChangePassword'
jest.mock('../../services/user')

afterEach(cleanup)

describe('<ChangePassword />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Router>
        <ChangePassword setShowChangePassword={''} setMessage={''}  />
      </Router>
    )
  })

  test('renders heading', () => {
    expect(component.container).toHaveTextContent(
      'Vaihda salasana',
    )
  })

  test('renders inputs for old password, new password and new password again', () => {
    const inputs = component.container.querySelectorAll('input')
    expect(inputs.length).toBe(3)
  })

  test('renders submit button', async () => {
    const button = component.container.querySelector('.change-password-button')
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

  test('shows error message if new password is less than 3 characters', () => {
    const input = component.container.querySelector('.new-password')
    act(() => { fireEvent.change(input, { target: { value: 's' } }) })

    const button = component.container.querySelector('.change-password-button')
    act(() => { fireEvent.click(button) })
  
    const div = component.container.querySelector('.change-password-form')
    expect(div).toHaveTextContent('Salasanassa pitää olla vähintään 3 kirjainta')
  })

  test('does not show error message if new password is at least 3 characters', () => {
    const input = component.container.querySelector('.new-password')
    act(() => { fireEvent.change(input, { target: { value: 'salasana' } }) })

    const button = component.container.querySelector('.change-password-button')
    act(() => { fireEvent.click(button) })
  
    const div = component.container.querySelector('.change-password-form')
    expect(div).not.toHaveTextContent('Salasanassa pitää olla vähintään 3 kirjainta')
  })

  test('shows error message if new passwords don`t match', () => {
    const input = component.container.querySelector('.new-password')
    act(() => { fireEvent.change(input, { target: { value: 'sala' } }) })

    const input2 = component.container.querySelector('.new-password-again')
    act(() => { fireEvent.change(input2, { target: { value: 'sana' } }) })

    const button = component.container.querySelector('.change-password-button')
    act(() => { fireEvent.click(button) })
  
    const div = component.container.querySelector('.change-password-form')
    expect(div).toHaveTextContent('Salasanat eivät täsmää')
  })

  test('does not show error message if new passwords match', () => {
    const input = component.container.querySelector('.new-password')
    act(() => { fireEvent.change(input, { target: { value: 'salasana' } }) })

    const input2 = component.container.querySelector('.new-password-again')
    act(() => { fireEvent.change(input2, { target: { value: 'salasana' } }) })

    const button = component.container.querySelector('.change-password-button')
    act(() => { fireEvent.click(button) })
  
    const div = component.container.querySelector('.change-password-form')
    expect(div).not.toHaveTextContent('Salasanat eivät täsmää')
  })

})