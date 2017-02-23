var AWS = require('aws-sdk')
AWS.config.update({
  region: 'us-east-2'
})
console.log('Starting function.')

var dynamodb = new AWS.DynamoDB.DocumentClient()
var table = 'Sessions'
var date = new Date()
var time = date.toJSON()

exports.handler = (event, context, callback) => {
  var   sess = event.params.sessionid
  console.log('SESSION', sess)
  var atts = {}
  Object.keys(event.body).forEach(function(key) {
     console.log(key, event.body[key]);
     atts[key] = {
      Action: 'PUT',
      Value: event.body[key]
    }
      
  });
  
  var params = {
      Key: { 
        'session_id': sess
      },
      TableName: 'Sessions',
      AttributeUpdates: atts
  }

  dynamodb.update(params, function (err, data) {
    if (err) {
      console.error('Unable to update item. Error JSON:', JSON.stringify(err, null, 2))
    } else {
      console.log('Update succeeded:', JSON.stringify(data, null, 2))
      callback(null, data)
    }
  })
}
