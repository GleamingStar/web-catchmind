import { Server, Socket } from 'socket.io';
import { TUser } from 'shared/types';

let userList: Array<TUser> = [];

let userId = 0;

const setUserEvent = (io: Server, socket: Socket) => {
  socket.on('login', (name: string, imgUrl: string) => {
    if (userList.filter((user) => user.name === name).length > 0) return socket.emit('login/fail/duplicate');

    const user = {
      id: userId++,
      name,
      imgUrl,
    };

    userList.push(user);

    socket.handshake.auth.user = user;

    socket.emit('login/success', user);
    io.emit('usercount', userList.length);
  });

  socket.on('usercount', () => socket.emit('usercount', userList.length));

  socket.on('disconnect', () => {
    userList = userList.filter(({ id }) => id !== socket.handshake.auth.user?.id);
    io.emit('usercount', userList.length);
  });
};

export default setUserEvent;
