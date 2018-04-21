const fetchClient = require('./fetchClient');

module.exports = {
  getZoneList: () => {
    return fetchClient({
      method: 'GET',
      action: 'getZoneList',
      basePath: '/server/v1/',
    }).then(response => response.data)
      .catch(error => error.response.data);
  },
  getServerInstanceList: () => {
    return fetchClient({
      method: 'GET',
      action: 'getServerInstanceList',
      basePath: '/server/v1/',
    }).then(response => response.data)
      .catch(error => error.response.data);
  }
};
