const host = 'http://localhost:3000';

export function postLogin(options){
  return new Promise((resolve, reject) => {
    fetch(host + '/login', {
      method: 'post',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({email: options.email, password: options.password})
    })
    .then(response => response.json())
    .then(response => {
      if(response.errors){
        return reject(response);
      }
      return resolve(response);
    })
  })
}

export function logout(){
  return new Promise((resolve, reject) => {
    fetch(host + '/logout', {credentials: 'include'})
      .then(response => {
        if(!response.ok){
          reject({err: response.statusText});
        }
        response.json().then(resolve);
      })
  })
}

export function getAccount(){
  return new Promise((resolve, reject) => {
    fetch(host + '/account', {credentials: 'include'})
      .then(response => {
        if(!response.ok){
          reject({err: response.statusText});
        }
        response.json().then(resolve);
      })
  })
}

export function getNotifications(){
  return new Promise((resolve, reject) => {
    fetch(host + '/account/notifications', {credentials: 'include'})
      .then(response => {
        if(!response.ok){
          reject({err: response.statusText});
        }
        response.json().then(resolve);
      })
  })
}

export function getEvents(){
  return new Promise((resolve, reject) => {
    fetch(host + '/account/events', {credentials: 'include'})
      .then(response => {
        if(!response.ok){
          reject({err: response.statusText});
        }
        response.json().then(resolve);
      })
  })
}

export function createGroup(options){
  return new Promise((resolve, reject) => {
    fetch(host + '/account/group', {
      method: 'post',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({name: options.name})
    })
    .then(response => response.json())
    .then(response => {
      if(response.errors){
        return reject(response);
      }
      return resolve(response);
    })
  })
}

export function getGroups(){
  return new Promise((resolve, reject) => {
    fetch(host + '/account/group', {credentials: 'include'})
      .then(response => {
        if(!response.ok){
          return reject({err: response.statusText});
        }
        return response.json().then(resolve);
      })
  })
}

export function getGroup(groupId) {
  return new Promise((resolve, reject) => {
    fetch(host + '/group/' + groupId, {credentials: 'include'})
      .then(response => {
        if(!response.ok){
          return reject({err: response.statusText});
        }
        return response.json().then(resolve);
      })
  })
}

export function deleteGroup(groupId) {
  return new Promise((resolve, reject) => {
    fetch(host + '/group/' + groupId, {
      method: 'delete',
      credentials: 'include'
    })
    .then(response => {
      if(!response.ok){
        return reject({err: response.statusText});
      }
      return response.json().then(resolve);
    })
  })
}

export function addTask(options) {
  return new Promise((resolve, reject) => {
    fetch(host + '/group/task/add', {
      method: 'post',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        title: options.title,
        points: options.points,
        groupId: options.groupId
      })
    })
    .then(response => response.json())
    .then(response => {
      if(response.errors){
        return reject(response);
      }
      return resolve(response);
    })
  })
}

export function removeTask(options) {
  return new Promise((resolve, reject) => {
    fetch(host + '/group/task/remove', {
      method: 'post',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        groupId: options.groupId,
        taskId: options.taskId
      })
    })
    .then(response => response.json())
    .then(response => {
      if(response.errors){
        return reject(response);
      }
      return resolve(response);
    })
  })
}

export function getTasks(groupId) {
  return new Promise((resolve, reject) => {
    fetch(host + '/group/' + groupId + '/tasks', {credentials: 'include'})
      .then(response => {
        if(!response.ok){
          return reject({err: response.statusText});
        }
        return response.json().then(resolve);
      })
  })
}