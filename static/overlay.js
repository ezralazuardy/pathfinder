function disableScroll() {
    $("html").css("overflow", "hidden")
}

function enableScroll() {
    $("html").css("overflow", "visible")
}

function replaceAll(find, replace, str) {
    return str.replace(new RegExp(find, "g"), replace)
}

function isOn(value, position) {
    return value >> position
}

function customAlert(msg) {
    $("#custom-alert p").html(msg)
    var m = -1 * ($("#custom-alert").outerHeight() / 2)
    $("#custom-alert").css("margin-top", m + "px")
    $("#dark-overlay").fadeIn(function () {
        $("#custom-alert").fadeIn(function () {
            setTimeout(function () {
                $("#custom-alert").fadeOut(function () {
                    $("#dark-overlay").fadeOut()
                })
            }, 1000)
        })
    })
}

function showLoadingScreen() {
    $("#loading-overlay").show()
    $("#loading-message").show()
}

function hideLoadingScreen() {
    $("#loading-overlay").hide()
}

function commonAction(retval, msg) {
    if (retval) {
		$("#current-action").fadeOut(function () {
			$("#current-action").html(msg);
			$("#current-action").fadeIn();
		});
        $("#progress-bar").slider("option", "max", gw.getTotalIteration() - 1)
        triggerRightPanels()
        isPlaying = true
    }
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1)
    var vars = query.split("&")
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=")
        if (decodeURIComponent(pair[0]) == variable)
            return decodeURIComponent(pair[1])
    }
    return ""
}

$(function () {
    $("#title a").click(function () {
        $("#title a").removeClass("selected-viz")
        $(this).addClass("selected-viz")
        // temporary quick fix for Google Chrome Aug 2016 issue...
        setTimeout(function () {
            document.body.style.zoom = "100.1%"
        }, 100) // force resize/redraw...
        setTimeout(function () {
            document.body.style.zoom = "100%"
        }, 600)
    })

    $("#trigger-about").click(function () {
        if ($(window).width() > 600) {
            $("#dark-overlay").fadeIn(function () {
                $("#about").fadeIn()
            })
        } else
            alert(
                "Sorry, this dialog is too big. Please load it on bigger screen"
            )
    })

    $(".close-overlay").click(function () {
        $(".overlays").fadeOut(function () {
            $("#dark-overlay").fadeOut()
        })
    })

    $("#dark-overlay").click(function () {
        $(".overlays").fadeOut()
        $("#dark-overlay").fadeOut()
    })
})
