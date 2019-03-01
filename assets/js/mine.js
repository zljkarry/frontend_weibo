//显示个人已发微博

//关注数

//粉丝数

//修改头像

//修改昵称

//修改个人简介


/*以下与首页代码相同，实现相同功能*/
//页面加载后执行
//两个window.onload,前一个会失效
window.onload = function () {
    ToTop();
    TextListen();
}
//返回顶部
function ToTop() {
    //找到页面中的按钮
    var totop = document.getElementById('btn');
    totop.style.display = "none";
    var timer = null;
    //给按钮绑定点击事件
    totop.onclick = function () {
        //周期性定时
        timer = setInterval(function () {
            //获取滚动条距离顶端的距离
            var backTop = document.documentElement.scrollTop || document.body.scrollTop;
            //越滚越慢
            var speedTop = backTop / 5;
            document.documentElement.scrollTop = backTop - speedTop;
            if (backTop == 0) {
                clearInterval(timer);
            }
        }, 30);
    }
    //设置临界值
    var pageHeight = 700;
    //按键是否显示功能
    window.onscroll = function () {
        var backTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (backTop > pageHeight) {
            totop.style.display = "block";
        } else {
            totop.style.display = "none";
        }
    }
}

/*//将字符串转化为json
var l = JSON.parse(localStorage.getItem("temp"));
//取到当前用户名
var uname = l.username;
//将展示用户名处改为当前用户的用户名
var un = document.getElementById("un");
un.innerHTML = uname;*/

//先写死，当前用户为smile
var un = document.getElementById("un");
un.innerHTML = "smile";


//搜索
document.getElementById("tosearch").onclick = GetResult;

function GetResult() {
    //发送ajax请求并处理
    var result = new XMLHttpRequest();
    result.open("POST", "", true);
    var data = "keyword=" + document.getElementById("search").value;
    result.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    result.send(data);
    result.onreadystatechange = function () {
        if (result.readyState = 4 && result.status == 200) {
            var results = JSON.parse(result.responseText);
            if (results.outcome == "success") {

            }
            //results的微博内容应为后台返回的搜索结果，应该是一个数组
            //将返回结果展示在页面上
        }
    }
}

//发微博


//字数控制
var text = document.getElementById("input");
var p = document.getElementsByTagName('p')[0];
var sub = document.getElementById("sub");

function TextListen() {
    //文本区域实时监听
    text.addEventListener('keyup', function () {
        var ele = document.getElementById('textCount')
        ele.innerText = 140 - text.value.length
        if (text.value == '') {
            //此时不能发布，发布按钮暗
            sub.style.opacity = 0.5;
        } else if (text.value.length > 140) {
            alert("字数不能超过140");
        } else {
            //此时可以发布，发布按钮亮
            sub.style.opacity = 1.0;
        }
    });


    //  text.addEventListener('propertychange',function () {//兼容IE
    //      var len =  txtCount(this); //   调用函数 
    //      document.getElementById('textCount').innerHTML = len;
    //  });


}
//文本区域实时监听
/*text.oninput = text.onpropertychange = change;

text.onblur = function () {
    if (text.value == "") {
        p.innerHTML = '您还可以输入' + '<em style = "color: green">' + '140' + '</em>' + '个字';
    }
}

//判断输入字符的多少
function change() {
    //var math = 0;
    var mark = document.getElementsByTagName('em')[0];
    var tValue = text.value;
    //num = math.ceil(getLength(tValue) / 2); //向上取整
    var num = tValue.length;
    if (num <= 140) {
        //字数未超出，保持绿色变化
        mark.innerHTML = 140 - num;
        mark.style.color = 'green';
    } else {
        //字数超出红色提醒
        p.innerHTML = '已超出<em style="color:red">' + (num - 140) + '</em> 个字';
    }

    if (text.value == '' || num > 140) {
        //此时不能发布，发布按钮暗
        sub.style.opacity = 0.5;
    } else {
        //此时可以发布，发布按钮亮
        sub.style.opacity = 1.0;
    }
}*/
//正则：用于区分中文为两个字节
/*function getLength(str) {
    return String(str).replace(/[^\x00-\xff]/g, 'aa').length;
}*/

