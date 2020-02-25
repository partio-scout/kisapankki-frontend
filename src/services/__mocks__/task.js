const tasks = [
  {
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
  },

  {
    id: 2,
    name: 'toinen testitehtävä',
    assignmentText: 'testitehtävänanto nro 2',
    supervisorInstructions: 'myös toiset testiohjeet',
    gradingScale: 'testiarvosteluperusteet2',
    creatorName: 'nooraTestiluoja',
    creatorEmail: 'testiposti@noora',
    series: [{
      name: 'toinen-ikäryhmä',
    }],
    category: {
      name: 'testikategorianro2',
    },
    language: {
      name: 'testikielisuomi',
    },
    rules: {
      name: 'testisäännöt2',
    },
    pending: false,
  },
]

const pendingTasks = [
  {
    id: 1,
    name: 'pending',
    assignmentText: 'text',
    supervisorInstructions: 'ohjeet pending',
    gradingScale: 'arvostelu pending',
    creatorName: 'pend',
    creatorEmail: 'true@true',
    series: [{
      name: 'testi-ikäryhmä pending',
    }],
    category: {
      name: 'pendingkategory',
    },
    language: {
      name: 'pending',
    },
    rules: {
      name: 'testisäännöt true',
    },
    pending: true,
  },
]

const getOneTask = (id) => Promise.resolve(tasks[0])

const getTasks = () => Promise.resolve(tasks)

const getPendingTasks = () => Promise.resolve(pendingTasks)

export default { getOneTask, getTasks, getPendingTasks }
