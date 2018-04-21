const { findIndex } = require('lodash');
let store = [];

module.exports = {
  set: async ( promiseFn ) => {
    const responseServerList = await promiseFn;
    let diffList = [];

    responseServerList.forEach( serverInfo => {
      const idx = findIndex(store, serverInfo);

      if ( idx === -1 ) {
        diffList.push( serverInfo );
      } // end if
    });

    store = responseServerList;

    return diffList;
  },
  get: () => {
    return store;
  },
  clear: () => {
    store = [];
  }
};
