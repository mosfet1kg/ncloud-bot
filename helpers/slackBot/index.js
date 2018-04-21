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
      bot.postMessageToUser(username, message, { icon_emoji: ':cat:' }, ( data ) => {
        if ( ! data.ok ) {
          return reject(data);
        }

        resolve( data );
      });

    }) // end new Promise
  }
};
