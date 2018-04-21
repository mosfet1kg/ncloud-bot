const SlackBot = require('slackbots');
const { token, botname: name } = process.env;

// create a bot
let bot = null;

module.exports = {
  connect: () => {
    return Promise.race([
      new Promise((resolve, reject) => {
        bot = new SlackBot({ token, name });
        bot.on('start', () => resolve());
      }),
      new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('TIMEOUT')), 5000);
      })
    ])
  },
  postMessageToUser: ({ username, message }) => {
    return new Promise((resolve, reject) => {
      bot.postMessageToUser('mosfet1kg', 'meow!', { 'slackbot': true, icon_emoji: ':cat:' }, ( data ) => {
        console.log( data );
        resolve( data );
      });

    }) // end new Promise
  }
};
