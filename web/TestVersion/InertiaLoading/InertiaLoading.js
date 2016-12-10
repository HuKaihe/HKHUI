$(function () {

    var $container = $('.container'), // 容器
        loadingPicUrl = '../../images/loading.gif', // 加载中小图的URL
        $images = $container.find('img'); // 容器内所有的图片

    $images.prop('src', loadingPicUrl); // 为所有的图片换上加载中的小图

    $container.on('scroll', function () {

        var container = $('.container')[0],
            height = $container.height(), // 容器的高度
            scrollTop = container.scrollTop, // 容器滚轴距离容器顶端的距离
            scrollHeight = height/container.scrollHeight * height + 200; // 容器滚轴的高度

        $images.each(function () {
            var $img = $(this),
                src = $(this).data('src'), // 真实图片的url
                top = this.offsetTop; // 图片的顶端与浏览器顶端的距离（考虑滚动条)

            if(!src) {
                return;
            }

            if(scrollTop + scrollHeight >= top) {
                $img.prop('src',src);
                $img.data('src',null);
            }
        });
    });
});
