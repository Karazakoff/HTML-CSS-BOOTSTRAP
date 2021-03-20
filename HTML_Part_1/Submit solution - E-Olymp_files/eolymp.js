(function($) {
    $(function() {
        try {
            if (localStorage.getItem("fund_banner_clicked") !== "yes") {
                $("#support-banner").addClass("eo-fund-banner--active");
            }
        } catch {}

        $("#support-banner").click(function () {
            try { localStorage.setItem("fund_banner_clicked", "yes"); } catch {}
        });

        $('.modal-additional-filter-options').on('shown.bs.modal', function (e) {
            $("input", this).focus();
        });

        $('.modal-additional-filter-options input.search').keyup(function() {
            var target = $(this).attr('data-target');
            if (!target) {
                return null;
            }

            var query = $(this).val().toLowerCase().replace(/\s+/, ' ').split(" ");

            var query_match = function(haystack) {
                for (var i = 0; i < query.length; i++) {
                    if (haystack.toLowerCase().indexOf(query[i]) == -1) {
                        return false;
                    }
                }

                return true;
            };

            $(target).each(function() {
                var self = $(this);
                query_match(self.text()) ? self.show() : self.hide();
            });
        });

        $('[data-toggle-url]').click(function () {
            var element = $(this);
            var toggleUrl = element.data('toggle-url');

            if (!toggleUrl) {
                return;
            }

            $.getJSON(toggleUrl, function(response) {
                var onValue = element.data('turn-on');
                var offValue = element.data('turn-off');
                var target = element.data('target');

                (target ? element.find(target) : element).text(response.value ? onValue : offValue);
                element.data('toggle-url', response.toggle_link);
            });
        });

        $(".eo-alert__item").hide().delay(750).slideDown('fast').click(function() {
            $(this).slideUp('fast');
        });

        // filters
        $(".eo-filters__filter").click(function (e) {
            let dropdown = $(".eo-filters__filter_choices", this);

            $(".eo-filters__filter_choices").not(dropdown).slideUp("fast");

            dropdown.slideDown('fast');

            $("input, select", dropdown).focus()
        });

        $(".eo-filters__filter input").keydown(function (e) {
            if (e.keyCode === 13) {
                $(this).closest("form").submit();
            }
        });

        $(document).on("click", function(event){
            if(!$(event.target).closest(".eo-filters__filter").length){
                $(".eo-filters__filter_choices").slideUp('fast');
            }
        });

        $(".latex").each(function () {
            $(this).html(window.latex.render($(this).text(), {
                tr: function (phrase) {
                    return window.Translator.translate("label." + phrase.toLowerCase());
                }
            }));
            $(this).removeClass("latex-raw");
        });
    });
})(jQuery);

function copyToClipboard(data) {
    const textarea = document.createElement('textarea');
    textarea.value = data;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);

    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

// firefox likes it explicit
window.copyToClipboard = copyToClipboard;
