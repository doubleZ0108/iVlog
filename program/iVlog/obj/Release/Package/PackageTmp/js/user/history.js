$.ajax({
    url: "../../js/user/history_info.json",//json文件位置
    type: "GET",//请求方式为get
    dataType: "json", //返回数据格式为json
    success: function(data) {//请求成功完成后要执行的方法
        data.video_info.forEach(function(item,index)
        {
            let vID = window.btoa(item.video_id);
            if(index%2===0) {
                var newRow = document.createElement('div');
                newRow.setAttribute('class', 'row');
                $$('#HistoryList').appendChild(newRow);
            }

            if((index%4===0)){
                var newH=document.createElement('div');
                newH.setAttribute('class','col-lg-5')
                newRow.appendChild(newH);
                newH.innerHTML=['  <div class="hovereffect">\n' +
                '                            <img class="img-responsive" src="../../img/user/history.jpg" alt="">\n' +
                '                            <div class="overlay">\n' +
                '                                <h2>'+item.timespan+'<br/><br/>题目'+item.title+'</h2>\n' +
                    '                                <a class="info" href="' + 'http://localhost:54016/Video/Index?videoID=' + vID +'">►</a>\n' +
                '                            </div>\n' +
                '                        </div>'
                ]
            }
            if((index%4===1)){
                var newH=document.createElement('div');
                newH.setAttribute('class','col-lg-4')
                $$('#HistoryList').lastElementChild.appendChild(newH);
                newH.innerHTML=[

                  '                        <div class="hovereffect">\n' +
                  '                            <img src="../../img/user/history.jpg" style="height: 317px; width: 360px" class="historyItem">\n' +
                  '\n' +
                  '                            <div class="overlay">\n' +
                  '                                <h2>'+item.timespan+'<br/><br/>题目'+item.title+'</h2>\n' +

                    '                                <a class="info" href="' + 'http://localhost:54016/Video/Index?videoID=' + vID +'">►</a>\n' +
                  '                            </div>\n' +
                  '                        </div>\n']
            }
            if((index%4===2)){
                var newH=document.createElement('div');
                newH.setAttribute('class','col-lg-4')
                newRow.appendChild(newH);
                newH.innerHTML=[

                    '                        <div class="hovereffect">\n' +
                    '                            <img src="../../img/user/history.jpg" style="height: 317px; width: 360px" class="historyItem">\n' +
                    '\n' +
                    '                            <div class="overlay">\n' +
                    '                                <h2>'+item.timespan+'<br/><br/>题目'+item.title+'</h2>\n' +

                    '                                <a class="info" href="' + 'http://localhost:54016/Video/Index?videoID=' + vID +'">►</a>\n' +
                    '                            </div>\n' +
                    '                        </div>\n' +
                    '\n' +
                    '\n'
                 ]
            }
            if((index%4===3)){
                var newH=document.createElement('div');
                newH.setAttribute('class','col-lg-5')
                $$('#HistoryList').lastElementChild.appendChild(newH);
                newH.innerHTML=[
                    '  <div class="hovereffect">\n' +
                    '                            <img class="img-responsive" src="../../img/user/history.jpg" alt="">\n' +
                    '                            <div class="overlay">\n' +
                    '                                <h2>'+item.timespan+'<br/><br/>题目'+item.title+'</h2>\n' +

                    '                                <a class="info" href="' + 'http://localhost:54016/Video/Index?videoID=' + vID +'">►</a>\n' +
                    '                            </div>\n' +
                    '                        </div>']
            }
        });
    }

})