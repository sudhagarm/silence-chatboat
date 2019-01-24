const express = require('express'); //added
const port = process.env.PORT || 3000; //added
const app = express(); //added
const readData = require('./master/readdata.js');
// Routing for index.html
app.use(express.static(__dirname + '/public')); //added

const server = app.listen(port, '0.0.0.0', () => {  //added
    console.log('Server listening at port %d', port);
});

const Botmaster = require('botmaster');
const SocketioBot = require('botmaster-socket.io');

const botmaster = new Botmaster({
  server,
});

const socketioSettings = {
  id: 'Lucy',
  server,
};

const socketioBot = new SocketioBot(socketioSettings);
botmaster.addBot(socketioBot);
 var nameflag=false;
myIncomingMiddlewareController = (bot, update) => {
  if (update.message.text === 'hi' ||
      update.message.text === 'Hi' ||
      update.message.text === 'hello' ||
      update.message.text === 'Hello') {
        nameflag=true;
    return bot.reply(update, 'Hi this is Lucy, whats your name');
  }
  else if (nameflag) {
    nameflag=false;
    return bot.reply(update, 'Hi '+update.message.text+', Nice name');
  } 
  else {
    let msg= readData(update.message.text);
    console.log("msg",msg);
    if (msg!="empty") {
      return bot.reply(update, msg);
    }
    else {
      return bot.reply(update,'sry, I am not yet fully developed');
    }
  }
};

botmaster.use({
  type: 'incoming',
  name: 'my-middleware',
  controller: myIncomingMiddlewareController,
});

botmaster.on('error', (bot, err) => { // added
  console.log(err.stack); // added
}); // added

// console.log("readData",readData("tell me "));