var mode = "exploration",
	codetraceColor = "white"

function highlightLine(t) {
	if ($("#codetrace p").css("background-color", "#673ab7").css("color", codetraceColor), t instanceof Array)
		for (var e = 0; e < t.length; e++) 0 != t[e] && $("#code" + t[e]).css("background-color", "black").css("color", "white")
	else $("#code" + t).css("background-color", "black").css("color", "white")
}

actionsWidth = 0
var isPlaying = !1,
	cur_slide = null,
	last_click = 0

function isActionsOpen() {
	return $("#actions-hide img").hasClass("rotateRight")
}

function isStatusOpen() {
	return $("#status-hide img").hasClass("rotateRight")
}

function isCodetraceOpen() {
	return $("#codetrace-hide img").hasClass("rotateRight")
}

function showActionsPanel() {
	isPlaying ? $("#actions-toast").fadeIn(function() {
		setTimeout(function() {
			$("#actions-toast").fadeOut()
		}, 2e3)
	}) : isActionsOpen() || ($("#actions-hide img").removeClass("rotateLeft").addClass("rotateRight"), $("#actions").animate({
		width: "+=" + actionsWidth
	}))
}

function hideActionsPanel() {
	isActionsOpen() && ($("#actions-hide img").removeClass("rotateRight").addClass("rotateLeft"), $("#actions").animate({
		width: "-=" + actionsWidth
	}))
}

function showStatusPanel() {
	isStatusOpen() || ($("#status-hide img").removeClass("rotateLeft").addClass("rotateRight"), $("#current-action").fadeIn(), $("#status").animate({
		width: "+=" + statusCodetraceWidth
	}))
}

function hideStatusPanel() {
	isStatusOpen() && ($("#status-hide img").removeClass("rotateRight").addClass("rotateLeft"), $("#current-action").fadeOut(), $("#status").animate({
		width: "-=" + statusCodetraceWidth
	}))
}

function showCodetracePanel() {
	isCodetraceOpen() || ($("#codetrace-hide img").removeClass("rotateLeft").addClass("rotateRight"), $("#codetrace").animate({
		width: "+=" + statusCodetraceWidth
	}))
}

function hideCodetracePanel() {
	isCodetraceOpen() && ($("#codetrace-hide img").removeClass("rotateRight").addClass("rotateLeft"), $("#codetrace").animate({
		width: "-=" + statusCodetraceWidth
	}))
}

function triggerRightPanels() {
	hideEntireActionsPanel(), showStatusPanel(), showCodetracePanel()
}

function extractQnGraph(t) {
	var e = t.internalAdjList
	for (var r in t.internalEdgeList, e) {
		var n, i = e[r]
		n = i.cxPercentage, i.cxPercentage = i.cx, i.cx = n / 100 * MAIN_SVG_WIDTH, n = i.cyPercentage, i.cyPercentage = i.cy, i.cy = n / 100 * MAIN_SVG_HEIGHT
	}
	return t
}

function closeSlide(t, e) {
	void 0 !== t && null != t ? $(".menu-highlighted").removeClass("menu-highlighted") : "function" == typeof e && e()
}

function canContinue() {
	var t = (new Date).getTime()
	return !(t - last_click < 200 || (last_click = t, 0))
}

function openSlide(t, e) {
	if (isPlaying = !1, "undefined" != typeof gw && null != gw && "function" == typeof gw.stop && isPlaying) try {
		gw.stop()
	} catch (t) {
	}
	canContinue() && closeSlide(cur_slide, function() {
		cur_slide = t
	})
}

function initUI() {
	var t = 27 * $("#actions p").length + 10
	$("#actions").css("height", t), $("#actions").css("width", actionsWidth)
	var e = Math.floor((t - 16) / 2),
		r = t - 16 - e
	$("#actions-hide").css("padding-top", e), $("#actions-hide").css("padding-bottom", r), $("#current-action").hide(), $("#actions-hide img").addClass("rotateRight"), $(".action-menu-pullout").css("left", actionsWidth + 43 + "px"), $(".action-menu-pullout").children().css("float", "left")
}

$(function() {
	$("#speed-input").slider({
		min: 200,
		max: 2e3,
		value: 1500,
		change: function(t, e) {
			gw.setAnimationDuration(2200 - e.value)
		}
	}), $("#progress-bar").slider({
		range: "min",
		min: 0,
		value: 0,
		slide: function(t, e) {
			gw.pause(), gw.jumpToIteration(e.value, 0)
		},
		stop: function() {
			isPaused || setTimeout(function() {
				gw.play()
			}, 500)
		}
	}), initUI(), $("#mode-button").click(function() {
		$("#other-modes").toggle()
	}), $("#mode-menu").hover(function() {
		$("#other-modes").show()
	}, function() {
		$("#other-modes").hide()
	}), $("#other-modes a").click(function() {
		var t = $("#mode-button").attr("title"),
			e = $(this).attr("title"),
			r = $("#mode-button").html().substring(0, $("#mode-button").html().length - 2)
		$("#mode-button").html($(this).html() + " &#9663;"), $(this).html(r), $("#mode-button").attr("title", e), $(this).attr("title", t), $("#other-modes").hide()
	}), $("#status-hide").click(function() {
		isStatusOpen() ? hideStatusPanel() : showStatusPanel()
	}), $("#codetrace-hide").click(function() {
		isCodetraceOpen() ? hideCodetracePanel() : showCodetracePanel()
	}), $("#actions-hide").click(function() {
		isActionsOpen() ? hideEntireActionsPanel() : showActionsPanel()
	})
})
var isPaused = !1

function isAtEnd() {
	return gw.getCurrentIteration() == gw.getTotalIteration() - 1
}

function pause() {
	isPlaying = !1, isPaused = !0, gw.pause(), $("#play").show(), $("#pause").hide(), showActionsPanel()
}

function play() {
	isPlaying = !0, isPaused = !1, $("#pause").show(), $("#play").hide(), hideActionsPanel(), isAtEnd() ? gw.replay() : gw.play()
}

function stepForward() {
	isPlaying && (pause(), gw.forceNext(250))
}

function stepBackward() {
	isPlaying && (pause(), gw.forcePrevious(250))
}

function goToBeginning() {
	isPlaying && (gw.jumpToIteration(0, 0), pause())
}

function goToEnd() {
	isPlaying && (gw.jumpToIteration(gw.getTotalIteration() - 1, 0), pause())
}

function stop() {
	try {
		gw.stop()
	} catch (t) {
	}
	isPaused = !1, isPlaying = !1, $("#pause").show(), $("#play").hide()
}

function IsUndirected(t, e) {
	if (0 == t.length) return !0
	var r = []
	for (var n in t)
		for (var i in r[n] = [], t) r[n][i] = 0
	for (var a in e) {
		var o = e[a].u,
			l = e[a].v,
			s = e[a].w
		r[o][l] = s
	}
	for (var n in t)
		for (var i in t)
			if (r[n][i] != r[i][n]) return !1
	return !0
}

function IsConstantWeighted(t, e) {
	if (0 == t.length) return !0
	var r = e[0].w
	for (var n in e)
		if (e[n].w != r) return !1
	return !0
}

function HasNegativeWeight(t, e) {
	if (0 == t.length) return !1
	for (var r in e)
		if (parseInt(e[r].w) < 0) return !0
	return !1
}

function IsTree(t, e) {
	if (0 == t.length) return !0
	if (!IsUndirected(t, e)) return !1
	var r = 0,
		n = 0,
		i = []
	for (var a in t) r++, i[a] = !1
	for (var a in e) n++
	if (n / 2 != r - 1) return !1
	for (var a in function t(r) {
		for (var n in i[r] = !0, e) e[n].u === r && !1 === i[e[n].v] && t(e[n].v)
	}(0), t)
		if (!1 === i[a]) return !1
	return !0
}

function IsDAG(t, e) {
	if (0 == t.length) return !0
	if (IsUndirected(t, e)) return !1
	var r = 0
	for (var n in t) r++
	var i = []
	for (var a in t)
		for (var o in i[a] = [], t) i[a][o] = 0
	for (var n in e) {
		var l = e[n].u,
			s = e[n].v
		i[l][s] = 1
	}
	for (var u = 0; u < r; u++)
		for (a = 0; a < r; a++)
			for (o = 0; o < r; o++) 1 == i[a][u] && 1 == i[u][o] && (i[a][o] = 1)
	for (a = 0; a < r; a++)
		if (1 == i[a][a]) return !1
	return !0
}

function TopoSort(t, e) {
	function r(t) {
		for (var a in n[t] = !0, e) e[a].u === t && !1 === n[e[a].v] && r(e[a].v)
		i.unshift(t)
	}

	if (0 == t.length) return {}
	if (!IsDAG(t, e)) return {}
	var n = [],
		i = []
	for (var a in t) n[a] = !1
	for (var a in t) n[a] || r(parseInt(a))
	return i
}

function RunBellmanFord(t, e, r) {
	function n(t) {
		for (var r in o[t] = !0, e) e[r].u === t && !1 === o[e[r].v] && n(e[r].v)
	}

	if (0 == t.length) return {}
	var i = 0,
		a = {},
		o = []
	for (var l in t) i++, a[l] = 999, o[l] = !1
	for (var l in a[parseInt(r)] = 0, e)
	for (var s = 1; s < i; s++)
		for (var l in e) {
			var u = e[l].u,
				f = e[l].v,
				d = e[l].w
			999 != a[u] && 999 != d && a[u] + d < a[f] && (a[f] = a[u] + d)
		}
	var h = !1
	for (var l in e) u = e[l].u, f = e[l].v, d = e[l].w, 999 != a[u] && a[u] + d < a[f] && (n(u), h = !0)
	if (h)
		for (var l in t) o[l] && (a[l] = "??")
	return a
}

function HasNegativeWeightCycle(t, e, r) {
	if (0 == t.length) return !1
	var n = 0,
		i = {}
	for (var a in t) n++, i[a] = 999
	for (var a in i[parseInt(r)] = 0, e)
	for (var o = 1; o < n; o++)
		for (var a in e) {
			var l = e[a].u,
				s = e[a].v,
				u = e[a].w
			999 != i[l] && 999 != u && i[l] + u < i[s] && (i[s] = i[l] + u)
		}
	var f = !1
	for (var a in e) l = e[a].u, s = e[a].v, u = e[a].w, 999 != i[l] && i[l] + u < i[s] && (f = !0)
	return f
}

