
var $$ = function(sel) {
    return document.querySelector(sel);
};
var $All = function(sel) {
    return document.querySelectorAll(sel);
};
var $SON = function(father, son) {
    return father.querySelectorAll(son);
};

$('#myLife').click(function () {

    $('#attention').removeClass('highShow');
    $('#favorite').removeClass('highShow');
    $('#history').removeClass('highShow');
    $('#message').removeClass('highShow');
    $('#name').removeClass('highShow2');
    this.setAttribute('class','highShow');



})



$('#favorite').click(function () {

    $('#attention').removeClass('highShow');
    $('#myLife').removeClass('highShow');
    $('#history').removeClass('highShow');
    $('#message').removeClass('highShow');
    $('#name').removeClass('highShow2');
    this.setAttribute('class','highShow');



})



$('#history').click(function () {
    $('#message').removeClass('highShow');
    $('#attention').removeClass('highShow');
    $('#myLife').removeClass('highShow');
    $('#favorite').removeClass('highShow');
    $('#name').removeClass('highShow2');
    this.setAttribute('class','highShow');
})


$('#attention').click(function () {
    $('#message').removeClass('highShow');
    $('#history').removeClass('highShow');
    $('#myLife').removeClass('highShow');
    $('#favorite').removeClass('highShow');
    $('#name').removeClass('highShow2');
    this.setAttribute('class','highShow');
})

$('#message').click(function () {
    $('#attention').removeClass('highShow');
    $('#history').removeClass('highShow');
    $('#myLife').removeClass('highShow');
    $('#favorite').removeClass('highShow');
    $('#name').removeClass('highShow2');
    this.setAttribute('class','highShow');
})

$('#name').click(function () {
    $('#attention').removeClass('highShow');
    $('#history').removeClass('highShow');
    $('#myLife').removeClass('highShow');
    $('#favorite').removeClass('highShow');
    $('#message').removeClass('highShow');
    this.setAttribute('class','highShow2');


})
if ($('#history').hasClass('highShow')){
    window.location.hash = '#section3';
}
if ($('#favorite').hasClass('highShow')){
    window.location.hash = '#section4';
}
if ($('#attention').hasClass('highShow')){
    window.location.hash = '#section5';
}
if ($('#message').hasClass('highShow')){
    window.location.hash = '#section6';
}
if ($('#name').hasClass('highShow2')){
    window.location.hash = '#section7';
}



$(window).scroll(function() {
    var scrollBottom = document.documentElement.scrollTop + $(window).height();

    if ($('#myLife').hasClass('highShow')&& scrollBottom >= $("#section3").offset().top) {
        window.scrollTo(0,$("#section3").offset().top-$(window).height());

    }

    if ($('#history').hasClass('highShow')&& document.documentElement.scrollTop <= $("#section3").offset().top) {
        window.scrollTo(0,$("#section3").offset().top);

    }

    if ($('#history').hasClass('highShow')&& scrollBottom >= $("#section4").offset().top) {
        window.scrollTo(0,$("#section4").offset().top-$(window).height());

    }
    if ($('#favorite').hasClass('highShow')&& document.documentElement.scrollTop <= $("#section4").offset().top) {
        window.scrollTo(0,$("#section4").offset().top);

    }
    if ($('#favorite').hasClass('highShow')&& scrollBottom >= $("#section5").offset().top) {
        window.scrollTo(0,$("#section5").offset().top-$(window).height());

    }
    if ($('#attention').hasClass('highShow')&& document.documentElement.scrollTop <= $("#section5").offset().top) {
        window.scrollTo(0,$("#section5").offset().top);

    }
    if ($('#attention').hasClass('highShow')&& scrollBottom >= $("#section6").offset().top) {
        window.scrollTo(0,$("#section6").offset().top-$(window).height());

    }
    if ($('#message').hasClass('highShow')&& document.documentElement.scrollTop <= $("#section6").offset().top) {
        window.scrollTo(0,$("#section6").offset().top);

    }
    if ($('#message').hasClass('highShow')&& scrollBottom >= $("#section7").offset().top) {
        window.scrollTo(0,$("#section7").offset().top-$(window).height());

    }

    if($('#name').hasClass('highShow2')&&document.documentElement.scrollTop <= $("#section7").offset().top){
        window.scrollTo(0,$("#section7").offset().top);
    }


});




