const CryptoJS = require("crypto-js");
const Base64 = require('crypto-js/enc-base64');
const axios = require('axios');

const {
  accessKey,
  secretKey,
  apiKey,
} = process.env;

const baseURL = 'https://ncloud.apigw.ntruss.com/';
const space = " ";
const newLine = "\n";

// const basePath = '/server/v1/';
// const action = 'getZoneList';

module.exports = ({ method, basePath, action, actionParams={} }) => {
  const timestamp = Date.now();
  const message = [];
  let params = [];

  actionParams = {...actionParams, responseFormatType: 'json'};

  for( let key in actionParams ) {
    params.push(`${key}=${actionParams[key]}`);
  } // end for loop

  const paramsString = params.join('&');
  const url = basePath + action + '?' + paramsString;

  message.push(method);
  message.push(space);
  message.push(url);
  message.push(newLine);
  message.push(timestamp);
  message.push(newLine);
  message.push(apiKey);
  message.push(newLine);
  message.push(accessKey);

  const authSignature = Base64.stringify(CryptoJS.HmacSHA256(message.join(''), secretKey));

  return axios.request({
    url,
    baseURL,
    method,
    headers: {
      "x-ncp-apigw-timestamp" : timestamp,
      "x-ncp-apigw-api-key" : apiKey,
      "x-ncp-iam-access-key" : accessKey,
      "x-ncp-apigw-signature-v1" : authSignature,
    }
  });
};
