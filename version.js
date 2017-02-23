'use strict';

console.log('Loading api version function');
var version = '0.0.1';
// var json_resp = JSON.stringify({'version': version}, null, 2);
var json_resp = {'version': version};
// var json_resp = JSON.stringify(json);
console.log('Version: ', version);

exports.handler = (event, context, callback) => {
    console.log('Sending version: ', json_resp);
    callback(null, json_resp);
}
