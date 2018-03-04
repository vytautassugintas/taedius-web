export function postLogin(options){
  return fetch('http://localhost:3000/login', {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(options)
  }).then(response => response.json());
}