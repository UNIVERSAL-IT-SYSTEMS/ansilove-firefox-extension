(function () {
    "use strict";
    var anchors, i;

    function display(href, animation) {
        var divOverlay, divCanvasContainer, STYLE_DEFAULTS;

        STYLE_DEFAULTS = {"backgroundColor": "transparent", "backgroundImage": "none", "margin": "0", "padding": "0", "border": "0", "fontSize": "100", "font": "inherit", "verticalAlign": "baseline", "color": "black", "display": "block", "cursor": "default", "textAlign": "left", "textShadow": "none", "textTransform": "none", "clear": "none", "float": "none", "overflow": "auto", "position": "relative", "visibility": "visible"};

        function findHighestZIndex() {
            var elements, highest, i, zIndex;
            for (i = 0, elements = document.getElementsByTagName("*"), highest = 0; i < elements.length; ++i) {
                zIndex = document.defaultView.getComputedStyle(elements[i]).zIndex;
                if (zIndex !== "auto") {
                    highest = Math.max(highest, parseInt(zIndex, 10));
                }
            }
            return highest;
        }

        function applyStyle(element, style) {
            var name;
            for (name in style) {
                if (style.hasOwnProperty(name)) {
                    element.style[name] = style[name];
                }
            }
        }

        function createDiv(style) {
            var div;
            style = style || {};
            div = document.createElement("div");
            applyStyle(div, STYLE_DEFAULTS);
            applyStyle(div, style);
            return div;
        }

        function transitionCSS(element, transProperty, transDuration, transFunction, style) {
            element.style.transitionProperty = transProperty;
            element.style.transitionDuration = transDuration;
            element.style.transitionTimingFunction = transFunction;
            if (style) {
                setTimeout(function () {
                    applyStyle(element, style);
                }, 50);
            }
        }

        divOverlay = createDiv({"position": "fixed", "left": "0px", "top": "0px", "width": "100%", "height": "100%", "backgroundColor": "rgba(0, 0, 0, 0.8)", "overflow": "scroll", "zIndex": (findHighestZIndex() + 1).toString(10), "opacity": "0", "backgroundImage": "url(chrome://ansilove/content/spinner.gif)", "backgroundPosition": "center center", "backgroundRepeat": "no-repeat"});
        divCanvasContainer = createDiv({"backgroundColor": "black", "boxShadow": "0 8px 32px rgb(0, 0, 0)", "margin": "8px auto", "padding": "16px", "border": "4px solid white", "borderRadius": "32px", "top": "100%", "opacity": "0"});
        divOverlay.appendChild(divCanvasContainer);
        document.body.appendChild(divOverlay);
        transitionCSS(divOverlay, "opacity", "0.2s", "ease-out", {"opacity": "1.0"});

        setTimeout(function () {
            var controller;
            if (animation) {
                controller = AnsiLove.animate(href, function (canvas) {
                    divCanvasContainer.style.width = canvas.width + "px";
                    applyStyle(canvas, STYLE_DEFAULTS);
                    canvas.style.imageRendering = "-moz-crisp-edges";
                    canvas.style.imageRendering = "-webkit-optimize-contrast";
                    divCanvasContainer.appendChild(canvas);
                    divOverlay.style.backgroundImage = "none";
                    transitionCSS(divCanvasContainer, "top, opacity", "0.6s, 1s", "ease-in-out, ease-out", {"top": "0", "opacity": "1"});
                    setTimeout(function () {
                        controller.play(28800);
                    }, 1000);
                    divOverlay.onclick = function (evt) {
                        evt.preventDefault();
                        controller.stop();
                        document.body.removeChild(divOverlay);
                    };
                }, {"bits": "9"}, function (e) {
                    alert("Error: " + e);
                    document.body.removeChild(divOverlay);
                });
            } else {
                AnsiLove.splitRender(href, function (canvases) {
                    divCanvasContainer.style.width = canvases[0].width + "px";
                    canvases.forEach(function (canvas) {
                        applyStyle(canvas, STYLE_DEFAULTS);
                        canvas.style.imageRendering = "-moz-crisp-edges";
                        canvas.style.imageRendering = "-webkit-optimize-contrast";
                        divCanvasContainer.appendChild(canvas);
                    });
                    divOverlay.style.backgroundImage = "none";
                    transitionCSS(divCanvasContainer, "top, opacity", "0.6s, 1s", "ease-in-out, ease-out", {"top": "0", "opacity": "1"});
                    divOverlay.onclick = function (evt) {
                        evt.preventDefault();
                        document.body.removeChild(divOverlay);
                    };
                }, 100, {"bits": "9", "filetype": href.split(".").pop().toLowerCase()}, function (e) {
                    alert("Error: " + e);
                    document.body.removeChild(divOverlay);
                });
            }
        }, 250);
    }

    function createOnclickEvent(href) {
        return function (evt) {
            if (evt.shiftKey) {
                evt.preventDefault();
                display(href, false);
            } else if (evt.altKey) {
                evt.preventDefault();
                display(href, true);
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