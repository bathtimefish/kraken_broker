const mqtt = require('mqtt');

// const client = mqtt.connect("mqtt://test.mosquitto.org", {"connectTimeout": 30 * 1000});
const client = mqtt.connect("mqtt://localhost:1884", {"connectTimeout": 30 * 1000});

client.on('connect', () => {
    console.log('publisher.connected.');
    publishLoop();
});

client.on('error', (e) => {
    console.log(e);
});

client.on('close', () => {
    console.log('publisher.closed.');
});

const publishLoop = () => {
    setInterval(() => {
        /* InfluxDB */
        // const message = {
        //     measurement: 'temperature',
        //     fields: {
        //         machine: 'robot_arm',
        //         internal: 98,
        //         external: 47,
        //     },
        //     tags: {
        //         factory: 'KOBE',
        //     },
        // }
        /* MySQL */
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
        client.publish('hellokraken', JSON.stringify(message));
        console.log('publisher.publish:', message);
    }, 100);
}
