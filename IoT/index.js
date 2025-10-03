console.log("Teste inicial");

const mqtt = require('mqtt');

var options = {
    host: 'broker.hivemq.com',
    port: 8883,
    protocol: 'mqtts',
    username: 'emqx',
    password: 'public'
};

var client = mqtt.connect(options);

client.on('connect', function () {
    console.log('Connected successfully');
});

const host = 'broker.hivemq.com'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'emqx',
  password: 'public',
  reconnectPeriod: 1000,
})

const pubTopic = 'IOT/output'
const subTopic = 'IOT/intput'

client.on('connect', () => {
  console.log('Connected')

  client.subscribe([subTopic], () => {
    console.log(`Subscribe to topic '${subTopic}'`)
    })
    
    client.publish(pubTopic, 'nodejs mqtt test', 
      { qos: 0, retain: false }, (error) => {
      if (error) {
        console.error(error)
      }
    
  })
})

client.on('message', (subTopic, payload) => {
  console.log('Received Message:', subTopic, payload.toString())
})