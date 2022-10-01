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

export interface IGameAccepted {
  roomId: string
  playerOne: IGameAcceptedPlayer
  playerTwo: IGameAcceptedPlayer
}