function getExampleGraph(t, e) {
	if (t == CP3_4_1) {
		if (e == VL) return {
			0: {
				x: 200,
				y: 50
			},
			1: {
				x: 300,
				y: 50
			},
			2: {
				x: 300,
				y: 150
			},
			3: {
				x: 400,
				y: 50
			},
			4: {
				x: 500,
				y: 50
			},
			5: {
				x: 600,
				y: 50
			},
			6: {
				x: 500,
				y: 150
			},
			7: {
				x: 400,
				y: 150
			},
			8: {
				x: 600,
				y: 150
			}
		}
		if (e == EL) return {
			0: {
				u: 0,
				v: 1,
				w: 1
			},
			1: {
				u: 1,
				v: 0,
				w: 1
			},
			2: {
				u: 1,
				v: 2,
				w: 1
			},
			3: {
				u: 1,
				v: 3,
				w: 1
			},
			4: {
				u: 2,
				v: 1,
				w: 1
			},
			5: {
				u: 2,
				v: 3,
				w: 1
			},
			6: {
				u: 3,
				v: 1,
				w: 1
			},
			7: {
				u: 3,
				v: 2,
				w: 1
			},
			8: {
				u: 3,
				v: 4,
				w: 1
			},
			9: {
				u: 4,
				v: 3,
				w: 1
			},
			10: {
				u: 6,
				v: 7,
				w: 1
			},
			11: {
				u: 6,
				v: 8,
				w: 1
			},
			12: {
				u: 7,
				v: 6,
				w: 1
			},
			13: {
				u: 8,
				v: 6,
				w: 1
			}
		}
	} else if (t == CP3_4_3) {
		if (e == VL) return {
			0: {
				x: 200,
				y: 50
			},
			1: {
				x: 300,
				y: 50
			},
			2: {
				x: 400,
				y: 50
			},
			3: {
				x: 500,
				y: 50
			},
			4: {
				x: 200,
				y: 150
			},
			5: {
				x: 300,
				y: 150
			},
			6: {
				x: 400,
				y: 150
			},
			7: {
				x: 500,
				y: 150
			},
			8: {
				x: 200,
				y: 250
			},
			9: {
				x: 200,
				y: 350
			},
			10: {
				x: 300,
				y: 350
			},
			11: {
				x: 400,
				y: 350
			},
			12: {
				x: 500,
				y: 350
			}
		}
		if (e == EL) return {
			0: {
				u: 0,
				v: 1,
				w: 1
			},
			1: {
				u: 0,
				v: 4,
				w: 1
			},
			2: {
				u: 1,
				v: 0,
				w: 1
			},
			3: {
				u: 1,
				v: 2,
				w: 1
			},
			4: {
				u: 1,
				v: 5,
				w: 1
			},
			5: {
				u: 2,
				v: 1,
				w: 1
			},
			6: {
				u: 2,
				v: 3,
				w: 1
			},
			7: {
				u: 2,
				v: 6,
				w: 1
			},
			8: {
				u: 3,
				v: 2,
				w: 1
			},
			9: {
				u: 3,
				v: 7,
				w: 1
			},
			10: {
				u: 4,
				v: 0,
				w: 1
			},
			11: {
				u: 4,
				v: 8,
				w: 1
			},
			12: {
				u: 5,
				v: 1,
				w: 1
			},
			13: {
				u: 5,
				v: 6,
				w: 1
			},
			14: {
				u: 5,
				v: 10,
				w: 1
			},
			15: {
				u: 6,
				v: 2,
				w: 1
			},
			16: {
				u: 6,
				v: 5,
				w: 1
			},
			17: {
				u: 6,
				v: 11,
				w: 1
			},
			18: {
				u: 7,
				v: 3,
				w: 1
			},
			19: {
				u: 7,
				v: 12,
				w: 1
			},
			20: {
				u: 8,
				v: 4,
				w: 1
			},
			21: {
				u: 8,
				v: 9,
				w: 1
			},
			22: {
				u: 9,
				v: 8,
				w: 1
			},
			23: {
				u: 9,
				v: 10,
				w: 1
			},
			24: {
				u: 10,
				v: 5,
				w: 1
			},
			25: {
				u: 10,
				v: 9,
				w: 1
			},
			26: {
				u: 10,
				v: 11,
				w: 1
			},
			27: {
				u: 11,
				v: 6,
				w: 1
			},
			28: {
				u: 11,
				v: 10,
				w: 1
			},
			29: {
				u: 11,
				v: 12,
				w: 1
			},
			30: {
				u: 12,
				v: 7,
				w: 1
			},
			31: {
				u: 12,
				v: 11,
				w: 1
			}
		}
	} else if (t == CP3_4_4) {
		if (e == VL) return {
			0: {
				x: 200,
				y: 50
			},
			1: {
				x: 300,
				y: 50
			},
			2: {
				x: 300,
				y: 150
			},
			3: {
				x: 400,
				y: 50
			},
			4: {
				x: 500,
				y: 50
			},
			5: {
				x: 600,
				y: 50
			},
			6: {
				x: 400,
				y: 150
			},
			7: {
				x: 500,
				y: 150
			}
		}
		if (e == EL) return {
			0: {
				u: 0,
				v: 1,
				w: 1
			},
			1: {
				u: 0,
				v: 2,
				w: 1
			},
			2: {
				u: 1,
				v: 2,
				w: 1
			},
			3: {
				u: 1,
				v: 3,
				w: 1
			},
			4: {
				u: 2,
				v: 3,
				w: 1
			},
			5: {
				u: 2,
				v: 5,
				w: 1
			},
			6: {
				u: 3,
				v: 4,
				w: 1
			},
			7: {
				u: 7,
				v: 6,
				w: 1
			}
		}
	} else if (t == CP3_4_9) {
		if (e == VL) return {
			0: {
				x: 200,
				y: 50
			},
			1: {
				x: 300,
				y: 50
			},
			2: {
				x: 300,
				y: 150
			},
			3: {
				x: 400,
				y: 50
			},
			4: {
				x: 500,
				y: 50
			},
			5: {
				x: 600,
				y: 50
			},
			6: {
				x: 500,
				y: 150
			},
			7: {
				x: 600,
				y: 150
			}
		}
		if (e == EL) return {
			0: {
				u: 0,
				v: 1,
				w: 1
			},
			1: {
				u: 1,
				v: 3,
				w: 1
			},
			2: {
				u: 3,
				v: 2,
				w: 1
			},
			3: {
				u: 2,
				v: 1,
				w: 1
			},
			4: {
				u: 3,
				v: 4,
				w: 1
			},
			5: {
				u: 4,
				v: 5,
				w: 1
			},
			6: {
				u: 5,
				v: 7,
				w: 1
			},
			7: {
				u: 7,
				v: 6,
				w: 1
			},
			8: {
				u: 6,
				v: 4,
				w: 1
			}
		}
	} else if (t == CP3_4_10) {
		if (e == VL) return {
			0: {
				x: 200,
				y: 150
			},
			1: {
				x: 300,
				y: 50
			},
			2: {
				x: 400,
				y: 150
			},
			3: {
				x: 300,
				y: 250
			},
			4: {
				x: 200,
				y: 350
			}
		}
		if (e == EL) return {
			0: {
				u: 0,
				v: 1,
				w: 4
			},
			1: {
				u: 0,
				v: 2,
				w: 4
			},
			2: {
				u: 0,
				v: 3,
				w: 6
			},
			3: {
				u: 0,
				v: 4,
				w: 6
			},
			4: {
				u: 1,
				v: 2,
				w: 2
			},
			5: {
				u: 2,
				v: 3,
				w: 8
			},
			6: {
				u: 3,
				v: 4,
				w: 9
			}
		}
	} else if (t == CP3_4_14) {
		if (e == VL) return {
			0: {
				x: 200,
				y: 50
			},
			1: {
				x: 350,
				y: 200
			},
			2: {
				x: 350,
				y: 50
			},
			3: {
				x: 500,
				y: 200
			},
			4: {
				x: 350,
				y: 350
			}
		}
		if (e == EL) return {
			0: {
				u: 0,
				v: 1,
				w: 9
			},
			1: {
				u: 0,
				v: 2,
				w: 75
			},
			2: {
				u: 1,
				v: 2,
				w: 95
			},
			3: {
				u: 1,
				v: 3,
				w: 19
			},
			4: {
				u: 1,
				v: 4,
				w: 42
			},
			5: {
				u: 2,
				v: 3,
				w: 51
			},
			6: {
				u: 3,
				v: 4,
				w: 31
			}
		}
	} else if (t == CP3_4_17) {
		if (e == VL) return {
			0: {
				x: 315,
				y: 120
			},
			1: {
				x: 200,
				y: 50
			},
			2: {
				x: 355,
				y: 195
			},
			3: {
				x: 490,
				y: 50
			},
			4: {
				x: 370,
				y: 290
			}
		}
		if (e == EL) return {
			0: {
				u: 1,
				v: 4,
				w: 6
			},
			1: {
				u: 1,
				v: 3,
				w: 3
			},
			2: {
				u: 0,
				v: 1,
				w: 2
			},
			3: {
				u: 2,
				v: 4,
				w: 1
			},
			4: {
				u: 0,
				v: 2,
				w: 6
			},
			5: {
				u: 3,
				v: 4,
				w: 5
			},
			6: {
				u: 0,
				v: 3,
				w: 7
			}
		}
	} else if (t == CP3_4_18) {
		if (e == VL) return {
			0: {
				x: 200,
				y: 125
			},
			1: {
				x: 300,
				y: 50
			},
			2: {
				x: 300,
				y: 200
			},
			3: {
				x: 400,
				y: 125
			},
			4: {
				x: 500,
				y: 125
			}
		}
		if (e == EL) return {
			0: {
				u: 0,
				v: 1,
				w: 1
			},
			1: {
				u: 1,
				v: 3,
				w: 2
			},
			2: {
				u: 3,
				v: 4,
				w: 3
			},
			3: {
				u: 0,
				v: 2,
				w: 10
			},
			4: {
				u: 2,
				v: 3,
				w: -10
			}
		}
	} else if (t == CP3_4_19) {
		if (e == VL) return {
			0: {
				x: 200,
				y: 50
			},
			1: {
				x: 300,
				y: 50
			},
			2: {
				x: 400,
				y: 50
			},
			3: {
				x: 500,
				y: 50
			},
			4: {
				x: 300,
				y: 125
			}
		}
		if (e == EL) return {
			0: {
				u: 0,
				v: 1,
				w: 99
			},
			1: {
				u: 1,
				v: 2,
				w: 15
			},
			2: {
				u: 2,
				v: 1,
				w: -42
			},
			3: {
				u: 2,
				v: 3,
				w: 10
			},
			4: {
				u: 0,
				v: 4,
				w: -99
			}
		}
	} else if (t == CP3_4_24) {
		if (e == VL) return {
			0: {
				x: 200,
				y: 50
			},
			1: {
				x: 400,
				y: 50
			},
			2: {
				x: 200,
				y: 250
			},
			3: {
				x: 400,
				y: 250
			}
		}
		if (e == EL) return {
			0: {
				u: 0,
				v: 1,
				w: 4
			},
			1: {
				u: 1,
				v: 3,
				w: 8
			},
			2: {
				u: 0,
				v: 2,
				w: 8
			},
			3: {
				u: 2,
				v: 3,
				w: 3
			},
			4: {
				u: 2,
				v: 1,
				w: 1
			},
			5: {
				u: 1,
				v: 2,
				w: 1
			}
		}
	} else if (t == CP3_4_26_1) {
		if (e == VL) return {
			0: {
				x: 200,
				y: 150
			},
			1: {
				x: 400,
				y: 250
			},
			2: {
				x: 300,
				y: 50
			},
			3: {
				x: 300,
				y: 250
			},
			4: {
				x: 500,
				y: 150
			}
		}
		if (e == EL) return {
			0: {
				u: 0,
				v: 2,
				w: 5
			},
			1: {
				u: 0,
				v: 3,
				w: 3
			},
			2: {
				u: 2,
				v: 3,
				w: 3
			},
			3: {
				u: 3,
				v: 1,
				w: 5
			},
			4: {
				u: 2,
				v: 1,
				w: 3
			},
			5: {
				u: 2,
				v: 4,
				w: 3
			},
			6: {
				u: 1,
				v: 4,
				w: 7
			}
		}
	} else if (t == CP3_4_26_2) {
		if (e == VL) return {
			0: {
				x: 200,
				y: 150
			},
			1: {
				x: 400,
				y: 250
			},
			2: {
				x: 300,
				y: 50
			},
			3: {
				x: 300,
				y: 250
			},
			4: {
				x: 500,
				y: 150
			}
		}
		if (e == EL) return {
			0: {
				u: 0,
				v: 2,
				w: 5
			},
			1: {
				u: 0,
				v: 3,
				w: 3
			},
			2: {
				u: 2,
				v: 3,
				w: 3
			},
			3: {
				u: 3,
				v: 1,
				w: 5
			},
			4: {
				u: 2,
				v: 1,
				w: 3
			},
			5: {
				u: 2,
				v: 4,
				w: 3
			},
			6: {
				u: 1,
				v: 4,
				w: 4
			}
		}
	} else if (t == CP3_4_26_3) {
		if (e == VL) return {
			0: {
				x: 200,
				y: 150
			},
			1: {
				x: 400,
				y: 250
			},
			2: {
				x: 300,
				y: 50
			},
			3: {
				x: 300,
				y: 250
			},
			4: {
				x: 500,
				y: 150
			}
		}
		if (e == EL) return {
			0: {
				u: 0,
				v: 2,
				w: 5
			},
			1: {
				u: 0,
				v: 3,
				w: 3
			},
			2: {
				u: 3,
				v: 1,
				w: 5
			},
			3: {
				u: 2,
				v: 1,
				w: 2
			},
			4: {
				u: 2,
				v: 4,
				w: 2
			},
			5: {
				u: 1,
				v: 4,
				w: 7
			}
		}
	} else if (t == CP3_4_40) {
		if (e == VL) return {
			0: {
				x: 300,
				y: 50
			},
			1: {
				x: 400,
				y: 125
			},
			2: {
				x: 400,
				y: 275
			},
			3: {
				x: 300,
				y: 200
			},
			4: {
				x: 200,
				y: 275
			},
			5: {
				x: 200,
				y: 125
			}
		}
		if (e == EL) return {
			0: {
				u: 0,
				v: 1,
				w: 2
			},
			1: {
				u: 0,
				v: 5,
				w: 4
			},
			2: {
				u: 1,
				v: 0,
				w: 2
			},
			3: {
				u: 1,
				v: 3,
				w: 9
			},
			4: {
				u: 2,
				v: 3,
				w: 5
			},
			5: {
				u: 3,
				v: 1,
				w: 9
			},
			6: {
				u: 3,
				v: 2,
				w: 5
			},
			7: {
				u: 3,
				v: 4,
				w: 1
			},
			8: {
				u: 4,
				v: 3,
				w: 1
			},
			9: {
				u: 5,
				v: 0,
				w: 4
			}
		}
	} else if (t == K5) {
		if (e == VL) return {
			0: {
				x: 280,
				y: 150
			},
			1: {
				x: 620,
				y: 150
			},
			2: {
				x: 350,
				y: 340
			},
			3: {
				x: 450,
				y: 50
			},
			4: {
				x: 550,
				y: 340
			}
		}
		if (e == EL) return {
			0: {
				u: 0,
				v: 1,
				w: 24
			},
			1: {
				u: 0,
				v: 2,
				w: 13
			},
			2: {
				u: 0,
				v: 3,
				w: 13
			},
			3: {
				u: 0,
				v: 4,
				w: 22
			},
			4: {
				u: 1,
				v: 2,
				w: 22
			},
			5: {
				u: 1,
				v: 3,
				w: 13
			},
			6: {
				u: 1,
				v: 4,
				w: 13
			},
			7: {
				u: 2,
				v: 3,
				w: 19
			},
			8: {
				u: 2,
				v: 4,
				w: 14
			},
			9: {
				u: 3,
				v: 4,
				w: 19
			}
		}
	} else if (t == RAIL) {
		if (e == VL) return {
			0: {
				x: 50,
				y: 50
			},
			1: {
				x: 200,
				y: 50
			},
			2: {
				x: 350,
				y: 50
			},
			3: {
				x: 500,
				y: 50
			},
			4: {
				x: 650,
				y: 50
			},
			5: {
				x: 50,
				y: 200
			},
			6: {
				x: 200,
				y: 200
			},
			7: {
				x: 350,
				y: 200
			},
			8: {
				x: 500,
				y: 200
			},
			9: {
				x: 650,
				y: 200
			}
		}
		if (e == EL) return {
			0: {
				u: 0,
				v: 1,
				w: 10
			},
			1: {
				u: 1,
				v: 2,
				w: 10
			},
			2: {
				u: 1,
				v: 6,
				w: 8
			},
			3: {
				u: 1,
				v: 7,
				w: 13
			},
			4: {
				u: 2,
				v: 3,
				w: 10
			},
			5: {
				u: 2,
				v: 7,
				w: 8
			},
			6: {
				u: 2,
				v: 8,
				w: 13
			},
			7: {
				u: 3,
				v: 4,
				w: 10
			},
			8: {
				u: 3,
				v: 8,
				w: 8
			},
			9: {
				u: 5,
				v: 6,
				w: 10
			},
			10: {
				u: 6,
				v: 7,
				w: 10
			},
			11: {
				u: 7,
				v: 8,
				w: 10
			},
			12: {
				u: 8,
				v: 9,
				w: 10
			}
		}
	} else if (t == TESSELLATION) {
		if (e == VL) return {
			0: {
				x: 200,
				y: 50
			},
			1: {
				x: 200,
				y: 170
			},
			2: {
				x: 350,
				y: 110
			},
			3: {
				x: 500,
				y: 170
			},
			4: {
				x: 275,
				y: 290
			},
			5: {
				x: 500,
				y: 290
			},
			6: {
				x: 600,
				y: 50
			},
			7: {
				x: 640,
				y: 240
			},
			8: {
				x: 700,
				y: 120
			}
		}
		if (e == EL) return {
			0: {
				u: 0,
				v: 1,
				w: 8
			},
			1: {
				u: 0,
				v: 2,
				w: 12
			},
			2: {
				u: 1,
				v: 2,
				w: 13
			},
			3: {
				u: 1,
				v: 3,
				w: 25
			},
			4: {
				u: 1,
				v: 4,
				w: 9
			},
			5: {
				u: 2,
				v: 3,
				w: 14
			},
			6: {
				u: 2,
				v: 6,
				w: 21
			},
			7: {
				u: 3,
				v: 4,
				w: 20
			},
			8: {
				u: 3,
				v: 5,
				w: 8
			},
			9: {
				u: 3,
				v: 6,
				w: 12
			},
			10: {
				u: 3,
				v: 7,
				w: 12
			},
			11: {
				u: 3,
				v: 8,
				w: 16
			},
			12: {
				u: 4,
				v: 5,
				w: 19
			},
			13: {
				u: 5,
				v: 7,
				w: 11
			},
			14: {
				u: 6,
				v: 8,
				w: 11
			},
			15: {
				u: 7,
				v: 8,
				w: 9
			}
		}
	} else if (t == BELLMANFORD_KILLER) {
		if (e == VL) return {
			0: {
				x: 100,
				y: 50
			},
			1: {
				x: 175,
				y: 50
			},
			2: {
				x: 250,
				y: 50
			},
			3: {
				x: 325,
				y: 50
			},
			4: {
				x: 400,
				y: 50
			},
			5: {
				x: 475,
				y: 50
			},
			6: {
				x: 550,
				y: 50
			}
		}
		if (e == EL) return {
			0: {
				u: 5,
				v: 6,
				w: 1
			},
			1: {
				u: 4,
				v: 5,
				w: 2
			},
			2: {
				u: 3,
				v: 4,
				w: 3
			},
			3: {
				u: 2,
				v: 3,
				w: 4
			},
			4: {
				u: 1,
				v: 2,
				w: 5
			},
			5: {
				u: 0,
				v: 1,
				w: 6
			}
		}
	} else if (t == DIJKSTRA_KILLER) {
		if (e == VL) return {
			0: {
				x: 100,
				y: 150
			},
			1: {
				x: 150,
				y: 50
			},
			2: {
				x: 200,
				y: 150
			},
			3: {
				x: 250,
				y: 50
			},
			4: {
				x: 300,
				y: 150
			},
			5: {
				x: 350,
				y: 50
			},
			6: {
				x: 400,
				y: 150
			},
			7: {
				x: 450,
				y: 50
			},
			8: {
				x: 500,
				y: 150
			},
			9: {
				x: 550,
				y: 50
			},
			10: {
				x: 600,
				y: 150
			}
		}
		if (e == EL) return {
			0: {
				u: 1,
				v: 2,
				w: -32
			},
			1: {
				u: 3,
				v: 4,
				w: -16
			},
			2: {
				u: 5,
				v: 6,
				w: -8
			},
			3: {
				u: 7,
				v: 8,
				w: -4
			},
			4: {
				u: 9,
				v: 10,
				w: -2
			},
			5: {
				u: 0,
				v: 2,
				w: 0
			},
			6: {
				u: 2,
				v: 4,
				w: 0
			},
			7: {
				u: 4,
				v: 6,
				w: 0
			},
			8: {
				u: 6,
				v: 8,
				w: 0
			},
			9: {
				u: 8,
				v: 10,
				w: 0
			},
			10: {
				u: 8,
				v: 9,
				w: 1
			},
			11: {
				u: 6,
				v: 7,
				w: 2
			},
			12: {
				u: 4,
				v: 5,
				w: 4
			},
			13: {
				u: 2,
				v: 3,
				w: 8
			},
			14: {
				u: 0,
				v: 1,
				w: 16
			}
		}
	} else if (t == DAG) {
		if (e == VL) return {
			0: {
				x: 280,
				y: 110
			},
			1: {
				x: 400,
				y: 50
			},
			2: {
				x: 200,
				y: 250
			},
			3: {
				x: 500,
				y: 110
			},
			4: {
				x: 500,
				y: 250
			},
			5: {
				x: 600,
				y: 50
			}
		}
		if (e == EL) return {
			0: {
				u: 0,
				v: 1,
				w: 1
			},
			1: {
				u: 0,
				v: 2,
				w: 7
			},
			2: {
				u: 1,
				v: 3,
				w: 9
			},
			3: {
				u: 1,
				v: 5,
				w: 15
			},
			4: {
				u: 2,
				v: 4,
				w: 4
			},
			5: {
				u: 3,
				v: 4,
				w: 10
			},
			6: {
				u: 3,
				v: 5,
				w: 5
			},
			7: {
				u: 4,
				v: 5,
				w: 3
			}
		}
	} else if (t == FORDFULKERSON_KILLER) {
		if (e == VL) return {
			0: {
				x: 200,
				y: 150
			},
			1: {
				x: 300,
				y: 250
			},
			2: {
				x: 300,
				y: 50
			},
			3: {
				x: 400,
				y: 150
			}
		}
		if (e == EL) return {
			0: {
				u: 0,
				v: 1,
				w: 8
			},
			1: {
				u: 0,
				v: 2,
				w: 8
			},
			2: {
				u: 1,
				v: 3,
				w: 8
			},
			3: {
				u: 2,
				v: 3,
				w: 8
			},
			4: {
				u: 2,
				v: 1,
				w: 1
			}
		}
	} else if (t == DINIC_SHOWCASE) {
		if (e == VL) return {
			0: {
				x: 100,
				y: 100
			},
			1: {
				x: 400,
				y: 50
			},
			2: {
				x: 400,
				y: 150
			},
			3: {
				x: 300,
				y: 200
			},
			4: {
				x: 250,
				y: 250
			},
			5: {
				x: 200,
				y: 300
			},
			6: {
				x: 500,
				y: 200
			},
			7: {
				x: 550,
				y: 250
			},
			8: {
				x: 600,
				y: 300
			},
			9: {
				x: 700,
				y: 100
			}
		}
		if (e == EL) return {
			0: {
				u: 0,
				v: 9,
				w: 7
			},
			1: {
				u: 0,
				v: 1,
				w: 5
			},
			2: {
				u: 1,
				v: 9,
				w: 4
			},
			3: {
				u: 0,
				v: 2,
				w: 8
			},
			4: {
				u: 2,
				v: 9,
				w: 9
			},
			5: {
				u: 0,
				v: 3,
				w: 3
			},
			6: {
				u: 3,
				v: 6,
				w: 1
			},
			7: {
				u: 6,
				v: 9,
				w: 1
			},
			8: {
				u: 0,
				v: 4,
				w: 3
			},
			9: {
				u: 4,
				v: 7,
				w: 4
			},
			10: {
				u: 7,
				v: 9,
				w: 6
			},
			11: {
				u: 0,
				v: 5,
				w: 7
			},
			12: {
				u: 5,
				v: 8,
				w: 6
			},
			13: {
				u: 8,
				v: 9,
				w: 5
			}
		}
	} else if (t == MVC_U_TWO_APPROX_KILLER) {
		if (e == VL) return {
			0: {
				x: 100,
				y: 100,
				w: 2
			},
			1: {
				x: 100,
				y: 200,
				w: 3
			},
			2: {
				x: 100,
				y: 300,
				w: 4
			},
			3: {
				x: 100,
				y: 400,
				w: 7
			},
			4: {
				x: 200,
				y: 100,
				w: 1
			},
			5: {
				x: 200,
				y: 200,
				w: 5
			},
			6: {
				x: 200,
				y: 300,
				w: 6
			},
			7: {
				x: 200,
				y: 400,
				w: 9
			}
		}
		if (e == EL) return {
			0: {
				u: 0,
				v: 4,
				w: 1
			},
			1: {
				u: 1,
				v: 5,
				w: 1
			},
			2: {
				u: 2,
				v: 6,
				w: 1
			},
			3: {
				u: 3,
				v: 7,
				w: 1
			}
		}
	} else if (t == EXAMPLE_VERTEX_WEIGHTED_TREE) {
		if (e == VL) return {
			0: {
				x: 150,
				y: 100,
				w: 2
			},
			1: {
				x: 100,
				y: 200,
				w: 9
			},
			2: {
				x: 150,
				y: 200,
				w: 9
			},
			3: {
				x: 200,
				y: 200,
				w: 9
			},
			4: {
				x: 50,
				y: 300,
				w: 1
			},
			5: {
				x: 100,
				y: 300,
				w: 1
			},
			6: {
				x: 150,
				y: 300,
				w: 1
			},
			7: {
				x: 200,
				y: 300,
				w: 1
			},
			8: {
				x: 50,
				y: 400,
				w: 3
			},
			9: {
				x: 100,
				y: 400,
				w: 2
			},
			10: {
				x: 150,
				y: 400,
				w: 4
			},
			11: {
				x: 150,
				y: 500,
				w: 5
			},
			12: {
				x: 200,
				y: 500,
				w: 1
			}
		}
		if (e == EL) return {
			0: {
				u: 0,
				v: 1
			},
			1: {
				u: 0,
				v: 2
			},
			2: {
				u: 0,
				v: 3
			},
			3: {
				u: 1,
				v: 4
			},
			4: {
				u: 2,
				v: 5
			},
			5: {
				u: 3,
				v: 6
			},
			6: {
				u: 3,
				v: 7
			},
			7: {
				u: 7,
				v: 8
			},
			8: {
				u: 7,
				v: 9
			},
			9: {
				u: 7,
				v: 10
			},
			10: {
				u: 10,
				v: 11
			},
			11: {
				u: 11,
				v: 12
			}
		}
	} else if (t == MVC_W_TWO_APPROX_KILLER) {
		if (e == VL) return {
			0: {
				x: 200,
				y: 100,
				w: 5
			},
			1: {
				x: 100,
				y: 200,
				w: 1
			},
			2: {
				x: 150,
				y: 200,
				w: 2
			},
			3: {
				x: 200,
				y: 200,
				w: 2
			},
			4: {
				x: 250,
				y: 200,
				w: 3
			}
		}
		if (e == EL) return {
			0: {
				u: 0,
				v: 1
			},
			1: {
				u: 0,
				v: 2
			},
			2: {
				u: 0,
				v: 3
			},
			3: {
				u: 0,
				v: 4
			}
		}
	} else if (t == INTERESTING_BIPARTITE) {
		if (e == VL) return {
			0: {
				x: 100,
				y: 100,
				w: 2
			},
			1: {
				x: 100,
				y: 200,
				w: 3
			},
			2: {
				x: 100,
				y: 300,
				w: 4
			},
			3: {
				x: 200,
				y: 100,
				w: 7
			},
			4: {
				x: 200,
				y: 200,
				w: 1
			},
			5: {
				x: 200,
				y: 300,
				w: 5
			}
		}
		if (e == EL) return {
			0: {
				u: 0,
				v: 3,
				w: 1
			},
			1: {
				u: 0,
				v: 4,
				w: 1
			},
			2: {
				u: 2,
				v: 5,
				w: 1
			},
			3: {
				u: 1,
				v: 5,
				w: 1
			},
			4: {
				u: 0,
				v: 5,
				w: 1
			}
		}
	} else if (t == LINEAR_CHAIN) {
		if (e == VL) return {
			0: {
				x: 100,
				y: 100,
				w: 3
			},
			1: {
				x: 200,
				y: 100,
				w: 1
			},
			2: {
				x: 300,
				y: 100,
				w: 4
			},
			3: {
				x: 400,
				y: 100,
				w: 2
			},
			4: {
				x: 500,
				y: 100,
				w: 9
			},
			5: {
				x: 600,
				y: 100,
				w: 1
			},
			6: {
				x: 700,
				y: 100,
				w: 2
			},
			7: {
				x: 800,
				y: 100,
				w: 9
			}
		}
		if (e == EL) return {
			0: {
				u: 0,
				v: 1,
				w: 3
			},
			1: {
				u: 1,
				v: 2,
				w: 1
			},
			2: {
				u: 2,
				v: 3,
				w: 2
			},
			3: {
				u: 3,
				v: 4,
				w: 4
			},
			4: {
				u: 4,
				v: 5,
				w: 5
			},
			5: {
				u: 5,
				v: 6,
				w: 9
			},
			6: {
				u: 6,
				v: 7,
				w: 8
			}
		}
	} else if (t == CS4234_SAMPLE) {
		if (e == VL) return {
			0: {
				x: 100,
				y: 100,
				w: 1
			},
			1: {
				x: 200,
				y: 100,
				w: 1
			},
			2: {
				x: 300,
				y: 100,
				w: 1
			},
			3: {
				x: 400,
				y: 100,
				w: 1
			},
			4: {
				x: 200,
				y: 200,
				w: 1
			},
			5: {
				x: 300,
				y: 200,
				w: 1
			},
			6: {
				x: 400,
				y: 200,
				w: 1
			},
			7: {
				x: 400,
				y: 300,
				w: 1
			}
		}
		if (e == EL) return {
			0: {
				u: 0,
				v: 1,
				w: 1
			},
			1: {
				u: 1,
				v: 2,
				w: 1
			},
			2: {
				u: 1,
				v: 4,
				w: 1
			},
			3: {
				u: 2,
				v: 3,
				w: 1
			},
			4: {
				u: 2,
				v: 5,
				w: 1
			},
			5: {
				u: 3,
				v: 6,
				w: 1
			},
			6: {
				u: 4,
				v: 5,
				w: 1
			},
			7: {
				u: 5,
				v: 6,
				w: 1
			},
			8: {
				u: 6,
				v: 7,
				w: 1
			}
		}
	} else if (t == K8) {
		if (e == VL) return {
			0: {
				x: 200,
				y: 100
			},
			1: {
				x: 400,
				y: 100
			},
			2: {
				x: 500,
				y: 250
			},
			3: {
				x: 500,
				y: 400
			},
			4: {
				x: 400,
				y: 550
			},
			5: {
				x: 200,
				y: 550
			},
			6: {
				x: 100,
				y: 400
			},
			7: {
				x: 100,
				y: 250
			}
		}
		if (e == EL) return {
			0: {
				u: 0,
				v: 1,
				w: 13
			},
			1: {
				u: 0,
				v: 2,
				w: 13
			},
			2: {
				u: 0,
				v: 3,
				w: 12
			},
			3: {
				u: 0,
				v: 4,
				w: 12
			},
			4: {
				u: 0,
				v: 5,
				w: 13
			},
			5: {
				u: 0,
				v: 6,
				w: 14
			},
			6: {
				u: 0,
				v: 7,
				w: 12
			},
			7: {
				u: 1,
				v: 2,
				w: 14
			},
			8: {
				u: 1,
				v: 3,
				w: 14
			},
			9: {
				u: 1,
				v: 4,
				w: 13
			},
			10: {
				u: 1,
				v: 5,
				w: 14
			},
			11: {
				u: 1,
				v: 6,
				w: 13
			},
			12: {
				u: 1,
				v: 7,
				w: 12
			},
			13: {
				u: 2,
				v: 3,
				w: 13
			},
			14: {
				u: 2,
				v: 4,
				w: 13
			},
			15: {
				u: 2,
				v: 5,
				w: 12
			},
			16: {
				u: 2,
				v: 6,
				w: 12
			},
			17: {
				u: 2,
				v: 7,
				w: 12
			},
			18: {
				u: 3,
				v: 4,
				w: 13
			},
			19: {
				u: 3,
				v: 5,
				w: 13
			},
			20: {
				u: 3,
				v: 6,
				w: 13
			},
			21: {
				u: 3,
				v: 7,
				w: 13
			},
			22: {
				u: 4,
				v: 5,
				w: 13
			},
			23: {
				u: 4,
				v: 6,
				w: 12
			},
			24: {
				u: 4,
				v: 7,
				w: 13
			},
			25: {
				u: 5,
				v: 6,
				w: 12
			},
			26: {
				u: 5,
				v: 7,
				w: 12
			},
			27: {
				u: 6,
				v: 7,
				w: 12
			}
		}
	} else if (t == CS4234_TUTORIAL_THREE) {
		if (e == VL) return {
			0: {
				x: 60,
				y: 320
			},
			1: {
				x: 340,
				y: 320
			},
			2: {
				x: 340,
				y: 140
			},
			3: {
				x: 240,
				y: 80
			},
			4: {
				x: 120,
				y: 80
			},
			5: {
				x: 360,
				y: 20
			}
		}
		if (e == EL) return {
			0: {
				u: 1,
				v: 0,
				w: 28
			},
			1: {
				u: 2,
				v: 0,
				w: 33
			},
			2: {
				u: 3,
				v: 0,
				w: 30
			},
			3: {
				u: 4,
				v: 0,
				w: 25
			},
			4: {
				u: 0,
				v: 5,
				w: 42
			},
			5: {
				u: 2,
				v: 1,
				w: 18
			},
			6: {
				u: 3,
				v: 1,
				w: 26
			},
			7: {
				u: 4,
				v: 1,
				w: 33
			},
			8: {
				u: 5,
				v: 1,
				w: 30
			},
			9: {
				u: 3,
				v: 2,
				w: 12
			},
			10: {
				u: 4,
				v: 2,
				w: 23
			},
			11: {
				u: 5,
				v: 2,
				w: 12
			},
			12: {
				u: 4,
				v: 3,
				w: 12
			},
			13: {
				u: 5,
				v: 3,
				w: 13
			},
			14: {
				u: 5,
				v: 4,
				w: 25
			}
		}
	} else if (t == WHEEL) {
		if (e == VL) return {
			0: {
				x: 200,
				y: 200
			},
			1: {
				x: 200,
				y: 300
			},
			2: {
				x: 100,
				y: 200
			},
			3: {
				x: 200,
				y: 100
			},
			4: {
				x: 300,
				y: 200
			}
		}
		if (e == EL) return {
			0: {
				u: 0,
				v: 1,
				w: 13
			},
			1: {
				u: 0,
				v: 2,
				w: 13
			},
			2: {
				u: 0,
				v: 3,
				w: 13
			},
			3: {
				u: 0,
				v: 4,
				w: 13
			},
			4: {
				u: 1,
				v: 2,
				w: 13
			},
			5: {
				u: 2,
				v: 3,
				w: 13
			},
			6: {
				u: 3,
				v: 4,
				w: 13
			},
			7: {
				u: 4,
				v: 1,
				w: 13
			}
		}
	} else if (t == K4) {
		if (e == VL) return {
			0: {
				x: 300,
				y: 200
			},
			1: {
				x: 200,
				y: 400
			},
			2: {
				x: 400,
				y: 400
			},
			3: {
				x: 300,
				y: 340
			}
		}
		if (e == EL) return {
			0: {
				u: 1,
				v: 2,
				w: 25
			},
			1: {
				u: 1,
				v: 3,
				w: 13
			},
			2: {
				u: 1,
				v: 0,
				w: 25
			},
			3: {
				u: 2,
				v: 3,
				w: 13
			},
			4: {
				u: 2,
				v: 0,
				w: 25
			},
			5: {
				u: 3,
				v: 0,
				w: 13
			}
		}
	} else if (t == HOUSE_OF_CARDS) {
		if (e == VL) return {
			0: {
				x: 250,
				y: 40
			},
			1: {
				x: 200,
				y: 120
			},
			2: {
				x: 300,
				y: 120
			},
			3: {
				x: 150,
				y: 200
			},
			4: {
				x: 250,
				y: 200
			},
			5: {
				x: 350,
				y: 200
			},
			6: {
				x: 100,
				y: 280
			},
			7: {
				x: 200,
				y: 280
			},
			8: {
				x: 300,
				y: 280
			},
			9: {
				x: 400,
				y: 280
			}
		}
		if (e == EL) return {
			0: {
				u: 0,
				v: 1,
				w: 1
			},
			1: {
				u: 1,
				v: 3,
				w: 1
			},
			2: {
				u: 3,
				v: 6,
				w: 1
			},
			3: {
				u: 6,
				v: 7,
				w: 1
			},
			4: {
				u: 7,
				v: 8,
				w: 1
			},
			5: {
				u: 8,
				v: 9,
				w: 1
			},
			6: {
				v: 5,
				u: 9,
				w: 1
			},
			7: {
				v: 4,
				u: 5,
				w: 1
			},
			8: {
				v: 3,
				u: 4,
				w: 1
			},
			9: {
				v: 2,
				u: 4,
				w: 1
			},
			10: {
				v: 1,
				u: 2,
				w: 1
			},
			11: {
				u: 0,
				v: 2,
				w: 1
			},
			12: {
				u: 2,
				v: 5,
				w: 1
			},
			13: {
				u: 1,
				v: 4,
				w: 1
			},
			14: {
				u: 4,
				v: 7,
				w: 1
			},
			15: {
				u: 4,
				v: 8,
				w: 1
			},
			16: {
				u: 3,
				v: 7,
				w: 1
			},
			17: {
				u: 5,
				v: 8,
				w: 1
			}
		}
	} else if (t == FMOD) {
		if (e == VL) return {
			7: {
				x: 100,
				y: 80
			},
			0: {
				x: 220,
				y: 80
			},
			1: {
				x: 340,
				y: 80
			},
			6: {
				x: 220,
				y: 180
			},
			2: {
				x: 340,
				y: 180
			},
			3: {
				x: 460,
				y: 180
			},
			4: {
				x: 340,
				y: 280
			},
			5: {
				x: 460,
				y: 280
			}
		}
		if (e == EL) return {
			0: {
				v: 7,
				u: 0,
				w: 1
			},
			1: {
				v: 0,
				u: 1,
				w: 1
			},
			2: {
				v: 1,
				u: 3,
				w: 1
			},
			3: {
				v: 3,
				u: 2,
				w: 1
			},
			4: {
				u: 3,
				v: 5,
				w: 1
			},
			5: {
				u: 2,
				v: 1,
				w: 1
			},
			6: {
				u: 2,
				v: 4,
				w: 1
			},
			7: {
				v: 4,
				u: 5,
				w: 1
			},
			8: {
				u: 4,
				v: 6,
				w: 1
			},
			9: {
				v: 6,
				u: 0,
				w: 1
			}
		}
	} else if (t == GREEDY_AUGMENTING_PATH_KILLER) {
		if (e == VL) return {
			0: {
				x: 100,
				y: 50,
				w: 2
			},
			1: {
				x: 100,
				y: 100,
				w: 3
			},
			2: {
				x: 100,
				y: 150,
				w: 4
			},
			3: {
				x: 100,
				y: 200,
				w: 2
			},
			4: {
				x: 100,
				y: 250,
				w: 3
			},
			5: {
				x: 100,
				y: 300,
				w: 4
			},
			6: {
				x: 100,
				y: 350,
				w: 3
			},
			7: {
				x: 100,
				y: 400,
				w: 4
			},
			8: {
				x: 200,
				y: 50,
				w: 7
			},
			9: {
				x: 200,
				y: 100,
				w: 1
			},
			10: {
				x: 200,
				y: 150,
				w: 5
			},
			11: {
				x: 200,
				y: 200,
				w: 5
			},
			12: {
				x: 200,
				y: 250,
				w: 5
			},
			13: {
				x: 200,
				y: 300,
				w: 5
			},
			14: {
				x: 200,
				y: 350,
				w: 5
			},
			15: {
				x: 200,
				y: 400,
				w: 5
			}
		}
		if (e == EL) return {
			0: {
				u: 0,
				v: 8,
				w: 1
			},
			1: {
				u: 0,
				v: 9,
				w: 1
			},
			2: {
				u: 1,
				v: 8,
				w: 1
			},
			3: {
				u: 2,
				v: 10,
				w: 1
			},
			4: {
				u: 2,
				v: 11,
				w: 1
			},
			5: {
				u: 3,
				v: 10,
				w: 1
			},
			6: {
				u: 4,
				v: 12,
				w: 1
			},
			7: {
				u: 4,
				v: 13,
				w: 1
			},
			8: {
				u: 5,
				v: 12,
				w: 1
			},
			9: {
				u: 6,
				v: 14,
				w: 1
			},
			10: {
				u: 6,
				v: 15,
				w: 1
			},
			11: {
				u: 7,
				v: 14,
				w: 1
			}
		}
	} else if (t == K55) {
		if (e == VL) return {
			0: {
				x: 100,
				y: 50,
				w: 2
			},
			1: {
				x: 100,
				y: 100,
				w: 3
			},
			2: {
				x: 100,
				y: 150,
				w: 4
			},
			3: {
				x: 100,
				y: 200,
				w: 2
			},
			4: {
				x: 100,
				y: 250,
				w: 3
			},
			5: {
				x: 200,
				y: 50,
				w: 7
			},
			6: {
				x: 200,
				y: 100,
				w: 1
			},
			7: {
				x: 200,
				y: 150,
				w: 5
			},
			8: {
				x: 200,
				y: 200,
				w: 5
			},
			9: {
				x: 200,
				y: 250,
				w: 5
			}
		}
		if (e == EL) return {
			0: {
				u: 0,
				v: 5,
				w: 1
			},
			1: {
				u: 0,
				v: 6,
				w: 1
			},
			2: {
				u: 0,
				v: 7,
				w: 1
			},
			3: {
				u: 0,
				v: 8,
				w: 1
			},
			4: {
				u: 0,
				v: 9,
				w: 1
			},
			5: {
				u: 1,
				v: 5,
				w: 1
			},
			6: {
				u: 1,
				v: 6,
				w: 1
			},
			7: {
				u: 1,
				v: 7,
				w: 1
			},
			8: {
				u: 1,
				v: 8,
				w: 1
			},
			9: {
				u: 1,
				v: 9,
				w: 1
			},
			10: {
				u: 2,
				v: 5,
				w: 1
			},
			11: {
				u: 2,
				v: 6,
				w: 1
			},
			12: {
				u: 2,
				v: 7,
				w: 1
			},
			13: {
				u: 2,
				v: 8,
				w: 1
			},
			14: {
				u: 2,
				v: 9,
				w: 1
			},
			15: {
				u: 3,
				v: 5,
				w: 1
			},
			16: {
				u: 3,
				v: 6,
				w: 1
			},
			17: {
				u: 3,
				v: 7,
				w: 1
			},
			18: {
				u: 3,
				v: 8,
				w: 1
			},
			19: {
				u: 3,
				v: 9,
				w: 1
			},
			20: {
				u: 4,
				v: 5,
				w: 1
			},
			21: {
				u: 4,
				v: 6,
				w: 1
			},
			22: {
				u: 4,
				v: 7,
				w: 1
			},
			23: {
				u: 4,
				v: 8,
				w: 1
			},
			24: {
				u: 4,
				v: 9,
				w: 1
			}
		}
	} else if (t == K55_ALMOST) {
		if (e == VL) return {
			0: {
				x: 100,
				y: 50,
				w: 2
			},
			1: {
				x: 100,
				y: 100,
				w: 3
			},
			2: {
				x: 100,
				y: 150,
				w: 4
			},
			3: {
				x: 100,
				y: 200,
				w: 2
			},
			4: {
				x: 100,
				y: 250,
				w: 3
			},
			5: {
				x: 200,
				y: 50,
				w: 7
			},
			6: {
				x: 200,
				y: 100,
				w: 1
			},
			7: {
				x: 200,
				y: 150,
				w: 5
			},
			8: {
				x: 200,
				y: 200,
				w: 5
			},
			9: {
				x: 200,
				y: 250,
				w: 5
			}
		}
		if (e == EL) return {
			0: {
				u: 0,
				v: 5,
				w: 1
			},
			1: {
				u: 0,
				v: 6,
				w: 1
			},
			2: {
				u: 0,
				v: 8,
				w: 1
			},
			3: {
				u: 0,
				v: 9,
				w: 1
			},
			4: {
				u: 1,
				v: 6,
				w: 1
			},
			5: {
				u: 1,
				v: 7,
				w: 1
			},
			6: {
				u: 1,
				v: 8,
				w: 1
			},
			7: {
				u: 2,
				v: 5,
				w: 1
			},
			8: {
				u: 2,
				v: 6,
				w: 1
			},
			9: {
				u: 2,
				v: 7,
				w: 1
			},
			10: {
				u: 2,
				v: 8,
				w: 1
			},
			11: {
				u: 2,
				v: 9,
				w: 1
			},
			12: {
				u: 3,
				v: 5,
				w: 1
			},
			13: {
				u: 3,
				v: 7,
				w: 1
			},
			14: {
				u: 3,
				v: 8,
				w: 1
			},
			15: {
				u: 3,
				v: 9,
				w: 1
			},
			16: {
				u: 4,
				v: 5,
				w: 1
			}
		}
	}
}

