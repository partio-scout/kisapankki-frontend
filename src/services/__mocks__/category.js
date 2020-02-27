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

const getCategories = () => {
  return Promise.resolve(categories)
}

export default { getCategories }