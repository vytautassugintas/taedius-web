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