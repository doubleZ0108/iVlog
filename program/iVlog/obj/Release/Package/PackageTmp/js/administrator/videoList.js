function postVID(i) {
    alert(i);
}

$.ajax({
    url: "js/user/videoList_info.json",//json文件位置
    type: "GET",//请求方式为get
    dataType: "json", //返回数据格式为json
    success: function(data) {//请求成功完成后要执行的方法
        $$('#name').innerHTML = data.admin_nickname;
        $$('#adid').innerHTML = data.admin_id;

        data.video_info.forEach(function(item,index)
        {
            if(index%2===0) {
                var newRow = document.createElement('div');
                newRow.setAttribute('class', 'row');
                $$('#FavoriteList').appendChild(newRow);
            }

            if((index%4===0)){
                var newH=document.createElement('div');
                newH.setAttribute('class','col-lg-5')
                newRow.appendChild(newH);
                newH.innerHTML=[
                    '                        <div class="hovereffect">\n' +
                    '                            <img class="img-responsive" src="img/user/history.jpg" alt="">\n' +
                    '                            <div class="overlay">\n' +
                    '                                <h2>'+item.video_title+'</h2>\n' +
                    '                                <h2>发布者账号：'+item.uper_id+'<br/>发布时间：'+item.upload_time+'</h2>\n' +
                    '                                <a class="info" href="#">►</a>\n' +
                    '                                <button type="submit" class="dFF2" href="#">删除该视频</button>\n' +
                    '                            </div>'
                ]
            }
            if((index%4===1)){
                var newH=document.createElement('div');
                newH.setAttribute('class','col-lg-4')
                $$('#FavoriteList').lastElementChild.appendChild(newH);
                newH.innerHTML=[
                    '                        <div class="hovereffect">\n' +
                    '                            <img class="img-responsive" src="img/user/history.jpg" style="height: 317px; width: 360px alt="">\n' +
                    '                            <div class="overlay">\n' +
                    '                                <h2>'+item.video_title+'</h2>\n' +
                    '                                <h2>发布者账号：'+item.uper_id+'<br/>发布时间：'+item.upload_time+'</h2>\n' +
                    '                                <a class="info" href="#">►</a>\n' +
                    '                                <button type="submit" class="dFF2" href="#">删除该视频</button>\n' +
                    '                            </div>']
            }
            if((index%4===2)){
                var newH=document.createElement('div');
                newH.setAttribute('class','col-lg-4')
                newRow.appendChild(newH);
                newH.innerHTML=[
                    '                        <div class="hovereffect">\n' +
                    '                            <img class="img-responsive" src="img/user/history.jpg" style="height: 317px; width: 360px alt="">\n' +
                    '                            <div class="overlay">\n' +
                    '                                <h2>'+item.video_title+'</h2>\n' +
                    '                                <h2>发布者账号：'+item.uper_id+'<br/>发布时间：'+item.upload_time+'</h2>\n' +
                    '                                <a class="info" href="#">►</a>\n' +
                    '                                <button type="submit" class="dFF2" href="#">删除该视频</button>\n' +

                    '                            </div>']
            }
            if((index%4===3)){
                var newH=document.createElement('div');
                newH.setAttribute('class','col-lg-5')
                $$('#FavoriteList').lastElementChild.appendChild(newH);
                newH.innerHTML=[
                    '                        <div class="hovereffect">\n' +
                    '                            <img class="img-responsive" src="img/user/history.jpg" alt="">\n' +
                    '                            <div class="overlay">\n' +
                    '                                <h2>'+item.video_title+'</h2>\n' +
                    '                                <h2>发布者账号：'+item.uper_id+'<br/>发布时间：'+item.upload_time+'</h2>\n' +
                    '                                <a class="info" href="#">►</a>\n' +
                    '                                <button type="submit" class="dFF2" href="#">删除该视频</button>\n' +

                    '                            </div>']
            }


            $$('#FavoriteList').querySelectorAll('.dFF2')[$$('#FavoriteList').querySelectorAll('.dFF2').length-1].addEventListener('click',postVID.bind(this,item.video_id), false);



        });



    }



})
