export const PORT = '8080';

export const SERVER_URL =
  process.env.NODE_ENV === 'development' ? `http://localhost:${PORT}` : `${process.env.SERVER_URL}:${PORT}`;

export const PROFILE_IMAGE_SIZE = 13;

export const MAX_USER_NAME_LENGTH = 8;

export const MAX_ROOM_NAME_LENGTH = 8;

export const MAX_USER_PER_ROOM = 8;

export const MAX_GAME_ROUND = 5;

export const MAX_SET_TIMER = 180;

export const LOGIN_ALERT_MESSAGE = {
  NONE: '',
  EMPTY: '닉네임을 제대로 입력해주세요',
  LENGTH: `${MAX_USER_NAME_LENGTH}자 이하의 이름을 입력해주세요`,
  DUPLICATED: '이미 접속해있는 닉네임입니다',
};

export const ROOM_ALERT_MESSAGE = {
  NONE: '',
  EMPTY: '방 이름을 제대로 입력해주세요',
  LENGTH: `${MAX_ROOM_NAME_LENGTH}자 이하의 이름을 입력해주세요`,
};

export const COLOR = ['#000000', '#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff'];

export const LANDSCAPE_WIDTH = 800;

export const PORTRAIT_WIDTH = 500;

export const CANVAS_SIZE = 492;
