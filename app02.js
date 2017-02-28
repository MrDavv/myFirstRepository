/**
 * Created by Administrator on 2017/2/23.
 */
var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var userList = [];
//指明静态文件的存放路径
app.use("/html",express.static("./public"));
//使用bodyParser对提交的表单数据做转码
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.set("view engine","ejs");
app.set("views","./view");


app.get("/",function(req,res){
    console.log("aaaaaaaaaa");
    var now = new Date();
    res.render("test",{
        "time":now,
        "name":"少波",
        "sex":"女",
        "stuList":
        [
            {"stuname":"tom","age":18,"score":80},
            {"stuname":"jack","age":19,"score":90},
            {"stuname":"lily","age":17,"score":92},
            {"stuname":"rows","age":20,"score":79},
            {"stuname":"david","age":18,"score":99}
        ]

    });

//    res.redirect("/html/login.ejs");
});

app.get("/",function(req,res){
    res.render("login");
});
app.get("/login",function(req,res){
    console.log("bbbbbbbbbb");
    res.send("这是第二个get");
});
app.post("/login",function(req,res){
    res.send("success");
});
app.get("/reg",function(req,res){
    console.log("有人注册");
    console.log(req.query);
    var user = new Object();
    user.username = req.query.username;
    user.pwd = req.query.pwd;
    userList.push(user);
    res.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});
    var str = JSON.stringify(userList);
    res.end(str);

});
app.post("/reg",function(req,res){
    console.log(req.body);
    var user  = new Object();
    user.username = req.body.username;
    user.pwd = req.body.pwd;
    userList.push(user);
    res.writeHead(200,{"Content-type":"application/json;charset=utf-8"});
    var userListJSON = JSON.stringify(userList);
    res.end(userListJSON);
});
app.post("/reg1",function(req,res){
    console.log(req.body);
    var user  = new Object();
    user.username = req.body.username;
    user.pwd = req.body.pwd;
    userList.push(user);
    res.writeHead(200,{"Content-type":"application/json;charset=utf-8"});
    var userListJSON = JSON.stringify(userList);
    res.end(userListJSON);
});
//app.get("/reg1",function(req,res){
//    var form = new formidable.IncomingForm();
//    form.parse(req,function(err,fields,files){
//
//    });
//    console.log("reg1");
//});
app.get("/admin/:oper",function(req,res,next){
    var isLogin = true;
    if(isLogin)
    {
        console.log("已经登陆，可以访问");
        next();
    }else
    {
        res.send("没有权限访问");
    }
});
app.get("/admin/chongzhi",function(req,res){
    //检测
    res.send("充值");
});
app.get("/admin/fahuo",function(req,res){
    //检测
    res.send("发货");
});
//app.get("/admin/:oper",function(req,res,next){
//    res.send("你访问的页面不存在");
//});
app.listen(3002,"localhost");