if (!AmCharts) var AmCharts = {
    themes: {},
    maps: {},
    inheriting: {},
    charts: [],
    onReadyArray: [],
    useUTC: !1,
    updateRate: 40,
    uid: 0,
    lang: {},
    translations: {},
    mapTranslations: {},
    windows: {},
    initHandlers: []
};
AmCharts.Class = function (a) {
    var b = function () {
        arguments[0] !== AmCharts.inheriting && (this.events = {}, this.construct.apply(this, arguments))
    };
    a.inherits ? (b.prototype = new a.inherits(AmCharts.inheriting), b.base = a.inherits.prototype, delete a.inherits) : (b.prototype.createEvents = function () {
        for (var a = 0, b = arguments.length; a < b; a++) this.events[arguments[a]] = []
    }, b.prototype.listenTo = function (a, b, c) {
        this.removeListener(a, b, c);
        a.events[b].push({
            handler: c,
            scope: this
        })
    }, b.prototype.addListener = function (a, b, c) {
        this.removeListener(this,
        a, b);
        this.events[a].push({
            handler: b,
            scope: c
        })
    }, b.prototype.removeListener = function (a, b, c) {
        if (a && a.events) for (a = a.events[b], b = a.length - 1; 0 <= b; b--) a[b].handler === c && a.splice(b, 1)
    }, b.prototype.fire = function (a, b) {
        for (var c = this.events[a], g = 0, h = c.length; g < h; g++) {
            var k = c[g];
            k.handler.call(k.scope, b)
        }
    });
    for (var c in a) b.prototype[c] = a[c];
    return b
};
AmCharts.addChart = function (a) {
    AmCharts.charts.push(a)
};
AmCharts.removeChart = function (a) {
    for (var b = AmCharts.charts, c = b.length - 1; 0 <= c; c--) b[c] == a && b.splice(c, 1)
};
AmCharts.isModern = !0;
AmCharts.getIEVersion = function () {
    var a = 0;
    if ("Microsoft Internet Explorer" == navigator.appName) {
        var b = navigator.userAgent,
            c = /MSIE ([0-9]{1,}[.0-9]{0,})/;
        null != c.exec(b) && (a = parseFloat(RegExp.$1))
    } else "Netscape" == navigator.appName && (b = navigator.userAgent, c = /Trident\/.*rv:([0-9]{1,}[.0-9]{0,})/, null != c.exec(b) && (a = parseFloat(RegExp.$1)));
    return a
};
AmCharts.applyLang = function (a, b) {
    var c = AmCharts.translations;
    b.dayNames = AmCharts.dayNames;
    b.shortDayNames = AmCharts.shortDayNames;
    b.monthNames = AmCharts.monthNames;
    b.shortMonthNames = AmCharts.shortMonthNames;
    c && (c = c[a]) && (AmCharts.lang = c, c.monthNames && (b.dayNames = c.dayNames, b.shortDayNames = c.shortDayNames, b.monthNames = c.monthNames, b.shortMonthNames = c.shortMonthNames))
};
AmCharts.IEversion = AmCharts.getIEVersion();
9 > AmCharts.IEversion && 0 < AmCharts.IEversion && (AmCharts.isModern = !1, AmCharts.isIE = !0);
AmCharts.dx = 0;
AmCharts.dy = 0;
if (document.addEventListener || window.opera) AmCharts.isNN = !0, AmCharts.isIE = !1, AmCharts.dx = .5, AmCharts.dy = .5;
document.attachEvent && (AmCharts.isNN = !1, AmCharts.isIE = !0, AmCharts.isModern || (AmCharts.dx = 0, AmCharts.dy = 0));
window.chrome && (AmCharts.chrome = !0);
AmCharts.handleResize = function () {
    for (var a = AmCharts.charts, b = 0; b < a.length; b++) {
        var c = a[b];
        c && c.div && c.handleResize()
    }
};
AmCharts.handleMouseUp = function (a) {
    for (var b = AmCharts.charts, c = 0; c < b.length; c++) {
        var d = b[c];
        d && d.handleReleaseOutside && d.handleReleaseOutside(a)
    }
};
AmCharts.handleMouseMove = function (a) {
    for (var b = AmCharts.charts, c = 0; c < b.length; c++) {
        var d = b[c];
        d && d.handleMouseMove && d.handleMouseMove(a)
    }
};
AmCharts.handleWheel = function (a) {
    for (var b = AmCharts.charts, c = 0; c < b.length; c++) {
        var d = b[c];
        if (d && d.mouseIsOver) {
            d.mouseWheelScrollEnabled || d.mouseWheelZoomEnabled ? d.handleWheel && d.handleWheel(a) : a.stopPropagation && a.stopPropagation();
            break
        }
    }
};
AmCharts.resetMouseOver = function () {
    for (var a = AmCharts.charts, b = 0; b < a.length; b++) {
        var c = a[b];
        c && (c.mouseIsOver = !1)
    }
};
AmCharts.ready = function (a) {
    AmCharts.onReadyArray.push(a)
};
AmCharts.handleLoad = function () {
    AmCharts.isReady = !0;
    for (var a = AmCharts.onReadyArray, b = 0; b < a.length; b++) {
        var c = a[b];
        isNaN(AmCharts.processDelay) ? c() : setTimeout(c, AmCharts.processDelay * b)
    }
};
AmCharts.addInitHandler = function (a, b) {
    AmCharts.initHandlers.push({
        method: a,
        types: b
    })
};
AmCharts.callInitHandler = function (a) {
    var b = AmCharts.initHandlers;
    if (AmCharts.initHandlers) for (var c = 0; c < b.length; c++) {
        var d = b[c];
        d.types ? AmCharts.isInArray(d.types, a.type) && d.method(a) : d.method(a)
    }
};
AmCharts.getUniqueId = function () {
    AmCharts.uid++;
    return "AmChartsEl-" + AmCharts.uid
};
AmCharts.isNN && (document.addEventListener("mousemove", AmCharts.handleMouseMove, !0), window.addEventListener("resize", AmCharts.handleResize, !0), window.addEventListener("orientationchange", AmCharts.handleResize, !0), document.addEventListener("mouseup", AmCharts.handleMouseUp, !0), window.addEventListener("load", AmCharts.handleLoad, !0), window.addEventListener("DOMMouseScroll", AmCharts.handleWheel, !0), document.addEventListener("mousewheel", AmCharts.handleWheel, !0));
AmCharts.isIE && (document.attachEvent("onmousemove", AmCharts.handleMouseMove), window.attachEvent("onresize", AmCharts.handleResize), document.attachEvent("onmouseup", AmCharts.handleMouseUp), window.attachEvent("onload", AmCharts.handleLoad));
AmCharts.clear = function () {
    var a = AmCharts.charts;
    if (a) for (var b = 0; b < a.length; b++) a[b].clear();
    AmCharts.charts = null;
    AmCharts.isNN && (document.removeEventListener("mousemove", AmCharts.handleMouseMove, !0), window.removeEventListener("resize", AmCharts.handleResize, !0), document.removeEventListener("mouseup", AmCharts.handleMouseUp, !0), window.removeEventListener("load", AmCharts.handleLoad, !0), window.removeEventListener("DOMMouseScroll", AmCharts.handleWheel, !0), document.removeEventListener("mousewheel", AmCharts.handleWheel, !0));
    AmCharts.isIE && (document.detachEvent("onmousemove", AmCharts.handleMouseMove), window.detachEvent("onresize", AmCharts.handleResize), document.detachEvent("onmouseup", AmCharts.handleMouseUp), window.detachEvent("onload", AmCharts.handleLoad))
};
AmCharts.makeChart = function (a, b, c) {
    var d = b.type,
        f = b.theme;
    AmCharts.isString(f) && (f = AmCharts.themes[f], b.theme = f);
    var e;
    switch (d) {
        case "serial":
            e = new AmCharts.AmSerialChart(f);
            break;
        case "xy":
            e = new AmCharts.AmXYChart(f);
            break;
        case "pie":
            e = new AmCharts.AmPieChart(f);
            break;
        case "radar":
            e = new AmCharts.AmRadarChart(f);
            break;
        case "gauge":
            e = new AmCharts.AmAngularGauge(f);
            break;
        case "funnel":
            e = new AmCharts.AmFunnelChart(f);
            break;
        case "map":
            e = new AmCharts.AmMap(f);
            break;
        case "stock":
            e = new AmCharts.AmStockChart(f)
    }
    AmCharts.extend(e,
    b);
    AmCharts.isReady ? isNaN(c) ? e.write(a) : setTimeout(function () {
        AmCharts.realWrite(e, a)
    }, c) : AmCharts.ready(function () {
        isNaN(c) ? e.write(a) : setTimeout(function () {
            AmCharts.realWrite(e, a)
        }, c)
    });
    return e
};
AmCharts.realWrite = function (a, b) {
    a.write(b)
};
AmCharts.bezierX = 3;
AmCharts.bezierY = 6;
AmCharts.toBoolean = function (a, b) {
    if (void 0 === a) return b;
    switch (String(a).toLowerCase()) {
        case "true":
        case "yes":
        case "1":
            return !0;
        case "false":
        case "no":
        case "0":
        case null:
            return !1;
        default:
            return Boolean(a)
    }
};
AmCharts.removeFromArray = function (a, b) {
    var c;
    if (void 0 != b && void 0 != a) for (c = a.length - 1; 0 <= c; c--) a[c] == b && a.splice(c, 1)
};
AmCharts.isInArray = function (a, b) {
    for (var c = 0; c < a.length; c++) if (a[c] == b) return !0;
    return !1
};
AmCharts.getDecimals = function (a) {
    var b = 0;
    isNaN(a) || (a = String(a), -1 != a.indexOf("e-") ? b = Number(a.split("-")[1]) : -1 != a.indexOf(".") && (b = a.split(".")[1].length));
    return b
};
AmCharts.wrappedText = function (a, b, c, d, f, e, g, h, k) {
    var l = AmCharts.text(a, b, c, d, f, e, g),
        m = "\n";
    AmCharts.isModern || (m = "<br>");
    if (10 < k) return l;
    if (l) {
        var n = l.getBBox();
        if (n.width > h) {
            n = Math.ceil(n.width / h);
            l.remove();
            for (var l = [], t = 0; - 1 < (index = b.indexOf(" ", t));) l.push(index), t = index + 1;
            Math.round(b.length / 2);
            for (var p, t = 0; t < l.length; t += Math.ceil(l.length / n)) p = l[t], b = b.substr(0, p) + m + b.substr(p + 1);
            if (isNaN(p)) {
                if (0 == k) for (t = 1; t < n; t++) p = Math.round(b.length / n * t), b = b.substr(0, p) + m + b.substr(p);
                return AmCharts.text(a,
                b, c, d, f, e, g)
            }
            return AmCharts.wrappedText(a, b, c, d, f, e, g, h, k + 1)
        }
        return l
    }
};
AmCharts.getStyle = function (a, b) {
    var c = "";
    document.defaultView && document.defaultView.getComputedStyle ? c = document.defaultView.getComputedStyle(a, "").getPropertyValue(b) : a.currentStyle && (b = b.replace(/\-(\w)/g, function (a, b) {
        return b.toUpperCase()
    }), c = a.currentStyle[b]);
    return c
};
AmCharts.removePx = function (a) {
    if (void 0 != a) return Number(a.substring(0, a.length - 2))
};
AmCharts.getURL = function (a, b) {
    if (a) if ("_self" != b && b) if ("_top" == b && window.top) window.top.location.href = a;
    else if ("_parent" == b && window.parent) window.parent.location.href = a;
    else if ("_blank" == b) window.open(a);
    else {
        var c = document.getElementsByName(b)[0];
        c ? c.src = a : (c = AmCharts.windows[b]) ? c.opener && !c.opener.closed ? c.location.href = a : AmCharts.windows[b] = window.open(a) : AmCharts.windows[b] = window.open(a)
    } else window.location.href = a
};
AmCharts.ifArray = function (a) {
    return a && 0 < a.length ? !0 : !1
};
AmCharts.callMethod = function (a, b) {
    var c;
    for (c = 0; c < b.length; c++) {
        var d = b[c];
        if (d) {
            if (d[a]) d[a]();
            var f = d.length;
            if (0 < f) {
                var e;
                for (e = 0; e < f; e++) {
                    var g = d[e];
                    if (g && g[a]) g[a]()
                }
            }
        }
    }
};
AmCharts.toNumber = function (a) {
    return "number" == typeof a ? a : Number(String(a).replace(/[^0-9\-.]+/g, ""))
};
AmCharts.toColor = function (a) {
    if ("" !== a && void 0 !== a) if (-1 != a.indexOf(",")) {
        a = a.split(",");
        var b;
        for (b = 0; b < a.length; b++) {
            var c = a[b].substring(a[b].length - 6, a[b].length);
            a[b] = "#" + c
        }
    } else a = a.substring(a.length - 6, a.length), a = "#" + a;
    return a
};
AmCharts.toCoordinate = function (a, b, c) {
    var d;
    void 0 !== a && (a = String(a), c && c < b && (b = c), d = Number(a), -1 != a.indexOf("!") && (d = b - Number(a.substr(1))), -1 != a.indexOf("%") && (d = b * Number(a.substr(0, a.length - 1)) / 100));
    return d
};
AmCharts.fitToBounds = function (a, b, c) {
    a < b && (a = b);
    a > c && (a = c);
    return a
};
AmCharts.isDefined = function (a) {
    return void 0 === a ? !1 : !0
};
AmCharts.stripNumbers = function (a) {
    return a.replace(/[0-9]+/g, "")
};
AmCharts.roundTo = function (a, b) {
    if (0 > b) return a;
    var c = Math.pow(10, b);
    return Math.round(a * c) / c
};
AmCharts.toFixed = function (a, b) {
    var c = String(Math.round(a * Math.pow(10, b)));
    if (0 < b) {
        var d = c.length;
        if (d < b) {
            var f;
            for (f = 0; f < b - d; f++) c = "0" + c
        }
        d = c.substring(0, c.length - b);
        "" === d && (d = 0);
        return d + "." + c.substring(c.length - b, c.length)
    }
    return String(c)
};
AmCharts.formatDuration = function (a, b, c, d, f, e) {
    var g = AmCharts.intervals,
        h = e.decimalSeparator;
    if (a >= g[b].contains) {
        var k = a - Math.floor(a / g[b].contains) * g[b].contains;
        "ss" == b && (k = AmCharts.formatNumber(k, e), 1 == k.split(h)[0].length && (k = "0" + k));
        ("mm" == b || "hh" == b) && 10 > k && (k = "0" + k);
        c = k + "" + d[b] + "" + c;
        a = Math.floor(a / g[b].contains);
        b = g[b].nextInterval;
        return AmCharts.formatDuration(a, b, c, d, f, e)
    }
    "ss" == b && (a = AmCharts.formatNumber(a, e), 1 == a.split(h)[0].length && (a = "0" + a));
    ("mm" == b || "hh" == b) && 10 > a && (a = "0" + a);
    c = a + "" + d[b] + "" + c;
    if (g[f].count > g[b].count) for (a = g[b].count; a < g[f].count; a++) b = g[b].nextInterval, "ss" == b || "mm" == b || "hh" == b ? c = "00" + d[b] + "" + c : "DD" == b && (c = "0" + d[b] + "" + c);
    ":" == c.charAt(c.length - 1) && (c = c.substring(0, c.length - 1));
    return c
};
AmCharts.formatNumber = function (a, b, c, d, f) {
    a = AmCharts.roundTo(a, b.precision);
    isNaN(c) && (c = b.precision);
    var e = b.decimalSeparator;
    b = b.thousandsSeparator;
    var g;
    g = 0 > a ? "-" : "";
    a = Math.abs(a);
    var h = String(a),
        k = !1; - 1 != h.indexOf("e") && (k = !0);
    0 <= c && !k && (h = AmCharts.toFixed(a, c));
    var l = "";
    if (k) l = h;
    else {
        var h = h.split("."),
            k = String(h[0]),
            m;
        for (m = k.length; 0 <= m; m -= 3) l = m != k.length ? 0 !== m ? k.substring(m - 3, m) + b + l : k.substring(m - 3, m) + l : k.substring(m - 3, m);
        void 0 !== h[1] && (l = l + e + h[1]);
        void 0 !== c && 0 < c && "0" != l && (l = AmCharts.addZeroes(l,
        e, c))
    }
    l = g + l;
    "" === g && !0 === d && 0 !== a && (l = "+" + l);
    !0 === f && (l += "%");
    return l
};
AmCharts.addZeroes = function (a, b, c) {
    a = a.split(b);
    void 0 === a[1] && 0 < c && (a[1] = "0");
    return a[1].length < c ? (a[1] += "0", AmCharts.addZeroes(a[0] + b + a[1], b, c)) : void 0 !== a[1] ? a[0] + b + a[1] : a[0]
};
AmCharts.scientificToNormal = function (a) {
    var b;
    a = String(a).split("e");
    var c;
    if ("-" == a[1].substr(0, 1)) {
        b = "0.";
        for (c = 0; c < Math.abs(Number(a[1])) - 1; c++) b += "0";
        b += a[0].split(".").join("")
    } else {
        var d = 0;
        b = a[0].split(".");
        b[1] && (d = b[1].length);
        b = a[0].split(".").join("");
        for (c = 0; c < Math.abs(Number(a[1])) - d; c++) b += "0"
    }
    return b
};
AmCharts.toScientific = function (a, b) {
    if (0 === a) return "0";
    var c = Math.floor(Math.log(Math.abs(a)) * Math.LOG10E);
    Math.pow(10, c);
    mantissa = String(mantissa).split(".").join(b);
    return String(mantissa) + "e" + c
};
AmCharts.randomColor = function () {
    return "#" + ("00000" + (16777216 * Math.random() << 0).toString(16)).substr(-6)
};
AmCharts.hitTest = function (a, b, c) {
    var d = !1,
        f = a.x,
        e = a.x + a.width,
        g = a.y,
        h = a.y + a.height,
        k = AmCharts.isInRectangle;
    d || (d = k(f, g, b));
    d || (d = k(f, h, b));
    d || (d = k(e, g, b));
    d || (d = k(e, h, b));
    d || !0 === c || (d = AmCharts.hitTest(b, a, !0));
    return d
};
AmCharts.isInRectangle = function (a, b, c) {
    return a >= c.x - 5 && a <= c.x + c.width + 5 && b >= c.y - 5 && b <= c.y + c.height + 5 ? !0 : !1
};
AmCharts.isPercents = function (a) {
    if (-1 != String(a).indexOf("%")) return !0
};
AmCharts.findPosX = function (a) {
    var b = a,
        c = a.offsetLeft;
    if (a.offsetParent) {
        for (; a = a.offsetParent;) c += a.offsetLeft;
        for (;
        (b = b.parentNode) && b != document.body;) c -= b.scrollLeft || 0
    }
    return c
};
AmCharts.findPosY = function (a) {
    var b = a,
        c = a.offsetTop;
    if (a.offsetParent) {
        for (; a = a.offsetParent;) c += a.offsetTop;
        for (;
        (b = b.parentNode) && b != document.body;) c -= b.scrollTop || 0
    }
    return c
};
AmCharts.findIfFixed = function (a) {
    if (a.offsetParent) for (; a = a.offsetParent;) if ("fixed" == AmCharts.getStyle(a, "position")) return !0;
    return !1
};
AmCharts.findIfAuto = function (a) {
    return a.style && "auto" == AmCharts.getStyle(a, "overflow") ? !0 : a.parentNode ? AmCharts.findIfAuto(a.parentNode) : !1
};
AmCharts.findScrollLeft = function (a, b) {
    a.scrollLeft && (b += a.scrollLeft);
    return a.parentNode ? AmCharts.findScrollLeft(a.parentNode, b) : b
};
AmCharts.findScrollTop = function (a, b) {
    a.scrollTop && (b += a.scrollTop);
    return a.parentNode ? AmCharts.findScrollTop(a.parentNode, b) : b
};
AmCharts.formatValue = function (a, b, c, d, f, e, g, h) {
    if (b) {
        void 0 === f && (f = "");
        var k;
        for (k = 0; k < c.length; k++) {
            var l = c[k],
                m = b[l];
            void 0 !== m && (m = e ? AmCharts.addPrefix(m, h, g, d) : AmCharts.formatNumber(m, d), a = a.replace(new RegExp("\\[\\[" + f + "" + l + "\\]\\]", "g"), m))
        }
    }
    return a
};
AmCharts.formatDataContextValue = function (a, b) {
    if (a) {
        var c = a.match(/\[\[.*?\]\]/g),
            d;
        for (d = 0; d < c.length; d++) {
            var f = c[d],
                f = f.substr(2, f.length - 4);
            void 0 !== b[f] && (a = a.replace(new RegExp("\\[\\[" + f + "\\]\\]", "g"), b[f]))
        }
    }
    return a
};
AmCharts.massReplace = function (a, b) {
    for (var c in b) if (b.hasOwnProperty(c)) {
        var d = b[c];
        void 0 === d && (d = "");
        a = a.replace(c, d)
    }
    return a
};
AmCharts.cleanFromEmpty = function (a) {
    return a.replace(/\[\[[^\]]*\]\]/g, "")
};
AmCharts.addPrefix = function (a, b, c, d, f) {
    var e = AmCharts.formatNumber(a, d),
        g = "",
        h, k, l;
    if (0 === a) return "0";
    0 > a && (g = "-");
    a = Math.abs(a);
    if (1 < a) for (h = b.length - 1; - 1 < h; h--) {
        if (a >= b[h].number && (k = a / b[h].number, l = Number(d.precision), 1 > l && (l = 1), c = AmCharts.roundTo(k, l), l = AmCharts.formatNumber(c, {
            precision: -1,
            decimalSeparator: d.decimalSeparator,
            thousandsSeparator: d.thousandsSeparator
        }), !f || k == c)) {
            e = g + "" + l + "" + b[h].prefix;
            break
        }
    } else for (h = 0; h < c.length; h++) if (a <= c[h].number) {
        k = a / c[h].number;
        l = Math.abs(Math.round(Math.log(k) * Math.LOG10E));
        k = AmCharts.roundTo(k, l);
        e = g + "" + k + "" + c[h].prefix;
        break
    }
    return e
};
AmCharts.remove = function (a) {
    a && a.remove()
};
AmCharts.recommended = function () {
    var a = "js";
    document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") || swfobject && swfobject.hasFlashPlayerVersion("8") && (a = "flash");
    return a
};
AmCharts.getEffect = function (a) {
    ">" == a && (a = "easeOutSine");
    "<" == a && (a = "easeInSine");
    "elastic" == a && (a = "easeOutElastic");
    return a
};
AmCharts.getObjById = function (a, b) {
    var c, d;
    for (d = 0; d < a.length; d++) {
        var f = a[d];
        f.id == b && (c = f)
    }
    return c
};
AmCharts.applyTheme = function (a, b, c) {
    b || (b = AmCharts.theme);
    b && b[c] && AmCharts.extend(a, b[c])
};
AmCharts.isString = function (a) {
    return "string" == typeof a ? !0 : !1
};
AmCharts.extend = function (a, b, c) {
    for (var d in b) c ? a.hasOwnProperty(d) || (a[d] = b[d]) : a[d] = b[d];
    return a
};
AmCharts.copyProperties = function (a, b) {
    for (var c in a) a.hasOwnProperty(c) && "events" != c && void 0 !== a[c] && "function" != typeof a[c] && "cname" != c && (b[c] = a[c])
};
AmCharts.processObject = function (a, b, c) {
    !1 === a instanceof b && (a = AmCharts.extend(new b(c), a));
    return a
};
AmCharts.fixNewLines = function (a) {
    var b = RegExp("\\n", "g");
    a && (a = a.replace(b, "<br />"));
    return a
};
AmCharts.fixBrakes = function (a) {
    if (AmCharts.isModern) {
        var b = RegExp("<br>", "g");
        a && (a = a.replace(b, "\n"))
    } else a = AmCharts.fixNewLines(a);
    return a
};
AmCharts.deleteObject = function (a, b) {
    if (a) {
        if (void 0 === b || null === b) b = 20;
        if (0 !== b) if ("[object Array]" === Object.prototype.toString.call(a)) for (var c = 0; c < a.length; c++) AmCharts.deleteObject(a[c], b - 1), a[c] = null;
        else if (a && !a.tagName) try {
            for (c in a) a[c] && ("object" == typeof a[c] && AmCharts.deleteObject(a[c], b - 1), "function" != typeof a[c] && (a[c] = null))
        } catch (d) {}
    }
};
AmCharts.bounce = function (a, b, c, d, f) {
    return (b /= f) < 1 / 2.75 ? 7.5625 * d * b * b + c : b < 2 / 2.75 ? d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c : b < 2.5 / 2.75 ? d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c
};
AmCharts.easeInSine = function (a, b, c, d, f) {
    return -d * Math.cos(b / f * (Math.PI / 2)) + d + c
};
AmCharts.easeOutSine = function (a, b, c, d, f) {
    return d * Math.sin(b / f * (Math.PI / 2)) + c
};
AmCharts.easeOutElastic = function (a, b, c, d, f) {
    a = 1.70158;
    var e = 0,
        g = d;
    if (0 === b) return c;
    if (1 == (b /= f)) return c + d;
    e || (e = .3 * f);
    g < Math.abs(d) ? (g = d, a = e / 4) : a = e / (2 * Math.PI) * Math.asin(d / g);
    return g * Math.pow(2, -10 * b) * Math.sin(2 * (b * f - a) * Math.PI / e) + d + c
};
AmCharts.fixStepE = function (a) {
    a = a.toExponential(0).split("e");
    var b = Number(a[1]);
    9 == Number(a[0]) && b++;
    return AmCharts.generateNumber(1, b)
};
AmCharts.generateNumber = function (a, b) {
    var c = "",
        d;
    d = 0 > b ? Math.abs(b) - 1 : Math.abs(b);
    var f;
    for (f = 0; f < d; f++) c += "0";
    return 0 > b ? Number("0." + c + String(a)) : Number(String(a) + c)
};
AmCharts.setCN = function (a, b, c, d) {
    if (a.addClassNames && b && (b = b.node) && c) {
        var f = b.getAttribute("class");
        a = a.classNamePrefix + "-";
        d && (a = "");
        f ? b.setAttribute("class", f + " " + a + c) : b.setAttribute("class", a + c)
    }
};
AmCharts.parseDefs = function (a, b) {
    for (var c in a) {
        var d = typeof a[c];
        if (0 < a[c].length && "object" == d) for (d = 0; d < a[c].length; d++) {
            var f = document.createElementNS(AmCharts.SVG_NS, c);
            b.appendChild(f);
            AmCharts.parseDefs(a[c][d], f)
        } else "object" == d ? (f = document.createElementNS(AmCharts.SVG_NS, c), b.appendChild(f), AmCharts.parseDefs(a[c], f)) : b.setAttribute(c, a[c])
    }
};
AmCharts.AmDraw = AmCharts.Class({
    construct: function (a, b, c, d) {
        AmCharts.SVG_NS = "http://www.w3.org/2000/svg";
        AmCharts.SVG_XLINK = "http://www.w3.org/1999/xlink";
        AmCharts.hasSVG = !! document.createElementNS && !! document.createElementNS(AmCharts.SVG_NS, "svg").createSVGRect;
        1 > b && (b = 10);
        1 > c && (c = 10);
        this.div = a;
        this.width = b;
        this.height = c;
        this.rBin = document.createElement("div");
        AmCharts.hasSVG ? (AmCharts.SVG = !0, b = this.createSvgElement("svg"), a.appendChild(b), this.container = b, this.addDefs(d), this.R = new AmCharts.SVGRenderer(this)) : AmCharts.isIE && AmCharts.VMLRenderer && (AmCharts.VML = !0, AmCharts.vmlStyleSheet || (document.namespaces.add("amvml", "urn:schemas-microsoft-com:vml"), 31 > document.styleSheets.length ? (b = document.createStyleSheet(), b.addRule(".amvml", "behavior:url(#default#VML); display:inline-block; antialias:true"), AmCharts.vmlStyleSheet = b) : document.styleSheets[0].addRule(".amvml", "behavior:url(#default#VML); display:inline-block; antialias:true")), this.container = a, this.R = new AmCharts.VMLRenderer(this, d), this.R.disableSelection(a))
    },
    createSvgElement: function (a) {
        return document.createElementNS(AmCharts.SVG_NS, a)
    },
    circle: function (a, b, c, d) {
        var f = new AmCharts.AmDObject("circle", this);
        f.attr({
            r: c,
            cx: a,
            cy: b
        });
        this.addToContainer(f.node, d);
        return f
    },
    ellipse: function (a, b, c, d, f) {
        var e = new AmCharts.AmDObject("ellipse", this);
        e.attr({
            rx: c,
            ry: d,
            cx: a,
            cy: b
        });
        this.addToContainer(e.node, f);
        return e
    },
    setSize: function (a, b) {
        0 < a && 0 < b && (this.container.style.width = a + "px", this.container.style.height = b + "px")
    },
    rect: function (a, b, c, d, f, e, g) {
        var h = new AmCharts.AmDObject("rect",
        this);
        AmCharts.VML && (f = Math.round(100 * f / Math.min(c, d)), c += 2 * e, d += 2 * e, h.bw = e, h.node.style.marginLeft = -e, h.node.style.marginTop = -e);
        1 > c && (c = 1);
        1 > d && (d = 1);
        h.attr({
            x: a,
            y: b,
            width: c,
            height: d,
            rx: f,
            ry: f,
            "stroke-width": e
        });
        this.addToContainer(h.node, g);
        return h
    },
    image: function (a, b, c, d, f, e) {
        var g = new AmCharts.AmDObject("image", this);
        g.attr({
            x: b,
            y: c,
            width: d,
            height: f
        });
        this.R.path(g, a);
        this.addToContainer(g.node, e);
        return g
    },
    addToContainer: function (a, b) {
        b || (b = this.container);
        b.appendChild(a)
    },
    text: function (a,
    b, c) {
        return this.R.text(a, b, c)
    },
    path: function (a, b, c, d) {
        var f = new AmCharts.AmDObject("path", this);
        d || (d = "100,100");
        f.attr({
            cs: d
        });
        c ? f.attr({
            dd: a
        }) : f.attr({
            d: a
        });
        this.addToContainer(f.node, b);
        return f
    },
    set: function (a) {
        return this.R.set(a)
    },
    remove: function (a) {
        if (a) {
            var b = this.rBin;
            b.appendChild(a);
            b.innerHTML = ""
        }
    },
    renderFix: function () {
        var a = this.container,
            b = a.style,
            c;
        try {
            c = a.getScreenCTM() || a.createSVGMatrix()
        } catch (d) {
            c = a.createSVGMatrix()
        }
        a = 1 - c.e % 1;
        c = 1 - c.f % 1;.5 < a && --a;.5 < c && --c;
        a && (b.left = a + "px");
        c && (b.top = c + "px")
    },
    update: function () {
        this.R.update()
    },
    addDefs: function (a) {
        if (AmCharts.hasSVG) {
            var b = this.createSvgElement("desc"),
                c = this.container;
            c.setAttribute("version", "1.1");
            c.style.position = "absolute";
            this.setSize(this.width, this.height);
            AmCharts.rtl && (c.setAttribute("direction", "rtl"), c.style.left = "auto", c.style.right = "0px");
            b.appendChild(document.createTextNode("JavaScript chart by amCharts " + a.version));
            c.appendChild(b);
            a.defs && (b = this.createSvgElement("defs"), c.appendChild(b), AmCharts.parseDefs(a.defs,
            b), this.defs = b)
        }
    }
});
AmCharts.AmDObject = AmCharts.Class({
    construct: function (a, b) {
        this.D = b;
        this.R = b.R;
        this.node = this.R.create(this, a);
        this.y = this.x = 0;
        this.scale = 1
    },
    attr: function (a) {
        this.R.attr(this, a);
        return this
    },
    getAttr: function (a) {
        return this.node.getAttribute(a)
    },
    setAttr: function (a, b) {
        this.R.setAttr(this, a, b);
        return this
    },
    clipRect: function (a, b, c, d) {
        this.R.clipRect(this, a, b, c, d)
    },
    translate: function (a, b, c, d) {
        d || (a = Math.round(a), b = Math.round(b));
        this.R.move(this, a, b, c);
        this.x = a;
        this.y = b;
        this.scale = c;
        this.angle && this.rotate(this.angle)
    },
    rotate: function (a, b) {
        this.R.rotate(this, a, b);
        this.angle = a
    },
    animate: function (a, b, c) {
        for (var d in a) if (a.hasOwnProperty(d)) {
            var f = d,
                e = a[d];
            c = AmCharts.getEffect(c);
            this.R.animate(this, f, e, b, c)
        }
    },
    push: function (a) {
        if (a) {
            var b = this.node;
            b.appendChild(a.node);
            var c = a.clipPath;
            c && b.appendChild(c);
            (a = a.grad) && b.appendChild(a)
        }
    },
    text: function (a) {
        this.R.setText(this, a)
    },
    remove: function () {
        this.R.remove(this)
    },
    clear: function () {
        var a = this.node;
        if (a.hasChildNodes()) for (; 1 <= a.childNodes.length;) a.removeChild(a.firstChild)
    },
    hide: function () {
        this.setAttr("visibility", "hidden")
    },
    show: function () {
        this.setAttr("visibility", "visible")
    },
    getBBox: function () {
        return this.R.getBBox(this)
    },
    toFront: function () {
        var a = this.node;
        if (a) {
            this.prevNextNode = a.nextSibling;
            var b = a.parentNode;
            b && b.appendChild(a)
        }
    },
    toPrevious: function () {
        var a = this.node;
        a && this.prevNextNode && (a = a.parentNode) && a.insertBefore(this.prevNextNode, null)
    },
    toBack: function () {
        var a = this.node;
        if (a) {
            this.prevNextNode = a.nextSibling;
            var b = a.parentNode;
            if (b) {
                var c = b.firstChild;
                c && b.insertBefore(a, c)
            }
        }
    },
    mouseover: function (a) {
        this.R.addListener(this, "mouseover", a);
        return this
    },
    mouseout: function (a) {
        this.R.addListener(this, "mouseout", a);
        return this
    },
    click: function (a) {
        this.R.addListener(this, "click", a);
        return this
    },
    dblclick: function (a) {
        this.R.addListener(this, "dblclick", a);
        return this
    },
    mousedown: function (a) {
        this.R.addListener(this, "mousedown", a);
        return this
    },
    mouseup: function (a) {
        this.R.addListener(this, "mouseup", a);
        return this
    },
    touchstart: function (a) {
        this.R.addListener(this,
            "touchstart", a);
        return this
    },
    touchend: function (a) {
        this.R.addListener(this, "touchend", a);
        return this
    },
    contextmenu: function (a) {
        this.node.addEventListener ? this.node.addEventListener("contextmenu", a, !0) : this.R.addListener(this, "contextmenu", a);
        return this
    },
    stop: function (a) {
        AmCharts.removeFromArray(this.R.animations, this.an_x);
        AmCharts.removeFromArray(this.R.animations, this.an_y)
    },
    length: function () {
        return this.node.childNodes.length
    },
    gradient: function (a, b, c) {
        this.R.gradient(this, a, b, c)
    },
    pattern: function (a,
    b) {
        a && this.R.pattern(this, a, b)
    }
});
AmCharts.SVGRenderer = AmCharts.Class({
    construct: function (a) {
        this.D = a;
        this.animations = []
    },
    create: function (a, b) {
        return document.createElementNS(AmCharts.SVG_NS, b)
    },
    attr: function (a, b) {
        for (var c in b) b.hasOwnProperty(c) && this.setAttr(a, c, b[c])
    },
    setAttr: function (a, b, c) {
        void 0 !== c && a.node.setAttribute(b, c)
    },
    animate: function (a, b, c, d, f) {
        var e = a.node;
        a["an_" + b] && AmCharts.removeFromArray(this.animations, a["an_" + b]);
        "translate" == b ? (e = (e = e.getAttribute("transform")) ? String(e).substring(10, e.length - 1) : "0,0", e = e.split(", ").join(" "), e = e.split(" ").join(","), 0 === e && (e = "0,0")) : e = Number(e.getAttribute(b));
        c = {
            obj: a,
            frame: 0,
            attribute: b,
            from: e,
            to: c,
            time: d,
            effect: f
        };
        this.animations.push(c);
        a["an_" + b] = c
    },
    update: function () {
        var a, b = this.animations;
        for (a = b.length - 1; 0 <= a; a--) {
            var c = b[a],
                d = 1E3 * c.time / AmCharts.updateRate,
                f = c.frame + 1,
                e = c.obj,
                g = c.attribute,
                h, k, l;
            f <= d ? (c.frame++, "translate" == g ? (h = c.from.split(","), g = Number(h[0]), h = Number(h[1]), isNaN(h) && (h = 0), k = c.to.split(","), l = Number(k[0]), k = Number(k[1]), l = 0 === l - g ? l : Math.round(AmCharts[c.effect](0, f, g, l - g, d)), c = 0 === k - h ? k : Math.round(AmCharts[c.effect](0, f, h, k - h, d)), g = "transform", c = "translate(" + l + "," + c + ")") : (k = Number(c.from), h = Number(c.to), l = h - k, c = AmCharts[c.effect](0, f, k, l, d), isNaN(c) && (c = h), 0 === l && this.animations.splice(a, 1)), this.setAttr(e, g, c)) : ("translate" == g ? (k = c.to.split(","), l = Number(k[0]), k = Number(k[1]), e.translate(l, k)) : (h = Number(c.to), this.setAttr(e, g, h)), this.animations.splice(a, 1))
        }
    },
    getBBox: function (a) {
        if (a = a.node) try {
            return a.getBBox()
        } catch (b) {}
        return {
            width: 0,
            height: 0,
            x: 0,
            y: 0
        }
    },
    path: function (a, b) {
        a.node.setAttributeNS(AmCharts.SVG_XLINK, "xlink:href", b)
    },
    clipRect: function (a, b, c, d, f) {
        var e = a.node,
            g = a.clipPath;
        g && this.D.remove(g);
        var h = e.parentNode;
        h && (e = document.createElementNS(AmCharts.SVG_NS, "clipPath"), g = AmCharts.getUniqueId(), e.setAttribute("id", g), this.D.rect(b, c, d, f, 0, 0, e), h.appendChild(e), b = "#", AmCharts.baseHref && !AmCharts.isIE && (b = this.removeTarget(window.location.href) + b), this.setAttr(a, "clip-path", "url(" + b + g + ")"), this.clipPathC++, a.clipPath = e)
    },
    text: function (a, b, c) {
        var d = new AmCharts.AmDObject("text", this.D);
        a = String(a).split("\n");
        var f = b["font-size"],
            e;
        for (e = 0; e < a.length; e++) {
            var g = this.create(null, "tspan");
            g.appendChild(document.createTextNode(a[e]));
            g.setAttribute("y", (f + 2) * e + Math.round(f / 2));
            g.setAttribute("x", 0);
            g.style.fontSize = f + "px";
            d.node.appendChild(g)
        }
        d.node.setAttribute("y", Math.round(f / 2));
        this.attr(d, b);
        this.D.addToContainer(d.node, c);
        return d
    },
    setText: function (a, b) {
        var c = a.node;
        c && (c.removeChild(c.firstChild), c.appendChild(document.createTextNode(b)))
    },
    move: function (a, b, c, d) {
        isNaN(b) && (b = 0);
        isNaN(c) && (c = 0);
        b = "translate(" + b + "," + c + ")";
        d && (b = b + " scale(" + d + ")");
        this.setAttr(a, "transform", b)
    },
    rotate: function (a, b) {
        var c = a.node.getAttribute("transform"),
            d = "rotate(" + b + ")";
        c && (d = c + " " + d);
        this.setAttr(a, "transform", d)
    },
    set: function (a) {
        var b = new AmCharts.AmDObject("g", this.D);
        this.D.container.appendChild(b.node);
        if (a) {
            var c;
            for (c = 0; c < a.length; c++) b.push(a[c])
        }
        return b
    },
    addListener: function (a, b, c) {
        a.node["on" + b] = c
    },
    gradient: function (a, b, c, d) {
        var f = a.node,
            e = a.grad;
        e && this.D.remove(e);
        b = document.createElementNS(AmCharts.SVG_NS, b);
        e = AmCharts.getUniqueId();
        b.setAttribute("id", e);
        if (!isNaN(d)) {
            var g = 0,
                h = 0,
                k = 0,
                l = 0;
            90 == d ? k = 100 : 270 == d ? l = 100 : 180 == d ? g = 100 : 0 === d && (h = 100);
            b.setAttribute("x1", g + "%");
            b.setAttribute("x2", h + "%");
            b.setAttribute("y1", k + "%");
            b.setAttribute("y2", l + "%")
        }
        for (d = 0; d < c.length; d++) g = document.createElementNS(AmCharts.SVG_NS, "stop"), h = 100 * d / (c.length - 1), 0 === d && (h = 0), g.setAttribute("offset", h + "%"), g.setAttribute("stop-color", c[d]), b.appendChild(g);
        f.parentNode.appendChild(b);
        c = "#";
        AmCharts.baseHref && !AmCharts.isIE && (c = this.removeTarget(window.location.href) + c);
        f.setAttribute("fill", "url(" + c + e + ")");
        a.grad = b
    },
    removeTarget: function (a) {
        urlArr = a.split("#");
        return urlArr[0]
    },
    pattern: function (a, b, c) {
        var d = a.node;
        isNaN(c) && (c = 1);
        var f = a.patternNode;
        f && this.D.remove(f);
        var f = document.createElementNS(AmCharts.SVG_NS, "pattern"),
            e = AmCharts.getUniqueId(),
            g = b;
        b.url && (g = b.url);
        var h = Number(b.width);
        isNaN(h) && (h = 4);
        var k = Number(b.height);
        isNaN(k) && (k = 4);
        h /= c;
        k /= c;
        c = b.x;
        isNaN(c) && (c = 0);
        var l = -Math.random() * Number(b.randomX);
        isNaN(l) || (c = l);
        l = b.y;
        isNaN(l) && (l = 0);
        var m = -Math.random() * Number(b.randomY);
        isNaN(m) || (l = m);
        f.setAttribute("id", e);
        f.setAttribute("width", h);
        f.setAttribute("height", k);
        f.setAttribute("patternUnits", "userSpaceOnUse");
        f.setAttribute("xlink:href", g);
        b.color && (m = document.createElementNS(AmCharts.SVG_NS, "rect"), m.setAttributeNS(null, "height", h), m.setAttributeNS(null, "width", k), m.setAttributeNS(null, "fill", b.color), f.appendChild(m));
        this.D.image(g,
        0, 0, h, k, f).translate(c, l);
        g = "#";
        AmCharts.baseHref && !AmCharts.isIE && (g = this.removeTarget(window.location.href) + g);
        d.setAttribute("fill", "url(" + g + e + ")");
        a.patternNode = f;
        d.parentNode.appendChild(f)
    },
    remove: function (a) {
        a.clipPath && this.D.remove(a.clipPath);
        a.grad && this.D.remove(a.grad);
        a.patternNode && this.D.remove(a.patternNode);
        this.D.remove(a.node)
    }
});
AmCharts.AmChart = AmCharts.Class({
    construct: function (a) {
        this.theme = a;
        this.classNamePrefix = "amcharts";
        this.addClassNames = !1;
        this.version = "3.13.3";
        AmCharts.addChart(this);
        this.createEvents("dataUpdated", "init", "rendered", "drawn", "failed", "resized");
        this.height = this.width = "100%";
        this.dataChanged = !0;
        this.chartCreated = !1;
        this.previousWidth = this.previousHeight = 0;
        this.backgroundColor = "#FFFFFF";
        this.borderAlpha = this.backgroundAlpha = 0;
        this.color = this.borderColor = "#000000";
        this.fontFamily = "Verdana";
        this.fontSize = 11;
        this.usePrefixes = !1;
        this.precision = -1;
        this.percentPrecision = 2;
        this.decimalSeparator = ".";
        this.thousandsSeparator = ",";
        this.labels = [];
        this.allLabels = [];
        this.titles = [];
        this.marginRight = this.marginLeft = this.autoMarginOffset = 0;
        this.timeOuts = [];
        this.creditsPosition = "top-left";
        var b = document.createElement("div"),
            c = b.style;
        c.overflow = "hidden";
        c.position = "relative";
        c.textAlign = "left";
        this.chartDiv = b;
        b = document.createElement("div");
        c = b.style;
        c.overflow = "hidden";
        c.position = "relative";
        c.textAlign = "left";
        this.legendDiv = b;
        this.titleHeight = 0;
        this.hideBalloonTime = 150;
        this.handDrawScatter = 2;
        this.handDrawThickness = 1;
        this.prefixesOfBigNumbers = [{
            number: 1E3,
            prefix: "k"
        }, {
            number: 1E6,
            prefix: "M"
        }, {
            number: 1E9,
            prefix: "G"
        }, {
            number: 1E12,
            prefix: "T"
        }, {
            number: 1E15,
            prefix: "P"
        }, {
            number: 1E18,
            prefix: "E"
        }, {
            number: 1E21,
            prefix: "Z"
        }, {
            number: 1E24,
            prefix: "Y"
        }];
        this.prefixesOfSmallNumbers = [{
            number: 1E-24,
            prefix: "y"
        }, {
            number: 1E-21,
            prefix: "z"
        }, {
            number: 1E-18,
            prefix: "a"
        }, {
            number: 1E-15,
            prefix: "f"
        }, {
            number: 1E-12,
            prefix: "p"
        }, {
            number: 1E-9,
            prefix: "n"
        }, {
            number: 1E-6,
            prefix: "\u03bc"
        }, {
            number: .001,
            prefix: "m"
        }];
        this.panEventsEnabled = !0;
        this.product = "amcharts";
        this.animations = [];
        this.balloon = new AmCharts.AmBalloon(this.theme);
        this.balloon.chart = this;
        AmCharts.applyTheme(this, a, "AmChart")
    },
    drawChart: function () {
        this.drawBackground();
        this.redrawLabels();
        this.drawTitles();
        this.brr()
    },
    drawBackground: function () {
        AmCharts.remove(this.background);
        var a = this.container,
            b = this.backgroundColor,
            c = this.backgroundAlpha,
            d = this.set;
        AmCharts.isModern || 0 !== c || (c = .001);
        var f = this.updateWidth();
        this.realWidth = f;
        var e = this.updateHeight();
        this.realHeight = e;
        b = AmCharts.polygon(a, [0, f - 1, f - 1, 0], [0, 0, e - 1, e - 1], b, c, 1, this.borderColor, this.borderAlpha);
        AmCharts.setCN(this, b, "bg");
        this.background = b;
        d.push(b);
        if (b = this.backgroundImage) this.path && (b = this.path + b), a = a.image(b, 0, 0, f, e), AmCharts.setCN(this, b, "bg-image"), this.bgImg = a, d.push(a)
    },
    drawTitles: function () {
        var a = this.titles;
        if (AmCharts.ifArray(a)) {
            var b = 20,
                c;
            for (c = 0; c < a.length; c++) {
                var d = a[c],
                    d = AmCharts.processObject(d, AmCharts.Title,
                    this.theme);
                if (!1 !== d.enabled) {
                    var f = d.color;
                    void 0 === f && (f = this.color);
                    var e = d.size;
                    isNaN(e) && (e = this.fontSize + 2);
                    isNaN(d.alpha);
                    var g = this.marginLeft,
                        f = AmCharts.text(this.container, d.text, f, this.fontFamily, e);
                    f.translate(g + (this.realWidth - this.marginRight - g) / 2, b);
                    f.node.style.pointerEvents = "none";
                    AmCharts.setCN(this, f, "title");
                    d.id && AmCharts.setCN(this, f, "title-" + d.id);
                    g = !0;
                    void 0 !== d.bold && (g = d.bold);
                    g && f.attr({
                        "font-weight": "bold"
                    });
                    f.attr({
                        opacity: d.alpha
                    });
                    b += e + 6;
                    this.freeLabelsSet.push(f)
                }
            }
        }
    },
    write: function (a) {
        if (a = "object" != typeof a ? document.getElementById(a) : a) {
            for (; a.firstChild;) a.removeChild(a.firstChild);
            this.div = a;
            a.style.overflow = "hidden";
            a.style.textAlign = "left";
            var b = this.chartDiv,
                c = this.legendDiv,
                d = this.legend,
                f = c.style,
                e = b.style;
            this.measure();
            var g, h = document.createElement("div");
            g = h.style;
            g.position = "relative";
            this.containerDiv = h;
            h.className = this.classNamePrefix + "-main-div";
            b.className = this.classNamePrefix + "-chart-div";
            a.appendChild(h);
            var k = this.exportConfig;
            k && AmCharts.AmExport && !this.AmExport && (this.AmExport = new AmCharts.AmExport(this, k));
            this.amExport && AmCharts.AmExport && (this.AmExport = AmCharts.extend(this.amExport, new AmCharts.AmExport(this), !0));
            this.AmExport && this.AmExport.init && this.AmExport.init();
            if (d) if (d = this.addLegend(d, d.divId), d.enabled) switch (d.position) {
                case "bottom":
                    h.appendChild(b);
                    h.appendChild(c);
                    break;
                case "top":
                    h.appendChild(c);
                    h.appendChild(b);
                    break;
                case "absolute":
                    g.width = a.style.width;
                    g.height = a.style.height;
                    f.position = "absolute";
                    e.position = "absolute";
                    void 0 !== d.left && (f.left = d.left + "px");
                    void 0 !== d.right && (f.right = d.right + "px");
                    void 0 !== d.top && (f.top = d.top + "px");
                    void 0 !== d.bottom && (f.bottom = d.bottom + "px");
                    d.marginLeft = 0;
                    d.marginRight = 0;
                    h.appendChild(b);
                    h.appendChild(c);
                    break;
                case "right":
                    g.width = a.style.width;
                    g.height = a.style.height;
                    f.position = "relative";
                    e.position = "absolute";
                    h.appendChild(b);
                    h.appendChild(c);
                    break;
                case "left":
                    g.width = a.style.width;
                    g.height = a.style.height;
                    f.position = "absolute";
                    e.position = "relative";
                    h.appendChild(b);
                    h.appendChild(c);
                    break;
                case "outside":
                    h.appendChild(b)
            } else h.appendChild(b);
            else h.appendChild(b);
            this.listenersAdded || (this.addListeners(), this.listenersAdded = !0);
            this.initChart()
        }
    },
    createLabelsSet: function () {
        AmCharts.remove(this.labelsSet);
        this.labelsSet = this.container.set();
        this.freeLabelsSet.push(this.labelsSet)
    },
    initChart: function () {
        this.initHC || (AmCharts.callInitHandler(this), this.initHC = !0);
        this.renderFix();
        AmCharts.applyLang(this.language, this);
        var a = this.numberFormatter;
        a && (isNaN(a.precision) || (this.precision = a.precision), void 0 !== a.thousandsSeparator && (this.thousandsSeparator = a.thousandsSeparator), void 0 !== a.decimalSeparator && (this.decimalSeparator = a.decimalSeparator));
        (a = this.percentFormatter) && !isNaN(a.precision) && (this.percentPrecision = a.precision);
        this.nf = {
            precision: this.precision,
            thousandsSeparator: this.thousandsSeparator,
            decimalSeparator: this.decimalSeparator
        };
        this.pf = {
            precision: this.percentPrecision,
            thousandsSeparator: this.thousandsSeparator,
            decimalSeparator: this.decimalSeparator
        };
        this.divIsFixed = AmCharts.findIfFixed(this.chartDiv);
        this.previousHeight = this.divRealHeight;
        this.previousWidth = this.divRealWidth;
        this.destroy();
        this.startInterval();
        a = 0;
        document.attachEvent && !window.opera && (a = 1);
        this.dmouseX = this.dmouseY = 0;
        var b = document.getElementsByTagName("html")[0];
        b && window.getComputedStyle && (b = window.getComputedStyle(b, null)) && (this.dmouseY = AmCharts.removePx(b.getPropertyValue("margin-top")), this.dmouseX = AmCharts.removePx(b.getPropertyValue("margin-left")));
        this.mouseMode = a;
        (a = this.container) ? (a.container.innerHTML = "", a.width = this.realWidth, a.height = this.realHeight, a.addDefs(this), this.chartDiv.appendChild(a.container)) : a = new AmCharts.AmDraw(this.chartDiv, this.realWidth, this.realHeight, this);
        a.chart = this;
        AmCharts.VML || AmCharts.SVG ? (a.handDrawn = this.handDrawn, a.handDrawScatter = this.handDrawScatter, a.handDrawThickness = this.handDrawThickness, this.container = a, this.set && this.set.remove(), this.set = a.set(), this.gridSet && this.gridSet.remove(), this.gridSet = a.set(), this.cursorLineSet && this.cursorLineSet.remove(),
        this.cursorLineSet = a.set(), this.graphsBehindSet && this.graphsBehindSet.remove(), this.graphsBehindSet = a.set(), this.bulletBehindSet && this.bulletBehindSet.remove(), this.bulletBehindSet = a.set(), this.columnSet && this.columnSet.remove(), this.columnSet = a.set(), this.graphsSet && this.graphsSet.remove(), this.graphsSet = a.set(), this.trendLinesSet && this.trendLinesSet.remove(), this.trendLinesSet = a.set(), this.axesSet && this.axesSet.remove(), this.axesSet = a.set(), this.cursorSet && this.cursorSet.remove(), this.cursorSet = a.set(), this.scrollbarsSet && this.scrollbarsSet.remove(), this.scrollbarsSet = a.set(), this.bulletSet && this.bulletSet.remove(), this.bulletSet = a.set(), this.freeLabelsSet && this.freeLabelsSet.remove(), this.axesLabelsSet && this.axesLabelsSet.remove(), this.axesLabelsSet = a.set(), this.freeLabelsSet = a.set(), this.balloonsSet && this.balloonsSet.remove(), this.balloonsSet = a.set(), this.zoomButtonSet && this.zoomButtonSet.remove(), this.zoomButtonSet = a.set(), this.linkSet && this.linkSet.remove(), this.linkSet = a.set()) : this.fire("failed", {
            type: "failed",
            chart: this
        })
    },
    measure: function () {
        var a = this.div;
        if (a) {
            var b = this.chartDiv,
                c = a.offsetWidth,
                d = a.offsetHeight,
                f = this.container;
            a.clientHeight && (c = a.clientWidth, d = a.clientHeight);
            var e = AmCharts.removePx(AmCharts.getStyle(a, "padding-left")),
                g = AmCharts.removePx(AmCharts.getStyle(a, "padding-right")),
                h = AmCharts.removePx(AmCharts.getStyle(a, "padding-top")),
                k = AmCharts.removePx(AmCharts.getStyle(a, "padding-bottom"));
            isNaN(e) || (c -= e);
            isNaN(g) || (c -= g);
            isNaN(h) || (d -= h);
            isNaN(k) || (d -= k);
            e = a.style;
            a = e.width;
            e = e.height; - 1 != a.indexOf("px") && (c = AmCharts.removePx(a)); - 1 != e.indexOf("px") && (d = AmCharts.removePx(e));
            a = AmCharts.toCoordinate(this.width, c);
            e = AmCharts.toCoordinate(this.height, d);
            this.balloon = AmCharts.processObject(this.balloon, AmCharts.AmBalloon, this.theme);
            this.balloon.chart = this;
            (a != this.previousWidth || e != this.previousHeight) && 0 < a && 0 < e && (b.style.width = a + "px", b.style.height = e + "px", f && f.setSize(a, e));
            this.balloon.setBounds(2, 2, a - 2, e);
            this.realWidth = a;
            this.realHeight = e;
            this.divRealWidth = c;
            this.divRealHeight = d
        }
    },
    destroy: function () {
        this.chartDiv.innerHTML = "";
        this.clearTimeOuts();
        this.interval && clearInterval(this.interval);
        this.interval = NaN;
        this.legend && this.legend.destroy()
    },
    clearTimeOuts: function () {
        var a = this.timeOuts;
        if (a) {
            var b;
            for (b = 0; b < a.length; b++) clearTimeout(a[b])
        }
        this.timeOuts = []
    },
    clear: function (a) {
        AmCharts.callMethod("clear", [this.chartScrollbar, this.scrollbarV, this.scrollbarH, this.chartCursor]);
        this.chartCursor = this.scrollbarH = this.scrollbarV = this.chartScrollbar = null;
        this.clearTimeOuts();
        this.interval && clearInterval(this.interval);
        this.container && (this.container.remove(this.chartDiv), this.container.remove(this.legendDiv));
        a || AmCharts.removeChart(this);
        for (a = this.div; a.firstChild;) a.removeChild(a.firstChild);
        this.legend && this.legend.destroy()
    },
    setMouseCursor: function (a) {
        "auto" == a && AmCharts.isNN && (a = "default");
        this.chartDiv.style.cursor = a;
        this.legendDiv.style.cursor = a
    },
    redrawLabels: function () {
        this.labels = [];
        var a = this.allLabels;
        this.createLabelsSet();
        var b;
        for (b = 0; b < a.length; b++) this.drawLabel(a[b])
    },
    drawLabel: function (a) {
        if (this.container && !1 !== a.enabled) {
            a = AmCharts.processObject(a, AmCharts.Label, this.theme);
            var b = a.y,
                c = a.text,
                d = a.align,
                f = a.size,
                e = a.color,
                g = a.rotation,
                h = a.alpha,
                k = a.bold,
                l = AmCharts.toCoordinate(a.x, this.realWidth),
                b = AmCharts.toCoordinate(b, this.realHeight);
            l || (l = 0);
            b || (b = 0);
            void 0 === e && (e = this.color);
            isNaN(f) && (f = this.fontSize);
            d || (d = "start");
            "left" == d && (d = "start");
            "right" == d && (d = "end");
            "center" == d && (d = "middle", g ? b = this.realHeight - b + b / 2 : l = this.realWidth / 2 - l);
            void 0 === h && (h = 1);
            void 0 === g && (g = 0);
            b += f / 2;
            c = AmCharts.text(this.container, c, e, this.fontFamily, f, d, k, h);
            c.translate(l, b);
            AmCharts.setCN(this, c, "label");
            a.id && AmCharts.setCN(this, c, "label-" + a.id);
            0 !== g && c.rotate(g);
            a.url ? (c.setAttr("cursor", "pointer"), c.click(function () {
                AmCharts.getURL(a.url)
            })) : c.node.style.pointerEvents = "none";
            this.labelsSet.push(c);
            this.labels.push(c)
        }
    },
    addLabel: function (a, b, c, d, f, e, g, h, k, l) {
        a = {
            x: a,
            y: b,
            text: c,
            align: d,
            size: f,
            color: e,
            alpha: h,
            rotation: g,
            bold: k,
            url: l,
            enabled: !0
        };
        this.container && this.drawLabel(a);
        this.allLabels.push(a)
    },
    clearLabels: function () {
        var a = this.labels,
            b;
        for (b = a.length - 1; 0 <= b; b--) a[b].remove();
        this.labels = [];
        this.allLabels = []
    },
    updateHeight: function () {
        var a = this.divRealHeight,
            b = this.legend;
        if (b) {
            var c = this.legendDiv.offsetHeight,
                b = b.position;
            if ("top" == b || "bottom" == b) {
                a -= c;
                if (0 > a || isNaN(a)) a = 0;
                this.chartDiv.style.height = a + "px"
            }
        }
        return a
    },
    updateWidth: function () {
        var a = this.divRealWidth,
            b = this.divRealHeight,
            c = this.legend;
        if (c) {
            var d = this.legendDiv,
                f = d.offsetWidth;
            isNaN(c.width) || (f = c.width);
            var e = d.offsetHeight,
                d = d.style,
                g = this.chartDiv.style,
                c = c.position;
            if ("right" == c || "left" == c) {
                a -= f;
                if (0 > a || isNaN(a)) a = 0;
                g.width = a + "px";
                "left" == c ? (g.left = f + "px", d.left = "0px") : (g.left = "0px", d.left = a + "px");
                b > e && (d.top = (b - e) / 2 + "px")
            }
        }
        return a
    },
    getTitleHeight: function () {
        var a = 0,
            b = this.titles,
            c = !0;
        if (0 < b.length) {
            var a = 15,
                d;
            for (d = 0; d < b.length; d++) {
                var f = b[d];
                !1 !== f.enabled && (c = !1, f = f.size, isNaN(f) && (f = this.fontSize + 2), a += f + 6)
            }
            c && (a = 0)
        }
        return a
    },
    addTitle: function (a, b, c, d, f) {
        isNaN(b) && (b = this.fontSize + 2);
        a = {
            text: a,
            size: b,
            color: c,
            alpha: d,
            bold: f,
            enabled: !0
        };
        this.titles.push(a);
        return a
    },
    handleWheel: function (a) {
        var b = 0;
        a || (a = window.event);
        a.wheelDelta ? b = a.wheelDelta / 120 : a.detail && (b = -a.detail / 3);
        b && this.handleWheelReal(b, a.shiftKey);
        a.preventDefault && a.preventDefault()
    },
    handleWheelReal: function (a) {},
    addListeners: function () {
        var a = this,
            b = a.chartDiv;
        document.addEventListener ? (a.panEventsEnabled && (b.style.msTouchAction = "none"), "ontouchstart" in document.documentElement && (b.addEventListener("touchstart", function (b) {
            a.handleTouchMove.call(a,
            b);
            a.handleTouchStart.call(a, b)
        }, !0), b.addEventListener("touchmove", function (b) {
            a.handleTouchMove.call(a, b)
        }, !0), b.addEventListener("touchend", function (b) {
            a.handleTouchEnd.call(a, b)
        }, !0)), b.addEventListener("mousedown", function (b) {
            a.mouseIsOver = !0;
            a.handleMouseMove.call(a, b);
            a.handleMouseDown.call(a, b)
        }, !0), b.addEventListener("mouseover", function (b) {
            a.handleMouseOver.call(a, b)
        }, !0), b.addEventListener("mouseout", function (b) {
            a.handleMouseOut.call(a, b)
        }, !0)) : (b.attachEvent("onmousedown", function (b) {
            a.handleMouseDown.call(a,
            b)
        }), b.attachEvent("onmouseover", function (b) {
            a.handleMouseOver.call(a, b)
        }), b.attachEvent("onmouseout", function (b) {
            a.handleMouseOut.call(a, b)
        }))
    },
    dispDUpd: function () {
        if (!this.skipEvents) {
            var a;
            this.dispatchDataUpdated && (this.dispatchDataUpdated = !1, a = "dataUpdated", this.fire(a, {
                type: a,
                chart: this
            }));
            this.chartCreated || (a = "init", this.fire(a, {
                type: a,
                chart: this
            }));
            this.chartRendered || (a = "rendered", this.fire(a, {
                type: a,
                chart: this
            }), this.chartRendered = !0);
            a = "drawn";
            this.fire(a, {
                type: a,
                chart: this
            })
        }
        this.skipEvents = !1
    },
    validateSize: function () {
        var a = this;
        a.measure();
        var b = a.legend;
        if (a.realWidth != a.previousWidth || a.realHeight != a.previousHeight) {
            if (0 < a.realWidth && 0 < a.realHeight) {
                a.sizeChanged = !0;
                if (b) {
                    clearTimeout(a.legendInitTO);
                    var c = setTimeout(function () {
                        b.invalidateSize()
                    }, 100);
                    a.timeOuts.push(c);
                    a.legendInitTO = c
                }
                "xy" != a.type ? a.marginsUpdated = !1 : (a.marginsUpdated = !0, a.selfZoom = !0);
                clearTimeout(a.initTO);
                c = setTimeout(function () {
                    a.initChart()
                }, 150);
                a.timeOuts.push(c);
                a.initTO = c
            }
            a.fire("resized", {
                type: "resized",
                chart: a
            })
        }
        a.renderFix();
        b && b.renderFix()
    },
    invalidateSize: function () {
        this.previousHeight = this.previousWidth = NaN;
        this.invalidateSizeReal()
    },
    invalidateSizeReal: function () {
        var a = this;
        a.marginsUpdated = !1;
        clearTimeout(a.validateTO);
        var b = setTimeout(function () {
            a.validateSize()
        }, 5);
        a.timeOuts.push(b);
        a.validateTO = b
    },
    validateData: function (a) {
        this.chartCreated && (this.dataChanged = !0, this.marginsUpdated = "xy" != this.type ? !1 : !0, this.initChart(a))
    },
    validateNow: function (a, b) {
        this.initTO && clearTimeout(this.initTO);
        a && (this.dataChanged = !0);
        this.skipEvents = b;
        this.chartRendered = !1;
        this.write(this.div)
    },
    showItem: function (a) {
        a.hidden = !1;
        this.initChart()
    },
    hideItem: function (a) {
        a.hidden = !0;
        this.initChart()
    },
    hideBalloon: function () {
        var a = this;
        clearInterval(a.hoverInt);
        clearTimeout(a.balloonTO);
        a.hoverInt = setTimeout(function () {
            a.hideBalloonReal.call(a)
        }, a.hideBalloonTime)
    },
    cleanChart: function () {},
    hideBalloonReal: function () {
        var a = this.balloon;
        a && a.hide()
    },
    showBalloon: function (a, b, c, d, f) {
        var e = this;
        clearTimeout(e.balloonTO);
        clearInterval(e.hoverInt);
        e.balloonTO = setTimeout(function () {
            e.showBalloonReal.call(e, a, b, c, d, f)
        }, 1)
    },
    showBalloonReal: function (a, b, c, d, f) {
        this.handleMouseMove();
        var e = this.balloon;
        e.enabled && (e.followCursor(!1), e.changeColor(b), !c || e.fixedPosition ? (e.setPosition(d, f), e.followCursor(!1)) : e.followCursor(!0), a && e.showBalloon(a))
    },
    handleTouchMove: function (a) {
        this.hideBalloon();
        var b = this.chartDiv;
        a.touches && (a = a.touches.item(0), this.mouseX = a.pageX - AmCharts.findPosX(b), this.mouseY = a.pageY - AmCharts.findPosY(b))
    },
    handleMouseOver: function (a) {
        AmCharts.resetMouseOver();
        this.mouseIsOver = !0
    },
    handleMouseOut: function (a) {
        AmCharts.resetMouseOver();
        this.mouseIsOver = !1
    },
    handleMouseMove: function (a) {
        if (this.mouseIsOver) {
            var b = this.chartDiv;
            a || (a = window.event);
            var c, d;
            if (a) {
                this.posX = AmCharts.findPosX(b);
                this.posY = AmCharts.findPosY(b);
                switch (this.mouseMode) {
                    case 1:
                        c = a.clientX - this.posX;
                        d = a.clientY - this.posY;
                        if (!this.divIsFixed) {
                            var b = document.body,
                                f, e;
                            b && (f = b.scrollLeft, y1 = b.scrollTop);
                            if (b = document.documentElement) e = b.scrollLeft,
                            y2 = b.scrollTop;
                            f = Math.max(f, e);
                            e = Math.max(y1, y2);
                            c += f;
                            d += e
                        }
                        break;
                    case 0:
                        this.divIsFixed ? (c = a.clientX - this.posX, d = a.clientY - this.posY) : (c = a.pageX - this.posX, d = a.pageY - this.posY)
                }
                a.touches && (a = a.touches.item(0), c = a.pageX - this.posX, d = a.pageY - this.posY);
                this.mouseX = c - this.dmouseX;
                this.mouseY = d - this.dmouseY
            }
        }
    },
    handleTouchStart: function (a) {
        this.handleMouseDown(a)
    },
    handleTouchEnd: function (a) {
        AmCharts.resetMouseOver();
        this.handleReleaseOutside(a)
    },
    handleReleaseOutside: function (a) {},
    handleMouseDown: function (a) {
        AmCharts.resetMouseOver();
        this.mouseIsOver = !0;
        a && a.preventDefault && (this.panEventsEnabled ? a.preventDefault() : a.touches || a.preventDefault())
    },
    addLegend: function (a, b) {
        a = AmCharts.processObject(a, AmCharts.AmLegend, this.theme);
        a.divId = b;
        var c;
        c = "object" != typeof b && b ? document.getElementById(b) : b;
        this.legend = a;
        a.chart = this;
        c ? (a.div = c, a.position = "outside", a.autoMargins = !1) : a.div = this.legendDiv;
        c = this.handleLegendEvent;
        this.listenTo(a, "showItem", c);
        this.listenTo(a, "hideItem", c);
        this.listenTo(a, "clickMarker", c);
        this.listenTo(a, "rollOverItem",
        c);
        this.listenTo(a, "rollOutItem", c);
        this.listenTo(a, "rollOverMarker", c);
        this.listenTo(a, "rollOutMarker", c);
        this.listenTo(a, "clickLabel", c);
        return a
    },
    removeLegend: function () {
        this.legend = void 0;
        this.legendDiv.innerHTML = ""
    },
    handleResize: function () {
        (AmCharts.isPercents(this.width) || AmCharts.isPercents(this.height)) && this.invalidateSizeReal();
        this.renderFix()
    },
    renderFix: function () {
        if (!AmCharts.VML) {
            var a = this.container;
            a && a.renderFix()
        }
    },
    getSVG: function () {
        if (AmCharts.hasSVG) return this.container
    },
    animate: function (a,
    b, c, d, f, e, g) {
        a["an_" + b] && AmCharts.removeFromArray(this.animations, a["an_" + b]);
        c = {
            obj: a,
            frame: 0,
            attribute: b,
            from: c,
            to: d,
            time: f,
            effect: e,
            suffix: g
        };
        a["an_" + b] = c;
        this.animations.push(c);
        return c
    },
    setLegendData: function (a) {
        var b = this.legend;
        b && b.setData(a)
    },
    startInterval: function () {
        var a = this;
        clearInterval(a.interval);
        a.interval = setInterval(function () {
            a.updateAnimations.call(a)
        }, AmCharts.updateRate)
    },
    stopAnim: function (a) {
        AmCharts.removeFromArray(this.animations, a)
    },
    updateAnimations: function () {
        var a;
        this.container && this.container.update();
        for (a = this.animations.length - 1; 0 <= a; a--) {
            var b = this.animations[a],
                c = 1E3 * b.time / AmCharts.updateRate,
                d = b.frame + 1,
                f = b.obj,
                e = b.attribute;
            if (d <= c) {
                b.frame++;
                var g = Number(b.from),
                    h = Number(b.to) - g,
                    c = AmCharts[b.effect](0, d, g, h, c);
                0 === h ? (this.animations.splice(a, 1), f.node.style[e] = Number(b.to) + b.suffix) : f.node.style[e] = c + b.suffix
            } else f.node.style[e] = Number(b.to) + b.suffix, this.animations.splice(a, 1)
        }
    },
    inIframe: function () {
        try {
            return window.self !== window.top
        } catch (a) {
            return !0
        }
    },
    brr: function () {
        var a = window.location.hostname.split("."),
            b;
        2 <= a.length && (b = a[a.length - 2] + "." + a[a.length - 1]);
        this.amLink && (a = this.amLink.parentNode) && a.removeChild(this.amLink);
        a = this.creditsPosition;
        if ("amcharts.com" != b || !0 === this.inIframe()) {
            var c = b = 0,
                d = this.realWidth,
                f = this.realHeight;
            if ("serial" == this.type || "xy" == this.type) b = this.marginLeftReal, c = this.marginTopReal, d = b + this.plotAreaWidth, f = c + this.plotAreaHeight;
            var e = "http://www.amcharts.com/javascript-charts/",
                g = "JavaScript charts",
                h = "JS chart by amCharts";
            "ammap" == this.product && (e = "http://www.ammap.com/javascript-maps/", g = "Interactive JavaScript maps", h = "JS map by amCharts");
            var k = document.createElement("a"),
                h = document.createTextNode(h);
            k.setAttribute("href", e);
            k.setAttribute("title", g);
            k.appendChild(h);
            this.chartDiv.appendChild(k);
            this.amLink = k;
            e = k.style;
            e.position = "absolute";
            e.textDecoration = "none";
            e.color = this.color;
            e.fontFamily = this.fontFamily;
            e.fontSize = this.fontSize + "px";
            e.opacity = .7;
            e.display = "block";
            var g = k.offsetWidth,
                k = k.offsetHeight,
                h = 5 + b,
                l = c + 5;
            "bottom-left" == a && (h = 5 + b, l = f - k - 3);
            "bottom-right" == a && (h = d - g - 5, l = f - k - 3);
            "top-right" == a && (h = d - g - 5, l = c + 5);
            e.left = h + "px";
            e.top = l + "px"
        }
    }
});
AmCharts.Slice = AmCharts.Class({
    construct: function () {}
});
AmCharts.SerialDataItem = AmCharts.Class({
    construct: function () {}
});
AmCharts.GraphDataItem = AmCharts.Class({
    construct: function () {}
});
AmCharts.Guide = AmCharts.Class({
    construct: function (a) {
        this.cname = "Guide";
        AmCharts.applyTheme(this, a, this.cname)
    }
});
AmCharts.Title = AmCharts.Class({
    construct: function (a) {
        this.cname = "Title";
        AmCharts.applyTheme(this, a, this.cname)
    }
});
AmCharts.Label = AmCharts.Class({
    construct: function (a) {
        this.cname = "Label";
        AmCharts.applyTheme(this, a, this.cname)
    }
});
AmCharts.AmBalloon = AmCharts.Class({
    construct: function (a) {
        this.cname = "AmBalloon";
        this.enabled = !0;
        this.fillColor = "#FFFFFF";
        this.fillAlpha = .8;
        this.borderThickness = 2;
        this.borderColor = "#FFFFFF";
        this.borderAlpha = 1;
        this.cornerRadius = 0;
        this.maxWidth = 220;
        this.horizontalPadding = 8;
        this.verticalPadding = 4;
        this.pointerWidth = 6;
        this.pointerOrientation = "V";
        this.color = "#000000";
        this.adjustBorderColor = !0;
        this.show = this.follow = this.showBullet = !1;
        this.bulletSize = 3;
        this.shadowAlpha = .4;
        this.shadowColor = "#000000";
        this.fadeOutDuration = this.animationDuration = .3;
        this.fixedPosition = !1;
        this.offsetY = 6;
        this.offsetX = 1;
        this.textAlign = "center";
        AmCharts.isModern || (this.offsetY *= 1.5);
        AmCharts.applyTheme(this, a, this.cname)
    },
    draw: function () {
        var a = this.pointToX,
            b = this.pointToY;
        this.deltaSignX = this.deltaSignY = 1;
        var c = this.chart;
        AmCharts.VML && (this.fadeOutDuration = 0);
        this.xAnim && c.stopAnim(this.xAnim);
        this.yAnim && c.stopAnim(this.yAnim);
        if (!isNaN(a)) {
            var d = this.follow,
                f = c.container,
                e = this.set;
            AmCharts.remove(e);
            this.removeDiv();
            e = f.set();
            e.node.style.pointerEvents =
                "none";
            this.set = e;
            c.balloonsSet.push(e);
            if (this.show) {
                var g = this.l,
                    h = this.t,
                    k = this.r,
                    l = this.b,
                    m = this.balloonColor,
                    n = this.fillColor,
                    t = this.borderColor,
                    p = n;
                void 0 != m && (this.adjustBorderColor ? p = t = m : n = m);
                var z = this.horizontalPadding,
                    y = this.verticalPadding,
                    v = this.pointerWidth,
                    B = this.pointerOrientation,
                    A = this.cornerRadius,
                    w = c.fontFamily,
                    r = this.fontSize;
                void 0 == r && (r = c.fontSize);
                var m = document.createElement("div"),
                    u = c.classNamePrefix;
                m.className = u + "-balloon-div";
                this.className && (m.className = m.className +
                    " " + u + "-balloon-div-" + this.className);
                u = m.style;
                u.pointerEvents = "none";
                u.position = "absolute";
                var q = this.minWidth,
                    x = "";
                isNaN(q) || (x = "min-width:" + (q - 2 * z) + "px; ");
                m.innerHTML = '<div style="text-align:' + this.textAlign + "; " + x + "max-width:" + this.maxWidth + "px; font-size:" + r + "px; color:" + this.color + "; font-family:" + w + '">' + this.text + "</div>";
                c.chartDiv.appendChild(m);
                this.textDiv = m;
                r = m.offsetWidth;
                w = m.offsetHeight;
                m.clientHeight && (r = m.clientWidth, w = m.clientHeight);
                w += 2 * y;
                x = r + 2 * z;
                !isNaN(q) && x < q && (x = q);
                window.opera && (w += 2);
                var C = !1,
                    r = this.offsetY;
                c.handDrawn && (r += c.handDrawScatter + 2);
                "H" != B ? (q = a - x / 2, b < h + w + 10 && "down" != B ? (C = !0, d && (b += r), r = b + v, this.deltaSignY = -1) : (d && (b -= r), r = b - w - v, this.deltaSignY = 1)) : (2 * v > w && (v = w / 2), r = b - w / 2, a < g + (k - g) / 2 ? (q = a + v, this.deltaSignX = -1) : (q = a - x - v, this.deltaSignX = 1));
                r + w >= l && (r = l - w);
                r < h && (r = h);
                q < g && (q = g);
                q + x > k && (q = k - x);
                var h = r + y,
                    l = q + z,
                    y = this.shadowAlpha,
                    F = this.shadowColor,
                    z = this.borderThickness,
                    D = this.bulletSize,
                    E;
                0 < A || 0 === v ? (0 < y && (a = AmCharts.rect(f, x, w, n, 0, z + 1, F, y, this.cornerRadius), AmCharts.isModern ? a.translate(1, 1) : a.translate(4, 4), e.push(a)), n = AmCharts.rect(f, x, w, n, this.fillAlpha, z, t, this.borderAlpha, this.cornerRadius), this.showBullet && (E = AmCharts.circle(f, D, p, this.fillAlpha), e.push(E))) : (p = [], A = [], "H" != B ? (g = a - q, g > x - v && (g = x - v), g < v && (g = v), p = [0, g - v, a - q, g + v, x, x, 0, 0], A = C ? [0, 0, b - r, 0, 0, w, w, 0] : [w, w, b - r, w, w, 0, 0, w]) : (p = b - r, p > w - v && (p = w - v), p < v && (p = v), A = [0, p - v, b - r, p + v, w, w, 0, 0], p = a < g + (k - g) / 2 ? [0, 0, q < a ? 0 : a - q, 0, 0, x, x, 0] : [x, x, q + x > a ? x : a - q, x, x, 0, 0, x]), 0 < y && (a = AmCharts.polygon(f, p, A, n, 0, z, F, y), a.translate(1, 1),
                e.push(a)), n = AmCharts.polygon(f, p, A, n, this.fillAlpha, z, t, this.borderAlpha));
                this.bg = n;
                e.push(n);
                n.toFront();
                AmCharts.setCN(c, n, "balloon-bg");
                this.className && AmCharts.setCN(c, n, "balloon-bg-" + this.className);
                f = 1 * this.deltaSignX;
                u.left = l + "px";
                u.top = h + "px";
                e.translate(q - f, r);
                n = n.getBBox();
                this.bottom = r + w + 1;
                this.yPos = n.y + r;
                E && E.translate(this.pointToX - q + f, b - r);
                b = this.animationDuration;
                0 < this.animationDuration && !d && !isNaN(this.prevX) && (e.translate(this.prevX, this.prevY), e.animate({
                    translate: q - f + "," + r
                },
                b, "easeOutSine"), m && (u.left = this.prevTX + "px", u.top = this.prevTY + "px", this.xAnim = c.animate({
                    node: m
                }, "left", this.prevTX, l, b, "easeOutSine", "px"), this.yAnim = c.animate({
                    node: m
                }, "top", this.prevTY, h, b, "easeOutSine", "px")));
                this.prevX = q - f;
                this.prevY = r;
                this.prevTX = l;
                this.prevTY = h
            }
        }
    },
    followMouse: function () {
        if (this.follow && this.show) {
            var a = this.chart.mouseX - this.offsetX * this.deltaSignX,
                b = this.chart.mouseY;
            this.pointToX = a;
            this.pointToY = b;
            if (a != this.previousX || b != this.previousY) if (this.previousX = a, this.previousY = b, 0 === this.cornerRadius) this.draw();
            else {
                var c = this.set;
                if (c) {
                    var d = c.getBBox(),
                        a = a - d.width / 2,
                        f = b - d.height - 10;
                    a < this.l && (a = this.l);
                    a > this.r - d.width && (a = this.r - d.width);
                    f < this.t && (f = b + 10);
                    c.translate(a, f);
                    b = this.textDiv.style;
                    b.left = a + this.horizontalPadding + "px";
                    b.top = f + this.verticalPadding + "px"
                }
            }
        }
    },
    changeColor: function (a) {
        this.balloonColor = a
    },
    setBounds: function (a, b, c, d) {
        this.l = a;
        this.t = b;
        this.r = c;
        this.b = d;
        this.destroyTO && clearTimeout(this.destroyTO)
    },
    showBalloon: function (a) {
        this.text = a;
        this.show = !0;
        this.destroyTO && clearTimeout(this.destroyTO);
        a = this.chart;
        this.fadeAnim1 && a.stopAnim(this.fadeAnim1);
        this.fadeAnim2 && a.stopAnim(this.fadeAnim2);
        this.draw()
    },
    hide: function () {
        var a = this,
            b = a.fadeOutDuration,
            c = a.chart;
        if (0 < b) {
            a.destroyTO = setTimeout(function () {
                a.destroy.call(a)
            }, 1E3 * b);
            a.follow = !1;
            a.show = !1;
            var d = a.set;
            d && (d.setAttr("opacity", a.fillAlpha), a.fadeAnim1 = d.animate({
                opacity: 0
            }, b, "easeInSine"));
            a.textDiv && (a.fadeAnim2 = c.animate({
                node: a.textDiv
            }, "opacity", 1, 0, b, "easeInSine", ""))
        } else a.show = !1, a.follow = !1, a.destroy()
    },
    setPosition: function (a, b, c) {
        this.pointToX = a;
        this.pointToY = b;
        c && (a == this.previousX && b == this.previousY || this.draw());
        this.previousX = a;
        this.previousY = b
    },
    followCursor: function (a) {
        var b = this;
        (b.follow = a) ? (b.pShowBullet = b.showBullet, b.showBullet = !1) : void 0 !== b.pShowBullet && (b.showBullet = b.pShowBullet);
        clearInterval(b.interval);
        var c = b.chart.mouseX,
            d = b.chart.mouseY;
        !isNaN(c) && a && (b.pointToX = c - b.offsetX * b.deltaSignX, b.pointToY = d, b.followMouse(), b.interval = setInterval(function () {
            b.followMouse.call(b)
        },
        40))
    },
    removeDiv: function () {
        if (this.textDiv) {
            var a = this.textDiv.parentNode;
            a && a.removeChild(this.textDiv)
        }
    },
    destroy: function () {
        clearInterval(this.interval);
        AmCharts.remove(this.set);
        this.removeDiv();
        this.set = null
    }
});
AmCharts.circle = function (a, b, c, d, f, e, g, h, k) {
    if (void 0 == f || 0 === f) f = .01;
    void 0 === e && (e = "#000000");
    void 0 === g && (g = 0);
    d = {
        fill: c,
        stroke: e,
        "fill-opacity": d,
        "stroke-width": f,
        "stroke-opacity": g
    };
    a = isNaN(k) ? a.circle(0, 0, b).attr(d) : a.ellipse(0, 0, b, k).attr(d);
    h && a.gradient("radialGradient", [c, AmCharts.adjustLuminosity(c, -.6)]);
    return a
};
AmCharts.text = function (a, b, c, d, f, e, g, h) {
    e || (e = "middle");
    "right" == e && (e = "end");
    "left" == e && (e = "start");
    isNaN(h) && (h = 1);
    void 0 !== b && (b = String(b), AmCharts.isIE && !AmCharts.isModern && (b = b.replace("&amp;", "&"), b = b.replace("&", "&amp;")));
    c = {
        fill: c,
        "font-family": d,
        "font-size": f,
        opacity: h
    };
    !0 === g && (c["font-weight"] = "bold");
    c["text-anchor"] = e;
    return a.text(b, c)
};
AmCharts.polygon = function (a, b, c, d, f, e, g, h, k, l, m) {
    isNaN(e) && (e = .01);
    isNaN(h) && (h = f);
    var n = d,
        t = !1;
    "object" == typeof n && 1 < n.length && (t = !0, n = n[0]);
    void 0 === g && (g = n);
    f = {
        fill: n,
        stroke: g,
        "fill-opacity": f,
        "stroke-width": e,
        "stroke-opacity": h
    };
    void 0 !== m && 0 < m && (f["stroke-dasharray"] = m);
    m = AmCharts.dx;
    e = AmCharts.dy;
    a.handDrawn && (c = AmCharts.makeHD(b, c, a.handDrawScatter), b = c[0], c = c[1]);
    g = Math.round;
    l && (g = AmCharts.doNothing);
    l = "M" + (g(b[0]) + m) + "," + (g(c[0]) + e);
    for (h = 1; h < b.length; h++) l += " L" + (g(b[h]) + m) + "," + (g(c[h]) + e);
    a = a.path(l + " Z").attr(f);
    t && a.gradient("linearGradient", d, k);
    return a
};
AmCharts.rect = function (a, b, c, d, f, e, g, h, k, l, m) {
    isNaN(e) && (e = 0);
    void 0 === k && (k = 0);
    void 0 === l && (l = 270);
    isNaN(f) && (f = 0);
    var n = d,
        t = !1;
    "object" == typeof n && (n = n[0], t = !0);
    void 0 === g && (g = n);
    void 0 === h && (h = f);
    b = Math.round(b);
    c = Math.round(c);
    var p = 0,
        z = 0;
    0 > b && (b = Math.abs(b), p = -b);
    0 > c && (c = Math.abs(c), z = -c);
    p += AmCharts.dx;
    z += AmCharts.dy;
    f = {
        fill: n,
        stroke: g,
        "fill-opacity": f,
        "stroke-opacity": h
    };
    void 0 !== m && 0 < m && (f["stroke-dasharray"] = m);
    a = a.rect(p, z, b, c, k, e).attr(f);
    t && a.gradient("linearGradient", d, l);
    return a
};
AmCharts.bullet = function (a, b, c, d, f, e, g, h, k, l, m) {
    var n;
    "circle" == b && (b = "round");
    switch (b) {
        case "round":
            n = AmCharts.circle(a, c / 2, d, f, e, g, h);
            break;
        case "square":
            n = AmCharts.polygon(a, [-c / 2, c / 2, c / 2, -c / 2], [c / 2, c / 2, -c / 2, -c / 2], d, f, e, g, h, l - 180);
            break;
        case "rectangle":
            n = AmCharts.polygon(a, [-c, c, c, -c], [c / 2, c / 2, -c / 2, -c / 2], d, f, e, g, h, l - 180);
            break;
        case "diamond":
            n = AmCharts.polygon(a, [-c / 2, 0, c / 2, 0], [0, -c / 2, 0, c / 2], d, f, e, g, h);
            break;
        case "triangleUp":
            n = AmCharts.triangle(a, c, 0, d, f, e, g, h);
            break;
        case "triangleDown":
            n = AmCharts.triangle(a,
            c, 180, d, f, e, g, h);
            break;
        case "triangleLeft":
            n = AmCharts.triangle(a, c, 270, d, f, e, g, h);
            break;
        case "triangleRight":
            n = AmCharts.triangle(a, c, 90, d, f, e, g, h);
            break;
        case "bubble":
            n = AmCharts.circle(a, c / 2, d, f, e, g, h, !0);
            break;
        case "line":
            n = AmCharts.line(a, [-c / 2, c / 2], [0, 0], d, f, e, g, h);
            break;
        case "yError":
            n = a.set();
            n.push(AmCharts.line(a, [0, 0], [-c / 2, c / 2], d, f, e));
            n.push(AmCharts.line(a, [-k, k], [-c / 2, -c / 2], d, f, e));
            n.push(AmCharts.line(a, [-k, k], [c / 2, c / 2], d, f, e));
            break;
        case "xError":
            n = a.set(), n.push(AmCharts.line(a, [-c / 2, c / 2], [0, 0], d, f, e)), n.push(AmCharts.line(a, [-c / 2, -c / 2], [-k, k], d, f, e)), n.push(AmCharts.line(a, [c / 2, c / 2], [-k, k], d, f, e))
    }
    n && n.pattern(m);
    return n
};
AmCharts.triangle = function (a, b, c, d, f, e, g, h) {
    if (void 0 === e || 0 === e) e = 1;
    void 0 === g && (g = "#000");
    void 0 === h && (h = 0);
    d = {
        fill: d,
        stroke: g,
        "fill-opacity": f,
        "stroke-width": e,
        "stroke-opacity": h
    };
    b /= 2;
    var k;
    0 === c && (k = " M" + -b + "," + b + " L0," + -b + " L" + b + "," + b + " Z");
    180 == c && (k = " M" + -b + "," + -b + " L0," + b + " L" + b + "," + -b + " Z");
    90 == c && (k = " M" + -b + "," + -b + " L" + b + ",0 L" + -b + "," + b + " Z");
    270 == c && (k = " M" + -b + ",0 L" + b + "," + b + " L" + b + "," + -b + " Z");
    return a.path(k).attr(d)
};
AmCharts.line = function (a, b, c, d, f, e, g, h, k, l, m) {
    if (a.handDrawn && !m) return AmCharts.handDrawnLine(a, b, c, d, f, e, g, h, k, l, m);
    e = {
        fill: "none",
        "stroke-width": e
    };
    void 0 !== g && 0 < g && (e["stroke-dasharray"] = g);
    isNaN(f) || (e["stroke-opacity"] = f);
    d && (e.stroke = d);
    d = Math.round;
    l && (d = AmCharts.doNothing);
    l = AmCharts.dx;
    f = AmCharts.dy;
    g = "M" + (d(b[0]) + l) + "," + (d(c[0]) + f);
    for (h = 1; h < b.length; h++) g += " L" + (d(b[h]) + l) + "," + (d(c[h]) + f);
    if (AmCharts.VML) return a.path(g, void 0, !0).attr(e);
    k && (g += " M0,0 L0,0");
    return a.path(g).attr(e)
};
AmCharts.makeHD = function (a, b, c) {
    for (var d = [], f = [], e = 1; e < a.length; e++) for (var g = Number(a[e - 1]), h = Number(b[e - 1]), k = Number(a[e]), l = Number(b[e]), m = Math.sqrt(Math.pow(k - g, 2) + Math.pow(l - h, 2)), m = Math.round(m / 50) + 1, k = (k - g) / m, l = (l - h) / m, n = 0; n <= m; n++) {
        var t = g + n * k + Math.random() * c,
            p = h + n * l + Math.random() * c;
        d.push(t);
        f.push(p)
    }
    return [d, f]
};
AmCharts.handDrawnLine = function (a, b, c, d, f, e, g, h, k, l, m) {
    var n = a.set();
    for (m = 1; m < b.length; m++) for (var t = [b[m - 1], b[m]], p = [c[m - 1], c[m]], p = AmCharts.makeHD(t, p, a.handDrawScatter), t = p[0], p = p[1], z = 1; z < t.length; z++) n.push(AmCharts.line(a, [t[z - 1], t[z]], [p[z - 1], p[z]], d, f, e + Math.random() * a.handDrawThickness - a.handDrawThickness / 2, g, h, k, l, !0));
    return n
};
AmCharts.doNothing = function (a) {
    return a
};
AmCharts.wedge = function (a, b, c, d, f, e, g, h, k, l, m, n) {
    var t = Math.round;
    e = t(e);
    g = t(g);
    h = t(h);
    var p = t(g / e * h),
        z = AmCharts.VML,
        y = 359.5 + e / 100;
    359.94 < y && (y = 359.94);
    f >= y && (f = y);
    var v = 1 / 180 * Math.PI,
        y = b + Math.sin(d * v) * h,
        B = c - Math.cos(d * v) * p,
        A = b + Math.sin(d * v) * e,
        w = c - Math.cos(d * v) * g,
        r = b + Math.sin((d + f) * v) * e,
        u = c - Math.cos((d + f) * v) * g,
        q = b + Math.sin((d + f) * v) * h,
        v = c - Math.cos((d + f) * v) * p,
        x = {
            fill: AmCharts.adjustLuminosity(l.fill, -.2),
            "stroke-opacity": 0,
            "fill-opacity": l["fill-opacity"]
        }, C = 0;
    180 < Math.abs(f) && (C = 1);
    d = a.set();
    var F;
    z && (y = t(10 * y), A = t(10 * A), r = t(10 * r), q = t(10 * q), B = t(10 * B), w = t(10 * w), u = t(10 * u), v = t(10 * v), b = t(10 * b), k = t(10 * k), c = t(10 * c), e *= 10, g *= 10, h *= 10, p *= 10, 1 > Math.abs(f) && 1 >= Math.abs(r - A) && 1 >= Math.abs(u - w) && (F = !0));
    f = "";
    var D;
    n && (x["fill-opacity"] = 0, x["stroke-opacity"] = l["stroke-opacity"] / 2, x.stroke = l.stroke);
    0 < k && (D = " M" + y + "," + (B + k) + " L" + A + "," + (w + k), z ? (F || (D += " A" + (b - e) + "," + (k + c - g) + "," + (b + e) + "," + (k + c + g) + "," + A + "," + (w + k) + "," + r + "," + (u + k)), D += " L" + q + "," + (v + k), 0 < h && (F || (D += " B" + (b - h) + "," + (k + c - p) + "," + (b + h) + "," + (k + c + p) +
        "," + q + "," + (k + v) + "," + y + "," + (k + B)))) : (D += " A" + e + "," + g + ",0," + C + ",1," + r + "," + (u + k) + " L" + q + "," + (v + k), 0 < h && (D += " A" + h + "," + p + ",0," + C + ",0," + y + "," + (B + k))), D = a.path(D + " Z", void 0, void 0, "1000,1000").attr(x), d.push(D), D = a.path(" M" + y + "," + B + " L" + y + "," + (B + k) + " L" + A + "," + (w + k) + " L" + A + "," + w + " L" + y + "," + B + " Z", void 0, void 0, "1000,1000").attr(x), k = a.path(" M" + r + "," + u + " L" + r + "," + (u + k) + " L" + q + "," + (v + k) + " L" + q + "," + v + " L" + r + "," + u + " Z", void 0, void 0, "1000,1000").attr(x), d.push(D), d.push(k));
    z ? (F || (f = " A" + t(b - e) + "," + t(c - g) +
        "," + t(b + e) + "," + t(c + g) + "," + t(A) + "," + t(w) + "," + t(r) + "," + t(u)), e = " M" + t(y) + "," + t(B) + " L" + t(A) + "," + t(w) + f + " L" + t(q) + "," + t(v)) : e = " M" + y + "," + B + " L" + A + "," + w + (" A" + e + "," + g + ",0," + C + ",1," + r + "," + u) + " L" + q + "," + v;
    0 < h && (z ? F || (e += " B" + (b - h) + "," + (c - p) + "," + (b + h) + "," + (c + p) + "," + q + "," + v + "," + y + "," + B) : e += " A" + h + "," + p + ",0," + C + ",0," + y + "," + B);
    a.handDrawn && (b = AmCharts.line(a, [y, A], [B, w], l.stroke, l.thickness * Math.random() * a.handDrawThickness, l["stroke-opacity"]), d.push(b));
    a = a.path(e + " Z", void 0, void 0, "1000,1000").attr(l);
    if (m) {
        b = [];
        for (c = 0; c < m.length; c++) b.push(AmCharts.adjustLuminosity(l.fill, m[c]));
        0 < b.length && a.gradient("linearGradient", b)
    }
    a.pattern(n);
    d.wedge = a;
    d.push(a);
    return d
};
AmCharts.adjustLuminosity = function (a, b) {
    a = String(a).replace(/[^0-9a-f]/gi, "");
    6 > a.length && (a = String(a[0]) + String(a[0]) + String(a[1]) + String(a[1]) + String(a[2]) + String(a[2]));
    b = b || 0;
    var c = "#",
        d, f;
    for (f = 0; 3 > f; f++) d = parseInt(a.substr(2 * f, 2), 16), d = Math.round(Math.min(Math.max(0, d + d * b), 255)).toString(16), c += ("00" + d).substr(d.length);
    return c
};
AmCharts.AmLegend = AmCharts.Class({
    construct: function (a) {
        this.enabled = !0;
        this.cname = "AmLegend";
        this.createEvents("rollOverMarker", "rollOverItem", "rollOutMarker", "rollOutItem", "showItem", "hideItem", "clickMarker", "rollOverItem", "rollOutItem", "clickLabel");
        this.position = "bottom";
        this.borderColor = this.color = "#000000";
        this.borderAlpha = 0;
        this.markerLabelGap = 5;
        this.verticalGap = 10;
        this.align = "left";
        this.horizontalGap = 0;
        this.spacing = 10;
        this.markerDisabledColor = "#AAB3B3";
        this.markerType = "square";
        this.markerSize = 16;
        this.markerBorderThickness = this.markerBorderAlpha = 1;
        this.marginBottom = this.marginTop = 0;
        this.marginLeft = this.marginRight = 20;
        this.autoMargins = !0;
        this.valueWidth = 50;
        this.switchable = !0;
        this.switchType = "x";
        this.switchColor = "#FFFFFF";
        this.rollOverColor = "#CC0000";
        this.reversedOrder = !1;
        this.labelText = "[[title]]";
        this.valueText = "[[value]]";
        this.useMarkerColorForLabels = !1;
        this.rollOverGraphAlpha = 1;
        this.textClickEnabled = !1;
        this.equalWidths = !0;
        this.dateFormat = "DD-MM-YYYY";
        this.backgroundColor = "#FFFFFF";
        this.backgroundAlpha = 0;
        this.useGraphSettings = !1;
        this.showEntries = !0;
        AmCharts.applyTheme(this, a, this.cname)
    },
    setData: function (a) {
        this.legendData = a;
        this.invalidateSize()
    },
    invalidateSize: function () {
        this.destroy();
        this.entries = [];
        this.valueLabels = [];
        var a = this.legendData;
        this.enabled && (AmCharts.ifArray(a) || AmCharts.ifArray(this.data)) && this.drawLegend()
    },
    drawLegend: function () {
        var a = this.chart,
            b = this.position,
            c = this.width,
            d = a.divRealWidth,
            f = a.divRealHeight,
            e = this.div,
            g = this.legendData;
        this.data && (g = this.data);
        isNaN(this.fontSize) && (this.fontSize = a.fontSize);
        if ("right" == b || "left" == b) this.maxColumns = 1, this.autoMargins && (this.marginLeft = this.marginRight = 10);
        else if (this.autoMargins) {
            this.marginRight = a.marginRight;
            this.marginLeft = a.marginLeft;
            var h = a.autoMarginOffset;
            "bottom" == b ? (this.marginBottom = h, this.marginTop = 0) : (this.marginTop = h, this.marginBottom = 0)
        }
        c = void 0 !== c ? AmCharts.toCoordinate(c, d) : a.realWidth;
        "outside" == b ? (c = e.offsetWidth, f = e.offsetHeight, e.clientHeight && (c = e.clientWidth, f = e.clientHeight)) : (isNaN(c) || (e.style.width = c + "px"), e.className = "amChartsLegend " + a.classNamePrefix + "-legend-div");
        this.divWidth = c;
        (b = this.container) ? (b.container.innerHTML = "", e.appendChild(b.container), b.width = c, b.height = f, b.addDefs(a)) : b = new AmCharts.AmDraw(e, c, f, a);
        this.container = b;
        this.lx = 0;
        this.ly = 8;
        f = this.markerSize;
        f > this.fontSize && (this.ly = f / 2 - 1);
        0 < f && (this.lx += f + this.markerLabelGap);
        this.titleWidth = 0;
        if (f = this.title) f = AmCharts.text(this.container, f, this.color, a.fontFamily, this.fontSize, "start", !0), AmCharts.setCN(a, f, "legend-title"),
        f.translate(this.marginLeft, this.marginTop + this.verticalGap + this.ly + 1), a = f.getBBox(), this.titleWidth = a.width + 15, this.titleHeight = a.height + 6;
        this.index = this.maxLabelWidth = 0;
        if (this.showEntries) {
            for (a = 0; a < g.length; a++) this.createEntry(g[a]);
            for (a = this.index = 0; a < g.length; a++) this.createValue(g[a])
        }
        this.arrangeEntries();
        this.updateValues()
    },
    arrangeEntries: function () {
        var a = this.position,
            b = this.marginLeft + this.titleWidth,
            c = this.marginRight,
            d = this.marginTop,
            f = this.marginBottom,
            e = this.horizontalGap,
            g = this.div,
            h = this.divWidth,
            k = this.maxColumns,
            l = this.verticalGap,
            m = this.spacing,
            n = h - c - b,
            t = 0,
            p = 0,
            z = this.container;
        this.set && this.set.remove();
        var y = z.set();
        this.set = y;
        var v = z.set();
        y.push(v);
        var B = this.entries,
            A, w;
        for (w = 0; w < B.length; w++) {
            A = B[w].getBBox();
            var r = A.width;
            r > t && (t = r);
            A = A.height;
            A > p && (p = A)
        }
        var r = p = 0,
            u = e,
            q = 0,
            x = 0;
        for (w = 0; w < B.length; w++) {
            var C = B[w];
            this.reversedOrder && (C = B[B.length - w - 1]);
            A = C.getBBox();
            var F;
            this.equalWidths ? F = e + r * (t + m + this.markerLabelGap) : (F = u, u = u + A.width + e + m);
            A.height > x && (x = A.height);
            F + A.width > n && 0 < w && 0 !== r && (p++, r = 0, F = e, u = F + A.width + e + m, q = q + x + l, x = 0);
            C.translate(F, q);
            r++;
            !isNaN(k) && r >= k && (r = 0, p++, q = q + x + l, x = 0);
            v.push(C)
        }
        A = v.getBBox();
        k = A.height + 2 * l - 1;
        "left" == a || "right" == a ? (h = A.width + 2 * e, g.style.width = h + b + c + "px") : h = h - b - c - 1;
        c = AmCharts.polygon(this.container, [0, h, h, 0], [0, 0, k, k], this.backgroundColor, this.backgroundAlpha, 1, this.borderColor, this.borderAlpha);
        AmCharts.setCN(this.chart, c, "legend-bg");
        y.push(c);
        y.translate(b, d);
        c.toBack();
        b = e;
        if ("top" == a || "bottom" == a || "absolute" == a || "outside" == a) "center" == this.align ? b = e + (h - A.width) / 2 : "right" == this.align && (b = e + h - A.width);
        v.translate(b, l + 1);
        this.titleHeight > k && (k = this.titleHeight);
        a = k + d + f + 1;
        0 > a && (a = 0);
        a > this.chart.divRealHeight && (g.style.top = "0px");
        g.style.height = Math.round(a) + "px";
        z.setSize(this.divWidth, a)
    },
    createEntry: function (a) {
        if (!1 !== a.visibleInLegend) {
            var b = this.chart,
                c = a.markerType;
            a.legendEntryWidth = this.markerSize;
            c || (c = this.markerType);
            var d = a.color,
                f = a.alpha;
            a.legendKeyColor && (d = a.legendKeyColor());
            a.legendKeyAlpha && (f = a.legendKeyAlpha());
            var e;
            !0 === a.hidden && (e = d = this.markerDisabledColor);
            var g = a.pattern,
                h = a.customMarker;
            h || (h = this.customMarker);
            var k = this.container,
                l = this.markerSize,
                m = 0,
                n = 0,
                t = l / 2;
            if (this.useGraphSettings) {
                c = a.type;
                this.switchType = void 0;
                if ("line" == c || "step" == c || "smoothedLine" == c || "ohlc" == c) g = k.set(), a.hidden || (d = a.lineColorR, e = a.bulletBorderColorR), m = AmCharts.line(k, [0, 2 * l], [l / 2, l / 2], d, a.lineAlpha, a.lineThickness, a.dashLength), AmCharts.setCN(b, m, "graph-stroke"), g.push(m), a.bullet && (a.hidden || (d = a.bulletColorR), m = AmCharts.bullet(k, a.bullet, a.bulletSize, d, a.bulletAlpha, a.bulletBorderThickness, e, a.bulletBorderAlpha)) && (AmCharts.setCN(b, m, "graph-bullet"), m.translate(l + 1, l / 2), g.push(m)), t = 0, m = l, n = l / 3;
                else {
                    var p;
                    a.getGradRotation && (p = a.getGradRotation());
                    m = a.fillColorsR;
                    !0 === a.hidden && (m = d);
                    if (g = this.createMarker("rectangle", m, a.fillAlphas, a.lineThickness, d, a.lineAlpha, p, g)) t = l, g.translate(t, l / 2);
                    m = l
                }
                AmCharts.setCN(b, g, "graph-" + c);
                AmCharts.setCN(b, g, "graph-" + a.id)
            } else h ? (b.path && (h = b.path + h), g = k.image(h, 0, 0, l,
            l)) : (g = this.createMarker(c, d, f, void 0, void 0, void 0, void 0, g)) && g.translate(l / 2, l / 2);
            AmCharts.setCN(b, g, "legend-marker");
            this.addListeners(g, a);
            k = k.set([g]);
            this.switchable && a.switchable && k.setAttr("cursor", "pointer");
            void 0 != a.id && AmCharts.setCN(b, k, "legend-item-" + a.id);
            AmCharts.setCN(b, k, a.className, !0);
            (e = this.switchType) && "none" != e && ("x" == e ? (c = this.createX(), c.translate(l / 2, l / 2)) : c = this.createV(), c.dItem = a, !0 !== a.hidden ? "x" == e ? c.hide() : c.show() : "x" != e && c.hide(), this.switchable || c.hide(), this.addListeners(c,
            a), a.legendSwitch = c, k.push(c), AmCharts.setCN(b, c, "legend-switch"));
            e = this.color;
            a.showBalloon && this.textClickEnabled && void 0 !== this.selectedColor && (e = this.selectedColor);
            this.useMarkerColorForLabels && (e = d);
            !0 === a.hidden && (e = this.markerDisabledColor);
            d = AmCharts.massReplace(this.labelText, {
                "[[title]]": a.title
            });
            c = this.fontSize;
            g && (l <= c && g.translate(t, l / 2 + this.ly - c / 2 + (c + 2 - l) / 2 - n), a.legendEntryWidth = g.getBBox().width);
            var z;
            d && (d = AmCharts.fixBrakes(d), a.legendTextReal = d, z = this.labelWidth, z = isNaN(z) ? AmCharts.text(this.container,
            d, e, b.fontFamily, c, "start") : AmCharts.wrappedText(this.container, d, e, b.fontFamily, c, "start", !1, z, 0), AmCharts.setCN(b, z, "legend-label"), z.translate(this.lx + m, this.ly), k.push(z), b = z.getBBox().width, this.maxLabelWidth < b && (this.maxLabelWidth = b));
            this.entries[this.index] = k;
            a.legendEntry = this.entries[this.index];
            a.legendLabel = z;
            this.index++
        }
    },
    addListeners: function (a, b) {
        var c = this;
        a && a.mouseover(function (a) {
            c.rollOverMarker(b, a)
        }).mouseout(function (a) {
            c.rollOutMarker(b, a)
        }).click(function (a) {
            c.clickMarker(b,
            a)
        })
    },
    rollOverMarker: function (a, b) {
        this.switchable && this.dispatch("rollOverMarker", a, b);
        this.dispatch("rollOverItem", a, b)
    },
    rollOutMarker: function (a, b) {
        this.switchable && this.dispatch("rollOutMarker", a, b);
        this.dispatch("rollOutItem", a, b)
    },
    clickMarker: function (a, b) {
        this.switchable && (!0 === a.hidden ? this.dispatch("showItem", a, b) : this.dispatch("hideItem", a, b));
        this.dispatch("clickMarker", a, b)
    },
    rollOverLabel: function (a, b) {
        a.hidden || (this.textClickEnabled && a.legendLabel && a.legendLabel.attr({
            fill: this.rollOverColor
        }),
        this.dispatch("rollOverItem", a, b))
    },
    rollOutLabel: function (a, b) {
        if (!a.hidden) {
            if (this.textClickEnabled && a.legendLabel) {
                var c = this.color;
                void 0 !== this.selectedColor && a.showBalloon && (c = this.selectedColor);
                this.useMarkerColorForLabels && (c = a.lineColor, void 0 === c && (c = a.color));
                a.legendLabel.attr({
                    fill: c
                })
            }
            this.dispatch("rollOutItem", a, b)
        }
    },
    clickLabel: function (a, b) {
        this.textClickEnabled ? a.hidden || this.dispatch("clickLabel", a, b) : this.switchable && (!0 === a.hidden ? this.dispatch("showItem", a, b) : this.dispatch("hideItem",
        a, b))
    },
    dispatch: function (a, b, c) {
        this.fire(a, {
            type: a,
            dataItem: b,
            target: this,
            event: c,
            chart: this.chart
        })
    },
    createValue: function (a) {
        var b = this,
            c = b.fontSize,
            d = b.chart;
        if (!1 !== a.visibleInLegend) {
            var f = b.maxLabelWidth;
            b.forceWidth && (f = b.labelWidth);
            b.equalWidths || (b.valueAlign = "left");
            "left" == b.valueAlign && (f = a.legendEntry.getBBox().width);
            var e = f;
            if (b.valueText && 0 < b.valueWidth) {
                var g = b.color;
                b.useMarkerColorForValues && (g = a.color, a.legendKeyColor && (g = a.legendKeyColor()));
                !0 === a.hidden && (g = b.markerDisabledColor);
                var h = b.valueText,
                    f = f + b.lx + b.markerLabelGap + b.valueWidth,
                    k = "end";
                "left" == b.valueAlign && (f -= b.valueWidth, k = "start");
                g = AmCharts.text(b.container, h, g, b.chart.fontFamily, c, k);
                AmCharts.setCN(d, g, "legend-value");
                g.translate(f, b.ly);
                b.entries[b.index].push(g);
                e += b.valueWidth + 2 * b.markerLabelGap;
                g.dItem = a;
                b.valueLabels.push(g)
            }
            b.index++;
            d = b.markerSize;
            d < c + 7 && (d = c + 7, AmCharts.VML && (d += 3));
            c = b.container.rect(a.legendEntryWidth, 0, e, d, 0, 0).attr({
                stroke: "none",
                fill: "#fff",
                "fill-opacity": .005
            });
            c.dItem = a;
            b.entries[b.index - 1].push(c);
            c.mouseover(function (c) {
                b.rollOverLabel(a, c)
            }).mouseout(function (c) {
                b.rollOutLabel(a, c)
            }).click(function (c) {
                b.clickLabel(a, c)
            })
        }
    },
    createV: function () {
        var a = this.markerSize;
        return AmCharts.polygon(this.container, [a / 5, a / 2, a - a / 5, a / 2], [a / 3, a - a / 5, a / 5, a / 1.7], this.switchColor)
    },
    createX: function () {
        var a = (this.markerSize - 4) / 2,
            b = {
                stroke: this.switchColor,
                "stroke-width": 3
            }, c = this.container,
            d = AmCharts.line(c, [-a, a], [-a, a]).attr(b),
            a = AmCharts.line(c, [-a, a], [a, -a]).attr(b);
        return this.container.set([d,
        a])
    },
    createMarker: function (a, b, c, d, f, e, g, h) {
        var k = this.markerSize,
            l = this.container;
        f || (f = this.markerBorderColor);
        f || (f = b);
        isNaN(d) && (d = this.markerBorderThickness);
        isNaN(e) && (e = this.markerBorderAlpha);
        return AmCharts.bullet(l, a, k, b, c, d, f, e, k, g, h)
    },
    validateNow: function () {
        this.invalidateSize()
    },
    updateValues: function () {
        var a = this.valueLabels,
            b = this.chart,
            c, d = this.data;
        for (c = 0; c < a.length; c++) {
            var f = a[c],
                e = f.dItem,
                g = " ";
            if (d) e.value ? f.text(e.value) : f.text("");
            else {
                if (void 0 !== e.type) {
                    var h = e.currentDataItem,
                        k = this.periodValueText;
                    e.legendPeriodValueText && (k = e.legendPeriodValueText);
                    h ? (g = this.valueText, e.legendValueText && (g = e.legendValueText), g = b.formatString(g, h)) : k && (g = b.formatPeriodString(k, e))
                } else g = b.formatString(this.valueText, e);
                if (k = this.valueFunction) h && (e = h), g = k(e, g);
                f.text(g)
            }
        }
    },
    renderFix: function () {
        if (!AmCharts.VML) {
            var a = this.container;
            a && a.renderFix()
        }
    },
    destroy: function () {
        this.div.innerHTML = "";
        AmCharts.remove(this.set)
    }
});
AmCharts.AmMap = AmCharts.Class({
    inherits: AmCharts.AmChart,
    construct: function (a) {
        this.cname = "AmMap";
        this.type = "map";
        this.theme = a;
        this.version = "3.13.3";
        this.svgNotSupported = "This browser doesn't support SVG. Use Chrome, Firefox, Internet Explorer 9 or later.";
        this.createEvents("rollOverMapObject", "rollOutMapObject", "clickMapObject", "selectedObjectChanged", "homeButtonClicked", "zoomCompleted", "dragCompleted", "positionChanged", "writeDevInfo", "click");
        this.zoomDuration = 1;
        this.zoomControl = new AmCharts.ZoomControl(a);
        this.fitMapToContainer = !0;
        this.mouseWheelZoomEnabled = this.backgroundZoomsToTop = !1;
        this.allowClickOnSelectedObject = this.useHandCursorOnClickableOjects = this.showBalloonOnSelectedObject = !0;
        this.showObjectsAfterZoom = this.wheelBusy = !1;
        this.zoomOnDoubleClick = this.useObjectColorForBalloon = !0;
        this.allowMultipleDescriptionWindows = !1;
        this.dragMap = this.centerMap = this.linesAboveImages = !0;
        this.colorSteps = 5;
        this.showAreasInList = !0;
        this.showLinesInList = this.showImagesInList = !1;
        this.areasProcessor = new AmCharts.AreasProcessor(this);
        this.areasSettings = new AmCharts.AreasSettings(a);
        this.imagesProcessor = new AmCharts.ImagesProcessor(this);
        this.imagesSettings = new AmCharts.ImagesSettings(a);
        this.linesProcessor = new AmCharts.LinesProcessor(this);
        this.linesSettings = new AmCharts.LinesSettings(a);
        this.showDescriptionOnHover = !1;
        AmCharts.AmMap.base.construct.call(this, a);
        this.creditsPosition = "bottom-left";
        this.product = "ammap";
        this.areasClasses = {};
        AmCharts.applyTheme(this, a, this.cname)
    },
    initChart: function () {
        this.zoomInstantly = !0;
        var a = this.container;
        if (this.sizeChanged && AmCharts.hasSVG && this.chartCreated) {
            this.freeLabelsSet && this.freeLabelsSet.remove();
            this.freeLabelsSet = a.set();
            this.container.setSize(this.realWidth, this.realHeight);
            this.resizeMap();
            this.drawBackground();
            this.redrawLabels();
            this.drawTitles();
            this.processObjects();
            this.rescaleObjects();
            a = this.container;
            this.zoomControl.init(this, a);
            this.drawBg();
            var b = this.smallMap;
            b && b.init(this, a);
            (b = this.valueLegend) && b.init(this, a);
            this.sizeChanged = !1;
            this.zoomToLongLat(this.zLevelTemp, this.zLongTemp,
            this.zLatTemp, !0);
            this.previousWidth = this.realWidth;
            this.previousHeight = this.realHeight;
            this.updateSmallMap();
            this.linkSet.toFront()
        } else(AmCharts.AmMap.base.initChart.call(this), AmCharts.hasSVG) ? (this.dataChanged && (this.parseData(), this.dispatchDataUpdated = !0, this.dataChanged = !1, a = this.legend) && (a.position = "absolute", a.invalidateSize()), this.createDescriptionsDiv(), this.svgAreas = [], this.svgAreasById = {}, this.drawChart()) : (document.createTextNode(this.svgNotSupported), this.chartDiv.style.textAlign =
            "", this.chartDiv.setAttribute("class", "ammapAlert"), this.chartDiv.innerHTML = this.svgNotSupported, this.fire("failed", {
            type: "failed",
            chart: this
        }), clearInterval(this.interval))
    },
    invalidateSize: function () {
        var a = this.zoomLongitude();
        isNaN(a) || (this.zLongTemp = a);
        a = this.zoomLatitude();
        isNaN(a) || (this.zLatTemp = a);
        a = this.zoomLevel();
        isNaN(a) || (this.zLevelTemp = a);
        AmCharts.AmMap.base.invalidateSize.call(this)
    },
    handleWheelReal: function (a) {
        if (!this.wheelBusy) {
            this.stopAnimation();
            var b = this.zoomLevel(),
                c = this.zoomControl,
                d = c.zoomFactor;
            this.wheelBusy = !0;
            a = AmCharts.fitToBounds(0 < a ? b * d : b / d, c.minZoomLevel, c.maxZoomLevel);
            d = this.mouseX / this.mapWidth;
            c = this.mouseY / this.mapHeight;
            d = (this.zoomX() - d) * (a / b) + d;
            b = (this.zoomY() - c) * (a / b) + c;
            this.zoomTo(a, d, b)
        }
    },
    addLegend: function (a, b) {
        a.position = "absolute";
        a.autoMargins = !1;
        a.valueWidth = 0;
        a.switchable = !1;
        AmCharts.AmMap.base.addLegend.call(this, a, b);
        void 0 == a.enabled && (a.enabled = !0);
        return a
    },
    handleLegendEvent: function () {},
    createDescriptionsDiv: function () {
        if (!this.descriptionsDiv) {
            var a = document.createElement("div"),
                b = a.style;
            b.position = "absolute";
            b.left = "0px";
            b.top = "0px";
            this.descriptionsDiv = a
        }
        this.containerDiv.appendChild(this.descriptionsDiv)
    },
    drawChart: function () {
        AmCharts.AmMap.base.drawChart.call(this);
        var a = this.dataProvider;
        this.dataProvider = a = AmCharts.extend(a, new AmCharts.MapData, !0);
        this.areasSettings = AmCharts.processObject(this.areasSettings, AmCharts.AreasSettings, this.theme);
        this.imagesSettings = AmCharts.processObject(this.imagesSettings, AmCharts.ImagesSettings, this.theme);
        this.linesSettings = AmCharts.processObject(this.linesSettings, AmCharts.LinesSettings, this.theme);
        var b = this.container;
        this.mapContainer && this.mapContainer.remove();
        this.mapContainer = b.set();
        this.graphsSet.push(this.mapContainer);
        var c;
        a.map && (c = AmCharts.maps[a.map]);
        a.mapVar && (c = a.mapVar);
        c ? (this.svgData = c.svg, this.getBounds(), this.buildEverything()) : (a = a.mapURL) && this.loadXml(a);
        this.balloonsSet.toFront()
    },
    drawBg: function () {
        var a = this;
        a.background.click(function () {
            a.handleBackgroundClick()
        })
    },
    buildEverything: function () {
        var a = this;
        if (0 < a.realWidth && 0 < a.realHeight) {
            var b = a.container;
            a.zoomControl = AmCharts.processObject(a.zoomControl, AmCharts.ZoomControl, a.theme);
            a.zoomControl.init(this, b);
            a.drawBg();
            a.buildSVGMap();
            var c = a.smallMap;
            c && (a.smallMap = AmCharts.processObject(a.smallMap, AmCharts.SmallMap, a.theme), c = a.smallMap, c.init(a, b));
            c = a.dataProvider;
            isNaN(c.zoomX) && isNaN(c.zoomY) && isNaN(c.zoomLatitude) && isNaN(c.zoomLongitude) && (a.centerMap ? (c.zoomLatitude = a.coordinateToLatitude(a.mapHeight / 2), c.zoomLongitude = a.coordinateToLongitude(a.mapWidth / 2)) : (c.zoomX = 0, c.zoomY = 0), a.zoomInstantly = !0);
            a.selectObject(a.dataProvider);
            a.processAreas();
            if (c = a.valueLegend) c = AmCharts.processObject(c, AmCharts.ValueLegend, a.theme), a.valueLegend = c, c.init(a, b);
            a.objectList && (a.objectList = AmCharts.processObject(a.objectList, AmCharts.ObjectList), b = a.objectList) && (a.clearObjectList(), b.init(a));
            clearInterval(a.mapInterval);
            a.mapInterval = setInterval(function () {
                a.update.call(a)
            }, AmCharts.updateRate);
            a.dispDUpd();
            a.linkSet.toFront();
            a.chartCreated = !0
        } else a.cleanChart()
    },
    hideGroup: function (a) {
        this.showHideGroup(a, !1)
    },
    showGroup: function (a) {
        this.showHideGroup(a, !0)
    },
    showHideGroup: function (a, b) {
        this.showHideReal(this.imagesProcessor.allObjects, a, b);
        this.showHideReal(this.areasProcessor.allObjects, a, b);
        this.showHideReal(this.linesProcessor.allObjects, a, b)
    },
    showHideReal: function (a, b, c) {
        var d;
        for (d = 0; d < a.length; d++) {
            var f = a[d];
            if (f.groupId == b) {
                var e = f.displayObject;
                e && (c ? (f.hidden = !1, e.show()) : (f.hidden = !0, e.hide()))
            }
        }
    },
    update: function () {
        this.zoomControl.update()
    },
    animateMap: function () {
        var a = this;
        a.totalFrames = 1E3 * a.zoomDuration / AmCharts.updateRate;
        a.totalFrames += 1;
        a.frame = 0;
        a.tweenPercent = 0;
        setTimeout(function () {
            a.updateSize.call(a)
        }, AmCharts.updateRate)
    },
    updateSize: function () {
        var a = this,
            b = a.totalFrames;
        a.preventHover = !0;
        a.frame <= b ? (a.frame++, b = AmCharts.easeOutSine(0, a.frame, 0, 1, b), 1 <= b ? (b = 1, a.preventHover = !1, a.wheelBusy = !1) : setTimeout(function () {
            a.updateSize.call(a)
        }, AmCharts.updateRate), .8 < b && (a.preventHover = !1)) : (b = 1, a.preventHover = !1, a.wheelBusy = !1);
        a.tweenPercent = b;
        a.rescaleMapAndObjects()
    },
    rescaleMapAndObjects: function () {
        var a = this.initialScale,
            b = this.initialX,
            c = this.initialY,
            d = this.tweenPercent,
            a = a + (this.finalScale - a) * d;
        this.mapContainer.translate(b + (this.finalX - b) * d, c + (this.finalY - c) * d, a);
        if (this.areasSettings.adjustOutlineThickness) for (b = this.dataProvider.areas, c = 0; c < b.length; c++) {
            var f = b[c],
                e = f.displayObject;
            e && e.setAttr("stroke-width", f.outlineThicknessReal / a)
        }
        this.rescaleObjects();
        this.positionChanged();
        this.updateSmallMap();
        1 == d && (d = {
            type: "zoomCompleted",
            chart: this
        }, this.fire(d.type,
        d))
    },
    updateSmallMap: function () {
        this.smallMap && this.smallMap.update()
    },
    rescaleObjects: function () {
        var a = this.mapContainer.scale,
            b = this.imagesProcessor.objectsToResize,
            c;
        for (c = 0; c < b.length; c++) {
            var d = b[c].image;
            d.translate(d.x, d.y, b[c].scale / a, !0)
        }
        b = this.linesProcessor;
        if (d = b.linesToResize) for (c = 0; c < d.length; c++) {
            var f = d[c];
            f.line.setAttr("stroke-width", f.thickness / a)
        }
        b = b.objectsToResize;
        for (c = 0; c < b.length; c++) d = b[c], d.translate(d.x, d.y, 1 / a)
    },
    handleTouchStart: function (a) {
        this.handleMouseMove(a);
        this.handleMouseDown(a)
    },
    handleTouchEnd: function (a) {
        this.previousDistance = NaN;
        this.handleReleaseOutside(a)
    },
    handleMouseDown: function (a) {
        AmCharts.resetMouseOver();
        this.mouseIsOver = !0;
        a && this.mouseIsOver && a.preventDefault && this.panEventsEnabled && a.preventDefault();
        if (this.chartCreated && !this.preventHover && (this.dragMap && (this.stopAnimation(), this.isDragging = !0, this.mapContainerClickX = this.mapContainer.x, this.mapContainerClickY = this.mapContainer.y), a || (a = window.event), a.shiftKey && !0 === this.developerMode && this.getDevInfo(), a && a.touches)) {
            var b = this.mouseX,
                c = this.mouseY,
                d = a.touches.item(1);
            d && (a = d.pageX - AmCharts.findPosX(this.div), d = d.pageY - AmCharts.findPosY(this.div), this.middleXP = (b + (a - b) / 2) / this.realWidth, this.middleYP = (c + (d - c) / 2) / this.realHeight)
        }
    },
    stopDrag: function () {
        this.isDragging = !1
    },
    handleReleaseOutside: function () {
        if (AmCharts.isModern && !this.preventHover) {
            this.stopDrag();
            var a = this.zoomControl;
            a && a.draggerUp();
            this.mapWasDragged = !1;
            var a = this.mapContainer,
                b = this.mapContainerClickX,
                c = this.mapContainerClickY;
            isNaN(b) || isNaN(c) || !(2 < Math.abs(a.x - b) || Math.abs(a.y - c)) || (this.mapWasDragged = !0, a = {
                type: "dragCompleted",
                zoomX: this.zoomX(),
                zoomY: this.zoomY(),
                zoomLevel: this.zoomLevel(),
                chart: this
            }, this.fire(a.type, a));
            !this.mouseIsOver || this.mapWasDragged || this.skipClick || (a = {
                type: "click",
                x: this.mouseX,
                y: this.mouseY,
                chart: this
            }, this.fire(a.type, a), this.skipClick = !1);
            this.mapContainerClickY = this.mapContainerClickX = NaN;
            this.objectWasClicked = !1;
            this.zoomOnDoubleClick && this.mouseIsOver && (a = (new Date).getTime(), 200 > a - this.previousClickTime && 20 < a - this.previousClickTime && this.doDoubleClickZoom(), this.previousClickTime = a)
        }
    },
    handleTouchMove: function (a) {
        this.handleMouseMove(a)
    },
    resetPinch: function () {
        this.mapWasPinched = !1
    },
    handleMouseMove: function (a) {
        var b = this;
        AmCharts.AmMap.base.handleMouseMove.call(b, a);
        b.panEventsEnabled && b.mouseIsOver && a && a.preventDefault && a.preventDefault();
        var c = b.previuosMouseX,
            d = b.previuosMouseY,
            f = b.mouseX,
            e = b.mouseY,
            g = b.zoomControl;
        isNaN(c) && (c = f);
        isNaN(d) && (d = e);
        b.mouse2X = NaN;
        b.mouse2Y = NaN;
        a && a.touches && (a = a.touches.item(1)) && (b.mouse2X = a.pageX - AmCharts.findPosX(b.div), b.mouse2Y = a.pageY - AmCharts.findPosY(b.div));
        if (a = b.mapContainer) {
            var h = b.mouse2X,
                k = b.mouse2Y;
            b.pinchTO && clearTimeout(b.pinchTO);
            b.pinchTO = setTimeout(function () {
                b.resetPinch.call(b)
            }, 1E3);
            var l = b.realHeight,
                m = b.realWidth,
                n = b.mapWidth,
                t = b.mapHeight;
            if (!isNaN(h)) {
                b.stopDrag();
                var h = Math.sqrt(Math.pow(h - f, 2) + Math.pow(k - e, 2)),
                    p = b.previousDistance,
                    k = Math.max(b.realWidth, b.realHeight);
                5 > Math.abs(p - h) && (b.isDragging = !0);
                if (!isNaN(p)) {
                    var z = 5 * Math.abs(p - h) / k,
                        k = a.scale,
                        k = AmCharts.fitToBounds(p < h ? k + k * z : k - k * z, g.minZoomLevel, g.maxZoomLevel),
                        g = b.zoomLevel(),
                        y = b.middleXP,
                        p = b.middleYP,
                        z = l / t,
                        v = m / n,
                        y = (b.zoomX() - y * v) * (k / g) + y * v,
                        p = (b.zoomY() - p * z) * (k / g) + p * z;.1 < Math.abs(k - g) && (b.zoomTo(k, y, p, !0), b.mapWasPinched = !0, clearTimeout(b.pinchTO))
                }
                b.previousDistance = h
            }
            h = a.scale;
            b.isDragging && (b.hideBalloon(), b.positionChanged(), c = a.x + (f - c), d = a.y + (e - d), b.preventDragOut && (t = -t * h + l / 2, l /= 2, c = AmCharts.fitToBounds(c, -n * h + m / 2, m / 2), d = AmCharts.fitToBounds(d, t, l)), a.translate(c, d, h), b.updateSmallMap());
            b.previuosMouseX = f;
            b.previuosMouseY = e
        }
    },
    selectObject: function (a) {
        var b = this;
        a || (a = b.dataProvider);
        a.isOver = !1;
        var c = a.linkToObject;
        "string" == typeof c && (c = b.getObjectById(c));
        a.useTargetsZoomValues && c && (a.zoomX = c.zoomX, a.zoomY = c.zoomY, a.zoomLatitude = c.zoomLatitude, a.zoomLongitude = c.zoomLongitude, a.zoomLevel = c.zoomLevel);
        var d = b.selectedObject;
        d && b.returnInitialColor(d);
        b.selectedObject = a;
        var f = !1,
            e;
        "MapArea" == a.objectType && (a.autoZoomReal && (f = !0), e = b.areasSettings.selectedOutlineColor);
        if (c && !f && ("string" == typeof c && (c = b.getObjectById(c)), isNaN(a.zoomLevel) && isNaN(a.zoomX) && isNaN(a.zoomY))) {
            if (b.extendMapData(c)) return;
            b.selectObject(c);
            return
        }
        b.allowMultipleDescriptionWindows || b.closeAllDescriptions();
        clearTimeout(b.selectedObjectTimeOut);
        clearTimeout(b.processObjectsTimeOut);
        c = b.zoomDuration;
        !f && isNaN(a.zoomLevel) && isNaN(a.zoomX) && isNaN(a.zoomY) ? (b.showDescriptionAndGetUrl(), b.processObjects()) : (b.selectedObjectTimeOut = setTimeout(function () {
            b.showDescriptionAndGetUrl.call(b)
        }, 1E3 * c + 200), b.showObjectsAfterZoom ? b.processObjectsTimeOut = setTimeout(function () {
            b.processObjects.call(b)
        }, 1E3 * c + 200) : b.processObjects());
        if (f = a.displayObject) {
            a.bringForwardOnHover && f.toFront();
            if (!a.preserveOriginalAttributes) {
                f.setAttr("stroke", a.outlineColorReal);
                var g = a.selectedColorReal;
                void 0 !== g && f.setAttr("fill", g);
                void 0 !== e && f.setAttr("stroke", e);
                if ("MapLine" == a.objectType) {
                    var h = a.lineSvg;
                    h && h.setAttr("stroke", g);
                    var k = a.arrowSvg;
                    k && (k.setAttr("fill", g), k.setAttr("stroke", g))
                }
                var l = a.imageLabel;
                l && (c = a.selectedLabelColorReal,
                void 0 !== c && l.setAttr("fill", c))
            }
            a.selectable || (f.setAttr("cursor", "default"), l && l.setAttr("cursor", "default"))
        } else b.returnInitialColorReal(a);
        if (f = a.groupId) for (l = b.getGroupById(f), c = 0; c < l.length; c++) if (k = l[c], k.isOver = !1, f = k.displayObject) if (h = k.selectedColorReal, void 0 !== e && f.setAttr("stroke", e), void 0 !== h ? f.setAttr("fill", h) : b.returnInitialColor(k), "MapLine" == k.objectType && ((h = k.lineSvg) && h.setAttr("stroke", g), k = k.arrowSvg)) k.setAttr("fill", g), k.setAttr("stroke", g);
        b.zoomToSelectedObject();
        d != a && (a = {
            type: "selectedObjectChanged",
            chart: b
        }, b.fire(a.type, a))
    },
    returnInitialColor: function (a, b) {
        this.returnInitialColorReal(a);
        b && (a.isFirst = !1);
        if (this.selectedObject.bringForwardOnHover) {
            var c = this.selectedObject.displayObject;
            c && c.toFront()
        }
        if (c = a.groupId) {
            var c = this.getGroupById(c),
                d;
            for (d = 0; d < c.length; d++) this.returnInitialColorReal(c[d]), b && (c[d].isFirst = !1)
        }
    },
    closeAllDescriptions: function () {
        this.descriptionsDiv.innerHTML = ""
    },
    returnInitialColorReal: function (a) {
        a.isOver = !1;
        var b = a.displayObject;
        if (b) {
            b.toPrevious();
            if ("MapImage" == a.objectType) {
                var c = a.tempScale;
                isNaN(c) || b.translate(b.x, b.y, c, !0);
                a.tempScale = NaN
            }
            c = a.colorReal;
            if ("MapLine" == a.objectType) {
                var d = a.lineSvg;
                d && d.setAttr("stroke", c);
                if (d = a.arrowSvg) d.setAttr("fill", c), d.setAttr("stroke", c)
            }
            a.showAsSelected && (c = a.selectedColorReal);
            "bubble" == a.type && (c = void 0);
            void 0 !== c && b.setAttr("fill", c);
            (d = a.image) && d.setAttr("fill", c);
            b.setAttr("stroke", a.outlineColorReal);
            "MapArea" == a.objectType && (c = 1, this.areasSettings.adjustOutlineThickness && (c = this.zoomLevel()), b.setAttr("fill-opacity", a.alphaReal), b.setAttr("stroke-opacity", a.outlineAlphaReal), b.setAttr("stroke-width", a.outlineThicknessReal / c));
            (c = a.pattern) && b.pattern(c, this.mapScale);
            (b = a.imageLabel) && !a.labelInactive && b.setAttr("fill", a.labelColorReal)
        }
    },
    zoomToRectangle: function (a, b, c, d) {
        var f = this.realWidth,
            e = this.realHeight,
            g = this.mapSet.scale,
            h = this.zoomControl,
            f = AmCharts.fitToBounds(c / f > d / e ? .8 * f / (c * g) : .8 * e / (d * g), h.minZoomLevel, h.maxZoomLevel);
        this.zoomToMapXY(f, (a + c / 2) * g, (b + d / 2) * g)
    },
    zoomToLatLongRectangle: function (a, b, c, d) {
        var f = this.dataProvider,
            e = this.zoomControl,
            g = Math.abs(c - a),
            h = Math.abs(b - d),
            k = Math.abs(f.rightLongitude - f.leftLongitude),
            f = Math.abs(f.topLatitude - f.bottomLatitude),
            e = AmCharts.fitToBounds(g / k > h / f ? .8 * k / g : .8 * f / h, e.minZoomLevel, e.maxZoomLevel);
        this.zoomToLongLat(e, a + (c - a) / 2, d + (b - d) / 2)
    },
    getGroupById: function (a) {
        var b = [];
        this.getGroup(this.imagesProcessor.allObjects, a, b);
        this.getGroup(this.linesProcessor.allObjects, a, b);
        this.getGroup(this.areasProcessor.allObjects,
        a, b);
        return b
    },
    zoomToGroup: function (a) {
        a = "object" == typeof a ? a : this.getGroupById(a);
        var b, c, d, f, e;
        for (e = 0; e < a.length; e++) {
            var g = a[e].displayObject.getBBox(),
                h = g.y,
                k = g.y + g.height,
                l = g.x,
                g = g.x + g.width;
            if (h < b || isNaN(b)) b = h;
            if (k > f || isNaN(f)) f = k;
            if (l < c || isNaN(c)) c = l;
            if (g > d || isNaN(d)) d = g
        }
        a = this.mapSet.getBBox();
        c -= a.x;
        d -= a.x;
        f -= a.y;
        b -= a.y;
        this.zoomToRectangle(c, b, d - c, f - b)
    },
    getGroup: function (a, b, c) {
        if (a) {
            var d;
            for (d = 0; d < a.length; d++) {
                var f = a[d];
                f.groupId == b && c.push(f)
            }
        }
    },
    zoomToStageXY: function (a, b, c, d) {
        if (!this.objectWasClicked) {
            var f = this.zoomControl;
            a = AmCharts.fitToBounds(a, f.minZoomLevel, f.maxZoomLevel);
            f = this.zoomLevel();
            c = this.coordinateToLatitude((c - this.mapContainer.y) / f);
            b = this.coordinateToLongitude((b - this.mapContainer.x) / f);
            this.zoomToLongLat(a, b, c, d)
        }
    },
    zoomToLongLat: function (a, b, c, d) {
        b = this.longitudeToCoordinate(b);
        c = this.latitudeToCoordinate(c);
        this.zoomToMapXY(a, b, c, d)
    },
    zoomToMapXY: function (a, b, c, d) {
        var f = this.mapWidth,
            e = this.mapHeight;
        this.zoomTo(a, -(b / f) * a + this.realWidth / f / 2, -(c / e) * a + this.realHeight / e / 2, d)
    },
    zoomToObject: function (a) {
        var b = a.zoomLatitude,
            c = a.zoomLongitude,
            d = a.zoomLevel,
            f = this.zoomInstantly,
            e = a.zoomX,
            g = a.zoomY,
            h = this.realWidth,
            k = this.realHeight;
        isNaN(d) || (isNaN(b) || isNaN(c) ? this.zoomTo(d, e, g, f) : this.zoomToLongLat(d, c, b, f));
        this.zoomInstantly = !1;
        "MapImage" == a.objectType && isNaN(a.zoomX) && isNaN(a.zoomY) && isNaN(a.zoomLatitude) && isNaN(a.zoomLongitude) && !isNaN(a.latitude) && !isNaN(a.longitude) && this.zoomToLongLat(a.zoomLevel, a.longitude, a.latitude);
        "MapArea" == a.objectType && (e = a.displayObject.getBBox(), b = this.mapScale, c = e.x * b, d = e.y * b, f = e.width * b, e = e.height * b, h = a.autoZoomReal && isNaN(a.zoomLevel) ? f / h > e / k ? .8 * h / f : .8 * k / e : a.zoomLevel, k = this.zoomControl, h = AmCharts.fitToBounds(h, k.minZoomLevel, k.maxZoomLevel), isNaN(a.zoomX) && isNaN(a.zoomY) && isNaN(a.zoomLatitude) && isNaN(a.zoomLongitude) && (a = this.mapSet.getBBox(), this.zoomToMapXY(h, -a.x * b + c + f / 2, -a.y * b + d + e / 2)))
    },
    zoomToSelectedObject: function () {
        this.zoomToObject(this.selectedObject)
    },
    zoomTo: function (a, b, c, d) {
        var f = this.zoomControl;
        a = AmCharts.fitToBounds(a, f.minZoomLevel, f.maxZoomLevel);
        f = this.zoomLevel();
        isNaN(b) && (b = this.realWidth / this.mapWidth, b = (this.zoomX() - .5 * b) * (a / f) + .5 * b);
        isNaN(c) && (c = this.realHeight / this.mapHeight, c = (this.zoomY() - .5 * c) * (a / f) + .5 * c);
        this.stopAnimation();
        isNaN(a) || (f = this.mapContainer, this.initialX = f.x, this.initialY = f.y, this.initialScale = f.scale, this.finalX = this.mapWidth * b, this.finalY = this.mapHeight * c, this.finalScale = a, this.finalX != this.initialX || this.finalY != this.initialY || this.finalScale != this.initialScale ? d ? (this.tweenPercent = 1, this.rescaleMapAndObjects(),
        this.wheelBusy = !1) : this.animateMap() : this.wheelBusy = !1)
    },
    loadXml: function (a) {
        var b;
        b = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
        b.overrideMimeType && b.overrideMimeType("text/xml");
        b.open("GET", a, !1);
        b.send();
        this.parseXMLObject(b.responseXML);
        this.svgData && this.buildEverything()
    },
    stopAnimation: function () {
        this.frame = this.totalFrames
    },
    processObjects: function () {
        var a = this.container,
            b = this.stageImagesContainer;
        b && b.remove();
        this.stageImagesContainer = b = a.set();
        this.trendLinesSet.push(b);
        var c = this.stageLinesContainer;
        c && c.remove();
        this.stageLinesContainer = c = a.set();
        this.trendLinesSet.push(c);
        var d = this.mapImagesContainer;
        d && d.remove();
        this.mapImagesContainer = d = a.set();
        this.mapContainer.push(d);
        var f = this.mapLinesContainer;
        f && f.remove();
        this.mapLinesContainer = f = a.set();
        this.mapContainer.push(f);
        this.linesAboveImages ? (d.toFront(), b.toFront(), f.toFront(), c.toFront()) : (f.toFront(), c.toFront(), d.toFront(), b.toFront());
        if (a = this.selectedObject) this.imagesProcessor.reset(), this.linesProcessor.reset(),
        this.linesAboveImages ? (this.imagesProcessor.process(a), this.linesProcessor.process(a)) : (this.linesProcessor.process(a), this.imagesProcessor.process(a));
        this.rescaleObjects()
    },
    processAreas: function () {
        this.areasProcessor.process(this.dataProvider)
    },
    buildSVGMap: function () {
        var a = this.svgData.g.path,
            b = this.container,
            c = b.set();
        void 0 === a.length && (a = [a]);
        var d;
        for (d = 0; d < a.length; d++) {
            var f = a[d],
                e = f.d,
                g = f.title;
            f.titleTr && (g = f.titleTr);
            e = b.path(e);
            e.id = f.id;
            if (this.areasSettings.preserveOriginalAttributes) {
                e.customAttr = {};
                for (var h in f) "d" != h && "id" != h && "title" != h && (e.customAttr[h] = f[h])
            }
            this.svgAreasById[f.id] = {
                area: e,
                title: g,
                className: f["class"]
            };
            this.svgAreas.push(e);
            c.push(e)
        }
        this.mapSet = c;
        this.mapContainer.push(c);
        this.resizeMap()
    },
    addObjectEventListeners: function (a, b) {
        var c = this;
        a.mouseup(function (a) {
            c.clickMapObject(b, a)
        }).mouseover(function (a) {
            c.rollOverMapObject(b, !0, a)
        }).mouseout(function (a) {
            c.rollOutMapObject(b, a)
        }).touchend(function (a) {
            c.clickMapObject(b, a)
        }).touchstart(function (a) {
            c.rollOverMapObject(b, !0, a)
        })
    },
    checkIfSelected: function (a) {
        var b = this.selectedObject;
        if (b == a) return !0;
        if (b = b.groupId) {
            var b = this.getGroupById(b),
                c;
            for (c = 0; c < b.length; c++) if (b[c] == a) return !0
        }
        return !1
    },
    clearMap: function () {
        this.chartDiv.innerHTML = "";
        this.clearObjectList()
    },
    clearObjectList: function () {
        var a = this.objectList;
        a && a.div && (a.div.innerHTML = "")
    },
    checkIfLast: function (a) {
        if (a) {
            var b = a.parentNode;
            if (b && b.lastChild == a) return !0
        }
        return !1
    },
    showAsRolledOver: function (a) {
        var b = a.displayObject;
        if (!a.showAsSelected && b && !a.isOver) {
            b.node.onmouseout = function () {};
            b.node.onmouseover = function () {};
            b.node.onclick = function () {};
            !a.isFirst && a.bringForwardOnHover && (b.toFront(), a.isFirst = !0);
            var c = a.rollOverColorReal,
                d;
            a.preserveOriginalAttributes && (c = void 0);
            if (void 0 != c) if ("MapImage" == a.objectType)(d = a.image) && d.setAttr("fill", c);
            else if ("MapLine" == a.objectType) {
                if ((d = a.lineSvg) && d.setAttr("stroke", c), d = a.arrowSvg) d.setAttr("fill", c), d.setAttr("stroke", c)
            } else b.setAttr("fill", c);
            (c = a.imageLabel) && !a.labelInactive && (d = a.labelRollOverColorReal, void 0 != d && c.setAttr("fill", d));
            c = a.rollOverOutlineColorReal;
            void 0 != c && ("MapImage" == a.objectType ? (d = a.image) && d.setAttr("stroke", c) : b.setAttr("stroke", c));
            if ("MapArea" == a.objectType) {
                c = this.areasSettings;
                d = a.rollOverAlphaReal;
                isNaN(d) || b.setAttr("fill-opacity", d);
                d = c.rollOverOutlineAlpha;
                isNaN(d) || b.setAttr("stroke-opacity", d);
                d = 1;
                this.areasSettings.adjustOutlineThickness && (d = this.zoomLevel());
                var f = c.rollOverOutlineThickness;
                isNaN(f) || b.setAttr("stroke-width", f / d);
                (c = c.rollOverPattern) && b.pattern(c, this.mapScale)
            }
            "MapImage" == a.objectType && (c = a.rollOverScaleReal, isNaN(c) || 1 == c || (a.tempScale = b.scale, b.translate(b.x, b.y, b.scale * c, !0)));
            this.useHandCursorOnClickableOjects && this.checkIfClickable(a) && b.setAttr("cursor", "pointer");
            this.addObjectEventListeners(b, a);
            a.isOver = !0
        }
    },
    rollOverMapObject: function (a, b, c) {
        if (this.chartCreated) {
            this.handleMouseMove();
            var d = this.previouslyHovered;
            d && d != a ? (!1 === this.checkIfSelected(d) && (this.returnInitialColor(d, !0), this.previouslyHovered = null), this.hideBalloon()) : clearTimeout(this.hoverInt);
            if (!this.preventHover) {
                if (!1 === this.checkIfSelected(a)) {
                    if (d = a.groupId) {
                        var d = this.getGroupById(d),
                            f;
                        for (f = 0; f < d.length; f++) d[f] != a && this.showAsRolledOver(d[f])
                    }
                    this.showAsRolledOver(a)
                } else(d = a.displayObject) && (this.allowClickOnSelectedObject ? d.setAttr("cursor", "pointer") : d.setAttr("cursor", "default"));
                if (this.showDescriptionOnHover) this.showDescription(a);
                else if ((this.showBalloonOnSelectedObject || !this.checkIfSelected(a)) && !1 !== b && (f = this.balloon, b = a.colorReal, d = "", void 0 !== b && this.useObjectColorForBalloon || (b = f.fillColor), (f = a.balloonTextReal) && (d = this.formatString(f, a)), this.balloonLabelFunction && (d = this.balloonLabelFunction(a, this)), d && "" !== d)) {
                    var e, g;
                    "MapArea" == a.objectType && (g = this.getAreaCenterLatitude(a), e = this.getAreaCenterLongitude(a), g = this.latitudeToY(g), e = this.longitudeToX(e));
                    "MapImage" == a.objectType && (e = a.displayObject.x * this.zoomLevel() + this.mapContainer.x, g = a.displayObject.y * this.zoomLevel() + this.mapContainer.y);
                    this.showBalloon(d, b, this.mouseIsOver, e, g)
                }
                c = {
                    type: "rollOverMapObject",
                    mapObject: a,
                    chart: this,
                    event: c
                };
                this.fire(c.type, c);
                this.previouslyHovered = a
            }
        }
    },
    longitudeToX: function (a) {
        return this.longitudeToCoordinate(a) * this.zoomLevel() + this.mapContainer.x
    },
    latitudeToY: function (a) {
        return this.latitudeToCoordinate(a) * this.zoomLevel() + this.mapContainer.y
    },
    rollOutMapObject: function (a, b) {
        this.hideBalloon();
        if (this.chartCreated && a.isOver) {
            this.checkIfSelected(a) || this.returnInitialColor(a);
            var c = {
                type: "rollOutMapObject",
                mapObject: a,
                chart: this,
                event: b
            };
            this.fire(c.type, c)
        }
    },
    formatString: function (a,
    b) {
        var c = this.nf,
            d = this.pf,
            f = b.title;
        b.titleTr && (f = b.titleTr);
        void 0 == f && (f = "");
        var e = b.value,
            e = isNaN(e) ? "" : AmCharts.formatNumber(e, c),
            c = b.percents,
            c = isNaN(c) ? "" : AmCharts.formatNumber(c, d),
            d = b.description;
        void 0 == d && (d = "");
        var g = b.customData;
        void 0 == g && (g = "");
        return a = AmCharts.massReplace(a, {
            "[[title]]": f,
            "[[value]]": e,
            "[[percent]]": c,
            "[[description]]": d,
            "[[customData]]": g
        })
    },
    clickMapObject: function (a, b) {
        this.hideBalloon();
        if (this.chartCreated && !this.preventHover && !this.mapWasDragged && this.checkIfClickable(a) && !this.mapWasPinched) {
            this.selectObject(a);
            var c = {
                type: "clickMapObject",
                mapObject: a,
                chart: this,
                event: b
            };
            //Calling getCountry with Title of country - Abhilash
            //alert(a.title);
            getCountry(a.title);
            this.fire(c.type, c);
            this.objectWasClicked = !0
        }
    },
    checkIfClickable: function (a) {
        var b = this.allowClickOnSelectedObject;
        return this.selectedObject == a && b ? !0 : this.selectedObject != a || b ? !0 === a.selectable || "MapArea" == a.objectType && a.autoZoomReal || a.url || a.linkToObject || 0 < a.images.length || 0 < a.lines.length || !isNaN(a.zoomLevel) || !isNaN(a.zoomX) || !isNaN(a.zoomY) || a.description ? !0 : !1 : !1
    },
    handleResize: function () {
        (AmCharts.isPercents(this.width) || AmCharts.isPercents(this.height)) && this.invalidateSize();
        this.renderFix()
    },
    resizeMap: function () {
        var a = this.mapSet;
        if (a) if (this.fitMapToContainer) {
            var b = a.getBBox(),
                c = this.realWidth,
                d = this.realHeight,
                f = b.width,
                e = b.height,
                c = f / c > e / d ? c / f : d / e;
            a.translate(-b.x * c, -b.y * c, c);
            this.mapScale = c;
            this.mapHeight = e * c;
            this.mapWidth = f * c
        } else b = group.transform.match(/([\-]?[\d.]+)/g), a.translate(b[0], b[1], b[2])
    },
    zoomIn: function () {
        this.skipClick = !0;
        var a = this.zoomLevel() * this.zoomControl.zoomFactor;
        this.zoomTo(a)
    },
    zoomOut: function () {
        this.skipClick = !0;
        var a = this.zoomLevel() / this.zoomControl.zoomFactor;
        this.zoomTo(a)
    },
    moveLeft: function () {
        this.skipClick = !0;
        var a = this.zoomX() + this.zoomControl.panStepSize;
        this.zoomTo(this.zoomLevel(), a, this.zoomY())
    },
    moveRight: function () {
        this.skipClick = !0;
        var a = this.zoomX() - this.zoomControl.panStepSize;
        this.zoomTo(this.zoomLevel(), a, this.zoomY())
    },
    moveUp: function () {
        this.skipClick = !0;
        var a = this.zoomY() + this.zoomControl.panStepSize;
        this.zoomTo(this.zoomLevel(), this.zoomX(), a)
    },
    moveDown: function () {
        this.skipClick = !0;
        var a = this.zoomY() - this.zoomControl.panStepSize;
        this.zoomTo(this.zoomLevel(), this.zoomX(), a)
    },
    zoomX: function () {
        return this.mapSet ? Math.round(1E4 * this.mapContainer.x / this.mapWidth) / 1E4 : NaN
    },
    zoomY: function () {
        return this.mapSet ? Math.round(1E4 * this.mapContainer.y / this.mapHeight) / 1E4 : NaN
    },
    goHome: function () {
        this.selectObject(this.dataProvider);
        var a = {
            type: "homeButtonClicked",
            chart: this
        };
        this.fire(a.type, a)
    },
    zoomLevel: function () {
        return Math.round(1E5 * this.mapContainer.scale) / 1E5
    },
    showDescriptionAndGetUrl: function () {
        var a = this.selectedObject;
        if (a) {
            this.showDescription();
            var b = a.url;
            if (b) AmCharts.getURL(b, a.urlTarget);
            else if (b = a.linkToObject) {
                if ("string" == typeof b) {
                    var c = this.getObjectById(b);
                    if (c) {
                        this.selectObject(c);
                        return
                    }
                }
                b && a.passZoomValuesToTarget && (b.zoomLatitude = this.zoomLatitude(), b.zoomLongitude = this.zoomLongitude(), b.zoomLevel = this.zoomLevel());
                this.extendMapData(b) || this.selectObject(b)
            }
        }
    },
    extendMapData: function (a) {
        var b = a.objectType;
        if ("MapImage" != b && "MapArea" != b && "MapLine" != b) return AmCharts.extend(a,
        new AmCharts.MapData, !0), this.dataProvider = a, this.zoomInstantly = !0, this.validateData(), !0
    },
    showDescription: function (a) {
        a || (a = this.selectedObject);
        this.allowMultipleDescriptionWindows || this.closeAllDescriptions();
        if (a.description) {
            var b = a.descriptionWindow;
            b && b.close();
            b = new AmCharts.DescriptionWindow;
            a.descriptionWindow = b;
            var c = a.descriptionWindowWidth,
                d = a.descriptionWindowHeight,
                f = a.descriptionWindowLeft,
                e = a.descriptionWindowTop,
                g = a.descriptionWindowRight,
                h = a.descriptionWindowBottom;
            isNaN(g) || (f = this.realWidth - g);
            isNaN(h) || (e = this.realHeight - h);
            var k = a.descriptionWindowX;
            isNaN(k) || (f = k);
            k = a.descriptionWindowY;
            isNaN(k) || (e = k);
            isNaN(f) && (f = this.mouseX, f = f > this.realWidth / 2 ? f - c - 20 : f + 20);
            isNaN(e) && (e = this.mouseY);
            b.maxHeight = d;
            k = a.title;
            a.titleTr && (k = a.titleTr);
            b.show(this, this.descriptionsDiv, a.description, k);
            a = b.div.style;
            a.position = "absolute";
            a.width = c + "px";
            a.maxHeight = d + "px";
            isNaN(h) || (e -= b.div.offsetHeight);
            isNaN(g) || (f -= b.div.offsetWidth);
            a.left = f + "px";
            a.top = e + "px"
        }
    },
    parseXMLObject: function (a) {
        var b = {
            root: {}
        };
        this.parseXMLNode(b, "root", a);
        this.svgData = b.root.svg;
        this.getBounds()
    },
    getBounds: function () {
        var a = this.dataProvider;
        try {
            var b = this.svgData.defs["amcharts:ammap"];
            a.leftLongitude = Number(b.leftLongitude);
            a.rightLongitude = Number(b.rightLongitude);
            a.topLatitude = Number(b.topLatitude);
            a.bottomLatitude = Number(b.bottomLatitude);
            a.projection = b.projection;
            var c = b.wrappedLongitudes;
            c && (a.rightLongitude += 360);
            a.wrappedLongitudes = c
        } catch (d) {}
    },
    recalcLongitude: function (a) {
        var b = this.dataProvider.wrappedLongitudes;
        return void 0 != a && b ? a < this.dataProvider.leftLongitude ? Number(a) + 360 : a : a
    },
    latitudeToCoordinate: function (a) {
        var b, c = this.dataProvider;
        if (this.mapSet) {
            b = c.topLatitude;
            var d = c.bottomLatitude;
            "mercator" == c.projection && (a = this.mercatorLatitudeToCoordinate(a), b = this.mercatorLatitudeToCoordinate(b), d = this.mercatorLatitudeToCoordinate(d));
            b = (a - b) / (d - b) * this.mapHeight
        }
        return b
    },
    longitudeToCoordinate: function (a) {
        a = this.recalcLongitude(a);
        var b, c = this.dataProvider;
        this.mapSet && (b = c.leftLongitude, b = (a - b) / (c.rightLongitude - b) * this.mapWidth);
        return b
    },
    mercatorLatitudeToCoordinate: function (a) {
        89.5 < a && (a = 89.5); - 89.5 > a && (a = -89.5);
        a = AmCharts.degreesToRadians(a);
        a = .5 * Math.log((1 + Math.sin(a)) / (1 - Math.sin(a)));
        return AmCharts.radiansToDegrees(a / 2)
    },
    zoomLatitude: function () {
        return this.coordinateToLatitude((-this.mapContainer.y + this.previousHeight / 2) / this.zoomLevel())
    },
    zoomLongitude: function () {
        return this.coordinateToLongitude((-this.mapContainer.x + this.previousWidth / 2) / this.zoomLevel())
    },
    getAreaCenterLatitude: function (a) {
        a = a.displayObject.getBBox();
        var b = this.mapScale;
        a = -this.mapSet.getBBox().y * b + (a.y + a.height / 2) * b;
        return this.coordinateToLatitude(a)
    },
    getAreaCenterLongitude: function (a) {
        a = a.displayObject.getBBox();
        var b = this.mapScale;
        a = -this.mapSet.getBBox().x * b + (a.x + a.width / 2) * b;
        return this.coordinateToLongitude(a)
    },
    coordinateToLatitude: function (a) {
        var b;
        if (this.mapSet) {
            var c = this.dataProvider,
                d = c.bottomLatitude,
                f = c.topLatitude;
            b = this.mapHeight;
            "mercator" == c.projection ? (c = this.mercatorLatitudeToCoordinate(d), f = this.mercatorLatitudeToCoordinate(f),
            a = 2 * Math.atan(Math.exp(2 * (a * (c - f) / b + f) * Math.PI / 180)) - .5 * Math.PI, b = AmCharts.radiansToDegrees(a)) : b = a / b * (d - f) + f
        }
        return Math.round(1E6 * b) / 1E6
    },
    coordinateToLongitude: function (a) {
        var b, c = this.dataProvider;
        this.mapSet && (b = a / this.mapWidth * (c.rightLongitude - c.leftLongitude) + c.leftLongitude);
        return Math.round(1E6 * b) / 1E6
    },
    milesToPixels: function (a) {
        var b = this.dataProvider;
        return this.mapWidth / (b.rightLongitude - b.leftLongitude) * a / 69.172
    },
    kilometersToPixels: function (a) {
        var b = this.dataProvider;
        return this.mapWidth / (b.rightLongitude - b.leftLongitude) * a / 111.325
    },
    handleBackgroundClick: function (a) {
        if (this.backgroundZoomsToTop && !this.mapWasDragged) {
            var b = this.dataProvider;
            if (this.checkIfClickable(b)) this.clickMapObject(b);
            else {
                a = b.zoomX;
                var c = b.zoomY,
                    d = b.zoomLongitude,
                    f = b.zoomLatitude,
                    b = b.zoomLevel;
                isNaN(a) || isNaN(c) || this.zoomTo(b, a, c);
                isNaN(d) || isNaN(f) || this.zoomToLongLat(b, d, f, !0)
            }
        }
    },
    parseXMLNode: function (a, b, c, d) {
        void 0 === d && (d = "");
        var f, e, g;
        if (c) {
            var h = c.childNodes.length;
            for (f = 0; f < h; f++) {
                e = c.childNodes[f];
                var k = e.nodeName,
                    l = e.nodeValue ? this.trim(e.nodeValue) : "",
                    m = !1;
                e.attributes && 0 < e.attributes.length && (m = !0);
                if (0 !== e.childNodes.length || "" !== l || !1 !== m) if (3 == e.nodeType || 4 == e.nodeType) {
                    if ("" !== l) {
                        e = 0;
                        for (g in a[b]) a[b].hasOwnProperty(g) && e++;
                        e ? a[b]["#text"] = l : a[b] = l
                    }
                } else if (1 == e.nodeType) {
                    var n;
                    void 0 !== a[b][k] ? void 0 === a[b][k].length ? (n = a[b][k], a[b][k] = [], a[b][k].push(n), a[b][k].push({}), n = a[b][k][1]) : "object" == typeof a[b][k] && (a[b][k].push({}), n = a[b][k][a[b][k].length - 1]) : (a[b][k] = {}, n = a[b][k]);
                    if (e.attributes && e.attributes.length) for (l = 0; l < e.attributes.length; l++) n[e.attributes[l].name] = e.attributes[l].value;
                    void 0 !== a[b][k].length ? this.parseXMLNode(a[b][k], a[b][k].length - 1, e, d + "  ") : this.parseXMLNode(a[b], k, e, d + "  ")
                }
            }
            e = 0;
            c = "";
            for (g in a[b]) "#text" == g ? c = a[b][g] : e++;
            0 === e && void 0 === a[b].length && (a[b] = c)
        }
    },
    doDoubleClickZoom: function () {
        if (!this.mapWasDragged) {
            var a = this.zoomLevel() * this.zoomControl.zoomFactor;
            this.zoomToStageXY(a, this.mouseX, this.mouseY)
        }
    },
    getDevInfo: function () {
        var a = this.zoomLevel(),
            a = {
                chart: this,
                type: "writeDevInfo",
                zoomLevel: a,
                zoomX: this.zoomX(),
                zoomY: this.zoomY(),
                zoomLatitude: this.zoomLatitude(),
                zoomLongitude: this.zoomLongitude(),
                latitude: this.coordinateToLatitude((this.mouseY - this.mapContainer.y) / a),
                longitude: this.coordinateToLongitude((this.mouseX - this.mapContainer.x) / a),
                left: this.mouseX,
                top: this.mouseY,
                right: this.realWidth - this.mouseX,
                bottom: this.realHeight - this.mouseY,
                percentLeft: Math.round(this.mouseX / this.realWidth * 100) + "%",
                percentTop: Math.round(this.mouseY / this.realHeight * 100) + "%",
                percentRight: Math.round((this.realWidth - this.mouseX) / this.realWidth * 100) + "%",
                percentBottom: Math.round((this.realHeight - this.mouseY) / this.realHeight * 100) + "%"
            }, b = "zoomLevel:" + a.zoomLevel + ", zoomLongitude:" + a.zoomLongitude + ", zoomLatitude:" + a.zoomLatitude + "\n",
            b = b + ("zoomX:" + a.zoomX + ", zoomY:" + a.zoomY + "\n"),
            b = b + ("latitude:" + a.latitude + ", longitude:" + a.longitude + "\n"),
            b = b + ("left:" + a.left + ", top:" + a.top + "\n"),
            b = b + ("right:" + a.right + ", bottom:" + a.bottom + "\n"),
            b = b + ('left:"' + a.percentLeft + '", top:"' + a.percentTop +
                '"\n'),
            b = b + ('right:"' + a.percentRight + '", bottom:"' + a.percentBottom + '"\n');
        a.str = b;
        this.fire(a.type, a);
        return a
    },
    getXY: function (a, b, c) {
        void 0 !== a && (-1 != String(a).indexOf("%") ? (a = Number(a.split("%").join("")), c && (a = 100 - a), a = Number(a) * b / 100) : c && (a = b - a));
        return a
    },
    getObjectById: function (a) {
        var b = this.dataProvider;
        if (b.areas) {
            var c = this.getObject(a, b.areas);
            if (c) return c
        }
        if (c = this.getObject(a, b.images)) return c;
        if (a = this.getObject(a, b.lines)) return a
    },
    getObject: function (a, b) {
        if (b) {
            var c;
            for (c = 0; c < b.length; c++) {
                var d = b[c];
                if (d.id == a) return d;
                if (d.areas) {
                    var f = this.getObject(a, d.areas);
                    if (f) return f
                }
                if (f = this.getObject(a, d.images)) return f;
                if (d = this.getObject(a, d.lines)) return d
            }
        }
    },
    parseData: function () {
        var a = this.dataProvider;
        this.processObject(a.areas, a, "area");
        this.processObject(a.images, a, "image");
        this.processObject(a.lines, a, "line")
    },
    processObject: function (a, b, c) {
        if (a) {
            var d;
            for (d = 0; d < a.length; d++) {
                var f = a[d];
                f.parentObject = b;
                "area" == c && AmCharts.extend(f, new AmCharts.MapArea(this.theme), !0);
                "image" == c && (f = AmCharts.extend(f, new AmCharts.MapImage(this.theme), !0));
                "line" == c && (f = AmCharts.extend(f, new AmCharts.MapLine(this.theme), !0));
                a[d] = f;
                f.areas && this.processObject(f.areas, f, "area");
                f.images && this.processObject(f.images, f, "image");
                f.lines && this.processObject(f.lines, f, "line")
            }
        }
    },
    positionChanged: function () {
        var a = {
            type: "positionChanged",
            zoomX: this.zoomX(),
            zoomY: this.zoomY(),
            zoomLevel: this.zoomLevel(),
            chart: this
        };
        this.fire(a.type, a)
    },
    getX: function (a, b) {
        return this.getXY(a, this.realWidth, b)
    },
    getY: function (a,
    b) {
        return this.getXY(a, this.realHeight, b)
    },
    trim: function (a) {
        if (a) {
            var b;
            for (b = 0; b < a.length; b++) if (-1 === " \n\r\t\f\x0B\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000".indexOf(a.charAt(b))) {
                a = a.substring(b);
                break
            }
            for (b = a.length - 1; 0 <= b; b--) if (-1 === " \n\r\t\f\x0B\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000".indexOf(a.charAt(b))) {
                a = a.substring(0, b + 1);
                break
            }
            return -1 === " \n\r\t\f\x0B\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000".indexOf(a.charAt(0)) ? a : ""
        }
    },
    destroy: function () {
        var a = this.svgAreas;
        if (a) for (var b = 0; b < a.length; b++);
        AmCharts.AmMap.base.destroy.call(this)
    }
});
AmCharts.ZoomControl = AmCharts.Class({
    construct: function (a) {
        this.cname = "ZoomControl";
        this.panStepSize = .1;
        this.zoomFactor = 2;
        this.maxZoomLevel = 64;
        this.minZoomLevel = 1;
        this.zoomControlEnabled = this.panControlEnabled = !0;
        this.buttonRollOverColor = "#CC0000";
        this.buttonFillColor = "#990000";
        this.buttonFillAlpha = 1;
        this.buttonBorderColor = "#FFFFFF";
        this.buttonIconAlpha = this.buttonBorderThickness = this.buttonBorderAlpha = 1;
        this.gridColor = "#FFFFFF";
        this.homeIconFile = "homeIcon.gif";
        this.gridBackgroundColor = "#000000";
        this.gridBackgroundAlpha = .15;
        this.gridAlpha = 1;
        this.buttonSize = 18;
        this.iconSize = 11;
        this.buttonCornerRadius = 0;
        this.gridHeight = 150;
        this.top = this.left = 10;
        AmCharts.applyTheme(this, a, this.cname)
    },
    init: function (a, b) {
        var c = this;
        c.chart = a;
        AmCharts.remove(c.set);
        var d = b.set();
        AmCharts.setCN(a, d, "zoom-control");
        var f = c.buttonSize,
            e = c.zoomControlEnabled,
            g = c.panControlEnabled,
            h = c.buttonFillColor,
            k = c.buttonFillAlpha,
            l = c.buttonBorderThickness,
            m = c.buttonBorderColor,
            n = c.buttonBorderAlpha,
            t = c.buttonCornerRadius,
            p = c.buttonRollOverColor,
            z = c.gridHeight,
            y = c.zoomFactor,
            v = c.minZoomLevel,
            B = c.maxZoomLevel,
            A = c.buttonIconAlpha,
            w = a.getX(c.left),
            r = a.getY(c.top);
        isNaN(c.right) || (w = a.getX(c.right, !0), w = g ? w - 3 * f : w - f);
        isNaN(c.bottom) || (r = a.getY(c.bottom, !0), e && (r -= z + 3 * f), r = g ? r - 3 * f : r + f);
        d.translate(w, r);
        c.previousDY = NaN;
        var u;
        if (e) {
            u = b.set();
            AmCharts.setCN(a, u, "zoom-control-zoom");
            d.push(u);
            c.set = d;
            c.zoomSet = u;
            r = AmCharts.rect(b, f + 6, z + 2 * f + 6, c.gridBackgroundColor, c.gridBackgroundAlpha, 0, 0, 0, 4);
            AmCharts.setCN(a, r, "zoom-bg");
            r.translate(-3, -3);
            r.mouseup(function () {
                c.handleBgUp()
            }).touchend(function () {
                c.handleBgUp()
            });
            u.push(r);
            r = new AmCharts.SimpleButton;
            r.setIcon(a.pathToImages + "plus.gif", c.iconSize);
            r.setClickHandler(a.zoomIn, a);
            r.init(b, f, f, h, k, l, m, n, t, p, A);
            AmCharts.setCN(a, r.set, "zoom-in");
            u.push(r.set);
            r = new AmCharts.SimpleButton;
            r.setIcon(a.pathToImages + "minus.gif", c.iconSize);
            r.setClickHandler(a.zoomOut, a);
            r.init(b, f, f, h, k, l, m, n, t, p, A);
            r.set.translate(0, z + f);
            AmCharts.setCN(a, r.set, "zoom-out");
            u.push(r.set);
            var w = Math.log(B / v) / Math.log(y) + 1,
                e = z / w,
                q;
            for (q = 1; q < w; q++) r = f + q * e, r = AmCharts.line(b, [1, f - 2], [r, r], c.gridColor, c.gridAlpha, 1), AmCharts.setCN(a, r, "zoom-grid"), u.push(r);
            r = new AmCharts.SimpleButton;
            r.setDownHandler(c.draggerDown, c);
            r.setClickHandler(c.draggerUp, c);
            r.init(b, f, e, h, k, l, m, n, t, p);
            AmCharts.setCN(a, r.set, "zoom-dragger");
            u.push(r.set);
            c.dragger = r.set;
            c.previousY = NaN;
            z -= e;
            v = Math.log(v / 100) / Math.log(y);
            y = Math.log(B / 100) / Math.log(y);
            c.realStepSize = z / (y - v);
            c.realGridHeight = z;
            c.stepMax = y
        }
        g && (g = b.set(), AmCharts.setCN(a,
        g, "zoom-control-pan"), d.push(g), u && u.translate(f, 4 * f), u = new AmCharts.SimpleButton, u.setIcon(a.pathToImages + "panLeft.gif", c.iconSize), u.setClickHandler(a.moveLeft, a), u.init(b, f, f, h, k, l, m, n, t, p, A), u.set.translate(0, f), AmCharts.setCN(a, u.set, "pan-left"), g.push(u.set), u = new AmCharts.SimpleButton, u.setIcon(a.pathToImages + "panRight.gif", c.iconSize), u.setClickHandler(a.moveRight, a), u.init(b, f, f, h, k, l, m, n, t, p, A), u.set.translate(2 * f, f), AmCharts.setCN(a, u.set, "pan-right"), g.push(u.set), u = new AmCharts.SimpleButton,
        u.setIcon(a.pathToImages + "panUp.gif", c.iconSize), u.setClickHandler(a.moveUp, a), u.init(b, f, f, h, k, l, m, n, t, p, A), u.set.translate(f, 0), AmCharts.setCN(a, u.set, "pan-up"), g.push(u.set), u = new AmCharts.SimpleButton, u.setIcon(a.pathToImages + "panDown.gif", c.iconSize), u.setClickHandler(a.moveDown, a), u.init(b, f, f, h, k, l, m, n, t, p, A), u.set.translate(f, 2 * f), AmCharts.setCN(a, u.set, "pan-down"), g.push(u.set), k = new AmCharts.SimpleButton, k.setIcon(a.pathToImages + c.homeIconFile, c.iconSize), k.setClickHandler(a.goHome, a), k.init(b,
        f, f, h, 0, 0, m, 0, t, p, A), k.set.translate(f, f), AmCharts.setCN(a, k.set, "pan-home"), g.push(k.set), d.push(g))
    },
    draggerDown: function () {
        this.chart.stopDrag();
        this.isDragging = !0
    },
    draggerUp: function () {
        this.isDragging = !1
    },
    handleBgUp: function () {
        var a = this.chart,
            b = 100 * Math.pow(this.zoomFactor, this.stepMax - (a.mouseY - this.zoomSet.y - this.set.y - this.buttonSize - this.realStepSize / 2) / this.realStepSize);
        a.zoomTo(b)
    },
    update: function () {
        var a, b = this.zoomFactor,
            c = this.realStepSize,
            d = this.stepMax,
            f = this.dragger,
            e = this.buttonSize,
            g = this.chart;
        this.isDragging ? (g.stopDrag(), a = f.y + (g.mouseY - this.previousY), a = AmCharts.fitToBounds(a, e, this.realGridHeight + e), c = 100 * Math.pow(b, d - (a - e) / c), g.zoomTo(c, NaN, NaN, !0)) : (a = Math.log(g.zoomLevel() / 100) / Math.log(b), a = (d - a) * c + e);
        this.previousY = g.mouseY;
        this.previousDY != a && f && (f.translate(0, a), this.previousDY = a)
    }
});
AmCharts.SimpleButton = AmCharts.Class({
    construct: function () {},
    init: function (a, b, c, d, f, e, g, h, k, l, m) {
        var n = this;
        n.rollOverColor = l;
        n.color = d;
        l = a.set();
        n.set = l;
        d = AmCharts.rect(a, b, c, d, f, e, g, h, k);
        l.push(d);
        if (f = n.iconPath) e = n.iconSize, a = a.image(f, (b - e) / 2, (c - e) / 2, e, e), l.push(a), a.setAttr("opacity", m), a.mousedown(function () {
            n.handleDown()
        }).mouseup(function () {
            n.handleUp()
        }).mouseover(function () {
            n.handleOver()
        }).mouseout(function () {
            n.handleOut()
        });
        d.mousedown(function () {
            n.handleDown()
        }).touchstart(function () {
            n.handleDown()
        }).mouseup(function () {
            n.handleUp()
        }).touchend(function () {
            n.handleUp()
        }).mouseover(function () {
            n.handleOver()
        }).mouseout(function () {
            n.handleOut()
        });
        n.bg = d
    },
    setIcon: function (a, b) {
        this.iconPath = a;
        this.iconSize = b
    },
    setClickHandler: function (a, b) {
        this.clickHandler = a;
        this.scope = b
    },
    setDownHandler: function (a, b) {
        this.downHandler = a;
        this.scope = b
    },
    handleUp: function () {
        var a = this.clickHandler;
        a && a.call(this.scope)
    },
    handleDown: function () {
        var a = this.downHandler;
        a && a.call(this.scope)
    },
    handleOver: function () {
        this.bg.setAttr("fill", this.rollOverColor)
    },
    handleOut: function () {
        this.bg.setAttr("fill", this.color)
    }
});
AmCharts.SmallMap = AmCharts.Class({
    construct: function (a) {
        this.cname = "SmallMap";
        this.mapColor = "#e6e6e6";
        this.rectangleColor = "#FFFFFF";
        this.top = this.right = 10;
        this.minimizeButtonWidth = 16;
        this.backgroundColor = "#9A9A9A";
        this.backgroundAlpha = 1;
        this.borderColor = "#FFFFFF";
        this.borderThickness = 3;
        this.borderAlpha = 1;
        this.size = .2;
        this.enabled = !0;
        AmCharts.applyTheme(this, a, this.cname)
    },
    init: function (a, b) {
        var c = this;
        if (c.enabled) {
            c.chart = a;
            c.container = b;
            c.width = a.realWidth * c.size;
            c.height = a.realHeight * c.size;
            AmCharts.remove(c.set);
            var d = b.set();
            c.set = d;
            AmCharts.setCN(a, d, "small-map");
            var f = b.set();
            c.allSet = f;
            d.push(f);
            c.buildSVGMap();
            var e = c.borderThickness,
                g = c.borderColor,
                h = AmCharts.rect(b, c.width + e, c.height + e, c.backgroundColor, c.backgroundAlpha, e, g, c.borderAlpha);
            AmCharts.setCN(a, h, "small-map-bg");
            h.translate(-e / 2, -e / 2);
            f.push(h);
            h.toBack();
            var k, l, h = c.minimizeButtonWidth,
                m = new AmCharts.SimpleButton;
            m.setIcon(a.pathToImages + "arrowDown.gif", h);
            m.setClickHandler(c.minimize, c);
            m.init(b, h, h, g, 1, 1, g, 1);
            AmCharts.setCN(a, m.set,
                "small-map-down");
            m = m.set;
            c.downButtonSet = m;
            d.push(m);
            var n = new AmCharts.SimpleButton;
            n.setIcon(a.pathToImages + "arrowUp.gif", h);
            n.setClickHandler(c.maximize, c);
            n.init(b, h, h, g, 1, 1, g, 1);
            AmCharts.setCN(a, n.set, "small-map-up");
            g = n.set;
            c.upButtonSet = g;
            g.hide();
            d.push(g);
            var t, p;
            isNaN(c.top) || (k = a.getY(c.top) + e, p = 0);
            isNaN(c.bottom) || (k = a.getY(c.bottom, !0) - c.height - e, p = c.height - h + e / 2);
            isNaN(c.left) || (l = a.getX(c.left) + e, t = -e / 2);
            isNaN(c.right) || (l = a.getX(c.right, !0) - c.width - e, t = c.width - h + e / 2);
            e = b.set();
            e.clipRect(1,
            1, c.width, c.height);
            f.push(e);
            c.rectangleC = e;
            d.translate(l, k);
            m.translate(t, p);
            g.translate(t, p);
            f.mouseup(function () {
                c.handleMouseUp()
            });
            c.drawRectangle()
        } else AmCharts.remove(c.allSet), AmCharts.remove(c.downButtonSet), AmCharts.remove(c.upButtonSet)
    },
    minimize: function () {
        this.downButtonSet.hide();
        this.upButtonSet.show();
        this.allSet.hide()
    },
    maximize: function () {
        this.downButtonSet.show();
        this.upButtonSet.hide();
        this.allSet.show()
    },
    buildSVGMap: function () {
        var a = this.chart,
            b = {
                fill: this.mapColor,
                stroke: this.mapColor,
                    "stroke-opacity": 1
            }, c = a.svgData.g.path,
            d = this.container,
            f = d.set();
        AmCharts.setCN(a, f, "small-map-image");
        var e;
        for (e = 0; e < c.length; e++) {
            var g = d.path(c[e].d).attr(b);
            f.push(g)
        }
        this.allSet.push(f);
        b = f.getBBox();
        c = this.size * a.mapScale;
        d = -b.x * c;
        e = -b.y * c;
        var h = g = 0;
        a.centerMap && (g = (this.width - b.width * c) / 2, h = (this.height - b.height * c) / 2);
        this.mapWidth = b.width * c;
        this.mapHeight = b.height * c;
        this.dx = g;
        this.dy = h;
        f.translate(d + g, e + h, c)
    },
    update: function () {
        var a = this.chart,
            b = a.zoomLevel(),
            c = this.width,
            d = a.mapContainer,
            a = c / (a.realWidth * b),
            c = c / b,
            b = this.height / b,
            f = this.rectangle;
        f.translate(-d.x * a + this.dx, -d.y * a + this.dy);
        0 < c && 0 < b && (f.setAttr("width", Math.ceil(c + 1)), f.setAttr("height", Math.ceil(b + 1)));
        this.rWidth = c;
        this.rHeight = b
    },
    drawRectangle: function () {
        var a = this.rectangle;
        AmCharts.remove(a);
        a = AmCharts.rect(this.container, 10, 10, "#000", 0, 1, this.rectangleColor, 1);
        AmCharts.setCN(this.chart, a, "small-map-rectangle");
        this.rectangleC.push(a);
        this.rectangle = a
    },
    handleMouseUp: function () {
        var a = this.chart,
            b = a.zoomLevel();
        a.zoomTo(b, -((a.mouseX - this.set.x - this.dx - this.rWidth / 2) / this.mapWidth) * b, -((a.mouseY - this.set.y - this.dy - this.rHeight / 2) / this.mapHeight) * b)
    }
});
AmCharts.AreasProcessor = AmCharts.Class({
    construct: function (a) {
        this.chart = a
    },
    process: function (a) {
        this.updateAllAreas();
        this.allObjects = [];
        a = a.areas;
        var b = this.chart,
            c, d = a.length,
            f, e, g = 0,
            h = b.svgAreasById,
            k = !1,
            l = !1,
            m = 0;
        for (f = 0; f < d; f++) {
            e = a[f];
            e = e.value;
            if (!1 === k || k < e) k = e;
            if (!1 === l || l > e) l = e;
            isNaN(e) || (g += Math.abs(e), m++)
        }
        isNaN(b.minValue) || (l = b.minValue);
        isNaN(b.maxValue) || (k = b.maxValue);
        b.maxValueReal = k;
        b.minValueReal = l;
        for (f = 0; f < d; f++) e = a[f], isNaN(e.value) ? e.percents = void 0 : (e.percents = (e.value - l) / g * 100, l == k && (e.percents = 100));
        for (f = 0; f < d; f++) {
            e = a[f];
            var n = h[e.id];
            c = b.areasSettings;
            n && n.className && (g = b.areasClasses[n.className]) && (c = g, c = AmCharts.processObject(c, AmCharts.AreasSettings, b.theme));
            var t = c.color,
                p = c.alpha,
                z = c.outlineThickness,
                y = c.rollOverColor,
                v = c.selectedColor,
                B = c.rollOverAlpha,
                A = c.outlineColor,
                w = c.outlineAlpha,
                r = c.balloonText,
                u = c.selectable,
                q = c.pattern,
                x = c.rollOverOutlineColor,
                C = c.bringForwardOnHover,
                F = c.preserveOriginalAttributes;
            this.allObjects.push(e);
            e.chart = b;
            e.baseSettings = c;
            e.autoZoomReal = void 0 == e.autoZoom ? c.autoZoom : e.autoZoom;
            g = e.color;
            void 0 == g && (g = t);
            m = e.alpha;
            isNaN(m) && (m = p);
            p = e.rollOverAlpha;
            isNaN(p) && (p = B);
            isNaN(p) && (p = m);
            B = e.rollOverColor;
            void 0 == B && (B = y);
            y = e.pattern;
            void 0 == y && (y = q);
            q = e.selectedColor;
            void 0 == q && (q = v);
            (v = e.balloonText) || (v = r);
            void 0 == c.colorSolid || isNaN(e.value) || (r = Math.floor((e.value - l) / ((k - l) / b.colorSteps)), r == b.colorSteps && r--, colorPercent = 1 / (b.colorSteps - 1) * r, k == l && (colorPercent = 1), e.colorReal = AmCharts.getColorFade(g, c.colorSolid, colorPercent));
            void 0 != e.color && (e.colorReal = e.color);
            void 0 == e.selectable && (e.selectable = u);
            void 0 == e.colorReal && (e.colorReal = t);
            t = e.outlineColor;
            void 0 == t && (t = A);
            A = e.outlineAlpha;
            isNaN(A) && (A = w);
            w = e.outlineThickness;
            isNaN(w) && (w = z);
            z = e.rollOverOutlineColor;
            void 0 == z && (z = x);
            void 0 == e.bringForwardOnHover && (e.bringForwardOnHover = C);
            void 0 == e.preserveOriginalAttributes && (e.preserveOriginalAttributes = F);
            e.alphaReal = m;
            e.rollOverColorReal = B;
            e.rollOverAlphaReal = p;
            e.balloonTextReal = v;
            e.selectedColorReal = q;
            e.outlineColorReal = t;
            e.outlineAlphaReal = A;
            e.rollOverOutlineColorReal = z;
            e.outlineThicknessReal = w;
            e.patternReal = y;
            AmCharts.processDescriptionWindow(c, e);
            if (n && (c = n.area, x = n.title, e.enTitle = n.title, x && !e.title && (e.title = x), (n = b.language) ? (x = AmCharts.mapTranslations) && (n = x[n]) && n[e.enTitle] && (e.titleTr = n[e.enTitle]) : e.titleTr = void 0, c)) {
                e.displayObject = c;
                e.mouseEnabled && b.addObjectEventListeners(c, e);
                var D;
                void 0 != g && (D = g);
                void 0 != e.colorReal && (D = e.showAsSelected || b.selectedObject == e ? e.selectedColorReal : e.colorReal);
                c.node.setAttribute("class",
                    "");
                AmCharts.setCN(b, c, "map-area");
                AmCharts.setCN(b, c, "map-area-" + c.id);
                e.preserveOriginalAttributes || (c.setAttr("fill", D), c.setAttr("stroke", t), c.setAttr("stroke-opacity", A), c.setAttr("stroke-width", w), c.setAttr("fill-opacity", m));
                y && c.pattern(y, b.mapScale);
                e.hidden && c.hide()
            }
        }
    },
    updateAllAreas: function () {
        var a = this.chart,
            b = a.areasSettings,
            c = b.unlistedAreasColor,
            d = b.unlistedAreasAlpha,
            f = b.unlistedAreasOutlineColor,
            e = b.unlistedAreasOutlineAlpha,
            g = a.svgAreas,
            h = a.dataProvider,
            k = h.areas,
            l = {}, m;
        for (m = 0; m < k.length; m++) l[k[m].id] = k[m];
        for (m = 0; m < g.length; m++) {
            k = g[m];
            if (b.preserveOriginalAttributes) {
                if (k.customAttr) for (var n in k.customAttr) k.setAttr(n, k.customAttr[n])
            } else void 0 != c && k.setAttr("fill", c), isNaN(d) || k.setAttr("fill-opacity", d), void 0 != f && k.setAttr("stroke", f), isNaN(e) || k.setAttr("stroke-opacity", e), k.setAttr("stroke-width", b.outlineThickness);
            AmCharts.setCN(a, k, "map-area-unlisted");
            if (h.getAreasFromMap && !l[k.id]) {
                var t = new AmCharts.MapArea(a.theme);
                t.parentObject = h;
                t.id = k.id;
                h.areas.push(t)
            }
        }
    }
});
AmCharts.AreasSettings = AmCharts.Class({
    construct: function (a) {
        this.cname = "AreasSettings";
        this.alpha = 1;
        this.autoZoom = !1;
        this.balloonText = "[[title]]";
        this.color = "#FFCC00";
        this.colorSolid = "#990000";
        this.unlistedAreasAlpha = 1;
        this.unlistedAreasColor = "#DDDDDD";
        this.outlineColor = "#FFFFFF";
        this.outlineAlpha = 1;
        this.outlineThickness = .5;
        this.selectedColor = this.rollOverOutlineColor = "#CC0000";
        this.unlistedAreasOutlineColor = "#FFFFFF";
        this.unlistedAreasOutlineAlpha = 1;
        this.descriptionWindowWidth = 250;
        this.adjustOutlineThickness = !1;
        this.bringForwardOnHover = !0;
        AmCharts.applyTheme(this, a, this.cname)
    }
});
AmCharts.ImagesProcessor = AmCharts.Class({
    construct: function (a) {
        this.chart = a;
        this.reset()
    },
    process: function (a) {
        var b = a.images,
            c;
        for (c = 0; c < b.length; c++) this.createImage(b[c], c);
        a.parentObject && a.remainVisible && this.process(a.parentObject)
    },
    createImage: function (a, b) {
        var c = this.chart,
            d = c.container,
            f = c.mapImagesContainer,
            e = c.stageImagesContainer,
            g = c.imagesSettings;
        a.remove && a.remove();
        var h = g.color,
            k = g.alpha,
            l = g.rollOverColor,
            m = g.selectedColor,
            n = g.balloonText,
            t = g.outlineColor,
            p = g.outlineAlpha,
            z = g.outlineThickness,
            y = g.selectedScale,
            v = g.labelPosition,
            B = g.labelColor,
            A = g.labelFontSize,
            w = g.bringForwardOnHover,
            r = g.labelRollOverColor,
            u = g.selectedLabelColor;
        a.index = b;
        a.chart = c;
        a.baseSettings = c.imagesSettings;
        var q = d.set();
        a.displayObject = q;
        var x = a.color;
        void 0 == x && (x = h);
        h = a.alpha;
        isNaN(h) && (h = k);
        void 0 == a.bringForwardOnHover && (a.bringForwardOnHover = w);
        k = a.outlineAlpha;
        isNaN(k) && (k = p);
        p = a.rollOverColor;
        void 0 == p && (p = l);
        l = a.selectedColor;
        void 0 == l && (l = m);
        (m = a.balloonText) || (m = n);
        n = a.outlineColor;
        void 0 == n && (n = t);
        void 0 == n && (n = x);
        t = a.outlineThickness;
        isNaN(t) && (t = z);
        (z = a.labelPosition) || (z = v);
        v = a.labelColor;
        void 0 == v && (v = B);
        B = a.labelRollOverColor;
        void 0 == B && (B = r);
        r = a.selectedLabelColor;
        void 0 == r && (r = u);
        u = a.labelFontSize;
        isNaN(u) && (u = A);
        A = a.selectedScale;
        isNaN(A) && (A = y);
        isNaN(a.rollOverScale);
        a.colorReal = x;
        a.alphaReal = h;
        a.rollOverColorReal = p;
        a.balloonTextReal = m;
        a.selectedColorReal = l;
        a.labelColorReal = v;
        a.labelRollOverColorReal = B;
        a.selectedLabelColorReal = r;
        a.labelFontSizeReal = u;
        a.labelPositionReal = z;
        a.selectedScaleReal = A;
        a.rollOverScaleReal = A;
        AmCharts.processDescriptionWindow(g, a);
        a.centeredReal = void 0 == a.centered ? g.centered : a.centered;
        u = a.type;
        r = a.imageURL;
        B = a.svgPath;
        p = a.width;
        v = a.height;
        g = a.scale;
        isNaN(a.percentWidth) || (p = a.percentWidth / 100 * c.realWidth);
        isNaN(a.percentHeight) || (v = a.percentHeight / 100 * c.realHeight);
        var C;
        r || u || B || (u = "circle", p = 1, k = h = 0);
        l = y = 0;
        A = a.selectedColorReal;
        if (u) {
            isNaN(p) && (p = 10);
            isNaN(v) && (v = 10);
            "kilometers" == a.widthAndHeightUnits && (p = c.kilometersToPixels(a.width), v = c.kilometersToPixels(a.height));
            "miles" == a.widthAndHeightUnits && (p = c.milesToPixels(a.width), v = c.milesToPixels(a.height));
            if ("circle" == u || "bubble" == u) v = p;
            C = this.createPredefinedImage(x, n, t, u, p, v);
            l = y = 0;
            a.centeredReal ? (isNaN(a.right) || (y = p * g), isNaN(a.bottom) || (l = v * g)) : (y = p * g / 2, l = v * g / 2);
            C.translate(y, l, g)
        } else r ? (isNaN(p) && (p = 10), isNaN(v) && (v = 10), C = d.image(r, 0, 0, p, v), C.node.setAttribute("preserveAspectRatio", "none"), C.setAttr("opacity", h), a.centeredReal && (y = isNaN(a.right) ? -p / 2 : p / 2, l = isNaN(a.bottom) ? -v / 2 : v / 2, C.translate(y, l))) : B && (C = d.path(B), n = C.getBBox(), a.centeredReal ? (y = -n.x * g - n.width * g / 2, isNaN(a.right) || (y = -y), l = -n.y * g - n.height * g / 2, isNaN(a.bottom) || (l = -l)) : y = l = 0, C.translate(y, l, g), C.x = y, C.y = l);
        C && (q.push(C), a.image = C, C.setAttr("stroke-opacity", k), C.setAttr("fill-opacity", h), C.setAttr("fill", x), AmCharts.setCN(c, C, "map-image"), void 0 != a.id && AmCharts.setCN(c, C, "map-image-" + a.id));
        !a.showAsSelected && c.selectedObject != a || void 0 == A || C.setAttr("fill", A);
        x = null;
        void 0 !== a.label && (x = AmCharts.text(d, a.label, a.labelColorReal, c.fontFamily,
        a.labelFontSizeReal, a.labelAlign), AmCharts.setCN(c, x, "map-image-label"), void 0 !== a.id && AmCharts.setCN(c, x, "map-image-label-" + a.id), C = a.labelBackgroundAlpha, (h = a.labelBackgroundColor) && 0 < C && (k = x.getBBox(), d = AmCharts.rect(d, k.width + 16, k.height + 10, h, C), AmCharts.setCN(c, d, "map-image-label-background"), void 0 != a.id && AmCharts.setCN(c, d, "map-image-label-background-" + a.id), q.push(d), a.labelBG = d), a.imageLabel = x, q.push(x), AmCharts.setCN(c, q, "map-image-container"), void 0 != a.id && AmCharts.setCN(c, q, "map-image-container-" + a.id));
        isNaN(a.latitude) || isNaN(a.longitude) ? e.push(q) : f.push(q);
        q && (q.rotation = a.rotation);
        this.updateSizeAndPosition(a);
        a.mouseEnabled && c.addObjectEventListeners(q, a);
        a.hidden && q.hide()
    },
    updateSizeAndPosition: function (a) {
        var b = this.chart,
            c = a.displayObject,
            d = b.getX(a.left),
            f = b.getY(a.top),
            e = a.image.getBBox();
        isNaN(a.right) || (d = b.getX(a.right, !0) - e.width * a.scale);
        isNaN(a.bottom) || (f = b.getY(a.bottom, !0) - e.height * a.scale);
        var g = a.longitude,
            h = a.latitude,
            e = this.objectsToResize;
        this.allSvgObjects.push(c);
        this.allObjects.push(a);
        var k = a.imageLabel;
        if (!isNaN(d) && !isNaN(f)) c.translate(d, f);
        else if (!isNaN(h) && !isNaN(g) && (d = b.longitudeToCoordinate(g), f = b.latitudeToCoordinate(h), c.translate(d, f, NaN, !0), a.fixedSize)) {
            d = 1;
            if (a.showAsSelected || b.selectedObject == a) d = a.selectedScaleReal;
            e.push({
                image: c,
                scale: d
            })
        }
        this.positionLabel(k, a, a.labelPositionReal)
    },
    positionLabel: function (a, b, c) {
        if (a) {
            var d = b.image,
                f = 0,
                e = 0,
                g = 0,
                h = 0;
            d && (h = d.getBBox(), e = d.y, f = d.x, g = h.width, h = h.height, b.svgPath && (g *= b.scale, h *= b.scale));
            var d = a.getBBox(),
                k = d.width,
                l = d.height;
            "right" == c && (f += g + k / 2 + 5, e += h / 2 - 2);
            "left" == c && (f += -k / 2 - 5, e += h / 2 - 2);
            "top" == c && (e -= l / 2 + 3, f += g / 2);
            "bottom" == c && (e += h + l / 2, f += g / 2);
            "middle" == c && (f += g / 2, e += h / 2);
            a.translate(f + b.labelShiftX, e + b.labelShiftY);
            b.labelBG && b.labelBG.translate(f - d.width / 2 + b.labelShiftX - 9, e + b.labelShiftY - d.height / 2 - 3)
        }
    },
    createPredefinedImage: function (a, b, c, d, f, e) {
        var g = this.chart.container,
            h;
        switch (d) {
            case "circle":
                h = AmCharts.circle(g, f / 2, a, 1, c, b, 1);
                break;
            case "rectangle":
                h = AmCharts.polygon(g, [-f / 2, f / 2, f / 2, -f / 2], [e / 2, e / 2, -e / 2, -e / 2], a, 1, c, b, 1);
                break;
            case "bubble":
                h = AmCharts.circle(g, f / 2, a, 1, c, b, 1, !0)
        }
        return h
    },
    reset: function () {
        this.objectsToResize = [];
        this.allSvgObjects = [];
        this.allObjects = [];
        this.allLabels = []
    }
});
AmCharts.ImagesSettings = AmCharts.Class({
    construct: function (a) {
        this.cname = "ImagesSettings";
        this.balloonText = "[[title]]";
        this.alpha = 1;
        this.borderAlpha = 0;
        this.borderThickness = 1;
        this.labelPosition = "right";
        this.labelColor = "#000000";
        this.labelFontSize = 11;
        this.color = "#000000";
        this.labelRollOverColor = "#00CC00";
        this.centered = !0;
        this.rollOverScale = this.selectedScale = 1;
        this.descriptionWindowWidth = 250;
        this.bringForwardOnHover = !0;
        AmCharts.applyTheme(this, a, this.cname)
    }
});
AmCharts.LinesProcessor = AmCharts.Class({
    construct: function (a) {
        this.chart = a;
        this.reset()
    },
    process: function (a) {
        var b = a.lines,
            c = this.chart,
            d = c.linesSettings,
            f = this.objectsToResize,
            e = c.mapLinesContainer,
            g = c.stageLinesContainer,
            h = d.thickness,
            k = d.dashLength,
            l = d.arrow,
            m = d.arrowSize,
            n = d.arrowColor,
            t = d.arrowAlpha,
            p = d.color,
            z = d.alpha,
            y = d.rollOverColor,
            v = d.selectedColor,
            B = d.rollOverAlpha,
            A = d.balloonText,
            w = d.bringForwardOnHover,
            r = c.container,
            u;
        for (u = 0; u < b.length; u++) {
            var q = b[u];
            q.chart = c;
            q.baseSettings = d;
            var x = r.set();
            q.displayObject = x;
            this.allSvgObjects.push(x);
            this.allObjects.push(q);
            q.mouseEnabled && c.addObjectEventListeners(x, q);
            if (q.remainVisible || c.selectedObject == q.parentObject) {
                var C = q.thickness;
                isNaN(C) && (C = h);
                var F = q.dashLength;
                isNaN(F) && (F = k);
                var D = q.color;
                void 0 == D && (D = p);
                var E = q.alpha;
                isNaN(E) && (E = z);
                var G = q.rollOverAlpha;
                isNaN(G) && (G = B);
                isNaN(G) && (G = E);
                var I = q.rollOverColor;
                void 0 == I && (I = y);
                var T = q.selectedColor;
                void 0 == T && (T = v);
                var R = q.balloonText;
                R || (R = A);
                var L = q.arrow;
                if (!L || "none" == L &&
                    "none" != l) L = l;
                var N = q.arrowColor;
                void 0 == N && (N = n);
                void 0 == N && (N = D);
                var O = q.arrowAlpha;
                isNaN(O) && (O = t);
                isNaN(O) && (O = E);
                var M = q.arrowSize;
                isNaN(M) && (M = m);
                q.alphaReal = E;
                q.colorReal = D;
                q.rollOverColorReal = I;
                q.rollOverAlphaReal = G;
                q.balloonTextReal = R;
                q.selectedColorReal = T;
                q.thicknessReal = C;
                void 0 == q.bringForwardOnHover && (q.bringForwardOnHover = w);
                AmCharts.processDescriptionWindow(d, q);
                var G = this.processCoordinates(q.x, c.realWidth),
                    I = this.processCoordinates(q.y, c.realHeight),
                    K = q.longitudes,
                    R = q.latitudes,
                    J = K.length,
                    P;
                if (0 < J) for (G = [], P = 0; P < J; P++) G.push(c.longitudeToCoordinate(K[P]));
                J = R.length;
                if (0 < J) for (I = [], P = 0; P < J; P++) I.push(c.latitudeToCoordinate(R[P]));
                if (0 < G.length) {
                    AmCharts.dx = 0;
                    AmCharts.dy = 0;
                    K = AmCharts.line(r, G, I, D, 1, C, F, !1, !1, !0);
                    AmCharts.setCN(c, K, "map-line");
                    void 0 != q.id && AmCharts.setCN(c, K, "map-line-" + q.id);
                    F = AmCharts.line(r, G, I, D, .001, 3, F, !1, !1, !0);
                    AmCharts.dx = .5;
                    AmCharts.dy = .5;
                    x.push(K);
                    x.push(F);
                    x.setAttr("opacity", E);
                    if ("none" != L) {
                        var H, Q, S;
                        if ("end" == L || "both" == L) E = G[G.length - 1], D = I[I.length - 1], 1 < G.length ? (J = G[G.length - 2], H = I[I.length - 2]) : (J = E, H = D), H = 180 * Math.atan((D - H) / (E - J)) / Math.PI, Q = E, S = D, H = 0 > E - J ? H - 90 : H + 90;
                        "both" == L && (E = AmCharts.polygon(r, [-M / 2, 0, M / 2], [1.5 * M, 0, 1.5 * M], N, O, 1, N, O), x.push(E), E.translate(Q, S), E.rotate(H), AmCharts.setCN(c, K, "map-line-arrow"), void 0 != q.id && AmCharts.setCN(c, K, "map-line-arrow-" + q.id), q.fixedSize && f.push(E));
                        if ("start" == L || "both" == L) E = G[0], S = I[0], 1 < G.length ? (D = G[1], Q = I[1]) : (D = E, Q = S), H = 180 * Math.atan((S - Q) / (E - D)) / Math.PI, Q = E, H = 0 > E - D ? H - 90 : H + 90;
                        "middle" == L && (E = G[G.length - 1], D = I[I.length - 1], 1 < G.length ? (J = G[G.length - 2], H = I[I.length - 2]) : (J = E, H = D), Q = J + (E - J) / 2, S = H + (D - H) / 2, H = 180 * Math.atan((D - H) / (E - J)) / Math.PI, H = 0 > E - J ? H - 90 : H + 90);
                        E = AmCharts.polygon(r, [-M / 2, 0, M / 2], [1.5 * M, 0, 1.5 * M], N, O, 1, N, O);
                        AmCharts.setCN(c, K, "map-line-arrow");
                        void 0 != q.id && AmCharts.setCN(c, K, "map-line-arrow-" + q.id);
                        x.push(E);
                        E.translate(Q, S);
                        E.rotate(H);
                        q.fixedSize && f.push(E);
                        q.arrowSvg = E
                    }
                    q.fixedSize && K && (this.linesToResize.push({
                        line: K,
                        thickness: C
                    }), this.linesToResize.push({
                        line: F,
                        thickness: 3
                    }));
                    q.lineSvg = K;
                    q.showAsSelected && !isNaN(T) && K.setAttr("stroke", T);
                    0 < R.length ? e.push(x) : g.push(x);
                    q.hidden && x.hide()
                }
            }
        }
        a.parentObject && a.remainVisible && this.process(a.parentObject)
    },
    processCoordinates: function (a, b) {
        var c = [],
            d;
        for (d = 0; d < a.length; d++) {
            var f = a[d],
                e = Number(f);
            isNaN(e) && (e = Number(f.replace("%", "")) * b / 100);
            isNaN(e) || c.push(e)
        }
        return c
    },
    reset: function () {
        this.objectsToResize = [];
        this.allSvgObjects = [];
        this.allObjects = [];
        this.linesToResize = []
    }
});
AmCharts.LinesSettings = AmCharts.Class({
    construct: function (a) {
        this.cname = "LinesSettings";
        this.balloonText = "[[title]]";
        this.thickness = 1;
        this.dashLength = 0;
        this.arrowSize = 10;
        this.arrowAlpha = 1;
        this.arrow = "none";
        this.color = "#990000";
        this.descriptionWindowWidth = 250;
        this.bringForwardOnHover = !0;
        AmCharts.applyTheme(this, a, this.cname)
    }
});
AmCharts.MapObject = AmCharts.Class({
    construct: function (a) {
        this.fixedSize = this.mouseEnabled = !0;
        this.images = [];
        this.lines = [];
        this.areas = [];
        this.remainVisible = !0;
        this.passZoomValuesToTarget = !1;
        this.objectType = this.cname;
        AmCharts.applyTheme(this, a, "MapObject")
    }
});
AmCharts.MapArea = AmCharts.Class({
    inherits: AmCharts.MapObject,
    construct: function (a) {
        this.cname = "MapArea";
        AmCharts.MapArea.base.construct.call(this, a);
        AmCharts.applyTheme(this, a, this.cname)
    }
});
AmCharts.MapLine = AmCharts.Class({
    inherits: AmCharts.MapObject,
    construct: function (a) {
        this.cname = "MapLine";
        this.longitudes = [];
        this.latitudes = [];
        this.x = [];
        this.y = [];
        this.arrow = "none";
        AmCharts.MapLine.base.construct.call(this, a);
        AmCharts.applyTheme(this, a, this.cname)
    }
});
AmCharts.MapImage = AmCharts.Class({
    inherits: AmCharts.MapObject,
    construct: function (a) {
        this.cname = "MapImage";
        this.scale = 1;
        this.widthAndHeightUnits = "pixels";
        this.labelShiftY = this.labelShiftX = 0;
        AmCharts.MapImage.base.construct.call(this, a);
        AmCharts.applyTheme(this, a, this.cname)
    },
    remove: function () {
        var a = this.displayObject;
        a && a.remove();
        (a = this.imageLabel) && a.remove()
    }
});
AmCharts.degreesToRadians = function (a) {
    return a / 180 * Math.PI
};
AmCharts.radiansToDegrees = function (a) {
    return a / Math.PI * 180
};
AmCharts.getColorFade = function (a, b, c) {
    var d = AmCharts.hex2RGB(b);
    b = d[0];
    var f = d[1],
        d = d[2],
        e = AmCharts.hex2RGB(a);
    a = e[0];
    var g = e[1],
        e = e[2];
    a += Math.round((b - a) * c);
    g += Math.round((f - g) * c);
    e += Math.round((d - e) * c);
    return "rgb(" + a + "," + g + "," + e + ")"
};
AmCharts.hex2RGB = function (a) {
    return [parseInt(a.substring(1, 3), 16), parseInt(a.substring(3, 5), 16), parseInt(a.substring(5, 7), 16)]
};
AmCharts.processDescriptionWindow = function (a, b) {
    isNaN(b.descriptionWindowX) && (b.descriptionWindowX = a.descriptionWindowX);
    isNaN(b.descriptionWindowY) && (b.descriptionWindowY = a.descriptionWindowY);
    isNaN(b.descriptionWindowLeft) && (b.descriptionWindowLeft = a.descriptionWindowLeft);
    isNaN(b.descriptionWindowRight) && (b.descriptionWindowRight = a.descriptionWindowRight);
    isNaN(b.descriptionWindowTop) && (b.descriptionWindowTop = a.descriptionWindowTop);
    isNaN(b.descriptionWindowBottom) && (b.descriptionWindowBottom = a.descriptionWindowBottom);
    isNaN(b.descriptionWindowWidth) && (b.descriptionWindowWidth = a.descriptionWindowWidth);
    isNaN(b.descriptionWindowHeight) && (b.descriptionWindowHeight = a.descriptionWindowHeight)
};
AmCharts.MapData = AmCharts.Class({
    inherits: AmCharts.MapObject,
    construct: function () {
        this.cname = "MapData";
        AmCharts.MapData.base.construct.call(this);
        this.projection = "mercator";
        this.topLatitude = 90;
        this.bottomLatitude = -90;
        this.leftLongitude = -180;
        this.rightLongitude = 180;
        this.zoomLevel = 1;
        this.getAreasFromMap = !1
    }
});
AmCharts.DescriptionWindow = AmCharts.Class({
    construct: function () {},
    show: function (a, b, c, d) {
        var f = this,
            e = document.createElement("div");
        e.style.position = "absolute";
        var g = a.classNamePrefix + "-description-";
        e.className = "ammapDescriptionWindow " + g + "div";
        f.div = e;
        b.appendChild(e);
        var h = document.createElement("img");
        h.className = "ammapDescriptionWindowCloseButton " + g + "close-img";
        h.src = a.pathToImages + "xIcon.gif";
        h.style.cssFloat = "right";
        h.onclick = function () {
            f.close()
        };
        h.onmouseover = function () {
            h.src = a.pathToImages +
                "xIconH.gif"
        };
        h.onmouseout = function () {
            h.src = a.pathToImages + "xIcon.gif"
        };
        e.appendChild(h);
        b = document.createElement("div");
        b.className = "ammapDescriptionTitle " + g + "title-div";
        b.onmousedown = function () {
            f.div.style.zIndex = 1E3
        };
        e.appendChild(b);
        d = document.createTextNode(d);
        b.appendChild(d);
        d = b.offsetHeight;
        b = document.createElement("div");
        b.className = "ammapDescriptionText " + g + "text-div";
        b.style.maxHeight = f.maxHeight - d - 20 + "px";
        e.appendChild(b);
        b.innerHTML = c
    },
    close: function () {
        try {
            this.div.parentNode.removeChild(this.div)
        } catch (a) {}
    }
});
AmCharts.ValueLegend = AmCharts.Class({
    construct: function (a) {
        this.cname = "ValueLegend";
        this.enabled = !0;
        this.showAsGradient = !1;
        this.minValue = 0;
        this.height = 12;
        this.width = 200;
        this.bottom = this.left = 10;
        this.borderColor = "#FFFFFF";
        this.borderAlpha = this.borderThickness = 1;
        this.color = "#000000";
        this.fontSize = 11;
        AmCharts.applyTheme(this, a, this.cname)
    },
    init: function (a, b) {
        if (this.enabled) {
            var c = a.areasSettings.color,
                d = a.areasSettings.colorSolid,
                f = a.colorSteps;
            AmCharts.remove(this.set);
            var e = b.set();
            this.set = e;
            AmCharts.setCN(a,
            e, "value-legend");
            var g = 0,
                h = this.minValue,
                k = this.fontSize,
                l = a.fontFamily,
                m = this.color;
            void 0 == h && (h = a.minValueReal);
            void 0 !== h && (g = AmCharts.text(b, h, m, l, k, "left"), g.translate(0, k / 2 - 1), AmCharts.setCN(a, g, "value-legend-min-label"), e.push(g), g = g.getBBox().height);
            h = this.maxValue;
            void 0 === h && (h = a.maxValueReal);
            void 0 !== h && (g = AmCharts.text(b, h, m, l, k, "right"), g.translate(this.width, k / 2 - 1), AmCharts.setCN(a, g, "value-legend-max-label"), e.push(g), g = g.getBBox().height);
            if (this.showAsGradient) c = AmCharts.rect(b,
            this.width, this.height, [c, d], 1, this.borderThickness, this.borderColor, 1, 0, 0), AmCharts.setCN(a, c, "value-legend-gradient"), c.translate(0, g), e.push(c);
            else for (k = this.width / f, l = 0; l < f; l++) m = AmCharts.getColorFade(c, d, 1 * l / (f - 1)), m = AmCharts.rect(b, k, this.height, m, 1, this.borderThickness, this.borderColor, 1), AmCharts.setCN(a, m, "value-legend-color"), AmCharts.setCN(a, m, "value-legend-color-" + l), m.translate(k * l, g), e.push(m);
            d = c = 0;
            f = e.getBBox();
            g = a.getY(this.bottom, !0);
            k = a.getY(this.top);
            l = a.getX(this.right, !0);
            m = a.getX(this.left);
            isNaN(k) || (c = k);
            isNaN(g) || (c = g - f.height);
            isNaN(m) || (d = m);
            isNaN(l) || (d = l - f.width);
            e.translate(d, c)
        } else AmCharts.remove(this.set)
    }
});
AmCharts.ObjectList = AmCharts.Class({
    construct: function (a) {
        this.divId = a
    },
    init: function (a) {
        this.chart = a;
        var b;
        b = this.divId;
        this.container && (b = this.container);
        this.div = b = "object" != typeof b ? document.getElementById(b) : b;
        b = document.createElement("div");
        b.className = "ammapObjectList " + a.classNamePrefix + "-object-list-div";
        this.div.appendChild(b);
        this.addObjects(a.dataProvider, b)
    },
    addObjects: function (a, b) {
        var c = this.chart,
            d = document.createElement("ul");
        d.className = c.classNamePrefix + "-object-list-ul";
        var f;
        if (a.areas) for (f = 0; f < a.areas.length; f++) {
            var e = a.areas[f];
            void 0 === e.showInList && (e.showInList = c.showAreasInList);
            this.addObject(e, d)
        }
        if (a.images) for (f = 0; f < a.images.length; f++) e = a.images[f], void 0 === e.showInList && (e.showInList = c.showImagesInList), this.addObject(e, d);
        if (a.lines) for (f = 0; f < a.lines.length; f++) e = a.lines[f], void 0 === e.showInList && (e.showInList = c.showLinesInList), this.addObject(e, d);
        0 < d.childNodes.length && b.appendChild(d)
    },
    addObject: function (a, b) {
        var c = this;
        if (a.showInList && void 0 !== a.title) {
            var d = c.chart,
                f = document.createElement("li");
            f.className = d.classNamePrefix + "-object-list-li";
            var e = document.createTextNode(a.title),
                g = document.createElement("a");
            g.className = d.classNamePrefix + "-object-list-a";
            g.appendChild(e);
            f.appendChild(g);
            b.appendChild(f);
            this.addObjects(a, f);
            g.onmouseover = function () {
                c.chart.rollOverMapObject(a, !1)
            };
            g.onmouseout = function () {
                c.chart.rollOutMapObject(a)
            };
            g.onclick = function () {
                c.chart.clickMapObject(a)
            }
        }
    }
});