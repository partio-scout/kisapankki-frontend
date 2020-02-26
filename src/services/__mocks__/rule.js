const rules = [
  {
    id: '1',
    name: 'testisäännöt',
  },
  {
    id: '2',
    name: 'testisäännöt2',
  },
  {
    id: '3',
    name: 'testisäännöt true',
  },
]

const getRules = () => {
  return Promise.resolve(rules)
}

export default { getRules }