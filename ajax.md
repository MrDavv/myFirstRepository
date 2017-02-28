##什么是AJAX Ansyc Javascript And XML(Extends Mark Language)异步js

###传统的web开发 之前的网站页面都是互相跳转。页面会有刷新。这种处理方式是同步的

###异步的JavaScript 是指 浏览器的前端页面保持不变，在当前页面的后台直接与
服务器端通讯。服务器端与JS端之间的通讯都是使用的XML格式。所以这个技术合在一起
简称AJAX

###目前都是使用json替代xml

###ajax传送数据的方式
1.get方式发送 键值对的字符串，服务器端返回json数据
    客户端的发送代码如下
    ```javascript
        var xhr = new XMLHttpRequest();
                    var data = "username="+nameTxt.value+"&pwd="+pwdTxt.value+
                            "&pwd2="+pwd2Txt.value;
                    //2.使用xhr.open打开与服务器连接
                    xhr.open("get","/reg?"+data,true);
                    //3.指定接收响应的回调函数
                    xhr.onreadystatechange = function(){
                        if(xhr.readyState===4&&xhr.status===200)
                        {
                            alert(xhr.readyState);
                            console.log(xhr.responseText);
                            var obj = JSON.parse(xhr.responseText);
                            console.log(obj);

                        }
                    };
                    //4.发送
                    xhr.send();
                }
    ```
    服务端
    ```javascript
        app.get("/reg",function(req,res){
            console.log("有人注册");
            console.log(req.query);
            res.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});
            var str = JSON.stringify(req.query);
            res.end(str);

        });
    ```
2.post方式发送键值对的字符串，服务端也返回json数据
    客户端
    ```javascript
         var xhr = new XMLHttpRequest();
                    var data = "username="+nameTxt.value+"&pwd="+pwdTxt.value+
                            "&pwd2="+pwd2Txt.value;

                    //2.使用xhr.open打开与服务器连接
                    xhr.open("post","/reg",true);
                    //设置头部文件
                    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded")
                    //3.指定接收响应的回调函数

                    xhr.onreadystatechange = function(){
                        if(xhr.readyState===4&&xhr.status===200)
                        {
                            alert(xhr.readyState);
                            console.log(xhr.responseText);
                            var objList = JSON.parse(xhr.responseText);
                            console.log(objList);
                            //删除老数据
                            tbody.innerHTML = "";
                            objList.forEach(function(user,index){
                                var tr = document.createElement("tr");
                                var td1 = document.createElement("td");
                                td1.innerHTML = ""+index;
                                var td2 = document.createElement("td");
                                td2.innerHTML = user.username;
                                var td3 = document.createElement("td");
                                td3.innerHTML = user.pwd;
                                tr.appendChild(td1);
                                tr.appendChild(td2);
                                tr.appendChild(td3);
                                tbody.appendChild(tr);
                            })
                        }
                    };
                    //4.发送
                    xhr.send(data);
    ```
    服务端
    ```javascript
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
    ```
3.post发送json格式的数据，服务端返回json数据
    在前端页面的ajax代码中，先将数据封装成对象，然后使用JSON.stringfy这个函数将对象转
    成json字符串，然后再xhr.open()后使用xhr.setRequestHeader("Content-type","application/json");
    最后xhr.send(json字符串);

    在nodeJS服务器端添加中间键app.use(bodyParser.json());代码如下
    ```javascript
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
    ```
    ## Ajax的跨域问题
    ### JS代码访问要求同源的安全策略
       同源是指 在js代码中使用ajax访问服务器的资源时，浏览器会默认要求访问的发起者
       的url地址与访问的资源的服务器端地址要同源（西医，IP或域名，以及端口要完全一致）;
    ### 跨域问题
        请求端的url与服务端的url地址在协议，ip或域名，以及端口号这三者有任意一处不相同，
        就说这个请求跨域了。
    ### 在移动端的app中与服务器端通讯时很常见。

    ## 解决跨域访问的几种方式
    ### 使用JSONP技术
        1.JSONP实际是利用了客户端页面中<script>标签的src属性是取某个地址下载js代码
        并执行的特性。
        2.在使用时，客户端先，将要执行的操作封装成一个函数，函数名随便，例如叫做fn,但必须
        要有一个参数，参数名随便，这个参数表示的是需要服务端提供的数据。
        3.在页面中添加一个script标签，src属性的值，是服务器端提供数据的地址。
        4.这个地址后面要以?附加的形式加入一个名叫callback的参数，它的值，是你前面所定义的函数的名字
        5.在服务器端接收到callback参数后，获取到函数名称，然后产生数据，再使用字符串拼接
        的方式 产生一个形如 fn(data)的js代码，最后发回给客户端。
        6.需要注意 jsonp 方式必须是get请求
        7.服务端必须设置响应头是 text/javascript
    ### 第2种方法
    只要在服务器端设置 响应头 Access-Control-Allow-Origin的值为*即可解决跨域。
    当然只支持先进浏览器。 移动端完全支持
