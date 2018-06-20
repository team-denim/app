const URL = '/api';
const ADVICE_URL = `${URL}/advice`;
const RESOURCES_URL = `${URL}/resources`;
const WORKSPACES_URL = `${URL}/workspaces`;
const HUMOR_URL = `${URL}/humor`;
const AUTH_URL = `${URL}/auth`;
const USER_URL = `${URL}/users`;
const SAVED_URL = `${URL}/saved`;
const VOTES_URL = `${URL}/votes`;

function responseHandler(response) {
  if(response.ok) return response.json();
  return response.json().then(err => {
    throw err.message;
  });
}

function getHeaders(hasBody) {
  const headers = {};
  if(hasBody) {
    headers['Content-Type'] = 'application/json';
  }

  const user = localStorage.user;
  if(user) {
    try {
      headers['Authorization'] = JSON.parse(user).id;
    }
    catch (err) {
      localStorage.removeItem('user');
    }
  }

  return headers;
}

//ADVICE
export function getAdvice() {
  return fetch(ADVICE_URL, {
    headers: getHeaders(true)
  })
    .then(responseHandler);
}

export function addAdvice(advice) {
  return fetch(ADVICE_URL, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify(advice)
  })
    .then(responseHandler);
}

export function updateAdvice(advice) {
  return fetch(`${ADVICE_URL}/${advice.id}`, {
    method: 'PUT',
    headers: getHeaders(true),
    body: JSON.stringify(advice)
  })
    .then(responseHandler);
}

export function removeAdvice(id) {
  return fetch(`${ADVICE_URL}/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  })
    .then(responseHandler);
}

//RESOURCES
export function getResources() {
  return fetch(RESOURCES_URL, {
    headers: getHeaders(true)
  })
    .then(responseHandler);
}

//WORKSPACES
export function getWorkspaces() {
  return fetch(WORKSPACES_URL, {
    headers: getHeaders(true)
  })
    .then(responseHandler);
}

//HUMOR
export function getHumor() {
  return fetch(HUMOR_URL, {
    headers: getHeaders(true)
  })
    .then(responseHandler);
}

//SIGNUP SIGNIN
export function signUp(credentials) {
  return fetch(`${AUTH_URL}/signup`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify(credentials)
  })
    .then(responseHandler);
}

export function signIn(credentials) {
  return fetch(`${AUTH_URL}/signin`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify(credentials)
  })
    .then(responseHandler);
}


// DASHBOARD
export function getUser(id) {
  return fetch(`${USER_URL}/${id}`, {
    headers: getHeaders(true),
  })
    .then(responseHandler);
}

export function getSavedAdvice(id) {
  return fetch(`${SAVED_URL}/advice/${id}`, {
    headers: getHeaders(true),
  })
    .then(responseHandler);
}

export function getSavedResources(id) {
  return fetch(`${SAVED_URL}/resources/${id}`, {
    headers: getHeaders(true),
  })
    .then(responseHandler);
}

export function getSavedWorkspaces(id) {
  return fetch(`${SAVED_URL}/workspaces/${id}`, {
    headers: getHeaders(true),
  })
    .then(responseHandler);
}

export function deleteSaved(id) {
  return fetch(`${SAVED_URL}/${id}`, {
    method: 'DELETE',
    headers: getHeaders(true),
  })
    .then(responseHandler);
}

// VOTES
export function getVotes(userID) {
  return fetch(`${VOTES_URL}/${userID}`, {
    headers: getHeaders(true)
  })
    .then(responseHandler);
}
