import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, waitForElement, act, fireEvent } from '@testing-library/react'
import { mount } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom'
import TaskList from './TaskList'

afterEach(cleanup)

const series = [
  {
    id: '1',
    name: 'sarja1',
  },
  {
    id: '2',
    name: 'sarja2',
  },
  {
    id: '3',
    name: 'testi-ikäryhmä pending',
  },
]

const rules = [
  {
    id: '1',
    name: 'säännöt1',
    acceptedCategories: [ { id: '1', name: 'kategoria1' }, { id: '2', name: 'kategoria2' }]
  },
  {
    id: '2',
    name: 'säännöt2',
    acceptedCategories: [ { id: '2', name: 'kategoria2' }, { id: '3', name: 'pendingkategor' }]
  },
  {
    id: '3',
    name: 'testisäännöt true',
    acceptedCategories: [ { id: '1', name: 'kategoria1' }, { id: '3', name: 'pendingkategor' }]
  },
]

const categories = [
  {
    id: '1',
    name: 'kategoria1',
  },
  {
    id: '2',
    name: 'kategoria2',
  },
  {
    id: '3',
    name: 'pendingkategory',
  },
]

const tasks = [
  {
    id: 1,
    name: 'tehtävä1',
    assignmentText: 'testitehtävänanto',
    supervisorInstructions: 'testiohjeet',
    gradingScale: 'testiarvosteluperusteet',
    creatorName: 'testiluoja',
    creatorEmail: 'testiposti',
    series: [{
      id: '1',
      name: 'sarja1',
    }],
    category: {
      id: '1',
      name: 'kategoria1',
    },
    language: {
      id: '1',
      name: 'kieli1',
    },
    rules: {
      id: '1',
      name: 'säännöt1',
    },
    pending: false,
    views: 5,
    ratingsAVG: 3,
    created: '2020-03-23T19:54:27.358+00:00'
  },

  {
    id: 2,
    name: 'tehtävä2',
    assignmentText: 'testitehtävänanto nro 2',
    supervisorInstructions: 'myös toiset testiohjeet',
    gradingScale: 'testiarvosteluperusteet2',
    creatorName: 'nooraTestiluoja',
    creatorEmail: 'testiposti@noora',
    series: [{
      id: '2',
      name: 'sarja2',
    }],
    category: {
      id: '2',
      name: 'kategoria2',
    },
    language: {
      id: '2',
      name: 'kieli2',
    },
    rules: {
      id: '2',
      name: 'säännöt2',
    },
    pending: false,
    views: 0,
    ratingsAVG: 4,
    created: '2020-03-23T19:53:27.358+00:00'
  },
]

describe('<TaskList />', () => {
  let component
  let user = 'not null'

  beforeEach(() => {
    component = render(
      <Router>
        <TaskList user={user} originalTasks={tasks} rules={rules} seriess={series} categories={categories} />
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

  test('clicking arrow sorts tasks in correct order by name', async () => {
    await waitForElement(
      () => component.container.querySelector('.task-list-item'),
    )
    
    const arrowUp = component.container.querySelector('.name-arrow-up')
    act(() => { fireEvent.click(arrowUp)})

    expect(component.container.querySelectorAll('.task-list-item')[0]).toHaveTextContent('tehtävä2')

    const arrowDown = component.container.querySelector('.name-arrow-down')
    act(() => { fireEvent.click(arrowDown)})

    expect(component.container.querySelectorAll('.task-list-item')[0]).toHaveTextContent('tehtävä1')
  })

  test('clicking arrow sorts tasks in correct order by rating', async () => {
    await waitForElement(
      () => component.container.querySelector('.task-list-item'),
    )
    
    const arrowDown = component.container.querySelector('.rating-arrow-down')
    act(() => { fireEvent.click(arrowDown)})

    expect(component.container.querySelectorAll('.task-list-item')[0]).toHaveTextContent('tehtävä2')

    const arrowUp = component.container.querySelector('.rating-arrow-up')
    act(() => { fireEvent.click(arrowUp)})

    expect(component.container.querySelectorAll('.task-list-item')[0]).toHaveTextContent('tehtävä1')
  })

})

describe('<TaskList />', () => {
  let component
  let user = 'not null'

  beforeEach(() => {
    component = mount(
      <Router>
        <TaskList user={user} originalTasks={tasks} rules={rules} seriess={series} categories={categories} />
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
    expect(component.text()).toContain('Katselukertoja: 5')
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
    expect(component.text()).toContain('Katselukertoja: 0')
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
    expect(component.text()).toContain('Katselukertoja: 5')
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
    expect(component.text()).toContain('Katselukertoja: 0')
    expect(component.text()).not.toContain('tehtävä1')
  })
})