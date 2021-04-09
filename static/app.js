write(true, false)
var mw, gw, randomGraphID

$(function () {
    $("#play").hide()
    mw = new MST()
    gw = mw.getGraphWidget()
    var options = [CP3_4_10, CP3_4_14, K5, RAIL, TESSELLATION]
    mw.examples(options[Math.floor(Math.random() * 5)])
    randomGraphID = -1

    var graphJSON = getQueryVariable("create")
    if (graphJSON.length > 0) {
        importjson(graphJSON)
        window.history.pushState(
            "object or string",
            "Title",
            window.location.href.split("?")[0]
        )
    }

    $("#draw").click(function () {
        closeExamples()
        closePrims()
    })

    $("#random").click(function () {
        closeExamples()
        closePrims()
    })

    $("#examples").click(function () {
        openExamples()
        closePrims()
    })

    $("#kruskals").click(function () {
        closeExamples()
        closePrims()
    })

    $("#prims").click(function () {
        closeExamples()
        openPrims()
    })

    $("#go-to-beginning").click(function () {
        goToBeginning()
    })

    $("#previous").click(function () {
        stepBackward()
    })

    $("#pause").click(function () {
        pause()
    })

    $("#play").click(function () {
        play()
    })

    $("#next").click(function () {
        stepForward()
    })

    $("#go-to-end").click(function () {
        goToEnd()
    })

    $("#draw").click(function () {
        drawGraph()
    })

    $("#kruskals").click(function () {
        kruskals()
    })

    $("#example1").click(function () {
        example(CP3_4_10)
    })

    $("#example2").click(function () {
        example(CP3_4_14)
    })

    $("#example3").click(function () {
        example(K5)
    })

    $("#example4").click(function () {
        example(RAIL)
    })

    $("#example5").click(function () {
        example(TESSELLATION)
    })

    $("#prims-go").click(function () {
        prims()
    })

    $("#drawgraph-visualizer").click(function () {
        GraphVisu(true, false, null, null, null, true)
    })

    $("#drawgraph-btn-cancel").click(function () {
        drawCancel()
    })

    $("#drawgraph-btn-clear").click(function () {
        GraphVisu(true, false, true)
    })

    $("#drawgraph-btn-done").click(function () {
        drawDone()
    })
})

function importjson(text) {
    if (isPlaying) stop()
    if (mode == "exploration") {
        mw.importjson(text)
        closeExamples()
        isPlaying = false
    }
}

function drawGraph() {
    if (isPlaying) stop()
    if (mode == "exploration") {
        $("#dark-overlay").fadeIn(function () {
            $("#drawgraph").fadeIn()
        })
        mw.startLoop()
        isPlaying = false
    }
}

function drawDone() {
    if (!mw.draw()) return false
    mw.stopLoop()
    $("#drawgraph").fadeOut()
    $("#dark-overlay").fadeOut()
}

function drawCancel() {
    mw.stopLoop()
    $("#drawgraph").fadeOut()
    $("#dark-overlay").fadeOut()
}

function example(id) {
    if (isPlaying) stop()
    setTimeout(function () {
        if (mode == "exploration" && mw.examples(id)) {
            $("#progress-bar").slider("option", "max", 0)
            closeExamples()
            isPlaying = false
        }
    }, 500)
}

function hideCodetracePlaceholder() {
    $("#codetrace-placeholder").attr("hidden") ||
        $("#codetrace-placeholder").attr("hidden", !0)
    for (let e = 1; e <= 7; e++) $(`#code${e}`).removeAttr("hidden")
}

function kruskals(callback) {
    hideCodetracePlaceholder()
    stop()
    commonAction(mw.kruskal(callback), "Kruskal&#39;s Algorithm")
}

function prims() {
    hideCodetracePlaceholder()
    stop()
    var input = parseInt($("#prim-v").val())
    primsWithInput(input)
}

function primsWithInput(input, callback) {
    commonAction(mw.prim(input, callback), "Prim&#39;s Algorithm, s = " + input)
    setTimeout(function () {
        $("#prim-v").val(Math.floor(Math.random() * mw.getV()))
    }, 500)
}

function loadGraph(graph) {
    if (mw) {
        mw.loadGraph(graph["vl"], graph["el"])
    }
}

var userGraph = {
    vl: {},
    el: {},
}

// Lecture action functions
function CUSTOM_ACTION(action, data, mode) {
    if (action == "kruskal") {
        hideSlide(function () {
            kruskals(showSlide)
        })
    } else if (action == "prim") {
        hideSlide(function () {
            primsWithInput(data, showSlide)
        })
    }
}
