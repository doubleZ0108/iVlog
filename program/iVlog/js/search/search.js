function BF_Optimize(sourceStr, searchStr){
    var mainLength = sourceStr.length;
    var searchLength = searchStr.length;
    var padding = mainLength - searchLength;
    for(var offset = 0; offset<=padding; offset++){
        var match = true;
        for(var i =0; i < searchLength; i++){
            if(searchStr.charAt(i) !== sourceStr.charAt((offset+i))){
                match = false;
                break;
            }
        }
        if(match) return offset;
    }
}


var $$ = function(sel) {
    return document.querySelector(sel);
};
var $All = function(sel) {
    return document.querySelectorAll(sel);
};
var $SON = function(father, son) {
    return father.querySelectorAll(son);
};
var makeArray = function(likeArray) {
    var array = [];
    for (var i = 0; i < likeArray.length; ++i) {
        array.push(likeArray[i]);
    }
    return array;
};

var reverseArray = function (array) {
    var reversed = [];
    for (var i = array.length - 1; i >=0 ; --i) {
        reversed.push(array[i]);
    }
    return reversed;
};

var appendArray = function (array1, array2) {
    var appended = array1;
    for (var i = 0 ; i <=array2.length - 1 ; ++i) {
        appended.push(array2[i]);
    }
    return appended;
};
var keyword = "";

var is_show = false;
var showTime = 0;
var is_input = false;
var history_record = [];
var is_h = 0;
var now_index = 1;

var video_list = [
    /*
    video{
        link: string 链接
        title: string 标题
        img: 图片链接
        time: 时长，可能用不上
        tags：[string] 标签（数组）
        description: string 描述
        watch_time: int 观看次数
        like: int 点赞数
        upload_time: xxxx-xx-xx(string) 上传时间
        up_name: string 上传者姓名
        section: string 分区
    }
     */

];

var user_list = [
    /*
    user{
        link: 主页链接
        name: 昵称
        img: 头像连接
        description: 个人简介
        work_count: 稿件数
        fans_count: 粉丝数
        follow_count: 关注数
    }
     */
];



var show_video=[];
var show_user=[];
var sort_state = "video matrix";
var copy_video=[];
var show_state = "video";


