if (typeof jQuery === 'undefined') {
    throw new Error('HKHUI\'s JavaScript requires jQuery')
}

+function ($) {
    var version = $.fn.jquery.split(' ')[0].split('.');
    if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
        throw new Error('HKHUI\'s JavaScript requires jQuery version 1.9.1 or higher')
    }
}(jQuery);

+function ($) {
    function initializeBox() {
        this.hover(function () {
            $(this).find(".hu-box-hover-cover").addClass("animate-show-hover-cover")
        }, function () {
            $(this).find(".hu-box-hover-cover").removeClass("animate-show-hover-cover")
        });
    }

    $.fn.box = initializeBox;
}(jQuery);

+function ($) {
    function initializeCarousel(config) {
        var $com = this,
            $scrollPictures = $com.find(".hu-scroll-picture-list li"),
            pictureAmount = $scrollPictures.length,
            $scrollControlList = $("<ul class='hu-scroll-controls'></ul>"),
            $scrollControl = $("<li></li>"),
            $controls = "",
            intervalTime = config.time || 4000,
            fadeTime = config.fadeTime || 1000;

        $scrollControlList.appendTo($com);

        for (var i = 0; i < pictureAmount; i++) {
            $scrollControl.clone(true).appendTo($scrollControlList)
        }

        $controls = $com.find(".hu-scroll-controls li");
        $controls.eq(0).addClass("hu-control-active");

        var stopCode = setInterval(beginScroll, intervalTime);

        function beginScroll() {
            var $visiblePicture = $com.find(".hu-scroll-picture-list li:visible"),
                index = $visiblePicture.index() == pictureAmount - 1 ? -1 : $visiblePicture.index(),
                $activeControl = $controls.eq(index),
                $pictureWillFadeIn = $scrollPictures.eq(index + 1),
                $controlWillBeActive = $controls.eq(index + 1);

            $visiblePicture.fadeOut(fadeTime);
            $pictureWillFadeIn.fadeIn(fadeTime);

            $activeControl.removeClass("hu-control-active");
            $controlWillBeActive.addClass("hu-control-active");
        }

        $controls.click(function () {
            var index = $(this).index(),
                $pictureWillFadeIn = $scrollPictures.eq(index);

            $scrollPictures.fadeOut(fadeTime);
            $pictureWillFadeIn.fadeIn(fadeTime);
            $controls.removeClass("hu-control-active");
            $(this).addClass("hu-control-active");
        }).hover(function () {
            clearInterval(stopCode);
        }, function () {
            stopCode = setInterval(beginScroll, intervalTime);
        });
    }
    $.fn.carousel = initializeCarousel;
}(jQuery);
