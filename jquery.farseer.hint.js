(function ($) {
    $.fn.hint = function () {

        var hintClass = "ui-input-hint";

        this.each(function () {
            // check if title exists (containing hint) and create and display hint if input is empty
            var $input = $(this),
                title = $input.attr('title');

            if (title) {
                $input.blur(function () {
                    if (this.value === '') {
                        $input.before("<input type='text' class='" + hintClass + " farseer-event-init' data-hint-for='" + $(this).attr("id") + "' value='" + title + "' />");
                        initialiseHints();
                    }
                }).focus(function () {
                    $("[data-hint-for='" + $(this).attr("id") + "']").remove();
                    $(this).css("display", "");
                }).blur();


            }
        });

        function initialiseHints() {
            $("." + hintClass + ".farseer-event-init").each(function () {
                $hint = $(this);
                var $target = $("#" + $hint.attr("data-hint-for"));
                $hint.height($target.height());
                $hint.width($target.width());
                $hint.attr("class", $target.attr("class"));
                $hint.addClass(hintClass);

                $target.css("display", "none");
                $hint.bind("focus.farseer-hint", function () {
                    $("#" + $(this).attr("data-hint-for")).focus();
                });

                $hint.removeClass("farseer-event-init");
            });
        }

        return this;
    };
})(jQuery);