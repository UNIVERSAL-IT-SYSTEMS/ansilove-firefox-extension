var ansiloveExtension = (function () {
    "use strict";

    function alreadyRunning() {
        var scripts, i;
        scripts = content.document.getElementsByTagName("script");
        if (scripts.length) {
            for (i = 0; i < scripts.length; ++i) {
                if (scripts[i].src === "chrome://ansilove/content/ansilove.js") {
                    return true;
                }
            }
        }
        return false;
    }

    function filterLinks() {
        var notification, script;

        function notify(text) {
            notification.appendNotification(text, "ansilove-notification", "chrome://ansilove/content/ansilove-icon.png", notification.PRIORITY_INFO_LOW, []);
        }

        notification = gBrowser.getNotificationBox();
        if (alreadyRunning()) {
            notify("AnsiLove is already loaded. Shift-click on any link to preview the image.");
        } else {
            notify("Shift-click on any link to preview with AnsiLove. Alt-click to emulate a video terminal display.");
            script = content.document.createElement("script");
            script.setAttribute("type", "text/javascript");
            script.setAttribute("src", "chrome://ansilove/content/ansilove.js");
            content.document.body.appendChild(script);
        }
    }

    return {
        filterLinks: filterLinks
    };
}());