function refresh_show(){
    var show=[];
    $$('.pages').innerHTML = "";
    if(show_state === 'video'){
        if(show_video.length>9){
            for(var i=(now_index-1)*9; i<now_index*9 && i<show_video.length; i++){
                show.push(show_video[i]);
            }

            if(parseInt(now_index)!==1){
                var p = document.createElement('li');
                p.setAttribute('class', "page-item prev");
                p.innerHTML='<button class="nav-btn iconfont icon-arrowdown2">上一页</button>';
                $$('.pages').appendChild(p);
            }
            for(var j=1; j<=parseInt((show_video.length-1)/9+1); j++){
                var pp = document.createElement('li');
                if(j===parseInt(now_index))pp.setAttribute('class', "page-item active");
                else pp.setAttribute('class', "page-item");
                pp.innerHTML='<button class="pagination-btn num-btn">'+j+'</button>';
                $$('.pages').appendChild(pp);
            }
            if(parseInt(now_index) !==parseInt((show_video.length-1)/9+1)){
                var ppp = document.createElement('li');
                ppp.setAttribute('class', "page-item next");
                ppp.innerHTML='<button class="nav-btn iconfont icon-arrowdown2">下一页</button>';
                $$('.pages').appendChild(ppp);
            }

            var pages = makeArray($All('.page-item'));
            pages.forEach(function (p) {
                p.addEventListener('click', function (ev) {
                    var obj = ev.srcElement ? ev.srcElement : ev.target;

                    if(obj.className[0]==='n'||obj.className[3]==='i'){
                        obj = obj.parentElement;
                    }
                    $('.result-wrap').fadeOut(100);
                    setTimeout(function () {
                        $('.result-wrap').fadeIn(500);
                        makeArray($All('.page-item')).forEach(function (pp) {
                            if(pp.className === "page-item active"){
                                pp.className = "page-item";
                            }
                        });
                        if(obj.className === "page-item next"){
                            now_index++;
                        }
                        else if(obj.className === "page-item prev"){
                            now_index--;
                        }
                        else{
                            now_index = obj.firstElementChild.innerHTML;
                        }

                        makeArray($All('.page-item')).forEach(function (pp) {
                            if(parseInt(pp.firstElementChild.innerHTML) === now_index){
                                pp.className = "page-item active";
                            }
                        });
                        refresh_show();
                    }, 100);


                })
            });
        }
        else show = show_video;
        $$(".video-contain").innerHTML = "";
        if(show_video.length===0){
            $$(".video-contain").innerHTML=[
                '<div class="error-wrap error-0"><p class="text">',
                '   没有相关数据',
                '</p><!----></div>'
            ].join('');
        }
        show.forEach(function (v) {
            var _video = document.createElement('li');
            var v_title = [];
            var pos = BF_Optimize(v.title, _search_word);
            if(pos!==-1){
                for(var i = 0; i<v.title.length;i++){
                    if(i===pos){
                        v_title+='<em class="suggest_high_light">';
                        v_title+=v.title[i];
                    }
                    else if (i===pos+_search_word.length){
                        v_title+='</em>';
                        v_title+=v.title[i];
                    }
                    else{
                        v_title+=v.title[i];
                    }
                }
            }
        
            let vID = window.btoa(v.video_id);
            
            _video.setAttribute("class", sort_state);
            var result=[
                '<a href="' +'../Video/Index?videoID=' + vID +'" title="'+v.title+'" target="_blank" class="img-anchor">',
                '   <div class="img">',
                '       <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12" style="max-width:100%;width:100%;">',
                '           <div class="hovereffect">',
                '               <div class="lazy-img">',
                '                   <img class="img-responsive" src="'+v.img+'" alt="">',
                '               </div>',
                '               <div class="overlay">',
                //'                   <h2>iVlog</h2>',
                '                   <a class="einfo" href="' +'../Video/Index?videoID=' + vID +'">►</a>',
                '               </div>',
                '           </div>',
                '       </div>',
                '       <span class="mask-video"></span>',
                '   </div><!---->',
                '</a>',
                '<div class="info">',
                '   <div class="headline clearfix singleav">',
                '   <a title="' + v.title + '" href="' + '../Video/Index?videoID=' + vID +'" target="_blank" class="title">'+v_title+'</a>',
                '   <br>',
            ];



            v.tags.forEach(function (t) {
                result.push('   <span class="type hide">'+t+'</span>');
            });
            var result2=[
                '   </div>',
                '   <div class="des hide">',
                '       '+v.description,
                '   </div>',
                '   <div class="tags">',
                '       <span title="观看" class="so-icon watch-num">',
                '           <i class="icon-playtime"></i>',
                '           '+v.watch_time,
                '       </span>',
                '       <span title="弹幕" class="so-icon hide">',
                '           <i class="icon-subtitle"></i>'+v.like,
                '       </span>',
                '       <span title="上传时间" class="so-icon time">',
                '           <i class="icon-date"></i>'+v.upload_time,
                '       </span>',
                '       <span title="up主" class="so-icon">',
                '           <i class="icon-uper"></i>',
                '           <a href="'+v.up_link+'" target="_blank" class="up-name">'+v.up_name+'</a>',
                '       </span>',
                '   </div>',
                '</div>'
            ];
            _video.innerHTML=appendArray(result, result2).join('');
            $$(".video-contain").appendChild(_video);
        });
    }
    else{
        $$('.total-text').innerHTML="共找到"+user_list.length+"个用户";
        if(show_user.length>6){
            for(var i=(now_index-1)*6; i<now_index*6 && i<show_user.length; i++){
                show.push(show_user[i]);
            }

            if(parseInt(now_index)!==1){
                var p = document.createElement('li');
                p.setAttribute('class', "page-item prev");
                p.innerHTML='<button class="nav-btn iconfont icon-arrowdown2">上一页</button>';
                $$('.pages').appendChild(p);
            }
            for(var j=1; j<=parseInt((show_user.length-1)/6+1); j++){
                var pp = document.createElement('li');
                if(j===parseInt(now_index))pp.setAttribute('class', "page-item active");
                else pp.setAttribute('class', "page-item");
                pp.innerHTML='<button class="pagination-btn num-btn">'+j+'</button>';
                $$('.pages').appendChild(pp);
            }
            if(parseInt(now_index) !==parseInt((show_user.length-1)/6+1)){
                var ppp = document.createElement('li');
                ppp.setAttribute('class', "page-item next");
                ppp.innerHTML='<button class="nav-btn iconfont icon-arrowdown2">下一页</button>';
                $$('.pages').appendChild(ppp);
            }

            var pages = makeArray($All('.page-item'));
            pages.forEach(function (p) {
                p.addEventListener('click', function (ev) {
                    var obj = ev.srcElement ? ev.srcElement : ev.target;

                    if(obj.className[0]==='n'||obj.className[3]==='i'){
                        obj = obj.parentElement;
                    }
                    $('.result-wrap').fadeOut(100);
                    setTimeout(function () {
                        $('.result-wrap').fadeIn(500);
                        makeArray($All('.page-item')).forEach(function (pp) {
                            if(pp.className === "page-item active"){
                                pp.className = "page-item";
                            }
                        });
                        if(obj.className === "page-item next"){
                            now_index++;
                        }
                        else if(obj.className === "page-item prev"){
                            now_index--;
                        }
                        else{
                            now_index = obj.firstElementChild.innerHTML;
                        }

                        makeArray($All('.page-item')).forEach(function (pp) {
                            if(parseInt(pp.firstElementChild.innerHTML) === now_index){
                                pp.className = "page-item active";
                            }
                        });
                        refresh_show();
                    }, 100);


                })
            });
        }
        else show = show_user;
        $$(".user-list").innerHTML = "";
        if(show_user.length===0){
            $$(".user-list").innerHTML=[
                '<div class="error-wrap error-0"><p class="text">',
                '   没有相关数据',
                '</p><!----></div>'
            ].join('');
        }
        function follow_or_not(f){
            if(f==="false")return '"> +关注';
            else return ' followed"> 已关注';
        }
        function parseGender(g) {
            if (g === 'True') return 'male';
            else return 'female';
        }
        show.forEach(function (u) {
            var u_title = [];
            var pos = BF_Optimize(u.name, _search_word);
            if(pos!==-1){
                for(var i = 0; i<u.name.length;i++){
                    if(i===pos){
                        u_title+='<em class="suggest_high_light">';
                        u_title+=u.name[i];
                    }
                    else if (i===pos+_search_word.length){
                        u_title+='</em>';
                        u_title+=u.name[i];
                    }
                    else{
                        u_title+=u.name[i];
                    }
                }
            }


            var _user = document.createElement('li');
            _user.setAttribute("class", 'up-item');
            _user.innerHTML=[
                '<div class="up-face">',
                '   <a href="'+u.link+'" title="'+u.name+'" target="_blank" class="face-img">',
                '       <div class="lazy-img">',
                '           <img class="img-responsive" src="'+u.img+'" alt="">',
                '       </div>',
                '   </a>',
                '</div>',
                '<div class="info-wrap">',
                '   <div class="headline"><!---->',
                '       <a href="'+u.link+'" title="'+u.name+'" target="_blank" class="title">'+u_title+'</a>',
                '       <div class="gender">',
                '           <img src="../../img/search/gender_'+parseGender(u.gender)+'.png">',
                '       </div>',
                '       <a class="attention-btn'+ follow_or_not(u.is_followed)+'</a><!---->',
                '   </div>',
                '   <div class="up-info clearfix">',
                '       <span>稿件：'+u.work_count+'</span>',
                '       <span class="follow-count">粉丝：'+u.fans_count+'</span>',
                '       <span>关注：'+u.follow_count+'</span>',
                '   </div>',
                '   <div class="desc">'+u.description+'</div>',
                '</div>'
            ].join('');
            $$(".user-list").appendChild(_user);

        });
        makeArray($All('.attention-btn')).forEach(function (ab) {
            ab.addEventListener('click', function (ev) {
                var obj = ev.srcElement ? ev.srcElement : ev.target;
                if(obj.className === "attention-btn"){
                    obj.className = "attention-btn followed";
                    obj.innerHTML = "已关注";
                    show_user.forEach(function (su) {
                        if(su.name === obj.parentElement.firstElementChild.innerHTML){
                            su.is_followed = "true";
                            refresh_show();
                        }
                    });
                    user_list.forEach(function (su) {
                        if(su.name === obj.parentElement.firstElementChild.innerHTML){
                            su.is_followed = "true";
                            su.follow_count++;
                            refresh_show();
                        }
                    });
                }
                else{

                    obj.className = "attention-btn";
                    obj.innerHTML = "+关注";
                    show_user.forEach(function (su) {
                        if(su.name === obj.parentElement.firstElementChild.innerHTML){
                            su.is_followed = "false";
                            refresh_show();
                        }
                    });
                    user_list.forEach(function (su) {
                        if(su.name === obj.parentElement.firstElementChild.innerHTML){
                            su.is_followed = "false";
                            su.follow_count--;
                            refresh_show();
                        }
                    });
                }
            });
            ab.addEventListener('mousemove', function (ev) {
                var obj = ev.srcElement ? ev.srcElement : ev.target;
                if(obj.className === "attention-btn followed"){
                    obj.innerHTML = "取消关注";

                }
            });
            ab.addEventListener('mouseout', function (ev) {
                var obj = ev.srcElement ? ev.srcElement : ev.target;
                if(obj.className === "attention-btn followed"){
                    obj.innerHTML = "已关注";
                }
            });
        })
    }

}
var hotwords=[];
var keywords=['匹配关键词1','匹配关键词qwe2','匹配关键词36666'];
var is_input_block = false;
var userID;
var search_key="";
var _search_word="";
var time_copy=[];
window.onload = function () {

    window.model.CookieToModel();
    if (window.model.data.userID === "") window.model.data.userID = "100000";
    userID = window.model.data.userID;
    history_record = window.model.data.history;
    search_key = window.model.data.keyword;
    if (search_key !== "") {

        if (show_state === 'video') {
            $$(".video-contain").innerHTML = [
                '<div class="error-wrap error-0 loading"><p class="text">',
                '   加载中...',
                '</p><!----></div>'
            ].join('');
        }
        else {
            $$(".user-list").innerHTML = [
                '<div class="error-wrap error-0 loading"><p class="text">',
                '   加载中...',
                '</p><!----></div>'
            ].join('');
        }

        window.model.data.keyword = "";
        var queryJson = [];
        var row = {};
        row.user_id = userID;
        row.keyword = search_key;
        if (row.keyword==="") row.keyword = "666";
        queryJson.push(row);
        $.ajax({
            url: "/Main/Search",
            async: false,
            type: 'post',
            contentType: "application/json",
            data: JSON.stringify(queryJson[0]),
            dataType: "json",
            traditional: true,
            success: function (data) {
                var data = eval("(" + data + ")");
                user_list = data.user_info;
                video_list = data.video_info;
                _search_word = keyword;
                hotwords = data.top_searched;

                if (video_list.length !== 0) {
                    video_list.forEach(function (v) {
                        var copy = [];
                        v.tags.forEach(function (t) {
                            copy.push(t['tagName']);
                        });
                        v.tags = copy;
                    });
                }


            },
            error: function (message) {
                alert("请求查询数据失败！");
            }
        });

        show_user = user_list;
        show_video = video_list;
        copy_video = video_list;
        refresh_show();
        if (history_record.indexOf(search_key) !== -1) {
            history_record.splice(history_record.indexOf(search_key), 1);
        }
        history_record.push(search_key);
        if (history_record.length > 5) history_record.shift();
        search_key = "";
    }
    else {
        var queryJson = [];
        var row = {};
        row.user_id = userID;
        row.keyword = "111";
        queryJson.push(row);
        $.ajax({
            url: "/Main/Search",
            async: false,
            type: 'post',
            contentType: "application/json",
            data: JSON.stringify(queryJson[0]),
            dataType: "json",
            traditional: true,
            success: function (data) {
                var data = eval("(" + data + ")");
                hotwords = data.top_searched;
            },
            error: function (message) {
                alert("请求查询数据失败！");
            }
        });
    }
    hotwords.forEach(function (hw) {
        var hww = document.createElement('li');
        hww.innerHTML = '<a class="hz-text">' + hw + '</a>';
        $$(".horizontal").appendChild(hww);
    });

    makeArray($All('.hz-text')).forEach(function (hz) {
        hz.addEventListener('click', function (ev) {

            var obj = ev.srcElement ? ev.srcElement : ev.target;
            var queryJson = [];
            var row = {};
            row.user_id = userID;
            row.keyword = obj.innerHTML;
            if (row.keyword==="") row.keyword = "666";
            queryJson.push(row);

            $.ajax({
                url: "/Main/Search",
                async: false,
                type: 'post',
                contentType: "application/json",
                data: JSON.stringify(queryJson[0]),
                dataType: "json",
                traditional: true,
                success: function (data) {

                    var data = eval("(" + data + ")");
                    user_list = data.user_info;
                    video_list = data.video_info;
                    _search_word = keyword;
                    if (video_list.length !== 0) {
                        video_list.forEach(function (v) {
                            var copy = [];
                            v.tags.forEach(function (t) {
                                copy.push(t['tagName']);
                            });
                            v.tags = copy;
                        });
                    }
                },
                error: function (message) {
                    alert("请求查询数据失败！");
                }
            });

            show_user = user_list;
            show_video = video_list;
            copy_video = video_list;
            refresh_show();
            if (history_record.indexOf(search_word.value) !== -1) {
                history_record.splice(history_record.indexOf(search_word.value), 1);
            }
            history_record.push(search_word.value);
            if (history_record.length > 5) history_record.shift();
            refresh_history();
        })
    })







    show_user = user_list;
    show_video = video_list;
    copy_video = video_list;
    refresh_show();
    var search_button = $$(".search-button");
    var search_word = $$("#search-keyword");
    var choices = makeArray($All('.v-switcher-header-item'));
    var test = $$(".search-block");
    var history = $$(".history-wrap");
    //test.setAttribute("style", "display: none;");
    var filters = makeArray($All(".filter-item"));
    var pages = makeArray($All('.page-item'));
    

    var refresh_history = function () {
        window.model.ModelToCookie();
        var result = [
            '<li class="title">',
            '<span>搜索历史</span>',
            '</li>'
        ];
        if (history_record.length === 0) {
            result.push('<li class="vt-text history">无历史记录</li>');
        }
        else {
            history_record.forEach(function (hr) {
                result.push("<li class=\"history-li\">");
                result.push("    <a class=\"vt-text history\">" + hr + "</a>");
                result.push("    <i class=\"clear\"></i>");
                result.push("</li>");
            });
            result.push("<li class=\"clearall\">");
            result.push("    <a>清空搜索历史</a>");
            result.push("</li>");
        }
        history.innerHTML = result.join('');

        makeArray($All('.vt-text.history')).forEach(function (hi) {
            hi.addEventListener('click', function (ev) {
                var obj = ev.srcElement ? ev.srcElement : ev.target;
                var queryJson = [];
                var row = {};
                row.user_id = userID;
                row.keyword = obj.innerHTML;
                if (row.keyword==="") row.keyword = "666";
                queryJson.push(row);

                $.ajax({
                    url: "/Main/Search",
                    async: false,
                    type: 'post',
                    contentType: "application/json",
                    data: JSON.stringify(queryJson[0]),
                    dataType: "json",
                    traditional: true,
                    success: function (data) {

                        var data = eval("(" + data + ")");
                        user_list = data.user_info;
                        video_list = data.video_info;
                        _search_word = keyword;
                        if (video_list.length !== 0) {
                            video_list.forEach(function (v) {
                                var copy = [];
                                v.tags.forEach(function (t) {
                                    copy.push(t['tagName']);
                                });
                                v.tags = copy;
                            });
                        }
                    },
                    error: function (message) {
                        alert("请求查询数据失败！");
                    }
                });

                show_user = user_list;
                show_video = video_list;
                copy_video = video_list;
                refresh_show();
                if (history_record.indexOf(search_word.value) !== -1) {
                    history_record.splice(history_record.indexOf(search_word.value), 1);
                }
                history_record.push(search_word.value);
                if (history_record.length > 5) history_record.shift();
                refresh_history();
            })
        })

        var clears = makeArray($All(".clear"));
        clears.forEach(function (c) {
            c.addEventListener("click", function (ev) {
                var obj = ev.srcElement ? ev.srcElement : ev.target;
                if (history_record.indexOf(obj.parentElement.firstElementChild.innerHTML) !== -1) {
                    history_record.splice(history_record.indexOf(obj.parentElement.firstElementChild.innerHTML), 1);
                }
                is_h = 0;
                refresh_history();
                search_word.focus();
            });
            c.addEventListener('mousedown', function () {
                is_h = 1;
            });
        });
        if ($$('.clearall') !== null) {
            $$('.clearall').addEventListener('click', function () {
                history_record = [];
                is_h = 0;
                refresh_history();
                search_word.focus();

            });
            $$('.clearall').addEventListener('mousedown', function () {
                is_h = 1;
            })
        }


    };



    $$('.input-wrap').addEventListener('mousedown', function (ev) {
        is_input_block = true;
    });
    $$('.input-wrap').addEventListener('mouseup', function (ev) {
        is_input_block = false;
    });
    refresh_history();



    search_button.addEventListener('click', function () {

        let keyword = search_word.value;
        if (keyword === "") {
            alert("搜索结果不能为空");
        }
        else {
            var queryJson = [];
            var row = {};
            row.user_id = userID;
            row.keyword = keyword;
            if (row.keyword==="") row.keyword = "666";
            queryJson.push(row);

            $.ajax({
                url: "/Main/Search",
                async: false,
                type: 'post',
                contentType: "application/json",
                data: JSON.stringify(queryJson[0]),
                dataType: "json",
                traditional: true,
                success: function (data) {

                    var data = eval("(" + data + ")");
                    console.log(data);
                    user_list = data.user_info;
                    video_list = data.video_info;
                    _search_word = keyword;
                    if (video_list.length !== 0) {
                        video_list.forEach(function (v) {
                            var copy = [];
                            v.tags.forEach(function (t) {
                                copy.push(t['tagName']);
                            });
                            v.tags = copy;
                        });
                    }
                },
                error: function (message) {
                    alert("请求查询数据失败！");
                }
            });
        }
        show_user = user_list;
        show_video = video_list;
        copy_video = video_list;
        refresh_show();
        if (history_record.indexOf(search_word.value) !== -1) {
            history_record.splice(history_record.indexOf(search_word.value), 1);
        }
        history_record.push(search_word.value);
        if (history_record.length > 5) history_record.shift();
        refresh_history();




    });

    search_word.addEventListener('blur', function (ev) {
        is_input = false;
        showTime = setTimeout(function () {
            $(".search-block").fadeOut(1000);
            showTime = 0;
            is_show = false;
        }, 200000);
        if (!is_input_block) $$(".suggest-wrap").setAttribute("style", "display: none;");
        if (ev.keyCode !== 13) {
        }
    });
    search_word.addEventListener('click', function (ev) {
        clearTimeout(showTime);
        is_input = true;
        $$(".suggest-wrap").setAttribute("style", "");
        if (ev.keyCode !== 13) {
        }
    });
    search_word.addEventListener('keyup', function (ev) {
        keyword = search_word.value;

        if (keyword === "") {
            $$(".keyword-wrap").setAttribute("style", "display: none;");
            $$(".history-wrap").setAttribute("style", "");
            $$(".hotword-wrap").setAttribute("style", "");
        }
        else {
            $$(".keyword-wrap").setAttribute("style", "");
            $$(".history-wrap").setAttribute("style", "display: none;");
            $$(".hotword-wrap").setAttribute("style", "display: none;");
        }
        $$(".suggest-wrap").setAttribute("style", "");
        if (ev.keyCode === 13) {
            if (!is_input_block) $$(".suggest-wrap").setAttribute("style", "display: none;");
            let keyword = search_word.value;
            if (keyword === "") {
                alert("搜索结果不能为空");
            }
            else {
                if (show_state === 'video') {
                    $$(".video-contain").innerHTML = [
                        '<div class="error-wrap error-0 loading"><p class="text">',
                        '   加载中...',
                        '</p><!----></div>'
                    ].join('');
                }
                else {
                    $$(".user-list").innerHTML = [
                        '<div class="error-wrap error-0 loading"><p class="text">',
                        '   加载中...',
                        '</p><!----></div>'
                    ].join('');
                }
                var queryJson = [];
                var row = {};
                row.user_id = userID;
                row.keyword = keyword;
                if (row.keyword==="") row.keyword = "666";
                queryJson.push(row);

                $.ajax({
                    url: "/Main/Search",
                    async: false,
                    type: 'post',
                    contentType: "application/json",
                    data: JSON.stringify(queryJson[0]),
                    dataType: "json",
                    traditional: true,
                    success: function (data) {
                        var data = eval("(" + data + ")");
                        user_list = data.user_info;
                        video_list = data.video_info;
                        _search_word = keyword;
                        if (video_list.length !== 0) {
                            video_list.forEach(function (v) {
                                var copy = [];
                                v.tags.forEach(function (t) {
                                    copy.push(t['tagName']);
                                });
                                v.tags = copy;
                            });
                        }
                    },
                    error: function (message) {
                        alert("请求查询数据失败！");
                    }
                });
            }
            show_user = user_list;
            show_video = video_list;
            copy_video = video_list;
            refresh_show()
            if (history_record.indexOf(search_word.value) !== -1) {
                history_record.splice(history_record.indexOf(search_word.value), 1);
            }
            history_record.push(search_word.value);
            if (history_record.length > 5) history_record.shift();
            refresh_history();
        }
        else {
            var queryJson = [];
            var row = {};
            row.user_id = userID;
            row.keyword = keyword;
            if (row.keyword==="") row.keyword = "666";
            queryJson.push(row);
            $.ajax({
                url: "/Main/Search",
                async: false,
                type: 'post',
                contentType: "application/json",
                data: JSON.stringify(queryJson[0]),
                dataType: "json",
                traditional: true,
                success: function (data) {

                    keywords = [];
                    var data = eval("(" + data + ")");
                    var _video_list = data.video_info;
                    if (_video_list.length !== 0) {
                        _video_list.forEach(function (v) {
                            keywords.push(v.title);
                        });
                    }

                    $$(".keyword-wrap").innerHTML = "";
                    keywords.forEach(function (kw) {
                        var result = [];
                        var pos = BF_Optimize(kw, keyword);
                        if (pos !== -1) {
                            for (var i = 0; i < kw.length; i++) {
                                if (i === pos) {
                                    result += '<em class="suggest_high_light">';
                                    result += kw[i];
                                } else if (i === pos + keyword.length) {
                                    result += '</em>';
                                    result += kw[i];
                                } else {
                                    result += kw[i];
                                }
                            }
                        }
                        var kww = document.createElement('li');
                        kww.innerHTML = '<a class="vt-text keyword">' + result + '</a>';
                        $$(".keyword-wrap").appendChild(kww);
                    });
                    makeArray($All('.vt-text.keyword')).forEach(function (ki) {
                        ki.addEventListener('click', function (ev) {

                            var obj = ev.srcElement ? ev.srcElement : ev.target;
                            var result_word = "";
                            var count = 0;
                            for (var i = 0; i < obj.innerHTML.length; i++) {
                                console.log(obj.innerHTML[i], i)
                                if (obj.innerHTML[i] === "<") {
                                    if (count === 0) {
                                        i += 30;
                                        count++;
                                    }
                                    else {
                                        i += 4;
                                    }
                                }
                                else {

                                    result_word += obj.innerHTML[i];
                                }
                            }
                            if (result_word.length > 0) {

                            }
                            console.log(result_word);
                            var queryJson = [];
                            var row = {};
                            row.user_id = userID;
                            row.keyword = result_word;
                            if (row.keyword==="") row.keyword = "666";
                            queryJson.push(row);
                            if (result.length > 0) {
                                $.ajax({
                                    url: "/Main/Search",
                                    async: false,
                                    type: 'post',
                                    contentType: "application/json",
                                    data: JSON.stringify(queryJson[0]),
                                    dataType: "json",
                                    traditional: true,
                                    success: function (data) {

                                        var data = eval("(" + data + ")");
                                        user_list = data.user_info;
                                        video_list = data.video_info;
                                        _search_word = keyword;
                                        if (video_list.length !== 0) {
                                            video_list.forEach(function (v) {
                                                var copy = [];
                                                v.tags.forEach(function (t) {
                                                    copy.push(t['tagName']);
                                                });
                                                v.tags = copy;
                                            });
                                        }
                                    },
                                    error: function (message) {
                                        alert("请求查询数据失败！");
                                    }
                                });
                            }
                            

                            show_user = user_list;
                            show_video = video_list;
                            copy_video = video_list;
                            refresh_show();
                            if (history_record.indexOf(search_word.value) !== -1) {
                                history_record.splice(history_record.indexOf(search_word.value), 1);
                            }
                            history_record.push(search_word.value);
                            if (history_record.length > 5) history_record.shift();
                            refresh_history();
                        })
                    })

                },
                error: function (message) {
                    //alert("请求查询数据失败！");
                }
            });

        }

        choices.forEach(function (c) {
            c.addEventListener('click', function (ev) {
                var obj = ev.srcElement ? ev.srcElement : ev.target;
                if (obj.className[0] === 'o' && obj.className[1] === 'n' && obj.className[2] === 'e') {

                    $('.result-wrap').fadeOut(100);
                    show_state = "video";
                    setTimeout(function () {
                        $('.result-wrap').fadeIn(500);
                        $$(".is-active").className = "two";
                        obj.className = "one is-active";
                        $$(".filter-wrap").setAttribute('style', '');
                        $$(".user-wrap").setAttribute('style', 'display: none');
                        $$('.video-contain').setAttribute('style', '');
                        $$(".user-list").setAttribute('style', 'display: none');
                        refresh_show();
                    }, 100);

                }
                else if (obj.className[0] === 't' && obj.className[1] === 'w' && obj.className[2] === 'o') {

                    $('.result-wrap').fadeOut(100);
                    show_state = 'user';
                    setTimeout(function () {
                        $('.result-wrap').fadeIn(500);
                        obj.className = "two is-active";
                        $$(".is-active").className = "one";
                        $$(".filter-wrap").setAttribute('style', 'display: none');
                        $$(".user-wrap").setAttribute('style', '');
                        $$('.video-contain').setAttribute('style', 'display: none');
                        $$(".user-list").setAttribute('style', '');

                        refresh_show();
                    }, 100);

                }
            });
            c.addEventListener('mousemove', function (ev) {
                var obj = ev.srcElement ? ev.srcElement : ev.target;
                if (obj.className[0] === 'o' && obj.className[1] === 'n' && obj.className[2] === 'e') {
                    $$(".v-switcher-header-anchor").setAttribute("style",
                        "width: 200px; transform: translateX(80px); transition-duration: 200ms;");
                }
                else if (obj.className[0] === 't' && obj.className[1] === 'w' && obj.className[2] === 'o') {
                    $$(".v-switcher-header-anchor").setAttribute("style",
                        "width: 200px; transform: translateX(440px); transition-duration: 200ms;");
                }
            });
        });

        document.body.addEventListener('mousemove', function () {
            if (!is_input) {
                if (showTime !== 0) {
                    clearTimeout(showTime);
                }
                $(".search-block").fadeIn(300);
                //test.setAttribute("style", "");
                showTime = setTimeout(function () {
                    $(".search-block").fadeOut(1000);
                    showTime = 0;
                    is_show = false;
                }, 200000);
            }

        });
        document.body.addEventListener('click', function (ev) {
            var obj = ev.srcElement ? ev.srcElement : ev.target;
            while ((obj !== document.body) && (obj !== null && obj.className === null || obj.className === "")) {
                obj = obj.parentElement;
            }
            if (obj === document.body || obj === null || (obj.id !== 'search-keyword' && obj.className !== 'input-wrap'
                && obj.className !== 'suggest-wrap' && obj.className !== 'hotword-wrap'
                && obj.className !== 'horizontal' && obj.className !== 'keyword-wrap'
                && obj.className !== 'vt-text keyword' && obj.className !== 'suggest_high_light'
                && obj.className !== 'history-wrap' && obj.className !== 'history-li'
                && obj.className !== 'vt-text history' && obj.className !== 'history-li'
                && obj.className !== 'hz-text' && obj.className !== 'clear' && obj.className !== 'clearall'
                && obj.className !== 'title')) {
                $$('.suggest-wrap').setAttribute('style', 'display: none;');
            }

        });





        filters.forEach(function (f) {
            f.addEventListener('click', function (ev) {
                var obj = ev.srcElement ? ev.srcElement : ev.target;
                if (obj.className[0] !== "f") obj = obj.parentElement;
                var _filters = makeArray($SON(obj.parentElement, ".filter-item"));
                _filters.forEach(function (ff) {
                    ff.className = "filter-item";
                });
                obj.className = "filter-item active";

                now_index = 1;
                var new_video = [];
                var new_video = [];
                if (obj.parentElement.className === "filter-type clearfix tids_1") {
                    if ($$('.duration .filter-item.active').innerHTML !== "全部时间") {
                        makeArray($All(".duration .filter-item")).forEach(function (tid) {
                            tid.className = "filter-item";
                        });
                        $$('#all-time').className = "filter-item active";
                    }
                    if ($$('.order .filter-item.active').innerHTML !== "默认排序") {
                        makeArray($All(".order .filter-item")).forEach(function (tid) {
                            tid.className = "filter-item";
                        });
                        $$('#default-sort').className = "filter-item active";
                    }

                    $('.result-wrap').fadeOut(100);
                    setTimeout(function () {
                        video_list.forEach(function (v) {
                            if (v.section === obj.firstElementChild.innerHTML || obj.firstElementChild.innerHTML === '全部分区') {
                                new_video.push(v);
                            }
                        });
                        copy_video = new_video;
                        $('.result-wrap').fadeIn(500);
                        show_video = new_video;
                        refresh_show();
                    }, 100);


                }
                else if (obj.parentElement.className === "filter-type clearfix order") {
                    show_video.forEach(function (v) {
                        new_video.push(v);
                    });
                    if (obj.firstElementChild.innerHTML === "最多播放") {
                        new_video.sort(function (prev, after) {
                            if (parseInt(prev.watch_time) < parseInt(after.watch_time))
                                return 1;  //返回大于0，则prev与after交换
                            else if (parseInt(prev.watch_time) === parseInt(after.watch_time))
                                return 0;  //0 ，则相等,不交换
                            else
                                return -1; //返回小于0，不交换
                        });
                    }
                    else if (obj.firstElementChild.innerHTML === "最新发布") {
                        new_video.sort(function (prev, after) {
                            if (prev.upload_time < after.upload_time)
                                return 1;  //返回大于0，则prev与after交换
                            else if (prev.upload_time === after.upload_time)
                                return 0;  //0 ，则相等,不交换
                            else
                                return -1; //返回小于0，不交换
                        });
                    }

                    else if (obj.firstElementChild.innerHTML === "最多点赞") {
                        new_video.sort(function (prev, after) {
                            if (parseInt(prev.like) < parseInt(after.like))
                                return 1;  //返回大于0，则prev与after交换
                            else if (parseInt(prev.like) === parseInt(after.like))
                                return 0;  //0 ，则相等,不交换
                            else
                                return -1; //返回小于0，不交换
                        });
                    }
                    else if (obj.firstElementChild.innerHTML === "默认排序") {
                        new_video = copy_video;
                    }
                    $('.result-wrap').fadeOut(100);
                    setTimeout(function () {
                        $('.result-wrap').fadeIn(500);
                        show_video = new_video;
                        refresh_show();
                    }, 100);
                }
                else if (obj.parentElement.className === "filter-type clearfix duration") {


                    if (time_copy.length === 0) {
                        time_copy = show_video;
                    }
                    if (obj.firstElementChild.innerHTML === "一日内") {
                        show_video = time_copy;
                        show_video.forEach(function (v) {
                            var date2 = new Date();
                            var date1 = new Date(v.upload_time);
                            var s1 = date1.getTime(), s2 = date2.getTime();
                            var total = (s2 - s1) / 1000;
                            var day = parseInt(total / (24 * 60 * 60));//计算整数天数
                            var afterDay = total - day * 24 * 60 * 60;//取得算出天数后剩余的秒数
                            var hour = parseInt(afterDay / (60 * 60));//计算整数小时数
                            var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60;//取得算出小时数后剩余的秒数
                            var min = parseInt(afterHour / 60);//计算整数分
                            var afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60;//取得算出分后剩余的秒数
                            if (day < 1 || ((day === 1) && (hour === 0 && min === 0 && afterMin === 0))) {
                                new_video.push(v);
                            }
                        });

                    } else if (obj.firstElementChild.innerHTML === "一周内") {
                        show_video = time_copy;
                        show_video.forEach(function (v) {
                            var date2 = new Date();
                            var date1 = new Date(v.upload_time);
                            var s1 = date1.getTime(), s2 = date2.getTime();
                            var total = (s2 - s1) / 1000;
                            var day = parseInt(total / (24 * 60 * 60));//计算整数天数
                            var afterDay = total - day * 24 * 60 * 60;//取得算出天数后剩余的秒数
                            var hour = parseInt(afterDay / (60 * 60));//计算整数小时数
                            var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60;//取得算出小时数后剩余的秒数
                            var min = parseInt(afterHour / 60);//计算整数分
                            var afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60;//取得算出分后剩余的秒数
                            if (day < 7 || ((day === 7) && (hour === 0 && min === 0 && afterMin === 0))) {
                                new_video.push(v);
                            }
                        });
                    } else if (obj.firstElementChild.innerHTML === "一月内") {
                        show_video = time_copy;
                        show_video.forEach(function (v) {
                            var date2 = new Date();
                            var date1 = new Date(v.upload_time);
                            var s1 = date1.getTime(), s2 = date2.getTime();
                            var total = (s2 - s1) / 1000;
                            var day = parseInt(total / (24 * 60 * 60));//计算整数天数
                            var afterDay = total - day * 24 * 60 * 60;//取得算出天数后剩余的秒数
                            var hour = parseInt(afterDay / (60 * 60));//计算整数小时数
                            var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60;//取得算出小时数后剩余的秒数
                            var min = parseInt(afterHour / 60);//计算整数分
                            var afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60;//取得算出分后剩余的秒数
                            if (day < 30 || ((day === 30) && (hour === 0 && min === 0 && afterMin === 0))) {
                                new_video.push(v);
                            }
                        });
                    } else if (obj.firstElementChild.innerHTML === "一年内") {
                        show_video = time_copy;
                        show_video.forEach(function (v) {
                            var date2 = new Date();
                            var date1 = new Date(v.upload_time);
                            var s1 = date1.getTime(), s2 = date2.getTime();
                            var total = (s2 - s1) / 1000;
                            var day = parseInt(total / (24 * 60 * 60));//计算整数天数
                            var afterDay = total - day * 24 * 60 * 60;//取得算出天数后剩余的秒数
                            var hour = parseInt(afterDay / (60 * 60));//计算整数小时数
                            var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60;//取得算出小时数后剩余的秒数
                            var min = parseInt(afterHour / 60);//计算整数分
                            var afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60;//取得算出分后剩余的秒数
                            if (day < 365 || ((day === 365) && (hour === 0 && min === 0 && afterMin === 0))) {
                                new_video.push(v);
                            }
                        });
                    } else if (obj.firstElementChild.innerHTML === "全部时间") {
                        time_copy = [];
                        new_video = copy_video;
                    }
                    $('.result-wrap').fadeOut(100);
                    setTimeout(function () {
                        $('.result-wrap').fadeIn(500);
                        show_video = new_video;
                        refresh_show();
                    }, 100);

                }


            })
        });

        $$(".v-switcher").addEventListener('mouseout', function () {
            if ($$(".is-active").className[0] === 'o') {
                $$(".v-switcher-header-anchor").setAttribute("style",
                    "width: 200px; transform: translateX(80px); transition-duration: 200ms;");
            }
            else {
                $$(".v-switcher-header-anchor").setAttribute("style",
                    "width: 200px; transform: translateX(440px); transition-duration: 200ms;");
            }
        });

        $$(".up").addEventListener('click', function () {
            $$(".up").setAttribute("style", "display: none;");
            $$(".duration").setAttribute("style", "display: none;");
            $$(".tids_1").setAttribute("style", "display: none;");
            $$(".down").setAttribute("style", "");
        });

        $$(".down").addEventListener('click', function () {
            $$(".up").setAttribute("style", "");
            $$(".duration").setAttribute("style", "");
            $$(".tids_1").setAttribute("style", "");
            $$(".down").setAttribute("style", "display: none;");
        });


        $$(".icon-aver").addEventListener('click', function () {
            sort_state = "video matrix";
            $$(".icon-aver").parentElement.className = "aver type active";
            $$(".icon-imgleft").parentElement.className = "imgleft type";
            var videos = makeArray($All('.video'));
            $('.result-wrap').fadeOut(100);
            setTimeout(function () {
                $('.result-wrap').fadeIn(500);
                videos.forEach(function (v) {
                    v.className = "video matrix";
                })
            }, 100);

        });

        $$(".icon-imgleft").addEventListener('click', function () {
            sort_state = "video list";
            $$(".icon-aver").parentElement.className = "aver type";
            $$(".icon-imgleft").parentElement.className = "imgleft type active";
            var videos = makeArray($All('.video'));
            $('.result-wrap').fadeOut(100);
            setTimeout(function () {
                $('.result-wrap').fadeIn(500);
                videos.forEach(function (v) {
                    v.className = "video list";
                })
            }, 100);

        });


        pages.forEach(function (p) {
            p.addEventListener('click', function (ev) {
                var obj = ev.srcElement ? ev.srcElement : ev.target;
                if (obj.className[0] === 'n' || obj.className[3] === 'i') {
                    obj = obj.parentElement;
                }
                $('.result-wrap').fadeOut(100);
                setTimeout(function () {
                    makeArray($All('.page-item')).forEach(function (pp) {
                        if (pp.className === "page-item active") {
                            pp.className = "page-item";
                        }
                    });
                    if (obj.className === "page-item next") {
                        now_index++;
                    }
                    else if (obj.className === "page-item prev") {
                        now_index--;
                    }
                    else {
                        now_index = obj.firstElementChild.innerHTML;
                    }
                    makeArray($All('.page-item')).forEach(function (pp) {
                        if (parseInt(pp.firstElementChild.innerHTML) === now_index) {
                            pp.className = "page-item active";
                        }
                    });
                    refresh_show();
                    $('.result-wrap').fadeIn(500);

                }, 100);


            })
        });
        $$('.bili-dropdown').addEventListener('mousemove', function (ev) {
            $$('.dropdown-list').style.display = 'block';
        });
        $$('.bili-dropdown').addEventListener('mouseout', function (ev) {
            $$('.dropdown-list').style.display = 'none';
        });

        var sort_user = makeArray($All('.dropdown-item'));
        sort_user.forEach(function (su) {
            su.addEventListener('click', function (ev) {
                now_index = 1;
                var obj = ev.srcElement ? ev.srcElement : ev.target;
                makeArray($All('.dropdown-item')).forEach(function (_u) {
                    _u.setAttribute('style', '');
                });
                obj.setAttribute('style', 'display:none');
                $$('.selected').innerHTML = obj.innerHTML;
                var new_user = [];
                show_user.forEach(function (u) {
                    new_user.push(u);
                });
                if (obj.innerHTML === "粉丝数由高到低") {
                    new_user.sort(function (prev, after) {
                        if (parseInt(prev.fans_count) < parseInt(after.fans_count))
                            return 1;  //返回大于0，则prev与after交换
                        else if (parseInt(prev.fans_count) === parseInt(after.fans_count))
                            return 0;  //0 ，则相等,不交换
                        else
                            return -1; //返回小于0，不交换
                    });
                }
                else if (obj.innerHTML === "粉丝数由低到高") {
                    new_user.sort(function (prev, after) {
                        if (parseInt(prev.fans_count) < parseInt(after.fans_count))
                            return -1;  //返回大于0，则prev与after交换
                        else if (parseInt(prev.fans_count) === parseInt(after.fans_count))
                            return 0;  //0 ，则相等,不交换
                        else
                            return 1; //返回小于0，不交换
                    });
                }
                else if (obj.innerHTML === "稿件数由高到低") {
                    new_user.sort(function (prev, after) {
                        if (parseInt(prev.work_count) < parseInt(after.work_count))
                            return 1;  //返回大于0，则prev与after交换
                        else if (parseInt(prev.work_count) === parseInt(after.work_count))
                            return 0;  //0 ，则相等,不交换
                        else
                            return -1; //返回小于0，不交换
                    });
                }
                else if (obj.innerHTML === "稿件数由低到高") {
                    new_user.sort(function (prev, after) {
                        if (parseInt(prev.work_count) < parseInt(after.work_count))
                            return -1;  //返回大于0，则prev与after交换
                        else if (parseInt(prev.work_count) === parseInt(after.work_count))
                            return 0;  //0 ，则相等,不交换
                        else
                            return 1; //返回小于0，不交换
                    });
                }
                else {
                    new_user = user_list;
                }
                $('.result-wrap').fadeOut(100);
                setTimeout(function () {
                    $('.result-wrap').fadeIn(500);
                    show_user = new_user;
                    refresh_show();
                }, 100);
            })
        })




    });


}