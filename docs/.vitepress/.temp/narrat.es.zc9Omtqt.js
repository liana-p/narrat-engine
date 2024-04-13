import { defineComponent, ref, computed, onMounted, openBlock, createElementBlock, createElementVNode, normalizeClass, normalizeStyle, toDisplayString, createVNode, unref, onUnmounted, createCommentVNode, watch, Fragment, Transition, withCtx, createBlock, TransitionGroup, renderList, Teleport, nextTick, onBeforeMount, shallowRef, createApp, effectScope, markRaw, reactive, resolveDirective, withDirectives, vModelText, resolveDynamicComponent, useSlots, renderSlot, createTextVNode, toRaw, hasInjectionContext, inject, getCurrentInstance, resolveComponent, normalizeProps, mergeProps, isRef, isReactive, toRef, getCurrentScope, onScopeDispose, vModelCheckbox, toRefs, createStaticVNode, pushScopeId, popScopeId } from "vue";
var zp = Object.defineProperty;
var Qp = (e2, t, n) => t in e2 ? zp(e2, t, { enumerable: true, configurable: true, writable: true, value: n }) : e2[t] = n;
var qe = (e2, t, n) => (Qp(e2, typeof t != "symbol" ? t + "" : t, n), n);
var Rn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ta(e2) {
  return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
}
function cm(e2) {
  throw new Error('Could not dynamically require "' + e2 + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var Fc = { exports: {} };
/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.8+1e68dce6
 */
(function(e2, t) {
  (function(n, r) {
    e2.exports = r();
  })(Rn, function() {
    function n(G) {
      var se = typeof G;
      return G !== null && (se === "object" || se === "function");
    }
    function r(G) {
      return typeof G == "function";
    }
    var i = void 0;
    Array.isArray ? i = Array.isArray : i = function(G) {
      return Object.prototype.toString.call(G) === "[object Array]";
    };
    var s = i, o = 0, l = void 0, u = void 0, c = function(se, ae) {
      L[o] = se, L[o + 1] = ae, o += 2, o === 2 && (u ? u(P) : Y());
    };
    function m(G) {
      u = G;
    }
    function a(G) {
      c = G;
    }
    var d = typeof window < "u" ? window : void 0, p = d || {}, h = p.MutationObserver || p.WebKitMutationObserver, v = typeof self > "u" && typeof process < "u" && {}.toString.call(process) === "[object process]", T = typeof Uint8ClampedArray < "u" && typeof importScripts < "u" && typeof MessageChannel < "u";
    function _() {
      return function() {
        return process.nextTick(P);
      };
    }
    function E() {
      return typeof l < "u" ? function() {
        l(P);
      } : B();
    }
    function j() {
      var G = 0, se = new h(P), ae = document.createTextNode("");
      return se.observe(ae, { characterData: true }), function() {
        ae.data = G = ++G % 2;
      };
    }
    function F() {
      var G = new MessageChannel();
      return G.port1.onmessage = P, function() {
        return G.port2.postMessage(0);
      };
    }
    function B() {
      var G = setTimeout;
      return function() {
        return G(P, 1);
      };
    }
    var L = new Array(1e3);
    function P() {
      for (var G = 0; G < o; G += 2) {
        var se = L[G], ae = L[G + 1];
        se(ae), L[G] = void 0, L[G + 1] = void 0;
      }
      o = 0;
    }
    function Z() {
      try {
        var G = Function("return this")().require("vertx");
        return l = G.runOnLoop || G.runOnContext, E();
      } catch {
        return B();
      }
    }
    var Y = void 0;
    v ? Y = _() : h ? Y = j() : T ? Y = F() : d === void 0 && typeof cm == "function" ? Y = Z() : Y = B();
    function te(G, se) {
      var ae = this, pe = new this.constructor(X);
      pe[Q] === void 0 && M(pe);
      var Se = ae._state;
      if (Se) {
        var xe = arguments[Se - 1];
        c(function() {
          return ie(Se, pe, xe, ae._result);
        });
      } else
        R(ae, pe, G, se);
      return pe;
    }
    function z(G) {
      var se = this;
      if (G && typeof G == "object" && G.constructor === se)
        return G;
      var ae = new se(X);
      return C(ae, G), ae;
    }
    var Q = Math.random().toString(36).substring(2);
    function X() {
    }
    var re = void 0, Pe = 1, Me = 2;
    function dt() {
      return new TypeError("You cannot resolve a promise with itself");
    }
    function tt() {
      return new TypeError("A promises callback cannot return that same promise.");
    }
    function pt(G, se, ae, pe) {
      try {
        G.call(se, ae, pe);
      } catch (Se) {
        return Se;
      }
    }
    function N(G, se, ae) {
      c(function(pe) {
        var Se = false, xe = pt(ae, se, function(Ee) {
          Se || (Se = true, se !== Ee ? C(pe, Ee) : b(pe, Ee));
        }, function(Ee) {
          Se || (Se = true, $(pe, Ee));
        }, "Settle: " + (pe._label || " unknown promise"));
        !Se && xe && (Se = true, $(pe, xe));
      }, G);
    }
    function y(G, se) {
      se._state === Pe ? b(G, se._result) : se._state === Me ? $(G, se._result) : R(se, void 0, function(ae) {
        return C(G, ae);
      }, function(ae) {
        return $(G, ae);
      });
    }
    function k(G, se, ae) {
      se.constructor === G.constructor && ae === te && se.constructor.resolve === z ? y(G, se) : ae === void 0 ? b(G, se) : r(ae) ? N(G, se, ae) : b(G, se);
    }
    function C(G, se) {
      if (G === se)
        $(G, dt());
      else if (n(se)) {
        var ae = void 0;
        try {
          ae = se.then;
        } catch (pe) {
          $(G, pe);
          return;
        }
        k(G, se, ae);
      } else
        b(G, se);
    }
    function g(G) {
      G._onerror && G._onerror(G._result), H(G);
    }
    function b(G, se) {
      G._state === re && (G._result = se, G._state = Pe, G._subscribers.length !== 0 && c(H, G));
    }
    function $(G, se) {
      G._state === re && (G._state = Me, G._result = se, c(g, G));
    }
    function R(G, se, ae, pe) {
      var Se = G._subscribers, xe = Se.length;
      G._onerror = null, Se[xe] = se, Se[xe + Pe] = ae, Se[xe + Me] = pe, xe === 0 && G._state && c(H, G);
    }
    function H(G) {
      var se = G._subscribers, ae = G._state;
      if (se.length !== 0) {
        for (var pe = void 0, Se = void 0, xe = G._result, Ee = 0; Ee < se.length; Ee += 3)
          pe = se[Ee], Se = se[Ee + ae], pe ? ie(ae, pe, Se, xe) : Se(xe);
        G._subscribers.length = 0;
      }
    }
    function ie(G, se, ae, pe) {
      var Se = r(ae), xe = void 0, Ee = void 0, Tt = true;
      if (Se) {
        try {
          xe = ae(pe);
        } catch (zt) {
          Tt = false, Ee = zt;
        }
        if (se === xe) {
          $(se, tt());
          return;
        }
      } else
        xe = pe;
      se._state !== re || (Se && Tt ? C(se, xe) : Tt === false ? $(se, Ee) : G === Pe ? b(se, xe) : G === Me && $(se, xe));
    }
    function ne(G, se) {
      try {
        se(function(pe) {
          C(G, pe);
        }, function(pe) {
          $(G, pe);
        });
      } catch (ae) {
        $(G, ae);
      }
    }
    var oe = 0;
    function je() {
      return oe++;
    }
    function M(G) {
      G[Q] = oe++, G._state = void 0, G._result = void 0, G._subscribers = [];
    }
    function ee() {
      return new Error("Array Methods must be provided an Array");
    }
    var he = function() {
      function G(se, ae) {
        this._instanceConstructor = se, this.promise = new se(X), this.promise[Q] || M(this.promise), s(ae) ? (this.length = ae.length, this._remaining = ae.length, this._result = new Array(this.length), this.length === 0 ? b(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(ae), this._remaining === 0 && b(this.promise, this._result))) : $(this.promise, ee());
      }
      return G.prototype._enumerate = function(ae) {
        for (var pe = 0; this._state === re && pe < ae.length; pe++)
          this._eachEntry(ae[pe], pe);
      }, G.prototype._eachEntry = function(ae, pe) {
        var Se = this._instanceConstructor, xe = Se.resolve;
        if (xe === z) {
          var Ee = void 0, Tt = void 0, zt = false;
          try {
            Ee = ae.then;
          } catch (Mt) {
            zt = true, Tt = Mt;
          }
          if (Ee === te && ae._state !== re)
            this._settledAt(ae._state, pe, ae._result);
          else if (typeof Ee != "function")
            this._remaining--, this._result[pe] = ae;
          else if (Se === ot) {
            var Qt = new Se(X);
            zt ? $(Qt, Tt) : k(Qt, ae, Ee), this._willSettleAt(Qt, pe);
          } else
            this._willSettleAt(new Se(function(Mt) {
              return Mt(ae);
            }), pe);
        } else
          this._willSettleAt(xe(ae), pe);
      }, G.prototype._settledAt = function(ae, pe, Se) {
        var xe = this.promise;
        xe._state === re && (this._remaining--, ae === Me ? $(xe, Se) : this._result[pe] = Se), this._remaining === 0 && b(xe, this._result);
      }, G.prototype._willSettleAt = function(ae, pe) {
        var Se = this;
        R(ae, void 0, function(xe) {
          return Se._settledAt(Pe, pe, xe);
        }, function(xe) {
          return Se._settledAt(Me, pe, xe);
        });
      }, G;
    }();
    function fe(G) {
      return new he(this, G).promise;
    }
    function we(G) {
      var se = this;
      return s(G) ? new se(function(ae, pe) {
        for (var Se = G.length, xe = 0; xe < Se; xe++)
          se.resolve(G[xe]).then(ae, pe);
      }) : new se(function(ae, pe) {
        return pe(new TypeError("You must pass an array to race."));
      });
    }
    function Ae(G) {
      var se = this, ae = new se(X);
      return $(ae, G), ae;
    }
    function Ve() {
      throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
    }
    function lt() {
      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
    }
    var ot = function() {
      function G(se) {
        this[Q] = je(), this._result = this._state = void 0, this._subscribers = [], X !== se && (typeof se != "function" && Ve(), this instanceof G ? ne(this, se) : lt());
      }
      return G.prototype.catch = function(ae) {
        return this.then(null, ae);
      }, G.prototype.finally = function(ae) {
        var pe = this, Se = pe.constructor;
        return r(ae) ? pe.then(function(xe) {
          return Se.resolve(ae()).then(function() {
            return xe;
          });
        }, function(xe) {
          return Se.resolve(ae()).then(function() {
            throw xe;
          });
        }) : pe.then(ae, ae);
      }, G;
    }();
    ot.prototype.then = te, ot.all = fe, ot.race = we, ot.resolve = z, ot.reject = Ae, ot._setScheduler = m, ot._setAsap = a, ot._asap = c;
    function Ne() {
      var G = void 0;
      if (typeof Rn < "u")
        G = Rn;
      else if (typeof self < "u")
        G = self;
      else
        try {
          G = Function("return this")();
        } catch {
          throw new Error("polyfill failed because global object is unavailable in this environment");
        }
      var se = G.Promise;
      if (se) {
        var ae = null;
        try {
          ae = Object.prototype.toString.call(se.resolve());
        } catch {
        }
        if (ae === "[object Promise]" && !se.cast)
          return;
      }
      G.Promise = ot;
    }
    return ot.polyfill = Ne, ot.Promise = ot, ot;
  });
})(Fc);
var um = Fc.exports;
um.polyfill();
class na {
  constructor() {
    qe(this, "debug");
    qe(this, "logger", {
      log: () => {
      }
    });
  }
  setupDebugger(t) {
    this.debug = t, t && (this.logger.log = console.log.bind(window.console));
  }
}
const ra = new na(), fn = ra.logger;
function Qr(e2, t) {
  return Date.now() - e2 + t;
}
function ia(e2) {
  const t = parseInt(e2, 10);
  let n = Math.floor(t / 3600), r = Math.floor((t - n * 3600) / 60), i = t - n * 3600 - r * 60;
  return n < 10 && (n = "0" + n), r < 10 && (r = "0" + r), i < 10 && (i = "0" + i), n + ":" + r + ":" + i;
}
const dm = defineComponent({
  props: {
    containerCssClass: [String, Object],
    cantClose: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.cantClose || this.$emit("close");
    }
  }
}), hn = (e2, t) => {
  const n = e2.__vccOpts || e2;
  for (const [r, i] of t)
    n[r] = i;
  return n;
}, fm = { class: "modal-header" }, pm = { class: "modal-body" }, mm = { class: "modal-footer" };
function hm(e2, t, n, r, i, s) {
  return openBlock(), createBlock(Transition, { name: "fade" }, {
    default: withCtx(() => [
      createElementVNode("div", {
        class: "modal-mask",
        onClick: t[2] || (t[2] = (...o) => e2.close && e2.close(...o))
      }, [
        createElementVNode("div", {
          class: normalizeClass(["modal-container bg-gray-800 nrt-card-4", e2.containerCssClass]),
          onClick: t[1] || (t[1] = (o) => o.stopPropagation())
        }, [
          createElementVNode("div", fm, [
            e2.cantClose ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
              key: 0,
              class: "close-button",
              onClick: t[0] || (t[0] = (...o) => e2.close && e2.close(...o))
            }, " X ")),
            renderSlot(e2.$slots, "header", {}, () => [
              createTextVNode(" default header ")
            ])
          ]),
          createElementVNode("div", pm, [
            renderSlot(e2.$slots, "body", {}, () => [
              createTextVNode(" default body ")
            ])
          ]),
          createElementVNode("div", mm, [
            renderSlot(e2.$slots, "footer")
          ])
        ], 2)
      ])
    ]),
    _: 3
  });
}
const lr = /* @__PURE__ */ hn(dm, [["render", hm]]);
function ti() {
  return `${Date.now()}-${Math.floor(
    Math.random() * 1e11
  )}-${Math.floor(Math.random() * 1e11)}`;
}
const Uc = "3.4.0";
function Cs() {
  return `NARRAT_SAVE_${de().saveFileName}`;
}
const ym = "gameSave";
let St;
function Gn() {
  if (St)
    return St;
  if (!St) {
    let e2 = null;
    try {
      let t = localStorage.getItem(Cs());
      t || (t = localStorage.getItem(ym)), t && (localStorage.setItem(`${Cs()}_BACKUP`, t), e2 = JSON.parse(t)), e2 && typeof e2 == "object" && e2.slots && e2.slots[0] && e2.slots[0].id || (e2 = null, localStorage.clear());
    } catch (t) {
      li(
        `Save file deleted because it was either broken or an outdated format: ${t}`
      );
    }
    e2 ? St = e2 : St = qc();
  }
  return vm(St), Vc(St), Ki(), St;
}
function gm() {
  St = qc(), Ki();
}
function Bc() {
  return {
    achievements: {
      achievements: {}
    },
    data: {}
  };
}
function vm(e2) {
  e2.version === "1.4.0" && (e2.globalSave = Bc(), e2.version = "1.5.0"), e2.version === "1.5.0" && (e2.version = "2.16.0"), e2.version === "2.16.0" && (e2.slots.forEach((t) => {
    t && t.saveData && (t.saveData.settings = {
      baseSettings: {
        textSpeed: 30,
        animateText: true,
        fontSize: 16
      },
      customSettings: {}
    });
  }), e2.version = "2.17.0"), e2.version === "2.17.0" && (e2.slots.forEach((t) => {
    t && t.saveData && (t.saveData.config = {
      gameCharacter: "game",
      playerCharacter: "player"
    });
  }), e2.version = "3.2.3"), e2.version === "3.2.3" && (e2.slots.forEach((t) => {
    t && t.saveData && (t.saveData.choices = {
      choices: {}
    });
  }), e2.version = "3.3.8"), e2.version === "3.3.8" && (e2.slots.forEach((t) => {
    t && t.saveData && (t.saveData.rendering = {
      dialogPanelMode: "auto"
    });
  }), e2.version = "3.3.9"), e2.version === "3.3.9" && (e2.slots.forEach((t) => {
    t && t.saveData && (t.saveData.plugins = {}, t.saveData.customStores = {});
  }), e2.version = "3.4.0");
}
function qc() {
  const e2 = {
    version: Uc,
    slots: [],
    globalSave: Bc()
  };
  return Vc(e2), e2;
}
function Vc(e2) {
  const t = de().saves.slots ?? 10;
  e2.slots.length < 1 && (e2.slots[0] = {
    slotType: "auto",
    id: ti(),
    saveData: null,
    slotNumber: 0
  }), e2.slots[0].slotType = "auto";
  for (let n = 1; n < t + 1; n++)
    e2.slots.length <= n && (e2.slots[n] = {
      slotNumber: n,
      slotType: de().saves.mode === "manual" ? "manual" : "auto",
      id: ti(),
      saveData: null
    });
}
function Hc(e2, t, n) {
  const r = Tm(n);
  if (St.slots[r])
    St.slots[r].saveData = e2;
  else {
    ue(`Tried to save to slot ${n} but it doesn't exist`);
    return;
  }
  St.globalSave = t, Ki();
}
function _m(e2) {
  St.lastSaveSlot = e2;
}
function Ki() {
  localStorage.setItem(Cs(), JSON.stringify(St));
}
function bm() {
  const e2 = St.slots.find((t) => !t.saveData);
  return e2 ? e2.id : false;
}
function Tm(e2) {
  return St.slots.findIndex((t) => t.id === e2);
}
function Ci(e2) {
  return St.slots.find((t) => t.id === e2);
}
function oa() {
  return St.slots.find((e2) => e2.slotType === "auto");
}
function Sm(e2) {
  const t = St.slots.findIndex((n) => n.id === e2);
  St.slots[t].saveData = null, Ki();
}
function wm(e2, t) {
  const n = Ci(e2);
  n && n.saveData && (n.saveData.metadata.name = t), Ki();
}
function $m() {
  return {
    saveDate: (/* @__PURE__ */ new Date()).toISOString(),
    name: "New Save"
  };
}
function Cm({
  slot: e2,
  name: t,
  extractedSave: n
}) {
  const r = Ci(e2), i = $m();
  r && r.saveData ? i.name = r.saveData.metadata.name : i.name = t ?? "Auto Save", de().saves.mode === "manual" && (i.name = "Auto Save");
  const s = {
    ...n.gameSave,
    version: Uc,
    metadata: i
  }, o = Gn().globalSave;
  Object.assign(o, n.globalSave);
  const l = {
    saveSlot: s,
    global: o
  };
  return Hc(s, o, e2), l;
}
function km(e2, t, n, r) {
  const i = e2.saveSlot, s = e2.global;
  Hc(
    {
      ...i,
      main: {
        ...i.main,
        playTime: t
      },
      metadata: {
        ...i.metadata,
        name: r ?? "Manual Save",
        saveDate: (/* @__PURE__ */ new Date()).toISOString()
      }
    },
    s,
    n
  );
}
var Kc = false;
function io(e2, t, n) {
  return Array.isArray(e2) ? (e2.length = Math.max(e2.length, t), e2.splice(t, 1, n), n) : (e2[t] = n, n);
}
function ls(e2, t) {
  if (Array.isArray(e2)) {
    e2.splice(t, 1);
    return;
  }
  delete e2[t];
}
function Om() {
  return Gc().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function Gc() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof global < "u" ? global : {};
}
const Am = typeof Proxy == "function", Em = "devtools-plugin:setup", Im = "plugin:settings:set";
let Mr, ks;
function Pm() {
  var e2;
  return Mr !== void 0 || (typeof window < "u" && window.performance ? (Mr = true, ks = window.performance) : typeof global < "u" && (!((e2 = global.perf_hooks) === null || e2 === void 0) && e2.performance) ? (Mr = true, ks = global.perf_hooks.performance) : Mr = false), Mr;
}
function Nm() {
  return Pm() ? ks.now() : Date.now();
}
class xm {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const r = {};
    if (t.settings)
      for (const o in t.settings) {
        const l = t.settings[o];
        r[o] = l.defaultValue;
      }
    const i = `__vue-devtools-plugin-settings__${t.id}`;
    let s = Object.assign({}, r);
    try {
      const o = localStorage.getItem(i), l = JSON.parse(o);
      Object.assign(s, l);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return s;
      },
      setSettings(o) {
        try {
          localStorage.setItem(i, JSON.stringify(o));
        } catch {
        }
        s = o;
      },
      now() {
        return Nm();
      }
    }, n && n.on(Im, (o, l) => {
      o === this.plugin.id && this.fallbacks.setSettings(l);
    }), this.proxiedOn = new Proxy({}, {
      get: (o, l) => this.target ? this.target.on[l] : (...u) => {
        this.onQueue.push({
          method: l,
          args: u
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (o, l) => this.target ? this.target[l] : l === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(l) ? (...u) => (this.targetQueue.push({
        method: l,
        args: u,
        resolve: () => {
        }
      }), this.fallbacks[l](...u)) : (...u) => new Promise((c) => {
        this.targetQueue.push({
          method: l,
          args: u,
          resolve: c
        });
      })
    });
  }
  async setRealTarget(t) {
    this.target = t;
    for (const n of this.onQueue)
      this.target.on[n.method](...n.args);
    for (const n of this.targetQueue)
      n.resolve(await this.target[n.method](...n.args));
  }
}
function Wc(e2, t) {
  const n = e2, r = Gc(), i = Om(), s = Am && n.enableEarlyProxy;
  if (i && (r.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !s))
    i.emit(Em, e2, t);
  else {
    const o = s ? new xm(n, i) : null;
    (r.__VUE_DEVTOOLS_PLUGINS__ = r.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: t,
      proxy: o
    }), o && t(o.proxiedTarget);
  }
}
/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */
let bi;
const Di = (e2) => bi = e2, zc = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function Ar(e2) {
  return e2 && typeof e2 == "object" && Object.prototype.toString.call(e2) === "[object Object]" && typeof e2.toJSON != "function";
}
var kn;
(function(e2) {
  e2.direct = "direct", e2.patchObject = "patch object", e2.patchFunction = "patch function";
})(kn || (kn = {}));
const Vo = typeof window < "u", ki = (process.env.NODE_ENV !== "production" || false) && process.env.NODE_ENV !== "test" && Vo, Ol = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function jm(e2, { autoBom: t = false } = {}) {
  return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e2.type) ? new Blob(["\uFEFF", e2], { type: e2.type }) : e2;
}
function sa(e2, t, n) {
  const r = new XMLHttpRequest();
  r.open("GET", e2), r.responseType = "blob", r.onload = function() {
    Jc(r.response, t, n);
  }, r.onerror = function() {
    console.error("could not download file");
  }, r.send();
}
function Qc(e2) {
  const t = new XMLHttpRequest();
  t.open("HEAD", e2, false);
  try {
    t.send();
  } catch {
  }
  return t.status >= 200 && t.status <= 299;
}
function po(e2) {
  try {
    e2.dispatchEvent(new MouseEvent("click"));
  } catch {
    const n = document.createEvent("MouseEvents");
    n.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null), e2.dispatchEvent(n);
  }
}
const mo = typeof navigator == "object" ? navigator : { userAgent: "" }, Yc = /Macintosh/.test(mo.userAgent) && /AppleWebKit/.test(mo.userAgent) && !/Safari/.test(mo.userAgent), Jc = Vo ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !Yc ? Lm : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in mo ? Dm : (
      // Fallback to using FileReader and a popup
      Rm
    )
  )
) : () => {
};
function Lm(e2, t = "download", n) {
  const r = document.createElement("a");
  r.download = t, r.rel = "noopener", typeof e2 == "string" ? (r.href = e2, r.origin !== location.origin ? Qc(r.href) ? sa(e2, t, n) : (r.target = "_blank", po(r)) : po(r)) : (r.href = URL.createObjectURL(e2), setTimeout(function() {
    URL.revokeObjectURL(r.href);
  }, 4e4), setTimeout(function() {
    po(r);
  }, 0));
}
function Dm(e2, t = "download", n) {
  if (typeof e2 == "string")
    if (Qc(e2))
      sa(e2, t, n);
    else {
      const r = document.createElement("a");
      r.href = e2, r.target = "_blank", setTimeout(function() {
        po(r);
      });
    }
  else
    navigator.msSaveOrOpenBlob(jm(e2, n), t);
}
function Rm(e2, t, n, r) {
  if (r = r || open("", "_blank"), r && (r.document.title = r.document.body.innerText = "downloading..."), typeof e2 == "string")
    return sa(e2, t, n);
  const i = e2.type === "application/octet-stream", s = /constructor/i.test(String(Ol.HTMLElement)) || "safari" in Ol, o = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((o || i && s || Yc) && typeof FileReader < "u") {
    const l = new FileReader();
    l.onloadend = function() {
      let u = l.result;
      if (typeof u != "string")
        throw r = null, new Error("Wrong reader.result type");
      u = o ? u : u.replace(/^data:[^;]*;/, "data:attachment/file;"), r ? r.location.href = u : location.assign(u), r = null;
    }, l.readAsDataURL(e2);
  } else {
    const l = URL.createObjectURL(e2);
    r ? r.location.assign(l) : location.href = l, r = null, setTimeout(function() {
      URL.revokeObjectURL(l);
    }, 4e4);
  }
}
function kt(e2, t) {
  const n = "🍍 " + e2;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(n, t) : t === "error" ? console.error(n) : t === "warn" ? console.warn(n) : console.log(n);
}
function aa(e2) {
  return "_a" in e2 && "install" in e2;
}
function Xc() {
  if (!("clipboard" in navigator))
    return kt("Your browser doesn't support the Clipboard API", "error"), true;
}
function Zc(e2) {
  return e2 instanceof Error && e2.message.toLowerCase().includes("document is not focused") ? (kt('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), true) : false;
}
async function Mm(e2) {
  if (!Xc())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e2.state.value)), kt("Global state copied to clipboard.");
    } catch (t) {
      if (Zc(t))
        return;
      kt("Failed to serialize the state. Check the console for more details.", "error"), console.error(t);
    }
}
async function Fm(e2) {
  if (!Xc())
    try {
      eu(e2, JSON.parse(await navigator.clipboard.readText())), kt("Global state pasted from clipboard.");
    } catch (t) {
      if (Zc(t))
        return;
      kt("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(t);
    }
}
async function Um(e2) {
  try {
    Jc(new Blob([JSON.stringify(e2.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (t) {
    kt("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(t);
  }
}
let Dn;
function Bm() {
  Dn || (Dn = document.createElement("input"), Dn.type = "file", Dn.accept = ".json");
  function e2() {
    return new Promise((t, n) => {
      Dn.onchange = async () => {
        const r = Dn.files;
        if (!r)
          return t(null);
        const i = r.item(0);
        return t(i ? { text: await i.text(), file: i } : null);
      }, Dn.oncancel = () => t(null), Dn.onerror = n, Dn.click();
    });
  }
  return e2;
}
async function qm(e2) {
  try {
    const n = await Bm()();
    if (!n)
      return;
    const { text: r, file: i } = n;
    eu(e2, JSON.parse(r)), kt(`Global state imported from "${i.name}".`);
  } catch (t) {
    kt("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(t);
  }
}
function eu(e2, t) {
  for (const n in t) {
    const r = e2.state.value[n];
    r ? Object.assign(r, t[n]) : e2.state.value[n] = t[n];
  }
}
function ln(e2) {
  return {
    _custom: {
      display: e2
    }
  };
}
const tu = "🍍 Pinia (root)", Os = "_root";
function Vm(e2) {
  return aa(e2) ? {
    id: Os,
    label: tu
  } : {
    id: e2.$id,
    label: e2.$id
  };
}
function Hm(e2) {
  if (aa(e2)) {
    const n = Array.from(e2._s.keys()), r = e2._s;
    return {
      state: n.map((s) => ({
        editable: true,
        key: s,
        value: e2.state.value[s]
      })),
      getters: n.filter((s) => r.get(s)._getters).map((s) => {
        const o = r.get(s);
        return {
          editable: false,
          key: s,
          value: o._getters.reduce((l, u) => (l[u] = o[u], l), {})
        };
      })
    };
  }
  const t = {
    state: Object.keys(e2.$state).map((n) => ({
      editable: true,
      key: n,
      value: e2.$state[n]
    }))
  };
  return e2._getters && e2._getters.length && (t.getters = e2._getters.map((n) => ({
    editable: false,
    key: n,
    value: e2[n]
  }))), e2._customProperties.size && (t.customProperties = Array.from(e2._customProperties).map((n) => ({
    editable: true,
    key: n,
    value: e2[n]
  }))), t;
}
function Km(e2) {
  return e2 ? Array.isArray(e2) ? e2.reduce((t, n) => (t.keys.push(n.key), t.operations.push(n.type), t.oldValue[n.key] = n.oldValue, t.newValue[n.key] = n.newValue, t), {
    oldValue: {},
    keys: [],
    operations: [],
    newValue: {}
  }) : {
    operation: ln(e2.type),
    key: ln(e2.key),
    oldValue: e2.oldValue,
    newValue: e2.newValue
  } : {};
}
function Gm(e2) {
  switch (e2) {
    case kn.direct:
      return "mutation";
    case kn.patchFunction:
      return "$patch";
    case kn.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let Gr = true;
const ho = [], yr = "pinia:mutations", xt = "pinia", { assign: Wm } = Object, To = (e2) => "🍍 " + e2;
function zm(e2, t) {
  Wc({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: ho,
    app: e2
  }, (n) => {
    typeof n.now != "function" && kt("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), n.addTimelineLayer({
      id: yr,
      label: "Pinia 🍍",
      color: 15064968
    }), n.addInspector({
      id: xt,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            Mm(t);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await Fm(t), n.sendInspectorTree(xt), n.sendInspectorState(xt);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            Um(t);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await qm(t), n.sendInspectorTree(xt), n.sendInspectorState(xt);
          },
          tooltip: "Import the state from a JSON file"
        }
      ],
      nodeActions: [
        {
          icon: "restore",
          tooltip: 'Reset the state (with "$reset")',
          action: (r) => {
            const i = t._s.get(r);
            i ? typeof i.$reset != "function" ? kt(`Cannot reset "${r}" store because it doesn't have a "$reset" method implemented.`, "warn") : (i.$reset(), kt(`Store "${r}" reset.`)) : kt(`Cannot reset "${r}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), n.on.inspectComponent((r, i) => {
      const s = r.componentInstance && r.componentInstance.proxy;
      if (s && s._pStores) {
        const o = r.componentInstance.proxy._pStores;
        Object.values(o).forEach((l) => {
          r.instanceData.state.push({
            type: To(l.$id),
            key: "state",
            editable: true,
            value: l._isOptionsAPI ? {
              _custom: {
                value: toRaw(l.$state),
                actions: [
                  {
                    icon: "restore",
                    tooltip: "Reset the state of this store",
                    action: () => l.$reset()
                  }
                ]
              }
            } : (
              // NOTE: workaround to unwrap transferred refs
              Object.keys(l.$state).reduce((u, c) => (u[c] = l.$state[c], u), {})
            )
          }), l._getters && l._getters.length && r.instanceData.state.push({
            type: To(l.$id),
            key: "getters",
            editable: false,
            value: l._getters.reduce((u, c) => {
              try {
                u[c] = l[c];
              } catch (m) {
                u[c] = m;
              }
              return u;
            }, {})
          });
        });
      }
    }), n.on.getInspectorTree((r) => {
      if (r.app === e2 && r.inspectorId === xt) {
        let i = [t];
        i = i.concat(Array.from(t._s.values())), r.rootNodes = (r.filter ? i.filter((s) => "$id" in s ? s.$id.toLowerCase().includes(r.filter.toLowerCase()) : tu.toLowerCase().includes(r.filter.toLowerCase())) : i).map(Vm);
      }
    }), n.on.getInspectorState((r) => {
      if (r.app === e2 && r.inspectorId === xt) {
        const i = r.nodeId === Os ? t : t._s.get(r.nodeId);
        if (!i)
          return;
        i && (r.state = Hm(i));
      }
    }), n.on.editInspectorState((r, i) => {
      if (r.app === e2 && r.inspectorId === xt) {
        const s = r.nodeId === Os ? t : t._s.get(r.nodeId);
        if (!s)
          return kt(`store "${r.nodeId}" not found`, "error");
        const { path: o } = r;
        aa(s) ? o.unshift("state") : (o.length !== 1 || !s._customProperties.has(o[0]) || o[0] in s.$state) && o.unshift("$state"), Gr = false, r.set(s, o, r.state.value), Gr = true;
      }
    }), n.on.editComponentState((r) => {
      if (r.type.startsWith("🍍")) {
        const i = r.type.replace(/^🍍\s*/, ""), s = t._s.get(i);
        if (!s)
          return kt(`store "${i}" not found`, "error");
        const { path: o } = r;
        if (o[0] !== "state")
          return kt(`Invalid path for store "${i}":
${o}
Only state can be modified.`);
        o[0] = "$state", Gr = false, r.set(s, o, r.state.value), Gr = true;
      }
    });
  });
}
function Qm(e2, t) {
  ho.includes(To(t.$id)) || ho.push(To(t.$id)), Wc({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: ho,
    app: e2,
    settings: {
      logStoreChanges: {
        label: "Notify about new/deleted stores",
        type: "boolean",
        defaultValue: true
      }
      // useEmojis: {
      //   label: 'Use emojis in messages ⚡️',
      //   type: 'boolean',
      //   defaultValue: true,
      // },
    }
  }, (n) => {
    const r = typeof n.now == "function" ? n.now.bind(n) : Date.now;
    t.$onAction(({ after: o, onError: l, name: u, args: c }) => {
      const m = nu++;
      n.addTimelineEvent({
        layerId: yr,
        event: {
          time: r(),
          title: "🛫 " + u,
          subtitle: "start",
          data: {
            store: ln(t.$id),
            action: ln(u),
            args: c
          },
          groupId: m
        }
      }), o((a) => {
        er = void 0, n.addTimelineEvent({
          layerId: yr,
          event: {
            time: r(),
            title: "🛬 " + u,
            subtitle: "end",
            data: {
              store: ln(t.$id),
              action: ln(u),
              args: c,
              result: a
            },
            groupId: m
          }
        });
      }), l((a) => {
        er = void 0, n.addTimelineEvent({
          layerId: yr,
          event: {
            time: r(),
            logType: "error",
            title: "💥 " + u,
            subtitle: "end",
            data: {
              store: ln(t.$id),
              action: ln(u),
              args: c,
              error: a
            },
            groupId: m
          }
        });
      });
    }, true), t._customProperties.forEach((o) => {
      watch(() => unref(t[o]), (l, u) => {
        n.notifyComponentUpdate(), n.sendInspectorState(xt), Gr && n.addTimelineEvent({
          layerId: yr,
          event: {
            time: r(),
            title: "Change",
            subtitle: o,
            data: {
              newValue: l,
              oldValue: u
            },
            groupId: er
          }
        });
      }, { deep: true });
    }), t.$subscribe(({ events: o, type: l }, u) => {
      if (n.notifyComponentUpdate(), n.sendInspectorState(xt), !Gr)
        return;
      const c = {
        time: r(),
        title: Gm(l),
        data: Wm({ store: ln(t.$id) }, Km(o)),
        groupId: er
      };
      l === kn.patchFunction ? c.subtitle = "⤵️" : l === kn.patchObject ? c.subtitle = "🧩" : o && !Array.isArray(o) && (c.subtitle = o.type), o && (c.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: o
        }
      }), n.addTimelineEvent({
        layerId: yr,
        event: c
      });
    }, { detached: true, flush: "sync" });
    const i = t._hotUpdate;
    t._hotUpdate = markRaw((o) => {
      i(o), n.addTimelineEvent({
        layerId: yr,
        event: {
          time: r(),
          title: "🔥 " + t.$id,
          subtitle: "HMR update",
          data: {
            store: ln(t.$id),
            info: ln("HMR update")
          }
        }
      }), n.notifyComponentUpdate(), n.sendInspectorTree(xt), n.sendInspectorState(xt);
    });
    const { $dispose: s } = t;
    t.$dispose = () => {
      s(), n.notifyComponentUpdate(), n.sendInspectorTree(xt), n.sendInspectorState(xt), n.getSettings().logStoreChanges && kt(`Disposed "${t.$id}" store 🗑`);
    }, n.notifyComponentUpdate(), n.sendInspectorTree(xt), n.sendInspectorState(xt), n.getSettings().logStoreChanges && kt(`"${t.$id}" store installed 🆕`);
  });
}
let nu = 0, er;
function Al(e2, t, n) {
  const r = t.reduce((i, s) => (i[s] = toRaw(e2)[s], i), {});
  for (const i in r)
    e2[i] = function() {
      const s = nu, o = n ? new Proxy(e2, {
        get(...u) {
          return er = s, Reflect.get(...u);
        },
        set(...u) {
          return er = s, Reflect.set(...u);
        }
      }) : e2;
      er = s;
      const l = r[i].apply(o, arguments);
      return er = void 0, l;
    };
}
function Ym({ app: e2, store: t, options: n }) {
  if (t.$id.startsWith("__hot:"))
    return;
  t._isOptionsAPI = !!n.state, Al(t, Object.keys(n.actions), t._isOptionsAPI);
  const r = t._hotUpdate;
  toRaw(t)._hotUpdate = function(i) {
    r.apply(this, arguments), Al(t, Object.keys(i._hmrPayload.actions), !!t._isOptionsAPI);
  }, Qm(
    e2,
    // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
    t
  );
}
function Jm() {
  const e2 = effectScope(true), t = e2.run(() => ref({}));
  let n = [], r = [];
  const i = markRaw({
    install(s) {
      Di(i), i._a = s, s.provide(zc, i), s.config.globalProperties.$pinia = i, ki && zm(s, i), r.forEach((o) => n.push(o)), r = [];
    },
    use(s) {
      return !this._a && !Kc ? r.push(s) : n.push(s), this;
    },
    _p: n,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e2,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return ki && typeof Proxy < "u" && i.use(Ym), i;
}
function ru(e2, t) {
  for (const n in t) {
    const r = t[n];
    if (!(n in e2))
      continue;
    const i = e2[n];
    Ar(i) && Ar(r) && !isRef(r) && !isReactive(r) ? e2[n] = ru(i, r) : e2[n] = r;
  }
  return e2;
}
const iu = () => {
};
function El(e2, t, n, r = iu) {
  e2.push(t);
  const i = () => {
    const s = e2.indexOf(t);
    s > -1 && (e2.splice(s, 1), r());
  };
  return !n && getCurrentScope() && onScopeDispose(i), i;
}
function Fr(e2, ...t) {
  e2.slice().forEach((n) => {
    n(...t);
  });
}
const Xm = (e2) => e2();
function As(e2, t) {
  e2 instanceof Map && t instanceof Map && t.forEach((n, r) => e2.set(r, n)), e2 instanceof Set && t instanceof Set && t.forEach(e2.add, e2);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const r = t[n], i = e2[n];
    Ar(i) && Ar(r) && e2.hasOwnProperty(n) && !isRef(r) && !isReactive(r) ? e2[n] = As(i, r) : e2[n] = r;
  }
  return e2;
}
const Zm = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function eh(e2) {
  return !Ar(e2) || !e2.hasOwnProperty(Zm);
}
const { assign: en } = Object;
function Il(e2) {
  return !!(isRef(e2) && e2.effect);
}
function Pl(e2, t, n, r) {
  const { state: i, actions: s, getters: o } = t, l = n.state.value[e2];
  let u;
  function c() {
    !l && (process.env.NODE_ENV === "production" || !r) && (n.state.value[e2] = i ? i() : {});
    const m = process.env.NODE_ENV !== "production" && r ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      toRefs(ref(i ? i() : {}).value)
    ) : toRefs(n.state.value[e2]);
    return en(m, s, Object.keys(o || {}).reduce((a, d) => (process.env.NODE_ENV !== "production" && d in m && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${d}" in store "${e2}".`), a[d] = markRaw(computed(() => {
      Di(n);
      const p = n._s.get(e2);
      return o[d].call(p, p);
    })), a), {}));
  }
  return u = Es(e2, c, t, n, r, true), u;
}
function Es(e2, t, n = {}, r, i, s) {
  let o;
  const l = en({ actions: {} }, n);
  if (process.env.NODE_ENV !== "production" && !r._e.active)
    throw new Error("Pinia destroyed");
  const u = {
    deep: true
    // flush: 'post',
  };
  process.env.NODE_ENV !== "production" && !Kc && (u.onTrigger = (te) => {
    c ? p = te : c == false && !P._hotUpdating && (Array.isArray(p) ? p.push(te) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let c, m, a = [], d = [], p;
  const h = r.state.value[e2];
  !s && !h && (process.env.NODE_ENV === "production" || !i) && (r.state.value[e2] = {});
  const v = ref({});
  let T;
  function _(te) {
    let z;
    c = m = false, process.env.NODE_ENV !== "production" && (p = []), typeof te == "function" ? (te(r.state.value[e2]), z = {
      type: kn.patchFunction,
      storeId: e2,
      events: p
    }) : (As(r.state.value[e2], te), z = {
      type: kn.patchObject,
      payload: te,
      storeId: e2,
      events: p
    });
    const Q = T = Symbol();
    nextTick().then(() => {
      T === Q && (c = true);
    }), m = true, Fr(a, z, r.state.value[e2]);
  }
  const E = s ? function() {
    const { state: z } = n, Q = z ? z() : {};
    this.$patch((X) => {
      en(X, Q);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e2}" is built using the setup syntax and does not implement $reset().`);
    } : iu
  );
  function j() {
    o.stop(), a = [], d = [], r._s.delete(e2);
  }
  function F(te, z) {
    return function() {
      Di(r);
      const Q = Array.from(arguments), X = [], re = [];
      function Pe(tt) {
        X.push(tt);
      }
      function Me(tt) {
        re.push(tt);
      }
      Fr(d, {
        args: Q,
        name: te,
        store: P,
        after: Pe,
        onError: Me
      });
      let dt;
      try {
        dt = z.apply(this && this.$id === e2 ? this : P, Q);
      } catch (tt) {
        throw Fr(re, tt), tt;
      }
      return dt instanceof Promise ? dt.then((tt) => (Fr(X, tt), tt)).catch((tt) => (Fr(re, tt), Promise.reject(tt))) : (Fr(X, dt), dt);
    };
  }
  const B = /* @__PURE__ */ markRaw({
    actions: {},
    getters: {},
    state: [],
    hotState: v
  }), L = {
    _p: r,
    // _s: scope,
    $id: e2,
    $onAction: El.bind(null, d),
    $patch: _,
    $reset: E,
    $subscribe(te, z = {}) {
      const Q = El(a, te, z.detached, () => X()), X = o.run(() => watch(() => r.state.value[e2], (re) => {
        (z.flush === "sync" ? m : c) && te({
          storeId: e2,
          type: kn.direct,
          events: p
        }, re);
      }, en({}, u, z)));
      return Q;
    },
    $dispose: j
  }, P = reactive(process.env.NODE_ENV !== "production" || ki ? en(
    {
      _hmrPayload: B,
      _customProperties: markRaw(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    L
    // must be added later
    // setupStore
  ) : L);
  r._s.set(e2, P);
  const Y = (r._a && r._a.runWithContext || Xm)(() => r._e.run(() => (o = effectScope()).run(t)));
  for (const te in Y) {
    const z = Y[te];
    if (isRef(z) && !Il(z) || isReactive(z))
      process.env.NODE_ENV !== "production" && i ? io(v.value, te, toRef(Y, te)) : s || (h && eh(z) && (isRef(z) ? z.value = h[te] : As(z, h[te])), r.state.value[e2][te] = z), process.env.NODE_ENV !== "production" && B.state.push(te);
    else if (typeof z == "function") {
      const Q = process.env.NODE_ENV !== "production" && i ? z : F(te, z);
      Y[te] = Q, process.env.NODE_ENV !== "production" && (B.actions[te] = z), l.actions[te] = z;
    } else
      process.env.NODE_ENV !== "production" && Il(z) && (B.getters[te] = s ? (
        // @ts-expect-error
        n.getters[te]
      ) : z, Vo && (Y._getters || // @ts-expect-error: same
      (Y._getters = markRaw([]))).push(te));
  }
  if (en(P, Y), en(toRaw(P), Y), Object.defineProperty(P, "$state", {
    get: () => process.env.NODE_ENV !== "production" && i ? v.value : r.state.value[e2],
    set: (te) => {
      if (process.env.NODE_ENV !== "production" && i)
        throw new Error("cannot set hotState");
      _((z) => {
        en(z, te);
      });
    }
  }), process.env.NODE_ENV !== "production" && (P._hotUpdate = markRaw((te) => {
    P._hotUpdating = true, te._hmrPayload.state.forEach((z) => {
      if (z in P.$state) {
        const Q = te.$state[z], X = P.$state[z];
        typeof Q == "object" && Ar(Q) && Ar(X) ? ru(Q, X) : te.$state[z] = X;
      }
      io(P, z, toRef(te.$state, z));
    }), Object.keys(P.$state).forEach((z) => {
      z in te.$state || ls(P, z);
    }), c = false, m = false, r.state.value[e2] = toRef(te._hmrPayload, "hotState"), m = true, nextTick().then(() => {
      c = true;
    });
    for (const z in te._hmrPayload.actions) {
      const Q = te[z];
      io(P, z, F(z, Q));
    }
    for (const z in te._hmrPayload.getters) {
      const Q = te._hmrPayload.getters[z], X = s ? (
        // special handling of options api
        computed(() => (Di(r), Q.call(P, P)))
      ) : Q;
      io(P, z, X);
    }
    Object.keys(P._hmrPayload.getters).forEach((z) => {
      z in te._hmrPayload.getters || ls(P, z);
    }), Object.keys(P._hmrPayload.actions).forEach((z) => {
      z in te._hmrPayload.actions || ls(P, z);
    }), P._hmrPayload = te._hmrPayload, P._getters = te._getters, P._hotUpdating = false;
  })), ki) {
    const te = {
      writable: true,
      configurable: true,
      // avoid warning on devtools trying to display this property
      enumerable: false
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((z) => {
      Object.defineProperty(P, z, en({ value: P[z] }, te));
    });
  }
  return r._p.forEach((te) => {
    if (ki) {
      const z = o.run(() => te({
        store: P,
        app: r._a,
        pinia: r,
        options: l
      }));
      Object.keys(z || {}).forEach((Q) => P._customProperties.add(Q)), en(P, z);
    } else
      en(P, o.run(() => te({
        store: P,
        app: r._a,
        pinia: r,
        options: l
      })));
  }), process.env.NODE_ENV !== "production" && P.$state && typeof P.$state == "object" && typeof P.$state.constructor == "function" && !P.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${P.$id}".`), h && s && n.hydrate && n.hydrate(P.$state, h), c = true, m = true, P;
}
function bt(e2, t, n) {
  let r, i;
  const s = typeof t == "function";
  if (typeof e2 == "string")
    r = e2, i = s ? n : t;
  else if (i = e2, r = e2.id, process.env.NODE_ENV !== "production" && typeof r != "string")
    throw new Error('[🍍]: "defineStore()" must be passed a store id as its first argument.');
  function o(l, u) {
    const c = hasInjectionContext();
    if (l = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && bi && bi._testing ? null : l) || (c ? inject(zc, null) : null), l && Di(l), process.env.NODE_ENV !== "production" && !bi)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    l = bi, l._s.has(r) || (s ? Es(r, t, i, l) : Pl(r, i, l), process.env.NODE_ENV !== "production" && (o._pinia = l));
    const m = l._s.get(r);
    if (process.env.NODE_ENV !== "production" && u) {
      const a = "__hot:" + r, d = s ? Es(a, t, i, l, true) : Pl(a, en({}, i), l, true);
      u._hotUpdate(d), delete l.state.value[a], l._s.delete(a);
    }
    if (process.env.NODE_ENV !== "production" && Vo) {
      const a = getCurrentInstance();
      if (a && a.proxy && // avoid adding stores that are just built for hot module replacement
      !u) {
        const d = a.proxy, p = "_pStores" in d ? d._pStores : d._pStores = {};
        p[r] = m;
      }
    }
    return m;
  }
  return o.$id = r, o;
}
function Oi(e2, t) {
  return Array.isArray(t) ? t.reduce((n, r) => (n[r] = function() {
    return e2(this.$pinia)[r];
  }, n), {}) : Object.keys(t).reduce((n, r) => (n[r] = function() {
    const i = e2(this.$pinia), s = t[r];
    return typeof s == "function" ? s.call(this, i) : i[s];
  }, n), {});
}
const Gi = bt("tooltips", {
  state: () => ({ tooltip: null }),
  actions: {
    addCustomTooltip(e2) {
      e2.title && (e2.title = Vn(e2.title)), e2.text = Vn(e2.text), this.tooltip = e2;
    },
    addTooltip(e2, t) {
      const n = Ro(e2);
      n && this.addCustomTooltip({
        keyword: e2,
        title: n.title,
        text: n.description,
        x: (t == null ? void 0 : t.x) ?? window.screenX,
        y: (t == null ? void 0 : t.y) ?? window.screenY,
        width: Cr().options.width
      });
    },
    deleteTooltip() {
      this.tooltip = null;
    }
  }
});
function la() {
  return window;
}
function th(e2) {
  const t = Cr().options.keywordsPrefix, n = new RegExp(`${t}(\\w*)`, "gi");
  return e2 = e2.replace(n, nh), e2;
}
la().onTooltipEnter = (e2, t) => {
  const n = {
    x: e2.clientX,
    y: e2.clientY - 20
  };
  Gi().addTooltip(t, n);
};
la().onTooltipLeave = () => {
  Gi().deleteTooltip();
};
function nh(e2, t) {
  const n = t.toLowerCase();
  return Ro(n) ? `<span class='highlighted-tooltip-keyword'
      onmouseenter="onTooltipEnter(event, '${n}')"
      onmouseleave="onTooltipLeave()">${t}</span>` : n;
}
function ou(e2, t, n = "$") {
  return t.replace(/%{[^}]*}/g, (r) => {
    const i = r.substr(2, r.length - 3);
    return su(e2, i, n);
  });
}
function Vn(e2) {
  const t = ai(), n = ou(t, e2, "$");
  return th(n);
}
function su(e2, t, n) {
  const [r, i] = os(e2, t, n);
  return r[i];
}
const au = /\$\$"/, rh = (e2) => typeof e2 == "string" && e2.search(au) === 0;
function ih(e2) {
  let t = null;
  const n = [], r = /<[^>]*>/g;
  do
    t = r.exec(e2), t && n.push(t);
  while (t);
  return n;
}
const Ye = bt("dialog", {
  state: () => ({
    dialog: [],
    playMode: "normal"
  }),
  actions: {
    generateSaveData() {
      return {
        dialog: ze(this.dialog)
      };
    },
    loadSaveData(e2) {
      this.dialog = e2.dialog;
    },
    addDialog(e2) {
      this.dialog.push({
        ...e2,
        interactive: e2.interactive ?? false,
        id: ti(),
        text: Vn(e2.text)
      }), this.dialog.length > 200 && this.dialog.shift();
    },
    toggleAutoPlay() {
      this.playMode = this.playMode === "auto" ? "normal" : "auto";
    },
    toggleSkip() {
      this.playMode = this.playMode === "skip" ? "normal" : "skip";
    },
    clearDialog() {
      this.dialog.splice(0, this.dialog.length);
    },
    makeLastDialogInteractive() {
      this.dialog[this.dialog.length - 1].interactive = true;
    },
    reset() {
      this.dialog = [], this.playMode = "normal";
    }
  },
  getters: {
    currentDialog() {
      return this.dialog[this.dialog.length - 1];
    }
  }
});
var On = {};
/*!
 *  howler.js v2.2.4
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */
(function(e2) {
  (function() {
    var t = function() {
      this.init();
    };
    t.prototype = {
      /**
       * Initialize the global Howler object.
       * @return {Howler}
       */
      init: function() {
        var a = this || n;
        return a._counter = 1e3, a._html5AudioPool = [], a.html5PoolSize = 10, a._codecs = {}, a._howls = [], a._muted = false, a._volume = 1, a._canPlayEvent = "canplaythrough", a._navigator = typeof window < "u" && window.navigator ? window.navigator : null, a.masterGain = null, a.noAudio = false, a.usingWebAudio = true, a.autoSuspend = true, a.ctx = null, a.autoUnlock = true, a._setup(), a;
      },
      /**
       * Get/set the global volume for all sounds.
       * @param  {Float} vol Volume from 0.0 to 1.0.
       * @return {Howler/Float}     Returns self or current volume.
       */
      volume: function(a) {
        var d = this || n;
        if (a = parseFloat(a), d.ctx || m(), typeof a < "u" && a >= 0 && a <= 1) {
          if (d._volume = a, d._muted)
            return d;
          d.usingWebAudio && d.masterGain.gain.setValueAtTime(a, n.ctx.currentTime);
          for (var p = 0; p < d._howls.length; p++)
            if (!d._howls[p]._webAudio)
              for (var h = d._howls[p]._getSoundIds(), v = 0; v < h.length; v++) {
                var T = d._howls[p]._soundById(h[v]);
                T && T._node && (T._node.volume = T._volume * a);
              }
          return d;
        }
        return d._volume;
      },
      /**
       * Handle muting and unmuting globally.
       * @param  {Boolean} muted Is muted or not.
       */
      mute: function(a) {
        var d = this || n;
        d.ctx || m(), d._muted = a, d.usingWebAudio && d.masterGain.gain.setValueAtTime(a ? 0 : d._volume, n.ctx.currentTime);
        for (var p = 0; p < d._howls.length; p++)
          if (!d._howls[p]._webAudio)
            for (var h = d._howls[p]._getSoundIds(), v = 0; v < h.length; v++) {
              var T = d._howls[p]._soundById(h[v]);
              T && T._node && (T._node.muted = a ? true : T._muted);
            }
        return d;
      },
      /**
       * Handle stopping all sounds globally.
       */
      stop: function() {
        for (var a = this || n, d = 0; d < a._howls.length; d++)
          a._howls[d].stop();
        return a;
      },
      /**
       * Unload and destroy all currently loaded Howl objects.
       * @return {Howler}
       */
      unload: function() {
        for (var a = this || n, d = a._howls.length - 1; d >= 0; d--)
          a._howls[d].unload();
        return a.usingWebAudio && a.ctx && typeof a.ctx.close < "u" && (a.ctx.close(), a.ctx = null, m()), a;
      },
      /**
       * Check for codec support of specific extension.
       * @param  {String} ext Audio file extention.
       * @return {Boolean}
       */
      codecs: function(a) {
        return (this || n)._codecs[a.replace(/^x-/, "")];
      },
      /**
       * Setup various state values for global tracking.
       * @return {Howler}
       */
      _setup: function() {
        var a = this || n;
        if (a.state = a.ctx && a.ctx.state || "suspended", a._autoSuspend(), !a.usingWebAudio)
          if (typeof Audio < "u")
            try {
              var d = new Audio();
              typeof d.oncanplaythrough > "u" && (a._canPlayEvent = "canplay");
            } catch {
              a.noAudio = true;
            }
          else
            a.noAudio = true;
        try {
          var d = new Audio();
          d.muted && (a.noAudio = true);
        } catch {
        }
        return a.noAudio || a._setupCodecs(), a;
      },
      /**
       * Check for browser support for various codecs and cache the results.
       * @return {Howler}
       */
      _setupCodecs: function() {
        var a = this || n, d = null;
        try {
          d = typeof Audio < "u" ? new Audio() : null;
        } catch {
          return a;
        }
        if (!d || typeof d.canPlayType != "function")
          return a;
        var p = d.canPlayType("audio/mpeg;").replace(/^no$/, ""), h = a._navigator ? a._navigator.userAgent : "", v = h.match(/OPR\/(\d+)/g), T = v && parseInt(v[0].split("/")[1], 10) < 33, _ = h.indexOf("Safari") !== -1 && h.indexOf("Chrome") === -1, E = h.match(/Version\/(.*?) /), j = _ && E && parseInt(E[1], 10) < 15;
        return a._codecs = {
          mp3: !!(!T && (p || d.canPlayType("audio/mp3;").replace(/^no$/, ""))),
          mpeg: !!p,
          opus: !!d.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
          ogg: !!d.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
          oga: !!d.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
          wav: !!(d.canPlayType('audio/wav; codecs="1"') || d.canPlayType("audio/wav")).replace(/^no$/, ""),
          aac: !!d.canPlayType("audio/aac;").replace(/^no$/, ""),
          caf: !!d.canPlayType("audio/x-caf;").replace(/^no$/, ""),
          m4a: !!(d.canPlayType("audio/x-m4a;") || d.canPlayType("audio/m4a;") || d.canPlayType("audio/aac;")).replace(/^no$/, ""),
          m4b: !!(d.canPlayType("audio/x-m4b;") || d.canPlayType("audio/m4b;") || d.canPlayType("audio/aac;")).replace(/^no$/, ""),
          mp4: !!(d.canPlayType("audio/x-mp4;") || d.canPlayType("audio/mp4;") || d.canPlayType("audio/aac;")).replace(/^no$/, ""),
          weba: !!(!j && d.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
          webm: !!(!j && d.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
          dolby: !!d.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ""),
          flac: !!(d.canPlayType("audio/x-flac;") || d.canPlayType("audio/flac;")).replace(/^no$/, "")
        }, a;
      },
      /**
       * Some browsers/devices will only allow audio to be played after a user interaction.
       * Attempt to automatically unlock audio on the first user interaction.
       * Concept from: http://paulbakaus.com/tutorials/html5/web-audio-on-ios/
       * @return {Howler}
       */
      _unlockAudio: function() {
        var a = this || n;
        if (!(a._audioUnlocked || !a.ctx)) {
          a._audioUnlocked = false, a.autoUnlock = false, !a._mobileUnloaded && a.ctx.sampleRate !== 44100 && (a._mobileUnloaded = true, a.unload()), a._scratchBuffer = a.ctx.createBuffer(1, 1, 22050);
          var d = function(p) {
            for (; a._html5AudioPool.length < a.html5PoolSize; )
              try {
                var h = new Audio();
                h._unlocked = true, a._releaseHtml5Audio(h);
              } catch {
                a.noAudio = true;
                break;
              }
            for (var v = 0; v < a._howls.length; v++)
              if (!a._howls[v]._webAudio)
                for (var T = a._howls[v]._getSoundIds(), _ = 0; _ < T.length; _++) {
                  var E = a._howls[v]._soundById(T[_]);
                  E && E._node && !E._node._unlocked && (E._node._unlocked = true, E._node.load());
                }
            a._autoResume();
            var j = a.ctx.createBufferSource();
            j.buffer = a._scratchBuffer, j.connect(a.ctx.destination), typeof j.start > "u" ? j.noteOn(0) : j.start(0), typeof a.ctx.resume == "function" && a.ctx.resume(), j.onended = function() {
              j.disconnect(0), a._audioUnlocked = true, document.removeEventListener("touchstart", d, true), document.removeEventListener("touchend", d, true), document.removeEventListener("click", d, true), document.removeEventListener("keydown", d, true);
              for (var F = 0; F < a._howls.length; F++)
                a._howls[F]._emit("unlock");
            };
          };
          return document.addEventListener("touchstart", d, true), document.addEventListener("touchend", d, true), document.addEventListener("click", d, true), document.addEventListener("keydown", d, true), a;
        }
      },
      /**
       * Get an unlocked HTML5 Audio object from the pool. If none are left,
       * return a new Audio object and throw a warning.
       * @return {Audio} HTML5 Audio object.
       */
      _obtainHtml5Audio: function() {
        var a = this || n;
        if (a._html5AudioPool.length)
          return a._html5AudioPool.pop();
        var d = new Audio().play();
        return d && typeof Promise < "u" && (d instanceof Promise || typeof d.then == "function") && d.catch(function() {
          console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.");
        }), new Audio();
      },
      /**
       * Return an activated HTML5 Audio object to the pool.
       * @return {Howler}
       */
      _releaseHtml5Audio: function(a) {
        var d = this || n;
        return a._unlocked && d._html5AudioPool.push(a), d;
      },
      /**
       * Automatically suspend the Web Audio AudioContext after no sound has played for 30 seconds.
       * This saves processing/energy and fixes various browser-specific bugs with audio getting stuck.
       * @return {Howler}
       */
      _autoSuspend: function() {
        var a = this;
        if (!(!a.autoSuspend || !a.ctx || typeof a.ctx.suspend > "u" || !n.usingWebAudio)) {
          for (var d = 0; d < a._howls.length; d++)
            if (a._howls[d]._webAudio) {
              for (var p = 0; p < a._howls[d]._sounds.length; p++)
                if (!a._howls[d]._sounds[p]._paused)
                  return a;
            }
          return a._suspendTimer && clearTimeout(a._suspendTimer), a._suspendTimer = setTimeout(function() {
            if (a.autoSuspend) {
              a._suspendTimer = null, a.state = "suspending";
              var h = function() {
                a.state = "suspended", a._resumeAfterSuspend && (delete a._resumeAfterSuspend, a._autoResume());
              };
              a.ctx.suspend().then(h, h);
            }
          }, 3e4), a;
        }
      },
      /**
       * Automatically resume the Web Audio AudioContext when a new sound is played.
       * @return {Howler}
       */
      _autoResume: function() {
        var a = this;
        if (!(!a.ctx || typeof a.ctx.resume > "u" || !n.usingWebAudio))
          return a.state === "running" && a.ctx.state !== "interrupted" && a._suspendTimer ? (clearTimeout(a._suspendTimer), a._suspendTimer = null) : a.state === "suspended" || a.state === "running" && a.ctx.state === "interrupted" ? (a.ctx.resume().then(function() {
            a.state = "running";
            for (var d = 0; d < a._howls.length; d++)
              a._howls[d]._emit("resume");
          }), a._suspendTimer && (clearTimeout(a._suspendTimer), a._suspendTimer = null)) : a.state === "suspending" && (a._resumeAfterSuspend = true), a;
      }
    };
    var n = new t(), r = function(a) {
      var d = this;
      if (!a.src || a.src.length === 0) {
        console.error("An array of source files must be passed with any new Howl.");
        return;
      }
      d.init(a);
    };
    r.prototype = {
      /**
       * Initialize a new Howl group object.
       * @param  {Object} o Passed in properties for this group.
       * @return {Howl}
       */
      init: function(a) {
        var d = this;
        return n.ctx || m(), d._autoplay = a.autoplay || false, d._format = typeof a.format != "string" ? a.format : [a.format], d._html5 = a.html5 || false, d._muted = a.mute || false, d._loop = a.loop || false, d._pool = a.pool || 5, d._preload = typeof a.preload == "boolean" || a.preload === "metadata" ? a.preload : true, d._rate = a.rate || 1, d._sprite = a.sprite || {}, d._src = typeof a.src != "string" ? a.src : [a.src], d._volume = a.volume !== void 0 ? a.volume : 1, d._xhr = {
          method: a.xhr && a.xhr.method ? a.xhr.method : "GET",
          headers: a.xhr && a.xhr.headers ? a.xhr.headers : null,
          withCredentials: a.xhr && a.xhr.withCredentials ? a.xhr.withCredentials : false
        }, d._duration = 0, d._state = "unloaded", d._sounds = [], d._endTimers = {}, d._queue = [], d._playLock = false, d._onend = a.onend ? [{ fn: a.onend }] : [], d._onfade = a.onfade ? [{ fn: a.onfade }] : [], d._onload = a.onload ? [{ fn: a.onload }] : [], d._onloaderror = a.onloaderror ? [{ fn: a.onloaderror }] : [], d._onplayerror = a.onplayerror ? [{ fn: a.onplayerror }] : [], d._onpause = a.onpause ? [{ fn: a.onpause }] : [], d._onplay = a.onplay ? [{ fn: a.onplay }] : [], d._onstop = a.onstop ? [{ fn: a.onstop }] : [], d._onmute = a.onmute ? [{ fn: a.onmute }] : [], d._onvolume = a.onvolume ? [{ fn: a.onvolume }] : [], d._onrate = a.onrate ? [{ fn: a.onrate }] : [], d._onseek = a.onseek ? [{ fn: a.onseek }] : [], d._onunlock = a.onunlock ? [{ fn: a.onunlock }] : [], d._onresume = [], d._webAudio = n.usingWebAudio && !d._html5, typeof n.ctx < "u" && n.ctx && n.autoUnlock && n._unlockAudio(), n._howls.push(d), d._autoplay && d._queue.push({
          event: "play",
          action: function() {
            d.play();
          }
        }), d._preload && d._preload !== "none" && d.load(), d;
      },
      /**
       * Load the audio file.
       * @return {Howler}
       */
      load: function() {
        var a = this, d = null;
        if (n.noAudio) {
          a._emit("loaderror", null, "No audio support.");
          return;
        }
        typeof a._src == "string" && (a._src = [a._src]);
        for (var p = 0; p < a._src.length; p++) {
          var h, v;
          if (a._format && a._format[p])
            h = a._format[p];
          else {
            if (v = a._src[p], typeof v != "string") {
              a._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
              continue;
            }
            h = /^data:audio\/([^;,]+);/i.exec(v), h || (h = /\.([^.]+)$/.exec(v.split("?", 1)[0])), h && (h = h[1].toLowerCase());
          }
          if (h || console.warn('No file extension was found. Consider using the "format" property or specify an extension.'), h && n.codecs(h)) {
            d = a._src[p];
            break;
          }
        }
        if (!d) {
          a._emit("loaderror", null, "No codec support for selected audio sources.");
          return;
        }
        return a._src = d, a._state = "loading", window.location.protocol === "https:" && d.slice(0, 5) === "http:" && (a._html5 = true, a._webAudio = false), new i(a), a._webAudio && o(a), a;
      },
      /**
       * Play a sound or resume previous playback.
       * @param  {String/Number} sprite   Sprite name for sprite playback or sound id to continue previous.
       * @param  {Boolean} internal Internal Use: true prevents event firing.
       * @return {Number}          Sound ID.
       */
      play: function(a, d) {
        var p = this, h = null;
        if (typeof a == "number")
          h = a, a = null;
        else {
          if (typeof a == "string" && p._state === "loaded" && !p._sprite[a])
            return null;
          if (typeof a > "u" && (a = "__default", !p._playLock)) {
            for (var v = 0, T = 0; T < p._sounds.length; T++)
              p._sounds[T]._paused && !p._sounds[T]._ended && (v++, h = p._sounds[T]._id);
            v === 1 ? a = null : h = null;
          }
        }
        var _ = h ? p._soundById(h) : p._inactiveSound();
        if (!_)
          return null;
        if (h && !a && (a = _._sprite || "__default"), p._state !== "loaded") {
          _._sprite = a, _._ended = false;
          var E = _._id;
          return p._queue.push({
            event: "play",
            action: function() {
              p.play(E);
            }
          }), E;
        }
        if (h && !_._paused)
          return d || p._loadQueue("play"), _._id;
        p._webAudio && n._autoResume();
        var j = Math.max(0, _._seek > 0 ? _._seek : p._sprite[a][0] / 1e3), F = Math.max(0, (p._sprite[a][0] + p._sprite[a][1]) / 1e3 - j), B = F * 1e3 / Math.abs(_._rate), L = p._sprite[a][0] / 1e3, P = (p._sprite[a][0] + p._sprite[a][1]) / 1e3;
        _._sprite = a, _._ended = false;
        var Z = function() {
          _._paused = false, _._seek = j, _._start = L, _._stop = P, _._loop = !!(_._loop || p._sprite[a][2]);
        };
        if (j >= P) {
          p._ended(_);
          return;
        }
        var Y = _._node;
        if (p._webAudio) {
          var te = function() {
            p._playLock = false, Z(), p._refreshBuffer(_);
            var re = _._muted || p._muted ? 0 : _._volume;
            Y.gain.setValueAtTime(re, n.ctx.currentTime), _._playStart = n.ctx.currentTime, typeof Y.bufferSource.start > "u" ? _._loop ? Y.bufferSource.noteGrainOn(0, j, 86400) : Y.bufferSource.noteGrainOn(0, j, F) : _._loop ? Y.bufferSource.start(0, j, 86400) : Y.bufferSource.start(0, j, F), B !== 1 / 0 && (p._endTimers[_._id] = setTimeout(p._ended.bind(p, _), B)), d || setTimeout(function() {
              p._emit("play", _._id), p._loadQueue();
            }, 0);
          };
          n.state === "running" && n.ctx.state !== "interrupted" ? te() : (p._playLock = true, p.once("resume", te), p._clearTimer(_._id));
        } else {
          var z = function() {
            Y.currentTime = j, Y.muted = _._muted || p._muted || n._muted || Y.muted, Y.volume = _._volume * n.volume(), Y.playbackRate = _._rate;
            try {
              var re = Y.play();
              if (re && typeof Promise < "u" && (re instanceof Promise || typeof re.then == "function") ? (p._playLock = true, Z(), re.then(function() {
                p._playLock = false, Y._unlocked = true, d ? p._loadQueue() : p._emit("play", _._id);
              }).catch(function() {
                p._playLock = false, p._emit("playerror", _._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."), _._ended = true, _._paused = true;
              })) : d || (p._playLock = false, Z(), p._emit("play", _._id)), Y.playbackRate = _._rate, Y.paused) {
                p._emit("playerror", _._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
                return;
              }
              a !== "__default" || _._loop ? p._endTimers[_._id] = setTimeout(p._ended.bind(p, _), B) : (p._endTimers[_._id] = function() {
                p._ended(_), Y.removeEventListener("ended", p._endTimers[_._id], false);
              }, Y.addEventListener("ended", p._endTimers[_._id], false));
            } catch (Pe) {
              p._emit("playerror", _._id, Pe);
            }
          };
          Y.src === "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA" && (Y.src = p._src, Y.load());
          var Q = window && window.ejecta || !Y.readyState && n._navigator.isCocoonJS;
          if (Y.readyState >= 3 || Q)
            z();
          else {
            p._playLock = true, p._state = "loading";
            var X = function() {
              p._state = "loaded", z(), Y.removeEventListener(n._canPlayEvent, X, false);
            };
            Y.addEventListener(n._canPlayEvent, X, false), p._clearTimer(_._id);
          }
        }
        return _._id;
      },
      /**
       * Pause playback and save current position.
       * @param  {Number} id The sound ID (empty to pause all in group).
       * @return {Howl}
       */
      pause: function(a) {
        var d = this;
        if (d._state !== "loaded" || d._playLock)
          return d._queue.push({
            event: "pause",
            action: function() {
              d.pause(a);
            }
          }), d;
        for (var p = d._getSoundIds(a), h = 0; h < p.length; h++) {
          d._clearTimer(p[h]);
          var v = d._soundById(p[h]);
          if (v && !v._paused && (v._seek = d.seek(p[h]), v._rateSeek = 0, v._paused = true, d._stopFade(p[h]), v._node))
            if (d._webAudio) {
              if (!v._node.bufferSource)
                continue;
              typeof v._node.bufferSource.stop > "u" ? v._node.bufferSource.noteOff(0) : v._node.bufferSource.stop(0), d._cleanBuffer(v._node);
            } else
              (!isNaN(v._node.duration) || v._node.duration === 1 / 0) && v._node.pause();
          arguments[1] || d._emit("pause", v ? v._id : null);
        }
        return d;
      },
      /**
       * Stop playback and reset to start.
       * @param  {Number} id The sound ID (empty to stop all in group).
       * @param  {Boolean} internal Internal Use: true prevents event firing.
       * @return {Howl}
       */
      stop: function(a, d) {
        var p = this;
        if (p._state !== "loaded" || p._playLock)
          return p._queue.push({
            event: "stop",
            action: function() {
              p.stop(a);
            }
          }), p;
        for (var h = p._getSoundIds(a), v = 0; v < h.length; v++) {
          p._clearTimer(h[v]);
          var T = p._soundById(h[v]);
          T && (T._seek = T._start || 0, T._rateSeek = 0, T._paused = true, T._ended = true, p._stopFade(h[v]), T._node && (p._webAudio ? T._node.bufferSource && (typeof T._node.bufferSource.stop > "u" ? T._node.bufferSource.noteOff(0) : T._node.bufferSource.stop(0), p._cleanBuffer(T._node)) : (!isNaN(T._node.duration) || T._node.duration === 1 / 0) && (T._node.currentTime = T._start || 0, T._node.pause(), T._node.duration === 1 / 0 && p._clearSound(T._node))), d || p._emit("stop", T._id));
        }
        return p;
      },
      /**
       * Mute/unmute a single sound or all sounds in this Howl group.
       * @param  {Boolean} muted Set to true to mute and false to unmute.
       * @param  {Number} id    The sound ID to update (omit to mute/unmute all).
       * @return {Howl}
       */
      mute: function(a, d) {
        var p = this;
        if (p._state !== "loaded" || p._playLock)
          return p._queue.push({
            event: "mute",
            action: function() {
              p.mute(a, d);
            }
          }), p;
        if (typeof d > "u")
          if (typeof a == "boolean")
            p._muted = a;
          else
            return p._muted;
        for (var h = p._getSoundIds(d), v = 0; v < h.length; v++) {
          var T = p._soundById(h[v]);
          T && (T._muted = a, T._interval && p._stopFade(T._id), p._webAudio && T._node ? T._node.gain.setValueAtTime(a ? 0 : T._volume, n.ctx.currentTime) : T._node && (T._node.muted = n._muted ? true : a), p._emit("mute", T._id));
        }
        return p;
      },
      /**
       * Get/set the volume of this sound or of the Howl group. This method can optionally take 0, 1 or 2 arguments.
       *   volume() -> Returns the group's volume value.
       *   volume(id) -> Returns the sound id's current volume.
       *   volume(vol) -> Sets the volume of all sounds in this Howl group.
       *   volume(vol, id) -> Sets the volume of passed sound id.
       * @return {Howl/Number} Returns self or current volume.
       */
      volume: function() {
        var a = this, d = arguments, p, h;
        if (d.length === 0)
          return a._volume;
        if (d.length === 1 || d.length === 2 && typeof d[1] > "u") {
          var v = a._getSoundIds(), T = v.indexOf(d[0]);
          T >= 0 ? h = parseInt(d[0], 10) : p = parseFloat(d[0]);
        } else
          d.length >= 2 && (p = parseFloat(d[0]), h = parseInt(d[1], 10));
        var _;
        if (typeof p < "u" && p >= 0 && p <= 1) {
          if (a._state !== "loaded" || a._playLock)
            return a._queue.push({
              event: "volume",
              action: function() {
                a.volume.apply(a, d);
              }
            }), a;
          typeof h > "u" && (a._volume = p), h = a._getSoundIds(h);
          for (var E = 0; E < h.length; E++)
            _ = a._soundById(h[E]), _ && (_._volume = p, d[2] || a._stopFade(h[E]), a._webAudio && _._node && !_._muted ? _._node.gain.setValueAtTime(p, n.ctx.currentTime) : _._node && !_._muted && (_._node.volume = p * n.volume()), a._emit("volume", _._id));
        } else
          return _ = h ? a._soundById(h) : a._sounds[0], _ ? _._volume : 0;
        return a;
      },
      /**
       * Fade a currently playing sound between two volumes (if no id is passed, all sounds will fade).
       * @param  {Number} from The value to fade from (0.0 to 1.0).
       * @param  {Number} to   The volume to fade to (0.0 to 1.0).
       * @param  {Number} len  Time in milliseconds to fade.
       * @param  {Number} id   The sound id (omit to fade all sounds).
       * @return {Howl}
       */
      fade: function(a, d, p, h) {
        var v = this;
        if (v._state !== "loaded" || v._playLock)
          return v._queue.push({
            event: "fade",
            action: function() {
              v.fade(a, d, p, h);
            }
          }), v;
        a = Math.min(Math.max(0, parseFloat(a)), 1), d = Math.min(Math.max(0, parseFloat(d)), 1), p = parseFloat(p), v.volume(a, h);
        for (var T = v._getSoundIds(h), _ = 0; _ < T.length; _++) {
          var E = v._soundById(T[_]);
          if (E) {
            if (h || v._stopFade(T[_]), v._webAudio && !E._muted) {
              var j = n.ctx.currentTime, F = j + p / 1e3;
              E._volume = a, E._node.gain.setValueAtTime(a, j), E._node.gain.linearRampToValueAtTime(d, F);
            }
            v._startFadeInterval(E, a, d, p, T[_], typeof h > "u");
          }
        }
        return v;
      },
      /**
       * Starts the internal interval to fade a sound.
       * @param  {Object} sound Reference to sound to fade.
       * @param  {Number} from The value to fade from (0.0 to 1.0).
       * @param  {Number} to   The volume to fade to (0.0 to 1.0).
       * @param  {Number} len  Time in milliseconds to fade.
       * @param  {Number} id   The sound id to fade.
       * @param  {Boolean} isGroup   If true, set the volume on the group.
       */
      _startFadeInterval: function(a, d, p, h, v, T) {
        var _ = this, E = d, j = p - d, F = Math.abs(j / 0.01), B = Math.max(4, F > 0 ? h / F : h), L = Date.now();
        a._fadeTo = p, a._interval = setInterval(function() {
          var P = (Date.now() - L) / h;
          L = Date.now(), E += j * P, E = Math.round(E * 100) / 100, j < 0 ? E = Math.max(p, E) : E = Math.min(p, E), _._webAudio ? a._volume = E : _.volume(E, a._id, true), T && (_._volume = E), (p < d && E <= p || p > d && E >= p) && (clearInterval(a._interval), a._interval = null, a._fadeTo = null, _.volume(p, a._id), _._emit("fade", a._id));
        }, B);
      },
      /**
       * Internal method that stops the currently playing fade when
       * a new fade starts, volume is changed or the sound is stopped.
       * @param  {Number} id The sound id.
       * @return {Howl}
       */
      _stopFade: function(a) {
        var d = this, p = d._soundById(a);
        return p && p._interval && (d._webAudio && p._node.gain.cancelScheduledValues(n.ctx.currentTime), clearInterval(p._interval), p._interval = null, d.volume(p._fadeTo, a), p._fadeTo = null, d._emit("fade", a)), d;
      },
      /**
       * Get/set the loop parameter on a sound. This method can optionally take 0, 1 or 2 arguments.
       *   loop() -> Returns the group's loop value.
       *   loop(id) -> Returns the sound id's loop value.
       *   loop(loop) -> Sets the loop value for all sounds in this Howl group.
       *   loop(loop, id) -> Sets the loop value of passed sound id.
       * @return {Howl/Boolean} Returns self or current loop value.
       */
      loop: function() {
        var a = this, d = arguments, p, h, v;
        if (d.length === 0)
          return a._loop;
        if (d.length === 1)
          if (typeof d[0] == "boolean")
            p = d[0], a._loop = p;
          else
            return v = a._soundById(parseInt(d[0], 10)), v ? v._loop : false;
        else
          d.length === 2 && (p = d[0], h = parseInt(d[1], 10));
        for (var T = a._getSoundIds(h), _ = 0; _ < T.length; _++)
          v = a._soundById(T[_]), v && (v._loop = p, a._webAudio && v._node && v._node.bufferSource && (v._node.bufferSource.loop = p, p && (v._node.bufferSource.loopStart = v._start || 0, v._node.bufferSource.loopEnd = v._stop, a.playing(T[_]) && (a.pause(T[_], true), a.play(T[_], true)))));
        return a;
      },
      /**
       * Get/set the playback rate of a sound. This method can optionally take 0, 1 or 2 arguments.
       *   rate() -> Returns the first sound node's current playback rate.
       *   rate(id) -> Returns the sound id's current playback rate.
       *   rate(rate) -> Sets the playback rate of all sounds in this Howl group.
       *   rate(rate, id) -> Sets the playback rate of passed sound id.
       * @return {Howl/Number} Returns self or the current playback rate.
       */
      rate: function() {
        var a = this, d = arguments, p, h;
        if (d.length === 0)
          h = a._sounds[0]._id;
        else if (d.length === 1) {
          var v = a._getSoundIds(), T = v.indexOf(d[0]);
          T >= 0 ? h = parseInt(d[0], 10) : p = parseFloat(d[0]);
        } else
          d.length === 2 && (p = parseFloat(d[0]), h = parseInt(d[1], 10));
        var _;
        if (typeof p == "number") {
          if (a._state !== "loaded" || a._playLock)
            return a._queue.push({
              event: "rate",
              action: function() {
                a.rate.apply(a, d);
              }
            }), a;
          typeof h > "u" && (a._rate = p), h = a._getSoundIds(h);
          for (var E = 0; E < h.length; E++)
            if (_ = a._soundById(h[E]), _) {
              a.playing(h[E]) && (_._rateSeek = a.seek(h[E]), _._playStart = a._webAudio ? n.ctx.currentTime : _._playStart), _._rate = p, a._webAudio && _._node && _._node.bufferSource ? _._node.bufferSource.playbackRate.setValueAtTime(p, n.ctx.currentTime) : _._node && (_._node.playbackRate = p);
              var j = a.seek(h[E]), F = (a._sprite[_._sprite][0] + a._sprite[_._sprite][1]) / 1e3 - j, B = F * 1e3 / Math.abs(_._rate);
              (a._endTimers[h[E]] || !_._paused) && (a._clearTimer(h[E]), a._endTimers[h[E]] = setTimeout(a._ended.bind(a, _), B)), a._emit("rate", _._id);
            }
        } else
          return _ = a._soundById(h), _ ? _._rate : a._rate;
        return a;
      },
      /**
       * Get/set the seek position of a sound. This method can optionally take 0, 1 or 2 arguments.
       *   seek() -> Returns the first sound node's current seek position.
       *   seek(id) -> Returns the sound id's current seek position.
       *   seek(seek) -> Sets the seek position of the first sound node.
       *   seek(seek, id) -> Sets the seek position of passed sound id.
       * @return {Howl/Number} Returns self or the current seek position.
       */
      seek: function() {
        var a = this, d = arguments, p, h;
        if (d.length === 0)
          a._sounds.length && (h = a._sounds[0]._id);
        else if (d.length === 1) {
          var v = a._getSoundIds(), T = v.indexOf(d[0]);
          T >= 0 ? h = parseInt(d[0], 10) : a._sounds.length && (h = a._sounds[0]._id, p = parseFloat(d[0]));
        } else
          d.length === 2 && (p = parseFloat(d[0]), h = parseInt(d[1], 10));
        if (typeof h > "u")
          return 0;
        if (typeof p == "number" && (a._state !== "loaded" || a._playLock))
          return a._queue.push({
            event: "seek",
            action: function() {
              a.seek.apply(a, d);
            }
          }), a;
        var _ = a._soundById(h);
        if (_)
          if (typeof p == "number" && p >= 0) {
            var E = a.playing(h);
            E && a.pause(h, true), _._seek = p, _._ended = false, a._clearTimer(h), !a._webAudio && _._node && !isNaN(_._node.duration) && (_._node.currentTime = p);
            var j = function() {
              E && a.play(h, true), a._emit("seek", h);
            };
            if (E && !a._webAudio) {
              var F = function() {
                a._playLock ? setTimeout(F, 0) : j();
              };
              setTimeout(F, 0);
            } else
              j();
          } else if (a._webAudio) {
            var B = a.playing(h) ? n.ctx.currentTime - _._playStart : 0, L = _._rateSeek ? _._rateSeek - _._seek : 0;
            return _._seek + (L + B * Math.abs(_._rate));
          } else
            return _._node.currentTime;
        return a;
      },
      /**
       * Check if a specific sound is currently playing or not (if id is provided), or check if at least one of the sounds in the group is playing or not.
       * @param  {Number}  id The sound id to check. If none is passed, the whole sound group is checked.
       * @return {Boolean} True if playing and false if not.
       */
      playing: function(a) {
        var d = this;
        if (typeof a == "number") {
          var p = d._soundById(a);
          return p ? !p._paused : false;
        }
        for (var h = 0; h < d._sounds.length; h++)
          if (!d._sounds[h]._paused)
            return true;
        return false;
      },
      /**
       * Get the duration of this sound. Passing a sound id will return the sprite duration.
       * @param  {Number} id The sound id to check. If none is passed, return full source duration.
       * @return {Number} Audio duration in seconds.
       */
      duration: function(a) {
        var d = this, p = d._duration, h = d._soundById(a);
        return h && (p = d._sprite[h._sprite][1] / 1e3), p;
      },
      /**
       * Returns the current loaded state of this Howl.
       * @return {String} 'unloaded', 'loading', 'loaded'
       */
      state: function() {
        return this._state;
      },
      /**
       * Unload and destroy the current Howl object.
       * This will immediately stop all sound instances attached to this group.
       */
      unload: function() {
        for (var a = this, d = a._sounds, p = 0; p < d.length; p++)
          d[p]._paused || a.stop(d[p]._id), a._webAudio || (a._clearSound(d[p]._node), d[p]._node.removeEventListener("error", d[p]._errorFn, false), d[p]._node.removeEventListener(n._canPlayEvent, d[p]._loadFn, false), d[p]._node.removeEventListener("ended", d[p]._endFn, false), n._releaseHtml5Audio(d[p]._node)), delete d[p]._node, a._clearTimer(d[p]._id);
        var h = n._howls.indexOf(a);
        h >= 0 && n._howls.splice(h, 1);
        var v = true;
        for (p = 0; p < n._howls.length; p++)
          if (n._howls[p]._src === a._src || a._src.indexOf(n._howls[p]._src) >= 0) {
            v = false;
            break;
          }
        return s && v && delete s[a._src], n.noAudio = false, a._state = "unloaded", a._sounds = [], a = null, null;
      },
      /**
       * Listen to a custom event.
       * @param  {String}   event Event name.
       * @param  {Function} fn    Listener to call.
       * @param  {Number}   id    (optional) Only listen to events for this sound.
       * @param  {Number}   once  (INTERNAL) Marks event to fire only once.
       * @return {Howl}
       */
      on: function(a, d, p, h) {
        var v = this, T = v["_on" + a];
        return typeof d == "function" && T.push(h ? { id: p, fn: d, once: h } : { id: p, fn: d }), v;
      },
      /**
       * Remove a custom event. Call without parameters to remove all events.
       * @param  {String}   event Event name.
       * @param  {Function} fn    Listener to remove. Leave empty to remove all.
       * @param  {Number}   id    (optional) Only remove events for this sound.
       * @return {Howl}
       */
      off: function(a, d, p) {
        var h = this, v = h["_on" + a], T = 0;
        if (typeof d == "number" && (p = d, d = null), d || p)
          for (T = 0; T < v.length; T++) {
            var _ = p === v[T].id;
            if (d === v[T].fn && _ || !d && _) {
              v.splice(T, 1);
              break;
            }
          }
        else if (a)
          h["_on" + a] = [];
        else {
          var E = Object.keys(h);
          for (T = 0; T < E.length; T++)
            E[T].indexOf("_on") === 0 && Array.isArray(h[E[T]]) && (h[E[T]] = []);
        }
        return h;
      },
      /**
       * Listen to a custom event and remove it once fired.
       * @param  {String}   event Event name.
       * @param  {Function} fn    Listener to call.
       * @param  {Number}   id    (optional) Only listen to events for this sound.
       * @return {Howl}
       */
      once: function(a, d, p) {
        var h = this;
        return h.on(a, d, p, 1), h;
      },
      /**
       * Emit all events of a specific type and pass the sound id.
       * @param  {String} event Event name.
       * @param  {Number} id    Sound ID.
       * @param  {Number} msg   Message to go with event.
       * @return {Howl}
       */
      _emit: function(a, d, p) {
        for (var h = this, v = h["_on" + a], T = v.length - 1; T >= 0; T--)
          (!v[T].id || v[T].id === d || a === "load") && (setTimeout((function(_) {
            _.call(this, d, p);
          }).bind(h, v[T].fn), 0), v[T].once && h.off(a, v[T].fn, v[T].id));
        return h._loadQueue(a), h;
      },
      /**
       * Queue of actions initiated before the sound has loaded.
       * These will be called in sequence, with the next only firing
       * after the previous has finished executing (even if async like play).
       * @return {Howl}
       */
      _loadQueue: function(a) {
        var d = this;
        if (d._queue.length > 0) {
          var p = d._queue[0];
          p.event === a && (d._queue.shift(), d._loadQueue()), a || p.action();
        }
        return d;
      },
      /**
       * Fired when playback ends at the end of the duration.
       * @param  {Sound} sound The sound object to work with.
       * @return {Howl}
       */
      _ended: function(a) {
        var d = this, p = a._sprite;
        if (!d._webAudio && a._node && !a._node.paused && !a._node.ended && a._node.currentTime < a._stop)
          return setTimeout(d._ended.bind(d, a), 100), d;
        var h = !!(a._loop || d._sprite[p][2]);
        if (d._emit("end", a._id), !d._webAudio && h && d.stop(a._id, true).play(a._id), d._webAudio && h) {
          d._emit("play", a._id), a._seek = a._start || 0, a._rateSeek = 0, a._playStart = n.ctx.currentTime;
          var v = (a._stop - a._start) * 1e3 / Math.abs(a._rate);
          d._endTimers[a._id] = setTimeout(d._ended.bind(d, a), v);
        }
        return d._webAudio && !h && (a._paused = true, a._ended = true, a._seek = a._start || 0, a._rateSeek = 0, d._clearTimer(a._id), d._cleanBuffer(a._node), n._autoSuspend()), !d._webAudio && !h && d.stop(a._id, true), d;
      },
      /**
       * Clear the end timer for a sound playback.
       * @param  {Number} id The sound ID.
       * @return {Howl}
       */
      _clearTimer: function(a) {
        var d = this;
        if (d._endTimers[a]) {
          if (typeof d._endTimers[a] != "function")
            clearTimeout(d._endTimers[a]);
          else {
            var p = d._soundById(a);
            p && p._node && p._node.removeEventListener("ended", d._endTimers[a], false);
          }
          delete d._endTimers[a];
        }
        return d;
      },
      /**
       * Return the sound identified by this ID, or return null.
       * @param  {Number} id Sound ID
       * @return {Object}    Sound object or null.
       */
      _soundById: function(a) {
        for (var d = this, p = 0; p < d._sounds.length; p++)
          if (a === d._sounds[p]._id)
            return d._sounds[p];
        return null;
      },
      /**
       * Return an inactive sound from the pool or create a new one.
       * @return {Sound} Sound playback object.
       */
      _inactiveSound: function() {
        var a = this;
        a._drain();
        for (var d = 0; d < a._sounds.length; d++)
          if (a._sounds[d]._ended)
            return a._sounds[d].reset();
        return new i(a);
      },
      /**
       * Drain excess inactive sounds from the pool.
       */
      _drain: function() {
        var a = this, d = a._pool, p = 0, h = 0;
        if (!(a._sounds.length < d)) {
          for (h = 0; h < a._sounds.length; h++)
            a._sounds[h]._ended && p++;
          for (h = a._sounds.length - 1; h >= 0; h--) {
            if (p <= d)
              return;
            a._sounds[h]._ended && (a._webAudio && a._sounds[h]._node && a._sounds[h]._node.disconnect(0), a._sounds.splice(h, 1), p--);
          }
        }
      },
      /**
       * Get all ID's from the sounds pool.
       * @param  {Number} id Only return one ID if one is passed.
       * @return {Array}    Array of IDs.
       */
      _getSoundIds: function(a) {
        var d = this;
        if (typeof a > "u") {
          for (var p = [], h = 0; h < d._sounds.length; h++)
            p.push(d._sounds[h]._id);
          return p;
        } else
          return [a];
      },
      /**
       * Load the sound back into the buffer source.
       * @param  {Sound} sound The sound object to work with.
       * @return {Howl}
       */
      _refreshBuffer: function(a) {
        var d = this;
        return a._node.bufferSource = n.ctx.createBufferSource(), a._node.bufferSource.buffer = s[d._src], a._panner ? a._node.bufferSource.connect(a._panner) : a._node.bufferSource.connect(a._node), a._node.bufferSource.loop = a._loop, a._loop && (a._node.bufferSource.loopStart = a._start || 0, a._node.bufferSource.loopEnd = a._stop || 0), a._node.bufferSource.playbackRate.setValueAtTime(a._rate, n.ctx.currentTime), d;
      },
      /**
       * Prevent memory leaks by cleaning up the buffer source after playback.
       * @param  {Object} node Sound's audio node containing the buffer source.
       * @return {Howl}
       */
      _cleanBuffer: function(a) {
        var d = this, p = n._navigator && n._navigator.vendor.indexOf("Apple") >= 0;
        if (!a.bufferSource)
          return d;
        if (n._scratchBuffer && a.bufferSource && (a.bufferSource.onended = null, a.bufferSource.disconnect(0), p))
          try {
            a.bufferSource.buffer = n._scratchBuffer;
          } catch {
          }
        return a.bufferSource = null, d;
      },
      /**
       * Set the source to a 0-second silence to stop any downloading (except in IE).
       * @param  {Object} node Audio node to clear.
       */
      _clearSound: function(a) {
        var d = /MSIE |Trident\//.test(n._navigator && n._navigator.userAgent);
        d || (a.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA");
      }
    };
    var i = function(a) {
      this._parent = a, this.init();
    };
    i.prototype = {
      /**
       * Initialize a new Sound object.
       * @return {Sound}
       */
      init: function() {
        var a = this, d = a._parent;
        return a._muted = d._muted, a._loop = d._loop, a._volume = d._volume, a._rate = d._rate, a._seek = 0, a._paused = true, a._ended = true, a._sprite = "__default", a._id = ++n._counter, d._sounds.push(a), a.create(), a;
      },
      /**
       * Create and setup a new sound object, whether HTML5 Audio or Web Audio.
       * @return {Sound}
       */
      create: function() {
        var a = this, d = a._parent, p = n._muted || a._muted || a._parent._muted ? 0 : a._volume;
        return d._webAudio ? (a._node = typeof n.ctx.createGain > "u" ? n.ctx.createGainNode() : n.ctx.createGain(), a._node.gain.setValueAtTime(p, n.ctx.currentTime), a._node.paused = true, a._node.connect(n.masterGain)) : n.noAudio || (a._node = n._obtainHtml5Audio(), a._errorFn = a._errorListener.bind(a), a._node.addEventListener("error", a._errorFn, false), a._loadFn = a._loadListener.bind(a), a._node.addEventListener(n._canPlayEvent, a._loadFn, false), a._endFn = a._endListener.bind(a), a._node.addEventListener("ended", a._endFn, false), a._node.src = d._src, a._node.preload = d._preload === true ? "auto" : d._preload, a._node.volume = p * n.volume(), a._node.load()), a;
      },
      /**
       * Reset the parameters of this sound to the original state (for recycle).
       * @return {Sound}
       */
      reset: function() {
        var a = this, d = a._parent;
        return a._muted = d._muted, a._loop = d._loop, a._volume = d._volume, a._rate = d._rate, a._seek = 0, a._rateSeek = 0, a._paused = true, a._ended = true, a._sprite = "__default", a._id = ++n._counter, a;
      },
      /**
       * HTML5 Audio error listener callback.
       */
      _errorListener: function() {
        var a = this;
        a._parent._emit("loaderror", a._id, a._node.error ? a._node.error.code : 0), a._node.removeEventListener("error", a._errorFn, false);
      },
      /**
       * HTML5 Audio canplaythrough listener callback.
       */
      _loadListener: function() {
        var a = this, d = a._parent;
        d._duration = Math.ceil(a._node.duration * 10) / 10, Object.keys(d._sprite).length === 0 && (d._sprite = { __default: [0, d._duration * 1e3] }), d._state !== "loaded" && (d._state = "loaded", d._emit("load"), d._loadQueue()), a._node.removeEventListener(n._canPlayEvent, a._loadFn, false);
      },
      /**
       * HTML5 Audio ended listener callback.
       */
      _endListener: function() {
        var a = this, d = a._parent;
        d._duration === 1 / 0 && (d._duration = Math.ceil(a._node.duration * 10) / 10, d._sprite.__default[1] === 1 / 0 && (d._sprite.__default[1] = d._duration * 1e3), d._ended(a)), a._node.removeEventListener("ended", a._endFn, false);
      }
    };
    var s = {}, o = function(a) {
      var d = a._src;
      if (s[d]) {
        a._duration = s[d].duration, c(a);
        return;
      }
      if (/^data:[^;]+;base64,/.test(d)) {
        for (var p = atob(d.split(",")[1]), h = new Uint8Array(p.length), v = 0; v < p.length; ++v)
          h[v] = p.charCodeAt(v);
        u(h.buffer, a);
      } else {
        var T = new XMLHttpRequest();
        T.open(a._xhr.method, d, true), T.withCredentials = a._xhr.withCredentials, T.responseType = "arraybuffer", a._xhr.headers && Object.keys(a._xhr.headers).forEach(function(_) {
          T.setRequestHeader(_, a._xhr.headers[_]);
        }), T.onload = function() {
          var _ = (T.status + "")[0];
          if (_ !== "0" && _ !== "2" && _ !== "3") {
            a._emit("loaderror", null, "Failed loading audio file with status: " + T.status + ".");
            return;
          }
          u(T.response, a);
        }, T.onerror = function() {
          a._webAudio && (a._html5 = true, a._webAudio = false, a._sounds = [], delete s[d], a.load());
        }, l(T);
      }
    }, l = function(a) {
      try {
        a.send();
      } catch {
        a.onerror();
      }
    }, u = function(a, d) {
      var p = function() {
        d._emit("loaderror", null, "Decoding audio data failed.");
      }, h = function(v) {
        v && d._sounds.length > 0 ? (s[d._src] = v, c(d, v)) : p();
      };
      typeof Promise < "u" && n.ctx.decodeAudioData.length === 1 ? n.ctx.decodeAudioData(a).then(h).catch(p) : n.ctx.decodeAudioData(a, h, p);
    }, c = function(a, d) {
      d && !a._duration && (a._duration = d.duration), Object.keys(a._sprite).length === 0 && (a._sprite = { __default: [0, a._duration * 1e3] }), a._state !== "loaded" && (a._state = "loaded", a._emit("load"), a._loadQueue());
    }, m = function() {
      if (n.usingWebAudio) {
        try {
          typeof AudioContext < "u" ? n.ctx = new AudioContext() : typeof webkitAudioContext < "u" ? n.ctx = new webkitAudioContext() : n.usingWebAudio = false;
        } catch {
          n.usingWebAudio = false;
        }
        n.ctx || (n.usingWebAudio = false);
        var a = /iP(hone|od|ad)/.test(n._navigator && n._navigator.platform), d = n._navigator && n._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/), p = d ? parseInt(d[1], 10) : null;
        if (a && p && p < 9) {
          var h = /safari/.test(n._navigator && n._navigator.userAgent.toLowerCase());
          n._navigator && !h && (n.usingWebAudio = false);
        }
        n.usingWebAudio && (n.masterGain = typeof n.ctx.createGain > "u" ? n.ctx.createGainNode() : n.ctx.createGain(), n.masterGain.gain.setValueAtTime(n._muted ? 0 : n._volume, n.ctx.currentTime), n.masterGain.connect(n.ctx.destination)), n._setup();
      }
    };
    e2.Howler = n, e2.Howl = r, typeof Rn < "u" ? (Rn.HowlerGlobal = t, Rn.Howler = n, Rn.Howl = r, Rn.Sound = i) : typeof window < "u" && (window.HowlerGlobal = t, window.Howler = n, window.Howl = r, window.Sound = i);
  })();
  /*!
   *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
   *  
   *  howler.js v2.2.4
   *  howlerjs.com
   *
   *  (c) 2013-2020, James Simpson of GoldFire Studios
   *  goldfirestudios.com
   *
   *  MIT License
   */
  (function() {
    HowlerGlobal.prototype._pos = [0, 0, 0], HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0], HowlerGlobal.prototype.stereo = function(n) {
      var r = this;
      if (!r.ctx || !r.ctx.listener)
        return r;
      for (var i = r._howls.length - 1; i >= 0; i--)
        r._howls[i].stereo(n);
      return r;
    }, HowlerGlobal.prototype.pos = function(n, r, i) {
      var s = this;
      if (!s.ctx || !s.ctx.listener)
        return s;
      if (r = typeof r != "number" ? s._pos[1] : r, i = typeof i != "number" ? s._pos[2] : i, typeof n == "number")
        s._pos = [n, r, i], typeof s.ctx.listener.positionX < "u" ? (s.ctx.listener.positionX.setTargetAtTime(s._pos[0], Howler.ctx.currentTime, 0.1), s.ctx.listener.positionY.setTargetAtTime(s._pos[1], Howler.ctx.currentTime, 0.1), s.ctx.listener.positionZ.setTargetAtTime(s._pos[2], Howler.ctx.currentTime, 0.1)) : s.ctx.listener.setPosition(s._pos[0], s._pos[1], s._pos[2]);
      else
        return s._pos;
      return s;
    }, HowlerGlobal.prototype.orientation = function(n, r, i, s, o, l) {
      var u = this;
      if (!u.ctx || !u.ctx.listener)
        return u;
      var c = u._orientation;
      if (r = typeof r != "number" ? c[1] : r, i = typeof i != "number" ? c[2] : i, s = typeof s != "number" ? c[3] : s, o = typeof o != "number" ? c[4] : o, l = typeof l != "number" ? c[5] : l, typeof n == "number")
        u._orientation = [n, r, i, s, o, l], typeof u.ctx.listener.forwardX < "u" ? (u.ctx.listener.forwardX.setTargetAtTime(n, Howler.ctx.currentTime, 0.1), u.ctx.listener.forwardY.setTargetAtTime(r, Howler.ctx.currentTime, 0.1), u.ctx.listener.forwardZ.setTargetAtTime(i, Howler.ctx.currentTime, 0.1), u.ctx.listener.upX.setTargetAtTime(s, Howler.ctx.currentTime, 0.1), u.ctx.listener.upY.setTargetAtTime(o, Howler.ctx.currentTime, 0.1), u.ctx.listener.upZ.setTargetAtTime(l, Howler.ctx.currentTime, 0.1)) : u.ctx.listener.setOrientation(n, r, i, s, o, l);
      else
        return c;
      return u;
    }, Howl.prototype.init = /* @__PURE__ */ function(n) {
      return function(r) {
        var i = this;
        return i._orientation = r.orientation || [1, 0, 0], i._stereo = r.stereo || null, i._pos = r.pos || null, i._pannerAttr = {
          coneInnerAngle: typeof r.coneInnerAngle < "u" ? r.coneInnerAngle : 360,
          coneOuterAngle: typeof r.coneOuterAngle < "u" ? r.coneOuterAngle : 360,
          coneOuterGain: typeof r.coneOuterGain < "u" ? r.coneOuterGain : 0,
          distanceModel: typeof r.distanceModel < "u" ? r.distanceModel : "inverse",
          maxDistance: typeof r.maxDistance < "u" ? r.maxDistance : 1e4,
          panningModel: typeof r.panningModel < "u" ? r.panningModel : "HRTF",
          refDistance: typeof r.refDistance < "u" ? r.refDistance : 1,
          rolloffFactor: typeof r.rolloffFactor < "u" ? r.rolloffFactor : 1
        }, i._onstereo = r.onstereo ? [{ fn: r.onstereo }] : [], i._onpos = r.onpos ? [{ fn: r.onpos }] : [], i._onorientation = r.onorientation ? [{ fn: r.onorientation }] : [], n.call(this, r);
      };
    }(Howl.prototype.init), Howl.prototype.stereo = function(n, r) {
      var i = this;
      if (!i._webAudio)
        return i;
      if (i._state !== "loaded")
        return i._queue.push({
          event: "stereo",
          action: function() {
            i.stereo(n, r);
          }
        }), i;
      var s = typeof Howler.ctx.createStereoPanner > "u" ? "spatial" : "stereo";
      if (typeof r > "u")
        if (typeof n == "number")
          i._stereo = n, i._pos = [n, 0, 0];
        else
          return i._stereo;
      for (var o = i._getSoundIds(r), l = 0; l < o.length; l++) {
        var u = i._soundById(o[l]);
        if (u)
          if (typeof n == "number")
            u._stereo = n, u._pos = [n, 0, 0], u._node && (u._pannerAttr.panningModel = "equalpower", (!u._panner || !u._panner.pan) && t(u, s), s === "spatial" ? typeof u._panner.positionX < "u" ? (u._panner.positionX.setValueAtTime(n, Howler.ctx.currentTime), u._panner.positionY.setValueAtTime(0, Howler.ctx.currentTime), u._panner.positionZ.setValueAtTime(0, Howler.ctx.currentTime)) : u._panner.setPosition(n, 0, 0) : u._panner.pan.setValueAtTime(n, Howler.ctx.currentTime)), i._emit("stereo", u._id);
          else
            return u._stereo;
      }
      return i;
    }, Howl.prototype.pos = function(n, r, i, s) {
      var o = this;
      if (!o._webAudio)
        return o;
      if (o._state !== "loaded")
        return o._queue.push({
          event: "pos",
          action: function() {
            o.pos(n, r, i, s);
          }
        }), o;
      if (r = typeof r != "number" ? 0 : r, i = typeof i != "number" ? -0.5 : i, typeof s > "u")
        if (typeof n == "number")
          o._pos = [n, r, i];
        else
          return o._pos;
      for (var l = o._getSoundIds(s), u = 0; u < l.length; u++) {
        var c = o._soundById(l[u]);
        if (c)
          if (typeof n == "number")
            c._pos = [n, r, i], c._node && ((!c._panner || c._panner.pan) && t(c, "spatial"), typeof c._panner.positionX < "u" ? (c._panner.positionX.setValueAtTime(n, Howler.ctx.currentTime), c._panner.positionY.setValueAtTime(r, Howler.ctx.currentTime), c._panner.positionZ.setValueAtTime(i, Howler.ctx.currentTime)) : c._panner.setPosition(n, r, i)), o._emit("pos", c._id);
          else
            return c._pos;
      }
      return o;
    }, Howl.prototype.orientation = function(n, r, i, s) {
      var o = this;
      if (!o._webAudio)
        return o;
      if (o._state !== "loaded")
        return o._queue.push({
          event: "orientation",
          action: function() {
            o.orientation(n, r, i, s);
          }
        }), o;
      if (r = typeof r != "number" ? o._orientation[1] : r, i = typeof i != "number" ? o._orientation[2] : i, typeof s > "u")
        if (typeof n == "number")
          o._orientation = [n, r, i];
        else
          return o._orientation;
      for (var l = o._getSoundIds(s), u = 0; u < l.length; u++) {
        var c = o._soundById(l[u]);
        if (c)
          if (typeof n == "number")
            c._orientation = [n, r, i], c._node && (c._panner || (c._pos || (c._pos = o._pos || [0, 0, -0.5]), t(c, "spatial")), typeof c._panner.orientationX < "u" ? (c._panner.orientationX.setValueAtTime(n, Howler.ctx.currentTime), c._panner.orientationY.setValueAtTime(r, Howler.ctx.currentTime), c._panner.orientationZ.setValueAtTime(i, Howler.ctx.currentTime)) : c._panner.setOrientation(n, r, i)), o._emit("orientation", c._id);
          else
            return c._orientation;
      }
      return o;
    }, Howl.prototype.pannerAttr = function() {
      var n = this, r = arguments, i, s, o;
      if (!n._webAudio)
        return n;
      if (r.length === 0)
        return n._pannerAttr;
      if (r.length === 1)
        if (typeof r[0] == "object")
          i = r[0], typeof s > "u" && (i.pannerAttr || (i.pannerAttr = {
            coneInnerAngle: i.coneInnerAngle,
            coneOuterAngle: i.coneOuterAngle,
            coneOuterGain: i.coneOuterGain,
            distanceModel: i.distanceModel,
            maxDistance: i.maxDistance,
            refDistance: i.refDistance,
            rolloffFactor: i.rolloffFactor,
            panningModel: i.panningModel
          }), n._pannerAttr = {
            coneInnerAngle: typeof i.pannerAttr.coneInnerAngle < "u" ? i.pannerAttr.coneInnerAngle : n._coneInnerAngle,
            coneOuterAngle: typeof i.pannerAttr.coneOuterAngle < "u" ? i.pannerAttr.coneOuterAngle : n._coneOuterAngle,
            coneOuterGain: typeof i.pannerAttr.coneOuterGain < "u" ? i.pannerAttr.coneOuterGain : n._coneOuterGain,
            distanceModel: typeof i.pannerAttr.distanceModel < "u" ? i.pannerAttr.distanceModel : n._distanceModel,
            maxDistance: typeof i.pannerAttr.maxDistance < "u" ? i.pannerAttr.maxDistance : n._maxDistance,
            refDistance: typeof i.pannerAttr.refDistance < "u" ? i.pannerAttr.refDistance : n._refDistance,
            rolloffFactor: typeof i.pannerAttr.rolloffFactor < "u" ? i.pannerAttr.rolloffFactor : n._rolloffFactor,
            panningModel: typeof i.pannerAttr.panningModel < "u" ? i.pannerAttr.panningModel : n._panningModel
          });
        else
          return o = n._soundById(parseInt(r[0], 10)), o ? o._pannerAttr : n._pannerAttr;
      else
        r.length === 2 && (i = r[0], s = parseInt(r[1], 10));
      for (var l = n._getSoundIds(s), u = 0; u < l.length; u++)
        if (o = n._soundById(l[u]), o) {
          var c = o._pannerAttr;
          c = {
            coneInnerAngle: typeof i.coneInnerAngle < "u" ? i.coneInnerAngle : c.coneInnerAngle,
            coneOuterAngle: typeof i.coneOuterAngle < "u" ? i.coneOuterAngle : c.coneOuterAngle,
            coneOuterGain: typeof i.coneOuterGain < "u" ? i.coneOuterGain : c.coneOuterGain,
            distanceModel: typeof i.distanceModel < "u" ? i.distanceModel : c.distanceModel,
            maxDistance: typeof i.maxDistance < "u" ? i.maxDistance : c.maxDistance,
            refDistance: typeof i.refDistance < "u" ? i.refDistance : c.refDistance,
            rolloffFactor: typeof i.rolloffFactor < "u" ? i.rolloffFactor : c.rolloffFactor,
            panningModel: typeof i.panningModel < "u" ? i.panningModel : c.panningModel
          };
          var m = o._panner;
          m || (o._pos || (o._pos = n._pos || [0, 0, -0.5]), t(o, "spatial"), m = o._panner), m.coneInnerAngle = c.coneInnerAngle, m.coneOuterAngle = c.coneOuterAngle, m.coneOuterGain = c.coneOuterGain, m.distanceModel = c.distanceModel, m.maxDistance = c.maxDistance, m.refDistance = c.refDistance, m.rolloffFactor = c.rolloffFactor, m.panningModel = c.panningModel;
        }
      return n;
    }, Sound.prototype.init = /* @__PURE__ */ function(n) {
      return function() {
        var r = this, i = r._parent;
        r._orientation = i._orientation, r._stereo = i._stereo, r._pos = i._pos, r._pannerAttr = i._pannerAttr, n.call(this), r._stereo ? i.stereo(r._stereo) : r._pos && i.pos(r._pos[0], r._pos[1], r._pos[2], r._id);
      };
    }(Sound.prototype.init), Sound.prototype.reset = /* @__PURE__ */ function(n) {
      return function() {
        var r = this, i = r._parent;
        return r._orientation = i._orientation, r._stereo = i._stereo, r._pos = i._pos, r._pannerAttr = i._pannerAttr, r._stereo ? i.stereo(r._stereo) : r._pos ? i.pos(r._pos[0], r._pos[1], r._pos[2], r._id) : r._panner && (r._panner.disconnect(0), r._panner = void 0, i._refreshBuffer(r)), n.call(this);
      };
    }(Sound.prototype.reset);
    var t = function(n, r) {
      r = r || "spatial", r === "spatial" ? (n._panner = Howler.ctx.createPanner(), n._panner.coneInnerAngle = n._pannerAttr.coneInnerAngle, n._panner.coneOuterAngle = n._pannerAttr.coneOuterAngle, n._panner.coneOuterGain = n._pannerAttr.coneOuterGain, n._panner.distanceModel = n._pannerAttr.distanceModel, n._panner.maxDistance = n._pannerAttr.maxDistance, n._panner.refDistance = n._pannerAttr.refDistance, n._panner.rolloffFactor = n._pannerAttr.rolloffFactor, n._panner.panningModel = n._pannerAttr.panningModel, typeof n._panner.positionX < "u" ? (n._panner.positionX.setValueAtTime(n._pos[0], Howler.ctx.currentTime), n._panner.positionY.setValueAtTime(n._pos[1], Howler.ctx.currentTime), n._panner.positionZ.setValueAtTime(n._pos[2], Howler.ctx.currentTime)) : n._panner.setPosition(n._pos[0], n._pos[1], n._pos[2]), typeof n._panner.orientationX < "u" ? (n._panner.orientationX.setValueAtTime(n._orientation[0], Howler.ctx.currentTime), n._panner.orientationY.setValueAtTime(n._orientation[1], Howler.ctx.currentTime), n._panner.orientationZ.setValueAtTime(n._orientation[2], Howler.ctx.currentTime)) : n._panner.setOrientation(n._orientation[0], n._orientation[1], n._orientation[2])) : (n._panner = Howler.ctx.createStereoPanner(), n._panner.pan.setValueAtTime(n._stereo, Howler.ctx.currentTime)), n._panner.connect(n._node), n._paused || n._parent.pause(n._id, true).play(n._id, true);
    };
  })();
})(On);
function Kt(e2) {
  return new Promise((t, n) => {
    setTimeout(t, e2);
  });
}
const lu = (e2) => e2.reduce(
  (t, n) => ({ ...t, [n]: n }),
  {}
), cu = (e2) => e2 !== null && typeof e2 == "object" && typeof e2.then == "function" && typeof e2.catch == "function", uu = ["music", "ambiant", "sound"], Nl = lu(uu), Lt = bt("audio", {
  state: () => {
    const e2 = /* @__PURE__ */ new Map();
    for (const t in Nl)
      e2.set(t, {
        channels: [],
        options: {
          volume: 1
        }
      });
    return {
      modes: e2,
      masterVolume: 1
    };
  },
  actions: {
    stopAll() {
      this.modes.forEach((e2) => {
        e2.channels.forEach((t, n) => {
          t && (this.actuallyStopChannel(t), e2.channels[n] = null);
        });
      });
    },
    async stopChannel(e2, t) {
      const n = this.getAudioChannel(e2, t);
      if (!n)
        return;
      const { fadeOutTime: r } = Do(n.audio);
      if (this.setAudioChannel(e2, t, null), rn().options.musicFadeOutTime) {
        const i = cn(n.audio);
        i && i.fade(
          i.volume(n.howlerId),
          0,
          r,
          n.howlerId
        ), await Kt(r);
      }
      this.actuallyStopChannel(n);
    },
    async pauseChannel(e2, t) {
      const n = this.getAudioChannel(e2, t);
      if (!n)
        return;
      const r = cn(n.audio);
      if (!r) {
        ue(`Could not find audio ${n.audio}`);
        return;
      }
      r.pause(n.howlerId);
    },
    async playChannel(e2, t, n) {
      On.Howler.ctx.state === "suspended" && (console.warn("Audio context is suspended :o"), On.Howler.ctx.resume());
      const r = this.getAudioChannel(e2, n);
      if (e2 === "sound")
        return this.actuallyPlayChannel(e2, n, t);
      r && r.audio !== t ? await this.changeChannel(e2, t, n) : r && r.audio === t ? await this.resumeChannel(e2, n) : await this.actuallyPlayChannel(e2, n, t);
    },
    async resumeChannel(e2, t) {
      const n = this.getAudioChannel(e2, t);
      if (!n)
        return;
      const r = cn(n.audio);
      if (!r) {
        ue(`Could not find audio ${n.audio}`);
        return;
      }
      r.play(n.howlerId);
    },
    async changeChannel(e2, t, n) {
      this.getAudioChannel(e2, n) && e2 !== "sound" && await this.stopChannel(e2, n), await this.actuallyPlayChannel(e2, n, t);
    },
    actuallyStopChannel(e2) {
      ah(e2.audio, e2.howlerId);
    },
    getAudioChannel(e2, t) {
      return this.modes.get(e2).channels[t] || null;
    },
    setAudioChannel(e2, t, n) {
      this.modes.get(e2).channels[t] = n;
    },
    async actuallyPlayChannel(e2, t, n) {
      const r = cn(n);
      if (!r) {
        ue(`Could not find audio ${n}`);
        return;
      }
      const { fadeInTime: i, fadeInDelay: s } = Do(n), o = this.audioVolume(e2, n);
      if (e2 !== "sound") {
        const l = r.play();
        r.volume(0, l), r.pause(l), this.setAudioChannel(e2, t, {
          audio: n,
          howlerId: l
        }), await Kt(s);
        const u = this.getAudioChannel(e2, t);
        u !== null && u.audio === n && (r.play(l), r.fade(0, o, i, l));
      } else if (e2 === "sound") {
        const l = r.play();
        r.volume(o, l), this.setAudioChannel(e2, t, {
          audio: n,
          howlerId: l
        });
      }
    },
    reloadAudio(e2) {
      for (const t in e2.modes) {
        if (t === "sound")
          continue;
        const n = t;
        this.modes.get(n).options = ze(
          e2.modes[n].options
        );
        for (const r in e2.modes[n].channels) {
          const i = e2.modes[n].channels[r];
          i && i.audio && this.actuallyPlayChannel(n, Number(r), i.audio);
        }
      }
    },
    stopSound(e2) {
      const t = cn(e2);
      t && t.stop();
    },
    generateSaveData() {
      const e2 = {};
      for (const t in Nl) {
        const n = this.modes.get(t);
        e2[t] = {
          options: ze(n.options),
          channels: ze(n.channels).map((r) => r ? { audio: r.audio } : { audio: null })
        };
      }
      return {
        modes: e2,
        masterVolume: this.masterVolume
      };
    },
    loadSaveData(e2) {
      this.masterVolume = e2.masterVolume;
    },
    reset() {
      this.stopAll();
    },
    setModeVolume(e2, t) {
      const n = this.modes.get(e2);
      n.options.volume = t;
      for (const r in n.channels) {
        const i = n.channels[r];
        if (i) {
          const s = cn(i.audio);
          s && s.volume(this.modeVolume(e2), i.howlerId);
        }
      }
    },
    setMasterVolume(e2) {
      this.masterVolume = e2, On.Howler.volume(e2);
    },
    modeVolume(e2) {
      return this.masterVolume * this.modes.get(e2).options.volume;
    },
    audioVolume(e2, t) {
      var n;
      return this.modeVolume(e2) * (((n = Sp(t)) == null ? void 0 : n.volume) ?? 1);
    }
  }
}), du = {};
On.Howler.volume(0.5);
let Is = {};
async function oh(e2) {
  fn.log("Loading audio");
  const t = [];
  On.Howler.volume(e2.options.volume);
  for (const n in e2.files) {
    const r = e2.files[n];
    r.src || (r.src = r.path, r.path || console.error(
      `Audio config for ${n} doesn't have any \`src\` value to find the file`
    ), console.warn(
      "Using `path` for audio and musics is deprecated. Please replace `path` with `src` in your config file!"
    )), t.push(sh(n, e2.files[n]));
  }
  return e2.audioTriggers && (Is = e2.audioTriggers), Promise.all(t);
}
function Er(e2) {
  Is[e2] && Lt().playChannel("sound", Is[e2], 0);
}
async function sh(e2, t) {
  return new Promise((n, r) => {
    const i = new On.Howl({
      ...t,
      src: Wt(t.src)
    });
    i.load(), du[e2] = i, n();
  });
}
function ah(e2, t) {
  const n = cn(e2);
  if (!n) {
    li(`Could not find music ${e2}`);
    return;
  }
  n.stop(t);
}
function cn(e2) {
  return du[e2];
}
function lh(e2) {
  const t = cn(e2), { fadeInTime: n } = Do(e2), r = t.play(), s = Lt().audioVolume("music", e2);
  return t.fade(0, s, n, r), r;
}
async function ch(e2, t) {
  const n = cn(e2), { fadeOutTime: r } = Do(e2);
  n.fade(n.volume(t), 0, r, t), await Kt(r), n.stop(t);
}
function uh(e2, t) {
  return e2 - t * Vi().options.extraPointsPerLevel;
}
function fu(e2, t) {
  const { options: n } = Vi();
  let r = e2;
  n.showDifficultyWithoutModifiers || (r = uh(e2, t));
  const i = Vi().options;
  let s = false, o = 0, l = i.difficultyText[0][1];
  for (; !s; )
    i.difficultyText.length > o && r >= i.difficultyText[o][0] ? l = i.difficultyText[o][1] : s = true, o++;
  let u = "";
  return n.showDifficultyText && n.showDifficultyNumber ? u = `${l} (${r})` : n.showDifficultyText ? u = l : n.showDifficultyNumber && (u = r.toString()), u;
}
function dh({
  skill: e2,
  skillCheckId: t,
  value: n
}) {
  const r = vt(), i = r.getSkillCheck(t), s = pl(e2), o = r.skills[e2].level, l = fu(n, o);
  let u = true, c = `<span class='skill-check'>[<span class='skill-check-name'>${s.name}</span> - `;
  return i.happened ? i.succeeded ? c = "" : (u = false, c += ` <span class='skill-check-difficulty'>${l}</span> - <span class='skill-check-failed'>FAILED</span>]</span>`) : c += ` <span class='skill-check-difficulty'>${l}</span>]</span>`, {
    difficultyText: c,
    allowed: u
  };
}
function fh(e2, t) {
  const n = vt(), r = pl(t.skill), i = fu(
    t.difficulty,
    n.skills[t.skill].level
  );
  return `<span class='passive-skill-check skill-check'>[<span class='skill-check-name'>${r.name}</span> - <span class='skill-check-difficulty'>${i}</span> - ${e2 ? '<span class="skill-check-success">Success</span>' : '<span class="skill-check-failed">Failure</span>'}]</span>`;
}
function ph(e2) {
  const { options: t } = Vi(), n = mh(t, e2), s = vt().skills[e2].level * t.extraPointsPerLevel;
  let o = n.reduce(
    (l, u) => l + u.unmodified,
    s
  );
  return t.finalRollIsHighest ? (o = n.reduce((l, u) => u.modified > l ? u.modified : l, 0), fn.log(`[SKILL CHECK] Keeping only highest roll: ${o}`)) : t.finalRollIsLowest && (o = n.reduce((l, u) => u.modified < l ? u.modified : l, n[0].modified), fn.log(`[SKILL CHECK] Keeping only lowest roll: ${o}`)), {
    roll: o,
    rolls: n
  };
}
function mh(e2, t) {
  const r = vt().skills[t], i = r.level * e2.extraPointsPerLevel;
  let { diceRange: s, diceCount: o } = e2;
  e2.extraDicePerLevel && (o += e2.extraDicePerLevel * r.level);
  const l = [];
  for (let u = 0; u < o; u++) {
    const c = hh(s), m = c + i;
    fn.log(
      `[SKILL CHECK] Roll ${u + 1}/${o}: ${m}. (Base roll: ${c}, modifier: ${i} - Skill level: ${r.level})`
    ), l.push({
      unmodified: c,
      modified: m
    });
  }
  return l;
}
function hh(e2) {
  return Math.floor(Math.random() * e2[1]) + e2[0];
}
function yh(e2) {
  const { skills: t } = Bn(), { roll: n, rolls: r } = ph(e2.skill), i = t[e2.skill];
  let s = false;
  if (typeof e2.winsNeeded == "number") {
    const o = r.reduce((l, u) => (xl(u.modified, e2.difficulty) && l++, l), 0);
    o >= e2.winsNeeded && (s = true), fn.log(
      `[SKILL CHECK ${i.name}] - Dice pool mode. ${e2.winsNeeded} wins needed. Got ${o} successes.
      (${e2.id} - ${o}/${e2.winsNeeded} - rolls: ${JSON.stringify(r.map((l) => l.modified))})`
    );
  } else
    s = xl(n, e2.difficulty), fn.log(
      `[SKILL CHECK ${i.name}]: ${s ? "✅" : "❌"}`,
      `(${e2.id}) - ${n}/${e2.difficulty}`
    );
  return Er(s ? "onSkillCheckSuccess" : "onSkillCheckFailure"), s;
}
function xl(e2, t) {
  const { options: n } = Vi();
  let r = e2 >= t;
  return n.successOnRollsBelowThreshold && (r = e2 <= t), n.failOnRollsEqualToThreshold && e2 === t && (r = false), r;
}
var f = {};
(function(e2) {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.Type = e2.JsonType = e2.JavaScriptTypeBuilder = e2.JsonTypeBuilder = e2.TypeBuilder = e2.TypeBuilderError = e2.TransformEncodeBuilder = e2.TransformDecodeBuilder = e2.TemplateLiteralDslParser = e2.TemplateLiteralGenerator = e2.TemplateLiteralGeneratorError = e2.TemplateLiteralFinite = e2.TemplateLiteralFiniteError = e2.TemplateLiteralParser = e2.TemplateLiteralParserError = e2.TemplateLiteralResolver = e2.TemplateLiteralPattern = e2.TemplateLiteralPatternError = e2.UnionResolver = e2.KeyArrayResolver = e2.KeyArrayResolverError = e2.KeyResolver = e2.ObjectMap = e2.Intrinsic = e2.IndexedAccessor = e2.TypeClone = e2.TypeExtends = e2.TypeExtendsResult = e2.TypeExtendsError = e2.ExtendsUndefined = e2.TypeGuard = e2.TypeGuardUnknownTypeError = e2.ValueGuard = e2.FormatRegistry = e2.TypeBoxError = e2.TypeRegistry = e2.PatternStringExact = e2.PatternNumberExact = e2.PatternBooleanExact = e2.PatternString = e2.PatternNumber = e2.PatternBoolean = e2.Kind = e2.Hint = e2.Optional = e2.Readonly = e2.Transform = void 0, e2.Transform = Symbol.for("TypeBox.Transform"), e2.Readonly = Symbol.for("TypeBox.Readonly"), e2.Optional = Symbol.for("TypeBox.Optional"), e2.Hint = Symbol.for("TypeBox.Hint"), e2.Kind = Symbol.for("TypeBox.Kind"), e2.PatternBoolean = "(true|false)", e2.PatternNumber = "(0|[1-9][0-9]*)", e2.PatternString = "(.*)", e2.PatternBooleanExact = `^${e2.PatternBoolean}$`, e2.PatternNumberExact = `^${e2.PatternNumber}$`, e2.PatternStringExact = `^${e2.PatternString}$`;
  var t;
  (function(N) {
    const y = /* @__PURE__ */ new Map();
    function k() {
      return new Map(y);
    }
    N.Entries = k;
    function C() {
      return y.clear();
    }
    N.Clear = C;
    function g(H) {
      return y.delete(H);
    }
    N.Delete = g;
    function b(H) {
      return y.has(H);
    }
    N.Has = b;
    function $(H, ie) {
      y.set(H, ie);
    }
    N.Set = $;
    function R(H) {
      return y.get(H);
    }
    N.Get = R;
  })(t || (e2.TypeRegistry = t = {}));
  class n extends Error {
    constructor(y) {
      super(y);
    }
  }
  e2.TypeBoxError = n;
  var r;
  (function(N) {
    const y = /* @__PURE__ */ new Map();
    function k() {
      return new Map(y);
    }
    N.Entries = k;
    function C() {
      return y.clear();
    }
    N.Clear = C;
    function g(H) {
      return y.delete(H);
    }
    N.Delete = g;
    function b(H) {
      return y.has(H);
    }
    N.Has = b;
    function $(H, ie) {
      y.set(H, ie);
    }
    N.Set = $;
    function R(H) {
      return y.get(H);
    }
    N.Get = R;
  })(r || (e2.FormatRegistry = r = {}));
  var i;
  (function(N) {
    function y(oe) {
      return Array.isArray(oe);
    }
    N.IsArray = y;
    function k(oe) {
      return typeof oe == "bigint";
    }
    N.IsBigInt = k;
    function C(oe) {
      return typeof oe == "boolean";
    }
    N.IsBoolean = C;
    function g(oe) {
      return oe instanceof globalThis.Date;
    }
    N.IsDate = g;
    function b(oe) {
      return oe === null;
    }
    N.IsNull = b;
    function $(oe) {
      return typeof oe == "number";
    }
    N.IsNumber = $;
    function R(oe) {
      return typeof oe == "object" && oe !== null;
    }
    N.IsObject = R;
    function H(oe) {
      return typeof oe == "string";
    }
    N.IsString = H;
    function ie(oe) {
      return oe instanceof globalThis.Uint8Array;
    }
    N.IsUint8Array = ie;
    function ne(oe) {
      return oe === void 0;
    }
    N.IsUndefined = ne;
  })(i || (e2.ValueGuard = i = {}));
  class s extends n {
  }
  e2.TypeGuardUnknownTypeError = s;
  var o;
  (function(N) {
    function y(O) {
      try {
        return new RegExp(O), true;
      } catch {
        return false;
      }
    }
    function k(O) {
      if (!i.IsString(O))
        return false;
      for (let I = 0; I < O.length; I++) {
        const A = O.charCodeAt(I);
        if (A >= 7 && A <= 13 || A === 27 || A === 127)
          return false;
      }
      return true;
    }
    function C(O) {
      return $(O) || ht(O);
    }
    function g(O) {
      return i.IsUndefined(O) || i.IsBigInt(O);
    }
    function b(O) {
      return i.IsUndefined(O) || i.IsNumber(O);
    }
    function $(O) {
      return i.IsUndefined(O) || i.IsBoolean(O);
    }
    function R(O) {
      return i.IsUndefined(O) || i.IsString(O);
    }
    function H(O) {
      return i.IsUndefined(O) || i.IsString(O) && k(O) && y(O);
    }
    function ie(O) {
      return i.IsUndefined(O) || i.IsString(O) && k(O);
    }
    function ne(O) {
      return i.IsUndefined(O) || ht(O);
    }
    function oe(O) {
      return Ne(O, "Any") && R(O.$id);
    }
    N.TAny = oe;
    function je(O) {
      return Ne(O, "Array") && O.type === "array" && R(O.$id) && ht(O.items) && b(O.minItems) && b(O.maxItems) && $(O.uniqueItems) && ne(O.contains) && b(O.minContains) && b(O.maxContains);
    }
    N.TArray = je;
    function M(O) {
      return Ne(O, "AsyncIterator") && O.type === "AsyncIterator" && R(O.$id) && ht(O.items);
    }
    N.TAsyncIterator = M;
    function ee(O) {
      return Ne(O, "BigInt") && O.type === "bigint" && R(O.$id) && g(O.exclusiveMaximum) && g(O.exclusiveMinimum) && g(O.maximum) && g(O.minimum) && g(O.multipleOf);
    }
    N.TBigInt = ee;
    function he(O) {
      return Ne(O, "Boolean") && O.type === "boolean" && R(O.$id);
    }
    N.TBoolean = he;
    function fe(O) {
      return Ne(O, "Constructor") && O.type === "Constructor" && R(O.$id) && i.IsArray(O.parameters) && O.parameters.every((I) => ht(I)) && ht(O.returns);
    }
    N.TConstructor = fe;
    function we(O) {
      return Ne(O, "Date") && O.type === "Date" && R(O.$id) && b(O.exclusiveMaximumTimestamp) && b(O.exclusiveMinimumTimestamp) && b(O.maximumTimestamp) && b(O.minimumTimestamp) && b(O.multipleOfTimestamp);
    }
    N.TDate = we;
    function Ae(O) {
      return Ne(O, "Function") && O.type === "Function" && R(O.$id) && i.IsArray(O.parameters) && O.parameters.every((I) => ht(I)) && ht(O.returns);
    }
    N.TFunction = Ae;
    function Ve(O) {
      return Ne(O, "Integer") && O.type === "integer" && R(O.$id) && b(O.exclusiveMaximum) && b(O.exclusiveMinimum) && b(O.maximum) && b(O.minimum) && b(O.multipleOf);
    }
    N.TInteger = Ve;
    function lt(O) {
      return Ne(O, "Intersect") && !(i.IsString(O.type) && O.type !== "object") && i.IsArray(O.allOf) && O.allOf.every((I) => ht(I) && !fr(I)) && R(O.type) && ($(O.unevaluatedProperties) || ne(O.unevaluatedProperties)) && R(O.$id);
    }
    N.TIntersect = lt;
    function ot(O) {
      return Ne(O, "Iterator") && O.type === "Iterator" && R(O.$id) && ht(O.items);
    }
    N.TIterator = ot;
    function Ne(O, I) {
      return G(O) && O[e2.Kind] === I;
    }
    N.TKindOf = Ne;
    function G(O) {
      return i.IsObject(O) && e2.Kind in O && i.IsString(O[e2.Kind]);
    }
    N.TKind = G;
    function se(O) {
      return Se(O) && i.IsString(O.const);
    }
    N.TLiteralString = se;
    function ae(O) {
      return Se(O) && i.IsNumber(O.const);
    }
    N.TLiteralNumber = ae;
    function pe(O) {
      return Se(O) && i.IsBoolean(O.const);
    }
    N.TLiteralBoolean = pe;
    function Se(O) {
      return Ne(O, "Literal") && R(O.$id) && (i.IsBoolean(O.const) || i.IsNumber(O.const) || i.IsString(O.const));
    }
    N.TLiteral = Se;
    function xe(O) {
      return Ne(O, "Never") && i.IsObject(O.not) && Object.getOwnPropertyNames(O.not).length === 0;
    }
    N.TNever = xe;
    function Ee(O) {
      return Ne(O, "Not") && ht(O.not);
    }
    N.TNot = Ee;
    function Tt(O) {
      return Ne(O, "Null") && O.type === "null" && R(O.$id);
    }
    N.TNull = Tt;
    function zt(O) {
      return Ne(O, "Number") && O.type === "number" && R(O.$id) && b(O.exclusiveMaximum) && b(O.exclusiveMinimum) && b(O.maximum) && b(O.minimum) && b(O.multipleOf);
    }
    N.TNumber = zt;
    function Qt(O) {
      return Ne(O, "Object") && O.type === "object" && R(O.$id) && i.IsObject(O.properties) && C(O.additionalProperties) && b(O.minProperties) && b(O.maxProperties) && Object.entries(O.properties).every(([I, A]) => k(I) && ht(A));
    }
    N.TObject = Qt;
    function Mt(O) {
      return Ne(O, "Promise") && O.type === "Promise" && R(O.$id) && ht(O.item);
    }
    N.TPromise = Mt;
    function ur(O) {
      return Ne(O, "Record") && O.type === "object" && R(O.$id) && C(O.additionalProperties) && i.IsObject(O.patternProperties) && ((I) => {
        const A = Object.getOwnPropertyNames(I.patternProperties);
        return A.length === 1 && y(A[0]) && i.IsObject(I.patternProperties) && ht(I.patternProperties[A[0]]);
      })(O);
    }
    N.TRecord = ur;
    function pi(O) {
      return i.IsObject(O) && e2.Hint in O && O[e2.Hint] === "Recursive";
    }
    N.TRecursive = pi;
    function dr(O) {
      return Ne(O, "Ref") && R(O.$id) && i.IsString(O.$ref);
    }
    N.TRef = dr;
    function Ft(O) {
      return Ne(O, "String") && O.type === "string" && R(O.$id) && b(O.minLength) && b(O.maxLength) && H(O.pattern) && ie(O.format);
    }
    N.TString = Ft;
    function xr(O) {
      return Ne(O, "Symbol") && O.type === "symbol" && R(O.$id);
    }
    N.TSymbol = xr;
    function Nn(O) {
      return Ne(O, "TemplateLiteral") && O.type === "string" && i.IsString(O.pattern) && O.pattern[0] === "^" && O.pattern[O.pattern.length - 1] === "$";
    }
    N.TTemplateLiteral = Nn;
    function jr(O) {
      return Ne(O, "This") && R(O.$id) && i.IsString(O.$ref);
    }
    N.TThis = jr;
    function fr(O) {
      return i.IsObject(O) && e2.Transform in O;
    }
    N.TTransform = fr;
    function mt(O) {
      return Ne(O, "Tuple") && O.type === "array" && R(O.$id) && i.IsNumber(O.minItems) && i.IsNumber(O.maxItems) && O.minItems === O.maxItems && // empty
      (i.IsUndefined(O.items) && i.IsUndefined(O.additionalItems) && O.minItems === 0 || i.IsArray(O.items) && O.items.every((I) => ht(I)));
    }
    N.TTuple = mt;
    function Lr(O) {
      return Ne(O, "Undefined") && O.type === "undefined" && R(O.$id);
    }
    N.TUndefined = Lr;
    function yn(O) {
      return xn(O) && O.anyOf.every((I) => se(I) || ae(I));
    }
    N.TUnionLiteral = yn;
    function xn(O) {
      return Ne(O, "Union") && R(O.$id) && i.IsObject(O) && i.IsArray(O.anyOf) && O.anyOf.every((I) => ht(I));
    }
    N.TUnion = xn;
    function jn(O) {
      return Ne(O, "Uint8Array") && O.type === "Uint8Array" && R(O.$id) && b(O.minByteLength) && b(O.maxByteLength);
    }
    N.TUint8Array = jn;
    function Ot(O) {
      return Ne(O, "Unknown") && R(O.$id);
    }
    N.TUnknown = Ot;
    function zn(O) {
      return Ne(O, "Unsafe");
    }
    N.TUnsafe = zn;
    function Qn(O) {
      return Ne(O, "Void") && O.type === "void" && R(O.$id);
    }
    N.TVoid = Qn;
    function mi(O) {
      return i.IsObject(O) && O[e2.Readonly] === "Readonly";
    }
    N.TReadonly = mi;
    function Dr(O) {
      return i.IsObject(O) && O[e2.Optional] === "Optional";
    }
    N.TOptional = Dr;
    function ht(O) {
      return i.IsObject(O) && (oe(O) || je(O) || he(O) || ee(O) || M(O) || fe(O) || we(O) || Ae(O) || Ve(O) || lt(O) || ot(O) || Se(O) || xe(O) || Ee(O) || Tt(O) || zt(O) || Qt(O) || Mt(O) || ur(O) || dr(O) || Ft(O) || xr(O) || Nn(O) || jr(O) || mt(O) || Lr(O) || xn(O) || jn(O) || Ot(O) || zn(O) || Qn(O) || G(O) && t.Has(O[e2.Kind]));
    }
    N.TSchema = ht;
  })(o || (e2.TypeGuard = o = {}));
  var l;
  (function(N) {
    function y(k) {
      return k[e2.Kind] === "Intersect" ? k.allOf.every((C) => y(C)) : k[e2.Kind] === "Union" ? k.anyOf.some((C) => y(C)) : k[e2.Kind] === "Undefined" ? true : k[e2.Kind] === "Not" ? !y(k.not) : false;
    }
    N.Check = y;
  })(l || (e2.ExtendsUndefined = l = {}));
  class u extends n {
  }
  e2.TypeExtendsError = u;
  var c;
  (function(N) {
    N[N.Union = 0] = "Union", N[N.True = 1] = "True", N[N.False = 2] = "False";
  })(c || (e2.TypeExtendsResult = c = {}));
  var m;
  (function(N) {
    function y(w) {
      return w === c.False ? w : c.True;
    }
    function k(w) {
      throw new u(w);
    }
    function C(w) {
      return o.TNever(w) || o.TIntersect(w) || o.TUnion(w) || o.TUnknown(w) || o.TAny(w);
    }
    function g(w, S) {
      return o.TNever(S) ? Ne() : o.TIntersect(S) ? Ae(w, S) : o.TUnion(S) ? K(w, S) : o.TUnknown(S) ? _e() : o.TAny(S) ? b() : k("StructuralRight");
    }
    function b(w, S) {
      return c.True;
    }
    function $(w, S) {
      return o.TIntersect(S) ? Ae(w, S) : o.TUnion(S) && S.anyOf.some((be) => o.TAny(be) || o.TUnknown(be)) ? c.True : o.TUnion(S) ? c.Union : o.TUnknown(S) || o.TAny(S) ? c.True : c.Union;
    }
    function R(w, S) {
      return o.TUnknown(w) ? c.False : o.TAny(w) ? c.Union : o.TNever(w) ? c.True : c.False;
    }
    function H(w, S) {
      return o.TObject(S) && Nn(S) ? c.True : C(S) ? g(w, S) : o.TArray(S) ? y(me(w.items, S.items)) : c.False;
    }
    function ie(w, S) {
      return C(S) ? g(w, S) : o.TAsyncIterator(S) ? y(me(w.items, S.items)) : c.False;
    }
    function ne(w, S) {
      return C(S) ? g(w, S) : o.TObject(S) ? mt(w, S) : o.TRecord(S) ? Ot(w, S) : o.TBigInt(S) ? c.True : c.False;
    }
    function oe(w, S) {
      return o.TLiteral(w) && i.IsBoolean(w.const) || o.TBoolean(w) ? c.True : c.False;
    }
    function je(w, S) {
      return C(S) ? g(w, S) : o.TObject(S) ? mt(w, S) : o.TRecord(S) ? Ot(w, S) : o.TBoolean(S) ? c.True : c.False;
    }
    function M(w, S) {
      return C(S) ? g(w, S) : o.TObject(S) ? mt(w, S) : o.TConstructor(S) ? w.parameters.length > S.parameters.length ? c.False : w.parameters.every((be, We) => y(me(S.parameters[We], be)) === c.True) ? y(me(w.returns, S.returns)) : c.False : c.False;
    }
    function ee(w, S) {
      return C(S) ? g(w, S) : o.TObject(S) ? mt(w, S) : o.TRecord(S) ? Ot(w, S) : o.TDate(S) ? c.True : c.False;
    }
    function he(w, S) {
      return C(S) ? g(w, S) : o.TObject(S) ? mt(w, S) : o.TFunction(S) ? w.parameters.length > S.parameters.length ? c.False : w.parameters.every((be, We) => y(me(S.parameters[We], be)) === c.True) ? y(me(w.returns, S.returns)) : c.False : c.False;
    }
    function fe(w, S) {
      return o.TLiteral(w) && i.IsNumber(w.const) || o.TNumber(w) || o.TInteger(w) ? c.True : c.False;
    }
    function we(w, S) {
      return o.TInteger(S) || o.TNumber(S) ? c.True : C(S) ? g(w, S) : o.TObject(S) ? mt(w, S) : o.TRecord(S) ? Ot(w, S) : c.False;
    }
    function Ae(w, S) {
      return S.allOf.every((be) => me(w, be) === c.True) ? c.True : c.False;
    }
    function Ve(w, S) {
      return w.allOf.some((be) => me(be, S) === c.True) ? c.True : c.False;
    }
    function lt(w, S) {
      return C(S) ? g(w, S) : o.TIterator(S) ? y(me(w.items, S.items)) : c.False;
    }
    function ot(w, S) {
      return o.TLiteral(S) && S.const === w.const ? c.True : C(S) ? g(w, S) : o.TObject(S) ? mt(w, S) : o.TRecord(S) ? Ot(w, S) : o.TString(S) ? Qn(w) : o.TNumber(S) ? Se(w) : o.TInteger(S) ? fe(w) : o.TBoolean(S) ? oe(w) : c.False;
    }
    function Ne(w, S) {
      return c.False;
    }
    function G(w, S) {
      return c.True;
    }
    function se(w) {
      let [S, be] = [w, 0];
      for (; o.TNot(S); )
        S = S.not, be += 1;
      return be % 2 === 0 ? S : e2.Type.Unknown();
    }
    function ae(w, S) {
      return o.TNot(w) ? me(se(w), S) : o.TNot(S) ? me(w, se(S)) : k("Invalid fallthrough for Not");
    }
    function pe(w, S) {
      return C(S) ? g(w, S) : o.TObject(S) ? mt(w, S) : o.TRecord(S) ? Ot(w, S) : o.TNull(S) ? c.True : c.False;
    }
    function Se(w, S) {
      return o.TLiteralNumber(w) || o.TNumber(w) || o.TInteger(w) ? c.True : c.False;
    }
    function xe(w, S) {
      return C(S) ? g(w, S) : o.TObject(S) ? mt(w, S) : o.TRecord(S) ? Ot(w, S) : o.TInteger(S) || o.TNumber(S) ? c.True : c.False;
    }
    function Ee(w, S) {
      return Object.getOwnPropertyNames(w.properties).length === S;
    }
    function Tt(w) {
      return Nn(w);
    }
    function zt(w) {
      return Ee(w, 0) || Ee(w, 1) && "description" in w.properties && o.TUnion(w.properties.description) && w.properties.description.anyOf.length === 2 && (o.TString(w.properties.description.anyOf[0]) && o.TUndefined(w.properties.description.anyOf[1]) || o.TString(w.properties.description.anyOf[1]) && o.TUndefined(w.properties.description.anyOf[0]));
    }
    function Qt(w) {
      return Ee(w, 0);
    }
    function Mt(w) {
      return Ee(w, 0);
    }
    function ur(w) {
      return Ee(w, 0);
    }
    function pi(w) {
      return Ee(w, 0);
    }
    function dr(w) {
      return Nn(w);
    }
    function Ft(w) {
      const S = e2.Type.Number();
      return Ee(w, 0) || Ee(w, 1) && "length" in w.properties && y(me(w.properties.length, S)) === c.True;
    }
    function xr(w) {
      return Ee(w, 0);
    }
    function Nn(w) {
      const S = e2.Type.Number();
      return Ee(w, 0) || Ee(w, 1) && "length" in w.properties && y(me(w.properties.length, S)) === c.True;
    }
    function jr(w) {
      const S = e2.Type.Function([e2.Type.Any()], e2.Type.Any());
      return Ee(w, 0) || Ee(w, 1) && "then" in w.properties && y(me(w.properties.then, S)) === c.True;
    }
    function fr(w, S) {
      return me(w, S) === c.False || o.TOptional(w) && !o.TOptional(S) ? c.False : c.True;
    }
    function mt(w, S) {
      return o.TUnknown(w) ? c.False : o.TAny(w) ? c.Union : o.TNever(w) || o.TLiteralString(w) && Tt(S) || o.TLiteralNumber(w) && Qt(S) || o.TLiteralBoolean(w) && Mt(S) || o.TSymbol(w) && zt(S) || o.TBigInt(w) && ur(S) || o.TString(w) && Tt(S) || o.TSymbol(w) && zt(S) || o.TNumber(w) && Qt(S) || o.TInteger(w) && Qt(S) || o.TBoolean(w) && Mt(S) || o.TUint8Array(w) && dr(S) || o.TDate(w) && pi(S) || o.TConstructor(w) && xr(S) || o.TFunction(w) && Ft(S) ? c.True : o.TRecord(w) && o.TString(xn(w)) ? S[e2.Hint] === "Record" ? c.True : c.False : o.TRecord(w) && o.TNumber(xn(w)) ? Ee(S, 0) ? c.True : c.False : c.False;
    }
    function Lr(w, S) {
      return C(S) ? g(w, S) : o.TRecord(S) ? Ot(w, S) : o.TObject(S) ? (() => {
        for (const be of Object.getOwnPropertyNames(S.properties)) {
          if (!(be in w.properties) && !o.TOptional(S.properties[be]))
            return c.False;
          if (o.TOptional(S.properties[be]))
            return c.True;
          if (fr(w.properties[be], S.properties[be]) === c.False)
            return c.False;
        }
        return c.True;
      })() : c.False;
    }
    function yn(w, S) {
      return C(S) ? g(w, S) : o.TObject(S) && jr(S) ? c.True : o.TPromise(S) ? y(me(w.item, S.item)) : c.False;
    }
    function xn(w) {
      return e2.PatternNumberExact in w.patternProperties ? e2.Type.Number() : e2.PatternStringExact in w.patternProperties ? e2.Type.String() : k("Unknown record key pattern");
    }
    function jn(w) {
      return e2.PatternNumberExact in w.patternProperties ? w.patternProperties[e2.PatternNumberExact] : e2.PatternStringExact in w.patternProperties ? w.patternProperties[e2.PatternStringExact] : k("Unable to get record value schema");
    }
    function Ot(w, S) {
      const [be, We] = [xn(S), jn(S)];
      return o.TLiteralString(w) && o.TNumber(be) && y(me(w, We)) === c.True ? c.True : o.TUint8Array(w) && o.TNumber(be) || o.TString(w) && o.TNumber(be) || o.TArray(w) && o.TNumber(be) ? me(w, We) : o.TObject(w) ? (() => {
        for (const it of Object.getOwnPropertyNames(w.properties))
          if (fr(We, w.properties[it]) === c.False)
            return c.False;
        return c.True;
      })() : c.False;
    }
    function zn(w, S) {
      return C(S) ? g(w, S) : o.TObject(S) ? mt(w, S) : o.TRecord(S) ? me(jn(w), jn(S)) : c.False;
    }
    function Qn(w, S) {
      return o.TLiteral(w) && i.IsString(w.const) || o.TString(w) ? c.True : c.False;
    }
    function mi(w, S) {
      return C(S) ? g(w, S) : o.TObject(S) ? mt(w, S) : o.TRecord(S) ? Ot(w, S) : o.TString(S) ? c.True : c.False;
    }
    function Dr(w, S) {
      return C(S) ? g(w, S) : o.TObject(S) ? mt(w, S) : o.TRecord(S) ? Ot(w, S) : o.TSymbol(S) ? c.True : c.False;
    }
    function ht(w, S) {
      return o.TTemplateLiteral(w) ? me(B.Resolve(w), S) : o.TTemplateLiteral(S) ? me(w, B.Resolve(S)) : k("Invalid fallthrough for TemplateLiteral");
    }
    function O(w, S) {
      return o.TArray(S) && w.items !== void 0 && w.items.every((be) => me(be, S.items) === c.True);
    }
    function I(w, S) {
      return o.TNever(w) ? c.True : o.TUnknown(w) ? c.False : o.TAny(w) ? c.Union : c.False;
    }
    function A(w, S) {
      return C(S) ? g(w, S) : o.TObject(S) && Nn(S) || o.TArray(S) && O(w, S) ? c.True : o.TTuple(S) ? i.IsUndefined(w.items) && !i.IsUndefined(S.items) || !i.IsUndefined(w.items) && i.IsUndefined(S.items) ? c.False : i.IsUndefined(w.items) && !i.IsUndefined(S.items) || w.items.every((be, We) => me(be, S.items[We]) === c.True) ? c.True : c.False : c.False;
    }
    function x(w, S) {
      return C(S) ? g(w, S) : o.TObject(S) ? mt(w, S) : o.TRecord(S) ? Ot(w, S) : o.TUint8Array(S) ? c.True : c.False;
    }
    function W(w, S) {
      return C(S) ? g(w, S) : o.TObject(S) ? mt(w, S) : o.TRecord(S) ? Ot(w, S) : o.TVoid(S) ? nt(w) : o.TUndefined(S) ? c.True : c.False;
    }
    function K(w, S) {
      return S.anyOf.some((be) => me(w, be) === c.True) ? c.True : c.False;
    }
    function ge(w, S) {
      return w.anyOf.every((be) => me(be, S) === c.True) ? c.True : c.False;
    }
    function _e(w, S) {
      return c.True;
    }
    function Be(w, S) {
      return o.TNever(S) ? Ne() : o.TIntersect(S) ? Ae(w, S) : o.TUnion(S) ? K(w, S) : o.TAny(S) ? b() : o.TString(S) ? Qn(w) : o.TNumber(S) ? Se(w) : o.TInteger(S) ? fe(w) : o.TBoolean(S) ? oe(w) : o.TArray(S) ? R(w) : o.TTuple(S) ? I(w) : o.TObject(S) ? mt(w, S) : o.TUnknown(S) ? c.True : c.False;
    }
    function nt(w, S) {
      return o.TUndefined(w) || o.TUndefined(w) ? c.True : c.False;
    }
    function ut(w, S) {
      return o.TIntersect(S) ? Ae(w, S) : o.TUnion(S) ? K(w, S) : o.TUnknown(S) ? _e() : o.TAny(S) ? b() : o.TObject(S) ? mt(w, S) : o.TVoid(S) ? c.True : c.False;
    }
    function me(w, S) {
      return (
        // resolvable
        o.TTemplateLiteral(w) || o.TTemplateLiteral(S) ? ht(w, S) : o.TNot(w) || o.TNot(S) ? ae(w, S) : (
          // standard
          o.TAny(w) ? $(w, S) : o.TArray(w) ? H(w, S) : o.TBigInt(w) ? ne(w, S) : o.TBoolean(w) ? je(w, S) : o.TAsyncIterator(w) ? ie(w, S) : o.TConstructor(w) ? M(w, S) : o.TDate(w) ? ee(w, S) : o.TFunction(w) ? he(w, S) : o.TInteger(w) ? we(w, S) : o.TIntersect(w) ? Ve(w, S) : o.TIterator(w) ? lt(w, S) : o.TLiteral(w) ? ot(w, S) : o.TNever(w) ? G() : o.TNull(w) ? pe(w, S) : o.TNumber(w) ? xe(w, S) : o.TObject(w) ? Lr(w, S) : o.TRecord(w) ? zn(w, S) : o.TString(w) ? mi(w, S) : o.TSymbol(w) ? Dr(w, S) : o.TTuple(w) ? A(w, S) : o.TPromise(w) ? yn(w, S) : o.TUint8Array(w) ? x(w, S) : o.TUndefined(w) ? W(w, S) : o.TUnion(w) ? ge(w, S) : o.TUnknown(w) ? Be(w, S) : o.TVoid(w) ? ut(w, S) : k(`Unknown left type operand '${w[e2.Kind]}'`)
        )
      );
    }
    function Xe(w, S) {
      return me(w, S);
    }
    N.Extends = Xe;
  })(m || (e2.TypeExtends = m = {}));
  var a;
  (function(N) {
    function y(H) {
      return H.map((ie) => b(ie));
    }
    function k(H) {
      return new Date(H.getTime());
    }
    function C(H) {
      return new Uint8Array(H);
    }
    function g(H) {
      const ie = Object.getOwnPropertyNames(H).reduce((oe, je) => ({ ...oe, [je]: b(H[je]) }), {}), ne = Object.getOwnPropertySymbols(H).reduce((oe, je) => ({ ...oe, [je]: b(H[je]) }), {});
      return { ...ie, ...ne };
    }
    function b(H) {
      return i.IsArray(H) ? y(H) : i.IsDate(H) ? k(H) : i.IsUint8Array(H) ? C(H) : i.IsObject(H) ? g(H) : H;
    }
    function $(H) {
      return H.map((ie) => R(ie));
    }
    N.Rest = $;
    function R(H, ie = {}) {
      return { ...b(H), ...ie };
    }
    N.Type = R;
  })(a || (e2.TypeClone = a = {}));
  var d;
  (function(N) {
    function y(M) {
      return M.map((ee) => {
        const { [e2.Optional]: he, ...fe } = a.Type(ee);
        return fe;
      });
    }
    function k(M) {
      return M.every((ee) => o.TOptional(ee));
    }
    function C(M) {
      return M.some((ee) => o.TOptional(ee));
    }
    function g(M) {
      return k(M.allOf) ? e2.Type.Optional(e2.Type.Intersect(y(M.allOf))) : M;
    }
    function b(M) {
      return C(M.anyOf) ? e2.Type.Optional(e2.Type.Union(y(M.anyOf))) : M;
    }
    function $(M) {
      return M[e2.Kind] === "Intersect" ? g(M) : M[e2.Kind] === "Union" ? b(M) : M;
    }
    function R(M, ee) {
      const he = M.allOf.reduce((fe, we) => {
        const Ae = oe(we, ee);
        return Ae[e2.Kind] === "Never" ? fe : [...fe, Ae];
      }, []);
      return $(e2.Type.Intersect(he));
    }
    function H(M, ee) {
      const he = M.anyOf.map((fe) => oe(fe, ee));
      return $(e2.Type.Union(he));
    }
    function ie(M, ee) {
      const he = M.properties[ee];
      return i.IsUndefined(he) ? e2.Type.Never() : e2.Type.Union([he]);
    }
    function ne(M, ee) {
      const he = M.items;
      if (i.IsUndefined(he))
        return e2.Type.Never();
      const fe = he[ee];
      return i.IsUndefined(fe) ? e2.Type.Never() : fe;
    }
    function oe(M, ee) {
      return M[e2.Kind] === "Intersect" ? R(M, ee) : M[e2.Kind] === "Union" ? H(M, ee) : M[e2.Kind] === "Object" ? ie(M, ee) : M[e2.Kind] === "Tuple" ? ne(M, ee) : e2.Type.Never();
    }
    function je(M, ee, he = {}) {
      const fe = ee.map((we) => oe(M, we.toString()));
      return $(e2.Type.Union(fe, he));
    }
    N.Resolve = je;
  })(d || (e2.IndexedAccessor = d = {}));
  var p;
  (function(N) {
    function y(ne) {
      const [oe, je] = [ne.slice(0, 1), ne.slice(1)];
      return `${oe.toLowerCase()}${je}`;
    }
    function k(ne) {
      const [oe, je] = [ne.slice(0, 1), ne.slice(1)];
      return `${oe.toUpperCase()}${je}`;
    }
    function C(ne) {
      return ne.toUpperCase();
    }
    function g(ne) {
      return ne.toLowerCase();
    }
    function b(ne, oe) {
      const je = P.ParseExact(ne.pattern);
      if (!Y.Check(je))
        return { ...ne, pattern: $(ne.pattern, oe) };
      const he = [...z.Generate(je)].map((Ae) => e2.Type.Literal(Ae)), fe = R(he, oe), we = e2.Type.Union(fe);
      return e2.Type.TemplateLiteral([we]);
    }
    function $(ne, oe) {
      return typeof ne == "string" ? oe === "Uncapitalize" ? y(ne) : oe === "Capitalize" ? k(ne) : oe === "Uppercase" ? C(ne) : oe === "Lowercase" ? g(ne) : ne : ne.toString();
    }
    function R(ne, oe) {
      if (ne.length === 0)
        return [];
      const [je, ...M] = ne;
      return [ie(je, oe), ...R(M, oe)];
    }
    function H(ne, oe) {
      return o.TTemplateLiteral(ne) ? b(ne, oe) : o.TUnion(ne) ? e2.Type.Union(R(ne.anyOf, oe)) : o.TLiteral(ne) ? e2.Type.Literal($(ne.const, oe)) : ne;
    }
    function ie(ne, oe) {
      return H(ne, oe);
    }
    N.Map = ie;
  })(p || (e2.Intrinsic = p = {}));
  var h;
  (function(N) {
    function y($, R) {
      return e2.Type.Intersect($.allOf.map((H) => g(H, R)), { ...$ });
    }
    function k($, R) {
      return e2.Type.Union($.anyOf.map((H) => g(H, R)), { ...$ });
    }
    function C($, R) {
      return R($);
    }
    function g($, R) {
      return $[e2.Kind] === "Intersect" ? y($, R) : $[e2.Kind] === "Union" ? k($, R) : $[e2.Kind] === "Object" ? C($, R) : $;
    }
    function b($, R, H) {
      return { ...g(a.Type($), R), ...H };
    }
    N.Map = b;
  })(h || (e2.ObjectMap = h = {}));
  var v;
  (function(N) {
    function y(ie) {
      return ie[0] === "^" && ie[ie.length - 1] === "$" ? ie.slice(1, ie.length - 1) : ie;
    }
    function k(ie, ne) {
      return ie.allOf.reduce((oe, je) => [...oe, ...$(je, ne)], []);
    }
    function C(ie, ne) {
      const oe = ie.anyOf.map((je) => $(je, ne));
      return [...oe.reduce((je, M) => M.map((ee) => oe.every((he) => he.includes(ee)) ? je.add(ee) : je)[0], /* @__PURE__ */ new Set())];
    }
    function g(ie, ne) {
      return Object.getOwnPropertyNames(ie.properties);
    }
    function b(ie, ne) {
      return ne.includePatterns ? Object.getOwnPropertyNames(ie.patternProperties) : [];
    }
    function $(ie, ne) {
      return o.TIntersect(ie) ? k(ie, ne) : o.TUnion(ie) ? C(ie, ne) : o.TObject(ie) ? g(ie) : o.TRecord(ie) ? b(ie, ne) : [];
    }
    function R(ie, ne) {
      return [...new Set($(ie, ne))];
    }
    N.ResolveKeys = R;
    function H(ie) {
      return `^(${R(ie, { includePatterns: true }).map((je) => `(${y(je)})`).join("|")})$`;
    }
    N.ResolvePattern = H;
  })(v || (e2.KeyResolver = v = {}));
  class T extends n {
  }
  e2.KeyArrayResolverError = T;
  var _;
  (function(N) {
    function y(k) {
      return Array.isArray(k) ? k : o.TUnionLiteral(k) ? k.anyOf.map((C) => C.const.toString()) : o.TLiteral(k) ? [k.const] : o.TTemplateLiteral(k) ? (() => {
        const C = P.ParseExact(k.pattern);
        if (!Y.Check(C))
          throw new T("Cannot resolve keys from infinite template expression");
        return [...z.Generate(C)];
      })() : [];
    }
    N.Resolve = y;
  })(_ || (e2.KeyArrayResolver = _ = {}));
  var E;
  (function(N) {
    function* y(C) {
      for (const g of C.anyOf)
        g[e2.Kind] === "Union" ? yield* y(g) : yield g;
    }
    function k(C) {
      return e2.Type.Union([...y(C)], { ...C });
    }
    N.Resolve = k;
  })(E || (e2.UnionResolver = E = {}));
  class j extends n {
  }
  e2.TemplateLiteralPatternError = j;
  var F;
  (function(N) {
    function y(b) {
      throw new j(b);
    }
    function k(b) {
      return b.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    function C(b, $) {
      return o.TTemplateLiteral(b) ? b.pattern.slice(1, b.pattern.length - 1) : o.TUnion(b) ? `(${b.anyOf.map((R) => C(R, $)).join("|")})` : o.TNumber(b) ? `${$}${e2.PatternNumber}` : o.TInteger(b) ? `${$}${e2.PatternNumber}` : o.TBigInt(b) ? `${$}${e2.PatternNumber}` : o.TString(b) ? `${$}${e2.PatternString}` : o.TLiteral(b) ? `${$}${k(b.const.toString())}` : o.TBoolean(b) ? `${$}${e2.PatternBoolean}` : y(`Unexpected Kind '${b[e2.Kind]}'`);
    }
    function g(b) {
      return `^${b.map(($) => C($, "")).join("")}$`;
    }
    N.Create = g;
  })(F || (e2.TemplateLiteralPattern = F = {}));
  var B;
  (function(N) {
    function y(k) {
      const C = P.ParseExact(k.pattern);
      if (!Y.Check(C))
        return e2.Type.String();
      const g = [...z.Generate(C)].map((b) => e2.Type.Literal(b));
      return e2.Type.Union(g);
    }
    N.Resolve = y;
  })(B || (e2.TemplateLiteralResolver = B = {}));
  class L extends n {
  }
  e2.TemplateLiteralParserError = L;
  var P;
  (function(N) {
    function y(M, ee, he) {
      return M[ee] === he && M.charCodeAt(ee - 1) !== 92;
    }
    function k(M, ee) {
      return y(M, ee, "(");
    }
    function C(M, ee) {
      return y(M, ee, ")");
    }
    function g(M, ee) {
      return y(M, ee, "|");
    }
    function b(M) {
      if (!(k(M, 0) && C(M, M.length - 1)))
        return false;
      let ee = 0;
      for (let he = 0; he < M.length; he++)
        if (k(M, he) && (ee += 1), C(M, he) && (ee -= 1), ee === 0 && he !== M.length - 1)
          return false;
      return true;
    }
    function $(M) {
      return M.slice(1, M.length - 1);
    }
    function R(M) {
      let ee = 0;
      for (let he = 0; he < M.length; he++)
        if (k(M, he) && (ee += 1), C(M, he) && (ee -= 1), g(M, he) && ee === 0)
          return true;
      return false;
    }
    function H(M) {
      for (let ee = 0; ee < M.length; ee++)
        if (k(M, ee))
          return true;
      return false;
    }
    function ie(M) {
      let [ee, he] = [0, 0];
      const fe = [];
      for (let Ae = 0; Ae < M.length; Ae++)
        if (k(M, Ae) && (ee += 1), C(M, Ae) && (ee -= 1), g(M, Ae) && ee === 0) {
          const Ve = M.slice(he, Ae);
          Ve.length > 0 && fe.push(oe(Ve)), he = Ae + 1;
        }
      const we = M.slice(he);
      return we.length > 0 && fe.push(oe(we)), fe.length === 0 ? { type: "const", const: "" } : fe.length === 1 ? fe[0] : { type: "or", expr: fe };
    }
    function ne(M) {
      function ee(we, Ae) {
        if (!k(we, Ae))
          throw new L("TemplateLiteralParser: Index must point to open parens");
        let Ve = 0;
        for (let lt = Ae; lt < we.length; lt++)
          if (k(we, lt) && (Ve += 1), C(we, lt) && (Ve -= 1), Ve === 0)
            return [Ae, lt];
        throw new L("TemplateLiteralParser: Unclosed group parens in expression");
      }
      function he(we, Ae) {
        for (let Ve = Ae; Ve < we.length; Ve++)
          if (k(we, Ve))
            return [Ae, Ve];
        return [Ae, we.length];
      }
      const fe = [];
      for (let we = 0; we < M.length; we++)
        if (k(M, we)) {
          const [Ae, Ve] = ee(M, we), lt = M.slice(Ae, Ve + 1);
          fe.push(oe(lt)), we = Ve;
        } else {
          const [Ae, Ve] = he(M, we), lt = M.slice(Ae, Ve);
          lt.length > 0 && fe.push(oe(lt)), we = Ve - 1;
        }
      return fe.length === 0 ? { type: "const", const: "" } : fe.length === 1 ? fe[0] : { type: "and", expr: fe };
    }
    function oe(M) {
      return b(M) ? oe($(M)) : R(M) ? ie(M) : H(M) ? ne(M) : { type: "const", const: M };
    }
    N.Parse = oe;
    function je(M) {
      return oe(M.slice(1, M.length - 1));
    }
    N.ParseExact = je;
  })(P || (e2.TemplateLiteralParser = P = {}));
  class Z extends n {
  }
  e2.TemplateLiteralFiniteError = Z;
  var Y;
  (function(N) {
    function y($) {
      throw new Z($);
    }
    function k($) {
      return $.type === "or" && $.expr.length === 2 && $.expr[0].type === "const" && $.expr[0].const === "0" && $.expr[1].type === "const" && $.expr[1].const === "[1-9][0-9]*";
    }
    function C($) {
      return $.type === "or" && $.expr.length === 2 && $.expr[0].type === "const" && $.expr[0].const === "true" && $.expr[1].type === "const" && $.expr[1].const === "false";
    }
    function g($) {
      return $.type === "const" && $.const === ".*";
    }
    function b($) {
      return C($) ? true : k($) || g($) ? false : $.type === "and" ? $.expr.every((R) => b(R)) : $.type === "or" ? $.expr.every((R) => b(R)) : $.type === "const" ? true : y("Unknown expression type");
    }
    N.Check = b;
  })(Y || (e2.TemplateLiteralFinite = Y = {}));
  class te extends n {
  }
  e2.TemplateLiteralGeneratorError = te;
  var z;
  (function(N) {
    function* y($) {
      if ($.length === 1)
        return yield* $[0];
      for (const R of $[0])
        for (const H of y($.slice(1)))
          yield `${R}${H}`;
    }
    function* k($) {
      return yield* y($.expr.map((R) => [...b(R)]));
    }
    function* C($) {
      for (const R of $.expr)
        yield* b(R);
    }
    function* g($) {
      return yield $.const;
    }
    function* b($) {
      return $.type === "and" ? yield* k($) : $.type === "or" ? yield* C($) : $.type === "const" ? yield* g($) : (() => {
        throw new te("Unknown expression");
      })();
    }
    N.Generate = b;
  })(z || (e2.TemplateLiteralGenerator = z = {}));
  var Q;
  (function(N) {
    function* y(b) {
      const $ = b.trim().replace(/"|'/g, "");
      return $ === "boolean" ? yield e2.Type.Boolean() : $ === "number" ? yield e2.Type.Number() : $ === "bigint" ? yield e2.Type.BigInt() : $ === "string" ? yield e2.Type.String() : yield (() => {
        const R = $.split("|").map((H) => e2.Type.Literal(H.trim()));
        return R.length === 0 ? e2.Type.Never() : R.length === 1 ? R[0] : e2.Type.Union(R);
      })();
    }
    function* k(b) {
      if (b[1] !== "{") {
        const $ = e2.Type.Literal("$"), R = C(b.slice(1));
        return yield* [$, ...R];
      }
      for (let $ = 2; $ < b.length; $++)
        if (b[$] === "}") {
          const R = y(b.slice(2, $)), H = C(b.slice($ + 1));
          return yield* [...R, ...H];
        }
      yield e2.Type.Literal(b);
    }
    function* C(b) {
      for (let $ = 0; $ < b.length; $++)
        if (b[$] === "$") {
          const R = e2.Type.Literal(b.slice(0, $)), H = k(b.slice($));
          return yield* [R, ...H];
        }
      yield e2.Type.Literal(b);
    }
    function g(b) {
      return [...C(b)];
    }
    N.Parse = g;
  })(Q || (e2.TemplateLiteralDslParser = Q = {}));
  class X {
    constructor(y) {
      this.schema = y;
    }
    Decode(y) {
      return new re(this.schema, y);
    }
  }
  e2.TransformDecodeBuilder = X;
  class re {
    constructor(y, k) {
      this.schema = y, this.decode = k;
    }
    Encode(y) {
      const k = a.Type(this.schema);
      return o.TTransform(k) ? (() => {
        const b = { Encode: ($) => k[e2.Transform].Encode(y($)), Decode: ($) => this.decode(k[e2.Transform].Decode($)) };
        return { ...k, [e2.Transform]: b };
      })() : (() => {
        const C = { Decode: this.decode, Encode: y };
        return { ...k, [e2.Transform]: C };
      })();
    }
  }
  e2.TransformEncodeBuilder = re;
  let Pe = 0;
  class Me extends n {
  }
  e2.TypeBuilderError = Me;
  class dt {
    /** `[Internal]` Creates a schema without `static` and `params` types */
    Create(y) {
      return y;
    }
    /** `[Internal]` Throws a TypeBuilder error with the given message */
    Throw(y) {
      throw new Me(y);
    }
    /** `[Internal]` Discards property keys from the given record type */
    Discard(y, k) {
      return k.reduce((C, g) => {
        const { [g]: b, ...$ } = C;
        return $;
      }, y);
    }
    /** `[Json]` Omits compositing symbols from this schema */
    Strict(y) {
      return JSON.parse(JSON.stringify(y));
    }
  }
  e2.TypeBuilder = dt;
  class tt extends dt {
    // ------------------------------------------------------------------------
    // Modifiers
    // ------------------------------------------------------------------------
    /** `[Json]` Creates a Readonly and Optional property */
    ReadonlyOptional(y) {
      return this.Readonly(this.Optional(y));
    }
    /** `[Json]` Creates a Readonly property */
    Readonly(y) {
      return { ...a.Type(y), [e2.Readonly]: "Readonly" };
    }
    /** `[Json]` Creates an Optional property */
    Optional(y) {
      return { ...a.Type(y), [e2.Optional]: "Optional" };
    }
    // ------------------------------------------------------------------------
    // Types
    // ------------------------------------------------------------------------
    /** `[Json]` Creates an Any type */
    Any(y = {}) {
      return this.Create({ ...y, [e2.Kind]: "Any" });
    }
    /** `[Json]` Creates an Array type */
    Array(y, k = {}) {
      return this.Create({ ...k, [e2.Kind]: "Array", type: "array", items: a.Type(y) });
    }
    /** `[Json]` Creates a Boolean type */
    Boolean(y = {}) {
      return this.Create({ ...y, [e2.Kind]: "Boolean", type: "boolean" });
    }
    /** `[Json]` Intrinsic function to Capitalize LiteralString types */
    Capitalize(y, k = {}) {
      return { ...p.Map(a.Type(y), "Capitalize"), ...k };
    }
    /** `[Json]` Creates a Composite object type */
    Composite(y, k) {
      const C = e2.Type.Intersect(y, {}), b = v.ResolveKeys(C, { includePatterns: false }).reduce(($, R) => ({ ...$, [R]: e2.Type.Index(C, [R]) }), {});
      return e2.Type.Object(b, k);
    }
    /** `[Json]` Creates a Enum type */
    Enum(y, k = {}) {
      if (i.IsUndefined(y))
        return this.Throw("Enum undefined or empty");
      const C = Object.getOwnPropertyNames(y).filter(($) => isNaN($)).map(($) => y[$]), b = [...new Set(C)].map(($) => e2.Type.Literal($));
      return this.Union(b, { ...k, [e2.Hint]: "Enum" });
    }
    /** `[Json]` Creates a Conditional type */
    Extends(y, k, C, g, b = {}) {
      switch (m.Extends(y, k)) {
        case c.Union:
          return this.Union([a.Type(C, b), a.Type(g, b)]);
        case c.True:
          return a.Type(C, b);
        case c.False:
          return a.Type(g, b);
      }
    }
    /** `[Json]` Constructs a type by excluding from unionType all union members that are assignable to excludedMembers */
    Exclude(y, k, C = {}) {
      return o.TTemplateLiteral(y) ? this.Exclude(B.Resolve(y), k, C) : o.TTemplateLiteral(k) ? this.Exclude(y, B.Resolve(k), C) : o.TUnion(y) ? (() => {
        const g = y.anyOf.filter((b) => m.Extends(b, k) === c.False);
        return g.length === 1 ? a.Type(g[0], C) : this.Union(g, C);
      })() : m.Extends(y, k) !== c.False ? this.Never(C) : a.Type(y, C);
    }
    /** `[Json]` Constructs a type by extracting from type all union members that are assignable to union */
    Extract(y, k, C = {}) {
      return o.TTemplateLiteral(y) ? this.Extract(B.Resolve(y), k, C) : o.TTemplateLiteral(k) ? this.Extract(y, B.Resolve(k), C) : o.TUnion(y) ? (() => {
        const g = y.anyOf.filter((b) => m.Extends(b, k) !== c.False);
        return g.length === 1 ? a.Type(g[0], C) : this.Union(g, C);
      })() : m.Extends(y, k) !== c.False ? a.Type(y, C) : this.Never(C);
    }
    /** `[Json]` Returns an Indexed property type for the given keys */
    Index(y, k, C = {}) {
      return o.TArray(y) && o.TNumber(k) ? a.Type(y.items, C) : o.TTuple(y) && o.TNumber(k) ? (() => {
        const b = (i.IsUndefined(y.items) ? [] : y.items).map(($) => a.Type($));
        return this.Union(b, C);
      })() : (() => {
        const g = _.Resolve(k), b = a.Type(y);
        return d.Resolve(b, g, C);
      })();
    }
    /** `[Json]` Creates an Integer type */
    Integer(y = {}) {
      return this.Create({ ...y, [e2.Kind]: "Integer", type: "integer" });
    }
    /** `[Json]` Creates an Intersect type */
    Intersect(y, k = {}) {
      if (y.length === 0)
        return e2.Type.Never();
      if (y.length === 1)
        return a.Type(y[0], k);
      y.some(($) => o.TTransform($)) && this.Throw("Cannot intersect transform types");
      const C = y.every(($) => o.TObject($)), g = a.Rest(y), b = o.TSchema(k.unevaluatedProperties) ? { unevaluatedProperties: a.Type(k.unevaluatedProperties) } : {};
      return k.unevaluatedProperties === false || o.TSchema(k.unevaluatedProperties) || C ? this.Create({ ...k, ...b, [e2.Kind]: "Intersect", type: "object", allOf: g }) : this.Create({ ...k, ...b, [e2.Kind]: "Intersect", allOf: g });
    }
    /** `[Json]` Creates a KeyOf type */
    KeyOf(y, k = {}) {
      return o.TRecord(y) ? (() => {
        const C = Object.getOwnPropertyNames(y.patternProperties)[0];
        return C === e2.PatternNumberExact ? this.Number(k) : C === e2.PatternStringExact ? this.String(k) : this.Throw("Unable to resolve key type from Record key pattern");
      })() : o.TTuple(y) ? (() => {
        const g = (i.IsUndefined(y.items) ? [] : y.items).map((b, $) => e2.Type.Literal($.toString()));
        return this.Union(g, k);
      })() : o.TArray(y) ? this.Number(k) : (() => {
        const C = v.ResolveKeys(y, { includePatterns: false });
        if (C.length === 0)
          return this.Never(k);
        const g = C.map((b) => this.Literal(b));
        return this.Union(g, k);
      })();
    }
    /** `[Json]` Creates a Literal type */
    Literal(y, k = {}) {
      return this.Create({ ...k, [e2.Kind]: "Literal", const: y, type: typeof y });
    }
    /** `[Json]` Intrinsic function to Lowercase LiteralString types */
    Lowercase(y, k = {}) {
      return { ...p.Map(a.Type(y), "Lowercase"), ...k };
    }
    /** `[Json]` Creates a Never type */
    Never(y = {}) {
      return this.Create({ ...y, [e2.Kind]: "Never", not: {} });
    }
    /** `[Json]` Creates a Not type */
    Not(y, k) {
      return this.Create({ ...k, [e2.Kind]: "Not", not: a.Type(y) });
    }
    /** `[Json]` Creates a Null type */
    Null(y = {}) {
      return this.Create({ ...y, [e2.Kind]: "Null", type: "null" });
    }
    /** `[Json]` Creates a Number type */
    Number(y = {}) {
      return this.Create({ ...y, [e2.Kind]: "Number", type: "number" });
    }
    /** `[Json]` Creates an Object type */
    Object(y, k = {}) {
      const C = Object.getOwnPropertyNames(y), g = C.filter((H) => o.TOptional(y[H])), b = C.filter((H) => !g.includes(H)), $ = o.TSchema(k.additionalProperties) ? { additionalProperties: a.Type(k.additionalProperties) } : {}, R = C.reduce((H, ie) => ({ ...H, [ie]: a.Type(y[ie]) }), {});
      return b.length > 0 ? this.Create({ ...k, ...$, [e2.Kind]: "Object", type: "object", properties: R, required: b }) : this.Create({ ...k, ...$, [e2.Kind]: "Object", type: "object", properties: R });
    }
    /** `[Json]` Constructs a type whose keys are omitted from the given type */
    Omit(y, k, C = {}) {
      const g = _.Resolve(k);
      return h.Map(this.Discard(a.Type(y), ["$id", e2.Transform]), (b) => {
        i.IsArray(b.required) && (b.required = b.required.filter(($) => !g.includes($)), b.required.length === 0 && delete b.required);
        for (const $ of Object.getOwnPropertyNames(b.properties))
          g.includes($) && delete b.properties[$];
        return this.Create(b);
      }, C);
    }
    /** `[Json]` Constructs a type where all properties are optional */
    Partial(y, k = {}) {
      return h.Map(this.Discard(a.Type(y), ["$id", e2.Transform]), (C) => {
        const g = Object.getOwnPropertyNames(C.properties).reduce((b, $) => ({ ...b, [$]: this.Optional(C.properties[$]) }), {});
        return this.Object(
          g,
          this.Discard(C, ["required"])
          /* object used as options to retain other constraints */
        );
      }, k);
    }
    /** `[Json]` Constructs a type whose keys are picked from the given type */
    Pick(y, k, C = {}) {
      const g = _.Resolve(k);
      return h.Map(this.Discard(a.Type(y), ["$id", e2.Transform]), (b) => {
        i.IsArray(b.required) && (b.required = b.required.filter(($) => g.includes($)), b.required.length === 0 && delete b.required);
        for (const $ of Object.getOwnPropertyNames(b.properties))
          g.includes($) || delete b.properties[$];
        return this.Create(b);
      }, C);
    }
    /** `[Json]` Creates a Record type */
    Record(y, k, C = {}) {
      return o.TTemplateLiteral(y) ? (() => {
        const g = P.ParseExact(y.pattern);
        return Y.Check(g) ? this.Object([...z.Generate(g)].reduce((b, $) => ({ ...b, [$]: a.Type(k) }), {}), C) : this.Create({ ...C, [e2.Kind]: "Record", type: "object", patternProperties: { [y.pattern]: a.Type(k) } });
      })() : o.TUnion(y) ? (() => {
        const g = E.Resolve(y);
        if (o.TUnionLiteral(g)) {
          const b = g.anyOf.reduce(($, R) => ({ ...$, [R.const]: a.Type(k) }), {});
          return this.Object(b, { ...C, [e2.Hint]: "Record" });
        } else
          this.Throw("Record key of type union contains non-literal types");
      })() : o.TLiteral(y) ? i.IsString(y.const) || i.IsNumber(y.const) ? this.Object({ [y.const]: a.Type(k) }, C) : this.Throw("Record key of type literal is not of type string or number") : o.TInteger(y) || o.TNumber(y) ? this.Create({ ...C, [e2.Kind]: "Record", type: "object", patternProperties: { [e2.PatternNumberExact]: a.Type(k) } }) : o.TString(y) ? (() => {
        const g = i.IsUndefined(y.pattern) ? e2.PatternStringExact : y.pattern;
        return this.Create({ ...C, [e2.Kind]: "Record", type: "object", patternProperties: { [g]: a.Type(k) } });
      })() : this.Never();
    }
    /** `[Json]` Creates a Recursive type */
    Recursive(y, k = {}) {
      i.IsUndefined(k.$id) && (k.$id = `T${Pe++}`);
      const C = y({ [e2.Kind]: "This", $ref: `${k.$id}` });
      return C.$id = k.$id, this.Create({ ...k, [e2.Hint]: "Recursive", ...C });
    }
    /** `[Json]` Creates a Ref type. */
    Ref(y, k = {}) {
      return i.IsString(y) ? this.Create({ ...k, [e2.Kind]: "Ref", $ref: y }) : (i.IsUndefined(y.$id) && this.Throw("Reference target type must specify an $id"), this.Create({ ...k, [e2.Kind]: "Ref", $ref: y.$id }));
    }
    /** `[Json]` Constructs a type where all properties are required */
    Required(y, k = {}) {
      return h.Map(this.Discard(a.Type(y), ["$id", e2.Transform]), (C) => {
        const g = Object.getOwnPropertyNames(C.properties).reduce((b, $) => ({ ...b, [$]: this.Discard(C.properties[$], [e2.Optional]) }), {});
        return this.Object(
          g,
          C
          /* object used as options to retain other constraints  */
        );
      }, k);
    }
    /** `[Json]` Extracts interior Rest elements from Tuple, Intersect and Union types */
    Rest(y) {
      return o.TTuple(y) && !i.IsUndefined(y.items) ? a.Rest(y.items) : o.TIntersect(y) ? a.Rest(y.allOf) : o.TUnion(y) ? a.Rest(y.anyOf) : [];
    }
    /** `[Json]` Creates a String type */
    String(y = {}) {
      return this.Create({ ...y, [e2.Kind]: "String", type: "string" });
    }
    /** `[Json]` Creates a TemplateLiteral type */
    TemplateLiteral(y, k = {}) {
      const C = i.IsString(y) ? F.Create(Q.Parse(y)) : F.Create(y);
      return this.Create({ ...k, [e2.Kind]: "TemplateLiteral", type: "string", pattern: C });
    }
    /** `[Json]` Creates a Transform type */
    Transform(y) {
      return new X(y);
    }
    /** `[Json]` Creates a Tuple type */
    Tuple(y, k = {}) {
      const [C, g, b] = [false, y.length, y.length], $ = a.Rest(y), R = y.length > 0 ? { ...k, [e2.Kind]: "Tuple", type: "array", items: $, additionalItems: C, minItems: g, maxItems: b } : { ...k, [e2.Kind]: "Tuple", type: "array", minItems: g, maxItems: b };
      return this.Create(R);
    }
    /** `[Json]` Intrinsic function to Uncapitalize LiteralString types */
    Uncapitalize(y, k = {}) {
      return { ...p.Map(a.Type(y), "Uncapitalize"), ...k };
    }
    /** `[Json]` Creates a Union type */
    Union(y, k = {}) {
      return o.TTemplateLiteral(y) ? B.Resolve(y) : (() => {
        const C = y;
        if (C.length === 0)
          return this.Never(k);
        if (C.length === 1)
          return this.Create(a.Type(C[0], k));
        const g = a.Rest(C);
        return this.Create({ ...k, [e2.Kind]: "Union", anyOf: g });
      })();
    }
    /** `[Json]` Creates an Unknown type */
    Unknown(y = {}) {
      return this.Create({ ...y, [e2.Kind]: "Unknown" });
    }
    /** `[Json]` Creates a Unsafe type that will infers as the generic argument T */
    Unsafe(y = {}) {
      return this.Create({ ...y, [e2.Kind]: y[e2.Kind] || "Unsafe" });
    }
    /** `[Json]` Intrinsic function to Uppercase LiteralString types */
    Uppercase(y, k = {}) {
      return { ...p.Map(a.Type(y), "Uppercase"), ...k };
    }
  }
  e2.JsonTypeBuilder = tt;
  class pt extends tt {
    /** `[JavaScript]` Creates a AsyncIterator type */
    AsyncIterator(y, k = {}) {
      return this.Create({ ...k, [e2.Kind]: "AsyncIterator", type: "AsyncIterator", items: a.Type(y) });
    }
    /** `[JavaScript]` Constructs a type by recursively unwrapping Promise types */
    Awaited(y, k = {}) {
      const C = (g) => g.length > 0 ? (() => {
        const [b, ...$] = g;
        return [this.Awaited(b), ...C($)];
      })() : g;
      return o.TIntersect(y) ? e2.Type.Intersect(C(y.allOf)) : o.TUnion(y) ? e2.Type.Union(C(y.anyOf)) : o.TPromise(y) ? this.Awaited(y.item) : a.Type(y, k);
    }
    /** `[JavaScript]` Creates a BigInt type */
    BigInt(y = {}) {
      return this.Create({ ...y, [e2.Kind]: "BigInt", type: "bigint" });
    }
    /** `[JavaScript]` Extracts the ConstructorParameters from the given Constructor type */
    ConstructorParameters(y, k = {}) {
      return this.Tuple([...y.parameters], { ...k });
    }
    /** `[JavaScript]` Creates a Constructor type */
    Constructor(y, k, C) {
      const [g, b] = [a.Rest(y), a.Type(k)];
      return this.Create({ ...C, [e2.Kind]: "Constructor", type: "Constructor", parameters: g, returns: b });
    }
    /** `[JavaScript]` Creates a Date type */
    Date(y = {}) {
      return this.Create({ ...y, [e2.Kind]: "Date", type: "Date" });
    }
    /** `[JavaScript]` Creates a Function type */
    Function(y, k, C) {
      const [g, b] = [a.Rest(y), a.Type(k)];
      return this.Create({ ...C, [e2.Kind]: "Function", type: "Function", parameters: g, returns: b });
    }
    /** `[JavaScript]` Extracts the InstanceType from the given Constructor type */
    InstanceType(y, k = {}) {
      return a.Type(y.returns, k);
    }
    /** `[JavaScript]` Creates an Iterator type */
    Iterator(y, k = {}) {
      return this.Create({ ...k, [e2.Kind]: "Iterator", type: "Iterator", items: a.Type(y) });
    }
    /** `[JavaScript]` Extracts the Parameters from the given Function type */
    Parameters(y, k = {}) {
      return this.Tuple(y.parameters, { ...k });
    }
    /** `[JavaScript]` Creates a Promise type */
    Promise(y, k = {}) {
      return this.Create({ ...k, [e2.Kind]: "Promise", type: "Promise", item: a.Type(y) });
    }
    /** `[Extended]` Creates a String type */
    RegExp(y, k = {}) {
      const C = i.IsString(y) ? y : y.source;
      return this.Create({ ...k, [e2.Kind]: "String", type: "string", pattern: C });
    }
    /**
     * @deprecated Use `Type.RegExp`
     */
    RegEx(y, k = {}) {
      return this.RegExp(y, k);
    }
    /** `[JavaScript]` Extracts the ReturnType from the given Function type */
    ReturnType(y, k = {}) {
      return a.Type(y.returns, k);
    }
    /** `[JavaScript]` Creates a Symbol type */
    Symbol(y) {
      return this.Create({ ...y, [e2.Kind]: "Symbol", type: "symbol" });
    }
    /** `[JavaScript]` Creates a Undefined type */
    Undefined(y = {}) {
      return this.Create({ ...y, [e2.Kind]: "Undefined", type: "undefined" });
    }
    /** `[JavaScript]` Creates a Uint8Array type */
    Uint8Array(y = {}) {
      return this.Create({ ...y, [e2.Kind]: "Uint8Array", type: "Uint8Array" });
    }
    /** `[JavaScript]` Creates a Void type */
    Void(y = {}) {
      return this.Create({ ...y, [e2.Kind]: "Void", type: "void" });
    }
  }
  e2.JavaScriptTypeBuilder = pt, e2.JsonType = new tt(), e2.Type = new pt();
})(f);
const gh = f.Type.Object({
  prefix: f.Type.Optional(f.Type.String()),
  suffix: f.Type.Optional(f.Type.String()),
  volume: f.Type.Optional(f.Type.Number())
}), jl = f.Type.Object({
  soundOnNewLine: f.Type.Optional(f.Type.String()),
  soundPerLetter: f.Type.Optional(gh)
}), vh = f.Type.Object({
  defaultAudio: f.Type.Optional(jl),
  characterAudio: f.Type.Optional(
    f.Type.Record(f.Type.String(), jl)
  )
}), _h = f.Type.Object({
  src: f.Type.String(),
  path: f.Type.Optional(f.Type.String()),
  volume: f.Type.Optional(f.Type.Number()),
  rate: f.Type.Optional(f.Type.Number()),
  html5: f.Type.Optional(f.Type.Boolean()),
  fadeInTime: f.Type.Optional(f.Type.Number()),
  fadeInDelay: f.Type.Optional(f.Type.Number()),
  fadeOutTime: f.Type.Optional(f.Type.Number()),
  loop: f.Type.Optional(f.Type.Boolean())
}), bh = f.Type.Record(
  f.Type.String(),
  _h
), Th = f.Type.Object({
  volume: f.Type.Optional(f.Type.Number()),
  defaultMusic: f.Type.Optional(f.Type.String()),
  musicFadeInTime: f.Type.Optional(f.Type.Number()),
  musicFadeOutTime: f.Type.Optional(f.Type.Number()),
  musicFadeInDelay: f.Type.Optional(f.Type.Number())
}), Sh = f.Type.Record(f.Type.String(), f.Type.String()), pu = f.Type.Object({
  files: bh,
  audioTriggers: Sh,
  options: Th,
  dialogAudio: f.Type.Optional(vh)
}), mu = {
  files: {},
  audioTriggers: {},
  options: {
    volume: 1,
    musicFadeInTime: 0.5,
    musicFadeInDelay: 0.5,
    musicFadeOutTime: 0.5
  }
}, hu = f.Type.Object({
  backgrounds: f.Type.Object({
    width: f.Type.Number(),
    height: f.Type.Number()
  }),
  dialogBottomPadding: f.Type.Union([f.Type.Number(), f.Type.String()]),
  minTextWidth: f.Type.Optional(f.Type.Number()),
  verticalLayoutThreshold: f.Type.Number(),
  defaultFontSize: f.Type.Optional(f.Type.Number()),
  portraits: f.Type.Object({
    width: f.Type.Number(),
    height: f.Type.Number(),
    offset: f.Type.Optional(
      f.Type.Object({
        landscape: f.Type.Optional(
          f.Type.Object({
            right: f.Type.Number(),
            bottom: f.Type.Number()
          })
        ),
        portrait: f.Type.Optional(
          f.Type.Object({
            right: f.Type.Number(),
            bottom: f.Type.Number()
          })
        )
      })
    )
  })
}), wh = {
  backgrounds: {
    width: 880,
    height: 720
  },
  dialogBottomPadding: 70,
  verticalLayoutThreshold: 600,
  defaultFontSize: 16,
  portraits: {
    width: 100,
    height: 100
  }
}, Ho = f.Type.Object({
  name: f.Type.String(),
  description: f.Type.Optional(f.Type.String())
}), $h = f.Type.Intersect([
  Ho,
  f.Type.Object({
    type: f.Type.Literal("number"),
    defaultValue: f.Type.Number(),
    step: f.Type.Number(),
    minValue: f.Type.Number(),
    maxValue: f.Type.Number()
  })
]), Ch = f.Type.Intersect([
  Ho,
  f.Type.Object({
    type: f.Type.Literal("integer"),
    defaultValue: f.Type.Number(),
    step: f.Type.Number(),
    minValue: f.Type.Number(),
    maxValue: f.Type.Number()
  })
]), kh = f.Type.Intersect([
  Ho,
  f.Type.Object({
    type: f.Type.Literal("boolean"),
    defaultValue: f.Type.Boolean()
  })
]), Oh = f.Type.Intersect([
  Ho,
  f.Type.Object({
    type: f.Type.Literal("string"),
    defaultValue: f.Type.String()
  })
]), Ah = f.Type.Union([
  $h,
  Ch,
  kh,
  Oh
]);
function Eh(e2) {
  return e2.type === "number";
}
function Ll(e2) {
  return e2.type === "integer";
}
function Ih(e2) {
  return e2.type === "boolean";
}
function Ph(e2) {
  return e2.type === "string";
}
const yu = f.Type.Object({
  customSettings: f.Type.Optional(
    f.Type.Record(f.Type.String(), Ah)
  )
});
var tr = /* @__PURE__ */ ((e2) => (e2[e2.ERROR = 3] = "ERROR", e2[e2.WARN = 2] = "WARN", e2[e2.INFO = 1] = "INFO", e2[e2.DEBUG = 0] = "DEBUG", e2[e2.NONE = -1] = "NONE", e2))(tr || {});
const So = "###_--_~=:;_JUMP", ca = "###_--_~=:;_RETURN", Nh = "###_--_~=:;_OK", wo = "###_--_~=:;_STOP";
function xh(e2) {
  return e2 === So || e2 === ca || e2 === Nh || e2 === wo;
}
const jh = "3.10.2", Lh = /* @__PURE__ */ new Date("2024-04-13T13:57:26.302Z"), Dl = {
  branch: "main",
  commit: "932fb2004033af0a249d7dc66a74e487d684e7aa"
}, Dh = tr.WARN, Rh = 400, $o = 20, Ko = "@empty", Rl = {
  background: Ko
}, Mh = f.Type.Optional(
  f.Type.Object({
    debugMenu: f.Type.Optional(f.Type.String()),
    jumpMenu: f.Type.Optional(f.Type.String())
  })
), gu = f.Type.Optional(
  f.Type.Object({
    animateText: f.Type.Optional(f.Type.Boolean()),
    textSpeed: f.Type.Optional(f.Type.Number()),
    timeBetweenLines: f.Type.Optional(f.Type.Number()),
    overlayMode: f.Type.Optional(f.Type.Boolean()),
    rightOffset: f.Type.Optional(f.Type.Number()),
    bottomOffset: f.Type.Optional(f.Type.Number()),
    width: f.Type.Optional(f.Type.Number()),
    height: f.Type.Optional(f.Type.Number()),
    hideDuringTransition: f.Type.Optional(f.Type.Boolean()),
    showAfterScriptEnd: f.Type.Optional(f.Type.Boolean())
  })
), vu = f.Type.Object({
  engineSplashScreen: f.Type.Optional(
    f.Type.Object({
      skip: f.Type.Optional(f.Type.Boolean()),
      fadeDuration: f.Type.Optional(f.Type.Number()),
      timeBeforeFadeout: f.Type.Optional(f.Type.Number()),
      overrideText: f.Type.Optional(f.Type.String()),
      overrideLogo: f.Type.Optional(f.Type.String())
    })
  ),
  gameSplashScreen: f.Type.Optional(
    f.Type.Object({
      startButtonText: f.Type.Optional(f.Type.String())
    })
  )
}), _u = f.Type.Object({
  timeOnScreen: f.Type.Number(),
  alsoPrintInDialogue: f.Type.Optional(f.Type.Boolean())
}), Fh = f.Type.Object({
  name: f.Type.String(),
  icon: f.Type.String(),
  startingValue: f.Type.Number(),
  maxValue: f.Type.Optional(f.Type.Number()),
  minValue: f.Type.Optional(f.Type.Number()),
  decimals: f.Type.Optional(f.Type.Number()),
  prefix: f.Type.Optional(f.Type.String()),
  suffix: f.Type.Optional(f.Type.String()),
  hideName: f.Type.Optional(f.Type.Boolean()),
  // Formatting options, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options
  formatting: f.Type.Optional(
    f.Type.Object({
      style: f.Type.Union([
        f.Type.Literal("decimal"),
        f.Type.Literal("currency"),
        f.Type.Literal("percent"),
        f.Type.Literal("unit")
      ]),
      currency: f.Type.Optional(f.Type.String()),
      unit: f.Type.Optional(f.Type.String())
    })
  )
}), bu = f.Type.Record(
  f.Type.String(),
  Fh
), Tu = f.Type.Record(
  f.Type.String(),
  f.Type.Object({
    onlyInteractOutsideOfScripts: f.Type.Optional(f.Type.Boolean())
  })
), Uh = f.Type.Object({
  delay: f.Type.Optional(f.Type.Number()),
  duration: f.Type.Optional(f.Type.Number())
}), Su = f.Type.Record(
  f.Type.String(),
  Uh
), Bh = f.Type.Object({
  text: f.Type.String(),
  cssClass: f.Type.Optional(f.Type.String())
}), wu = f.Type.Record(
  f.Type.String(),
  Bh
), $u = f.Type.Object({
  showScriptFinishedMessage: f.Type.Optional(f.Type.Boolean())
}), Cu = f.Type.Object({
  mode: f.Type.String(),
  slots: f.Type.Number(),
  runOnReload: f.Type.Optional(f.Type.String()),
  disabled: f.Type.Optional(f.Type.Boolean())
}), ku = f.Type.Array(f.Type.String()), qh = [], Ou = f.Type.Object({
  baseAssetsPath: f.Type.Optional(f.Type.String()),
  baseDataPath: f.Type.Optional(f.Type.String()),
  gameTitle: f.Type.String(),
  saveFileName: f.Type.String(),
  images: f.Type.Optional(f.Type.Record(f.Type.String(), f.Type.String())),
  layout: hu,
  settings: f.Type.Optional(yu),
  gameFlow: f.Type.Optional(
    f.Type.Object({
      labelToJumpOnScriptEnd: f.Type.Optional(f.Type.String())
    })
  ),
  dialogPanel: f.Type.Optional(gu),
  splashScreens: f.Type.Optional(vu),
  notifications: f.Type.Optional(_u),
  hudStats: bu,
  interactionTags: f.Type.Optional(Tu),
  transitions: f.Type.Optional(Su),
  menuButtons: f.Type.Optional(wu),
  debugging: f.Type.Optional($u),
  saves: f.Type.Optional(Cu),
  hotkeys: Mh
}), ua = {
  baseAssetsPath: "",
  baseDataPath: "",
  gameTitle: "Narrat Game",
  saveFileName: "narrat save",
  images: {},
  layout: wh,
  settings: {},
  gameFlow: {},
  dialogPanel: {
    overlayMode: true,
    rightOffset: 100,
    bottomOffset: 50,
    width: 475,
    height: 680,
    textSpeed: $o,
    animateText: true,
    timeBetweenLines: 100,
    hideDuringTransition: false,
    showAfterScriptEnd: false
  },
  splashScreens: {},
  notifications: {
    timeOnScreen: 2.5,
    alsoPrintInDialogue: false
  },
  hudStats: {},
  interactionTags: {
    default: {
      onlyInteractOutsideOfScripts: true
    }
  },
  transitions: {},
  menuButtons: {},
  debugging: {
    showScriptFinishedMessage: false
  },
  saves: {
    mode: "manual",
    slots: 10
  },
  hotkeys: {}
}, Vh = f.Type.Object({
  name: f.Type.String(),
  description: f.Type.String(),
  icon: f.Type.String(),
  onUse: f.Type.Optional(
    f.Type.Object({
      action: f.Type.String(),
      label: f.Type.String()
    })
  ),
  tag: f.Type.Optional(f.Type.String()),
  category: f.Type.Optional(f.Type.String()),
  showIfEmpty: f.Type.Optional(f.Type.Boolean())
}), Au = f.Type.Object({
  id: f.Type.String(),
  title: f.Type.String()
}), Eu = f.Type.Record(f.Type.String(), Vh);
f.Type.Object({
  categories: f.Type.Array(Au),
  items: Eu
});
const Iu = f.Type.Object({
  categories: f.Type.Optional(f.Type.Array(Au)),
  items: f.Type.Optional(Eu)
}), Pu = {
  categories: [
    {
      id: "default",
      title: "Items"
    }
  ],
  items: {}
}, Hh = f.Type.Object({
  description: f.Type.String(),
  succeededDescription: f.Type.Optional(f.Type.String()),
  failedDescription: f.Type.Optional(f.Type.String()),
  hidden: f.Type.Optional(f.Type.Boolean())
}), Kh = f.Type.Object({
  title: f.Type.String(),
  description: f.Type.String(),
  succeededDescription: f.Type.Optional(f.Type.String()),
  failedDescription: f.Type.Optional(f.Type.String()),
  endings: f.Type.Optional(f.Type.Record(f.Type.String(), f.Type.Object({
    success: f.Type.Boolean(),
    description: f.Type.String()
  }))),
  objectives: f.Type.Record(f.Type.String(), Hh),
  category: f.Type.Optional(f.Type.String())
}), Gh = f.Type.Object({
  id: f.Type.String(),
  title: f.Type.String()
}), Wh = f.Type.Record(f.Type.String(), Kh), Nu = f.Type.Object({
  quests: Wh,
  categories: f.Type.Array(Gh)
}), xu = {
  quests: {},
  categories: [
    {
      id: "default",
      title: "Quests"
    }
  ]
}, ju = f.Type.Object({
  enabled: f.Type.Boolean(),
  background: f.Type.Optional(f.Type.String()),
  text: f.Type.Optional(f.Type.String()),
  cssClass: f.Type.Optional(f.Type.String()),
  position: f.Type.Object({
    left: f.Type.Number(),
    top: f.Type.Number(),
    width: f.Type.Optional(f.Type.Number()),
    height: f.Type.Optional(f.Type.Number())
  }),
  anchor: f.Type.Optional(
    f.Type.Object({
      x: f.Type.Number(),
      y: f.Type.Number()
    })
  ),
  action: f.Type.Optional(f.Type.String()),
  actionType: f.Type.Optional(f.Type.String()),
  scriptClickable: f.Type.Optional(f.Type.Boolean()),
  tag: f.Type.Optional(f.Type.String())
}), zh = f.Type.Record(f.Type.String(), ju), Lu = f.Type.Object({
  buttons: zh,
  clickableDuringScriptsByDefault: f.Type.Optional(f.Type.Boolean())
}), Du = {
  buttons: {},
  clickableDuringScriptsByDefault: false
}, Qh = f.Type.Intersect([
  ju,
  f.Type.Object({
    id: f.Type.String()
  })
]), Yh = f.Type.Object({
  muted: f.Type.Optional(f.Type.Boolean()),
  loop: f.Type.Optional(f.Type.Boolean())
}), Jh = f.Type.Object({
  background: f.Type.String(),
  video: f.Type.Optional(Yh),
  buttons: f.Type.Optional(
    f.Type.Array(f.Type.Union([f.Type.String(), Qh]))
  )
}), Ru = f.Type.Record(f.Type.String(), Jh);
f.Type.Object({
  screens: Ru
});
const Mu = f.Type.Object({
  screens: f.Type.Optional(Ru)
}), Fu = {
  screens: {}
}, Xh = f.Type.Object({
  name: f.Type.String(),
  description: f.Type.String(),
  startingLevel: f.Type.Number(),
  hidden: f.Type.Optional(f.Type.Boolean()),
  icon: f.Type.String()
}), Uu = f.Type.Record(
  f.Type.String(),
  Xh
), Bu = f.Type.Object({
  xpPerLevel: f.Type.Number(),
  notifyLevelUp: f.Type.Boolean()
});
f.Type.Object({
  skills: Uu,
  skillOptions: Bu
});
const qu = f.Type.Object({
  skills: f.Type.Optional(Uu),
  skillOptions: f.Type.Optional(Bu)
}), Vu = {
  skills: {},
  skillOptions: {
    xpPerLevel: 10,
    notifyLevelUp: true
  }
}, Zh = f.Type.Object({
  portraitCssClass: f.Type.Optional(f.Type.String()),
  color: f.Type.Optional(f.Type.String()),
  boxCss: f.Type.Optional(f.Type.Record(f.Type.String(), f.Type.Any())),
  nameCss: f.Type.Optional(f.Type.Record(f.Type.String(), f.Type.Any())),
  textCss: f.Type.Optional(f.Type.Record(f.Type.String(), f.Type.Any()))
}), ey = f.Type.Object({
  video: f.Type.String(),
  autoplay: f.Type.Optional(f.Type.Boolean()),
  loop: f.Type.Optional(f.Type.Boolean()),
  muted: f.Type.Optional(f.Type.Boolean()),
  width: f.Type.Optional(f.Type.Number()),
  height: f.Type.Optional(f.Type.Number())
}), ty = f.Type.Object({
  image: f.Type.String(),
  width: f.Type.Optional(f.Type.Number()),
  height: f.Type.Optional(f.Type.Number())
}), ny = f.Type.Union([
  f.Type.String(),
  ey,
  ty
]), ry = f.Type.Object({
  sprites: f.Type.Optional(f.Type.Record(f.Type.String(), ny)),
  name: f.Type.String(),
  style: f.Type.Optional(Zh)
}), Hu = f.Type.Object({
  config: f.Type.Object({
    imagesPath: f.Type.String(),
    playerCharacter: f.Type.Optional(f.Type.String()),
    gameCharacter: f.Type.Optional(f.Type.String())
  }),
  characters: f.Type.Record(f.Type.String(), ry)
}), Ku = {
  config: {
    imagesPath: "",
    playerCharacter: "player",
    gameCharacter: "game"
  },
  characters: {}
}, Ml = f.Type.Object({
  cssClass: f.Type.Optional(f.Type.String()),
  textCssClass: f.Type.Optional(f.Type.String()),
  titleCssClass: f.Type.Optional(f.Type.String())
}), Gu = f.Type.Object({
  options: f.Type.Object({
    delay: f.Type.Optional(f.Type.Number()),
    width: f.Type.Number(),
    keywordsPrefix: f.Type.String(),
    screenEdgesMinimumMargin: f.Type.Optional(f.Type.Number()),
    styling: f.Type.Optional(Ml)
  }),
  tooltips: f.Type.Array(
    f.Type.Object({
      keywords: f.Type.Array(f.Type.String()),
      title: f.Type.String(),
      description: f.Type.String(),
      styling: f.Type.Optional(Ml)
    })
  )
}), Wu = {
  options: {
    delay: 0,
    width: 350,
    keywordsPrefix: "@@"
  },
  tooltips: []
}, iy = f.Type.Object({
  name: f.Type.String(),
  description: f.Type.String(),
  icon: f.Type.Optional(f.Type.String()),
  lockedIcon: f.Type.Optional(f.Type.String()),
  secret: f.Type.Optional(f.Type.Boolean()),
  category: f.Type.Optional(f.Type.String())
}), zu = f.Type.Object({
  id: f.Type.String(),
  title: f.Type.String()
}), Qu = f.Type.Record(
  f.Type.String(),
  iy
);
f.Type.Object({
  defaultAchievementIcon: f.Type.String(),
  categories: f.Type.Array(zu),
  achievements: Qu,
  notifyNewAchievements: f.Type.Boolean(),
  secretAchievements: f.Type.Optional(
    f.Type.Object({
      censorDescription: f.Type.Optional(f.Type.Boolean()),
      censorName: f.Type.Optional(f.Type.Boolean()),
      hideUntilObtained: f.Type.Optional(f.Type.Boolean())
    })
  )
});
const Yu = f.Type.Object({
  categories: f.Type.Optional(f.Type.Array(zu)),
  achievements: f.Type.Optional(Qu)
}), Ju = {
  categories: [
    {
      id: "default",
      title: "Achievements"
    }
  ],
  achievements: {},
  notifyNewAchievements: true,
  defaultAchievementIcon: "img/achievements/trophy.png"
}, oy = f.Type.Object({
  diceRange: f.Type.Tuple([f.Type.Number(), f.Type.Number()]),
  diceCount: f.Type.Number(),
  difficultyText: f.Type.Array(f.Type.Tuple([f.Type.Number(), f.Type.String()])),
  extraPointsPerLevel: f.Type.Number(),
  extraDicePerLevel: f.Type.Optional(f.Type.Number()),
  successOnRollsBelowThreshold: f.Type.Boolean(),
  showDifficultyText: f.Type.Boolean(),
  showDifficultyNumber: f.Type.Boolean(),
  showDifficultyWithoutModifiers: f.Type.Boolean(),
  finalRollIsHighest: f.Type.Optional(f.Type.Boolean()),
  finalRollIsLowest: f.Type.Optional(f.Type.Boolean()),
  failOnRollsEqualToThreshold: f.Type.Optional(f.Type.Boolean())
}), sy = f.Type.Object({
  skill: f.Type.String(),
  difficulty: f.Type.Number(),
  winsNeeded: f.Type.Optional(f.Type.Number()),
  hideAfterRoll: f.Type.Optional(f.Type.Boolean()),
  repeatable: f.Type.Optional(f.Type.Boolean())
}), Xu = f.Type.Object({
  options: oy,
  skillChecks: f.Type.Record(f.Type.String(), sy)
}), Zu = {
  options: {
    diceRange: [1, 6],
    extraPointsPerLevel: 1,
    extraDicePerLevel: 0,
    diceCount: 2,
    successOnRollsBelowThreshold: false,
    showDifficultyText: true,
    showDifficultyNumber: false,
    showDifficultyWithoutModifiers: false,
    finalRollIsHighest: false,
    finalRollIsLowest: false,
    difficultyText: [
      [2, "Very Easy"],
      [4, "Easy"],
      [6, "Medium"],
      [8, "Hard"],
      [10, "Very Hard"],
      [11, "Extremely Hard"],
      [12, "Near Impossible"]
    ]
  },
  skillChecks: {}
}, ay = f.Type.Object({
  cssClass: f.Type.Optional(f.Type.String()),
  textTemplate: f.Type.Optional(f.Type.String())
}), ed = f.Type.Record(
  f.Type.String(),
  ay
);
f.Type.Object({
  choiceTextTemplate: f.Type.String(),
  choicePrompts: ed
});
const td = f.Type.Object({
  choiceTextTemplate: f.Type.Optional(f.Type.String()),
  choicePrompts: f.Type.Optional(ed)
}), nd = {
  choicePrompts: {},
  choiceTextTemplate: '<span class="choice-index">%{$index}. </span> <span class="choice-text">%{$choice}</span>'
}, rd = f.Type.Object({
  delay: f.Type.Optional(f.Type.Number()),
  direction: f.Type.Optional(f.Type.String()),
  duration: f.Type.Optional(f.Type.Number()),
  easing: f.Type.Optional(f.Type.String()),
  endDelay: f.Type.Optional(f.Type.Number()),
  fill: f.Type.Optional(f.Type.String()),
  iterationStart: f.Type.Optional(f.Type.Number()),
  iterations: f.Type.Optional(f.Type.Number()),
  keyframes: f.Type.Optional(f.Type.Any())
}), da = f.Type.Array(f.Type.Any()), ly = f.Type.Object({
  keyframes: f.Type.Union([f.Type.String(), da]),
  options: f.Type.Optional(rd)
});
f.Type.Object({
  keyframes: da,
  options: f.Type.Optional(rd)
});
const id = f.Type.Object({
  animations: f.Type.Record(f.Type.String(), ly),
  keyframes: f.Type.Record(f.Type.String(), da)
}), od = {
  animations: {},
  keyframes: {}
}, cy = f.Type.Object({
  name: f.Type.String(),
  type: f.Type.String(),
  optional: f.Type.Optional(f.Type.Boolean())
}), uy = f.Type.Object({
  keyword: f.Type.String(),
  label: f.Type.String(),
  options: f.Type.Optional(f.Type.Array(cy))
}), sd = f.Type.Object({
  macros: f.Type.Array(uy)
}), ad = {
  macros: []
}, cs = f.Type.Object({
  assets: f.Type.Record(f.Type.String(), f.Type.String())
}), ld = f.Type.Object({
  images: f.Type.Optional(cs),
  audio: f.Type.Optional(cs),
  video: f.Type.Optional(cs)
}), cd = {
  images: {
    assets: {}
  },
  audio: {
    assets: {}
  },
  video: {
    assets: {}
  }
}, ni = {
  common: ua,
  screens: Fu,
  buttons: Du,
  skills: Vu,
  skillChecks: Zu,
  scripts: [],
  audio: mu,
  tooltips: Wu,
  achievements: Ju,
  items: Pu,
  quests: xu,
  characters: Ku,
  choices: nd,
  animations: od,
  macros: ad,
  preload: cd
};
var dy = function(t) {
  return fy(t) && !py(t);
};
function fy(e2) {
  return !!e2 && typeof e2 == "object";
}
function py(e2) {
  var t = Object.prototype.toString.call(e2);
  return t === "[object RegExp]" || t === "[object Date]" || yy(e2);
}
var my = typeof Symbol == "function" && Symbol.for, hy = my ? Symbol.for("react.element") : 60103;
function yy(e2) {
  return e2.$$typeof === hy;
}
function gy(e2) {
  return Array.isArray(e2) ? [] : {};
}
function Ri(e2, t) {
  return t.clone !== false && t.isMergeableObject(e2) ? ri(gy(e2), e2, t) : e2;
}
function vy(e2, t, n) {
  return e2.concat(t).map(function(r) {
    return Ri(r, n);
  });
}
function _y(e2, t) {
  if (!t.customMerge)
    return ri;
  var n = t.customMerge(e2);
  return typeof n == "function" ? n : ri;
}
function by(e2) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e2).filter(function(t) {
    return Object.propertyIsEnumerable.call(e2, t);
  }) : [];
}
function Fl(e2) {
  return Object.keys(e2).concat(by(e2));
}
function ud(e2, t) {
  try {
    return t in e2;
  } catch {
    return false;
  }
}
function Ty(e2, t) {
  return ud(e2, t) && !(Object.hasOwnProperty.call(e2, t) && Object.propertyIsEnumerable.call(e2, t));
}
function Sy(e2, t, n) {
  var r = {};
  return n.isMergeableObject(e2) && Fl(e2).forEach(function(i) {
    r[i] = Ri(e2[i], n);
  }), Fl(t).forEach(function(i) {
    Ty(e2, i) || (ud(e2, i) && n.isMergeableObject(t[i]) ? r[i] = _y(i, n)(e2[i], t[i], n) : r[i] = Ri(t[i], n));
  }), r;
}
function ri(e2, t, n) {
  n = n || {}, n.arrayMerge = n.arrayMerge || vy, n.isMergeableObject = n.isMergeableObject || dy, n.cloneUnlessOtherwiseSpecified = Ri;
  var r = Array.isArray(t), i = Array.isArray(e2), s = r === i;
  return s ? r ? n.arrayMerge(e2, t, n) : Sy(e2, t, n) : Ri(t, n);
}
ri.all = function(t, n) {
  if (!Array.isArray(t))
    throw new Error("first argument should be an array");
  return t.reduce(function(r, i) {
    return ri(r, i, n);
  }, {});
};
var wy = ri, $y = wy;
const Ir = /* @__PURE__ */ ta($y), Ct = bt("config", {
  state: () => ({
    config: ni,
    configModules: {}
  }),
  actions: {
    async setConfig(e2) {
      this.config = e2;
    },
    extendConfig(e2) {
      this.config = Ir(this.config, e2);
    },
    generateSaveData() {
      return {
        playerCharacter: this.playerCharacter,
        gameCharacter: this.gameCharacter
      };
    },
    addConfigModule(e2, t) {
      this.configModules[e2] = t;
    },
    findConfigModuleKey(e2) {
      const t = Object.keys(this.configModules).find((n) => this.configModules[n].id === e2.id);
      if (t)
        return t;
    },
    reloadConfigModule(e2, t) {
      this.configModules[e2].code = t, this.config[e2] = t;
    },
    loadSaveData(e2) {
      this.config.characters.config.playerCharacter = e2.playerCharacter, this.config.characters.config.gameCharacter = e2.gameCharacter;
    }
  },
  getters: {
    playerCharacter() {
      return this.config.characters.config.playerCharacter ?? "player";
    },
    gameCharacter() {
      return this.config.characters.config.gameCharacter ?? "game";
    }
  }
});
function dd(e2) {
  const t = vt(), n = t.getSkillCheck(e2.id);
  if (n && n.happened && (n.succeeded || !e2.repeatable))
    return n;
  const r = yh(e2);
  return md(fh(r, e2)), r ? t.passSkillCheck(e2.id, e2.hideAfterRoll) : t.failSkillCheck(e2.id, e2.hideAfterRoll), t.getSkillCheck(e2.id);
}
function Cy(e2, t = []) {
  const n = e2.options, r = e2.staticOptions, i = !!n.condition;
  if (i)
    return r.success;
  if (!i) {
    for (const [s, o] of r.elseifs.entries())
      if (t[s] === true)
        return o.branch;
  }
  if (!i && r.failure)
    return r.failure;
}
function fd(e2) {
  return typeof e2 == "object";
}
function pd(e2) {
  return typeof e2 == "string" && e2.search(/\$/) === 0;
}
function md(e2) {
  const t = {
    speaker: Ct().gameCharacter,
    text: e2,
    interactive: false
  };
  Ye().addDialog(t);
}
async function Go(e2) {
  Ye().addDialog(e2);
}
function ky(e2, t) {
  if (t < e2.length)
    return e2[t];
}
/*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT */
function hd(e2) {
  return typeof e2 > "u" || e2 === null;
}
function Oy(e2) {
  return typeof e2 == "object" && e2 !== null;
}
function Ay(e2) {
  return Array.isArray(e2) ? e2 : hd(e2) ? [] : [e2];
}
function Ey(e2, t) {
  var n, r, i, s;
  if (t)
    for (s = Object.keys(t), n = 0, r = s.length; n < r; n += 1)
      i = s[n], e2[i] = t[i];
  return e2;
}
function Iy(e2, t) {
  var n = "", r;
  for (r = 0; r < t; r += 1)
    n += e2;
  return n;
}
function Py(e2) {
  return e2 === 0 && Number.NEGATIVE_INFINITY === 1 / e2;
}
var Ny = hd, xy = Oy, jy = Ay, Ly = Iy, Dy = Py, Ry = Ey, $t = {
  isNothing: Ny,
  isObject: xy,
  toArray: jy,
  repeat: Ly,
  isNegativeZero: Dy,
  extend: Ry
};
function yd(e2, t) {
  var n = "", r = e2.reason || "(unknown reason)";
  return e2.mark ? (e2.mark.name && (n += 'in "' + e2.mark.name + '" '), n += "(" + (e2.mark.line + 1) + ":" + (e2.mark.column + 1) + ")", !t && e2.mark.snippet && (n += `

` + e2.mark.snippet), r + " " + n) : r;
}
function Mi(e2, t) {
  Error.call(this), this.name = "YAMLException", this.reason = e2, this.mark = t, this.message = yd(this, false), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
Mi.prototype = Object.create(Error.prototype);
Mi.prototype.constructor = Mi;
Mi.prototype.toString = function(t) {
  return this.name + ": " + yd(this, t);
};
var Bt = Mi;
function us(e2, t, n, r, i) {
  var s = "", o = "", l = Math.floor(i / 2) - 1;
  return r - t > l && (s = " ... ", t = r - l + s.length), n - r > l && (o = " ...", n = r + l - o.length), {
    str: s + e2.slice(t, n).replace(/\t/g, "→") + o,
    pos: r - t + s.length
    // relative position
  };
}
function ds(e2, t) {
  return $t.repeat(" ", t - e2.length) + e2;
}
function My(e2, t) {
  if (t = Object.create(t || null), !e2.buffer)
    return null;
  t.maxLength || (t.maxLength = 79), typeof t.indent != "number" && (t.indent = 1), typeof t.linesBefore != "number" && (t.linesBefore = 3), typeof t.linesAfter != "number" && (t.linesAfter = 2);
  for (var n = /\r?\n|\r|\0/g, r = [0], i = [], s, o = -1; s = n.exec(e2.buffer); )
    i.push(s.index), r.push(s.index + s[0].length), e2.position <= s.index && o < 0 && (o = r.length - 2);
  o < 0 && (o = r.length - 1);
  var l = "", u, c, m = Math.min(e2.line + t.linesAfter, i.length).toString().length, a = t.maxLength - (t.indent + m + 3);
  for (u = 1; u <= t.linesBefore && !(o - u < 0); u++)
    c = us(
      e2.buffer,
      r[o - u],
      i[o - u],
      e2.position - (r[o] - r[o - u]),
      a
    ), l = $t.repeat(" ", t.indent) + ds((e2.line - u + 1).toString(), m) + " | " + c.str + `
` + l;
  for (c = us(e2.buffer, r[o], i[o], e2.position, a), l += $t.repeat(" ", t.indent) + ds((e2.line + 1).toString(), m) + " | " + c.str + `
`, l += $t.repeat("-", t.indent + m + 3 + c.pos) + `^
`, u = 1; u <= t.linesAfter && !(o + u >= i.length); u++)
    c = us(
      e2.buffer,
      r[o + u],
      i[o + u],
      e2.position - (r[o] - r[o + u]),
      a
    ), l += $t.repeat(" ", t.indent) + ds((e2.line + u + 1).toString(), m) + " | " + c.str + `
`;
  return l.replace(/\n$/, "");
}
var Fy = My, Uy = [
  "kind",
  "multi",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "representName",
  "defaultStyle",
  "styleAliases"
], By = [
  "scalar",
  "sequence",
  "mapping"
];
function qy(e2) {
  var t = {};
  return e2 !== null && Object.keys(e2).forEach(function(n) {
    e2[n].forEach(function(r) {
      t[String(r)] = n;
    });
  }), t;
}
function Vy(e2, t) {
  if (t = t || {}, Object.keys(t).forEach(function(n) {
    if (Uy.indexOf(n) === -1)
      throw new Bt('Unknown option "' + n + '" is met in definition of "' + e2 + '" YAML type.');
  }), this.options = t, this.tag = e2, this.kind = t.kind || null, this.resolve = t.resolve || function() {
    return true;
  }, this.construct = t.construct || function(n) {
    return n;
  }, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.representName = t.representName || null, this.defaultStyle = t.defaultStyle || null, this.multi = t.multi || false, this.styleAliases = qy(t.styleAliases || null), By.indexOf(this.kind) === -1)
    throw new Bt('Unknown kind "' + this.kind + '" is specified for "' + e2 + '" YAML type.');
}
var It = Vy;
function Ul(e2, t) {
  var n = [];
  return e2[t].forEach(function(r) {
    var i = n.length;
    n.forEach(function(s, o) {
      s.tag === r.tag && s.kind === r.kind && s.multi === r.multi && (i = o);
    }), n[i] = r;
  }), n;
}
function Hy() {
  var e2 = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {},
    multi: {
      scalar: [],
      sequence: [],
      mapping: [],
      fallback: []
    }
  }, t, n;
  function r(i) {
    i.multi ? (e2.multi[i.kind].push(i), e2.multi.fallback.push(i)) : e2[i.kind][i.tag] = e2.fallback[i.tag] = i;
  }
  for (t = 0, n = arguments.length; t < n; t += 1)
    arguments[t].forEach(r);
  return e2;
}
function Ps(e2) {
  return this.extend(e2);
}
Ps.prototype.extend = function(t) {
  var n = [], r = [];
  if (t instanceof It)
    r.push(t);
  else if (Array.isArray(t))
    r = r.concat(t);
  else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
    t.implicit && (n = n.concat(t.implicit)), t.explicit && (r = r.concat(t.explicit));
  else
    throw new Bt("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  n.forEach(function(s) {
    if (!(s instanceof It))
      throw new Bt("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (s.loadKind && s.loadKind !== "scalar")
      throw new Bt("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (s.multi)
      throw new Bt("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), r.forEach(function(s) {
    if (!(s instanceof It))
      throw new Bt("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var i = Object.create(Ps.prototype);
  return i.implicit = (this.implicit || []).concat(n), i.explicit = (this.explicit || []).concat(r), i.compiledImplicit = Ul(i, "implicit"), i.compiledExplicit = Ul(i, "explicit"), i.compiledTypeMap = Hy(i.compiledImplicit, i.compiledExplicit), i;
};
var gd = Ps, vd = new It("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e2) {
    return e2 !== null ? e2 : "";
  }
}), _d = new It("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e2) {
    return e2 !== null ? e2 : [];
  }
}), bd = new It("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e2) {
    return e2 !== null ? e2 : {};
  }
}), Td = new gd({
  explicit: [
    vd,
    _d,
    bd
  ]
});
function Ky(e2) {
  if (e2 === null)
    return true;
  var t = e2.length;
  return t === 1 && e2 === "~" || t === 4 && (e2 === "null" || e2 === "Null" || e2 === "NULL");
}
function Gy() {
  return null;
}
function Wy(e2) {
  return e2 === null;
}
var Sd = new It("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: Ky,
  construct: Gy,
  predicate: Wy,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    },
    empty: function() {
      return "";
    }
  },
  defaultStyle: "lowercase"
});
function zy(e2) {
  if (e2 === null)
    return false;
  var t = e2.length;
  return t === 4 && (e2 === "true" || e2 === "True" || e2 === "TRUE") || t === 5 && (e2 === "false" || e2 === "False" || e2 === "FALSE");
}
function Qy(e2) {
  return e2 === "true" || e2 === "True" || e2 === "TRUE";
}
function Yy(e2) {
  return Object.prototype.toString.call(e2) === "[object Boolean]";
}
var wd = new It("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: zy,
  construct: Qy,
  predicate: Yy,
  represent: {
    lowercase: function(e2) {
      return e2 ? "true" : "false";
    },
    uppercase: function(e2) {
      return e2 ? "TRUE" : "FALSE";
    },
    camelcase: function(e2) {
      return e2 ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
});
function Jy(e2) {
  return 48 <= e2 && e2 <= 57 || 65 <= e2 && e2 <= 70 || 97 <= e2 && e2 <= 102;
}
function Xy(e2) {
  return 48 <= e2 && e2 <= 55;
}
function Zy(e2) {
  return 48 <= e2 && e2 <= 57;
}
function eg(e2) {
  if (e2 === null)
    return false;
  var t = e2.length, n = 0, r = false, i;
  if (!t)
    return false;
  if (i = e2[n], (i === "-" || i === "+") && (i = e2[++n]), i === "0") {
    if (n + 1 === t)
      return true;
    if (i = e2[++n], i === "b") {
      for (n++; n < t; n++)
        if (i = e2[n], i !== "_") {
          if (i !== "0" && i !== "1")
            return false;
          r = true;
        }
      return r && i !== "_";
    }
    if (i === "x") {
      for (n++; n < t; n++)
        if (i = e2[n], i !== "_") {
          if (!Jy(e2.charCodeAt(n)))
            return false;
          r = true;
        }
      return r && i !== "_";
    }
    if (i === "o") {
      for (n++; n < t; n++)
        if (i = e2[n], i !== "_") {
          if (!Xy(e2.charCodeAt(n)))
            return false;
          r = true;
        }
      return r && i !== "_";
    }
  }
  if (i === "_")
    return false;
  for (; n < t; n++)
    if (i = e2[n], i !== "_") {
      if (!Zy(e2.charCodeAt(n)))
        return false;
      r = true;
    }
  return !(!r || i === "_");
}
function tg(e2) {
  var t = e2, n = 1, r;
  if (t.indexOf("_") !== -1 && (t = t.replace(/_/g, "")), r = t[0], (r === "-" || r === "+") && (r === "-" && (n = -1), t = t.slice(1), r = t[0]), t === "0")
    return 0;
  if (r === "0") {
    if (t[1] === "b")
      return n * parseInt(t.slice(2), 2);
    if (t[1] === "x")
      return n * parseInt(t.slice(2), 16);
    if (t[1] === "o")
      return n * parseInt(t.slice(2), 8);
  }
  return n * parseInt(t, 10);
}
function ng(e2) {
  return Object.prototype.toString.call(e2) === "[object Number]" && e2 % 1 === 0 && !$t.isNegativeZero(e2);
}
var $d = new It("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: eg,
  construct: tg,
  predicate: ng,
  represent: {
    binary: function(e2) {
      return e2 >= 0 ? "0b" + e2.toString(2) : "-0b" + e2.toString(2).slice(1);
    },
    octal: function(e2) {
      return e2 >= 0 ? "0o" + e2.toString(8) : "-0o" + e2.toString(8).slice(1);
    },
    decimal: function(e2) {
      return e2.toString(10);
    },
    /* eslint-disable max-len */
    hexadecimal: function(e2) {
      return e2 >= 0 ? "0x" + e2.toString(16).toUpperCase() : "-0x" + e2.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
}), rg = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function ig(e2) {
  return !(e2 === null || !rg.test(e2) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e2[e2.length - 1] === "_");
}
function og(e2) {
  var t, n;
  return t = e2.replace(/_/g, "").toLowerCase(), n = t[0] === "-" ? -1 : 1, "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), t === ".inf" ? n === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : t === ".nan" ? NaN : n * parseFloat(t, 10);
}
var sg = /^[-+]?[0-9]+e/;
function ag(e2, t) {
  var n;
  if (isNaN(e2))
    switch (t) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  else if (Number.POSITIVE_INFINITY === e2)
    switch (t) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  else if (Number.NEGATIVE_INFINITY === e2)
    switch (t) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  else if ($t.isNegativeZero(e2))
    return "-0.0";
  return n = e2.toString(10), sg.test(n) ? n.replace("e", ".e") : n;
}
function lg(e2) {
  return Object.prototype.toString.call(e2) === "[object Number]" && (e2 % 1 !== 0 || $t.isNegativeZero(e2));
}
var Cd = new It("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: ig,
  construct: og,
  predicate: lg,
  represent: ag,
  defaultStyle: "lowercase"
}), kd = Td.extend({
  implicit: [
    Sd,
    wd,
    $d,
    Cd
  ]
}), Od = kd, Ad = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), Ed = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function cg(e2) {
  return e2 === null ? false : Ad.exec(e2) !== null || Ed.exec(e2) !== null;
}
function ug(e2) {
  var t, n, r, i, s, o, l, u = 0, c = null, m, a, d;
  if (t = Ad.exec(e2), t === null && (t = Ed.exec(e2)), t === null)
    throw new Error("Date resolve error");
  if (n = +t[1], r = +t[2] - 1, i = +t[3], !t[4])
    return new Date(Date.UTC(n, r, i));
  if (s = +t[4], o = +t[5], l = +t[6], t[7]) {
    for (u = t[7].slice(0, 3); u.length < 3; )
      u += "0";
    u = +u;
  }
  return t[9] && (m = +t[10], a = +(t[11] || 0), c = (m * 60 + a) * 6e4, t[9] === "-" && (c = -c)), d = new Date(Date.UTC(n, r, i, s, o, l, u)), c && d.setTime(d.getTime() - c), d;
}
function dg(e2) {
  return e2.toISOString();
}
var Id = new It("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: cg,
  construct: ug,
  instanceOf: Date,
  represent: dg
});
function fg(e2) {
  return e2 === "<<" || e2 === null;
}
var Pd = new It("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: fg
}), fa = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function pg(e2) {
  if (e2 === null)
    return false;
  var t, n, r = 0, i = e2.length, s = fa;
  for (n = 0; n < i; n++)
    if (t = s.indexOf(e2.charAt(n)), !(t > 64)) {
      if (t < 0)
        return false;
      r += 6;
    }
  return r % 8 === 0;
}
function mg(e2) {
  var t, n, r = e2.replace(/[\r\n=]/g, ""), i = r.length, s = fa, o = 0, l = [];
  for (t = 0; t < i; t++)
    t % 4 === 0 && t && (l.push(o >> 16 & 255), l.push(o >> 8 & 255), l.push(o & 255)), o = o << 6 | s.indexOf(r.charAt(t));
  return n = i % 4 * 6, n === 0 ? (l.push(o >> 16 & 255), l.push(o >> 8 & 255), l.push(o & 255)) : n === 18 ? (l.push(o >> 10 & 255), l.push(o >> 2 & 255)) : n === 12 && l.push(o >> 4 & 255), new Uint8Array(l);
}
function hg(e2) {
  var t = "", n = 0, r, i, s = e2.length, o = fa;
  for (r = 0; r < s; r++)
    r % 3 === 0 && r && (t += o[n >> 18 & 63], t += o[n >> 12 & 63], t += o[n >> 6 & 63], t += o[n & 63]), n = (n << 8) + e2[r];
  return i = s % 3, i === 0 ? (t += o[n >> 18 & 63], t += o[n >> 12 & 63], t += o[n >> 6 & 63], t += o[n & 63]) : i === 2 ? (t += o[n >> 10 & 63], t += o[n >> 4 & 63], t += o[n << 2 & 63], t += o[64]) : i === 1 && (t += o[n >> 2 & 63], t += o[n << 4 & 63], t += o[64], t += o[64]), t;
}
function yg(e2) {
  return Object.prototype.toString.call(e2) === "[object Uint8Array]";
}
var Nd = new It("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: pg,
  construct: mg,
  predicate: yg,
  represent: hg
}), gg = Object.prototype.hasOwnProperty, vg = Object.prototype.toString;
function _g(e2) {
  if (e2 === null)
    return true;
  var t = [], n, r, i, s, o, l = e2;
  for (n = 0, r = l.length; n < r; n += 1) {
    if (i = l[n], o = false, vg.call(i) !== "[object Object]")
      return false;
    for (s in i)
      if (gg.call(i, s))
        if (!o)
          o = true;
        else
          return false;
    if (!o)
      return false;
    if (t.indexOf(s) === -1)
      t.push(s);
    else
      return false;
  }
  return true;
}
function bg(e2) {
  return e2 !== null ? e2 : [];
}
var xd = new It("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: _g,
  construct: bg
}), Tg = Object.prototype.toString;
function Sg(e2) {
  if (e2 === null)
    return true;
  var t, n, r, i, s, o = e2;
  for (s = new Array(o.length), t = 0, n = o.length; t < n; t += 1) {
    if (r = o[t], Tg.call(r) !== "[object Object]" || (i = Object.keys(r), i.length !== 1))
      return false;
    s[t] = [i[0], r[i[0]]];
  }
  return true;
}
function wg(e2) {
  if (e2 === null)
    return [];
  var t, n, r, i, s, o = e2;
  for (s = new Array(o.length), t = 0, n = o.length; t < n; t += 1)
    r = o[t], i = Object.keys(r), s[t] = [i[0], r[i[0]]];
  return s;
}
var jd = new It("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: Sg,
  construct: wg
}), $g = Object.prototype.hasOwnProperty;
function Cg(e2) {
  if (e2 === null)
    return true;
  var t, n = e2;
  for (t in n)
    if ($g.call(n, t) && n[t] !== null)
      return false;
  return true;
}
function kg(e2) {
  return e2 !== null ? e2 : {};
}
var Ld = new It("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: Cg,
  construct: kg
}), pa = Od.extend({
  implicit: [
    Id,
    Pd
  ],
  explicit: [
    Nd,
    xd,
    jd,
    Ld
  ]
}), sr = Object.prototype.hasOwnProperty, Co = 1, Dd = 2, Rd = 3, ko = 4, fs = 1, Og = 2, Bl = 3, Ag = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, Eg = /[\x85\u2028\u2029]/, Ig = /[,\[\]\{\}]/, Md = /^(?:!|!!|![a-z\-]+!)$/i, Fd = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function ql(e2) {
  return Object.prototype.toString.call(e2);
}
function An(e2) {
  return e2 === 10 || e2 === 13;
}
function $r(e2) {
  return e2 === 9 || e2 === 32;
}
function Gt(e2) {
  return e2 === 9 || e2 === 32 || e2 === 10 || e2 === 13;
}
function Wr(e2) {
  return e2 === 44 || e2 === 91 || e2 === 93 || e2 === 123 || e2 === 125;
}
function Pg(e2) {
  var t;
  return 48 <= e2 && e2 <= 57 ? e2 - 48 : (t = e2 | 32, 97 <= t && t <= 102 ? t - 97 + 10 : -1);
}
function Ng(e2) {
  return e2 === 120 ? 2 : e2 === 117 ? 4 : e2 === 85 ? 8 : 0;
}
function xg(e2) {
  return 48 <= e2 && e2 <= 57 ? e2 - 48 : -1;
}
function Vl(e2) {
  return e2 === 48 ? "\0" : e2 === 97 ? "\x07" : e2 === 98 ? "\b" : e2 === 116 || e2 === 9 ? "	" : e2 === 110 ? `
` : e2 === 118 ? "\v" : e2 === 102 ? "\f" : e2 === 114 ? "\r" : e2 === 101 ? "\x1B" : e2 === 32 ? " " : e2 === 34 ? '"' : e2 === 47 ? "/" : e2 === 92 ? "\\" : e2 === 78 ? "" : e2 === 95 ? " " : e2 === 76 ? "\u2028" : e2 === 80 ? "\u2029" : "";
}
function jg(e2) {
  return e2 <= 65535 ? String.fromCharCode(e2) : String.fromCharCode(
    (e2 - 65536 >> 10) + 55296,
    (e2 - 65536 & 1023) + 56320
  );
}
var Ud = new Array(256), Bd = new Array(256);
for (var Ur = 0; Ur < 256; Ur++)
  Ud[Ur] = Vl(Ur) ? 1 : 0, Bd[Ur] = Vl(Ur);
function Lg(e2, t) {
  this.input = e2, this.filename = t.filename || null, this.schema = t.schema || pa, this.onWarning = t.onWarning || null, this.legacy = t.legacy || false, this.json = t.json || false, this.listener = t.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e2.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function qd(e2, t) {
  var n = {
    name: e2.filename,
    buffer: e2.input.slice(0, -1),
    // omit trailing \0
    position: e2.position,
    line: e2.line,
    column: e2.position - e2.lineStart
  };
  return n.snippet = Fy(n), new Bt(t, n);
}
function Te(e2, t) {
  throw qd(e2, t);
}
function Oo(e2, t) {
  e2.onWarning && e2.onWarning.call(null, qd(e2, t));
}
var Hl = {
  YAML: function(t, n, r) {
    var i, s, o;
    t.version !== null && Te(t, "duplication of %YAML directive"), r.length !== 1 && Te(t, "YAML directive accepts exactly one argument"), i = /^([0-9]+)\.([0-9]+)$/.exec(r[0]), i === null && Te(t, "ill-formed argument of the YAML directive"), s = parseInt(i[1], 10), o = parseInt(i[2], 10), s !== 1 && Te(t, "unacceptable YAML version of the document"), t.version = r[0], t.checkLineBreaks = o < 2, o !== 1 && o !== 2 && Oo(t, "unsupported YAML version of the document");
  },
  TAG: function(t, n, r) {
    var i, s;
    r.length !== 2 && Te(t, "TAG directive accepts exactly two arguments"), i = r[0], s = r[1], Md.test(i) || Te(t, "ill-formed tag handle (first argument) of the TAG directive"), sr.call(t.tagMap, i) && Te(t, 'there is a previously declared suffix for "' + i + '" tag handle'), Fd.test(s) || Te(t, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      s = decodeURIComponent(s);
    } catch {
      Te(t, "tag prefix is malformed: " + s);
    }
    t.tagMap[i] = s;
  }
};
function ir(e2, t, n, r) {
  var i, s, o, l;
  if (t < n) {
    if (l = e2.input.slice(t, n), r)
      for (i = 0, s = l.length; i < s; i += 1)
        o = l.charCodeAt(i), o === 9 || 32 <= o && o <= 1114111 || Te(e2, "expected valid JSON character");
    else
      Ag.test(l) && Te(e2, "the stream contains non-printable characters");
    e2.result += l;
  }
}
function Kl(e2, t, n, r) {
  var i, s, o, l;
  for ($t.isObject(n) || Te(e2, "cannot merge mappings; the provided source object is unacceptable"), i = Object.keys(n), o = 0, l = i.length; o < l; o += 1)
    s = i[o], sr.call(t, s) || (t[s] = n[s], r[s] = true);
}
function zr(e2, t, n, r, i, s, o, l, u) {
  var c, m;
  if (Array.isArray(i))
    for (i = Array.prototype.slice.call(i), c = 0, m = i.length; c < m; c += 1)
      Array.isArray(i[c]) && Te(e2, "nested arrays are not supported inside keys"), typeof i == "object" && ql(i[c]) === "[object Object]" && (i[c] = "[object Object]");
  if (typeof i == "object" && ql(i) === "[object Object]" && (i = "[object Object]"), i = String(i), t === null && (t = {}), r === "tag:yaml.org,2002:merge")
    if (Array.isArray(s))
      for (c = 0, m = s.length; c < m; c += 1)
        Kl(e2, t, s[c], n);
    else
      Kl(e2, t, s, n);
  else
    !e2.json && !sr.call(n, i) && sr.call(t, i) && (e2.line = o || e2.line, e2.lineStart = l || e2.lineStart, e2.position = u || e2.position, Te(e2, "duplicated mapping key")), i === "__proto__" ? Object.defineProperty(t, i, {
      configurable: true,
      enumerable: true,
      writable: true,
      value: s
    }) : t[i] = s, delete n[i];
  return t;
}
function ma(e2) {
  var t;
  t = e2.input.charCodeAt(e2.position), t === 10 ? e2.position++ : t === 13 ? (e2.position++, e2.input.charCodeAt(e2.position) === 10 && e2.position++) : Te(e2, "a line break is expected"), e2.line += 1, e2.lineStart = e2.position, e2.firstTabInLine = -1;
}
function wt(e2, t, n) {
  for (var r = 0, i = e2.input.charCodeAt(e2.position); i !== 0; ) {
    for (; $r(i); )
      i === 9 && e2.firstTabInLine === -1 && (e2.firstTabInLine = e2.position), i = e2.input.charCodeAt(++e2.position);
    if (t && i === 35)
      do
        i = e2.input.charCodeAt(++e2.position);
      while (i !== 10 && i !== 13 && i !== 0);
    if (An(i))
      for (ma(e2), i = e2.input.charCodeAt(e2.position), r++, e2.lineIndent = 0; i === 32; )
        e2.lineIndent++, i = e2.input.charCodeAt(++e2.position);
    else
      break;
  }
  return n !== -1 && r !== 0 && e2.lineIndent < n && Oo(e2, "deficient indentation"), r;
}
function Wo(e2) {
  var t = e2.position, n;
  return n = e2.input.charCodeAt(t), !!((n === 45 || n === 46) && n === e2.input.charCodeAt(t + 1) && n === e2.input.charCodeAt(t + 2) && (t += 3, n = e2.input.charCodeAt(t), n === 0 || Gt(n)));
}
function ha(e2, t) {
  t === 1 ? e2.result += " " : t > 1 && (e2.result += $t.repeat(`
`, t - 1));
}
function Dg(e2, t, n) {
  var r, i, s, o, l, u, c, m, a = e2.kind, d = e2.result, p;
  if (p = e2.input.charCodeAt(e2.position), Gt(p) || Wr(p) || p === 35 || p === 38 || p === 42 || p === 33 || p === 124 || p === 62 || p === 39 || p === 34 || p === 37 || p === 64 || p === 96 || (p === 63 || p === 45) && (i = e2.input.charCodeAt(e2.position + 1), Gt(i) || n && Wr(i)))
    return false;
  for (e2.kind = "scalar", e2.result = "", s = o = e2.position, l = false; p !== 0; ) {
    if (p === 58) {
      if (i = e2.input.charCodeAt(e2.position + 1), Gt(i) || n && Wr(i))
        break;
    } else if (p === 35) {
      if (r = e2.input.charCodeAt(e2.position - 1), Gt(r))
        break;
    } else {
      if (e2.position === e2.lineStart && Wo(e2) || n && Wr(p))
        break;
      if (An(p))
        if (u = e2.line, c = e2.lineStart, m = e2.lineIndent, wt(e2, false, -1), e2.lineIndent >= t) {
          l = true, p = e2.input.charCodeAt(e2.position);
          continue;
        } else {
          e2.position = o, e2.line = u, e2.lineStart = c, e2.lineIndent = m;
          break;
        }
    }
    l && (ir(e2, s, o, false), ha(e2, e2.line - u), s = o = e2.position, l = false), $r(p) || (o = e2.position + 1), p = e2.input.charCodeAt(++e2.position);
  }
  return ir(e2, s, o, false), e2.result ? true : (e2.kind = a, e2.result = d, false);
}
function Rg(e2, t) {
  var n, r, i;
  if (n = e2.input.charCodeAt(e2.position), n !== 39)
    return false;
  for (e2.kind = "scalar", e2.result = "", e2.position++, r = i = e2.position; (n = e2.input.charCodeAt(e2.position)) !== 0; )
    if (n === 39)
      if (ir(e2, r, e2.position, true), n = e2.input.charCodeAt(++e2.position), n === 39)
        r = e2.position, e2.position++, i = e2.position;
      else
        return true;
    else
      An(n) ? (ir(e2, r, i, true), ha(e2, wt(e2, false, t)), r = i = e2.position) : e2.position === e2.lineStart && Wo(e2) ? Te(e2, "unexpected end of the document within a single quoted scalar") : (e2.position++, i = e2.position);
  Te(e2, "unexpected end of the stream within a single quoted scalar");
}
function Mg(e2, t) {
  var n, r, i, s, o, l;
  if (l = e2.input.charCodeAt(e2.position), l !== 34)
    return false;
  for (e2.kind = "scalar", e2.result = "", e2.position++, n = r = e2.position; (l = e2.input.charCodeAt(e2.position)) !== 0; ) {
    if (l === 34)
      return ir(e2, n, e2.position, true), e2.position++, true;
    if (l === 92) {
      if (ir(e2, n, e2.position, true), l = e2.input.charCodeAt(++e2.position), An(l))
        wt(e2, false, t);
      else if (l < 256 && Ud[l])
        e2.result += Bd[l], e2.position++;
      else if ((o = Ng(l)) > 0) {
        for (i = o, s = 0; i > 0; i--)
          l = e2.input.charCodeAt(++e2.position), (o = Pg(l)) >= 0 ? s = (s << 4) + o : Te(e2, "expected hexadecimal character");
        e2.result += jg(s), e2.position++;
      } else
        Te(e2, "unknown escape sequence");
      n = r = e2.position;
    } else
      An(l) ? (ir(e2, n, r, true), ha(e2, wt(e2, false, t)), n = r = e2.position) : e2.position === e2.lineStart && Wo(e2) ? Te(e2, "unexpected end of the document within a double quoted scalar") : (e2.position++, r = e2.position);
  }
  Te(e2, "unexpected end of the stream within a double quoted scalar");
}
function Fg(e2, t) {
  var n = true, r, i, s, o = e2.tag, l, u = e2.anchor, c, m, a, d, p, h = /* @__PURE__ */ Object.create(null), v, T, _, E;
  if (E = e2.input.charCodeAt(e2.position), E === 91)
    m = 93, p = false, l = [];
  else if (E === 123)
    m = 125, p = true, l = {};
  else
    return false;
  for (e2.anchor !== null && (e2.anchorMap[e2.anchor] = l), E = e2.input.charCodeAt(++e2.position); E !== 0; ) {
    if (wt(e2, true, t), E = e2.input.charCodeAt(e2.position), E === m)
      return e2.position++, e2.tag = o, e2.anchor = u, e2.kind = p ? "mapping" : "sequence", e2.result = l, true;
    n ? E === 44 && Te(e2, "expected the node content, but found ','") : Te(e2, "missed comma between flow collection entries"), T = v = _ = null, a = d = false, E === 63 && (c = e2.input.charCodeAt(e2.position + 1), Gt(c) && (a = d = true, e2.position++, wt(e2, true, t))), r = e2.line, i = e2.lineStart, s = e2.position, ii(e2, t, Co, false, true), T = e2.tag, v = e2.result, wt(e2, true, t), E = e2.input.charCodeAt(e2.position), (d || e2.line === r) && E === 58 && (a = true, E = e2.input.charCodeAt(++e2.position), wt(e2, true, t), ii(e2, t, Co, false, true), _ = e2.result), p ? zr(e2, l, h, T, v, _, r, i, s) : a ? l.push(zr(e2, null, h, T, v, _, r, i, s)) : l.push(v), wt(e2, true, t), E = e2.input.charCodeAt(e2.position), E === 44 ? (n = true, E = e2.input.charCodeAt(++e2.position)) : n = false;
  }
  Te(e2, "unexpected end of the stream within a flow collection");
}
function Ug(e2, t) {
  var n, r, i = fs, s = false, o = false, l = t, u = 0, c = false, m, a;
  if (a = e2.input.charCodeAt(e2.position), a === 124)
    r = false;
  else if (a === 62)
    r = true;
  else
    return false;
  for (e2.kind = "scalar", e2.result = ""; a !== 0; )
    if (a = e2.input.charCodeAt(++e2.position), a === 43 || a === 45)
      fs === i ? i = a === 43 ? Bl : Og : Te(e2, "repeat of a chomping mode identifier");
    else if ((m = xg(a)) >= 0)
      m === 0 ? Te(e2, "bad explicit indentation width of a block scalar; it cannot be less than one") : o ? Te(e2, "repeat of an indentation width identifier") : (l = t + m - 1, o = true);
    else
      break;
  if ($r(a)) {
    do
      a = e2.input.charCodeAt(++e2.position);
    while ($r(a));
    if (a === 35)
      do
        a = e2.input.charCodeAt(++e2.position);
      while (!An(a) && a !== 0);
  }
  for (; a !== 0; ) {
    for (ma(e2), e2.lineIndent = 0, a = e2.input.charCodeAt(e2.position); (!o || e2.lineIndent < l) && a === 32; )
      e2.lineIndent++, a = e2.input.charCodeAt(++e2.position);
    if (!o && e2.lineIndent > l && (l = e2.lineIndent), An(a)) {
      u++;
      continue;
    }
    if (e2.lineIndent < l) {
      i === Bl ? e2.result += $t.repeat(`
`, s ? 1 + u : u) : i === fs && s && (e2.result += `
`);
      break;
    }
    for (r ? $r(a) ? (c = true, e2.result += $t.repeat(`
`, s ? 1 + u : u)) : c ? (c = false, e2.result += $t.repeat(`
`, u + 1)) : u === 0 ? s && (e2.result += " ") : e2.result += $t.repeat(`
`, u) : e2.result += $t.repeat(`
`, s ? 1 + u : u), s = true, o = true, u = 0, n = e2.position; !An(a) && a !== 0; )
      a = e2.input.charCodeAt(++e2.position);
    ir(e2, n, e2.position, false);
  }
  return true;
}
function Gl(e2, t) {
  var n, r = e2.tag, i = e2.anchor, s = [], o, l = false, u;
  if (e2.firstTabInLine !== -1)
    return false;
  for (e2.anchor !== null && (e2.anchorMap[e2.anchor] = s), u = e2.input.charCodeAt(e2.position); u !== 0 && (e2.firstTabInLine !== -1 && (e2.position = e2.firstTabInLine, Te(e2, "tab characters must not be used in indentation")), !(u !== 45 || (o = e2.input.charCodeAt(e2.position + 1), !Gt(o)))); ) {
    if (l = true, e2.position++, wt(e2, true, -1) && e2.lineIndent <= t) {
      s.push(null), u = e2.input.charCodeAt(e2.position);
      continue;
    }
    if (n = e2.line, ii(e2, t, Rd, false, true), s.push(e2.result), wt(e2, true, -1), u = e2.input.charCodeAt(e2.position), (e2.line === n || e2.lineIndent > t) && u !== 0)
      Te(e2, "bad indentation of a sequence entry");
    else if (e2.lineIndent < t)
      break;
  }
  return l ? (e2.tag = r, e2.anchor = i, e2.kind = "sequence", e2.result = s, true) : false;
}
function Bg(e2, t, n) {
  var r, i, s, o, l, u, c = e2.tag, m = e2.anchor, a = {}, d = /* @__PURE__ */ Object.create(null), p = null, h = null, v = null, T = false, _ = false, E;
  if (e2.firstTabInLine !== -1)
    return false;
  for (e2.anchor !== null && (e2.anchorMap[e2.anchor] = a), E = e2.input.charCodeAt(e2.position); E !== 0; ) {
    if (!T && e2.firstTabInLine !== -1 && (e2.position = e2.firstTabInLine, Te(e2, "tab characters must not be used in indentation")), r = e2.input.charCodeAt(e2.position + 1), s = e2.line, (E === 63 || E === 58) && Gt(r))
      E === 63 ? (T && (zr(e2, a, d, p, h, null, o, l, u), p = h = v = null), _ = true, T = true, i = true) : T ? (T = false, i = true) : Te(e2, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e2.position += 1, E = r;
    else {
      if (o = e2.line, l = e2.lineStart, u = e2.position, !ii(e2, n, Dd, false, true))
        break;
      if (e2.line === s) {
        for (E = e2.input.charCodeAt(e2.position); $r(E); )
          E = e2.input.charCodeAt(++e2.position);
        if (E === 58)
          E = e2.input.charCodeAt(++e2.position), Gt(E) || Te(e2, "a whitespace character is expected after the key-value separator within a block mapping"), T && (zr(e2, a, d, p, h, null, o, l, u), p = h = v = null), _ = true, T = false, i = false, p = e2.tag, h = e2.result;
        else if (_)
          Te(e2, "can not read an implicit mapping pair; a colon is missed");
        else
          return e2.tag = c, e2.anchor = m, true;
      } else if (_)
        Te(e2, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e2.tag = c, e2.anchor = m, true;
    }
    if ((e2.line === s || e2.lineIndent > t) && (T && (o = e2.line, l = e2.lineStart, u = e2.position), ii(e2, t, ko, true, i) && (T ? h = e2.result : v = e2.result), T || (zr(e2, a, d, p, h, v, o, l, u), p = h = v = null), wt(e2, true, -1), E = e2.input.charCodeAt(e2.position)), (e2.line === s || e2.lineIndent > t) && E !== 0)
      Te(e2, "bad indentation of a mapping entry");
    else if (e2.lineIndent < t)
      break;
  }
  return T && zr(e2, a, d, p, h, null, o, l, u), _ && (e2.tag = c, e2.anchor = m, e2.kind = "mapping", e2.result = a), _;
}
function qg(e2) {
  var t, n = false, r = false, i, s, o;
  if (o = e2.input.charCodeAt(e2.position), o !== 33)
    return false;
  if (e2.tag !== null && Te(e2, "duplication of a tag property"), o = e2.input.charCodeAt(++e2.position), o === 60 ? (n = true, o = e2.input.charCodeAt(++e2.position)) : o === 33 ? (r = true, i = "!!", o = e2.input.charCodeAt(++e2.position)) : i = "!", t = e2.position, n) {
    do
      o = e2.input.charCodeAt(++e2.position);
    while (o !== 0 && o !== 62);
    e2.position < e2.length ? (s = e2.input.slice(t, e2.position), o = e2.input.charCodeAt(++e2.position)) : Te(e2, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; o !== 0 && !Gt(o); )
      o === 33 && (r ? Te(e2, "tag suffix cannot contain exclamation marks") : (i = e2.input.slice(t - 1, e2.position + 1), Md.test(i) || Te(e2, "named tag handle cannot contain such characters"), r = true, t = e2.position + 1)), o = e2.input.charCodeAt(++e2.position);
    s = e2.input.slice(t, e2.position), Ig.test(s) && Te(e2, "tag suffix cannot contain flow indicator characters");
  }
  s && !Fd.test(s) && Te(e2, "tag name cannot contain such characters: " + s);
  try {
    s = decodeURIComponent(s);
  } catch {
    Te(e2, "tag name is malformed: " + s);
  }
  return n ? e2.tag = s : sr.call(e2.tagMap, i) ? e2.tag = e2.tagMap[i] + s : i === "!" ? e2.tag = "!" + s : i === "!!" ? e2.tag = "tag:yaml.org,2002:" + s : Te(e2, 'undeclared tag handle "' + i + '"'), true;
}
function Vg(e2) {
  var t, n;
  if (n = e2.input.charCodeAt(e2.position), n !== 38)
    return false;
  for (e2.anchor !== null && Te(e2, "duplication of an anchor property"), n = e2.input.charCodeAt(++e2.position), t = e2.position; n !== 0 && !Gt(n) && !Wr(n); )
    n = e2.input.charCodeAt(++e2.position);
  return e2.position === t && Te(e2, "name of an anchor node must contain at least one character"), e2.anchor = e2.input.slice(t, e2.position), true;
}
function Hg(e2) {
  var t, n, r;
  if (r = e2.input.charCodeAt(e2.position), r !== 42)
    return false;
  for (r = e2.input.charCodeAt(++e2.position), t = e2.position; r !== 0 && !Gt(r) && !Wr(r); )
    r = e2.input.charCodeAt(++e2.position);
  return e2.position === t && Te(e2, "name of an alias node must contain at least one character"), n = e2.input.slice(t, e2.position), sr.call(e2.anchorMap, n) || Te(e2, 'unidentified alias "' + n + '"'), e2.result = e2.anchorMap[n], wt(e2, true, -1), true;
}
function ii(e2, t, n, r, i) {
  var s, o, l, u = 1, c = false, m = false, a, d, p, h, v, T;
  if (e2.listener !== null && e2.listener("open", e2), e2.tag = null, e2.anchor = null, e2.kind = null, e2.result = null, s = o = l = ko === n || Rd === n, r && wt(e2, true, -1) && (c = true, e2.lineIndent > t ? u = 1 : e2.lineIndent === t ? u = 0 : e2.lineIndent < t && (u = -1)), u === 1)
    for (; qg(e2) || Vg(e2); )
      wt(e2, true, -1) ? (c = true, l = s, e2.lineIndent > t ? u = 1 : e2.lineIndent === t ? u = 0 : e2.lineIndent < t && (u = -1)) : l = false;
  if (l && (l = c || i), (u === 1 || ko === n) && (Co === n || Dd === n ? v = t : v = t + 1, T = e2.position - e2.lineStart, u === 1 ? l && (Gl(e2, T) || Bg(e2, T, v)) || Fg(e2, v) ? m = true : (o && Ug(e2, v) || Rg(e2, v) || Mg(e2, v) ? m = true : Hg(e2) ? (m = true, (e2.tag !== null || e2.anchor !== null) && Te(e2, "alias node should not have any properties")) : Dg(e2, v, Co === n) && (m = true, e2.tag === null && (e2.tag = "?")), e2.anchor !== null && (e2.anchorMap[e2.anchor] = e2.result)) : u === 0 && (m = l && Gl(e2, T))), e2.tag === null)
    e2.anchor !== null && (e2.anchorMap[e2.anchor] = e2.result);
  else if (e2.tag === "?") {
    for (e2.result !== null && e2.kind !== "scalar" && Te(e2, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e2.kind + '"'), a = 0, d = e2.implicitTypes.length; a < d; a += 1)
      if (h = e2.implicitTypes[a], h.resolve(e2.result)) {
        e2.result = h.construct(e2.result), e2.tag = h.tag, e2.anchor !== null && (e2.anchorMap[e2.anchor] = e2.result);
        break;
      }
  } else if (e2.tag !== "!") {
    if (sr.call(e2.typeMap[e2.kind || "fallback"], e2.tag))
      h = e2.typeMap[e2.kind || "fallback"][e2.tag];
    else
      for (h = null, p = e2.typeMap.multi[e2.kind || "fallback"], a = 0, d = p.length; a < d; a += 1)
        if (e2.tag.slice(0, p[a].tag.length) === p[a].tag) {
          h = p[a];
          break;
        }
    h || Te(e2, "unknown tag !<" + e2.tag + ">"), e2.result !== null && h.kind !== e2.kind && Te(e2, "unacceptable node kind for !<" + e2.tag + '> tag; it should be "' + h.kind + '", not "' + e2.kind + '"'), h.resolve(e2.result, e2.tag) ? (e2.result = h.construct(e2.result, e2.tag), e2.anchor !== null && (e2.anchorMap[e2.anchor] = e2.result)) : Te(e2, "cannot resolve a node with !<" + e2.tag + "> explicit tag");
  }
  return e2.listener !== null && e2.listener("close", e2), e2.tag !== null || e2.anchor !== null || m;
}
function Kg(e2) {
  var t = e2.position, n, r, i, s = false, o;
  for (e2.version = null, e2.checkLineBreaks = e2.legacy, e2.tagMap = /* @__PURE__ */ Object.create(null), e2.anchorMap = /* @__PURE__ */ Object.create(null); (o = e2.input.charCodeAt(e2.position)) !== 0 && (wt(e2, true, -1), o = e2.input.charCodeAt(e2.position), !(e2.lineIndent > 0 || o !== 37)); ) {
    for (s = true, o = e2.input.charCodeAt(++e2.position), n = e2.position; o !== 0 && !Gt(o); )
      o = e2.input.charCodeAt(++e2.position);
    for (r = e2.input.slice(n, e2.position), i = [], r.length < 1 && Te(e2, "directive name must not be less than one character in length"); o !== 0; ) {
      for (; $r(o); )
        o = e2.input.charCodeAt(++e2.position);
      if (o === 35) {
        do
          o = e2.input.charCodeAt(++e2.position);
        while (o !== 0 && !An(o));
        break;
      }
      if (An(o))
        break;
      for (n = e2.position; o !== 0 && !Gt(o); )
        o = e2.input.charCodeAt(++e2.position);
      i.push(e2.input.slice(n, e2.position));
    }
    o !== 0 && ma(e2), sr.call(Hl, r) ? Hl[r](e2, r, i) : Oo(e2, 'unknown document directive "' + r + '"');
  }
  if (wt(e2, true, -1), e2.lineIndent === 0 && e2.input.charCodeAt(e2.position) === 45 && e2.input.charCodeAt(e2.position + 1) === 45 && e2.input.charCodeAt(e2.position + 2) === 45 ? (e2.position += 3, wt(e2, true, -1)) : s && Te(e2, "directives end mark is expected"), ii(e2, e2.lineIndent - 1, ko, false, true), wt(e2, true, -1), e2.checkLineBreaks && Eg.test(e2.input.slice(t, e2.position)) && Oo(e2, "non-ASCII line breaks are interpreted as content"), e2.documents.push(e2.result), e2.position === e2.lineStart && Wo(e2)) {
    e2.input.charCodeAt(e2.position) === 46 && (e2.position += 3, wt(e2, true, -1));
    return;
  }
  if (e2.position < e2.length - 1)
    Te(e2, "end of the stream or a document separator is expected");
  else
    return;
}
function Vd(e2, t) {
  e2 = String(e2), t = t || {}, e2.length !== 0 && (e2.charCodeAt(e2.length - 1) !== 10 && e2.charCodeAt(e2.length - 1) !== 13 && (e2 += `
`), e2.charCodeAt(0) === 65279 && (e2 = e2.slice(1)));
  var n = new Lg(e2, t), r = e2.indexOf("\0");
  for (r !== -1 && (n.position = r, Te(n, "null byte is not allowed in input")), n.input += "\0"; n.input.charCodeAt(n.position) === 32; )
    n.lineIndent += 1, n.position += 1;
  for (; n.position < n.length - 1; )
    Kg(n);
  return n.documents;
}
function Gg(e2, t, n) {
  t !== null && typeof t == "object" && typeof n > "u" && (n = t, t = null);
  var r = Vd(e2, n);
  if (typeof t != "function")
    return r;
  for (var i = 0, s = r.length; i < s; i += 1)
    t(r[i]);
}
function Wg(e2, t) {
  var n = Vd(e2, t);
  if (n.length !== 0) {
    if (n.length === 1)
      return n[0];
    throw new Bt("expected a single document in the stream, but found more");
  }
}
var zg = Gg, Qg = Wg, Hd = {
  loadAll: zg,
  load: Qg
}, Kd = Object.prototype.toString, Gd = Object.prototype.hasOwnProperty, ya = 65279, Yg = 9, Fi = 10, Jg = 13, Xg = 32, Zg = 33, ev = 34, Ns = 35, tv = 37, nv = 38, rv = 39, iv = 42, Wd = 44, ov = 45, Ao = 58, sv = 61, av = 62, lv = 63, cv = 64, zd = 91, Qd = 93, uv = 96, Yd = 123, dv = 124, Jd = 125, Rt = {};
Rt[0] = "\\0";
Rt[7] = "\\a";
Rt[8] = "\\b";
Rt[9] = "\\t";
Rt[10] = "\\n";
Rt[11] = "\\v";
Rt[12] = "\\f";
Rt[13] = "\\r";
Rt[27] = "\\e";
Rt[34] = '\\"';
Rt[92] = "\\\\";
Rt[133] = "\\N";
Rt[160] = "\\_";
Rt[8232] = "\\L";
Rt[8233] = "\\P";
var fv = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
], pv = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function mv(e2, t) {
  var n, r, i, s, o, l, u;
  if (t === null)
    return {};
  for (n = {}, r = Object.keys(t), i = 0, s = r.length; i < s; i += 1)
    o = r[i], l = String(t[o]), o.slice(0, 2) === "!!" && (o = "tag:yaml.org,2002:" + o.slice(2)), u = e2.compiledTypeMap.fallback[o], u && Gd.call(u.styleAliases, l) && (l = u.styleAliases[l]), n[o] = l;
  return n;
}
function hv(e2) {
  var t, n, r;
  if (t = e2.toString(16).toUpperCase(), e2 <= 255)
    n = "x", r = 2;
  else if (e2 <= 65535)
    n = "u", r = 4;
  else if (e2 <= 4294967295)
    n = "U", r = 8;
  else
    throw new Bt("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + n + $t.repeat("0", r - t.length) + t;
}
var yv = 1, Ui = 2;
function gv(e2) {
  this.schema = e2.schema || pa, this.indent = Math.max(1, e2.indent || 2), this.noArrayIndent = e2.noArrayIndent || false, this.skipInvalid = e2.skipInvalid || false, this.flowLevel = $t.isNothing(e2.flowLevel) ? -1 : e2.flowLevel, this.styleMap = mv(this.schema, e2.styles || null), this.sortKeys = e2.sortKeys || false, this.lineWidth = e2.lineWidth || 80, this.noRefs = e2.noRefs || false, this.noCompatMode = e2.noCompatMode || false, this.condenseFlow = e2.condenseFlow || false, this.quotingType = e2.quotingType === '"' ? Ui : yv, this.forceQuotes = e2.forceQuotes || false, this.replacer = typeof e2.replacer == "function" ? e2.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function Wl(e2, t) {
  for (var n = $t.repeat(" ", t), r = 0, i = -1, s = "", o, l = e2.length; r < l; )
    i = e2.indexOf(`
`, r), i === -1 ? (o = e2.slice(r), r = l) : (o = e2.slice(r, i + 1), r = i + 1), o.length && o !== `
` && (s += n), s += o;
  return s;
}
function xs(e2, t) {
  return `
` + $t.repeat(" ", e2.indent * t);
}
function vv(e2, t) {
  var n, r, i;
  for (n = 0, r = e2.implicitTypes.length; n < r; n += 1)
    if (i = e2.implicitTypes[n], i.resolve(t))
      return true;
  return false;
}
function Eo(e2) {
  return e2 === Xg || e2 === Yg;
}
function Bi(e2) {
  return 32 <= e2 && e2 <= 126 || 161 <= e2 && e2 <= 55295 && e2 !== 8232 && e2 !== 8233 || 57344 <= e2 && e2 <= 65533 && e2 !== ya || 65536 <= e2 && e2 <= 1114111;
}
function zl(e2) {
  return Bi(e2) && e2 !== ya && e2 !== Jg && e2 !== Fi;
}
function Ql(e2, t, n) {
  var r = zl(e2), i = r && !Eo(e2);
  return (
    // ns-plain-safe
    (n ? (
      // c = flow-in
      r
    ) : r && e2 !== Wd && e2 !== zd && e2 !== Qd && e2 !== Yd && e2 !== Jd) && e2 !== Ns && !(t === Ao && !i) || zl(t) && !Eo(t) && e2 === Ns || t === Ao && i
  );
}
function _v(e2) {
  return Bi(e2) && e2 !== ya && !Eo(e2) && e2 !== ov && e2 !== lv && e2 !== Ao && e2 !== Wd && e2 !== zd && e2 !== Qd && e2 !== Yd && e2 !== Jd && e2 !== Ns && e2 !== nv && e2 !== iv && e2 !== Zg && e2 !== dv && e2 !== sv && e2 !== av && e2 !== rv && e2 !== ev && e2 !== tv && e2 !== cv && e2 !== uv;
}
function bv(e2) {
  return !Eo(e2) && e2 !== Ao;
}
function Ti(e2, t) {
  var n = e2.charCodeAt(t), r;
  return n >= 55296 && n <= 56319 && t + 1 < e2.length && (r = e2.charCodeAt(t + 1), r >= 56320 && r <= 57343) ? (n - 55296) * 1024 + r - 56320 + 65536 : n;
}
function Xd(e2) {
  var t = /^\n* /;
  return t.test(e2);
}
var Zd = 1, js = 2, ef = 3, tf = 4, Vr = 5;
function Tv(e2, t, n, r, i, s, o, l) {
  var u, c = 0, m = null, a = false, d = false, p = r !== -1, h = -1, v = _v(Ti(e2, 0)) && bv(Ti(e2, e2.length - 1));
  if (t || o)
    for (u = 0; u < e2.length; c >= 65536 ? u += 2 : u++) {
      if (c = Ti(e2, u), !Bi(c))
        return Vr;
      v = v && Ql(c, m, l), m = c;
    }
  else {
    for (u = 0; u < e2.length; c >= 65536 ? u += 2 : u++) {
      if (c = Ti(e2, u), c === Fi)
        a = true, p && (d = d || // Foldable line = too long, and not more-indented.
        u - h - 1 > r && e2[h + 1] !== " ", h = u);
      else if (!Bi(c))
        return Vr;
      v = v && Ql(c, m, l), m = c;
    }
    d = d || p && u - h - 1 > r && e2[h + 1] !== " ";
  }
  return !a && !d ? v && !o && !i(e2) ? Zd : s === Ui ? Vr : js : n > 9 && Xd(e2) ? Vr : o ? s === Ui ? Vr : js : d ? tf : ef;
}
function Sv(e2, t, n, r, i) {
  e2.dump = function() {
    if (t.length === 0)
      return e2.quotingType === Ui ? '""' : "''";
    if (!e2.noCompatMode && (fv.indexOf(t) !== -1 || pv.test(t)))
      return e2.quotingType === Ui ? '"' + t + '"' : "'" + t + "'";
    var s = e2.indent * Math.max(1, n), o = e2.lineWidth === -1 ? -1 : Math.max(Math.min(e2.lineWidth, 40), e2.lineWidth - s), l = r || e2.flowLevel > -1 && n >= e2.flowLevel;
    function u(c) {
      return vv(e2, c);
    }
    switch (Tv(
      t,
      l,
      e2.indent,
      o,
      u,
      e2.quotingType,
      e2.forceQuotes && !r,
      i
    )) {
      case Zd:
        return t;
      case js:
        return "'" + t.replace(/'/g, "''") + "'";
      case ef:
        return "|" + Yl(t, e2.indent) + Jl(Wl(t, s));
      case tf:
        return ">" + Yl(t, e2.indent) + Jl(Wl(wv(t, o), s));
      case Vr:
        return '"' + $v(t) + '"';
      default:
        throw new Bt("impossible error: invalid scalar style");
    }
  }();
}
function Yl(e2, t) {
  var n = Xd(e2) ? String(t) : "", r = e2[e2.length - 1] === `
`, i = r && (e2[e2.length - 2] === `
` || e2 === `
`), s = i ? "+" : r ? "" : "-";
  return n + s + `
`;
}
function Jl(e2) {
  return e2[e2.length - 1] === `
` ? e2.slice(0, -1) : e2;
}
function wv(e2, t) {
  for (var n = /(\n+)([^\n]*)/g, r = function() {
    var c = e2.indexOf(`
`);
    return c = c !== -1 ? c : e2.length, n.lastIndex = c, Xl(e2.slice(0, c), t);
  }(), i = e2[0] === `
` || e2[0] === " ", s, o; o = n.exec(e2); ) {
    var l = o[1], u = o[2];
    s = u[0] === " ", r += l + (!i && !s && u !== "" ? `
` : "") + Xl(u, t), i = s;
  }
  return r;
}
function Xl(e2, t) {
  if (e2 === "" || e2[0] === " ")
    return e2;
  for (var n = / [^ ]/g, r, i = 0, s, o = 0, l = 0, u = ""; r = n.exec(e2); )
    l = r.index, l - i > t && (s = o > i ? o : l, u += `
` + e2.slice(i, s), i = s + 1), o = l;
  return u += `
`, e2.length - i > t && o > i ? u += e2.slice(i, o) + `
` + e2.slice(o + 1) : u += e2.slice(i), u.slice(1);
}
function $v(e2) {
  for (var t = "", n = 0, r, i = 0; i < e2.length; n >= 65536 ? i += 2 : i++)
    n = Ti(e2, i), r = Rt[n], !r && Bi(n) ? (t += e2[i], n >= 65536 && (t += e2[i + 1])) : t += r || hv(n);
  return t;
}
function Cv(e2, t, n) {
  var r = "", i = e2.tag, s, o, l;
  for (s = 0, o = n.length; s < o; s += 1)
    l = n[s], e2.replacer && (l = e2.replacer.call(n, String(s), l)), (Hn(e2, t, l, false, false) || typeof l > "u" && Hn(e2, t, null, false, false)) && (r !== "" && (r += "," + (e2.condenseFlow ? "" : " ")), r += e2.dump);
  e2.tag = i, e2.dump = "[" + r + "]";
}
function Zl(e2, t, n, r) {
  var i = "", s = e2.tag, o, l, u;
  for (o = 0, l = n.length; o < l; o += 1)
    u = n[o], e2.replacer && (u = e2.replacer.call(n, String(o), u)), (Hn(e2, t + 1, u, true, true, false, true) || typeof u > "u" && Hn(e2, t + 1, null, true, true, false, true)) && ((!r || i !== "") && (i += xs(e2, t)), e2.dump && Fi === e2.dump.charCodeAt(0) ? i += "-" : i += "- ", i += e2.dump);
  e2.tag = s, e2.dump = i || "[]";
}
function kv(e2, t, n) {
  var r = "", i = e2.tag, s = Object.keys(n), o, l, u, c, m;
  for (o = 0, l = s.length; o < l; o += 1)
    m = "", r !== "" && (m += ", "), e2.condenseFlow && (m += '"'), u = s[o], c = n[u], e2.replacer && (c = e2.replacer.call(n, u, c)), Hn(e2, t, u, false, false) && (e2.dump.length > 1024 && (m += "? "), m += e2.dump + (e2.condenseFlow ? '"' : "") + ":" + (e2.condenseFlow ? "" : " "), Hn(e2, t, c, false, false) && (m += e2.dump, r += m));
  e2.tag = i, e2.dump = "{" + r + "}";
}
function Ov(e2, t, n, r) {
  var i = "", s = e2.tag, o = Object.keys(n), l, u, c, m, a, d;
  if (e2.sortKeys === true)
    o.sort();
  else if (typeof e2.sortKeys == "function")
    o.sort(e2.sortKeys);
  else if (e2.sortKeys)
    throw new Bt("sortKeys must be a boolean or a function");
  for (l = 0, u = o.length; l < u; l += 1)
    d = "", (!r || i !== "") && (d += xs(e2, t)), c = o[l], m = n[c], e2.replacer && (m = e2.replacer.call(n, c, m)), Hn(e2, t + 1, c, true, true, true) && (a = e2.tag !== null && e2.tag !== "?" || e2.dump && e2.dump.length > 1024, a && (e2.dump && Fi === e2.dump.charCodeAt(0) ? d += "?" : d += "? "), d += e2.dump, a && (d += xs(e2, t)), Hn(e2, t + 1, m, true, a) && (e2.dump && Fi === e2.dump.charCodeAt(0) ? d += ":" : d += ": ", d += e2.dump, i += d));
  e2.tag = s, e2.dump = i || "{}";
}
function ec(e2, t, n) {
  var r, i, s, o, l, u;
  for (i = n ? e2.explicitTypes : e2.implicitTypes, s = 0, o = i.length; s < o; s += 1)
    if (l = i[s], (l.instanceOf || l.predicate) && (!l.instanceOf || typeof t == "object" && t instanceof l.instanceOf) && (!l.predicate || l.predicate(t))) {
      if (n ? l.multi && l.representName ? e2.tag = l.representName(t) : e2.tag = l.tag : e2.tag = "?", l.represent) {
        if (u = e2.styleMap[l.tag] || l.defaultStyle, Kd.call(l.represent) === "[object Function]")
          r = l.represent(t, u);
        else if (Gd.call(l.represent, u))
          r = l.represent[u](t, u);
        else
          throw new Bt("!<" + l.tag + '> tag resolver accepts not "' + u + '" style');
        e2.dump = r;
      }
      return true;
    }
  return false;
}
function Hn(e2, t, n, r, i, s, o) {
  e2.tag = null, e2.dump = n, ec(e2, n, false) || ec(e2, n, true);
  var l = Kd.call(e2.dump), u = r, c;
  r && (r = e2.flowLevel < 0 || e2.flowLevel > t);
  var m = l === "[object Object]" || l === "[object Array]", a, d;
  if (m && (a = e2.duplicates.indexOf(n), d = a !== -1), (e2.tag !== null && e2.tag !== "?" || d || e2.indent !== 2 && t > 0) && (i = false), d && e2.usedDuplicates[a])
    e2.dump = "*ref_" + a;
  else {
    if (m && d && !e2.usedDuplicates[a] && (e2.usedDuplicates[a] = true), l === "[object Object]")
      r && Object.keys(e2.dump).length !== 0 ? (Ov(e2, t, e2.dump, i), d && (e2.dump = "&ref_" + a + e2.dump)) : (kv(e2, t, e2.dump), d && (e2.dump = "&ref_" + a + " " + e2.dump));
    else if (l === "[object Array]")
      r && e2.dump.length !== 0 ? (e2.noArrayIndent && !o && t > 0 ? Zl(e2, t - 1, e2.dump, i) : Zl(e2, t, e2.dump, i), d && (e2.dump = "&ref_" + a + e2.dump)) : (Cv(e2, t, e2.dump), d && (e2.dump = "&ref_" + a + " " + e2.dump));
    else if (l === "[object String]")
      e2.tag !== "?" && Sv(e2, e2.dump, t, s, u);
    else {
      if (l === "[object Undefined]")
        return false;
      if (e2.skipInvalid)
        return false;
      throw new Bt("unacceptable kind of an object to dump " + l);
    }
    e2.tag !== null && e2.tag !== "?" && (c = encodeURI(
      e2.tag[0] === "!" ? e2.tag.slice(1) : e2.tag
    ).replace(/!/g, "%21"), e2.tag[0] === "!" ? c = "!" + c : c.slice(0, 18) === "tag:yaml.org,2002:" ? c = "!!" + c.slice(18) : c = "!<" + c + ">", e2.dump = c + " " + e2.dump);
  }
  return true;
}
function Av(e2, t) {
  var n = [], r = [], i, s;
  for (Ls(e2, n, r), i = 0, s = r.length; i < s; i += 1)
    t.duplicates.push(n[r[i]]);
  t.usedDuplicates = new Array(s);
}
function Ls(e2, t, n) {
  var r, i, s;
  if (e2 !== null && typeof e2 == "object")
    if (i = t.indexOf(e2), i !== -1)
      n.indexOf(i) === -1 && n.push(i);
    else if (t.push(e2), Array.isArray(e2))
      for (i = 0, s = e2.length; i < s; i += 1)
        Ls(e2[i], t, n);
    else
      for (r = Object.keys(e2), i = 0, s = r.length; i < s; i += 1)
        Ls(e2[r[i]], t, n);
}
function Ev(e2, t) {
  t = t || {};
  var n = new gv(t);
  n.noRefs || Av(e2, n);
  var r = e2;
  return n.replacer && (r = n.replacer.call({ "": r }, "", r)), Hn(n, 0, r, true, true) ? n.dump + `
` : "";
}
var Iv = Ev, Pv = {
  dump: Iv
};
function ga(e2, t) {
  return function() {
    throw new Error("Function yaml." + e2 + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default.");
  };
}
var Nv = It, xv = gd, jv = Td, Lv = kd, Dv = Od, Rv = pa, Mv = Hd.load, Fv = Hd.loadAll, Uv = Pv.dump, Bv = Bt, qv = {
  binary: Nd,
  float: Cd,
  map: bd,
  null: Sd,
  pairs: jd,
  set: Ld,
  timestamp: Id,
  bool: wd,
  int: $d,
  merge: Pd,
  omap: xd,
  seq: _d,
  str: vd
}, Vv = ga("safeLoad", "load"), Hv = ga("safeLoadAll", "loadAll"), Kv = ga("safeDump", "dump"), Gv = {
  Type: Nv,
  Schema: xv,
  FAILSAFE_SCHEMA: jv,
  JSON_SCHEMA: Lv,
  CORE_SCHEMA: Dv,
  DEFAULT_SCHEMA: Rv,
  load: Mv,
  loadAll: Fv,
  dump: Uv,
  YAMLException: Bv,
  types: qv,
  safeLoad: Vv,
  safeLoadAll: Hv,
  safeDump: Kv
};
function va(e2) {
  return new Promise((t, n) => {
    const r = new XMLHttpRequest();
    r.onload = function() {
      r.status >= 200 && r.status < 300 ? t(r.responseText) : (ue(`Failed to load file ${e2}`, r.status), n(r.status));
    }, r.open("GET", e2), r.send();
  });
}
async function zo(e2) {
  try {
    const t = await va(e2);
    let n;
    if (e2.endsWith(".json"))
      n = JSON.parse(t);
    else if (e2.endsWith(".yaml"))
      n = Gv.load(t);
    else {
      const r = `Unsupported file type for data file ${e2} (must be .json or .yaml)`;
      throw new Error(r);
    }
    if (!n)
      throw new Error(`Data loaded from ${e2} is empty`);
    return n;
  } catch (t) {
    throw console.error(`Failed to load data file ${e2}: ${t}`), t;
  }
}
const Wv = (e2, t) => {
  const n = {};
  for (const r in e2)
    n[r] = t(e2[r]);
  return n;
}, nf = (e2, t) => {
  for (const n in e2) {
    const r = e2[n];
    t(r, n, e2), typeof r == "object" && r !== null && nf(r, t);
  }
}, gr = {};
async function zv(e2) {
  return gr[e2] ? gr[e2] : rf(e2, e2);
}
async function Qv(e2) {
  fn.log("Loading images");
  const t = [], n = async (i, s) => await rf(i, s), r = (i, s) => {
    t.push(n(i, s));
  };
  for (const i in e2.common.images) {
    const s = e2.common.images[i];
    r(i, s);
  }
  if (e2.preload.images)
    for (const i in e2.preload.images.assets) {
      const s = e2.preload.images.assets[i];
      r(i, s);
    }
  for (const i in e2.screens.screens) {
    const s = e2.screens.screens[i];
    if (s.background && !e2.common.images[s.background] && !s.video && r(s.background, s.background), s.buttons)
      for (const o in s.buttons) {
        const l = s.buttons[o];
        typeof l == "object" && l.background && !e2.common.images[l.background] && r(l.background, l.background);
      }
  }
  return Promise.all(t);
}
async function rf(e2, t) {
  if (gr[e2])
    return gr[e2];
  if (t === Ko) {
    const r = new Image();
    return gr[e2] = r, r;
  }
  const n = new Promise((r, i) => {
    const s = new Image();
    s.onload = () => {
      gr[e2] = s, r(s);
    }, s.onerror = (o) => {
      ue(`Failed to load image ${e2} at ${t}`, o), i(o);
    }, s.src = Wt(t);
  });
  return gr[e2] = n, n;
}
const yo = {};
function Yv(e2) {
  return yo[e2] ?? {};
}
function tc(e2, t, n) {
  const r = Yv(e2.transition), i = e2.duration ?? r.duration ?? 500, s = e2.delay ?? r.delay ?? 0;
  return {
    ...e2,
    resolve: n,
    duration: i,
    delay: s,
    oldScreen: t
  };
}
const qt = bt("notifications", {
  state: () => ({ notifications: [], enabled: true }),
  actions: {
    async addNotification(e2, t, n) {
      if (!this.enabled)
        return;
      e2 = Vn(e2);
      const r = `${Date.now()}-${Math.random() * 1e4}`;
      this.notifications.push({
        id: r,
        text: e2,
        description: t,
        icon: n
      }), de().notifications.alsoPrintInDialogue && md(`[NOTIFICATION] ${e2}`), await Kt(de().notifications.timeOnScreen * 1e3), this.deleteNotification(r);
    },
    deleteNotification(e2) {
      const t = this.findNotifications(e2);
      t && this.notifications.splice(this.notifications.indexOf(t), 1);
    },
    findNotifications(e2) {
      return this.notifications.find((t) => t.id === e2);
    },
    disableNotifications() {
      this.enabled = false;
      for (const e2 in this.notifications)
        this.deleteNotification(e2);
    },
    enableNotifications() {
      this.enabled = true;
    }
  }
}), Dt = bt("inventory", {
  state: () => ({
    items: {},
    interactionTags: {}
  }),
  actions: {
    generateSaveData() {
      return {
        items: ze(this.items),
        interactionTags: ze(this.interactionTags)
      };
    },
    loadSaveData(e2) {
      this.items = { ...this.items, ...e2.items }, this.interactionTags = { ...e2.interactionTags };
    },
    updateConfig(e2) {
      Object.keys(e2.items).forEach((t) => {
        this.items[t] || (this.items[t] = {
          amount: 0,
          id: t
        });
      });
    },
    reset(e2) {
      this.$reset(), this.updateConfig(e2);
    },
    hasItem(e2, t) {
      var n;
      return t || (t = 1), ((n = this.items[e2]) == null ? void 0 : n.amount) >= t;
    },
    getExistingItem(e2) {
      return this.items[e2];
    },
    getItemAmount(e2) {
      var t;
      return ((t = this.getExistingItem(e2)) == null ? void 0 : t.amount) || 0;
    },
    add(e2) {
      const t = this.getExistingItem(e2.id);
      t ? t.amount += e2.amount : this.items[e2.id] = { ...e2 };
      const n = wn(e2.id).name, r = e2.amount > 1 ? `${n} x ${e2.amount}` : n;
      qt().addNotification(`Received item: ${r}`);
    },
    enableInteraction(e2) {
      e2 || (e2 = "default"), this.interactionTags[e2] = {
        blockedInteraction: false
      };
    },
    disableInteraction(e2) {
      e2 || (e2 = "default"), this.interactionTags[e2] = {
        blockedInteraction: true
      };
    },
    onScriptStart() {
      const e2 = de().interactionTags;
      Object.keys(e2).forEach((t) => {
        e2[t].onlyInteractOutsideOfScripts && this.disableInteraction(t);
      });
    },
    onScriptEnd() {
      const e2 = de().interactionTags;
      Object.keys(e2).forEach((t) => {
        e2[t].onlyInteractOutsideOfScripts && this.enableInteraction(t);
      });
    },
    isInteractionTagBlocked(e2) {
      return e2 || (e2 = "default"), this.interactionTags[e2] ? this.interactionTags[e2].blockedInteraction : false;
    },
    remove(e2) {
      const t = this.getExistingItem(e2.id);
      t && (t.amount -= e2.amount, qt().addNotification(
        `Lost item: ${wn(e2.id).name} x ${e2.amount}`
      ), t.amount <= 0 && this.deleteItem(e2.id));
    },
    deleteItem(e2) {
      this.getExistingItem(e2) && (this.items[e2].amount = 0);
    },
    canUseItem(e2) {
      var n;
      const t = wn(e2.id);
      return !!(t && t.onUse && !this.isInteractionTagBlocked(t.tag) && !((n = Ye().currentDialog) != null && n.choices));
    },
    useItem(e2) {
      let t = false;
      const n = wn(e2.id);
      if (e2 && this.canUseItem(e2) && n) {
        const r = n.onUse;
        t = true, Er("onItemUsed"), r.action === "jump" ? Ie().jumpToLabel(r.label) : r.action === "run" ? Ie().runThenGoBackToPreviousDialog(r.label, true) : (t = false, ue(`Unknown action ${r.action}`));
      }
      return t;
    }
  }
}), Jv = () => ({
  layers: [
    {
      screen: "default"
    }
  ],
  buttons: {}
}), pn = bt("screens", {
  state: Jv,
  actions: {
    setScreen(e2, t, n) {
      return new Promise((r) => {
        const i = this.layers[t || 0];
        let s;
        const o = (i == null ? void 0 : i.screen) ?? null;
        if (o === e2) {
          r();
          return;
        }
        n && (s = tc(
          n,
          o,
          r
        )), this.layers[t || 0] = {
          screen: e2,
          transition: s
        }, s || r();
      });
    },
    finishTransition(e2) {
      const t = this.layers[e2];
      if (!t)
        ue(
          `Tried to finish transition on layer ${e2} but it doesn't exist`
        );
      else if (t.transition) {
        const n = t.transition.resolve;
        delete t.transition, n();
      }
    },
    transitionScreen(e2, t, n) {
      return this.setScreen(e2, n ?? 0, t);
    },
    emptyLayer(e2, t) {
      return new Promise((n) => {
        const r = this.layers[e2];
        if (!r) {
          li(`Tried to empty layer ${e2} but it doesn't exist`);
          return;
        }
        if (t) {
          const i = r.screen, s = tc(
            t,
            i,
            n
          );
          r.transition = s;
        }
        r.screen = "@empty", t || n();
      });
    },
    updateConfig(e2) {
      console.log("update config!");
      const t = et().buttons.buttons;
      for (const n in t)
        this.buttons[n] || (this.buttons[n] = {
          state: t[n].enabled
        });
    },
    reset(e2) {
      this.$reset(), this.updateConfig(e2);
    },
    changeButton(e2, t) {
      if (!this.buttons[e2]) {
        ue(`Tried to change button ${e2} but it doesn't exist`);
        return;
      }
      this.buttons[e2].state = t;
    },
    generateSaveData() {
      return {
        layers: ze(this.layers).filter((e2) => e2).map((e2) => e2.screen ?? null),
        buttons: ze(this.buttons)
      };
    },
    loadSaveData(e2) {
      this.layers = e2.layers.map((t) => (t !== null && typeof t != "string" && (t = null), { screen: t })), this.buttons = Ir(this.buttons, e2.buttons);
    },
    isButtonDisabled(e2) {
      const t = this.getButtonState(e2);
      return t === "hidden" || t === "greyed" || t === false;
    },
    isButtonInteractible(e2) {
      const t = this.getButtonState(e2);
      return t ? t === true : false;
    },
    isButtonClickable(e2) {
      if (!this.isButtonInteractible(e2))
        return false;
      const n = kr(e2);
      return !!Qo(n);
    },
    getButtonState(e2) {
      const t = kr(e2), n = this.buttons[e2], r = t.tag || "default", i = n.state;
      return i === true && Dt().isInteractionTagBlocked(r) ? "greyed" : i;
    },
    clickOnButton(e2) {
      if (!this.isButtonClickable(e2))
        return;
      const t = Ie(), n = kr(e2);
      Er("onButtonClicked");
      const r = n.action;
      r && (n.actionType === "run" ? t.runLabelFunction(r) : t.jumpToLabel(r));
    }
  },
  getters: {
    nonEmptyLayers(e2) {
      return e2.layers.filter((t) => t);
    },
    isTransitioning(e2) {
      return e2.layers.some((t) => t == null ? void 0 : t.transition);
    }
  }
});
function Qo(e2) {
  if (!ke().inScript)
    return true;
  const t = dl().clickableDuringScriptsByDefault;
  if (t)
    return e2.scriptClickable !== false;
  if (!t)
    return e2.scriptClickable === true;
}
const Xv = ["screenObject", "sprite"];
function nc(e2) {
  return typeof e2 == "object" && e2 !== null && Xv.includes(e2._entityType);
}
function Zv(e2) {
  return typeof e2 == "object" && e2 !== null && e2._entityType === "sprite";
}
function e_(e2) {
  if (e2.includes(" ")) {
    const t = e2.split(" ");
    return {
      label: t[0],
      args: t.slice(1)
    };
  } else
    return {
      label: e2
    };
}
const on = bt("screenObjects", {
  state: () => ({
    tree: [],
    objectsList: {}
  }),
  actions: {
    addObject(e2) {
      e2.parent ? e2.parent.children.push(e2) : this.tree.push(e2), this.objectsList[e2.id] = e2;
    },
    createObject(e2) {
      const t = {
        _entityType: "screenObject",
        id: ti(),
        name: "Screen Object",
        tags: [],
        x: 0,
        y: 0,
        anchor: {
          x: 0,
          y: 0
        },
        width: 1,
        height: 1,
        opacity: 1,
        scale: 1,
        layer: 0,
        children: [],
        ...e2
      };
      return this.addObject(t), t;
    },
    destroyObject(e2) {
      let t = e2;
      typeof t == "string" && (t = this.getObject(t));
      for (let n = t.children.length - 1; n >= 0; n--)
        this.destroyObject(t.children[n]);
      if (t.parent) {
        const n = t.parent, r = n.children.indexOf(t);
        r !== -1 ? n.children.splice(r, 1) : console.warn(
          `Could not find object ${t.id} in parent's children`
        );
      } else {
        const n = this.tree.indexOf(t);
        n !== -1 ? this.tree.splice(n, 1) : console.warn(`Object to destroy not found in store (${t.id})`);
      }
      delete this.objectsList[t.id];
    },
    createSprite(e2) {
      const t = this.createObject(e2);
      return t._entityType = "sprite", zv(e2.image).then((n) => {
        const r = this.getObject(t.id);
        r.width === 1 && r.height === 1 && (r.width = n.width, r.height = n.height);
      }), t;
    },
    getObject(e2) {
      return this.objectsList[e2];
    },
    isScreenObjectClickable(e2) {
      return Qo(e2) ? !!e2.onClick : false;
    },
    clickObject(e2) {
      if (this.isScreenObjectClickable(e2) && e2.onClick) {
        Er("onSpriteClicked");
        let t;
        if (typeof e2.onClick == "string") {
          const n = e_(e2.onClick);
          t = {
            label: n.label,
            args: n.args
          };
        } else
          t = e2.onClick;
        t.method = t.method ?? e2.clickMethod ?? "jump", t.args = t.args ?? [], t.method === "run" ? Ie().runThenGoBackToPreviousDialog(
          t.label,
          ...t.args
        ) : t.method === "jump" ? Ie().jumpToLabel(t.label, ...t.args) : ue(`Unknown sprite click method ${e2.clickMethod}`);
      }
    },
    // Turns objects into objects with string references
    generateSaveData() {
      return {
        tree: ze(this.tree.map((e2) => e2.id)),
        objectsList: ze(
          Wv(this.objectsList, (e2) => this.screenObjectToSave(e2))
        )
      };
    },
    // Loads save data where objects have string references, populating them
    loadSaveData(e2) {
      this.objectsList = this.loadAllObjects(e2.objectsList), this.tree = e2.tree.map((t) => this.objectsList[t]);
    },
    reset() {
      this.$reset();
    },
    // Removes references from objects and turn them to string id refs
    screenObjectToSave(e2) {
      return {
        ...e2,
        children: e2.children.map((t) => t.id),
        parent: e2.parent ? e2.parent.id : void 0
      };
    },
    // Takes saved data objects (which only have string references) and populate references
    loadAllObjects(e2) {
      for (const t of Object.values(e2)) {
        const n = t;
        n.parent = n.parent ? e2[n.parent] : void 0, n.children = n.children.map((r) => e2[r]);
      }
      return e2;
    },
    emptyLayer(e2) {
      for (let t = this.tree.length - 1; t >= 0; t--) {
        const n = this.tree[t];
        n.layer === e2 && this.destroyObject(n);
      }
    },
    emptyAllLayers() {
      for (let e2 = this.tree.length - 1; e2 >= 0; e2--) {
        const t = this.tree[e2];
        this.destroyObject(t);
      }
    }
  }
});
function of(e2) {
  return "save" in e2;
}
function sf(e2) {
  return "globalSave" in e2;
}
function t_(e2) {
  return "config" in e2;
}
const n_ = defineComponent({
  props: {
    percentage: Number,
    step: String
  },
  methods: {
    loadingStyle() {
      return {
        width: `${this.percentage * 60}vw`
      };
    }
  },
  computed: {}
}), r_ = { id: "loading-bar" }, i_ = { id: "loading-text" };
function o_(e2, t, n, r, i, s) {
  return openBlock(), createElementBlock("div", r_, [
    createElementVNode("div", {
      id: "inner-loading-bar",
      style: normalizeStyle(e2.loadingStyle())
    }, null, 4),
    createElementVNode("div", i_, [
      createElementVNode("h3", null, "Loading " + toDisplayString(Math.floor(e2.percentage * 100)) + "% - " + toDisplayString(e2.step), 1)
    ])
  ]);
}
const s_ = /* @__PURE__ */ hn(n_, [["render", o_]]), a_ = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2019.0.0,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version='1.1'%20id='Rat'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%20595.3%20595.3'%20style='enable-background:new%200%200%20595.3%20595.3;'%20xml:space='preserve'%3e%3cstyle%20type='text/css'%3e%20.st0{fill:%23E23B33;}%20%3c/style%3e%3cpath%20id='Rat_Shape'%20class='st0'%20d='M556.9,82.5c-10.8-24.3-47-57.1-71.3-65.6c-24.3-8.4-64.1-0.3-88.7,22.3%20c-20,18.4-26,28.2-29.1,37c-2.1,5.9-4.8,13.5-6,20.9v0c-0.5,4.1-4.5,7-8.6,6.1c-10.4-2.3-29.5-6-44.4-6.3%20c-13.7-0.2-30.1,3.2-40.4,5.7c-4.5,1.1-8.8-2.2-8.8-6.8c-0.1-5.3-1.1-12.3-4.8-19.6c-8.5-16.9-19.6-32.6-57.8-47.4%20c-31.9-12.4-75.1-9.7-100.8,1.8c-28.1,12.6-42.4,37.9-54,61.8c-14.4,29.8-14.9,83.6-6.4,104c12.8,30.7,35.8,47.2,52.6,53%20c11.3,3.8,28.2,3.7,38.2,3.3c4.2-0.2,7.7,3.3,7.5,7.5c-0.7,13.6-0.9,41.5,7,61.4c7.7,19.4,29.7,62.3,50.7,101.2%20c0,0.1-14.6,2.9-31.4,6.8c-23.9,5.5-52.6,12.7-54.3,13.7c-3.5,2.1-3,10-2.7,12c0.5,3.4,5.3,8.1,6.9,8.3c3.9,0.3,31.3-7.6,55.7-14.6%20c18.5-5.3,34.9-9.3,35.5-8.2c5.1,9.3,10,18,14.4,25.8c5.2,9.1,10.7,16.4,14.1,23.6c1.1,2.3-16.6,5.8-32.5,14.7%20c-16.4,9.1-29.7,21-32.3,24c-1.8,2.1-3,6-1.2,10.7c1.1,2.9,10,5.7,12.4,5.1c6.8-1.7,16.5-12.5,33.1-21.1%20c16.3-8.5,32.9-14.9,33.8-13.6c9.7,14.3,16.9,21.6,22.6,31.2c9.8,16.5,27.3,45.9,46.6,39.5c6.4-2.1,31.1-33.6,53.3-68.6%20c1.3-2.1,16.1,11.3,30.4,23.2c13.8,11.4,22.7,20.6,27.1,21.4c5.4,1,14.2-7.7,14.1-14.7c-0.1-2.7-14.3-13.8-29.1-26.2%20c-14.5-12.1-30.1-22.8-29.2-24.3c7.6-12,14.5-23.7,20.1-33.9c4.3-7.8,8.9-16,13-24.7c0.6-1.2,15.9,3,31.4,7.1c15.3,4,26.7,10,31,8%20c6.9-3,11.6-13.8,9.4-18.3c-1.1-2.3-17-7.3-33.2-12c-14.2-4.1-28-6.5-27.7-7.3c15.5-34,28.8-64.8,27.6-69.6%20c-1.7-7.1,2.6-11.9,7-36.5c3.2-18.1,4.7-40.9,5.2-51.7c0.2-3.5,2.8-6.3,6.3-6.7c3.1-0.3,6.9-0.9,10.5-1.9c7.8-2,18.6-7.8,36.4-20.6%20c17.9-12.8,38.7-49.6,44.4-67.8S567.6,106.8,556.9,82.5z%20M265.1,336.2c-8.1,4-13,7-26.4,9.6c-6.9,1.4-29.4-0.2-40.7-4.6%20c-10.5-4.1-19.9-7.6-30-15.4s-15.7-13.2-15.7-15.3c0-4.4,6-9.4,11-9.4c5.1,0,14.5,9.2,29.7,16.6c14.3,7,17.9,6.1,25.4,7.3%20c2.9,0.5,7.7,0.6,10.7,0.4c14.1-1.3,21.4-5.9,25.3-8.8c4-3,13.7-12.9,17.2-12.5c8,1,18.9,3.4,18.9,7.1%20C290.4,319,273.2,332.1,265.1,336.2z%20M320.9,521.4c-4.3,3.7-17.7,13.5-23.3,13.5c-2.8,0-7.4-8.2-11.5-16.8%20c-4.1-8.5-9.1-21.1-9.1-31.6c0-4.6,6-7.4,13.4-9.2c7.2-1.7,27.3-1.8,29.9-1.1c6.8,1.7,12.9,2.2,12.7,6.4c-0.4,12.7-7,18.9-8.3,24.3%20C323.4,512.3,323.4,519.2,320.9,521.4z%20M431.1,320.3c-9.2,7.4-10.6,8.1-24.9,13.7c-11.3,4.4-28.6,5.8-41.6,3.6%20c-12.2-2.1-22.3-4.6-29.5-10.1c-9.7-7.3-16.4-15.1-16.4-19.8c0-3.7,6.4-4.3,14.5-4.9c3.5-0.3,9.3,5.9,13.2,9.2%20c8.1,6.8,14.8,8,28.8,9.9c2.9,0.4,7.8,0.4,10.7,0.1c7.5-0.9,12-0.4,25.8-8.2c20-11.2,17.8-14.4,25.1-12.6c2.2,0.6,5.8,1.2,5.6,5.6%20C442.4,309,440.5,312.7,431.1,320.3z'/%3e%3c/svg%3e", l_ = {
  id: "engine-splash-screen",
  class: "flex justify-center items-center"
}, c_ = { id: "engine-splash-title" }, u_ = ["src"], af = /* @__PURE__ */ defineComponent({
  __name: "engine-splash",
  emits: ["finished"],
  setup(e2, { emit: t }) {
    const n = t, r = ref("hidden"), i = computed(() => ({
      transitionDuration: `${m.value}s`
    })), s = computed(() => ({
      invisible: r.value !== "appear"
    })), o = ke(), l = computed(
      () => {
        var p;
        return ((p = de().splashScreens) == null ? void 0 : p.engineSplashScreen) ?? {};
      }
    ), u = computed(
      () => typeof l.value.overrideText == "string" ? l.value.overrideText : "Made with narrat engine"
    ), c = computed(() => l.value.overrideLogo ?? a_), m = computed(
      () => typeof l.value.fadeDuration == "number" ? l.value.fadeDuration : 0.8
    ), a = computed(
      () => typeof l.value.timeBeforeFadeout == "number" ? l.value.timeBeforeFadeout : 1.5
    );
    onMounted(async () => {
      if (await Kt(10), r.value = "appear", l.value.skip || o.options.debug) {
        d();
        return;
      }
      await Kt(m.value * 1e3), await Kt(a.value * 1e3), r.value = "disappear", await Kt(m.value * 1e3), d();
    });
    function d() {
      o.loading.loaded ? n("finished") : o.listener.once("gameLoaded", () => {
        n("finished");
      });
    }
    return (p, h) => (openBlock(), createElementBlock("div", l_, [
      createElementVNode("div", {
        id: "engine-splash-header",
        class: normalizeClass(["flex justify-center flex-col items-center", s.value]),
        style: normalizeStyle(i.value)
      }, [
        createElementVNode("h1", c_, toDisplayString(u.value), 1),
        createElementVNode("img", {
          src: c.value,
          alt: "Narrat Logo",
          id: "engine-splash-logo"
        }, null, 8, u_),
        createVNode(s_, {
          percentage: unref(o).loading.percentage,
          step: unref(o).loading.step
        }, null, 8, ["percentage", "step"])
      ], 6)
    ]));
  }
});
class _a {
  constructor() {
    qe(this, "listeners", {});
  }
  on(t, n) {
    return this.listeners[t] || this.addEventToMap(t), this.listeners[t].add(n), n;
  }
  off(t, n) {
    return this.listeners[t] && this.listeners[t].delete(n), n;
  }
  once(t, n) {
    const r = (...i) => {
      this.off(t, r), n(...i);
    };
    return this.on(t, r);
  }
  emit(t, ...n) {
    this.listeners[t] && this.listeners[t].forEach((r) => r(...n));
  }
  clear() {
    Object.keys(this.listeners).forEach((t) => {
      delete this.listeners[t];
    });
  }
  addEventToMap(t) {
    this.listeners[t] = /* @__PURE__ */ new Set();
  }
}
class d_ extends _a {
  setup() {
    const t = () => {
      this.emit("preUpdate"), this.emit("update"), this.emit("postUpdate"), requestAnimationFrame(t);
    };
    t();
  }
}
const Yo = new d_();
var Yr;
((e2) => {
  function t(h, v) {
    return {
      x: h ?? 0,
      y: v ?? 0
    };
  }
  e2.create = t;
  function n(h) {
    return Math.sqrt(h.x * h.x + h.y * h.y);
  }
  e2.magnitude = n;
  function r(h) {
    const v = n(h);
    return v === 0 ? t(0, 0) : {
      x: h.x / v,
      y: h.y / v
    };
  }
  e2.normalize = r;
  function i(h, v) {
    return {
      x: h.x + v.x,
      y: h.y + v.y
    };
  }
  e2.add = i;
  function s(h, v) {
    return {
      x: h.x - v.x,
      y: h.y - v.y
    };
  }
  e2.subtract = s;
  function o(h, v) {
    return {
      x: h.x * v.x,
      y: h.y * v.y
    };
  }
  e2.multiply = o;
  function l(h, v) {
    return {
      x: h.x * v,
      y: h.y * v
    };
  }
  e2.scale = l;
  function u(h, v) {
    return {
      x: h.x / v.x,
      y: h.y / v.y
    };
  }
  e2.divide = u;
  function c(h, v) {
    return n(s(h, v));
  }
  e2.distance = c;
  function m(h, v, T) {
    return {
      x: h.x + (v.x - h.x) * T,
      y: h.y + (v.y - h.y) * T
    };
  }
  e2.lerp = m;
  function a(h, v) {
    const T = Math.cos(v), _ = Math.sin(v);
    return {
      x: h.x * T - h.y * _,
      y: h.x * _ + h.y * T
    };
  }
  e2.rotate = a;
  function d(h, v) {
    const T = s(v, h);
    return e2.normalize({
      x: -T.y,
      y: T.x
    });
  }
  e2.normal = d;
  function p(h, v) {
    return h.x * v.x + h.y * v.y;
  }
  e2.dot = p;
})(Yr || (Yr = {}));
function lf(e2, t, n, r) {
  const i = e2 / n, s = t / r;
  return Math.min(i, s);
}
const En = bt("settings", {
  state: () => ({
    baseSettings: {
      textSpeed: 30,
      animateText: true,
      fontSize: 16
    },
    settingsSchema: {
      textSpeed: {
        type: "number",
        defaultValue: 30,
        minValue: 1,
        maxValue: 100,
        step: 5,
        name: "Text Speed",
        description: "The speed at which text plays."
      },
      animateText: {
        type: "boolean",
        defaultValue: true,
        name: "Animate Text",
        description: "Whether or not text should animate."
      },
      fontSize: {
        type: "integer",
        defaultValue: 16,
        minValue: 8,
        maxValue: 64,
        step: 1,
        name: "Font Size",
        description: "The base font size for the game."
      }
    },
    customSettings: {},
    customSettingsSchema: {}
  }),
  actions: {
    reset(e2) {
      this.$reset(), this.updateConfig(e2);
    },
    getSetting(e2) {
      if (typeof this.baseSettings[e2] < "u")
        return this.baseSettings[e2];
      if (typeof this.customSettings[e2] < "u")
        return this.customSettings[e2];
      ue(`Setting ${e2} does not exist.`);
    },
    getSettingSchema(e2) {
      if (typeof this.settingsSchema[e2] < "u")
        return this.settingsSchema[e2];
      if (typeof this.customSettingsSchema[e2] < "u")
        return this.customSettingsSchema[e2];
      ue(`Setting ${e2} does not exist.`);
    },
    getAllSettingSchemas() {
      return {
        ...this.settingsSchema,
        ...this.customSettingsSchema
      };
    },
    setSetting(e2, t) {
      typeof this.baseSettings[e2] < "u" ? this.baseSettings[e2] = t : typeof this.customSettings[e2] < "u" ? this.customSettings[e2] = t : ue(`Setting ${e2} does not exist.`), e2 === "fontSize" && document.documentElement.style.setProperty("font-size", `${t}px`), e2 === "textSpeed" && (de().dialogPanel.textSpeed = t), e2 === "animateText" && (de().dialogPanel.animateText = t);
    },
    updateConfig(e2) {
      var t;
      if (this.setSetting(
        "textSpeed",
        e2.dialogPanel.textSpeed ?? $o
      ), this.setSetting("animateText", e2.dialogPanel.animateText ?? true), this.setSetting("fontSize", e2.layout.defaultFontSize ?? 16), (t = e2.settings) != null && t.customSettings)
        for (const n in e2.settings.customSettings)
          this.addCustomSetting(n, e2.settings.customSettings[n]);
    },
    addCustomSetting(e2, t) {
      this.customSettings[e2] = t.defaultValue, this.customSettingsSchema[e2] = t;
    },
    generateSaveData() {
      return {
        baseSettings: ze(this.baseSettings),
        customSettings: ze(this.customSettings)
      };
    },
    loadSaveData(e2) {
      for (const t in e2.baseSettings)
        this.setSetting(t, e2.baseSettings[t]);
      for (const t in e2.customSettings)
        typeof this.customSettings[t] < "u" && this.setSetting(t, e2.customSettings[t]);
    }
  }
});
function Jo(e2, t = 50, n = {}) {
  let r;
  const i = n.isImmediate ?? false, s = n.callback ?? false, o = n.maxWait;
  let l = Date.now(), u = [];
  function c() {
    if (o !== void 0) {
      const a = Date.now() - l;
      if (a + t >= o)
        return o - a;
    }
    return t;
  }
  const m = function(...a) {
    const d = this;
    return new Promise((p, h) => {
      const v = function() {
        if (r = void 0, l = Date.now(), !i) {
          const E = e2.apply(d, a);
          s && s(E), u.forEach(({ resolve: j }) => j(E)), u = [];
        }
      }, T = i && r === void 0;
      r !== void 0 && clearTimeout(r);
      const _ = c();
      if (r = setTimeout(v, _), T) {
        const E = e2.apply(d, a);
        return s && s(E), p(E);
      }
      u.push({ resolve: p, reject: h });
    });
  };
  return m.cancel = function(a) {
    r !== void 0 && clearTimeout(r), u.forEach(({ reject: d }) => d(a)), u = [];
  }, m;
}
const gt = bt("rendering", {
  state: () => ({
    screenHeight: window.innerHeight,
    screenWidth: window.innerWidth,
    layoutMode: "horizontal",
    resizeObserver: null,
    containerElement: null,
    narratAppElement: null,
    dialogPanelMode: "auto"
  }),
  actions: {
    generateSaveData() {
      return {
        dialogPanelMode: this.dialogPanelMode
      };
    },
    loadSaveData(e2) {
      this.dialogPanelMode = e2.dialogPanelMode;
    },
    reset() {
      this.dialogPanelMode = "auto";
    },
    updateScreenSize(e2, t) {
      this.screenHeight = t, this.screenWidth = e2, e2 < de().layout.verticalLayoutThreshold ? (this.layoutMode = "vertical", document.querySelector("html").style.fontSize = `${En().baseSettings.fontSize}px` ?? "40px") : (this.layoutMode = "horizontal", document.querySelector("html").style.fontSize = `${En().baseSettings.fontSize}px` ?? "16px");
    },
    setContainer(e2) {
      this.containerElement = e2, this.resizeObserver && this.resizeObserver.disconnect(), this.resizeObserver = new ResizeObserver(
        Jo(
          () => {
            this.refreshScreenSize();
          },
          100,
          {
            maxWait: 200
          }
        )
      ), this.resizeObserver.observe(e2), this.refreshScreenSize();
    },
    refreshScreenSize() {
      const e2 = this.containerElement;
      e2 && this.updateScreenSize(e2.clientWidth, e2.clientHeight);
    }
  },
  getters: {
    gameScaleRatio(e2) {
      return lf(
        this.screenWidth,
        this.screenHeight,
        this.gameWidth,
        this.gameHeight
      );
    },
    overlayMode(e2) {
      return !!(de().dialogPanel.overlayMode && e2.layoutMode === "horizontal");
    },
    gameWidth() {
      const e2 = de();
      return this.layoutMode === "vertical" || this.overlayMode ? e2.layout.backgrounds.width : e2.layout.backgrounds.width + Fo();
    },
    gameHeight() {
      const e2 = de();
      return this.layoutMode === "vertical", e2.layout.backgrounds.height;
    },
    dialogWidth() {
      return this.layoutMode === "vertical" ? this.viewportWidth : Fo();
    },
    dialogHeight() {
      return this.layoutMode === "vertical" ? this.actualGameHeight - this.gameHeight : de().dialogPanel.height ?? this.gameHeight;
    },
    actualGameHeight() {
      let e2 = this.gameHeight;
      return this.layoutMode === "vertical" && (e2 = this.screenHeight / this.gameScaleRatio), e2;
    },
    viewportRatio(e2) {
      if (this.layoutMode === "vertical") {
        const t = de().layout.backgrounds;
        return e2.screenWidth / t.width;
      }
      return 1;
    },
    viewportHeight(e2) {
      return de().layout.backgrounds.height * this.viewportRatio;
    },
    viewportWidth(e2) {
      return de().layout.backgrounds.width * this.viewportRatio;
    },
    showDialog(e2) {
      if (this.dialogPanelMode === "on")
        return true;
      if (this.dialogPanelMode === "off")
        return false;
      if (!this.overlayMode || this.layoutMode === "vertical")
        return true;
      const t = ke().inScript;
      let n = true;
      return pn().isTransitioning && de().dialogPanel.hideDuringTransition && (n = false), !de().dialogPanel.showAfterScriptEnd && !t && (n = false), n;
    },
    container() {
      return this.containerElement ? this.containerElement : document.body;
    },
    inputsContainer() {
      return ke().hasCustomContainer ? this.container : window;
    },
    narratApp() {
      return this.narratAppElement ? this.narratAppElement : document.body;
    }
  }
});
class f_ extends EventTarget {
  constructor() {
    super(...arguments);
    qe(this, "gamepadAvailable", true);
    qe(this, "gameActions", {});
    qe(this, "keyboardState", {});
    qe(this, "actions", {});
    qe(this, "lastInputMethodUsed", "km");
    qe(this, "gamepad", null);
  }
  kbEvent() {
    this.changeLastInput("km");
  }
  getGamepads() {
    return navigator.getGamepads ? navigator.getGamepads() : (this.gamepadAvailable = false, []);
  }
  gamepadEvent() {
    this.changeLastInput("gamepad");
  }
  mouseEvent() {
    this.changeLastInput("km");
  }
  changeLastInput(n) {
    this.lastInputMethodUsed !== n && (this.lastInputMethodUsed = n, this.dispatchEvent(
      new CustomEvent("change-input", { detail: n })
    ));
  }
  getGamepad() {
    const n = this.getGamepads().filter(
      (r) => r !== null
    );
    if (n.length > 0)
      return n[0];
  }
  startListening() {
    this.updateGamepad();
    const n = gt().inputsContainer;
    n.addEventListener("mousemove", (r) => {
      this.mouseEvent();
    }), n.addEventListener("keydown", (r) => {
      this.kbEvent();
      const i = this.getKeyboardState(r.key).current;
      this.keyboardState[r.key] = {
        previous: i,
        current: true
      };
    }), n.addEventListener("keyup", (r) => {
      this.kbEvent();
      const i = this.getKeyboardState(r.key).current;
      this.keyboardState[r.key] = {
        previous: i,
        current: false
      };
    }), Yo.on("preUpdate", () => {
      this.update();
    });
  }
  updateGamepad() {
    const n = this.getGamepad();
    n ? this.gamepad ? this.updateAllNarratButtons(n, this.gamepad) : this.gamepad = this.setupNarratGamepad(n) : this.gamepad = null;
  }
  setupNarratGamepad(n) {
    return {
      id: n.id,
      gamepad: n,
      buttons: n.buttons.map((i, s) => this.getNarratButtonFromGamepad(i, i, s))
    };
  }
  updateAllNarratButtons(n, r) {
    for (const [i, s] of n.buttons.entries()) {
      const o = r.buttons[i];
      o.previous = ze(o.state), o.state = ze(s), o.previous.pressed !== o.state.pressed && this.gamepadEvent();
    }
  }
  getNarratButtonFromGamepad(n, r, i) {
    return {
      index: i,
      state: ze(r),
      previous: ze(r)
    };
  }
  addAction(n) {
    if (this.gameActions[n.id] = n, n.type === "button") {
      const r = {
        config: n,
        active: false,
        justPressed: false,
        justReleased: false
      };
      this.actions[n.id] = {
        state: r,
        previous: ze(r)
      };
    } else {
      const r = {
        config: n,
        value: Yr.create(0, 0),
        fullState: {
          left: 0,
          right: 0,
          up: 0,
          down: 0
        }
      };
      this.actions[n.id] = {
        state: r,
        previous: ze(r)
      };
    }
  }
  getAnalog(n) {
    return this.actions[n] || ue(`Action ${n} does not exist`), this.actions[n].state;
  }
  getButton(n) {
    return this.actions[n] || ue(`Action ${n} does not exist`), this.actions[n].state;
  }
  getKeyboardState(n) {
    return this.keyboardState[n] ? this.keyboardState[n] : (this.keyboardState[n] = {
      current: false,
      previous: false
    }, this.keyboardState[n]);
  }
  getGamepadState(n) {
    return this.gamepad && this.gamepad.buttons.length > n ? {
      current: this.gamepad.buttons[n].state,
      previous: this.gamepad.buttons[n].previous
    } : null;
  }
  debugGamepad() {
    if (this.gamepad)
      for (const [n, r] of this.gamepad.buttons.entries())
        r.state.pressed, r.previous.pressed;
  }
  update() {
    this.updateGamepad(), this.debugGamepad();
    for (const n of Object.values(this.gameActions))
      if (n.type === "button") {
        const r = this.actions[n.id], i = ze(r.state), s = r.state;
        r.previous = i, n.action === "press" && (n.keybinds.some((l) => {
          let u = false;
          if (typeof l.keyboardKey == "string" && this.getKeyboardState(l.keyboardKey).current === true && (u = true), typeof l.gamepadButton == "number") {
            const c = this.getGamepadState(l.gamepadButton);
            c && c.current.pressed === true && (u = true);
          }
          return u;
        }) ? s.active = true : s.active = false, s.active && !i.active ? s.justPressed = true : s.justPressed = false, !s.active && i.active ? s.justReleased = true : s.justReleased = false);
      } else if (n.type === "analog") {
        const r = this.actions[n.id], i = r.state;
        ze(r.state), r.previous = ze(i);
        let s = Yr.create(0, 0);
        n.keybinds.forEach((o) => {
          this.getKeyboardState(o.left).current && (i.fullState.left = 1, s.x -= 1), this.getKeyboardState(o.right).current && (i.fullState.right = 1, s.x += 1), this.getKeyboardState(o.up).current && (i.fullState.up = 1, s.y -= 1), this.getKeyboardState(o.down).current && (i.fullState.down = 1, s.y += 1);
        }), s = Yr.normalize(s), i.value = s;
      }
  }
}
const Zn = new f_(), jt = bt("menu", {
  state: () => ({
    menus: {},
    activeMenu: false
  }),
  getters: {
    showSkills() {
      return Object.entries(Bn().skills).length > 0;
    },
    showInventory() {
      return Object.entries(ul().items).length > 0;
    },
    showQuests() {
      return Object.entries(is().quests).length > 0;
    },
    showAchievements() {
      return Object.entries(Hi().achievements).length > 0;
    },
    menuTabsToShow(e2) {
      return e2.menus.menu.tabs.map((t) => {
        const n = de().menuButtons[t.id] || {};
        return {
          ...t,
          ...n
        };
      }).filter((t) => t.condition ? t.condition() : true);
    },
    menu(e2) {
      return e2.activeMenu ? e2.menus[e2.activeMenu] : void 0;
    },
    tab() {
      if (this.menu)
        return this.menu.tabs[this.menu.activeTab];
    }
  },
  actions: {
    setup() {
    },
    addMenu(e2, t) {
      this.menus[e2] = {
        ...t,
        id: e2
      };
    },
    addMenuOption(e2, t) {
      this.menus[e2] || (this.menus[e2] = {
        id: e2,
        label: e2,
        tabs: [],
        activeTab: 0
      }), this.menus[e2].tabs.push(t);
    },
    setActiveTab(e2) {
      this.menu && (this.menu.activeTab = e2);
    },
    openMenu(e2) {
      this.activeMenu = e2;
    },
    closeMenu() {
      this.activeMenu = false;
    },
    toggleMenu() {
      this.activeMenu ? this.activeMenu = false : this.activeMenu = "menu";
    }
  }
}), p_ = [
  {
    id: "left",
    type: "button",
    action: "press",
    keybinds: [
      {
        keyboardKey: "ArrowLeft",
        gamepadButton: 14
      }
    ]
  },
  {
    id: "right",
    type: "button",
    action: "press",
    keybinds: [
      {
        keyboardKey: "ArrowRight",
        gamepadButton: 15
      }
    ]
  },
  {
    id: "up",
    type: "button",
    action: "press",
    keybinds: [
      {
        keyboardKey: "ArrowUp",
        gamepadButton: 12
      }
    ]
  },
  {
    id: "down",
    type: "button",
    action: "press",
    keybinds: [
      {
        keyboardKey: "ArrowDown",
        gamepadButton: 13
      }
    ]
  },
  {
    id: "continue",
    type: "button",
    action: "press",
    keybinds: [
      {
        keyboardKey: "Enter",
        gamepadButton: 0
      }
    ]
  },
  {
    id: "cancel",
    type: "button",
    action: "press",
    keybinds: [
      {
        keyboardKey: "Escape",
        gamepadButton: 1
      }
    ]
  },
  {
    id: "system",
    type: "button",
    action: "press",
    keybinds: [
      {
        keyboardKey: "n",
        gamepadButton: 9
      }
    ]
  },
  {
    id: "menu",
    type: "button",
    action: "press",
    keybinds: [
      {
        keyboardKey: "m",
        gamepadButton: 8
      }
    ]
  },
  {
    id: "previousTab",
    type: "button",
    action: "press",
    keybinds: [
      {
        keyboardKey: "p",
        gamepadButton: 4
      }
    ]
  },
  {
    id: "nextTab",
    type: "button",
    action: "press",
    keybinds: [
      {
        keyboardKey: "o",
        gamepadButton: 5
      }
    ]
  },
  {
    id: "subPreviousTab",
    type: "button",
    action: "press",
    keybinds: [
      {
        keyboardKey: "i",
        gamepadButton: 6
      }
    ]
  },
  {
    id: "subNextTab",
    type: "button",
    action: "press",
    keybinds: [
      {
        keyboardKey: "u",
        gamepadButton: 7
      }
    ]
  },
  {
    id: "viewportSelect",
    type: "button",
    action: "press",
    keybinds: [
      {
        keyboardKey: "v",
        gamepadButton: 2
      }
    ]
  },
  {
    id: "autoPlay",
    type: "button",
    action: "press",
    keybinds: [
      {
        keyboardKey: "a",
        gamepadButton: 6
      }
    ]
  },
  {
    id: "skip",
    type: "button",
    action: "press",
    keybinds: [
      {
        keyboardKey: "s",
        gamepadButton: 7
      }
    ]
  }
], at = bt("inputs", {
  state: () => ({
    inputStack: [],
    baseInputListener: null,
    inputMode: "mk",
    inGameInputListener: null
  }),
  actions: {
    setupInputs() {
      Zn.addEventListener("change-input", (e2) => {
        this.inputMode = e2.detail;
      });
      for (const e2 of p_)
        Zn.addAction(e2);
      this.listenToBaseNarratInputs(), Yo.on("preUpdate", () => {
        for (const [e2, t] of Object.entries(Zn.actions))
          if (t.state.config.type === "button") {
            const n = t;
            n.state.justPressed && this.triggerListeners(e2, "press", n), n.state.justReleased && this.triggerListeners(e2, "release", n);
          } else
            t.state.config.type;
      });
    },
    createInGameInputListener() {
      this.inGameInputListener || (this.inGameInputListener = this.registerInputListener("in-game", {
        system: {
          press: () => {
            jt().openMenu("system");
          }
        },
        menu: {
          press: () => {
            jt().openMenu("menu");
          }
        }
      }));
    },
    removeInGameInputListener() {
      this.inGameInputListener && (this.unregisterInputListener(this.inGameInputListener), this.inGameInputListener = null);
    },
    listenToContainerInputs() {
      Zn.startListening();
    },
    listenToBaseNarratInputs() {
    },
    triggerListeners(e2, t, n) {
      const r = this.inputStack[this.inputStack.length - 1];
      if (r && r.actions[e2] && r.actions[e2][t])
        if (n.state.config.type === "button") {
          const i = r.actions[e2][t], s = n;
          i(
            n.state.config,
            s.state,
            s.previous
          );
        } else
          console.warn("Analog events not implemented yet");
    },
    getInputs() {
      return Zn;
    },
    registerInputListener(e2, t) {
      const r = {
        id: `${Date.now()}-${Math.floor(Math.random() * 1e8)}`,
        name: e2,
        actions: t ?? {}
      };
      return this.inputStack.push(r), r;
    },
    unregisterInputListener(e2) {
      const t = this.inputStack.findIndex((n) => n.id === e2.id);
      if (t === -1)
        throw new Error("Input listener not found");
      this.inputStack.splice(t, 1);
    },
    registerActions(e2, t, n) {
      e2.actions[t] = n;
    }
  }
}), Jt = bt("scenes-store", {
  state: () => ({
    scenes: {},
    activeScene: "engine-splash",
    currentOptions: {}
  }),
  getters: {
    isPlaying(e2) {
      return e2.activeScene !== "engine-splash" && e2.activeScene !== "game-splash" && e2.activeScene !== "start-menu";
    }
  },
  actions: {
    generateSaveData() {
      return {
        activeScene: this.activeScene
      };
    },
    loadSaveData(e2) {
    },
    changeScene(e2, t) {
      const n = this.activeScene;
      if (n && n !== e2) {
        const r = this.scenes[n];
        r.onLeaving && r.onLeaving(), this.currentOptions = {}, this.activeScene = e2, this.currentOptions = t || {}, this.scenes[e2].onStarting && this.scenes[e2].onStarting();
      }
    },
    getSceneConfig(e2) {
      return this.scenes[e2];
    },
    onEngineSplashFinished() {
      this.changeScene("game-splash");
    },
    finishedScene(e2) {
      this.scenes[e2].onFinished && this.scenes[e2].onFinished();
    },
    addNewScene(e2) {
      this.scenes[e2.id] = e2;
    }
  }
}), m_ = {
  id: "game-splash-screen",
  style: { height: "100%", padding: "20px" },
  class: "flex justify-center items-center"
}, h_ = {
  id: "game-splash-screen-header flex justify-center flex-col items-center",
  class: "flex justify-center flex-col items-center"
}, y_ = {
  class: "title",
  id: "game-splash-title"
}, cf = /* @__PURE__ */ defineComponent({
  __name: "game-splash",
  setup(e2) {
    const t = ref(null), n = ke(), r = computed(
      () => {
        var u;
        return ((u = de().splashScreens) == null ? void 0 : u.gameSplashScreen) ?? {};
      }
    ), i = computed(
      () => typeof r.value.startButtonText == "string" ? r.value.startButtonText : "Press to start"
    ), s = computed(() => n.loading.loaded), o = computed(() => de().gameTitle || "Narrat Game");
    function l() {
      Jt().changeScene("start-menu");
    }
    return onMounted(() => {
      t.value = at().registerInputListener("game-splash", {
        continue: {
          press: () => {
            l();
          }
        },
        system: {
          press: () => {
            l();
          }
        }
      }), n.options.debug && l();
    }), onUnmounted(() => {
      t.value && at().unregisterInputListener(t.value);
    }), (u, c) => (openBlock(), createElementBlock("div", m_, [
      createElementVNode("div", h_, [
        createElementVNode("h1", y_, toDisplayString(o.value), 1),
        s.value ? (openBlock(), createElementBlock("button", {
          key: 0,
          class: "nrt-button menu-button main-menu-button large splash-start-button override",
          onClick: l
        }, toDisplayString(i.value), 1)) : createCommentVNode("", true)
      ])
    ]));
  }
});
function Wn(e2) {
  if (!e2.listener)
    return console.warn("No input listener provided for navigation"), null;
  const t = ref(-1), n = computed(
    () => e2.mode === "grid" ? t.value % e2.columns : 0
  ), r = ref([]), i = ref(Zn.lastInputMethodUsed), s = ref(null);
  function o() {
    var Y, te;
    return (Y = e2.container) != null && Y.value ? e2.container.value.children : (te = e2.elements) != null && te.value ? e2.elements.value.filter(
      (z) => z !== null
    ) : [];
  }
  function l() {
    r.value = o();
  }
  const u = computed(
    () => a(t.value)
  );
  function c(Y) {
    return r.value ? Y >= 0 && Y < r.value.length : false;
  }
  function m(Y) {
    const te = t.value;
    if (c(Y) && (t.value = Y, u.value)) {
      i.value === "gamepad" && u.value.classList.add("selected");
      const z = a(te);
      z && te !== Y && z.classList.remove("selected"), e2.onSelected && e2.onSelected(Y);
    }
  }
  function a(Y) {
    return r.value ? r.value[Y] : null;
  }
  function d() {
    r.value && (t.value === 0 ? e2.loopForbidden || m(r.value.length - 1) : m(t.value - 1));
  }
  function p() {
    r.value && (t.value === r.value.length - 1 ? e2.loopForbidden || m(0) : m(t.value + 1));
  }
  function h() {
    if (!r.value)
      return;
    const Y = e2, te = t.value;
    !e2.loopForbidden && te < Y.columns ? m(r.value.length - 1) : m(t.value - e2.columns);
  }
  function v() {
    if (!r.value)
      return;
    const Y = e2, te = t.value;
    !e2.loopForbidden && te >= r.value.length - Y.columns ? m(0) : m(t.value + e2.columns);
  }
  function T() {
    e2.mode === "grid" ? h() : e2.mode === "list" && d();
  }
  function _() {
    e2.mode === "grid" ? v() : e2.mode === "list" && p();
  }
  function E() {
    (e2.mode === "grid" || e2.mode === "list") && d();
  }
  function j() {
    (e2.mode === "grid" || e2.mode === "list") && p();
  }
  function F() {
    e2.onChosen && e2.onChosen(t.value);
  }
  onMounted(() => {
    Z();
  });
  function B() {
    e2.listener && (e2.onlyVertical || (delete e2.listener.actions.left, delete e2.listener.actions.right), e2.onlyHorizontal || (delete e2.listener.actions.up, delete e2.listener.actions.down), e2.noChoosing || delete e2.listener.actions.continue, s.value && Zn.removeEventListener("change-input", s.value));
  }
  function L() {
    u.value && u.value.classList.add("selected");
  }
  function P() {
    u.value && u.value.classList.remove("selected");
  }
  function Z() {
    e2.listener && (l(), s.value = (Y) => {
      i.value = Y.detail, Y.detail === "gamepad" ? L() : P();
    }, Zn.addEventListener("change-input", s.value), e2.onlyVertical || (e2.listener.actions.left = {
      press: E
    }, e2.listener.actions.right = {
      press: j
    }), e2.onlyHorizontal || (e2.listener.actions.up = {
      press: T
    }, e2.listener.actions.down = {
      press: _
    }), e2.noChoosing || (e2.listener.actions.continue = {
      press: F
    }), m(0));
  }
  return onUnmounted(() => {
    B();
  }), watch(
    () => {
      var Y;
      return (Y = e2.elements) == null ? void 0 : Y.value;
    },
    (Y) => {
      Y && l();
    }
  ), {
    selectedIndex: t,
    selectedElement: u,
    currentColumn: n,
    buttonDown: _,
    buttonUp: T,
    buttonLeft: E,
    buttonRight: j,
    selectUp: h,
    selectDown: v,
    selectPrevious: d,
    selectNext: p,
    select: m,
    disable: B,
    mount: Z
  };
}
const g_ = { class: "used-save-slot flex flex-row justify-between items-center grow" }, v_ = { class: "flex flex-col save-slot-number-container" }, __ = { class: "save-slot-number" }, b_ = { class: "flex flex-col justify-center save-info" }, T_ = {
  key: 1,
  class: "save-name"
}, S_ = { class: "flex flex-col" }, w_ = { key: 0 }, $_ = { key: 1 }, C_ = { key: 2 }, k_ = ["onClick"], ps = /* @__PURE__ */ defineComponent({
  __name: "save-slot-ui",
  props: {
    saveSlot: {},
    id: {},
    actions: {},
    selected: { type: Boolean },
    inputListener: {}
  },
  emits: ["choice", "cancel"],
  setup(e2, { expose: t, emit: n }) {
    var F;
    const r = e2, i = ref(null), s = ref(null), o = ref(null);
    t({
      slotContainer: o
    });
    const l = ref(((F = r.saveSlot.saveData) == null ? void 0 : F.metadata.name) ?? "Empty Save"), u = ref(0), c = computed(() => r.saveSlot.saveData !== null), m = computed(() => r.saveSlot.saveData), a = computed(() => de().saves.mode), d = computed(() => {
      const B = r.saveSlot.saveData;
      if (B && B.screens.layers[0]) {
        const L = Zi(B.screens.layers[0]);
        if (L)
          return {
            backgroundImage: `url(${eo(L.background)})`
          };
      }
      return false;
    }), p = n;
    function h(B) {
      p("choice", B);
    }
    function v(B) {
      return m.value ? ia(m.value.main.playTime / 1e3) : "00:00:00";
    }
    function T() {
      m.value && wm(r.saveSlot.id, l.value);
    }
    function _() {
      const B = de().saves.slots;
      let L = "";
      const P = r.saveSlot.slotNumber;
      return P === 0 && de().saves.mode === "manual" ? "AUTO" : (B >= 10 && P < 10 && (L += "0"), B >= 100 && P < 100 && (L += "0"), L + P);
    }
    function E() {
      i.value = Wn({
        mode: "list",
        container: s,
        listener: r.inputListener,
        onlyHorizontal: true,
        onSelected: (B) => {
          u.value = B;
        },
        onChosen: (B) => {
          h(B);
        }
      }), i.value.mount();
    }
    function j() {
      i.value.disable(), i.value = null;
    }
    return watch(
      () => r.selected,
      (B, L) => {
        B && !i.value && E(), !B && i.value && j();
      }
    ), onUnmounted(() => {
      i.value && j();
    }), (B, L) => (openBlock(), createElementBlock("div", {
      class: "save-slot flex flex-row",
      ref_key: "slotContainer",
      ref: o
    }, [
      createElementVNode("div", g_, [
        createElementVNode("div", v_, [
          createElementVNode("h1", __, toDisplayString(_()), 1)
        ]),
        d.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "save-slot-screenshot",
          style: normalizeStyle(d.value)
        }, null, 4)) : createCommentVNode("", true),
        createElementVNode("div", b_, [
          c.value ? withDirectives((openBlock(), createElementBlock("input", {
            key: 0,
            type: "text",
            class: "save-name",
            "onUpdate:modelValue": L[0] || (L[0] = (P) => l.value = P),
            onInput: T
          }, null, 544)), [
            [vModelText, l.value]
          ]) : (openBlock(), createElementBlock("h3", T_, toDisplayString(l.value), 1)),
          createElementVNode("div", S_, [
            m.value ? (openBlock(), createElementBlock("p", w_, toDisplayString(new Date(m.value.metadata.saveDate).toLocaleString()), 1)) : createCommentVNode("", true),
            m.value ? (openBlock(), createElementBlock("p", $_, "Play time: " + toDisplayString(v(B.saveSlot)), 1)) : createCommentVNode("", true),
            a.value === "game-slots" ? (openBlock(), createElementBlock("p", C_, toDisplayString(B.saveSlot.slotType === "auto" ? "Auto Save" : "Manual Save"), 1)) : createCommentVNode("", true)
          ])
        ]),
        createElementVNode("div", {
          class: "flex flex-row",
          ref_key: "actionsContainer",
          ref: s
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(B.actions, (P, Z) => (openBlock(), createElementBlock("button", {
            class: normalizeClass(["nrt-button", { selected: B.selected && Z === u.value }]),
            onClick: () => h(Z),
            key: Z
          }, [
            createElementVNode("h3", null, toDisplayString(P), 1)
          ], 10, k_))), 128))
        ], 512)
      ])
    ], 512));
  }
}), O_ = /* @__PURE__ */ createElementVNode("h3", { class: "title" }, "Confirmation", -1), Io = /* @__PURE__ */ defineComponent({
  __name: "yes-no",
  props: {
    prompt: {
      type: String,
      required: true
    },
    onConfirm: {
      type: Function,
      required: false
    },
    onRefuse: {
      type: Function,
      required: false
    }
  },
  emits: ["choice"],
  setup(e2, { emit: t }) {
    const n = ref(
      at().registerInputListener("yes-no", {
        cancel: {
          press: () => {
            o(false);
          }
        },
        continue: {
          press: () => {
            o(true);
          }
        }
      })
    ), r = ref(null);
    Wn({
      mode: "list",
      container: r,
      listener: n.value,
      onChosen: (l) => {
        o(l === 0);
      }
    });
    const i = e2, s = t;
    function o(l) {
      l === true && i.onConfirm ? i.onConfirm() : l === false && i.onRefuse && i.onRefuse(), s("choice", l);
    }
    return onMounted(() => {
    }), onUnmounted(() => {
      n.value && at().unregisterInputListener(n.value);
    }), (l, u) => (openBlock(), createBlock(lr, {
      onClose: u[2] || (u[2] = () => o(false)),
      containerCssClass: "yes-no-modal"
    }, {
      header: withCtx(() => [
        O_
      ]),
      body: withCtx(() => [
        createElementVNode("h3", null, toDisplayString(e2.prompt), 1),
        createElementVNode("div", {
          class: "flex justify-center",
          ref_key: "buttonsContainer",
          ref: r
        }, [
          createElementVNode("button", {
            class: "nrt-button",
            onClick: u[0] || (u[0] = () => o(true))
          }, "Yes"),
          createElementVNode("button", {
            class: "nrt-button",
            onClick: u[1] || (u[1] = () => o(false))
          }, "No")
        ], 512)
      ]),
      _: 1
    }));
  }
}), A_ = { class: "nrt-title" }, E_ = { key: 0 }, I_ = { class: "saves-section" }, P_ = /* @__PURE__ */ createElementVNode("h3", { class: "saves-section-title" }, "Auto save", -1), N_ = { class: "saves-section" }, x_ = /* @__PURE__ */ createElementVNode("h3", { class: "saves-section-title" }, "Manual Saves", -1), j_ = {
  key: 1,
  class: "saves-section"
}, L_ = /* @__PURE__ */ createElementVNode("h3", { class: "saves-section-title" }, "Save Slots", -1), D_ = { class: "saves-container flex flex-col" }, uf = /* @__PURE__ */ defineComponent({
  __name: "save-slots",
  props: {
    mode: {}
  },
  emits: ["chosen", "close"],
  setup(e2, { emit: t }) {
    const n = e2, r = ref(
      at().registerInputListener("save-slots", {
        cancel: {
          press: () => {
            Z();
          }
        }
      })
    ), i = ref(0), s = reactive([]), o = computed(() => s.slice(0, 1)), l = computed(() => s.slice(1)), u = ref([]), c = ref([]), m = ref([]), a = ref([]), d = ref([]);
    ref({
      mode: "list",
      elements: a,
      listener: r.value,
      onlyVertical: true,
      noChoosing: true,
      onSelected: (z) => {
        i.value = z;
      }
    });
    const p = Wn({
      mode: "list",
      elements: a,
      listener: r.value,
      onlyVertical: true,
      noChoosing: true,
      onSelected: (z) => {
        i.value = z;
      }
    }), h = computed(() => {
      const z = i.value;
      return d.value.length < z + 1 ? null : d.value[z].id;
    }), v = reactive(
      n.mode === "load" ? ["Load", "Delete"] : ["Choose"]
    ), T = computed(() => de().saves.mode), _ = reactive({
      prompt: "Are you sure you want to delete this save file?",
      saveToDelete: null,
      onConfirm: () => {
        P(_.saveToDelete), _.saveToDelete = null;
      },
      onRefuse: () => {
        _.saveToDelete = null;
      }
    }), E = reactive({
      prompt: "Are you sure you want to overwrite this save file?",
      saveToOverwrite: null,
      onConfirm: () => {
        B(E.saveToOverwrite), E.saveToOverwrite = null;
      },
      onRefuse: () => {
        E.saveToOverwrite = null;
      }
    }), j = t;
    onBeforeMount(() => {
      Gn().slots.forEach((X, re) => {
        s[re] = X;
      });
    });
    function F() {
      a.value = T.value === "manual" ? [
        ...c.value.map((Q) => Q.slotContainer),
        ...m.value.map((Q) => Q.slotContainer)
      ] : u.value.map((Q) => Q.slotContainer);
      const z = T.value === "manual" ? [...o.value, ...l.value] : s;
      d.value = z.map((Q) => ({
        id: Q.id
      }));
    }
    onMounted(() => {
      F();
    }), onUnmounted(() => {
      p.value && (p.value.disable(), p.value = null), r.value && at().unregisterInputListener(r.value);
    });
    function B(z) {
      j("chosen", {
        slotId: z
      });
    }
    function L(z) {
      const Q = te(z);
      if (Q) {
        if (de().saves.mode === "manual" && Q.slotType === "auto") {
          ke().alert("Sorry", "Can't delete the auto save slot!");
          return;
        }
        _.saveToDelete = z;
      }
    }
    function P(z) {
      Sm(z);
      const Q = s.find((X) => X.id === z);
      Q && (Q.saveData = null), F();
    }
    function Z() {
      j("close");
    }
    function Y(z, Q) {
      const X = v[Q];
      X === "Load" ? B(z) : X === "Delete" ? L(z) : X === "Choose" && (E.saveToOverwrite = z);
    }
    function te(z) {
      return s.find((Q) => Q.id === z);
    }
    return (z, Q) => (openBlock(), createBlock(lr, {
      onClose: Z,
      containerCssClass: "save-modal",
      cantClose: false
    }, {
      header: withCtx(() => [
        createElementVNode("h3", A_, toDisplayString(z.mode === "load" ? "Choose a save to load" : "Pick a slot to save the game"), 1)
      ]),
      body: withCtx(() => [
        T.value === "manual" ? (openBlock(), createElementBlock("div", E_, [
          createElementVNode("div", I_, [
            P_,
            createVNode(TransitionGroup, {
              name: "list",
              tag: "div"
            }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(o.value, (X) => (openBlock(), createBlock(ps, {
                  key: X.id,
                  saveSlot: X,
                  id: X.id,
                  actions: v,
                  onChoice: (re) => Y(X.id, re),
                  inputListener: r.value,
                  selected: h.value === X.id,
                  ref_for: true,
                  ref_key: "autoSlotsElements",
                  ref: c
                }, null, 8, ["saveSlot", "id", "actions", "onChoice", "inputListener", "selected"]))), 128))
              ]),
              _: 1
            })
          ]),
          createElementVNode("div", N_, [
            x_,
            createVNode(TransitionGroup, {
              name: "list",
              tag: "div"
            }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(l.value, (X) => (openBlock(), createBlock(ps, {
                  key: X.id,
                  saveSlot: X,
                  id: X.id,
                  actions: v,
                  onChoice: (re) => Y(X.id, re),
                  inputListener: r.value,
                  selected: h.value === X.id,
                  ref_for: true,
                  ref_key: "manualSlotsElements",
                  ref: m
                }, null, 8, ["saveSlot", "id", "actions", "onChoice", "inputListener", "selected"]))), 128))
              ]),
              _: 1
            })
          ])
        ])) : (openBlock(), createElementBlock("div", j_, [
          L_,
          createElementVNode("div", D_, [
            createVNode(TransitionGroup, {
              name: "list",
              tag: "div"
            }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(s, (X) => (openBlock(), createBlock(ps, {
                  key: X.id,
                  saveSlot: X,
                  id: X.id,
                  actions: v,
                  onChoice: (re) => Y(X.id, re),
                  selected: h.value === X.id,
                  inputListener: r.value,
                  ref_for: true,
                  ref_key: "saveSlotsElements",
                  ref: u
                }, null, 8, ["saveSlot", "id", "actions", "onChoice", "selected", "inputListener"]))), 128))
              ]),
              _: 1
            })
          ])
        ])),
        _.saveToDelete ? (openBlock(), createBlock(Io, {
          key: 2,
          prompt: _.prompt,
          onRefuse: _.onRefuse,
          onConfirm: _.onConfirm
        }, null, 8, ["prompt", "onRefuse", "onConfirm"])) : createCommentVNode("", true),
        E.saveToOverwrite ? (openBlock(), createBlock(Io, {
          key: 3,
          prompt: E.prompt,
          onRefuse: E.onRefuse,
          onConfirm: E.onConfirm
        }, null, 8, ["prompt", "onRefuse", "onConfirm"])) : createCommentVNode("", true)
      ]),
      _: 1
    }));
  }
}), R_ = /* @__PURE__ */ defineComponent({
  __name: "start-menu-button",
  props: {
    button: {}
  },
  emits: ["click"],
  setup(e2) {
    return (t, n) => (openBlock(), createElementBlock("button", {
      class: normalizeClass(["nrt-button menu-button main-menu-button large override", t.button.cssClass]),
      onClick: n[0] || (n[0] = (r) => t.$emit("click"))
    }, toDisplayString(t.button.title), 3));
  }
});
class df extends _a {
  setup(t = false) {
    const r = t ? "keydown" : "keyup", i = Jo(
      (o) => {
        mn.emit("debouncedKeydown", o);
      },
      10,
      {
        isImmediate: true,
        maxWait: 10
      }
    ), s = gt().inputsContainer;
    s.addEventListener("keydown", (o) => {
      mn.emit("keydown", o);
    }), s.addEventListener(r, (o) => {
      i(o);
    });
  }
}
const mn = new df(), ba = bt("startMenu", {
  state: () => ({
    buttons: []
  }),
  actions: {
    addButtonsFromPlugins() {
      Re.plugins.forEach((t) => {
        t.startMenuButtons && t.startMenuButtons.forEach((n) => {
          const r = window.narrat.app;
          n.popupComponent && r.component(
            n.popupComponent.name,
            n.popupComponent.component
          ), this.buttons.push(n);
        });
      });
    }
  }
});
function M_() {
  $f();
}
function ff() {
  M_(), ke().menuReturn();
}
async function F_(e2) {
  if (de().saves.mode === "manual") {
    const t = oa();
    t && (e2 = t.id);
  }
  ke().setSaveSlot(e2), Cf(Gn().globalSave), pf(), Ie().runGame();
}
function pf() {
  Lt().stopAll(), Er("onPressStart"), Ie().start(), ke().prepareToPlay(), Re.callHook("onGameStart");
}
async function U_(e2, t) {
  if (de().saves.mode === "manual") {
    const n = oa();
    n && (t = n.id);
  }
  if (ke().setSaveSlot(t), pf(), e2.saveData) {
    rT({
      gameSave: e2.saveData,
      globalSave: Gn().globalSave
    }), Lt().reloadAudio(e2.saveData.audio);
    const n = Ie(), r = de().saves.runOnReload;
    typeof r == "string" && await Ie().runLabelFunction(r), n.jumpToLabel(e2.saveData.vm.lastLabel);
  }
}
const B_ = { id: "game-menu" }, q_ = {
  id: "game-header",
  class: "flex flex-col justify-between items-center"
}, V_ = { id: "game-title-container" }, H_ = { id: "game-title-text" }, K_ = { class: "nrt-title" }, G_ = /* @__PURE__ */ defineComponent({
  __name: "StartMenu",
  setup(e2) {
    const t = ref(
      at().registerInputListener("start-menu", {})
    ), n = ref([]), r = ref(null), i = ref(false), s = ref(false), o = ref(null), l = ref(null), u = ref(false), c = ref(false), m = ref(null), a = ba(), d = ref(false), p = ref(null), h = computed(() => a.buttons), v = Wn({
      mode: "list",
      container: r,
      listener: t.value,
      onChosen: (X) => {
        T(n.value[X]);
      }
    });
    function T(X) {
      switch (X.id) {
        case "continue":
          P();
          break;
        case "new-game":
          _();
          break;
        case "load-game":
          Z();
          break;
        case "exit":
          ke().exitGame();
          break;
        default:
          j(X);
          break;
      }
    }
    async function _() {
      i.value && de().saves.mode === "manual" && !de().saves.disabled ? c.value = true : E();
    }
    async function E() {
      if (l.value === null)
        if (de().saves.mode === "manual") {
          const X = oa();
          if (!X) {
            ue("No autosave found");
            return;
          }
          l.value = X.id;
        } else {
          const X = bm();
          if (!X) {
            ue("No free slot found");
            return;
          }
          l.value = X;
        }
      c.value = false, await F_(l.value);
    }
    function j(X) {
      const re = h.value.findIndex(
        (Me) => Me.id === X.id
      ), Pe = h.value[re];
      Pe.action && Pe.action(), Pe.popupComponent && (d.value = Pe);
    }
    function F() {
      d.value = false;
    }
    function B() {
      c.value = false;
    }
    async function L() {
      if (!l.value)
        return;
      const X = Ci(l.value);
      if (!X) {
        ue("No save file found");
        return;
      }
      U_(X, l.value);
    }
    function P() {
      typeof o.value == "string" && (l.value = o.value, L());
    }
    function Z() {
      u.value = true;
    }
    function Y({ slotId: X }) {
      const re = Ci(X);
      re && re.saveData ? (l.value = X, L()) : _();
    }
    onMounted(() => {
      const X = Gn();
      X.slots.some((re) => re.saveData) && (i.value = true), (de().saves.mode === "manual" || X.slots.some((re) => !re.saveData)) && (s.value = true), X.lastSaveSlot && Ci(X.lastSaveSlot) && (o.value = X.lastSaveSlot), te(), m.value = mn.on("debouncedKeydown", (re) => {
        re.key === " " && E(), re.key === "c" && P();
      }), nextTick(() => {
        v.select(0);
      }), rn().options.defaultMusic && (p.value = lh(rn().options.defaultMusic));
    });
    function te() {
      const X = de().saves.disabled;
      o.value && !X && n.value.push(
        z({
          id: "continue",
          title: "Continue",
          cssClass: "continue-button"
        })
      ), s.value && n.value.push(
        z({
          id: "new-game",
          title: "New Game",
          cssClass: "start-button"
        })
      ), i.value && !X && n.value.push(
        z({
          id: "load-game",
          title: "Load Game",
          cssClass: "continue-button"
        })
      );
      for (const re of h.value)
        n.value.push({
          id: re.id,
          title: re.text,
          cssClass: `${re.id}-start-menu-button`
        });
      n.value.push(
        z({
          id: "exit",
          title: "Exit",
          cssClass: "exit-button"
        })
      );
    }
    function z({
      id: X,
      title: re,
      cssClass: Pe
    }) {
      const Me = de().menuButtons[X];
      if (Me) {
        let dt = Pe;
        return Me.cssClass && (dt = `${Me.cssClass} ${Pe}`), {
          id: X,
          title: Me.text ?? re,
          cssClass: dt
        };
      }
      return { id: X, title: re, cssClass: Pe };
    }
    onUnmounted(() => {
      if (t.value && at().unregisterInputListener(t.value), m.value && mn.off("debouncedKeydown", m.value), typeof p.value == "number") {
        const X = rn().options.defaultMusic;
        ch(X, p.value);
      }
    });
    const Q = computed(() => de().gameTitle);
    return (X, re) => (openBlock(), createElementBlock("div", B_, [
      u.value ? (openBlock(), createBlock(uf, {
        key: 0,
        mode: "load",
        onChosen: Y,
        onClose: re[0] || (re[0] = (Pe) => u.value = false)
      })) : createCommentVNode("", true),
      c.value ? (openBlock(), createBlock(Io, {
        key: 1,
        prompt: "This will override your previous autosave, are you sure?",
        onConfirm: E,
        onRefuse: B
      })) : createCommentVNode("", true),
      createElementVNode("div", q_, [
        createElementVNode("div", V_, [
          createElementVNode("h1", H_, toDisplayString(Q.value), 1)
        ]),
        createElementVNode("div", {
          class: "flex flex-col start-menu-buttons-container",
          ref_key: "buttonsContainer",
          ref: r
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(n.value, (Pe) => (openBlock(), createBlock(R_, {
            key: Pe.id,
            button: Pe,
            onClick: (Me) => T(Pe)
          }, null, 8, ["button", "onClick"]))), 128))
        ], 512)
      ]),
      d.value ? (openBlock(), createBlock(Teleport, {
        key: 2,
        to: "#narrat"
      }, [
        createVNode(lr, {
          onClose: F,
          class: normalizeClass(`start-menu-popup-${d.value.id}`)
        }, {
          header: withCtx(() => [
            createElementVNode("h3", K_, toDisplayString(d.value.text), 1)
          ]),
          body: withCtx(() => [
            d.value.popupComponent ? (openBlock(), createBlock(resolveDynamicComponent(d.value.popupComponent.component), {
              key: 0,
              onClose: F
            }, null, 32)) : createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["class"])
      ])) : createCommentVNode("", true)
    ]));
  }
}), mf = /* @__PURE__ */ hn(G_, [["__scopeId", "data-v-a3f319bb"]]);
function Xo(e2) {
  const t = fl().characters[e2];
  return t || ue(`Character ${e2} not found`), t;
}
function W_(e2, t) {
  const n = Xo(e2);
  if (n && (t || (t = "default"), n.sprites)) {
    const r = n.sprites[t];
    return r === "none" ? void 0 : typeof r == "string" ? {
      image: r
    } : r;
  }
}
function rc(e2) {
  return `${fl().config.imagesPath}${e2}`;
}
function z_(e2) {
  return typeof e2 == "object" && Object.hasOwn(e2, "image");
}
function Q_(e2) {
  return typeof e2 == "object" && Object.hasOwn(e2, "video");
}
function ms(e2) {
  var t;
  return e2 ? ((t = Xo(e2)) == null ? void 0 : t.style) || {} : {};
}
const Y_ = ["src"], J_ = ["autoplay", "loop", "muted"], X_ = ["src"], Z_ = /* @__PURE__ */ defineComponent({
  __name: "dialog-picture",
  props: {
    picture: {},
    video: {},
    character: {},
    pose: {}
  },
  setup(e2) {
    const t = e2, n = computed(() => t.video), r = computed(() => gt().layoutMode), i = computed(() => {
      var u;
      const o = {};
      if (!t.character)
        return {};
      t.character && (o[t.character] = true);
      const l = Xo(t.character);
      return (u = l == null ? void 0 : l.style) != null && u.portraitCssClass && (o[l.style.portraitCssClass] = true), o;
    }), s = computed(() => {
      var p, h;
      const o = gt(), l = de().layout;
      let u = 0, c = 0;
      const m = l.portraits;
      if (r.value === "vertical") {
        const v = ((p = m.offset) == null ? void 0 : p.portrait) ?? {
          right: 0,
          bottom: 0
        };
        u = 20 + v.right, c = o.dialogHeight + v.bottom;
      } else {
        const v = ((h = m.offset) == null ? void 0 : h.landscape) ?? { right: 0, bottom: 0 }, T = de().dialogPanel.rightOffset ?? ua.dialogPanel.rightOffset;
        u = Fo() - 10 + v.right + T, c = 200 + v.bottom;
      }
      let a = l.portraits.width, d = l.portraits.height;
      return t.video && (a = t.video.width ?? a, d = t.video.height ?? d), t.picture && (a = t.picture.width ?? a, d = t.picture.height ?? d), {
        right: `${u}px`,
        bottom: `${c}px`,
        width: `${a}px`,
        height: `${d}px`
      };
    });
    return (o, l) => {
      var u;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["dialog-picture override", i.value]),
        style: normalizeStyle(s.value)
      }, [
        o.picture ? (openBlock(), createElementBlock("img", {
          key: 0,
          src: unref(Wt)(unref(rc)((u = o.picture) == null ? void 0 : u.image)),
          class: normalizeClass(["picture override", i.value])
        }, null, 10, Y_)) : createCommentVNode("", true),
        n.value ? (openBlock(), createElementBlock("video", {
          key: 1,
          class: "picture override",
          autoplay: n.value.autoplay !== false,
          loop: n.value.loop !== false,
          muted: !!n.value.muted
        }, [
          createElementVNode("source", {
            src: unref(Wt)(unref(rc)(n.value.video))
          }, null, 8, X_)
        ], 8, J_)) : createCommentVNode("", true)
      ], 6);
    };
  }
});
function eb() {
  return rn().dialogAudio;
}
function hf(e2) {
  const t = eb();
  if (t) {
    if (t.characterAudio && t.characterAudio[e2])
      return t.characterAudio[e2];
    if (t.defaultAudio)
      return t.defaultAudio;
  }
}
function yf(e2, t) {
  if (typeof t != "string")
    return;
  const n = hf(e2);
  return n == null ? void 0 : n.soundPerLetter;
}
function tb(e2, t) {
  if (typeof t != "string")
    return;
  const n = yf(e2, t);
  if (!n)
    return;
  const r = n;
  let i = "";
  return r.prefix && (i += r.prefix), i += t, r.suffix && (i += r.suffix), i;
}
function nb(e2, t) {
  if (typeof t != "string")
    return;
  const n = t.toLowerCase(), r = tb(e2, n);
  if (typeof r != "string")
    return;
  const i = cn(r);
  if (i) {
    const s = yf(e2, n);
    let o = 1;
    s.volume && (o = s.volume);
    const l = Lt().audioVolume("sound", r) * o;
    i.volume(l), i.play();
  }
}
function rb(e2) {
  const t = hf(e2);
  if (t != null && t.soundOnNewLine) {
    const n = cn(t.soundOnNewLine);
    if (n) {
      const r = Lt().audioVolume("sound", t.soundOnNewLine);
      n.volume(r), n.play();
    }
  }
}
const ib = ["innerHTML"], ob = ["innerHTML"], sb = ["innerHTML"], ab = { key: 1 }, lb = ["onClick", "innerHTML"], cb = { key: 1 }, ub = {
  key: 2,
  class: "buttons-container"
}, db = /* @__PURE__ */ defineComponent({
  __name: "dialog-box",
  props: {
    options: {},
    active: { type: Boolean },
    inputListener: {}
  },
  setup(e2, { expose: t }) {
    const n = ref(null), r = ref(""), i = ref(false), s = ref(null), o = ref(null), l = ref(false), u = ref(null), c = ref(null), m = ref(null), a = ref(null), d = ref(null), p = e2, h = ref(null);
    p.active && (h.value = Wn({
      mode: "list",
      container: n,
      listener: p.inputListener,
      onlyVertical: true,
      onChosen: (M) => {
        ne.value && R.value ? B(R.value[M]) : E(" ");
      }
    })), onMounted(() => {
      Pe(), l.value = true;
    }), onUnmounted(() => {
      v(), Q(), pt({ unmounted: true });
    });
    function v() {
      s.value && (clearTimeout(s.value), s.value = null), T();
    }
    function T() {
      h.value && (h.value.disable(), h.value = null);
    }
    function _(M) {
      E(M.key);
    }
    function E(M) {
      if (!ne.value) {
        l.value && o && M === " " && pt({ pressedSpace: true });
        return;
      }
      if (ne.value && p.options.textField && M === "Enter" && te(), ne.value && !p.options.textField) {
        let ee = -1;
        switch (M) {
          case " ":
            ee = 0;
            break;
          case "1":
            ee = 0;
            break;
          case "2":
            ee = 1;
            break;
          case "3":
            ee = 2;
            break;
          case "4":
            ee = 3;
            break;
          case "5":
            ee = 4;
            break;
          case "6":
            ee = 5;
            break;
          case "7":
            ee = 6;
            break;
          case "8":
            ee = 7;
            break;
        }
        ee !== -1 && R.value && ee < R.value.length ? B(R.value[ee]) : ee === 0 && B(ee);
      }
    }
    function j() {
      ne.value || l.value && o && pt({ pressedSpace: true });
    }
    function F() {
      i.value || B(0);
    }
    function B(M) {
      L();
      let ee;
      typeof M == "object" ? ee = M.originalIndex : ee = M, ke().playerAnswered(ee);
    }
    function L() {
      v(), pt({ unmounted: true }), i.value = true;
    }
    function P(M) {
      const ee = {};
      return M.allowed || (ee.pointerEvents = "none", ee.textDecoration = "line-through"), ee;
    }
    function Z(M, ee) {
      const he = {
        index: M + 1,
        choice: ee.choice
      };
      let fe = '<span class="choice-index">%{$index}. </span> <span class="choice-text">%{$choice}</span>';
      if (Ks().choiceTextTemplate && (fe = Ks().choiceTextTemplate), ee.flag) {
        const we = Ac(ee.flag);
        we != null && we.textTemplate && (fe = we.textTemplate);
      }
      return ou(he, fe);
    }
    function Y(M) {
      const ee = {};
      if (M.allowed || (ee["strike-anim"] = true), M.seenBefore && (ee["seen-before"] = true), M.flag) {
        const he = Ac(M.flag);
        he != null && he.cssClass && (ee[he.cssClass] = true);
      }
      return ee;
    }
    function te() {
      const M = r.value;
      Q(), ke().playerAnswered(M);
    }
    function z() {
      p.options.textField && (s.value = setTimeout(() => {
        ne.value && (d.value = at().registerInputListener(
          "text-field-input-grabber",
          {}
        ), a.value && a.value.focus());
      }, 100));
    }
    function Q() {
      d.value && (at().unregisterInputListener(d.value), d.value = null);
    }
    function X(M, ee) {
      const he = p.options.text.substring(M, ee);
      o.value.text += he;
      const fe = he.substring(0, 1);
      return nb(p.options.styleId, fe), ee;
    }
    function re(M) {
      const ee = M[0];
      return o.value.text += ee, o.value.skippedChars += ee.length, ee.length;
    }
    function Pe() {
      if (!p.options.old)
        if (Ye().playMode === "skip")
          Me();
        else if (rb(p.options.styleId), de().dialogPanel.animateText) {
          o.value = {
            text: "",
            index: 0,
            startTime: Date.now(),
            timer: null,
            skippedChars: 0,
            tags: ih(p.options.text),
            finished: false
          };
          const M = o.value;
          M.timer = setInterval(() => {
            tt();
          }, 30);
        } else
          k.value && (u.value = setTimeout(
            () => {
              pt();
            },
            (de().dialogPanel.textSpeed ?? $o) * p.options.text.length
          ));
    }
    function Me() {
      Ye().playMode === "skip" && !p.options.old && (k.value ? c.value = setTimeout(() => {
        pt();
      }, 100) : (Ye().toggleSkip(), pt({ unmounted: true })));
    }
    function dt() {
      Ye().playMode === "auto" && !p.options.old && k.value && ne && F();
    }
    function tt() {
      const M = o.value;
      if (!M)
        return;
      const ee = M.index, he = Date.now() - M.startTime;
      let fe = false, we = Math.round(
        he / (de().dialogPanel.textSpeed ?? $o)
      ) + M.skippedChars;
      if (we > p.options.text.length && (fe = true, M.finished = true, we = p.options.text.length), we !== M.index) {
        let Ae = ee;
        for (; M.tags.length > 0 && we >= M.tags[0].index; ) {
          Ae = X(Ae, M.tags[0].index);
          const Ve = re(M.tags.shift());
          Ae += Ve, we += Ve;
        }
        Ae = X(Ae, we), M.index = Ae;
      }
      fe && pt();
    }
    function pt({
      unmounted: M,
      pressedSpace: ee
    } = {}) {
      Ie().endTextAnimation(), z(), setTimeout(() => {
        h.value && h.value.select(0);
      }, 10), o.value && (o.value.timer && clearInterval(o.value.timer), o.value = null), u.value && !ee && clearTimeout(u.value), c.value && clearTimeout(c.value), m.value && clearTimeout(m.value), !M && !ee && Ye().playMode !== "normal" && k && (m.value = setTimeout(
        () => {
          F();
        },
        Ye().playMode === "auto" ? de().dialogPanel.timeBetweenLines ?? ni.common.dialogPanel.timeBetweenLines : 0
      ));
    }
    const N = computed(() => p.options.title ? " &nbsp;–&nbsp; " : ""), y = computed(() => ({ ...ms(p.options.styleId).boxCss })), k = computed(() => !R.value && !p.options.textField), C = computed(() => {
      const M = {};
      return p.options.title && (M["dialog-box-followup"] = true), p.options.old ? M["dialog-box-old"] = true : M["dialog-box-new"] = true, M;
    }), g = computed(() => {
      const M = ms(p.options.styleId);
      return { color: M.color, ...M.nameCss };
    }), b = computed(() => ms(p.options.styleId).textCss), $ = computed(() => o.value ? o.value.text : p.options.text), R = computed(() => {
      if (p.options.choices)
        return p.options.choices;
    }), H = computed(() => Ye().playMode === "skip"), ie = computed(() => Ye().playMode === "auto"), ne = computed(() => p.active && l.value && !i.value && !m.value && !o.value && p.options.interactive && !je.value), oe = ke(), je = computed(() => oe.paused);
    return watch(
      () => p.options,
      (M, ee) => {
        !ee.old && M.old && o && pt({ unmounted: true });
      }
    ), watch(H, (M, ee) => {
      M && !ee && Me();
    }), watch(ie, (M, ee) => {
      M && !ee && dt();
    }), t({
      keyboardEvent: _
    }), (M, ee) => {
      const he = resolveDirective("visible");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["dialog-box w-full override", C.value]),
        style: normalizeStyle(y.value)
      }, [
        createElementVNode("div", {
          class: "dialog-content",
          onClick: j
        }, [
          M.options.title ? (openBlock(), createElementBlock("span", {
            key: 0,
            class: "dialog-title override",
            style: normalizeStyle(g.value),
            innerHTML: M.options.title
          }, null, 12, ib)) : createCommentVNode("", true),
          createElementVNode("span", {
            class: "dialog-text dialog-separator override",
            style: normalizeStyle(b.value),
            innerHTML: N.value
          }, null, 12, ob),
          createElementVNode("span", {
            class: normalizeClass(["dialog-text override", M.options.cssClass]),
            style: normalizeStyle(b.value),
            innerHTML: $.value
          }, null, 14, sb),
          M.options.old ? createCommentVNode("", true) : withDirectives((openBlock(), createElementBlock("div", ab, [
            R.value ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "dialog-choices",
              ref_key: "choicesDiv",
              ref: n
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(R.value, (fe, we) => (openBlock(), createElementBlock("p", {
                key: we,
                style: normalizeStyle(P(fe)),
                class: normalizeClass([Y(fe), "dialog-choice override"]),
                onClick: (Ae) => B(fe),
                innerHTML: Z(we, fe)
              }, null, 14, lb))), 128))
            ], 512)) : M.options.textField ? (openBlock(), createElementBlock("div", cb, [
              withDirectives(createElementVNode("input", {
                autofocus: "",
                type: "text",
                class: "label-input nrt-input",
                ref_key: "playerInput",
                ref: a,
                id: "player-input-field",
                "onUpdate:modelValue": ee[0] || (ee[0] = (fe) => r.value = fe)
              }, null, 512), [
                [vModelText, r.value]
              ]),
              createElementVNode("button", {
                onClick: te,
                class: "nrt-button",
                id: "player-input-submit"
              }, " Submit ")
            ])) : (openBlock(), createElementBlock("div", ub, [
              createElementVNode("div", {
                onClick: ee[1] || (ee[1] = (fe) => B(0)),
                ref: "continue",
                class: "interact-button nrt-button override"
              }, " Continue ", 512)
            ]))
          ])), [
            [he, ne.value]
          ])
        ])
      ], 6);
    };
  }
}), fb = {
  key: 0,
  class: "auto-play-feedback-container"
}, pb = /* @__PURE__ */ defineComponent({
  __name: "AutoPlayFeedback",
  setup(e2) {
    const t = Ye(), n = computed(() => t.playMode === "auto"), r = computed(() => t.playMode === "skip"), i = computed(() => n.value ? "auto-play-feedback-auto" : r.value ? "auto-play-feedback-skip" : {}), s = computed(() => n.value ? "Auto Play" : r.value ? "Skip" : "");
    return (o, l) => s.value ? (openBlock(), createElementBlock("div", fb, [
      createElementVNode("div", {
        class: normalizeClass(["auto-play-feedback", i.value])
      }, toDisplayString(s.value), 3)
    ])) : createCommentVNode("", true);
  }
}), mb = /* @__PURE__ */ createElementVNode("div", { class: "anchor" }, null, -1), gf = /* @__PURE__ */ defineComponent({
  __name: "game-dialog",
  setup(e2) {
    const t = computed(() => gt().layoutMode), n = computed(() => at().inGameInputListener), r = ref(ke().inScript), i = ref(null), s = gt(), o = Ie(), l = computed(() => o.stack), u = Ye(), c = computed(() => u.dialog), m = ref(null), a = ref(null), d = ref(null), p = computed(() => {
      let Q = "0px";
      const X = de().layout.dialogBottomPadding;
      return typeof X == "number" ? Q = `${X}px` : typeof X == "string" && (Q = X), {
        paddingBottom: Q
      };
    }), h = computed(() => {
      if (c.value.length > 0)
        return c.value[c.value.length - 1];
    }), v = computed(() => {
      if (h.value)
        return h.value.speaker;
    }), T = computed(() => {
      if (h.value)
        return h.value.pose;
    }), _ = computed(() => {
      if (h.value) {
        const Q = v.value;
        let X = T.value;
        return Q ? (X || (X = "idle"), X) : void 0;
      }
    }), E = computed(() => {
      if (!_.value)
        return;
      const Q = v.value;
      return W_(Q, _.value);
    }), j = computed(() => {
      const Q = E.value;
      if (z_(Q))
        return Q;
    }), F = computed(() => {
      const Q = E.value;
      if (Q_(Q))
        return Q;
    }), B = computed(() => s.dialogWidth), L = computed(() => ke().inScript);
    watch(L, (Q) => {
      Q ? r.value = true : Ye().playMode !== "normal" ? (Ye().playMode === "skip" && (Ye().playMode = "normal"), i.value = setTimeout(() => {
        r.value = false;
      }, 500)) : r.value = false;
    }), onMounted(() => {
      if (n.value) {
        const X = n.value;
        X.actions.autoPlay = {
          press: () => {
            Ye().toggleAutoPlay();
          }
        }, X.actions.skip = {
          press: () => {
            Ye().toggleSkip();
          }
        };
      }
      const Q = (X) => {
        a.value && a.value.keyboardEvent && a.value.keyboardEvent(X);
      };
      Q.value = mn.on("debouncedKeydown", Q);
    }), onUnmounted(() => {
      n.value && (delete n.value.actions.autoPlay, delete n.value.actions.skip), d.value && mn.off("debouncedKeydown", d.value), i.value && clearTimeout(i.value);
    });
    const P = computed(() => {
      let Q;
      const X = `${gt().dialogHeight}px`, re = {};
      if (gt().overlayMode) {
        re.position = "absolute";
        const Pe = de().dialogPanel.rightOffset ?? ni.common.dialogPanel.rightOffset;
        re.right = `${Pe}px`;
        const Me = de().dialogPanel.bottomOffset ?? ni.common.dialogPanel.bottomOffset;
        re.bottom = `${Me}px`;
      }
      return {
        ...re,
        width: t.value === "horizontal" ? `${B.value}px` : "100%",
        height: X,
        transform: Q,
        transformOrigin: "right"
      };
    });
    function Z() {
      Ye().toggleAutoPlay();
    }
    function Y() {
      Ye().toggleSkip();
    }
    function te(Q, X) {
      const re = Xo(Q.speaker);
      let Pe = (re == null ? void 0 : re.name) ?? "Missing Character";
      return X >= 1 && c.value[X - 1].speaker === Q.speaker && (Pe = void 0), Q.choices && Q.choices.forEach((Me) => {
        Me.choice = Vn(Me.choice);
      }), {
        title: Pe ?? "",
        text: Q.text,
        cssClass: Q.cssClass,
        styleId: Q.speaker,
        choices: Q.choices,
        old: X < c.value.length - 1,
        interactive: Q.interactive,
        textField: Q.textField
      };
    }
    function z(Q) {
      return Q === u.dialog.length - 1 && l.value.length > 0;
    }
    return watch(c.value, (Q) => {
      if (m.value) {
        const X = m.value;
        X.scrollTop = X.scrollHeight + 1e8;
      }
    }), (Q, X) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(pb),
      createVNode(Transition, { name: "fade" }, {
        default: withCtx(() => [
          (j.value || F.value) && unref(s).showDialog ? (openBlock(), createBlock(Z_, {
            key: 0,
            picture: j.value,
            video: F.value,
            character: v.value,
            pose: T.value
          }, null, 8, ["picture", "video", "character", "pose"])) : createCommentVNode("", true)
        ]),
        _: 1
      }),
      createVNode(Transition, { name: "dialog-transition" }, {
        default: withCtx(() => [
          unref(s).showDialog ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "dialog override",
            ref_key: "dialogRef",
            ref: m,
            style: normalizeStyle(P.value)
          }, [
            createVNode(TransitionGroup, {
              name: "list",
              tag: "div",
              class: "dialog-container w-full override",
              style: normalizeStyle(p.value)
            }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(c.value, (re, Pe) => (openBlock(), createBlock(db, {
                  ref_for: true,
                  ref: (Me) => a.value = Me,
                  key: re.id,
                  options: te(re, Pe),
                  active: z(Pe),
                  inputListener: n.value
                }, null, 8, ["options", "active", "inputListener"]))), 128))
              ]),
              _: 1
            }, 8, ["style"]),
            (openBlock(), createBlock(Teleport, { to: "#narrat-app" }, [
              createElementVNode("div", { class: "auto-skip-buttons flex" }, [
                createElementVNode("div", {
                  class: "nrt-button menu-toggle-button auto-button auto",
                  onClick: Z
                }, " Auto "),
                createElementVNode("div", {
                  class: "nrt-button menu-toggle-button auto-button skip",
                  onClick: Y
                }, " Skip ")
              ])
            ])),
            mb
          ], 4)) : createCommentVNode("", true)
        ]),
        _: 1
      })
    ], 64));
  }
}), hb = ["id"], yb = ["src"], gb = { class: "tab-title" }, vf = /* @__PURE__ */ defineComponent({
  __name: "tab-selector",
  props: {
    tab: {},
    active: { type: Boolean }
  },
  emits: ["click"],
  setup(e2, { emit: t }) {
    const n = e2, r = t, i = computed(() => n.active ? "tab-active" : "tab-inactive");
    function s() {
      r("click");
    }
    return (o, l) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(["tab", i.value]),
      id: `tab-${o.tab.id}`,
      onClick: s
    }, [
      createElementVNode("div", {
        class: normalizeClass(["tab-title-container", o.active ? "active" : ""])
      }, [
        o.tab.icon ? (openBlock(), createElementBlock("img", {
          key: 0,
          src: o.tab.icon,
          alt: "tab icon",
          class: "tab-icon"
        }, null, 8, yb)) : createCommentVNode("", true),
        createElementVNode("span", gb, toDisplayString(o.tab.label), 1)
      ], 2)
    ], 10, hb));
  }
}), vb = { class: "tabs-controller" }, _b = {
  key: 0,
  class: "tabs-controller__tabs"
}, bb = {
  key: 1,
  class: "tab-content"
}, Tb = { key: 2 }, Sb = /* @__PURE__ */ createElementVNode("div", { class: "tab-content__empty" }, [
  /* @__PURE__ */ createElementVNode("p", null, "No tab selected")
], -1), wb = [
  Sb
], $b = /* @__PURE__ */ defineComponent({
  __name: "TabsController",
  props: {
    tabs: {},
    defaultTab: {}
  },
  emits: ["tab-change", "close"],
  setup(e2, { emit: t }) {
    const n = ref(
      at().registerInputListener("tabs-controller", {
        cancel: {
          press: () => {
            r("close");
          }
        },
        system: {
          press: () => {
            r("close");
          }
        },
        menu: {
          press: () => {
            r("close");
          }
        },
        previousTab: {
          press: () => {
            s.value > 0 && o(s.value - 1);
          }
        },
        nextTab: {
          press: () => {
            s.value < i.tabs.length - 1 && o(s.value + 1);
          }
        }
      })
    ), r = t, i = e2, s = ref(i.defaultTab);
    function o(u) {
      s.value = u, r("tab-change", u);
    }
    const l = computed(() => i.tabs[s.value]);
    return onUnmounted(() => {
      n.value && (at().unregisterInputListener(n.value), n.value = null);
    }), (u, c) => (openBlock(), createElementBlock("div", vb, [
      u.tabs.length > 1 ? (openBlock(), createElementBlock("div", _b, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(u.tabs, (m, a) => (openBlock(), createBlock(vf, {
          key: m.id,
          tab: m,
          active: a === s.value,
          onClick: () => o(a),
          inputListener: n.value
        }, null, 8, ["tab", "active", "onClick", "inputListener"]))), 128))
      ])) : createCommentVNode("", true),
      l.value ? (openBlock(), createElementBlock("div", bb, [
        l.value ? (openBlock(), createBlock(resolveDynamicComponent(l.value.component), {
          key: 0,
          inputListener: n.value,
          onClose: c[0] || (c[0] = (m) => u.$emit("close"))
        }, null, 40, ["inputListener"])) : createCommentVNode("", true)
      ])) : (openBlock(), createElementBlock("div", Tb, wb))
    ]));
  }
}), Cb = { class: "menu-container menu-toggle" }, kb = ["onClick", "id"], Ob = { class: "nrt-title" }, _f = /* @__PURE__ */ defineComponent({
  __name: "menu-buttons",
  setup(e2) {
    const t = jt(), n = ref(null);
    onMounted(() => {
      Re.callHook("onGameMounted");
    }), onUnmounted(() => {
      n.value && mn.off("keydown", n.value), Re.callHook("onGameUnmounted");
    });
    function r(m) {
      jt().activeMenu = m;
    }
    const i = computed(() => t.menus), s = computed(() => t.menu), o = computed(() => {
      var m;
      return (((m = s.value) == null ? void 0 : m.tabs) ?? []).filter((a) => a.condition ? a.condition() : true).map((a) => ({
        id: a.id,
        label: a.text,
        component: a.component
      }));
    });
    function l() {
      t.closeMenu();
    }
    function u(m) {
      t.setActiveTab(m);
    }
    function c() {
      return l();
    }
    return (m, a) => (openBlock(), createElementBlock("div", Cb, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(i.value, (d, p) => (openBlock(), createElementBlock("button", {
        key: d.id,
        onClick: (h) => r(d.id),
        id: d.cssId ?? `${p}-menu-button`,
        class: "nrt-button menu-toggle-button"
      }, toDisplayString(d.label), 9, kb))), 128)),
      s.value ? (openBlock(), createBlock(Teleport, {
        key: 0,
        to: "#narrat"
      }, [
        createVNode(lr, {
          containerCssClass: { [s.value.cssClass]: true, "menu-modal": true },
          onClose: l
        }, {
          header: withCtx(() => {
            var d;
            return [
              createElementVNode("h3", Ob, toDisplayString(((d = unref(t).tab) == null ? void 0 : d.text) ?? s.value.label), 1)
            ];
          }),
          body: withCtx(() => [
            createVNode($b, {
              onTabChange: u,
              onClose: c,
              tabs: o.value,
              defaultTab: s.value.activeTab
            }, null, 8, ["tabs", "defaultTab"])
          ]),
          _: 1
        }, 8, ["containerCssClass"])
      ])) : createCommentVNode("", true)
    ]));
  }
});
function bf(e2) {
  const t = {};
  return e2.selected && (t.selected = true), e2.clickable && e2.viewportClickable && !e2.transitioning && (t.interactable = true), (!e2.clickable || !e2.viewportClickable) && (t["nrt-disabled"] = true), e2.transitioning && (t.transitioning = true), e2.greyed && (t.greyed = true), e2.hidden && (t.hidden = true), e2.cssClass && (t[e2.cssClass] = true), t;
}
function Ab(e2, t, n) {
  return {
    selected: t,
    clickable: e2.onClick !== void 0,
    viewportClickable: Qo(e2),
    transitioning: n,
    greyed: false,
    hidden: false,
    cssClass: e2.cssClass
  };
}
function Eb(e2, t, n) {
  const r = kr(e2), i = pn().getButtonState(e2);
  return {
    selected: t,
    clickable: pn().isButtonInteractible(e2),
    viewportClickable: Qo(r),
    transitioning: n,
    greyed: i === "greyed",
    hidden: i === "hidden" || i === false,
    cssClass: r.cssClass
  };
}
function Ib(e2, t, n) {
  return bf(
    Eb(e2, t, n)
  );
}
function Pb(e2, t, n) {
  return bf(
    Ab(e2, t, n)
  );
}
const Nb = ["id"], xb = ["innerHTML"], jb = /* @__PURE__ */ defineComponent({
  __name: "screen-object",
  props: {
    screenObject: {},
    layerSelected: { type: Boolean },
    transitioning: { type: Boolean },
    activeInteractive: {}
  },
  setup(e2) {
    const t = e2, n = on();
    function r(l) {
      t.transitioning || t.screenObject.onClick && n.clickObject(l);
    }
    const i = computed(() => {
      if (!t.layerSelected)
        return false;
      const l = t.activeInteractive;
      return l.type === "screenObject" && l.id === t.screenObject.id;
    }), s = computed(() => Pb(
      t.screenObject,
      i.value,
      t.transitioning
    )), o = computed(() => {
      const l = {};
      t.screenObject.opacity !== 1 && (l.opacity = t.screenObject.opacity);
      let u = t.screenObject.x, c = t.screenObject.y, m = t.screenObject.width, a = t.screenObject.height;
      if (t.screenObject.anchor) {
        const p = t.screenObject.anchor;
        u = t.screenObject.x - m * p.x, c = t.screenObject.y - a * p.y, l.transformOrigin = `${p.x * 100}% ${p.y * 100}%`;
      }
      t.screenObject.scale && (m = m * t.screenObject.scale, a = a * t.screenObject.scale);
      const d = {
        ...l,
        left: `${u}px`,
        top: `${c}px`,
        width: `${m}px`,
        height: `${a}px`
      };
      return Zv(t.screenObject) && (d.backgroundImage = `url(${eo(t.screenObject.image)})`), d;
    });
    return (l, u) => {
      const c = resolveComponent("ScreenObject", true);
      return openBlock(), createElementBlock("div", {
        tabindex: "-1",
        class: normalizeClass(["viewport-object", s.value]),
        id: `viewport-object-${t.screenObject.id}`,
        onClick: u[0] || (u[0] = (m) => r(l.screenObject)),
        style: normalizeStyle(o.value)
      }, [
        createElementVNode("span", {
          innerHTML: t.screenObject.text ? unref(Vn)(t.screenObject.text) : void 0
        }, null, 8, xb),
        (openBlock(true), createElementBlock(Fragment, null, renderList(t.screenObject.children, (m) => (openBlock(), createBlock(c, {
          transitioning: l.transitioning,
          key: m.id,
          screenObject: m
        }, null, 8, ["transitioning", "screenObject"]))), 128))
      ], 14, Nb);
    };
  }
}), Lb = ["id", "innerHTML"], Db = /* @__PURE__ */ defineComponent({
  __name: "viewport-button",
  props: {
    id: {},
    layerSelected: { type: Boolean },
    transitioning: { type: Boolean },
    activeInteractive: {}
  },
  setup(e2) {
    const t = e2, n = pn();
    computed(() => n.getButtonState(t.id));
    const r = computed(() => kr(t.id)), i = r.value.background ? eo(r.value.background) : null, s = computed(() => {
      if (!t.layerSelected)
        return false;
      const m = t.activeInteractive;
      return m.type === "button" && m.id === t.id;
    });
    computed(() => n.isButtonClickable(t.id));
    const o = computed(() => {
      const m = r.value.text ?? "";
      return Vn(m);
    }), l = computed(() => Ib(t.id, s.value, t.transitioning)), u = computed(() => {
      const m = {};
      r.value.position.width && (m.width = `${r.value.position.width}px`), r.value.position.height && (m.height = `${r.value.position.height}px`), r.value.background && (m.backgroundImage = `url(${i})`);
      let a = r.value.position.left, d = r.value.position.top;
      return r.value.anchor && (a = r.value.position.left - r.value.position.width * r.value.anchor.x, d = r.value.position.top - r.value.position.height * r.value.anchor.y), {
        ...m,
        left: `${a}px`,
        top: `${d}px`
      };
    });
    function c() {
      n.clickOnButton(t.id);
    }
    return (m, a) => (openBlock(), createElementBlock("div", {
      tabindex: "-1",
      class: normalizeClass(["viewport-button", l.value]),
      id: `viewport-button-${m.id}`,
      onClick: a[0] || (a[0] = (d) => c()),
      style: normalizeStyle(u.value),
      innerHTML: o.value
    }, null, 14, Lb));
  }
}), Rb = ["id"], Mb = ["id", "loop", "muted"], Fb = ["src"], Ub = ["id"], hs = /* @__PURE__ */ defineComponent({
  __name: "screen-layer",
  props: {
    layer: {},
    layerIndex: {},
    transitioning: { type: Boolean },
    activeInteractive: {}
  },
  setup(e2) {
    const t = e2, n = ke(), r = on(), i = computed(() => !!(t.activeInteractive && t.activeInteractive.layer === t.layerIndex)), s = computed(() => r.tree.filter((T) => T.layer === t.layerIndex)), o = computed(() => de().layout.backgrounds.width), l = computed(() => de().layout.backgrounds.height), u = computed(() => t.layer), c = computed(() => {
      const T = Zi(u.value);
      return T || ue(`Screen ${u.value} doesn't have a config`), T;
    }), m = computed(() => n.isInGame), a = computed(() => c.value.buttons || []), d = computed(() => c.value.video), p = computed(() => ({
      width: `${o.value}px`,
      height: `${l.value}px`
    })), h = computed(() => {
      let T;
      return c.value.background !== Ko && (T = `url(${eo(c.value.background)})`), {
        backgroundImage: T,
        position: "absolute",
        left: 0,
        top: 0,
        width: `${o.value}px`,
        height: `${l.value}px`
      };
    }), v = computed(() => ({
      position: "absolute",
      left: 0,
      top: 0,
      width: `${o.value}px`,
      height: `${l.value}px`
    }));
    return (T, _) => m.value ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: "viewport-layer",
      id: `viewport-layer-${u.value}`,
      style: normalizeStyle(p.value)
    }, [
      d.value ? (openBlock(), createElementBlock("video", {
        key: 0,
        class: "viewport-layer-background",
        id: `viewport-layer-background-${u.value}`,
        style: normalizeStyle(v.value),
        autoplay: "",
        loop: d.value.loop !== false,
        muted: !!d.value.muted
      }, [
        createElementVNode("source", {
          src: unref(Wt)(c.value.background)
        }, null, 8, Fb)
      ], 12, Mb)) : (openBlock(), createElementBlock("div", {
        key: 1,
        class: "viewport-layer-background",
        id: `viewport-layer-background-${u.value}`,
        style: normalizeStyle(h.value)
      }, null, 12, Ub)),
      (openBlock(true), createElementBlock(Fragment, null, renderList(a.value, (E) => (openBlock(), createBlock(Db, {
        key: E,
        id: E,
        layerSelected: i.value,
        transitioning: T.transitioning,
        activeInteractive: T.activeInteractive
      }, null, 8, ["id", "layerSelected", "transitioning", "activeInteractive"]))), 128)),
      (openBlock(true), createElementBlock(Fragment, null, renderList(s.value, (E) => (openBlock(), createBlock(jb, {
        key: E.id,
        screenObject: E,
        transitioning: T.transitioning,
        layerSelected: i.value,
        activeInteractive: T.activeInteractive
      }, null, 8, ["screenObject", "transitioning", "layerSelected", "activeInteractive"]))), 128))
    ], 12, Rb)) : createCommentVNode("", true);
  }
}), Bb = /* @__PURE__ */ defineComponent({
  __name: "NarratTransition",
  props: {
    name: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    delay: Number
  },
  emits: ["complete"],
  setup(e2, { emit: t }) {
    useSlots();
    const n = t, r = e2, i = ref("start"), s = reactive({
      oldSlotClasses: {},
      oldSlotStyle: {},
      newSlotClasses: {},
      newSlotStyle: {}
    });
    return onMounted(async () => {
      const o = `narrat-transition-${r.name}`;
      s.newSlotClasses = {
        [`${o}-enter-from`]: true
      }, s.oldSlotClasses = {
        [`${o}-leave-active`]: true
      }, await Kt(30), s.oldSlotStyle = {
        transitionDuration: `${r.duration / 1e3}s`
      }, s.newSlotStyle = {
        transitionDuration: `${r.duration / 1e3}s`
      }, s.oldSlotClasses[`${o}-leave-to`] = true, s.newSlotClasses[`${o}-enter-active`] = true, await Kt(r.delay ?? 0), delete s.newSlotClasses[`${o}-enter-from`], await Kt(r.duration), i.value = "end", n("complete");
    }), (o, l) => (openBlock(), createElementBlock(Fragment, null, [
      i.value !== "end" ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(["transition-holder", s.oldSlotClasses]),
        style: normalizeStyle(s.oldSlotStyle)
      }, [
        renderSlot(o.$slots, "oldElement")
      ], 6)) : createCommentVNode("", true),
      createElementVNode("div", {
        class: normalizeClass(["transition-holder", s.newSlotClasses]),
        style: normalizeStyle(s.newSlotStyle)
      }, [
        renderSlot(o.$slots, "newElement")
      ], 6)
    ], 64));
  }
});
function ic(e2, t, n) {
  return e2 < t ? t : e2 > n ? n : e2;
}
const Tf = /* @__PURE__ */ defineComponent({
  __name: "screens",
  setup(e2) {
    const t = computed(() => at().inGameInputListener), n = ke(), r = pn(), i = on(), s = ref(0), o = computed(() => r.nonEmptyLayers), l = computed(() => {
      const h = [];
      return o.value.reduce((v, T, _) => {
        const j = Zi(T.screen).buttons;
        if (j)
          for (const B of j)
            r.isButtonClickable(B) && v.push({
              id: B,
              type: "button",
              layer: _
            });
        const F = i.tree.filter((B) => B.layer === _);
        for (const B of F)
          i.isScreenObjectClickable(B) && v.push({
            id: B.id,
            type: "screenObject",
            layer: _
          });
        return v;
      }, h);
    }), u = computed(() => {
      if (l.value.length === 0)
        return null;
      let h = s.value;
      return h > l.value.length - 1 && (h = l.value.length - 1), l.value[h];
    }), c = computed(() => de().layout.backgrounds.width), m = computed(() => de().layout.backgrounds.height), a = computed(() => n.isInGame);
    function d(h) {
      r.finishTransition(h);
    }
    const p = computed(() => {
      const h = c.value;
      return {
        height: `${m.value}px`,
        width: `${h}px`
      };
    });
    return onMounted(() => {
      nextTick(() => {
        if (t.value) {
          const h = t.value.actions;
          h.previousTab = {
            press: () => {
              s.value > 0 ? s.value-- : s.value = l.value.length - 1, s.value = ic(
                s.value,
                0,
                l.value.length - 1
              );
            }
          }, h.left = h.previousTab, h.nextTab = {
            press: () => {
              s.value < l.value.length - 1 ? s.value++ : s.value = 0, s.value = ic(
                s.value,
                0,
                l.value.length - 1
              );
            }
          }, h.right = h.nextTab, h.viewportSelect = {
            press: () => {
              if (u.value) {
                const v = u.value;
                v.type === "button" ? r.clickOnButton(v.id) : v.type === "screenObject" && i.clickObject(
                  i.getObject(v.id)
                );
              }
            }
          };
        }
      });
    }), onUnmounted(() => {
      if (t.value) {
        const h = t.value;
        delete h.actions.previousTab, delete h.actions.left, delete h.actions.nextTab, delete h.actions.right;
      }
    }), (h, v) => a.value ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: "viewport",
      id: "narrat-viewport",
      style: normalizeStyle(p.value)
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(o.value, (T, _) => (openBlock(), createElementBlock("div", {
        key: T.screen ?? "",
        class: "layer-container"
      }, [
        T.transition ? (openBlock(), createBlock(Bb, {
          key: 0,
          name: T.transition.transition,
          duration: T.transition.duration,
          delay: T.transition.delay,
          onComplete: () => d(_)
        }, {
          oldElement: withCtx(() => [
            T.transition.oldScreen ? (openBlock(), createBlock(hs, {
              key: 0,
              layer: T.transition.oldScreen,
              layerIndex: _,
              transitioning: true
            }, null, 8, ["layer", "layerIndex"])) : createCommentVNode("", true)
          ]),
          newElement: withCtx(() => [
            T.screen ? (openBlock(), createBlock(hs, {
              key: 0,
              layer: T.screen,
              layerIndex: _,
              transitioning: true
            }, null, 8, ["layer", "layerIndex"])) : createCommentVNode("", true)
          ]),
          _: 2
        }, 1032, ["name", "duration", "delay", "onComplete"])) : T.screen ? (openBlock(), createBlock(hs, {
          key: 1,
          layer: T.screen,
          layerIndex: _,
          transitioning: false,
          activeInteractive: u.value
        }, null, 8, ["layer", "layerIndex", "activeInteractive"])) : createCommentVNode("", true)
      ]))), 128))
    ], 4)) : createCommentVNode("", true);
  }
}), Xt = bt("hud", {
  state: () => ({
    hudStats: {},
    visible: true
  }),
  actions: {
    updateConfig(e2) {
      for (const t in e2.hudStats)
        this.hudStats[t] || (this.hudStats[t] = {
          value: e2.hudStats[t].startingValue
        });
    },
    reset(e2) {
      this.$reset(), this.updateConfig(e2);
    },
    setStat(e2, t) {
      this.hudStats[e2].value = t, this.getStat(e2).value < (wr(e2).minValue ?? 0) && (this.hudStats[e2].value = wr(e2).minValue ?? 0), this.getStat(e2).value > (wr(e2).maxValue ?? 1 / 0) && (this.hudStats[e2].value = wr(e2).maxValue ?? 1 / 0);
    },
    addStat(e2, t) {
      this.setStat(e2, this.getStatValue(e2) + t);
    },
    getStat(e2) {
      return this.hudStats[e2];
    },
    getStatValue(e2) {
      return this.hudStats[e2].value;
    },
    generateSaveData() {
      return {
        hudStats: ze(this.hudStats),
        visible: this.visible
      };
    },
    loadSaveData(e2) {
      this.hudStats = Ir(this.hudStats, e2.hudStats), this.visible = e2.visible;
    },
    setVisibility(e2) {
      this.visible = e2;
    }
  }
}), qb = defineComponent({
  data() {
    return {};
  },
  methods: {
    getStatImage(e2) {
      return Wt(this.statsConfig[e2].icon);
    },
    formatStat(e2, t) {
      var l;
      const n = wr(e2), r = n.decimals ?? 2, i = Math.floor(t * 10 ** r) / 10 ** r, s = {};
      (l = n.formatting) != null && l.style && (s.style = n.formatting.style, n.formatting.style === "currency" && (s.currency = n.formatting.currency ?? "USD", s.currencyDisplay = "narrowSymbol"), n.formatting.style === "unit" && (s.unit = n.formatting.unit ?? "day"));
      let o;
      try {
        o = i.toLocaleString(void 0, s);
      } catch (u) {
        ue(
          `Error formatting HUD stat, probably using an invalid config: ${u}`
        ), console.error(u), o = i.toLocaleString();
      }
      return o;
    },
    statPrefix(e2) {
      const t = wr(e2);
      return t.prefix ?? (t.suffix || t.hideName ? "" : t.name);
    },
    statSuffix(e2) {
      return wr(e2).suffix ?? "";
    }
  },
  computed: {
    ...Oi(Xt, ["hudStats"]),
    ...Oi(gt, ["layoutMode"]),
    statsConfig() {
      return de().hudStats;
    },
    stats() {
      return this.hudStats;
    },
    hudStyle() {
      let e2 = "0";
      return this.layoutMode === "horizontal" && (e2 = `${Fo() + (de().dialogPanel.rightOffset ?? ni.common.dialogPanel.rightOffset)}px`), {
        right: e2
      };
    },
    hasHud() {
      return Xt().visible === false ? false : Object.keys(Xt().hudStats).length > 0;
    }
  }
}), Vb = ["src"], Hb = ["innerHTML"], Kb = ["innerHTML"];
function Gb(e2, t, n, r, i, s) {
  return e2.hasHud ? (openBlock(), createElementBlock("div", {
    key: 0,
    class: "hud",
    style: normalizeStyle(e2.hudStyle)
  }, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(e2.stats, (o, l) => (openBlock(), createElementBlock("div", {
      key: l,
      class: "hud-stat"
    }, [
      createElementVNode("img", {
        class: "hud-icon",
        src: e2.getStatImage(l)
      }, null, 8, Vb),
      createElementVNode("span", {
        class: "bold hud-text",
        innerHTML: e2.statPrefix(l)
      }, null, 8, Hb),
      createElementVNode("span", null, toDisplayString(e2.formatStat(l, o.value)), 1),
      e2.statSuffix ? (openBlock(), createElementBlock("span", {
        key: 0,
        innerHTML: e2.statSuffix(l)
      }, null, 8, Kb)) : createCommentVNode("", true)
    ]))), 128))
  ], 4)) : createCommentVNode("", true);
}
const Sf = /* @__PURE__ */ hn(qb, [["render", Gb]]), wf = /* @__PURE__ */ defineComponent({
  __name: "in-game",
  setup(e2) {
    const t = at(), n = computed(() => t.inGameInputListener), r = ke(), i = gt(), s = computed(() => i.layoutMode), o = computed(() => r.saving), l = ref(null), u = Ye(), c = ref(null), m = computed(
      () => o.value && !o.value.withPrompt || o.value && l.value
    ), a = computed(() => {
      let v = "row";
      return s.value === "vertical" && (v = "column"), {
        flexDirection: v
      };
    });
    function d(v) {
      if (l.value = null, v === null) {
        ys(v, false);
        return;
      }
      ys(v, true);
    }
    function p() {
      l.value = true;
    }
    function h() {
      l.value = false, ys(null, false), l.value = null;
    }
    return onBeforeMount(() => {
      t.createInGameInputListener();
    }), onMounted(() => {
      c.value = mn.on("debouncedKeydown", (v) => {
        ke().debugMode || ((v.key === "a" || v.key === "A") && u.toggleAutoPlay(), (v.key === "s" || v.key === "S") && u.toggleSkip());
      });
    }), onUnmounted(() => {
      n.value && t.removeInGameInputListener(), c.value && mn.off("debouncedKeydown", c.value);
    }), computed(() => Xt().visible === false ? false : Object.keys(Xt().hudStats).length > 0), (v, T) => (openBlock(), createElementBlock("div", {
      class: "game",
      style: normalizeStyle(a.value)
    }, [
      createVNode(Sf),
      createVNode(_f),
      createVNode(Tf),
      createVNode(gf),
      m.value ? (openBlock(), createBlock(uf, {
        key: 0,
        mode: "pick",
        onChosen: d,
        onClose: T[0] || (T[0] = () => d(null))
      })) : createCommentVNode("", true),
      o.value && o.value.withPrompt && l.value === null ? (openBlock(), createBlock(Io, {
        key: 1,
        prompt: "Would you like to save the game?",
        onConfirm: p,
        onRefuse: h
      })) : createCommentVNode("", true)
    ], 4));
  }
}), Wb = { class: "chapter-title-scene" }, zb = ["innerHTML"], Qb = ["innerHTML"], Yb = /* @__PURE__ */ defineComponent({
  __name: "chapter-title",
  props: {
    options: {}
  },
  setup(e2) {
    const t = e2, n = ref(null);
    function r() {
      n.value = null, Jt().changeScene("playing"), Ie().jumpToLabel(t.options.next_label);
    }
    return onMounted(() => {
      n.value = setTimeout(r, t.options.duration ?? 2e3);
    }), onUnmounted(() => {
      n.value && (clearTimeout(n.value), n.value = null);
    }), (i, s) => (openBlock(), createElementBlock("div", Wb, [
      createElementVNode("h1", {
        class: "title chapter-title",
        innerHTML: t.options.title
      }, null, 8, zb),
      t.options.subtitle ? (openBlock(), createElementBlock("h2", {
        key: 0,
        class: "subtitle chapter-subtitle",
        innerHTML: t.options.subtitle
      }, null, 8, Qb)) : createCommentVNode("", true)
    ]));
  }
}), oc = {
  "engine-splash": {
    id: "engine-splash",
    component: shallowRef(af),
    props: {}
  },
  "game-splash": {
    id: "game-splash",
    component: shallowRef(cf),
    props: {}
  },
  "start-menu": {
    id: "start-menu",
    component: shallowRef(mf),
    props: {}
  },
  playing: {
    id: "playing",
    component: shallowRef(wf),
    props: {}
  },
  "chapter-title": {
    id: "chapter-title",
    component: shallowRef(Yb),
    props: {}
  }
};
let In = {};
function Jb(e2) {
  In = e2;
}
function Xb() {
  oc["engine-splash"].onFinished = () => {
    Jt().onEngineSplashFinished();
  }, Jt().scenes = oc;
}
function Zb() {
  return In;
}
function $f() {
  for (const e2 in In) {
    const t = In[e2], n = t.store();
    let r;
    t_(t) && (r = et()[t.config]), n.reset && !t.avoidReset && n.reset(r);
  }
  Re.plugins.forEach((e2) => {
    e2.reset && e2.reset();
  });
}
function eT() {
  const e2 = {}, t = {};
  for (const n in In) {
    const r = In[n];
    if (of(r)) {
      const i = r.store();
      i.generateSaveData ? e2[r.save] = i.generateSaveData() : ue(
        `Store ${n} has no generateSaveData method. Trying to generate save data for ${r.save}`
      );
    }
    if (sf(r)) {
      const i = r.store();
      i.generateGlobalSaveData ? t[r.globalSave] = i.generateGlobalSaveData() : ue(
        `Store ${n} has no generateGlobalSaveData method. Trying to generate save data for ${r.globalSave}`
      );
    }
  }
  return Re.plugins.forEach((n) => {
    n.save && (e2.plugins[n.pluginId] = n.save());
  }), Re.customStores().forEach(([n, r]) => {
    if (r.save) {
      const i = r.save();
      i && (i.customStores[n] = i);
    }
  }), {
    gameSave: e2,
    globalSave: t
  };
}
function tT(e2) {
  for (const t in In) {
    const n = In[t];
    if (of(n)) {
      const r = n.store();
      r.loadSaveData ? r.loadSaveData(e2[n.save]) : ue(
        `Store ${t} has no loadSaveData method. Trying to load save data for ${n.save}`
      );
    }
  }
  Re.plugins.forEach((t) => {
    t.load && e2.plugins[t.pluginId] && t.load(e2.plugins[t.pluginId]);
  }), Re.customStores().forEach(([t, n]) => {
    n.load && n.load(e2.customStores[t]);
  });
}
function Cf(e2) {
  for (const t in In) {
    const n = In[t];
    if (sf(n)) {
      const r = n.store();
      r.loadGlobalSaveData ? r.loadGlobalSaveData(e2[n.globalSave]) : ue(
        `Store ${t} has no loadGlobalSaveData method. Trying to load global save data for ${n.globalSave}`
      );
    }
  }
}
function nT(e2) {
  tT(e2.gameSave), Cf(e2.globalSave);
}
function Ta({
  slotId: e2,
  name: t
}) {
  const n = ke(), r = e2 ?? n.saveSlot;
  n.saveData = Cm({
    slot: r,
    name: t,
    extractedSave: eT()
  });
}
function rT(e2) {
  nT(e2);
}
function kf() {
  Ie().globalData = {}, Gn().globalSave.data = {}, Ta({});
}
function Of({
  saveName: e2,
  withPrompt: t
}) {
  return new Promise((n) => {
    Ie().hasJumped ? ke().startManualSave(n, e2, t) : n();
  });
}
function ys(e2, t) {
  var r;
  const n = ke();
  if (!n.saving) {
    ue("No saving in progress!");
    return;
  }
  if (!t || !e2) {
    n.cancelManualSave();
    return;
  }
  n.saveData ? (km(
    n.saveData,
    Qr(n.playTime.start, n.playTime.previousPlaytime),
    e2.slotId,
    (r = n.saving) == null ? void 0 : r.name
  ), n.alert("Success", "Game saved!")) : ue("There was no data to save!"), n.cancelManualSave();
}
const Ie = bt("vm", {
  state: () => ({
    stack: [],
    data: {},
    globalData: {},
    lastLabel: "main",
    script: {},
    labelStack: ["main"],
    commandsWaitingForPlayerAnswer: [],
    promisesWaitingForTextAnimation: [],
    hasJumped: false
  }),
  actions: {
    generateSaveData() {
      return {
        lastLabel: this.lastLabel,
        data: Gs(this.data, (e2) => nc(e2) ? {
          _entityType: e2._entityType,
          id: e2.id
        } : e2)
      };
    },
    generateGlobalSaveData() {
      return {
        data: ze(this.globalData)
      };
    },
    loadSaveData(e2) {
      this.lastLabel = e2.lastLabel, this.data = e2.data, this.findEntitiesInData(this.data);
    },
    loadGlobalSaveData(e2) {
      this.globalData = e2.data;
    },
    findEntitiesInData(e2) {
      nf(this.data, (t, n, r) => {
        if (nc(t)) {
          const i = on().getObject(t.id);
          i ? r[n] = i : li(
            `Trying to reload sprite ${n} (${JSON.stringify(t)} - ${t.id}) but it does not exist.`
          );
        }
      });
    },
    setReturnValue(e2) {
      this.currentFrame.returnValue = e2;
    },
    waitForPlayerAnswer(e2) {
      this.commandsWaitingForPlayerAnswer.push(e2);
    },
    waitForEndTextAnimation() {
      return new Promise((e2) => {
        this.promisesWaitingForTextAnimation.push(e2);
      });
    },
    endTextAnimation() {
      for (const e2 of this.promisesWaitingForTextAnimation)
        e2();
      this.promisesWaitingForTextAnimation = [];
    },
    popAnswerQueue() {
      return this.commandsWaitingForPlayerAnswer.pop();
    },
    addScopedVariable(e2, t) {
      this.currentFrame && (this.currentFrame.scope[e2] = t);
    },
    async loadScripts(e2) {
      this.readGlobalData();
      const t = await this.loadConfigScriptFiles(e2), n = ke().options.scripts;
      this.addAllScripts([...t, ...n]);
    },
    async loadConfigScriptFiles(e2) {
      const t = [];
      for (const r of e2)
        t.push(va(ml(r)));
      return (await Promise.all(t)).map((r, i) => ({
        fileName: e2[i],
        code: r,
        id: e2[i],
        type: "script"
      }));
    },
    addAllScripts(e2) {
      const t = Date.now();
      for (const r of e2)
        Re.addNarratScript(r);
      const n = Date.now();
      fn.log(`scripts parsed in ${n - t} ms`);
    },
    start() {
      this.setStack({
        currentIndex: 0,
        branchData: {
          branch: Re.script.main.branch
        },
        label: "main"
      }), this.setStack({
        currentIndex: 0,
        branchData: {
          branch: Re.script.main.branch
        },
        label: "main"
      });
    },
    setLastLabel(e2) {
      this.lastLabel = e2;
    },
    reset() {
      this.$reset(), this.stack = [], this.data = {}, this.hasJumped = true, this.setStack({
        currentIndex: 0,
        branchData: {
          branch: Re.script.main.branch
        },
        label: "main"
      });
    },
    readGlobalData() {
      this.globalData = Gn().globalSave.data;
    },
    setScript(e2) {
      Re.script = e2;
    },
    overrideData(e2) {
      this.data = e2;
    },
    setStack(e2) {
      this.stack = [];
      const t = this.frameOptionsToFrame(e2);
      this.lastLabel = e2.label, this.stack.push(t);
    },
    frameOptionsToFrame(e2) {
      const t = e2.branchData, n = {
        ...e2,
        blocks: [],
        scope: {},
        returnValue: null
      };
      if (this.addBlock(n, {
        branchData: t,
        currentIndex: e2.currentIndex
      }), e2.scope && (n.scope = e2.scope), e2.args && e2.branchData.args)
        for (const [r, i] of e2.branchData.args.entries())
          e2.args.length > r && (n.scope[i] = e2.args[r]);
      return n;
    },
    addBlock(e2, t) {
      e2.blocks.push(t);
    },
    async addAndRunBlock(e2) {
      const t = this.currentFrame;
      if (!t)
        throw new Error("No frame to add block to");
      return this.addBlock(t, e2), await this.runBlock();
    },
    setData(e2, t) {
      const n = ai();
      Ap(n, e2, t);
    },
    addInstruction(e2, t) {
      const n = ai();
      Ep(n, e2, t);
    },
    addFrame(e2) {
      if (!e2.label)
        if (this.currentFrame)
          e2.label = this.currentFrame.label;
        else
          throw new Error(
            "Tried to add a new frame but no label was passed and there is no current frame label"
          );
      const t = this.frameOptionsToFrame(
        e2
      );
      this.stack.push(t);
    },
    async addAndRunFrame(e2) {
      return await this.addFrame(e2), await this.runFrame();
    },
    async runFrame() {
      if (!this.currentFrame)
        throw new Error("Tried to run a frame but there is no current frame");
      let t;
      for (; this.currentBlock; ) {
        const n = await this.runBlock();
        if (n === So || n === wo)
          return this.cleanFrame(), n;
        if (n === ca)
          return this.cleanFrame();
      }
      return this.cleanFrame(), t;
    },
    cleanFrame() {
      const e2 = this.currentFrame, { returnValue: t } = e2;
      return this.stack.splice(this.stack.length - 1, 1), t;
    },
    async runBlock() {
      const e2 = this.currentBlock;
      if (!e2)
        throw new Error("Tried to run a block but there is no current block");
      let t;
      for (; this.currentLine; ) {
        if (t = await this.runLineOnly(), xh(t))
          return this.cleanBlock(), t;
        e2.currentIndex++;
      }
      return this.cleanBlock(), t;
    },
    cleanBlock() {
      if (!this.currentFrame) {
        ue("Tried to clean a block but there is no current frame");
        return;
      }
      if (!this.currentFrame.blocks) {
        ue("Tried to clean a block but there is no current block");
        return;
      }
      this.currentFrame.blocks.splice(this.currentFrame.blocks.length - 1, 1);
    },
    async runGame() {
      let e2 = await this.runFrame();
      for (; e2 === So; ) {
        const t = this.jumpTarget;
        if (!t) {
          ue("Tried to jump but no target was set");
          return;
        }
        this.hasJumped = true, this.setStack(t), await Ta({}), e2 = await this.runFrame();
      }
      e2 !== wo && this.stack.length === 0 && this.reachedEndOfScript();
    },
    async nextLineOnly() {
      return this.stack.length === 0 || this.isBlockFinished() ? false : (this.currentBlock.currentIndex++, true);
    },
    isBlockFinished() {
      return !this.currentBlock || this.currentBlock && this.currentBlock.currentIndex >= this.currentBlock.branchData.branch.length;
    },
    reachedEndOfScript() {
      if (de().gameFlow.labelToJumpOnScriptEnd && this.lastLabel !== de().gameFlow.labelToJumpOnScriptEnd) {
        this.jumpToLabel(de().gameFlow.labelToJumpOnScriptEnd);
        return;
      }
      ke().endingScript(), ke().options.debug && de().debugging.showScriptFinishedMessage;
    },
    async runLineOnly() {
      const e2 = this.currentLine;
      if (!e2) {
        ue("There is no line of script to run.");
        return;
      }
      return ke().startingScript(), await Pf(e2);
    },
    async runLabelFunction(e2, ...t) {
      const n = Re.script[e2];
      if (!n) {
        ue(`Tried to run a label that doesn't exist: ${e2}`);
        return;
      }
      const r = {
        currentIndex: 0,
        branchData: n,
        label: e2,
        args: t
      };
      return this.addAndRunFrame(r);
    },
    runCustomFrame(e2) {
      this.addAndRunFrame(e2);
    },
    async jumpToLabel(e2, ...t) {
      const n = Re.script[e2];
      if (!n) {
        ue(
          `Label ${e2} doesn't exist. Is the file with this label added in the list of script files to load in the config?`
        );
        return;
      }
      e2 !== this.lastLabel && (this.hasJumped = true), this.setLastLabel(e2), this.setStack({
        currentIndex: 0,
        branchData: n,
        args: t,
        label: e2
      }), this.runGame();
    },
    async runThenGoBackToPreviousDialog(e2, ...t) {
      const n = Ye(), r = n.dialog[n.dialog.length - 1], i = ke().inScript, s = await this.runLabelFunction(e2, ...t);
      return i ? n.dialog.push(r) : ke().endingScript(), s;
    }
  },
  getters: {
    currentFrame(e2) {
      return e2.stack[e2.stack.length - 1];
    },
    scope() {
      var e2;
      return ((e2 = this.currentFrame) == null ? void 0 : e2.scope) ?? {};
    },
    currentBlock() {
      const e2 = this.currentFrame;
      return e2 ? e2.blocks[e2.blocks.length - 1] : void 0;
    },
    currentLine() {
      const e2 = this.currentBlock;
      if (e2 && e2.branchData.branch.length > e2.currentIndex)
        return e2.branchData.branch[e2.currentIndex];
    },
    commandWaitingForAnswer() {
      if (this.commandsWaitingForPlayerAnswer.length > 0)
        return this.commandsWaitingForPlayerAnswer[0];
    }
  }
}), Af = new na();
Af.setupDebugger(false);
const tn = Af.logger;
function iT(e2) {
  return oT(
    (t, n, r) => bT(t, n, r),
    e2.code,
    e2.fileName
  );
}
function oT(e2, t, n) {
  const r = {
    fileName: n,
    currentLine: 0,
    error: (o, l) => e2(r, o, l),
    processCommandsFunction: Ds,
    indentSize: 0
    // Will be overriden soon
  };
  r.indentSize = hT(r, t);
  const i = fT(r, t);
  r.currentLine = 0, tn.log(i);
  const s = {};
  for (const o of i) {
    o.code.search(":") === -1 && r.error(
      o.line,
      "First indentation level should only be used to specify labels"
    );
    const u = o.code.replace(":", "").split(/ +/g), c = u[0], m = u.slice(1);
    o.branch || r.error(o.line, "This line should have a branch but doesn't"), s[c] = {
      branch: Ds(r, o.branch, void 0),
      args: m
    };
  }
  return s;
}
function Ds(e2, t, n) {
  const r = e2.currentLine;
  if (!t) {
    let o = 0;
    return n && (o = n.line), e2.error(
      o,
      "Processing of command failed because the current branch has no lines inside"
    ), [];
  }
  const i = {
    processCommandsFunction: Ds,
    parserContext: e2,
    lines: t,
    currentLine: 0,
    line: t[0]
  }, s = [];
  for (; i.currentLine < t.length; ) {
    const o = t[i.currentLine];
    i.line = o;
    const l = Sa(e2, o, o.expression), u = Re.commands[l.command.operator];
    let c = u == null ? void 0 : u.parser;
    c || (c = Re.commands.text.parser), tn.log(Re.commands.text);
    const { newLine: m } = c(i, l);
    i.currentLine = m, e2.currentLine = r + m, s.push(l);
  }
  return s;
}
function Sa(e2, t, n) {
  tn.log(n), typeof n[0] != "string" && e2.error(t.line, "Expression operator should be a string");
  const r = {
    code: t.code,
    fileName: e2.fileName,
    line: t.line,
    command: {
      staticOptions: {},
      commandType: n[0],
      operator: n[0],
      args: n.slice(1).map((o) => sT(e2, t, o)),
      options: {}
    }
  }, i = n[0];
  if (!Re.commands[i]) {
    const o = ["else", "success", "failure"];
    !rh(i) && !o.includes(i) && e2.error(t.line, `Unknown command ${i}`);
  }
  return r;
}
function sT(e2, t, n) {
  return Array.isArray(n) ? Sa(e2, t, n) : n;
}
function aT(e2) {
  return e2 === "true" ? true : e2 === "false" ? false : e2 === "undefined" ? void 0 : e2 === null ? null : isNaN(Number(e2)) ? e2 : Number(e2);
}
function lT(e2, t) {
  t.charAt(t.length - 1) === ":" && (t = t.substr(0, t.length - 1));
  const n = cT(t), [r] = Ef(e2, n);
  return r;
}
function cT(e2) {
  const t = /(["'])(?:\\\1|.)*?\1/g, n = [];
  let r;
  for (; (r = t.exec(e2)) != null; )
    n.push(r);
  let i = 0, s = [];
  for (const o of n) {
    const l = o.index;
    if (l > i) {
      const c = e2.substr(i, l - i), m = sc(c);
      s = [...s, ...m];
    }
    const u = o[0].replace(/\\/g, "");
    s.push(`$$"${u.substring(1, u.length - 1)}`), i = l + o[0].length;
  }
  return s = [...s, ...sc(e2.substr(i))], s.push(")"), s;
}
function sc(e2) {
  e2 = e2.replace(/: *$/g, "");
  let t = e2.split(" ").filter((n) => n);
  return t = t.reduce(
    (n, r) => [...n, ...r.split(/(\(|\))/g)].filter((i) => i && i),
    []
  ), t.map((n) => aT(n));
}
function Ef(e2, t) {
  tn.log("===============");
  let n = [], r = 0, i = ac(t) + r, s = gs(t) + r;
  for (tn.log(`Parsing expression: ${t}`), tn.log(
    `Parenthesis start index: ${i} - end: ${s}`
  ); i !== -1 && s > i; ) {
    n = [...n, ...t.slice(r, i)];
    const u = t.slice(i + 1);
    tn.log(
      `Found a sub expression. Before: ${n} - After: ${u}`
    ), r = i;
    const [c, m] = Ef(
      e2,
      u
    ), a = r + m;
    n.push(c), r = a + 1;
    const d = t.slice(r);
    tn.log(
      `Sub expression came back: ${c} - rest of string: ${d}`
    ), i = ac(d), i !== -1 && (i += r), s = gs(d), s !== -1 && (s += r);
  }
  s !== -1 && tn.log(
    "Found parenthesis end before new opening parenthesis, close this expression"
  );
  const o = gs(t.slice(r)) + r;
  if (o === -1)
    return e2.error(
      e2.currentLine,
      'Expression is not closed (missing ")" closing parenthesis)'
    ), [n, o];
  const l = t.slice(r, o);
  return tn.log(`End of expression: ${o} - ${l}`), tn.log("==================="), n = [...n, ...l], uT(e2, n), [n, o + 1];
}
function uT(e2, t) {
  t.length < 1 && e2.error(e2.currentLine, "Expression is empty");
}
function ac(e2) {
  return e2.findIndex((t) => t === "(");
}
function gs(e2) {
  return e2.findIndex((t) => t === ")");
}
function dT(e2, t) {
  return t.split(/\r?\n|$/).reduce((r, i, s) => {
    const o = {
      code: i,
      line: s,
      multiline: false
    }, l = i.search(/\\$/);
    l !== -1 && (o.multiline = true, i = i.substring(0, l));
    const u = i.search(/ *\/\//g);
    return u !== -1 && (i = i.substring(0, u)), o.code = i, o.code.search(/^\s*$/) === -1 && (r.length > 0 && r[r.length - 1].multiline ? (r[r.length - 1].code += i, r[r.length - 1].multiline = o.multiline) : r.push(o)), r;
  }, []);
}
function fT(e2, t) {
  const n = dT(e2, t);
  return If(e2, n, 0, 0).lines;
}
function If(e2, t, n, r) {
  let i = true, s = n;
  const o = [];
  for (; i && !(s >= t.length); ) {
    const l = t[s];
    let u = l.code;
    const c = mT(e2, u);
    if (u = u.substring(c * e2.indentSize), pT(e2, c, s), c < r)
      i = false;
    else if (c > r) {
      (o.length === 0 || c - r !== 1) && e2.error(l.line, "Wrong double indentation");
      const m = If(e2, t, s, c);
      o[o.length - 1].branch = m.lines, s = m.endLine;
    } else {
      const m = lT(e2, u), a = {
        code: u,
        indentation: c,
        line: l.line,
        expression: m
      };
      o.push(a), s++, e2.currentLine = s;
    }
  }
  return {
    lines: o,
    endLine: s
  };
}
function pT(e2, t, n) {
  t % 1 !== 0 && e2.error(
    n,
    `Indentation level of ${t} incorrect. Expected indentation of ${e2.indentSize} spaces for this file.`
  );
}
function mT(e2, t) {
  return t.search(/[^ ]/) / e2.indentSize;
}
function hT(e2, t) {
  const n = t.match(/: *[\n\r]+( *)/);
  return !n || n.length < 2 ? (e2.error(
    0,
    "Can't detect indentation level. Make sure you indent with at least 2 spaces and consistently"
  ), 0) : (tn.log(n), n[1].length);
}
class yT {
  constructor() {
    qe(this, "plugins", []);
    qe(this, "pinia");
    qe(this, "script", {});
    qe(this, "scripts", []);
    qe(this, "commands", {});
  }
  addCommand(t) {
    this.commands[t.keyword] = t;
  }
  addPlugin(t) {
    if (this.plugins.push(t), t.customCommands)
      for (const n of t.customCommands)
        this.addCommand(n);
  }
  callHook(t, ...n) {
    for (const r of this.plugins)
      typeof r[t] == "function" && r[t](...n);
  }
  addNarratScript(t) {
    const n = iT(t);
    this.script = { ...this.script, ...n }, this.scripts.push(t);
  }
  customStores() {
    const t = [];
    for (const n of this.plugins)
      if (n.customStores)
        for (const r in n.customStores)
          t.push([r, n.customStores[r](this.pinia)]);
    return t;
  }
  addCustomSettings() {
    for (const t of this.plugins)
      if (t.customSettings)
        for (const n in t.customSettings)
          En().addCustomSetting(n, t.customSettings[n]);
  }
}
const Re = new yT();
async function Pf(e2, t) {
  var r;
  const n = Ie();
  try {
    return await Zo(e2, t);
  } catch (i) {
    console.error(i), console.error(e2), ue(
      `Narrat script runtime error at  <span class="error-filename">${e2.fileName}:${e2.line + 1}</span>
      <b>${i}</b>
      Script: ${e2.code}
      Label: ${((r = n.currentFrame) == null ? void 0 : r.label) || "none"}`
    );
  }
}
async function gT(e2, t) {
  const n = e2.command, r = Re.commands[n.commandType];
  if (r) {
    const i = {
      args: [],
      options: {},
      operator: n.operator,
      staticOptions: n.staticOptions,
      code: e2.code,
      commandType: n.commandType,
      fileName: e2.fileName,
      line: e2.line
    }, s = r.argTypes;
    i.options = {};
    for (const [o, l] of n.args.entries()) {
      let u;
      if (fd(l))
        u = await Zo(l, t);
      else if (typeof l == "string")
        if (l.search(au) === 0)
          u = Vn(l.substring(3));
        else if (pd(l)) {
          const c = ai(), m = O$(c, l);
          if (m) {
            const [a, d] = m;
            u = a[d];
          } else
            u = l;
        } else
          u = l;
      else
        u = l;
      if (i.args.push(u), Array.isArray(s) && s.length > o) {
        const c = s[o];
        u !== null && (i.options[c.name] = u);
      }
    }
    return i;
  } else
    throw new Error(`${n.commandType} is not a valid command`);
}
async function Zo(e2, t) {
  const n = await gT(e2, t), r = Re.commands[n.commandType];
  if (r)
    return await r.run(n, t);
  throw new Error(`${n.commandType} is not a valid command`);
}
async function Nf(e2) {
  Er("onPlayerAnswered");
  const t = Ie(), n = t.popAnswerQueue(), r = t.currentLine;
  try {
    if (n) {
      const i = Re.commands[n.commandType];
      if (i)
        return await i.processPlayerAnswer(n, e2);
    }
  } catch (i) {
    console.error(i), ue(
      `Error after player answer at ${r.fileName}:${r.line + 1} (${r.code}<br /> - Error: ${i}`
    );
  }
}
function vT() {
  return {
    baseAssetsPath: "",
    baseDataPath: "",
    configPath: "data/config.json",
    logging: false,
    debug: false,
    scripts: [],
    container: "#game-holder"
  };
}
class _T extends _a {
}
const ke = bt("main", {
  state: () => ({
    ready: false,
    playing: false,
    errors: [],
    playTime: {
      start: 0,
      previousPlaytime: 0
    },
    saveSlot: "",
    paused: false,
    debugMode: true,
    options: {
      baseAssetsPath: "",
      baseDataPath: "",
      configPath: "data/config.json",
      logging: false,
      debug: false,
      scripts: []
    },
    loading: {
      step: "Loading",
      percentage: 0.1,
      loaded: false
    },
    alerts: [],
    saving: null,
    listener: new _T(),
    inScript: false
  }),
  actions: {
    setLoadingStep(e2, t) {
      this.loading.step = e2, this.loading.percentage = t;
    },
    gameLoaded() {
      this.loading.loaded = true, this.listener.emit("gameLoaded");
    },
    async alert(e2, t) {
      return new Promise((n) => {
        this.alerts.push({
          title: e2,
          text: t,
          resolver: n,
          id: ti()
        });
      });
    },
    closeAlert(e2) {
      const t = this.alerts.findIndex((n) => n.id === e2);
      t !== -1 && (this.alerts[t].resolver(), this.alerts.splice(t, 1));
    },
    startingScript() {
      Dt().onScriptStart(), this.inScript = true;
    },
    endingScript() {
      Dt().onScriptEnd(), this.inScript = false;
    },
    prepareToPlay() {
      this.ready = true, this.startPlaying(), Jt().changeScene("playing");
    },
    setSaveSlot(e2) {
      this.saveSlot = e2, _m(e2);
    },
    startManualSave(e2, t, n) {
      this.saving = {
        name: t,
        withPrompt: n,
        resolver: e2
      };
    },
    cancelManualSave() {
      this.saving && (this.saving.resolver(), this.saving = null);
    },
    playerAnswered(e2) {
      Nf(e2);
    },
    menuReturn() {
      Jt().changeScene("start-menu");
    },
    createError(e2) {
      this.errors.push({
        text: e2,
        type: "error"
      });
    },
    createWarning(e2) {
      this.errors.push({
        text: e2,
        type: "warning"
      });
    },
    clearErrors() {
      this.errors = [];
    },
    pause() {
      this.paused = true;
    },
    unpause() {
      this.paused = false;
    },
    setOptions(e2) {
      this.options = e2;
    },
    startPlaying() {
      this.playing = true, this.playTime.start = Date.now();
    },
    reset() {
      this.ready = false, this.paused = false, this.playing = false, this.ready = true;
    },
    generateSaveData() {
      return {
        playTime: Qr(
          this.playTime.start,
          this.playTime.previousPlaytime
        )
      };
    },
    loadSaveData(e2) {
      this.playTime.previousPlaytime = e2.playTime;
    },
    exitGame() {
      window.close();
    }
  },
  getters: {
    isInGame(e2) {
      return Jt().isPlaying;
    },
    totalPlayTime(e2) {
      return Qr(e2.playTime.start, e2.playTime.previousPlaytime);
    },
    sessionPlayTime(e2) {
      return Qr(e2.playTime.start, 0);
    },
    hasCustomContainer(e2) {
      return (e2.options.container ?? "") !== "#game-holder";
    }
  }
});
function bT(e2, t, n) {
  console.error(`Parser error: ${e2.fileName}:${e2.currentLine}`, n);
  const r = `[Parser Error] in <span class="error-filename">${e2.fileName}:${t + 1}</span> - <b>${n}</b>`;
  ue(r);
}
function ue(e2, ...t) {
  const n = ke();
  console.error(e2, ...t), e2 = e2.replace(/[\r\n]/g, `
<br />`), n.createError(`❌ ${e2}`);
}
function li(e2, ...t) {
  const n = ke();
  console.warn(e2, ...t), e2 = e2.replace(/[\r\n]/g, `
<br />`), n.createWarning(`⚠️ ${e2}`);
}
const wa = f.Type.Object({
  screens: f.Type.Union([f.Type.String(), Mu]),
  buttons: f.Type.Optional(f.Type.Union([f.Type.String(), Lu])),
  skills: f.Type.Optional(f.Type.Union([f.Type.String(), qu])),
  skillChecks: f.Type.Optional(
    f.Type.Union([f.Type.String(), Xu])
  ),
  scripts: f.Type.Optional(f.Type.Union([f.Type.String(), ku])),
  audio: f.Type.Union([f.Type.String(), pu]),
  tooltips: f.Type.Optional(f.Type.Union([f.Type.String(), Gu])),
  items: f.Type.Optional(f.Type.Union([f.Type.String(), Iu])),
  achievements: f.Type.Optional(
    f.Type.Union([f.Type.String(), Yu])
  ),
  quests: f.Type.Optional(f.Type.Union([f.Type.String(), Nu])),
  characters: f.Type.Union([f.Type.String(), Hu]),
  choices: f.Type.Optional(f.Type.Union([f.Type.String(), td])),
  animations: f.Type.Optional(
    f.Type.Union([f.Type.String(), id])
  ),
  macros: f.Type.Optional(sd),
  preload: f.Type.Optional(ld)
}), xf = f.Type.Intersect([
  wa,
  f.Type.Object({
    common: Ou
  })
]), jf = f.Type.Intersect([
  wa,
  f.Type.Object({
    baseAssetsPath: f.Type.Optional(f.Type.String()),
    baseDataPath: f.Type.Optional(f.Type.String()),
    gameTitle: f.Type.String(),
    saveFileName: f.Type.String(),
    images: f.Type.Optional(f.Type.Record(f.Type.String(), f.Type.String())),
    layout: hu,
    settings: f.Type.Optional(yu),
    gameFlow: f.Type.Optional(
      f.Type.Object({
        labelToJumpOnScriptEnd: f.Type.Optional(f.Type.String())
      })
    ),
    dialogPanel: f.Type.Optional(gu),
    splashScreens: f.Type.Optional(vu),
    notifications: f.Type.Optional(_u),
    hudStats: bu,
    interactionTags: f.Type.Optional(Tu),
    transitions: f.Type.Optional(Su),
    menuButtons: f.Type.Optional(wu),
    debugging: f.Type.Optional($u),
    saves: f.Type.Optional(Cu)
  })
]), Lf = f.Type.Union([
  xf,
  jf
]);
function $a(e2) {
  return "common" in e2;
}
var Rs = { exports: {} }, Df = {}, dn = {}, oi = {}, Wi = {}, Ue = {}, qi = {};
(function(e2) {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.regexpCode = e2.getEsmExportName = e2.getProperty = e2.safeStringify = e2.stringify = e2.strConcat = e2.addCodeArg = e2.str = e2._ = e2.nil = e2._Code = e2.Name = e2.IDENTIFIER = e2._CodeOrName = void 0;
  class t {
  }
  e2._CodeOrName = t, e2.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class n extends t {
    constructor(E) {
      if (super(), !e2.IDENTIFIER.test(E))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = E;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      return false;
    }
    get names() {
      return { [this.str]: 1 };
    }
  }
  e2.Name = n;
  class r extends t {
    constructor(E) {
      super(), this._items = typeof E == "string" ? [E] : E;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return false;
      const E = this._items[0];
      return E === "" || E === '""';
    }
    get str() {
      var E;
      return (E = this._str) !== null && E !== void 0 ? E : this._str = this._items.reduce((j, F) => `${j}${F}`, "");
    }
    get names() {
      var E;
      return (E = this._names) !== null && E !== void 0 ? E : this._names = this._items.reduce((j, F) => (F instanceof n && (j[F.str] = (j[F.str] || 0) + 1), j), {});
    }
  }
  e2._Code = r, e2.nil = new r("");
  function i(_, ...E) {
    const j = [_[0]];
    let F = 0;
    for (; F < E.length; )
      l(j, E[F]), j.push(_[++F]);
    return new r(j);
  }
  e2._ = i;
  const s = new r("+");
  function o(_, ...E) {
    const j = [p(_[0])];
    let F = 0;
    for (; F < E.length; )
      j.push(s), l(j, E[F]), j.push(s, p(_[++F]));
    return u(j), new r(j);
  }
  e2.str = o;
  function l(_, E) {
    E instanceof r ? _.push(...E._items) : E instanceof n ? _.push(E) : _.push(a(E));
  }
  e2.addCodeArg = l;
  function u(_) {
    let E = 1;
    for (; E < _.length - 1; ) {
      if (_[E] === s) {
        const j = c(_[E - 1], _[E + 1]);
        if (j !== void 0) {
          _.splice(E - 1, 3, j);
          continue;
        }
        _[E++] = "+";
      }
      E++;
    }
  }
  function c(_, E) {
    if (E === '""')
      return _;
    if (_ === '""')
      return E;
    if (typeof _ == "string")
      return E instanceof n || _[_.length - 1] !== '"' ? void 0 : typeof E != "string" ? `${_.slice(0, -1)}${E}"` : E[0] === '"' ? _.slice(0, -1) + E.slice(1) : void 0;
    if (typeof E == "string" && E[0] === '"' && !(_ instanceof n))
      return `"${_}${E.slice(1)}`;
  }
  function m(_, E) {
    return E.emptyStr() ? _ : _.emptyStr() ? E : o`${_}${E}`;
  }
  e2.strConcat = m;
  function a(_) {
    return typeof _ == "number" || typeof _ == "boolean" || _ === null ? _ : p(Array.isArray(_) ? _.join(",") : _);
  }
  function d(_) {
    return new r(p(_));
  }
  e2.stringify = d;
  function p(_) {
    return JSON.stringify(_).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e2.safeStringify = p;
  function h(_) {
    return typeof _ == "string" && e2.IDENTIFIER.test(_) ? new r(`.${_}`) : i`[${_}]`;
  }
  e2.getProperty = h;
  function v(_) {
    if (typeof _ == "string" && e2.IDENTIFIER.test(_))
      return new r(`${_}`);
    throw new Error(`CodeGen: invalid export name: ${_}, use explicit $id name mapping`);
  }
  e2.getEsmExportName = v;
  function T(_) {
    return new r(_.toString());
  }
  e2.regexpCode = T;
})(qi);
var Ms = {};
(function(e2) {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.ValueScope = e2.ValueScopeName = e2.Scope = e2.varKinds = e2.UsedValueState = void 0;
  const t = qi;
  class n extends Error {
    constructor(c) {
      super(`CodeGen: "code" for ${c} not defined`), this.value = c.value;
    }
  }
  var r;
  (function(u) {
    u[u.Started = 0] = "Started", u[u.Completed = 1] = "Completed";
  })(r = e2.UsedValueState || (e2.UsedValueState = {})), e2.varKinds = {
    const: new t.Name("const"),
    let: new t.Name("let"),
    var: new t.Name("var")
  };
  class i {
    constructor({ prefixes: c, parent: m } = {}) {
      this._names = {}, this._prefixes = c, this._parent = m;
    }
    toName(c) {
      return c instanceof t.Name ? c : this.name(c);
    }
    name(c) {
      return new t.Name(this._newName(c));
    }
    _newName(c) {
      const m = this._names[c] || this._nameGroup(c);
      return `${c}${m.index++}`;
    }
    _nameGroup(c) {
      var m, a;
      if (!((a = (m = this._parent) === null || m === void 0 ? void 0 : m._prefixes) === null || a === void 0) && a.has(c) || this._prefixes && !this._prefixes.has(c))
        throw new Error(`CodeGen: prefix "${c}" is not allowed in this scope`);
      return this._names[c] = { prefix: c, index: 0 };
    }
  }
  e2.Scope = i;
  class s extends t.Name {
    constructor(c, m) {
      super(m), this.prefix = c;
    }
    setValue(c, { property: m, itemIndex: a }) {
      this.value = c, this.scopePath = (0, t._)`.${new t.Name(m)}[${a}]`;
    }
  }
  e2.ValueScopeName = s;
  const o = (0, t._)`\n`;
  class l extends i {
    constructor(c) {
      super(c), this._values = {}, this._scope = c.scope, this.opts = { ...c, _n: c.lines ? o : t.nil };
    }
    get() {
      return this._scope;
    }
    name(c) {
      return new s(c, this._newName(c));
    }
    value(c, m) {
      var a;
      if (m.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const d = this.toName(c), { prefix: p } = d, h = (a = m.key) !== null && a !== void 0 ? a : m.ref;
      let v = this._values[p];
      if (v) {
        const E = v.get(h);
        if (E)
          return E;
      } else
        v = this._values[p] = /* @__PURE__ */ new Map();
      v.set(h, d);
      const T = this._scope[p] || (this._scope[p] = []), _ = T.length;
      return T[_] = m.ref, d.setValue(m, { property: p, itemIndex: _ }), d;
    }
    getValue(c, m) {
      const a = this._values[c];
      if (a)
        return a.get(m);
    }
    scopeRefs(c, m = this._values) {
      return this._reduceValues(m, (a) => {
        if (a.scopePath === void 0)
          throw new Error(`CodeGen: name "${a}" has no value`);
        return (0, t._)`${c}${a.scopePath}`;
      });
    }
    scopeCode(c = this._values, m, a) {
      return this._reduceValues(c, (d) => {
        if (d.value === void 0)
          throw new Error(`CodeGen: name "${d}" has no value`);
        return d.value.code;
      }, m, a);
    }
    _reduceValues(c, m, a = {}, d) {
      let p = t.nil;
      for (const h in c) {
        const v = c[h];
        if (!v)
          continue;
        const T = a[h] = a[h] || /* @__PURE__ */ new Map();
        v.forEach((_) => {
          if (T.has(_))
            return;
          T.set(_, r.Started);
          let E = m(_);
          if (E) {
            const j = this.opts.es5 ? e2.varKinds.var : e2.varKinds.const;
            p = (0, t._)`${p}${j} ${_} = ${E};${this.opts._n}`;
          } else if (E = d == null ? void 0 : d(_))
            p = (0, t._)`${p}${E}${this.opts._n}`;
          else
            throw new n(_);
          T.set(_, r.Completed);
        });
      }
      return p;
    }
  }
  e2.ValueScope = l;
})(Ms);
(function(e2) {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.or = e2.and = e2.not = e2.CodeGen = e2.operators = e2.varKinds = e2.ValueScopeName = e2.ValueScope = e2.Scope = e2.Name = e2.regexpCode = e2.stringify = e2.getProperty = e2.nil = e2.strConcat = e2.str = e2._ = void 0;
  const t = qi, n = Ms;
  var r = qi;
  Object.defineProperty(e2, "_", { enumerable: true, get: function() {
    return r._;
  } }), Object.defineProperty(e2, "str", { enumerable: true, get: function() {
    return r.str;
  } }), Object.defineProperty(e2, "strConcat", { enumerable: true, get: function() {
    return r.strConcat;
  } }), Object.defineProperty(e2, "nil", { enumerable: true, get: function() {
    return r.nil;
  } }), Object.defineProperty(e2, "getProperty", { enumerable: true, get: function() {
    return r.getProperty;
  } }), Object.defineProperty(e2, "stringify", { enumerable: true, get: function() {
    return r.stringify;
  } }), Object.defineProperty(e2, "regexpCode", { enumerable: true, get: function() {
    return r.regexpCode;
  } }), Object.defineProperty(e2, "Name", { enumerable: true, get: function() {
    return r.Name;
  } });
  var i = Ms;
  Object.defineProperty(e2, "Scope", { enumerable: true, get: function() {
    return i.Scope;
  } }), Object.defineProperty(e2, "ValueScope", { enumerable: true, get: function() {
    return i.ValueScope;
  } }), Object.defineProperty(e2, "ValueScopeName", { enumerable: true, get: function() {
    return i.ValueScopeName;
  } }), Object.defineProperty(e2, "varKinds", { enumerable: true, get: function() {
    return i.varKinds;
  } }), e2.operators = {
    GT: new t._Code(">"),
    GTE: new t._Code(">="),
    LT: new t._Code("<"),
    LTE: new t._Code("<="),
    EQ: new t._Code("==="),
    NEQ: new t._Code("!=="),
    NOT: new t._Code("!"),
    OR: new t._Code("||"),
    AND: new t._Code("&&"),
    ADD: new t._Code("+")
  };
  class s {
    optimizeNodes() {
      return this;
    }
    optimizeNames(g, b) {
      return this;
    }
  }
  class o extends s {
    constructor(g, b, $) {
      super(), this.varKind = g, this.name = b, this.rhs = $;
    }
    render({ es5: g, _n: b }) {
      const $ = g ? n.varKinds.var : this.varKind, R = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${$} ${this.name}${R};` + b;
    }
    optimizeNames(g, b) {
      if (g[this.name.str])
        return this.rhs && (this.rhs = re(this.rhs, g, b)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class l extends s {
    constructor(g, b, $) {
      super(), this.lhs = g, this.rhs = b, this.sideEffects = $;
    }
    render({ _n: g }) {
      return `${this.lhs} = ${this.rhs};` + g;
    }
    optimizeNames(g, b) {
      if (!(this.lhs instanceof t.Name && !g[this.lhs.str] && !this.sideEffects))
        return this.rhs = re(this.rhs, g, b), this;
    }
    get names() {
      const g = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return X(g, this.rhs);
    }
  }
  class u extends l {
    constructor(g, b, $, R) {
      super(g, $, R), this.op = b;
    }
    render({ _n: g }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + g;
    }
  }
  class c extends s {
    constructor(g) {
      super(), this.label = g, this.names = {};
    }
    render({ _n: g }) {
      return `${this.label}:` + g;
    }
  }
  class m extends s {
    constructor(g) {
      super(), this.label = g, this.names = {};
    }
    render({ _n: g }) {
      return `break${this.label ? ` ${this.label}` : ""};` + g;
    }
  }
  class a extends s {
    constructor(g) {
      super(), this.error = g;
    }
    render({ _n: g }) {
      return `throw ${this.error};` + g;
    }
    get names() {
      return this.error.names;
    }
  }
  class d extends s {
    constructor(g) {
      super(), this.code = g;
    }
    render({ _n: g }) {
      return `${this.code};` + g;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(g, b) {
      return this.code = re(this.code, g, b), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class p extends s {
    constructor(g = []) {
      super(), this.nodes = g;
    }
    render(g) {
      return this.nodes.reduce((b, $) => b + $.render(g), "");
    }
    optimizeNodes() {
      const { nodes: g } = this;
      let b = g.length;
      for (; b--; ) {
        const $ = g[b].optimizeNodes();
        Array.isArray($) ? g.splice(b, 1, ...$) : $ ? g[b] = $ : g.splice(b, 1);
      }
      return g.length > 0 ? this : void 0;
    }
    optimizeNames(g, b) {
      const { nodes: $ } = this;
      let R = $.length;
      for (; R--; ) {
        const H = $[R];
        H.optimizeNames(g, b) || (Pe(g, H.names), $.splice(R, 1));
      }
      return $.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((g, b) => Q(g, b.names), {});
    }
  }
  class h extends p {
    render(g) {
      return "{" + g._n + super.render(g) + "}" + g._n;
    }
  }
  class v extends p {
  }
  class T extends h {
  }
  T.kind = "else";
  class _ extends h {
    constructor(g, b) {
      super(b), this.condition = g;
    }
    render(g) {
      let b = `if(${this.condition})` + super.render(g);
      return this.else && (b += "else " + this.else.render(g)), b;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const g = this.condition;
      if (g === true)
        return this.nodes;
      let b = this.else;
      if (b) {
        const $ = b.optimizeNodes();
        b = this.else = Array.isArray($) ? new T($) : $;
      }
      if (b)
        return g === false ? b instanceof _ ? b : b.nodes : this.nodes.length ? this : new _(Me(g), b instanceof _ ? [b] : b.nodes);
      if (!(g === false || !this.nodes.length))
        return this;
    }
    optimizeNames(g, b) {
      var $;
      if (this.else = ($ = this.else) === null || $ === void 0 ? void 0 : $.optimizeNames(g, b), !!(super.optimizeNames(g, b) || this.else))
        return this.condition = re(this.condition, g, b), this;
    }
    get names() {
      const g = super.names;
      return X(g, this.condition), this.else && Q(g, this.else.names), g;
    }
  }
  _.kind = "if";
  class E extends h {
  }
  E.kind = "for";
  class j extends E {
    constructor(g) {
      super(), this.iteration = g;
    }
    render(g) {
      return `for(${this.iteration})` + super.render(g);
    }
    optimizeNames(g, b) {
      if (super.optimizeNames(g, b))
        return this.iteration = re(this.iteration, g, b), this;
    }
    get names() {
      return Q(super.names, this.iteration.names);
    }
  }
  class F extends E {
    constructor(g, b, $, R) {
      super(), this.varKind = g, this.name = b, this.from = $, this.to = R;
    }
    render(g) {
      const b = g.es5 ? n.varKinds.var : this.varKind, { name: $, from: R, to: H } = this;
      return `for(${b} ${$}=${R}; ${$}<${H}; ${$}++)` + super.render(g);
    }
    get names() {
      const g = X(super.names, this.from);
      return X(g, this.to);
    }
  }
  class B extends E {
    constructor(g, b, $, R) {
      super(), this.loop = g, this.varKind = b, this.name = $, this.iterable = R;
    }
    render(g) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(g);
    }
    optimizeNames(g, b) {
      if (super.optimizeNames(g, b))
        return this.iterable = re(this.iterable, g, b), this;
    }
    get names() {
      return Q(super.names, this.iterable.names);
    }
  }
  class L extends h {
    constructor(g, b, $) {
      super(), this.name = g, this.args = b, this.async = $;
    }
    render(g) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(g);
    }
  }
  L.kind = "func";
  class P extends p {
    render(g) {
      return "return " + super.render(g);
    }
  }
  P.kind = "return";
  class Z extends h {
    render(g) {
      let b = "try" + super.render(g);
      return this.catch && (b += this.catch.render(g)), this.finally && (b += this.finally.render(g)), b;
    }
    optimizeNodes() {
      var g, b;
      return super.optimizeNodes(), (g = this.catch) === null || g === void 0 || g.optimizeNodes(), (b = this.finally) === null || b === void 0 || b.optimizeNodes(), this;
    }
    optimizeNames(g, b) {
      var $, R;
      return super.optimizeNames(g, b), ($ = this.catch) === null || $ === void 0 || $.optimizeNames(g, b), (R = this.finally) === null || R === void 0 || R.optimizeNames(g, b), this;
    }
    get names() {
      const g = super.names;
      return this.catch && Q(g, this.catch.names), this.finally && Q(g, this.finally.names), g;
    }
  }
  class Y extends h {
    constructor(g) {
      super(), this.error = g;
    }
    render(g) {
      return `catch(${this.error})` + super.render(g);
    }
  }
  Y.kind = "catch";
  class te extends h {
    render(g) {
      return "finally" + super.render(g);
    }
  }
  te.kind = "finally";
  class z {
    constructor(g, b = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...b, _n: b.lines ? `
` : "" }, this._extScope = g, this._scope = new n.Scope({ parent: g }), this._nodes = [new v()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(g) {
      return this._scope.name(g);
    }
    // reserves unique name in the external scope
    scopeName(g) {
      return this._extScope.name(g);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(g, b) {
      const $ = this._extScope.value(g, b);
      return (this._values[$.prefix] || (this._values[$.prefix] = /* @__PURE__ */ new Set())).add($), $;
    }
    getScopeValue(g, b) {
      return this._extScope.getValue(g, b);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(g) {
      return this._extScope.scopeRefs(g, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(g, b, $, R) {
      const H = this._scope.toName(b);
      return $ !== void 0 && R && (this._constants[H.str] = $), this._leafNode(new o(g, H, $)), H;
    }
    // `const` declaration (`var` in es5 mode)
    const(g, b, $) {
      return this._def(n.varKinds.const, g, b, $);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(g, b, $) {
      return this._def(n.varKinds.let, g, b, $);
    }
    // `var` declaration with optional assignment
    var(g, b, $) {
      return this._def(n.varKinds.var, g, b, $);
    }
    // assignment code
    assign(g, b, $) {
      return this._leafNode(new l(g, b, $));
    }
    // `+=` code
    add(g, b) {
      return this._leafNode(new u(g, e2.operators.ADD, b));
    }
    // appends passed SafeExpr to code or executes Block
    code(g) {
      return typeof g == "function" ? g() : g !== t.nil && this._leafNode(new d(g)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...g) {
      const b = ["{"];
      for (const [$, R] of g)
        b.length > 1 && b.push(","), b.push($), ($ !== R || this.opts.es5) && (b.push(":"), (0, t.addCodeArg)(b, R));
      return b.push("}"), new t._Code(b);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(g, b, $) {
      if (this._blockNode(new _(g)), b && $)
        this.code(b).else().code($).endIf();
      else if (b)
        this.code(b).endIf();
      else if ($)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(g) {
      return this._elseNode(new _(g));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new T());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(_, T);
    }
    _for(g, b) {
      return this._blockNode(g), b && this.code(b).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(g, b) {
      return this._for(new j(g), b);
    }
    // `for` statement for a range of values
    forRange(g, b, $, R, H = this.opts.es5 ? n.varKinds.var : n.varKinds.let) {
      const ie = this._scope.toName(g);
      return this._for(new F(H, ie, b, $), () => R(ie));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(g, b, $, R = n.varKinds.const) {
      const H = this._scope.toName(g);
      if (this.opts.es5) {
        const ie = b instanceof t.Name ? b : this.var("_arr", b);
        return this.forRange("_i", 0, (0, t._)`${ie}.length`, (ne) => {
          this.var(H, (0, t._)`${ie}[${ne}]`), $(H);
        });
      }
      return this._for(new B("of", R, H, b), () => $(H));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(g, b, $, R = this.opts.es5 ? n.varKinds.var : n.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(g, (0, t._)`Object.keys(${b})`, $);
      const H = this._scope.toName(g);
      return this._for(new B("in", R, H, b), () => $(H));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(E);
    }
    // `label` statement
    label(g) {
      return this._leafNode(new c(g));
    }
    // `break` statement
    break(g) {
      return this._leafNode(new m(g));
    }
    // `return` statement
    return(g) {
      const b = new P();
      if (this._blockNode(b), this.code(g), b.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(P);
    }
    // `try` statement
    try(g, b, $) {
      if (!b && !$)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const R = new Z();
      if (this._blockNode(R), this.code(g), b) {
        const H = this.name("e");
        this._currNode = R.catch = new Y(H), b(H);
      }
      return $ && (this._currNode = R.finally = new te(), this.code($)), this._endBlockNode(Y, te);
    }
    // `throw` statement
    throw(g) {
      return this._leafNode(new a(g));
    }
    // start self-balancing block
    block(g, b) {
      return this._blockStarts.push(this._nodes.length), g && this.code(g).endBlock(b), this;
    }
    // end the current self-balancing block
    endBlock(g) {
      const b = this._blockStarts.pop();
      if (b === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const $ = this._nodes.length - b;
      if ($ < 0 || g !== void 0 && $ !== g)
        throw new Error(`CodeGen: wrong number of nodes: ${$} vs ${g} expected`);
      return this._nodes.length = b, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(g, b = t.nil, $, R) {
      return this._blockNode(new L(g, b, $)), R && this.code(R).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(L);
    }
    optimize(g = 1) {
      for (; g-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(g) {
      return this._currNode.nodes.push(g), this;
    }
    _blockNode(g) {
      this._currNode.nodes.push(g), this._nodes.push(g);
    }
    _endBlockNode(g, b) {
      const $ = this._currNode;
      if ($ instanceof g || b && $ instanceof b)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${b ? `${g.kind}/${b.kind}` : g.kind}"`);
    }
    _elseNode(g) {
      const b = this._currNode;
      if (!(b instanceof _))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = b.else = g, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const g = this._nodes;
      return g[g.length - 1];
    }
    set _currNode(g) {
      const b = this._nodes;
      b[b.length - 1] = g;
    }
  }
  e2.CodeGen = z;
  function Q(C, g) {
    for (const b in g)
      C[b] = (C[b] || 0) + (g[b] || 0);
    return C;
  }
  function X(C, g) {
    return g instanceof t._CodeOrName ? Q(C, g.names) : C;
  }
  function re(C, g, b) {
    if (C instanceof t.Name)
      return $(C);
    if (!R(C))
      return C;
    return new t._Code(C._items.reduce((H, ie) => (ie instanceof t.Name && (ie = $(ie)), ie instanceof t._Code ? H.push(...ie._items) : H.push(ie), H), []));
    function $(H) {
      const ie = b[H.str];
      return ie === void 0 || g[H.str] !== 1 ? H : (delete g[H.str], ie);
    }
    function R(H) {
      return H instanceof t._Code && H._items.some((ie) => ie instanceof t.Name && g[ie.str] === 1 && b[ie.str] !== void 0);
    }
  }
  function Pe(C, g) {
    for (const b in g)
      C[b] = (C[b] || 0) - (g[b] || 0);
  }
  function Me(C) {
    return typeof C == "boolean" || typeof C == "number" || C === null ? !C : (0, t._)`!${k(C)}`;
  }
  e2.not = Me;
  const dt = y(e2.operators.AND);
  function tt(...C) {
    return C.reduce(dt);
  }
  e2.and = tt;
  const pt = y(e2.operators.OR);
  function N(...C) {
    return C.reduce(pt);
  }
  e2.or = N;
  function y(C) {
    return (g, b) => g === t.nil ? b : b === t.nil ? g : (0, t._)`${k(g)} ${C} ${k(b)}`;
  }
  function k(C) {
    return C instanceof t.Name ? C : (0, t._)`(${C})`;
  }
})(Ue);
var Ge = {};
(function(e2) {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.checkStrictMode = e2.getErrorPath = e2.Type = e2.useFunc = e2.setEvaluated = e2.evaluatedPropsToName = e2.mergeEvaluated = e2.eachItem = e2.unescapeJsonPointer = e2.escapeJsonPointer = e2.escapeFragment = e2.unescapeFragment = e2.schemaRefOrVal = e2.schemaHasRulesButRef = e2.schemaHasRules = e2.checkUnknownRules = e2.alwaysValidSchema = e2.toHash = void 0;
  const t = Ue, n = qi;
  function r(L) {
    const P = {};
    for (const Z of L)
      P[Z] = true;
    return P;
  }
  e2.toHash = r;
  function i(L, P) {
    return typeof P == "boolean" ? P : Object.keys(P).length === 0 ? true : (s(L, P), !o(P, L.self.RULES.all));
  }
  e2.alwaysValidSchema = i;
  function s(L, P = L.schema) {
    const { opts: Z, self: Y } = L;
    if (!Z.strictSchema || typeof P == "boolean")
      return;
    const te = Y.RULES.keywords;
    for (const z in P)
      te[z] || B(L, `unknown keyword: "${z}"`);
  }
  e2.checkUnknownRules = s;
  function o(L, P) {
    if (typeof L == "boolean")
      return !L;
    for (const Z in L)
      if (P[Z])
        return true;
    return false;
  }
  e2.schemaHasRules = o;
  function l(L, P) {
    if (typeof L == "boolean")
      return !L;
    for (const Z in L)
      if (Z !== "$ref" && P.all[Z])
        return true;
    return false;
  }
  e2.schemaHasRulesButRef = l;
  function u({ topSchemaRef: L, schemaPath: P }, Z, Y, te) {
    if (!te) {
      if (typeof Z == "number" || typeof Z == "boolean")
        return Z;
      if (typeof Z == "string")
        return (0, t._)`${Z}`;
    }
    return (0, t._)`${L}${P}${(0, t.getProperty)(Y)}`;
  }
  e2.schemaRefOrVal = u;
  function c(L) {
    return d(decodeURIComponent(L));
  }
  e2.unescapeFragment = c;
  function m(L) {
    return encodeURIComponent(a(L));
  }
  e2.escapeFragment = m;
  function a(L) {
    return typeof L == "number" ? `${L}` : L.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  e2.escapeJsonPointer = a;
  function d(L) {
    return L.replace(/~1/g, "/").replace(/~0/g, "~");
  }
  e2.unescapeJsonPointer = d;
  function p(L, P) {
    if (Array.isArray(L))
      for (const Z of L)
        P(Z);
    else
      P(L);
  }
  e2.eachItem = p;
  function h({ mergeNames: L, mergeToName: P, mergeValues: Z, resultToName: Y }) {
    return (te, z, Q, X) => {
      const re = Q === void 0 ? z : Q instanceof t.Name ? (z instanceof t.Name ? L(te, z, Q) : P(te, z, Q), Q) : z instanceof t.Name ? (P(te, Q, z), z) : Z(z, Q);
      return X === t.Name && !(re instanceof t.Name) ? Y(te, re) : re;
    };
  }
  e2.mergeEvaluated = {
    props: h({
      mergeNames: (L, P, Z) => L.if((0, t._)`${Z} !== true && ${P} !== undefined`, () => {
        L.if((0, t._)`${P} === true`, () => L.assign(Z, true), () => L.assign(Z, (0, t._)`${Z} || {}`).code((0, t._)`Object.assign(${Z}, ${P})`));
      }),
      mergeToName: (L, P, Z) => L.if((0, t._)`${Z} !== true`, () => {
        P === true ? L.assign(Z, true) : (L.assign(Z, (0, t._)`${Z} || {}`), T(L, Z, P));
      }),
      mergeValues: (L, P) => L === true ? true : { ...L, ...P },
      resultToName: v
    }),
    items: h({
      mergeNames: (L, P, Z) => L.if((0, t._)`${Z} !== true && ${P} !== undefined`, () => L.assign(Z, (0, t._)`${P} === true ? true : ${Z} > ${P} ? ${Z} : ${P}`)),
      mergeToName: (L, P, Z) => L.if((0, t._)`${Z} !== true`, () => L.assign(Z, P === true ? true : (0, t._)`${Z} > ${P} ? ${Z} : ${P}`)),
      mergeValues: (L, P) => L === true ? true : Math.max(L, P),
      resultToName: (L, P) => L.var("items", P)
    })
  };
  function v(L, P) {
    if (P === true)
      return L.var("props", true);
    const Z = L.var("props", (0, t._)`{}`);
    return P !== void 0 && T(L, Z, P), Z;
  }
  e2.evaluatedPropsToName = v;
  function T(L, P, Z) {
    Object.keys(Z).forEach((Y) => L.assign((0, t._)`${P}${(0, t.getProperty)(Y)}`, true));
  }
  e2.setEvaluated = T;
  const _ = {};
  function E(L, P) {
    return L.scopeValue("func", {
      ref: P,
      code: _[P.code] || (_[P.code] = new n._Code(P.code))
    });
  }
  e2.useFunc = E;
  var j;
  (function(L) {
    L[L.Num = 0] = "Num", L[L.Str = 1] = "Str";
  })(j = e2.Type || (e2.Type = {}));
  function F(L, P, Z) {
    if (L instanceof t.Name) {
      const Y = P === j.Num;
      return Z ? Y ? (0, t._)`"[" + ${L} + "]"` : (0, t._)`"['" + ${L} + "']"` : Y ? (0, t._)`"/" + ${L}` : (0, t._)`"/" + ${L}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
    }
    return Z ? (0, t.getProperty)(L).toString() : "/" + a(L);
  }
  e2.getErrorPath = F;
  function B(L, P, Z = L.opts.strictSchema) {
    if (Z) {
      if (P = `strict mode: ${P}`, Z === true)
        throw new Error(P);
      L.self.logger.warn(P);
    }
  }
  e2.checkStrictMode = B;
})(Ge);
var Pn = {};
Object.defineProperty(Pn, "__esModule", { value: true });
const Nt = Ue, TT = {
  // validation function arguments
  data: new Nt.Name("data"),
  // args passed from referencing schema
  valCxt: new Nt.Name("valCxt"),
  instancePath: new Nt.Name("instancePath"),
  parentData: new Nt.Name("parentData"),
  parentDataProperty: new Nt.Name("parentDataProperty"),
  rootData: new Nt.Name("rootData"),
  dynamicAnchors: new Nt.Name("dynamicAnchors"),
  // function scoped variables
  vErrors: new Nt.Name("vErrors"),
  errors: new Nt.Name("errors"),
  this: new Nt.Name("this"),
  // "globals"
  self: new Nt.Name("self"),
  scope: new Nt.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new Nt.Name("json"),
  jsonPos: new Nt.Name("jsonPos"),
  jsonLen: new Nt.Name("jsonLen"),
  jsonPart: new Nt.Name("jsonPart")
};
Pn.default = TT;
(function(e2) {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.extendErrors = e2.resetErrorsCount = e2.reportExtraError = e2.reportError = e2.keyword$DataError = e2.keywordError = void 0;
  const t = Ue, n = Ge, r = Pn;
  e2.keywordError = {
    message: ({ keyword: T }) => (0, t.str)`must pass "${T}" keyword validation`
  }, e2.keyword$DataError = {
    message: ({ keyword: T, schemaType: _ }) => _ ? (0, t.str)`"${T}" keyword must be ${_} ($data)` : (0, t.str)`"${T}" keyword is invalid ($data)`
  };
  function i(T, _ = e2.keywordError, E, j) {
    const { it: F } = T, { gen: B, compositeRule: L, allErrors: P } = F, Z = a(T, _, E);
    j ?? (L || P) ? u(B, Z) : c(F, (0, t._)`[${Z}]`);
  }
  e2.reportError = i;
  function s(T, _ = e2.keywordError, E) {
    const { it: j } = T, { gen: F, compositeRule: B, allErrors: L } = j, P = a(T, _, E);
    u(F, P), B || L || c(j, r.default.vErrors);
  }
  e2.reportExtraError = s;
  function o(T, _) {
    T.assign(r.default.errors, _), T.if((0, t._)`${r.default.vErrors} !== null`, () => T.if(_, () => T.assign((0, t._)`${r.default.vErrors}.length`, _), () => T.assign(r.default.vErrors, null)));
  }
  e2.resetErrorsCount = o;
  function l({ gen: T, keyword: _, schemaValue: E, data: j, errsCount: F, it: B }) {
    if (F === void 0)
      throw new Error("ajv implementation error");
    const L = T.name("err");
    T.forRange("i", F, r.default.errors, (P) => {
      T.const(L, (0, t._)`${r.default.vErrors}[${P}]`), T.if((0, t._)`${L}.instancePath === undefined`, () => T.assign((0, t._)`${L}.instancePath`, (0, t.strConcat)(r.default.instancePath, B.errorPath))), T.assign((0, t._)`${L}.schemaPath`, (0, t.str)`${B.errSchemaPath}/${_}`), B.opts.verbose && (T.assign((0, t._)`${L}.schema`, E), T.assign((0, t._)`${L}.data`, j));
    });
  }
  e2.extendErrors = l;
  function u(T, _) {
    const E = T.const("err", _);
    T.if((0, t._)`${r.default.vErrors} === null`, () => T.assign(r.default.vErrors, (0, t._)`[${E}]`), (0, t._)`${r.default.vErrors}.push(${E})`), T.code((0, t._)`${r.default.errors}++`);
  }
  function c(T, _) {
    const { gen: E, validateName: j, schemaEnv: F } = T;
    F.$async ? E.throw((0, t._)`new ${T.ValidationError}(${_})`) : (E.assign((0, t._)`${j}.errors`, _), E.return(false));
  }
  const m = {
    keyword: new t.Name("keyword"),
    schemaPath: new t.Name("schemaPath"),
    params: new t.Name("params"),
    propertyName: new t.Name("propertyName"),
    message: new t.Name("message"),
    schema: new t.Name("schema"),
    parentSchema: new t.Name("parentSchema")
  };
  function a(T, _, E) {
    const { createErrors: j } = T.it;
    return j === false ? (0, t._)`{}` : d(T, _, E);
  }
  function d(T, _, E = {}) {
    const { gen: j, it: F } = T, B = [
      p(F, E),
      h(T, E)
    ];
    return v(T, _, B), j.object(...B);
  }
  function p({ errorPath: T }, { instancePath: _ }) {
    const E = _ ? (0, t.str)`${T}${(0, n.getErrorPath)(_, n.Type.Str)}` : T;
    return [r.default.instancePath, (0, t.strConcat)(r.default.instancePath, E)];
  }
  function h({ keyword: T, it: { errSchemaPath: _ } }, { schemaPath: E, parentSchema: j }) {
    let F = j ? _ : (0, t.str)`${_}/${T}`;
    return E && (F = (0, t.str)`${F}${(0, n.getErrorPath)(E, n.Type.Str)}`), [m.schemaPath, F];
  }
  function v(T, { params: _, message: E }, j) {
    const { keyword: F, data: B, schemaValue: L, it: P } = T, { opts: Z, propertyName: Y, topSchemaRef: te, schemaPath: z } = P;
    j.push([m.keyword, F], [m.params, typeof _ == "function" ? _(T) : _ || (0, t._)`{}`]), Z.messages && j.push([m.message, typeof E == "function" ? E(T) : E]), Z.verbose && j.push([m.schema, L], [m.parentSchema, (0, t._)`${te}${z}`], [r.default.data, B]), Y && j.push([m.propertyName, Y]);
  }
})(Wi);
Object.defineProperty(oi, "__esModule", { value: true });
oi.boolOrEmptySchema = oi.topBoolOrEmptySchema = void 0;
const ST = Wi, wT = Ue, $T = Pn, CT = {
  message: "boolean schema is false"
};
function kT(e2) {
  const { gen: t, schema: n, validateName: r } = e2;
  n === false ? Rf(e2, false) : typeof n == "object" && n.$async === true ? t.return($T.default.data) : (t.assign((0, wT._)`${r}.errors`, null), t.return(true));
}
oi.topBoolOrEmptySchema = kT;
function OT(e2, t) {
  const { gen: n, schema: r } = e2;
  r === false ? (n.var(t, false), Rf(e2)) : n.var(t, true);
}
oi.boolOrEmptySchema = OT;
function Rf(e2, t) {
  const { gen: n, data: r } = e2, i = {
    gen: n,
    keyword: "false schema",
    data: r,
    schema: false,
    schemaCode: false,
    schemaValue: false,
    params: {},
    it: e2
  };
  (0, ST.reportError)(i, CT, void 0, t);
}
var zi = {}, Pr = {};
Object.defineProperty(Pr, "__esModule", { value: true });
Pr.getRules = Pr.isJSONType = void 0;
const AT = ["string", "number", "integer", "boolean", "null", "object", "array"], ET = new Set(AT);
function IT(e2) {
  return typeof e2 == "string" && ET.has(e2);
}
Pr.isJSONType = IT;
function PT() {
  const e2 = {
    number: { type: "number", rules: [] },
    string: { type: "string", rules: [] },
    array: { type: "array", rules: [] },
    object: { type: "object", rules: [] }
  };
  return {
    types: { ...e2, integer: true, boolean: true, null: true },
    rules: [{ rules: [] }, e2.number, e2.string, e2.array, e2.object],
    post: { rules: [] },
    all: {},
    keywords: {}
  };
}
Pr.getRules = PT;
var Mn = {};
Object.defineProperty(Mn, "__esModule", { value: true });
Mn.shouldUseRule = Mn.shouldUseGroup = Mn.schemaHasRulesForType = void 0;
function NT({ schema: e2, self: t }, n) {
  const r = t.RULES.types[n];
  return r && r !== true && Mf(e2, r);
}
Mn.schemaHasRulesForType = NT;
function Mf(e2, t) {
  return t.rules.some((n) => Ff(e2, n));
}
Mn.shouldUseGroup = Mf;
function Ff(e2, t) {
  var n;
  return e2[t.keyword] !== void 0 || ((n = t.definition.implements) === null || n === void 0 ? void 0 : n.some((r) => e2[r] !== void 0));
}
Mn.shouldUseRule = Ff;
(function(e2) {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.reportTypeError = e2.checkDataTypes = e2.checkDataType = e2.coerceAndCheckDataType = e2.getJSONTypes = e2.getSchemaTypes = e2.DataType = void 0;
  const t = Pr, n = Mn, r = Wi, i = Ue, s = Ge;
  var o;
  (function(j) {
    j[j.Correct = 0] = "Correct", j[j.Wrong = 1] = "Wrong";
  })(o = e2.DataType || (e2.DataType = {}));
  function l(j) {
    const F = u(j.type);
    if (F.includes("null")) {
      if (j.nullable === false)
        throw new Error("type: null contradicts nullable: false");
    } else {
      if (!F.length && j.nullable !== void 0)
        throw new Error('"nullable" cannot be used without "type"');
      j.nullable === true && F.push("null");
    }
    return F;
  }
  e2.getSchemaTypes = l;
  function u(j) {
    const F = Array.isArray(j) ? j : j ? [j] : [];
    if (F.every(t.isJSONType))
      return F;
    throw new Error("type must be JSONType or JSONType[]: " + F.join(","));
  }
  e2.getJSONTypes = u;
  function c(j, F) {
    const { gen: B, data: L, opts: P } = j, Z = a(F, P.coerceTypes), Y = F.length > 0 && !(Z.length === 0 && F.length === 1 && (0, n.schemaHasRulesForType)(j, F[0]));
    if (Y) {
      const te = v(F, L, P.strictNumbers, o.Wrong);
      B.if(te, () => {
        Z.length ? d(j, F, Z) : _(j);
      });
    }
    return Y;
  }
  e2.coerceAndCheckDataType = c;
  const m = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
  function a(j, F) {
    return F ? j.filter((B) => m.has(B) || F === "array" && B === "array") : [];
  }
  function d(j, F, B) {
    const { gen: L, data: P, opts: Z } = j, Y = L.let("dataType", (0, i._)`typeof ${P}`), te = L.let("coerced", (0, i._)`undefined`);
    Z.coerceTypes === "array" && L.if((0, i._)`${Y} == 'object' && Array.isArray(${P}) && ${P}.length == 1`, () => L.assign(P, (0, i._)`${P}[0]`).assign(Y, (0, i._)`typeof ${P}`).if(v(F, P, Z.strictNumbers), () => L.assign(te, P))), L.if((0, i._)`${te} !== undefined`);
    for (const Q of B)
      (m.has(Q) || Q === "array" && Z.coerceTypes === "array") && z(Q);
    L.else(), _(j), L.endIf(), L.if((0, i._)`${te} !== undefined`, () => {
      L.assign(P, te), p(j, te);
    });
    function z(Q) {
      switch (Q) {
        case "string":
          L.elseIf((0, i._)`${Y} == "number" || ${Y} == "boolean"`).assign(te, (0, i._)`"" + ${P}`).elseIf((0, i._)`${P} === null`).assign(te, (0, i._)`""`);
          return;
        case "number":
          L.elseIf((0, i._)`${Y} == "boolean" || ${P} === null
              || (${Y} == "string" && ${P} && ${P} == +${P})`).assign(te, (0, i._)`+${P}`);
          return;
        case "integer":
          L.elseIf((0, i._)`${Y} === "boolean" || ${P} === null
              || (${Y} === "string" && ${P} && ${P} == +${P} && !(${P} % 1))`).assign(te, (0, i._)`+${P}`);
          return;
        case "boolean":
          L.elseIf((0, i._)`${P} === "false" || ${P} === 0 || ${P} === null`).assign(te, false).elseIf((0, i._)`${P} === "true" || ${P} === 1`).assign(te, true);
          return;
        case "null":
          L.elseIf((0, i._)`${P} === "" || ${P} === 0 || ${P} === false`), L.assign(te, null);
          return;
        case "array":
          L.elseIf((0, i._)`${Y} === "string" || ${Y} === "number"
              || ${Y} === "boolean" || ${P} === null`).assign(te, (0, i._)`[${P}]`);
      }
    }
  }
  function p({ gen: j, parentData: F, parentDataProperty: B }, L) {
    j.if((0, i._)`${F} !== undefined`, () => j.assign((0, i._)`${F}[${B}]`, L));
  }
  function h(j, F, B, L = o.Correct) {
    const P = L === o.Correct ? i.operators.EQ : i.operators.NEQ;
    let Z;
    switch (j) {
      case "null":
        return (0, i._)`${F} ${P} null`;
      case "array":
        Z = (0, i._)`Array.isArray(${F})`;
        break;
      case "object":
        Z = (0, i._)`${F} && typeof ${F} == "object" && !Array.isArray(${F})`;
        break;
      case "integer":
        Z = Y((0, i._)`!(${F} % 1) && !isNaN(${F})`);
        break;
      case "number":
        Z = Y();
        break;
      default:
        return (0, i._)`typeof ${F} ${P} ${j}`;
    }
    return L === o.Correct ? Z : (0, i.not)(Z);
    function Y(te = i.nil) {
      return (0, i.and)((0, i._)`typeof ${F} == "number"`, te, B ? (0, i._)`isFinite(${F})` : i.nil);
    }
  }
  e2.checkDataType = h;
  function v(j, F, B, L) {
    if (j.length === 1)
      return h(j[0], F, B, L);
    let P;
    const Z = (0, s.toHash)(j);
    if (Z.array && Z.object) {
      const Y = (0, i._)`typeof ${F} != "object"`;
      P = Z.null ? Y : (0, i._)`!${F} || ${Y}`, delete Z.null, delete Z.array, delete Z.object;
    } else
      P = i.nil;
    Z.number && delete Z.integer;
    for (const Y in Z)
      P = (0, i.and)(P, h(Y, F, B, L));
    return P;
  }
  e2.checkDataTypes = v;
  const T = {
    message: ({ schema: j }) => `must be ${j}`,
    params: ({ schema: j, schemaValue: F }) => typeof j == "string" ? (0, i._)`{type: ${j}}` : (0, i._)`{type: ${F}}`
  };
  function _(j) {
    const F = E(j);
    (0, r.reportError)(F, T);
  }
  e2.reportTypeError = _;
  function E(j) {
    const { gen: F, data: B, schema: L } = j, P = (0, s.schemaRefOrVal)(j, L, "type");
    return {
      gen: F,
      keyword: "type",
      data: B,
      schema: L.type,
      schemaCode: P,
      schemaValue: P,
      parentSchema: L,
      params: {},
      it: j
    };
  }
})(zi);
var es = {};
Object.defineProperty(es, "__esModule", { value: true });
es.assignDefaults = void 0;
const Br = Ue, xT = Ge;
function jT(e2, t) {
  const { properties: n, items: r } = e2.schema;
  if (t === "object" && n)
    for (const i in n)
      lc(e2, i, n[i].default);
  else
    t === "array" && Array.isArray(r) && r.forEach((i, s) => lc(e2, s, i.default));
}
es.assignDefaults = jT;
function lc(e2, t, n) {
  const { gen: r, compositeRule: i, data: s, opts: o } = e2;
  if (n === void 0)
    return;
  const l = (0, Br._)`${s}${(0, Br.getProperty)(t)}`;
  if (i) {
    (0, xT.checkStrictMode)(e2, `default is ignored for: ${l}`);
    return;
  }
  let u = (0, Br._)`${l} === undefined`;
  o.useDefaults === "empty" && (u = (0, Br._)`${u} || ${l} === null || ${l} === ""`), r.if(u, (0, Br._)`${l} = ${(0, Br.stringify)(n)}`);
}
var Sn = {}, Fe = {};
Object.defineProperty(Fe, "__esModule", { value: true });
Fe.validateUnion = Fe.validateArray = Fe.usePattern = Fe.callValidateCode = Fe.schemaProperties = Fe.allSchemaProperties = Fe.noPropertyInData = Fe.propertyInData = Fe.isOwnProperty = Fe.hasPropFunc = Fe.reportMissingProp = Fe.checkMissingProp = Fe.checkReportMissingProp = void 0;
const st = Ue, Ca = Ge, Jn = Pn, LT = Ge;
function DT(e2, t) {
  const { gen: n, data: r, it: i } = e2;
  n.if(Oa(n, r, t, i.opts.ownProperties), () => {
    e2.setParams({ missingProperty: (0, st._)`${t}` }, true), e2.error();
  });
}
Fe.checkReportMissingProp = DT;
function RT({ gen: e2, data: t, it: { opts: n } }, r, i) {
  return (0, st.or)(...r.map((s) => (0, st.and)(Oa(e2, t, s, n.ownProperties), (0, st._)`${i} = ${s}`)));
}
Fe.checkMissingProp = RT;
function MT(e2, t) {
  e2.setParams({ missingProperty: t }, true), e2.error();
}
Fe.reportMissingProp = MT;
function Uf(e2) {
  return e2.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, st._)`Object.prototype.hasOwnProperty`
  });
}
Fe.hasPropFunc = Uf;
function ka(e2, t, n) {
  return (0, st._)`${Uf(e2)}.call(${t}, ${n})`;
}
Fe.isOwnProperty = ka;
function FT(e2, t, n, r) {
  const i = (0, st._)`${t}${(0, st.getProperty)(n)} !== undefined`;
  return r ? (0, st._)`${i} && ${ka(e2, t, n)}` : i;
}
Fe.propertyInData = FT;
function Oa(e2, t, n, r) {
  const i = (0, st._)`${t}${(0, st.getProperty)(n)} === undefined`;
  return r ? (0, st.or)(i, (0, st.not)(ka(e2, t, n))) : i;
}
Fe.noPropertyInData = Oa;
function Bf(e2) {
  return e2 ? Object.keys(e2).filter((t) => t !== "__proto__") : [];
}
Fe.allSchemaProperties = Bf;
function UT(e2, t) {
  return Bf(t).filter((n) => !(0, Ca.alwaysValidSchema)(e2, t[n]));
}
Fe.schemaProperties = UT;
function BT({ schemaCode: e2, data: t, it: { gen: n, topSchemaRef: r, schemaPath: i, errorPath: s }, it: o }, l, u, c) {
  const m = c ? (0, st._)`${e2}, ${t}, ${r}${i}` : t, a = [
    [Jn.default.instancePath, (0, st.strConcat)(Jn.default.instancePath, s)],
    [Jn.default.parentData, o.parentData],
    [Jn.default.parentDataProperty, o.parentDataProperty],
    [Jn.default.rootData, Jn.default.rootData]
  ];
  o.opts.dynamicRef && a.push([Jn.default.dynamicAnchors, Jn.default.dynamicAnchors]);
  const d = (0, st._)`${m}, ${n.object(...a)}`;
  return u !== st.nil ? (0, st._)`${l}.call(${u}, ${d})` : (0, st._)`${l}(${d})`;
}
Fe.callValidateCode = BT;
const qT = (0, st._)`new RegExp`;
function VT({ gen: e2, it: { opts: t } }, n) {
  const r = t.unicodeRegExp ? "u" : "", { regExp: i } = t.code, s = i(n, r);
  return e2.scopeValue("pattern", {
    key: s.toString(),
    ref: s,
    code: (0, st._)`${i.code === "new RegExp" ? qT : (0, LT.useFunc)(e2, i)}(${n}, ${r})`
  });
}
Fe.usePattern = VT;
function HT(e2) {
  const { gen: t, data: n, keyword: r, it: i } = e2, s = t.name("valid");
  if (i.allErrors) {
    const l = t.let("valid", true);
    return o(() => t.assign(l, false)), l;
  }
  return t.var(s, true), o(() => t.break()), s;
  function o(l) {
    const u = t.const("len", (0, st._)`${n}.length`);
    t.forRange("i", 0, u, (c) => {
      e2.subschema({
        keyword: r,
        dataProp: c,
        dataPropType: Ca.Type.Num
      }, s), t.if((0, st.not)(s), l);
    });
  }
}
Fe.validateArray = HT;
function KT(e2) {
  const { gen: t, schema: n, keyword: r, it: i } = e2;
  if (!Array.isArray(n))
    throw new Error("ajv implementation error");
  if (n.some((u) => (0, Ca.alwaysValidSchema)(i, u)) && !i.opts.unevaluated)
    return;
  const o = t.let("valid", false), l = t.name("_valid");
  t.block(() => n.forEach((u, c) => {
    const m = e2.subschema({
      keyword: r,
      schemaProp: c,
      compositeRule: true
    }, l);
    t.assign(o, (0, st._)`${o} || ${l}`), e2.mergeValidEvaluated(m, l) || t.if((0, st.not)(o));
  })), e2.result(o, () => e2.reset(), () => e2.error(true));
}
Fe.validateUnion = KT;
Object.defineProperty(Sn, "__esModule", { value: true });
Sn.validateKeywordUsage = Sn.validSchemaType = Sn.funcKeywordCode = Sn.macroKeywordCode = void 0;
const Ut = Ue, vr = Pn, GT = Fe, WT = Wi;
function zT(e2, t) {
  const { gen: n, keyword: r, schema: i, parentSchema: s, it: o } = e2, l = t.macro.call(o.self, i, s, o), u = qf(n, r, l);
  o.opts.validateSchema !== false && o.self.validateSchema(l, true);
  const c = n.name("valid");
  e2.subschema({
    schema: l,
    schemaPath: Ut.nil,
    errSchemaPath: `${o.errSchemaPath}/${r}`,
    topSchemaRef: u,
    compositeRule: true
  }, c), e2.pass(c, () => e2.error(true));
}
Sn.macroKeywordCode = zT;
function QT(e2, t) {
  var n;
  const { gen: r, keyword: i, schema: s, parentSchema: o, $data: l, it: u } = e2;
  JT(u, t);
  const c = !l && t.compile ? t.compile.call(u.self, s, o, u) : t.validate, m = qf(r, i, c), a = r.let("valid");
  e2.block$data(a, d), e2.ok((n = t.valid) !== null && n !== void 0 ? n : a);
  function d() {
    if (t.errors === false)
      v(), t.modifying && cc(e2), T(() => e2.error());
    else {
      const _ = t.async ? p() : h();
      t.modifying && cc(e2), T(() => YT(e2, _));
    }
  }
  function p() {
    const _ = r.let("ruleErrs", null);
    return r.try(() => v((0, Ut._)`await `), (E) => r.assign(a, false).if((0, Ut._)`${E} instanceof ${u.ValidationError}`, () => r.assign(_, (0, Ut._)`${E}.errors`), () => r.throw(E))), _;
  }
  function h() {
    const _ = (0, Ut._)`${m}.errors`;
    return r.assign(_, null), v(Ut.nil), _;
  }
  function v(_ = t.async ? (0, Ut._)`await ` : Ut.nil) {
    const E = u.opts.passContext ? vr.default.this : vr.default.self, j = !("compile" in t && !l || t.schema === false);
    r.assign(a, (0, Ut._)`${_}${(0, GT.callValidateCode)(e2, m, E, j)}`, t.modifying);
  }
  function T(_) {
    var E;
    r.if((0, Ut.not)((E = t.valid) !== null && E !== void 0 ? E : a), _);
  }
}
Sn.funcKeywordCode = QT;
function cc(e2) {
  const { gen: t, data: n, it: r } = e2;
  t.if(r.parentData, () => t.assign(n, (0, Ut._)`${r.parentData}[${r.parentDataProperty}]`));
}
function YT(e2, t) {
  const { gen: n } = e2;
  n.if((0, Ut._)`Array.isArray(${t})`, () => {
    n.assign(vr.default.vErrors, (0, Ut._)`${vr.default.vErrors} === null ? ${t} : ${vr.default.vErrors}.concat(${t})`).assign(vr.default.errors, (0, Ut._)`${vr.default.vErrors}.length`), (0, WT.extendErrors)(e2);
  }, () => e2.error());
}
function JT({ schemaEnv: e2 }, t) {
  if (t.async && !e2.$async)
    throw new Error("async keyword in sync schema");
}
function qf(e2, t, n) {
  if (n === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e2.scopeValue("keyword", typeof n == "function" ? { ref: n } : { ref: n, code: (0, Ut.stringify)(n) });
}
function XT(e2, t, n = false) {
  return !t.length || t.some((r) => r === "array" ? Array.isArray(e2) : r === "object" ? e2 && typeof e2 == "object" && !Array.isArray(e2) : typeof e2 == r || n && typeof e2 > "u");
}
Sn.validSchemaType = XT;
function ZT({ schema: e2, opts: t, self: n, errSchemaPath: r }, i, s) {
  if (Array.isArray(i.keyword) ? !i.keyword.includes(s) : i.keyword !== s)
    throw new Error("ajv implementation error");
  const o = i.dependencies;
  if (o != null && o.some((l) => !Object.prototype.hasOwnProperty.call(e2, l)))
    throw new Error(`parent schema must have dependencies of ${s}: ${o.join(",")}`);
  if (i.validateSchema && !i.validateSchema(e2[s])) {
    const u = `keyword "${s}" value is invalid at path "${r}": ` + n.errorsText(i.validateSchema.errors);
    if (t.validateSchema === "log")
      n.logger.error(u);
    else
      throw new Error(u);
  }
}
Sn.validateKeywordUsage = ZT;
var or = {};
Object.defineProperty(or, "__esModule", { value: true });
or.extendSubschemaMode = or.extendSubschemaData = or.getSubschema = void 0;
const Tn = Ue, Vf = Ge;
function e0(e2, { keyword: t, schemaProp: n, schema: r, schemaPath: i, errSchemaPath: s, topSchemaRef: o }) {
  if (t !== void 0 && r !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const l = e2.schema[t];
    return n === void 0 ? {
      schema: l,
      schemaPath: (0, Tn._)`${e2.schemaPath}${(0, Tn.getProperty)(t)}`,
      errSchemaPath: `${e2.errSchemaPath}/${t}`
    } : {
      schema: l[n],
      schemaPath: (0, Tn._)`${e2.schemaPath}${(0, Tn.getProperty)(t)}${(0, Tn.getProperty)(n)}`,
      errSchemaPath: `${e2.errSchemaPath}/${t}/${(0, Vf.escapeFragment)(n)}`
    };
  }
  if (r !== void 0) {
    if (i === void 0 || s === void 0 || o === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: r,
      schemaPath: i,
      topSchemaRef: o,
      errSchemaPath: s
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
or.getSubschema = e0;
function t0(e2, t, { dataProp: n, dataPropType: r, data: i, dataTypes: s, propertyName: o }) {
  if (i !== void 0 && n !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: l } = t;
  if (n !== void 0) {
    const { errorPath: c, dataPathArr: m, opts: a } = t, d = l.let("data", (0, Tn._)`${t.data}${(0, Tn.getProperty)(n)}`, true);
    u(d), e2.errorPath = (0, Tn.str)`${c}${(0, Vf.getErrorPath)(n, r, a.jsPropertySyntax)}`, e2.parentDataProperty = (0, Tn._)`${n}`, e2.dataPathArr = [...m, e2.parentDataProperty];
  }
  if (i !== void 0) {
    const c = i instanceof Tn.Name ? i : l.let("data", i, true);
    u(c), o !== void 0 && (e2.propertyName = o);
  }
  s && (e2.dataTypes = s);
  function u(c) {
    e2.data = c, e2.dataLevel = t.dataLevel + 1, e2.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e2.parentData = t.data, e2.dataNames = [...t.dataNames, c];
  }
}
or.extendSubschemaData = t0;
function n0(e2, { jtdDiscriminator: t, jtdMetadata: n, compositeRule: r, createErrors: i, allErrors: s }) {
  r !== void 0 && (e2.compositeRule = r), i !== void 0 && (e2.createErrors = i), s !== void 0 && (e2.allErrors = s), e2.jtdDiscriminator = t, e2.jtdMetadata = n;
}
or.extendSubschemaMode = n0;
var Et = {}, Hf = function e(t, n) {
  if (t === n)
    return true;
  if (t && n && typeof t == "object" && typeof n == "object") {
    if (t.constructor !== n.constructor)
      return false;
    var r, i, s;
    if (Array.isArray(t)) {
      if (r = t.length, r != n.length)
        return false;
      for (i = r; i-- !== 0; )
        if (!e(t[i], n[i]))
          return false;
      return true;
    }
    if (t.constructor === RegExp)
      return t.source === n.source && t.flags === n.flags;
    if (t.valueOf !== Object.prototype.valueOf)
      return t.valueOf() === n.valueOf();
    if (t.toString !== Object.prototype.toString)
      return t.toString() === n.toString();
    if (s = Object.keys(t), r = s.length, r !== Object.keys(n).length)
      return false;
    for (i = r; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(n, s[i]))
        return false;
    for (i = r; i-- !== 0; ) {
      var o = s[i];
      if (!e(t[o], n[o]))
        return false;
    }
    return true;
  }
  return t !== t && n !== n;
}, Kf = { exports: {} }, nr = Kf.exports = function(e2, t, n) {
  typeof t == "function" && (n = t, t = {}), n = t.cb || n;
  var r = typeof n == "function" ? n : n.pre || function() {
  }, i = n.post || function() {
  };
  go(t, r, i, e2, "", e2);
};
nr.keywords = {
  additionalItems: true,
  items: true,
  contains: true,
  additionalProperties: true,
  propertyNames: true,
  not: true,
  if: true,
  then: true,
  else: true
};
nr.arrayKeywords = {
  items: true,
  allOf: true,
  anyOf: true,
  oneOf: true
};
nr.propsKeywords = {
  $defs: true,
  definitions: true,
  properties: true,
  patternProperties: true,
  dependencies: true
};
nr.skipKeywords = {
  default: true,
  enum: true,
  const: true,
  required: true,
  maximum: true,
  minimum: true,
  exclusiveMaximum: true,
  exclusiveMinimum: true,
  multipleOf: true,
  maxLength: true,
  minLength: true,
  pattern: true,
  format: true,
  maxItems: true,
  minItems: true,
  uniqueItems: true,
  maxProperties: true,
  minProperties: true
};
function go(e2, t, n, r, i, s, o, l, u, c) {
  if (r && typeof r == "object" && !Array.isArray(r)) {
    t(r, i, s, o, l, u, c);
    for (var m in r) {
      var a = r[m];
      if (Array.isArray(a)) {
        if (m in nr.arrayKeywords)
          for (var d = 0; d < a.length; d++)
            go(e2, t, n, a[d], i + "/" + m + "/" + d, s, i, m, r, d);
      } else if (m in nr.propsKeywords) {
        if (a && typeof a == "object")
          for (var p in a)
            go(e2, t, n, a[p], i + "/" + m + "/" + r0(p), s, i, m, r, p);
      } else
        (m in nr.keywords || e2.allKeys && !(m in nr.skipKeywords)) && go(e2, t, n, a, i + "/" + m, s, i, m, r);
    }
    n(r, i, s, o, l, u, c);
  }
}
function r0(e2) {
  return e2.replace(/~/g, "~0").replace(/\//g, "~1");
}
var i0 = Kf.exports;
Object.defineProperty(Et, "__esModule", { value: true });
Et.getSchemaRefs = Et.resolveUrl = Et.normalizeId = Et._getFullPath = Et.getFullPath = Et.inlineRef = void 0;
const o0 = Ge, s0 = Hf, a0 = i0, l0 = /* @__PURE__ */ new Set([
  "type",
  "format",
  "pattern",
  "maxLength",
  "minLength",
  "maxProperties",
  "minProperties",
  "maxItems",
  "minItems",
  "maximum",
  "minimum",
  "uniqueItems",
  "multipleOf",
  "required",
  "enum",
  "const"
]);
function c0(e2, t = true) {
  return typeof e2 == "boolean" ? true : t === true ? !Fs(e2) : t ? Gf(e2) <= t : false;
}
Et.inlineRef = c0;
const u0 = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function Fs(e2) {
  for (const t in e2) {
    if (u0.has(t))
      return true;
    const n = e2[t];
    if (Array.isArray(n) && n.some(Fs) || typeof n == "object" && Fs(n))
      return true;
  }
  return false;
}
function Gf(e2) {
  let t = 0;
  for (const n in e2) {
    if (n === "$ref")
      return 1 / 0;
    if (t++, !l0.has(n) && (typeof e2[n] == "object" && (0, o0.eachItem)(e2[n], (r) => t += Gf(r)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function Wf(e2, t = "", n) {
  n !== false && (t = Jr(t));
  const r = e2.parse(t);
  return zf(e2, r);
}
Et.getFullPath = Wf;
function zf(e2, t) {
  return e2.serialize(t).split("#")[0] + "#";
}
Et._getFullPath = zf;
const d0 = /#\/?$/;
function Jr(e2) {
  return e2 ? e2.replace(d0, "") : "";
}
Et.normalizeId = Jr;
function f0(e2, t, n) {
  return n = Jr(n), e2.resolve(t, n);
}
Et.resolveUrl = f0;
const p0 = /^[a-z_][-a-z0-9._]*$/i;
function m0(e2, t) {
  if (typeof e2 == "boolean")
    return {};
  const { schemaId: n, uriResolver: r } = this.opts, i = Jr(e2[n] || t), s = { "": i }, o = Wf(r, i, false), l = {}, u = /* @__PURE__ */ new Set();
  return a0(e2, { allKeys: true }, (a, d, p, h) => {
    if (h === void 0)
      return;
    const v = o + d;
    let T = s[h];
    typeof a[n] == "string" && (T = _.call(this, a[n])), E.call(this, a.$anchor), E.call(this, a.$dynamicAnchor), s[d] = T;
    function _(j) {
      const F = this.opts.uriResolver.resolve;
      if (j = Jr(T ? F(T, j) : j), u.has(j))
        throw m(j);
      u.add(j);
      let B = this.refs[j];
      return typeof B == "string" && (B = this.refs[B]), typeof B == "object" ? c(a, B.schema, j) : j !== Jr(v) && (j[0] === "#" ? (c(a, l[j], j), l[j] = a) : this.refs[j] = v), j;
    }
    function E(j) {
      if (typeof j == "string") {
        if (!p0.test(j))
          throw new Error(`invalid anchor "${j}"`);
        _.call(this, `#${j}`);
      }
    }
  }), l;
  function c(a, d, p) {
    if (d !== void 0 && !s0(a, d))
      throw m(p);
  }
  function m(a) {
    return new Error(`reference "${a}" resolves to more than one schema`);
  }
}
Et.getSchemaRefs = m0;
Object.defineProperty(dn, "__esModule", { value: true });
dn.getData = dn.KeywordCxt = dn.validateFunctionCode = void 0;
const Qf = oi, uc = zi, Aa = Mn, Po = zi, h0 = es, Ai = Sn, vs = or, ve = Ue, Le = Pn, y0 = Et, Fn = Ge, vi = Wi;
function g0(e2) {
  if (Xf(e2) && (Zf(e2), Jf(e2))) {
    b0(e2);
    return;
  }
  Yf(e2, () => (0, Qf.topBoolOrEmptySchema)(e2));
}
dn.validateFunctionCode = g0;
function Yf({ gen: e2, validateName: t, schema: n, schemaEnv: r, opts: i }, s) {
  i.code.es5 ? e2.func(t, (0, ve._)`${Le.default.data}, ${Le.default.valCxt}`, r.$async, () => {
    e2.code((0, ve._)`"use strict"; ${dc(n, i)}`), _0(e2, i), e2.code(s);
  }) : e2.func(t, (0, ve._)`${Le.default.data}, ${v0(i)}`, r.$async, () => e2.code(dc(n, i)).code(s));
}
function v0(e2) {
  return (0, ve._)`{${Le.default.instancePath}="", ${Le.default.parentData}, ${Le.default.parentDataProperty}, ${Le.default.rootData}=${Le.default.data}${e2.dynamicRef ? (0, ve._)`, ${Le.default.dynamicAnchors}={}` : ve.nil}}={}`;
}
function _0(e2, t) {
  e2.if(Le.default.valCxt, () => {
    e2.var(Le.default.instancePath, (0, ve._)`${Le.default.valCxt}.${Le.default.instancePath}`), e2.var(Le.default.parentData, (0, ve._)`${Le.default.valCxt}.${Le.default.parentData}`), e2.var(Le.default.parentDataProperty, (0, ve._)`${Le.default.valCxt}.${Le.default.parentDataProperty}`), e2.var(Le.default.rootData, (0, ve._)`${Le.default.valCxt}.${Le.default.rootData}`), t.dynamicRef && e2.var(Le.default.dynamicAnchors, (0, ve._)`${Le.default.valCxt}.${Le.default.dynamicAnchors}`);
  }, () => {
    e2.var(Le.default.instancePath, (0, ve._)`""`), e2.var(Le.default.parentData, (0, ve._)`undefined`), e2.var(Le.default.parentDataProperty, (0, ve._)`undefined`), e2.var(Le.default.rootData, Le.default.data), t.dynamicRef && e2.var(Le.default.dynamicAnchors, (0, ve._)`{}`);
  });
}
function b0(e2) {
  const { schema: t, opts: n, gen: r } = e2;
  Yf(e2, () => {
    n.$comment && t.$comment && tp(e2), C0(e2), r.let(Le.default.vErrors, null), r.let(Le.default.errors, 0), n.unevaluated && T0(e2), ep(e2), A0(e2);
  });
}
function T0(e2) {
  const { gen: t, validateName: n } = e2;
  e2.evaluated = t.const("evaluated", (0, ve._)`${n}.evaluated`), t.if((0, ve._)`${e2.evaluated}.dynamicProps`, () => t.assign((0, ve._)`${e2.evaluated}.props`, (0, ve._)`undefined`)), t.if((0, ve._)`${e2.evaluated}.dynamicItems`, () => t.assign((0, ve._)`${e2.evaluated}.items`, (0, ve._)`undefined`));
}
function dc(e2, t) {
  const n = typeof e2 == "object" && e2[t.schemaId];
  return n && (t.code.source || t.code.process) ? (0, ve._)`/*# sourceURL=${n} */` : ve.nil;
}
function S0(e2, t) {
  if (Xf(e2) && (Zf(e2), Jf(e2))) {
    w0(e2, t);
    return;
  }
  (0, Qf.boolOrEmptySchema)(e2, t);
}
function Jf({ schema: e2, self: t }) {
  if (typeof e2 == "boolean")
    return !e2;
  for (const n in e2)
    if (t.RULES.all[n])
      return true;
  return false;
}
function Xf(e2) {
  return typeof e2.schema != "boolean";
}
function w0(e2, t) {
  const { schema: n, gen: r, opts: i } = e2;
  i.$comment && n.$comment && tp(e2), k0(e2), O0(e2);
  const s = r.const("_errs", Le.default.errors);
  ep(e2, s), r.var(t, (0, ve._)`${s} === ${Le.default.errors}`);
}
function Zf(e2) {
  (0, Fn.checkUnknownRules)(e2), $0(e2);
}
function ep(e2, t) {
  if (e2.opts.jtd)
    return fc(e2, [], false, t);
  const n = (0, uc.getSchemaTypes)(e2.schema), r = (0, uc.coerceAndCheckDataType)(e2, n);
  fc(e2, n, !r, t);
}
function $0(e2) {
  const { schema: t, errSchemaPath: n, opts: r, self: i } = e2;
  t.$ref && r.ignoreKeywordsWithRef && (0, Fn.schemaHasRulesButRef)(t, i.RULES) && i.logger.warn(`$ref: keywords ignored in schema at path "${n}"`);
}
function C0(e2) {
  const { schema: t, opts: n } = e2;
  t.default !== void 0 && n.useDefaults && n.strictSchema && (0, Fn.checkStrictMode)(e2, "default is ignored in the schema root");
}
function k0(e2) {
  const t = e2.schema[e2.opts.schemaId];
  t && (e2.baseId = (0, y0.resolveUrl)(e2.opts.uriResolver, e2.baseId, t));
}
function O0(e2) {
  if (e2.schema.$async && !e2.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function tp({ gen: e2, schemaEnv: t, schema: n, errSchemaPath: r, opts: i }) {
  const s = n.$comment;
  if (i.$comment === true)
    e2.code((0, ve._)`${Le.default.self}.logger.log(${s})`);
  else if (typeof i.$comment == "function") {
    const o = (0, ve.str)`${r}/$comment`, l = e2.scopeValue("root", { ref: t.root });
    e2.code((0, ve._)`${Le.default.self}.opts.$comment(${s}, ${o}, ${l}.schema)`);
  }
}
function A0(e2) {
  const { gen: t, schemaEnv: n, validateName: r, ValidationError: i, opts: s } = e2;
  n.$async ? t.if((0, ve._)`${Le.default.errors} === 0`, () => t.return(Le.default.data), () => t.throw((0, ve._)`new ${i}(${Le.default.vErrors})`)) : (t.assign((0, ve._)`${r}.errors`, Le.default.vErrors), s.unevaluated && E0(e2), t.return((0, ve._)`${Le.default.errors} === 0`));
}
function E0({ gen: e2, evaluated: t, props: n, items: r }) {
  n instanceof ve.Name && e2.assign((0, ve._)`${t}.props`, n), r instanceof ve.Name && e2.assign((0, ve._)`${t}.items`, r);
}
function fc(e2, t, n, r) {
  const { gen: i, schema: s, data: o, allErrors: l, opts: u, self: c } = e2, { RULES: m } = c;
  if (s.$ref && (u.ignoreKeywordsWithRef || !(0, Fn.schemaHasRulesButRef)(s, m))) {
    i.block(() => ip(e2, "$ref", m.all.$ref.definition));
    return;
  }
  u.jtd || I0(e2, t), i.block(() => {
    for (const d of m.rules)
      a(d);
    a(m.post);
  });
  function a(d) {
    (0, Aa.shouldUseGroup)(s, d) && (d.type ? (i.if((0, Po.checkDataType)(d.type, o, u.strictNumbers)), pc(e2, d), t.length === 1 && t[0] === d.type && n && (i.else(), (0, Po.reportTypeError)(e2)), i.endIf()) : pc(e2, d), l || i.if((0, ve._)`${Le.default.errors} === ${r || 0}`));
  }
}
function pc(e2, t) {
  const { gen: n, schema: r, opts: { useDefaults: i } } = e2;
  i && (0, h0.assignDefaults)(e2, t.type), n.block(() => {
    for (const s of t.rules)
      (0, Aa.shouldUseRule)(r, s) && ip(e2, s.keyword, s.definition, t.type);
  });
}
function I0(e2, t) {
  e2.schemaEnv.meta || !e2.opts.strictTypes || (P0(e2, t), e2.opts.allowUnionTypes || N0(e2, t), x0(e2, e2.dataTypes));
}
function P0(e2, t) {
  if (t.length) {
    if (!e2.dataTypes.length) {
      e2.dataTypes = t;
      return;
    }
    t.forEach((n) => {
      np(e2.dataTypes, n) || Ea(e2, `type "${n}" not allowed by context "${e2.dataTypes.join(",")}"`);
    }), L0(e2, t);
  }
}
function N0(e2, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && Ea(e2, "use allowUnionTypes to allow union type keyword");
}
function x0(e2, t) {
  const n = e2.self.RULES.all;
  for (const r in n) {
    const i = n[r];
    if (typeof i == "object" && (0, Aa.shouldUseRule)(e2.schema, i)) {
      const { type: s } = i.definition;
      s.length && !s.some((o) => j0(t, o)) && Ea(e2, `missing type "${s.join(",")}" for keyword "${r}"`);
    }
  }
}
function j0(e2, t) {
  return e2.includes(t) || t === "number" && e2.includes("integer");
}
function np(e2, t) {
  return e2.includes(t) || t === "integer" && e2.includes("number");
}
function L0(e2, t) {
  const n = [];
  for (const r of e2.dataTypes)
    np(t, r) ? n.push(r) : t.includes("integer") && r === "number" && n.push("integer");
  e2.dataTypes = n;
}
function Ea(e2, t) {
  const n = e2.schemaEnv.baseId + e2.errSchemaPath;
  t += ` at "${n}" (strictTypes)`, (0, Fn.checkStrictMode)(e2, t, e2.opts.strictTypes);
}
class rp {
  constructor(t, n, r) {
    if ((0, Ai.validateKeywordUsage)(t, n, r), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = r, this.data = t.data, this.schema = t.schema[r], this.$data = n.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, Fn.schemaRefOrVal)(t, this.schema, r, this.$data), this.schemaType = n.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = n, this.$data)
      this.schemaCode = t.gen.const("vSchema", op(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, Ai.validSchemaType)(this.schema, n.schemaType, n.allowUndefined))
      throw new Error(`${r} value must be ${JSON.stringify(n.schemaType)}`);
    ("code" in n ? n.trackErrors : n.errors !== false) && (this.errsCount = t.gen.const("_errs", Le.default.errors));
  }
  result(t, n, r) {
    this.failResult((0, ve.not)(t), n, r);
  }
  failResult(t, n, r) {
    this.gen.if(t), r ? r() : this.error(), n ? (this.gen.else(), n(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(t, n) {
    this.failResult((0, ve.not)(t), void 0, n);
  }
  fail(t) {
    if (t === void 0) {
      this.error(), this.allErrors || this.gen.if(false);
      return;
    }
    this.gen.if(t), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  fail$data(t) {
    if (!this.$data)
      return this.fail(t);
    const { schemaCode: n } = this;
    this.fail((0, ve._)`${n} !== undefined && (${(0, ve.or)(this.invalid$data(), t)})`);
  }
  error(t, n, r) {
    if (n) {
      this.setParams(n), this._error(t, r), this.setParams({});
      return;
    }
    this._error(t, r);
  }
  _error(t, n) {
    (t ? vi.reportExtraError : vi.reportError)(this, this.def.error, n);
  }
  $dataError() {
    (0, vi.reportError)(this, this.def.$dataError || vi.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, vi.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(t) {
    this.allErrors || this.gen.if(t);
  }
  setParams(t, n) {
    n ? Object.assign(this.params, t) : this.params = t;
  }
  block$data(t, n, r = ve.nil) {
    this.gen.block(() => {
      this.check$data(t, r), n();
    });
  }
  check$data(t = ve.nil, n = ve.nil) {
    if (!this.$data)
      return;
    const { gen: r, schemaCode: i, schemaType: s, def: o } = this;
    r.if((0, ve.or)((0, ve._)`${i} === undefined`, n)), t !== ve.nil && r.assign(t, true), (s.length || o.validateSchema) && (r.elseIf(this.invalid$data()), this.$dataError(), t !== ve.nil && r.assign(t, false)), r.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: n, schemaType: r, def: i, it: s } = this;
    return (0, ve.or)(o(), l());
    function o() {
      if (r.length) {
        if (!(n instanceof ve.Name))
          throw new Error("ajv implementation error");
        const u = Array.isArray(r) ? r : [r];
        return (0, ve._)`${(0, Po.checkDataTypes)(u, n, s.opts.strictNumbers, Po.DataType.Wrong)}`;
      }
      return ve.nil;
    }
    function l() {
      if (i.validateSchema) {
        const u = t.scopeValue("validate$data", { ref: i.validateSchema });
        return (0, ve._)`!${u}(${n})`;
      }
      return ve.nil;
    }
  }
  subschema(t, n) {
    const r = (0, vs.getSubschema)(this.it, t);
    (0, vs.extendSubschemaData)(r, this.it, t), (0, vs.extendSubschemaMode)(r, t);
    const i = { ...this.it, ...r, items: void 0, props: void 0 };
    return S0(i, n), i;
  }
  mergeEvaluated(t, n) {
    const { it: r, gen: i } = this;
    r.opts.unevaluated && (r.props !== true && t.props !== void 0 && (r.props = Fn.mergeEvaluated.props(i, t.props, r.props, n)), r.items !== true && t.items !== void 0 && (r.items = Fn.mergeEvaluated.items(i, t.items, r.items, n)));
  }
  mergeValidEvaluated(t, n) {
    const { it: r, gen: i } = this;
    if (r.opts.unevaluated && (r.props !== true || r.items !== true))
      return i.if(n, () => this.mergeEvaluated(t, ve.Name)), true;
  }
}
dn.KeywordCxt = rp;
function ip(e2, t, n, r) {
  const i = new rp(e2, n, t);
  "code" in n ? n.code(i, r) : i.$data && n.validate ? (0, Ai.funcKeywordCode)(i, n) : "macro" in n ? (0, Ai.macroKeywordCode)(i, n) : (n.compile || n.validate) && (0, Ai.funcKeywordCode)(i, n);
}
const D0 = /^\/(?:[^~]|~0|~1)*$/, R0 = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function op(e2, { dataLevel: t, dataNames: n, dataPathArr: r }) {
  let i, s;
  if (e2 === "")
    return Le.default.rootData;
  if (e2[0] === "/") {
    if (!D0.test(e2))
      throw new Error(`Invalid JSON-pointer: ${e2}`);
    i = e2, s = Le.default.rootData;
  } else {
    const c = R0.exec(e2);
    if (!c)
      throw new Error(`Invalid JSON-pointer: ${e2}`);
    const m = +c[1];
    if (i = c[2], i === "#") {
      if (m >= t)
        throw new Error(u("property/index", m));
      return r[t - m];
    }
    if (m > t)
      throw new Error(u("data", m));
    if (s = n[t - m], !i)
      return s;
  }
  let o = s;
  const l = i.split("/");
  for (const c of l)
    c && (s = (0, ve._)`${s}${(0, ve.getProperty)((0, Fn.unescapeJsonPointer)(c))}`, o = (0, ve._)`${o} && ${s}`);
  return o;
  function u(c, m) {
    return `Cannot access ${c} ${m} levels up, current level is ${t}`;
  }
}
dn.getData = op;
var Qi = {};
Object.defineProperty(Qi, "__esModule", { value: true });
class M0 extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = true;
  }
}
Qi.default = M0;
var Yi = {};
Object.defineProperty(Yi, "__esModule", { value: true });
const _s = Et;
class F0 extends Error {
  constructor(t, n, r, i) {
    super(i || `can't resolve reference ${r} from id ${n}`), this.missingRef = (0, _s.resolveUrl)(t, n, r), this.missingSchema = (0, _s.normalizeId)((0, _s.getFullPath)(t, this.missingRef));
  }
}
Yi.default = F0;
var Ht = {};
Object.defineProperty(Ht, "__esModule", { value: true });
Ht.resolveSchema = Ht.getCompilingSchema = Ht.resolveRef = Ht.compileSchema = Ht.SchemaEnv = void 0;
const sn = Ue, U0 = Qi, hr = Pn, un = Et, mc = Ge, B0 = dn;
class ts {
  constructor(t) {
    var n;
    this.refs = {}, this.dynamicAnchors = {};
    let r;
    typeof t.schema == "object" && (r = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (n = t.baseId) !== null && n !== void 0 ? n : (0, un.normalizeId)(r == null ? void 0 : r[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = r == null ? void 0 : r.$async, this.refs = {};
  }
}
Ht.SchemaEnv = ts;
function Ia(e2) {
  const t = sp.call(this, e2);
  if (t)
    return t;
  const n = (0, un.getFullPath)(this.opts.uriResolver, e2.root.baseId), { es5: r, lines: i } = this.opts.code, { ownProperties: s } = this.opts, o = new sn.CodeGen(this.scope, { es5: r, lines: i, ownProperties: s });
  let l;
  e2.$async && (l = o.scopeValue("Error", {
    ref: U0.default,
    code: (0, sn._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const u = o.scopeName("validate");
  e2.validateName = u;
  const c = {
    gen: o,
    allErrors: this.opts.allErrors,
    data: hr.default.data,
    parentData: hr.default.parentData,
    parentDataProperty: hr.default.parentDataProperty,
    dataNames: [hr.default.data],
    dataPathArr: [sn.nil],
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: o.scopeValue("schema", this.opts.code.source === true ? { ref: e2.schema, code: (0, sn.stringify)(e2.schema) } : { ref: e2.schema }),
    validateName: u,
    ValidationError: l,
    schema: e2.schema,
    schemaEnv: e2,
    rootId: n,
    baseId: e2.baseId || n,
    schemaPath: sn.nil,
    errSchemaPath: e2.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, sn._)`""`,
    opts: this.opts,
    self: this
  };
  let m;
  try {
    this._compilations.add(e2), (0, B0.validateFunctionCode)(c), o.optimize(this.opts.code.optimize);
    const a = o.toString();
    m = `${o.scopeRefs(hr.default.scope)}return ${a}`, this.opts.code.process && (m = this.opts.code.process(m, e2));
    const p = new Function(`${hr.default.self}`, `${hr.default.scope}`, m)(this, this.scope.get());
    if (this.scope.value(u, { ref: p }), p.errors = null, p.schema = e2.schema, p.schemaEnv = e2, e2.$async && (p.$async = true), this.opts.code.source === true && (p.source = { validateName: u, validateCode: a, scopeValues: o._values }), this.opts.unevaluated) {
      const { props: h, items: v } = c;
      p.evaluated = {
        props: h instanceof sn.Name ? void 0 : h,
        items: v instanceof sn.Name ? void 0 : v,
        dynamicProps: h instanceof sn.Name,
        dynamicItems: v instanceof sn.Name
      }, p.source && (p.source.evaluated = (0, sn.stringify)(p.evaluated));
    }
    return e2.validate = p, e2;
  } catch (a) {
    throw delete e2.validate, delete e2.validateName, m && this.logger.error("Error compiling schema, function code:", m), a;
  } finally {
    this._compilations.delete(e2);
  }
}
Ht.compileSchema = Ia;
function q0(e2, t, n) {
  var r;
  n = (0, un.resolveUrl)(this.opts.uriResolver, t, n);
  const i = e2.refs[n];
  if (i)
    return i;
  let s = K0.call(this, e2, n);
  if (s === void 0) {
    const o = (r = e2.localRefs) === null || r === void 0 ? void 0 : r[n], { schemaId: l } = this.opts;
    o && (s = new ts({ schema: o, schemaId: l, root: e2, baseId: t }));
  }
  if (s !== void 0)
    return e2.refs[n] = V0.call(this, s);
}
Ht.resolveRef = q0;
function V0(e2) {
  return (0, un.inlineRef)(e2.schema, this.opts.inlineRefs) ? e2.schema : e2.validate ? e2 : Ia.call(this, e2);
}
function sp(e2) {
  for (const t of this._compilations)
    if (H0(t, e2))
      return t;
}
Ht.getCompilingSchema = sp;
function H0(e2, t) {
  return e2.schema === t.schema && e2.root === t.root && e2.baseId === t.baseId;
}
function K0(e2, t) {
  let n;
  for (; typeof (n = this.refs[t]) == "string"; )
    t = n;
  return n || this.schemas[t] || ns.call(this, e2, t);
}
function ns(e2, t) {
  const n = this.opts.uriResolver.parse(t), r = (0, un._getFullPath)(this.opts.uriResolver, n);
  let i = (0, un.getFullPath)(this.opts.uriResolver, e2.baseId, void 0);
  if (Object.keys(e2.schema).length > 0 && r === i)
    return bs.call(this, n, e2);
  const s = (0, un.normalizeId)(r), o = this.refs[s] || this.schemas[s];
  if (typeof o == "string") {
    const l = ns.call(this, e2, o);
    return typeof (l == null ? void 0 : l.schema) != "object" ? void 0 : bs.call(this, n, l);
  }
  if (typeof (o == null ? void 0 : o.schema) == "object") {
    if (o.validate || Ia.call(this, o), s === (0, un.normalizeId)(t)) {
      const { schema: l } = o, { schemaId: u } = this.opts, c = l[u];
      return c && (i = (0, un.resolveUrl)(this.opts.uriResolver, i, c)), new ts({ schema: l, schemaId: u, root: e2, baseId: i });
    }
    return bs.call(this, n, o);
  }
}
Ht.resolveSchema = ns;
const G0 = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function bs(e2, { baseId: t, schema: n, root: r }) {
  var i;
  if (((i = e2.fragment) === null || i === void 0 ? void 0 : i[0]) !== "/")
    return;
  for (const l of e2.fragment.slice(1).split("/")) {
    if (typeof n == "boolean")
      return;
    const u = n[(0, mc.unescapeFragment)(l)];
    if (u === void 0)
      return;
    n = u;
    const c = typeof n == "object" && n[this.opts.schemaId];
    !G0.has(l) && c && (t = (0, un.resolveUrl)(this.opts.uriResolver, t, c));
  }
  let s;
  if (typeof n != "boolean" && n.$ref && !(0, mc.schemaHasRulesButRef)(n, this.RULES)) {
    const l = (0, un.resolveUrl)(this.opts.uriResolver, t, n.$ref);
    s = ns.call(this, r, l);
  }
  const { schemaId: o } = this.opts;
  if (s = s || new ts({ schema: n, schemaId: o, root: r, baseId: t }), s.schema !== s.root.schema)
    return s;
}
const W0 = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", z0 = "Meta-schema for $data reference (JSON AnySchema extension proposal)", Q0 = "object", Y0 = [
  "$data"
], J0 = {
  $data: {
    type: "string",
    anyOf: [
      {
        format: "relative-json-pointer"
      },
      {
        format: "json-pointer"
      }
    ]
  }
}, X0 = false, Z0 = {
  $id: W0,
  description: z0,
  type: Q0,
  required: Y0,
  properties: J0,
  additionalProperties: X0
};
var Pa = {}, Us = { exports: {} };
/** @license URI.js v4.4.1 (c) 2011 Gary Court. License: http://github.com/garycourt/uri-js */
(function(e2, t) {
  (function(n, r) {
    r(t);
  })(Rn, function(n) {
    function r() {
      for (var I = arguments.length, A = Array(I), x = 0; x < I; x++)
        A[x] = arguments[x];
      if (A.length > 1) {
        A[0] = A[0].slice(0, -1);
        for (var W = A.length - 1, K = 1; K < W; ++K)
          A[K] = A[K].slice(1, -1);
        return A[W] = A[W].slice(1), A.join("");
      } else
        return A[0];
    }
    function i(I) {
      return "(?:" + I + ")";
    }
    function s(I) {
      return I === void 0 ? "undefined" : I === null ? "null" : Object.prototype.toString.call(I).split(" ").pop().split("]").shift().toLowerCase();
    }
    function o(I) {
      return I.toUpperCase();
    }
    function l(I) {
      return I != null ? I instanceof Array ? I : typeof I.length != "number" || I.split || I.setInterval || I.call ? [I] : Array.prototype.slice.call(I) : [];
    }
    function u(I, A) {
      var x = I;
      if (A)
        for (var W in A)
          x[W] = A[W];
      return x;
    }
    function c(I) {
      var A = "[A-Za-z]", x = "[0-9]", W = r(x, "[A-Fa-f]"), K = i(i("%[EFef]" + W + "%" + W + W + "%" + W + W) + "|" + i("%[89A-Fa-f]" + W + "%" + W + W) + "|" + i("%" + W + W)), ge = "[\\:\\/\\?\\#\\[\\]\\@]", _e = "[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]", Be = r(ge, _e), nt = I ? "[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]" : "[]", ut = I ? "[\\uE000-\\uF8FF]" : "[]", me = r(A, x, "[\\-\\.\\_\\~]", nt);
      i(A + r(A, x, "[\\+\\-\\.]") + "*"), i(i(K + "|" + r(me, _e, "[\\:]")) + "*");
      var Xe = i(i("25[0-5]") + "|" + i("2[0-4]" + x) + "|" + i("1" + x + x) + "|" + i("0?[1-9]" + x) + "|0?0?" + x), w = i(Xe + "\\." + Xe + "\\." + Xe + "\\." + Xe), S = i(W + "{1,4}"), be = i(i(S + "\\:" + S) + "|" + w), We = i(i(S + "\\:") + "{6}" + be), it = i("\\:\\:" + i(S + "\\:") + "{5}" + be), Yn = i(i(S) + "?\\:\\:" + i(S + "\\:") + "{4}" + be), gn = i(i(i(S + "\\:") + "{0,1}" + S) + "?\\:\\:" + i(S + "\\:") + "{3}" + be), vn = i(i(i(S + "\\:") + "{0,2}" + S) + "?\\:\\:" + i(S + "\\:") + "{2}" + be), Rr = i(i(i(S + "\\:") + "{0,3}" + S) + "?\\:\\:" + S + "\\:" + be), pr = i(i(i(S + "\\:") + "{0,4}" + S) + "?\\:\\:" + be), Zt = i(i(i(S + "\\:") + "{0,5}" + S) + "?\\:\\:" + S), _n = i(i(i(S + "\\:") + "{0,6}" + S) + "?\\:\\:"), mr = i([We, it, Yn, gn, vn, Rr, pr, Zt, _n].join("|")), Ln = i(i(me + "|" + K) + "+");
      i("[vV]" + W + "+\\." + r(me, _e, "[\\:]") + "+"), i(i(K + "|" + r(me, _e)) + "*");
      var hi = i(K + "|" + r(me, _e, "[\\:\\@]"));
      return i(i(K + "|" + r(me, _e, "[\\@]")) + "+"), i(i(hi + "|" + r("[\\/\\?]", ut)) + "*"), {
        NOT_SCHEME: new RegExp(r("[^]", A, x, "[\\+\\-\\.]"), "g"),
        NOT_USERINFO: new RegExp(r("[^\\%\\:]", me, _e), "g"),
        NOT_HOST: new RegExp(r("[^\\%\\[\\]\\:]", me, _e), "g"),
        NOT_PATH: new RegExp(r("[^\\%\\/\\:\\@]", me, _e), "g"),
        NOT_PATH_NOSCHEME: new RegExp(r("[^\\%\\/\\@]", me, _e), "g"),
        NOT_QUERY: new RegExp(r("[^\\%]", me, _e, "[\\:\\@\\/\\?]", ut), "g"),
        NOT_FRAGMENT: new RegExp(r("[^\\%]", me, _e, "[\\:\\@\\/\\?]"), "g"),
        ESCAPE: new RegExp(r("[^]", me, _e), "g"),
        UNRESERVED: new RegExp(me, "g"),
        OTHER_CHARS: new RegExp(r("[^\\%]", me, Be), "g"),
        PCT_ENCODED: new RegExp(K, "g"),
        IPV4ADDRESS: new RegExp("^(" + w + ")$"),
        IPV6ADDRESS: new RegExp("^\\[?(" + mr + ")" + i(i("\\%25|\\%(?!" + W + "{2})") + "(" + Ln + ")") + "?\\]?$")
        //RFC 6874, with relaxed parsing rules
      };
    }
    var m = c(false), a = c(true), d = /* @__PURE__ */ function() {
      function I(A, x) {
        var W = [], K = true, ge = false, _e = void 0;
        try {
          for (var Be = A[Symbol.iterator](), nt; !(K = (nt = Be.next()).done) && (W.push(nt.value), !(x && W.length === x)); K = true)
            ;
        } catch (ut) {
          ge = true, _e = ut;
        } finally {
          try {
            !K && Be.return && Be.return();
          } finally {
            if (ge)
              throw _e;
          }
        }
        return W;
      }
      return function(A, x) {
        if (Array.isArray(A))
          return A;
        if (Symbol.iterator in Object(A))
          return I(A, x);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      };
    }(), p = function(I) {
      if (Array.isArray(I)) {
        for (var A = 0, x = Array(I.length); A < I.length; A++)
          x[A] = I[A];
        return x;
      } else
        return Array.from(I);
    }, h = 2147483647, v = 36, T = 1, _ = 26, E = 38, j = 700, F = 72, B = 128, L = "-", P = /^xn--/, Z = /[^\0-\x7E]/, Y = /[\x2E\u3002\uFF0E\uFF61]/g, te = {
      overflow: "Overflow: input needs wider integers to process",
      "not-basic": "Illegal input >= 0x80 (not a basic code point)",
      "invalid-input": "Invalid input"
    }, z = v - T, Q = Math.floor, X = String.fromCharCode;
    function re(I) {
      throw new RangeError(te[I]);
    }
    function Pe(I, A) {
      for (var x = [], W = I.length; W--; )
        x[W] = A(I[W]);
      return x;
    }
    function Me(I, A) {
      var x = I.split("@"), W = "";
      x.length > 1 && (W = x[0] + "@", I = x[1]), I = I.replace(Y, ".");
      var K = I.split("."), ge = Pe(K, A).join(".");
      return W + ge;
    }
    function dt(I) {
      for (var A = [], x = 0, W = I.length; x < W; ) {
        var K = I.charCodeAt(x++);
        if (K >= 55296 && K <= 56319 && x < W) {
          var ge = I.charCodeAt(x++);
          (ge & 64512) == 56320 ? A.push(((K & 1023) << 10) + (ge & 1023) + 65536) : (A.push(K), x--);
        } else
          A.push(K);
      }
      return A;
    }
    var tt = function(A) {
      return String.fromCodePoint.apply(String, p(A));
    }, pt = function(A) {
      return A - 48 < 10 ? A - 22 : A - 65 < 26 ? A - 65 : A - 97 < 26 ? A - 97 : v;
    }, N = function(A, x) {
      return A + 22 + 75 * (A < 26) - ((x != 0) << 5);
    }, y = function(A, x, W) {
      var K = 0;
      for (
        A = W ? Q(A / j) : A >> 1, A += Q(A / x);
        /* no initialization */
        A > z * _ >> 1;
        K += v
      )
        A = Q(A / z);
      return Q(K + (z + 1) * A / (A + E));
    }, k = function(A) {
      var x = [], W = A.length, K = 0, ge = B, _e = F, Be = A.lastIndexOf(L);
      Be < 0 && (Be = 0);
      for (var nt = 0; nt < Be; ++nt)
        A.charCodeAt(nt) >= 128 && re("not-basic"), x.push(A.charCodeAt(nt));
      for (var ut = Be > 0 ? Be + 1 : 0; ut < W; ) {
        for (
          var me = K, Xe = 1, w = v;
          ;
          /* no condition */
          w += v
        ) {
          ut >= W && re("invalid-input");
          var S = pt(A.charCodeAt(ut++));
          (S >= v || S > Q((h - K) / Xe)) && re("overflow"), K += S * Xe;
          var be = w <= _e ? T : w >= _e + _ ? _ : w - _e;
          if (S < be)
            break;
          var We = v - be;
          Xe > Q(h / We) && re("overflow"), Xe *= We;
        }
        var it = x.length + 1;
        _e = y(K - me, it, me == 0), Q(K / it) > h - ge && re("overflow"), ge += Q(K / it), K %= it, x.splice(K++, 0, ge);
      }
      return String.fromCodePoint.apply(String, x);
    }, C = function(A) {
      var x = [];
      A = dt(A);
      var W = A.length, K = B, ge = 0, _e = F, Be = true, nt = false, ut = void 0;
      try {
        for (var me = A[Symbol.iterator](), Xe; !(Be = (Xe = me.next()).done); Be = true) {
          var w = Xe.value;
          w < 128 && x.push(X(w));
        }
      } catch (yi) {
        nt = true, ut = yi;
      } finally {
        try {
          !Be && me.return && me.return();
        } finally {
          if (nt)
            throw ut;
        }
      }
      var S = x.length, be = S;
      for (S && x.push(L); be < W; ) {
        var We = h, it = true, Yn = false, gn = void 0;
        try {
          for (var vn = A[Symbol.iterator](), Rr; !(it = (Rr = vn.next()).done); it = true) {
            var pr = Rr.value;
            pr >= K && pr < We && (We = pr);
          }
        } catch (yi) {
          Yn = true, gn = yi;
        } finally {
          try {
            !it && vn.return && vn.return();
          } finally {
            if (Yn)
              throw gn;
          }
        }
        var Zt = be + 1;
        We - K > Q((h - ge) / Zt) && re("overflow"), ge += (We - K) * Zt, K = We;
        var _n = true, mr = false, Ln = void 0;
        try {
          for (var hi = A[Symbol.iterator](), Sl; !(_n = (Sl = hi.next()).done); _n = true) {
            var wl = Sl.value;
            if (wl < K && ++ge > h && re("overflow"), wl == K) {
              for (
                var to = ge, no = v;
                ;
                /* no condition */
                no += v
              ) {
                var ro = no <= _e ? T : no >= _e + _ ? _ : no - _e;
                if (to < ro)
                  break;
                var $l = to - ro, Cl = v - ro;
                x.push(X(N(ro + $l % Cl, 0))), to = Q($l / Cl);
              }
              x.push(X(N(to, 0))), _e = y(ge, Zt, be == S), ge = 0, ++be;
            }
          }
        } catch (yi) {
          mr = true, Ln = yi;
        } finally {
          try {
            !_n && hi.return && hi.return();
          } finally {
            if (mr)
              throw Ln;
          }
        }
        ++ge, ++K;
      }
      return x.join("");
    }, g = function(A) {
      return Me(A, function(x) {
        return P.test(x) ? k(x.slice(4).toLowerCase()) : x;
      });
    }, b = function(A) {
      return Me(A, function(x) {
        return Z.test(x) ? "xn--" + C(x) : x;
      });
    }, $ = {
      /**
       * A string representing the current Punycode.js version number.
       * @memberOf punycode
       * @type String
       */
      version: "2.1.0",
      /**
       * An object of methods to convert from JavaScript's internal character
       * representation (UCS-2) to Unicode code points, and back.
       * @see <https://mathiasbynens.be/notes/javascript-encoding>
       * @memberOf punycode
       * @type Object
       */
      ucs2: {
        decode: dt,
        encode: tt
      },
      decode: k,
      encode: C,
      toASCII: b,
      toUnicode: g
    }, R = {};
    function H(I) {
      var A = I.charCodeAt(0), x = void 0;
      return A < 16 ? x = "%0" + A.toString(16).toUpperCase() : A < 128 ? x = "%" + A.toString(16).toUpperCase() : A < 2048 ? x = "%" + (A >> 6 | 192).toString(16).toUpperCase() + "%" + (A & 63 | 128).toString(16).toUpperCase() : x = "%" + (A >> 12 | 224).toString(16).toUpperCase() + "%" + (A >> 6 & 63 | 128).toString(16).toUpperCase() + "%" + (A & 63 | 128).toString(16).toUpperCase(), x;
    }
    function ie(I) {
      for (var A = "", x = 0, W = I.length; x < W; ) {
        var K = parseInt(I.substr(x + 1, 2), 16);
        if (K < 128)
          A += String.fromCharCode(K), x += 3;
        else if (K >= 194 && K < 224) {
          if (W - x >= 6) {
            var ge = parseInt(I.substr(x + 4, 2), 16);
            A += String.fromCharCode((K & 31) << 6 | ge & 63);
          } else
            A += I.substr(x, 6);
          x += 6;
        } else if (K >= 224) {
          if (W - x >= 9) {
            var _e = parseInt(I.substr(x + 4, 2), 16), Be = parseInt(I.substr(x + 7, 2), 16);
            A += String.fromCharCode((K & 15) << 12 | (_e & 63) << 6 | Be & 63);
          } else
            A += I.substr(x, 9);
          x += 9;
        } else
          A += I.substr(x, 3), x += 3;
      }
      return A;
    }
    function ne(I, A) {
      function x(W) {
        var K = ie(W);
        return K.match(A.UNRESERVED) ? K : W;
      }
      return I.scheme && (I.scheme = String(I.scheme).replace(A.PCT_ENCODED, x).toLowerCase().replace(A.NOT_SCHEME, "")), I.userinfo !== void 0 && (I.userinfo = String(I.userinfo).replace(A.PCT_ENCODED, x).replace(A.NOT_USERINFO, H).replace(A.PCT_ENCODED, o)), I.host !== void 0 && (I.host = String(I.host).replace(A.PCT_ENCODED, x).toLowerCase().replace(A.NOT_HOST, H).replace(A.PCT_ENCODED, o)), I.path !== void 0 && (I.path = String(I.path).replace(A.PCT_ENCODED, x).replace(I.scheme ? A.NOT_PATH : A.NOT_PATH_NOSCHEME, H).replace(A.PCT_ENCODED, o)), I.query !== void 0 && (I.query = String(I.query).replace(A.PCT_ENCODED, x).replace(A.NOT_QUERY, H).replace(A.PCT_ENCODED, o)), I.fragment !== void 0 && (I.fragment = String(I.fragment).replace(A.PCT_ENCODED, x).replace(A.NOT_FRAGMENT, H).replace(A.PCT_ENCODED, o)), I;
    }
    function oe(I) {
      return I.replace(/^0*(.*)/, "$1") || "0";
    }
    function je(I, A) {
      var x = I.match(A.IPV4ADDRESS) || [], W = d(x, 2), K = W[1];
      return K ? K.split(".").map(oe).join(".") : I;
    }
    function M(I, A) {
      var x = I.match(A.IPV6ADDRESS) || [], W = d(x, 3), K = W[1], ge = W[2];
      if (K) {
        for (var _e = K.toLowerCase().split("::").reverse(), Be = d(_e, 2), nt = Be[0], ut = Be[1], me = ut ? ut.split(":").map(oe) : [], Xe = nt.split(":").map(oe), w = A.IPV4ADDRESS.test(Xe[Xe.length - 1]), S = w ? 7 : 8, be = Xe.length - S, We = Array(S), it = 0; it < S; ++it)
          We[it] = me[it] || Xe[be + it] || "";
        w && (We[S - 1] = je(We[S - 1], A));
        var Yn = We.reduce(function(Zt, _n, mr) {
          if (!_n || _n === "0") {
            var Ln = Zt[Zt.length - 1];
            Ln && Ln.index + Ln.length === mr ? Ln.length++ : Zt.push({ index: mr, length: 1 });
          }
          return Zt;
        }, []), gn = Yn.sort(function(Zt, _n) {
          return _n.length - Zt.length;
        })[0], vn = void 0;
        if (gn && gn.length > 1) {
          var Rr = We.slice(0, gn.index), pr = We.slice(gn.index + gn.length);
          vn = Rr.join(":") + "::" + pr.join(":");
        } else
          vn = We.join(":");
        return ge && (vn += "%" + ge), vn;
      } else
        return I;
    }
    var ee = /^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?(\[[^\/?#\]]+\]|[^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i, he = "".match(/(){0}/)[1] === void 0;
    function fe(I) {
      var A = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, x = {}, W = A.iri !== false ? a : m;
      A.reference === "suffix" && (I = (A.scheme ? A.scheme + ":" : "") + "//" + I);
      var K = I.match(ee);
      if (K) {
        he ? (x.scheme = K[1], x.userinfo = K[3], x.host = K[4], x.port = parseInt(K[5], 10), x.path = K[6] || "", x.query = K[7], x.fragment = K[8], isNaN(x.port) && (x.port = K[5])) : (x.scheme = K[1] || void 0, x.userinfo = I.indexOf("@") !== -1 ? K[3] : void 0, x.host = I.indexOf("//") !== -1 ? K[4] : void 0, x.port = parseInt(K[5], 10), x.path = K[6] || "", x.query = I.indexOf("?") !== -1 ? K[7] : void 0, x.fragment = I.indexOf("#") !== -1 ? K[8] : void 0, isNaN(x.port) && (x.port = I.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/) ? K[4] : void 0)), x.host && (x.host = M(je(x.host, W), W)), x.scheme === void 0 && x.userinfo === void 0 && x.host === void 0 && x.port === void 0 && !x.path && x.query === void 0 ? x.reference = "same-document" : x.scheme === void 0 ? x.reference = "relative" : x.fragment === void 0 ? x.reference = "absolute" : x.reference = "uri", A.reference && A.reference !== "suffix" && A.reference !== x.reference && (x.error = x.error || "URI is not a " + A.reference + " reference.");
        var ge = R[(A.scheme || x.scheme || "").toLowerCase()];
        if (!A.unicodeSupport && (!ge || !ge.unicodeSupport)) {
          if (x.host && (A.domainHost || ge && ge.domainHost))
            try {
              x.host = $.toASCII(x.host.replace(W.PCT_ENCODED, ie).toLowerCase());
            } catch (_e) {
              x.error = x.error || "Host's domain name can not be converted to ASCII via punycode: " + _e;
            }
          ne(x, m);
        } else
          ne(x, W);
        ge && ge.parse && ge.parse(x, A);
      } else
        x.error = x.error || "URI can not be parsed.";
      return x;
    }
    function we(I, A) {
      var x = A.iri !== false ? a : m, W = [];
      return I.userinfo !== void 0 && (W.push(I.userinfo), W.push("@")), I.host !== void 0 && W.push(M(je(String(I.host), x), x).replace(x.IPV6ADDRESS, function(K, ge, _e) {
        return "[" + ge + (_e ? "%25" + _e : "") + "]";
      })), (typeof I.port == "number" || typeof I.port == "string") && (W.push(":"), W.push(String(I.port))), W.length ? W.join("") : void 0;
    }
    var Ae = /^\.\.?\//, Ve = /^\/\.(\/|$)/, lt = /^\/\.\.(\/|$)/, ot = /^\/?(?:.|\n)*?(?=\/|$)/;
    function Ne(I) {
      for (var A = []; I.length; )
        if (I.match(Ae))
          I = I.replace(Ae, "");
        else if (I.match(Ve))
          I = I.replace(Ve, "/");
        else if (I.match(lt))
          I = I.replace(lt, "/"), A.pop();
        else if (I === "." || I === "..")
          I = "";
        else {
          var x = I.match(ot);
          if (x) {
            var W = x[0];
            I = I.slice(W.length), A.push(W);
          } else
            throw new Error("Unexpected dot segment condition");
        }
      return A.join("");
    }
    function G(I) {
      var A = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, x = A.iri ? a : m, W = [], K = R[(A.scheme || I.scheme || "").toLowerCase()];
      if (K && K.serialize && K.serialize(I, A), I.host && !x.IPV6ADDRESS.test(I.host)) {
        if (A.domainHost || K && K.domainHost)
          try {
            I.host = A.iri ? $.toUnicode(I.host) : $.toASCII(I.host.replace(x.PCT_ENCODED, ie).toLowerCase());
          } catch (Be) {
            I.error = I.error || "Host's domain name can not be converted to " + (A.iri ? "Unicode" : "ASCII") + " via punycode: " + Be;
          }
      }
      ne(I, x), A.reference !== "suffix" && I.scheme && (W.push(I.scheme), W.push(":"));
      var ge = we(I, A);
      if (ge !== void 0 && (A.reference !== "suffix" && W.push("//"), W.push(ge), I.path && I.path.charAt(0) !== "/" && W.push("/")), I.path !== void 0) {
        var _e = I.path;
        !A.absolutePath && (!K || !K.absolutePath) && (_e = Ne(_e)), ge === void 0 && (_e = _e.replace(/^\/\//, "/%2F")), W.push(_e);
      }
      return I.query !== void 0 && (W.push("?"), W.push(I.query)), I.fragment !== void 0 && (W.push("#"), W.push(I.fragment)), W.join("");
    }
    function se(I, A) {
      var x = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, W = arguments[3], K = {};
      return W || (I = fe(G(I, x), x), A = fe(G(A, x), x)), x = x || {}, !x.tolerant && A.scheme ? (K.scheme = A.scheme, K.userinfo = A.userinfo, K.host = A.host, K.port = A.port, K.path = Ne(A.path || ""), K.query = A.query) : (A.userinfo !== void 0 || A.host !== void 0 || A.port !== void 0 ? (K.userinfo = A.userinfo, K.host = A.host, K.port = A.port, K.path = Ne(A.path || ""), K.query = A.query) : (A.path ? (A.path.charAt(0) === "/" ? K.path = Ne(A.path) : ((I.userinfo !== void 0 || I.host !== void 0 || I.port !== void 0) && !I.path ? K.path = "/" + A.path : I.path ? K.path = I.path.slice(0, I.path.lastIndexOf("/") + 1) + A.path : K.path = A.path, K.path = Ne(K.path)), K.query = A.query) : (K.path = I.path, A.query !== void 0 ? K.query = A.query : K.query = I.query), K.userinfo = I.userinfo, K.host = I.host, K.port = I.port), K.scheme = I.scheme), K.fragment = A.fragment, K;
    }
    function ae(I, A, x) {
      var W = u({ scheme: "null" }, x);
      return G(se(fe(I, W), fe(A, W), W, true), W);
    }
    function pe(I, A) {
      return typeof I == "string" ? I = G(fe(I, A), A) : s(I) === "object" && (I = fe(G(I, A), A)), I;
    }
    function Se(I, A, x) {
      return typeof I == "string" ? I = G(fe(I, x), x) : s(I) === "object" && (I = G(I, x)), typeof A == "string" ? A = G(fe(A, x), x) : s(A) === "object" && (A = G(A, x)), I === A;
    }
    function xe(I, A) {
      return I && I.toString().replace(!A || !A.iri ? m.ESCAPE : a.ESCAPE, H);
    }
    function Ee(I, A) {
      return I && I.toString().replace(!A || !A.iri ? m.PCT_ENCODED : a.PCT_ENCODED, ie);
    }
    var Tt = {
      scheme: "http",
      domainHost: true,
      parse: function(A, x) {
        return A.host || (A.error = A.error || "HTTP URIs must have a host."), A;
      },
      serialize: function(A, x) {
        var W = String(A.scheme).toLowerCase() === "https";
        return (A.port === (W ? 443 : 80) || A.port === "") && (A.port = void 0), A.path || (A.path = "/"), A;
      }
    }, zt = {
      scheme: "https",
      domainHost: Tt.domainHost,
      parse: Tt.parse,
      serialize: Tt.serialize
    };
    function Qt(I) {
      return typeof I.secure == "boolean" ? I.secure : String(I.scheme).toLowerCase() === "wss";
    }
    var Mt = {
      scheme: "ws",
      domainHost: true,
      parse: function(A, x) {
        var W = A;
        return W.secure = Qt(W), W.resourceName = (W.path || "/") + (W.query ? "?" + W.query : ""), W.path = void 0, W.query = void 0, W;
      },
      serialize: function(A, x) {
        if ((A.port === (Qt(A) ? 443 : 80) || A.port === "") && (A.port = void 0), typeof A.secure == "boolean" && (A.scheme = A.secure ? "wss" : "ws", A.secure = void 0), A.resourceName) {
          var W = A.resourceName.split("?"), K = d(W, 2), ge = K[0], _e = K[1];
          A.path = ge && ge !== "/" ? ge : void 0, A.query = _e, A.resourceName = void 0;
        }
        return A.fragment = void 0, A;
      }
    }, ur = {
      scheme: "wss",
      domainHost: Mt.domainHost,
      parse: Mt.parse,
      serialize: Mt.serialize
    }, pi = {}, dr = "[A-Za-z0-9\\-\\.\\_\\~\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]", Ft = "[0-9A-Fa-f]", xr = i(i("%[EFef]" + Ft + "%" + Ft + Ft + "%" + Ft + Ft) + "|" + i("%[89A-Fa-f]" + Ft + "%" + Ft + Ft) + "|" + i("%" + Ft + Ft)), Nn = "[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]", jr = "[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]", fr = r(jr, '[\\"\\\\]'), mt = "[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]", Lr = new RegExp(dr, "g"), yn = new RegExp(xr, "g"), xn = new RegExp(r("[^]", Nn, "[\\.]", '[\\"]', fr), "g"), jn = new RegExp(r("[^]", dr, mt), "g"), Ot = jn;
    function zn(I) {
      var A = ie(I);
      return A.match(Lr) ? A : I;
    }
    var Qn = {
      scheme: "mailto",
      parse: function(A, x) {
        var W = A, K = W.to = W.path ? W.path.split(",") : [];
        if (W.path = void 0, W.query) {
          for (var ge = false, _e = {}, Be = W.query.split("&"), nt = 0, ut = Be.length; nt < ut; ++nt) {
            var me = Be[nt].split("=");
            switch (me[0]) {
              case "to":
                for (var Xe = me[1].split(","), w = 0, S = Xe.length; w < S; ++w)
                  K.push(Xe[w]);
                break;
              case "subject":
                W.subject = Ee(me[1], x);
                break;
              case "body":
                W.body = Ee(me[1], x);
                break;
              default:
                ge = true, _e[Ee(me[0], x)] = Ee(me[1], x);
                break;
            }
          }
          ge && (W.headers = _e);
        }
        W.query = void 0;
        for (var be = 0, We = K.length; be < We; ++be) {
          var it = K[be].split("@");
          if (it[0] = Ee(it[0]), x.unicodeSupport)
            it[1] = Ee(it[1], x).toLowerCase();
          else
            try {
              it[1] = $.toASCII(Ee(it[1], x).toLowerCase());
            } catch (Yn) {
              W.error = W.error || "Email address's domain name can not be converted to ASCII via punycode: " + Yn;
            }
          K[be] = it.join("@");
        }
        return W;
      },
      serialize: function(A, x) {
        var W = A, K = l(A.to);
        if (K) {
          for (var ge = 0, _e = K.length; ge < _e; ++ge) {
            var Be = String(K[ge]), nt = Be.lastIndexOf("@"), ut = Be.slice(0, nt).replace(yn, zn).replace(yn, o).replace(xn, H), me = Be.slice(nt + 1);
            try {
              me = x.iri ? $.toUnicode(me) : $.toASCII(Ee(me, x).toLowerCase());
            } catch (be) {
              W.error = W.error || "Email address's domain name can not be converted to " + (x.iri ? "Unicode" : "ASCII") + " via punycode: " + be;
            }
            K[ge] = ut + "@" + me;
          }
          W.path = K.join(",");
        }
        var Xe = A.headers = A.headers || {};
        A.subject && (Xe.subject = A.subject), A.body && (Xe.body = A.body);
        var w = [];
        for (var S in Xe)
          Xe[S] !== pi[S] && w.push(S.replace(yn, zn).replace(yn, o).replace(jn, H) + "=" + Xe[S].replace(yn, zn).replace(yn, o).replace(Ot, H));
        return w.length && (W.query = w.join("&")), W;
      }
    }, mi = /^([^\:]+)\:(.*)/, Dr = {
      scheme: "urn",
      parse: function(A, x) {
        var W = A.path && A.path.match(mi), K = A;
        if (W) {
          var ge = x.scheme || K.scheme || "urn", _e = W[1].toLowerCase(), Be = W[2], nt = ge + ":" + (x.nid || _e), ut = R[nt];
          K.nid = _e, K.nss = Be, K.path = void 0, ut && (K = ut.parse(K, x));
        } else
          K.error = K.error || "URN can not be parsed.";
        return K;
      },
      serialize: function(A, x) {
        var W = x.scheme || A.scheme || "urn", K = A.nid, ge = W + ":" + (x.nid || K), _e = R[ge];
        _e && (A = _e.serialize(A, x));
        var Be = A, nt = A.nss;
        return Be.path = (K || x.nid) + ":" + nt, Be;
      }
    }, ht = /^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/, O = {
      scheme: "urn:uuid",
      parse: function(A, x) {
        var W = A;
        return W.uuid = W.nss, W.nss = void 0, !x.tolerant && (!W.uuid || !W.uuid.match(ht)) && (W.error = W.error || "UUID is not valid."), W;
      },
      serialize: function(A, x) {
        var W = A;
        return W.nss = (A.uuid || "").toLowerCase(), W;
      }
    };
    R[Tt.scheme] = Tt, R[zt.scheme] = zt, R[Mt.scheme] = Mt, R[ur.scheme] = ur, R[Qn.scheme] = Qn, R[Dr.scheme] = Dr, R[O.scheme] = O, n.SCHEMES = R, n.pctEncChar = H, n.pctDecChars = ie, n.parse = fe, n.removeDotSegments = Ne, n.serialize = G, n.resolveComponents = se, n.resolve = ae, n.normalize = pe, n.equal = Se, n.escapeComponent = xe, n.unescapeComponent = Ee, Object.defineProperty(n, "__esModule", { value: true });
  });
})(Us, Us.exports);
var eS = Us.exports;
Object.defineProperty(Pa, "__esModule", { value: true });
const ap = eS;
ap.code = 'require("ajv/dist/runtime/uri").default';
Pa.default = ap;
(function(e2) {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.CodeGen = e2.Name = e2.nil = e2.stringify = e2.str = e2._ = e2.KeywordCxt = void 0;
  var t = dn;
  Object.defineProperty(e2, "KeywordCxt", { enumerable: true, get: function() {
    return t.KeywordCxt;
  } });
  var n = Ue;
  Object.defineProperty(e2, "_", { enumerable: true, get: function() {
    return n._;
  } }), Object.defineProperty(e2, "str", { enumerable: true, get: function() {
    return n.str;
  } }), Object.defineProperty(e2, "stringify", { enumerable: true, get: function() {
    return n.stringify;
  } }), Object.defineProperty(e2, "nil", { enumerable: true, get: function() {
    return n.nil;
  } }), Object.defineProperty(e2, "Name", { enumerable: true, get: function() {
    return n.Name;
  } }), Object.defineProperty(e2, "CodeGen", { enumerable: true, get: function() {
    return n.CodeGen;
  } });
  const r = Qi, i = Yi, s = Pr, o = Ht, l = Ue, u = Et, c = zi, m = Ge, a = Z0, d = Pa, p = (N, y) => new RegExp(N, y);
  p.code = "new RegExp";
  const h = ["removeAdditional", "useDefaults", "coerceTypes"], v = /* @__PURE__ */ new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error"
  ]), T = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now."
  }, _ = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, E = 200;
  function j(N) {
    var y, k, C, g, b, $, R, H, ie, ne, oe, je, M, ee, he, fe, we, Ae, Ve, lt, ot, Ne, G, se, ae;
    const pe = N.strict, Se = (y = N.code) === null || y === void 0 ? void 0 : y.optimize, xe = Se === true || Se === void 0 ? 1 : Se || 0, Ee = (C = (k = N.code) === null || k === void 0 ? void 0 : k.regExp) !== null && C !== void 0 ? C : p, Tt = (g = N.uriResolver) !== null && g !== void 0 ? g : d.default;
    return {
      strictSchema: ($ = (b = N.strictSchema) !== null && b !== void 0 ? b : pe) !== null && $ !== void 0 ? $ : true,
      strictNumbers: (H = (R = N.strictNumbers) !== null && R !== void 0 ? R : pe) !== null && H !== void 0 ? H : true,
      strictTypes: (ne = (ie = N.strictTypes) !== null && ie !== void 0 ? ie : pe) !== null && ne !== void 0 ? ne : "log",
      strictTuples: (je = (oe = N.strictTuples) !== null && oe !== void 0 ? oe : pe) !== null && je !== void 0 ? je : "log",
      strictRequired: (ee = (M = N.strictRequired) !== null && M !== void 0 ? M : pe) !== null && ee !== void 0 ? ee : false,
      code: N.code ? { ...N.code, optimize: xe, regExp: Ee } : { optimize: xe, regExp: Ee },
      loopRequired: (he = N.loopRequired) !== null && he !== void 0 ? he : E,
      loopEnum: (fe = N.loopEnum) !== null && fe !== void 0 ? fe : E,
      meta: (we = N.meta) !== null && we !== void 0 ? we : true,
      messages: (Ae = N.messages) !== null && Ae !== void 0 ? Ae : true,
      inlineRefs: (Ve = N.inlineRefs) !== null && Ve !== void 0 ? Ve : true,
      schemaId: (lt = N.schemaId) !== null && lt !== void 0 ? lt : "$id",
      addUsedSchema: (ot = N.addUsedSchema) !== null && ot !== void 0 ? ot : true,
      validateSchema: (Ne = N.validateSchema) !== null && Ne !== void 0 ? Ne : true,
      validateFormats: (G = N.validateFormats) !== null && G !== void 0 ? G : true,
      unicodeRegExp: (se = N.unicodeRegExp) !== null && se !== void 0 ? se : true,
      int32range: (ae = N.int32range) !== null && ae !== void 0 ? ae : true,
      uriResolver: Tt
    };
  }
  class F {
    constructor(y = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), y = this.opts = { ...y, ...j(y) };
      const { es5: k, lines: C } = this.opts.code;
      this.scope = new l.ValueScope({ scope: {}, prefixes: v, es5: k, lines: C }), this.logger = Q(y.logger);
      const g = y.validateFormats;
      y.validateFormats = false, this.RULES = (0, s.getRules)(), B.call(this, T, y, "NOT SUPPORTED"), B.call(this, _, y, "DEPRECATED", "warn"), this._metaOpts = te.call(this), y.formats && Z.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), y.keywords && Y.call(this, y.keywords), typeof y.meta == "object" && this.addMetaSchema(y.meta), P.call(this), y.validateFormats = g;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: y, meta: k, schemaId: C } = this.opts;
      let g = a;
      C === "id" && (g = { ...a }, g.id = g.$id, delete g.$id), k && y && this.addMetaSchema(g, g[C], false);
    }
    defaultMeta() {
      const { meta: y, schemaId: k } = this.opts;
      return this.opts.defaultMeta = typeof y == "object" ? y[k] || y : void 0;
    }
    validate(y, k) {
      let C;
      if (typeof y == "string") {
        if (C = this.getSchema(y), !C)
          throw new Error(`no schema with key or ref "${y}"`);
      } else
        C = this.compile(y);
      const g = C(k);
      return "$async" in C || (this.errors = C.errors), g;
    }
    compile(y, k) {
      const C = this._addSchema(y, k);
      return C.validate || this._compileSchemaEnv(C);
    }
    compileAsync(y, k) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: C } = this.opts;
      return g.call(this, y, k);
      async function g(ne, oe) {
        await b.call(this, ne.$schema);
        const je = this._addSchema(ne, oe);
        return je.validate || $.call(this, je);
      }
      async function b(ne) {
        ne && !this.getSchema(ne) && await g.call(this, { $ref: ne }, true);
      }
      async function $(ne) {
        try {
          return this._compileSchemaEnv(ne);
        } catch (oe) {
          if (!(oe instanceof i.default))
            throw oe;
          return R.call(this, oe), await H.call(this, oe.missingSchema), $.call(this, ne);
        }
      }
      function R({ missingSchema: ne, missingRef: oe }) {
        if (this.refs[ne])
          throw new Error(`AnySchema ${ne} is loaded but ${oe} cannot be resolved`);
      }
      async function H(ne) {
        const oe = await ie.call(this, ne);
        this.refs[ne] || await b.call(this, oe.$schema), this.refs[ne] || this.addSchema(oe, ne, k);
      }
      async function ie(ne) {
        const oe = this._loading[ne];
        if (oe)
          return oe;
        try {
          return await (this._loading[ne] = C(ne));
        } finally {
          delete this._loading[ne];
        }
      }
    }
    // Adds schema to the instance
    addSchema(y, k, C, g = this.opts.validateSchema) {
      if (Array.isArray(y)) {
        for (const $ of y)
          this.addSchema($, void 0, C, g);
        return this;
      }
      let b;
      if (typeof y == "object") {
        const { schemaId: $ } = this.opts;
        if (b = y[$], b !== void 0 && typeof b != "string")
          throw new Error(`schema ${$} must be string`);
      }
      return k = (0, u.normalizeId)(k || b), this._checkUnique(k), this.schemas[k] = this._addSchema(y, C, k, g, true), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(y, k, C = this.opts.validateSchema) {
      return this.addSchema(y, k, true, C), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(y, k) {
      if (typeof y == "boolean")
        return true;
      let C;
      if (C = y.$schema, C !== void 0 && typeof C != "string")
        throw new Error("$schema must be a string");
      if (C = C || this.opts.defaultMeta || this.defaultMeta(), !C)
        return this.logger.warn("meta-schema not available"), this.errors = null, true;
      const g = this.validate(C, y);
      if (!g && k) {
        const b = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(b);
        else
          throw new Error(b);
      }
      return g;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(y) {
      let k;
      for (; typeof (k = L.call(this, y)) == "string"; )
        y = k;
      if (k === void 0) {
        const { schemaId: C } = this.opts, g = new o.SchemaEnv({ schema: {}, schemaId: C });
        if (k = o.resolveSchema.call(this, g, y), !k)
          return;
        this.refs[y] = k;
      }
      return k.validate || this._compileSchemaEnv(k);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(y) {
      if (y instanceof RegExp)
        return this._removeAllSchemas(this.schemas, y), this._removeAllSchemas(this.refs, y), this;
      switch (typeof y) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const k = L.call(this, y);
          return typeof k == "object" && this._cache.delete(k.schema), delete this.schemas[y], delete this.refs[y], this;
        }
        case "object": {
          const k = y;
          this._cache.delete(k);
          let C = y[this.opts.schemaId];
          return C && (C = (0, u.normalizeId)(C), delete this.schemas[C], delete this.refs[C]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(y) {
      for (const k of y)
        this.addKeyword(k);
      return this;
    }
    addKeyword(y, k) {
      let C;
      if (typeof y == "string")
        C = y, typeof k == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), k.keyword = C);
      else if (typeof y == "object" && k === void 0) {
        if (k = y, C = k.keyword, Array.isArray(C) && !C.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (re.call(this, C, k), !k)
        return (0, m.eachItem)(C, (b) => Pe.call(this, b)), this;
      dt.call(this, k);
      const g = {
        ...k,
        type: (0, c.getJSONTypes)(k.type),
        schemaType: (0, c.getJSONTypes)(k.schemaType)
      };
      return (0, m.eachItem)(C, g.type.length === 0 ? (b) => Pe.call(this, b, g) : (b) => g.type.forEach(($) => Pe.call(this, b, g, $))), this;
    }
    getKeyword(y) {
      const k = this.RULES.all[y];
      return typeof k == "object" ? k.definition : !!k;
    }
    // Remove keyword
    removeKeyword(y) {
      const { RULES: k } = this;
      delete k.keywords[y], delete k.all[y];
      for (const C of k.rules) {
        const g = C.rules.findIndex((b) => b.keyword === y);
        g >= 0 && C.rules.splice(g, 1);
      }
      return this;
    }
    // Add format
    addFormat(y, k) {
      return typeof k == "string" && (k = new RegExp(k)), this.formats[y] = k, this;
    }
    errorsText(y = this.errors, { separator: k = ", ", dataVar: C = "data" } = {}) {
      return !y || y.length === 0 ? "No errors" : y.map((g) => `${C}${g.instancePath} ${g.message}`).reduce((g, b) => g + k + b);
    }
    $dataMetaSchema(y, k) {
      const C = this.RULES.all;
      y = JSON.parse(JSON.stringify(y));
      for (const g of k) {
        const b = g.split("/").slice(1);
        let $ = y;
        for (const R of b)
          $ = $[R];
        for (const R in C) {
          const H = C[R];
          if (typeof H != "object")
            continue;
          const { $data: ie } = H.definition, ne = $[R];
          ie && ne && ($[R] = pt(ne));
        }
      }
      return y;
    }
    _removeAllSchemas(y, k) {
      for (const C in y) {
        const g = y[C];
        (!k || k.test(C)) && (typeof g == "string" ? delete y[C] : g && !g.meta && (this._cache.delete(g.schema), delete y[C]));
      }
    }
    _addSchema(y, k, C, g = this.opts.validateSchema, b = this.opts.addUsedSchema) {
      let $;
      const { schemaId: R } = this.opts;
      if (typeof y == "object")
        $ = y[R];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof y != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let H = this._cache.get(y);
      if (H !== void 0)
        return H;
      C = (0, u.normalizeId)($ || C);
      const ie = u.getSchemaRefs.call(this, y, C);
      return H = new o.SchemaEnv({ schema: y, schemaId: R, meta: k, baseId: C, localRefs: ie }), this._cache.set(H.schema, H), b && !C.startsWith("#") && (C && this._checkUnique(C), this.refs[C] = H), g && this.validateSchema(y, true), H;
    }
    _checkUnique(y) {
      if (this.schemas[y] || this.refs[y])
        throw new Error(`schema with key or id "${y}" already exists`);
    }
    _compileSchemaEnv(y) {
      if (y.meta ? this._compileMetaSchema(y) : o.compileSchema.call(this, y), !y.validate)
        throw new Error("ajv implementation error");
      return y.validate;
    }
    _compileMetaSchema(y) {
      const k = this.opts;
      this.opts = this._metaOpts;
      try {
        o.compileSchema.call(this, y);
      } finally {
        this.opts = k;
      }
    }
  }
  e2.default = F, F.ValidationError = r.default, F.MissingRefError = i.default;
  function B(N, y, k, C = "error") {
    for (const g in N) {
      const b = g;
      b in y && this.logger[C](`${k}: option ${g}. ${N[b]}`);
    }
  }
  function L(N) {
    return N = (0, u.normalizeId)(N), this.schemas[N] || this.refs[N];
  }
  function P() {
    const N = this.opts.schemas;
    if (N)
      if (Array.isArray(N))
        this.addSchema(N);
      else
        for (const y in N)
          this.addSchema(N[y], y);
  }
  function Z() {
    for (const N in this.opts.formats) {
      const y = this.opts.formats[N];
      y && this.addFormat(N, y);
    }
  }
  function Y(N) {
    if (Array.isArray(N)) {
      this.addVocabulary(N);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const y in N) {
      const k = N[y];
      k.keyword || (k.keyword = y), this.addKeyword(k);
    }
  }
  function te() {
    const N = { ...this.opts };
    for (const y of h)
      delete N[y];
    return N;
  }
  const z = { log() {
  }, warn() {
  }, error() {
  } };
  function Q(N) {
    if (N === false)
      return z;
    if (N === void 0)
      return console;
    if (N.log && N.warn && N.error)
      return N;
    throw new Error("logger must implement log, warn and error methods");
  }
  const X = /^[a-z_$][a-z0-9_$:-]*$/i;
  function re(N, y) {
    const { RULES: k } = this;
    if ((0, m.eachItem)(N, (C) => {
      if (k.keywords[C])
        throw new Error(`Keyword ${C} is already defined`);
      if (!X.test(C))
        throw new Error(`Keyword ${C} has invalid name`);
    }), !!y && y.$data && !("code" in y || "validate" in y))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function Pe(N, y, k) {
    var C;
    const g = y == null ? void 0 : y.post;
    if (k && g)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: b } = this;
    let $ = g ? b.post : b.rules.find(({ type: H }) => H === k);
    if ($ || ($ = { type: k, rules: [] }, b.rules.push($)), b.keywords[N] = true, !y)
      return;
    const R = {
      keyword: N,
      definition: {
        ...y,
        type: (0, c.getJSONTypes)(y.type),
        schemaType: (0, c.getJSONTypes)(y.schemaType)
      }
    };
    y.before ? Me.call(this, $, R, y.before) : $.rules.push(R), b.all[N] = R, (C = y.implements) === null || C === void 0 || C.forEach((H) => this.addKeyword(H));
  }
  function Me(N, y, k) {
    const C = N.rules.findIndex((g) => g.keyword === k);
    C >= 0 ? N.rules.splice(C, 0, y) : (N.rules.push(y), this.logger.warn(`rule ${k} is not defined`));
  }
  function dt(N) {
    let { metaSchema: y } = N;
    y !== void 0 && (N.$data && this.opts.$data && (y = pt(y)), N.validateSchema = this.compile(y, true));
  }
  const tt = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function pt(N) {
    return { anyOf: [N, tt] };
  }
})(Df);
var Na = {}, xa = {}, ja = {};
Object.defineProperty(ja, "__esModule", { value: true });
const tS = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
ja.default = tS;
var Nr = {};
Object.defineProperty(Nr, "__esModule", { value: true });
Nr.callRef = Nr.getValidate = void 0;
const nS = Yi, hc = Fe, Vt = Ue, qr = Pn, yc = Ht, oo = Ge, rS = {
  keyword: "$ref",
  schemaType: "string",
  code(e2) {
    const { gen: t, schema: n, it: r } = e2, { baseId: i, schemaEnv: s, validateName: o, opts: l, self: u } = r, { root: c } = s;
    if ((n === "#" || n === "#/") && i === c.baseId)
      return a();
    const m = yc.resolveRef.call(u, c, i, n);
    if (m === void 0)
      throw new nS.default(r.opts.uriResolver, i, n);
    if (m instanceof yc.SchemaEnv)
      return d(m);
    return p(m);
    function a() {
      if (s === c)
        return vo(e2, o, s, s.$async);
      const h = t.scopeValue("root", { ref: c });
      return vo(e2, (0, Vt._)`${h}.validate`, c, c.$async);
    }
    function d(h) {
      const v = lp(e2, h);
      vo(e2, v, h, h.$async);
    }
    function p(h) {
      const v = t.scopeValue("schema", l.code.source === true ? { ref: h, code: (0, Vt.stringify)(h) } : { ref: h }), T = t.name("valid"), _ = e2.subschema({
        schema: h,
        dataTypes: [],
        schemaPath: Vt.nil,
        topSchemaRef: v,
        errSchemaPath: n
      }, T);
      e2.mergeEvaluated(_), e2.ok(T);
    }
  }
};
function lp(e2, t) {
  const { gen: n } = e2;
  return t.validate ? n.scopeValue("validate", { ref: t.validate }) : (0, Vt._)`${n.scopeValue("wrapper", { ref: t })}.validate`;
}
Nr.getValidate = lp;
function vo(e2, t, n, r) {
  const { gen: i, it: s } = e2, { allErrors: o, schemaEnv: l, opts: u } = s, c = u.passContext ? qr.default.this : Vt.nil;
  r ? m() : a();
  function m() {
    if (!l.$async)
      throw new Error("async schema referenced by sync schema");
    const h = i.let("valid");
    i.try(() => {
      i.code((0, Vt._)`await ${(0, hc.callValidateCode)(e2, t, c)}`), p(t), o || i.assign(h, true);
    }, (v) => {
      i.if((0, Vt._)`!(${v} instanceof ${s.ValidationError})`, () => i.throw(v)), d(v), o || i.assign(h, false);
    }), e2.ok(h);
  }
  function a() {
    e2.result((0, hc.callValidateCode)(e2, t, c), () => p(t), () => d(t));
  }
  function d(h) {
    const v = (0, Vt._)`${h}.errors`;
    i.assign(qr.default.vErrors, (0, Vt._)`${qr.default.vErrors} === null ? ${v} : ${qr.default.vErrors}.concat(${v})`), i.assign(qr.default.errors, (0, Vt._)`${qr.default.vErrors}.length`);
  }
  function p(h) {
    var v;
    if (!s.opts.unevaluated)
      return;
    const T = (v = n == null ? void 0 : n.validate) === null || v === void 0 ? void 0 : v.evaluated;
    if (s.props !== true)
      if (T && !T.dynamicProps)
        T.props !== void 0 && (s.props = oo.mergeEvaluated.props(i, T.props, s.props));
      else {
        const _ = i.var("props", (0, Vt._)`${h}.evaluated.props`);
        s.props = oo.mergeEvaluated.props(i, _, s.props, Vt.Name);
      }
    if (s.items !== true)
      if (T && !T.dynamicItems)
        T.items !== void 0 && (s.items = oo.mergeEvaluated.items(i, T.items, s.items));
      else {
        const _ = i.var("items", (0, Vt._)`${h}.evaluated.items`);
        s.items = oo.mergeEvaluated.items(i, _, s.items, Vt.Name);
      }
  }
}
Nr.callRef = vo;
Nr.default = rS;
Object.defineProperty(xa, "__esModule", { value: true });
const iS = ja, oS = Nr, sS = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  iS.default,
  oS.default
];
xa.default = sS;
var La = {}, Da = {};
Object.defineProperty(Da, "__esModule", { value: true });
const No = Ue, Xn = No.operators, xo = {
  maximum: { okStr: "<=", ok: Xn.LTE, fail: Xn.GT },
  minimum: { okStr: ">=", ok: Xn.GTE, fail: Xn.LT },
  exclusiveMaximum: { okStr: "<", ok: Xn.LT, fail: Xn.GTE },
  exclusiveMinimum: { okStr: ">", ok: Xn.GT, fail: Xn.LTE }
}, aS = {
  message: ({ keyword: e2, schemaCode: t }) => (0, No.str)`must be ${xo[e2].okStr} ${t}`,
  params: ({ keyword: e2, schemaCode: t }) => (0, No._)`{comparison: ${xo[e2].okStr}, limit: ${t}}`
}, lS = {
  keyword: Object.keys(xo),
  type: "number",
  schemaType: "number",
  $data: true,
  error: aS,
  code(e2) {
    const { keyword: t, data: n, schemaCode: r } = e2;
    e2.fail$data((0, No._)`${n} ${xo[t].fail} ${r} || isNaN(${n})`);
  }
};
Da.default = lS;
var Ra = {};
Object.defineProperty(Ra, "__esModule", { value: true });
const Ei = Ue, cS = {
  message: ({ schemaCode: e2 }) => (0, Ei.str)`must be multiple of ${e2}`,
  params: ({ schemaCode: e2 }) => (0, Ei._)`{multipleOf: ${e2}}`
}, uS = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: true,
  error: cS,
  code(e2) {
    const { gen: t, data: n, schemaCode: r, it: i } = e2, s = i.opts.multipleOfPrecision, o = t.let("res"), l = s ? (0, Ei._)`Math.abs(Math.round(${o}) - ${o}) > 1e-${s}` : (0, Ei._)`${o} !== parseInt(${o})`;
    e2.fail$data((0, Ei._)`(${r} === 0 || (${o} = ${n}/${r}, ${l}))`);
  }
};
Ra.default = uS;
var Ma = {}, Fa = {};
Object.defineProperty(Fa, "__esModule", { value: true });
function cp(e2) {
  const t = e2.length;
  let n = 0, r = 0, i;
  for (; r < t; )
    n++, i = e2.charCodeAt(r++), i >= 55296 && i <= 56319 && r < t && (i = e2.charCodeAt(r), (i & 64512) === 56320 && r++);
  return n;
}
Fa.default = cp;
cp.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(Ma, "__esModule", { value: true });
const _r = Ue, dS = Ge, fS = Fa, pS = {
  message({ keyword: e2, schemaCode: t }) {
    const n = e2 === "maxLength" ? "more" : "fewer";
    return (0, _r.str)`must NOT have ${n} than ${t} characters`;
  },
  params: ({ schemaCode: e2 }) => (0, _r._)`{limit: ${e2}}`
}, mS = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: true,
  error: pS,
  code(e2) {
    const { keyword: t, data: n, schemaCode: r, it: i } = e2, s = t === "maxLength" ? _r.operators.GT : _r.operators.LT, o = i.opts.unicode === false ? (0, _r._)`${n}.length` : (0, _r._)`${(0, dS.useFunc)(e2.gen, fS.default)}(${n})`;
    e2.fail$data((0, _r._)`${o} ${s} ${r}`);
  }
};
Ma.default = mS;
var Ua = {};
Object.defineProperty(Ua, "__esModule", { value: true });
const hS = Fe, jo = Ue, yS = {
  message: ({ schemaCode: e2 }) => (0, jo.str)`must match pattern "${e2}"`,
  params: ({ schemaCode: e2 }) => (0, jo._)`{pattern: ${e2}}`
}, gS = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: true,
  error: yS,
  code(e2) {
    const { data: t, $data: n, schema: r, schemaCode: i, it: s } = e2, o = s.opts.unicodeRegExp ? "u" : "", l = n ? (0, jo._)`(new RegExp(${i}, ${o}))` : (0, hS.usePattern)(e2, r);
    e2.fail$data((0, jo._)`!${l}.test(${t})`);
  }
};
Ua.default = gS;
var Ba = {};
Object.defineProperty(Ba, "__esModule", { value: true });
const Ii = Ue, vS = {
  message({ keyword: e2, schemaCode: t }) {
    const n = e2 === "maxProperties" ? "more" : "fewer";
    return (0, Ii.str)`must NOT have ${n} than ${t} properties`;
  },
  params: ({ schemaCode: e2 }) => (0, Ii._)`{limit: ${e2}}`
}, _S = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: true,
  error: vS,
  code(e2) {
    const { keyword: t, data: n, schemaCode: r } = e2, i = t === "maxProperties" ? Ii.operators.GT : Ii.operators.LT;
    e2.fail$data((0, Ii._)`Object.keys(${n}).length ${i} ${r}`);
  }
};
Ba.default = _S;
var qa = {};
Object.defineProperty(qa, "__esModule", { value: true });
const _i = Fe, Pi = Ue, bS = Ge, TS = {
  message: ({ params: { missingProperty: e2 } }) => (0, Pi.str)`must have required property '${e2}'`,
  params: ({ params: { missingProperty: e2 } }) => (0, Pi._)`{missingProperty: ${e2}}`
}, SS = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: true,
  error: TS,
  code(e2) {
    const { gen: t, schema: n, schemaCode: r, data: i, $data: s, it: o } = e2, { opts: l } = o;
    if (!s && n.length === 0)
      return;
    const u = n.length >= l.loopRequired;
    if (o.allErrors ? c() : m(), l.strictRequired) {
      const p = e2.parentSchema.properties, { definedProperties: h } = e2.it;
      for (const v of n)
        if ((p == null ? void 0 : p[v]) === void 0 && !h.has(v)) {
          const T = o.schemaEnv.baseId + o.errSchemaPath, _ = `required property "${v}" is not defined at "${T}" (strictRequired)`;
          (0, bS.checkStrictMode)(o, _, o.opts.strictRequired);
        }
    }
    function c() {
      if (u || s)
        e2.block$data(Pi.nil, a);
      else
        for (const p of n)
          (0, _i.checkReportMissingProp)(e2, p);
    }
    function m() {
      const p = t.let("missing");
      if (u || s) {
        const h = t.let("valid", true);
        e2.block$data(h, () => d(p, h)), e2.ok(h);
      } else
        t.if((0, _i.checkMissingProp)(e2, n, p)), (0, _i.reportMissingProp)(e2, p), t.else();
    }
    function a() {
      t.forOf("prop", r, (p) => {
        e2.setParams({ missingProperty: p }), t.if((0, _i.noPropertyInData)(t, i, p, l.ownProperties), () => e2.error());
      });
    }
    function d(p, h) {
      e2.setParams({ missingProperty: p }), t.forOf(p, r, () => {
        t.assign(h, (0, _i.propertyInData)(t, i, p, l.ownProperties)), t.if((0, Pi.not)(h), () => {
          e2.error(), t.break();
        });
      }, Pi.nil);
    }
  }
};
qa.default = SS;
var Va = {};
Object.defineProperty(Va, "__esModule", { value: true });
const Ni = Ue, wS = {
  message({ keyword: e2, schemaCode: t }) {
    const n = e2 === "maxItems" ? "more" : "fewer";
    return (0, Ni.str)`must NOT have ${n} than ${t} items`;
  },
  params: ({ schemaCode: e2 }) => (0, Ni._)`{limit: ${e2}}`
}, $S = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: true,
  error: wS,
  code(e2) {
    const { keyword: t, data: n, schemaCode: r } = e2, i = t === "maxItems" ? Ni.operators.GT : Ni.operators.LT;
    e2.fail$data((0, Ni._)`${n}.length ${i} ${r}`);
  }
};
Va.default = $S;
var Ha = {}, Ji = {};
Object.defineProperty(Ji, "__esModule", { value: true });
const up = Hf;
up.code = 'require("ajv/dist/runtime/equal").default';
Ji.default = up;
Object.defineProperty(Ha, "__esModule", { value: true });
const Ts = zi, At = Ue, CS = Ge, kS = Ji, OS = {
  message: ({ params: { i: e2, j: t } }) => (0, At.str)`must NOT have duplicate items (items ## ${t} and ${e2} are identical)`,
  params: ({ params: { i: e2, j: t } }) => (0, At._)`{i: ${e2}, j: ${t}}`
}, AS = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: true,
  error: OS,
  code(e2) {
    const { gen: t, data: n, $data: r, schema: i, parentSchema: s, schemaCode: o, it: l } = e2;
    if (!r && !i)
      return;
    const u = t.let("valid"), c = s.items ? (0, Ts.getSchemaTypes)(s.items) : [];
    e2.block$data(u, m, (0, At._)`${o} === false`), e2.ok(u);
    function m() {
      const h = t.let("i", (0, At._)`${n}.length`), v = t.let("j");
      e2.setParams({ i: h, j: v }), t.assign(u, true), t.if((0, At._)`${h} > 1`, () => (a() ? d : p)(h, v));
    }
    function a() {
      return c.length > 0 && !c.some((h) => h === "object" || h === "array");
    }
    function d(h, v) {
      const T = t.name("item"), _ = (0, Ts.checkDataTypes)(c, T, l.opts.strictNumbers, Ts.DataType.Wrong), E = t.const("indices", (0, At._)`{}`);
      t.for((0, At._)`;${h}--;`, () => {
        t.let(T, (0, At._)`${n}[${h}]`), t.if(_, (0, At._)`continue`), c.length > 1 && t.if((0, At._)`typeof ${T} == "string"`, (0, At._)`${T} += "_"`), t.if((0, At._)`typeof ${E}[${T}] == "number"`, () => {
          t.assign(v, (0, At._)`${E}[${T}]`), e2.error(), t.assign(u, false).break();
        }).code((0, At._)`${E}[${T}] = ${h}`);
      });
    }
    function p(h, v) {
      const T = (0, CS.useFunc)(t, kS.default), _ = t.name("outer");
      t.label(_).for((0, At._)`;${h}--;`, () => t.for((0, At._)`${v} = ${h}; ${v}--;`, () => t.if((0, At._)`${T}(${n}[${h}], ${n}[${v}])`, () => {
        e2.error(), t.assign(u, false).break(_);
      })));
    }
  }
};
Ha.default = AS;
var Ka = {};
Object.defineProperty(Ka, "__esModule", { value: true });
const Bs = Ue, ES = Ge, IS = Ji, PS = {
  message: "must be equal to constant",
  params: ({ schemaCode: e2 }) => (0, Bs._)`{allowedValue: ${e2}}`
}, NS = {
  keyword: "const",
  $data: true,
  error: PS,
  code(e2) {
    const { gen: t, data: n, $data: r, schemaCode: i, schema: s } = e2;
    r || s && typeof s == "object" ? e2.fail$data((0, Bs._)`!${(0, ES.useFunc)(t, IS.default)}(${n}, ${i})`) : e2.fail((0, Bs._)`${s} !== ${n}`);
  }
};
Ka.default = NS;
var Ga = {};
Object.defineProperty(Ga, "__esModule", { value: true });
const Si = Ue, xS = Ge, jS = Ji, LS = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e2 }) => (0, Si._)`{allowedValues: ${e2}}`
}, DS = {
  keyword: "enum",
  schemaType: "array",
  $data: true,
  error: LS,
  code(e2) {
    const { gen: t, data: n, $data: r, schema: i, schemaCode: s, it: o } = e2;
    if (!r && i.length === 0)
      throw new Error("enum must have non-empty array");
    const l = i.length >= o.opts.loopEnum;
    let u;
    const c = () => u ?? (u = (0, xS.useFunc)(t, jS.default));
    let m;
    if (l || r)
      m = t.let("valid"), e2.block$data(m, a);
    else {
      if (!Array.isArray(i))
        throw new Error("ajv implementation error");
      const p = t.const("vSchema", s);
      m = (0, Si.or)(...i.map((h, v) => d(p, v)));
    }
    e2.pass(m);
    function a() {
      t.assign(m, false), t.forOf("v", s, (p) => t.if((0, Si._)`${c()}(${n}, ${p})`, () => t.assign(m, true).break()));
    }
    function d(p, h) {
      const v = i[h];
      return typeof v == "object" && v !== null ? (0, Si._)`${c()}(${n}, ${p}[${h}])` : (0, Si._)`${n} === ${v}`;
    }
  }
};
Ga.default = DS;
Object.defineProperty(La, "__esModule", { value: true });
const RS = Da, MS = Ra, FS = Ma, US = Ua, BS = Ba, qS = qa, VS = Va, HS = Ha, KS = Ka, GS = Ga, WS = [
  // number
  RS.default,
  MS.default,
  // string
  FS.default,
  US.default,
  // object
  BS.default,
  qS.default,
  // array
  VS.default,
  HS.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  KS.default,
  GS.default
];
La.default = WS;
var Wa = {}, ci = {};
Object.defineProperty(ci, "__esModule", { value: true });
ci.validateAdditionalItems = void 0;
const br = Ue, qs = Ge, zS = {
  message: ({ params: { len: e2 } }) => (0, br.str)`must NOT have more than ${e2} items`,
  params: ({ params: { len: e2 } }) => (0, br._)`{limit: ${e2}}`
}, QS = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: zS,
  code(e2) {
    const { parentSchema: t, it: n } = e2, { items: r } = t;
    if (!Array.isArray(r)) {
      (0, qs.checkStrictMode)(n, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    dp(e2, r);
  }
};
function dp(e2, t) {
  const { gen: n, schema: r, data: i, keyword: s, it: o } = e2;
  o.items = true;
  const l = n.const("len", (0, br._)`${i}.length`);
  if (r === false)
    e2.setParams({ len: t.length }), e2.pass((0, br._)`${l} <= ${t.length}`);
  else if (typeof r == "object" && !(0, qs.alwaysValidSchema)(o, r)) {
    const c = n.var("valid", (0, br._)`${l} <= ${t.length}`);
    n.if((0, br.not)(c), () => u(c)), e2.ok(c);
  }
  function u(c) {
    n.forRange("i", t.length, l, (m) => {
      e2.subschema({ keyword: s, dataProp: m, dataPropType: qs.Type.Num }, c), o.allErrors || n.if((0, br.not)(c), () => n.break());
    });
  }
}
ci.validateAdditionalItems = dp;
ci.default = QS;
var za = {}, ui = {};
Object.defineProperty(ui, "__esModule", { value: true });
ui.validateTuple = void 0;
const gc = Ue, _o = Ge, YS = Fe, JS = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e2) {
    const { schema: t, it: n } = e2;
    if (Array.isArray(t))
      return fp(e2, "additionalItems", t);
    n.items = true, !(0, _o.alwaysValidSchema)(n, t) && e2.ok((0, YS.validateArray)(e2));
  }
};
function fp(e2, t, n = e2.schema) {
  const { gen: r, parentSchema: i, data: s, keyword: o, it: l } = e2;
  m(i), l.opts.unevaluated && n.length && l.items !== true && (l.items = _o.mergeEvaluated.items(r, n.length, l.items));
  const u = r.name("valid"), c = r.const("len", (0, gc._)`${s}.length`);
  n.forEach((a, d) => {
    (0, _o.alwaysValidSchema)(l, a) || (r.if((0, gc._)`${c} > ${d}`, () => e2.subschema({
      keyword: o,
      schemaProp: d,
      dataProp: d
    }, u)), e2.ok(u));
  });
  function m(a) {
    const { opts: d, errSchemaPath: p } = l, h = n.length, v = h === a.minItems && (h === a.maxItems || a[t] === false);
    if (d.strictTuples && !v) {
      const T = `"${o}" is ${h}-tuple, but minItems or maxItems/${t} are not specified or different at path "${p}"`;
      (0, _o.checkStrictMode)(l, T, d.strictTuples);
    }
  }
}
ui.validateTuple = fp;
ui.default = JS;
Object.defineProperty(za, "__esModule", { value: true });
const XS = ui, ZS = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e2) => (0, XS.validateTuple)(e2, "items")
};
za.default = ZS;
var Qa = {};
Object.defineProperty(Qa, "__esModule", { value: true });
const vc = Ue, ew = Ge, tw = Fe, nw = ci, rw = {
  message: ({ params: { len: e2 } }) => (0, vc.str)`must NOT have more than ${e2} items`,
  params: ({ params: { len: e2 } }) => (0, vc._)`{limit: ${e2}}`
}, iw = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: rw,
  code(e2) {
    const { schema: t, parentSchema: n, it: r } = e2, { prefixItems: i } = n;
    r.items = true, !(0, ew.alwaysValidSchema)(r, t) && (i ? (0, nw.validateAdditionalItems)(e2, i) : e2.ok((0, tw.validateArray)(e2)));
  }
};
Qa.default = iw;
var Ya = {};
Object.defineProperty(Ya, "__esModule", { value: true });
const nn = Ue, so = Ge, ow = {
  message: ({ params: { min: e2, max: t } }) => t === void 0 ? (0, nn.str)`must contain at least ${e2} valid item(s)` : (0, nn.str)`must contain at least ${e2} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e2, max: t } }) => t === void 0 ? (0, nn._)`{minContains: ${e2}}` : (0, nn._)`{minContains: ${e2}, maxContains: ${t}}`
}, sw = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: true,
  error: ow,
  code(e2) {
    const { gen: t, schema: n, parentSchema: r, data: i, it: s } = e2;
    let o, l;
    const { minContains: u, maxContains: c } = r;
    s.opts.next ? (o = u === void 0 ? 1 : u, l = c) : o = 1;
    const m = t.const("len", (0, nn._)`${i}.length`);
    if (e2.setParams({ min: o, max: l }), l === void 0 && o === 0) {
      (0, so.checkStrictMode)(s, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (l !== void 0 && o > l) {
      (0, so.checkStrictMode)(s, '"minContains" > "maxContains" is always invalid'), e2.fail();
      return;
    }
    if ((0, so.alwaysValidSchema)(s, n)) {
      let v = (0, nn._)`${m} >= ${o}`;
      l !== void 0 && (v = (0, nn._)`${v} && ${m} <= ${l}`), e2.pass(v);
      return;
    }
    s.items = true;
    const a = t.name("valid");
    l === void 0 && o === 1 ? p(a, () => t.if(a, () => t.break())) : o === 0 ? (t.let(a, true), l !== void 0 && t.if((0, nn._)`${i}.length > 0`, d)) : (t.let(a, false), d()), e2.result(a, () => e2.reset());
    function d() {
      const v = t.name("_valid"), T = t.let("count", 0);
      p(v, () => t.if(v, () => h(T)));
    }
    function p(v, T) {
      t.forRange("i", 0, m, (_) => {
        e2.subschema({
          keyword: "contains",
          dataProp: _,
          dataPropType: so.Type.Num,
          compositeRule: true
        }, v), T();
      });
    }
    function h(v) {
      t.code((0, nn._)`${v}++`), l === void 0 ? t.if((0, nn._)`${v} >= ${o}`, () => t.assign(a, true).break()) : (t.if((0, nn._)`${v} > ${l}`, () => t.assign(a, false).break()), o === 1 ? t.assign(a, true) : t.if((0, nn._)`${v} >= ${o}`, () => t.assign(a, true)));
    }
  }
};
Ya.default = sw;
var pp = {};
(function(e2) {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.validateSchemaDeps = e2.validatePropertyDeps = e2.error = void 0;
  const t = Ue, n = Ge, r = Fe;
  e2.error = {
    message: ({ params: { property: u, depsCount: c, deps: m } }) => {
      const a = c === 1 ? "property" : "properties";
      return (0, t.str)`must have ${a} ${m} when property ${u} is present`;
    },
    params: ({ params: { property: u, depsCount: c, deps: m, missingProperty: a } }) => (0, t._)`{property: ${u},
    missingProperty: ${a},
    depsCount: ${c},
    deps: ${m}}`
    // TODO change to reference
  };
  const i = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e2.error,
    code(u) {
      const [c, m] = s(u);
      o(u, c), l(u, m);
    }
  };
  function s({ schema: u }) {
    const c = {}, m = {};
    for (const a in u) {
      if (a === "__proto__")
        continue;
      const d = Array.isArray(u[a]) ? c : m;
      d[a] = u[a];
    }
    return [c, m];
  }
  function o(u, c = u.schema) {
    const { gen: m, data: a, it: d } = u;
    if (Object.keys(c).length === 0)
      return;
    const p = m.let("missing");
    for (const h in c) {
      const v = c[h];
      if (v.length === 0)
        continue;
      const T = (0, r.propertyInData)(m, a, h, d.opts.ownProperties);
      u.setParams({
        property: h,
        depsCount: v.length,
        deps: v.join(", ")
      }), d.allErrors ? m.if(T, () => {
        for (const _ of v)
          (0, r.checkReportMissingProp)(u, _);
      }) : (m.if((0, t._)`${T} && (${(0, r.checkMissingProp)(u, v, p)})`), (0, r.reportMissingProp)(u, p), m.else());
    }
  }
  e2.validatePropertyDeps = o;
  function l(u, c = u.schema) {
    const { gen: m, data: a, keyword: d, it: p } = u, h = m.name("valid");
    for (const v in c)
      (0, n.alwaysValidSchema)(p, c[v]) || (m.if(
        (0, r.propertyInData)(m, a, v, p.opts.ownProperties),
        () => {
          const T = u.subschema({ keyword: d, schemaProp: v }, h);
          u.mergeValidEvaluated(T, h);
        },
        () => m.var(h, true)
        // TODO var
      ), u.ok(h));
  }
  e2.validateSchemaDeps = l, e2.default = i;
})(pp);
var Ja = {};
Object.defineProperty(Ja, "__esModule", { value: true });
const mp = Ue, aw = Ge, lw = {
  message: "property name must be valid",
  params: ({ params: e2 }) => (0, mp._)`{propertyName: ${e2.propertyName}}`
}, cw = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: lw,
  code(e2) {
    const { gen: t, schema: n, data: r, it: i } = e2;
    if ((0, aw.alwaysValidSchema)(i, n))
      return;
    const s = t.name("valid");
    t.forIn("key", r, (o) => {
      e2.setParams({ propertyName: o }), e2.subschema({
        keyword: "propertyNames",
        data: o,
        dataTypes: ["string"],
        propertyName: o,
        compositeRule: true
      }, s), t.if((0, mp.not)(s), () => {
        e2.error(true), i.allErrors || t.break();
      });
    }), e2.ok(s);
  }
};
Ja.default = cw;
var rs = {};
Object.defineProperty(rs, "__esModule", { value: true });
const ao = Fe, an = Ue, uw = Pn, lo = Ge, dw = {
  message: "must NOT have additional properties",
  params: ({ params: e2 }) => (0, an._)`{additionalProperty: ${e2.additionalProperty}}`
}, fw = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: true,
  trackErrors: true,
  error: dw,
  code(e2) {
    const { gen: t, schema: n, parentSchema: r, data: i, errsCount: s, it: o } = e2;
    if (!s)
      throw new Error("ajv implementation error");
    const { allErrors: l, opts: u } = o;
    if (o.props = true, u.removeAdditional !== "all" && (0, lo.alwaysValidSchema)(o, n))
      return;
    const c = (0, ao.allSchemaProperties)(r.properties), m = (0, ao.allSchemaProperties)(r.patternProperties);
    a(), e2.ok((0, an._)`${s} === ${uw.default.errors}`);
    function a() {
      t.forIn("key", i, (T) => {
        !c.length && !m.length ? h(T) : t.if(d(T), () => h(T));
      });
    }
    function d(T) {
      let _;
      if (c.length > 8) {
        const E = (0, lo.schemaRefOrVal)(o, r.properties, "properties");
        _ = (0, ao.isOwnProperty)(t, E, T);
      } else
        c.length ? _ = (0, an.or)(...c.map((E) => (0, an._)`${T} === ${E}`)) : _ = an.nil;
      return m.length && (_ = (0, an.or)(_, ...m.map((E) => (0, an._)`${(0, ao.usePattern)(e2, E)}.test(${T})`))), (0, an.not)(_);
    }
    function p(T) {
      t.code((0, an._)`delete ${i}[${T}]`);
    }
    function h(T) {
      if (u.removeAdditional === "all" || u.removeAdditional && n === false) {
        p(T);
        return;
      }
      if (n === false) {
        e2.setParams({ additionalProperty: T }), e2.error(), l || t.break();
        return;
      }
      if (typeof n == "object" && !(0, lo.alwaysValidSchema)(o, n)) {
        const _ = t.name("valid");
        u.removeAdditional === "failing" ? (v(T, _, false), t.if((0, an.not)(_), () => {
          e2.reset(), p(T);
        })) : (v(T, _), l || t.if((0, an.not)(_), () => t.break()));
      }
    }
    function v(T, _, E) {
      const j = {
        keyword: "additionalProperties",
        dataProp: T,
        dataPropType: lo.Type.Str
      };
      E === false && Object.assign(j, {
        compositeRule: true,
        createErrors: false,
        allErrors: false
      }), e2.subschema(j, _);
    }
  }
};
rs.default = fw;
var Xa = {};
Object.defineProperty(Xa, "__esModule", { value: true });
const pw = dn, _c = Fe, Ss = Ge, bc = rs, mw = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e2) {
    const { gen: t, schema: n, parentSchema: r, data: i, it: s } = e2;
    s.opts.removeAdditional === "all" && r.additionalProperties === void 0 && bc.default.code(new pw.KeywordCxt(s, bc.default, "additionalProperties"));
    const o = (0, _c.allSchemaProperties)(n);
    for (const a of o)
      s.definedProperties.add(a);
    s.opts.unevaluated && o.length && s.props !== true && (s.props = Ss.mergeEvaluated.props(t, (0, Ss.toHash)(o), s.props));
    const l = o.filter((a) => !(0, Ss.alwaysValidSchema)(s, n[a]));
    if (l.length === 0)
      return;
    const u = t.name("valid");
    for (const a of l)
      c(a) ? m(a) : (t.if((0, _c.propertyInData)(t, i, a, s.opts.ownProperties)), m(a), s.allErrors || t.else().var(u, true), t.endIf()), e2.it.definedProperties.add(a), e2.ok(u);
    function c(a) {
      return s.opts.useDefaults && !s.compositeRule && n[a].default !== void 0;
    }
    function m(a) {
      e2.subschema({
        keyword: "properties",
        schemaProp: a,
        dataProp: a
      }, u);
    }
  }
};
Xa.default = mw;
var Za = {};
Object.defineProperty(Za, "__esModule", { value: true });
const Tc = Fe, co = Ue, Sc = Ge, wc = Ge, hw = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e2) {
    const { gen: t, schema: n, data: r, parentSchema: i, it: s } = e2, { opts: o } = s, l = (0, Tc.allSchemaProperties)(n), u = l.filter((v) => (0, Sc.alwaysValidSchema)(s, n[v]));
    if (l.length === 0 || u.length === l.length && (!s.opts.unevaluated || s.props === true))
      return;
    const c = o.strictSchema && !o.allowMatchingProperties && i.properties, m = t.name("valid");
    s.props !== true && !(s.props instanceof co.Name) && (s.props = (0, wc.evaluatedPropsToName)(t, s.props));
    const { props: a } = s;
    d();
    function d() {
      for (const v of l)
        c && p(v), s.allErrors ? h(v) : (t.var(m, true), h(v), t.if(m));
    }
    function p(v) {
      for (const T in c)
        new RegExp(v).test(T) && (0, Sc.checkStrictMode)(s, `property ${T} matches pattern ${v} (use allowMatchingProperties)`);
    }
    function h(v) {
      t.forIn("key", r, (T) => {
        t.if((0, co._)`${(0, Tc.usePattern)(e2, v)}.test(${T})`, () => {
          const _ = u.includes(v);
          _ || e2.subschema({
            keyword: "patternProperties",
            schemaProp: v,
            dataProp: T,
            dataPropType: wc.Type.Str
          }, m), s.opts.unevaluated && a !== true ? t.assign((0, co._)`${a}[${T}]`, true) : !_ && !s.allErrors && t.if((0, co.not)(m), () => t.break());
        });
      });
    }
  }
};
Za.default = hw;
var el = {};
Object.defineProperty(el, "__esModule", { value: true });
const yw = Ge, gw = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: true,
  code(e2) {
    const { gen: t, schema: n, it: r } = e2;
    if ((0, yw.alwaysValidSchema)(r, n)) {
      e2.fail();
      return;
    }
    const i = t.name("valid");
    e2.subschema({
      keyword: "not",
      compositeRule: true,
      createErrors: false,
      allErrors: false
    }, i), e2.failResult(i, () => e2.reset(), () => e2.error());
  },
  error: { message: "must NOT be valid" }
};
el.default = gw;
var tl = {};
Object.defineProperty(tl, "__esModule", { value: true });
const vw = Fe, _w = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: true,
  code: vw.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
tl.default = _w;
var nl = {};
Object.defineProperty(nl, "__esModule", { value: true });
const bo = Ue, bw = Ge, Tw = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e2 }) => (0, bo._)`{passingSchemas: ${e2.passing}}`
}, Sw = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: true,
  error: Tw,
  code(e2) {
    const { gen: t, schema: n, parentSchema: r, it: i } = e2;
    if (!Array.isArray(n))
      throw new Error("ajv implementation error");
    if (i.opts.discriminator && r.discriminator)
      return;
    const s = n, o = t.let("valid", false), l = t.let("passing", null), u = t.name("_valid");
    e2.setParams({ passing: l }), t.block(c), e2.result(o, () => e2.reset(), () => e2.error(true));
    function c() {
      s.forEach((m, a) => {
        let d;
        (0, bw.alwaysValidSchema)(i, m) ? t.var(u, true) : d = e2.subschema({
          keyword: "oneOf",
          schemaProp: a,
          compositeRule: true
        }, u), a > 0 && t.if((0, bo._)`${u} && ${o}`).assign(o, false).assign(l, (0, bo._)`[${l}, ${a}]`).else(), t.if(u, () => {
          t.assign(o, true), t.assign(l, a), d && e2.mergeEvaluated(d, bo.Name);
        });
      });
    }
  }
};
nl.default = Sw;
var rl = {};
Object.defineProperty(rl, "__esModule", { value: true });
const ww = Ge, $w = {
  keyword: "allOf",
  schemaType: "array",
  code(e2) {
    const { gen: t, schema: n, it: r } = e2;
    if (!Array.isArray(n))
      throw new Error("ajv implementation error");
    const i = t.name("valid");
    n.forEach((s, o) => {
      if ((0, ww.alwaysValidSchema)(r, s))
        return;
      const l = e2.subschema({ keyword: "allOf", schemaProp: o }, i);
      e2.ok(i), e2.mergeEvaluated(l);
    });
  }
};
rl.default = $w;
var il = {};
Object.defineProperty(il, "__esModule", { value: true });
const Lo = Ue, hp = Ge, Cw = {
  message: ({ params: e2 }) => (0, Lo.str)`must match "${e2.ifClause}" schema`,
  params: ({ params: e2 }) => (0, Lo._)`{failingKeyword: ${e2.ifClause}}`
}, kw = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: true,
  error: Cw,
  code(e2) {
    const { gen: t, parentSchema: n, it: r } = e2;
    n.then === void 0 && n.else === void 0 && (0, hp.checkStrictMode)(r, '"if" without "then" and "else" is ignored');
    const i = $c(r, "then"), s = $c(r, "else");
    if (!i && !s)
      return;
    const o = t.let("valid", true), l = t.name("_valid");
    if (u(), e2.reset(), i && s) {
      const m = t.let("ifClause");
      e2.setParams({ ifClause: m }), t.if(l, c("then", m), c("else", m));
    } else
      i ? t.if(l, c("then")) : t.if((0, Lo.not)(l), c("else"));
    e2.pass(o, () => e2.error(true));
    function u() {
      const m = e2.subschema({
        keyword: "if",
        compositeRule: true,
        createErrors: false,
        allErrors: false
      }, l);
      e2.mergeEvaluated(m);
    }
    function c(m, a) {
      return () => {
        const d = e2.subschema({ keyword: m }, l);
        t.assign(o, l), e2.mergeValidEvaluated(d, o), a ? t.assign(a, (0, Lo._)`${m}`) : e2.setParams({ ifClause: m });
      };
    }
  }
};
function $c(e2, t) {
  const n = e2.schema[t];
  return n !== void 0 && !(0, hp.alwaysValidSchema)(e2, n);
}
il.default = kw;
var ol = {};
Object.defineProperty(ol, "__esModule", { value: true });
const Ow = Ge, Aw = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e2, parentSchema: t, it: n }) {
    t.if === void 0 && (0, Ow.checkStrictMode)(n, `"${e2}" without "if" is ignored`);
  }
};
ol.default = Aw;
Object.defineProperty(Wa, "__esModule", { value: true });
const Ew = ci, Iw = za, Pw = ui, Nw = Qa, xw = Ya, jw = pp, Lw = Ja, Dw = rs, Rw = Xa, Mw = Za, Fw = el, Uw = tl, Bw = nl, qw = rl, Vw = il, Hw = ol;
function Kw(e2 = false) {
  const t = [
    // any
    Fw.default,
    Uw.default,
    Bw.default,
    qw.default,
    Vw.default,
    Hw.default,
    // object
    Lw.default,
    Dw.default,
    jw.default,
    Rw.default,
    Mw.default
  ];
  return e2 ? t.push(Iw.default, Nw.default) : t.push(Ew.default, Pw.default), t.push(xw.default), t;
}
Wa.default = Kw;
var sl = {}, al = {};
Object.defineProperty(al, "__esModule", { value: true });
const yt = Ue, Gw = {
  message: ({ schemaCode: e2 }) => (0, yt.str)`must match format "${e2}"`,
  params: ({ schemaCode: e2 }) => (0, yt._)`{format: ${e2}}`
}, Ww = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: true,
  error: Gw,
  code(e2, t) {
    const { gen: n, data: r, $data: i, schema: s, schemaCode: o, it: l } = e2, { opts: u, errSchemaPath: c, schemaEnv: m, self: a } = l;
    if (!u.validateFormats)
      return;
    i ? d() : p();
    function d() {
      const h = n.scopeValue("formats", {
        ref: a.formats,
        code: u.code.formats
      }), v = n.const("fDef", (0, yt._)`${h}[${o}]`), T = n.let("fType"), _ = n.let("format");
      n.if((0, yt._)`typeof ${v} == "object" && !(${v} instanceof RegExp)`, () => n.assign(T, (0, yt._)`${v}.type || "string"`).assign(_, (0, yt._)`${v}.validate`), () => n.assign(T, (0, yt._)`"string"`).assign(_, v)), e2.fail$data((0, yt.or)(E(), j()));
      function E() {
        return u.strictSchema === false ? yt.nil : (0, yt._)`${o} && !${_}`;
      }
      function j() {
        const F = m.$async ? (0, yt._)`(${v}.async ? await ${_}(${r}) : ${_}(${r}))` : (0, yt._)`${_}(${r})`, B = (0, yt._)`(typeof ${_} == "function" ? ${F} : ${_}.test(${r}))`;
        return (0, yt._)`${_} && ${_} !== true && ${T} === ${t} && !${B}`;
      }
    }
    function p() {
      const h = a.formats[s];
      if (!h) {
        E();
        return;
      }
      if (h === true)
        return;
      const [v, T, _] = j(h);
      v === t && e2.pass(F());
      function E() {
        if (u.strictSchema === false) {
          a.logger.warn(B());
          return;
        }
        throw new Error(B());
        function B() {
          return `unknown format "${s}" ignored in schema at path "${c}"`;
        }
      }
      function j(B) {
        const L = B instanceof RegExp ? (0, yt.regexpCode)(B) : u.code.formats ? (0, yt._)`${u.code.formats}${(0, yt.getProperty)(s)}` : void 0, P = n.scopeValue("formats", { key: s, ref: B, code: L });
        return typeof B == "object" && !(B instanceof RegExp) ? [B.type || "string", B.validate, (0, yt._)`${P}.validate`] : ["string", B, P];
      }
      function F() {
        if (typeof h == "object" && !(h instanceof RegExp) && h.async) {
          if (!m.$async)
            throw new Error("async format in sync schema");
          return (0, yt._)`await ${_}(${r})`;
        }
        return typeof T == "function" ? (0, yt._)`${_}(${r})` : (0, yt._)`${_}.test(${r})`;
      }
    }
  }
};
al.default = Ww;
Object.defineProperty(sl, "__esModule", { value: true });
const zw = al, Qw = [zw.default];
sl.default = Qw;
var si = {};
Object.defineProperty(si, "__esModule", { value: true });
si.contentVocabulary = si.metadataVocabulary = void 0;
si.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
si.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(Na, "__esModule", { value: true });
const Yw = xa, Jw = La, Xw = Wa, Zw = sl, Cc = si, e$ = [
  Yw.default,
  Jw.default,
  (0, Xw.default)(),
  Zw.default,
  Cc.metadataVocabulary,
  Cc.contentVocabulary
];
Na.default = e$;
var ll = {}, yp = {};
(function(e2) {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.DiscrError = void 0, function(t) {
    t.Tag = "tag", t.Mapping = "mapping";
  }(e2.DiscrError || (e2.DiscrError = {}));
})(yp);
Object.defineProperty(ll, "__esModule", { value: true });
const Hr = Ue, Vs = yp, kc = Ht, t$ = Ge, n$ = {
  message: ({ params: { discrError: e2, tagName: t } }) => e2 === Vs.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e2, tag: t, tagName: n } }) => (0, Hr._)`{error: ${e2}, tag: ${n}, tagValue: ${t}}`
}, r$ = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: n$,
  code(e2) {
    const { gen: t, data: n, schema: r, parentSchema: i, it: s } = e2, { oneOf: o } = i;
    if (!s.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const l = r.propertyName;
    if (typeof l != "string")
      throw new Error("discriminator: requires propertyName");
    if (r.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!o)
      throw new Error("discriminator: requires oneOf keyword");
    const u = t.let("valid", false), c = t.const("tag", (0, Hr._)`${n}${(0, Hr.getProperty)(l)}`);
    t.if((0, Hr._)`typeof ${c} == "string"`, () => m(), () => e2.error(false, { discrError: Vs.DiscrError.Tag, tag: c, tagName: l })), e2.ok(u);
    function m() {
      const p = d();
      t.if(false);
      for (const h in p)
        t.elseIf((0, Hr._)`${c} === ${h}`), t.assign(u, a(p[h]));
      t.else(), e2.error(false, { discrError: Vs.DiscrError.Mapping, tag: c, tagName: l }), t.endIf();
    }
    function a(p) {
      const h = t.name("valid"), v = e2.subschema({ keyword: "oneOf", schemaProp: p }, h);
      return e2.mergeEvaluated(v, Hr.Name), h;
    }
    function d() {
      var p;
      const h = {}, v = _(i);
      let T = true;
      for (let F = 0; F < o.length; F++) {
        let B = o[F];
        B != null && B.$ref && !(0, t$.schemaHasRulesButRef)(B, s.self.RULES) && (B = kc.resolveRef.call(s.self, s.schemaEnv.root, s.baseId, B == null ? void 0 : B.$ref), B instanceof kc.SchemaEnv && (B = B.schema));
        const L = (p = B == null ? void 0 : B.properties) === null || p === void 0 ? void 0 : p[l];
        if (typeof L != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${l}"`);
        T = T && (v || _(B)), E(L, F);
      }
      if (!T)
        throw new Error(`discriminator: "${l}" must be required`);
      return h;
      function _({ required: F }) {
        return Array.isArray(F) && F.includes(l);
      }
      function E(F, B) {
        if (F.const)
          j(F.const, B);
        else if (F.enum)
          for (const L of F.enum)
            j(L, B);
        else
          throw new Error(`discriminator: "properties/${l}" must have "const" or "enum"`);
      }
      function j(F, B) {
        if (typeof F != "string" || F in h)
          throw new Error(`discriminator: "${l}" values must be unique strings`);
        h[F] = B;
      }
    }
  }
};
ll.default = r$;
const i$ = "http://json-schema.org/draft-07/schema#", o$ = "http://json-schema.org/draft-07/schema#", s$ = "Core schema meta-schema", a$ = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $ref: "#"
    }
  },
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    allOf: [
      {
        $ref: "#/definitions/nonNegativeInteger"
      },
      {
        default: 0
      }
    ]
  },
  simpleTypes: {
    enum: [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: true,
    default: []
  }
}, l$ = [
  "object",
  "boolean"
], c$ = {
  $id: {
    type: "string",
    format: "uri-reference"
  },
  $schema: {
    type: "string",
    format: "uri"
  },
  $ref: {
    type: "string",
    format: "uri-reference"
  },
  $comment: {
    type: "string"
  },
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  default: true,
  readOnly: {
    type: "boolean",
    default: false
  },
  examples: {
    type: "array",
    items: true
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  additionalItems: {
    $ref: "#"
  },
  items: {
    anyOf: [
      {
        $ref: "#"
      },
      {
        $ref: "#/definitions/schemaArray"
      }
    ],
    default: true
  },
  maxItems: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    default: false
  },
  contains: {
    $ref: "#"
  },
  maxProperties: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/definitions/stringArray"
  },
  additionalProperties: {
    $ref: "#"
  },
  definitions: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  properties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    propertyNames: {
      format: "regex"
    },
    default: {}
  },
  dependencies: {
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $ref: "#"
        },
        {
          $ref: "#/definitions/stringArray"
        }
      ]
    }
  },
  propertyNames: {
    $ref: "#"
  },
  const: true,
  enum: {
    type: "array",
    items: true,
    minItems: 1,
    uniqueItems: true
  },
  type: {
    anyOf: [
      {
        $ref: "#/definitions/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/definitions/simpleTypes"
        },
        minItems: 1,
        uniqueItems: true
      }
    ]
  },
  format: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentEncoding: {
    type: "string"
  },
  if: {
    $ref: "#"
  },
  then: {
    $ref: "#"
  },
  else: {
    $ref: "#"
  },
  allOf: {
    $ref: "#/definitions/schemaArray"
  },
  anyOf: {
    $ref: "#/definitions/schemaArray"
  },
  oneOf: {
    $ref: "#/definitions/schemaArray"
  },
  not: {
    $ref: "#"
  }
}, u$ = {
  $schema: i$,
  $id: o$,
  title: s$,
  definitions: a$,
  type: l$,
  properties: c$,
  default: true
};
(function(e2, t) {
  Object.defineProperty(t, "__esModule", { value: true }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = void 0;
  const n = Df, r = Na, i = ll, s = u$, o = ["/properties"], l = "http://json-schema.org/draft-07/schema";
  class u extends n.default {
    _addVocabularies() {
      super._addVocabularies(), r.default.forEach((h) => this.addVocabulary(h)), this.opts.discriminator && this.addKeyword(i.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const h = this.opts.$data ? this.$dataMetaSchema(s, o) : s;
      this.addMetaSchema(h, l, false), this.refs["http://json-schema.org/schema"] = l;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(l) ? l : void 0);
    }
  }
  e2.exports = t = u, Object.defineProperty(t, "__esModule", { value: true }), t.default = u;
  var c = dn;
  Object.defineProperty(t, "KeywordCxt", { enumerable: true, get: function() {
    return c.KeywordCxt;
  } });
  var m = Ue;
  Object.defineProperty(t, "_", { enumerable: true, get: function() {
    return m._;
  } }), Object.defineProperty(t, "str", { enumerable: true, get: function() {
    return m.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: true, get: function() {
    return m.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: true, get: function() {
    return m.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: true, get: function() {
    return m.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: true, get: function() {
    return m.CodeGen;
  } });
  var a = Qi;
  Object.defineProperty(t, "ValidationError", { enumerable: true, get: function() {
    return a.default;
  } });
  var d = Yi;
  Object.defineProperty(t, "MissingRefError", { enumerable: true, get: function() {
    return d.default;
  } });
})(Rs, Rs.exports);
var d$ = Rs.exports;
const f$ = /* @__PURE__ */ ta(d$);
function p$(e2, t) {
  for (const n in t.screens) {
    const r = t.screens[n];
    if (r.buttons)
      for (const [i, s] of r.buttons.entries())
        typeof s == "object" && (e2.buttons.buttons[s.id] = s, r.buttons[i] = s.id);
  }
  return t;
}
function m$(e2, t) {
  if (t.transitions)
    for (const n in t.transitions)
      yo[n] ? Object.assign(yo[n], t.transitions[n]) : yo[n] = t.transitions[n];
  return t;
}
function h$(e2, t, n) {
  switch (e2) {
    case "screens":
      return p$(
        t,
        n
      );
    case "common":
      return m$(
        t,
        n
      );
    default:
      return n;
  }
}
function gp(e2, t, n) {
  const r = e2[t], i = (s, o, l) => o;
  if (n) {
    let s = Ir(r, n, {
      arrayMerge: i
    });
    return s = h$(t, e2, s), s;
  }
}
function vp(e2) {
  return !(!e2 || !e2.default);
}
function _p(e2) {
  if (ke().clearErrors(), !vp(e2))
    return;
  console.log("Received HMR update for ", e2.default.id);
  const t = e2.default;
  if (bp(t))
    qt().addNotification(
      `Reloaded ${t.fileName}`,
      "You can continue playing with the changes."
    ), Re.addNarratScript(t);
  else if (cl(t)) {
    const n = Ct().findConfigModuleKey(t);
    if (n) {
      const r = gp(
        Ct().config,
        n,
        t.code
      );
      Ct().reloadConfigModule(n, r);
      const i = Object.values(Zb()).find((s) => s.config === n);
      i && i.store().updateConfig && i.store().updateConfig(r);
    }
    console.log(`Yaml update ${t.fileName}}`);
  } else
    console.error("Unknown module type", t);
}
function bp(e2) {
  return typeof e2 == "object" && e2 !== null && typeof e2.code == "string" && typeof e2.fileName == "string" && typeof e2.id == "string" && e2.type === "script";
}
function cl(e2) {
  return typeof e2 == "object" && e2 !== null && typeof e2.code == "object" && typeof e2.fileName == "string" && typeof e2.id == "string" && e2.type === "yaml";
}
window.narratHMRHandler = (e2) => {
  const t = window.narrat;
  t && t.handleHMR(e2);
  const n = new CustomEvent("narrat-hmr", {
    detail: {
      newModule: e2
    }
  });
  document.body.dispatchEvent(n);
};
class V {
  constructor(t, n, r, i) {
    qe(this, "keyword");
    qe(this, "runner");
    qe(this, "argTypes");
    qe(this, "parser");
    qe(this, "onPlayerAnswered");
    qe(this, "returnAfterPlayerAnswer");
    this.keyword = t, this.runner = r, this.argTypes = n, i ? this.parser = i : this.parser = Xi(this.keyword, this.argTypes), this.returnAfterPlayerAnswer = false;
  }
  async run(t, n) {
    let r = await this.runner(t, n);
    return this.returnAfterPlayerAnswer && (r = await new Promise((i, s) => {
      Ie().waitForPlayerAnswer(t), t.finishCommand = i;
    })), r;
  }
  async processPlayerAnswer(t, n) {
    let r = n;
    return this.onPlayerAnswered && (r = await this.onPlayerAnswered(t, n)), this.returnAfterPlayerAnswer && t.finishCommand && t.finishCommand(r), r;
  }
  static FromOptions(t) {
    const n = new V(
      t.keyword,
      t.argTypes,
      t.runner,
      t.parser
    );
    return n.onPlayerAnswered = t.onPlayerAnswered, n.returnAfterPlayerAnswer = t.returnAfterPlayerAnswer ?? false, n;
  }
}
function Xi(e2, t) {
  let n = [];
  if (t !== "any") {
    n = [];
    let r = false;
    const i = t.reduce((s, o) => (o.type === "rest" && (r = true), o.optional && s++, s), 0);
    i >= 1 ? n.push(t.length - i) : n.push(t.length), n.push(t.length), r && (n[1] = 1 / 0);
  }
  return (r, i) => {
    const s = {
      newLine: r.currentLine + 1
    }, o = i.command.args;
    if (t !== "any" && (o.length < n[0] || o.length > n[1]))
      return console.log("Error details"), console.log(i.command), console.log(o), r.parserContext.error(
        r.line.line,
        `Command ${e2}: Expected ${n.join(
          " to "
        )} arguments but got ${o.length}`
      ), s;
    if (i.command.commandType = e2, t !== "any") {
      let l = false;
      i.command.args.forEach((u, c) => {
        if (l)
          return;
        const m = t[c];
        if (m.type === "rest") {
          l = true;
          return;
        }
        !fd(u) && !pd(u) && (m.type === "any" || // eslint-disable-next-line valid-typeof
        typeof u === m.type || r.parserContext.error(
          r.line.line,
          `Command ${e2}: Argument #${c + 1} (${m.name}) should be a ${m.type}, but got type ${typeof u}: ${JSON.stringify(u)}`
        ));
      });
    }
    return {
      newLine: r.currentLine + 1
    };
  };
}
function ce(e2, t) {
  console.error("Runtime error ========================="), console.error(`Command: ${e2.commandType}`), console.error("Args: ", e2.args), console.error("Options: ", e2.options), ue(`Runtime error at ${e2.fileName}:${e2.line + 1} (${e2.commandType}) ${e2.code}. - 
  <br />
  Error: ${t}`), console.error("============================");
}
function y$(e2, ...t) {
  console.log(`[${e2.fileName}:${e2.line + 1}] log: `, ...t);
}
function Tp(e2, t, n) {
  const r = V.FromOptions({
    keyword: e2,
    argTypes: t,
    runner: async (i) => await Ie().runLabelFunction(n, ...i.args)
  });
  Re.addCommand(r);
}
const g$ = V.FromOptions({
  keyword: "create_macro",
  argTypes: "any",
  runner: async (e2) => {
    e2.args.length < 2 && ce(
      e2,
      "create_macro command needs at least a name and a label"
    );
    const t = e2.args[0], n = e2.args[1], i = e2.args.slice(2).map((s) => ({
      name: s,
      type: "any"
    }));
    Tp(t, i, n);
  }
}), v$ = [
  ["items", Iu, Pu],
  ["achievements", Yu, Ju],
  ["screens", Mu, Fu],
  ["skills", qu, Vu],
  ["skillChecks", Xu, Zu],
  ["buttons", Lu, Du],
  ["scripts", ku, qh],
  ["audio", pu, mu],
  ["quests", Nu, xu],
  ["tooltips", Gu, Wu],
  ["characters", Hu, Ku],
  ["choices", td, nd],
  ["animations", id, od],
  ["macros", sd, ad],
  ["preload", ld, cd]
], _$ = [
  ["common", Ou, ua]
], Un = new f$({ allErrors: true }), b$ = [
  "baseAssetsPath",
  "baseDataPath",
  "gameTitle",
  "saveFileName",
  "images",
  "layout",
  "settings",
  "gameFlow",
  "dialogPanel",
  "splashScreens",
  "notifications",
  "hudStats",
  "interactionTags",
  "transitions",
  "menuButtons",
  "debugging",
  "saves"
];
async function T$(e2, t) {
  for (const [n, r, i] of _$) {
    const s = t[n];
    let o = Oc(i);
    try {
      if (!Un.validate(r, s))
        throw console.error(Un.errors), new Error(`${Un.errorsText()}`);
    } catch (l) {
      console.error(l), ue(`${n} config error: ${l}`);
    }
    typeof s < "u" && (o = Oc(s, o)), e2[n] = o;
  }
}
function Oc(e2, t) {
  return typeof e2 == "object" ? Array.isArray(e2) ? [...e2] : { ...t, ...e2 } : typeof e2 < "u" ? e2 : t;
}
async function S$(e2, t) {
  for (const n of b$) {
    const r = t[n];
    r && (typeof r == "object" && !Array.isArray(r) ? e2.common[n] = {
      ...e2.common[n],
      ...r
    } : e2.common[n] = r);
  }
}
async function w$(e2) {
  const t = { ...ni };
  $a(e2) ? await T$(t, e2) : S$(t, e2);
  for (const n of v$) {
    const r = n[0], i = n[1], s = n[2];
    let o = e2[r];
    if (o && typeof o == "string")
      try {
        if (o = await zo(
          kp(t.common.baseDataPath, o)
        ), !Un.validate(i, o))
          throw console.error(Un.errors), new Error(`${Un.errorsText()}`);
      } catch (l) {
        console.error(l), ue(`${r} config error: ${l}`), o = { ...s };
      }
    o && (Array.isArray(o) ? t[r] = o : typeof o == "object" ? t[r] = { ...s, ...o } : t[r] = o);
  }
  for (const n in t)
    gp(
      t,
      n,
      t[n]
    );
  for (const n of t.macros.macros) {
    const r = n.options ?? [];
    Tp(n.keyword, r, n.label);
  }
  return t;
}
async function $$(e2) {
  let t;
  if (e2.config) {
    const i = e2.config;
    t = {};
    for (const s in i) {
      const o = i[s];
      cl(o) ? (Ct().addConfigModule(s, {
        id: o.id,
        configKey: s,
        code: o.code
      }), t[s] = o.code) : t[s] = o;
    }
  } else if (e2.configPath)
    t = await zo(e2.configPath);
  else
    throw ue("No config file or config object provided"), new Error("No config file or config object provided");
  let n = t;
  return $a(t) && (n = t.common), n.baseAssetsPath = e2.baseAssetsPath ?? n.baseAssetsPath ?? "", n.baseDataPath = e2.baseDataPath ?? n.baseDataPath ?? "", Un.validate(Lf, t) || (ue("Config file validation failed."), console.log(Un.errors), ue(Un.errorsText())), w$(t);
}
function et() {
  return Ct().config;
}
function de() {
  return et().common;
}
function wr(e2) {
  const t = de().hudStats[e2];
  return t || ue(`Hud stat ${e2} doesn't exist`), t;
}
function rn() {
  return et().audio;
}
function Sp(e2) {
  const t = rn().files[e2];
  if (!t) {
    li(`Audio file ${e2} doesn't exist`);
    return;
  }
  return t;
}
function Do(e2) {
  const t = Sp(e2), n = ((t == null ? void 0 : t.fadeInDelay) ?? rn().options.musicFadeInDelay) * 1e3, r = ((t == null ? void 0 : t.fadeInTime) ?? rn().options.musicFadeInTime) * 1e3, i = ((t == null ? void 0 : t.fadeOutTime) ?? rn().options.musicFadeOutTime) * 1e3;
  return {
    fadeInDelay: n,
    fadeInTime: r,
    fadeOutTime: i
  };
}
function Bn() {
  return et().skills;
}
function Vi() {
  return et().skillChecks;
}
function ul() {
  return et().items;
}
function is() {
  return et().quests;
}
function Hs() {
  return et().screens;
}
function dl() {
  return et().buttons;
}
function Cr() {
  return et().tooltips;
}
function fl() {
  return et().characters;
}
function Ks() {
  return et().choices;
}
function wp() {
  return et().animations;
}
function Ac(e2) {
  return Ks().choicePrompts[e2];
}
function Zi(e2) {
  return e2 === Ko ? Rl : Hs().screens[e2] ? Hs().screens[e2] : (ue(`Screen config for screen ${e2} doesn't exist`), Rl);
}
function Ro(e2) {
  const n = Cr().tooltips.find((r) => r.keywords.includes(e2));
  return n || (ue(`Tooltip config for keyword ${e2} not found`), null);
}
function pl(e2) {
  const t = et().skills.skills[e2];
  return t || ue(`Skill config for skill ${e2} doesn't exist`), t;
}
function $p(e2) {
  const t = et().skillChecks.skillChecks[e2];
  return t || ue(`Skill check config for skill check ${e2} doesn't exist`), t;
}
function Cp(e2) {
  return !!et().skillChecks.skillChecks[e2];
}
function eo(e2) {
  return e2.startsWith("http") ? e2 : Wt(e2);
}
function Wt(e2) {
  var n, r, i, s;
  if (e2.startsWith("http"))
    return e2;
  let t = e2;
  return de().images[e2] ? t = de().images[e2] : (n = et().preload.images) != null && n.assets[e2] ? t = (r = et().preload.images) == null ? void 0 : r.assets[e2] : (i = et().preload.video) != null && i.assets[e2] && (t = (s = et().preload.video) == null ? void 0 : s.assets[e2]), de().baseAssetsPath ? `${de().baseAssetsPath}${t}` : t;
}
function kp(e2, t) {
  return `${e2}${t}`;
}
function ml(e2) {
  return de().baseDataPath ? `${de().baseDataPath}${e2}` : e2;
}
function kr(e2) {
  const t = dl().buttons[e2];
  return t || ue(`Button config for button ${e2} doesn't exist`), t;
}
function wn(e2) {
  const t = ul().items[e2];
  return t || ue(`Item config for skill ${e2} doesn't exist`), t;
}
function Hi() {
  return et().achievements;
}
function hl(e2) {
  const t = Hi().achievements[e2];
  return t || ue(`Achievement config for achievement ${e2} doesn't exist`), t;
}
function ar(e2) {
  return is().quests[e2];
}
function Op(e2, t) {
  const r = ar(e2).endings;
  return r || ue(`Quest ${e2} doesn't have any endings`), r[t] || ue(`Quest ${e2} has no ending called ${t}`), r[t];
}
function Mo(e2, t) {
  return ar(e2).objectives[t];
}
function Fo() {
  return de().dialogPanel.width ?? Rh;
}
const Pt = bt("quests", {
  state: () => ({
    quests: {}
  }),
  actions: {
    getQuest(e2) {
      const t = this.quests[e2];
      if (t)
        return t;
      {
        const n = `Quest ${e2} doesn't exist!`;
        throw ue(n), new Error(n);
      }
    },
    getObjective(e2, t) {
      const n = this.getQuest(e2);
      if (!n) {
        const s = `Quest ${e2} doesn't exist!`;
        throw ue(s), new Error(s);
      }
      const r = n.objectives[t];
      if (r)
        return r;
      const i = `Objective ${t} doesn't exist in quest ${e2}!`;
      throw ue(i), new Error(i);
    },
    updateConfig(e2) {
      const t = e2.quests;
      for (const n of Object.keys(t)) {
        const r = t[n];
        this.quests[n] || (this.quests[n] = {
          id: n,
          state: "hidden",
          objectives: {},
          extraData: {}
        });
        for (const i of Object.keys(r.objectives)) {
          const s = r.objectives[i];
          this.quests[n].objectives[i] || (this.quests[n].objectives[i] = {
            extraData: {},
            id: i,
            state: s.hidden ? "hidden" : "unlocked"
          });
        }
      }
    },
    reset(e2) {
      this.$reset(), this.updateConfig(e2);
    },
    startQuest(e2) {
      const t = this.getQuest(e2);
      t ? (t.state = "unlocked", qt().addNotification(
        `Started quest: ${ar(e2).title}`
      )) : ue(`Quest ${e2} doesn't exist!`);
    },
    startObjective(e2, t) {
      const n = this.getObjective(e2, t);
      n ? (n.state = "unlocked", qt().addNotification(
        `New quest objective: ${Mo(e2, t).description}`
      )) : ue(`Objective ${t} doesn't exist in quest ${e2}!`);
    },
    completeObjective(e2, t) {
      const n = this.getObjective(e2, t);
      n ? (n.state = "completed", qt().addNotification(
        `Completed quest objective: ${Mo(e2, t).description}`
      )) : ue(`Objective ${t} doesn't exist in quest ${e2}!`);
    },
    completeQuest(e2, t) {
      const n = this.getQuest(e2);
      if (n) {
        if (n.state = "completed", typeof t == "string") {
          n.ending = t;
          const r = Op(e2, t);
          n.succeeded = r.success;
        } else
          typeof t == "boolean" ? n.succeeded = t : n.succeeded = true;
        qt().addNotification(
          `Completed quest: ${ar(e2).title}`
        );
      } else
        ue(`Quest ${e2} doesn't exist!`);
    },
    isQuestCompleted(e2) {
      const t = this.getQuest(e2);
      return t ? t.state === "completed" : false;
    },
    isQuestSucceeded(e2) {
      const t = this.getQuest(e2);
      return t ? t.state === "completed" && t.succeeded : false;
    },
    isQuestFailed(e2) {
      const t = this.getQuest(e2);
      return t ? t.state === "completed" && !t.succeeded : false;
    },
    getQuestEnding(e2) {
      const t = this.getQuest(e2);
      return t ? t.ending : false;
    },
    questHasEnding(e2, t) {
      return this.getQuestEnding(e2) === t;
    },
    isObjectiveCompleted(e2, t) {
      const n = this.getObjective(e2, t);
      return n ? n.state === "completed" : false;
    },
    isQuestStarted(e2) {
      const t = this.getQuest(e2);
      return t && t.state === "unlocked";
    },
    isObjectiveStarted(e2, t) {
      return this.getObjective(e2, t).state === "unlocked";
    },
    removeQuest(e2) {
      delete this.quests[e2];
    },
    generateSaveData() {
      return {
        quests: ze(this.quests)
      };
    },
    loadSaveData(e2) {
      this.quests = e2.quests;
    }
  }
});
function yl(e2, t, n, r = "$") {
  if (!n.startsWith(r))
    return isNaN(Number(n)) ? [null, n] : [null, Number(n)];
  n = n.substring(r.length);
  const i = /\[/, s = /\]/;
  let o = n.search(i);
  n.search(s);
  let l = n, u = t, c = 0;
  for (; c < n.length; ) {
    if (o > c || o === -1) {
      const m = o > c ? o : n.length;
      let a = n.substring(
        c,
        m
      );
      isNaN(Number(a)) || (a = Number(a)), c > 0 && (u = u[l]), [u, l] = k$(u, a);
    }
    if (o !== -1) {
      c = o;
      const m = n.substring(o + 1), a = C$(m) + o, d = n.substring(o + 1, a), [p, h] = yl(
        e2,
        e2,
        d
      );
      let v = h;
      p && (v = p[h]), typeof v == "number" || !isNaN(Number(v)) ? v = Number(v) : typeof v != "string" && console.error(
        `invalid array index (${v}) key type when compiling: ${n}`
      ), u = u[l], l = v, c = a + 1;
      const T = n.substring(c);
      o = T.search(i), o !== -1 && (o += c), T.search(s);
    } else
      c = n.length;
  }
  return [u, l];
}
function C$(e2) {
  let t = false, n = 0, r, i = 1;
  for (; !t; ) {
    r = e2.substring(n);
    const s = r.search(/\[/), o = r.search(/\]/);
    s !== -1 && s < o ? (n += s + 1, i++) : (n += o + 1, i--), i === 0 && (t = true), s === -1 && o === -1 && !t && ue(`Could not find closing bracket in ${e2}`);
  }
  return n;
}
function k$(e2, t) {
  if (typeof t == "number")
    return [e2, t];
  t.startsWith(".") && (t = t.substring(1));
  const n = t.split(".");
  let r = e2;
  const i = n.length - 1;
  let s = n[0], o = 0;
  for (o = 0; o < i; o++)
    s = n[o], typeof r[s] > "u" && (r[s] = {}), r = r[s];
  return s = n[o], [r, s];
}
function os(e2, t, n = "$") {
  return yl(e2, e2, t);
}
function O$(e2, t) {
  return os(e2, t);
}
function Ap(e2, t, n) {
  const [r, i] = os(e2, t);
  r[i] = n;
}
function Ep(e2, t, n) {
  const [r, i] = os(e2, t), s = r[i] || 0;
  r[i] = n + s;
}
function ai() {
  const e2 = Ie(), t = vt(), n = pn(), r = Dt(), i = Ie().scope, s = {
    data: e2.data,
    global: e2.globalData,
    skills: t.skills,
    skillChecks: t.skillChecks,
    buttons: n.buttons,
    items: r.items,
    quests: Pt().quests,
    stats: Xt().hudStats,
    scope: i,
    config: de(),
    gameOptions: ke().options,
    baseSettings: En().baseSettings,
    customSettings: En().customSettings
  };
  return new Proxy(s, {
    get: (l, u, c) => {
      const m = Ie().scope, a = Ie().data;
      return typeof m[u] < "u" ? m[u] : typeof a[u] < "u" ? a[u] : Reflect.get(l, u, c);
    },
    set: (l, u, c, m) => {
      const a = Ie().scope, d = Ie().data;
      if (typeof a[u] < "u")
        a[u] = c;
      else {
        if (typeof l[u] < "u")
          return Reflect.set(l, u, c, m);
        typeof c == "object" ? d[u] = {} : d[u] = c;
      }
      return true;
    }
  });
}
function ze(e2) {
  if (e2 === null)
    return null;
  if (typeof e2 == "object")
    if (Array.isArray(e2)) {
      const t = [];
      for (const n in e2)
        t[n] = ze(e2[n]);
      return t;
    } else {
      const t = {};
      for (const n in e2)
        t[n] = ze(e2[n]);
      return t;
    }
  else
    return e2;
}
function Gs(e2, t) {
  if (e2 === null)
    return null;
  if (typeof e2 == "object") {
    const n = t(e2);
    if (t(e2))
      return n;
    if (Array.isArray(e2)) {
      const r = [];
      for (const i in e2)
        r[i] = Gs(e2[i], t);
      return r;
    } else {
      const r = {};
      for (const i in e2)
        r[i] = Gs(e2[i], t);
      return r;
    }
  } else
    return t(e2);
}
const vt = bt("skills", {
  state: () => ({
    skillChecks: {},
    skills: {}
  }),
  actions: {
    setupSkillCheck(e2, t) {
      this.skillChecks[t] = e2;
    },
    passSkillCheck(e2, t) {
      this.skillChecks[e2].happened = true, this.skillChecks[e2].succeeded = true, t && (this.skillChecks[e2].hidden = true);
    },
    failSkillCheck(e2, t) {
      this.skillChecks[e2].happened = true, this.skillChecks[e2].succeeded = false, t && (this.skillChecks[e2].hidden = true);
    },
    resetSkillCheck(e2) {
      this.skillChecks[e2].happened = false, this.skillChecks[e2].succeeded = false, this.skillChecks[e2].hidden = false;
    },
    generateSaveData() {
      return {
        skillChecks: ze(this.skillChecks),
        skills: ze(this.skills)
      };
    },
    getSkillCheck(e2) {
      return this.skillChecks[e2] || this.setupSkillCheck(this.createSkillCheckState(), e2), this.skillChecks[e2];
    },
    createSkillCheckState() {
      return {
        happened: false,
        succeeded: false,
        hidden: false
      };
    },
    loadSaveData(e2) {
      this.skillChecks = Ir(this.skillChecks, e2.skillChecks), this.skills = Ir(this.skills, e2.skills);
    },
    updateConfig(e2) {
      const t = e2.skills;
      for (const n in t)
        this.skills[n] || (this.skills[n] = {
          id: n,
          level: t[n].startingLevel || 0,
          xp: 0
        });
    },
    reset(e2) {
      this.$reset(), this.updateConfig(e2);
    },
    getSkill(e2) {
      return this.skills[e2];
    },
    getSkillLevel(e2) {
      return this.getSkill(e2).level;
    },
    getSkillXp(e2) {
      return this.getSkill(e2).xp;
    },
    addXp(e2, t) {
      const n = this.getSkill(e2);
      n || ue(`Skill ${e2} doesn't exist`), n.xp += t, n.xp >= Bn().skillOptions.xpPerLevel && (n.xp = 0, n.level++, this.levelledUp(e2));
    },
    setSkillLevel(e2, t) {
      const n = this.getSkill(e2);
      n || ue(`Skill ${e2} doesn't exist`), n.level = t, this.levelledUp(e2);
    },
    incrementSkill(e2, t) {
      this.getSkill(e2).level += t, this.levelledUp(e2);
    },
    levelledUp(e2) {
      const t = Bn().skills[e2].name, n = this.skills[e2].level;
      Bn().skillOptions.notifyLevelUp && qt().addNotification(
        `Your skill in ${t} is now level ${n}`
      );
    }
  }
});
function Kn(e2) {
  return Array.isArray ? Array.isArray(e2) : Np(e2) === "[object Array]";
}
const A$ = 1 / 0;
function E$(e2) {
  if (typeof e2 == "string")
    return e2;
  let t = e2 + "";
  return t == "0" && 1 / e2 == -A$ ? "-0" : t;
}
function I$(e2) {
  return e2 == null ? "" : E$(e2);
}
function $n(e2) {
  return typeof e2 == "string";
}
function Ip(e2) {
  return typeof e2 == "number";
}
function P$(e2) {
  return e2 === true || e2 === false || N$(e2) && Np(e2) == "[object Boolean]";
}
function Pp(e2) {
  return typeof e2 == "object";
}
function N$(e2) {
  return Pp(e2) && e2 !== null;
}
function Yt(e2) {
  return e2 != null;
}
function ws(e2) {
  return !e2.trim().length;
}
function Np(e2) {
  return e2 == null ? e2 === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(e2);
}
const x$ = "Incorrect 'index' type", j$ = (e2) => `Invalid value for key ${e2}`, L$ = (e2) => `Pattern length exceeds max of ${e2}.`, D$ = (e2) => `Missing ${e2} property in key`, R$ = (e2) => `Property 'weight' in key '${e2}' must be a positive integer`, Ec = Object.prototype.hasOwnProperty;
class M$ {
  constructor(t) {
    this._keys = [], this._keyMap = {};
    let n = 0;
    t.forEach((r) => {
      let i = xp(r);
      n += i.weight, this._keys.push(i), this._keyMap[i.id] = i, n += i.weight;
    }), this._keys.forEach((r) => {
      r.weight /= n;
    });
  }
  get(t) {
    return this._keyMap[t];
  }
  keys() {
    return this._keys;
  }
  toJSON() {
    return JSON.stringify(this._keys);
  }
}
function xp(e2) {
  let t = null, n = null, r = null, i = 1, s = null;
  if ($n(e2) || Kn(e2))
    r = e2, t = Ic(e2), n = Ws(e2);
  else {
    if (!Ec.call(e2, "name"))
      throw new Error(D$("name"));
    const o = e2.name;
    if (r = o, Ec.call(e2, "weight") && (i = e2.weight, i <= 0))
      throw new Error(R$(o));
    t = Ic(o), n = Ws(o), s = e2.getFn;
  }
  return { path: t, id: n, weight: i, src: r, getFn: s };
}
function Ic(e2) {
  return Kn(e2) ? e2 : e2.split(".");
}
function Ws(e2) {
  return Kn(e2) ? e2.join(".") : e2;
}
function F$(e2, t) {
  let n = [], r = false;
  const i = (s, o, l) => {
    if (Yt(s))
      if (!o[l])
        n.push(s);
      else {
        let u = o[l];
        const c = s[u];
        if (!Yt(c))
          return;
        if (l === o.length - 1 && ($n(c) || Ip(c) || P$(c)))
          n.push(I$(c));
        else if (Kn(c)) {
          r = true;
          for (let m = 0, a = c.length; m < a; m += 1)
            i(c[m], o, l + 1);
        } else
          o.length && i(c, o, l + 1);
      }
  };
  return i(e2, $n(t) ? t.split(".") : t, 0), r ? n : n[0];
}
const U$ = {
  // Whether the matches should be included in the result set. When `true`, each record in the result
  // set will include the indices of the matched characters.
  // These can consequently be used for highlighting purposes.
  includeMatches: false,
  // When `true`, the matching function will continue to the end of a search pattern even if
  // a perfect match has already been located in the string.
  findAllMatches: false,
  // Minimum number of characters that must be matched before a result is considered a match
  minMatchCharLength: 1
}, B$ = {
  // When `true`, the algorithm continues searching to the end of the input even if a perfect
  // match is found before the end of the same input.
  isCaseSensitive: false,
  // When true, the matching function will continue to the end of a search pattern even if
  includeScore: false,
  // List of properties that will be searched. This also supports nested properties.
  keys: [],
  // Whether to sort the result list, by score
  shouldSort: true,
  // Default sort function: sort by ascending score, ascending index
  sortFn: (e2, t) => e2.score === t.score ? e2.idx < t.idx ? -1 : 1 : e2.score < t.score ? -1 : 1
}, q$ = {
  // Approximately where in the text is the pattern expected to be found?
  location: 0,
  // At what point does the match algorithm give up. A threshold of '0.0' requires a perfect match
  // (of both letters and location), a threshold of '1.0' would match anything.
  threshold: 0.6,
  // Determines how close the match must be to the fuzzy location (specified above).
  // An exact letter match which is 'distance' characters away from the fuzzy location
  // would score as a complete mismatch. A distance of '0' requires the match be at
  // the exact location specified, a threshold of '1000' would require a perfect match
  // to be within 800 characters of the fuzzy location to be found using a 0.8 threshold.
  distance: 100
}, V$ = {
  // When `true`, it enables the use of unix-like search commands
  useExtendedSearch: false,
  // The get function to use when fetching an object's properties.
  // The default will search nested paths *ie foo.bar.baz*
  getFn: F$,
  // When `true`, search will ignore `location` and `distance`, so it won't matter
  // where in the string the pattern appears.
  // More info: https://fusejs.io/concepts/scoring-theory.html#fuzziness-score
  ignoreLocation: false,
  // When `true`, the calculation for the relevance score (used for sorting) will
  // ignore the field-length norm.
  // More info: https://fusejs.io/concepts/scoring-theory.html#field-length-norm
  ignoreFieldNorm: false,
  // The weight to determine how much field length norm effects scoring.
  fieldNormWeight: 1
};
var De = {
  ...B$,
  ...U$,
  ...q$,
  ...V$
};
const H$ = /[^ ]+/g;
function K$(e2 = 1, t = 3) {
  const n = /* @__PURE__ */ new Map(), r = Math.pow(10, t);
  return {
    get(i) {
      const s = i.match(H$).length;
      if (n.has(s))
        return n.get(s);
      const o = 1 / Math.pow(s, 0.5 * e2), l = parseFloat(Math.round(o * r) / r);
      return n.set(s, l), l;
    },
    clear() {
      n.clear();
    }
  };
}
class gl {
  constructor({
    getFn: t = De.getFn,
    fieldNormWeight: n = De.fieldNormWeight
  } = {}) {
    this.norm = K$(n, 3), this.getFn = t, this.isCreated = false, this.setIndexRecords();
  }
  setSources(t = []) {
    this.docs = t;
  }
  setIndexRecords(t = []) {
    this.records = t;
  }
  setKeys(t = []) {
    this.keys = t, this._keysMap = {}, t.forEach((n, r) => {
      this._keysMap[n.id] = r;
    });
  }
  create() {
    this.isCreated || !this.docs.length || (this.isCreated = true, $n(this.docs[0]) ? this.docs.forEach((t, n) => {
      this._addString(t, n);
    }) : this.docs.forEach((t, n) => {
      this._addObject(t, n);
    }), this.norm.clear());
  }
  // Adds a doc to the end of the index
  add(t) {
    const n = this.size();
    $n(t) ? this._addString(t, n) : this._addObject(t, n);
  }
  // Removes the doc at the specified index of the index
  removeAt(t) {
    this.records.splice(t, 1);
    for (let n = t, r = this.size(); n < r; n += 1)
      this.records[n].i -= 1;
  }
  getValueForItemAtKeyId(t, n) {
    return t[this._keysMap[n]];
  }
  size() {
    return this.records.length;
  }
  _addString(t, n) {
    if (!Yt(t) || ws(t))
      return;
    let r = {
      v: t,
      i: n,
      n: this.norm.get(t)
    };
    this.records.push(r);
  }
  _addObject(t, n) {
    let r = { i: n, $: {} };
    this.keys.forEach((i, s) => {
      let o = i.getFn ? i.getFn(t) : this.getFn(t, i.path);
      if (Yt(o)) {
        if (Kn(o)) {
          let l = [];
          const u = [{ nestedArrIndex: -1, value: o }];
          for (; u.length; ) {
            const { nestedArrIndex: c, value: m } = u.pop();
            if (Yt(m))
              if ($n(m) && !ws(m)) {
                let a = {
                  v: m,
                  i: c,
                  n: this.norm.get(m)
                };
                l.push(a);
              } else
                Kn(m) && m.forEach((a, d) => {
                  u.push({
                    nestedArrIndex: d,
                    value: a
                  });
                });
          }
          r.$[s] = l;
        } else if ($n(o) && !ws(o)) {
          let l = {
            v: o,
            n: this.norm.get(o)
          };
          r.$[s] = l;
        }
      }
    }), this.records.push(r);
  }
  toJSON() {
    return {
      keys: this.keys,
      records: this.records
    };
  }
}
function jp(e2, t, { getFn: n = De.getFn, fieldNormWeight: r = De.fieldNormWeight } = {}) {
  const i = new gl({ getFn: n, fieldNormWeight: r });
  return i.setKeys(e2.map(xp)), i.setSources(t), i.create(), i;
}
function G$(e2, { getFn: t = De.getFn, fieldNormWeight: n = De.fieldNormWeight } = {}) {
  const { keys: r, records: i } = e2, s = new gl({ getFn: t, fieldNormWeight: n });
  return s.setKeys(r), s.setIndexRecords(i), s;
}
function uo(e2, {
  errors: t = 0,
  currentLocation: n = 0,
  expectedLocation: r = 0,
  distance: i = De.distance,
  ignoreLocation: s = De.ignoreLocation
} = {}) {
  const o = t / e2.length;
  if (s)
    return o;
  const l = Math.abs(r - n);
  return i ? o + l / i : l ? 1 : o;
}
function W$(e2 = [], t = De.minMatchCharLength) {
  let n = [], r = -1, i = -1, s = 0;
  for (let o = e2.length; s < o; s += 1) {
    let l = e2[s];
    l && r === -1 ? r = s : !l && r !== -1 && (i = s - 1, i - r + 1 >= t && n.push([r, i]), r = -1);
  }
  return e2[s - 1] && s - r >= t && n.push([r, s - 1]), n;
}
const Tr = 32;
function z$(e2, t, n, {
  location: r = De.location,
  distance: i = De.distance,
  threshold: s = De.threshold,
  findAllMatches: o = De.findAllMatches,
  minMatchCharLength: l = De.minMatchCharLength,
  includeMatches: u = De.includeMatches,
  ignoreLocation: c = De.ignoreLocation
} = {}) {
  if (t.length > Tr)
    throw new Error(L$(Tr));
  const m = t.length, a = e2.length, d = Math.max(0, Math.min(r, a));
  let p = s, h = d;
  const v = l > 1 || u, T = v ? Array(a) : [];
  let _;
  for (; (_ = e2.indexOf(t, h)) > -1; ) {
    let P = uo(t, {
      currentLocation: _,
      expectedLocation: d,
      distance: i,
      ignoreLocation: c
    });
    if (p = Math.min(P, p), h = _ + m, v) {
      let Z = 0;
      for (; Z < m; )
        T[_ + Z] = 1, Z += 1;
    }
  }
  h = -1;
  let E = [], j = 1, F = m + a;
  const B = 1 << m - 1;
  for (let P = 0; P < m; P += 1) {
    let Z = 0, Y = F;
    for (; Z < Y; )
      uo(t, {
        errors: P,
        currentLocation: d + Y,
        expectedLocation: d,
        distance: i,
        ignoreLocation: c
      }) <= p ? Z = Y : F = Y, Y = Math.floor((F - Z) / 2 + Z);
    F = Y;
    let te = Math.max(1, d - Y + 1), z = o ? a : Math.min(d + Y, a) + m, Q = Array(z + 2);
    Q[z + 1] = (1 << P) - 1;
    for (let re = z; re >= te; re -= 1) {
      let Pe = re - 1, Me = n[e2.charAt(Pe)];
      if (v && (T[Pe] = +!!Me), Q[re] = (Q[re + 1] << 1 | 1) & Me, P && (Q[re] |= (E[re + 1] | E[re]) << 1 | 1 | E[re + 1]), Q[re] & B && (j = uo(t, {
        errors: P,
        currentLocation: Pe,
        expectedLocation: d,
        distance: i,
        ignoreLocation: c
      }), j <= p)) {
        if (p = j, h = Pe, h <= d)
          break;
        te = Math.max(1, 2 * d - h);
      }
    }
    if (uo(t, {
      errors: P + 1,
      currentLocation: d,
      expectedLocation: d,
      distance: i,
      ignoreLocation: c
    }) > p)
      break;
    E = Q;
  }
  const L = {
    isMatch: h >= 0,
    // Count exact matches (those with a score of 0) to be "almost" exact
    score: Math.max(1e-3, j)
  };
  if (v) {
    const P = W$(T, l);
    P.length ? u && (L.indices = P) : L.isMatch = false;
  }
  return L;
}
function Q$(e2) {
  let t = {};
  for (let n = 0, r = e2.length; n < r; n += 1) {
    const i = e2.charAt(n);
    t[i] = (t[i] || 0) | 1 << r - n - 1;
  }
  return t;
}
class Lp {
  constructor(t, {
    location: n = De.location,
    threshold: r = De.threshold,
    distance: i = De.distance,
    includeMatches: s = De.includeMatches,
    findAllMatches: o = De.findAllMatches,
    minMatchCharLength: l = De.minMatchCharLength,
    isCaseSensitive: u = De.isCaseSensitive,
    ignoreLocation: c = De.ignoreLocation
  } = {}) {
    if (this.options = {
      location: n,
      threshold: r,
      distance: i,
      includeMatches: s,
      findAllMatches: o,
      minMatchCharLength: l,
      isCaseSensitive: u,
      ignoreLocation: c
    }, this.pattern = u ? t : t.toLowerCase(), this.chunks = [], !this.pattern.length)
      return;
    const m = (d, p) => {
      this.chunks.push({
        pattern: d,
        alphabet: Q$(d),
        startIndex: p
      });
    }, a = this.pattern.length;
    if (a > Tr) {
      let d = 0;
      const p = a % Tr, h = a - p;
      for (; d < h; )
        m(this.pattern.substr(d, Tr), d), d += Tr;
      if (p) {
        const v = a - Tr;
        m(this.pattern.substr(v), v);
      }
    } else
      m(this.pattern, 0);
  }
  searchIn(t) {
    const { isCaseSensitive: n, includeMatches: r } = this.options;
    if (n || (t = t.toLowerCase()), this.pattern === t) {
      let h = {
        isMatch: true,
        score: 0
      };
      return r && (h.indices = [[0, t.length - 1]]), h;
    }
    const {
      location: i,
      distance: s,
      threshold: o,
      findAllMatches: l,
      minMatchCharLength: u,
      ignoreLocation: c
    } = this.options;
    let m = [], a = 0, d = false;
    this.chunks.forEach(({ pattern: h, alphabet: v, startIndex: T }) => {
      const { isMatch: _, score: E, indices: j } = z$(t, h, v, {
        location: i + T,
        distance: s,
        threshold: o,
        findAllMatches: l,
        minMatchCharLength: u,
        includeMatches: r,
        ignoreLocation: c
      });
      _ && (d = true), a += E, _ && j && (m = [...m, ...j]);
    });
    let p = {
      isMatch: d,
      score: d ? a / this.chunks.length : 1
    };
    return d && r && (p.indices = m), p;
  }
}
class cr {
  constructor(t) {
    this.pattern = t;
  }
  static isMultiMatch(t) {
    return Pc(t, this.multiRegex);
  }
  static isSingleMatch(t) {
    return Pc(t, this.singleRegex);
  }
  search() {
  }
}
function Pc(e2, t) {
  const n = e2.match(t);
  return n ? n[1] : null;
}
class Y$ extends cr {
  constructor(t) {
    super(t);
  }
  static get type() {
    return "exact";
  }
  static get multiRegex() {
    return /^="(.*)"$/;
  }
  static get singleRegex() {
    return /^=(.*)$/;
  }
  search(t) {
    const n = t === this.pattern;
    return {
      isMatch: n,
      score: n ? 0 : 1,
      indices: [0, this.pattern.length - 1]
    };
  }
}
class J$ extends cr {
  constructor(t) {
    super(t);
  }
  static get type() {
    return "inverse-exact";
  }
  static get multiRegex() {
    return /^!"(.*)"$/;
  }
  static get singleRegex() {
    return /^!(.*)$/;
  }
  search(t) {
    const r = t.indexOf(this.pattern) === -1;
    return {
      isMatch: r,
      score: r ? 0 : 1,
      indices: [0, t.length - 1]
    };
  }
}
class X$ extends cr {
  constructor(t) {
    super(t);
  }
  static get type() {
    return "prefix-exact";
  }
  static get multiRegex() {
    return /^\^"(.*)"$/;
  }
  static get singleRegex() {
    return /^\^(.*)$/;
  }
  search(t) {
    const n = t.startsWith(this.pattern);
    return {
      isMatch: n,
      score: n ? 0 : 1,
      indices: [0, this.pattern.length - 1]
    };
  }
}
class Z$ extends cr {
  constructor(t) {
    super(t);
  }
  static get type() {
    return "inverse-prefix-exact";
  }
  static get multiRegex() {
    return /^!\^"(.*)"$/;
  }
  static get singleRegex() {
    return /^!\^(.*)$/;
  }
  search(t) {
    const n = !t.startsWith(this.pattern);
    return {
      isMatch: n,
      score: n ? 0 : 1,
      indices: [0, t.length - 1]
    };
  }
}
class eC extends cr {
  constructor(t) {
    super(t);
  }
  static get type() {
    return "suffix-exact";
  }
  static get multiRegex() {
    return /^"(.*)"\$$/;
  }
  static get singleRegex() {
    return /^(.*)\$$/;
  }
  search(t) {
    const n = t.endsWith(this.pattern);
    return {
      isMatch: n,
      score: n ? 0 : 1,
      indices: [t.length - this.pattern.length, t.length - 1]
    };
  }
}
class tC extends cr {
  constructor(t) {
    super(t);
  }
  static get type() {
    return "inverse-suffix-exact";
  }
  static get multiRegex() {
    return /^!"(.*)"\$$/;
  }
  static get singleRegex() {
    return /^!(.*)\$$/;
  }
  search(t) {
    const n = !t.endsWith(this.pattern);
    return {
      isMatch: n,
      score: n ? 0 : 1,
      indices: [0, t.length - 1]
    };
  }
}
class Dp extends cr {
  constructor(t, {
    location: n = De.location,
    threshold: r = De.threshold,
    distance: i = De.distance,
    includeMatches: s = De.includeMatches,
    findAllMatches: o = De.findAllMatches,
    minMatchCharLength: l = De.minMatchCharLength,
    isCaseSensitive: u = De.isCaseSensitive,
    ignoreLocation: c = De.ignoreLocation
  } = {}) {
    super(t), this._bitapSearch = new Lp(t, {
      location: n,
      threshold: r,
      distance: i,
      includeMatches: s,
      findAllMatches: o,
      minMatchCharLength: l,
      isCaseSensitive: u,
      ignoreLocation: c
    });
  }
  static get type() {
    return "fuzzy";
  }
  static get multiRegex() {
    return /^"(.*)"$/;
  }
  static get singleRegex() {
    return /^(.*)$/;
  }
  search(t) {
    return this._bitapSearch.searchIn(t);
  }
}
class Rp extends cr {
  constructor(t) {
    super(t);
  }
  static get type() {
    return "include";
  }
  static get multiRegex() {
    return /^'"(.*)"$/;
  }
  static get singleRegex() {
    return /^'(.*)$/;
  }
  search(t) {
    let n = 0, r;
    const i = [], s = this.pattern.length;
    for (; (r = t.indexOf(this.pattern, n)) > -1; )
      n = r + s, i.push([r, n - 1]);
    const o = !!i.length;
    return {
      isMatch: o,
      score: o ? 0 : 1,
      indices: i
    };
  }
}
const zs = [
  Y$,
  Rp,
  X$,
  Z$,
  tC,
  eC,
  J$,
  Dp
], Nc = zs.length, nC = / +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/, rC = "|";
function iC(e2, t = {}) {
  return e2.split(rC).map((n) => {
    let r = n.trim().split(nC).filter((s) => s && !!s.trim()), i = [];
    for (let s = 0, o = r.length; s < o; s += 1) {
      const l = r[s];
      let u = false, c = -1;
      for (; !u && ++c < Nc; ) {
        const m = zs[c];
        let a = m.isMultiMatch(l);
        a && (i.push(new m(a, t)), u = true);
      }
      if (!u)
        for (c = -1; ++c < Nc; ) {
          const m = zs[c];
          let a = m.isSingleMatch(l);
          if (a) {
            i.push(new m(a, t));
            break;
          }
        }
    }
    return i;
  });
}
const oC = /* @__PURE__ */ new Set([Dp.type, Rp.type]);
class sC {
  constructor(t, {
    isCaseSensitive: n = De.isCaseSensitive,
    includeMatches: r = De.includeMatches,
    minMatchCharLength: i = De.minMatchCharLength,
    ignoreLocation: s = De.ignoreLocation,
    findAllMatches: o = De.findAllMatches,
    location: l = De.location,
    threshold: u = De.threshold,
    distance: c = De.distance
  } = {}) {
    this.query = null, this.options = {
      isCaseSensitive: n,
      includeMatches: r,
      minMatchCharLength: i,
      findAllMatches: o,
      ignoreLocation: s,
      location: l,
      threshold: u,
      distance: c
    }, this.pattern = n ? t : t.toLowerCase(), this.query = iC(this.pattern, this.options);
  }
  static condition(t, n) {
    return n.useExtendedSearch;
  }
  searchIn(t) {
    const n = this.query;
    if (!n)
      return {
        isMatch: false,
        score: 1
      };
    const { includeMatches: r, isCaseSensitive: i } = this.options;
    t = i ? t : t.toLowerCase();
    let s = 0, o = [], l = 0;
    for (let u = 0, c = n.length; u < c; u += 1) {
      const m = n[u];
      o.length = 0, s = 0;
      for (let a = 0, d = m.length; a < d; a += 1) {
        const p = m[a], { isMatch: h, indices: v, score: T } = p.search(t);
        if (h) {
          if (s += 1, l += T, r) {
            const _ = p.constructor.type;
            oC.has(_) ? o = [...o, ...v] : o.push(v);
          }
        } else {
          l = 0, s = 0, o.length = 0;
          break;
        }
      }
      if (s) {
        let a = {
          isMatch: true,
          score: l / s
        };
        return r && (a.indices = o), a;
      }
    }
    return {
      isMatch: false,
      score: 1
    };
  }
}
const Qs = [];
function aC(...e2) {
  Qs.push(...e2);
}
function Ys(e2, t) {
  for (let n = 0, r = Qs.length; n < r; n += 1) {
    let i = Qs[n];
    if (i.condition(e2, t))
      return new i(e2, t);
  }
  return new Lp(e2, t);
}
const Uo = {
  AND: "$and",
  OR: "$or"
}, Js = {
  PATH: "$path",
  PATTERN: "$val"
}, Xs = (e2) => !!(e2[Uo.AND] || e2[Uo.OR]), lC = (e2) => !!e2[Js.PATH], cC = (e2) => !Kn(e2) && Pp(e2) && !Xs(e2), xc = (e2) => ({
  [Uo.AND]: Object.keys(e2).map((t) => ({
    [t]: e2[t]
  }))
});
function Mp(e2, t, { auto: n = true } = {}) {
  const r = (i) => {
    let s = Object.keys(i);
    const o = lC(i);
    if (!o && s.length > 1 && !Xs(i))
      return r(xc(i));
    if (cC(i)) {
      const u = o ? i[Js.PATH] : s[0], c = o ? i[Js.PATTERN] : i[u];
      if (!$n(c))
        throw new Error(j$(u));
      const m = {
        keyId: Ws(u),
        pattern: c
      };
      return n && (m.searcher = Ys(c, t)), m;
    }
    let l = {
      children: [],
      operator: s[0]
    };
    return s.forEach((u) => {
      const c = i[u];
      Kn(c) && c.forEach((m) => {
        l.children.push(r(m));
      });
    }), l;
  };
  return Xs(e2) || (e2 = xc(e2)), r(e2);
}
function uC(e2, { ignoreFieldNorm: t = De.ignoreFieldNorm }) {
  e2.forEach((n) => {
    let r = 1;
    n.matches.forEach(({ key: i, norm: s, score: o }) => {
      const l = i ? i.weight : null;
      r *= Math.pow(
        o === 0 && l ? Number.EPSILON : o,
        (l || 1) * (t ? 1 : s)
      );
    }), n.score = r;
  });
}
function dC(e2, t) {
  const n = e2.matches;
  t.matches = [], Yt(n) && n.forEach((r) => {
    if (!Yt(r.indices) || !r.indices.length)
      return;
    const { indices: i, value: s } = r;
    let o = {
      indices: i,
      value: s
    };
    r.key && (o.key = r.key.src), r.idx > -1 && (o.refIndex = r.idx), t.matches.push(o);
  });
}
function fC(e2, t) {
  t.score = e2.score;
}
function pC(e2, t, {
  includeMatches: n = De.includeMatches,
  includeScore: r = De.includeScore
} = {}) {
  const i = [];
  return n && i.push(dC), r && i.push(fC), e2.map((s) => {
    const { idx: o } = s, l = {
      item: t[o],
      refIndex: o
    };
    return i.length && i.forEach((u) => {
      u(s, l);
    }), l;
  });
}
class di {
  constructor(t, n = {}, r) {
    this.options = { ...De, ...n }, this.options.useExtendedSearch, this._keyStore = new M$(this.options.keys), this.setCollection(t, r);
  }
  setCollection(t, n) {
    if (this._docs = t, n && !(n instanceof gl))
      throw new Error(x$);
    this._myIndex = n || jp(this.options.keys, this._docs, {
      getFn: this.options.getFn,
      fieldNormWeight: this.options.fieldNormWeight
    });
  }
  add(t) {
    Yt(t) && (this._docs.push(t), this._myIndex.add(t));
  }
  remove(t = () => false) {
    const n = [];
    for (let r = 0, i = this._docs.length; r < i; r += 1) {
      const s = this._docs[r];
      t(s, r) && (this.removeAt(r), r -= 1, i -= 1, n.push(s));
    }
    return n;
  }
  removeAt(t) {
    this._docs.splice(t, 1), this._myIndex.removeAt(t);
  }
  getIndex() {
    return this._myIndex;
  }
  search(t, { limit: n = -1 } = {}) {
    const {
      includeMatches: r,
      includeScore: i,
      shouldSort: s,
      sortFn: o,
      ignoreFieldNorm: l
    } = this.options;
    let u = $n(t) ? $n(this._docs[0]) ? this._searchStringList(t) : this._searchObjectList(t) : this._searchLogical(t);
    return uC(u, { ignoreFieldNorm: l }), s && u.sort(o), Ip(n) && n > -1 && (u = u.slice(0, n)), pC(u, this._docs, {
      includeMatches: r,
      includeScore: i
    });
  }
  _searchStringList(t) {
    const n = Ys(t, this.options), { records: r } = this._myIndex, i = [];
    return r.forEach(({ v: s, i: o, n: l }) => {
      if (!Yt(s))
        return;
      const { isMatch: u, score: c, indices: m } = n.searchIn(s);
      u && i.push({
        item: s,
        idx: o,
        matches: [{ score: c, value: s, norm: l, indices: m }]
      });
    }), i;
  }
  _searchLogical(t) {
    const n = Mp(t, this.options), r = (l, u, c) => {
      if (!l.children) {
        const { keyId: a, searcher: d } = l, p = this._findMatches({
          key: this._keyStore.get(a),
          value: this._myIndex.getValueForItemAtKeyId(u, a),
          searcher: d
        });
        return p && p.length ? [
          {
            idx: c,
            item: u,
            matches: p
          }
        ] : [];
      }
      const m = [];
      for (let a = 0, d = l.children.length; a < d; a += 1) {
        const p = l.children[a], h = r(p, u, c);
        if (h.length)
          m.push(...h);
        else if (l.operator === Uo.AND)
          return [];
      }
      return m;
    }, i = this._myIndex.records, s = {}, o = [];
    return i.forEach(({ $: l, i: u }) => {
      if (Yt(l)) {
        let c = r(n, l, u);
        c.length && (s[u] || (s[u] = { idx: u, item: l, matches: [] }, o.push(s[u])), c.forEach(({ matches: m }) => {
          s[u].matches.push(...m);
        }));
      }
    }), o;
  }
  _searchObjectList(t) {
    const n = Ys(t, this.options), { keys: r, records: i } = this._myIndex, s = [];
    return i.forEach(({ $: o, i: l }) => {
      if (!Yt(o))
        return;
      let u = [];
      r.forEach((c, m) => {
        u.push(
          ...this._findMatches({
            key: c,
            value: o[m],
            searcher: n
          })
        );
      }), u.length && s.push({
        idx: l,
        item: o,
        matches: u
      });
    }), s;
  }
  _findMatches({ key: t, value: n, searcher: r }) {
    if (!Yt(n))
      return [];
    let i = [];
    if (Kn(n))
      n.forEach(({ v: s, i: o, n: l }) => {
        if (!Yt(s))
          return;
        const { isMatch: u, score: c, indices: m } = r.searchIn(s);
        u && i.push({
          score: c,
          key: t,
          value: s,
          idx: o,
          norm: l,
          indices: m
        });
      });
    else {
      const { v: s, n: o } = n, { isMatch: l, score: u, indices: c } = r.searchIn(s);
      l && i.push({ score: u, key: t, value: s, norm: o, indices: c });
    }
    return i;
  }
}
di.version = "6.6.2";
di.createIndex = jp;
di.parseIndex = G$;
di.config = De;
di.parseQuery = Mp;
aC(sC);
const mC = /* @__PURE__ */ createElementVNode("h3", { class: "title" }, "Jump to label", -1), hC = {
  key: 0,
  class: "search-results"
}, yC = { key: 1 }, gC = /* @__PURE__ */ createElementVNode("h3", null, "No matches found", -1), vC = [
  gC
], _C = /* @__PURE__ */ defineComponent({
  __name: "debug-jumping",
  emits: ["close", "jump"],
  setup(e2, { emit: t }) {
    const n = t;
    let r;
    const i = ref(null), s = ref(""), o = ref([]), l = ref(0), u = ref(null);
    function c() {
      const d = s.value, p = r.search(d);
      o.value = p.map((h) => h.item), o.value.length > 0 && l.value > o.value.length - 1 && (l.value = o.value.length - 1);
    }
    function m(d) {
      if (d === l.value)
        return {
          background: "var(--light-background)"
        };
    }
    const a = computed(() => Object.keys(Re.script).sort());
    return onMounted(() => {
      ke().debugMode = true, r = new di(a.value, {
        includeScore: true
      }), o.value = a.value, l.value = 0, setTimeout(() => {
        nextTick(() => {
          u.value && u.value.focus();
        });
      }, 10), i.value = at().registerInputListener("debug-jumping", {
        up: {
          press: () => {
            l.value > 0 ? l.value-- : l.value = o.value.length - 1;
          }
        },
        down: {
          press: () => {
            o.value.length > l.value + 1 ? l.value++ : l.value = 0;
          }
        },
        continue: {
          press: () => {
            if (o.value.length > 0 && l.value < o.value.length) {
              const d = o.value[l.value];
              Ie().jumpToLabel(d), n("close");
            }
          }
        },
        escape: {
          press: () => {
            n("close");
          }
        }
      });
    }), onUnmounted(() => {
      i.value && at().unregisterInputListener(i.value), ke().debugMode = false;
    }), (d, p) => (openBlock(), createBlock(lr, {
      onClose: p[1] || (p[1] = (h) => d.$emit("close")),
      containerCssClass: "jump-menu-container"
    }, {
      header: withCtx(() => [
        mC
      ]),
      body: withCtx(() => [
        withDirectives(createElementVNode("input", {
          type: "text",
          class: "label-input nrt-input",
          ref_key: "search",
          ref: u,
          "onUpdate:modelValue": p[0] || (p[0] = (h) => s.value = h),
          onInput: c
        }, null, 544), [
          [vModelText, s.value]
        ]),
        o.value.length > 0 ? (openBlock(), createElementBlock("div", hC, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(o.value, (h, v) => (openBlock(), createElementBlock("div", {
            class: "search-result",
            style: normalizeStyle(m(v)),
            key: v
          }, toDisplayString(h), 5))), 128))
        ])) : (openBlock(), createElementBlock("div", yC, vC))
      ]),
      _: 1
    }));
  }
}), bC = defineComponent({
  components: {
    ModalWindow: lr,
    DebugJumping: _C
  },
  setup() {
    const e2 = vt(), t = computed(() => e2.skills), n = computed(() => e2.skillChecks);
    return { skills: t, skillChecks: n };
  },
  data() {
    return {
      showDebug: false,
      jumping: false,
      inputListener: null
    };
  },
  mounted() {
    const e2 = gt(), t = de().hotkeys.debugMenu ?? "d", n = de().hotkeys.jumpMenu ?? "j";
    e2.inputsContainer.addEventListener("keydown", (r) => {
      this.jumping || (r.key === t && this.toggle(), r.key === n && this.jump());
    });
  },
  methods: {
    closeJumping() {
      this.jumping = false;
    },
    labelSelected(e2) {
      const t = e2.target.value;
      Ie().jumpToLabel(t), this.close();
    },
    close() {
      this.showDebug = false, this.endDebug();
    },
    closeErrors() {
      ke().clearErrors();
    },
    open() {
      this.showDebug = true, this.startDebug(), Ie(), Pt(), Dt(), vt();
    },
    toggle() {
      this.showDebug ? this.close() : this.open();
    },
    startDebug() {
      ke().debugMode = true;
    },
    endDebug() {
      ke().debugMode = false;
    },
    jump() {
      this.jumping = true, this.startDebug();
    },
    save() {
      Ta({});
    },
    resetSave() {
      gm();
    },
    resetGlobalSave() {
      kf();
    },
    wordCount() {
      const t = Object.values(this.script).reduce((n, r) => (fn.log(n), n + this.countWordsInScriptBranch(r.branch)), 0);
      alert(`You have ${t} words`);
    },
    countWordsInScriptLine(e2) {
      if (e2.command.commandType === "talk" && typeof e2.command.args[2] == "string")
        return this.countWordsInString(e2.command.args[2]);
      if (e2.command.commandType === "text")
        return this.countWordsInString(e2.code);
      if (e2.command.commandType === "choice") {
        const t = e2.command.staticOptions;
        let n = this.countWordsInScriptLine(t.prompt);
        return n += t.choices.reduce(
          (i, s) => i + this.countWordsInString(s.prompt.code),
          0
        ), t.choices.reduce((i, s) => s.branch ? i + this.countWordsInScriptBranch(s.branch) : i, n);
      }
      if (e2.command.commandType === "if") {
        const t = e2.command.staticOptions;
        return [t.success, t.failure].reduce((r, i) => i ? r + this.countWordsInScriptBranch(i) : r, 0);
      }
      return 0;
    },
    countWordsInString(e2) {
      return e2.split(" ").length;
    },
    countWordsInScriptBranch(e2) {
      return e2.reduce((t, n) => n ? t + this.countWordsInScriptLine(n) : t, 0);
    },
    getPlayTimeString() {
      const e2 = Qr(
        this.playTime.start,
        this.playTime.previousPlaytime
      );
      return ia(e2 / 1e3);
    }
  },
  computed: {
    ...Oi(Ie, ["data"]),
    ...Oi(ke, ["playTime", "errors", "playing"]),
    ...Oi(Jt, ["activeScene"]),
    labels() {
      const e2 = this.script;
      return Object.keys(e2).sort();
    },
    script() {
      return Re.script;
    },
    variables() {
      return this.data;
    }
  }
}), TC = { class: "debug-menu" }, SC = {
  key: 0,
  class: "debug-info"
}, wC = /* @__PURE__ */ createStaticVNode("<h3>Debug mode is ON</h3><ul><li><b>j</b>: Quick Label Jump</li><li><b>d</b>: Debug Menu</li><li><b>a</b>: Auto Play</li><li><b>s</b>: Skip</li><li><b>Space</b>: New Game</li><li><b>c</b>: Continue</li><li><b>Escape</b>: Toggle Menu</li></ul>", 2), $C = [
  wC
], CC = /* @__PURE__ */ createElementVNode("h3", { class: "title" }, "Error(s)", -1), kC = ["innerHTML"], OC = /* @__PURE__ */ createElementVNode("h3", { class: "title" }, "Debug Menu!", -1), AC = { class: "container" }, EC = /* @__PURE__ */ createElementVNode("option", {
  class: "nrt-option",
  selected: "",
  disabled: ""
}, " Jump to a label ", -1), IC = ["value"], PC = { class: "grid grid-cols-3 gap-4" }, NC = /* @__PURE__ */ createElementVNode("h2", null, "Variables Editor", -1), xC = /* @__PURE__ */ createElementVNode("p", null, [
  /* @__PURE__ */ createTextVNode(" This has been removed. Use the "),
  /* @__PURE__ */ createElementVNode("a", { href: "https://devtools.vuejs.org/" }, "Vue Devtools"),
  /* @__PURE__ */ createTextVNode(" instead and inspect the contents of the pinia store ")
], -1), jC = { ref: "variablesViewer" }, LC = /* @__PURE__ */ createElementVNode("h2", null, "Skill Checks", -1), DC = { class: "table-auto" }, RC = /* @__PURE__ */ createElementVNode("thead", null, [
  /* @__PURE__ */ createElementVNode("tr", null, [
    /* @__PURE__ */ createElementVNode("th", null, "Skill Check"),
    /* @__PURE__ */ createElementVNode("th", null, "Happened"),
    /* @__PURE__ */ createElementVNode("th", null, "Succeeded")
  ])
], -1), MC = /* @__PURE__ */ createElementVNode("h2", null, "App State editor (entire app and engine", -1), FC = /* @__PURE__ */ createElementVNode("h3", { style: { color: "pink" } }, " Use for debugging, editing some of those things can cause issues ", -1), UC = { ref: "stateViewer" };
function BC(e2, t, n, r, i, s) {
  const o = resolveComponent("DebugJumping"), l = resolveComponent("ModalWindow");
  return openBlock(), createElementBlock("div", TC, [
    createElementVNode("button", {
      onClick: t[0] || (t[0] = (...u) => e2.open && e2.open(...u)),
      class: "nrt-button debug-button"
    }, "Debug Menu"),
    !e2.playing && e2.activeScene === "menu" ? (openBlock(), createElementBlock("div", SC, $C)) : createCommentVNode("", true),
    e2.jumping ? (openBlock(), createBlock(o, {
      key: 1,
      onClose: e2.closeJumping
    }, null, 8, ["onClose"])) : createCommentVNode("", true),
    e2.errors.length > 0 ? (openBlock(), createBlock(l, {
      key: 2,
      onClose: e2.closeErrors,
      containerCssClass: "debug-menu-container"
    }, {
      header: withCtx(() => [
        CC
      ]),
      body: withCtx(() => [
        createTextVNode(" There are errors in your dialogue scripts. Open the developer console for more details. "),
        createElementVNode("ul", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(e2.errors, (u, c) => (openBlock(), createElementBlock("li", {
            key: c,
            class: normalizeClass(["error-message list-disc", u.type === "error" ? "error" : "warning"]),
            innerHTML: u.text
          }, null, 10, kC))), 128))
        ])
      ]),
      _: 1
    }, 8, ["onClose"])) : createCommentVNode("", true),
    e2.showDebug ? (openBlock(), createBlock(l, {
      key: 3,
      onClose: e2.close,
      containerCssClass: "debug-menu-container"
    }, {
      header: withCtx(() => [
        OC
      ]),
      body: withCtx(() => [
        createElementVNode("div", AC, [
          createTextVNode(" Hello this is the debug menu. "),
          createElementVNode("select", {
            class: "nrt-select",
            name: "label-selector",
            onChange: t[1] || (t[1] = (u) => e2.labelSelected(u))
          }, [
            EC,
            (openBlock(true), createElementBlock(Fragment, null, renderList(e2.labels, (u) => (openBlock(), createElementBlock("option", {
              class: "nrt-option",
              value: u,
              key: u
            }, toDisplayString(u), 9, IC))), 128))
          ], 32),
          createElementVNode("div", PC, [
            createElementVNode("button", {
              onClick: t[2] || (t[2] = (...u) => e2.wordCount && e2.wordCount(...u)),
              class: "nrt-button"
            }, "Word Count"),
            createElementVNode("button", {
              onClick: t[3] || (t[3] = (...u) => e2.save && e2.save(...u)),
              class: "nrt-button"
            }, "Save Game"),
            createElementVNode("button", {
              onClick: t[4] || (t[4] = (...u) => e2.resetSave && e2.resetSave(...u)),
              class: "nrt-button"
            }, "Reset Save"),
            createElementVNode("button", {
              onClick: t[5] || (t[5] = (...u) => e2.resetGlobalSave && e2.resetGlobalSave(...u)),
              class: "nrt-button"
            }, " Reset GLOBAL Save ")
          ]),
          createElementVNode("h3", null, "Play time: " + toDisplayString(e2.getPlayTimeString()), 1),
          NC,
          xC,
          createElementVNode("div", jC, null, 512),
          LC,
          createElementVNode("table", DC, [
            RC,
            createElementVNode("tbody", null, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(e2.skillChecks, (u, c) => (openBlock(), createElementBlock("tr", { key: c }, [
                createElementVNode("td", null, toDisplayString(c), 1),
                createElementVNode("td", null, toDisplayString(u.happened ? "✅" : "❌"), 1),
                createElementVNode("td", null, toDisplayString(u.happened ? u.succeeded ? "✅" : "❌" : "NA"), 1)
              ]))), 128))
            ])
          ]),
          MC,
          FC,
          createElementVNode("div", UC, null, 512)
        ])
      ]),
      _: 1
    }, 8, ["onClose"])) : createCommentVNode("", true)
  ]);
}
const qC = /* @__PURE__ */ hn(bC, [["render", BC]]), VC = ["src"], HC = ["innerHTML"], KC = ["innerHTML"], GC = /* @__PURE__ */ defineComponent({
  __name: "notification-toast",
  setup(e2) {
    const t = qt(), n = computed(() => t.notifications), r = (i) => {
      if (i.description)
        return {
          marginTop: "10px"
        };
    };
    return (i, s) => (openBlock(), createBlock(TransitionGroup, {
      name: "notification",
      tag: "div",
      class: "notifications-holder"
    }, {
      default: withCtx(() => [
        (openBlock(true), createElementBlock(Fragment, null, renderList(n.value, (o, l) => (openBlock(), createElementBlock("div", {
          class: "notification nrt-tile",
          key: l
        }, [
          o.icon ? (openBlock(), createElementBlock("img", {
            key: 0,
            src: unref(Wt)(o.icon),
            class: "notification-icon",
            style: normalizeStyle(r(o))
          }, null, 12, VC)) : createCommentVNode("", true),
          createElementVNode("span", {
            innerHTML: o.text,
            class: "notification-text"
          }, null, 8, HC),
          o.description ? (openBlock(), createElementBlock("p", {
            key: 1,
            innerHTML: o.description,
            class: "notification-description"
          }, null, 8, KC)) : createCommentVNode("", true)
        ]))), 128))
      ]),
      _: 1
    }));
  }
}), WC = { class: "title" }, zC = /* @__PURE__ */ defineComponent({
  __name: "alert-modal",
  props: {
    title: {
      type: String,
      required: false
    },
    text: {
      type: String,
      required: false
    }
  },
  emits: ["close"],
  setup(e2, { emit: t }) {
    const n = t;
    function r() {
      n("close");
    }
    const i = ref(
      at().registerInputListener("yes-no", {
        cancel: {
          press: () => {
            r();
          }
        },
        continue: {
          press: () => {
            r();
          }
        },
        system: {
          press: () => {
            r();
          }
        }
      })
    );
    return onUnmounted(() => {
      i.value && at().unregisterInputListener(i.value);
    }), (s, o) => (openBlock(), createBlock(lr, {
      onClose: r,
      containerCssClass: "yes-no-modal"
    }, {
      header: withCtx(() => [
        createElementVNode("h3", WC, toDisplayString(e2.title ?? "Alert"), 1)
      ]),
      body: withCtx(() => [
        createElementVNode("h3", null, toDisplayString(e2.text), 1)
      ]),
      _: 1
    }));
  }
}), QC = /* @__PURE__ */ createElementVNode("hr", null, null, -1), YC = /* @__PURE__ */ defineComponent({
  __name: "floating-tooltip",
  props: {
    title: {},
    text: {},
    width: {},
    x: {},
    y: {},
    screenWidth: {},
    screenHeight: {},
    screenMargin: {},
    cssClass: {},
    textCssClass: {},
    titleCssClass: {}
  },
  setup(e2) {
    const t = ref(150), n = ref(null), r = e2, i = computed(() => r.screenWidth ?? window.innerWidth), s = computed(() => r.screenHeight ?? window.innerHeight), o = computed(() => {
      const l = r.screenMargin ?? 5, u = {};
      let c = r.x - r.width / 2;
      c = Math.min(c, i.value - r.width - l), c = Math.max(l, c), u.left = `${c}px`;
      let m = s.value - r.y;
      return m = Math.max(m, l), m = Math.min(m, s.value - t.value - l), u.bottom = `${m}px`, u.width = `${r.width}px`, u;
    });
    return onMounted(() => {
      n.value && (t.value = n.value.clientHeight);
    }), (l, u) => (openBlock(), createBlock(Transition, { name: "fade" }, {
      default: withCtx(() => [
        createElementVNode("div", {
          class: normalizeClass(["floating-tooltip", l.cssClass]),
          style: normalizeStyle(o.value),
          ref_key: "element",
          ref: n
        }, [
          l.title ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["floating-tooltip-title", l.titleCssClass])
          }, [
            createTextVNode(toDisplayString(r.title) + " ", 1),
            QC
          ], 2)) : createCommentVNode("", true),
          createElementVNode("div", {
            class: normalizeClass(["floating-tooltip-text", l.textCssClass])
          }, toDisplayString(r.text), 3)
        ], 6)
      ]),
      _: 1
    }));
  }
}), JC = { class: "tooltips-ui" }, XC = /* @__PURE__ */ defineComponent({
  __name: "tooltips-ui",
  setup(e2) {
    const t = Gi(), n = gt(), r = computed(() => t.tooltip), i = computed(() => n.screenWidth), s = computed(() => n.screenHeight), o = computed(() => {
      if (r.value)
        return {
          ...r.value,
          screenMargin: Cr().options.screenEdgesMinimumMargin ?? 5,
          screenWidth: i.value,
          screenHeight: s.value,
          ...l(r.value)
        };
    });
    function l(u) {
      var m, a;
      let c = {};
      return Cr().options.styling && (c = { ...c, ...Cr().options.styling }), (m = Ro(u.keyword)) != null && m.styling && (c = {
        ...c,
        ...(a = Ro(u.keyword)) == null ? void 0 : a.styling
      }), c;
    }
    return (u, c) => (openBlock(), createElementBlock("div", JC, [
      r.value ? (openBlock(), createBlock(YC, normalizeProps(mergeProps({ key: 0 }, o.value)), null, 16)) : createCommentVNode("", true)
    ]));
  }
}), $s = {};
async function ZC(e2) {
  fn.log("Loading videos");
  const t = [], n = async (i, s) => await ek(i, s), r = (i, s) => {
    t.push(n(i, s));
  };
  if (e2.preload.video)
    for (const i in e2.preload.video.assets) {
      const s = e2.preload.video.assets[i];
      r(i, s);
    }
  return Promise.all(t);
}
async function ek(e2, t) {
  if ($s[e2])
    return $s[e2];
  const n = new Promise((r, i) => {
    const s = document.createElement("video");
    s.onloadeddata = () => {
      r(s);
    }, s.onerror = (o) => {
      ue(`Could not load video ${t}`, o), i(o);
    }, s.src = Wt(t);
  });
  return $s[e2] = n, n;
}
async function tk() {
  const t = et().scripts;
  Lt().setMasterVolume(rn().options.volume ?? 1), await Ie().loadScripts(t), jt().setup();
  for (const [, n] of Re.customStores())
    if (n.setup) {
      const r = n.setup();
      cu(r) && await r;
    }
  Re.addCustomSettings(), $f();
}
async function nk() {
  const e2 = ke(), t = Qv(et()), n = ZC(et()), r = oh(rn());
  if (Re.plugins) {
    const i = [];
    for (const s of Re.plugins)
      s.loadingPromises && i.push(Promise.all(s.loadingPromises));
    i.length > 0 && (e2.setLoadingStep("Plugins", 0), await Promise.all(i));
  }
  e2.setLoadingStep("Assets", 0.3), await Promise.all([t, n, r]), Re.callHook("onAssetsLoaded"), e2.setLoadingStep("Starting", 0.9), await tk(), Re.callHook("onGameSetup"), e2.gameLoaded();
}
const rk = ["id"], ik = /* @__PURE__ */ defineComponent({
  __name: "GameScene",
  props: {
    sceneId: {},
    options: {}
  },
  setup(e2) {
    const t = e2, n = Jt(), r = computed(() => n.getSceneConfig(t.sceneId));
    function i() {
      n.finishedScene(t.sceneId);
    }
    return (s, o) => (openBlock(), createElementBlock("div", {
      class: "game-scene",
      id: `scene-${s.sceneId}`
    }, [
      (openBlock(), createBlock(resolveDynamicComponent(r.value.component), {
        onFinished: i,
        options: s.options
      }, null, 40, ["options"]))
    ], 8, rk));
  }
}), fi = bt("achievements", {
  state: () => ({
    achievements: {}
  }),
  actions: {
    generateGlobalSaveData() {
      return {
        achievements: ze(this.achievements)
      };
    },
    loadGlobalSaveData(e2) {
      this.achievements = {
        ...this.achievements,
        ...ze(e2.achievements)
      };
    },
    updateConfig(e2) {
      Object.keys(e2.achievements).forEach((t) => {
        this.achievements[t] || (this.achievements[t] = {
          id: t,
          unlocked: false
        });
      });
    },
    reset(e2) {
      this.$reset(), this.updateConfig(e2);
    },
    hasAchievement(e2) {
      var t;
      return ((t = this.achievements[e2]) == null ? void 0 : t.unlocked) ?? false;
    },
    getExistingAchievement(e2) {
      return this.achievements[e2];
    },
    unlock(e2) {
      const t = this.getExistingAchievement(e2);
      if (!t) {
        ue(
          `Tried to unlock achievement ${e2} but it doesn't exist`
        );
        return;
      }
      if (!t.unlocked) {
        const n = (/* @__PURE__ */ new Date()).toISOString();
        t.unlocked = true, t.unlockTime = n;
      }
      if (Hi().notifyNewAchievements) {
        const n = hl(e2);
        qt().addNotification(
          `New Achievement: ${n.name}`,
          n.description,
          n.icon
        );
      }
    }
  }
}), vl = bt(
  "choices-tracking-store",
  {
    state: () => ({
      choices: {}
    }),
    getters: {},
    actions: {
      trackChoice(e2, t) {
        this.choices[e2] || (this.choices[e2] = {}), this.choices[e2][t] = true;
      },
      hasSeenChoice(e2, t) {
        var n;
        return ((n = this.choices[e2]) == null ? void 0 : n[t]) ?? false;
      },
      generateSaveData() {
        return {
          choices: ze(this.choices)
        };
      },
      loadSaveData(e2) {
        this.choices = ze(e2.choices);
      },
      reset() {
        this.$reset();
      }
    }
  }
), ok = {
  main: {
    store: ke,
    save: "main"
  },
  achievements: {
    store: fi,
    config: "achievements",
    globalSave: "achievements"
  },
  audio: {
    store: Lt,
    config: "audio",
    save: "audio"
  },
  choicesTracking: {
    store: vl,
    config: "choices",
    save: "choices"
  },
  config: {
    store: Ct,
    save: "config"
  },
  dialog: {
    store: Ye,
    save: "dialog"
  },
  hud: {
    store: Xt,
    config: "common",
    save: "hud"
  },
  inputs: {
    store: at
  },
  inventory: {
    store: Dt,
    config: "items",
    save: "inventory"
  },
  menu: {
    store: jt
  },
  notifications: {
    store: qt,
    config: "common"
  },
  quests: {
    store: Pt,
    config: "quests",
    save: "quests"
  },
  rendering: {
    store: gt,
    save: "rendering"
  },
  screens: {
    store: pn,
    config: "screens",
    save: "screens"
  },
  sprites: {
    store: on,
    save: "screenObjects"
  },
  settings: {
    store: En,
    save: "settings",
    config: "common"
  },
  skills: {
    store: vt,
    config: "skills",
    save: "skills"
  },
  startMenu: {
    store: ba
  },
  tooltips: {
    store: Gi,
    config: "tooltips"
  },
  vm: {
    store: Ie,
    save: "vm",
    globalSave: "data"
  },
  scenes: {
    store: Jt,
    save: "scenes",
    avoidReset: true
  }
};
Jb(ok);
const sk = /* @__PURE__ */ defineComponent({
  __name: "app",
  props: {
    options: {}
  },
  setup(e2) {
    const t = e2, n = ke(), r = Jt(), i = computed(() => r.activeScene), s = computed(() => n.alerts), o = gt(), l = computed(() => ({
      transform: `scale(${o.gameScaleRatio}, ${o.gameScaleRatio})`,
      width: `${o.gameWidth}px`,
      height: `${o.actualGameHeight}px`
    })), u = computed(() => jt().activeMenu ? "app-blurred-by-modal" : {});
    function c(a) {
      ke().closeAlert(a);
    }
    function m() {
      gt().refreshScreenSize();
    }
    return onMounted(async () => {
      Re.callHook("onAppMounted"), await nk(), o.inputsContainer.addEventListener(
        "resize",
        Jo(
          () => {
            m();
          },
          100,
          {
            maxWait: 200
          }
        )
      ), mn.setup(t.options.debug), setTimeout(() => {
        m();
      }, 50);
    }), (a, d) => (openBlock(), createElementBlock(Fragment, null, [
      createElementVNode("div", {
        id: "narrat",
        style: normalizeStyle(l.value)
      }, [
        createElementVNode("div", {
          id: "narrat-app",
          class: normalizeClass(u.value),
          tabindex: "0"
        }, [
          createVNode(Transition, { name: "screens-fade" }, {
            default: withCtx(() => [
              (openBlock(), createBlock(ik, {
                key: i.value,
                sceneId: i.value,
                options: unref(r).currentOptions
              }, null, 8, ["sceneId", "options"]))
            ]),
            _: 1
          }),
          a.options.debug ? (openBlock(), createBlock(qC, { key: 0 })) : createCommentVNode("", true),
          createVNode(GC),
          (openBlock(true), createElementBlock(Fragment, null, renderList(s.value, (p) => (openBlock(), createBlock(zC, {
            key: p.id,
            title: p.title,
            text: p.text,
            onClose: () => c(p.id)
          }, null, 8, ["title", "text", "onClose"]))), 128))
        ], 2)
      ], 4),
      createVNode(XC)
    ], 64));
  }
}), ak = new V(
  "add_level",
  [
    {
      name: "skillKey",
      type: "string"
    },
    {
      name: "amount",
      type: "number"
    }
  ],
  async (e2) => {
    let { skillKey: t, amount: n } = e2.options;
    if ((!t || !n) && ce(
      e2,
      "add_level command needs a skill id and a value as parameters"
    ), !Number.isInteger(n)) {
      const r = n;
      n = Math.round(n), console.warn(
        `add_level expects a level to be an integer. Auto Rounding ${r} to ${n}`
      );
    }
    vt().incrementSkill(t, n);
  }
), lk = V.FromOptions({
  keyword: "set_level",
  argTypes: [
    { name: "skill", type: "string" },
    { name: "level", type: "number" }
  ],
  runner: async (e2) => {
    let { skill: t, level: n } = e2.options;
    if ((!t || !n) && ce(
      e2,
      "set_level command needs a skill id and a value as parameters"
    ), !Number.isInteger(n)) {
      const r = n;
      n = Math.round(n), console.warn(
        `set_level expects a level to be an integer. Auto Rounding ${r} to ${n}`
      );
    }
    vt().setSkillLevel(t, n);
  }
}), ck = new V(
  "add_xp",
  [
    { name: "xpKey", type: "string" },
    { name: "xpToAdd", type: "number" }
  ],
  async (e2) => {
    const { xpKey: t, xpToAdd: n } = e2.options;
    (!t || !n) && ce(
      e2,
      "add_xp command needs a skill id and a value as parameters"
    ), vt().addXp(t, n);
  }
), uk = new V(
  "get_level",
  [
    {
      name: "skillKey",
      type: "string"
    }
  ],
  async (e2) => {
    const { skillKey: t } = e2.options;
    t || ce(
      e2,
      "get_level command needs a skill id as parameter"
    );
    const n = vt().getSkill(t);
    return n || ce(e2, `Skill ${t} not found`), n.level;
  }
), dk = new V(
  "get_xp",
  [
    {
      name: "xpKey",
      type: "string"
    }
  ],
  async (e2) => {
    const { xpKey: t } = e2.options;
    t || ce(e2, "get_xp command needs a skill id as parameter");
    const n = vt().getSkillXp(t);
    return n || ce(e2, `XP ${t} not found`), n;
  }
), fk = new V(
  "roll",
  [
    { name: "id", type: "string" },
    { name: "skill", type: "string", optional: true },
    { name: "difficulty", type: "number", optional: true },
    { name: "mode", type: "string", optional: true }
  ],
  async (e2) => {
    const { id: t } = e2.options;
    let n = {
      id: t
    };
    if (e2.args.length === 1 && Cp(t))
      n = {
        ...$p(t),
        id: t
      };
    else {
      const { skill: i, difficulty: s, mode: o } = e2.options;
      if (!i || !s) {
        ce(
          e2,
          "roll command needs a skill and a difficulty as parameters, or the skill check id to be configured in skillChecks.yaml"
        );
        return;
      }
      n = {
        skill: i,
        difficulty: s,
        id: t
      }, o === "hideAfterRoll" && (n.hideAfterRoll = true), o === "repeatable" && (n.repeatable = true);
    }
    return dd(n).succeeded;
  }
), pk = new V(
  "get_skill_check",
  [{ name: "skillCheckId", type: "string" }],
  async (e2) => vt().getSkillCheck(e2.options.skillCheckId)
), mk = new V(
  "skill_check_result",
  [{ name: "skillCheckId", type: "string" }],
  async (e2) => vt().getSkillCheck(e2.options.skillCheckId).succeeded
), hk = new V(
  "reset_roll",
  [
    {
      name: "id",
      type: "string"
    }
  ],
  async (e2) => vt().resetSkillCheck(e2.options.id)
), yk = new V(
  "add_stat",
  [
    { name: "statKey", type: "string" },
    { name: "amountToAdd", type: "number" }
  ],
  async (e2) => {
    const { statKey: t, amountToAdd: n } = e2.options;
    (!t || typeof n != "number") && ce(
      e2,
      "add_stat command needs a stat id and a value as parameters"
    ), Xt().addStat(t, n);
  }
), gk = new V(
  "set_stat",
  [
    { name: "statKey", type: "string" },
    { name: "value", type: "number" }
  ],
  async (e2) => {
    const { statKey: t, value: n } = e2.options;
    (!t || typeof n != "number") && ce(
      e2,
      "set_stat command needs a stat id and a value as parameters"
    ), Xt().setStat(t, n);
  }
), vk = new V("get_stat_value", [{ name: "statKey", type: "string" }], async (e2) => {
  const { statKey: t } = e2.options;
  return t || ce(
    e2,
    "get_stat_value command needs a stat id as parameter"
  ), Xt().getStatValue(t);
}), _k = new V("show_hud", [], async (e2) => {
  Xt().setVisibility(true);
}), bk = new V("hide_hud", [], async (e2) => {
  Xt().setVisibility(false);
}), Tk = V.FromOptions({
  keyword: "jump",
  argTypes: "any",
  runner: async (e2) => {
    (e2.args.length < 1 || typeof e2.args[0] != "string") && ce(e2, "requires a label argument");
    const t = e2.args[0], n = Ie(), r = {
      branchData: Re.script[t],
      label: t,
      args: e2.args.splice(1),
      currentIndex: 0
    };
    if (!Re.script[t]) {
      ue(`Trying to jump but label ${t} not found`);
      return;
    }
    return n.jumpTarget = r, So;
  }
}), Sk = V.FromOptions({
  keyword: "run",
  argTypes: "any",
  runner: async (e2) => {
    (e2.args.length < 1 || typeof e2.args[0] != "string") && ce(e2, "run command needs a label to argument run");
    const t = e2.args[0];
    return await Ie().runLabelFunction(t, ...e2.args.slice(1));
  }
}), wk = V.FromOptions({
  keyword: "var",
  argTypes: [
    { name: "name", type: "string" },
    { name: "value", type: "any" }
  ],
  runner: async (e2) => {
    const { name: t, value: n } = e2.options;
    Ie().addScopedVariable(t, n);
  }
}), $k = V.FromOptions({
  keyword: "return",
  argTypes: [{ name: "value", type: "any" }],
  runner: async (e2) => {
    const { value: t } = e2.options;
    return Ie().setReturnValue(t), ca;
  }
}), Ck = V.FromOptions({
  keyword: "log",
  argTypes: "any",
  runner: async (e2) => {
    y$(e2, ...e2.args);
  }
}), kk = V.FromOptions({
  keyword: "menu_return",
  argTypes: [],
  runner: async (e2) => (ff(), wo)
}), Ok = V.FromOptions({
  keyword: "save",
  argTypes: [{ name: "name", type: "string", optional: true }],
  runner: async (e2) => {
    await Of({ saveName: e2.options.name });
  }
}), Ak = V.FromOptions({
  keyword: "save_prompt",
  argTypes: [{ name: "name", type: "string", optional: true }],
  runner: async (e2) => {
    await Of({
      saveName: e2.options.name,
      withPrompt: true
    });
  }
}), Ek = V.FromOptions({
  keyword: "reset_global_save",
  argTypes: [],
  runner: async (e2) => {
    await kf();
  }
}), Ik = V.FromOptions({
  keyword: "new",
  argTypes: [
    { name: "name", type: "string" },
    { name: "rest", type: "rest", optional: true }
  ],
  runner: async (e2) => {
    const t = e2.options.name;
    if (t === "Array")
      return [...e2.args.slice(1)];
    if (t === "Object")
      return {};
  }
}), Pk = [
  { name: "mode", type: "string" },
  { name: "audio", type: "string" },
  { name: "channel", type: "number", optional: true }
], Nk = new V(
  "play",
  Pk,
  async (e2) => {
    const t = Lt(), { mode: n, audio: r, channel: i } = e2.options, s = ss(e2, n);
    s && t.playChannel(s, r, i ?? 0);
  }
), xk = new V(
  "resume",
  [
    { name: "mode", type: "string" },
    { name: "channel", type: "number", optional: true }
  ],
  async (e2) => {
    const t = Lt(), { mode: n, channel: r } = e2.options, i = ss(e2, n);
    i && t.resumeChannel(i, r ?? 0);
  }
), jk = new V(
  "pause",
  [
    { name: "mode", type: "string" },
    { name: "channel", type: "number", optional: true }
  ],
  async (e2) => {
    const t = Lt(), { mode: n, channel: r } = e2.options, i = ss(e2, n);
    i && t.pauseChannel(i, r ?? 0);
  }
), Lk = new V(
  "stop",
  [
    { name: "mode", type: "string" },
    { name: "channel", type: "number", optional: true }
  ],
  async (e2) => {
    const t = Lt(), { mode: n, channel: r } = e2.options, i = ss(e2, n);
    i && t.stopChannel(i, r ?? 0);
  }
);
function ss(e2, t) {
  return Dk(t) ? t : (ce(e2, `${t} is not a valid audio mode.`), false);
}
function Dk(e2) {
  return !!uu.includes(e2);
}
const Rk = new V(
  "set",
  [
    { name: "key", type: "string" },
    { name: "value", type: "any" }
  ],
  async (e2) => {
    const t = ai();
    Ap(t, `$${e2.options.key}`, e2.options.value);
  }
), Mk = new V(
  "add",
  [
    { name: "key", type: "string" },
    { name: "value", type: "any" }
  ],
  async (e2) => {
    const t = ai();
    Ep(t, `$${e2.options.key}`, e2.options.value);
  }
), Fk = new V(
  "set_screen",
  [
    { name: "screen", type: "string" },
    { name: "layer", type: "number", optional: true },
    { name: "transitionName", type: "string", optional: true },
    { name: "transitionDuration", type: "number", optional: true },
    { name: "transitionDelay", type: "number", optional: true }
  ],
  async (e2) => {
    const t = pn();
    if (!Zi(e2.options.screen)) {
      ce(
        e2,
        `Screen ${e2.options.screen} doesn't exist in the config`
      );
      return;
    }
    return e2.options.transitionName ? t.transitionScreen(
      e2.options.screen,
      {
        transition: e2.options.transitionName,
        duration: e2.options.transitionDuration,
        delay: e2.options.transitionDelay
      },
      e2.options.layer
    ) : t.setScreen(e2.options.screen, e2.options.layer ?? 0);
  }
), Uk = new V(
  "empty_layer",
  [
    { name: "layer", type: "number" },
    { name: "transitionName", type: "string", optional: true },
    { name: "transitionDuration", type: "number", optional: true },
    { name: "transitionDelay", type: "number", optional: true }
  ],
  async (e2) => {
    const t = pn();
    return e2.options.transitionName ? t.emptyLayer(e2.options.layer, {
      transition: e2.options.transitionName,
      duration: e2.options.transitionDuration,
      delay: e2.options.transitionDelay
    }) : t.emptyLayer(e2.options.layer);
  }
), Bk = new V(
  "set_button",
  [
    { name: "buttonId", type: "string" },
    { name: "state", type: "any" }
  ],
  async (e2) => {
    const { buttonId: t, state: n } = e2.options, r = pn();
    if (!kr(t)) {
      ce(
        e2,
        `Button ${t} doesn't exist in the config`
      );
      return;
    }
    r.changeButton(t, n);
  }
);
class qn extends V {
  static async ManageAutoAdvance(t) {
    await Ie().waitForEndTextAnimation(), await Kt(t.options.delay || 0), t.options.autoAdvance ? Nf(0) : Ye().makeLastDialogInteractive();
  }
  static ShouldBeInteractive(t) {
    return !t.options.delay && !t.options.autoAdvance;
  }
}
const _l = [
  {
    name: "speaker",
    type: "string"
  },
  {
    name: "pose",
    type: "string"
  },
  {
    name: "text",
    type: "string"
  },
  {
    name: "delay",
    type: "number",
    optional: true
  },
  {
    name: "autoAdvance",
    type: "boolean",
    optional: true
  }
], qk = qn.FromOptions({
  keyword: "talk",
  argTypes: _l,
  runner: async (e2, t) => {
    const n = qn.ShouldBeInteractive(e2);
    await Go({
      speaker: e2.options.speaker,
      pose: e2.options.pose,
      cssClass: "talk-command",
      text: `"${e2.options.text}"`,
      choices: t,
      interactive: n
    }), n || qn.ManageAutoAdvance(e2);
  },
  returnAfterPlayerAnswer: true
}), Vk = qn.FromOptions({
  keyword: "think",
  argTypes: _l,
  runner: async (e2, t) => {
    const n = qn.ShouldBeInteractive(e2);
    await Go({
      speaker: e2.options.speaker,
      pose: e2.options.pose,
      cssClass: "think-command",
      text: `${e2.options.text}`,
      choices: t,
      interactive: n
    }), n || qn.ManageAutoAdvance(e2);
  },
  returnAfterPlayerAnswer: true
}), Hk = qn.FromOptions({
  keyword: "narrate",
  argTypes: _l.slice(2, 5),
  runner: async (e2, t) => {
    const n = qn.ShouldBeInteractive(e2);
    await Go({
      speaker: Ct().gameCharacter,
      cssClass: "text-command",
      text: `${e2.options.text}`,
      choices: t,
      interactive: n
    }), n || qn.ManageAutoAdvance(e2);
  },
  returnAfterPlayerAnswer: true
}), Kk = () => {
  const e2 = Xi("text", []);
  return (t, n) => {
    const r = e2(t, n);
    return n.command.staticOptions = {
      text: n.code.substring(1, n.code.length - 1)
    }, r;
  };
}, Gk = V.FromOptions({
  keyword: "text",
  argTypes: [],
  runner: async (e2, t) => {
    await Go({
      speaker: Ct().gameCharacter,
      cssClass: "text-command",
      text: e2.staticOptions.text,
      choices: t,
      interactive: true
    });
  },
  parser: Kk(),
  returnAfterPlayerAnswer: true
}), Wk = new V(
  "add_item",
  [
    { name: "id", type: "string" },
    { name: "amount", type: "number" }
  ],
  async (e2) => {
    const { id: t, amount: n } = e2.options;
    Dt().add({
      id: t,
      amount: n
    });
  }
), zk = new V(
  "remove_item",
  [
    { name: "id", type: "string" },
    { name: "amount", type: "number" }
  ],
  async (e2) => {
    const { id: t, amount: n } = e2.options;
    Dt().remove({
      id: t,
      amount: n
    });
  }
), Qk = new V(
  "has_item?",
  [
    { name: "id", type: "string" },
    { name: "amount", type: "number", optional: true }
  ],
  async (e2) => {
    const { id: t, amount: n } = e2.options;
    return Dt().hasItem(t, n);
  }
), Yk = new V(
  "item_amount?",
  [{ name: "id", type: "string" }],
  async (e2) => {
    const { id: t } = e2.options;
    return Dt().getItemAmount(t);
  }
), Jk = new V(
  "enable_interaction",
  [{ name: "tag", type: "string" }],
  async (e2) => {
    const t = e2.options.tag;
    Dt().enableInteraction(t);
  }
), Xk = new V(
  "disable_interaction",
  [{ name: "tag", type: "string" }],
  async (e2) => {
    const t = e2.options.tag;
    Dt().disableInteraction(t);
  }
), Zk = new V(
  "start_quest",
  [{ name: "questId", type: "string" }],
  async (e2) => {
    const t = e2.options.questId;
    Pt().startQuest(t);
  }
), e1 = new V(
  "start_objective",
  [
    { name: "questId", type: "string" },
    { name: "objectiveId", type: "string" }
  ],
  async (e2) => {
    const { questId: t, objectiveId: n } = e2.options;
    Pt().startObjective(t, n);
  }
), t1 = new V(
  "complete_objective",
  [
    { name: "questId", type: "string" },
    { name: "objectiveId", type: "string" }
  ],
  async (e2) => {
    const { questId: t, objectiveId: n } = e2.options;
    Pt().completeObjective(t, n);
  }
), n1 = new V(
  "complete_quest",
  [
    { name: "questId", type: "string" },
    { name: "ending", type: "any", optional: true }
  ],
  async (e2) => {
    const { questId: t, ending: n } = e2.options;
    Pt().completeQuest(t, n);
  }
), r1 = new V("quest_completed?", [{ name: "questId", type: "string" }], async (e2) => {
  const { questId: t } = e2.options;
  return Pt().isQuestCompleted(t);
}), i1 = new V("quest_succeeded?", [{ name: "questId", type: "string" }], async (e2) => {
  const { questId: t } = e2.options;
  return Pt().isQuestSucceeded(t);
}), o1 = new V("quest_failed?", [{ name: "questId", type: "string" }], async (e2) => {
  const { questId: t } = e2.options;
  return Pt().isQuestFailed(t);
}), s1 = new V("quest_ending?", [{ name: "questId", type: "string" }], async (e2) => {
  const { questId: t } = e2.options;
  return Pt().getQuestEnding(t);
}), a1 = new V(
  "quest_has_ending?",
  [
    { name: "questId", type: "string" },
    { name: "ending", type: "string" }
  ],
  async (e2) => {
    const { questId: t, ending: n } = e2.options;
    return Pt().questHasEnding(t, n);
  }
), l1 = new V(
  "objective_completed?",
  [
    { name: "questId", type: "string" },
    { name: "objectiveId", type: "string" }
  ],
  async (e2) => {
    const { questId: t, objectiveId: n } = e2.options;
    return Pt().isObjectiveCompleted(t, n);
  }
), c1 = new V("quest_started?", [{ name: "questId", type: "string" }], async (e2) => {
  const { questId: t } = e2.options;
  return Pt().isQuestStarted(t);
}), u1 = new V(
  "objective_started?",
  [
    { name: "questId", type: "string" },
    { name: "objectiveId", type: "string" }
  ],
  async (e2) => {
    const { questId: t, objectiveId: n } = e2.options;
    return Pt().isObjectiveStarted(t, n);
  }
), d1 = V.FromOptions({
  keyword: "wait",
  argTypes: [{ name: "duration", type: "number" }],
  runner: async (e2) => {
    await Kt(e2.options.duration);
  }
}), f1 = new V(
  "notify",
  [
    { name: "text", type: "string" },
    { name: "description", type: "string", optional: true },
    { name: "icon", type: "string", optional: true }
  ],
  async (e2) => {
    const { text: t, icon: n, description: r } = e2.options;
    qt().addNotification(t, r, n);
  }
), p1 = new V(
  "disable_notifications",
  [],
  async (e2) => {
    qt().disableNotifications();
  }
), m1 = new V(
  "enable_notifications",
  [],
  async (e2) => {
    qt().enableNotifications();
  }
), h1 = new V(
  "clear_dialog",
  [],
  async (e2) => {
    Ye().clearDialog();
  }
), y1 = new V(
  "if",
  [{ name: "condition", type: "boolean" }],
  async (e2) => {
    const t = [];
    for (const i of e2.staticOptions.elseifs) {
      const s = i.condition, o = await Zo(s);
      t.push(o);
    }
    const n = Cy(e2, t), r = Ie();
    if (n) {
      const i = {
        branchData: {
          branch: n
        },
        currentIndex: 0
      };
      return r.addAndRunBlock(i);
    }
  },
  (e2, t) => {
    let n = e2.currentLine;
    Xi("if", [
      { name: "condition", type: "string" }
    ])(e2, t);
    const { lines: i, currentLine: s, line: o } = e2, l = t.command;
    let u, c = s, m = false;
    const a = [];
    for (; !m; ) {
      c++;
      const d = ky(i, c);
      if (d && d.code.startsWith("elseif")) {
        const p = d.expression;
        if (!Array.isArray(p)) {
          e2.parserContext.error(
            d.line,
            "Expected an expression after elseif"
          ), m = true;
          break;
        }
        if (p.length > 2) {
          e2.parserContext.error(
            d.line,
            "Expected only one argument after elseif"
          ), m = true;
          break;
        }
        a.push({
          branch: e2.processCommandsFunction(
            e2.parserContext,
            d.branch,
            o
          ),
          condition: Sa(
            e2.parserContext,
            d,
            p[1]
          )
        });
      } else
        d && d.code === "else:" ? u = e2.processCommandsFunction(
          e2.parserContext,
          d.branch,
          o
        ) : (m = true, c--);
    }
    return l.staticOptions = {
      success: e2.processCommandsFunction(
        e2.parserContext,
        o.branch,
        o
      ),
      elseifs: a,
      failure: u
    }, c++, n = c, {
      newLine: n
    };
  }
), g1 = new V(
  "==",
  "any",
  async (e2) => {
    e2.args.length < 1 && ce(e2, "requires at least 1 arguments");
    let t = e2.args[0], n = true;
    for (const r of e2.args)
      if (r != t) {
        n = false;
        break;
      } else
        t = r;
    return n;
  }
), v1 = new V(
  ">",
  [
    { name: "a", type: "any" },
    { name: "b", type: "any" }
  ],
  async (e2) => {
    const { a: t, b: n } = e2.options;
    return t > n;
  }
), _1 = new V(
  "<",
  [
    { name: "a", type: "any" },
    { name: "b", type: "any" }
  ],
  async (e2) => {
    const { a: t, b: n } = e2.options;
    return t < n;
  }
), b1 = new V(
  ">=",
  [
    { name: "a", type: "any" },
    { name: "b", type: "any" }
  ],
  async (e2) => {
    const { a: t, b: n } = e2.options;
    return t >= n;
  }
), T1 = new V(
  "<=",
  [
    { name: "a", type: "any" },
    { name: "b", type: "any" }
  ],
  async (e2) => {
    const { a: t, b: n } = e2.options;
    return t <= n;
  }
), S1 = new V(
  "!=",
  [
    { name: "a", type: "any" },
    { name: "b", type: "any" }
  ],
  async (e2) => {
    const { a: t, b: n } = e2.options;
    return t != n;
  }
), w1 = new V(
  "!",
  [{ name: "a", type: "any" }],
  async (e2) => {
    const { a: t } = e2.options;
    return !t;
  }
), $1 = new V(
  "&&",
  "any",
  async (e2) => {
    const t = e2.args;
    return e2.args.length < 2 && ce(e2, "requires at least two arguments"), t.reduce((n, r) => n && r, true);
  }
), C1 = new V(
  "||",
  "any",
  async (e2) => (e2.args.length < 2 && ce(e2, "requires at least two arguments"), e2.args.reduce((t, n) => t || n, false))
), k1 = new V(
  "?",
  [
    { name: "a", type: "any" },
    { name: "b", type: "any" },
    { name: "c", type: "any" }
  ],
  async (e2) => {
    const { a: t, b: n, c: r } = e2.options;
    return t ? n : r;
  }
), O1 = new V(
  "+",
  "any",
  async (e2) => (e2.args.length < 2 && ce(e2, "requires at least two arguments"), e2.args.reduce((t, n) => typeof n == "number" ? t + n : (ce(e2, "requires all arguments to be numbers"), t), 0))
), A1 = new V(
  "-",
  "any",
  async (e2) => (e2.args.length < 2 && ce(e2, "requires at least two arguments"), e2.args.slice(1).reduce((t, n) => typeof n == "number" ? t - n : (ce(e2, "requires all arguments to be numbers"), t), e2.args[0]))
), E1 = new V(
  "neg",
  [{ name: "a", type: "number" }],
  async (e2) => (e2.args.length !== 1 && ce(e2, "requires one argument"), -e2.options.a)
), I1 = new V(
  "abs",
  [{ name: "a", type: "number" }],
  async (e2) => (e2.args.length !== 1 && ce(e2, "requires one argument"), Math.abs(e2.options.a))
), P1 = new V(
  "*",
  "any",
  async (e2) => (e2.args.length < 2 && ce(e2, "requires at least two arguments"), e2.args.reduce((t, n) => typeof n == "number" ? t * n : (ce(e2, "requires all arguments to be numbers"), t), 1))
), N1 = new V(
  "/",
  "any",
  async (e2) => {
    e2.args.length < 2 && ce(e2, "requires at least two arguments");
    const t = e2.args[0] / e2.args[1];
    return e2.args.slice(2).reduce((n, r) => typeof r == "number" ? n / r : (ce(e2, "requires all arguments to be numbers"), n), t);
  }
), x1 = async (e2) => {
  const { prompt: t, choices: n } = e2.staticOptions, r = [];
  for (const [, o] of n.entries()) {
    const l = await Zo(o.prompt);
    r.push(l);
  }
  e2.options.choiceResults = r;
  const i = r.map((o, l) => {
    var d;
    let u = true;
    o.skillCheck && (u = ((d = o.skillCheck) == null ? void 0 : d.allowed) ?? false);
    const c = vl().hasSeenChoice(
      t.code,
      n[l].prompt.code
    );
    return {
      flag: o.flag,
      seenBefore: c,
      choice: o.text,
      originalIndex: l,
      allowed: u
    };
  }).filter((o) => o.choice), s = await Pf(t, i);
  return await R1(e2, s);
};
function j1(e2, t) {
  t.branch || e2.parserContext.error(
    t.line,
    `Choice option doesn't have any branch to go to (${t.code} - ${t.line})`
  );
  let n, r;
  const i = t.branch;
  return t.expression[1] === "roll" || t.expression[2] === "roll" ? ((!i[0].branch || !i[1].branch) && e2.parserContext.error(
    t.line,
    `Choice option with a skill roll needs success and failure branches (${t.code} - ${t.line})`
  ), n = {
    success: e2.processCommandsFunction(
      e2.parserContext,
      i[0].branch,
      t
    ),
    failure: e2.processCommandsFunction(
      e2.parserContext,
      i[1].branch,
      t
    )
  }) : r = e2.processCommandsFunction(e2.parserContext, i, t), {
    prompt: e2.processCommandsFunction(e2.parserContext, [t], t)[0],
    branch: r,
    skillBranches: n
  };
}
const L1 = (e2, t) => {
  let n = e2.currentLine;
  Xi("choice", []);
  const { line: r } = e2, i = t.command;
  (!r.branch || r.branch.length < 2) && e2.parserContext.error(
    r.line,
    "Choice menu needs to have at least one option"
  );
  const s = r.branch[0];
  s || e2.parserContext.error(e2.line.line, "Choice prompt is missing ");
  const l = r.branch.slice(1).map((u, c) => (u.branch || e2.parserContext.error(
    u.line,
    `Choice option doesn't have any branch to go to (${u.code})`
  ), u = M1(e2.parserContext, u), j1(e2, u)));
  return i.staticOptions = {
    prompt: e2.processCommandsFunction(e2.parserContext, [s], r)[0],
    choices: l
  }, n++, {
    newLine: n
  };
}, D1 = V.FromOptions({
  keyword: "choice",
  argTypes: [],
  runner: x1,
  parser: L1
}), R1 = async (e2, t) => {
  const n = t, r = Ie(), { choices: i } = e2.staticOptions, s = i[n], o = e2.options.choiceResults[n], l = e2.staticOptions.prompt;
  vl().trackChoice(l.code, s.prompt.code);
  let u = o.text, c;
  if (o.skillCheck ? (u = null, dd(o.skillCheck.options).succeeded ? c = s.skillBranches.success : c = s.skillBranches.failure) : c = s.branch, u) {
    const m = {
      speaker: Ct().playerCharacter,
      text: u,
      interactive: false
    };
    Ye().addDialog(m);
  }
  if (c) {
    const m = {
      currentIndex: 0,
      branchData: {
        branch: c
      }
    };
    return await r.addAndRunBlock(m);
  }
};
function M1(e2, t) {
  return {
    code: `choicePrompt ${t.code}`,
    indentation: t.indentation,
    line: t.line,
    branch: t.branch,
    expression: ["choicePrompt", ...t.expression]
  };
}
const F1 = new V(
  "choicePrompt",
  "any",
  // Will return null if the choice prompt should not be used (failed condition or hidden skillcheck). Otherwise, returns the info needed to display the prompt + later run the skillcheck
  async (e2) => {
    const t = e2.args;
    return t.length === 1 ? U1(t[0]) : t.length === 2 ? B1(t) : t.length > 2 ? t[0] === "roll" || t[1] === "roll" ? V1(e2, t) : q1(e2, t) : (ce(e2, "Invalid choice prompt line"), {
      text: t[0]
    });
  }
);
function U1(e2) {
  return {
    text: e2
  };
}
function B1(e2) {
  return {
    text: e2[1],
    flag: e2[0]
  };
}
function q1(e2, t) {
  const n = t[1] === "if" ? 1 : 2;
  if (t[n] !== "if")
    return ce(e2, "Invalid choice prompt line"), {
      text: t[0]
    };
  const r = n === 2;
  let i = r ? t[1] : t[0], s = true;
  t.length > n + 1 && (s = t[n + 1]), s || (i = null);
  const o = {
    text: i
  };
  return r && (o.flag = t[0]), o;
}
function V1(e2, t) {
  const n = t[0] === "roll" ? 0 : 1, r = n === 1, i = n, s = t[i + 1];
  let o = {}, l = i + 2;
  Cp(s) ? o = {
    ...$p(s),
    id: s
  } : (o = {
    id: s,
    skill: t[i + 2],
    difficulty: t[i + 3]
  }, l = i + 4);
  const u = t[l];
  l++;
  let c = false, m = false, a;
  t.length > l && (t[l] === "if" ? (m = true, t.length < l + 2 && ce(
    e2,
    'Missing condition argument after "if" in choice with a skill check'
  ), a = t[l + 1]) : (c = t[l], t.length > l + 1 && (l++, t[l] === "if" ? (m = true, t.length < l + 2 && ce(
    e2,
    'Missing condition argument after "if" in choice with a skill check'
  ), a = t[l + 1]) : ce(
    e2,
    `Invalid argument after skill check mode: ${t[l]}. The next argument can only be an if condition.`
  )))), c === "hideAfterRoll" && (o.hideAfterRoll = true), c === "repeatable" && (o.repeatable = true);
  const d = vt().getSkillCheck(s);
  if (d.hidden || m && !a)
    return {
      text: null
    };
  const p = !d.happened || d.happened && d.succeeded || o.repeatable, { difficultyText: h } = dh({
    skill: o.skill,
    skillCheckId: s,
    value: o.difficulty
  }), T = {
    text: `${h} ${u}`,
    skillCheck: {
      allowed: p,
      options: o
    }
  };
  return r && (T.flag = t[0]), T;
}
const Fp = V.FromOptions({
  keyword: "text_field",
  argTypes: [{ name: "prompt", type: "string" }],
  returnAfterPlayerAnswer: true,
  runner: async (e2) => {
    const t = {
      speaker: Ct().gameCharacter,
      text: e2.options.prompt,
      textField: true,
      interactive: true
    };
    Ye().addDialog(t);
  }
});
Fp.onPlayerAnswered = async (e2, t) => (typeof t != "string" && ce(e2, "The player's answer should be a string"), t);
const H1 = V.FromOptions({
  keyword: "text_field_prompt",
  argTypes: [{ name: "prompt", type: "string" }],
  runner: async (e2) => {
    const t = {
      speaker: Ct().gameCharacter,
      text: e2.options.prompt,
      textField: true,
      interactive: true
    };
    Ye().addDialog(t);
  }
}), K1 = new V(
  "random",
  [
    { name: "a", type: "number" },
    { name: "b", type: "number" }
  ],
  async (e2) => {
    const { a: t, b: n } = e2.options;
    return typeof t != "number" || typeof n != "number" ? (ce(
      e2,
      "random command needs two numbers as parameters"
    ), 0) : Math.floor(Math.random() * (n - t + 1)) + t;
  }
), G1 = new V(
  "random_float",
  [
    { name: "a", type: "number" },
    { name: "b", type: "number" }
  ],
  async (e2) => {
    const { a: t, b: n } = e2.options;
    return typeof t != "number" || typeof n != "number" ? (ce(
      e2,
      "random_float command needs two numbers as parameters"
    ), 0) : Math.random() * (n - t) + t;
  }
), W1 = new V(
  "random_from_args",
  [],
  async (e2) => {
    const t = e2.args;
    return !t || !t.length ? (ce(
      e2,
      "random_from_args command needs at least one argument"
    ), 0) : t[Math.floor(Math.random() * t.length)];
  }
), z1 = new V(
  "random_from_array",
  [{ name: "a", type: "any" }],
  async (e2) => {
    const { a: t } = e2.options;
    return Array.isArray(t) ? t[Math.floor(Math.random() * t.length)] : (ce(
      e2,
      "random_from_array command needs an array as parameter"
    ), 0);
  }
), Q1 = new V(
  "concat",
  "any",
  async (e2) => (e2.args.length < 2 && ce(e2, "requires at least two arguments"), e2.args.reduce((t, n) => typeof n == "string" ? `${t}${n}` : (ce(e2, "requires all arguments to be strings"), t), ""))
), Y1 = new V(
  "join",
  "any",
  async (e2) => {
    const t = e2.args[0];
    return e2.args.length < 3 && ce(e2, "requires at least 3 arguments"), e2.args.slice(1).reduce((n, r) => typeof r == "string" ? `${n}${t}${r}` : (ce(e2, "requires all arguments to be strings"), n), "");
  }
), J1 = new V(
  "split",
  "any",
  async (e2) => {
    e2.args.length < 2 && ce(e2, "requires at least 2 arguments");
    const t = e2.args[0], n = e2.args[1];
    if (typeof t == "string" && typeof n == "string")
      return n.split(t);
    ce(e2, "requires all arguments to be strings");
  }
), X1 = V.FromOptions({
  keyword: "str_search",
  argTypes: [
    { name: "str", type: "string" },
    { name: "matcher", type: "string" }
  ],
  runner: async (e2) => {
    const { str: t, matcher: n } = e2.options;
    return t.search(n);
  }
}), Z1 = V.FromOptions({
  keyword: "regex_search",
  argTypes: [
    { name: "str", type: "string" },
    { name: "regex", type: "string" }
  ],
  runner: async (e2) => {
    const { str: t, regex: n } = e2.options, r = new RegExp(n);
    return t.search(r);
  }
}), eO = V.FromOptions({
  keyword: "min",
  argTypes: [
    { name: "min", type: "number" },
    { name: "value", type: "number" }
  ],
  runner: async (e2) => {
    const { min: t, value: n } = e2.options;
    return n < t ? n : t;
  }
}), tO = V.FromOptions({
  keyword: "max",
  argTypes: [
    { name: "max", type: "number" },
    { name: "value", type: "number" }
  ],
  runner: async (e2) => {
    const { max: t, value: n } = e2.options;
    return n > t ? n : t;
  }
}), nO = V.FromOptions({
  keyword: "clamp",
  argTypes: [
    { name: "min", type: "number" },
    { name: "max", type: "number" },
    { name: "value", type: "number" }
  ],
  runner: async (e2) => {
    const { min: t, max: n, value: r } = e2.options;
    return r < t ? t : r > n ? n : r;
  }
}), rO = V.FromOptions({
  keyword: "floor",
  argTypes: [{ name: "value", type: "number" }],
  runner: async (e2) => {
    const { value: t } = e2.options;
    return Math.floor(t);
  }
}), iO = V.FromOptions({
  keyword: "ceil",
  argTypes: [{ name: "value", type: "number" }],
  runner: async (e2) => {
    const { value: t } = e2.options;
    return Math.ceil(t);
  }
}), oO = V.FromOptions({
  keyword: "round",
  argTypes: [{ name: "value", type: "number" }],
  runner: async (e2) => {
    const { value: t } = e2.options;
    return Math.round(t);
  }
}), sO = V.FromOptions({
  keyword: "sqrt",
  argTypes: [{ name: "value", type: "number" }],
  runner: async (e2) => {
    const { value: t } = e2.options;
    return Math.sqrt(t);
  }
}), aO = V.FromOptions({
  keyword: "^",
  argTypes: [
    { name: "base", type: "number" },
    { name: "exponent", type: "number" }
  ],
  runner: async (e2) => {
    const { base: t, exponent: n } = e2.options;
    return Math.pow(t, n);
  }
}), lO = new V(
  "create_sprite",
  [
    { name: "image", type: "string" },
    { name: "x", type: "number" },
    { name: "y", type: "number" },
    { name: "parent", type: "any", optional: true }
  ],
  async (e2) => {
    const t = on(), { x: n, y: r, image: i, parent: s } = e2.options, o = { x: n, y: r, image: i };
    return typeof s == "object" && (o.parent = s), typeof s == "string" && (o.parent = on().getObject(s)), t.createSprite(o);
  }
), cO = new V(
  "create_object",
  [
    { name: "x", type: "number" },
    { name: "y", type: "number" },
    { name: "parent", type: "any", optional: true }
  ],
  async (e2) => {
    const t = on(), { x: n, y: r, parent: i } = e2.options, s = { x: n, y: r };
    return typeof i == "object" && (s.parent = i), typeof i == "string" && (s.parent = on().getObject(i)), t.createObject(s);
  }
), uO = new V("delete_sprite", [{ name: "sprite", type: "any" }], async (e2) => on().destroyObject(e2.options.sprite)), dO = V.FromOptions({
  keyword: "empty_sprites",
  argTypes: [{ name: "layer", type: "number", optional: true }],
  runner: async (e2) => {
    const t = on(), { layer: n } = e2.options;
    return typeof n == "number" ? t.emptyLayer(n) : t.emptyAllLayers();
  }
}), fO = V.FromOptions({
  keyword: "shuffle",
  argTypes: [{ name: "array", type: "any" }],
  runner: async (e2) => {
    const t = e2.options.array;
    if (!Array.isArray(t)) {
      ce(e2, "requires an array argument");
      return;
    }
    return PO(t), t;
  }
}), pO = V.FromOptions({
  keyword: "push",
  argTypes: [
    { name: "array", type: "any" },
    { name: "value", type: "any" }
  ],
  runner: async (e2) => {
    const { array: t, value: n } = e2.options;
    if (!Array.isArray(t)) {
      ce(e2, "requires an array argument");
      return;
    }
    return t.push(n), t;
  }
}), mO = V.FromOptions({
  keyword: "pop",
  argTypes: [{ name: "array", type: "any" }],
  runner: async (e2) => {
    const { array: t } = e2.options;
    if (!Array.isArray(t)) {
      ce(e2, "requires an array argument");
      return;
    }
    return t.pop();
  }
}), hO = V.FromOptions({
  keyword: "shift",
  argTypes: [{ name: "array", type: "any" }],
  runner: async (e2) => {
    const { array: t } = e2.options;
    if (!Array.isArray(t)) {
      ce(e2, "requires an array argument");
      return;
    }
    return t.shift();
  }
}), yO = V.FromOptions({
  keyword: "unshift",
  argTypes: [
    { name: "array", type: "any" },
    { name: "value", type: "any" }
  ],
  runner: async (e2) => {
    const { array: t, value: n } = e2.options;
    if (!Array.isArray(t)) {
      ce(e2, "requires an array argument");
      return;
    }
    return t.unshift(n), t;
  }
}), gO = V.FromOptions({
  keyword: "array_join",
  argTypes: [
    { name: "array", type: "any" },
    { name: "separator", type: "string", optional: true }
  ],
  runner: async (e2) => {
    const { array: t, separator: n } = e2.options;
    if (!Array.isArray(t)) {
      ce(e2, "requires an array argument");
      return;
    }
    if (typeof n < "u" && typeof n != "string") {
      ce(e2, "array join string separator must be a string");
      return;
    }
    return t.join(n);
  }
}), vO = V.FromOptions({
  keyword: "array_concat",
  argTypes: [
    { name: "array", type: "any" },
    { name: "rest", type: "rest", optional: true }
  ],
  runner: async (e2) => {
    const { array: t } = e2.options, n = e2.args;
    if (!Array.isArray(t)) {
      ce(e2, "requires an array argument");
      return;
    }
    for (const r of n)
      if (!Array.isArray(r)) {
        ce(e2, "All concat arguments should be arrays");
        return;
      }
    return t.concat(...n.slice(1));
  }
}), _O = V.FromOptions({
  keyword: "includes",
  argTypes: [
    { name: "array", type: "any" },
    { name: "searchElement", type: "string" }
  ],
  runner: async (e2) => {
    const { array: t, searchElement: n } = e2.options;
    return Array.isArray(t) || ce(e2, "requires an array argument"), typeof n > "u" && ce(e2, "requires a search element argument"), t.includes(n);
  }
}), bO = V.FromOptions({
  keyword: "reverse",
  argTypes: [{ name: "array", type: "any" }],
  runner: async (e2) => {
    const { array: t } = e2.options;
    return Array.isArray(t) || ce(e2, "requires an array argument"), t.reverse(), t;
  }
}), TO = V.FromOptions({
  keyword: "slice",
  argTypes: [
    { name: "array", type: "any" },
    { name: "start", type: "number" },
    { name: "end", type: "number", optional: true }
  ],
  runner: async (e2) => {
    const { array: t, start: n, end: r } = e2.options;
    return Array.isArray(t) || ce(e2, "requires an array argument"), typeof n != "number" && ce(e2, "requires a start index argument"), typeof r < "u" && typeof r != "number" && ce(
      e2,
      "end index argument must be a number if present"
    ), t.slice(n, r);
  }
}), SO = V.FromOptions({
  keyword: "splice",
  argTypes: [
    { name: "array", type: "any" },
    { name: "start", type: "number" },
    { name: "end", type: "number", optional: true }
  ],
  runner: async (e2) => {
    const { array: t, start: n, end: r } = e2.options;
    return Array.isArray(t) || ce(e2, "requires an array argument"), typeof n != "number" && ce(e2, "requires a start index argument"), typeof r < "u" && typeof r != "number" && ce(
      e2,
      "end index argument must be a number if present"
    ), t.splice(n, r);
  }
}), wO = V.FromOptions({
  keyword: "array_find_index",
  argTypes: [
    { name: "array", type: "any" },
    { name: "predicateLabel", type: "string" },
    { name: "rest", type: "rest", optional: true }
  ],
  runner: async (e2) => {
    const { array: t, predicateLabel: n } = e2.options;
    Array.isArray(t) || ce(e2, "requires an array argument");
    for (const [r, i] of t.entries())
      if (await Ie().runLabelFunction(
        n,
        i,
        r,
        t,
        ...e2.args.slice(2)
      ) === true)
        return r;
    return -1;
  }
}), $O = V.FromOptions({
  keyword: "array_find",
  argTypes: [
    { name: "array", type: "any" },
    { name: "predicateLabel", type: "string" },
    { name: "rest", type: "rest", optional: true }
  ],
  runner: async (e2) => {
    const { array: t, predicateLabel: n } = e2.options;
    Array.isArray(t) || ce(e2, "requires an array argument");
    for (const [r, i] of t.entries())
      if (await Ie().runLabelFunction(
        n,
        i,
        r,
        t,
        ...e2.args.slice(2)
      ) === true)
        return i;
    return null;
  }
}), CO = V.FromOptions({
  keyword: "array_filter",
  argTypes: [
    { name: "array", type: "any" },
    { name: "predicateLabel", type: "string" },
    { name: "rest", type: "rest", optional: true }
  ],
  runner: async (e2) => {
    const { array: t, predicateLabel: n } = e2.options;
    Array.isArray(t) || ce(e2, "requires an array argument");
    const r = [];
    for (const [i, s] of t.entries())
      await Ie().runLabelFunction(
        n,
        s,
        i,
        t,
        ...e2.args.slice(2)
      ) === true && r.push(s);
    return r;
  }
}), kO = V.FromOptions({
  keyword: "array_map",
  argTypes: [
    { name: "array", type: "any" },
    { name: "mapperLabel", type: "string" },
    { name: "rest", type: "rest", optional: true }
  ],
  runner: async (e2) => {
    const { array: t, mapperLabel: n } = e2.options;
    Array.isArray(t) || ce(e2, "requires an array argument");
    const r = [];
    for (const [i, s] of t.entries()) {
      const o = await Ie().runLabelFunction(
        n,
        s,
        i,
        t,
        ...e2.args.slice(2)
      );
      r.push(o);
    }
    return r;
  }
}), OO = V.FromOptions({
  keyword: "array_reduce",
  argTypes: [
    { name: "array", type: "any" },
    { name: "reducerLabel", type: "string" },
    { name: "initValue", type: "any" },
    { name: "rest", type: "rest", optional: true }
  ],
  runner: async (e2) => {
    const { array: t, reducerLabel: n, initValue: r } = e2.options;
    Array.isArray(t) || ce(e2, "requires an array argument");
    let i = r;
    for (const [s, o] of t.entries())
      i = await Ie().runLabelFunction(
        n,
        i,
        o,
        s,
        t,
        ...e2.args.slice(3)
      );
    return i;
  }
}), AO = V.FromOptions({
  keyword: "array_some",
  argTypes: [
    { name: "array", type: "any" },
    { name: "predicateLabel", type: "string" },
    { name: "rest", type: "rest", optional: true }
  ],
  runner: async (e2) => {
    const { array: t, predicateLabel: n } = e2.options;
    Array.isArray(t) || ce(e2, "requires an array argument");
    for (const [r, i] of t.entries())
      if (await Ie().runLabelFunction(
        n,
        i,
        r,
        t,
        ...e2.args.slice(2)
      ) === true)
        return true;
    return false;
  }
}), EO = V.FromOptions({
  keyword: "array_every",
  argTypes: [
    { name: "array", type: "any" },
    { name: "predicateLabel", type: "string" },
    { name: "rest", type: "rest", optional: true }
  ],
  runner: async (e2) => {
    const { array: t, predicateLabel: n } = e2.options;
    Array.isArray(t) || ce(e2, "requires an array argument");
    for (const [r, i] of t.entries())
      if (await Ie().runLabelFunction(
        n,
        i,
        r,
        t,
        ...e2.args.slice(2)
      ) !== true)
        return false;
    return true;
  }
}), IO = V.FromOptions({
  keyword: "array_entries",
  argTypes: [{ name: "array", type: "any" }],
  runner: async (e2) => {
    const { array: t } = e2.options;
    return Array.isArray(t) || ce(e2, "requires an array argument"), t.entries();
  }
});
function PO(e2) {
  for (let t = e2.length - 1; t > 0; t--) {
    const n = Math.floor(Math.random() * (t + 1));
    [e2[t], e2[n]] = [e2[n], e2[t]];
  }
}
const Xr = {
  keyframes: {
    "narrat-screenshake": [
      { transform: "translateX(0)" },
      { transform: "translateX(5px)" },
      { transform: "translateX(-5px)" },
      { transform: "translateX(5px)" },
      { transform: "translateX(0)" }
    ]
  },
  animations: {
    "narrat-screenshake": {
      keyframes: "narrat-screenshake",
      options: {
        duration: 150,
        iterations: 3
      }
    }
  }
};
function NO(e2) {
  return typeof e2 == "string" ? document.querySelector(e2) : e2;
}
function xO(e2) {
  if (typeof e2 == "string") {
    const t = wp();
    t.keyframes[e2] ? e2 = t.keyframes[e2] : Xr.keyframes[e2] ? e2 = Xr.keyframes[e2] : (ue(`[Animation] Animation not found: ${e2}`), e2 = Xr.keyframes["narrat-screenshake"]);
  }
  return e2;
}
function jO(e2) {
  let t;
  if (typeof e2 == "string") {
    const n = wp();
    n.animations[e2] ? t = n.animations[e2] : Xr.animations[e2] ? t = Xr.animations[e2] : (ue(`[Animation] Animation not found: ${e2}`), t = Xr.animations["narrat-screenshake"]);
  } else
    t = e2;
  return LO(t);
}
function LO(e2) {
  return {
    keyframes: [...xO(e2.keyframes)],
    options: { ...e2.options }
  };
}
async function Up(e2, t, n) {
  return new Promise((r) => {
    const i = NO(e2);
    i || (ue(`[Animation] Element not found: ${e2}`), r({}));
    const s = jO(t);
    n && Object.assign(s.options, n), i.animate(
      s.keyframes,
      s.options
    ).addEventListener("finish", r);
  });
}
const DO = V.FromOptions({
  keyword: "load_data",
  argTypes: [{ name: "url", type: "string" }],
  runner: async (e2) => {
    const { url: t } = e2.options;
    return await zo(ml(t));
  }
}), RO = V.FromOptions({
  keyword: "change_player_character",
  argTypes: [{ name: "character", type: "string" }],
  runner: async (e2) => {
    const { character: t } = e2.options;
    Ct().config.characters.config.playerCharacter = t;
  }
}), MO = V.FromOptions({
  keyword: "change_game_character",
  argTypes: [{ name: "character", type: "string" }],
  runner: async (e2) => {
    const { character: t } = e2.options;
    Ct().config.characters.config.gameCharacter = t;
  }
}), FO = V.FromOptions({
  keyword: "json_stringify",
  argTypes: [{ name: "value", type: "any" }],
  runner: async (e2) => {
    const { value: t } = e2.options;
    return JSON.stringify(t);
  }
}), UO = V.FromOptions({
  keyword: "json_parse",
  argTypes: [{ name: "value", type: "string" }],
  runner: async (e2) => {
    const { value: t } = e2.options;
    return JSON.parse(t);
  }
}), BO = V.FromOptions({
  keyword: "set_dialog_panel_mode",
  argTypes: [{ name: "mode", type: "string" }],
  runner: async (e2) => {
    const { mode: t } = e2.options;
    gt().dialogPanelMode = t;
  }
}), Bp = [
  { name: "element", type: "string" },
  { name: "animation", type: "string" },
  { name: "duration", optional: true, type: "number" },
  { name: "iterations", optional: true, type: "number" }
];
function qp(e2) {
  const { element: t, animation: n, duration: r, iterations: i } = e2.options, s = {};
  return i && (s.iterations = i), r && (s.duration = r), s;
}
const qO = V.FromOptions({
  keyword: "animate",
  argTypes: Bp,
  runner: async (e2) => {
    const { element: t, animation: n } = e2.options, r = qp(e2);
    Up(t, n, r);
  }
}), VO = V.FromOptions({
  keyword: "animate_wait",
  argTypes: Bp,
  runner: async (e2) => {
    const { element: t, animation: n } = e2.options;
    await Up(t, n, qp(e2));
  }
}), HO = V.FromOptions({
  keyword: "time_now",
  argTypes: [],
  runner: async (e2) => Date.now()
}), KO = V.FromOptions({
  keyword: "total_playtime",
  argTypes: [],
  runner: async (e2) => ke().totalPlayTime
}), GO = V.FromOptions({
  keyword: "session_playtime",
  argTypes: [],
  runner: async (e2) => ke().sessionPlayTime
}), WO = V.FromOptions({
  keyword: "to_days",
  argTypes: [{ name: "time", type: "number" }],
  runner: async (e2) => Math.floor(e2.options.time / 864e5)
}), zO = V.FromOptions({
  keyword: "to_hours",
  argTypes: [{ name: "time", type: "number" }],
  runner: async (e2) => Math.floor(e2.options.time / 36e5)
}), QO = V.FromOptions({
  keyword: "to_minutes",
  argTypes: [{ name: "time", type: "number" }],
  runner: async (e2) => Math.floor(e2.options.time / 6e4)
}), YO = V.FromOptions({
  keyword: "to_seconds",
  argTypes: [{ name: "time", type: "number" }],
  runner: async (e2) => Math.floor(e2.options.time / 1e3)
}), JO = new V(
  "unlock_achievement",
  [{ name: "id", type: "string" }],
  async (e2) => {
    const { id: t } = e2.options;
    fi().unlock(t);
  }
), XO = new V(
  "has_achievement?",
  [{ name: "id", type: "string" }],
  async (e2) => {
    const { id: t } = e2.options;
    return fi().hasAchievement(t);
  }
), ZO = V.FromOptions({
  keyword: "get_setting",
  argTypes: [{ name: "setting", type: "string" }],
  runner: async (e2) => {
    const { setting: t } = e2.options;
    return t || ce(e2, "get_setting command needs a setting id"), En().getSetting(t);
  }
}), eA = V.FromOptions({
  keyword: "set_setting",
  argTypes: [
    { name: "setting", type: "string" },
    { name: "value", type: "any" }
  ],
  runner: async (e2) => {
    const { setting: t, value: n } = e2.options;
    t || ce(e2, "set_setting command needs a setting id"), En().setSetting(t, n);
  }
}), tA = V.FromOptions({
  keyword: "object_entries",
  argTypes: [{ name: "obj", type: "any" }],
  runner: async (e2) => {
    const t = e2.options.obj;
    return typeof t != "object" ? (ce(e2, "Requires an object argument."), []) : Object.entries(t);
  }
}), nA = V.FromOptions({
  keyword: "object_keys",
  argTypes: [{ name: "obj", type: "any" }],
  runner: async (e2) => {
    const t = e2.options.obj;
    return typeof t != "object" ? (ce(e2, "Requires an object argument."), []) : Object.keys(t);
  }
}), rA = V.FromOptions({
  keyword: "object_values",
  argTypes: [{ name: "obj", type: "any" }],
  runner: async (e2) => {
    const t = e2.options.obj;
    return typeof t != "object" ? (ce(e2, "Requires an object argument."), []) : Object.values(t);
  }
}), iA = V.FromOptions({
  keyword: "object_has",
  argTypes: [
    { name: "obj", type: "any" },
    { name: "key", type: "string" }
  ],
  runner: async (e2) => {
    const { obj: t, key: n } = e2.options;
    return typeof t != "object" ? (ce(e2, "Requires an object argument."), false) : Object.hasOwn(t, n);
  }
}), oA = V.FromOptions({
  keyword: "for_of",
  argTypes: [
    { name: "target", type: "any" },
    { name: "predicateLabel", type: "string" },
    { name: "rest", type: "rest", optional: true }
  ],
  runner: async (e2) => {
    const { target: t, predicateLabel: n } = e2.options;
    if (typeof t != "object")
      return ce(e2, "Requires an object argument."), false;
    for (const r of t)
      await Ie().runLabelFunction(n, r, ...e2.args.slice(2));
  }
}), sA = V.FromOptions({
  keyword: "for_in",
  argTypes: [
    { name: "target", type: "any" },
    { name: "predicateLabel", type: "string" },
    { name: "rest", type: "rest", optional: true }
  ],
  runner: async (e2) => {
    const { target: t, predicateLabel: n } = e2.options;
    if (typeof t != "object")
      return ce(e2, "Requires an object argument."), false;
    for (const r in t)
      await Ie().runLabelFunction(
        n,
        r,
        t[r],
        ...e2.args.slice(2)
      );
  }
}), aA = V.FromOptions({
  keyword: "change_scene",
  argTypes: [
    { name: "scene", type: "string" },
    { name: "rest", type: "rest", optional: true }
  ],
  runner: async (e2) => {
    const { scene: t } = e2.options;
    await Jt().changeScene(
      t,
      lA(e2.args.slice(1))
    );
  }
});
function lA(e2) {
  const t = {};
  let n = 0;
  for (; n < e2.length && !(n + 1 >= e2.length); ) {
    const r = e2[n], i = e2[n + 1];
    t[r] = i, n += 2;
  }
  return t;
}
function fo(e2, t, n) {
  if (n >= t) {
    let r = "log";
    switch (t) {
      case tr.ERROR:
        r = "error";
        break;
      case tr.WARN:
        r = "warn";
        break;
    }
    return console.log.bind(console, r, `[${e2}]`);
  } else
    return () => {
    };
}
function cA(e2, t) {
  return {
    error: fo(e2, tr.ERROR, t),
    warn: fo(e2, tr.WARN, t),
    info: fo(e2, tr.INFO, t),
    debug: fo(e2, tr.DEBUG, t)
  };
}
const uA = cA("js-commands", Dh), dA = V.FromOptions({
  keyword: "call_js_method",
  argTypes: [
    { name: "target", type: "any" },
    { name: "method", type: "string" },
    { name: "args", type: "rest", optional: true }
  ],
  runner: async (e2) => {
    const { target: t, method: n } = e2.options, r = e2.args.slice(2);
    let i = t;
    if (typeof t == "string") {
      const s = yl(window, window, t, "");
      if (!s)
        return ce(e2, "target object not found"), null;
      i = s[0][s[1]];
    }
    return typeof i != "object" ? (ce(
      e2,
      `target object not found when trying to call js method ${n} on ${t}`
    ), null) : typeof n != "string" ? (ce(e2, "method name must be a string"), null) : typeof i[n] != "function" ? (ce(e2, `method ${n} not found on target object`), null) : await i[n](...r);
  }
}), fA = V.FromOptions({
  keyword: "run_js",
  argTypes: [{ name: "code", type: "string" }],
  runner: async (e2) => {
    const { code: t } = e2.options, n = Function(`return (${t})`);
    return uA.debug(`Running JS code: ${t}`), n();
  }
});
function pA(e2) {
  e2.addCommand(D1), e2.addCommand(F1), e2.addCommand(y1), e2.addCommand(yk), e2.addCommand(gk), e2.addCommand(vk), e2.addCommand(_k), e2.addCommand(bk), e2.addCommand(h1), e2.addCommand(f1), e2.addCommand(p1), e2.addCommand(m1), e2.addCommand(jk), e2.addCommand(Nk), e2.addCommand(xk), e2.addCommand(Lk), e2.addCommand(Bk), e2.addCommand(Fk), e2.addCommand(Uk), e2.addCommand(lO), e2.addCommand(cO), e2.addCommand(uO), e2.addCommand(dO), e2.addCommand(d1), e2.addCommand(g1), e2.addCommand(v1), e2.addCommand(_1), e2.addCommand(b1), e2.addCommand(T1), e2.addCommand(S1), e2.addCommand(w1), e2.addCommand($1), e2.addCommand(C1), e2.addCommand(k1), e2.addCommand(O1), e2.addCommand(A1), e2.addCommand(P1), e2.addCommand(N1), e2.addCommand(E1), e2.addCommand(I1), e2.addCommand(Mk), e2.addCommand(Rk), e2.addCommand(Gk), e2.addCommand(qk), e2.addCommand(Vk), e2.addCommand(Hk), e2.addCommand(Tk), e2.addCommand(Sk), e2.addCommand(wk), e2.addCommand($k), e2.addCommand(Ck), e2.addCommand(kk), e2.addCommand(Ok), e2.addCommand(Ek), e2.addCommand(Ak), e2.addCommand(Ik), e2.addCommand(Zk), e2.addCommand(e1), e2.addCommand(t1), e2.addCommand(n1), e2.addCommand(c1), e2.addCommand(u1), e2.addCommand(r1), e2.addCommand(i1), e2.addCommand(o1), e2.addCommand(s1), e2.addCommand(a1), e2.addCommand(l1), e2.addCommand(Wk), e2.addCommand(zk), e2.addCommand(Jk), e2.addCommand(Xk), e2.addCommand(Qk), e2.addCommand(Yk), e2.addCommand(ak), e2.addCommand(lk), e2.addCommand(ck), e2.addCommand(fk), e2.addCommand(hk), e2.addCommand(pk), e2.addCommand(mk), e2.addCommand(uk), e2.addCommand(dk), e2.addCommand(Fp), e2.addCommand(H1), e2.addCommand(K1), e2.addCommand(G1), e2.addCommand(W1), e2.addCommand(z1), e2.addCommand(Q1), e2.addCommand(Y1), e2.addCommand(J1), e2.addCommand(X1), e2.addCommand(Z1), e2.addCommand(eO), e2.addCommand(tO), e2.addCommand(nO), e2.addCommand(rO), e2.addCommand(oO), e2.addCommand(iO), e2.addCommand(sO), e2.addCommand(aO), e2.addCommand(fO), e2.addCommand(pO), e2.addCommand(mO), e2.addCommand(hO), e2.addCommand(yO), e2.addCommand(gO), e2.addCommand(vO), e2.addCommand(_O), e2.addCommand(bO), e2.addCommand(TO), e2.addCommand(SO), e2.addCommand(wO), e2.addCommand($O), e2.addCommand(CO), e2.addCommand(kO), e2.addCommand(OO), e2.addCommand(AO), e2.addCommand(EO), e2.addCommand(IO), e2.addCommand(nA), e2.addCommand(rA), e2.addCommand(tA), e2.addCommand(iA), e2.addCommand(oA), e2.addCommand(sA), e2.addCommand(DO), e2.addCommand(RO), e2.addCommand(MO), e2.addCommand(FO), e2.addCommand(UO), e2.addCommand(BO), e2.addCommand(qO), e2.addCommand(VO), e2.addCommand(HO), e2.addCommand(KO), e2.addCommand(GO), e2.addCommand(WO), e2.addCommand(zO), e2.addCommand(QO), e2.addCommand(YO), e2.addCommand(JO), e2.addCommand(XO), e2.addCommand(eA), e2.addCommand(ZO), e2.addCommand(g$), e2.addCommand(aA), e2.addCommand(dA), e2.addCommand(fA);
}
const mA = defineComponent({
  data() {
    return {
      muted: false,
      volumes: [],
      modeNames: {
        master: "Master volume:",
        music: "Music:",
        ambiant: "Ambiant:",
        sound: "Sound effects:"
      }
    };
  },
  mounted() {
    const e2 = Lt(), t = On.Howler.volume();
    this.volumes.push({ mode: "master", volume: t }), e2.modes.forEach((n, r) => {
      this.volumes.push({
        mode: r,
        volume: e2.modes.get(r).options.volume
      });
    });
  },
  methods: {
    changeVolume(e2, t) {
      const n = t.target;
      e2 === "master" ? Lt().setMasterVolume(n.value) : Lt().setModeVolume(e2, n.value);
    },
    toggleMute() {
      this.muted ? (On.Howler.mute(false), this.muted = false) : (On.Howler.mute(true), this.muted = true);
    }
  }
}), hA = { class: "volume-controls" }, yA = /* @__PURE__ */ createElementVNode("h3", { class: "nrt-subtitle" }, "Volume", -1), gA = {
  for: "volume",
  class: "volume-label"
}, vA = ["onUpdate:modelValue", "onChange"];
function _A(e2, t, n, r, i, s) {
  return openBlock(), createElementBlock("div", hA, [
    yA,
    (openBlock(true), createElementBlock(Fragment, null, renderList(e2.volumes, (o, l) => (openBlock(), createElementBlock("div", {
      class: "volume-control",
      key: o.mode
    }, [
      createElementVNode("label", gA, toDisplayString(e2.modeNames[o.mode]), 1),
      withDirectives(createElementVNode("input", {
        ref_for: true,
        ref: "slider",
        class: "volume-slider",
        type: "range",
        id: "volume",
        name: "volume",
        min: "0",
        max: "1",
        step: "0.1",
        "onUpdate:modelValue": (u) => e2.volumes[l].volume = u,
        onChange: (u) => e2.changeVolume(o.mode, u)
      }, null, 40, vA), [
        [vModelText, e2.volumes[l].volume]
      ])
    ]))), 128))
  ]);
}
const bA = /* @__PURE__ */ hn(mA, [["render", _A]]), TA = { class: "settings-widget-container" }, SA = ["for", "id"], wA = ["id", "name", "min", "max", "step"], $A = ["id", "name"], CA = ["id", "name"], kA = { class: "mx-8" }, OA = { class: "text-left setting-description" }, AA = /* @__PURE__ */ createElementVNode("hr", { class: "h-px my-8 bg-gray-200 border-0 dark:bg-gray-700 setting-separator" }, null, -1), EA = /* @__PURE__ */ defineComponent({
  __name: "setting-widget",
  props: {
    settingId: {}
  },
  setup(e2) {
    const t = e2, n = En(), r = computed(() => n.getSetting(t.settingId)), i = ref(r.value), s = computed(() => n.getSettingSchema(t.settingId));
    function o(l) {
      let u = l;
      Ll(s.value) && (u = Math.round(u)), n.setSetting(t.settingId, u);
    }
    return watch(i, (l) => {
      o(l);
    }), (l, u) => (openBlock(), createElementBlock(Fragment, null, [
      createElementVNode("div", TA, [
        createElementVNode("label", {
          for: l.settingId,
          class: "setting-label",
          id: `setting-label-${l.settingId}`
        }, toDisplayString(s.value.name), 9, SA),
        unref(Eh)(s.value) || unref(Ll)(s.value) ? withDirectives((openBlock(), createElementBlock("input", {
          key: 0,
          ref: "slider",
          class: "number-slider setting-slider",
          type: "range",
          id: `setting-slider-${l.settingId}`,
          name: l.settingId,
          min: s.value.minValue,
          max: s.value.maxValue,
          step: s.value.step,
          "onUpdate:modelValue": u[0] || (u[0] = (c) => i.value = c)
        }, null, 8, wA)), [
          [vModelText, i.value]
        ]) : unref(Ih)(s.value) ? withDirectives((openBlock(), createElementBlock("input", {
          key: 1,
          type: "checkbox",
          class: "setting-checkbox",
          id: `setting-checkbox-${l.settingId}`,
          name: l.settingId,
          "onUpdate:modelValue": u[1] || (u[1] = (c) => i.value = c)
        }, null, 8, $A)), [
          [vModelCheckbox, i.value]
        ]) : unref(Ph)(s.value) ? withDirectives((openBlock(), createElementBlock("input", {
          key: 2,
          type: "text",
          class: "setting-text",
          id: `setting-text-${l.settingId}`,
          name: l.settingId,
          "onUpdate:modelValue": u[2] || (u[2] = (c) => i.value = c)
        }, null, 8, CA)), [
          [vModelText, i.value]
        ]) : createCommentVNode("", true),
        createElementVNode("span", kA, toDisplayString(i.value), 1)
      ]),
      createElementVNode("p", OA, toDisplayString(s.value.description), 1),
      AA
    ], 64));
  }
}), IA = { class: "container mx-auto settings-menu-container" }, PA = /* @__PURE__ */ createElementVNode("h2", { class: "settings-menu-title subtitle text-center" }, "Settings", -1), NA = /* @__PURE__ */ defineComponent({
  __name: "settings-menu",
  setup(e2) {
    const t = En(), n = computed(() => t.getAllSettingSchemas());
    return (r, i) => (openBlock(), createElementBlock("div", IA, [
      PA,
      (openBlock(true), createElementBlock(Fragment, null, renderList(n.value, (s, o) => (openBlock(), createBlock(EA, {
        settingId: o,
        key: o
      }, null, 8, ["settingId"]))), 128))
    ]));
  }
}), xA = { class: "menu-content" }, jA = /* @__PURE__ */ defineComponent({
  __name: "MainMenu",
  props: {
    inputListener: {}
  },
  emits: ["close"],
  setup(e2, { emit: t }) {
    const n = e2, r = t, i = ref(null), s = ref(null);
    function o() {
      window.close();
    }
    function l() {
      ff(), u();
    }
    function u() {
      r("close");
    }
    function c() {
      const m = Qr(
        ke().playTime.start,
        ke().playTime.previousPlaytime
      );
      return ia(m / 1e3);
    }
    return onMounted(() => {
      s.value = Wn({
        mode: "list",
        container: i,
        listener: n.inputListener,
        onChosen: (m) => {
          m === 0 ? l() : m === 1 && o();
        }
      }), s.value.mount();
    }), onUnmounted(() => {
      s.value && (s.value.disable(), s.value = null);
    }), (m, a) => (openBlock(), createElementBlock("div", xA, [
      createElementVNode("h3", null, "Play time: " + toDisplayString(c()), 1),
      createVNode(bA),
      createElementVNode("div", {
        ref_key: "mainActions",
        ref: i
      }, [
        createElementVNode("button", {
          class: "nrt-button nrt-title quit-button",
          onClick: l
        }, " Main Menu "),
        createElementVNode("button", {
          class: "nrt-button nrt-title quit-button",
          onClick: o
        }, " Exit ")
      ], 512),
      createVNode(NA)
    ]));
  }
}), LA = { class: "sub-tabs-controller" }, DA = {
  key: 0,
  class: "sub-tabs-controller__tabs"
}, RA = {
  key: 1,
  class: "sub-tab-content"
}, MA = { key: 2 }, FA = /* @__PURE__ */ createElementVNode("div", { class: "sub-tab-content__empty" }, [
  /* @__PURE__ */ createElementVNode("p", null, "No tab selected")
], -1), UA = [
  FA
], BA = /* @__PURE__ */ defineComponent({
  __name: "SubTabController",
  props: {
    tabs: {},
    defaultTab: {},
    inputListener: {}
  },
  emits: ["tab-change", "close"],
  setup(e2, { emit: t }) {
    const n = t, r = e2, i = ref(r.defaultTab);
    function s(l) {
      i.value = l, n("tab-change", l);
    }
    const o = computed(() => r.tabs[i.value]);
    return onMounted(() => {
      r.inputListener.actions.subPreviousTab = {
        press: () => {
          i.value > 0 && s(i.value - 1);
        }
      }, r.inputListener.actions.subNextTab = {
        press: () => {
          i.value < r.tabs.length - 1 && s(i.value + 1);
        }
      };
    }), onUnmounted(() => {
      delete r.inputListener.actions.subPreviousTab, delete r.inputListener.actions.subNextTab;
    }), (l, u) => (openBlock(), createElementBlock("div", LA, [
      l.tabs.length > 1 ? (openBlock(), createElementBlock("div", DA, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(l.tabs, (c, m) => (openBlock(), createBlock(vf, {
          key: c.id,
          tab: c,
          active: m === i.value,
          onClick: () => s(m)
        }, null, 8, ["tab", "active", "onClick"]))), 128))
      ])) : createCommentVNode("", true),
      o.value ? (openBlock(), createElementBlock("div", RA, [
        o.value ? (openBlock(), createBlock(resolveDynamicComponent(o.value.component), mergeProps({
          key: o.value.id,
          inputListener: l.inputListener
        }, o.value.extraProps, {
          onClose: u[0] || (u[0] = (c) => l.$emit("close"))
        }), null, 16, ["inputListener"])) : createCommentVNode("", true)
      ])) : (openBlock(), createElementBlock("div", MA, UA))
    ]));
  }
}), qA = ["onClick"], VA = { class: "item-title" }, HA = { class: "item-amount" }, KA = /* @__PURE__ */ defineComponent({
  __name: "inventory-section",
  props: {
    items: {},
    title: {},
    id: {},
    inputListener: {}
  },
  emits: ["chosen"],
  setup(e2, { emit: t }) {
    const n = e2, r = ref(null), i = ref(null), s = t;
    function o(c) {
      s("chosen", c);
    }
    function l(c) {
      return {
        backgroundImage: `url(${Wt(wn(c).icon)})`
      };
    }
    function u(c) {
      return wn(c).name;
    }
    return onMounted(() => {
      i.value = Wn({
        mode: "grid",
        listener: n.inputListener,
        columns: 3,
        container: r,
        onChosen: (c) => {
          o(n.items[c].id);
        }
      }), i.value.mount();
    }), onUnmounted(() => {
      i.value && (i.value.disable(), i.value = null);
    }), (c, m) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(["inventory-section", `section-${n.id}`])
    }, [
      createElementVNode("h3", null, toDisplayString(c.title), 1),
      createElementVNode("div", {
        class: "inventory-section-items",
        ref_key: "itemsContainer",
        ref: r
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(c.items, (a) => (openBlock(), createElementBlock("button", {
          onClick: () => o(a.id),
          class: normalizeClass(["item-display", `item-${a.id}`]),
          style: normalizeStyle(l(a.id)),
          key: a.id
        }, [
          createElementVNode("h3", VA, toDisplayString(u(a.id)), 1),
          createElementVNode("h3", HA, toDisplayString(a.amount), 1)
        ], 14, qA))), 128))
      ], 512)
    ], 2));
  }
}), GA = { class: "flex flex-row item-description-container" }, WA = { class: "flex item-left" }, zA = { class: "flex item-right" }, QA = /* @__PURE__ */ createElementVNode("hr", { class: "hr-solid" }, null, -1), YA = /* @__PURE__ */ defineComponent({
  __name: "item-details",
  props: {
    item: {}
  },
  emits: ["use", "close"],
  setup(e2, { emit: t }) {
    const n = e2, r = ref(null), i = computed(() => wn(n.item.id)), s = computed(() => ({
      backgroundImage: `url(${Wt(i.value.icon)})`
    })), o = t, l = computed(() => Dt().canUseItem(n.item));
    function u() {
      l.value && o("use");
    }
    function c() {
      o("close");
    }
    return onMounted(() => {
      r.value = at().registerInputListener("item-details", {
        continue: {
          press: () => {
            l.value && u();
          }
        },
        cancel: {
          press: () => {
            c();
          }
        }
      });
    }), onUnmounted(() => {
      r.value && (at().unregisterInputListener(r.value), r.value = null);
    }), (m, a) => (openBlock(), createElementBlock("div", null, [
      createElementVNode("div", GA, [
        createElementVNode("div", WA, [
          createElementVNode("div", {
            class: "item-display",
            style: normalizeStyle(s.value)
          }, null, 4)
        ]),
        createElementVNode("div", zA, [
          createElementVNode("h2", null, toDisplayString(i.value.name), 1),
          QA,
          createElementVNode("h3", null, "Amount: " + toDisplayString(m.item.amount), 1),
          createElementVNode("p", null, toDisplayString(i.value.description), 1),
          createElementVNode("button", {
            onClick: u,
            class: normalizeClass(["nrt-button", l.value ? "" : "nrt-disabled"])
          }, " Use ", 2)
        ])
      ]),
      createElementVNode("button", {
        class: "nrt-button",
        onClick: c
      }, toDisplayString("<--"))
    ]));
  }
}), JA = { key: 0 }, XA = { key: 2 }, ZA = /* @__PURE__ */ createElementVNode("h2", null, "The inventory is empty!", -1), eE = [
  ZA
], tE = /* @__PURE__ */ defineComponent({
  __name: "inventory-ui",
  props: {
    section: {},
    inputListener: {}
  },
  emits: ["close"],
  setup(e2, { emit: t }) {
    const n = Dt(), r = computed(() => n.items), i = ref(false), s = computed(() => i.value ? r.value[i.value] : null);
    function o() {
      jt().closeMenu();
    }
    function l(m) {
      i.value = m;
    }
    function u() {
      i.value = false;
    }
    function c() {
      n.useItem(s.value) && o();
    }
    return (m, a) => !s.value && m.section.items.length > 0 ? (openBlock(), createElementBlock("div", JA, [
      createVNode(KA, {
        items: m.section.items,
        title: m.section.title,
        inputListener: m.inputListener,
        id: m.section.id,
        onChosen: l
      }, null, 8, ["items", "title", "inputListener", "id"])
    ])) : typeof i.value == "string" ? (openBlock(), createBlock(YA, {
      key: 1,
      item: r.value[i.value],
      onUse: c,
      onClose: u
    }, null, 8, ["item"])) : (openBlock(), createElementBlock("div", XA, eE));
  }
}), nE = /* @__PURE__ */ defineComponent({
  __name: "InventoryTab",
  props: {
    inputListener: {}
  },
  setup(e2) {
    const t = Dt(), n = computed(() => t.items), r = computed(() => Object.values(n.value).filter((o) => o.amount > 0 ? true : !!wn(o.id).showIfEmpty)), i = computed(() => {
      const o = et().items.categories, l = [];
      if (o.length > 1) {
        const u = {
          id: "all",
          title: "All",
          items: r.value
        };
        l.push(u);
      }
      for (const u in o) {
        const c = o[u], m = c.id, a = r.value.filter(
          (d) => wn(d.id).category === m
        );
        l.push({
          id: m,
          title: c.title,
          items: a
        });
      }
      return l;
    }), s = computed(() => {
      const o = [];
      return i.value.forEach((l) => {
        o.push({
          id: l.id,
          label: l.title,
          component: tE,
          extraProps: {
            section: l
          }
        });
      }), o;
    });
    return (o, l) => (openBlock(), createElementBlock("div", null, [
      createVNode(BA, {
        tabs: s.value,
        defaultTab: 0,
        inputListener: o.inputListener
      }, null, 8, ["tabs", "inputListener"])
    ]));
  }
}), rE = ["id"], iE = { class: "obtained-status" }, oE = { class: "achievement-title" }, sE = { class: "achievement-description" }, aE = /* @__PURE__ */ defineComponent({
  __name: "achievement-tile",
  props: {
    achievement: {}
  },
  setup(e2) {
    const t = e2, n = fi(), r = computed(
      () => n.getExistingAchievement(t.achievement)
    ), i = computed(() => hl(t.achievement)), s = Hi().secretAchievements ?? {
      censorName: true,
      censorDescription: true
    }, o = computed(() => {
      let m = r.value.unlocked ? i.value.icon : i.value.lockedIcon;
      return m || (m = Hi().defaultAchievementIcon), {
        backgroundImage: `url(${Wt(m)})`
      };
    }), l = computed(() => !i.value.secret || !s.censorName ? i.value.name : "Hidden Achievement"), u = computed(() => !i.value.secret || !s.censorDescription ? i.value.description : "This achievement is hidden. Complete it to discover more."), c = computed(() => r.value.unlocked ? `Obtained ${new Date(r.value.unlockTime).toLocaleDateString()}` : "Not obtained yet");
    return (m, a) => (openBlock(), createElementBlock("div", {
      class: "achievement-display nrt-tile",
      id: `achievement-${m.achievement}`
    }, [
      createElementVNode("div", {
        class: "achievement-icon",
        style: normalizeStyle(o.value)
      }, null, 4),
      createElementVNode("p", iE, toDisplayString(c.value), 1),
      createElementVNode("h3", oE, toDisplayString(l.value), 1),
      createElementVNode("p", sE, toDisplayString(u.value), 1)
    ], 8, rE));
  }
}), lE = { class: "achievements-section-achievements" }, cE = /* @__PURE__ */ defineComponent({
  __name: "achievements-section",
  props: {
    achievements: {},
    title: {},
    id: {}
  },
  setup(e2) {
    const t = e2;
    return (n, r) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(["achievements-section", `section-${t.id}`])
    }, [
      createElementVNode("h3", null, toDisplayString(n.title), 1),
      createElementVNode("div", lE, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(n.achievements, (i) => (openBlock(), createBlock(aE, {
          achievement: i.id,
          key: i.id
        }, null, 8, ["achievement"]))), 128))
      ])
    ], 2));
  }
}), uE = defineComponent({
  setup() {
    const e2 = fi(), t = Ye(), n = computed(() => e2.achievements), r = computed(() => t.currentDialog.choices);
    return { achievements: n, currentlyChoosing: r };
  },
  emits: ["close"],
  data() {
    return {
      chosenId: false
    };
  },
  mounted() {
  },
  methods: {
    close() {
      this.$emit("close");
    },
    clickAchievement(e2) {
      this.chosenId = e2;
    },
    closeAchievement() {
      this.chosenId = false;
    }
  },
  computed: {
    achievementsToDisplay() {
      return Object.values(this.achievements);
    },
    chosenAchievement() {
      return this.chosenId ? this.achievements[this.chosenId] : null;
    },
    chosenAchievementConf() {
      return this.chosenId ? this.achievementConf[this.chosenId] : null;
    },
    achievementConf() {
      return et().achievements.achievements;
    },
    sections() {
      const e2 = et().achievements.categories, t = [];
      return this.achievementsToDisplay.reduce(
        (r, i) => {
          const s = hl(i.id).category ?? "default", o = e2.find((u) => u.id === s);
          if (!o)
            return ue(`Unknown category ${s}`), r;
          let l = r.find((u) => u.id === s);
          return l || (l = {
            id: s,
            title: o.title,
            achievements: []
          }, r.push(l)), l.achievements.push(i), r;
        },
        t
      );
    }
  },
  components: { AchievementsSection: cE }
}), dE = { key: 0 }, fE = { key: 1 }, pE = /* @__PURE__ */ createElementVNode("h2", null, "The achievements section is empty!", -1), mE = [
  pE
];
function hE(e2, t, n, r, i, s) {
  const o = resolveComponent("AchievementsSection");
  return Object.keys(e2.achievementsToDisplay).length > 0 ? (openBlock(), createElementBlock("div", dE, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(e2.sections, (l) => (openBlock(), createBlock(o, {
      key: l.id,
      achievements: l.achievements,
      title: l.title,
      id: l.id,
      onChosen: e2.clickAchievement
    }, null, 8, ["achievements", "title", "id", "onChosen"]))), 128))
  ])) : (openBlock(), createElementBlock("div", fE, mE));
}
const yE = /* @__PURE__ */ hn(uE, [["render", hE]]), gE = { class: "quest-display" }, vE = { class: "quest-title" }, _E = { class: "quest-description" }, bE = {
  key: 0,
  class: "quest-objectives-container list-disc"
}, TE = /* @__PURE__ */ defineComponent({
  __name: "QuestDetails",
  props: {
    quest: {}
  },
  setup(e2) {
    const t = e2, n = computed(() => ar(t.quest.id));
    function r(l) {
      return Mo(t.quest.id, l);
    }
    const i = computed(() => {
      switch (t.quest.state) {
        case "hidden":
          return " Hidden";
        case "unlocked":
          return "";
        case "completed":
          return " (Completed)";
        default:
          return " Unknown";
      }
    }), s = computed(() => t.quest.ending ? Op(t.quest.id, t.quest.ending).description : t.quest.succeeded && n.value.succeededDescription ? n.value.succeededDescription : !t.quest.succeeded && n.value.failedDescription ? n.value.failedDescription : n.value.description), o = computed(() => Object.values(t.quest.objectives).filter(
      (l) => l.state !== "hidden"
    ));
    return (l, u) => (openBlock(), createElementBlock("div", gE, [
      createElementVNode("div", {
        class: normalizeClass([
          "quest-header",
          l.quest.state === "completed" ? "quest-completed" : "quest-in-progress"
        ])
      }, [
        createElementVNode("h3", vE, toDisplayString(n.value.title) + " " + toDisplayString(i.value), 1)
      ], 2),
      createElementVNode("p", _E, toDisplayString(s.value), 1),
      l.quest.state !== "completed" ? (openBlock(), createElementBlock("ul", bE, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(o.value, (c) => (openBlock(), createElementBlock("li", {
          class: "quest-objective-display",
          key: c.id
        }, [
          createElementVNode("p", {
            class: normalizeClass([
              "quest-objective-description",
              c.state === "completed" ? "quest-objective-completed" : "quest-objctive-in-progress"
            ])
          }, toDisplayString(r(c.id).description), 3)
        ]))), 128))
      ])) : createCommentVNode("", true)
    ]));
  }
}), SE = { class: "quest-list-title" }, wE = /* @__PURE__ */ defineComponent({
  __name: "QuestDisplay",
  props: {
    quest: {}
  },
  setup(e2) {
    const t = e2, n = computed(() => ar(t.quest.id));
    return (r, i) => (openBlock(), createElementBlock("div", {
      class: normalizeClass([
        "quest-list-display",
        r.quest.state === "completed" ? "quest-list-completed" : "quest-list-in-progress"
      ])
    }, [
      createElementVNode("p", SE, toDisplayString(n.value.title), 1)
    ], 2));
  }
}), $E = { key: 0 }, CE = { key: 0 }, kE = { key: 1 }, OE = /* @__PURE__ */ defineComponent({
  __name: "quests-list-section",
  props: {
    quests: {},
    sectionId: {},
    title: {},
    fallbackText: {}
  },
  emits: ["quest-selected"],
  setup(e2, { emit: t }) {
    const n = e2, r = computed(() => is().categories), i = computed(() => {
      const s = [];
      return n.quests.reduce((l, u) => {
        const c = ar(u.id).category ?? "default", m = r.value.find(
          (d) => d.id === c
        );
        if (!m)
          return ue(`Quest category ${c} not found in config`), l;
        let a = l.find((d) => d.category.id === c);
        return a || (a = {
          category: m,
          quests: []
        }, l.push(a)), a.quests.push(u), l;
      }, s);
    });
    return (s, o) => (openBlock(), createElementBlock("div", {
      class: normalizeClass([`${s.sectionId}-quests-container`, "quests-section"])
    }, [
      createElementVNode("h3", null, toDisplayString(s.title), 1),
      s.quests.length > 0 ? (openBlock(), createElementBlock("div", $E, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(i.value, (l) => (openBlock(), createElementBlock("div", {
          class: normalizeClass([`${s.sectionId}-${l.category.id}-category`, "quests-category"]),
          key: l.category.id
        }, [
          r.value.length > 1 ? (openBlock(), createElementBlock("h4", CE, toDisplayString(l.category.title), 1)) : createCommentVNode("", true),
          createElementVNode("div", {
            class: normalizeClass(`${s.sectionId}-${l.category.id}-quests`)
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(l.quests, (u) => (openBlock(), createBlock(wE, {
              key: u.id,
              quest: u,
              onClick: (c) => s.$emit("quest-selected", u)
            }, null, 8, ["quest", "onClick"]))), 128))
          ], 2)
        ], 2))), 128))
      ])) : (openBlock(), createElementBlock("div", kE, [
        createElementVNode("p", null, toDisplayString(s.fallbackText), 1)
      ]))
    ], 2));
  }
}), AE = defineComponent({
  setup() {
    const e2 = Pt(), t = computed(() => e2.quests), n = ref(null);
    return { quests: t, selectedQuest: n };
  },
  computed: {
    questsToDisplay() {
      return Object.values(this.quests).filter(
        (e2) => e2.state !== "hidden"
      );
    },
    activeQuests() {
      return this.questsToDisplay.filter((e2) => e2.state === "unlocked");
    },
    completedQuests() {
      return this.questsToDisplay.filter(
        (e2) => e2.state === "completed"
      );
    },
    questsUiClass() {
      return gt().layoutMode === "horizontal" ? "quests-ui-horizontal" : "quests-ui-vertical";
    }
  },
  mounted() {
    this.activeQuests.length > 0 ? this.selectedQuest = this.activeQuests[0] : this.completedQuests.length > 0 && (this.selectedQuest = this.completedQuests[0]);
  },
  methods: {
    clickOnQuest(e2) {
      this.selectedQuest = e2;
    }
  },
  components: { QuestDetails: TE, QuestsListSection: OE }
}), EE = { class: "quests-list-container" }, IE = { class: "quest-details" };
function PE(e2, t, n, r, i, s) {
  const o = resolveComponent("QuestsListSection"), l = resolveComponent("QuestDetails");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["quests-ui", e2.questsUiClass])
  }, [
    createElementVNode("div", EE, [
      createVNode(o, {
        quests: e2.activeQuests,
        sectionId: "active",
        title: "Active Quests",
        fallbackText: "No active quests",
        onQuestSelected: e2.clickOnQuest
      }, null, 8, ["quests", "onQuestSelected"]),
      createVNode(o, {
        quests: e2.completedQuests,
        sectionId: "completed",
        title: "Completed Quests",
        fallbackText: "No completed quests",
        onQuestSelected: e2.clickOnQuest
      }, null, 8, ["quests", "onQuestSelected"])
    ]),
    createElementVNode("div", IE, [
      e2.selectedQuest ? (openBlock(), createBlock(l, {
        key: 0,
        quest: e2.selectedQuest
      }, null, 8, ["quest"])) : createCommentVNode("", true)
    ])
  ], 2);
}
const NE = /* @__PURE__ */ hn(AE, [["render", PE]]);
function Vp(e2) {
  const t = vt(), n = computed(() => t.skills), r = computed(() => n.value[e2]), i = computed(() => Bn().skills), s = computed(() => Bn().skillOptions.xpPerLevel), o = computed(() => ({
    backgroundImage: `url(${Wt(i.value[e2].icon)})`
  })), l = computed(() => i.value[e2].name), u = computed(() => i.value[e2].description), c = computed(() => `Level ${n.value[e2].level}`);
  return {
    skills: n,
    skillsStore: t,
    skillConfig: i,
    xpPerLevel: s,
    skillState: r,
    skillStyle: o,
    skillName: l,
    skillDescription: u,
    skillLevelText: c
  };
}
const xE = (e2) => (pushScopeId("data-v-a94cb74f"), e2 = e2(), popScopeId(), e2), jE = ["id"], LE = { class: "flex flex-row skill-description-container" }, DE = { class: "flex skill-left" }, RE = { class: "flex skill-right" }, ME = /* @__PURE__ */ xE(() => /* @__PURE__ */ createElementVNode("hr", { class: "hr-solid" }, null, -1)), FE = ["innerHTML"], UE = /* @__PURE__ */ defineComponent({
  __name: "SkillDetails",
  props: {
    chosenSkill: {},
    inputListener: {}
  },
  emits: ["cancel"],
  setup(e2, { emit: t }) {
    const n = e2, r = t, i = ref(null), s = ref(null);
    function o() {
      r("cancel");
    }
    const { skillStyle: l, skillName: u, skillDescription: c, skillLevelText: m } = Vp(n.chosenSkill);
    return onMounted(() => {
      i.value = Wn({
        mode: "list",
        listener: n.inputListener,
        container: s,
        onChosen: () => {
          o();
        }
      }), i.value.mount();
    }), onUnmounted(() => {
      i.value && (i.value.disable(), i.value = null);
    }), (a, d) => (openBlock(), createElementBlock("div", {
      id: `skill-display-${a.chosenSkill}`
    }, [
      createElementVNode("div", LE, [
        createElementVNode("div", DE, [
          createElementVNode("div", {
            class: "skill-display",
            style: normalizeStyle(unref(l))
          }, null, 4)
        ]),
        createElementVNode("div", RE, [
          createElementVNode("h2", null, toDisplayString(unref(u)), 1),
          ME,
          createElementVNode("h3", null, toDisplayString(unref(m)), 1),
          createElementVNode("p", { innerHTML: unref(c) }, null, 8, FE)
        ])
      ]),
      createElementVNode("div", {
        ref_key: "buttonsContainer",
        ref: s
      }, [
        createElementVNode("button", {
          class: "nrt-button",
          onClick: o
        }, toDisplayString("<--"))
      ], 512)
    ], 8, jE));
  }
}), BE = /* @__PURE__ */ hn(UE, [["__scopeId", "data-v-a94cb74f"]]), qE = { class: "skill-title" }, VE = { class: "skill-xp-container" }, HE = { class: "skill-xp-text" }, KE = { class: "skill-level" }, GE = /* @__PURE__ */ defineComponent({
  __name: "SkillGridElement",
  props: {
    chosenSkill: {},
    inputListener: {}
  },
  emits: ["choose"],
  setup(e2, { expose: t, emit: n }) {
    const r = e2, i = ref(null);
    t({
      gridElement: i
    });
    const s = n;
    function o() {
      s("choose");
    }
    const { skillStyle: l, skillName: u, skillState: c, xpPerLevel: m } = Vp(
      r.chosenSkill
    ), a = computed(() => ({
      width: `${Math.floor(c.value.xp / m.value * 100)}%`
    }));
    return (d, p) => (openBlock(), createElementBlock("button", {
      onClick: o,
      class: "skill-grid-element",
      style: normalizeStyle(unref(l)),
      ref_key: "gridElement",
      ref: i
    }, [
      createElementVNode("h3", qE, toDisplayString(unref(u)), 1),
      createElementVNode("div", VE, [
        createElementVNode("div", {
          class: "skill-xp-bar",
          style: normalizeStyle(a.value)
        }, null, 4),
        createElementVNode("h3", HE, toDisplayString(unref(c).xp) + " / " + toDisplayString(unref(m)) + " XP", 1)
      ]),
      createElementVNode("h3", KE, toDisplayString(unref(c).level), 1)
    ], 4));
  }
}), WE = /* @__PURE__ */ hn(GE, [["__scopeId", "data-v-8d457bf9"]]), zE = { class: "skills-container" }, QE = /* @__PURE__ */ defineComponent({
  __name: "SkillsGrid",
  props: {
    inputListener: {},
    lastChosenSkill: { type: [String, Boolean] }
  },
  emits: ["choose"],
  setup(e2, { emit: t }) {
    const n = e2, r = ref([]), i = computed(() => r.value.map((d) => d.gridElement)), s = vt(), o = computed(() => s.skills), l = ref(null), u = t;
    function c(d) {
      u("choose", d);
    }
    const m = computed(() => Bn().skills), a = computed(() => {
      const d = {};
      for (const p in o.value)
        m.value[p].hidden && o.value[p].level < 1 || (d[p] = o.value[p]);
      return Object.values(d);
    });
    return onMounted(() => {
      var d;
      if (l.value = Wn({
        mode: "grid",
        listener: n.inputListener,
        elements: i,
        columns: 3,
        onChosen: (p) => {
          c(a.value[p].id);
        }
      }), (d = l.value) == null || d.mount(), typeof n.lastChosenSkill == "string") {
        const p = a.value.findIndex(
          (h) => h.id === n.lastChosenSkill
        );
        p >= 0 && l.value.select(p);
      }
    }), onUnmounted(() => {
      l.value && l.value.disable();
    }), (d, p) => (openBlock(), createElementBlock("div", zE, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(a.value, (h) => (openBlock(), createBlock(WE, {
        ref_for: true,
        ref_key: "skillGridElements",
        ref: r,
        key: h.id,
        onChoose: () => c(h.id),
        chosenSkill: h.id,
        inputListener: d.inputListener
      }, null, 8, ["onChoose", "chosenSkill", "inputListener"]))), 128))
    ]));
  }
}), YE = /* @__PURE__ */ hn(QE, [["__scopeId", "data-v-31202bb8"]]), JE = /* @__PURE__ */ defineComponent({
  __name: "SkillsWindow",
  props: {
    inputListener: {}
  },
  setup(e2) {
    const t = ref(false), n = ref(false);
    function r(s) {
      n.value = s, t.value = s;
    }
    function i() {
      t.value = false;
    }
    return (s, o) => t.value ? typeof t.value == "string" ? (openBlock(), createBlock(BE, {
      key: 1,
      chosenSkill: t.value,
      inputListener: s.inputListener,
      onCancel: i
    }, null, 8, ["chosenSkill", "inputListener"])) : createCommentVNode("", true) : (openBlock(), createBlock(YE, {
      key: 0,
      inputListener: s.inputListener,
      lastChosenSkill: n.value,
      onChoose: r
    }, null, 8, ["inputListener", "lastChosenSkill"]));
  }
});
function XE(e2) {
  e2.component("MainMenu", jA), e2.component("InventoryTab", nE), e2.component("AchievementsUI", yE), e2.component("QuestsUi", NE), e2.component("SkillsWindow", JE), jt().menus = {
    system: {
      label: "System",
      cssClass: "system-menu",
      id: "system",
      tabs: [
        {
          id: "system-tab",
          cssId: "system-tab",
          text: "System",
          component: "MainMenu"
        }
      ],
      activeTab: 0
    },
    menu: {
      label: "Menu",
      id: "menu",
      cssClass: "menu-menu",
      tabs: [
        {
          id: "skills",
          cssId: "skills-menu-button",
          text: "Skills",
          condition: () => jt().showSkills,
          component: "SkillsWindow"
        },
        {
          id: "inventory",
          cssId: "inventory-menu-button",
          text: "Items",
          condition: () => jt().showInventory,
          component: "InventoryTab"
        },
        {
          id: "quests",
          cssId: "quests-menu-button",
          text: "Quests",
          condition: () => jt().showQuests,
          component: "QuestsUi"
        },
        {
          id: "achievements",
          cssId: "achievements-menu-button",
          text: "Achievements",
          condition: () => jt().showAchievements,
          component: "AchievementsUI"
        }
      ],
      activeTab: 0
    }
  };
}
function Hp(e2, t, n) {
  const r = window.narrat.app;
  for (const i in t.tabs) {
    const s = t.tabs[i].component;
    r.component(s, n[s]);
  }
  jt().addMenu(e2, t);
}
function ZE(e2, t, n) {
  window.narrat.app.component(t.component, n), jt().addMenuOption(e2, t);
}
function eI() {
  for (const e2 of Re.plugins) {
    if (e2.customMenuButtons)
      for (const t of e2.customMenuButtons)
        Hp(t.config.id, t.config, t.components);
    if (e2.customMenuTabs)
      for (const t of e2.customMenuTabs)
        ZE(t.config.id, t.config, t.component);
  }
}
function tI(e2) {
  e2.directive("visible", {
    mounted(t, n) {
      n.value ? t.style.visibility = "visible" : t.style.visibility = "hidden";
    },
    updated(t, n) {
      n.value ? t.style.visibility = "visible" : t.style.visibility = "hidden";
    }
  });
}
class bl {
  constructor() {
    qe(this, "pluginId", "narrat-plugin");
  }
  onPageLoaded() {
  }
  onNarratSetup() {
  }
  onAppMounted() {
  }
  onAssetsLoaded() {
  }
  onGameSetup() {
  }
  onGameStart() {
  }
  onGameMounted() {
  }
  onGameDismounted() {
  }
}
function nI(e2) {
  Re.addPlugin(e2);
}
function rI(e2) {
  Re.addCommand(e2);
}
const iI = {
  args: [],
  canvasResizePolicy: 0,
  executable: "",
  experimentalVK: false,
  fileSizes: { "index.pck": 54160, "index.wasm": 52315256 },
  focusCanvas: false,
  gdextensionLibs: []
};
function oI() {
  window.godotReady = true, window.narratReadyCallback && window.narratReadyCallback(), console.log("godot ready");
}
window.godotReadyCallback = oI;
class sI extends bl {
  constructor(n) {
    super();
    qe(this, "customCommands", []);
    qe(this, "canvas");
    qe(this, "app");
    qe(this, "messageQueue", []);
    qe(this, "narrat");
    qe(this, "narratReady", false);
    qe(this, "engineConfig");
    qe(this, "engine");
    const r = {
      ...iI,
      ...n.engineConfigOverrides ?? {}
    };
    n.godotGamePath && (r.executable = n.godotGamePath), this.engineConfig = r, this.customCommands = [
      V.FromOptions({
        keyword: "godot_pause",
        argTypes: [],
        runner: async (i) => {
          this.addMessageForGodot({
            type: "pause",
            payload: {}
          });
        }
      }),
      V.FromOptions({
        keyword: "godot_resume",
        argTypes: [],
        runner: async (i) => {
          this.addMessageForGodot({
            type: "resume",
            payload: {}
          });
        }
      })
    ];
  }
  onAppMounted() {
    const n = document.querySelector("#narrat");
    if (!n) {
      console.error("no app");
      return;
    }
    this.narrat = window.narrat;
    const r = document.createElement("canvas");
    this.app = n, this.canvas = r, r.id = "godot-canvas", r.style.position = "absolute", r.style.zIndex = "0", n.appendChild(r), window.addEventListener("keydown", (s) => {
      if (s.fakeEvent)
        return;
      const o = new KeyboardEvent(s.type, s);
      o.fakeEvent = true, this.canvas.dispatchEvent(o);
    }), window.addEventListener("keyup", (s) => {
      if (s.fakeEvent)
        return;
      const o = new KeyboardEvent(s.type, s);
      o.fakeEvent = true, this.canvas.dispatchEvent(o);
    }), new window.Engine(this.engineConfig).startGame(), this.resizeCanvas(), window.godot = this, this.narratReady = true, window.narratReadyCallback && window.narratReadyCallback();
  }
  getCanvas() {
    return document.querySelector("#godot-canvas");
  }
  addMessageForGodot(n) {
    this.messageQueue.unshift(n), window.godotCallback && window.godotCallback(n);
  }
  grabNextMessage() {
    return this.messageQueue.pop();
  }
  async run(n, ...r) {
    const i = await this.narrat.run(n, ...r), s = {
      type: "run_end",
      payload: {
        label: n,
        args: r,
        result: i
      }
    };
    this.addMessageForGodot(s);
  }
  isJson(n) {
    try {
      JSON.parse(n);
    } catch {
      return false;
    }
    return true;
  }
  resizeCanvas() {
    const n = gt(), r = n.gameWidth, i = n.gameHeight;
    this.canvas.width = r, this.canvas.height = i, this.canvas.style.width = `${r}px`, this.canvas.style.height = `${i}px`, window.requestAnimationFrame(() => this.resizeCanvas());
  }
}
class aI extends bl {
  constructor(n = {}) {
    super();
    qe(this, "defaultTheme");
    qe(this, "themes", []);
    qe(this, "activeTheme");
    qe(this, "customCommands");
    qe(this, "initialConfig");
    n.defaultTheme && (this.defaultTheme = n.defaultTheme), n.themes && (this.themes = n.themes), this.customCommands = [this.createChangeThemeCommand()];
  }
  onNarratSetup() {
    if (this.defaultTheme) {
      const n = this.themes.find((r) => r.id === this.defaultTheme);
      if (!n) {
        ue(`Theme ${this.defaultTheme} not found`);
        return;
      }
      this.setTheme(n);
    }
  }
  addTheme(n) {
    this.themes.push(n);
  }
  createChangeThemeCommand() {
    return V.FromOptions({
      keyword: "change_theme",
      argTypes: [{ name: "theme", type: "string" }],
      runner: async (r) => {
        this.changeTheme(r.options.theme);
      }
    });
  }
  changeTheme(n) {
    if (n === "default") {
      this.removeCurrentTheme();
      return;
    }
    const r = this.findTheme(n);
    this.setTheme(r);
  }
  findTheme(n) {
    const r = this.themes.find((i) => i.id === n);
    return r || ue(`Theme ${n} not found`), r;
  }
  setTheme(n) {
    this.activeTheme && this.removeCurrentTheme(), this.activeTheme = {
      themeTag: this.createThemeTag(n),
      id: n.id
    }, document.head.appendChild(this.activeTheme.themeTag), n.extendedConfig && (this.initialConfig = Ir({}, Ct().config), Ct().extendConfig(n.extendedConfig));
  }
  createThemeTag(n) {
    if (this.isInlineTheme(n)) {
      const r = document.createElement("style");
      return r.innerHTML = n.css, r;
    } else {
      const r = document.createElement("link");
      return r.rel = "stylesheet", r.href = n.cssPath, r.id = n.id, r;
    }
  }
  isInlineTheme(n) {
    return n.css !== void 0;
  }
  isExternalTheme(n) {
    return n.cssPath !== void 0;
  }
  removeCurrentTheme() {
    this.activeTheme && (this.activeTheme.themeTag && this.activeTheme.themeTag.remove(), this.findTheme(this.activeTheme.id).extendedConfig && (Ct().config = this.initialConfig)), this.activeTheme = void 0;
  }
}
const lI = "body{font-size:52px}", cI = {
  css: lI,
  id: "narrat-fun-theme",
  extendedConfig: {}
}, uI = "#narrat-app{--bg-color: #131720;--text-color: #d9e1f2;--primary: hsl(255, 30%, 55%);--focus: hsl(210, 90%, 50%);--secondary: #42b983;--dialog-box-bg: transparent;--dialog-box-border: none}.interact-button{background:unset;border:none;font-size:2rem;font-weight:700;color:#fff;font-family:monospace;text-shadow:-4px 4px 2px #000}.dialog{box-shadow:none!important;text-align:center}.dialog-text{font-size:1.5rem;font-family:monospace;text-shadow:-4px 4px 2px #000}", dI = {
  id: "narrat-text-only",
  css: uI,
  extendedConfig: {
    common: {
      dialogPanel: {
        textSpeed: 30,
        animateText: true,
        timeBetweenLines: 100,
        overlayMode: true,
        rightOffset: 300,
        bottomOffset: 150,
        width: 700,
        height: 680
      }
    }
  }
}, fI = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BaseConfigInputSchema: wa,
  CommandPlugin: V,
  ConfigInputSchema: Lf,
  ConfigInputSchemaWithCommon: xf,
  ConfigInputSchemaWithoutCommon: jf,
  EngineSplash: af,
  GameDialog: gf,
  GameSplash: cf,
  GodotPlugin: sI,
  Hud: Sf,
  InGame: wf,
  InputsListener: df,
  LogManager: na,
  MenuButtons: _f,
  ModalWindow: lr,
  NarratPlugin: bl,
  NarratThemesPlugin: aI,
  Screens: Tf,
  StartMenu: mf,
  get Vec2() {
    return Yr;
  },
  addCommand: rI,
  aspectRatioFit: lf,
  audioConfig: rn,
  buttonsConfig: dl,
  charactersConfig: fl,
  constructNarratObject: Kp,
  debounce: Jo,
  error: ue,
  findVariable: su,
  funTheme: cI,
  gameloop: Yo,
  generateObjectFromList: lu,
  generateParser: Xi,
  getAssetUrl: Wt,
  getButtonConfig: kr,
  getConfig: de,
  getDataUrl: ml,
  getFile: va,
  getImageUrl: eo,
  getItemConfig: wn,
  getObjectiveConfig: Mo,
  getQuestConfig: ar,
  getScreenConfig: Zi,
  getSkillConfig: pl,
  getSplitConfigUrl: kp,
  getWindow: la,
  handleHMR: _p,
  inputEvents: mn,
  isConfigInputWithCommon: $a,
  isModuleValid: vp,
  isNarratScript: bp,
  isNarratYaml: cl,
  isPromise: cu,
  itemsConfig: ul,
  loadDataFile: zo,
  logManager: ra,
  logger: fn,
  processText: Vn,
  questsConfig: is,
  randomId: ti,
  registerMenuButton: Hp,
  registerPlugin: nI,
  screensConfig: Hs,
  skillsConfig: Bn,
  textOnlyTheme: dI,
  timeout: Kt,
  tooltipsConfig: Cr,
  useAchievements: fi,
  useAudio: Lt,
  useConfig: Ct,
  useDialogStore: Ye,
  useHud: Xt,
  useInputs: at,
  useInventory: Dt,
  useMain: ke,
  useMenu: jt,
  useNotifications: qt,
  useQuests: Pt,
  useRenderingStore: gt,
  useScenes: Jt,
  useScreenObjects: on,
  useScreens: pn,
  useSkills: vt,
  useTooltips: Gi,
  useVM: Ie,
  warning: li
}, Symbol.toStringTag, { value: "Module" }));
function Kp(e2) {
  const t = {
    app: e2,
    vm: Re,
    handleHMR: _p,
    jump: (n) => Ie().jumpToLabel(n),
    run: (n, ...r) => Ie().runThenGoBackToPreviousDialog(n, ...r),
    getSave: () => Gn(),
    exports: fI
  };
  return window.narrat = t, t;
}
var pI = Object.prototype.toString, Gp = function(t) {
  if (t === void 0)
    return "undefined";
  if (t === null)
    return "null";
  var n = typeof t;
  if (n === "boolean")
    return "boolean";
  if (n === "string")
    return "string";
  if (n === "number")
    return "number";
  if (n === "symbol")
    return "symbol";
  if (n === "function")
    return vI(t) ? "generatorfunction" : "function";
  if (mI(t))
    return "array";
  if (TI(t))
    return "buffer";
  if (bI(t))
    return "arguments";
  if (yI(t))
    return "date";
  if (hI(t))
    return "error";
  if (gI(t))
    return "regexp";
  switch (Wp(t)) {
    case "Symbol":
      return "symbol";
    case "Promise":
      return "promise";
    case "WeakMap":
      return "weakmap";
    case "WeakSet":
      return "weakset";
    case "Map":
      return "map";
    case "Set":
      return "set";
    case "Int8Array":
      return "int8array";
    case "Uint8Array":
      return "uint8array";
    case "Uint8ClampedArray":
      return "uint8clampedarray";
    case "Int16Array":
      return "int16array";
    case "Uint16Array":
      return "uint16array";
    case "Int32Array":
      return "int32array";
    case "Uint32Array":
      return "uint32array";
    case "Float32Array":
      return "float32array";
    case "Float64Array":
      return "float64array";
  }
  if (_I(t))
    return "generator";
  switch (n = pI.call(t), n) {
    case "[object Object]":
      return "object";
    case "[object Map Iterator]":
      return "mapiterator";
    case "[object Set Iterator]":
      return "setiterator";
    case "[object String Iterator]":
      return "stringiterator";
    case "[object Array Iterator]":
      return "arrayiterator";
  }
  return n.slice(8, -1).toLowerCase().replace(/\s/g, "");
};
function Wp(e2) {
  return typeof e2.constructor == "function" ? e2.constructor.name : null;
}
function mI(e2) {
  return Array.isArray ? Array.isArray(e2) : e2 instanceof Array;
}
function hI(e2) {
  return e2 instanceof Error || typeof e2.message == "string" && e2.constructor && typeof e2.constructor.stackTraceLimit == "number";
}
function yI(e2) {
  return e2 instanceof Date ? true : typeof e2.toDateString == "function" && typeof e2.getDate == "function" && typeof e2.setDate == "function";
}
function gI(e2) {
  return e2 instanceof RegExp ? true : typeof e2.flags == "string" && typeof e2.ignoreCase == "boolean" && typeof e2.multiline == "boolean" && typeof e2.global == "boolean";
}
function vI(e2, t) {
  return Wp(e2) === "GeneratorFunction";
}
function _I(e2) {
  return typeof e2.throw == "function" && typeof e2.return == "function" && typeof e2.next == "function";
}
function bI(e2) {
  try {
    if (typeof e2.length == "number" && typeof e2.callee == "function")
      return true;
  } catch (t) {
    if (t.message.indexOf("callee") !== -1)
      return true;
  }
  return false;
}
function TI(e2) {
  return e2.constructor && typeof e2.constructor.isBuffer == "function" ? e2.constructor.isBuffer(e2) : false;
}
/*!
 * shallow-clone <https://github.com/jonschlinkert/shallow-clone>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */
const jc = Symbol.prototype.valueOf, SI = Gp;
function wI(e2, t) {
  switch (SI(e2)) {
    case "array":
      return e2.slice();
    case "object":
      return Object.assign({}, e2);
    case "date":
      return new e2.constructor(Number(e2));
    case "map":
      return new Map(e2);
    case "set":
      return new Set(e2);
    case "buffer":
      return OI(e2);
    case "symbol":
      return AI(e2);
    case "arraybuffer":
      return CI(e2);
    case "float32array":
    case "float64array":
    case "int16array":
    case "int32array":
    case "int8array":
    case "uint16array":
    case "uint32array":
    case "uint8clampedarray":
    case "uint8array":
      return kI(e2);
    case "regexp":
      return $I(e2);
    case "error":
      return Object.create(e2);
    default:
      return e2;
  }
}
function $I(e2) {
  const t = e2.flags !== void 0 ? e2.flags : /\w+$/.exec(e2) || void 0, n = new e2.constructor(e2.source, t);
  return n.lastIndex = e2.lastIndex, n;
}
function CI(e2) {
  const t = new e2.constructor(e2.byteLength);
  return new Uint8Array(t).set(new Uint8Array(e2)), t;
}
function kI(e2, t) {
  return new e2.constructor(e2.buffer, e2.byteOffset, e2.length);
}
function OI(e2) {
  const t = e2.length, n = Buffer.allocUnsafe ? Buffer.allocUnsafe(t) : Buffer.from(t);
  return e2.copy(n), n;
}
function AI(e2) {
  return jc ? Object(jc.call(e2)) : {};
}
var EI = wI;
/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
var II = function(t) {
  return t != null && typeof t == "object" && Array.isArray(t) === false;
};
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
var PI = II;
function Lc(e2) {
  return PI(e2) === true && Object.prototype.toString.call(e2) === "[object Object]";
}
var NI = function(t) {
  var n, r;
  return !(Lc(t) === false || (n = t.constructor, typeof n != "function") || (r = n.prototype, Lc(r) === false) || r.hasOwnProperty("isPrototypeOf") === false);
};
const xI = EI, jI = Gp, LI = NI;
function Tl(e2, t) {
  switch (jI(e2)) {
    case "object":
      return DI(e2, t);
    case "array":
      return RI(e2, t);
    default:
      return xI(e2);
  }
}
function DI(e2, t) {
  if (typeof t == "function")
    return t(e2);
  if (t || LI(e2)) {
    const n = new e2.constructor();
    for (let r in e2)
      n[r] = Tl(e2[r], t);
    return n;
  }
  return e2;
}
function RI(e2, t) {
  const n = new e2.constructor(e2.length);
  for (let r = 0; r < e2.length; r++)
    n[r] = Tl(e2[r], t);
  return n;
}
var MI = Tl;
const FI = /* @__PURE__ */ ta(MI);
let bn;
Re.callHook("onPageLoaded");
async function UI(e2) {
  Yo.setup(), console.log("Starting narrat...");
  const t = Object.assign(vT(), e2), n = Jm();
  bn = createApp(sk, {
    options: t
  }), bn.use(n), Xb(), ke().setOptions(t), tI(bn);
  const r = await $$(t);
  Ct().setConfig(r), Gn(), at().setupInputs(), Re.pinia = n, ke(), Kp(bn), XE(bn), eI(), ba().addButtonsFromPlugins(), pA(Re), ra.setupDebugger(t.debug), console.log(
    `%c 🐀 Narrat v${jh} %c PRODUCTION BUILD %c https://narrat.dev %c
    Built at ${Lh.toLocaleString()}
    Branch: ${Dl.branch}
    Commit: ${Dl.commit}`,
    "font-size: 2rem; background: #222; color: orange",
    "font-size: 2rem; background: #222; color: #f00",
    "font-size: 1rem;",
    "font-size: 1.3rem; background: #222; color: #bada55"
  ), Re.callHook("onNarratSetup");
  let i;
  return typeof t.container == "string" ? i = document.querySelector(t.container) : i = t.container, i || alert("The narrat container was not found!"), gt().setContainer(i), at().listenToContainerInputs(), bn.mount(i), gt().narratAppElement = document.querySelector("#narrat-app"), i.focus(), bn;
}
async function BI() {
  bn.unmount(), bn = null;
}
async function HI() {
  const e2 = FI(ke().options);
  return await BI(), await UI(e2);
}
function KI(e2, t) {
  bn.component(e2, t);
}
export {
  wa as BaseConfigInputSchema,
  V as CommandPlugin,
  Lf as ConfigInputSchema,
  xf as ConfigInputSchemaWithCommon,
  jf as ConfigInputSchemaWithoutCommon,
  af as EngineSplash,
  gf as GameDialog,
  cf as GameSplash,
  sI as GodotPlugin,
  Sf as Hud,
  wf as InGame,
  df as InputsListener,
  na as LogManager,
  _f as MenuButtons,
  lr as ModalWindow,
  bl as NarratPlugin,
  aI as NarratThemesPlugin,
  Tf as Screens,
  mf as StartMenu,
  Yr as Vec2,
  rI as addCommand,
  lf as aspectRatioFit,
  rn as audioConfig,
  dl as buttonsConfig,
  fl as charactersConfig,
  Kp as constructNarratObject,
  Jo as debounce,
  ue as error,
  su as findVariable,
  cI as funTheme,
  Yo as gameloop,
  lu as generateObjectFromList,
  Xi as generateParser,
  Wt as getAssetUrl,
  kr as getButtonConfig,
  de as getConfig,
  ml as getDataUrl,
  va as getFile,
  eo as getImageUrl,
  wn as getItemConfig,
  Mo as getObjectiveConfig,
  ar as getQuestConfig,
  Zi as getScreenConfig,
  pl as getSkillConfig,
  kp as getSplitConfigUrl,
  la as getWindow,
  _p as handleHMR,
  mn as inputEvents,
  $a as isConfigInputWithCommon,
  vp as isModuleValid,
  bp as isNarratScript,
  cl as isNarratYaml,
  cu as isPromise,
  ul as itemsConfig,
  zo as loadDataFile,
  ra as logManager,
  fn as logger,
  Vn as processText,
  is as questsConfig,
  ti as randomId,
  KI as registerComponent,
  Hp as registerMenuButton,
  nI as registerPlugin,
  HI as restartApp,
  Hs as screensConfig,
  Bn as skillsConfig,
  UI as startApp,
  BI as stopApp,
  dI as textOnlyTheme,
  Kt as timeout,
  Cr as tooltipsConfig,
  fi as useAchievements,
  Lt as useAudio,
  Ct as useConfig,
  Ye as useDialogStore,
  Xt as useHud,
  at as useInputs,
  Dt as useInventory,
  ke as useMain,
  jt as useMenu,
  qt as useNotifications,
  Pt as useQuests,
  gt as useRenderingStore,
  Jt as useScenes,
  on as useScreenObjects,
  pn as useScreens,
  vt as useSkills,
  Gi as useTooltips,
  Ie as useVM,
  li as warning
};
