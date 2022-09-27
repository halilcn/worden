export enum ActiveUserStatus {
  IDLE = 'idle',
  BUSY = 'busy',
}

export interface IActiveUser {
  username: string
  status: ActiveUserStatus
}

export interface IServerUser {
  username: string
  socketId: string
  status: ActiveUserStatus
}
