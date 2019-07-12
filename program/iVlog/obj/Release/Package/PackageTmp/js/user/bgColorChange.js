var one = "rgba(199,208,213,.3)",
    two = "rgba(0,0,0,.2)";


$(window).on("scroll touchmove", function() {
    if ($(document).scrollTop() >= $("#bg-color-1").position().top) {
        $("#bg-color-changer").css('background', one);

    }

    if ($(document).scrollTop() >= $("#bg-color-2").position().top) {
        $("#bg-color-changer").css('background', two);
    }
});