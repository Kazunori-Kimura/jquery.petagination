// jquery.petagination.js
//  2013-07-05
//
//  $("#pagination").petagination({
//      CurrentPage:    {Number},
//      TotalPages:     {Number},
//      PagesPerScreen: {Number},
//      ItemClick: {function}
//  });
//

(function($){
    $.fn.petagination=function(config){

        var defaults = {
            CurrentPage:    1,
            TotalPages:     1,
            PagesPerScreen: 5
        };
        var options = $.extend(defaults, config);

        var items = [];
        // previous arrow
        var prev_item = '<li {disabled}>'
            + '<a href="#" title="previous page" data-page="{prev_page}">'
            + '&laquo;</a></li>';
        var disabled = "";
        if ( options.CurrentPage == 1 ) {
            disabled = 'class="disabled"';
        }
        prev_item = prev_item
            .replace(
                /\{disabled\}/,
                disabled)
            .replace(
                /\{prev_page\}/,
                options.CurrentPage - 1);

        items[items.length] = prev_item;

        // page item
        var start_page = options.CurrentPage;
        var end_page = options.CurrentPage + options.PagesPerScreen - 1;
        //終わりに近づいた時の処理
        if ( end_page > options.TotalPages ) {
            end_page = options.TotalPages;
            start_page = options.TotalPages - options.PagesPerScreen + 1;
            if (start_page < 1) {
                start_page = 1;
            }
        }

        if ( start_page > 1 ) {
            items[items.length] = '<li class="disabled">'
                + '<a href="#">&hellip;</a></li>';
        }

        var item_html = '<li {active}><a href="#" data-page="{page}">'
            + '{page}</a></li>';
        for (var i = start_page; i <= end_page; i++ ) {
            var active = "";
            if ( i == options.CurrentPage ) {
                active = 'class="active"';
            }
            var item = item_html
                .replace(/\{page\}/g, i)
                .replace(/\{active\}/, active);
            items[items.length] = item;
        }

        if ( end_page != options.TotalPages ) {
            items[items.length] = '<li class="disabled">'
                + '<a href="#">&hellip;</a></li>';
        }

        // next arrow
        var next_item = '<li {disabled}>'
            + '<a href="#" title="next page" data-page="{next_page}">'
            + '&raquo;</a></li>';

        disabled = "";
        if ( options.CurrentPage == options.TotalPages ) {
            disabled = 'class="disabled"';
        }
        next_item = next_item
            .replace(
                /\{disabled\}/,
                disabled)
            .replace(
                /\{next_page\}/,
                options.CurrentPage + 1);

        items[items.length] = next_item;

        return this.each(function(index){
            $(this)
                .addClass("pagination")
                .attr("data-current-page", options.CurrentPage)
                .attr("data-total-pages", options.TotalPages)
                .attr("data-pages-per-screen", options.PagesPerScreen)
                .html("<ul>" + items.join("") + "</ul>");

            //pagination item click
            if (typeof(options.ItemClick) != "undefined") {
                $(".pagination li:not(.disabled) a").click(function(evt){
                    options.ItemClick(evt.target);
                });
            }
        });
    };
})(jQuery);

