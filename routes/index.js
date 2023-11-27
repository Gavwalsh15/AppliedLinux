var express = require('express');
var router = express.Router();
const { exec } = require("child_process");
const fs = require('fs')

router.get('/', function(req, res, next) {
  res.render('index', {title: 'EXPRESS'});
});

router.post('/runScript', function(req, res, next) {
  var scrObject = req.body;
  console.log(req.body);
  var stdOutString = "";
  
  try {
    fs.writeFileSync('./theZxScript.mjs', scrObject.scriptInput)
    //file written successfully
  } catch (err) {
    console.error(err)
  }

  exec('./theZxScript.mjs', (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    stdOutString = `${stdout}`;
    console.log(stdOutString);
    scrObject.scriptOutput = stdOutString;
    res.json(scrObject);
  });
});

//new for us
  router.post('/runTsk', function(req,res, next) {
  var scrObject = req.body;
  var stdOutString = "";

  exec('./runTsk.mjs', (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    stdOutString = `${stdout}`;
    console.log(stdOutString);
    scrObject.scriptOutput = stdOutString;
    res.json(scrObject);
  });
});

module.exports = router;
