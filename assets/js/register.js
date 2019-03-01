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

document.getElementById("sub").onclick = checkForm;

//信息提醒
function showMsg(msg) {
    document.getElementById("CheckMsg").innerHTML(msg);
}



function register() {
    var username = document.getElementById("username");
    var password = document.getElementById("password");
    var bool = true;
    if(username.value == "") bool = false;
    if(password.value == "" || password.value.length <6 || password.value.length >16) bool = false;
    if(!setCookie(username, password, 365)) bool = false;
    if (bool == true) {
        reg();
    }else{
        alert("用户名或密码不合要求");
    }

}

//向后端请求进行注册
function reg() {


    //发送ajax请求并处理
    var req = new XMLHttpRequest();
    req.open("POST", "/register", true);

    var data = "username=" + username.value +
        "&password=" + password.value;

    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    //改用json
    /*req.setRequestHeader("Content-Type", "application/json");
    var data = {username:document.getElementById("username").value,password:document.getElementById("InputPassword").value};*/
    req.send(data);
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            var tdata = JSON.parse(req.responseText);
            if(tdata.outcome == "success"){
                var t = JSON.stringify(tdata);
                window.localStorage.setItem("temp",t);
                showMsg("注册成功");
                window.location.href = "../../index.html";
            }
            
        } else {
            alert("发生错误：" + req.status);
        }
    }
}