//点击发布事件
sub.onclick = SubFun;

var postButton = document.querySelector('#post-article')
postButton.addEventListener('click', function (e) {
    //取消事件的默认动作，这样应该也就把向后台提交表单chanchu删除了吧，不过我也没写action method
    e.preventDefault()
})

function SubFun() {
    if (btn.style.opacity == 0.5) {
        alert("不能发布");
    } else {
        /*//ajax请求后端
        var xhr = new XMLHttpRequest();
        open("POST","",true);
        var data = "uname=" + uname + 
        "&content=" + document.getElementById("input").value;
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send();
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4 && xhr.status === 200){
                var tdata = JSON.parse(xhr.responseText);
                if(tdata.outcome == "success"){
                    ShowCom();
                }else{
                    alert("发布失败");
                }
            }else{
                alert("发布失败");
            }
        }*/
        //先调用下看效果
        ShowCom();

        function ShowCom() {
            var main = document.getElementsByClassName("main")[0];
            //创建整个微博展示框
            var inmain = document.createElement("div");
            inmain.className = 'inmain';

            //创建发布者栏
            var uploader = document.createElement("div");
            uploader.className = "uploader";
            inmain.appendChild(uploader);
            //创建发布者栏里——头像
            var hp = document.createElement("div");
            var img = document.createElement("img");
            img.src = "./assets/images/headphoto/headphoto.jpg";
            hp.appendChild(img);
            hp.className = "hp";
            uploader.appendChild(hp);
            //创建发布者栏里——用户名
            var name = document.createElement("div");
            name.className = "name";
            name.innerHTML = "smile"; //name.innerHTML = uname;
            uploader.appendChild(name);
            //创建发布者栏里——关注
            var att = document.createElement("div");
            var button = document.createElement("button");
            button.id = "att";
            button.className = "att";
            button.innerHTML = "关注";
            att.appendChild(button);
            uploader.appendChild(att);
            //创建内容栏
            var content = document.createElement("div");
            content.className = "content";
            content.innerHTML = document.getElementById("input").value;
            inmain.appendChild(content);
            //创建互动栏
            var inter = document.createElement("div");
            inter.className = "inter";
            //应该用createElement的，这里为了方便直接用了innerHtml
            inter.innerHTML = '<!--收藏-->' +
                '<i class="fa fa-heart-o" aria-hidden="true" id="collect" style="background-color: aliceblue;">' + '</i>' +
                '<!--评论-->' +
                '<i class="fa fa-comment-o" aria-hidden="true" id="comment" style="background-color: aliceblue;">' + '</i>' +
                '<!--赞-->' +
                '<i class="fa fa-thumbs-o-up" aria-hidden="true" id="like" style="background-color: aliceblue;">' + '</i>';
            inmain.appendChild(inter);
            //将整个微博展示框挂到DOM树上
            if (main.children.length > 0) {
                main.insertBefore(inmain, main.children[0]);
            } else {
                main.appendChild(inmain);
            }
            //var iHeight = inmain.offsetHeight;
            // inmain.style.height = 0;
            // move(inmain, {
            //     height: iHeight
            // }, function () {
            //     move(inmain, {
            //         opacity: 100
            //     });
            // });

            //将文本框中的内容删除
            document.getElementById("input").value = "";
            //调用互动函数
            InterFun();
        }
    }

}



//调用互动函数（为使js对直接写入html的元素能生效来看看效果 & 使已发布后应该已显示在网页中的元素生效）
InterFun();

//显示已发微博


