var ansiloveExtension = (function () {
    "use strict";

    function pageLoad() {
        var script, anchors, href, i, selectedAnchors;
        anchors = content.document.getElementsByTagName("a");
        selectedAnchors = [];
        for (i = 0; i < anchors.length; ++i) {
            href = anchors[i].getAttribute("href");
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
                    selectedAnchors.push(anchors[i]);
                    break;
                }
            }
        }
        if (selectedAnchors.length) {
            script = content.document.createElement("script");
            script.setAttribute("type", "text/javascript");
            script.setAttribute("src", "chrome://ansilove/content/ansilove.js");
            content.document.getElementsByTagName("head")[0].appendChild(script);
            for (i = 0; i < selectedAnchors.length; ++i) {
                selectedAnchors[i].setAttribute("href", "javascript:AnsiLoveFireFoxExtension.display(\"" + selectedAnchors[i].getAttribute("href") + "\")");
            }
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