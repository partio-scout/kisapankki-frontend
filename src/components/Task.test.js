import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Task from './Task'

jest.mock('../services/task')
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}))

afterEach(cleanup)

describe('<Task />', () => {
  let component
  let match = {
    params: {
      id: 1
    }
  }
  let user = 'not null'

  beforeEach(() => {
    component = render(<Task match={match} user={user} />)
  })

  test('renders task name', () => {
    expect(component.container).toHaveTextContent(
      'tehtävä1',
    )
  })

  test('renders task assignment', () => {
    expect(component.container).toHaveTextContent(
      'testitehtävänanto',
    )
  })

  test('renders task instructions', () => {
    expect(component.container).toHaveTextContent(
      'testiohjeet',
    )
  })

  test('renders task scale', () => {
    expect(component.container).toHaveTextContent(
      'testiarvosteluperusteet',
    )
  })

  test('renders task creator name', () => {
    expect(component.container).toHaveTextContent(
      'testiluoja',
    )
  })

  test('renders task creator email', () => {
    expect(component.container).toHaveTextContent(
      'testiposti',
    )
  })

  test('renders task age group', () => {
    expect(component.container).toHaveTextContent(
      'sarja1',
    )
  })

  test('renders task category', () => {
    expect(component.container).toHaveTextContent(
      'kategoria1',
    )
  })

  test('renders task rules', () => {
    expect(component.container).toHaveTextContent(
      'säännöt1',
    )
  })

  test('renders correct views', () => {
    expect(component.container).toHaveTextContent('Katselukertoja: 5')
  })

  test('renders delete button', () => {
    const button = component.container.querySelector('.delete-button')

    expect(component.container).toContainElement(button)
  })

  test('after clicking modify button <ModifyTask /> is rendered', () => {
    const button = component.container.querySelector('.modify-view-button')

    fireEvent.click(button)

    const form = component.container.querySelector('.modify-form')
    expect(component.container).toContainElement(form)
  })

  test('<ModifyTask /> is not rendered after clicking return', () => {
    const button = component.container.querySelector('.modify-view-button')

    fireEvent.click(button)


    const form = component.container.querySelector('.modify-form')
    expect(component.container).toContainElement(form)

    const returnButton = component.container.querySelector('.return-button')

    fireEvent.click(returnButton)

    expect(component.container).not.toContainElement(form)
  })

})