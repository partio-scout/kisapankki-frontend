import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import AgeGroup from './AgeGroup'

afterEach(cleanup)

describe('<AgeGroup />', () => {
  let component

  beforeEach(() => {
    component = render(
      <AgeGroup />,
    )
  })

  test('renders heading', () => {
    expect(component.container).toHaveTextContent(
      'Lisää ikäryhmä'
    )
  })

  test('renders input for rule', () => {
    const inputs = component.container.querySelectorAll('input')
    expect(inputs.length).toBe(4)
  })

  test('renders submit button', () => {
    const button = component.container.querySelector('.age-group-submit-button')
    expect(button).toHaveTextContent(
      'Lisää ikäryhmä',
    )
  })

})