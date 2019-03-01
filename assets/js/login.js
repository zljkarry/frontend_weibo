//将用户名 密码  有效期存储到cookie中
function setCookie(name,value,days){
    var date = new Date();
    date.setDate(date.getDate() + days);
    if(getCookie(name).length < 0){
        document.cookie=name+"="+escape(value)+";"+((days==null)?"":"dates="+date.toGMTString());
        return true;
    }else{
        return false;
    }
    
}
//cookie中 存储是按照键值对 存储的  
//根据name获取对应的值
function getCookie(name){
    if(document.cookie.length > 0){
        var start = document.cookie.indexOf(name + "=");
        var end = -1;
        if(start != -1){
            start = start + name.length + 1;
            end = document.cookie.indexOf(";" , start);
            if(end == -1){
                end = document.cookie.length;
            }
            return document.cookie.substring(start , end);
        }
    }
    
}

//或者这样
/* 获取指定cookie */
/*function getCookie(name) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (arr[0] == name)
            return arr[1];
    }
    return "";
}*/

 //信息提醒
 function showMsg(msg) {
    document.getElementById("CheckMsg").innerHTML(msg);
}

function login(){
    var username = document.getElementById("username");
    var password = document.getElementById("password");
    if (username == '' || password == '') {
        alert("用户名，密码不能为空");
    }else {
 

        //这里为用ajax获取用户信息并进行验证，如果账户密码不匹配则登录失败
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/login', true); //是否异步

        var data = "username=" + username.value +
            "&password=" + password.value;

        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        //改用json
        /*xhr.setRequestHeader("Content-Type", "application/json");
        var data = {username:document.getElementById("username").value,password:document.getElementById("InputPassword").value};*/

        // 提交
        xhr.send(data);
        // 等待服务器返回内容
        xhr.onreadystatechange = function () {
            //0没调用open方法，1表示未调用send方法，2正在等待状态码和头的返回，3 已接受部分数据，但还没接受完，不能使用该对象的属性和方法，4已加载，所有数据执行完毕
            // 响应状态码，表示页面执行无误
            if (xhr.readyState == 4 && xhr.status == 200) {
                // alert(xhr.responseText);
                var tdata = JSON.parse(xhr.responseText);
                if (tdata.outcome == "success") {
                    var d = JSON.stringify(tdata);
                    window.localStorage.setItem("temp",d);
                    showMsg("登录成功，正在跳转");
                    window.location.href = "../../index.html";
                }

            } else {
                alert("发生错误：" + request.status);
            }
        }
    }


}

