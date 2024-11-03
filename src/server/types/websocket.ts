import { WebSocket } from 'ws';

export interface WebSocketClient {
  ws: WebSocket;
  userId: string | null;
  isAlive: boolean;
}

export interface WebSocketMessage {
  type: string;
  token?: string;
  data?: any;
}

export interface WebSocketHandlers {
  [key: string]: (client: WebSocketClient, data: any) => void;
} 