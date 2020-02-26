const series = [
  {
    id: '1',
    name: 'testi-ikäryhmä',
  },
  {
    id: '2',
    name: 'toinen-ikäryhmä',
  },
  {
    id: '3',
    name: 'testi-ikäryhmä pending',
  },
]

const getSeries = () => {
  return Promise.resolve(series)
}

export default { getSeries }