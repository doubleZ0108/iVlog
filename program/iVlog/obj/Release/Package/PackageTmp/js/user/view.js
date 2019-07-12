
$.ajax({
    url: "../../js/user/user_info.json",//json文件位置
    type: "GET",//请求方式为get
    dataType: "json", //返回数据格式为json
    success: function(data) {//请求成功完成后要执行的方法
        data.video_info_list.forEach(function (item, index) {
            let vID = window.btoa(v.video_id);
            var newLife=document.createElement('div');
            $$('#lifeList').insertBefore(newLife,$$('#lifeList').firstChild);
            $$('#lifeList').firstChild.innerHTML=['<div class="box">\n' +
    '                    <div class="delete">\n' +
    '                        <button>删除</button>\n' +
    '                    </div>\n' +
    '                    <div class="row">\n' +
    '                        <div class="col-lg-3">\n' +
    '                            <div class="side">\n' +
    '                                <div class="day"><p>'+item.upload_time.day+'</p></div>\n'+
    '                                <div>\n' +
    '                                    <div>\n' +
    '                                        <div class="month"><p>'+item.upload_time.year+'</p></div>\n' +
            '                                        <div class="year"><p>'+item.upload_time.month+'</p></div>\n' +
    '                                        <div class="time"><p>'+item.upload_time.hours_minute_second+'</p></div>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <div class="content">\n' +
    '                                <div class="description"><p dir="ltr">尼玛的，为什么🐶</p></div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div class="col-lg-9">\n' +
    '                            <div class="hovereffect">\n' +
    '                                <img class="img-responsive" src="'+item.cover+'" alt="">\n' +
    '                                <div class="overlay">\n' +
    '                                    <h2>题目</h2>\n' +
                '                                    <a class="info" href="' + 'http://localhost:54016/Video/Index?videoID=' + vID +'">►</a>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div class="tag-link">\n' +
    '                        <div class="tag">\n' +
    '                            <ul>\n' +

    '                            </ul>\n' +
    '                        </div>\n' +
    '                        <div class="link">\n' +
    '                            <a href="#">热度(1444)</a>\n' +
    '                            <a href="#">点赞(666)</a>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>'
    ];


            $All('#lifeList .box h2')[0].innerHTML=item.title;
    $All('#lifeList .box .description p')[0].innerHTML=item.description;
   item.tags.forEach(function(tit,tix)
            {
                var aTag = document.createElement('li');
                $All('#lifeList .tag ul')[0].appendChild(aTag);
                aTag.innerHTML='🏷️'+tit.tag_name;
            });
    $All('#lifeList .box .link a')[index].innerHTML='热度('+item.play_num+')';
    $SON($All('#lifeList .box .link')[0],'a')[1].innerHTML='点赞('+item.likes_num+')';

    $('.delete button').click(function (ev) {
        var obj = ev.srcElement ? ev.srcElement : ev.target;
        $$('#lifeList').removeChild(obj.parentElement.parentElement.parentElement);
    })





})

    }
})



