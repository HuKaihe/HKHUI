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


// 惰性加载容器中的图片
+function ($) {

    function makeItLazy(config) {

        var $container = $(this), // 容器
            loadingPicUrl = config.loadingPicUrl, // 加载中小图的URL
            $images = $container.find('img'); // 容器内所有的图片

        $images.prop('src', loadingPicUrl); // 为所有的图片换上加载中的小图

        $container.on('scroll', function () {

            var container = $container[0],
                height = $container.height(), // 容器的高度
                scrollTop = container.scrollTop, // 容器滚轴距离容器顶端的距离
                scrollHeight = height / container.scrollHeight * height + 200; // 容器滚轴的高度

            $images.each(function () {
                var $img = $(this),
                    src = $(this).data('src'), // 真实图片的url
                    top = this.offsetTop; // 图片的顶端与浏览器顶端的距离（考虑滚动条)

                if (!src) {
                    return;
                }

                if (scrollTop + scrollHeight >= top) {
                    $img.prop('src', src);
                    $img.data('src', null);
                }
            });
        });
    }

    $.fn.makeItLazy = makeItLazy;
}(jQuery);

// 将表单中的控件变为json
+function ($) {

    function makeFormToJson() {

        var $form = $(this),
            jsonObj = {},
            attrArr = $form.serializeArray();

        $.each(attrArr, function () {
            if (this.value) {
                if (jsonObj[this.name]) {
                    if (!jsonObj[this.name].push) {
                        jsonObj[this.name] = [jsonObj[this.name]];
                    }
                    jsonObj[this.name].push(this.value || null);
                } else {
                    if ($("[name='" + this.name + "']:checkbox", $form).length) {
                        jsonObj[this.name] = [this.value];
                    } else {
                        jsonObj[this.name] = this.value || null;
                    }
                }
            }
        });
        return jsonObj;
    }

    $.fn.makeFormToJson = makeFormToJson;
}(jQuery);

// 静态方法
var HKHUI = function ($) {

    function renderByHandleBar(template, $Destination, data, config) {
        if (typeof Handlebars === 'undefined') {
            throw new Error('HKHUI\'s renderByHandleBar requires handlebars')
        }

        var originalHTML = template,
            renderMachine = Handlebars.compile(originalHTML),
            renderedHTML = renderMachine(data);

        $Destination.html(renderedHTML);
    }

    return {
        renderByHandleBar: renderByHandleBar
    }
}(jQuery);

