var $$ = function(sel) {
    return document.querySelector(sel);
};
var $All = function(sel) {
    return document.querySelectorAll(sel);
};
var $SON = function(father, son) {
    return father.querySelectorAll(son);
};

function getTop(e){
    var offset=e.offsetTop;
    if(e.offsetParent!=null) offset+=getTop(e.offsetParent);
    return offset;
}
function getLeft(e){
    var offset=e.offsetLeft;
    if(e.offsetParent!=null) offset+=getLeft(e.offsetParent);
    return offset;
}

var makeArray = function(likeArray) {
    var array = [];
    for (var i = 0; i < likeArray.length; ++i) {
        array.push(likeArray[i]);
    }
    return array;
};

var is_slide = false;

var play_num_ranking=[
    {
        /*
        rank: int
        title: 视频标题
        img: 视频图片地址
        play: 观看次数
         */
        'rank': '1',
        'title': "播放次数测试视频",
        'img': 'img/main/photo.jpg',
        'play': '999',
    }
];

var like_num_ranking=[
    {
        /*
        rank: int
        title: 视频标题
        img: 视频图片地址
        like: 点赞次数
         */
        'rank': '1',
        'title': "点赞次数测试视频",
        'img': 'img/main/photo6.jpg',
        'like': '666',
    }
];
var is_chose = false;
var line_hide = false;
var is_sorting = false;
var userID;
window.onload = function () {

    window.model.CookieToModel();
    userID = window.model.data.userID;

    let user_id = "100020";
    var queryJson = [];
    var row = {};
    row.user_id = user_id;
    queryJson.push(row);

    $.ajax({
        url: "/Main/Index",
        async: false,
        type: 'post',
        contentType: "application/json",
        data: JSON.stringify(queryJson[0]),
        dataType: "json",
        traditional: true,
        success: function (data) {
            console.log(data);
            var data = eval("(" + data + ")");
            console.log(data);
            play_num_ranking = data.play_num_ranking;
            like_num_ranking = data.like_num_ranking;

        },
        error: function (message) {
            alert("请求查询数据失败！");
        }
    });


    $("#quanbufenqu_line").width($("#quanbufenqu").width());
    $("#zhongyi_line").width($("#zhongyi").width());
    $("#shujuku_line").width($("#shujuku").width());
    $("#guqin_line").width($("#guqin").width());
    $("#qita_line").width($("#qita").width());
    $("#remen_line").width($("#remen").width());
    $(".picScroll-left").slide({
        titCell:".hd ul",mainCell:".bd ul",autoPage:true,delayTime:500,interTime:2500,effect:"left",autoPlay:true,vis:4,trigger:"click"});
    $(".picScroll-right").slide({
        titCell:".hd ul",mainCell:".bd ul",autoPage:true,delayTime:500,interTime:1500,effect:"leftLoop",autoPlay:true,vis:4,trigger:"click"});


    function go_to_head(){
        $("html, body").animate({
            scrollTop: $("#slider-container").offset().top
        }, {duration: 300, easing: "swing"});
        $$('.report-wrap-module.elevator-module').style.display = "none";
        $$('.left').style.display = "none";
        is_home = true;
        is_change = true;
        setTimeout(function () {
            is_change = false;
        },500);
        if (rank_show) {
            $('.main').animate({marginLeft: '10%'}, 400);
            $('.show').animate({right: '-22%'}, 500);
            $('.left').animate({right: '1%', opacity: '0.4'}, 500);
            $('.report-wrap-module.elevator-module').animate({opacity: '1'}, 400);
            rank_show = false;
        }
        if (is_sorting) {
            $$('.nav-bg').className = "nav-bg";
            $$('.elevator-mask').style.display = 'none';
            $$('#zone-all-item').className = "item";
            $$('.back-top').id = "";
            $('.left').animate({opacity: '0.4'}, 300);
            is_sorting = false;
        }
    }

    $$('.go-to-head').addEventListener('click', go_to_head);



    var move = $$('.move');
    move.style.visibility = 'hidden';
    $("#zone-all-item").click(function() {
        if(!is_sorting){
            $("html, body").animate({
                scrollTop: $("#zone-all").offset().top }, {duration: 500,easing: "swing"});
            return false;
        }

    });
    $("#zone-one-item").click(function() {
        if(!is_sorting){
            $("html, body").animate({
                scrollTop: $("#zone-one").offset().top }, {duration: 500,easing: "swing"});
            return false;
        }

    });
    $("#zone-two-item").click(function() {
        if(!is_sorting){
            $("html, body").animate({
                scrollTop: $("#zone-two").offset().top }, {duration: 500,easing: "swing"});
            return false;
        }

    });
    $("#zone-three-item").click(function() {
        if(!is_sorting){
            $("html, body").animate({
                scrollTop: $("#zone-three").offset().top }, {duration: 500,easing: "swing"});
            return false;
        }

    });
    $("#zone-four-item").click(function() {
        if(!is_sorting){
            $("html, body").animate({
                scrollTop: $("#zone-four").offset().top }, {duration: 500,easing: "swing"});
            return false;
        }

    });


    $$('.item.customize').addEventListener('click', function (ev) {
        if(!is_sorting){
            $$('.nav-bg').className = "nav-bg open";
            $$('.elevator-mask').style.display = '';
            $$('#zone-all-item').className = "item sort-disabled";
            $$('.back-top').id = "back-top-disabled";
            $('.left').animate({opacity:'0'}, 300);
            is_sorting = true;
        }
        else{
            $$('.nav-bg').className = "nav-bg";
            $$('.elevator-mask').style.display = 'none';
            $$('#zone-all-item').className = "item";
            $$('.back-top').id = "";
            $('.left').animate({opacity:'0.4'}, 300);
            is_sorting = false;
        }
    });

    $$('.elevator-mask').addEventListener('click', function (ev) {
        if(is_sorting){
            $$('.nav-bg').className = "nav-bg";
            $$('.elevator-mask').style.display = 'none';
            $$('#zone-all-item').className = "item";
            $$('.back-top').id = "";
            $('.left').animate({opacity:'0.4'}, 300);
            is_sorting = false;
        }
    });





    var isDrop = false;
    var original_x, original_y;
    var sorting_id;
    var old_x, old_y;
    makeArray($All('.item.sortable')).forEach(function (item) {
        item.addEventListener('mousedown', function (e) {
            if(is_sorting){
                var obj = e.srcElement ? e.srcElement : e.target;
                e = e || window.event;//要用event这个对象来获取鼠标的位置
                original_x = e.clientX - obj.offsetLeft;
                original_y = e.clientY - obj.offsetTop;
                old_x = original_x;
                old_y = original_y;
                isDrop = true;//设为true表示可以移动
                sorting_id = obj.id;
            }

        });


    });

    document.addEventListener('mousemove', function (ev) {
        if(isDrop){
            var sorting_item = $$('#'+sorting_id);
            if(move.style.visibility === 'hidden'){
                var _style = sorting_item.style;
                move.style.visibility = 'visible';
                move.style.left = _style.left;
                move.style.top = _style.top;
                move.style.visibility = 'visible';
                sorting_item.className = "item sortable sorting";
                move.innerHTML = sorting_item.innerHTML;
            }
            ev = ev || window.event;
            var style = move.style;
            var top =
                parseFloat(style.top || 0) + (ev.clientY - old_y) + "px";
            old_x = ev.clientX;
            old_y = ev.clientY;

            makeArray($All('.item.sortable')).forEach(function (t) {
                if(t.id !== "move" && sorting_item !== t){
                    if(move.offsetTop-t.offsetTop<=15 && move.offsetTop-t.offsetTop >= -15){
                        var t_id="";
                        var st_id = "";
                        for(var i=0; i< sorting_item.id.length-5;i++){
                            st_id+=sorting_item.id[i];
                        }
                        for(var i=0; i< t.id.length-5;i++){
                            t_id+=t.id[i];
                        }
                        if(sorting_item.offsetTop<t.offsetTop){

                            $("#"+t.id).after($("#"+sorting_item.id));
                            $("#"+t_id).after($("#"+st_id));
                        }
                        else{
                            $("#"+sorting_item.id).after($("#"+t.id));
                            $("#"+st_id).after($("#"+t_id));
                        }
                    }
                }
            });

            style.top = top;
        }
    });

    document.addEventListener('mouseup', function (ev) {
        if(isDrop){
            var sorting_item = $$('#'+sorting_id);
            isDrop = false;
            sorting_item.className = "item sortable";
            move.style.visibility = 'hidden';
        }
    });








    $$('.back-top').addEventListener('click', function (ev) {
        if(!is_sorting){
            $('.nav-list').slideToggle('slow');
            if(!line_hide){
                line_hide = true;
                $('.s-line').fadeOut(500);
                $$('.back-top.icon').className = "back-top up icon";
            }
            else{
                line_hide = false;
                $('.s-line').fadeIn(500);
                $$('.back-top.icon').className = "back-top icon";
            }
        }

    });

    $$('.left').style.top = window.outerHeight*0.4+'px';
    $$('.left-icon').addEventListener('click', function (ev) {
        if(!is_slide && !is_home){
            is_slide = true;
            $('.main').animate({marginLeft: '5px'}, 500);
            $('.show').animate({right: '1%'}, 400);
            $('.left').animate({right: '18%', opacity:'0'}, 400);
            $('.report-wrap-module.elevator-module').animate({opacity:'0'}, 400);
            rank_show = true;
            setTimeout(function () {
                is_slide = false;
            },500);
        }
    });

    var rank_show = false;
    var is_home = true;
    var is_change = false;
    document.body.addEventListener('mousewheel', function (ev) {
        //左滑
        if(!is_sorting){
            console.log(ev.deltaX);
            if(ev.deltaX>150){
                if(!is_slide && !is_home){
                    is_slide = true;
                    $('.main').animate({marginLeft: '5px'}, 500);
                    $('.show').animate({right: '1%'}, 400);
                    $('.left').animate({right: '18%', opacity:'0'}, 400);
                    $('.report-wrap-module.elevator-module').animate({opacity:'0'}, 400);
                    rank_show = true;
                    setTimeout(function () {
                        is_slide = false;
                    },500);
                }

            }
            if(ev.deltaX<-150){
                if(!is_slide && !is_home){
                    is_slide = true;
                    $('.main').animate({marginLeft: '10%'}, 400);
                    $('.show').animate({right: '-22%'}, 500);
                    $('.left').animate({right: '1%', opacity:'0.4'}, 500);
                    $('.report-wrap-module.elevator-module').animate({opacity:'1'}, 400);
                    rank_show = false;
                    setTimeout(function () {
                        is_slide = false;
                    },500);
                }
            }
        }

        if(ev.deltaY!==0 && !is_change) {
            var scroll_top = 0;
            if (document.documentElement && document.documentElement.scrollTop) {
                scroll_top = document.documentElement.scrollTop;
            }
            else if (document.body) {
                scroll_top = document.body.scrollTop;
            }
            if (is_home) {
                if (ev.deltaY > 0) {
                    if (!is_change) {
                        $("html, body").animate({
                            scrollTop: $("#zone-all").offset().top
                        }, {duration: 300, easing: "swing"});
                        $$('.report-wrap-module.elevator-module').style.display = "";
                        $$('.left').style.display = "";
                        is_home = false;
                        is_change = true;
                        setTimeout(function () {
                            is_change = false;
                        },500)
                    }

                }
            }
            else {
                if (ev.deltaY < 0 && scroll_top < $$('#slider-container').offsetHeight*0.8) {
                    if (!is_change) {
                        $("html, body").animate({
                            scrollTop: $("#slider-container").offset().top
                        }, {duration: 300, easing: "swing"});
                        $$('.report-wrap-module.elevator-module').style.display = "none";
                        $$('.left').style.display = "none";
                        is_home = true;
                        is_change = true;
                        setTimeout(function () {
                            is_change = false;
                        },500);
                        if (rank_show) {
                            $('.main').animate({marginLeft: '10%'}, 400);
                            $('.show').animate({right: '-22%'}, 500);
                            $('.left').animate({right: '1%', opacity: '0.4'}, 500);
                            $('.report-wrap-module.elevator-module').animate({opacity: '1'}, 400);
                            rank_show = false;
                        }
                        if (is_sorting) {
                            $$('.nav-bg').className = "nav-bg";
                            $$('.elevator-mask').style.display = 'none';
                            $$('#zone-all-item').className = "item";
                            $$('.back-top').id = "";
                            $('.left').animate({opacity: '0.4'}, 300);
                            is_sorting = false;
                        }
                    }
                }
            }
        }

    });
    $$('.rank-list.hot').innerHTML = "";
    play_num_ranking.forEach(function (pr) {
        var rank_item = document.createElement('li');
        if(pr.rank===1){
            rank_item.setAttribute('class','rank-item  show-detail first highlight');
        }
        else if(pr.rank===8){
            rank_item.setAttribute('class','rank-item  show-detail last');
        }
        else if(pr.rank<=3)
        {
            rank_item.setAttribute('class','rank-item  show-detail highlight');
        }
        else{
            rank_item.setAttribute('class','rank-item  show-detail');
        }
        rank_item.innerHTML = [
            '<i class="ri-num">'+pr.rank+'</i>',
            '<a href="" target="_blank" title="'+pr.title+'" class="ri-info-wrap clearfix">',
            '   <div class="lazy-img ri-preview">',
            '       <img alt="666" src="'+pr.img+'">',
            '   </div>',
            '   <div class="ri-detail">',
            '      <p class="ri-title">'+pr.title+'</p>',
            '      <p class="ri-point">观看数：'+pr.play+'</p>',
            '   </div>',
            '</a>'
        ].join('');
        $$('.rank-list.hot').appendChild(rank_item);
    });
    $$('.rank-list.like').innerHTML = "";

    like_num_ranking.forEach(function (pr) {
        var rank_item = document.createElement('li');
        if(pr.rank===1){
            rank_item.setAttribute('class','rank-item  show-detail first highlight');
        }
        else if(pr.rank===8){
            rank_item.setAttribute('class','rank-item  show-detail last');
        }
        else if(pr.rank<=3)
        {
            rank_item.setAttribute('class','rank-item  show-detail highlight');
        }
        else{
            rank_item.setAttribute('class','rank-item  show-detail');
        }
        rank_item.innerHTML = [
            '<i class="ri-num">'+pr.rank+'</i>',
            '<a href="" target="_blank" title="'+pr.title+'" class="ri-info-wrap clearfix">',
            '   <div class="lazy-img ri-preview">',
            '       <img alt="666" src="'+pr.img+'">',
            '   </div>',
            '   <div class="ri-detail">',
            '      <p class="ri-title">'+pr.title+'</p>',
            '      <p class="ri-point">点赞数：'+pr.like+'</p>',
            '   </div>',
            '</a>'
        ].join('');
        $$('.rank-list.like').appendChild(rank_item);
    });
    makeArray($All('.bili-tab-item')).forEach(function (t) {
        t.addEventListener('mouseover', function (ev) {
            var obj = ev.srcElement ? ev.srcElement : ev.target;
            if(obj.className !== "bili-tab-item on"){
                makeArray($All('.bili-tab-item')).forEach(function (tt) {
                    tt.className = "bili-tab-item"
                });
                obj.className = "bili-tab-item on";
                if(obj.innerHTML === '按播放量') {
                    if(!is_chose){
                        is_chose = true;
                        $('.rank-list.hot').animate({left:'0'}, 300);
                        $('.rank-list.like').animate({left:'0'}, 300);

                        setTimeout(function () {
                            is_chose = false;
                        },300);
                    }

                }
                else{
                    if(!is_chose){
                        is_chose = true;
                        $('.rank-list.hot').animate({left:'-345'}, 300);
                        $('.rank-list.like').animate({left:'-345'}, 300);

                        setTimeout(function () {
                            is_chose = false;
                        },300);
                    }

                }
            }
        })
    });


};