function deepCopy(t) {
	var e, r
	if (t instanceof Array)
		for (e = [], r = 0; r < t.length; r++) e.push(deepCopy(t[r]))
	else if (t instanceof Object)
		for (keys in e = {}, t) e[keys] = deepCopy(t[keys])
	else e = t
	return e
}

function GraphVisu(t, e, r, n, i, a) {
	function o() {
		k = null, S = null, b = null
	}

	function l() {
		p.selectAll("g").remove(), E = p.append("svg:g").selectAll("path"), T = p.append("svg:g").selectAll("g"), p.append("svg:g").selectAll("text"), (T = T.data(f, function(t) {
			return t.id
		})).selectAll("circle").style("fill", function(t) {
			return t === _ ? d3.rgb(w(t.id)).brighter().toString() : w(t.id)
		})
		var t = T.enter().append("svg:g")
		t.append("svg:circle").attr("class", "node").attr("r", 16).attr("cx", function(t) {
			return t.x
		}).attr("cy", function(t) {
			return t.y
		}).style("fill", function(t) {
			return t === _ ? d3.rgb(255, 138, 39) : d3.rgb(238, 238, 238)
		}).on("mousedown", function(t) {
			d3.event.ctrlKey || (_ = (k = t) === _ ? null : k, V = null, P.style("marker-end", "url(#end-arrow)").classed("hidden", !1).attr("d", "M" + k.x + "," + k.y + "L" + k.x + "," + k.y), l())
		}).on("mouseup", function(t) {
			if (k) {
				if (P.classed("hidden", !0).style("marker-end", ""), (S = t) === k) return void o()
				var e, r, n
				if (e = k, r = S, !(n = !1 === c ? h.filter(function(t) {
					return t.source === e && t.target === r
				})[0] : h.filter(function(t) {
					return t.source === e && t.target === r || t.source === r && t.target === e
				})[0]))
					if (!1 === g) {
						var i = parseInt(Math.sqrt(Math.pow(e.x - r.x, 2) + Math.pow(e.y - r.y, 2)) / 100 + 1)
						n = {
							source: e,
							target: r,
							weight: i
						}, h.push(n)
					} else n = {
						source: e,
						target: r
					}, h.push(n)
				V = n, _ = null, l()
			}
		}), t.append("svg:text").attr("x", function(t) {
			return t.x
		}).attr("y", function(t) {
			return t.y + 16 / 3
		}).attr("class", "id").text(function(t) {
			return t.id
		}), (E = E.data(h)).classed("selected", function(t) {
			return t === V
		}), E.enter().append("svg:path").attr("class", "link").classed("selected", function(t) {
			return t === V
		}).style("marker-end", function(t) {
			if (!1 === c) return "url(#end-arrow)"
		}).attr("d", function(t) {
			var e = t.target.x - t.source.x,
				r = t.target.y - t.source.y,
				n = Math.sqrt(e * e + r * r),
				i = e / n,
				a = r / n,
				o = 17
			!0 === c && (o = 12)
			var l = t.source.x + 12 * i,
				u = t.source.y + 12 * a,
				f = t.target.x - o * i,
				d = t.target.y - o * a
			if (!0 === c) return "M" + l + "," + u + "L" + f + "," + d
			if (h.filter(function(e) {
				return e.source === t.target && e.target === t.source
			})[0]) {
				var g, x = s(l, u, f, d, g = t.source.id < t.target.id ? 1 : 2).x,
					w = s(l, u, f, d, g).y
				return "M" + s(f, d, l, u, g).x + "," + s(f, d, l, u, g).y + "L" + x + "," + w
			}
			return "M" + l + "," + u + "L" + f + "," + d
		}).on("mousedown", function(t) {
			d3.event.ctrlKey || (V = (b = t) === V ? null : b, _ = null, l())
		}), !1 === g && p.append("svg:g").selectAll("text").data(h).enter().append("svg:text").attr("class", "weight").attr("x", function(t) {
			var e
			e = t.source.id < t.target.id ? 1 : 2
			var r = 0
			return h.filter(function(e) {
				return e.source === t.target && e.target === t.source
			})[0] && (r = 2), u(t.source.x, t.source.y, t.target.x, t.target.y, e, r).x
		}).attr("y", function(t) {
			var e
			e = t.source.id < t.target.id ? 1 : 2
			var r = 0
			return h.filter(function(e) {
				return e.source === t.target && e.target === t.source
			})[0] && (r = 2), u(t.source.x, t.source.y, t.target.x, t.target.y, e, r).y
		}).text(function(t) {
			return t.weight
		}), !1 === x && p.append("svg:g").selectAll("text").data(f).enter().append("svg:text").attr("class", "weight").attr("x", function(t) {
			return t.x
		}).attr("y", function(t) {
			return t.y + 30
		}).text(function(t) {
			return t.weight
		})
		for (var e = -1, r = (f.length, h.length, []), n = 0; n < f.length; n++) f[n].id > e && (e = f[n].id)
		e++
		var i = new Array(e)
		for (n = 0; n < e; n++) i[n] = !1
		for (n = 0; n < f.length; n++) i[f[n].id] = !0
		for (n = 0; n < e; n++) {
			r[n] = []
			for (var a = 0; a < e; a++) !0 === i[n] && !0 === i[a] ? r[n][a] = "0" : r[n][a] = "x"
		}
		if (!0 === c)
			if (!0 === g)
				for (n = 0; n < h.length; n++) r[h[n].source.id][h[n].target.id] = "1", r[h[n].target.id][h[n].source.id] = "1"
			else
				for (n = 0; n < h.length; n++) r[h[n].source.id][h[n].target.id] = h[n].weight.toString(), r[h[n].target.id][h[n].source.id] = h[n].weight.toString()
		else if (!0 === g)
			for (n = 0; n < h.length; n++) r[h[n].source.id][h[n].target.id] = "1"
		else
			for (n = 0; n < h.length; n++) r[h[n].source.id][h[n].target.id] = h[n].weight.toString()
		var d = "{\"vl\":{"
		for (n = 0; n < f.length; n++) {
			var v = "\"" + n + "\":";
			(m = new Object).x = f[n].x, m.y = f[n].y, !1 === x && (m.w = f[n].weight), d += v + JSON.stringify(m), n !== f.length - 1 && (d += ",")
		}
		var y = "},\"el\":{"
		for (d = d.concat(y), n = 0; n < h.length; n++) {
			v = "\"" + n + "\":"
			var m = new Object
			for (a = 0; a < f.length; a++) f[a].id == h[n].source.id && (m.u = a), f[a].id == h[n].target.id && (m.v = a)
			m.w = 1, !1 === g && (m.w = h[n].weight), d += v + JSON.stringify(m), n !== h.length - 1 && (d += ",")
		}
		y = "}}", d = d.concat(y), JSONresult = d
	}

	function s(t, e, r, n, i) {
		if (Math.sqrt(Math.pow(r - t, 2) + Math.pow(n - e, 2)), t === r) return 1 === i ? {
			x: r - 4,
			y: n
		} : {
			x: r + 4,
			y: n
		}
		if (e === n) return 1 === i ? {
			x: r,
			y: n - 4
		} : {
			x: r,
			y: n + 4
		}
		var a = -1 / ((n - e) / (r - t)),
			o = n - a * r,
			l = Math.sqrt(Math.pow(r - t, 2) + Math.pow(n - e, 2)),
			s = o - e,
			u = 1 + a * a,
			f = 2 * a * s - 2 * t,
			d = f * f - 4 * u * (t * t + s * s - (l = l * l + 16)),
			h = (-f + (d = Math.sqrt(d))) / (2 * u),
			c = (-f - d) / (2 * u)
		return 2 === i ? {
			x: h,
			y: a * h + o
		} : {
			x: c,
			y: a * c + o
		}
	}

	function u(t, e, r, n, i, a) {
		if (Math.sqrt(Math.pow(r - t, 2) + Math.pow(n - e, 2)), n = (e + n) / 2, t === (r = (t + r) / 2)) return 2 === i ? {
			x: r + 16,
			y: n
		} : {
			x: r - 16,
			y: n
		}
		if (e === n) return 2 === i ? {
			x: r,
			y: n + 16
		} : {
			x: r,
			y: n - 16
		}
		var o = -1 / ((n - e) / (r - t)),
			l = n - o * r,
			s = Math.sqrt(Math.pow(r - t, 2) + Math.pow(n - e, 2)),
			u = 16
		1 === a && (u = 50), 2 === a && (u = 18)
		var f = l - e,
			d = 1 + o * o,
			h = 2 * o * f - 2 * t,
			c = h * h - 4 * d * (t * t + f * f - (s = s * s + u * u)),
			g = (-h + (c = Math.sqrt(c))) / (2 * d),
			x = (-h - c) / (2 * d)
		return 2 === i ? {
			x: g,
			y: o * g + l
		} : {
			x: x,
			y: o * x + l
		}
	}

	var f, d, h, c = t,
		g = e,
		x = a,
		w = d3.scale.category10()
	d3.select("#drawgraph #viz").selectAll("svg").remove()
	for (var p = d3.select("#drawgraph #viz").append("svg").attr("width", 640).attr("height", 360), v = new Array(100), y = v.length; y >= 0; y--) v[y] = 0
	for (!0 === x ? (f = [{
		id: 0,
		x: 100,
		y: 100
	}, {
		id: 1,
		x: 200,
		y: 200
	}, {
		id: 2,
		x: 300,
		y: 300
	}], d = 3) : (f = [{
		id: 0,
		x: 100,
		y: 100,
		w: 3
	}, {
		id: 1,
		x: 200,
		y: 200,
		w: 5
	}, {
		id: 2,
		x: 300,
		y: 300,
		w: 7
	}], d = 3), h = !0 === g ? [{
		source: f[0],
		target: f[1]
	}, {
		source: f[1],
		target: f[2]
	}] : [{
		source: f[0],
		target: f[1],
		weight: 2
	}, {
		source: f[1],
		target: f[2],
		weight: 2
	}], null == n || null == i ? (h = [], f = []) : (f = n, h = i), d = 0, d = f.length, y = 0; y < f.length; y++) v[f[y].id]++
	for (y = 0; y < h.length; y++)
		for (var m = 0; m < f.length; m++) f[m].id === h[y].source.id && (h[y].source = f[m]), f[m].id === h[y].target.id && (h[y].target = f[m])
	p.append("svg:defs").append("svg:marker").attr("id", "end-arrow").attr("viewBox", "0 -5 10 10").attr("refX", 6).attr("markerWidth", 3).attr("markerHeight", 3).attr("orient", "auto").append("svg:path").attr("d", "M0,-5L10,0L0,5").attr("fill", "#000")
	var E, T, P = p.append("svg:path").attr("class", "link dragline hidden").attr("d", "M0,0L0,0"),
		_ = null,
		V = null,
		b = null,
		k = null,
		S = null,
		L = d3.behavior.drag().on("drag", function(t) {
			var e, r
			d3.select(this).select("circle").attr("cx", function() {
				return e = d3.mouse($("svg")[0])[0]
			}).attr("cy", function() {
				return r = d3.mouse($("svg")[0])[1]
			}), t.x = e, t.y = r, t.x = parseInt(t.x) - parseInt(t.x) % 20, t.y = parseInt(t.y) - parseInt(t.y) % 20, l()
		})
	p.on("mousedown", function() {
		if (p.classed("active", !0), !(d3.event.ctrlKey || k || b)) {
			var t = d3.mouse(this),
				e = {
					id: d
				}
			v[d]++
			for (var r = 0; r < 100; r++)
				if (0 === v[r]) {
					d = r
					break
				}
			e.x = t[0], e.y = t[1], !1 === x && (e.weight = 1), e.x = parseInt(e.x) - parseInt(e.x) % 20, e.y = parseInt(e.y) - parseInt(e.y) % 20, f.push(e), l()
		}
	}).on("mousemove", function() {
		k && (P.attr("d", "M" + k.x + "," + k.y + "L" + d3.mouse(this)[0] + "," + d3.mouse(this)[1]), l())
	}).on("mouseup", function() {
		k && P.classed("hidden", !0), p.classed("active", !1), o()
	}), d3.select(window).on("keydown", function() {
		if (d3.event.keyCode, 17 === d3.event.keyCode && (T.call(L), p.classed("ctrl", !0)), _ || V) switch (d3.event.keyCode) {
			case 46:
				if (_) {
					f.splice(f.indexOf(_), 1),
						function(t) {
							h.filter(function(e) {
								return e.source === t || e.target === t
							}).map(function(t) {
								h.splice(h.indexOf(t), 1)
							})
						}(_), v[_.id] = 0
					for (var t = 0; t < 100; t++)
						if (0 === v[t]) {
							d = t
							break
						}
				} else V && h.splice(h.indexOf(V), 1)
				V = null, _ = null, l()
				break
			case 13:
				if (V && !1 === g) {
					for (; ;) {
						r = prompt("Enter new weight: (<= 99)");
						if (r <= 99) break;
					}
					var e = h.indexOf(V)
					h[e].weight = r
				} else if (_ && !1 === x) {
					for (; ;) {
						r = prompt("Enter new weight: (<= 99)");
						if (r <= 99) break;
					}
					e = f.indexOf(_)
					f[e].weight = r
				}
				l()
		}
	}).on("keyup", function() {
		17 === d3.event.keyCode && (T.on("mousedown.drag", null).on("touchstart.drag", null), p.classed("ctrl", !1))
	}), l()
}

