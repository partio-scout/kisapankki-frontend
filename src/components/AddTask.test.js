import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import AddTask from './AddTask'

jest.mock('../services/category')
jest.mock('../services/rule')
jest.mock('../services/series')
jest.mock('../services/language')

afterEach(cleanup)

describe('<AddTask/>', () => {
  let component

  beforeEach(() => {
    component = render(
      <AddTask />,
    )
  })

  test('renders heading', () => {
    expect(component.container).toHaveTextContent(
      'Lisää tehtävä',
    )
  })

  test('renders inputs for task', () => {
    const inputs = component.container.querySelectorAll('input')
    expect(inputs.length).toBe(3)
  })

  test('renders textareas for task', () => {
    const areas = component.container.querySelectorAll('textarea')
    expect(areas.length).toBe(3)
  })

  test('renders select for task', () => {
    const selects = component.container.querySelectorAll('select')
    expect(selects.length).toBe(4)
  })

  test('renders button for task', () => {
    const button = component.container.querySelector('.add-task-button')
    expect(button).toHaveTextContent('Lisää tehtävä')
  })
})
