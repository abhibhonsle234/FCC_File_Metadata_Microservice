'use strict';

var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');

// require and use "multer"...
var multer = require("multer")
var upload = multer({dest:"uploads/"})
mongoose.connect(process.env.MLAB_URI || 'mongodb://localhost/exercise-track',{useNewUrlParser:true} )

var File;
var fileSchema = {
  name:{
    type:String,
    required:true
  },
  type:String,
  size:Number
}
File = mongoose.model('File', fileSchema);



var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post("/api/fileanalyse/", upload.single("upfile"), (req, res)=>{

  var doc = {"name":req.file.originalname, "type":req.file.mimetype, "size": req.file.size};
  let file = new File(doc);
  file.save().then(()=>console.log("its is done"))
  console.log(doc);
  res.json(doc); 
    
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
