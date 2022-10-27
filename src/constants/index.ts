export const USERNAME_LOCALSTORAGE = 'USERNAME_LOCALSTORAGE'

export const ROUTER_PATHS = {
  welcome: '/',
  activeUsers: '/active-users',
  game: '/game',
}

export const SOCKET_SERVER_URL = 'http://127.0.0.1:3000'

export const SOCKET_CHANNELS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  DISCONNECT: 'disconnect',
  ALREADY_EXIST_USERNAME: 'ALREADY_EXIST_USERNAME',
  CORRECT_USERNAME_TO_LOGIN: 'CORRECT_USERNAME_TO_LOGIN',
  ACTIVE_USERS: 'ACTIVE_USERS',
  SEND_GAME_REQUEST: 'SEND_GAME_REQUEST',
  INCOMING_GAME_REQUEST: 'INCOMING_GAME_REQUEST',
  CANCEL_GAME_REQUEST: 'CANCEL_GAME_REQUEST',
  ACCEPT_GAME_REQUEST: 'ACCEPT_GAME_REQUEST',
  GAME_CANCELED: 'GAME_CANCELED',
  GAME_ACCEPTED: 'GAME_ACCEPTED',
  LOGIN_GAME_ROOM: 'LOGIN_GAME_ROOM',
  LOGOUT_GAME_ROOM: 'LOGOUT_GAME_ROOM',
  SEND_REQUEST_LOGOUT_GAME_ROOM: 'SEND_REQUEST_LOGOUT_GAME_ROOM',
  SEND_READY_STATUS_FOR_GAME: 'SEND_READY_STATUS_FOR_GAME',
  READIED_USER: 'READIED_USER',
  GAME_STARTING: 'GAME_STARTING',
  GAME_STARTED: 'GAME_STARTED',
  SEND_POINT_OF_USER: 'SEND_POINT_OF_USER',
  POINT_OF_USER: 'POINT_OF_USER',
}

export const GAME_WORDS_LENGTH = 20

export const EXPECTED_PLAYERS_COUNT_IN_ROOM = 2

export const MIN_REMAINING_TIME = 0

export const MAX_REMAINING_TIME = 120
