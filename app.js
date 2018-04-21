const SlackBot = require('slackbots');

// create a bot
const bot = new SlackBot({
  token: 'xoxb-351721204902-5IwBGijZyLhStDBefwPIoosR', // Add a bot https://my.slack.com/services/new/bot and put the token
  name: 'ncloud-bot'
});

bot.on('start', () => {
  // more information about additional params https://api.slack.com/methods/chat.postMessage
  const params = {
    icon_emoji: ':cat:'
  };

  // define channel, where bot exist. You can adjust it there https://my.slack.com/services
  // bot.postMessageToChannel('general', 'meow!', params);

  // define existing username instead of 'user_name'
  // bot.postMessageToUser('gbchoi', 'meow!', params, (data) => {
  //   console.log( data );
  // });

  // If you add a 'slackbot' property,
  // you will post to another user's slackbot channel instead of a direct message
  bot.postMessageToUser('mosfet1kg', 'meow!', { 'slackbot': true, icon_emoji: ':cat:' /**, username: 'gbchoi' **/ }, ( data ) => {
    console.log( data );
  });

  // define private group instead of 'private_group', where bot exist
  // bot.postMessageToGroup('private_group', 'meow!', params);
});

// bot.on('message', (data) => {
//   // all ingoing events https://api.slack.com/rtm
//   console.log(data);
// });

// bot.getUsers().then(res => console.log( res ))