function InterFun() {

    //之前疑惑：貌似对 收藏 评论 点赞 等标签应该用class ,访问时用getElementsByClassName("")[0]类似的，不然一个页面就多个id了罢
    //可以绑定监听，适当运用this就可以了

    //关注
    document.getElementById("att").onclick = AttFun;

    function AttFun() {
        var att = document.getElementById("att");
        //取到被关注人的用户名
        //var box = this.parentNode;
        //var obox = box.children;
        //var atter = obox[1].innerText;
        var atter = this.parentNode.parentNode.children[1].innerText;
        if (att.innerHTML == '关注') {
            //访问后端实现关注的功能

            //ajax
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "", true);
            var data = "atter=" + atter +
                "&uname=" + uname;
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            // 提交
            xhr.send(data);
            // 等待服务器返回内容
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var re = JSON.parse(responseText);
                    if (re.outcome == "success") {
                        att.innerHTML = "已关注";
                        att.style.cssText = 'color: #e7891c; border-color: #e7891c; outline:none;';
                    }
                }
            }


        } else {
            //访问后端实现取消关注的功能

            //ajax
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "", true);
            var data = "atter=" + atter +
                "&uname=" + uname;
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            // 提交
            xhr.send(data);
            // 等待服务器返回内容
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var re = JSON.parse(responseText);
                    if (re.outcome == "success") {
                        att.innerHTML = "关注";
                        att.style.cssText = 'color: #26353b; border-color: #26353b; outline:none;';
                    }
                }
            }


        }

    }
    //收藏
    document.getElementById("collect").addEventListener('click', function () {
        if (this.style.backgroundColor == "aliceblue") {
            this.style.backgroundColor = "#e7891c";
            alert("收藏成功");
        } else {
            this.style.backgroundColor = "aliceblue";
            alert("取消收藏成功");
        }
    })



    //赞
    document.getElementById("like").addEventListener("click", function () {
        if (this.style.backgroundColor == "aliceblue") {

            this.style.backgroundColor = "#e7891c";

        } else {
            this.style.backgroundColor = "aliceblue";

        }
    });



    //评论
    document.getElementById("comment").onclick = CommFun;


    function CommFun() {
        var comm = document.getElementById("comment");
        if (document.getElementById("showcom") && document.getElementById("showcom").style.display == "none") {
            document.getElementById("showcom").style.display = "block";
            comm.style.backgroundColor = "#e7891c";
        } else {

            if (comm.style.backgroundColor == "aliceblue") {

                //改变背景颜色
                comm.style.backgroundColor = "#e7891c";

                //创建新节点发表评论
                var com = document.createElement("div");
                com.id = "showcom";
                com.style.cssText = "width: 100%;";

                //创建子节点——发表评论的div
                var crecom = document.createElement("input");
                crecom.id = "crecom";
                crecom.style.cssText = "width: 100%; height: 20px; margin: 10px 0;";
                com.appendChild(crecom);

                //创建子节点——发表评论的按钮
                var combtn = document.createElement("button");
                combtn.id = "combtn";
                combtn.innerHTML = "发表";
                combtn.style.cssText = "width: 45px; background-color: #e7891c; border: none; color: #ffffff; margin-left: 90%;";
                com.appendChild(combtn);

                //最后将父节点直接挂到DOM树上
                var inmain = this.parentNode.parentNode

                inmain.appendChild(com);




                //显示已发表评论

                //将用户发表的评论显示在已发表评论区，并实现评论的回复
                document.getElementById("combtn").onclick = MakeCom;

                function MakeCom() {
                    if (crecom.value == "") {
                        alert("评论内容不能为空，请输入评论内容");
                    } else {
                        //创建展示已发表评论的大框
                        var putcc = document.createElement("div");
                        putcc.style.cssText = "width: 100%; background-color: rgb(173, 217, 232)";
                        //创建上面的小框
                        var putc = document.createElement("div");
                        putc.style.cssText = "width: 100%; display: flex; justify-content: space-between; margin: 10px 0 0 0;padding: 5px 0; border-top:1px solid rgba(31, 137, 223, 0.747);";
                        //创建小框的一个子节点——用户名
                        var cname = document.createElement("div");
                        cname.innerHTML = "smile"; //cname.innerHTML = uname;
                        putc.appendChild(cname);
                        //创建小框的一个子节点——回复评论按钮
                        var rescom = document.createElement("button");
                        rescom.innerHTML = "回复";
                        rescom.style.cssText = "width: 45px; background-color: #e7891c; border: none; color: #ffffff;";
                        rescom.onclick = ResCom; //点击即可调出准备回复评论的函数
                        putc.appendChild(rescom);
                        //将小框整体给到大框
                        putcc.appendChild(putc);
                        //创建大框的一个子节点——展示评论的内容
                        var comcent = document.createElement("div");
                        comcent.innerHTML = crecom.value;
                        comcent.style.cssText = "font-size: 14px; margin-left: 30px;"
                        putcc.appendChild(comcent);
                        //将展示评论的框添加到整个评论区并清空评论输入框

                        if (com.children.length > 2) {
                            com.insertBefore(putcc, com.children[2]);
                        } else {
                            com.appendChild(putcc);
                        }
                        crecom.value = "";


                        //回复评论
                        function ResCom() {
                            //创建一个输入框
                            var restxt = document.createElement("input");
                            restxt.style.cssText = "width: 98%;margin-top: 10px;";
                            restxt.id = "restxt";
                            putcc.appendChild(restxt);
                            //创建一个确定回复按钮
                            var resok = document.createElement("button");
                            resok.innerHTML = "确定回复";
                            resok.style.cssText = "width: 70px; height:20px; background-color: #e7891c; border: none; color: #ffffff; margin-left: 85%; margin-top:5px;";
                            resok.onclick = ResOk; //点击即可调出回复评论成功的函数
                            putcc.appendChild(resok);

                            //将回复内容展示到页面上
                            function ResOk() {
                                if (restxt.value == "") {
                                    alert("回复内容不能为空，请输入回复内容");
                                } else {
                                    //创建一个大回复框
                                    var putress = document.createElement("div");
                                    putress.style.cssText = "width: 100%; background-color: rgb(190, 221, 231);margin-top: 5px;";
                                    //创建一个表明谁回复谁的小框
                                    var putres = document.createElement("div");
                                    putres.style.cssText = "display: flex;";
                                    //创建一个子节点——表明回复人的容器
                                    var resperson = document.createElement("div");
                                    resperson.innerHTML = "smile"; //resperson.innerHTML = uname;
                                    putres.appendChild(resperson);
                                    //创建一个子节点——盛装回复的容器
                                    var responsee = document.createElement("div");
                                    responsee.innerHTML = " 回复 ";
                                    responsee.style.cssText = "color:#666666;font-size:14px;"
                                    putres.appendChild(responsee);
                                    //创建一个子节点——表明被回复人的容器
                                    var resedper = document.createElement("div");
                                    resedper.innerHTML = "cry"; //暂时写成这样，等把东西挂到DOM树上之后，层级关系确定后再取评论人的用户名修改
                                    //resedper.innerHTML = this.parentNode.children[0].children[0].innerHTML;
                                    putres.appendChild(resedper);
                                    //将小框整体给到大框
                                    putress.appendChild(putres);
                                    //创建一个大框的子节点——展示回复评论的内容
                                    var rescent = document.createElement("div");
                                    rescent.innerHTML = restxt.value;
                                    rescent.style.cssText = "margin-left: 30px; font-size: 14px;color:#333;"
                                    putress.appendChild(rescent);
                                    //将回复框挂到整个评论区并清除回复输入框里的内容
                                    if (putcc.children.length > 4) {
                                        putcc.insertBefore(putress, putcc.children[4]);
                                    } else {
                                        putcc.appendChild(putress);
                                    }
                                    restxt.value = "";
                                    //修改被回复人
                                    resedper.innerHTML = this.parentNode.children[0].children[0].innerText;
                                }

                            }
                        }
                    }
                }


            } else {
                //再次点击评论按钮收回评论展示框
                comm.style.backgroundColor = "aliceblue";
                var showcom = document.getElementById("showcom");
                //if (showcom) showcom.remove();
                if (showcom) showcom.style.display = "none";
            }
        }

    }
}


//更新列表信息
document.getElementById("undo").onclick = update;

function update() {

}

//刷新后仍显示微博，即向后端请求数据，返回的数据渲染页面，思路和微博发送成功后显示微博一样