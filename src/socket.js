import io from 'socket.io-client';

const socketsHost = 'http://localhost:3000';

const socket = io(socketsHost);

export function onEvent(cb){
   socket.on('event', data => {
    cb(data);
  })
}
