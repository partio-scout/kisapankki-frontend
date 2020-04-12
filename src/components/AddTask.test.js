import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import { mount } from 'enzyme'
import AddTask from './AddTask'

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

const languages = [
  {
    id: '1',
    name: 'suomi1',
  },
  {
    id: '2',
    name: 'suomi2',
  },
  {
    id: '3',
    name: 'ruotsi3',
  },
]

afterEach(cleanup)

describe('<AddTask/>', () => {
  let component

  beforeEach(() => {
    component = render(
      <AddTask seriess={series} rules={rules} languages={languages} />,
    )
  })

  test('renders heading', () => {
    expect(component.container).toHaveTextContent(
      'Lisää tehtävä',
    )
  })

  test('renders inputs for task', () => {
    const inputs = component.container.querySelectorAll('input')
    expect(inputs.length).toBe(7)
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

describe('<AddTask />', () => {
  let component

  beforeEach(() => {
    component = mount(
      <AddTask seriess={series} rules={rules} languages={languages} />,
    )
  })

  test('allows to select only accepted category', () => {
    component.update()
    expect(component.find('.rule-options').length).toEqual(3)
    expect(component.find('.rule-options').at(0).text()).toBe("säännöt1")
    expect(component.find('.rule-options').at(1).text()).toBe("säännöt2")
    expect(component.find('.rule-options').at(2).text()).toBe("testisäännöt true")
    expect(component.find('.category-options').length).toEqual(0)
    component.find('.rule-select').simulate('change', { target: { value: '1' } })
    expect(component.find('.category-options').length).toEqual(2)
    expect(component.find('.category-options').at(0).text()).toBe("kategoria1")
    expect(component.find('.category-options').at(1).text()).toBe("kategoria2")
  })
})
