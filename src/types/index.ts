export enum ActiveUserStatus {
  IDLE = 'idle',
  BUSY = 'busy',
}

export interface IServerUser {
  username: string
  socketId: string
  status: ActiveUserStatus
}
