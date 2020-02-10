import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, waitForElement } from '@testing-library/react'
import TaskList from './TaskList'


jest.mock('../services/task')

afterEach(cleanup)

describe('<TaskList />', () => {
  test('renders all tasks it gets from backend', async () => {
    const component = render(
      <TaskList />,
    )
    component.rerender(<TaskList />)
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
    
    // test('after clicking modify button <ModifyTask /> is rendered', () => {
    //   const button = component.container.querySelector('.modify-view-button')

    //   fireEvent.click(button)

    //   const form = component.container.querySelector('.modify-form')
    //   expect(component.container).toContainElement(form)
    // })


  })
})
