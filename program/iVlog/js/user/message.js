

$.ajax({
    url: "../../js/user/message_info.json",//json文件位置
    type: "GET",//请求方式为get
    dataType: "json", //返回数据格式为json
    success: function(data) {//请求成功完成后要执行的方法
        data.like_message.forEach(function (item,index) {
            var li1= document.createElement('li');
            $$('#collapseOne ul').appendChild(li1);
            li1.innerHTML=item.content;
        })
        data.follow_message.forEach(function (item,index) {
            var li2= document.createElement('li');
            $$('#collapseTwo ul').appendChild(li2);
            li2.innerHTML=item.content;
        })
        data.comment_message.forEach(function (item,index) {
            var li3= document.createElement('li');
            $$('#collapseThree ul').appendChild(li3);
            li3.innerHTML=item.content;
        })
        data.complain_message.forEach(function (item,index) {
            var li4= document.createElement('li');
            $$('#collapseFour ul').appendChild(li4);
            li4.innerHTML=item.content;
        })


        if ($$('#collapseOne ul').innerHTML !== '')
            $$('#k1').innerHTML = '◆'


        if ($$('#collapseTwo ul').innerHTML !== '')
            $$('#k2').innerHTML = '◆'


        if ($$('#collapseThree ul').innerHTML !== '')
            $$('#k3').innerHTML = '◆'

        if ($$('#collapseFour ul').innerHTML !== '')
            $$('#k4').innerHTML = '◆'




        $('#headingOne').click(function () {
            $('#k1').remove();
        })

        $('#headingTwo').click(function () {
            $('#k2').remove();
        })

        $('#headingThree').click(function () {
            $('#k3').remove();
        })

        $('#headingFour').click(function () {
            $('#k4').remove();
        })


    }
})

