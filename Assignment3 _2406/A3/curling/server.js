/*
COMP 2406 Collision Demo
(c) Louis D. Nel 2018

This example is based on the collision geometry math presented in
assignment #3 (fall 2018).
Some of the variable names (e.g. angle_d) correspond to those
presented in the powerpoint slides with the assignment.

This code is intended to serve as the base code for building
an online multi-player game where clients are kept in synch
through a server -presumably using the socket.io npm module.


Use browser to view pages at http://localhost:3000/collisions.html
*/

//Server Code
const app = require("http").createServer(handler) //need to http
const io = require('socket.io')(app)
const fs = require("fs") //needed if you want to read and write files
const url = require("url") //to parse url strings



app.listen(5000)

const ROOT_DIR = "html" //dir to serve static files from

const MIME_TYPES = {
  css: "text/css",
  gif: "image/gif",
  htm: "text/html",
  html: "text/html",
  ico: "image/x-icon",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  js: "text/javascript", //should really be application/javascript
  json: "application/json",
  png: "image/png",
  svg: "image/svg+xml",
  txt: "text/plain"
}

let playerData = {

    whosTurnIsIt: "red",
    playerNum: 0,
    homeStones: null,
    visitorStones: null,
    allStones: null,
    stoneBeingShot: null,
    shootingCue: null,
    shootingQueue: null,
    enableShooting:null,

}

function get_mime(filename) {
  //Get MIME type based on extension of requested file name
  //e.g. index.html --> text/html
  for (let ext in MIME_TYPES) {
    if (filename.indexOf(ext, filename.length - ext.length) !== -1) {
      return MIME_TYPES[ext]
    }
  }
  return MIME_TYPES["txt"]
}

io.on('connection', function(socket) {
    socket.on('playerData', function(data) {
        console.log('RECEIVED PLAYERS DATA: ' + data)
        let receivedData = JSON.parse(data)
        playerData.stones = receivedData.stones
        playerData.shootingCue = receivedData.shootingCue
        playerData.stoneBeingShot = receivedData.stoneBeingShot
        //playerData.whosTurnIsIt = receivedData.whosTurnIsIt;
        playerData.allStones = receivedData.allStones;
        playerData.shootingQueue = receivedData.shootingQueue;
        playerData.enableShooting = receivedData.enableShooting;
        //playerData.score = receivedData.score;
        if (playerData.shootingQueue != null) {
            if (playerData.shootingQueue.collection.length == 0)
                playerData.isFinished = true;
            else
                playerData.whosTurnIsIt = playerData.shootingQueue.collection[0].colour;
        }
        //to broadcast message to everyone including sender:
        io.emit('playerData', JSON.stringify(playerData)) //broadcast to everyone including sender
    })
})

function handler (request, response) {
    let urlObj = url.parse(request.url, true, false)
    console.log("\n============================")
    console.log("PATHNAME: " + urlObj.pathname)
    console.log("REQUEST: " + ROOT_DIR + urlObj.pathname)
    console.log("METHOD: " + request.method)

    let receivedData = ""
    let dataObj = null
    let returnObj = null



    //attached event handlers to collect the message data
    request.on("data", function(chunk) {
      receivedData += chunk
    })

    //event handler for the end of the message
    request.on("end", function() {
      //Handle the client POST requests
      //console.log('received data: ', receivedData)

      //If it is a POST request then we will check the data.
      if (request.method == "POST") {
        //Do this for all POST messages
        //echo back the data to the client FOR NOW
        dataObj = JSON.parse(receivedData)
        console.log("received data object: ", dataObj)
        console.log("type: ", typeof dataObj)
        console.log("USER REQUEST: " + dataObj.text)
        returnObj = {}

        if (dataObj.action == "Logout") {
            if (playerData.type != 1 && playerData.type != 2 )
                playerData.playerNum = 2;

        } else if (dataObj.action == "Apply") {

            if (playerData.playerNum == 2 && dataObj.type == 3) { //separate
                returnObj.success = true
                //object to return to client
                returnObj.playerColor = '#ccffcc'

            } else if (playerData.playerNum == 0 && dataObj.type == 1) {  //home join
                returnObj.success = true
                returnObj.playerColor = "Red"
                //playerData.playerColor = SPECTATOR_PROMPT_COLOUR
                playerData.playerNum = 1;

            } else if (playerData.playerNum == 1 && dataObj.type == 2) {   //vistor join
                returnObj.success = true
                returnObj.playerColor = "Yellow"
                //playerData.playerColor = VISITOR_COLOUR
                playerData.playerNum = 2;
            }
        }

        response.writeHead(200, {
          "Content-Type": MIME_TYPES["txt"]
        })
        response.end(JSON.stringify(returnObj));
        io.emit('playerData', JSON.stringify(playerData));
      }
      else if (request.method == "GET") {
        //handle GET requests as static file requests
        var filePath = ROOT_DIR + urlObj.pathname
        if (urlObj.pathname === "/") filePath = ROOT_DIR + "/index.html"

        fs.readFile(filePath, function(err, data) {
          if (err) {
            //report error to console
            console.log("ERROR: " + JSON.stringify(err))
            //respond with not found 404 to client
            response.writeHead(404)
            response.end(JSON.stringify(err))
            return
          }
          response.writeHead(200, {
            "Content-Type": get_mime(filePath)
          })
          response.end(data)
        })
      }
    })
  }

console.log("Server Running at PORT 5000  CNTL-C to quit")
console.log("To Test")
console.log("http://localhost:5000/curling.html")
