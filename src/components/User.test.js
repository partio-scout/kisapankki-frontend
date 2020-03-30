import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import User from './User'
jest.mock('../services/user')

afterEach(cleanup)

describe('<User />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Router>
        <User user={{ name: 'name', username: 'username', email: 'email', allowNotification: true }} setUser={''} />
      </Router>
    )
  })

  test('renders heading', () => {
    expect(component.container).toHaveTextContent(
      'Omat tiedot',
    )
  })

  test('renders name', () => {
    expect(component.container).toHaveTextContent(
      'Nimi',
    )
  })

  test('renders username', () => {
    expect(component.container).toHaveTextContent(
      'Käyttäjätunnus',
    )
  })

  test('renders email', () => {
    expect(component.container).toHaveTextContent(
      'Sähköpostiosoite',
    )
  })

  test('renders notification', () => {
    expect(component.container).toHaveTextContent(
      'Ilmoitukset',
    )
  })

  test('renders edit button', async () => {
    const button = component.container.querySelector('.edit-user-button')
    expect(button).toHaveTextContent(
      'Muokkaa',
    )
  })

  test('renders change password button', async () => {
    const button = component.container.querySelector('.change-password-button')
    expect(button).toHaveTextContent(
      'Vaihda salasana',
    )
  })

})