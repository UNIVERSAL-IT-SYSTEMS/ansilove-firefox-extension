var ansiloveExtension = (function () {
    "use strict";

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

    function filterLinks() {
        var numberOfLinks, notification, script;
        numberOfLinks = hasTextmodeLinks();
        notification = gBrowser.getNotificationBox();
        if (hasTextmodeLinks()) {
            notification.appendNotification("AnsiLove: " + numberOfLinks + " links found. Shift-click on a link to preview the image.", "ansilove-notification", "chrome://browser/skin/Info.png", notification.PRIORITY_INFO_LOW, []);
            script = content.document.createElement("script");
            script.setAttribute("type", "text/javascript");
            script.setAttribute("src", "chrome://ansilove/content/ansilove.js");
            content.document.body.appendChild(script);
        } else {
            notification.appendNotification("Ansilove: Could not find any links.", "ansilove-notification", "chrome://browser/skin/Info.png", notification.PRIORITY_INFO_LOW, []);
        }
    }

    return {
        filterLinks: filterLinks
    };
}());