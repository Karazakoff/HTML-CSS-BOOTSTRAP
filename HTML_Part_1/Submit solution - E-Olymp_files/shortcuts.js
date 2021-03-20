var olymp = olymp || {};

(function($) {
    olymp.shortcuts = function(ctrlKey, baseUrl, phrases) {
        if (ctrlKey == 'cmd') {
            ctrlKey = 'command';
        }

        Mousetrap.bind(ctrlKey + '+g', function(e) {
            var name = prompt(phrases['label.enter_group_id']);
            if (name) {
                document.location = baseUrl + "/groups/" + name;
            }

            return false;
        });

        Mousetrap.bind(ctrlKey + '+q', function(e) {
            var id = parseInt(prompt(phrases['label.enter_problem_id']), 10);
            if (id) {
                document.location = baseUrl + "/problems/" + id;
            }

            return false;
        });

        Mousetrap.bind(ctrlKey + '+s', function(e) {
            document.location = baseUrl + "/submissions/submit";

            return false;
        });

        Mousetrap.bind(ctrlKey + '+m', function(e) {
            document.location = baseUrl + "/inmail/compose";

            return false;
        });

        Mousetrap.bind(ctrlKey + '+o', function(e) {
            document.location = baseUrl + "/contests";

            return false;
        });

        Mousetrap.bind(ctrlKey + '+p', function(e) {
            document.location = baseUrl + "/problems";

            return false;
        });

        Mousetrap.bind(ctrlKey + '+l', function(e) {
            document.location = baseUrl + "/logout";

            return false;
        });
    };
})(jQuery);
