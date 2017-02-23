var AWS = require('aws-sdk')
AWS.config.update({
  region: 'us-east-2'
})
console.log('Starting function.')

var dynamodb = new AWS.DynamoDB.DocumentClient()
var table = 'Sessions'

exports.handler = (event, context, callback) => {
  var sess = event.params.sessionid
//   var sess = 'rj122o'
  console.log('SESSION', sess)
  var params = {
    Key: {
      'session_id': sess
    },
    TableName: table
  }
  dynamodb.get(params, function (err, data) {
    if (err) {
      console.error('Unable to get item. Error JSON:', JSON.stringify(err, null, 2))
    } else {
      console.log('Get succeeded:', JSON.stringify(data, null, 2))
      callback(null, data)
    }
  })
}
