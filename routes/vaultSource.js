var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var app = express();
var cors = require('cors');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var options = {
  	apiVersion: 'v1', // default
  	endpoint: 'http://127.0.0.1:8200', // default
  	token: 'cd473a14-e470-b296-e2f4-633f07e78951' // optional client token; can be fetched after valid initialization of the server
};
var vault = require('node-vault')(options);

/* Save and return a secret */
router.post('/secret',function(req,res){
  console.log('========================');
  console.log('request body');
  console.log(req.body);

  vault.write('secret/myuser',req.body)
    .then(function(data){
      
        vault.read('secret/myuser')
        .then(function(secret){
          console.log('secret');
          res.json(secret);
        })
        .catch(function(err){
          console.log(err);
          res.json(err);
        });

    })
    .catch(function(err){
      res.json(err);
    });

});

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.json({'Message':'Welcome to Vault API Home Screen'});
});


module.exports = router;
