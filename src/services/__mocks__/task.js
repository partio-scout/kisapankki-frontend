const tasks = [
  {
    id: 1,
    name: 'testitehtävä',
    assignmentText: 'testitehtävänanto',
    supervisorInstructions: 'testiohjeet',
    gradingScale: 'testiarvosteluperusteet',
    creatorName: 'testiluoja',
    creatorEmail: 'testiposti',
    ageGroup: {
      name: 'testi-ikäryhmä'
    },
    category: {
      category: 'testikategoria'
    },
    language: {
      language: 'testikieli'
    },
    rules: {
      rules: 'testisäännöt'
    },
    pending: false
  }
]

const getOneTask = (id) => {
  return Promise.resolve(tasks[0])
}

export default { getOneTask }