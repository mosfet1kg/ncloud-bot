require('dotenv').config();
const slackBot = require('./helpers/slackBot');
const fetchClient = require('./helpers/ncloudApi/fetchClient');

(async () => {
  // try {
  //   await slackBot.connect();
  //
  //   await slackBot.postMessageToUser({ username: 'mosfet1kg', message: 'hello'});
  //   await slackBot.postMessageToUser({ username: 'mosfet1kg', message: 'hello'});
  //
  //
  // } catch(e) {
  //   console.log( e );
  // } // end try ~ catch
})();

fetchClient({
  method: 'GET',
  action: 'getZoneList',
  basePath: '/server/v1/',
}).then(response => console.log( response.data ))
  .catch( error => console.log( error.response.data ));

