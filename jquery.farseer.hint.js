// jquery.farseer.hint.js
// fork it from github, https://github.com/stephen-james

(function ($) {
    $.fn.hint = function (options) {

        var hintOptions = options || { useHtml5PlaceholderWhereSupported : false };

        var hintClass = "ui-input-hint";

        function browserSupportsPlaceHolderAttribute() {
            var input = document.createElement('input');
	        return ('placeholder' in input);
        }

        this.each(function () {
            var $input = $(this),
                title = $input.attr('title');

            if (title) {                
                if (browserSupportsPlaceHolderAttribute() && hintOptions.useHtml5PlaceholderWhereSupported){
                    $input.attr("placeholder", title);
                }
                else
                {
                    $input.blur(function () {
                        if (this.value === '') {
                            $input.before("<input type='text' class='" + hintClass + " farseer-event-init' data-hint-for='" + $(this).attr("id") + "' value='" + title + "' />");
                            initialiseHints();
                        }
                    }).focus(function () {
                        $("[data-hint-for='" + $(this).attr("id") + "']").remove();
                    }).blur(); // now change all inputs to title
                }
            }
        });

        function initialiseHints() {
            $("." + hintClass + ".farseer-event-init").each(function () {
                $hint = $(this);
                
                var $target = $("#" + $hint.attr("data-hint-for"));
                
                $hint
                    .height($target.height())
                    .width($target.width())
                    .attr("class", $target.attr("class"))
                    .addClass(hintClass)
                    .bind("focus.farseer-hint", function () {
                        $("#" + $(this).attr("data-hint-for"))
                            .css("display", "")
                            .focus();                    	
                    });

                $target.css("display", "none");
                
                $hint.removeClass("farseer-event-init");
            });
        }

        return this;
    };
})(jQuery);
