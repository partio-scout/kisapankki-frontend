const tasks = [
  {
    id: 1,
    name: 'tehtävä1',
    assignmentText: 'testitehtävänanto',
    supervisorInstructions: 'testiohjeet',
    gradingScale: 'testiarvosteluperusteet',
    creatorName: 'testiluoja',
    creatorEmail: 'testiposti',
    series: [{
      id: '1',
      name: 'sarja1',
    }],
    category: {
      id: '1',
      name: 'kategoria1',
    },
    language: {
      id: '1',
      name: 'kieli1',
    },
    rules: {
      id: '1',
      name: 'säännöt1',
    },
    pending: false,
  },

  {
    id: 2,
    name: 'tehtävä2',
    assignmentText: 'testitehtävänanto nro 2',
    supervisorInstructions: 'myös toiset testiohjeet',
    gradingScale: 'testiarvosteluperusteet2',
    creatorName: 'nooraTestiluoja',
    creatorEmail: 'testiposti@noora',
    series: [{
      id: '2',
      name: 'sarja2',
    }],
    category: {
      id: '2',
      name: 'kategoria2',
    },
    language: {
      id: '2',
      name: 'kieli2',
    },
    rules: {
      id: '2',
      name: 'säännöt2',
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
      id: '3',
      name: 'testi-ikäryhmä pending',
    }],
    category: {
      id: '3',
      name: 'pendingkategory',
    },
    language: {
      id: '3',
      name: 'pending',
    },
    rules: {
      id: '3',
      name: 'testisäännöt true',
    },
    pending: true,
  },
]

const getOneTask = (id) => Promise.resolve(tasks[0])

const getTasks = () => Promise.resolve(tasks)

const getPendingTasks = () => Promise.resolve(pendingTasks)

export default { getOneTask, getTasks, getPendingTasks }
