import { WebSocketServer, WebSocket, RawData } from 'ws';
import { Server } from 'http';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import type { WebSocketClient, WebSocketMessage } from './types/websocket.js';

export class WebSocketManager {
  private wss: WebSocketServer;
  private clients: Map<string, WebSocketClient>;
  private pingInterval: NodeJS.Timeout;

  constructor(server: Server) {
    this.wss = new WebSocketServer({ 
      server,
      path: '/ws',
      verifyClient: this.verifyClient.bind(this)
    });
    
    this.clients = new Map();
    this.pingInterval = setInterval(this.ping.bind(this), 30000);
    this.setupHeartbeat();
    this.setupConnectionHandler();

    // Handle server errors
    this.wss.on('error', (error) => {
      console.error('WebSocket Server Error:', error);
    });
  }

  private verifyClient(info: { origin: string; secure: boolean; req: any }) {
    try {
      const token = new URL(info.req.url, 'ws://localhost').searchParams.get('token');
      if (!token) return false;
      
      jwt.verify(token, config.jwtSecret);
      return true;
    } catch (error) {
      console.error('WebSocket verification failed:', error);
      return false;
    }
  }

  private setupHeartbeat() {
    this.pingInterval = setInterval(() => {
      this.wss.clients.forEach((ws) => {
        const client = ws as WebSocket & { isAlive?: boolean };
        if (client.isAlive === false) {
          return client.terminate();
        }
        client.isAlive = false;
        client.ping();
      });
    }, 30000);

    this.wss.on('close', () => {
      clearInterval(this.pingInterval);
    });
  }

  private setupConnectionHandler() {
    this.wss.on('connection', (ws, req) => {
      try {
        const token = new URL(req.url!, 'ws://localhost').searchParams.get('token');
        if (!token) {
          ws.close(1008, 'Authentication required');
          return;
        }

        const decoded = jwt.verify(token, config.jwtSecret) as { userId: string };
        
        const client: WebSocketClient = {
          ws,
          userId: decoded.userId,
          isAlive: true
        };

        this.clients.set(decoded.userId, client);

        ws.on('pong', () => {
          (ws as WebSocket & { isAlive?: boolean }).isAlive = true;
        });

        ws.on('error', (error) => {
          console.error('WebSocket client error:', error);
          ws.close();
        });

        this.handleConnection(client);

      } catch (error) {
        console.error('WebSocket connection error:', error);
        ws.close(1011, 'Internal Server Error');
      }
    });
  }

  private handleConnection(client: WebSocketClient) {
    client.ws.on('message', (data: RawData) => {
      try {
        const message: WebSocketMessage = JSON.parse(data.toString());
        this.handleMessage(client, message);
      } catch (error) {
        console.error('WebSocket message error:', error);
        client.ws.send(JSON.stringify({
          type: 'error',
          payload: { message: 'Invalid message format' }
        }));
      }
    });

    client.ws.on('close', () => {
      if (client.userId) {
        this.clients.delete(client.userId);
      }
    });
  }

  private handleMessage(client: WebSocketClient, message: WebSocketMessage) {
    try {
      switch (message.type) {
        case 'ping':
          client.ws.send(JSON.stringify({ type: 'pong' }));
          break;
        default:
          console.warn('Unknown message type:', message.type);
      }
    } catch (error) {
      console.error('Message handling error:', error);
      client.ws.send(JSON.stringify({
        type: 'error',
        payload: { message: 'Failed to process message' }
      }));
    }
  }

  public broadcast(type: string, payload: any, excludeUserId?: string) {
    const message = JSON.stringify({ type, payload });
    
    this.clients.forEach((client, userId) => {
      if (userId !== excludeUserId && client.ws.readyState === WebSocket.OPEN) {
        try {
          client.ws.send(message);
        } catch (error) {
          console.error(`Failed to send message to user ${userId}:`, error);
          this.clients.delete(userId);
        }
      }
    });
  }

  public sendToUser(userId: string, type: string, payload: any) {
    const client = this.clients.get(userId);
    if (client && client.ws.readyState === WebSocket.OPEN) {
      try {
        client.ws.send(JSON.stringify({ type, payload }));
      } catch (error) {
        console.error(`Failed to send message to user ${userId}:`, error);
        this.clients.delete(userId);
      }
    }
  }

  private ping() {
    this.wss.clients.forEach((ws) => {
      const client = ws as WebSocket & { isAlive?: boolean };
      if (client.isAlive === false) {
        return client.terminate();
      }
      client.isAlive = false;
      client.ping();
    });
  }
} 