const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3001/websocket/message');

ws.on('open', () => {
  console.log("client on open");
  setInterval(() => {
    console.log("Client sent a message");
    const d = new Date();
    const created = d.toISOString();
    const message = {
      table: 'temperature',
      data: {
        created, 
        name: 'robot_arm',
        internal: 47,
        external: 98,
        factory: 'KOBE',
      }
    };
    ws.send(JSON.stringify(message));
  }, 100);
});

ws.on('message', (msg) => {
  console.log("Client received the message: ", msg);
});
