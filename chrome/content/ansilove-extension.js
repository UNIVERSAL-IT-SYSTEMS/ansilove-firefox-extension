var ansiloveExtension = (function () {
    "use strict";

    function appendScript(src, callback, fail) {
        var scripts, script, i;

        scripts = content.document.getElementsByTagName("script");

        if (scripts.length) {
            for (i = 0; i < scripts.length; ++i) {
                if (scripts[i].src === src) {
                    fail();
                    return;
                }
            }
        }

        script = content.document.createElement("script");
        script.type = "text/javascript";
        script.src = src;
        script.onload = callback;

        content.document.body.appendChild(script);
    }

    function filterLinks() {
        var notification;

        notification = gBrowser.getNotificationBox();

        function notify(text) {
            notification.appendNotification(text, "ansilove-notification", "chrome://ansilove/content/ansilove-icon.png", notification.PRIORITY_INFO_LOW, []);
        }

        function alreadyLoaded() {
            notify("AnsiLove is already loaded. Shift-click on any link to preview the image.");
        }

        appendScript("chrome://ansilove/content/ansilove.js", function () {
            appendScript("chrome://ansilove/content/ansilove-helper.js", function () {
                notify("Press Shift whilst clicking on any link to preview with AnsiLove; use the Alt or Option key whilst clicking to emulate a real display.");
            }, alreadyLoaded);
        }, alreadyLoaded);
    }

    return {
        filterLinks: filterLinks
    };
}());