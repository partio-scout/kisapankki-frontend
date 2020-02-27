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

const getSeries = () => {
  return Promise.resolve(series)
}

export default { getSeries }