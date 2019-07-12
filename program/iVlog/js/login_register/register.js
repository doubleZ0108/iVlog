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

window.onload = function(){
  var oInput = document.getElementById('psw');
  oInput.value = '';
  var spans = document.getElementsByTagName('span');
  oInput.onkeyup = function(){
    //强度状态设为默认
    spans[0].className = spans[1].className = spans[2].className = "default";
    var pwd = this.value;
    var result = 0;
    for(var i = 0, len = pwd.length; i < len; ++i){
      result |= charType(pwd.charCodeAt(i));
    }
    var level = 0;
    //对result进行四次循环，计算其level
    for(var i = 0; i <= 4; i++){
      if(result & 1){
        level ++;
      }
      //右移一位
      result = result >>> 1;
    }
    if(pwd.length >= 1){
      switch (level) {
        case 1:
          spans[0].className = "weak";
          break;
        case 2:
          spans[0].className = "medium";
          spans[1].className = "medium";
          break;
        case 3:
        case 4:
          spans[0].className = "strong";
          spans[1].className = "strong";
          spans[2].className = "strong";
          break;
      }
    }
  }
}
/*
  定义一个函数，对给定的数分为四类(判断密码类型)，返回十进制1，2，4，8
  数字 0001 -->1 48~57
  小写字母 0010 -->2 97~122
  大写字母 0100 -->4 65~90
  特殊 1000 --> 8 其它
*/
function charType(num){
  if(num >= 48 && num <= 57){
    return 1;
  }
  if (num >= 97 && num <= 122) {
    return 2;
  }
  if (num >= 65 && num <= 90) {
    return 4;
  }
  return 8;
}

function isValidUsername(str){
  reg = /^[0-9a-zA-Z|_]{3,20}$/g;
  return reg.test(str);
}

function check_name()
{
  let name = $("#name").val();
  if(name.length!=0){
    if(name.length<4){
      alert("请输入长度至少为4的用户名！");
      document.getElementById('name').value = "";
      document.getElementById('name').focus();
    }
    else if(name.length>20){
      alert("请输入长度不超过20的用户名！");
      document.getElementById('name').value = "";
      document.getElementById('name').focus();
    }
    else if(!isValidUsername(name)){
      alert("用户名只允许字母、数字和下划线！");
      document.getElementById('name').value = "";
      document.getElementById('name').focus();
    }
  }
}
document.getElementById("name").addEventListener("blur", check_name,true);

// function check_name_login()
// {
//   let name = $("#login_name").val();
//   if(name.length!=0){
//     if(!isValidUsername(name)){
//       alert("用户名包含非法字符！");
//       document.getElementById('login_name').value = "";
//       document.getElementById('login_name').focus();
//     }
//   }
// }
// document.getElementById("login_name").addEventListener("blur", check_name_login,true);


function isValidPassword(str){
  reg = /^[0-9a-zA-Z|_]{5,20}$/g;
  return reg.test(str);
}

function check_psw()
{
  let name = $("#psw").val();
  if(name.length!=0){
    if(name.length<6){
      alert("请输入长度至少为6的密码！");
      document.getElementById('psw').value = "";
      document.getElementById('psw').focus();
    }
    else if(name.length>20){
      alert("请输入长度不超过20的密码！");
      document.getElementById('psw').value = "";
      document.getElementById('psw').focus();
    }
    else if(!isValidPassword(name)){
      alert("密码只允许字母、数字和下划线！");
      document.getElementById('psw').value = "";
      document.getElementById('psw').focus();
    }
  }
}
document.getElementById("psw").addEventListener("blur", check_psw,true);

// function check_psw_login()
// {
//   let name = $("#login_psw").val();
//   if(name.length!=0){
//     if(!isValidPassword(name)){
//       alert("密码包含了非法字符！");
//       document.getElementById('login_psw').value = "";
//       document.getElementById('login_psw').focus();
//     }
//   }
// }
// document.getElementById("login_psw").addEventListener("blur", check_psw_login,true);

function check_consistency()
{
  let val = $("#psw").val();
  let val2 = $("#check_psw").val();
  if(val!=val2 && val.length!=0 && val.length!=0) {
    alert("两次输入密码不一致!");
    document.getElementById('psw').value = "";
    document.getElementById('check_psw').value = "";
    document.getElementById('psw').focus();
  }
}
document.getElementById("check_psw").addEventListener("blur", check_consistency,true);