function write(t, e, r) {
	void 0 === r && (r = "true")
	var n = "  <script>var JSONresult;<\/script>    <div id=\"main\">      <div id=\"draw-status\"><p>Status</p></div>      <div id=\"draw-warn\"><p>No Warning</p></div>      <div id=\"draw-err\"><p>No Error</p></div>      <div id=\"viz\">        <svg onClick = \"GraphVisu(" + t + "," + e + ",null,null,null," + r + "); \" width=\"640\" height=\"360\"><defs><marker id=\"end-arrow\" viewBox=\"0 -5 10 10\" refX=\"6\" markerWidth=\"3\" markerHeight=\"3\" orient=\"auto\"><path d=\"M0,-5L10,0L0,5\" fill=\"#000\"></path></marker></defs><path class=\"link dragline hidden\" d=\"M0,0L0,0\"></path><g><path class=\"link\" d=\"M108.48528137423857,108.48528137423857L191.51471862576142,191.51471862576142\"></path><path class=\"link\" d=\"M208.48528137423858,208.48528137423858L291.5147186257614,291.5147186257614\"></path></g><g><g><circle class=\"node\" r=\"16\" cx=\"100\" cy=\"100\" style=\"fill: rgb(238, 238, 238);\"></circle><text x=\"100\" y=\"105.33333333333333\" class=\"id\">0</text></g><g><circle class=\"node\" r=\"16\" cx=\"200\" cy=\"200\" style=\"fill: rgb(238, 238, 238);\"></circle><text x=\"200\" y=\"205.33333333333334\" class=\"id\">1</text></g><g><circle class=\"node\" r=\"16\" cx=\"300\" cy=\"300\" style=\"fill: rgb(238, 238, 238);\"></circle><text x=\"300\" y=\"305.3333333333333\" class=\"id\">2</text></g></g><g></g>        <text x = \"250\" y = \"100\"> &bull; Click on empty space to add vertex</text>        <text x = \"250\" y = \"125\"> &bull; Drag from vertex to vertex to add edge</text>        <text x = \"250\" y = \"150\"> &bull; Select + Delete to delete vertex/edge</text>        <text x = \"250\" y = \"175\"> &bull; Select Edge + Enter to change edge's weight</text>      </svg>    </div>    <div id=\"drawgraph-actions\">      <p onclick=drawCancel()>Cancel</p>      <p onclick=GraphVisu(" + t + "," + e + "," + r + ")>Clear</p>      <p onclick=drawDone()>Done</p>      <form id=\"drawgraph-form\">        \x3c!--<input type=\"checkbox\" id=\"submit\" name=\"submit\" value=\"submit\" checked=\"checked\">Submit drawn graph to database for random graph and online quiz purposes        <br>--\x3e<input type=\"checkbox\" id=\"copy\" name=\"submit\" value=\"submit\" checked=\"checked\">Copy JSON text to clipboard      </form>    </div>  "
	$("#drawgraph").html(n), $("#copy").removeAttr("checked")
}

