// const express = require('express')
// const cors = require('cors');
// const app = express()
const mqtt = require("mqtt");
let value = "";

// var allowlist = ['http://localhost:5500']
// var corsOptionsDelegate = function (req, callback) {
//   var corsOptions;
//   if (allowlist.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false } // disable CORS for this request
//   }
//   callback(null, corsOptions) // callback expects two parameters: error and options
// }

// app.get('/', cors(corsOptionsDelegate), function (req, res) {
//     res.send({
//         value: value
//     })
//   })
  
//   app.listen(3000)

const client = mqtt.connect("mqtt://au1.cloud.thethings.network:1883", { 
    clientId: "mqttClient01",
    username: "lmic@ttn",
    password: "NNSXS.4U2IUVA7CRNUPYY6UXC7WB7GIKKSJLXUOREY6OI.GR5N3GEPVTUAHYEI3BCCAMU7HQCTT4HGUU7QC7FYVHM7YVKD4YVA",
});

client.on("message", function(topic, message) {
    const object = JSON.parse(message);
    console.log(message);
    if(object.end_device_ids.join_eui == "0000000000000005") {
        const buffer = new Buffer.from(object.uplink_message.frm_payload, "base64");
        value = buffer.toString();
        console.log(value)
    }
});

client.on("connect", function() {
    console.log("Connected");
    client.subscribe(["v3/lmic@ttn/devices/eui-88571dfffeee8c47/up", "v3/lmic@ttn/devices/#"], () => {
      console.log("Subscribe to topic");  
    })
});

client.on("error", function(error) {
    console.log("Can't connect " + error);
    process.exit(1);
});