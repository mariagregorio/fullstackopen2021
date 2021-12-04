import axios from 'axios'

const baseUrl = '/api/persons'

const getAllPersons = () => {
  const request = axios.get(baseUrl)
  return request.then(res => res.data)
}

const createPerson = (newPerson) => {
  const request = axios.post(baseUrl, newPerson)
  return request.then(res => res.data)
}

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(res => res.data)
}

const updatePerson = (id, person) => {
  const request = axios.put(`${baseUrl}/${id}`, person)
  return request.then(res => res.data)
}

const personsService = { getAllPersons, createPerson, deletePerson, updatePerson }

export default personsService