const OBJ_HIDDEN = -1,
	VERTEX_SHAPE_CIRCLE = "circle",
	VERTEX_SHAPE_RECT = "rect",
	VERTEX_DEFAULT = "default",
	VERTEX_NORMAL_BLUE = "normal_blue",
	VERTEX_NORMAL_GREEN = "normal_green",
	VERTEX_HIGHLIGHTED = "highlighted",
	VERTEX_HIGHLIGHTED_RECT = "highlighted_rect",
	VERTEX_TRAVERSED = "traversed",
	VERTEX_RESULT = "result",
	VERTEX_RESULT_RECT = "result_rect",
	VERTEX_RECT = "rect",
	VERTEX_BLUE_FILL = "blueFill",
	VERTEX_GREEN_FILL = "greenFill",
	VERTEX_GREY_FILL = "greyFill",
	VERTEX_PINK_FILL = "pinkFill",
	VERTEX_RED_FILL = "redFill",
	VERTEX_BLUE_OUTLINE = "blueOutline",
	VERTEX_GREEN_OUTLINE = "greenOutline",
	VERTEX_GREY_OUTLINE = "greyOutline",
	VERTEX_PINK_OUTLINE = "pinkOutline",
	VERTEX_RED_OUTLINE = "redOutline",
	EDGE_DEFAULT = "default",
	EDGE_HIGHLIGHTED = "highlighted",
	EDGE_TRAVERSED = "traversed",
	EDGE_BLUE = "blue",
	EDGE_GREEN = "green",
	EDGE_GREY = "grey",
	EDGE_PINK = "pink",
	EDGE_RED = "red",
	EDGE_TYPE_UDE = 0,
	EDGE_TYPE_DE = 1,
	EDGE_TYPE_BDE = 2,
	POLYGON_DEFAULT = "default",
	POLYGON_HIDDEN = "hidden",
	POLYGON_BLUE_FILL = "blueFill",
	POLYGON_GREEN_FILL = "greenFill",
	POLYGON_GREY_FILL = "greyFill",
	POLYGON_PINK_FILL = "pinkFill",
	POLYGON_RED_FILL = "redFill",
	POLYGON_BLUE_TRANSPARENT = "blueTransparent",
	POLYGON_GREEN_TRANSPARENT = "greenTransparent",
	POLYGON_GREY_TRANSPARENT = "greyTransparent",
	POLYGON_PINK_TRANSPARENT = "pinkTransparent",
	POLYGON_RED_TRANSPARENT = "redTransparent",
	NO_ITERATION = -1,
	NO_STATELIST = {},
	ANIMATION_PLAY = 1,
	ANIMATION_PAUSE = 0,
	ANIMATION_STOP = -1,
	UPDATE_FORWARD = !0,
	UPDATE_BACKWARD = !1,
	MODE_GET_ALL_SUBMITTED_GRAPHS_SUMMARY = 21,
	MODE_SUBMIT_GRAPH = 22,
	MODE_GET_SUBMITTED_GRAPH_BY_ID = 23,
	MODE_GET_ALL_GRAPH_TOPICS = 24,
	MODE_DELETE_SUBMITTED_GRAPH = 25,
	MODE_COMMIT_SUBMITTED_GRAPH = 26,
	MODE_ADD_SUBMITTED_GRAPH_RATING = 27,
	MODE_GET_RANDOM_SUBMITTED_GRAPH = 28,
	MODE_GET_ALL_COMMITTED_GRAPHS_SUMMARY = 29,
	MODE_DELETE_COMMITTED_GRAPH = 30,
	MAIN_SVG_WIDTH = 1e3,
	MAIN_SVG_HEIGHT = 600,
	PSEUDOCODE_SVG_WIDTH = 300,
	PSEUDOCODE_SVG_HEIGHT = 400,
	graphVertexProperties = {
		innerVertex: {
			r: 14,
			width: 30,
			height: 30,
			"stroke-width": 0,
			default: {
				fill: "#eee",
				stroke: "#fff"
			},
			"leaf-default": {
				fill: "#ff0",
				stroke: "#fff"
			},
			lazy: {
				fill: "#eee",
				stroke: "#fff"
			},
			"leaf-lazy": {
				fill: "#ff0",
				stroke: "#fff"
			},
			normal_blue: {
				fill: "#2ebbd1",
				stroke: "#fff"
			},
			highlighted: {
				fill: "#673ab7",
				stroke: "#fff"
			},
			highlighted_rect: {
				fill: "#673ab7",
				stroke: "#fff"
			},
			traversed: {
				fill: "#eee",
				stroke: "#fff"
			},
			result: {
				fill: "#f7e81e",
				stroke: "#fff"
			},
			rect: {
				fill: "#eee",
				stroke: "#fff"
			},
			result_rect: {
				fill: "#52bc69",
				stroke: "#fff"
			},
			greenFill: {
				fill: "#52bc69",
				stroke: "#fff"
			},
			greenOutline: {
				fill: "#eee",
				stroke: "#fff"
			},
			pinkFill: {
				fill: "#ed5a7d",
				stroke: "#fff"
			},
			pinkOutline: {
				fill: "#eee",
				stroke: "#fff"
			},
			blueFill: {
				fill: "#2ebbd1",
				stroke: "#fff"
			},
			blueOutline: {
				fill: "#eee",
				stroke: "#fff"
			},
			redFill: {
				fill: "#d9513c",
				stroke: "#fff"
			},
			redOutline: {
				fill: "#eee",
				stroke: "#fff"
			},
			greyFill: {
				fill: "#cccccc",
				stroke: "#fff"
			},
			greyOutline: {
				fill: "#eee",
				stroke: "#fff"
			}
		},
		outerVertex: {
			r: 16,
			width: 32,
			height: 32,
			"stroke-width": 2,
			default: {
				fill: "#333",
				stroke: "#333"
			},
			"leaf-default": {
				fill: "#333",
				stroke: "#333"
			},
			lazy: {
				fill: "#8b00ff",
				stroke: "#8b00ff"
			},
			"leaf-lazy": {
				fill: "#8b00ff",
				stroke: "#8b00ff"
			},
			normal_blue: {
				fill: "#2ebbd1",
				stroke: "#333"
			},
			highlighted: {
				fill: "#673ab7",
				stroke: "#673ab7"
			},
			highlighted_rect: {
				fill: "#673ab7",
				stroke: "#333"
			},
			traversed: {
				fill: "#673ab7",
				stroke: "#673ab7"
			},
			result: {
				fill: "#f7e81e",
				stroke: "#f7e81e"
			},
			rect: {
				fill: "#333",
				stroke: "#333"
			},
			result_rect: {
				fill: "#52bc69",
				stroke: "#333"
			},
			greenFill: {
				fill: "#52bc69",
				stroke: "#52bc69"
			},
			greenOutline: {
				fill: "#52bc69",
				stroke: "#52bc69"
			},
			pinkFill: {
				fill: "#ed5a7d",
				stroke: "#ed5a7d"
			},
			pinkOutline: {
				fill: "#ed5a7d",
				stroke: "#ed5a7d"
			},
			blueFill: {
				fill: "#2ebbd1",
				stroke: "#2ebbd1"
			},
			blueOutline: {
				fill: "#2ebbd1",
				stroke: "#2ebbd1"
			},
			redFill: {
				fill: "#d9513c",
				stroke: "#d9513c"
			},
			redOutline: {
				fill: "#d9513c",
				stroke: "#d9513c"
			},
			greyFill: {
				fill: "#cccccc",
				stroke: "#cccccc"
			},
			greyOutline: {
				fill: "#cccccc",
				stroke: "#cccccc"
			}
		},
		text: {
			"font-size": 16,
			"font-sizes": [16, 16, 15, 13, 9, 9],
			default: {
				fill: "#333",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			},
			"leaf-default": {
				fill: "#333",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			},
			lazy: {
				fill: "#333",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			},
			"leaf-lazy": {
				fill: "#333",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			},
			normal_blue: {
				fill: "#fff",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			},
			highlighted: {
				fill: "#fff",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			},
			highlighted_rect: {
				fill: "#fff",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "left"
			},
			traversed: {
				fill: "#673ab7",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			},
			result: {
				fill: "#fff",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			},
			rect: {
				fill: "#333",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "left"
			},
			result_rect: {
				fill: "#fff",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "left"
			},
			greenFill: {
				fill: "#fff",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			},
			greenOutline: {
				fill: "#52bc69",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			},
			pinkFill: {
				fill: "#fff",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			},
			pinkOutline: {
				fill: "#ed5a7d",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			},
			blueFill: {
				fill: "#fff",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			},
			blueOutline: {
				fill: "#2ebbd1",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			},
			redFill: {
				fill: "#fff",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			},
			redOutline: {
				fill: "#d9513c",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			},
			greyFill: {
				fill: "#fff",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			},
			greyOutline: {
				fill: "#cccccc",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			}
		},
		label: {
			"font-size": 16,
			default: {
				fill: "#333",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			},
			lazy: {
				fill: "#333",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			},
			normal_blue: {
				fill: "#fff",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			},
			highlighted: {
				fill: "#673ab7",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			},
			highlighted_rect: {
				fill: "#fff",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "left"
			},
			traversed: {
				fill: "#673ab7",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			},
			result: {
				fill: "#fff",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			},
			rect: {
				fill: "#333",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "left"
			},
			result_rect: {
				fill: "#fff",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "left"
			},
			greenFill: {
				fill: "#fff",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			},
			greenOutline: {
				fill: "#52bc69",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			},
			pinkFill: {
				fill: "#fff",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			},
			pinkOutline: {
				fill: "#ed5a7d",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			},
			blueFill: {
				fill: "#fff",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			},
			blueOutline: {
				fill: "#2ebbd1",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			},
			redFill: {
				fill: "#fff",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			},
			redOutline: {
				fill: "#d9513c",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			},
			greyFill: {
				fill: "#fff",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			},
			greyOutline: {
				fill: "#cccccc",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			}
		}
	},
	graphEdgeProperties = {
		animateHighlightedPath: {
			stroke: "#673ab7",
			"stroke-width": 10
		},
		path: {
			"stroke-width": 3,
			default: {
				stroke: "#333"
			},
			highlighted: {
				stroke: "#673ab7"
			},
			traversed: {
				stroke: "#673ab7"
			},
			green: {
				stroke: "#52bc69"
			},
			pink: {
				stroke: "#ed5a7d"
			},
			blue: {
				stroke: "#2ebbd1"
			},
			red: {
				stroke: "#d9513c"
			},
			grey: {
				stroke: "#cccccc"
			}
		},
		weight: {
			"font-size": 16,
			default: {
				startOffset: "75%",
				dy: -5,
				fill: "#333",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			},
			highlighted: {
				startOffset: "75%",
				dy: -5,
				fill: "#673ab7",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			},
			traversed: {
				startOffset: "75%",
				dy: -5,
				fill: "#673ab7",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			},
			green: {
				startOffset: "75%",
				dy: -5,
				fill: "#52bc69",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			},
			pink: {
				startOffset: "75%",
				dy: -5,
				fill: "#ed5a7d",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			},
			blue: {
				startOffset: "75%",
				dy: -5,
				fill: "#2ebbd1",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			},
			red: {
				startOffset: "75%",
				dy: -5,
				fill: "#d9513c",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			},
			grey: {
				startOffset: "75%",
				dy: -5,
				fill: "#cccccc",
				"font-family": "'PT Sans', sans-serif",
				"font-weight": "bold",
				"text-anchor": "middle"
			}
		}
	},
	graphPolygonProperties = {
		polygon: {
			"stroke-width": 0,
			default: {
				fill: "#eee",
				opacity: 1
			},
			hidden: {
				fill: "#fff",
				opacity: 0
			},
			greenFill: {
				fill: "#52bc69",
				opacity: 1
			},
			greenTransparent: {
				fill: "#52bc69",
				opacity: .5
			},
			pinkFill: {
				fill: "#ed5a7d",
				opacity: 1
			},
			pinkTransparent: {
				fill: "#ed5a7d",
				opacity: .5
			},
			blueFill: {
				fill: "#2ebbd1",
				opacity: 1
			},
			blueTransparent: {
				fill: "#2ebbd1",
				opacity: .5
			},
			redFill: {
				fill: "#d9513c",
				opacity: 1
			},
			redTransparent: {
				fill: "#d9513c",
				opacity: .5
			},
			greyFill: {
				fill: "#cccccc",
				opacity: 1
			},
			greyTransparent: {
				fill: "#cccccc",
				opacity: .5
			}
		}
	},
	ARROW_MARKER_WIDTH = 3,
	ARROW_MARKER_HEIGHT = 3,
	ARROW_REFX = 9,
	ARROW_FILL = "#333"
