import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, waitForElement } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import TaskList from './TaskList'


jest.mock('../services/task')

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

  test('renders delete-button', () => {
    const button = component.container.querySelector('.delete-button')
    expect(button).toHaveTextContent('Poista')
  })

})
