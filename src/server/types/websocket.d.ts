import { WebSocket } from 'ws';

export interface WebSocketClient {
  ws: WebSocket;
  userId: string | null;
  isAlive: boolean;
}

export interface WebSocketMessage {
  type: string;
  token?: string;
  payload?: any;
}

export interface WebSocketResponse {
  type: string;
  payload: any;
} 