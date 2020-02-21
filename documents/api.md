**Backend API**


# Tasks

| Type  | GET  |
|---|---|
| Uri | api/task  |
| DataType | json  |
| Comments  |   |
| Expected updates  |   |
##### Data
```
{
name: "Nilkan nyrjähdys",
assignmentText: "Kuinka auttaisit ystävääsi kun hän on nyrjäyttänyt nilkkansa?",
supervisorInstructions: "Kerro tehtävänanto, näytä apuvälineet. Aikaa 20min.",
gradingScale: "1-5p - koho - kompressio - kylmä",
creatorName: "Arttu",
creatorEmail: "sähköposti@sähköposti.com",
pending: false,
ageGroup: {
task: [
"5e37d8c114f20730f1253fd5",
"5e37f16c8f51645b31d01137",
"5e380c889de4a0199cd46c31",
"5e380cf99de4a0199cd46c32",
"5e380dc5d3588434b8846b57",
"5e380f4fd3588434b8846b58",
"5e380fbad3588434b8846b59",
"5e380fd3d3588434b8846b5a",
"5e381095d3588434b8846b5b",
"5e3810a9d3588434b8846b5c",
"5e3816d3d3588434b8846b5d",
"5e381706d3588434b8846b5e",
"5e3848bfe54e612fd06d3c6d",
"5e3848d8e54e612fd06d3c6e",
"5e384a0ce54e612fd06d3c71"
],
name: "Sudenpennut",
maxAge: 12,
minAge: 6,
color: "Punainen",
id: "5e37d88014f20730f1253fd1"
},
category: {
task: [ ],
category: "Ensiapu",
id: "5e388954b226c84d544b2b0e"
},
language: {
task: [
"5e37d8c114f20730f1253fd5",
"5e37df899566c6334dc1c74d",
"5e37f16c8f51645b31d01137",
"5e380c889de4a0199cd46c31",
"5e380cf99de4a0199cd46c32",
"5e380dc5d3588434b8846b57",
"5e380f4fd3588434b8846b58",
"5e380fbad3588434b8846b59",
"5e380fd3d3588434b8846b5a",
"5e381095d3588434b8846b5b",
"5e3816d3d3588434b8846b5d",
"5e381706d3588434b8846b5e",
"5e3848bfe54e612fd06d3c6d",
"5e3848d8e54e612fd06d3c6e",
"5e384a0ce54e612fd06d3c71"
],
language: "Suomi",
__v: 15,
id: "5e37d86d14f20730f1253fcf"
},
rules: {
task: [ ],
rules: "Vanhat",
__v: 0,
id: "5e38888bb226c84d544b2b06"
},
id: "5e394ce084150c0004ed201c"
}
``` 

# Delete task

| Type  | DELETE  |
|---|---|
| Uri | api/task/:id  |
| DataType | json  |
| Comments  |   |
| Expected updates  |   |

##### Data

# See single task

| Type  | POST  |
|---|---|
| Uri | api/task/:id  |
| DataType | json  |
| Comments  |   |
| Expected updates  |   |

##### Data


# Edit task

| Type  | POST  |
|---|---|
| Uri | api/task  |
| DataType | json  |
| Comments  |   |
| Expected updates  |   |

##### Data

# Add task

| Type  | POST  |
|---|---|
| Uri | api/task  |
| DataType | json  |
| Comments  |   |
| Expected updates  |   |

##### Data

```
{
  name: 'Kissan karvojen syönti',
  assignmentText: 'Syödään kissan karvoja.',
  supervisorInstructions: 'Kerää kissan karvat sohvan kulmasta.',
  gradingScale: '1-10',
  creatorName: 'Make',
  creatorEmail: 'make@kake.com',
  pending: false,
  ageGroup: 5e37d88014f20730f1253fd1,
  category: 5e3888a5b226c84d544b2b08,
  language: 5e37d86d14f20730f1253fcf,
  rules: 5e388894b226c84d544b2b07,
  id: '5e3d292787210b37a2b35cd1'
}
```

# Rules

| Type  | GET  |
|---|---|
| Uri | api/rule  |
| DataType | json  |
| Comments  |   |
| Expected updates  |   |

##### Data

```
{
task: [ ],
rules: "Vanhat",
__v: 0,
id: "5e38888bb226c84d544b2b06"
},
``` 
# Add rule

| Type  | POST  |
|---|---|
| Uri | api/rule  |
| DataType | json  |
| Comments  |   |
| Expected updates  |   |

##### Data

```
{
  task: [],
  rules: 'Edelliset',
  __v: 0,
  id: '5e3d2aebbd03d6386ee720a7'
}
``` 

# Log in

| Type  | POST  |
|---|---|
| Uri | api/login  |
| DataType | json  |
| Comments  |   |
| Expected updates  |   |

##### Data

# Languages

| Type  | Get  |
|---|---|
| Uri | api/language  |
| DataType | json  |
| Comments  |   |
| Expected updates  |   |

##### Data

```
{
task: [ ],
language: "Suomi",
__v: 15,
id: "5e37d86d14f20730f1253fcf"
},
``` 
# Add language

| Type  | POST  |
|---|---|
| Uri | api/language  |
| DataType | json  |
| Comments  |   |
| Expected updates  |   |

##### Data

```
{ 
task: [], 
language: 'Saksa',
__v: 0, 
id: '5e3d2bdc1cd0b138e2ffc319' 
}
```

# Categories

| Type  | Get  |
|---|---|
| Uri | api/categories  |
| DataType | json  |
| Comments  |   |
| Expected updates  |   |

##### Data

```
{
task: [ ],
category: "Kätevyys",
id: "5e3888a5b226c84d544b2b08"
},
``` 

# Add category

| Type  | POST  |
|---|---|
| Uri | api/categories  |
| DataType | json  |
| Comments  |   |
| Expected updates  |   |

##### Data

```
{ 
task: [], 
category: 'Sukellus', 
id: '5e3d2c67b040c2392855c7a5' 
}
```

# Age groups

| Type  | get  |
|---|---|
| Uri | api/ageGroup  |
| DataType | json  |
| Comments  |   |
| Expected updates  |   |

##### Data

```
{
task: [ ],
name: "Sudenpennut",
maxAge: 12,
minAge: 6,
color: "Punainen",
id: "5e37d88014f20730f1253fd1"
},
```

# Add age group

| Type  | get  |
|---|---|
| Uri | api/ageGroup  |
| DataType | json  |
| Comments  |   |
| Expected updates  |   |

##### Data

```
{
  task: [],
  name: 'Teinit',
  maxAge: 19,
  minAge: 10,
  color: 'Pinkki',
  id: '5e3d2ce4fb003a397693dc28'
}
```
