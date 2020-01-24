import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import SignUp from './SignUp'

afterEach(cleanup)

describe('<SignUp />', () => {

  let component

  beforeEach(() => {
    component = render(
      <SignUp />
    )
  })

  test('renders heading', () => {
    expect(component.container).toHaveTextContent(
      'Rekisteröidy'
    )
  })
  
  test('renders inputs for name, username, password and key', () => {
    const inputs = component.container.querySelectorAll('input')
    expect(inputs.length).toBe(4)
  })
  
  test('renders submit button', () => {
    const button = component.container.querySelector('.signup-button')
    expect(button).toHaveTextContent(
      'Rekisteröidy'
    )
  })
  
})