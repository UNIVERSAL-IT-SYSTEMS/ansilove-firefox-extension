var ansiloveExtension = (function () {
    "use strict";
    function hasTextmodeLinks() {
        var anchors, i, href;
        anchors = content.document.getElementsByTagName("a");
        for (i = 0; i < anchors.length; ++i) {
            href = anchors[i].href;
            if (href) {
                switch (href.split(".").pop().toLowerCase()) {
                case "ans":
                case "asc":
                case "adf":
                case "bin":
                case "idf":
                case "pcb":
                case "tnd":
                case "xb":
                    return true;
                }
            }
        }
        return false;
    }

    function pageLoad() {
        var script;
        if (hasTextmodeLinks()) {
            script = content.document.createElement("script");
            script.setAttribute("type", "text/javascript");
            script.setAttribute("src", "chrome://ansilove/content/ansilove.js");
            content.document.body.appendChild(script);
        }
    }

    function load() {
        var appcontent = document.getElementById("appcontent");
        if (appcontent) {
            appcontent.addEventListener("DOMContentLoaded", pageLoad, true);
        }
    }

    return {
        load: load
    };
}());

window.addEventListener("load", function load() {
    "use strict";
    window.removeEventListener("load", load, false);
    ansiloveExtension.load();
}, false);