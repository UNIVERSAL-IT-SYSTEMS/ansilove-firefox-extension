(function () {
    "use strict";
    var anchors, i;

    function createOnclickEvent(href) {
        return function (evt) {
            var options;
            options = {"bits": "9", "spinner": "chrome://ansilove/content/spinner.gif", "2x": (window.devicePixelRatio > 1) ? 1 : 0};
            if (evt.shiftKey) {
                evt.preventDefault();
                AnsiLove.popup(href, options);
            } else if (evt.altKey) {
                evt.preventDefault();
                AnsiLove.popupAnimation(href, 28800, options);
            }
        };
    }

    anchors = document.getElementsByTagName("a");
    for (i = 0; i < anchors.length; ++i) {
        if (anchors[i].href) {
            anchors[i].onclick = createOnclickEvent(anchors[i].href);
        }
    }
}());