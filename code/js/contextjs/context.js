(function ($, window) {

    $.fn.contextMenu = function (settings) {

        return this.each(function () {

            // Open context menu
            $(this).on("contextmenu", function (e) {
                //$(settings.menuSelector).hide();
                //open menu
                /*$(settings.menuSelector)
                    .data("invokedOn", $(e.target))
                    .show()
                    .css({
                        position: "absolute",
                        left: getLeftLocation(e),
                        top: getTopLocation(e)
                    })
                    .off('click')
                    .on('click', function (e) {
                        $(this).hide();
                
                        var $invokedOn = $(this).data("invokedOn");
                        var $selectedMenu = $(e.target);
                        
                        settings.menuSelected.call(this, $invokedOn, $selectedMenu);
                });*/
                funcionalidad(e,$(this));
                $(settings.menuSelector).find('li>a').show();
                if(settings.onShow){
                    settings.onShow($(settings.menuSelector),$(e.target));
                }
                return false;
            });
            if(settings.buttonHelper){
                var $row = $(this).closest('tr');
                var $button = $('<button type="button" class="btn btn-danger btn-xs"><i class="fa fa-plus"></i></button>');
                $button.on('click',function(e){
                    e.stopPropagation();
                    funcionalidad(e);
                    $(settings.menuSelector).find('li>a').show();
                    if(settings.onShow){
                        settings.onShow($(settings.menuSelector),$(e.target));
                    }
                });
                $row.find('td:eq(0)').append($button);
            }
            //make sure menu closes on any click
            $(document).click(function () {
                $(settings.menuSelector).hide();
            });
        });
        function funcionalidad(e){
            $(settings.menuSelector)
                .data("invokedOn", $(e.target))
                .show()
                .css({
                    position: "absolute",
                    left: getLeftLocation(e),
                    top: getTopLocation(e)
                })
                .off('click')
                .on('click', function (e) {
                    $(this).hide();
            
                    var $invokedOn = $(this).data("invokedOn");
                    var $selectedMenu = $(e.target);
                    
                    settings.menuSelected.call(this, $invokedOn, $selectedMenu);
            });
        }
        function getLeftLocation(e) {
            var mouseWidth = e.pageX;
            var pageWidth = $(window).width();
            var menuWidth = $(settings.menuSelector).width();
            
            // opening menu would pass the side of the page
            if (mouseWidth + menuWidth > pageWidth &&
                menuWidth < mouseWidth) {
                return mouseWidth - menuWidth;
            } 
            return mouseWidth;
        }        
        
        function getTopLocation(e) {
            var mouseHeight = e.pageY;
            var pageHeight = $(window).height();
            var menuHeight = $(settings.menuSelector).height();

            // opening menu would pass the bottom of the page
            if (mouseHeight + menuHeight > pageHeight &&
                menuHeight < mouseHeight) {
                return mouseHeight - menuHeight;
            } 
            return mouseHeight;
        }

    };
})(jQuery, window);