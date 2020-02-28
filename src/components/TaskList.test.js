import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, waitForElement } from '@testing-library/react'
import { mount } from 'enzyme'
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
      'tehtävä1',
    )
    expect(component.container).toHaveTextContent(
      'tehtävä2',
    )
    expect(component.container).toHaveTextContent(
      'sarja1',
    )
    expect(component.container).toHaveTextContent(
      'kategoria1',
    )
  })

  test('renders all filtering dropdowns', async () => {
    const dropdowns = component.container.querySelectorAll('.filter')
    expect(dropdowns.length).toBe(3)
  })

  test('renders delete-button', () => {
    const button = component.container.querySelector('.delete-button')
    expect(button).toHaveTextContent('Poista')
  })

})

describe('<TaskList />', () => {
  let component
  let user = 'not null'

  beforeEach(() => {
    component = mount(
      <Router>
        <TaskList user={user} />
      </Router>,
    )
  })

  test('renders correct tasks after selecting filter by series', async () => {
    let select = component.find('Select[name="filter-series"]')
    expect(select.text()).toContain('Sarja')

    const selectInput = select.find('input').first()
    selectInput.simulate('change', { target: { value: '1' } })
    selectInput.simulate('keyDown', { keyCode: 13, key: 'Enter' })

    expect(component.find('.task-list-item').length).toEqual(1)
    expect(component.text()).toContain('sarja1')
    expect(component.text()).not.toContain('sarja2')
  })

  test('renders correct tasks after selecting filter by category', async () => {
    let select = component.find('Select[name="filter-category"]')
    expect(select.text()).toContain('Kategoria')

    const selectInput = select.find('input').first()
    selectInput.simulate('change', { target: { value: '2' } })
    selectInput.simulate('keyDown', { keyCode: 40, key: 'ArrowDown' })
    selectInput.simulate('keyDown', { keyCode: 13, key: 'Enter' })

    expect(component.find('.task-list-item').length).toEqual(1)
    expect(component.text()).toContain('kategoria2')
    expect(component.text()).not.toContain('kategoria1')
  })

  test('renders correct tasks after selecting filter by rules', async () => {
    let select = component.find('Select[name="filter-rules"]')
    expect(select.text()).toContain('Säännöt')

    const selectInput = select.find('input').first()
    selectInput.simulate('change', { target: { value: '1' } })
    selectInput.simulate('keyDown', { keyCode: 13, key: 'Enter' })

    expect(component.find('.task-list-item').length).toEqual(1)
    expect(component.text()).toContain('tehtävä1')
    expect(component.text()).not.toContain('tehtävä2')
  })

  test('renders correct tasks after selecting filter by series, category and rules', async () => {
    const selectSeriesInput = component.find('Select[name="filter-series"]').find('input').first()
    selectSeriesInput.simulate('change', { target: { value: '2' } })
    selectSeriesInput.simulate('keyDown', { keyCode: 40, key: 'ArrowDown' })
    selectSeriesInput.simulate('keyDown', { keyCode: 13, key: 'Enter' })

    const selectCategoryInput = component.find('Select[name="filter-category"]').find('input').first()
    selectCategoryInput.simulate('change', { target: { value: '2' } })
    selectCategoryInput.simulate('keyDown', { keyCode: 40, key: 'ArrowDown' })
    selectCategoryInput.simulate('keyDown', { keyCode: 13, key: 'Enter' })

    const selectRulesInput = component.find('Select[name="filter-rules"]').find('input').first()
    selectRulesInput.simulate('change', { target: { value: '2' } })
    selectRulesInput.simulate('keyDown', { keyCode: 40, key: 'ArrowDown' })
    selectRulesInput.simulate('keyDown', { keyCode: 13, key: 'Enter' })

    expect(component.find('.task-list-item').length).toEqual(1)
    expect(component.text()).toContain('tehtävä2')
    expect(component.text()).not.toContain('tehtävä1')
  })
})