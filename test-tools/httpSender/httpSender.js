const fetch = require('node-fetch');

const url = 'http://localhost:3001/sigfox/event';

setInterval(() => {
  const message = {
    table: 'temperature',
    data: {
      name: 'robot_arm',
      internal: 47,
      external: 98,
      factory: 'KOBE',
      timestamp: null,
    }
  };
  const d = new Date();
  message.data.timestamp = d.toISOString();
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:  JSON.stringify(message)
  }
  fetch(url, options).then(res => {
    console.log(res.status);
    return res.text()
  }).then(text => {
    console.log(text);
  });
}, 1000);
