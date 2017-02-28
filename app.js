/**
 * Created by Administrator on 2017/2/23.
 */
/*
*  一。package.json文件的作用
*  package.json文件是用来记录NodeJS项目所需要用到的依赖模块，
*  在这个文件中有一个dependencies属性，这里记录了我们的项目
*  中所需要用到的所有的第三方模块及其版本号。这非常方便的管理
*  第三方模块的依赖关系及版本的更新
*  1.在项目文件夹下使用 npm init 创建package.json文件
*  2.当需要使用某个第三方模块时，可以用下面的命令安装模块，
*  并将这个模块的依赖关系自动记录到package.json中
*  ```javascript
*  npm install 模块名 --save
*  ```
*  3.在部署项目时可以不用复制项目下的node_modules文件夹
*  而是使用下面的命令安装，它会自动根据package.json文件的
*  依赖列表去下载合适的模块并安装好
*  ```bash
*  npm install
*  ```
*  二。Express的特点
*  1.提供了路由功能
*       --- Restful前后端通讯接口设计原则
*          - 这种设计围绕针对数据的操作 增，删，改，查（CRUD）
*          - web访问路径 应该类似于 http://域名/student
*          - http请求类型做了扩充 原来常用的只有post get，扩充后则增加了
*          delete put update
*      --- Express在设计时，充分考虑到了 Restful的设计原则，提供了get,post
*      ,update,delete,put等方法，专门处理对应的请求类型
*          - 这些方法的请求路径可以一致
*      --- 路由的匹配原则
*           从上到下，先到先得原则，后面的不会再处理，在匹配路径时，？号之后的可以忽略
*           路径中不区分大小写
*
*      --- 获取路径参数的两种方式
*           - 使用正则表达式 如下
*           ```javascript
*           app.get(/^\/student\/([\d]{8})$/,function(req,resp){

                var stuId = req.params[0];

                resp.send("根据学号"+stuId+"查询信息")
            })
            ```
            - 使用冒号的形式
            ```javascript
             app.get("/student/:id",function(req,resp){

                 var stuId = req.params["id"];

                resp.send("冒号方式根据学号"+stuId+"查询信息")
             })
            ```
*
*  2.提供了静态资源文件的自动引用
*       --- 设置静态路径
*       ```javascript
*       app.use("/html",express.static("./public"));
*       ```
*       可以将所有的静态资源包括(html,css,前端的js,图片等)统一放到一个文件夹下
*       这些静态资源的访问路径就是 http://localhost:3000/html/login.ejs
*
*  3.提供了中间件的概念
*       ---
*  4.提供了模板引擎
*       --- 使用如下代码注册模板引擎为ejs
*       ```javascript
*         app.set("view engine","ejs");
*         app.set("views","./view")//前一个参数固定，后一个参数是模板存放的路径
*       ```
*       --- 在view中新建.ejs后缀的模板文件，语法和html一致
*       --- 需要在动态填充数据的地方使用 <%=变量名%> 这样的占位符填充数据
*       --- 在服务端代码中使用app.render("ejs",{})渲染模板（即往模板中填充数据）
*           第一个参数是模板的名字，第二个参数是要填充的数据，这些数据被封装成一个对象
*           ，这个对象的每一个属性就是一个填充的值
*  ----- 缺点
*       --- 破坏了MVC的设计原则
*       --- 不利于复杂页面的编写
*       --- 不利于前后端的完全分离
* */
var express = require("express");
//创建应用
var app = express();

//处理网络请求的路由 所有访问网站的请求都会被回调函数处理
app.get("/",function(req,resp){

    //这里的request和response对象都是被express将原先
    //node中的request和response对象包装后产生的，功能上
    //有很多增强
    resp.send("欢迎查询信息")
})
app.get("/student",function(req,resp){


    resp.send("查询学生信息")
})

app.get(/^\/student\/([\d]{8})$/,function(req,resp){

    var stuId = req.params[0];

    resp.send("根据学号"+stuId+"查询信息")
})

app.get("/student/:id",function(req,resp){

    var stuId = req.params["id"];

    resp.send("冒号方式根据学号"+stuId+"查询信息")
})

app.get("/teacher",function(req,resp){


    resp.send("欢迎伟哥")
})

app.post("/student",function(req,resp){


    resp.send("更新学生信息")
})

app.put("/student",function(req,resp){


    resp.send("插入学生信息")
})

app.delete("/student",function(req,resp){


    resp.send("删除学生信息")
})

app.all("/teacher",function(req,res){
    resp.send("全体老师注意")
})

//启动应用
app.listen(3002,"192.168.14.15")