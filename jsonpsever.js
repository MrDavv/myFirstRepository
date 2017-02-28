/**
 * Created by Administrator on 2017/2/27.
 */
var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get("/getTime",function(req,res){
    var now = new Date();
    var timeObj = new Object();
    timeObj.time = now.getTime();
    var jsonStr = JSON.stringify(timeObj);
    res.statusCode = 200;
    res.setHeader("Content-Type","application/json;charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin","*");
    res.end(jsonStr);
});
app.get("/jsonptime",function(req,res){

    res.writeHead(200,{"Content-type":"text/javascript:charset=utf-8"});
    //发回给客户端的并不是json的数据，而是一段js代码
    var fn = req.query.callback;
    var code = fn+"("+new Date().getTime()+")";
    console.log(code);
    res.end(code);
});
app.get("/jsonp",function(req,res){

    res.writeHead(200,{"Content-Type":"text/javascript;charset=utf-8"});
    var fn = req.query.callback;
    var code = fn+"("+new Date().getTime()+")";
    res.end(code);
});
app.get("/get",function(req,res){
    var now = new Date();
    var Obj = new Object();
    Obj.time = now.getTime();
    var jsonObj = JSON.stringify(Obj);
    res.setHeader("Content-Type","application/json;charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin","*");
    res.end(jsonObj);
});
app.listen(3004,"localhost");