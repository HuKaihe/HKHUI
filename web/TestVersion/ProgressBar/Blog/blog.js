$(function () {
    $('.intro li').on('mouseenter', function (event) {
        var left = this.offsetLeft,
        mouseX = event.clientX,
        blockLeft = $('.intro')[0].offsetLeft,
        mouseXOff = mouseX - blockLeft - 30,
        rightAnimateOver = {'left': left + 30},
        leftAnimateOver = {'left': left - 30},
        $bottomLine = $('.bottom-line');

        $bottomLine.stop(true);

        if (left >= mouseXOff) {
            $bottomLine.animate(rightAnimateOver, 300);
        } else {
            $bottomLine.stop(true).animate(leftAnimateOver, 300);
        }

        $bottomLine.animate({'left': left}, 200);
    });

    $('.sidebar li').click(function () {
        $('.sidebar li').removeClass('active');
        $(this).addClass('active');
    });
})