var ObjectPair = function(t, e) {
	this.getFirst = function() {
		return t
	}, this.getSecond = function() {
		return e
	}, this.setFirst = function(e) {
		t = e
	}, this.setSecond = function(t) {
		e = t
	}
}
ObjectPair.compare = function(t, e) {
	return t.getFirst() > e.getFirst() ? 1 : t.getFirst() < e.getFirst() ? -1 : t.getSecond() > e.getSecond() ? 1 : t.getSecond() < e.getSecond() ? -1 : 0
}
var ObjectTriple = function(t, e, r) {
	this.getFirst = function() {
		return t
	}, this.getSecond = function() {
		return e
	}, this.getThird = function() {
		return r
	}, this.setFirst = function(e) {
		t = e
	}, this.setSecond = function(t) {
		e = t
	}, this.setThird = function(t) {
		r = t
	}
}
ObjectTriple.compare = function(t, e) {
	return t.getFirst() > e.getFirst() ? 1 : t.getFirst() < e.getFirst() ? -1 : t.getSecond() > e.getSecond() ? 1 : t.getSecond() < e.getSecond() ? -1 : t.getThird() > e.getThird() ? 1 : t.getThird() < e.getThird() ? -1 : 0
}
var UfdsHelper = function() {
		var t = this,
			e = {}
		this.insert = function(t) {
			if (null != e[t]) return !1
			var r = {}
			r.parent = t, r.rank = 0, e[t] = r
		}, this.findSet = function(t) {
			if (null == e[t]) return !1
			for (var r = e[t].parent, n = t; r != n;) r = e[n = r].parent
			return e[t].parent = r, r
		}, this.unionSet = function(r, n) {
			if (null == e[r] || null == e[n]) return !1
			if (t.isSameSet(r, n)) return !0
			var i = t.findSet(r),
				a = t.findSet(n)
			e[i].rank > e[a].rank ? (e[i].parent = a, e[a].rank++) : (e[a].parent = i, e[i].rank++)
		}, this.isSameSet = function(r, n) {
			return null != e[r] && null != e[n] && t.findSet(r) == t.findSet(n)
		}
	},
	VL = 0,
	EL = 1,
	CP3_4_1 = 0,
	CP3_4_3 = 1,
	CP3_4_4 = 2,
	CP3_4_9 = 3,
	CP3_4_10 = 4,
	CP3_4_14 = 5,
	CP3_4_17 = 6,
	CP3_4_18 = 7,
	CP3_4_19 = 8,
	CP3_4_24 = 9,
	CP3_4_26_1 = 10,
	CP3_4_26_2 = 11,
	CP3_4_26_3 = 12,
	CP3_4_40 = 13,
	K5 = 14,
	RAIL = 15,
	TESSELLATION = 16,
	BELLMANFORD_KILLER = 17,
	DIJKSTRA_KILLER = 18,
	DAG = 19,
	FORDFULKERSON_KILLER = 20,
	DINIC_SHOWCASE = 21,
	MVC_U_TWO_APPROX_KILLER = 22,
	EXAMPLE_VERTEX_WEIGHTED_TREE = 23,
	MVC_W_TWO_APPROX_KILLER = 24,
	INTERESTING_BIPARTITE = 25,
	LINEAR_CHAIN = 26,
	CS4234_SAMPLE = 27,
	K4 = 28,
	K8 = 29,
	CS4234_TUTORIAL_THREE = 30,
	WHEEL = 31,
	HOUSE_OF_CARDS = 32,
	FMOD = 33,
	GREEDY_AUGMENTING_PATH_KILLER = 34,
	K55 = 35,
	K55_ALMOST = 36,
	mainSvg = d3.select("#viz").append("svg").attr("width", 1e3).attr("height", 600),
	pseudocodeSvg = d3.select("#pseudocode").append("svg").attr("width", 300).attr("height", 400),
	GraphWidget = function() {
		function t(t, e) {
			var r
			for (r in t) {
				null != a[r] && null != a[r] || i.addVertex(t[r].cx, t[r].cy, t[r].text, r, !1)
				var n = a[r]
				n.showVertex(), t[r].state == OBJ_HIDDEN ? n.hideVertex() : null != t[r].state ? n.stateVertex(t[r].state) : n.stateVertex(VERTEX_DEFAULT), n.moveVertex(t[r].cx, t[r].cy), n.changeText(t[r].text), null != t[r]["text-font-size"] && n.changeTextFontSize(t[r]["text-font-size"]), null != t[r]["inner-r"] && null != t[r]["outer-r"] && n.changeRadius(t[r]["inner-r"], t[r]["outer-r"]), null != t[r]["inner-w"] && null != t[r]["outer-w"] && n.changeWidth(t[r]["inner-w"], t[r]["outer-w"]), null != t[r]["inner-h"] && null != t[r]["outer-h"] && n.changeHeight(t[r]["inner-h"], t[r]["outer-h"]), null != t[r]["inner-stroke-width"] && null != t[r]["outer-stroke-width"] && n.changeStrokeWidth(t[r]["inner-stroke-width"], t[r]["outer-stroke-width"]), null == t[r].extratext ? n.changeExtraText("") : n.changeExtraText(t[r].extratext), n.redraw(e), s[r] = !0
			}
			for (r in s) 0 == s[r] && (a[r].hideVertex(), a[r].redraw(e), s[r] = !0)
			for (r in s) s[r] = !1
		}

		function e(t, e) {
			var r
			try {
				for (r in t) {
					null != o[r] && null != o[r] || i.addEdge(t[r].vertexA, t[r].vertexB, r, t[r].type, t[r].weight, !1)
					var n = o[r]
					n.showEdge(), t[r].state == OBJ_HIDDEN ? n.hideEdge() : null != t[r].state ? n.stateEdge(t[r].state) : n.stateEdge(EDGE_DEFAULT), n.hideWeight(), t[r].state != OBJ_HIDDEN && null != t[r].displayWeight && t[r].displayWeight && n.showWeight(), n.changeVertexA(a[t[r].vertexA]), n.changeVertexB(a[t[r].vertexB]), null == t[r].type && (t[r].type = EDGE_TYPE_UDE), n.changeType(t[r].type), null != t[r].weight && n.changeWeight(t[r].weight), n.refreshPath(), null != t[r].animateHighlighted && t[r].animateHighlighted ? n.animateHighlighted(.9 * e) : n.redraw(e), u[r] = !0
				}
				for (r in u) 0 == u[r] && (o[r].hideWeight(), o[r].hideEdge(), o[r].redraw(e), u[r] = !0)
				for (r in u) u[r] = !1
			} catch (t) {
			}
		}

		function r(t, e) {
			var r
			for (r in t) {
				null != l[r] && null != l[r] || i.addPolygon(r, t[r].points, !1)
				var n = l[r]
				n.showPolygon(), null != t[r].state ? n.statePolygon(t[r].state) : n.statePolygon(POLYGON_DEFAULT), n.redraw(e), f[r] = !0
			}
			for (r in f) 0 == f[r] && (l[r].hidePolygon(), l[r].redraw(e), f[r] = !0)
			for (r in f) f[r] = !1
		}

		function n(n, i) {
			var a = Object.keys(h).length - 1
			try {
				var o
				$("#progress-bar").slider("value", d), $("#status p").html(h[d].status), highlightLine(h[d].lineNo), d == a ? (pause(), (o = $("#play img").attr("src")) && $("#play img").attr("src", o.replace("/play.png", "/replay.png").replace("/pause.png", "/replay.png")), $("#play img").attr("alt", "replay").attr("title", "replay")) : ((o = $("#play img").attr("src")) && $("#play img").attr("src", o.replace("/replay.png", "/play.png").replace("/pause.png", "/play.png")), $("#play img").attr("alt", "play").attr("title", "play"))
			} catch (t) {
			}
			t(n.vl, i), e(n.el, i), r(n.pl, i)
		}

		var i = this,
			a = {},
			o = {},
			l = {},
			s = {},
			u = {},
			f = {},
			d = -1,
			h = NO_STATELIST,
			c = -1,
			g = 500
		this.clearAll = function() {
			mainSvg.select("#polygon").empty() && (polygonSvg = mainSvg.append("g").attr("id", "polygon")), mainSvg.select("#edge").empty() && (edgeSvg = mainSvg.append("g").attr("id", "edge")), mainSvg.select("#vertex").empty() && (vertexSvg = mainSvg.append("g").attr("id", "vertex")), mainSvg.select("#vertexText").empty() && (vertexTextSvg = mainSvg.append("g").attr("id", "vertexText")), mainSvg.select("#edgeWeight").empty() && (edgeWeightSvg = mainSvg.append("g").attr("id", "edgeWeight")), mainSvg.select("#edgeWeightPath").empty() && (edgeWeightPathSvg = mainSvg.append("g").attr("id", "edgeWeightPath")), mainSvg.select("#marker").empty() && (markerSvg = mainSvg.append("g").attr("id", "marker"))
		}, i.clearAll(), this.addVertex = function(t, e, r, n, i, o) {
			0 != i && (i = !0)
			var l = new GraphVertexWidget(t, e, "circle", r, n)
			"" != o && l.changeExtraText(o), a[n] = l, s[n] = !1, 1 == i && (a[n].showVertex(), a[n].redraw()), setTimeout(function() {
				document.body.style.zoom = "100.1%"
			}, 500), setTimeout(function() {
				document.body.style.zoom = "100%"
			}, 600)
		}, this.addRectVertex = function(t, e, r, n, i, o) {
			0 != i && (i = !0), void 0 === o && (o = "rect")
			var l = new GraphVertexWidget(t, e, o, r, n)
			a[n] = l, s[n] = !1, 1 == i && (a[n].showVertex(), a[n].redraw()), setTimeout(function() {
				document.body.style.zoom = "100.1%"
			}, 500), setTimeout(function() {
				document.body.style.zoom = "100%"
			}, 600)
		}, this.addEdge = function(t, e, r, n, i, l, s) {
			try {
				0 != l && (l = !0), 1 != s && (s = !1), (null == n || isNaN(n)) && (n = EDGE_TYPE_UDE), (null == i || isNaN(i)) && (i = 1)
				var f = a[t],
					d = a[e],
					h = new GraphEdgeWidget(f, d, r, n, i)
				o[r] = h, u[r] = !1, a[t].addEdge(h), a[e].addEdge(h), 1 == l && (o[r].showEdge(), 1 == s && o[r].showWeight(), o[r].redraw()), setTimeout(function() {
					document.body.style.zoom = "100.1%"
				}, 500), setTimeout(function() {
					document.body.style.zoom = "100%"
				}, 600)
			} catch (t) {
			}
		}, this.removeEdge = function(t) {
			null != o[t] && null != o[t] && (o[t].removeEdge(), delete o[t], delete u[t], setTimeout(function() {
				document.body.style.zoom = "100.1%"
			}, 500), setTimeout(function() {
				document.body.style.zoom = "100%"
			}, 600))
		}, this.removeVertex = function(t) {
			null != a[t] && null != s[t] && (a[t].removeVertex(), delete a[t], delete s[t], setTimeout(function() {
				document.body.style.zoom = "100.1%"
			}, 500), setTimeout(function() {
				document.body.style.zoom = "100%"
			}, 600))
		}, this.addPolygon = function(t, e, r) {
			0 != r && (r = !0)
			var n = new GraphPolygonWidget(t, e)
			l[t] = n, f[t] = !1, 1 == r && (l[t].showPolygon(), l[t].redraw())
		}, this.removePolygon = function(t) {
			null != l[t] && null != f[t] && (l[t].removePolygon(), delete l[t], delete f[t])
		}, this.updateGraph = function(t, e) {
			(null == e || isNaN(e)) && (e = g), n(t, e), setTimeout(function() {
				document.body.style.zoom = "100.1%"
			}, 500), setTimeout(function() {
				document.body.style.zoom = "100%"
			}, 600)
		}, this.startAnimation = function(t, e) {
			null != t && (h = t), d = 0, i.play(e)
		}, this.animate = function(t) {
			d >= h.length && -1 != c && (c = 0), d == h.length - 1 && "function" == typeof t && t(), 0 != c && -1 != c && (i.next(g), setTimeout(function() {
				i.animate(t)
			}, g))
		}, this.play = function(t) {
			d < 0 && (d = 0), -1 == c ? (c = 1, n(h[d], g), setTimeout(function() {
				i.animate(t)
			}, g)) : (c = 1, i.animate(t))
		}, this.pause = function() {
			c = 0
		}, this.stop = function() {
			i.jumpToIteration(h.length - 1, 0), d = h.length - 1, c = -1
			var t, e = h[d].vl,
				r = h[d].el
			for (t in r) u[t] = !0
			for (t in u) 0 == u[t] && i.removeEdge(t)
			for (t in e) s[t] = !0
			for (t in s) 0 == s[t] && i.removeVertex(t)
			for (t in u) u[t] = !1
			for (t in s) s[t] = !1
			h = NO_STATELIST, d = -1
		}, this.next = function(t) {
			d < 0 && (d = 0), ++d >= h.length ? d = h.length - 1 : n(h[d], t)
		}, this.previous = function(t) {
			d >= h.length && (d = h.length - 1), --d < 0 || n(h[d], t)
		}, this.forceNext = function(t) {
			i.pause(), i.next(t)
		}, this.forcePrevious = function(t) {
			i.pause(), i.previous(t)
		}, this.jumpToIteration = function(t, e) {
			i.pause(), (d = t) >= h.length && (d = h.length - 1), d < 0 && (d = 0), n(h[d], e)
		}, this.replay = function() {
			i.jumpToIteration(0, 0), setTimeout(function() {
				i.play()
			}, 500)
		}, this.getCurrentIteration = function() {
			return d
		}, this.getTotalIteration = function() {
			return Object.keys(h).length
		}, this.getAnimationDuration = function() {
			return g
		}, this.getCurrentState = function() {
			return h[d]
		}, this.setAnimationDuration = function(t) {
			g = t
		}, this.removeAll = function() {
			var t
			for (t in o) o[t].removeEdge()
			for (t in a) a[t].removeVertex()
			for (t in l) l[t].removePolygon()
			o = {}, a = {}, l = {}, s = {}, u = {}, f = {}
		}
	},
	GraphVertexWidget = function(t, e, r, n, i) {
		function a(t) {
			var e = t.toString().length
			return e >= 6 && (e = 6), 0 === e && (e = 1), graphVertexProperties.text["font-sizes"][e - 1]
		}

		var o, l, s, u, f = a(n) / 3,
			d = {
				innerVertex: {
					class: null,
					cx: null,
					cy: null,
					x: null,
					y: null,
					fill: null,
					r: null,
					width: null,
					height: null,
					stroke: null,
					"stroke-width": null
				},
				outerVertex: {
					class: null,
					cx: null,
					cy: null,
					x: null,
					y: null,
					fill: null,
					r: null,
					width: null,
					height: null,
					stroke: null,
					"stroke-width": null
				},
				text: {
					class: null,
					x: null,
					y: null,
					fill: null,
					"font-family": null,
					"font-weight": null,
					"font-size": null,
					"text-anchor": null,
					text: null
				},
				extratext: {
					class: null,
					x: null,
					y: null,
					fill: null,
					"font-family": null,
					"font-weight": null,
					"font-size": null,
					"text-anchor": null,
					text: null
				}
			},
			h = {}
		!function() {
			var a = r
			"rect_long" == r && (a = "rect"), l = vertexSvg.append(a), o = vertexSvg.append(a), s = vertexTextSvg.append("text"), u = vertexTextSvg.append("text"), d.innerVertex.class = "v" + i, d.innerVertex.cx = t, d.innerVertex.cy = e, d.innerVertex.x = t - graphVertexProperties.innerVertex.width / 2, d.innerVertex.y = e - graphVertexProperties.innerVertex.height / 2, d.innerVertex.fill = graphVertexProperties.innerVertex.default.fill, d.innerVertex.r = 0, d.innerVertex.width = 0, d.innerVertex.height = 0, d.innerVertex.stroke = graphVertexProperties.innerVertex.default.stroke, d.innerVertex["stroke-width"] = 0, d.outerVertex.class = "v" + i, d.outerVertex.cx = t, d.outerVertex.cy = e, d.outerVertex.x = t - graphVertexProperties.outerVertex.width / 2, d.outerVertex.y = e - graphVertexProperties.outerVertex.height / 2, d.outerVertex.fill = graphVertexProperties.outerVertex.default.fill, d.outerVertex.r = 0, d.innerVertex.width = 0, d.innerVertex.height = 0, d.outerVertex.stroke = graphVertexProperties.outerVertex.default.stroke, d.outerVertex["stroke-width"] = 0, d.text.class = "v" + i, d.text.x = t, d.text.y = e + f, d.text.fill = graphVertexProperties.text.default.fill, d.text["font-family"] = graphVertexProperties.text.default["font-family"], d.text["font-size"] = 0, d.text["font-weight"] = graphVertexProperties.text.default["font-weight"], d.text["text-anchor"] = graphVertexProperties.text.default["text-anchor"], "rect_long" == r && (d.text["text-anchor"] = "left"), d.text.text = n, d.extratext.class = "v" + i, d.extratext.x = t, d.extratext.y = e + f + 26, d.extratext.fill = "#673ab7", d.extratext["font-family"] = graphVertexProperties.text.default["font-family"], d.extratext["font-size"] = 0, d.extratext["font-weight"] = graphVertexProperties.text.default["font-weight"], d.extratext["text-anchor"] = graphVertexProperties.text.default["text-anchor"], "rect_long" == r && (d.extratext["text-anchor"] = "left"), d.extratext.text = "", o.attr("class", d.innerVertex.class), l.attr("class", d.outerVertex.class), s.attr("class", d.text.class), u.attr("class", d.extratext.class), o.attr("cx", d.innerVertex.cx).attr("cy", d.innerVertex.cy).attr("x", d.innerVertex.x).attr("y", d.innerVertex.y).attr("fill", d.innerVertex.fill).attr("r", d.innerVertex.r).attr("width", d.innerVertex.width).attr("height", d.innerVertex.height).attr("stroke", d.innerVertex.stroke).attr("stroke-width", d.innerVertex["stroke-width"]), l.attr("cx", d.outerVertex.cx).attr("cy", d.outerVertex.cy).attr("x", d.outerVertex.x).attr("y", d.outerVertex.y).attr("fill", d.outerVertex.fill).attr("r", d.outerVertex.r).attr("width", d.outerVertex.width).attr("height", d.outerVertex.height).attr("stroke", d.outerVertex.stroke).attr("stroke-width", d.outerVertex["stroke-width"]), s.attr("x", d.text.x).attr("y", d.text.y).attr("fill", d.text.fill).attr("font-family", d.text["font-family"]).attr("font-size", d.text["font-size"]).attr("font-weight", d.text["font-weight"]).attr("text-anchor", d.text["text-anchor"]).text(function() {
				return d.text.text
			}), u.attr("x", d.extratext.x).attr("y", d.extratext.y).attr("fill", d.extratext.fill).attr("font-family", d.extratext["font-family"]).attr("font-size", d.extratext["font-size"]).attr("font-weight", d.extratext["font-weight"]).attr("text-anchor", d.extratext["text-anchor"]).text(function() {
				return d.extratext.text
			})
		}(), this.redraw = function(t) {
			!function(t) {
				(null == t || isNaN(t)) && (t = 250), t <= 0 && (t = 1), o.transition().duration(t).attr("cx", d.innerVertex.cx).attr("cy", d.innerVertex.cy).attr("x", d.innerVertex.x).attr("y", d.innerVertex.y).attr("fill", d.innerVertex.fill).attr("r", d.innerVertex.r).attr("width", d.innerVertex.width).attr("height", d.innerVertex.height).attr("stroke", d.innerVertex.stroke).attr("stroke-width", d.innerVertex["stroke-width"]), l.transition().duration(t).attr("cx", d.outerVertex.cx).attr("cy", d.outerVertex.cy).attr("x", d.outerVertex.x).attr("y", d.outerVertex.y).attr("fill", d.outerVertex.fill).attr("r", d.outerVertex.r).attr("width", d.outerVertex.width).attr("height", d.outerVertex.height).attr("stroke", d.outerVertex.stroke).attr("stroke-width", d.outerVertex["stroke-width"]), s.transition().duration(t).attr("x", d.text.x).attr("y", d.text.y).attr("fill", d.text.fill).attr("font-family", d.text["font-family"]).attr("font-size", d.text["font-size"]).attr("font-weight", d.text["font-weight"]).attr("text-anchor", d.text["text-anchor"]).text(function() {
					return d.text.text
				}), u.transition().duration(t).attr("x", d.extratext.x).attr("y", d.extratext.y).attr("fill", d.extratext.fill).attr("font-family", d.extratext["font-family"]).attr("font-size", d.extratext["font-size"]).attr("font-weight", d.extratext["font-weight"]).attr("text-anchor", d.extratext["text-anchor"]).text(function() {
					return d.extratext.text
				})
			}(t)
		}, this.showVertex = function() {
			d.outerVertex.r = graphVertexProperties.outerVertex.r, d.outerVertex.width = graphVertexProperties.outerVertex.width, d.outerVertex.height = graphVertexProperties.outerVertex.height, d.outerVertex["stroke-width"] = graphVertexProperties.outerVertex["stroke-width"], d.innerVertex.r = graphVertexProperties.innerVertex.r, d.innerVertex.width = graphVertexProperties.innerVertex.width, d.innerVertex.height = graphVertexProperties.innerVertex.height, d.innerVertex["stroke-width"] = graphVertexProperties.innerVertex["stroke-width"], d.text["font-size"] = a(n), d.extratext["font-size"] = graphVertexProperties.text["font-size"], "rect_long" == r ? (d.outerVertex.width = 200, d.innerVertex.width = 198) : "rect" == r && (d.outerVertex.width = 80, d.innerVertex.width = 78)
		}, this.hideVertex = function() {
			d.outerVertex.r = 0, d.outerVertex.width = 0, d.outerVertex.height = 0, d.outerVertex["stroke-width"] = 0, d.innerVertex.r = 0, d.innerVertex.width = 0, d.innerVertex.height = 0, d.innerVertex["stroke-width"] = 0, d.text["font-size"] = 0, d.extratext["font-size"] = 0
		}, this.moveVertex = function(t, e) {
			var r
			for (r in d.outerVertex.cx = t, d.outerVertex.cy = e, d.outerVertex.x = t - graphVertexProperties.outerVertex.width / 2, d.outerVertex.y = e - graphVertexProperties.outerVertex.height / 2, d.innerVertex.cx = t, d.innerVertex.cy = e, d.innerVertex.x = t - graphVertexProperties.innerVertex.width / 2, d.innerVertex.y = e - graphVertexProperties.innerVertex.height / 2, d.text.x = t, d.text.y = e + f, d.extratext.x = t, d.extratext.y = e + f + 26, h) h[r].refreshPath()
		}, this.changeText = function(t) {
			n = t, d.text.text = t, d.text["font-size"] = a(t)
		}, this.changeExtraText = function(t) {
			d.extratext.text = t
		}, this.changeTextFontSize = function(t) {
			null == newTextSize || isNaN(newTextSize) || (d.text["font-size"] = newTextSize, d.extratext["font-size"] = newTextSize)
		}, this.changeRadius = function(t, e) {
			null == t || isNaN(t) || (d.innerVertex.r = t, null == e || isNaN(e) || (d.outerVertex.r = e))
		}, this.changeWidth = function(t, e) {
			null == t || isNaN(t) || (d.innerVertex.width = t, null == e || isNaN(e) || (d.outerVertex.width = e))
		}, this.changeHeight = function(t, e) {
			null == t || isNaN(t) || (d.innerVertex.height = t, null == e || isNaN(e) || (d.outerVertex.height = e))
		}, this.changeStrokeWidth = function(t, e) {
			null == t || isNaN(t) || (d.innerVertex["stroke-width"] = t, null == e || isNaN(e) || (d.outerVertex["stroke-width"] = e))
		}, this.removeVertex = function() {
			l.remove(), o.remove(), s.remove(), u.remove()
		}, this.stateVertex = function(t) {
			var e
			for (e in graphVertexProperties.innerVertex[t]) d.innerVertex[e] = graphVertexProperties.innerVertex[t][e]
			for (e in graphVertexProperties.outerVertex[t]) d.outerVertex[e] = graphVertexProperties.outerVertex[t][e]
			for (e in graphVertexProperties.text[t]) d.text[e] = graphVertexProperties.text[t][e]
		}, this.getAttributes = function() {
			return deepCopy(d)
		}, this.getClassNumber = function() {
			return i
		}, this.addEdge = function(t) {
			h[t.getAttributes().id] = t
		}, this.removeEdge = function(t) {
			null != h[t.getAttributes().id] && null != h[t.getAttributes().id] && delete h[t.getAttributes().id]
		}, this.getEdge = function() {
			var t, e = []
			for (t in h) e.push(h[t])
			return e
		}
	},
	GraphEdgeWidget = function(t, e, r, n, i) {
		function a() {
			if (t) return parseFloat(t.getAttributes().outerVertex.cx)
		}

		function o() {
			if (t) return parseFloat(t.getAttributes().outerVertex.cy)
		}

		function l() {
			if (t) return parseFloat(t.getAttributes().outerVertex.r)
		}

		function s() {
			if (t) return parseFloat(e.getAttributes().outerVertex.cx)
		}

		function u() {
			if (t) return parseFloat(e.getAttributes().outerVertex.cy)
		}

		function f() {
			if (t) return parseFloat(e.getAttributes().outerVertex.r)
		}

		function d() {
			for (var t = a(), e = o(), r = s(), n = u(), i = h(t, e, r, n, l(), t, e), d = h(t, e, r, n, f(), r, n), c = 5e3, g = 0, x = 0, w = 1; w <= 3; w += 2)
				for (var p = 1; p <= 3; p += 2) {
					var v = Math.sqrt((i[w - 1] - d[p - 1]) * (i[w - 1] - d[p - 1]) + (i[w] - d[p]) * (i[w] - d[p]))
					v < c && (c = v, g = w, x = p)
				}
			return [{
				x: i[g - 1],
				y: i[g]
			}, {
				x: d[x - 1],
				y: d[x]
			}]
		}

		function h(t, e, r, n, i, a, o) {
			var l = r - t,
				s = n - e,
				u = a - t,
				f = o - e,
				d = l * l + s * s,
				h = (l * u + s * f) / d,
				c = h * h - (u * u + f * f - i * i) / d,
				g = Math.sqrt(c),
				x = -h + g,
				w = -h - g,
				p = t - l * x,
				v = e - s * x,
				y = t - l * w,
				m = e - s * w,
				E = new Array
			return E[0] = p, E[1] = v, E[2] = y, E[3] = m, E
		}

		function c(t) {
			(null == t || isNaN(t)) && (t = m), t <= 0 && (t = 1), x.attr("class", _.path.class), x.transition().duration(t).attr("d", _.path.d).attr("stroke", _.path.stroke).attr("stroke-width", _.path["stroke-width"]).style("marker-start", function() {
				return _.path.d == P ? null : "bde" == _.path.class ? "url(#backwardArrow)" : null
			}).style("marker-end", function() {
				return _.path.d == P ? null : "de" == _.path.class || "bde" == _.path.class ? "url(#arrow)" : null
			}), w.transition().duration(t).attr("fill", _.weight.fill).attr("font-family", _.weight["font-family"]).attr("font-size", _.weight["font-size"]).attr("font-weight", _.weight["font-weight"]).attr("text-anchor", _.weight["text-anchor"]).attr("text-decoration", "underline"), v.transition().duration(t).text(function() {
				return _.weight.text
			})
		}

		function g() {
			T = E(d()), P = E([d()[0], d()[0]])
		}

		markerSvg.select("#arrow").empty() && markerSvg.append("marker").attr("id", "arrow").attr("viewBox", "0 -5 10 10").attr("refX", 9).attr("markerWidth", 3).attr("markerHeight", 3).attr("orient", "auto").append("path").attr("d", "M0,-5 L10,0 L0,5").attr("fill", "#333"), markerSvg.select("#backwardArrow").empty() && markerSvg.append("marker").attr("id", "backwardArrow").attr("viewBox", "-10 -5 10 10").attr("refX", -9).attr("markerWidth", 3).attr("markerHeight", 3).attr("orient", "auto").append("path").attr("d", "M0,-5 L-10,0 L0,5").attr("fill", "#333"), (null == i || isNaN(i)) && (i = 1)
		var x, w, p, v, y = this,
			m = 250,
			E = d3.svg.line().x(function(t) {
				return t.x
			}).y(function(t) {
				return t.y
			}).interpolate("linear"),
			T = E(d()),
			P = E([d()[0], d()[0]]),
			_ = {
				path: {
					id: null,
					class: null,
					d: null,
					stroke: null,
					"stroke-width": null
				},
				weight: {
					id: null,
					startOffset: null,
					dy: null,
					fill: null,
					"font-family": null,
					"font-weight": null,
					"font-size": null,
					"text-anchor": null,
					text: null
				}
			}
		g(),
			function() {
				switch (_.path.id = "e" + r, _.path.d = P, _.path.stroke = graphEdgeProperties.path.default.stroke, _.path["stroke-width"] = graphEdgeProperties.path.default["stroke-width"], n) {
					case EDGE_TYPE_UDE:
						_.path.class = "ude"
						break
					case 1:
						_.path.class = "de"
						break
					case 2:
						_.path.class = "bde"
				}
				_.weight.id = "ew" + r, _.weight.startOffset = graphEdgeProperties.weight.default.startOffset, _.weight.dy = graphEdgeProperties.weight.default.dy, _.weight.fill = graphEdgeProperties.weight.default.fill, _.weight["font-family"] = graphEdgeProperties.weight.default["font-family"], _.weight["font-size"] = 0, _.weight["font-weight"] = graphEdgeProperties.weight.default["font-weight"], _.weight["text-anchor"] = graphEdgeProperties.weight.default["text-anchor"], _.weight.text = i, (x = edgeSvg.append("path")).attr("id", _.path.id).attr("class", _.path.class)
				try {
					"MNaN,NaNLNaN,NaN" != _.path.d && x.attr("d", _.path.d).attr("stroke", _.path.stroke).attr("stroke-width", _.path["stroke-width"])
				} catch (t) {
				}
				(w = edgeWeightSvg.append("text")).attr("id", _.weight.id), w.attr("fill", _.weight.fill).attr("font-family", _.weight["font-family"]).attr("font-size", _.weight["font-size"]).attr("font-weight", _.weight["font-weight"]).attr("text-anchor", _.weight["text-anchor"]), p = w.append("textPath").attr("xlink:href", function() {
					return "#" + _.path.id
				}).attr("startOffset", _.weight.startOffset), v = p.append("tspan").attr("dy", _.weight.dy).text(function() {
					return _.weight.text
				})
			}(), this.redraw = function(t) {
			c(t)
		}, this.animateHighlighted = function(t) {
			(null == t || isNaN(t)) && (t = m), t <= 0 && (t = 1), edgeSvg.append("path").attr("id", "tempEdge" + x.attr("id")).attr("stroke", graphEdgeProperties.animateHighlightedPath.stroke).attr("stroke-width", graphEdgeProperties.animateHighlightedPath["stroke-width"]).transition().duration(t).each("start", function() {
				edgeSvg.select("#tempEdge" + x.attr("id")).attr("d", P)
			}).attr("d", T).each("end", function() {
				x.attr("stroke", graphEdgeProperties.path.highlighted.stroke).attr("stroke-width", graphEdgeProperties.path["stroke-width"]), edgeSvg.select("#tempEdge" + x.attr("id")).remove(), c(0)
			})
		}, this.showEdge = function() {
			_.path.d = T, _.path["stroke-width"] = graphEdgeProperties.path["stroke-width"]
		}, this.hideEdge = function() {
			_.path.d = P
		}, this.showWeight = function() {
			_.weight["font-size"] = graphEdgeProperties.weight["font-size"]
		}, this.hideWeight = function() {
			_.weight["font-size"] = 0
		}, this.stateEdge = function(t) {
			var e
			for (e in graphEdgeProperties.path[t]) _.path[e] = graphEdgeProperties.path[t][e]
			for (e in graphEdgeProperties.weight[t]) _.weight[e] = graphEdgeProperties.weight[t][e]
		}, this.removeEdge = function() {
			t.removeEdge(y), e.removeEdge(y), x.remove(), w.remove()
		}, this.refreshPath = function() {
			var t = P
			g(), _.path.d == t ? _.path.d = P : _.path.d = T
		}, this.changeVertexA = function(e) {
			var r = !1
			_.path.d == T && (r = !0), t.removeEdge(y), t = e, g(), T = E(d()), P = E([d()[0]]), _.path.d = P, t.addEdge(y), r && (_.path.d = T)
		}, this.changeVertexB = function(t) {
			var r = !1
			_.path.d == T && (r = !0), e.removeEdge(y), e = t, g(), T = E(d()), P = E([d()[0]]), _.path.d = P, e.addEdge(y), r && (_.path.d = T)
		}, this.changeType = function(t) {
			switch (n = t) {
				case EDGE_TYPE_UDE:
					_.path.class = "ude"
					break
				case 1:
					_.path.class = "de"
					break
				case 2:
					_.path.class = "bde"
			}
		}, this.changeWeight = function(t) {
			i = t, _.weight.text = i
		}, this.getVertex = function() {
			return [t, e]
		}, this.getAttributes = function() {
			return deepCopy(_.path)
		}, this.getType = function() {
			return n
		}
	},
	GraphPolygonWidget = function(t, e) {
		var r = null,
			n = null,
			i = {
				polygon: {
					class: null,
					points: null,
					fill: null,
					"stroke-width": null,
					opacity: null
				}
			}
		!function() {
			r = polygonSvg.append("polygon"), i.polygon.class = "p" + t
			var n = ""
			for (key in e) n = n + e[key].x + "," + e[key].y + " "
			i.polygon.points = n, i.polygon.fill = graphPolygonProperties.polygon.default.fill, i.polygon["stroke-width"] = 0, i.polygon.opacity = 1, r.attr("class", i.polygon.class).attr("points", i.polygon.points).attr("fill", i.polygon.fill).attr("stroke-width", i.polygon["stroke-width"]).attr("opacity", i.polygon.opacity)
		}(), this.redraw = function(t) {
			!function(t) {
				(null == t || isNaN(t)) && (t = 250), t <= 0 && (t = 1), r.transition().duration(t).attr("points", i.polygon.points).attr("fill", i.polygon.fill).attr("stroke-width", i.polygon["stroke-width"]).attr("opacity", i.polygon.opacity)
			}(t)
		}, this.showPolygon = function() {
			null != n && null != n || (n = POLYGON_DEFAULT), i.polygon.class = graphPolygonProperties.polygon.class, i.polygon["stroke-width"] = graphPolygonProperties.polygon["stroke-width"], i.polygon.fill = graphPolygonProperties.polygon[n].fill, i.polygon.opacity = graphPolygonProperties.polygon[n].opacity
		}, this.hidePolygon = function() {
			i.polygon.opacity = 0
		}, this.removePolygon = function() {
			r.remove()
		}, this.statePolygon = function(t) {
			var e
			for (e in graphPolygonProperties.polygon[n = t]) i.polygon[e] = graphPolygonProperties.polygon[n][e]
		}, this.getAttributes = function() {
			return deepCopy(i)
		}, this.getClassNumber = function() {
			return t
		}
	}

