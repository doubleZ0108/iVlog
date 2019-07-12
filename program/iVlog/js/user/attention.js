
function postUID(i) {
    alert(i);
}

function postUID2(i) {
    alert(i);
}

$.ajax({
    url: "js/user/attention_info.json",//json文件位置
    type: "GET",//请求方式为get
    dataType: "json", //返回数据格式为json
    success: function(data) {//请求成功完成后要执行的方法
        data.Followed_user_info.forEach(function (item, index) {
            var newFollower = document.createElement('div');
            $$('#FollowList').insertBefore(newFollower, $$('#FollowList').firstChild);
            $$('#FollowList').firstChild.innerHTML = ['   <div class="box idcard">\n' +
            '                <div class="row">\n' +
            '\n' +
            '                <div class="col-lg-2">\n' +
            '\n' +
            '                    <div class="hoverEffect2">\n' +
            '                        <img  class="img-circle img-responsive center-block profile" src="img/user/profile.jpeg" alt="头像"/>\n' +
            '                        <div class="divright"></div>\n' +
            '                    </div>\n' +
            '\n' +
            '                </div>\n' +
            '                    <div class="col-lg-6">\n' +
            '                        <h4 class="idcard-name">' + item.name + '</h4>\n' +
            '                        <button class="idcard-follow following">取关</button>\n' +
            '                        <p class="idcard-sign">' + item.signature + '</p>\n' +
            '\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '                </div>'
            ];

            $$('#FollowList').firstElementChild.querySelector('button').addEventListener('click', postUID.bind(this,item));
            $$('#FollowList').firstElementChild.querySelector('img').addEventListener('click', postUID2.bind(this,item));

            $$('#FollowList').firstElementChild.querySelector('button').addEventListener('click', function (ev) {
                var obj = ev.srcElement ? ev.srcElement : ev.target;
                console.log(obj.parentElement.parentElement.parentElement);
                (obj.parentElement.parentElement.parentElement).remove();
            })
            if(item.message_count===0)
            {
                $$('#FollowList').firstElementChild.querySelector('.divright').remove();
            }



        })







    }



        })
