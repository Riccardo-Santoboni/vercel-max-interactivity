// index.js
const express = require('express');
const osc = require('osc');
const app = express();
const port = 3000;

// serve la cartella public
app.use(express.static('public'));

// server web
app.listen(port, () => {
  console.log(`Server attivo su http://localhost:${port}`);
});

// crea client OSC verso Max su porta 7400
const udpPort = new osc.UDPPort({
  localAddress: "0.0.0.0",
  localPort: 57121,
  remoteAddress: "127.0.0.1",
  remotePort: 7400
});

udpPort.open();

// semplice endpoint per ricevere messaggi da client HTML
app.get('/send/:msg', (req, res) => {
  const message = req.params.msg;
  console.log("Messaggio ricevuto:", message);

  udpPort.send({
    address: "/fromweb",
    args: [
      {
        type: "s",
        value: message
      }
    ]
  });

  res.send(`Messaggio "${message}" inviato a Max`);
});
