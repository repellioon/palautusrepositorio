import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

/*
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}*/

const getAll = () => {
  const request = axios.get(baseUrl)
  const nonExisting = {
    id: 10000,
    content: 'This note is not saved to server',
    important: true,
  }
  return request.then(response => response.data.concat(nonExisting))
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

/*
Olion määrittelyssä vasemmalla puolella kaksoispistettä 
olevat nimet tarkoittavat eksportoitavan olion kenttiä, 
kun taas oikealla puolella olevat nimet ovat moduulin 
sisällä määriteltyjä muuttujia.

export default { 
  getAll: getAll, 
  create: create, 
  update: update 
}*/

// yksinkertaisempi moduulin määrittely
export default { getAll, create, update }