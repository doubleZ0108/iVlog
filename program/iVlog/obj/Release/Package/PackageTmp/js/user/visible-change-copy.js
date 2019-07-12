$('#profile-copy').click(function(){
    $('#safari-copy').css("transition-delay","0s");
    $('#safari-copy').css("opacity","0");
    $('#profile-copy').css("z-index","0");
    $('#selfSignature').css("transition-delay","0s");
    $('#selfSignature').css("opacity","0");
    $('#safari').css("background-color","tomato");
    $('#safari').css("transition-delay","0s");
    $('.visible-change').css("visibility","visible");
    $('#safari').css("height","400px");
    $('.guide').css("transform","translateY(0px)");
    $('#selfSignature').css('z-index','-5');
});

$('#hide').click(function(){
    $('#safari').css("transition-delay","0s");
    $('.visible-change').css("visibility","hidden");
    $('#safari').css("background-color","rgba(0,0,0,0");
    $('#safari').css("height","130px");
    $('.guide').css("transform","translateY(-600px)");
    $('#safari-copy').css("transition-delay",".5s");
    $('#safari-copy').css("opacity","1");
    $('#safari-copy').css("z-index","1");
    $('#selfSignature').css("transition-delay",".5s");
    $('#selfSignature').css("opacity","1");
    $('#selfSignature').css('z-index','7');
});



// $('.collapsed').click(function(){
//     if($('.message-store').hasClass('signal')){
//         $('.message-store').removeClass('signal');
//     }
//     $('.message-clear').css('opacity', String(1-$('.message-clear').css('opacity')));
// });


$('#TA').click(function () {
    if($$('#TA').innerHTML=='关注TA')
    $$('#TA').innerHTML='取消关注';
    else
        $$('#TA').innerHTML='关注TA';
})