import { Server } from 'socket.io';
import chat from 'server/socket/chat';
import { MAX_USER_PER_ROOM } from 'shared/constant';
import { TRoom, TUser } from 'shared/types';

class RoomManager {
  roomId: number;
  rooms: Array<TRoom>;
  io: Server;

  constructor(io: Server) {
    this.roomId = 0;
    this.rooms = [];
    this.io = io;
  }

  getRooms() {
    return this.rooms;
  }

  getRoom(targetId: number) {
    return this.rooms.find(({ id }) => id === targetId);
  }

  getUsers(targetId: number) {
    return this.getRoom(targetId).users;
  }

  createRoom(name: string, user: TUser) {
    this.rooms.push({ id: this.roomId, name, users: [user], status: 'WAITING' });
    this.update();
    return this.roomId++;
  }

  joinRoom(targetId: number, user: TUser) {
    const users = this.getRoom(targetId).users;
    if (users.length >= MAX_USER_PER_ROOM) return;
    users.push(user);
    chat.enter(this.io, targetId, user.name);
    this.update();
  }

  leaveRoom(targetId: number, user: TUser) {
    const room = this.getRoom(targetId);
    room.users = room.users.filter(({ id }) => id !== user.id);
    chat.leave(this.io, targetId, user.name);
    this.update();
  }

  deleteRoom(targetId: number) {
    this.rooms = this.rooms.filter(({ id }) => id !== targetId);
    this.update();
  }

  setRoomStatus(targetId: number, status: 'WAITING' | 'PLAYING') {
    this.getRoom(targetId).status = status;
    this.update();
  }

  update() {
    this.io.emit('room/update', this.rooms);
  }
}

export default RoomManager;
