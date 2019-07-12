/* -----------------------------------------------
/* How to use? : Check the GitHub README
/* ----------------------------------------------- */

/* To load a config file (particles.json) you need to host this demo (MAMP/WAMP/local)... */
/*
particlesJS.load('particles-js', 'particles.json', function() {
  console.log('animation_particles.js loaded - callback');
});
*/

/* Otherwise just put the config content (json): */


/*
particlesJS('particles-js',
    {
        "particles": {
            "number": {
                "value": 60,
                "density": {
                    "enable": true,
                    "value_area": 1000
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 5,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 30,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 200,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true,
        "config_demo": {
            "hide_card": false,
            "background_color": "#b61924",
            "background_image": "",
            "background_position": "50% 50%",
            "background_repeat": "no-repeat",
            "background_size": "cover"
        }
    }

);
*/


function isValidUsername(str){
    reg = /^[0-9a-zA-Z|_]{3,20}$/g;
    return reg.test(str);
}

// function check_name()
// {
//     let name = $("#name").val();
//     if(name.length!=0){
//         if(name.length<4){
//             alert("请输入长度至少为4的用户名！");
//             document.getElementById('name').value = "";
//             document.getElementById('name').focus();
//         }
//         else if(name.length>20){
//             alert("请输入长度不超过20的用户名！");
//             document.getElementById('name').value = "";
//             document.getElementById('name').focus();
//         }
//         else if(!isValidUsername(name)){
//             alert("用户名只允许字母、数字和下划线！");
//             document.getElementById('name').value = "";
//             document.getElementById('name').focus();
//         }
//     }
// }
// document.getElementById("name").addEventListener("blur", check_name,true);

function check_name_login()
{
  let name = $("#login_name").val();
  if(name.length!=0){
    if(!isValidUsername(name)){
      alert("用户名包含非法字符！");
      document.getElementById('login_name').value = "";
      document.getElementById('login_name').focus();
    }
  }
}
document.getElementById("login_name").addEventListener("blur", check_name_login,true);


function isValidPassword(str){
    reg = /^[0-9a-zA-Z|_]{5,20}$/g;
    return reg.test(str);
}
//
// function check_psw()
// {
//     let name = $("#psw").val();
//     if(name.length!=0){
//         if(name.length<6){
//             alert("请输入长度至少为4的密码！");
//             document.getElementById('psw').value = "";
//             document.getElementById('psw').focus();
//         }
//         else if(name.length>20){
//             alert("请输入长度不超过20的密码！");
//             document.getElementById('psw').value = "";
//             document.getElementById('psw').focus();
//         }
//         else if(!isValidPassword(name)){
//             alert("密码只允许字母、数字和下划线！");
//             document.getElementById('psw').value = "";
//             document.getElementById('psw').focus();
//         }
//     }
// }
// document.getElementById("psw").addEventListener("blur", check_psw,true);

function check_psw_login()
{
  let name = $("#login_psw").val();
  if(name.length!=0){
    if(!isValidPassword(name)){
      alert("密码包含了非法字符！");
      document.getElementById('login_psw').value = "";
      document.getElementById('login_psw').focus();
    }
  }
}
document.getElementById("login_psw").addEventListener("blur", check_psw_login,true);



function a() {
    console.log("aaaaaaaaaaa");
    $("#ini_background").fadeOut(800);
    $("#woaijingning").fadeIn(3000);
    $("#slide").fadeIn(2000);
    $("#particles-js").fadeIn(2500);
    $("#foot").fadeIn(2000);
}

//检查匹配：后端
function check_match(psw,name){
    //...
    var FLAG = "2";
    var queryJson = [];
    var row = {};
    row.password = psw;
    row.name = name;
    queryJson.push(row);
    console.log(queryJson[0]);

    $.ajax({
        url: "/Account/Login",
        async: false,
        type: 'post',
        contentType: "application/json",
        data: JSON.stringify(queryJson[0]),
        dataType: "json",
        traditional: true,
        success: function (data) {
            console.log(data);
            var data = eval("(" + data + ")");
            FLAG = data.LoginFlag;
            if (FLAG === "0") {
                
                window.model.data.userID = data.userID;
                window.model.ModelToCookie();
            }
            console.log(FLAG);

            //data.LoginFlag
            //0->成功
            //1->用户名不存在
            //2->密码不匹配
        },
        error: function (message) {
            alert("请求查询数据失败！");
        }
    });
    return FLAG;
}

//点击登录动作
function action_login(){
    let psw = $("#login_psw").val();
    let name=$("#login_name").val();
    if (psw == "") {
        alert("请输入用户名！");
        document.getElementById('login_name').focus();
    }
    else if (name == "") {
        alert("请输入密码！");
        document.getElementById('login_psw').focus();
    }
    else if (check_match(psw, name) == "2") {
        alert("用户名与密码不匹配！");
        document.getElementById('login_name').focus();
    }
    else if (check_match(psw, name) == "1") {
        alert("用户名不存在!");
        document.getElementById('login_name').focus();

    }
    else if (check_match(psw, name)=="0") {
        //进入主页
        window.location.replace("http://localhost:54016/Main/Index");
        if ($("#remember_me").is(":checked")) {
            localStorage.setItem('reg_name', name);
            localStorage.setItem('reg_psw', psw);
        }
        else {
            localStorage.setItem('reg_name', "");
            localStorage.setItem('reg_psw', "");
        }
    }
    else { alert("未知错误");}

}
var userID;

window.onload = function () {
    
    window.model.CookieToModel();
    console.log(window.model);
    userID = window.model.data.userID;
    console.log(userID)
    if (window.model.data !== null && window.model.data.userID !== "") {
        window.model.data.userID = "";
        window.model.ModelToCookie();
        window.location.replace('http://localhost:54016/Main/Index');
    }
    

    document.getElementById('login_psw').value = localStorage.getItem('reg_psw');
    document.getElementById('login_name').value = localStorage.getItem('reg_name');
   

}
