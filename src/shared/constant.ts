export const PORT = '8080';

export const SERVER_URL =
  process.env.NODE_ENV === 'development' ? `http://localhost:${PORT}` : `${process.env.SERVER_URL}:${PORT}`;

export const PROFILE_IMAGE_SIZE = 13;

export const MAX_USER_NAME_LENGTH = 10;

export const MAX_ROOM_NAME_LENGTH = 8;

export const ERROR_MESSAGE = {
  ROOM_DELETED: 'target room not found',
  NOT_LOGINED: 'not logined yet',
  ALREADY_LOGINED: 'already logined',
  DUPLICATED_USER: 'another user has duplicated name',
  DUPLICATED_ROOM: 'another room has duplicated name',
};
