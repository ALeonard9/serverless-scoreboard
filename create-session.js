var AWS = require('aws-sdk')
AWS.config.update({
  region: 'us-east-2'
})
console.log('Starting function.')

var dynamodb = new AWS.DynamoDB.DocumentClient()
var table = 'Sessions'
var sess = null
var json_resp = null
var date = new Date()
var time = date.toJSON()

function randomSession () {
  var duplicate = true
  var tmpSess = null
  var json = null
  do {
    tmpSess = Math.random().toString(36).substr(2, 6)
    console.log('Randomly generated session id:', tmpSess)
    var params = {
      Key: {
        'session_id': tmpSess
      },
      TableName: table,
      AttributesToGet: [
        'session_id'
      ]
    }
    json = dynamodb.get(params, function (err, data) {
      if (err) {
        console.error('Unable to get item. Error JSON:', JSON.stringify(err, null, 2))
      } else {
        // console.log('Get succeeded:', JSON.stringify(data, null, 2))
        var tmpjson = JSON.parse(JSON.stringify(data, null, 2))
        return tmpjson
      }
    })
    if (json['Item']) {
      console.log('Duplicate item found, trying again.')
    } else {
      console.log('Unique item. Proceeding with create.')
      duplicate = false
    }
  }
  while (duplicate)

  return tmpSess
}

exports.handler = (event, context, callback) => {
  sess = randomSession()
  var init_table_data = new Array([
      ["<input id='new_player' class='text-center'  style='border:none;' placeholder='Add Player'></input>", ""]
      ]) 
    var init_columns = new Array(
            
              "Player",
              "<input id='new_metric' class='text-center'  style='border:none;' placeholder='Add Metric'></input>"
            
  )
  var params = {
    Item: {
      'session_id': sess,
      'table_data': null,
      'column_data': JSON.stringify(init_columns),
      'created_date': time,
      'updated_date': time
    },
    TableName: table
  }
  
  dynamodb.put(params, function (err, data) {
    if (err) console.log(err, err.stack)
    else console.log(data)
  })
  
  json_resp = {'session_id': sess}
  // TODO Handle error if upload fails
  console.log('Sending version: ', json_resp)
  callback(null, json_resp)
}
