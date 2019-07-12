var $$ = function(sel) {
    return document.querySelector(sel);
};
var $All = function(sel) {
    return document.querySelectorAll(sel);
};
var $SON = function(father, son) {
    return father.querySelectorAll(son);
};





$.ajax({

    url: "user_info.json",
    type: "GET",
    dataType: "json",
    success: function (data) {
        var obj = data;
        alert(hhhh);
    }
});











$$('#lifeList').innerHTML=[
    '<div class="box">\n' +
    '                <div class="row">\n' +
    '\n' +
    '                    <div class="col-lg-3">\n' +
    '                        <div class="side">\n' +
    '                            <div class="day"><a href="#">16</a></div>\n' +
    '                            <div class="month"><a href="#">05</a></div>\n' +
    '                        </div>\n' +
    '                        <div>\n' +
    '                            <div class="content">\n' +
    '\n' +
    '                                <div class="description"><p dir="ltr">尼玛的，为什么🐶</p></div>\n' +
    '                            </div>\n' +
    '                            <div class="tag">\n' +
    '                                <a href="#">#balabala</a>\n' +
    '                            </div>\n' +
    '\n' +
    '                            <div class="link">\n' +
    '                                <a href="#">热度(1444)</a>\n' +
    '                                <a href="#">点赞(666)</a>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div class="col-lg-9"  >\n' +
    '\n' +
    '                        <div class="hovereffect">\n' +
    '\n' +
    '                            <img class="img-responsive" src="img/user/history.jpg" alt="">\n' +
    '\n' +
    '                            <div class="overlay">\n' +
    '                                <h2>题目</h2>\n' +
    '                                <a class="info" href="#">►</a>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '\n' +
    '                    </div>\n' +
    '\n' +
    '                </div>\n' +
    '            </div>'
]







$All('#lifeList .box h2')[0].innerHTML='新题目';
$All('#lifeList .box .description p')[0].innerHTML='新描述';
$All('#lifeList .box .tag a')[0].innerHTML='🏷️';
$All('#lifeList .box .side')[0].innerHTML='时间';
$All('#lifeList .box .link a')[0].innerHTML='热度(999)';
$SON($All('#lifeList .box .link')[0],'a')[1].innerHTML='点赞(222)';