function getUrlParameter(t) {
	var e, r, n = decodeURIComponent(window.location.search.substring(1)).split("&")
	for (r = 0; r < n.length; r++)
		if ((e = n[r].split("="))[0] === t) return void 0 === e[1] || e[1]
}

function pushState(t) {
	var e = "/en/mst"
	void 0 !== t && null != t && (e += "?slide=" + t), window.history.pushState({
		slide: t
	}, "slide " + t, e)
}

function showPopup(t) {
	$("#popup").fadeIn(100, t)
}

function hidePopup(t) {
	$("#popup").fadeOut(100, t)
}

function showOverlay() {
	$("#overlay").css("opacity", .5), $("#overlay").show()
}

function hideOverlay() {
	$("#overlay").hide()
}

function makeOverlayTransparent() {
	$("#overlay").css("opacity", 0)
}

function hideSlide(t) {
	isPlaying = !0, closeSlide(cur_slide, function() {
		makeOverlayTransparent(), setTimeout(t, 700)
	})
}

function showSlide() {
	isPlaying = !1, openSlide(cur_slide), showOverlay()
}

function doButtonAction21() {
	URL("https://cpbook.net/code/ch4.zip")
}

function doButtonAction30() {
	CUSTOM_ACTION("kruskal")
}

function doButtonAction31() {
	CUSTOM_ACTION("prim", 1)
}

function adjustPopupToImageSize() {
	var t = $("#popup-image").prop("width"),
		e = $("#popup-image").prop("height")
	$("#popup").width(t + 20), $("#popup").height(e + 20), 0 == t && 0 == e ? setTimeout(adjustPopupToImageSize, 200) : showPopup()
}

function POPUP_IMAGE(t) {
	$("#popup-content").html("<img id=\"popup-image\" src=\"" + t + "\">"), adjustPopupToImageSize()
}

function URL(t) {
	window.open(t, "_blank")
}

