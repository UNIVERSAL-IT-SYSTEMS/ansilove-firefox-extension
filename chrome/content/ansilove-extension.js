var ansiloveExtension = (function () {
    "use strict";
    var notification = gBrowser.getNotificationBox();

    function hasTextmodeLinks() {
        var anchors, i, href, count;
        anchors = content.document.getElementsByTagName("a");
        for (i = 0, count = 0; i < anchors.length; ++i) {
            href = anchors[i].href;
            if (href) {
                switch (href.split(".").pop().toLowerCase()) {
                case "ans":
                case "tly":
                case "asc":
                case "nsk":
                case "nfo":
                case "adf":
                case "bin":
                case "diz":
                case "idf":
                case "pcb":
                case "tnd":
                case "xb":
                    ++count;
                    break;
                }
            }
        }
        return count;
    }

    function notify(text) {
        notification.appendNotification(text, "ansilove-notification", "chrome://ansilove/content/ansilove-icon.png", notification.PRIORITY_INFO_LOW, []);
    }

    function alreadyRunning() {
        var scripts, i;
        scripts = content.document.getElementsByTagName("script");
        for (i = 0; i < scripts.length; ++i) {
            if (scripts[i].src === "chrome://ansilove/content/ansilove.js") {
                return true;
            }
        }
        return false;
    }

    function filterLinks() {
        var numberOfLinks, notification, script;
        numberOfLinks = hasTextmodeLinks();
        notification = gBrowser.getNotificationBox();
        if (alreadyRunning()) {
            notify("AnsiLove is already loaded. Shift-click on a link to preview the image.");
        } else {
            if (hasTextmodeLinks()) {
                notify("AnsiLove: " + numberOfLinks + " links found. Shift-click on a link to preview the image.");
                script = content.document.createElement("script");
                script.setAttribute("type", "text/javascript");
                script.setAttribute("src", "chrome://ansilove/content/ansilove.js");
                content.document.body.appendChild(script);
            } else {
                notify("Ansilove: Could not find any links.");
            }
        }
    }

    return {
        filterLinks: filterLinks
    };
}());