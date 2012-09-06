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
                }).blur(); // now change all inputs to title


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

        //.before("<div class='" + hintClass + "' data-hint-for='" + $(this).attr("id") + "'></div>");

        //        this.each(function () {
        //            var $input = $(this),
        //                title = $input.attr('title');

        //            function remove() {
        //                if ($input.val() === title && $input.hasClass(blurClass)) {
        //                    $input.val('').removeClass(blurClass);
        //                }
        //            }

        //            // only apply logic if the element has the attribute
        //            if (title) {
        //                // on blur, set value to title attr if text is blank
        //                $input.
        //                
        //                .blur(function () {
        //                    if (this.value === '') {
        //                        $input.val(title).addClass(blurClass);
        //                    }
        //                }).focus(remove).blur(); // now change all inputs to title

        //                // clear the pre-defined text when form is submitted
        //                $form.submit(remove);
        //                $win.unload(remove); // handles Firefox's autocomplete
        //            }
        //        });

        return this;
    };
})(jQuery);