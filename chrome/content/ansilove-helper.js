(function () {
    "use strict";
    var anchors, i;

    function createOnclickEvent(href) {
        return function (evt) {
            if (evt.shiftKey) {
                evt.preventDefault();
                AnsiLove.popup(href);
            } else if (evt.altKey) {
                evt.preventDefault();
                AnsiLove.popupAnimation(href, 28800);
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