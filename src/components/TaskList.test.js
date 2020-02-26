import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, waitForElement, fireEvent, wait } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import TaskList from './TaskList'

jest.mock('../services/task')
jest.mock('../services/series')
jest.mock('../services/category')
jest.mock('../services/rule')

afterEach(cleanup)

describe('<TaskList />', () => {
  let component
  let user = 'not null'

  beforeEach(() => {
    component = render(
      <Router>
        <TaskList user={user} />
      </Router>,
    )
  })

  test('renders all tasks it gets from backend', async () => {
    await waitForElement(
      () => component.container.querySelector('.task-list-item'),
    )

    const tasks = component.container.querySelectorAll('.task-list-item')
    expect(tasks.length).toBe(2)

    expect(component.container).toHaveTextContent(
      'testitehtävä',
    )
    expect(component.container).toHaveTextContent(
      'toinen testitehtävä',
    )
    expect(component.container).toHaveTextContent(
      'toinen-ikäryhmä',
    )
    expect(component.container).toHaveTextContent(
      'testikategoria',
    )
  })

  test('renders all filtering dropdowns', async () => {
    const dropdowns = component.container.querySelectorAll('.filter')
    expect(dropdowns.length).toBe(3)
  })

  // test('renders correct tasks after selecting filter by series', async () => {
  //   await waitForElement(
  //     () => component.container.querySelector('.task-list-item')
  //   )

  //   let tasks = component.container.querySelectorAll('.task-list-item')
  //   let select = component.container.querySelector('.filter-series')

  //   fireEvent.change(select, { target: { value: '1' } })

  //   await wait(() => expect(tasks.length).toBe(1))

  //   expect(component.container).toHaveTextContent(
  //     'testi-ikäryhmä',
  //   )
  //   expect(component.container).not.toHaveTextContent(
  //     'toinen-ikäryhmä',
  //   )
  // })

  // test('renders correct tasks after selecting filter by category', async () => {
  //   await waitForElement(
  //     () => component.container.querySelector('.task-list-item')
  //   )

  //   let tasks = component.container.querySelectorAll('.task-list-item')
  //   let select = component.container.querySelector('filter-category')

  //   fireEvent.change(select, { target: { value: '1' } })

  //   await wait(() => expect(tasks.length).toBe(1))

  //   expect(component.container).toHaveTextContent(
  //     'testikategoria',
  //   )
  //   expect(component.container).not.toHaveTextContent(
  //     'testikategorianro2',
  //   )
  // })

  // test('renders correct tasks after selecting filter by rules', async () => {
  //   await waitForElement(
  //     () => component.container.querySelector('.task-list-item')
  //   )

  //   let tasks = component.container.querySelectorAll('.task-list-item')
  //   let select = component.container.querySelector('.filter-rules')

  //   fireEvent.change(select, { target: { value: '1' } })

  //   await wait(() => expect(tasks.length).toBe(1))

  //   expect(component.container).toHaveTextContent(
  //     'testitehtävä',
  //   )
  //   expect(component.container).not.toHaveTextContent(
  //     'toinen testitehtävä',
  //   )
  // })

  // test('renders correct tasks after selecting filter by series, category and rules', async () => {
  //   await waitForElement(
  //     () => component.container.querySelector('.task-list-item')
  //   )

  //   let tasks = component.container.querySelectorAll('.task-list-item')
  //   let selectSeries = component.container.querySelector('.filter-series')
  //   let selectCategory = component.container.querySelector('.filter-category')
  //   let selectRules = component.container.querySelector('.filter-rules')

  //   fireEvent.change(selectSeries, { target: { value: '1' } })
  //   fireEvent.change(selectCategory, { target: { value: '1' } })
  //   fireEvent.change(selectRules, { target: { value: '1' } })

  //   await wait(() => expect(tasks.length).toBe(1))

  //   expect(component.container).toHaveTextContent(
  //     'testitehtävä',
  //   )
  //   expect(component.container).not.toHaveTextContent(
  //     'toinen testitehtävä',
  //   )
  // })

  test('renders delete-button', () => {
    const button = component.container.querySelector('.delete-button')
    expect(button).toHaveTextContent('Poista')
  })

})
