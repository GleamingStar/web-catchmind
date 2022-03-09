import { Socket } from 'socket.io';
import { PROFILE_IMAGE_SIZE } from 'shared/constant';
import { TUser } from 'shared/types';

let userList: Array<TUser> = [];

let userId = 0;

const setUserEvent = (socket: Socket) => {
  socket.on('login', (name: string) => {
    if (userList.filter((user) => user.name === name).length > 0) return socket.emit('login/fail/duplicate');

    const user = {
      id: userId,
      name,
      imgUrl: `http://gravatar.com/avatar/${userId++}?d=identicon&s=${PROFILE_IMAGE_SIZE}`,
    };

    userList.push(user);

    socket.handshake.auth.user = user;

    socket.emit('login/success', user);
  });

  socket.on('disconnect', () => (userList = userList.filter(({ id }) => id !== socket.handshake.auth.user?.id)));
};

export default setUserEvent;
