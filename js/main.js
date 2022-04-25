/* js */
/* global */
history.scrollRestoration = "manual"
document.oncontextmenu = function () { return false; }

/* page load */
window.onload = function () {
    $("body").removeClass("loading");
    $("body").addClass("loaded");
};

/* scroll indicator */
window.onscroll = function () { scrollFunction() };
function scrollFunction() {
    if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
        $("#scrollTop").fadeIn(200);
    } else {
        $("#scrollTop").fadeOut(200);
    }
}

/* scroll to top */
function topFunction() {
    $("html,body").animate({ scrollTop: 0 }, 300);
}

/* includeHTML */
function includeHTML(callback) {
    var z, i, elmnt, file, xhr;
    /* loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /* search for elements with a certain atrribute: */
        file = elmnt.getAttribute("include-html");
        //console.log(file);
        if (file) {
            /* make an HTTP request using the attribute value as the file name: */
            xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elmnt.innerHTML = this.responseText;
                    }
                    if (this.status == 404) {
                        elmnt.innerHTML = "Page not found.";
                    }
                    /* remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("include-html");
                    includeHTML(callback);
                }
            };
            xhr.open("GET", file, true);
            xhr.send();
            /* exit the function: */
            return;
        }
    }
    setTimeout(function () {
        //callback();
    }, 0);
}

/* date calculator */
function counter() {
    var dday = new Date("May 28, 2018, 00:00:00").getTime();

    setInterval(function () {
        var now = new Date();
        var distance = now - dday;
        var d = Math.floor(distance / (1000 * 60 * 60 * 24));
        var h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var s = Math.floor((distance % (1000 * 60)) / 1000);
        if (h < 10) {
            h = '0' + h;
        }
        if (m < 10) {
            m = '0' + m;
        }
        if (s < 10) {
            s = '0' + s;
        }
        $('#dday').html(d + " days " + h + ":" + m + ":" + s)
    }, 1000);
}
counter();