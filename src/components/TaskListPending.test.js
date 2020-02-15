import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, waitForElement } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import TaskListPending from './TaskListPending'


jest.mock('../services/task')

afterEach(cleanup)

describe('<TaskListPending />', () => {
  let component
  let user = 'not null'

  beforeEach(() => {
    component = render(
      <Router>
        <TaskListPending user={user} />
      </Router>,
    )
  })

  test('renders all tasks it gets from backend', async () => {
    await waitForElement(
      () => component.container.querySelector('.task-list-item'),
    )

    const tasks = component.container.querySelectorAll('.task-list-item')
    expect(tasks.length).toBe(1)

    expect(component.container).toHaveTextContent(
      'pending',
    )
    expect(component.container).toHaveTextContent(
      'pendingkategory',
    )
    expect(component.container).toHaveTextContent(
      'ikäryhmä pending',
    )
  
  })

  test('renders delete-button', () => {
    const button = component.container.querySelector('.deleteButton')
    expect(button).toHaveTextContent('Poista')
  })

  test('renders accept-button', () => {
    const button = component.container.querySelector('.acceptButton')
    expect(button).toHaveTextContent('Hyväksy')
  })

})