window.onpopstate = function(t) {
	var e = t.state.slide
	openSlide(e, function() {
		runSlide(e)
	})
}, $(function() {
	getUrlParameter("slide"), $(".mcq-submit").click(function() {
		var t = parseInt($(this).attr("id").split("-")[1])
		$("#mcq-answer-" + t).val() === $("input[type=radio][name=mcq-" + t + "-choice]:checked").val() ? $("#answer-status-" + t).html("<font color=\"green\"><b>Correct!</b></font>") : $("#answer-status-" + t).html("<font color=\"red\"><b>Wrong Answer! Try again...</b></font>"), $("#answer-status-" + t).show(), setTimeout(function() {
			$("#answer-status-" + t).fadeOut(1e3)
		}, 1e3)
	}), $(".msq-submit").click(function() {
		var t = parseInt($(this).attr("id").split("-")[1]),
			e = $("#msq-answer-" + t).val(),
			r = []
		$("input[type=checkbox][class=msq-choice]:checked").each(function() {
			r.push($(this).attr("id").split("-")[3])
		}), r.sort(), e === r.join(",") ? $("#answer-status-" + t).html("<font color=\"green\">Correct!</font>") : $("#answer-status-" + t).html("<font color=\"red\">Wrong Answer! Try again...</font>"), $("#answer-status-" + t).show(), setTimeout(function() {
			$("#answer-status-" + t).fadeOut(1e3)
		}, 1e3)
	}), $("#hide-popup").click(function() {
		hidePopup()
	}), $("#popup").hover(function() {
		$("#hide-popup").show()
	}, function() {
		$("#hide-popup").hide()
	})
})
var MST = function() {
		var t, e = new GraphWidget,
			r = {},
			n = {},
			i = {},
			a = 0

		function o(t, e, r, n, i, a, o) {
			var l, s = !0
			null == r && null == n && null == i && null == a && null == o && (s = !1), null == r && (r = {}), null == n && (n = {}), null == i && (i = {}), null == a && (a = {}), null == o && (o = {})
			var u = {
				vl: {},
				el: {}
			}
			if (s) {
				for (l in t) u.vl[l] = {}, u.vl[l].cx = t[l].x, u.vl[l].cy = t[l].y, u.vl[l].text = l, u.vl[l].state = VERTEX_GREY_OUTLINE, u.vl[l].extratext = t[l].extratext
				for (l in e) u.el[l] = {}, u.el[l].vertexA = e[l].u, u.el[l].vertexB = e[l].v, u.el[l].type = EDGE_TYPE_UDE, u.el[l].weight = e[l].w, u.el[l].state = EDGE_GREY, u.el[l].displayWeight = !0, u.el[l].animateHighlighted = !1
			} else {
				for (l in t) u.vl[l] = {}, u.vl[l].cx = t[l].x, u.vl[l].cy = t[l].y, u.vl[l].text = l, u.vl[l].state = VERTEX_DEFAULT, u.vl[l].extratext = t[l].extratext
				for (l in e) u.el[l] = {}, u.el[l].vertexA = e[l].u, u.el[l].vertexB = e[l].v, u.el[l].type = EDGE_TYPE_UDE, u.el[l].weight = e[l].w, u.el[l].state = EDGE_DEFAULT, u.el[l].displayWeight = !0, u.el[l].animateHighlighted = !1
			}
			for (l in o) key1 = u.el[l].vertexA, key2 = u.el[l].vertexB, u.vl[key1].state = VERTEX_DEFAULT, u.vl[key2].state = VERTEX_DEFAULT, u.el[l].state = EDGE_DEFAULT
			for (l in r) u.vl[l].state = VERTEX_HIGHLIGHTED
			for (l in n) u.el[l].state = EDGE_HIGHLIGHTED
			for (l in i) u.vl[l].state = VERTEX_TRAVERSED
			for (l in a) u.el[l].state = EDGE_TRAVERSED
			return u
		}

		function l(t) {
			switch (t) {
				case 0:
					$("#code1").html("T = {s}"), $("#code2").html("enqueue edges connected to s in PQ (by inc weight)"), $("#code3").html("while (!PQ.isEmpty)"), $("#code4").html("&nbsp;&nbsp;if (vertex v linked with e = PQ.remove &notin; T)"), $("#code5").html("&nbsp;&nbsp;&nbsp;&nbsp;T = T &cup; {v, e}, enqueue edges connected to v"), $("#code6").html("&nbsp;&nbsp;else ignore e"), $("#code7").html("MST = T")
					break
				case 1:
					$("#code1").html("Sort E edges by increasing weight"), $("#code2").html("T = {}"), $("#code3").html("for (i = 0; i &lt; edges.length; i++)"), $("#code4").html("&nbsp;&nbsp;if adding e = edges[i] does not form a cycle"), $("#code5").html("&nbsp;&nbsp;&nbsp;&nbsp;add e to T"), $("#code6").html("&nbsp;&nbsp;else ignore e"), $("#code7").html("MST = T")
			}
		}

		this.getGraphWidget = function() {
			return e
		}, fixJSON = function() {
			for (var t in a = 0, r) a++;
			var e = []
			for (t in n) e.push(new ObjectTriple(parseInt(n[t].w), parseInt(n[t].u), parseInt(n[t].v)));
			e.sort(ObjectTriple.compare)
			for (var o = 0; o < e.length; o++) n[o].w = e[o].getFirst(), n[o].u = e[o].getSecond(), n[o].v = e[o].getThird();
			for (var t in r) i[t] = Array();
			for (var t in n) i[n[t].u].push(new ObjectTriple(n[t].v, n[t].w, t)), i[n[t].v].push(new ObjectTriple(n[t].u, n[t].w, t));
		}, takeJSON = function(t) {
			null != t && (t = JSON.parse(t), r = t.vl, n = t.el, fixJSON())
		}, statusChecking = function() {
			$("#draw-status p").html("Draw a <b>connected undirected weighted</b> graph, preferably <b>V > 7</b>, <b>minimize edge crossing</b>, and make it <b>challenging for Prim&#39;s/Kruskal&#39;s algorithm</b>")
		}, warnChecking = function() {
			var t = ""
			a >= 17 && (t += "Too much vertex on screen, consider drawing smaller graph. "), "" == t ? $("#draw-warn p").html("No Warning") : $("#draw-warn p").html(t)
		}, errorChecking = function() {
			var t = ""
			if (0 != a)
				if (1 != a) {
					var e = [],
						r = []
					for (r.push(0), e[0] = !0; r.length > 0;) {
						var i = r.pop()
						for (var o in n) n[o].u != i || e[n[o].v] || (e[n[o].v] = !0, r.push(+n[o].v)), n[o].v != i || e[n[o].u] || (e[n[o].u] = !0, r.push(+n[o].u))
					}
					for (var l = 0; l < a; l++)
						if (!e[l]) {
							t += "Vertex 0 and vertex {i} is not connected. ".replace("{i}", l)
							break
						}
					"" == t ? $("#draw-err p").html("Graph must contain at least one edge. ") : $("#draw-err p").html(t)
				} else $("#draw-err p").html("Graph must contain at least one edge. ")
			else $("#draw-err p").html("Graph cannot be empty. ")
		}, this.startLoop = function() {
			t = setInterval(function() {
				takeJSON(JSONresult), warnChecking(), errorChecking(), statusChecking()
			}, 100)
		}, this.stopLoop = function() {
			clearInterval(t)
		}, this.draw = function() {
			return "Graph must contain at least one edge. " == $("#draw-err p").html() && ($("#submit").is(":checked") && this.submit(JSONresult), $("#copy").is(":checked") && window.prompt("Copy to clipboard:", JSONresult), fixJSON(), graph = o(r, n), e.updateGraph(graph, 500), !0)
		}, this.importjson = function(t) {
			takeJSON(t), statusChecking(), graph = o(r, n), e.updateGraph(graph, 500)
		}, this.getGraph = function() {
			return {
				vl: r,
				el: n
			}
		}, this.getV = function() {
			return a
		}, this.kruskal = function(t) {
			var i, s, u = 0,
				f = [],
				d = [],
				h = {},
				c = {},
				g = {},
				x = {},
				w = {},
				p = new UfdsHelper
			if (0 == a) return $("#kruskals-err").html("There is no graph to run this on. Please select an example graph first."), !1
			for (i in r) p.insert(i)
			for (i in n) w[i] = !0, d.push(new ObjectPair(parseInt(n[i].w), parseInt(i)))

			function v() {
				for (var t = "", e = Math.min(d.length, 9), r = 0; r < e; r++) {
					var i = d[r].getSecond()
					t += "(" + n[i].w + ",(" + n[i].u + "," + n[i].v + "))", r < e - 1 && (t += ", ")
				}
				return d.length > 10 && (t += " ..."), t
			}

			for (d.sort(ObjectPair.compare), (s = o(r, n)).status = "Edges are sorted in increasing order of weight: " + v() + ".", s.lineNo = [1, 2], f.push(s), numTaken = 0; d.length > 0;) {
				(s = o(r, n, h, c, g, x, w)).status = "The remaining edge(s) is/are " + v() + ".", s.lineNo = 3, f.push(s)
				var y = d.shift().getSecond(),
					m = n[y].u,
					E = n[y].v,
					T = parseInt(n[y].w)
				c[y] = !0, h[m] = !0, h[E] = !0, (s = o(r, n, h, c, g, x, w)).status = "Checking if a cycle will appear if we add this edge: (" + T + ",(" + m + "," + E + ")).", s.lineNo = 4, f.push(s)
				var P = !1
				p.isSameSet(m, E) || (P = !0, p.unionSet(m, E), x[y] = !0, g[m] = !0, g[E] = !0, u += T), delete c[y], delete w[y], delete h[m], delete h[E], s = o(r, n, h, c, g, x, w), P ? (s.status = "Adding that edge will not form a cycle, so we add it to T. The current weight of T is " + u + ".", s.lineNo = 5, numTaken++) : (s.status = " that edge will form a cycle, so we ignore it. The current weight of T remains at " + u + ".", s.lineNo = 6), f.push(s), P && numTaken == a - 1 && ((s = o(r, n, h, c, g, x, w)).status = a - 1 + " edges have been taken by Kruskal&#39;s, so the MST has been found.<br>An optimized version of Kruskal&#39;s algorithm can stop here.", s.lineNo = 5, f.push(s))
			}
			return (s = o(r, n, h, c, g, x, w)).status = "The highlighted vertices and edges form an MST with weight = " + u + ".", s.lineNo = 7, f.push(s), l(1), e.startAnimation(f, t), !0
		}, this.prim = function(t, s) {
			var u, f = 0,
				d = {},
				h = {},
				c = {},
				g = {},
				x = {},
				w = {},
				p = []
			if (0 == a) return $("#prims-err").html("There is no graph to run this on. Please select an example graph first."), !1
			if (t >= a || t < 0) return $("#prims-err").html("This vertex does not exist in the graph"), !1
			for (v in r) d[v] = !1
			for (var v in g[t] = !0, r) r[v].extratext = ""
			r[t].extratext = "start", (u = o(r, n, h, c, g, x, w)).status = "T = {" + t + "}.", u.lineNo = 1, p.push(u), delete h[t], g[t] = !0
			var y = [],
				m = ""

			function E() {
				for (var t = "", e = Math.min(y.length, 6), r = 0; r < e; r++) {
					var n = y[r]
					t += "(" + n.getFirst() + "," + n.getSecond() + ")", r < e - 1 && (t += ", ")
				}
				return y.length > 6 && (t += ".."), "" == t && (t = "empty"), t
			}

			function T(t) {
				for (v in m = "", d[t] = !0, i[t]) {
					var e = i[t][v].getFirst(),
						r = i[t][v].getSecond(),
						n = i[t][v].getThird()
					d[e] || (enqueuedEdge = new ObjectTriple(parseInt(r), parseInt(e), parseInt(n)), w[n] = !0, m += "(" + r + "," + e + "), ", y.push(enqueuedEdge))
				}
				m = m.substring(0, m.length - 2), y.sort(ObjectTriple.compare)
			}

			T(t), (u = o(r, n, h, c, g, x, w)).status = m + " is added to the PQ.<br>The PQ is now " + E() + ".", u.lineNo = 2, p.push(u)
			for (var P = 1; y.length > 0;) {
				var _ = y.shift(),
					V = _.getSecond(),
					b = _.getThird()
				h[V] = !0, c[b] = !0, (u = o(r, n, h, c, g, x, w)).status = "(" + _.getFirst() + "," + V + ") is removed from PQ. Check if vertex " + V + " is in T.<br>The PQ is now " + E() + ".", u.lineNo = 4, p.push(u), d[V] ? (delete w[b], delete c[b], (u = o(r, n, h, c, g, x, w)).status = V + " is in T, so ignore this edge.", u.lineNo = 6, p.push(u)) : (delete c[b], c[b] = !0, h[V] = !0, (u = o(r, n, h, c, g, x, w)).status = V + " is not in T.", u.lineNo = 4, p.push(u), delete h[V], delete c[b], x[b] = !0, g[V] = !0, T(V), f += parseInt(_.getFirst()), (u = o(r, n, h, c, g, x, w)).status = V + " and this edge are added into T (T\\&#39;s weight = " + f + "), " + (m.length > 0 ? m : "(null)") + " is also added to PQ. The PQ is now " + E() + ".", u.lineNo = 5, p.push(u), ++P == a && ((u = o(r, n, h, c, g, x, w)).status = P + " vertices have been taken by Prim\\&#39;s, so the MST has been found.<br>An optimized version of Prim\\&#39;s algorithm can stop here.", u.lineNo = 5, p.push(u)))
			}
			return (u = o(r, n, h, c, g, x, w)).status = "The highlighted vertices and edges form an MST with weight = " + f + ".", u.lineNo = 7, p.push(u), l(0), e.startAnimation(p, s), !0
		}, this.examples = function(t) {
			var e = getExampleGraph(t, VL),
				r = getExampleGraph(t, EL)
			return this.loadGraph(e, r), !0
		}, this.loadGraph = function(t, i) {
			r = t, n = i, fixJSON()
			var a = o(r, n)
			e.updateGraph(a, 500)
		}
	},
	actionsWidth = 150,
	statusCodetraceWidth = 430,
	isExamplesOpen = !1,
	isPrimsOpen = !1

function openExamples() {
	isExamplesOpen || ($(".examples").fadeIn("fast"), isExamplesOpen = !0)
}

function closeExamples() {
	isExamplesOpen && ($(".examples").fadeOut("fast"), isExamplesOpen = !1)
}

function openPrims() {
	isPrimsOpen || ($(".prims").fadeIn("fast"), isPrimsOpen = !0)
}

function closePrims() {
	isPrimsOpen && ($(".prims").fadeOut("fast"), $("#prims-err").html(""), isPrimsOpen = !1)
}

function hideEntireActionsPanel() {
	closeExamples(), closePrims(), hideActionsPanel()
}

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
	$("#dark-overlay").fadeIn(function() {
		$("#custom-alert").fadeIn(function() {
			setTimeout(function() {
				$("#custom-alert").fadeOut(function() {
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
		$("#current-action").fadeOut(function() {
			$("#current-action").html(msg)
			$("#current-action").fadeIn()
		})
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

$(function() {
	$("#title a").click(function() {
		$("#title a").removeClass("selected-viz")
		$(this).addClass("selected-viz")
		// temporary quick fix for Google Chrome Aug 2016 issue...
		setTimeout(function() {
			document.body.style.zoom = "100.1%"
		}, 100) // force resize/redraw...
		setTimeout(function() {
			document.body.style.zoom = "100%"
		}, 600)
	})

	$("#trigger-about").click(function() {
		if ($(window).width() > 600) {
			$("#dark-overlay").fadeIn(function() {
				$("#about").fadeIn()
			})
		} else
			alert(
				"Sorry, this dialog is too big. Please load it on bigger screen"
			)
	})

	$(".close-overlay").click(function() {
		$(".overlays").fadeOut(function() {
			$("#dark-overlay").fadeOut()
		})
	})

	$("#dark-overlay").click(function() {
		$(".overlays").fadeOut()
		$("#dark-overlay").fadeOut()
	})
})

write(true, false)
var mw, gw, randomGraphID

$(function() {
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

	$("#draw").click(function() {
		closeExamples()
		closePrims()
	})

	$("#random").click(function() {
		closeExamples()
		closePrims()
	})

	$("#examples").click(function() {
		openExamples()
		closePrims()
	})

	$("#kruskals").click(function() {
		closeExamples()
		closePrims()
	})

	$("#prims").click(function() {
		closeExamples()
		openPrims()
	})

	$("#go-to-beginning").click(function() {
		goToBeginning()
	})

	$("#previous").click(function() {
		stepBackward()
	})

	$("#pause").click(function() {
		pause()
	})

	$("#play").click(function() {
		play()
	})

	$("#next").click(function() {
		stepForward()
	})

	$("#go-to-end").click(function() {
		goToEnd()
	})

	$("#draw").click(function() {
		drawGraph()
	})

	$("#kruskals").click(function() {
		kruskals()
	})

	$("#example1").click(function() {
		example(CP3_4_10)
	})

	$("#example2").click(function() {
		example(CP3_4_14)
	})

	$("#example3").click(function() {
		example(K5)
	})

	$("#example4").click(function() {
		example(RAIL)
	})

	$("#example5").click(function() {
		example(TESSELLATION)
	})

	$("#prims-go").click(function() {
		prims()
	})

	$("#drawgraph-visualizer").click(function() {
		GraphVisu(true, false, null, null, null, true)
	})

	$("#drawgraph-btn-cancel").click(function() {
		drawCancel()
	})

	$("#drawgraph-btn-clear").click(function() {
		GraphVisu(true, false, true)
	})

	$("#drawgraph-btn-done").click(function() {
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
		$("#dark-overlay").fadeIn(function() {
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
	setTimeout(function() {
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
	setTimeout(function() {
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
	el: {}
}

function CUSTOM_ACTION(action, data, mode) {
	if (action == "kruskal") {
		hideSlide(function() {
			kruskals(showSlide)
		})
	} else if (action == "prim") {
		hideSlide(function() {
			primsWithInput(data, showSlide)
		})
	}
}
