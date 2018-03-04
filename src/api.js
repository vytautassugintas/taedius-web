export function postLogin(options){
  return fetch('http://localhost:3000/login', {
    method: 'post',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    
    body: JSON.stringify({email: options.email, password: options.password})
  })
  .then(response => response.json())
  .catch(err => err.json());
}

export function getAccount(){
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3000/account', {credentials: 'include'})
      .then(response => {
        if(!response.ok){
          reject({err: response.statusText});
        }
        response.json().then(resolve);
      })
  })
}