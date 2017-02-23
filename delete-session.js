var AWS = require('aws-sdk')
AWS.config.update({
  region: 'us-east-2'
})
console.log('Starting function.')

var dynamodb = new AWS.DynamoDB.DocumentClient()
var table = 'Sessions'
var sess = null
var json_resp = null

exports.handler = (event, context, callback) => {
  sess = event.params.sessionid

  var params = {
  TableName : 'Sessions',
  Key: {
    'session_id': sess
  }
};
  
  dynamodb.delete(params, function (err, data) {
    if (err) console.log(err, err.stack)
    else console.log(data)
  })
  
  json_resp = {'session_id': sess}
  // TODO Handle error if upload fails
  console.log('Sending version: ', json_resp)
  callback(null, json_resp)
}
