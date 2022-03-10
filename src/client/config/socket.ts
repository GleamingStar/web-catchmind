import { io } from 'socket.io-client';
import { SERVER_URL } from 'shared/constant';

const socket = io(SERVER_URL, { transports: ['websocket'] });

export default socket;
