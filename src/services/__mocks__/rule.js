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

const getRules = () => {
  return Promise.resolve(rules)
}

export default { getRules }