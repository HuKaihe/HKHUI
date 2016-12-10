function progress(percent) {
    var $bar = $('.hu-process-bar'),
        width = screen.width * percent;

    if (percent === 1) {
        $bar.animate({width: width}, 100);
        $bar.fadeOut(200);
    }else{
        $bar.animate({width: width}, 100);
    }

}
