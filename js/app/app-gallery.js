app.gallery = {

    init:function(){


        $(".magicwall").magicWall({
            maxItemHeight: 265,
            maxItemWidth: 265,
            delay: 400,
            preloadBeforeSwitch: true,
            loadingMode:"chain",
            pauseOnHover: "item",
            animations: "flipY,rollOutX,-rollOutX,rollOutY,-rollOutY,slideColumn,-slideColumn,slideRow,-slideRow,fade",
            duration:800
        });

        // var content_width = parseInt($("ul.magicwall-grid").css('width'));
        //
        // $(".magicwall-grid-item").each(function(){
        //    $(this).css('width', content_width/5);
        // });

        $(".colorbox").colorbox({
            maxWidth:"90%",
            maxHeight:"90%",
            onOpen: function(){
                $(".magicwall").magicWall("stop");
            },

            onClosed: function(){
                $(".magicwall").magicWall("start");
            }
        });

        alertify.log(msg5);

        setTimeout(function(){
            alertify.log(msg6);
        },2000);




    }

};



$(".magicwall-grid li")
    .mouseenter(function() {
        $( this ).find('.portfolio-project-name').slideToggle(300);
    })
    .mouseleave(function() {
        $( this ).find('.portfolio-project-name').slideToggle(300);
    })
    .on("click", function () {
        $(".colorbox").colorbox('open');
    });