function addUrlQueryParams (endpoint, params) {
  let url = new window.URL(endpoint)
  if (params) {
    // append URL query paramenters
    Object.keys(params).forEach(key => {
      url.searchParams.append(key, params[key])
    })
  }
  return url
}

export const load = async function (jwt, endpoint, query) {
  try {
    const url = addUrlQueryParams(endpoint, query)
    console.log('GET', url)
    return window.fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + jwt
      }
    })
  } catch (e) {
    throw e
  }
}

export const put = async function (jwt, endpoint, query, data) {
  try {
    const url = addUrlQueryParams(endpoint, query)
    console.log('PUT', url, data)
    let body
    if (data) {
      body = JSON.stringify(data)
    }
    return window.fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + jwt
      },
      body
    })
  } catch (e) {
    throw e
  }
}

export const post = async function (jwt, endpoint, query, data) {
  try {
    const url = addUrlQueryParams(endpoint, query)
    console.log('POST', url, data)
    let body
    if (data) {
      body = JSON.stringify(data)
    }
    return window.fetch(url, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + jwt
      },
      body
    })
  } catch (e) {
    throw e
  }
}

export const httpDelete = async function (jwt, endpoint, query) {
  try {
    const url = addUrlQueryParams(endpoint, query)
    console.log('DELETE', url, data)
    return window.fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + jwt
      },
      body: JSON.stringify(data)
    })
  } catch (e) {
    throw e
  }
}
