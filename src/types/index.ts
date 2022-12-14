export enum ActiveUserStatus {
  IDLE = 'idle',
  BUSY = 'busy',
}

export interface IServerUser {
  username: string
  socketId: string
  status: ActiveUserStatus
}

export interface IGameRoom {
  room: string
}

export interface IAcceptGameRequest {
  roomId: string
  gameUserSocketId: string
}

export interface IGameAcceptedPlayer {
  socketId: string
  username: string
}

export interface ISendReadyStatusForGame {
  roomId: string
  userSocketId: string
}

export interface IGameAccepted {
  roomId: string
  playerOne: IGameAcceptedPlayer
  playerTwo: IGameAcceptedPlayer
}

export interface ISendPointOfUser {
  roomId: string
  userSocketId: string
  point: number
}

export enum GAME_ACTIVE_PAGE {
  GAME_STARTING = 'GAME_STARTING',
  ROOM = 'ROOM',
  GAME = 'GAME',
}
