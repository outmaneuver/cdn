type MessageHandler = (data: any) => void;

class WebSocketService {
  private socket: WebSocket | null = null;
  private messageHandlers: Map<string, Set<MessageHandler>> = new Map();

  connect(url: string = `ws://${window.location.host}/ws`) {
    if (this.socket?.readyState === WebSocket.OPEN) return;

    this.socket = new WebSocket(url);

    this.socket.onmessage = (event) => {
      try {
        const { type, payload } = JSON.parse(event.data);
        this.messageHandlers.get(type)?.forEach(handler => handler(payload));
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    };

    this.socket.onclose = () => {
      setTimeout(() => this.connect(url), 5000);
    };
  }

  subscribe(type: string, handler: MessageHandler) {
    if (!this.messageHandlers.has(type)) {
      this.messageHandlers.set(type, new Set());
    }
    this.messageHandlers.get(type)!.add(handler);

    return () => {
      this.messageHandlers.get(type)?.delete(handler);
    };
  }

  send(type: string, payload: any) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type, payload }));
    }
  }

  disconnect() {
    this.socket?.close();
    this.socket = null;
    this.messageHandlers.clear();
  }
}

export const wsService = new WebSocketService(); 