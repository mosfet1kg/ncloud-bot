require('dotenv').config();
const slackBot = require('./helpers/slackBot');
const stateStore = require('./helpers/stateStore');
const ncloudApi = require('./helpers/ncloudApi');

(async () => {
  try {
    await slackBot.connect();

    setInterval(async () => {
      const changedServerList = await stateStore.set(ncloudApi.getServerInstanceList()
        .then(response => response.getServerInstanceListResponse.serverInstanceList));

      changedServerList.forEach(async (serverInfo) => {
        const message = '[서버 상태가 변경되었습니다]\n' +
        `서버이름: ${ serverInfo.serverName }, 서버상태: ${ serverInfo.serverInstanceStatusName } \n` +
        `서버이미지: ${ serverInfo.serverImageName }`;

        await slackBot.postMessageToUser({ username: 'mosfet1kg', message});
      })

    }, 5000);

  } catch(e) {
    console.log( e );
  } // end try ~ catch

})();

