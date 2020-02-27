const rules = [
  {
    id: '1',
    name: 'säännöt1',
  },
  {
    id: '2',
    name: 'säännöt2',
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