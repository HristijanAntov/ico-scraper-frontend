export const baseUrl = 'http://localhost:8080'

// Generic Response handlers
const transformToJson = res => res.ok ? res.json() : Promise.reject({ statusCode: res.status })
const formatJsonPayload = payload => ({ ok: true, payload })
const handleError = error => ({ ok: false, statusCode: error.statusCode })


const urls = {
  icosByCategory: category => `${baseUrl}/icos/${category}`,
  fullDescription: id => `${baseUrl}/icos/${id}/description`,
  stats: `${baseUrl}/stats`,
}

export function fetchIcosByCategory(category) {
  const url = urls.icosByCategory(category)

  return fetch(url)
    .then(transformToJson)
    .then(formatJsonPayload, handleError)
}

export function fetchStats() {
  const url = urls.stats

  return fetch(url)
    .then(transformToJson)
    .then(formatJsonPayload, handleError)
}

export function fetchIcoFullDescription(id) {
  const url = urls.fullDescription(id)

  return fetch(url)
    .then(transformToJson)
    .then(formatJsonPayload, handleError)
}
