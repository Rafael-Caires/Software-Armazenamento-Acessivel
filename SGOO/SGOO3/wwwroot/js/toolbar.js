﻿/*
 * jscharting.js v3.3.1.20220428
 * (c) 2009-2022 Corporate Web Solutions Ltd.
 * All client side / JavaScript code may not be used in any way without a valid JSCharting license.
 * License holder usage is governed by the license.txt terms included with the distribution.
 * To license JSCharting for your own use, please visit jscharting.com 
 */
'use strict'; (function (d) {
    function p(d, b) { function a() { this.constructor = d } C(d, b); d.prototype = null === b ? Object.create(b) : (a.prototype = b.prototype, new a) } function J(d) { var b = "function" === typeof Symbol && d[Symbol.iterator], a = 0; return b ? b.call(d) : { next: function () { d && a >= d.length && (d = void 0); return { value: d && d[a++], done: !d } } } } function D(d, b) {
        var a = "function" === typeof Symbol && d[Symbol.iterator]; if (!a) return d; d = a.call(d); var c, e = []; try { for (; (void 0 === b || 0 < b--) && !(c = d.next()).done;)e.push(c.value) } catch (g) {
            var h =
                { error: g }
        } finally { try { c && !c.done && (a = d["return"]) && a.call(d) } finally { if (h) throw h.error; } } return e
    } function M() { for (var d = [], b = 0; b < arguments.length; b++)d = d.concat(D(arguments[b])); return d } function N(f) {
        var b, a, c, e = []; f = d.jsLib.map(f, function (a) { return [[a[0], a[1]], [a[0] + a[2], a[1]], [a[0], a[1] + a[3]], [a[0] + a[2], a[1] + a[3]]] }); try {
            for (var h = J(f), g = h.next(); !g.done; g = h.next()) {
                var m = g.value; try {
                    for (var k = (a = void 0, J(m)), l = k.next(); !l.done; l = k.next()) {
                        var n = l.value; e.push(n); var r = d.jsLib.isUndefined(r) ||
                            n[0] < r ? n[0] : r, y = d.jsLib.isUndefined(y) || n[1] < y ? n[1] : y, z = d.jsLib.isUndefined(z) || n[0] > z ? n[0] : z, p = d.jsLib.isUndefined(p) || n[1] > p ? n[1] : p
                    }
                } catch (E) { a = { error: E } } finally { try { l && !l.done && (c = k.return) && c.call(k) } finally { if (a) throw a.error; } }
            }
        } catch (E) { var q = { error: E } } finally { try { g && !g.done && (b = h.return) && b.call(h) } finally { if (q) throw q.error; } } var t = { min: null, max: null }, u = { min: null, max: null }, v = { min: null, max: null }, w = { min: null, max: null }; d.jsLib.each(e, function (a) {
            var c = a[0]; a = a[1]; if (c == r) {
                var e = u; e.min = null ==
                    e.min || a < e.min ? a : e.min; e.max = null == e.max || a > e.max ? a : e.max
            } c == z && (e = v, e.min = null == e.min || a < e.min ? a : e.min, e.max = null == e.max || a > e.max ? a : e.max); a == y && (e = t, e.min = null == e.min || c < e.min ? c : e.min, e.max = null == e.max || c > e.max ? c : e.max); a == p && (e = w, e.min = null == e.min || c < e.min ? c : e.min, e.max = null == e.max || c > e.max ? c : e.max)
        }); q = []; b = [[t.min, y], [t.max, y], [z, v.min], [z, v.max], [w.max, p], [w.min, p], [r, u.max], [r, u.min]]; a = b.length; c = b[0]; for (e = 0; e < a; e++)if (h = b[e], !x || x[0] !== h[0] || x[1] !== h[1]) if (e != a - 1 || c[0] !== h[0] || c[1] !== h[1]) {
            var x =
                h; q.push(h)
        } q.push(c); return q
    } function O(d) { d = d.keyCode; return d === q.Up || d === q.Right || d === q.Down || d === q.Left } function F(f) { var b = f.items, a = f.defaultItem, c = f.itemsBox; c && "vertical" === c.layout && (f.defaultItem = f.defaultItem || {}, f.defaultItem.width = "*"); P(f); b && d.jsLib.eachKey(b, function (c) { var e = b[c]; if (e && !d.jsLib.isString(e)) { var g = e.icon; g && g.path && (g.width = d.jsLib.def(g.width) ? g.width : "auto", g.height = d.jsLib.def(g.height) ? g.height : "auto"); b[c] = a && !0 !== e.ignoreDefault ? d.jsLib.merge({}, a, e) : e; F(b[c]) } }) }
    function P(d) { if (d && d.type) { var b = d.type.split(":"); d.type = b[0]; d.mode || (d.mode = b[1] || null) } } function Q() { d.chartInitializers.toolbar = R; d.chartOptionsAppliers.toolbar = function (d, b, a) { b.isRendered && (b._toolbar.options(d), a.needRefresh = !0) } } function R(f) {
        f.flowEvents.beforeSetUserOptions.on(function (b) { "chart" === b.type && (b = b.owner, b._toolbar = new S(b)) }); f.flowEvents.beforeApplyLayout.on(function (b) {
            if ("chart" === b.type) {
                b = b.owner; var a = b.currentOptions.toolbar || {}, c = d.jsLib.epa(a, ["items", "zoom"]); c &&
                    0 === Object.keys(d.jsLib.omit(c, ["position", "visible"])).length && (a = d.jsLib.cloneDeep(a), delete a.items.zoom); b._toolbar.options(a); b.triggerOptionsApplied("toolbar", b._toolbar)
            }
        }); f.flowEvents.beforeSnapshot.on(function (b) { "chart" === b.type && b.owner._toolbar.visible(!1) }); f.flowEvents.afterSnapshot.on(function (b) { "chart" === b.type && b.owner._toolbar.visible(!0) }); f.flowEvents.beforeOptionsNormalization.on(function (b) { if ("chart" === b.type) { var a = b.owner; b = b.options; a._toolbar && b.toolbar && a._toolbar.normalizeToolbarOptions(b.toolbar) } });
        f.flowEvents.beforeDefaultsApply.on(function (b) { "chart" === b.type && (b.options.toolbar = b.owner._toolbar.defaults()) })
    } var C = function (d, b) { C = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, c) { a.__proto__ = c } || function (a, c) { for (var e in c) c.hasOwnProperty(e) && (a[e] = c[e]) }; return C(d, b) }, K = function (f) { f = f ? f.boxDefaults(1) : d.consts.boxDefaults(1); return { fill: f.fill, radius: 3, padding: [3, 6], visible: !0, boxVisible: !1, animation: !1, outline: f.outline, label: {}, states: { hover: { fill: "rgb(220,220,220)" } } } },
        T = d.jsLib.plainArray(["margin"]), U = d.jsLib.plainArray(["padding", "shape"]), V = d.jsLib.plainArray(["stroke", "stroke-dasharray", "stroke-opacity", "stroke-width"]), G = !1, t = function (f) {
            function b(a, c, e, b) {
                var h = f.call(this, a, c, e) || this; h.target = e; h.parentItem = b; h._itemsVisible = !1; h._itemsBoxVisible = !1; h._itemsBoxHideTimeoutId = null; h._rootPanelShowTimeoutId = null; h._toolbarLocked = !1; h._items = []; h._forceChangeAllow = !1; h._selectedChildItem = null; h._isStackReversed = !1; h._stackedPosition = !1; h._parentVisibility =
                    !0; h.documentClickHandler = function (a) { G = !0; a = a.target; h.rootPanel.isPatched && !h.isDescendant(a, h.rootPanel.el.el) && h.showItems(!1) }; h.documentMoveHandler = function (a) {
                        var c = h.rootVisuals.main; a = c.toRelativeXY(a); var e = [0, 0, c.width.px, c.height.px], b = d.bboxLib.pointInside(e, a), g = function () { !d.jsLib.isNull(h._itemsBoxHideTimeoutId) && clearTimeout(h._itemsBoxHideTimeoutId); h._itemsBoxHideTimeoutId = null }, f = function () { h._itemsBoxHideTimeoutId = setTimeout(function () { h.hideItemsBox() }, 30); return !1 }; b && !h._mainEntered &&
                            h.mainEnterHandler(); !b && h._mainEntered && h.mainAreaLeaveHandler(); h._mainEntered = b; if (h._focusObtained || !h._itemsVisible || b) return g(); b = h.rootVisuals.itemsBox; c = [b.globalX - c.globalX, b.globalY - c.globalY, b.width.px, b.height.px]; if (d.bboxLib.pointInside(c, a)) return g(); c = N([e, c]); return d.trigLib.pointInsidePolygon(a, c) ? g() : f()
                    }; h.mainEnterHandler = function () {
                        h.chart.hideTooltip(); !1 !== h.currentOptions.expandOnHover && (h.stopShowItems(), h._rootPanelShowTimeoutId = setTimeout(function () { h.showItemsWithCheck(!0) },
                            100))
                    }; h.mainAreaLeaveHandler = function () { h._toolbarLocked && h.rootVisuals.main.hover(!0); h.stopShowItems() }; h.initFP(); return h
            } p(b, f); b.prototype.selectedChildItem = function () { return this._selectedChildItem }; b.prototype.itemsVisible = function () { return this._itemsVisible }; b.prototype.children = function () { return this._items }; b.prototype.initFP = function () {
                var a = this, c = function (a, b) { d.jsLib.each(a._items, function (a) { c(a, b); b.push(a) }) }; a.items = d.collectionPropFactory(d.UpdatablesCollection, function () {
                    var e =
                        []; c(a, e); return e
                }, function (c) { var e = a.items().items; d.jsLib.each(e, function (a) { return a.destroy() }); d.jsLib.each(c, function (c) { return a.addChildren(c) }); a.refresh() }, {
                    push: function (c, b) { c.push ? d.jsLib.each(c, function (c) { return a.addChildren(c) }) : a.addChildren(c); a.refresh() }, splice: function (c, b, g, f) {
                        f = a.items().items; var e = f[c].parentItem, h = [], m = e._items.indexOf(f[c]); g = g || []; for (var r = c; r < c + b; r++)h.push(f[r]); d.jsLib.each(h, function (a) { return a.destroy() }); d.jsLib.each(g, function (a) {
                            return e.addChildren(a,
                                m++)
                        }); a.refresh()
                    }, remove: function (c) { (c = a.items(c)) && c.remove() }
                })
            }; b.prototype.select = function (a) { this.rootVisuals.main.select(a) }; b.prototype.hover = function (a) { this.rootVisuals.main.hover(a) }; b.prototype.refresh = function () { (this.rootVisuals ? this.rootVisuals.main : this.chart.rootVisuals.uiItemsFront).isPatched && this.chart.chartAreaSet.reflow(d.undefVal, !1, !0) }; b.prototype.value = function (a) { if (d.jsLib.isUndefined(a)) return this.getValue(); this.setValue(a); return this }; b.prototype.getValue = function () {
                var a =
                    this._value; return d.jsLib.def(a) ? a : this.key
            }; b.prototype.setValue = function (a) { this._value = this.currentOptions.value = a }; b.prototype.defaultOptions = function () { var a = d.jsLib.merge(d.annotationDefaults(this.chart), K(this.chart)), c = this.userOptions; return !d.jsLib.evalPath(c, "itemsBox.visible") && d.jsLib.evalPath(c, "label.text") && c.items ? d.jsLib.merge(a, { icon: { name: "system/default/expand-more", xAlignment: "right", fill: "rgb(123,123,123)" }, itemsBox: { boxVisible: !1 } }) : a }; b.prototype.normalizeOptions = function (a) {
                a =
                f.prototype.normalizeOptions.call(this, a); var c = a.items; if (d.jsLib.isString(c)) { var e = {}, b = function (a) { return e[a.trim()] = {} }; 0 === c.indexOf("enum_") ? (c = d.miUtils.getApiEnum(c.replace("enum_", ""))) && d.jsLib.eachKey(c.members, b) : d.jsLib.each(c.split(","), b); a.items = e } return a
            }; b.prototype.setRootVisuals = function () { f.prototype.setRootVisuals.call(this); var a = this.rootPanel; this.rootVisuals.main || this.createVisuals(); a.attr({ transition: !1 }); return this }; b.prototype.fillEventActions = function () {
                var a = this;
                return { showItems: function (c, e, b) { if (!a.hasItems) return !0; if (!a._toolbarLocked) return !a._itemsVisible && a.showItems(), a._toolbarLocked = !0, !1; c = a.chart.rootPanel.events.vclick; !G && c && c.trigger({ el: b.el, eventArgs: { target: b.el.el, clientX: 0, clientY: 0 } }); G = !1; a.showItems(); return !1 } }
            }; b.prototype.createVisual = function () { return this.renderer.button() }; b.prototype.createContentVisual = function (a) { return null }; b.prototype.createMainVisual = function (a) { return this.renderer.button() }; b.prototype.getRole = function () {
                return this.currentOptions.description ?
                    "UiItem" : null
            }; b.prototype.getDescription = function () { return this.currentOptions.description }; b.prototype.createVisuals = function () {
                var a = this, c = a.rootPanel, e = a.rootVisuals, b = a.currentOptions, g = b.items, f = a.renderer, k = e.main = a.createMainVisual(a.chart); k.on("mouseenter", function (c) { a.chart.chartAreas().each(function (a) { return a.mouseOut(c) }) }); a.hasItems = !d.jsLib.isEmpty(g); if (a.hasItems) {
                    b = a._stackedPosition = !0 === d.jsLib.evalPath(b, "itemsBox.visible"); var l = a.chart.rootVisuals.uiItemsFront; b ? (l = e.mainStack =
                        f.panel({ type: "stack:y", yContentAlignment: "center", xContentAlignment: "center" }).add(c), k.add(l)) : k.add(c); c = a.createItemsBox(l); a.createUiItems(g); d.jsLib.evalPath(a.currentOptions, "itemsBox.visible") ? (a._itemsBoxVisible = !0, a._itemsVisible = !0, a._toolbarLocked = !0, a.updateChildrenVisibility(!0)) : (c.visible(!1, !0), a.updateChildrenVisibility(!1), a.subscribeEvents())
                } else k.add(c)
            }; b.prototype.createItemsBox = function (a) {
                var c = this.rootVisuals, e = this.renderer, b = this.currentOptions; a = c.itemsBox = e.box().add(a);
                c.itemsStack = e.panel({ type: "stack", orientation: this.toOrientation(b.itemsBox), width: "100%", yContentAlignment: "center", xContentAlignment: "center" }).add(a); return a
            }; b.prototype.createUiItems = function (a, c) {
                void 0 === c && (c = !1); var e = this, b = [], g = function (a, c) { for (var e = d.jsLib.def(c.order) ? c.order : 0, h = 0, g = 0; g < b.length && !(b[g].order > e); g++)h = g + 1; b.splice(h, 0, { key: a, value: c, order: e }) }; d.jsLib.isArray(a) ? d.jsLib.each(a, function (c, e) { return g(c, a[e]) }) : d.jsLib.eachKey(a, function (c) { return g(c, a[c]) }); d.jsLib.each(b,
                    function (a) { return e.createUiItem(a.key, a.value, c) })
            }; b.prototype.createUiItem = function (a, c, e, b) {
                void 0 === e && (e = !1); if (c) {
                    var h = this.currentOptions, f = this.rootVisuals && this.rootVisuals.itemsStack ? this.rootVisuals.itemsStack : this.chart.rootVisuals.uiItemsFront; if (!c.exclude && !1 !== c.enable && (e || !1 !== c.visible)) return d.jsLib.isObject(c) || (c = { label_text: c.toString() }), c = d.jsLib.merge({}, { events: { click: "showItems" } }, c), c = d.jsLib.merge({}, !0 === c.ignoreDefault ? {} : h.defaultItem, c), c.actions = d.jsLib.extend(h.actions,
                        c.actions), c.key = a, h = this.chart, e = c.type, e && d.jsLib.has(w, e) || (e = (e = c.defaultItem) && e.type, e = (d.jsLib.has(w, e) ? w[e][2] : null) || "default", c.type = e), e = w[e], b = (new (e ? e[0] : t)(h, void 0, void 0, this)).options(e && e[1] ? e[1](c) : c).add(f, b), b.key = a, this._items.push(b), b
                }
            }; b.prototype.addChildren = function (a, c) { var e = this.userOptions.items; if (c = this.createUiItem(a.key, a, !1, c)) e[c.key] = a, c.options(a), c.updateParentVisibility(this.isVisible && this._itemsBoxVisible) }; b.prototype.removeChildren = function (a) {
                var c = this._items,
                e = this.userOptions.items; c.splice(c.indexOf(a), 1); e && delete e[a.key]
            }; b.prototype.remove = function () { var a = this.parentItem || this; this.destroy(); a.refresh() }; b.prototype.destroy = function () { var a = this.rootVisuals, c = this.chart.renderer.renderer.documentElement; c.un("vmove", this.documentMoveHandler); c.un("vclick", this.documentClickHandler); this.parentItem && this.parentItem.removeChildren(this); d.jsLib.each(this._items, function (a) { return a.destroy() }); this._items = []; a.itemsBox && a.itemsBox.destroy(); f.prototype.destroy.call(this) };
            b.prototype.activateAccessibility = function (a, c) { this._needFocusActivation = a; this.activateFocus(a, c) }; b.prototype.applyOptions = function (a) {
                void 0 === a && (a = {}); if (!1 === a) return this; var c = this.currentOptions, e = this.userOptions, b = this.rootVisuals, g = b.itemsStack, m = b.itemsBox, k = d.jsLib.copy(c.itemsBox), l = !1 !== e.boxVisible, n = e.itemsBox && e.itemsBox.visible; if (this.hasItems && k) {
                    this.correctItemAttrs(k.key, k); !1 === k.boxVisible && (k.fill = "none", k.stroke = "none"); m.attr(k); if (d.jsLib.def(k.visible)) {
                        var r = k.visible;
                        this._toolbarLocked = this._itemsVisible = this._itemsBoxVisible = r; m.visible(r, !0); this.updateChildrenVisibility(r)
                    } m = { orientation: this.toOrientation(k) }; k.verticalAlign && (m.yContentAlignment = k.verticalAlign); k.align && (m.xContentAlignment = k.align); g.attr(m)
                } f.prototype.applyOptions.call(this, a); b = b.main; g = d.jsLib.extendCopyScopedNegate({}, c, T); k = this._eventActions = this._eventActions || this.fillEventActions(); c.actions && d.jsLib.extend(k, c.actions); this.correctItemAttrs(g.key, g, !0); k = d.jsLib.evalPath(g,
                    "text.val"); d.jsLib.def(k) || (k = g.icon && !g.icon.ingorableForText ? null : g.key, g.text = g.text || {}); this.text = k; g.text.val = this.processTokens(k) || this.currentOptions.placeholder || ""; l || (g.fill = "none", g.stroke = "none", k = !d.jsLib.isEmpty(this.currentOptions.items), d.jsLib.evalPath(g, "events.click") && ("default" !== g.type || k) || (g.cursor = "default"), g.padding = 0, m = g.states = g.states || {}, k = m.hover = m.hover || {}, k.fill = "none", k.stroke = "none"); "label" === g.type && n && (g.cursor = "default"); l && (g.boxVisible = !0, d.jsLib.extend(g,
                        d.stylingLib.boxToLayoutBoxAttr(g)), k = (m = g.states) && m.hover, l = m && m.select, k && d.jsLib.extend(k, d.stylingLib.boxToLayoutBoxAttr(k)), l && d.jsLib.extend(l, d.stylingLib.boxToLayoutBoxAttr(l))); b.attr(g); d.jsLib.has(c, "value") ? (this._denyTriggerEvents = !0, this.value(c.value), this._denyTriggerEvents = !1, delete e.value) : d.jsLib.def(this.currentOptions.value) || (this.currentOptions.value = this.getValue()); !0 !== a.skipReflow && this.refresh(); this.activateFocus(this._focusActivated, this._tabIndex); return this
            }; b.prototype.change =
                function () { var a = this._denyTriggerEvents; this._denyTriggerEvents = !1; this._forceChangeAllow = !0; this.value(this.value()); this._denyTriggerEvents = a; this._forceChangeAllow = !1; return this }; b.prototype.completeUserOptions = function () { return this.userOptions }; b.prototype.triggerOptionsApplied = function () { this.chart.triggerOptionsApplied("uiitem", this) }; b.prototype.transformRootAttr = function (a) { return d.jsLib.extendCopyScopedNegate({ "stroke-width": 0 }, a, U) }; b.prototype.positionApplied = function (a) {
                    var c = this;
                    if (c.hasItems) {
                        var e = c.currentOptions.itemsBox || {}, b = e.position; if (a && a[2]) { var g = a[2] - 30; d.jsLib.each(c._items, function (c) { c.rootVisuals.main.attr({ maxWidth: g }); c.positionApplied(a) }) } if (c._stackedPosition) c.updateStackedPosition(b || "bottom"); else {
                            var f = function () {
                                var a = D(d.cachedPositionInfo(c), 2); if (a[0]) return "bottomLeft"; var e = D(a[1], 4); a = e[3]; e = "b" === e[2] ? "top" : "bottom"; if ("bottom" === e) {
                                    var b = c.rootVisuals.main.getGlobalBbox(); b = b.y + b.height; var h = c.chart.rootVisuals.uiItemsFront.height.px,
                                        g = l.height.px; e = b > h / 2 && b + g > h ? "top" : e
                                } "l" === a && (e += "Left"); "r" === a && (e += "Right"); return e
                            }, k = c.rootVisuals; e = d.jsLib.parseMargin(e.margin); var l = k.itemsBox; b = b && "none" !== b ? b : f(); b = W(b, e); l.state.needRecalculation && l.update(); l.attr(d.getAlignToOffsets(l, k.main, b[0][0], b[0][1], b[2]))
                        }
                    }
                }; b.prototype.updateStackedPosition = function (a) {
                    var c = this.currentOptions; a = a.toLowerCase(); var e = -1 < a.indexOf("right"), b = -1 < a.indexOf("left"); a = -1 < a.indexOf("top"); a = d.jsLib.has(c, "reversed") ? c.reversed : b || a; var g = d.jsLib.detect(["orientation",
                        "layout"], c) ? this.toOrientation(c) : b || e ? "x" : "y"; e = a !== this._isStackReversed; b = this.rootVisuals.mainStack; g = { xContentAlignment: c.align || "center", orientation: g }; c.verticalAlign && (g.yContentAlignment = c.verticalAlign); b.attr(g); e && (this._isStackReversed = a, b.reverse())
                }; b.prototype.toOrientation = function (a) { return a ? a.orientation ? a.orientation : a.layout && "vertical" === a.layout ? "y" : "x" : "x" }; b.prototype.showItemsWithCheck = function (a) { this._toolbarLocked || this.showItems(a) }; b.prototype.showItems = function (a) {
                    var c =
                        this.rootVisuals, e = c.main, b = c.itemsBox; !this._itemsBoxVisible && this.hasItems && (this._toolbarLocked = !1, a = d.jsLib.def(a) ? a : !this._itemsVisible, c.mouseArea && c.mouseArea.attr({ fill: a ? "white" : "none" }), this._itemsVisible = a, b.visible(a, !0), e.hover(a), this.select(a), b.isPatched && b.patch())
                }; b.prototype.subscribeEvents = function () { var a = this.chart.renderer.renderer.documentElement; a.on("vmove", this.documentMoveHandler); a.on("vclick", this.documentClickHandler) }; b.prototype.visible = function (a) {
                    var c = this.rootVisuals.itemsBox,
                    e = f.prototype.visible.call(this, a); this._itemsBoxVisible && (c.visible(this.isVisible), this.updateChildrenVisibility(this.isVisible)); a ? this._needFocusActivation && this.activateFocus(this._needFocusActivation, this._tabIndex) : this.activateFocus(!1); return e
                }; b.prototype.activateFocus = function (a, c) { this._tabIndex = c; this.skipFocusActivation(a) || (this.subscribeUiItemEvents(a), this.subscribeDocEvents(a), this._focusActivated = a) }; b.prototype.skipFocusActivation = function (a) {
                    return a === this._focusActivated &&
                        a !== this._ownVisibility ? !0 : !1
                }; b.prototype.subscribeUiItemEvents = function (a) { var c = this; c.rootPanel.useMainElementForEvents(!0); a && c._ownVisibility ? (c.rootPanel.attr({ tabindex: c.currentOptions.tabIndex || c._tabIndex, role: c.getRole(), "aria-label": c.getDescription() }), c.rootPanel.on("vchangefocus", function (a) { c.focusObtained(a.eventArgs.hasFocus) })) : (c.rootPanel.attr({ tabindex: null, role: null, "aria-label": null }), c.rootPanel.un("vchangefocus")); c.rootPanel.useMainElementForEvents(!1) }; b.prototype.subscribeDocEvents =
                    function (a) { var c = this, b = c.chart.renderer.renderer.documentElement; a ? (c._keyUpHandler || c._keyDownHandler || (c._keyUpHandler = function (a) { c.keyUpHandler(a) }, c._keyDownHandler = function (a) { c.keyDownHandler(a) }), b.on("keydown", c._keyDownHandler), b.on("keyup", c._keyUpHandler)) : c._keyUpHandler && c._keyDownHandler && (b.un("keydown", c._keyDownHandler), b.un("keyup", c._keyUpHandler)) }; b.prototype.vkeyEnterHandler = function () {
                        this._selectedChildItem ? (this._selectedChildItem.rootVisuals.main.click(), this.unselectChildItem(),
                            this.hover(!this.currentOptions.normalStateOnItemSelect), this.rootPanel.el.el.focus(), this.showItems(!1), this._childItemEnterPressed = !0) : (this.rootVisuals.main.click(), this.hover(this.hoverOnEnter()), this.currentOptions.autoSelectFirstItem && this.selectChildItem(!0))
                    }; b.prototype.hoverOnEnter = function () { return d.jsLib.def(this.currentOptions.hoverOnEnter) ? this.currentOptions.hoverOnEnter : !0 }; b.prototype.focusObtained = function (a) {
                        if (this._focusObtained = a) this.unselectChildItem(), clearTimeout(this._keyUpTimeoutId);
                        this._items && this._items.length && (this._childItemEnterPressed ? this._childItemEnterPressed = !1 : this.showItemsWithCheck(a))
                    }; b.prototype.afterChildItemSelected = function (a) { }; b.prototype.selectChildItem = function (a, c) {
                        if (this._items && this._items.length) {
                            clearTimeout(this._keyUpTimeoutId); var b = 0; this._selectedChildItem && (b = this._items.indexOf(this._selectedChildItem), a ? b++ : b--, b >= this._items.length ? b = 0 : 0 > b && (b = this._items.length - 1), this.unselectChildItem()); this._selectedChildItem = this.items(b); this._selectedChildItem.hover(!0);
                            a = this._selectedChildItem.rootVisuals.main.el; a.attr({ tabindex: this._tabIndex }); c || a.el.focus(); this.afterChildItemSelected(this._selectedChildItem)
                        }
                    }; b.prototype.unselectChildItem = function () { this._selectedChildItem && (this._selectedChildItem.hover(!1), this._selectedChildItem.rootVisuals.main.el.attr({ tabindex: null }), this._selectedChildItem = null) }; b.prototype.keyUpHandler = function (a) {
                        var c = this.currentOptions, b = c.invertKeys; c = c.multiple; a = a.keyCode; if (this._focusObtained || this._selectedChildItem) if (a ===
                            q.Enter) this.vkeyEnterHandler(); else if (this.itemsVisible() || !c) if (a === q.Esc) this.showItems(!1), this.hover(!this.currentOptions.normalStateOnItemSelect), this.unselectChildItem(); else { this._toolbarLocked = !0; c = q.Right; var h = q.Up, d = q.Left, f = q.Down; b && (c = q.Left, h = q.Down, d = q.Right, f = q.Up); a === c || a === h ? this.selectChildItem(!1) : a !== d && a !== f || this.selectChildItem(!0) }
                    }; b.prototype.keyDownHandler = function (a) {
                        var c = this, b = a.keyCode; c._itemsVisible && (b === q.Tab ? c._keyUpTimeoutId = setTimeout(function () {
                            c._focusObtained ||
                            (c._toolbarLocked = !1, c.unselectChildItem(), c.showItemsWithCheck(!1))
                        }, 150) : O(a) && a.preventDefault())
                    }; b.prototype.updateChildrenVisibility = function (a) { var c = a && this._itemsBoxVisible; d.jsLib.each(this._items, function (a) { a.updateParentVisibility(c); a.updateChildrenVisibility(c) }) }; b.prototype.updateParentVisibility = function (a) { this.isVisible = (this._parentVisibility = a) && this._ownVisibility }; b.prototype.setVisible = function (a) { this._ownVisibility = a; this.isVisible = this._parentVisibility && this._ownVisibility };
            b.prototype.isDescendant = function (a, c) { for (a = a.parentNode; a;) { if (a === c) return !0; a = a.parentNode } return !1 }; b.prototype.stopShowItems = function () { this._rootPanelShowTimeoutId && (clearTimeout(this._rootPanelShowTimeoutId), this._rootPanelShowTimeoutId = null) }; b.prototype.hideItemsBox = function () { this.stopShowItems(); this.showItemsWithCheck(!1) }; b.prototype.processTokens = function (a) { return a }; b.prototype.correctItemAttrs = function (a, c, b, h) {
                d.jsLib.has(c, "icon") && this.correctIcon(c, b, h); d.jsLib.has(c, "label") &&
                    this.correctLabel(c); d.jsLib.has(c, "outline") && this.correctOutline(c); d.jsLib.has(c, "events") && this.correctEvents(a, c.events, b); b && (c.states = this.correctStates(a, c)); d.jsLib.has(c, "tooltip") && (c.title = c.tooltip)
            }; b.prototype.correctOutline = function (a) { var c = a.outline; "none" === c.color ? (a.stroke = "none", a["stroke-width"] = 0) : d.jsLib.extendScoped(a, d.stylingLib.lineToAttr(c), V) }; b.prototype.correctIcon = function (a, c, b) {
                var e = a.icon; if (!e || "none" === e) return null; d.jsLib.isString(e) && (e = { name: e }); if (c || !b.icon) e =
                    d.jsLib.merge(e.path ? { width: "auto", height: "auto", outerShape: "none", fill: "#727272" } : { width: 16, height: 16, outerShape: "none", fill: "#727272" }, e), c || (b.icon = null); a.icon = d.jsLib.extend(e, d.stylingLib.shapeToAttr(e))
            }; b.prototype.correctLabel = function (a) { var c = a.label; if (c) { if (d.jsLib.isString(c)) { var b = c; c = {} } else c = d.stylingLib.labelToAttr(c), b = d.jsLib.evalPath(a, "label.text"); b = this.evalText(b); d.jsLib.def(b) && (c.val = b); a.text = c } else a.text = null }; b.prototype.correctEvents = function (a, c, b) {
                var e = this, g =
                    e._eventActions; d.jsLib.eachKey(c, function (a) { var b = c[a]; d.jsLib.has(g, b) && (c[a] = g[b]); var h = c[a]; c[a] = function (a) { return h.call(e, e.value(), e, a) } })
            }; b.prototype.correctStates = function (a, c) { var b = this, h = {}, g = c.states; d.jsLib.eachKey(g, function (e) { var d = g[e]; d && "none" !== d ? (b.correctItemAttrs(a, d, !1, c), h[e] = d) : g[e] = null }); return h }; return b
        }(d.Annotation), X = d.jsLib.plainArray(["radio", "option"]), u = function (f) {
            function b() { return null !== f && f.apply(this, arguments) || this } p(b, f); b.prototype.defaultOptions =
                function () { var a = this.userOptions; d.jsLib.def(a.boxVisible) && (this._boxVisible = a.boxVisible) && delete a.boxVisible; d.jsLib.def(this._value) && "boolean" === typeof this._value || (this._value = !1); return d.jsLib.merge(f.prototype.defaultOptions.call(this), this._boxVisible ? {} : { outline: { color: "none" }, fill: "none", padding: [0], margin: [0], radius: 0, states: { hover: { fill: "none" } } }) }; b.prototype.createMainVisual = function () { var a = this.currentOptions; return this.renderer.button({ type: a.type, triggerSelectIfFalse: a.triggerSelectIfFalse }) };
            b.prototype.setValue = function (a) { var c = this.getValue(); f.prototype.setValue.call(this, a); (this._forceChangeAllow || c !== a) && this.rootVisuals.main.select(a, this._forceChangeAllow) }; b.prototype.correctEvents = function (a, c, b) {
                var e = this; if (b) { var g = c.change; c.change = function (a, c, b) { a = b.isSelected; f.prototype.setValue.call(e, a); g && (!c || !c._denyTriggerEvents && c.chart.inited) && g.call(c, a, c, b); d.jsLib.epa(c, ["parentItem", "itemChanged"]) && c.parentItem.itemChanged(a, c, b) } } f.prototype.correctEvents.call(this,
                    a, c, b)
            }; return b
        }(t), Y = {
            simple: function () { return { outline: { color: "none" }, fill: "none", cursor: "default", margin: 1, padding: [0], align: "left", states: { hover: { fill: "none" } }, defaultItem: { events: {} }, itemsBox: { outline: { color: "none" }, fill: "none", layout: "vertical", align: "left" } } }, dropdown: function () {
                return {
                    padding: [1], margin: 1, fill: "rgb(255,255,255)", outline: { color: "rgb(123,123,123)" }, radius: 2, corners: "round", align: "left", autoWrap: "none", expandOnHover: !1, label: { text: "%value", style: { textOverflow: "ellipsis", autoWrap: "none" } },
                    icon: { ingorableForText: !0, name: "system/default/expand-more", width: 14, height: 14, xAlignment: "right", fill: "#a5a5a5" }, states: { hover: { outline: { color: "#7ba8e5" }, fill: "#eff8ff" } }, itemsBox: { margin: [-1, 0, 0, 0], fill: "rgb(255,255,255)", layout: "vertical", align: "left", outline: { color: "rgb(123,123,123)" } }, defaultItem: {
                        margin: [0], height: 18, autoWrap: "none", label: { color: "rgb(0,0,0)", style: { fontWeight: "normal", textOverflow: "ellipsis", autoWrap: "none" } }, outline: { width: 1, color: "rgb(255,255,255)" }, icon: {
                            ingorableForText: !0,
                            name: "none"
                        }, events: {}, states: { hover: { fill: "rgb(144,144,144)", label: { color: "rgb(255,255,255)" }, outline: { width: 1, color: "rgb(144,144,144)" } }, select: { icon: { name: "system/default/check", width: 14, height: 14, xAlignment: "right", fill: "rgb(123,123,123)" } } }
                    }
                }
            }
        }, v = function (f) {
            function b() { return null !== f && f.apply(this, arguments) || this } p(b, f); b.prototype.showItems = function (a) { var c = this.rootVisuals.scroll; !this.itemsVisible() && a && c.moveVerticalSliderToPosition(0); return f.prototype.showItems.call(this, a) }; b.prototype.afterChildItemSelected =
                function (a) { var c = this.rootVisuals, b = c.scroll, d = b.globalY; c = c.scroll.height.px; var g = a.rootVisuals.main; a = g.globalY; g = g.height.px; this.itemsVisible() && (c = a + g - (d + c), 0 < c && b.increaseVerticalScrollPosition(c), c = a - g - d, 0 > c && b.increaseVerticalScrollPosition(c)) }; b.prototype.createItemsBox = function (a) {
                    var c = this, b = c.rootVisuals, d = c.renderer, g = c.currentOptions; a = b.itemsBox = d.box({ zIndex: 2 }).add(a); b.scroll = d.panel({
                        type: "scroll", width: "100%", height: g.scrollPanelHeight, scrollBarWidth: g.scrollBarWidth || "6px",
                        frontPanel: c.chart.rootVisuals.uiItemsFront
                    }).add(a); b.scroll.scrollHandler(function (a) { a || c.rootPanel.el.el.focus(); c._scrolling = a }); b.itemsStack = d.panel({ type: "stack", orientation: c.toOrientation(g.itemsBox), width: "100%", yContentAlignment: "center", xContentAlignment: "center" }).add(b.scroll); return a
                }; b.prototype.focusObtained = function (a) { !a && this._scrolling || f.prototype.focusObtained.call(this, a) }; b.prototype.positionApplied = function (a) {
                    f.prototype.positionApplied.call(this, a); var c = this.userOptions,
                        b = this.rootVisuals.itemsBox; this.rootVisuals.scroll.checkAddScroll() && f.prototype.positionApplied.call(this, a); "*" === d.jsLib.evalPath(c, "itemsBox.width") && (a = this.rootPanel.getBbox().width, d.jsLib.setPathVal(c, "itemsBox.width", a), b.attr({ width: a }))
                }; return b
        }(function (f) {
            function b() { var a = null !== f && f.apply(this, arguments) || this; a._singleSelection = !0; a._hideAfterSelect = !1; a._selectedItems = {}; return a } p(b, f); b.prototype.vkeyEnterHandler = function () {
                this.selectedChildItem() && !this._hideAfterSelect &&
                this.showItems(!1); f.prototype.vkeyEnterHandler.call(this)
            }; b.prototype.defaultOptions = function () { var a = this.userOptions, c = d.jsLib.evalPath(a, "defaultItem.type"); c = this._theme = !c || "radio" !== c && "checkbox" !== c && "toggle" !== c && "button" !== c ? "dropdown" : "simple"; var b = d.jsLib.merge(d.annotationDefaults(), K(), Y[c]()); a.multiple && (b.defaultItem.multiple = !0); "dropdown" === c && d.jsLib.evalPath(a, "itemsBox.visible") && (b.icon = null); return b }; b.prototype.selectChildItem = function (a) {
                var c = this.currentOptions.multiple,
                b = d.jsLib.keys(this._selectedItems)[0]; c || this._selectedChildItem || this.itemsVisible() || (this._selectedChildItem = this._selectedItems[b]); f.prototype.selectChildItem.call(this, a, !this.itemsVisible()); this._selectedChildItem && !this.itemsVisible() && (this._selectedChildItem.rootVisuals.main.click(), this.unselectChildItem(), this.hover(!0))
            }; b.prototype.checkForAutoSize = function () {
                this._autoSized = !0; if ("dropdown" === this._theme) {
                    var a = this.userOptions, c = this.rootVisuals, b = this.rootPanel, h = c.main; c = c.itemsBox;
                    var g = d.jsLib.evalPath(a, "itemsBox.width"), f = a.width; if (!f) {
                        var k = []; g ? k.push(g) : d.jsLib.each(this._items, function (a) { k.push(a.rootVisuals.main.textVisual.setPreliminarySize().getBbox().width + 40) }); b.setPreliminarySize().getBbox(); if ((f = d.jsLib.evalPath(a, "label.text")) && -1 < f.indexOf("%value")) {
                            var l = "", n = 0; d.jsLib.each(this._items, function (a) { a = a.text || ""; a.length > n && (l = a, n = a.length) }); var r = f.replace("%value", l); f = h.textVisual; var p = f.val(); f.val(r); r = f.setPreliminarySize().getBbox().width + 40; f.val(p);
                            k.push(r)
                        } f = a.width = d.jsLib.max(k); h.attr({ width: f }); b.attr({ width: f })
                    } g || (d.jsLib.setPathVal(a, "itemsBox.width", f), c.attr({ width: f })); d.jsLib.evalPath(a, "label.width") || (b = f - 30, d.jsLib.setPathVal(a, "label.width", b), h.attr({ text: { width: b } })); d.jsLib.setPathVal(a, "defaultItem.width", "*"); d.jsLib.each(this._items, function (a) { a.rootVisuals.main.attr({ width: "*" }); a.rootPanel.attr({ width: "*" }) })
                }
            }; b.prototype.applyOptions = function (a) {
                void 0 === a && (a = {}); if (!1 === a) return this; var c = this.currentOptions; d.jsLib.has(c,
                    "multiple") && (this._singleSelection = !c.multiple); this._singleSelection && !d.jsLib.evalPath(c, "itemsBox.visible") && (this._hideAfterSelect = !0); !this._value && c.selectFirstIfEmpty && !c.value && this._items.length && (c.value = this._items[0].key); f.prototype.applyOptions.call(this, a); this._autoSized || this.checkForAutoSize(); return this
            }; b.prototype.correctEvents = function (a, c, b) {
                if (b && d.jsLib.has(c, "change")) { var e = this._eventActions, g = c.change; this._changeHandler = d.jsLib.has(e, g) ? e[g] : g; delete c.change } f.prototype.correctEvents.call(this,
                    a, c, b)
            }; b.prototype.selectedItems = function () { return this._selectedItems }; b.prototype.selectedItem = function () { for (var a in this._selectedItems) return a; return null }; b.prototype.clearSelection = function () { for (var a in this._selectedItems) this._selectedItems[a].visual ? this._selectedItems[a].visual.select(!1) : this._selectedItems[a].rootVisuals && this._selectedItems[a].rootVisuals.main.select(!1); this._selectedItems = {} }; b.prototype.getValue = function () {
                var a = this._selectedItems, c = [], b; for (b in a) c.push(b);
                return c.join(",")
            }; b.prototype.setValue = function (a) { f.prototype.setValue.call(this, a); var c = this, b = c._items; this.clearSelection(); if (!a) return this; d.jsLib.each(a.split(","), function (a) { var e = d.jsLib.find(b, function (c) { return c.key === a }); e ? e.value(!0) : (c.currentOptions.placeholder = a, c.updatePlaceholder()) }); return c }; b.prototype.itemChanged = function (a, c, b) {
                var e = this, g = c.key; c = e._items; if (e._singleSelection) {
                    if (!a) return; d.jsLib.each(c, function (a) {
                        a.key === g ? (e._selectedItems = {}, e._selectedItems[g] =
                            a) : a.value(!1)
                    })
                } else { c = d.jsLib.find(c, function (a) { return a.key === g }); if (!c) return; a ? e._selectedItems[g] = c : delete e._selectedItems[g] } e._hideAfterSelect && e.showItems(!1); e.updatePlaceholder(); e.currentOptions.value = e.value(); !e._denyTriggerEvents && e.chart.inited && e._changeHandler && e._changeHandler(e.value(), e)
            }; b.prototype.updatePlaceholder = function () { this.rootVisuals.main.attr({ text: this.processTokens(this.text) || this.currentOptions.placeholder || "", states: {} }) }; b.prototype.processTokens = function (a) {
                if (!a ||
                    0 > a.indexOf("%value")) return a; var c = [], b; for (b in this._selectedItems) c.push(this._selectedItems[b].text); return a.replace("%value", c.join(","))
            }; return b
        }(t)), x = function (d) {
            function b() { return null !== d && d.apply(this, arguments) || this } p(b, d); b.prototype.defaultOptions = function () { var a = this.userOptions.mode; a = a ? a.toLowerCase() : null; var c = d.prototype.defaultOptions.call(this); "file" === a && (c.hoverOnEnter = !1); return c }; b.prototype.activateFocus = function (a, c) {
                var b = this.currentOptions.mode; "range" === (b ?
                    b.toLowerCase() : null) ? this.rootVisuals.main.activateFocus(a, c) : d.prototype.activateFocus.call(this, a, c)
            }; b.prototype.focusObtained = function (a) { var c = this.currentOptions.mode; c = c ? c.toLowerCase() : null; "file" === c || "color" === c ? d.prototype.focusObtained.call(this, a) : (this.rootVisuals.main.setHtmlElementTabIndex(this.rootPanel.attr("tabindex")), this.rootVisuals.main.displayHtmlInput(!0)) }; b.prototype.createMainVisual = function () {
                var a = this.currentOptions.mode; if (a) {
                    a = a.toLowerCase(); if ("file" === a) return this.renderer.file();
                    if ("color" === a) return this.renderer.color(); if ("range" === a) return this.renderer.range()
                } return this.renderer.input()
            }; b.prototype.getValue = function () { return this.rootVisuals.main.value() }; b.prototype.setValue = function (a) { var c = this.getValue(); d.prototype.setValue.call(this, a); c !== a && this.rootVisuals.main.value(a) }; return b
        }(t), H = function (d) {
            function b() { return null !== d && d.apply(this, arguments) || this } p(b, d); b.prototype.defaultOptions = function () {
                var a = d.prototype.defaultOptions.call(this); a.hoverOnEnter =
                    !1; return a
            }; b.prototype.activateFocus = function (a, c) { d.prototype.activateFocus.call(this, a, c) }; b.prototype.createMainVisual = function () { return this.renderer.file() }; b.prototype.getValue = function () { return this.rootVisuals.main.value() }; b.prototype.setValue = function (a) { }; return b
        }(t), I = function (d) {
            function b() { return null !== d && d.apply(this, arguments) || this } p(b, d); b.prototype.isDisabled = function () { return this.rootVisuals.main.isDisabled() }; b.prototype.disable = function (a) { this.rootVisuals.main.disable(a) };
            b.prototype.activateFocus = function (a, c) { this.rootVisuals.main.activateFocus(a, c) }; b.prototype.createMainVisual = function (a) { return this.renderer.range(void 0, a, this) }; b.prototype.getValue = function () { return this.rootVisuals.main.value() }; b.prototype.setValue = function (a) { this.rootVisuals.main.value(a) }; b.prototype.positionApplied = function (a) { d.prototype.positionApplied.call(this, a) }; return b
        }(t), A = function (f) {
            L(f); var b = f.defaultItem.type; "option" === b && (f.selectFirstIfEmpty = !0); d.jsLib.has(X, b) && !f.multiple &&
                (f.defaultItem.triggerSelectIfFalse = !0); return f
        }, L = function (d) { var b = d.defaultItem = d.defaultItem || {}; b.type = b.type || "option"; return d }, w = { option: [u, null, null], radio: [u, null, "select"], checkbox: [u, null, null], toggle: [u, null, null], select: [v, A, null], scroll: [v, A, null], selectMultiple: [v, function (d) { L(d); d.multiple = !0; return d }, null], input: [x, null, null], file: [H, null, null], range: [I, null, null], label: [t, null, null] }, W = function (d, b, a) {
            void 0 === a && (a = [0, 0]); var c = ["top|left", "bottom|left"], e = [b[3], b[0], b[3], b[3],
            -b[2]]; switch (d) {
                case "left": c = ["middle|left", "middle|right"]; e = [b[3], b[0], -b[1], b[0]]; break; case "right": c = ["middle|right", "middle|left"]; e = [-b[1], b[0], b[3], b[0]]; break; case "top": c = ["top|center", "bottom|center"]; e = [b[3], b[0], b[3], -b[2]]; break; case "bottom": c = ["bottom|center", "top|center"]; e = [b[3], -b[2], b[3], b[0]]; break; case "center": case "middle": case "middleCenter": c = ["middle|center", "middle|center"]; e = [b[3], b[0], b[3], b[0]]; break; case "topRight": c = ["top|right", "bottom|right"]; e = [-b[1], b[0], -b[1],
                -b[2]]; break; case "bottomLeft": c = ["bottom|left", "top|left"]; e = [b[3], -b[2], b[3], b[0]]; break; case "bottomRight": c = ["bottom|right", "top|right"], e = [-b[1], -b[2], -b[1], b[0]]
            }return [c, [e[0] + a[0], e[1] + a[1]], [e[2] + a[0], e[3] + a[1]]]
        }, q; (function (d) { d[d.Tab = 9] = "Tab"; d[d.Enter = 13] = "Enter"; d[d.Esc = 27] = "Esc"; d[d.Left = 37] = "Left"; d[d.Up = 38] = "Up"; d[d.Right = 39] = "Right"; d[d.Down = 40] = "Down" })(q || (q = {})); var Z = function (f) {
            f = f ? d.jsLib.evalPath(f.renderer, "errorReporting.chart") : {}; return {
                cursor: "pointer", padding: [3, 6],
                radius: 0, fill: (f ? f.boxDefaults() : d.consts.boxDefaults()).fill, text: { yContentAlignment: "middle", yAlignment: "middle", animation: { duration: 0 } }, style: "user-select: none;", states: { hover: { fill: "rgb(220,220,220)" } }
            }
        }, aa = d.jsLib.plainArray(["venter", "vdown", "vclick", "vleave"]); u = function (f) {
            function b(a, c) {
                var b = f.call(this, a, c) || this; b._eventsHandler = function (a) {
                    var c = b._events; switch (a.customEventType || a.type) {
                        case "venter": (a = c.mouseover || c.mouseOver) && a(b); b.setHoverState(!0); break; case "vleave": (a = c.mouseout ||
                            c.mouseOut) && a(b); b.setHoverState(!1); break; case "vdown": b.setActiveState(); break; case "vclick": b.click(), a.stopPropagation(), a.preventDefault()
                    }
                }; return b
            } p(b, f); b.prototype.applyDestroy = function () { var a = this.isPatched; f.prototype.applyDestroy.call(this); a && this.destroyMouseArea() }; b.prototype.hover = function (a) { d.jsLib.isUndefined(a) && (a = !this.isHovered); this.setHoverState(a) }; b.prototype.select = function (a, c) {
                var b = a; d.jsLib.isUndefined(a) && (b = !this.isSelected); if (c || b !== this.isSelected) this.isSelected =
                    b, this.setCurrentState(), this.triggerSelected()
            }; b.prototype.init = function () { f.prototype.init.call(this); this._events = {}; this._states = {}; this._triggerSelectIfFalse = this.isHovered = this.isSelected = !1 }; b.prototype.defaultConfig = function () { return d.jsLib.extend(f.prototype.defaultConfig.call(this), Z(this.layout)) }; b.prototype.fillProperties = function (a) {
                a = a || {}; d.jsLib.has(a, "events") && (this._events = a.events || {}, delete a.events); var c = d.jsLib.has(a, "state"); if (c) {
                    var b = a.state; d.jsLib.has(b, "select") &&
                        (b = b.select, this.isSelected !== b && (this.isSelected = b)); delete a.state
                } if (d.jsLib.has(a, "states") || c) {
                    b = d.jsLib.merge(this._prevStates || {}, a.states ? d.jsLib.cloneDeep(a.states) : {}); delete a.states; var h = d.jsLib.cloneDeep(a); h = b.normal = b.normal ? d.jsLib.merge(d.jsLib.cloneDeep(b.normal), h) : h; this._prevStates = d.jsLib.cloneDeep(b); b.active && (b.active = d.jsLib.merge(d.jsLib.cloneDeep(h), b.active)); b.select && (b.select = d.jsLib.merge(d.jsLib.cloneDeep(h), b.select)); b.hoverNormal = d.jsLib.merge(d.jsLib.cloneDeep(h),
                        b.hover || {}); b.hoverSelect = d.jsLib.merge(b.select ? d.jsLib.cloneDeep(b.select) : {}, b.hover); this._states = b; this.setCurrentState(!0)
                } if (!this._currentState || c) this.setCurrentState(!0), d.jsLib.extend(a, this._currentState); d.jsLib.has(a, "icon") && (c = a.icon, "none" === c && (c = null), (d.jsLib.isNull(c) || "none" === c.name && !c.path) && this._icon && (this._icon.applyDestroy(), this._icon.patch(), this._icon = c = null), c && (this._icon = this._icon || this.layout.icon().add(this), this._icon.attr(d.jsLib.extendCopy(c, { zIndex: 1 }))),
                    delete a.icon); if ((c = a.text) && c.val) { b = a.margin || [0, 0, 0, 0]; var g = this._icon; if (g) { h = g.getIconSize(); var m = g.xAlignment || "left"; g = g.yAlignment; if (h) { var k = 3; g || "right" !== m ? "top" === g ? k = 0 : "bottom" === g && (k = 2) : k = 1; b[k] = b[k] + h + 4 } } c.margin = b } d.jsLib.has(a, "triggerSelectIfFalse") && (this._triggerSelectIfFalse = a.triggerSelectIfFalse, delete a.triggerSelectIfFalse); f.prototype.fillProperties.call(this, a)
            }; b.prototype.rectAttrsApplied = function (a) {
                this._mouseArea ? (a = d.jsLib.extendScopedNegate({}, a, { fill: void 0 }),
                    this._mouseArea.attr(a)) : (this._mouseArea = this.renderer.path(d.jsLib.extendCopy(a, { fill: "rgb(255,255,255)", zIndex: 2, opacity: 0 })).add(this.el), this.subscribeEvents())
            }; b.prototype.destroyMouseArea = function () { this._mouseArea && (this._mouseArea.destroy(), this._mouseArea = null) }; b.prototype.subscribeEvents = function () { var a = this; d.jsLib.eachKey(aa, function (c) { return a._mouseArea.on(c, a._eventsHandler) }) }; b.prototype.setCurrentState = function (a) {
                var c = this._states; this._currentState = this.isSelected && c.select ?
                    this.isHovered ? c.hoverSelect : c.select : this.isHovered ? c.hoverNormal : c.normal; !a && this.applyCurrentState()
            }; b.prototype.applyCurrentState = function () { this.attr(this._currentState); this.isPatched && this.refresh() }; b.prototype.setHoverState = function (a) { a !== this.isHovered && (this.isHovered = a, this.setCurrentState(), this.triggerHovered()) }; b.prototype.setActiveState = function () { var a = this._states.active; a && (this._currentState = a, this.applyCurrentState()) }; b.prototype.generateClick = function () {
                var a = this._events.click;
                return a ? a(this) : null
            }; b.prototype.click = function () { var a = !this._triggerSelectIfFalse || !this.isSelected; !1 === this.generateClick() && (a = !1); a && (this.isSelected = !this.isSelected); var c = !this.isHovered; c && (this.isHovered = !0); this.setCurrentState(); a && this.triggerSelected(); c && this.triggerHovered() }; b.prototype.extendDefault = function (a, c) { return d.jsLib.merge(a, c) }; b.prototype.triggerSelected = function () { var a = this._events.change; a && a(this) }; b.prototype.triggerHovered = function () {
                var a = this._events.hover;
                a && a(this)
            }; return b
        }(d.TextBox); v = function (f) { function b() { return null !== f && f.apply(this, arguments) || this } p(b, f); b.prototype.defaultConfig = function () { return d.jsLib.extendCopy(f.prototype.defaultConfig.call(this), { stroke: "none", fill: "none", states: { hover: { fill: "none" } } }) }; return b }(u); x = function (f) {
            function b() { return null !== f && f.apply(this, arguments) || this } p(b, f); b.prototype.defaultConfig = function () {
                return d.jsLib.merge(f.prototype.defaultConfig.call(this), {
                    icon: {
                        name: "system/default/checkbox-blank",
                        width: 16, height: 16, fill: "rgb(0, 0, 0)", "fill-rule": "evenodd", yAlignment: "middle"
                    }, states: { select: { icon: { name: "system/default/checkbox" } } }
                })
            }; return b
        }(v); H = function (f) { function b() { return null !== f && f.apply(this, arguments) || this } p(b, f); b.prototype.defaultConfig = function () { return d.jsLib.merge(f.prototype.defaultConfig.call(this), { icon: { name: "system/default/toggle-off", size: 32, fill: "#8e8e93", transform: { translate: [0, -.5] } }, states: { select: { icon: { name: "system/default/toggle-on", fill: "#44db5e" } } } }) }; return b }(x);
    I = function (f) { function b() { return null !== f && f.apply(this, arguments) || this } p(b, f); b.prototype.defaultConfig = function () { return d.jsLib.merge(f.prototype.defaultConfig.call(this), { icon: { name: "system/default/radio-button-blank", width: 16, height: 16, fill: "rgb(0, 0, 0)", "fill-rule": "evenodd", yAlignment: "middle" }, states: { select: { icon: { name: "system/default/radio-button" } } } }) }; b.prototype.init = function () { f.prototype.init.call(this); this._triggerSelectIfFalse = !0 }; return b }(v); A = function (f) {
        function b() {
            return null !==
                f && f.apply(this, arguments) || this
        } p(b, f); b.prototype.getLowermostElement = function () { return this._htmlElement }; b.prototype.value = function (a) {
            var c = "value"; "button" === this._type && (c = "innerText"); if (void 0 === a) return this._htmlElement ? this._htmlElement.el[c] : null; this._value = a; this._htmlElement && (this._htmlElement.el[c] = a); if (this._svgElement) {
                c = this._svgElement.childNodes[1]; var b = this.attrs["text-align"] || "left"; c.attr({ text: a }); a = c.getBbox(); var d = this._svgElement.childNodes[0].getBbox(); b = {
                    left: 0,
                    center: .5, right: 1
                }[b]; b = { x: b ? (d.width - a.width) * b : 2 }; 0 > a.y && (b.y = (d.height - a.height) / 2 - a.y); c.attr(b)
            }
        }; b.prototype.applyPatch = function (a) { f.prototype.applyPatch.call(this, a); this.patchInput(a) }; b.prototype.emptyPatch = function () { f.prototype.emptyPatch.call(this); this.patchInput() }; b.prototype.applyDestroy = function () { f.prototype.applyDestroy.call(this); this._htmlElement && this._htmlElement.destroy(); this._svgElement && this._svgElement.destroy() }; b.prototype.init = function () {
            f.prototype.init.call(this);
            this._events = {}; this._type = null
        }; b.prototype.fillProperties = function (a) { a = a || {}; d.jsLib.has(a, "events") && (this._events = a.events || {}, delete a.events); d.jsLib.has(a, "mode") && (this._type = a.mode || "text", this._type = this._type.toLowerCase ? this._type.toLowerCase() : "text"); f.prototype.fillProperties.call(this, a) }; b.prototype.defaultConfig = function () { return d.jsLib.merge(f.prototype.defaultConfig.call(this), { width: 150, height: 20 }) }; b.prototype.patchInput = function (a) {
            var c = this; c._htmlElement ? c.applyStyles() :
                (c._htmlElement = this.createHtmlElement(), c.attach(c._htmlElement, {}), c._svgElement = this.createSvgElement(), c._svgElement && c.attach(c._svgElement, {}), c.applyStyles(a), d.jsLib.eachKey(c._events, function (a) { c.on(a, c._events[a]) }), c.value(c._value))
        }; b.prototype.createHtmlElement = function () {
            var a = this, c = a._type; if ("button" === c) return a.renderer.element("button"); c = a.renderer.element("input", { type: c }); c.on("blur", function () { a._svgElement.childNodes[1].attr({ text: a._htmlElement.el.value }); a.displayHtmlInput(!1) });
            return c
        }; b.prototype.setHtmlElementTabIndex = function (a) { this._htmlElement.attr({ tabindex: a }) }; b.prototype.displayHtmlInput = function (a) { var c = this._svgElement.getBbox(); a ? (this._htmlElement.attr({ width: c.width + "px", height: c.height + "px", visibility: "visible" }), this._htmlElement.el.focus()) : this._htmlElement.attr({ width: "0px", height: "0px", visibility: "hidden" }) }; b.prototype.createSvgElement = function () {
            var a = this, c = a._type; if (!c || "text" === c) return c = a.renderer.element("g", { cursor: "text" }), a.renderer.element("rect",
                { fill: "#ffffff" }).add(c), a.renderer.element("text", { fill: "#323232", strokeWidth: 0 }).add(c), c.on("click", function () { a.displayHtmlInput(!0) }), c
        }; b.prototype.applyStyles = function (a) { var c = this.getGlobalBbox(); a = d.stylingLib.annotationToHtmlAttr(d.jsLib.extendCopy(a, { offsetX: c.x, offsetY: c.y, width: 0, height: 0, visibility: "hidden" })); this._htmlElement.attr(a); c = d.dmUtils.snapToPanel(this, [0, 0, c.width, c.height], 1); this._svgElement && this._svgElement.childNodes[0].attr({ x: c[0], y: c[1], width: c[2], height: c[3] }) };
        return b
    }(d.Panel); var B = function (f) {
        function b() { return null !== f && f.apply(this, arguments) || this } p(b, f); b.prototype.applyPatch = function (a) { f.prototype.applyPatch.call(this, a); this.patchInput(a) }; b.prototype.emptyPatch = function () { f.prototype.emptyPatch.call(this); this.patchInput() }; b.prototype.applyDestroy = function () { f.prototype.applyDestroy.call(this); this.htmlElement && this.htmlElement.destroy() }; b.prototype.fillProperties = function (a) {
            delete a.text; var c = this; d.jsLib.has(a, "events") || (a.events = {});
            a.events.click && (c._clickEventHandler = a.events.click); a.events.click = function () { for (var a = [], b = 0; b < arguments.length; b++)a[b] = arguments[b]; c.buttonClickHandler(a) }; a.events.change && (c._changeEventHandler = a.events.change); delete a.events.change; f.prototype.fillProperties.call(this, a)
        }; b.prototype.buttonClickHandler = function () { for (var a = [], c = 0; c < arguments.length; c++)a[c] = arguments[c]; this.htmlElement.el.focus(); this.htmlElement.el.click(); this._clickEventHandler && this._clickEventHandler(a) }; b.prototype.inputChangeHandler =
            function () { for (var a = [], c = 0; c < arguments.length; c++)a[c] = arguments[c]; this._changeEventHandler && this._changeEventHandler(a) }; b.prototype.patchInput = function (a) { var c = this; c.htmlElement || (c.htmlElement = this.createHtmlElement(), c.attach(c.htmlElement, {}), c.htmlElement.on("change", function () { for (var a = [], b = 0; b < arguments.length; b++)a[b] = arguments[b]; c.inputChangeHandler(a) })); c.applyStyles() }; b.prototype.applyStyles = function () {
                var a = this.getGlobalBbox(); a = d.stylingLib.annotationToHtmlAttr({
                    width: 0, height: 0,
                    left: a.x, top: a.y + a.height - 2, zIndex: -1
                }); this.htmlElement.attr(a)
            }; return b
    }(u), ba = function (f) {
        function b() { return null !== f && f.apply(this, arguments) || this } p(b, f); b.prototype.value = function () { return this.htmlElement.el.files }; b.prototype.createHtmlElement = function () { return this.renderer.element("input", { type: "file", accept: this._accept }) }; b.prototype.defaultConfig = function () {
            return d.jsLib.extendCopy(f.prototype.defaultConfig.call(this), {
                width: 34, height: 30, icon: {
                    name: "material/editor/attach-file", width: 20,
                    height: 20, fill: "rgb(60, 60, 60)", "fill-rule": "evenodd", yAlignment: "middle"
                }
            })
        }; b.prototype.fillProperties = function (a) { this._accept = a.accept; f.prototype.fillProperties.call(this, a) }; return b
    }(B); B = function (f) {
        function b() { return null !== f && f.apply(this, arguments) || this } p(b, f); b.prototype.value = function () { return this.htmlElement.el.value }; b.prototype.fillProperties = function (a) { f.prototype.fillProperties.call(this, a); void 0 !== a.innerPadding && (this.innerPadding = a.innerPadding, delete a.innerPadding) }; b.prototype.defaultConfig =
            function () { return d.jsLib.extendCopy(f.prototype.defaultConfig.call(this), { width: 34, height: 30, icon: {}, innerPadding: 5 }) }; b.prototype.patchInput = function (a) { f.prototype.patchInput.call(this, a); a = this.getBbox(); this.colorRect = this.layout.renderer.rect(this.innerPadding, this.innerPadding, a.width - 2 * this.innerPadding, a.height - 2 * this.innerPadding).add(this); this.colorRect.attr({ fill: this.value() }) }; b.prototype.createHtmlElement = function () { return this.renderer.element("input", { type: "color" }) }; b.prototype.inputChangeHandler =
                function () { for (var a = [], c = 0; c < arguments.length; c++)a[c] = arguments[c]; try { f.prototype.inputChangeHandler.apply(this, M(a)) } catch (e) { } this.colorRect.attr({ fill: this.value() }) }; return b
    }(B); var ca = function (f) {
        f = f ? d.jsLib.evalPath(f.renderer, "errorReporting.chart") : {}; return {
            height: 20, sliderPathSize: 3, min: 0, max: 1, width: 220, value: 0, layout: "auto", state: {
                sizeOffset: 3, normal: { cursor: "ew-resize", zIndex: 2, val: [{ fill: "rgb(72,72,72)", strokeWidth: 0, type: "shape", mode: "circle", animation: 200 }] }, hover: {
                    zIndex: 3, val: [{
                        fill: "rgb(72,72,72)",
                        animation: 200
                    }]
                }, active: { zIndex: 3, val: [{ fill: "rgb(72,72,72)", animation: 200 }] }, disabled: { cursor: "normal", val: [{ borderColor: (f ? f.boxDefaults() : d.consts.boxDefaults()).fill, fill: "rgb(208,216,220)", strokeWidth: 2 }] }
            }, path: { state: { normal: { fill: "rgb(208,216,220)", strokeWidth: "0px" }, hover: {}, active: {}, disabled: {} } }, decorator: { state: { normal: { fill: "rgb(72,72,72)", strokeWidth: "0px" }, hover: {}, active: {}, disabled: { fill: "rgb(208,216,220)" } } }, overlay: { type: "circle", config: { zIndex: 5, fill: "white", opacity: .001 } }
        }
    },
        da = function (f) {
            function b() { var a = null !== f && f.apply(this, arguments) || this; a._focusedSlider = null; a._focusProcessing = !1; return a } p(b, f); b.prototype.init = function () { f.prototype.init.call(this); this._min = 0; this._max = 1; this._debounce = new d.idleDefer }; b.prototype.value = function (a) {
                if (void 0 !== a) {
                    d.jsLib.isArray(a) || (a = [a]); this._firstValue = a[0]; this._secondValue = a[1]; this._startedFirstValue = this.converValueToScrollValue(this._firstValue); this._startedSecondValue = this.converValueToScrollValue(this._secondValue);
                    if (!this._firstSlider) return; this.setSliderValues(this._startedFirstValue, this._startedSecondValue); this.uiParent._denyTriggerEvents || this.triggerOptionsChangeEvent(null); return null
                } a = this.converScrollValueToValue(this.getValueForSlider(this._firstSlider)); var c = this.converScrollValueToValue(this.getValueForSlider(this._secondSlider)); return null === c ? a : c < a ? [c, a] : [a, c]
            }; b.prototype.isDisabled = function () { return this._disabled }; b.prototype.disable = function (a) {
                this._disabled = a; this._selectedSlider = null;
                this._decoratoreSelected = !1; this.setDisabledState(this._disabled)
            }; b.prototype.applyPatch = function (a) { this.drawSliderItems(); this.updatePathDecoratorPosition(!1); if (d.isTouchDevice()) this.on("touchstart", function (a) { a.eventArgs.preventDefault() }); this.activateFocusForSliders(this._accessibilityEnabled, this._tabIndex); f.prototype.applyPatch.call(this, a) }; b.prototype.applyDestroy = function () {
                f.prototype.applyDestroy.call(this); var a = this.layout.renderer.documentElement; a.un("vmove", this._docVMoveHandler);
                a.un("vup", this._docVUpHandler); a.un("keydown", this._docKeyDownHandler); this._sliderPath && this._sliderPath.applyDestroy(); this._firstSlider && this._firstSlider.applyDestroy(); this._secondSlider && this._secondSlider.applyDestroy()
            }; b.prototype.emptyPatch = function () { f.prototype.emptyPatch.call(this) }; b.prototype.activateFocus = function (a, c) { this._accessibilityEnabled = a; this._tabIndex = c; (this._firstSlider || this._secondSlider) && this.activateFocusForSliders(a, c) }; b.prototype.activateFocusForSliders = function (a,
                c) {
                    var b = this; if (b._hasAccessibility !== a) {
                        b._firstFocusChangeHandler || b._secondFocusChangeHandler || (b._firstFocusChangeHandler = function (a) { b.changeFocusHandler(a, function () { return b._firstSlider }) }, b._secondFocusChangeHandler = function (a) { b.changeFocusHandler(a, function () { return b._secondSlider }) }); if (a) {
                            if (b._firstSlider.overlay.attr({ tabindex: c, "aria-label": b.getSliderDescription(b._firstSlider), role: b.getSliderDescription(b._firstSlider) }), b._secondSlider && b._secondSlider.overlay.attr({
                                tabindex: c,
                                "aria-label": b.getSliderDescription(b._secondSlider), role: b.getSliderDescription(b._secondSlider)
                            }), b._firstSlider.overlay.on("vchangefocus", b._firstFocusChangeHandler), b._secondSlider) b._secondSlider.overlay.on("vchangefocus", b._secondFocusChangeHandler)
                        } else b._firstSlider.overlay.attr({ tabindex: null, "aria-label": null, role: null }), b._secondSlider && b._secondSlider.overlay.attr({ tabindex: null, "aria-label": null, role: null }), b._firstSlider.overlay.un("vchangefocus", b._firstFocusChangeHandler), b._secondSlider &&
                            b._secondSlider.overlay.un("vchangefocus", b._secondFocusChangeHandler); b._hasAccessibility = a
                    }
            }; b.prototype.changeFocusHandler = function (a, c) {
                this._focusProcessing || (this._focusProcessing = !0, this._disabled ? a.eventArgs.preventDefault() : (a.eventArgs.hasFocus ? (this._focusedSlider = c(), this._focusedSlider.overlay.el.attr({ outline: "none" }), this._states && this._iconStates && this.setSliderAttr(this._focusedSlider, this._states.hover, this._iconStates.hover)) : this._focusedSlider && (this._states && this._iconStates &&
                    this.setSliderAttr(this._focusedSlider, this._states.normal, this._iconStates.normal), this._focusedSlider = null), this.updateAndApplyRefresh(), this._focusProcessing = !1))
            }; b.prototype.defaultConfig = function () { return d.jsLib.extendCopy(f.prototype.defaultConfig.call(this), ca(this.layout)) }; b.prototype.fillProperties = function (a) {
                var c = this; a.layout && (c._vertical = a.layout && "vertical" === a.layout.toLowerCase(), delete a.vertical); c._currentMoveCursor = c._vertical ? "ns-resize" : "ew-resize"; if (a.events) {
                    if (a.events.change) {
                        var b =
                            a.events.change; a.throttle && d.jsLib.isNumber(a.throttle) ? c._changeEvent = d.jsLib.throttle(b, a.throttle) : a.debounce && d.jsLib.isNumber(a.debounce) ? c._changeEvent = function () { c._debounce.defer("change", b, a.debounce) } : c._changeEvent = b
                    } delete a.events
                } void 0 !== a.state && (c._states = a.state, delete a.state); c._states && c._states.normal && (c._states.normal.cursor = c._currentMoveCursor); void 0 !== a.path && (c._path = a.path, delete a.path); void 0 !== a.decorator && (c._decorator = a.decorator, delete a.decorator); void 0 !== a.icon ?
                    (c._icon = a.icon, c._iconStates = c._icon.state, delete a.icon) : (delete c._icon, c._iconStates = {}); void 0 !== a.overlay && (c._overlay = a.overlay, delete a.overlay); void 0 !== a.sliderPathSize && (c._sliderPathSize = a.sliderPathSize, delete a.sliderPathSize); void 0 !== a.disabled && (c._disabled = a.disabled, delete a.disabled); void 0 !== a.min && (c._min = a.min, delete a.min); void 0 !== a.max && (c._max = a.max, delete a.max); f.prototype.fillProperties.call(this, a)
            }; b.prototype.setSliderValues = function (a, c) {
                this.setValueForSlider(this._firstSlider,
                    a); this.setSecondSliderValue(c); this.updatePathDecoratorPosition()
            }; b.prototype.drawSliderItems = function () {
                var a = this, c = a.getBbox(); a._sliderSize = a._vertical ? c.width : c.height; a._firstSlider || (a._firstSlider = a.createSlider()); var b = c.width; c = c.height; a._sliderPath ? a._sliderPath && a._sliderPath.attr(a.getSliderPathAttrs(b, c)) : a.createSliderPath(b, c); a.createSliderPathHitArea(b, c); a._disabled && a.setDisabledState(a._disabled); a._docVMoveHandler || a._docVUpHandler || (b = a.layout.renderer.documentElement, a._docKeyDownHandler =
                    function (c) { a.docKeyDownHandler(c) }, a._docVMoveHandler = function (c) { a.docVMoveHandler(c) }, a._docVUpHandler = function (c) { a.docVUpHandler(c) }, b.on("vmove", a._docVMoveHandler), b.on("vup", a._docVUpHandler), b.on("keydown", a._docKeyDownHandler)); a.setSliderValues(a._startedFirstValue, a._startedSecondValue)
            }; b.prototype.setDisabledState = function (a) {
                this._firstSlider && (a ? (this.setSliderAttr(this._firstSlider, this._states.disabled, this._iconStates.disabled), this.setSliderAttr(this._secondSlider, this._states.disabled,
                    this._iconStates.disabled), this._sliderPath.attr(this._path.state.disabled), this._sliderPathHitArea.attr({ cursor: "normal" }), this._sliderPathDecorator && (this._sliderPathDecorator.attr(this._decorator.state.disabled), this._sliderPathDecoratorHitArea.attr({ cursor: "normal" }))) : (this.setSliderAttr(this._firstSlider, this._states.normal, this._iconStates.normal), this.setSliderAttr(this._secondSlider, this._states.normal, this._iconStates.normal), this._sliderPath.attr(this._path.state.normal), this._sliderPathHitArea.attr({ cursor: "pointer" }),
                        this._sliderPathDecorator && (this._sliderPathDecorator.attr(this._decorator.state.normal), this._sliderPathDecoratorHitArea.attr({ cursor: "grab" }))))
            }; b.prototype.docKeyDownHandler = function (a) {
                var c = this.getBbox(), b = c.width; c = c.height; if (this._focusedSlider) {
                    var d = !1, g = this._focusedSlider.attr("offsetX"), f = this._focusedSlider.attr("offsetY"); if (39 === a.keyCode || 40 === a.keyCode) g += .03 * b, f += .03 * c, d = !0; else if (37 === a.keyCode || 38 === a.keyCode) g -= .03 * b, f -= .03 * c, d = !0; this.setSliderPosition(g, f, b, c); this.triggerChangeEvent(a);
                    d && a.preventDefault()
                }
            }; b.prototype.docVMoveHandler = function (a) { var c = this.getBbox(), b = c.width; c = c.height; this._selectedSlider && this.processSelectedSliderOnMove(a, b, c); this._decoratoreSelected && this.processSelectedDecoratorOnMove(a, b, c) }; b.prototype.processSelectedSliderOnMove = function (a, c, b) { var e = this.toRelativeXY(a); this.setSliderPosition(e[0] - this._coordinatesDown[0], e[1] - this._coordinatesDown[1], c, b); this.triggerChangeEvent(a) }; b.prototype.setSliderPosition = function (a, c, b, d) {
                var e = this._sliderSize,
                h = this.moveAnotherSlider(a, c, b, d); -1 === h && (this._vertical ? c = 0 : a = 0); 1 === h && (this._vertical ? c = d - e : a = b - e); c = this.truncateSliderPos(a, c, b, d); a = c[0]; c = c[1]; this.setSliderAttr(this._selectedSlider || this._focusedSlider, { offsetX: a, offsetY: c }); this.updateAndApplyRefresh(); this.updatePathDecoratorPosition()
            }; b.prototype.processSelectedDecoratorOnMove = function (a, c, b) {
                var e = this.toRelativeXY(a), d = e[0] - this._coordinatesDown[0], f = e[1] - this._coordinatesDown[1]; this._coordinatesDown = [e[0], e[1]]; e = this._firstSlider.attr("offsetX");
                var k = this._firstSlider.attr("offsetY"), l = this._secondSlider.attr("offsetX"), n = this._secondSlider.attr("offsetY"); this._vertical ? (k += f, n += f, d = 0 > f) : (e += d, l += d, d = 0 > d); if (this._needLock) {
                    if (this._vertical) { if (0 < this._lockDirection && this._coordinatesDown[1] > this._coordinatesToLock[1] || 0 > this._lockDirection && this._coordinatesDown[1] < this._coordinatesToLock[1]) return } else if (0 < this._lockDirection && this._coordinatesDown[0] > this._coordinatesToLock[0] || 0 > this._lockDirection && this._coordinatesDown[0] < this._coordinatesToLock[0]) return;
                    this._needLock = !1
                } this._needLock || (d ? (c = this.truncateSliderPos(e, k, c, b), b = c[0] - e, d = c[1] - k, e = c[0], k = c[1], this._needLock = !!c[2], this._lockDirection = -1, this._coordinatesToLock = this._coordinatesDown, l += b, n += d) : (c = this.truncateSliderPos(l, n, c, b), b = c[0] - l, d = c[1] - n, l = c[0], n = c[1], this._needLock = !!c[2], this._lockDirection = 1, this._coordinatesToLock = this._coordinatesDown, e += b, k += d), this._vertical ? (this.setSliderAttr(this._firstSlider, { offsetY: k }), this.setSliderAttr(this._secondSlider, { offsetY: n })) : (this.setSliderAttr(this._firstSlider,
                    { offsetX: e }), this.setSliderAttr(this._secondSlider, { offsetX: l })), this.updateAndApplyRefresh(), this.updatePathDecoratorPosition(), this.triggerChangeEvent(a))
            }; b.prototype.truncateSliderPos = function (a, c, b, d) { var e = this._sliderSize, f = e / 2, h = 0; a < -f ? (a = -f, h = 1) : a + e > b + f && (a = b - f, h = 1); c < -f ? (c = -f, h = 1) : c + e > d + f && (c = d - f, h = 1); this._vertical ? a = 0 : c = 0; return [a, c, h] }; b.prototype.moveAnotherSlider = function (a, c, b, d) {
                var e = this._sliderSize / 2, f = this._firstSlider, h = !0; (this._selectedSlider || this._focusedSlider) === this._firstSlider &&
                    (f = this._secondSlider, h = !1); if (!f) return 0; var l = f.attr("offsetX"), n = f.attr("offsetY"), r = !1; h ? this._vertical ? n + e > c && (n = c - e, r = !0) : l + e > a && (l = a - e, r = !0) : this._vertical ? n - e < c && (n = c + e, r = !0) : l - e < a && (l = a + e, r = !0); if (!r) return 0; a = this.truncateSliderPos(l, n, b, d); this.setSliderAttr(f, { offsetX: a[0], offsetY: a[1] }); if (this._vertical) { if (a[1] <= -e) return -1; if (a[1] >= d - e) return 1 } else { if (a[0] <= -e) return -1; if (a[0] >= b - e) return 1 }
            }; b.prototype.docVUpHandler = function (a) { this.docVUpSelectedSlider(a); this.docVUpSliderPathDecorator(a) };
            b.prototype.docVUpSelectedSlider = function (a) { if (this._selectedSlider) { if (this._states && this._states.normal) { this.setSliderAttr(this._selectedSlider, this._states.normal, this._iconStates.normal); try { this.updateAndApplyRefresh() } catch (c) { console.error(c) } } this._selectedSlider = null; this.triggerChangeEvent(a) } }; b.prototype.docVUpSliderPathDecorator = function (a) {
                this._sliderPathDecoratorHitArea && this._sliderPathDecoratorHitArea.attr({ cursor: "grab" }); this._decoratoreSelected && (this.setSliderAttr(this._firstSlider,
                    this._states.normal, this._iconStates.normal), this.setSliderAttr(this._secondSlider, this._states.normal, this._iconStates.normal), this.updateAndApplyRefresh(), this._decoratoreSelected = !1)
            }; b.prototype.createSliderPath = function (a, c) {
                a = this.getSliderPathAttrs(a, c); a = d.jsLib.extendCopy({ x: a.x, y: a.y, width: a.width, height: a.height, shape: { r: "5", corners: [{ type: "round" }, { type: "round" }, { type: "round" }, { type: "round" }] } }, this._path.state.normal); a = this.layout.renderer.shape("rectangle", a); a.add(this); return this._sliderPath =
                    a
            }; b.prototype.getSliderPathAttrs = function (a, c) { var b = 0, d = 0, f = a, m = this._sliderPathSize; this._vertical ? (b = a / 2 - this._sliderPathSize / 2, f = this._sliderPathSize, m = c) : d = c / 2 - this._sliderPathSize / 2; return { x: b, y: d, width: f, height: m } }; b.prototype.moveItemsGroup = function (a) {
                var c = this._sliderPath.getBbox(), b = this.toRelativeXY(a), d = c.width; c = c.height; var f = this._sliderSize / 2; this._vertical ? (b = b[1], d = c) : b = b[0]; if (this._secondSlider) {
                    if (this._vertical) {
                        c = this._firstSlider.attr("offsetY") + f; var m = this._secondSlider.attr("offsetY") +
                            f
                    } else c = this._firstSlider.attr("offsetX") + f, m = this._secondSlider.attr("offsetX") + f; f = m - c; m = f / 2; c = b - m; m = b + m; 0 > c ? (c = 0, m = f) : m > d && (m = d, c = d - f); b = m / d; this.setValueForSlider(this._firstSlider, c / d, !0); this.setValueForSlider(this._secondSlider, b, !0); this.updatePathDecoratorPosition(!0)
                } else this.setValueForSlider(this._firstSlider, b / d, !0); this.updateAndApplyRefresh(); this.triggerChangeEvent(a)
            }; b.prototype.triggerOptionsChangeEvent = function (a) { var c = this.chart; (!c || c.isRendered) && this._changeEvent && this._changeEvent(a) };
            b.prototype.triggerChangeEvent = function (a) { var c = this.value(); if (d.jsLib.isArray(c)) { if (this._firstValue === c[0] && this._secondValue === c[1]) return; this._firstValue = c[0]; this._secondValue = c[1] } else { if (this._firstValue === c) return; this._firstValue = c } this._changeEvent && this._changeEvent(a) }; b.prototype.createSliderPathDecorator = function () {
                if (this._firstSlider && this._secondSlider) {
                    var a = d.jsLib.extend({}, this._decorator.state.normal); a = this.layout.renderer.shape("rectangle", a); a.add(this); this.createSliderPathDecoratorHitArea();
                    return a
                }
            }; b.prototype.setSliderAttr = function (a, c, b) { void 0 === c && (c = {}); void 0 === b && (b = {}); if (a) { var d = a.val(); if (c.val) for (var e = 0; e < c.val.length; e++)d[e].attr(c.val[e]); a.icon && b && a.icon.attr(b); this._hasAccessibility && (b = this.getSliderDescription(a), a.attr("aria-label") != b && (c["aria-label"] = b)); b = {}; c.offsetX && (b.offsetX = c.offsetX); c.offsetY && (b.offsetY = c.offsetY); a.overlay.attr(b); return a.attr(c) } }; b.prototype.updatePathDecoratorPosition = function (a) {
                void 0 === a && (a = !1); var c = this._sliderPathDecorator,
                    b = this._sliderSize / 2; if (c) {
                        var d = this._firstSlider.attr("offsetX"), f = this._secondSlider.attr("offsetX"), m = this._firstSlider.attr("offsetY"), k = this._secondSlider.attr("offsetY"), l = this._sliderPath.attr("x"), n = this._sliderPath.attr("y"), r = this._sliderPath.attr("width"), p = this._sliderPath.attr("height"); if (d > f) { var q = d; d = f; f = q } m > k && (q = m, m = k, k = q); this._vertical ? (d = l, m += b, f = r, b = Math.abs(k - m) + b) : (d += b, m = n, f = Math.abs(f - d) + b, b = p); k = { x: d, y: m, width: f, height: b }; a && (k.animation = 200); this.updateSliderPathDecoratorHitAreaPosition(d,
                            m, f, b, a); c.attr(k)
                    }
            }; b.prototype.getSliderRole = function (a) { return "Range Slider" }; b.prototype.getSliderDescription = function (a) { var c = this.value(), b = ""; a === this._firstSlider ? b = d.jsLib.toString(Math.round(d.jsLib.isArray(c) ? c[0] : c)) : a === this._secondSlider && (b = d.jsLib.toString(Math.round(c[1]))); return "Range Slider. Value: " + b }; b.prototype.createSlider = function () {
                var a = this, c = a._states.sizeOffset || 0, b = c / 2, f = d.jsLib.extendCopy({ x: 0, y: 0, width: a._sliderSize, height: a._sliderSize }, a._states.normal), g = f.val[0],
                m = a._states.hover && a._states.hover.val[0], k = a._states.active && a._states.active.val[0], l = a._sliderSize; c = l - c; g && d.jsLib.extend(g, { offsetX: b, offsetY: b, width: c, height: c }); m && d.jsLib.extend(m, { offsetX: 0, offsetY: 0, width: l, height: l }); k && d.jsLib.extend(k, { offsetX: 0, offsetY: 0, width: l, height: l }); var n = a.layout.panel(f); a._overlay && (b = d.jsLib.extendCopy({ x: 0, y: 0, width: a._sliderSize, height: a._sliderSize }, a._overlay.config), a.renderer.shape(a._overlay.type, b).add(n)); n.on("vdown", function (c) {
                    a._disabled || (a._selectedSlider =
                        n, a._coordinatesDown = [c.pointers[0][0], c.pointers[0][1]], a.setSliderAttr(n, a._states.active, a._iconStates.active), a.updateAndApplyRefresh())
                }); n.on("venter", function () { a._disabled || a._selectedSlider || a._decoratoreSelected || !a._states || !a._states.hover || (a.setSliderAttr(n, a._states.hover, a._iconStates.hover), a.updateAndApplyRefresh()) }); n.on("vleave", function (c) {
                    !a._disabled && a._selectedSlider !== n && !a._decoratoreSelected && a._states && a._states.normal && (a.setSliderAttr(n, a._states.normal, a._iconStates.normal),
                        a.updateAndApplyRefresh())
                }); n.add(a); n.overlay = a.layout.shape("rectangle", { fill: "white", opacity: .01, x: 0, y: 0, width: a._sliderSize, height: a._sliderSize, "aria-label": a.getSliderDescription(null), role: a.getSliderRole(null) }); n.overlay.add(a); return n
            }; b.prototype.getValueForSlider = function (a) { if (null == a) return null; var c = this._sliderSize / 2, b = this.getBbox(); this._vertical ? (a = a.attr("offsetY") + c, b = b.height) : (a = a.attr("offsetX") + c, b = b.width); return a / b }; b.prototype.setValueForSlider = function (a, c, b) {
                void 0 ===
                b && (b = !1); if (a) { c || (c = 0); 0 > c && (c = 0); 1 < c && (c = 1); var d = this.getBbox(), e = this._sliderSize / 2, f = d.width; d = d.height; var k = 0, l = 0; this._vertical ? l = d * c - e : k = f * c - e; c = { offsetX: k, offsetY: l }; b && (c.animation = 200); this.setSliderAttr(a, c) }
            }; b.prototype.updateAndApplyRefresh = function () { this.update(); this.applyRefresh() }; b.prototype.setSecondSliderValue = function (a) {
                null == a ? (this._secondSlider && (this._secondSlider.destroy(), this._secondSlider = null), this._sliderPathDecorator && (this._sliderPathDecorator.destroy(), this._sliderPathDecorator =
                    null)) : (this._secondSlider || (this._secondSlider = this.createSlider()), this._sliderPathDecorator || (this._sliderPathDecorator = this.createSliderPathDecorator()), this.setValueForSlider(this._secondSlider, a), this.updatePathDecoratorPosition(), this.disable(this.isDisabled()))
            }; b.prototype.converValueToScrollValue = function (a) { return null == a ? null : (a - this._min) / (this._max - this._min) }; b.prototype.converScrollValueToValue = function (a) { return null == a ? null : a * (this._max - this._min) + this._min }; b.prototype.createSliderPathHitArea =
                function (a, c) { var b = this, d = b._states.sizeOffset || 0, f = d / 2; b._sliderPathHitArea && b._sliderPathHitArea.destroy(); var m = 0, k = f, l = a, n = c - d; b._vertical && (m = f, k = 0, l = a - d, n = c); a = b.layout.renderer.shape("rectangle", { x: m, y: k, width: l, height: n, color: "white", cursor: "pointer", opacity: .001 }); a.on("vclick", function (a) { b._disabled || b.moveItemsGroup(a) }); b._sliderPathHitArea = a; a.add(b); return a }; b.prototype.createSliderPathDecoratorHitArea = function () {
                    var a = this; a._sliderPathDecoratorHitArea && a._sliderPathDecoratorHitArea.destroy();
                    if (a._secondSlider) {
                        var c = a.layout.renderer.shape("rectangle", { x: 0, y: 0, color: "white", cursor: "grab", opacity: .001 }); c.on("vdown", function (b) { a._disabled || (a._decoratoreSelected = !0, b = a.toRelativeXY(b), a._coordinatesDown = [b[0], b[1]], a.setSliderAttr(a._firstSlider, a._states.active, a._iconStates.active), a.setSliderAttr(a._secondSlider, a._states.active, a._iconStates.active), c.attr({ cursor: "grabbing" }), a.updateAndApplyRefresh()) }); c.on("venter", function () {
                            a._disabled || a._selectedSlider || a._decoratoreSelected ||
                            (a.setSliderAttr(a._firstSlider, a._states.hover, a._iconStates.hover), a.setSliderAttr(a._secondSlider, a._states.hover, a._iconStates.hover), a.updateAndApplyRefresh())
                        }); c.on("vleave", function () { a._disabled || a._selectedSlider || a._decoratoreSelected || (a.setSliderAttr(a._firstSlider, a._states.normal, a._iconStates.normal), a.setSliderAttr(a._secondSlider, a._states.normal, a._iconStates.normal), a.updateAndApplyRefresh()) }); c.on("vup", function () {
                            a._disabled || (a._decoratoreSelected = !1, a.setSliderAttr(a._firstSlider,
                                a._states.normal, a._iconStates.normal), a.setSliderAttr(a._secondSlider, a._states.normal, a._iconStates.normal), a.updateAndApplyRefresh())
                        }); a._sliderPathDecoratorHitArea = c; c.add(a); return c
                    }
                }; b.prototype.updateSliderPathDecoratorHitAreaPosition = function (a, c, b, d, f) { if (this._sliderPathDecoratorHitArea) { var e = this._states.sizeOffset || 0, g = e / 2; e = this._sliderSize - e; a = { x: a, y: c, width: b, height: d }; this._vertical ? (a.x = g, a.width = e, b = d) : (a.y = g, a.height = e); f && (a.animation = 200); a.zIndex = b < this._sliderSize ? 4 : 1; this._sliderPathDecoratorHitArea.attr(a) } };
            return b
        }(d.Panel), ea = function (f) {
            function b() { var a = null !== f && f.apply(this, arguments) || this; a._sliderPath = null; a._slider = null; a.docVMoveHandler = d.jsLib.throttle(function (c) { if (a._selectedSlider) { var b = a.toRelativeXY(c); a.moveSliderToPosition(b[0] - a._coordinatesDown[0], b[1] - a._coordinatesDown[1]); c.preventDefault() } }, 20); return a } p(b, f); b.prototype.scrollHandler = function (a) { return d.jsLib.def(a) ? (this._scrollHandler = a, null) : this._scrollHandler }; b.prototype.applyPatch = function (a) {
                this.patchInnerItems();
                f.prototype.applyPatch.call(this, a)
            }; b.prototype.applyDestroy = function () { f.prototype.applyDestroy.call(this); var a = this.layout.renderer.documentElement; a.un("vmove", this._docVMoveHandler); a.un("vup", this._docVUpHandler); a.un("selectstart", this._docSelectHandler) }; b.prototype.sliderSelected = function () { return !!this._selectedSlider }; Object.defineProperty(b.prototype, "sliderSize", { get: function () { return this._sliderSize }, enumerable: !0, configurable: !0 }); Object.defineProperty(b.prototype, "scrollSize", {
                get: function () { return this._scrollSize },
                set: function (a) { this._scrollSize = a }, enumerable: !0, configurable: !0
            }); Object.defineProperty(b.prototype, "pageSize", { get: function () { return this._pageSize }, set: function (a) { this._pageSize = a }, enumerable: !0, configurable: !0 }); b.prototype.show = function () { this._slider.show(); this._sliderPath.show() }; b.prototype.hide = function () { this._slider.hide(); this._sliderPath.hide() }; b.prototype.isInArea = function (a) { var c = this.getBbox(), b = this.toRelativeXY(a); a = b[0]; b = b[1]; return 0 > a || 0 > b || a > c.width || b > c.height ? !1 : !0 };
            b.prototype.increaseTouchScrollPosition = function (a) { return this.increaseScrollPosition(this._sliderPathSize / this.scrollSize * a) }; b.prototype.increaseScrollPosition = function (a) { var c = this.getSliderPosition(); if (this._vertical) { var b = c[1]; a = this.moveSliderToPosition(c[0], b + a) } else b = c[0], a = this.moveSliderToPosition(b + a, c[1]); return b !== a }; b.prototype.emptyPatch = function () { f.prototype.emptyPatch.call(this) }; b.prototype.patchInnerItems = function () {
                var a = this.getBbox(), c = a.width; a = a.height; this._sliderPath =
                    this.createSliderPath(c, a); this._slider = this.createSlider(c, a); this._sliderPath.add(this); this._slider.add(this); this.attachEvents()
            }; b.prototype.moveSliderToPosition = function (a, c) { var b = this._sliderSize / 2, d = 0, f = 0; this._vertical ? (f = this.truncScrollPosition(c), a = f + b) : (d = this.truncScrollPosition(a), a = d + b); d = [d, f]; this._slider.attr({ x: d[0], y: d[1] }); d = this._vertical ? d[1] : d[0]; this.callback && this.callback(a / this._sliderPathSize); return d }; b.prototype.init = function () {
                f.prototype.init.call(this); this._sliderSpeed =
                    13; this._minSliderSize = 20
            }; b.prototype.defaultConfig = function () { return d.jsLib.extendCopy(f.prototype.defaultConfig.call(this), { vertical: !0, hasButtons: !0 }) }; b.prototype.fillProperties = function (a) { this._vertical = a.vertical; delete a.events; f.prototype.fillProperties.call(this, a) }; b.prototype.createSliderPath = function (a, c) {
                this._vertical ? (this._sliderStartPos = 0, this._sliderPathSize = c) : (this._sliderStartPos = 0, this._sliderPathSize = a); return this.layout.renderer.shape("rectangle", {
                    x: 0, y: 0, width: a, height: c,
                    fill: "#e6eaec", strokeWidth: "0px", opacity: .4, cursor: "pointer", shape: { r: this._vertical ? a / 2 : c / 2, corners: [{ type: "round" }, { type: "round" }, { type: "round" }, { type: "round" }] }
                })
            }; b.prototype.createSlider = function (a, c) {
                var b = 0, d = 0; this._vertical ? (d = this._sliderStartPos, this._sliderSize = c = this.calculateSliderSize(c)) : (b = this._sliderStartPos, this._sliderSize = a = this.calculateSliderSize(a)); return this.layout.renderer.shape("rectangle", {
                    x: b, y: d, width: a, height: c, fill: "#c3c8cb", opacity: .6, strokeWidth: "0px", shape: {
                        r: this._vertical ?
                            a / 2 : c / 2, corners: [{ type: "round" }, { type: "round" }, { type: "round" }, { type: "round" }]
                    }
                })
            }; b.prototype.attachEvents = function () {
                var a = this, c = a.layout.renderer.documentElement, b = function (c, b) { var d = b + a._sliderSize / 2, e = 0; d < c ? (b += a._sliderSpeed, e = 1) : d > c && (b -= a._sliderSpeed, e = -1); return { pos: b, direction: e } }; a._sliderPath.on("vdown", function (c) {
                    a.triggerScrollEvent(!0); a._downIntervalId = setInterval(function () {
                        var d = a.toRelativeXY(c), e = a.getSliderPosition(); if (a._vertical) {
                            var f = b(d[1], e[1]); a.moveSliderToPosition(e[0],
                                f.pos); e = a.getSliderPosition(); d = b(d[1], e[1])
                        } else f = b(d[0], e[0]), a.moveSliderToPosition(f.pos, e[1]), e = a.getSliderPosition(), d = b(d[0], e[0]); f.direction !== d.direction && clearInterval(a._downIntervalId)
                    }, 50); c.stopPropagation()
                }); a._sliderPath.on("vup", function () { a.triggerScrollEvent(!1); clearInterval(a._downIntervalId) }); a._sliderPath.on("vleave", function () { a.triggerScrollEvent(!1); clearInterval(a._downIntervalId) }); a._slider.on("vdown", function (c) {
                    a.triggerScrollEvent(!0); a._selectedSlider = a._slider;
                    var b = a.toRelativeXY(c); a._coordinatesDown = [b[0] - a._selectedSlider.x, b[1] - a._selectedSlider.y]; c.stopPropagation()
                }); d.isTouchDevice() && (a._sliderPath.on("touchstart", function (a) { a.preventDefault() }), a._slider.on("touchstart", function (a) { a.preventDefault() })); a._docVMoveHandler = function (c) { a.docVMoveHandler(c) }; a._docVUpHandler = function (c) { a.docVUpHandler(c) }; a._docSelectHandler = function (c) { a._selectedSlider && c.preventDefault() }; c.on("vmove", a._docVMoveHandler); c.on("vup", a._docVUpHandler); c.on("selectstart",
                    a._docSelectHandler)
            }; b.prototype.triggerScrollEvent = function (a) { this._scrollHandler && this._scrollHandler(a) }; b.prototype.truncScrollPosition = function (a) { a < this._sliderStartPos ? a = this._sliderStartPos : a + this._sliderSize > this._sliderStartPos + this._sliderPathSize && (a = this._sliderStartPos + this._sliderPathSize - this._sliderSize); return a }; b.prototype.getSliderPosition = function () { var a = this._slider.attr("x"), c = this._slider.attr("y"); return [a, c] }; b.prototype.docVUpHandler = function (a) {
                this._selectedSlider &&
                this.triggerScrollEvent(!1); this._selectedSlider = null
            }; b.prototype.calculateSliderSize = function (a) { a *= this._pageSize / this._scrollSize; a < this._minSliderSize && (a = this._minSliderSize); return a }; return b
        }(d.Panel), fa = !!d.jsLib.epa(window, ["document", "documentMode"]), ha = function (f) {
            function b(a, c) { a = f.call(this, a, c) || this; a._maskPositions = { vertical: 2, horizontal: 2 }; return a } p(b, f); b.prototype.scrollHandler = function (a) {
                return d.jsLib.def(a) ? (this._scrollHandler = a, this._verticalScrollbar && this._verticalScrollbar.scrollHandler(this._scrollHandler),
                    this._horizontalScrollbar && this._horizontalScrollbar.scrollHandler(this._scrollHandler), null) : this._scrollHandler
            }; b.prototype.addChild = function (a, c) { this._container || (this.createContainerPanel(), this._container.addChild(a, c)); a.parent = this._container; a.notifyParentChanged(); return !1 }; b.prototype.removeChild = function (a) { this._container.removeChild(a) }; b.prototype.insertChild = function (a, c) { return this._container.insertChild(a, c) }; b.prototype.val = function (a) {
                this.createContainerPanel(); this._container.val(a);
                return this
            }; b.prototype.applyPatch = function (a) { f.prototype.applyPatch.call(this, a); this.createRect(); (d.jsLib.isUndefined(this._needHorizontal) || d.jsLib.isUndefined(this._needVertical)) && this.checkAddScroll(); this.renderScrolls(); this.createMask(2); this.attachEvents() }; b.prototype.applyDestroy = function () { f.prototype.applyDestroy.call(this); this.detachEvents(); this._rect.destroy() }; b.prototype.checkAddScroll = function () {
                var a = this.hasHorizontalScroll(), c = this.hasVerticalScroll(), b = this.calculateNewHeight();
                b.needApply && this.attr({ height: b.height }); !this._horizontalScrollbar && a ? this._needHorizontal = !0 : this._horizontalScrollbar && !a && (this._needHorizontal = !1); !this._verticalScrollbar && c ? this._needVertical = !0 : this._verticalScrollbar && !c && (this._needVertical = !1); return b.needApply
            }; b.prototype.increaseVerticalScrollPosition = function (a) { this._verticalScrollbar && this._verticalScrollbar.increaseScrollPosition(a) }; b.prototype.increaseHorizontalScrollPosition = function (a) { this._horizontalScrollbar && this._horizontalScrollbar.increaseScrollPosition(a) };
            b.prototype.moveVerticalSliderToPosition = function (a) { this._verticalScrollbar && this._verticalScrollbar.moveSliderToPosition(0, a) }; b.prototype.moveHorizontalSliderToPosition = function (a) { this._horizontalScrollbar && this._horizontalScrollbar.moveSliderToPosition(a, 0) }; b.prototype.fillProperties = function (a) {
                a.scrollBarWidth && (this._scrollBarWidth = d.layoutLib.parseSize(a.scrollBarWidth), delete a.scrollBarWidth); a.frontPanel && (this._frontPanel = a.frontPanel, delete a.frontPanel); a.padding && (this._padding = a.padding,
                    delete a.padding); f.prototype.fillProperties.call(this, a)
            }; b.prototype.getContentHeight = function () { return this._container.variant.minSize.height.px }; b.prototype.getContentWidth = function () { return this._container.variant.minSize.width.px }; b.prototype.createMask = function (a) { var c = this.getBbox(); c = { d: d.bboxLib.toPath([0, 0, c.width, c.height]) }; !this._needVertical || this._needHorizontal || fa || (c.fill = this.createLinearGradient(0, a), this._containerWrapper.attr({ mask: c })) }; b.prototype.renderScrolls = function () {
                var a =
                    this, c = a.getBbox(), b = c.width, d = c.height; c = !1; a._needHorizontal && !a._horizontalScrollbar ? (a._horizontalScrollbar = a.createScrollbar(!1, b, a.getContentWidth(), function (c) { var d = -(a.getContentWidth() * c - b / 2); a._container.attr({ offsetX: d }); a.updateMaskPosition(c, Math.max(11.25, a._horizontalScrollbar.sliderSize / 2) / b, "horizontal"); a._containerWrapper.applyRefresh() }), a.addLayoutItemToMain(a._horizontalScrollbar), a._horizontalScrollbar.scrollHandler(a._scrollHandler), c = !0) : a._horizontalScrollbar && (a._horizontalScrollbar.destroy(),
                        a._horizontalScrollbar = null, c = !0); a._needVertical && !a._verticalScrollbar ? (a._verticalScrollbar = a.createScrollbar(!0, d, a.getContentHeight(), function (c) { var b = -(a.getContentHeight() * c - d / 2); a._container.attr({ offsetY: b }); a.updateMaskPosition(c, Math.max(11.25, a._verticalScrollbar.sliderSize / 2) / d, "vertical"); a._containerWrapper.applyRefresh() }), a.addLayoutItemToMain(a._verticalScrollbar), a._verticalScrollbar.scrollHandler(a._scrollHandler), c = !0) : a._verticalScrollbar && (a._verticalScrollbar.destroy(), a._verticalScrollbar =
                            null, c = !0); c && a.refresh(); a._horizontalScrollbar && a._horizontalScrollbar.hide(); a._verticalScrollbar && a._verticalScrollbar.hide()
            }; b.prototype.updateMaskPosition = function (a, c, b) { var d = c + .001; c = 1 - c - .001; a > d && a < c && 1 !== this._maskPositions[b] ? (this.createMask(1), this._maskPositions[b] = 1) : a <= d && 2 !== this._maskPositions[b] ? (this.createMask(2), this._maskPositions[b] = 2) : a >= c && 0 !== this._maskPositions[b] && (this.createMask(0), this._maskPositions[b] = 0) }; b.prototype.defaultConfig = function () {
                return d.jsLib.extendCopy(f.prototype.defaultConfig.call(this),
                    { overflow: "hidden", padding: 10, scrollBarWidth: "6px" })
            }; b.prototype.createLinearGradient = function (a, b) { var c = 2 === b; b = 1 === b; a = 0 === a; return { linearGradient: [0, 0, a ? 0 : 1, a ? 1 : 0], stops: [[0, "#222222"], [!c || b ? .15 : 0, "white"], [c || b ? .85 : 1, "white"], [1, "#222222"]] } }; b.prototype.createContainerPanel = function () { this._container || (this._container = this.layout.panel({ width: "100%" }), this._containerWrapper = this.layout.panel({ width: "100%" }), this._container.add(this._containerWrapper), this.addLayoutItemToMain(this._containerWrapper)) };
            b.prototype.createScrollbar = function (a, b, d, f) { this.createContainerPanel(); var c = 0; if (a && this._needHorizontal || !a && this._needVertical) c = this._scrollBarWidth.px; a = new ea(this.layout, { xAlignment: a ? "right" : "left", yAlignment: a ? "top" : "bottom", width: a ? this._scrollBarWidth.px : b - c, height: a ? b - c : this._scrollBarWidth.px, vertical: a, hasButtons: !1 }); a.pageSize = b; a.scrollSize = d; a.callback = f; return a }; b.prototype.hasVerticalScroll = function () {
                var a = this.getBbox(), b = !1; this._frontPanel && (b = this._frontPanel.getBbox().height <
                    a.height); return b || this.getContentHeight() > a.height
            }; b.prototype.hasHorizontalScroll = function () { var a = this.getBbox(), b = !1; this._frontPanel && (b = this._frontPanel.getBbox().width < a.width); return b || this.getContentWidth() > a.width }; b.prototype.calculateNewHeight = function () {
                var a = this.getGlobalBbox(), b = this._frontPanel ? this._frontPanel.getGlobalBbox() : null; if (!b) return { needApply: !1, height: a.height }; b = d.bboxLib.clip([a.x, a.y, a.width, a.height], [b.x, b.y, b.width, b.height]); return .001 < Math.abs(b[3] - a.height) ?
                    { needApply: !0, height: b[3] - this._padding } : { needApply: !1, height: b[3] }
            }; b.prototype.addLayoutItemToMain = function (a, b) { this.childElements[b || "push"](a); this.itemsCount = this.childElements.length; a.parent = this; a.notifyParentChanged(); a.wasAdded = !0; a.setRenewComplete(this.wasAdded) }; b.prototype.showScrolls = function () { this._horizontalScrollbar && this._horizontalScrollbar.show(); this._verticalScrollbar && this._verticalScrollbar.show() }; b.prototype.hideScrolls = function () {
                this._horizontalScrollbar && this._horizontalScrollbar.hide();
                this._verticalScrollbar && this._verticalScrollbar.hide()
            }; b.prototype.attachEvents = function () { this.attachWheelEvent(); this.attachDocumentEvents() }; b.prototype.getWheelDirection = function (a) { return Math.max(-1, Math.min(1, a.wheelDelta || -a.detail)) }; b.prototype.attachWheelEvent = function () {
                if (!d.isTouchDevice()) {
                    var a = this; a.el.on("wheel", function (b) {
                        var c = a.getWheelDirection(b); b.shiftKey ? a._needHorizontal && a._horizontalScrollbar.increaseScrollPosition(-c * a._horizontalScrollbar.sliderSize) : a._needVertical &&
                            a._verticalScrollbar.increaseScrollPosition(-c * a._verticalScrollbar.sliderSize); b.preventDefault()
                    })
                }
            }; b.prototype.sliderSelected = function () { return this._horizontalScrollbar && this._horizontalScrollbar.sliderSelected() || this._verticalScrollbar && this._verticalScrollbar.sliderSelected() ? !0 : !1 }; b.prototype.attachDocumentEvents = function () {
                var a = this, b = a.layout.renderer.documentElement, e = !1, f = null; d.isTouchDevice() && (a._docTouchstartHandler = function (b) {
                    var c = b.changedTouches[0]; a.isInPanelArea({
                        clientX: c.clientX,
                        clientY: c.clientY, pageX: c.pageX, pageY: c.pageY
                    }) && b.preventDefault()
                }, b.el.addEventListener("touchstart", a._docTouchstartHandler, { passive: !1 })); a._docVDownHandler = function (b) { var c = a.toRelativeXY(b); !a.isInPanelArea(b) || !d.isTouchDevice() || a._horizontalScrollbar && a._horizontalScrollbar.isInArea(b) || a._verticalScrollbar && a._verticalScrollbar.isInArea(b) || (e = !0, f = c, b.preventDefault()) }; a._docVMoveHandler = d.jsLib.throttle(function (b) {
                    a.isInPanelArea(b) && !d.isTouchDevice() ? a.showScrolls() : a.sliderSelected() ||
                        a.hideScrolls(); if (e) { b = a.toRelativeXY(b); if (a._horizontalScrollbar) { var c = f[0] - b[0]; a._horizontalScrollbar.increaseTouchScrollPosition(c) } a._verticalScrollbar && (c = f[1] - b[1], a._verticalScrollbar.increaseTouchScrollPosition(c)); f = b }
                }, 32); a._docVUpHandler = function () { e = !1 }; b.on("vdown", a._docVDownHandler); b.on("vmove", a._docVMoveHandler); b.on("vup", a._docVUpHandler)
            }; b.prototype.isInPanelArea = function (a) {
                var b = this.toRelativeXY(a); a = b[0]; b = b[1]; var d = this.getBbox(); return 0 > a || 0 > b || a > d.width || b > d.height ?
                    !1 : !0
            }; b.prototype.createRect = function () { var a = this.getBbox(); this._rect = this.layout.rect({ fill: "white", opacity: "0.0", width: a.width, height: a.height }); this.addLayoutItemToMain(this._rect, "unshift") }; b.prototype.detachEvents = function () { var a = this.layout.renderer.documentElement; a.un("vdown", this._docVDownHandler); a.un("vmove", this._docVMoveHandler); a.un("vup", this._docVUpHandler); this._docTouchstartHandler && a.el.removeEventListener("touchstart", this._docTouchstartHandler) }; return b
        }(d.Panel), ia = d.jsLib.plainArray(["image/png",
            "image/jpeg", "application/pdf", "image/svg+xml"]), S = function (f) {
                function b() {
                    var a = null !== f && f.apply(this, arguments) || this; a.defaults = function () {
                        var b = {
                            exportOptions: { server: null }, items: {
                                export: {
                                    position: "trtr", outline: { color: "none" }, fill: "none", ignoreDefault: !0, padding: 0, margin: 1, autoSelectFirstItem: !0, normalStateOnItemSelect: !0, hoverOnEnter: !1, invertKeys: !0, description: "export menu", icon: { name: "system/{os}/export", width: 32, height: 32, padding: 8, fill: "rgb(90,90,90)", outerShape: "none" }, events: {
                                        click: "showItems",
                                        changefocus: "changeFocus"
                                    }, states: { hover: { fill: "none", icon: { outerShape: "circle" } }, select: { icon: { outerShape: "circle" } } }, defaultItem: { visible: !0, outline: { color: "none" }, fill: "none", radius: 0, opacity: .7, margin: 0, padding: [10, 5], icon: { width: 32, height: 32, fill: "#FFFFFF" }, states: { hover: { fill: "rgb(0,0,0)", opacity: .9 } } }, itemsBox: { layout: "horizontal", margin: [3, 0, 3, 0], fill: "rgba(0,0,0,.7)", outline: { color: "none" } }, items: {
                                        png: { description: "png", icon: { name: "system/default/png" }, events: { click: "image/png" } }, jpg: {
                                            description: "jpg",
                                            icon: { name: "system/default/jpg" }, events: { click: "image/jpeg" }
                                        }, pdf: { description: "pdf", icon: { name: "system/default/pdf" }, events: { click: "application/pdf" } }, svg: { description: "svg", icon: { name: "system/default/svg" }, events: { click: "image/svg+xml" } }, print: { description: "print", icon: { name: "system/default/print" }, events: { click: "print" } }
                                    }, visible: "auto"
                                }, resetZoom: {
                                    visible: !1, sortOrder: 3, zIndex: 2, margin: 10, position: "tltl", stackDirection: "none", ignoreDefault: !0, description: "reset zoom", fill: "rgb(250,250,250)", label: {
                                        text: "Reset Zoom",
                                        color: "rgb(0,0,0)"
                                    }, icon: { name: "system/default/zoom/zoom-out", fill: "rgb(90,90,90)" }, events: { click: "zoomOut" }, states: { hover: { fill: "rgb(90,90,90)", label: { color: "#FFFFFF" }, icon: { fill: "#FFFFFF" } } }
                                }
                            }, defaultItem: { sortOrder: 2, margin: 2, position: "tltl", stackDirection: "auto", events: { click: "showItems" } }
                        }, e = a.chart.options("languageStrings"); e && (d.jsLib.setPathVal(b, "items.export.tooltip", e.exportButtonTooltip), d.jsLib.setPathVal(b, "items.export.items.print.tooltip", e.printButtonTooltip), d.jsLib.setPathVal(b,
                            "items.resetZoom.label.text", e.resetZoomText), d.jsLib.setPathVal(b, "items.resetZoom.tooltip", e.resetZoomTooltip)); a._defaultApplied || (d.jsLib.evalPath(a, "chart.userOptions.toolbar.items.resetZoom.position") && d.jsLib.setPathVal(b, "items.resetZoom.stackDirection", "auto"), !1 === d.jsLib.evalPath(a, "chart.userOptions.toolbar.items.resetZoom.visible") && d.jsLib.setPathVal(b, "items.resetZoom.exclude", !0)); a._defaultApplied = !0; return b
                    }; a.normalizeToolbarOptions = F; return a
                } p(b, f); b.prototype.activateAccessibility =
                    function (a, b) { var c = this; this._accessibilityActivated = a; var d = (this._accessibilityTabIndex = b) || 0, f = ["export", "resetZoom"], m = []; this.items().each(function (a) { a.activateAccessibility(!1) }); a && (this.items().each(function (b) { b.parentItem === c && (0 <= f.indexOf(b.key) ? m.push(b) : (b.activateAccessibility(a, d), ++d)) }), m.forEach(function (b) { b.activateAccessibility(a, d); ++d })) }; b.prototype.reactivateAccessibility = function () { this.activateAccessibility(this._accessibilityActivated, this._accessibilityTabIndex) }; b.prototype.defaultOptions =
                        function () { var a = this.userOptions, b = this.defaults(); a.position && d.jsLib.setPathVal(b, "items.export.position", a.position); b.actions = this.getEventActions(); return b }; b.prototype.setRootVisuals = function () { return this }; b.prototype.initFP = function () { this.isVisible = !0; f.prototype.initFP.call(this); this.chart.uiItems = this.items }; b.prototype.options = function (a, b) {
                            if (!this._enabled && a && !1 === a.visible) {
                                var c = this.chart.currentOptions.axisToZoom; if (c && "none" !== c) a.items["export"].visible = !1, delete a.visible;
                                else return this
                            } c = d.jsLib.epa(this.chart.userOptions, ["toolbar", "items", "export"]); var h = !0; c && d.jsLib.def(c.visible) ? h = !0 === c.visible ? !1 : !0 : c && (h = !1); d.jsLib.setPathVal(a, "items.export.exclude", h); this._enabled = !0; F(a); return f.prototype.options.call(this, a, b)
                        }; b.prototype.changeFocus = function (a, b, d) { d.eventArgs.hasFocus && this.showItems(!0) }; b.prototype.applyOptions = function (a) {
                            var b = this, e = this.currentOptions.items, f = b.currentOptions.defaultItem, g = b._items; a = function () {
                                b.checkVisibility(b.currentOptions);
                                return b
                            }; if (!e) return a(); if (!g.length) return b.createUiItems(e, !0), a(); d.jsLib.eachKey(e, function (a) { var b = d.jsLib.merge({}, f, e[a]), c = d.jsLib.find(g, function (b) { return b.key === a }); c && c.options(b) }); return a()
                        }; b.prototype.showItems = function (a) { var b = this.items().items; d.jsLib.each(b, function (b) { b.showItems(a, !0) }) }; b.prototype.visible = function (a) {
                            var b = this._items, e = !0 === a, f = this._visibleState = e ? this._visibleState || {} : {}; d.jsLib.each(b, function (a) {
                                e || (f[a.key] = a.isVisible); a.options({
                                    visible: e ?
                                        f[a.key] : !1
                                })
                            }); this.isVisible = a; return this
                        }; b.prototype.getEventActions = function () { var a = this, b = this, e = { print: function () { return b.print() }, zoomOut: function () { return b.doZoomOut() }, changeFocus: function (a, c, d) { return b.changeFocus(a, c, d) } }; d.jsLib.eachKey(ia, function (b) { e[b] = function () { return a.export(b) } }); return e }; b.prototype.export = function (a) { this.showItems(!1); this.chart.exportImage({ server: this.currentOptions.exportOptions.server, imageType: a }) }; b.prototype.print = function () {
                            this.showItems(!1);
                            this.chart.print()
                        }; b.prototype.zoomInOut = function (a) { var b = this._items; b && (b = d.jsLib.find(b, function (a) { return "resetZoom" === a.key })) && this.isVisible && (b.options({ visible: a }, { skipReflow: !0 }), b.select(!1)) }; b.prototype.doZoomOut = function () { var a = d.jsLib.find(this._items, function (a) { return "resetZoom" === a.key }); a && (a.options({ visible: !1 }, { skipReflow: !0 }), a.select(!1), a.hover(!1), this.chart.chartAreas(0).resetZoom()) }; return b
            }(t); d.iconsStore.registerIcons({
                "system/android/export": "M5.2 12.3h5.7V6.6h3.7L8 0 1.4 6.6h3.7l.1 5.7zM0 14.1h16V16H0v-1.9z",
                "system/default/add": "M38 26H26v12h-4V26H10v-4h12V10h4v12h12v4z", "system/default/check": "M18 32.34L9.66 24l-2.83 2.83L18 38l24-24-2.83-2.83z", "system/default/close": "M8.8 8L15.9.9c.2-.2.2-.6 0-.8-.2-.2-.6-.2-.8 0L8 7.2.9.2C.7 0 .3 0 .1.2S-.1.8.1 1l7.1 7-7.1 7.1c-.2.2-.2.6 0 .8.2.2.6.2.8 0L8 8.8l7.1 7.1c.2.2.6.2.8 0 .2-.2.2-.6 0-.8L8.8 8z", "system/default/expand-less": "M24 16L12 28l2.83 2.83L24 21.66l9.17 9.17L36 28z", "system/default/expand-more": "M33.17 17.17L24 26.34l-9.17-9.17L12 20l12 12 12-12z",
                "system/default/export": "M15 12c-.6 0-1 .4-1 1v1H2v-1c0-.6-.4-1-1-1s-1 .4-1 1v2c0 .6.4 1 1 1h14c.6 0 1-.4 1-1v-2c0-.6-.4-1-1-1zM5.2 5.2L7 3.4V11c0 .6.4 1 1 1s1-.4 1-1V3.4l1.8 1.8c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4L8.7.3C8.6.2 8.5.1 8.4.1c-.3-.1-.5-.1-.8 0-.1 0-.2.1-.3.2L3.8 3.8c-.4.4-.4 1 0 1.4.3.4 1 .4 1.4 0z", "system/default/info": "M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm2 30h-4V22h4v12zm0-16h-4v-4h4v4z", "system/default/jpg": "M12.4 14.8c.2-.2.2-.4.2-.6 0-.3-.1-.5-.2-.7-.2-.2-.4-.3-.7-.3h-1.1V15h1c.4 0 .5 0 .8-.2zm9.3-8.1L15.3.3c-.2-.2-.4-.3-.7-.3H3c-.6 0-1 .4-1 1v22c0 .6.4 1 1 1h18c.6 0 1-.4 1-1V7.4c0-.3-.1-.5-.3-.7zM15 1.4L20.6 7H15V1.4zM21 23H3v-3h18v3zM4.6 16.3h1.2c0 .3.1.5.2.6.1.1.3.2.6.2.2 0 .4-.1.5-.2.1-.1.2-.4.2-.7v-3.9h1.2v3.9c0 .4-.1.7-.2.9-.2.2-.2.4-.7.6-.3.2-.6.3-1 .3-.6 0-1.1-.2-1.4-.5s-.6-.6-.6-1.2zM9.4 18v-5.7h2.2c.4 0 .8.1 1.1.2s.6.4.7.7c.1.2.3.6.3 1 0 .6-.2 1-.6 1.3-.4.3-.9.5-1.6.5h-1v2H9.4zm6.6-1.3c.2.3.6.5 1 .5s.8-.1.9-.3v-1h-1.1V15H19v2.3c-.2.3-.5.4-.9.6-.4.2-.8.2-1.3.2s-.9-.1-1.3-.3-.7-.5-.9-.9c-.2-.4-.3-.9-.3-1.4V15c0-.6.1-1.1.3-1.5.2-.4.4-.7.8-.9.4-.3.8-.4 1.3-.4.7 0 1.2.2 1.6.5.4.3.6.8.7 1.4h-1c-.1-.3-.2-.5-.3-.6-.1-.1-.4-.3-.7-.3-.4 0-.7.1-.9.4-.2.3-.3.7-.3 1.3v.4c0 .3 0 1.1.2 1.4zm5-6.7H3V1h11v6c0 .6.4 1 1 1h6v2z",
                "system/default/pause": "M12 38h8V10h-8v28zm16-28v28h8V10h-8z", "system/default/pdf": "M8.8 13.9c0-1.1-1.8-.8-1.8-.8v1.6s1.8.3 1.8-.8zm4.5.7c0-.5-.1-.9-.3-1.2-.2-.3-.5-.4-.9-.4h-.5v3.3h.4c.4 0 .7-.1.9-.4.2-.3.4-.6.4-1.1v-.2zm8.4-7.9L15.3.3c-.2-.2-.4-.3-.7-.3H3c-.6 0-1 .4-1 1v22c0 .6.4 1 1 1h18c.6 0 1-.4 1-1V7.4c0-.3-.1-.5-.3-.7zM15 1.4L20.6 7H15V1.4zM21 23H3v-3h18v3zM6 17.4v-5.1h1.9c.4 0 .7.1 1 .2.3.1.5.3.7.6.2.3.2.5.2.9 0 .5-.2.9-.5 1.2s-.8.4-1.4.4H7v1.8H6zm4.5-.3v-4.8H12c.4 0 .8.1 1.2.3.3.2.6.5.8.8.2.3.3.8.3 1.2v.2c0 .5-.1.9-.3 1.2-.2.4-.5.6-.8.8s-.7.3-1.2.3h-1.5zm7.6-2.8v.9h-2v2h-1v-5h3.2v.8h-2.2v1.3h2zM21 10H3V1h11v6c0 .6.4 1 1 1h6v2z",
                "system/default/play": "M16 10v28l22-14z", "system/default/png": "M7.9 14.5c.1-.1.2-.3.2-.5s0-.4-.2-.6c-.1-.2-.4-.2-.6-.2h-.9v1.6h.9c.2 0 .4-.1.6-.3zm13.8-7.8L15.3.3c-.2-.2-.4-.3-.7-.3H3c-.6 0-1 .4-1 1v22c0 .6.4 1 1 1h18c.6 0 1-.4 1-1V7.4c0-.3-.1-.5-.3-.7zM15 1.4L20.6 7H15V1.4zM21 23H3v-3h18v3zM5.3 12.3h1.9c.4 0 .7.1 1 .2.3.1.5.3.7.6s.2.5.2.9c0 .5-.2.9-.5 1.2s-.8.4-1.4.4h-.8v1.8H5.3v-5.1zm4.5 5v-5h1l2 3.3v-3.3h1v5h-1l-2-3.3v3.3h-1zm6.2-1.2c.3.3.5.4.9.4s.7-.1.8-.2v-.9h-.9v-.8h2v2c-.2.2-.4.4-.8.5-.3.1-.7.2-1.1.2s-.8-.1-1.1-.3c-.3-.2-.6-.5-.8-.8-.1-.3-.3-.8-.3-1.3v-.3c0-.5.1-.9.3-1.3.2-.4.4-.6.7-.8s.7-.3 1.1-.3c.6 0 1.1.1 1.4.4.3.3.5.7.6 1.2h-1c0-.3-.1-.5-.3-.6-.2-.1-.4-.2-.6-.2-.3 0-.6.1-.8.4-.2.3-.3.7-.3 1.2v.3c0 .6 0 .9.2 1.2zm5-6.1H3V1h11v6c0 .6.4 1 1 1h6v2z",
                "system/default/print": "M23.3 4.5h-1.9V.8c0-.5-.4-.8-.8-.8H3.4c-.4 0-.8.3-.8.8v3.8H.8c-.5-.1-.8.2-.8.7v13.5c0 .4.3.8.8.8h1.9v3.8c-.1.3.3.6.7.6h17.3c.4 0 .8-.3.8-.8v-3.8h1.9c.4 0 .8-.3.8-.8V5.3c-.2-.5-.5-.8-.9-.8zM3.8 1.1h16.5v3.4H3.8V1.1zm16.5 21.8H3.8V12h16.5v10.9zM21.2 9c-.7 0-1.3-.6-1.3-1.3s.6-1.3 1.3-1.3 1.3.6 1.3 1.3S21.9 9 21.2 9zm-2.1 4.1H4.9v1.5h14.3v-1.5zm0 3H4.9v1.5h14.3v-1.5zm-5.2 3h-9v1.5h9v-1.5z", "system/default/remove": "M38 26H10v-4h28v4z", "system/default/settings": "M38.86 25.95c.08-.64.14-1.29.14-1.95s-.06-1.31-.14-1.95l4.23-3.31c.38-.3.49-.84.24-1.28l-4-6.93c-.25-.43-.77-.61-1.22-.43l-4.98 2.01c-1.03-.79-2.16-1.46-3.38-1.97L29 4.84c-.09-.47-.5-.84-1-.84h-8c-.5 0-.91.37-.99.84l-.75 5.3a14.8 14.8 0 0 0-3.38 1.97L9.9 10.1a1 1 0 0 0-1.22.43l-4 6.93c-.25.43-.14.97.24 1.28l4.22 3.31C9.06 22.69 9 23.34 9 24s.06 1.31.14 1.95l-4.22 3.31c-.38.3-.49.84-.24 1.28l4 6.93c.25.43.77.61 1.22.43l4.98-2.01c1.03.79 2.16 1.46 3.38 1.97l.75 5.3c.08.47.49.84.99.84h8c.5 0 .91-.37.99-.84l.75-5.3a14.8 14.8 0 0 0 3.38-1.97l4.98 2.01a1 1 0 0 0 1.22-.43l4-6.93c.25-.43.14-.97-.24-1.28l-4.22-3.31zM24 31c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z",
                "system/default/svg": "M21.7 6.7L15.3.3c-.2-.2-.4-.3-.7-.3H3c-.6 0-1 .4-1 1v22c0 .6.4 1 1 1h18c.6 0 1-.4 1-1V7.4c0-.3-.1-.5-.3-.7zM15 1.4L20.6 7H15V1.4zM21 23H3v-3h18v3zM8 15.5c-.1-.1-.4-.2-.7-.3s-.6-.2-.8-.3c-.6-.3-.8-.7-.8-1.2 0-.3.1-.5.2-.7.2-.2.4-.4.7-.5.3-.1.6-.2 1-.2s.7.1 1 .2c.3.1.5.3.6.5.2.2.2.5.2.8h-1c0-.2-.1-.4-.2-.5-.3-.2-.5-.3-.8-.3-.3 0-.4.1-.6.2-.1.1-.2.2-.2.4s.1.3.2.4c.2.1.4.2.7.3.6.2 1 .4 1.3.7s.4.6.4 1-.2.8-.5 1-.7.3-1.3.3c-.4 0-.7-.1-1-.2s-.5-.3-.7-.6c-.1-.2-.2-.5-.2-.8h1c0 .5.3.8 1 .8.2 0 .4 0 .6-.1.1-.1.2-.2.2-.4s-.1-.4-.3-.5zm1.5-3.2h1.1l1.1 3.7 1.1-3.7h1.1l-1.7 5h-1.1l-1.6-5zm6.2 3.8c.2.3.5.4.9.4s.7-.1.8-.2v-.9h-.9v-.8h2v2c-.2.2-.4.4-.8.5-.3.1-.7.2-1.1.2s-.8-.1-1.1-.3c-.3-.2-.6-.5-.8-.8s-.3-.8-.3-1.3v-.3c0-.5.1-.9.3-1.3.2-.4.4-.6.7-.8s.7-.3 1.1-.3c.6 0 1.1.1 1.4.4.3.3.5.7.6 1.2h-1c0-.3-.1-.5-.3-.6-.2-.1-.5-.2-.7-.2-.3 0-.6.1-.8.4-.2.3-.3.7-.3 1.2v.3c0 .5.1.9.3 1.2zM21 10H3V1h11v6c0 .6.4 1 1 1h6v2z",
                "system/default/toggle-off": "M47 15H17C7.6 15 0 22.6 0 32s7.6 17 17 17h30c9.4 0 17-7.6 17-17s-7.6-17-17-17zM17 45C9.8 45 4 39.2 4 32s5.8-13 13-13 13 5.8 13 13-5.8 13-13 13z", "system/default/toggle-on": "M47 15H17C7.6 15 0 22.6 0 32s7.6 17 17 17h30c9.4 0 17-7.6 17-17s-7.6-17-17-17zm0 30c-7.2 0-13-5.8-13-13s5.8-13 13-13 13 5.8 13 13-5.8 13-13 13z", "system/default/zoom/arrow-down": "M14.8 6.8H10V1c0-.6-.4-1-1-1H7c-.6 0-1 .4-1 1v5.8H1.2C.1 6.8-.4 8.1.3 8.9l6.8 6.8c.5.5 1.2.5 1.7 0l6.8-6.8c.8-.8.3-2.1-.8-2.1z",
                "system/default/zoom/arrow-left": "M9.2 14.8V10H15c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1H9.2V1.2C9.2.1 7.9-.4 7.1.3L.4 7.1c-.5.5-.5 1.2 0 1.7l6.8 6.8c.7.8 2 .3 2-.8z", "system/default/zoom/arrow-right": "M6.8 1.2V6H1c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1h5.8v4.8c0 1.1 1.3 1.6 2.1.9l6.8-6.8c.5-.5.5-1.2 0-1.7L8.9.4c-.8-.8-2.1-.3-2.1.8z", "system/default/zoom/arrow-up": "M1.2 9.2H6V15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V9.2h4.8c1.1 0 1.6-1.3.9-2.1L8.9.4c-.5-.5-1.2-.5-1.7 0L.4 7.1c-.8.8-.3 2.1.8 2.1z", "system/default/zoom/zoom-out": "M19.1 15.6c.5.5 1.2.5 1.7 0l6.8-6.8c.8-.8.2-2.1-.9-2.1H22V1c0-.6-.4-1-1-1h-2c-.6 0-1 .4-1 1v5.8h-4.8c-1.1 0-1.6 1.3-.9 2.1l6.8 6.7zm-3.5 3.5l-6.8-6.8c-.8-.8-2.1-.2-2.1.9V18H1c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1h5.8v4.8c0 1.1 1.3 1.6 2.1.9l6.8-6.8c.4-.5.4-1.3-.1-1.8zM39 18h-5.8v-4.8c0-1.1-1.3-1.6-2.1-.9l-6.8 6.8c-.5.5-.5 1.2 0 1.7l6.8 6.8c.8.8 2.1.2 2.1-.9V22H39c.6 0 1-.4 1-1v-2c0-.6-.4-1-1-1zm-18.1 6.4c-.5-.5-1.2-.5-1.7 0l-6.8 6.8c-.8.8-.2 2.1.9 2.1H18V39c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-5.8h4.8c1.1 0 1.6-1.3.9-2.1l-6.8-6.7z",
                "system/ios/export": "M10.5 4c-.3 0-.5.2-.5.5s.2.5.5.5H13v10H3V5h2.5c.3 0 .5-.2.5-.5S5.8 4 5.5 4H2v12h12V4h-3.5zM6.2 3l1.3-1.3v8.8c0 .3.2.5.5.5s.5-.2.5-.5V1.7L9.8 3c.2.2.5.2.7 0 .2-.2.2-.5 0-.7L8.4.1S8.3 0 8.2 0h-.4c-.1 0-.1.1-.2.1L5.5 2.3c-.2.2-.2.5 0 .7.2.2.5.2.7 0z", "system/winphone/export": "M14 12v2H2v-2H0v4h16v-4h-2zm-7 0h2V3.8l2.6 2.6V3.6L8 0 4.4 3.6v2.8L7 3.8V12z"
            }, !1); d.registerPanel("checkbox", x); d.registerPanel("toggle", H); d.registerPanel("button", u); d.registerPanel("radio", I); d.registerPanel("option",
                v); d.registerPanel("input", A); d.registerPanel("file", ba); d.registerPanel("color", B); d.registerPanel("range", da); d.registerPanel("scroll", ha); d.moduleLoader.registerModule("modules/toolbar") && Q()
})(JSC.internal._modules.toolbar.export);