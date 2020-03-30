import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Rating from './Rating'


test('renders headers', () => {
  const task = {
    id: 1,
    name: 'testitehtävä',
    assignmentText: 'testitehtävänanto',
    supervisorInstructions: 'testiohjeet',
    gradingScale: 'testiarvosteluperusteet',
    creatorName: 'testiluoja',
    creatorEmail: 'testiposti',
    series: [{
      name: 'testi-ikäryhmä',
    }],
    category: {
      name: 'testikategoria',
    },
    language: {
      name: 'testikieli',
    },
    rules: {
      name: 'testisäännöt',
    },
    pending: false,
    ratingsAVG: 4,
  }

  const component = render(
    <Rating task={task} />
  )

  expect(component.container).toHaveTextContent(
    'Arvostele:'
  )
  expect(component.container).toHaveTextContent(
    'Keskiarvo:'
  )

})
