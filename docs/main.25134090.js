parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"A6Gv":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.map=exports.lerp=void 0;var e=function(e,r,t){return(1-t)*e+t*r};exports.lerp=e;var r=function(e,r,t,o,p){return(e-r)*(p-o)/(t-r)+o};exports.map=r;
},{}],"YiTT":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Cursor=void 0;var t=require("./mathUtils");function r(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}function e(t,r){for(var e=0;e<r.length;e++){var s=r[e];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}function s(t,r,s){return r&&e(t.prototype,r),s&&e(t,s),t}var o=function(){function e(){r(this,e),this.shouldAnimate=!1,this.mouseDown=!1,this.init=!1,this.crsr=document.getElementById("crsr"),this.cursorPos={x:0,y:0,r:.5},this.cursorTarget={x:0,y:0,r:.5},this.style(),this.listeners(),this.update()}return s(e,[{key:"style",value:function(){this.crsr.style="height: 64px;\n                        width: 64px;\n                        z-index: 9999;\n                        background: white;\n                        position: fixed;\n                        border-radius: 50%;\n                        opacity: 0;\n                        transition: opacity 0.6s ease-in-out;\n                        will-change: transform;\n                        display: none;\n                        pointer-events: none;"}},{key:"listeners",value:function(){var t=this;window.addEventListener("mousemove",function(r){t.cursorPos.x=r.clientX-32,t.cursorPos.y=r.clientY-32,t.shouldAnimate=!0,t.init||(t.cursorTarget.x=r.clientX-32,t.cursorTarget.y=r.clientY-32,t.crsr.style.display="block",setTimeout(function(){t.crsr.style.opacity=1},100),t.init=!0)},{passive:!0}),window.addEventListener("mousedown",function(r){t.shouldAnimate=!0,t.cursorPos.r=1,t.mouseDown=!0}),window.addEventListener("mouseup",function(r){t.shouldAnimate=!0,t.cursorPos.r=.5,setTimeout(function(){t.mouseDown=!1},1e3)})}},{key:"animComplete",value:function(){return Math.round(this.cursorTarget.x)==this.cursorPos.x&&Math.round(this.cursorTarget.y)==this.cursorPos.y&&!this.mouseDown}},{key:"update",value:function(){!this.shouldAnimate&&this.animComplete()||(this.cursorTarget.x=(0,t.lerp)(this.cursorTarget.x,this.cursorPos.x,.1),this.cursorTarget.y=(0,t.lerp)(this.cursorTarget.y,this.cursorPos.y,.1),this.cursorTarget.r=(0,t.lerp)(this.cursorTarget.r,this.cursorPos.r,.1),this.crsr.style.transform="matrix(".concat(this.cursorTarget.r,", 0, 0, ").concat(this.cursorTarget.r,", ").concat(this.cursorTarget.x,", ").concat(this.cursorTarget.y,")"),this.shouldAnimate=!1)}},{key:"isTicking",get:function(){return this.shouldAnimate||!this.animComplete()}}]),e}();exports.Cursor=o;
},{"./mathUtils":"A6Gv"}],"bAUU":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Scroller=void 0;var t=require("./mathUtils");function e(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function i(t,e,i){return e&&n(t.prototype,e),i&&n(t,i),t}var r=function(){return{vw:window.innerWidth,vh:window.innerHeight}},o=function(){function n(){e(this,n),this.scrollContent=document.getElementById("scroll-content"),this.scrollWrapper=document.getElementById("scroll-wrapper"),this.body=document.body,this.curScroll=0,this.targetScroll=0,this.listeners(),this.style(),this.dragger(),this.resize()}return i(n,[{key:"style",value:function(){this.scrollContent.style="height: 100%;\n                                    padding: 0 12.5vw 0 25vw;\n                                    min-width: 200vw;\n                                    will-change: transform;",this.scrollWrapper.style="position: fixed;"}},{key:"listeners",value:function(){var t=this;window.addEventListener("scroll",function(e){t.curScroll=document.documentElement.scrollTop,t.shouldAnimate=!0},{passive:!0}),window.addEventListener("resize",function(){t.resize()},{passive:!0})}},{key:"resize",value:function(){this.dim=r(),this.scrollWidth=this.scrollContent.scrollWidth,this.body.style.height="".concat(this.scrollWidth-(this.dim.vw-this.dim.vh),"px")}},{key:"dragger",value:function(){var t,e=!1,n=document.getElementById("slider");n.addEventListener("mousedown",function(n){t=n.clientX,e=!0}),n.addEventListener("mousemove",function(n){n.preventDefault(),e&&(document.documentElement.scrollTop+=3*(t-n.clientX))}),n.addEventListener("mouseup",function(t){e=!1})}},{key:"animComplete",value:function(){return Math.round(this.curScroll)==Math.round(this.targetScroll)}},{key:"update",value:function(){!this.shouldAnimate&&this.animComplete()||(this.targetScroll=Math.max((0,t.lerp)(this.targetScroll,this.curScroll,.1),1e-4),this.scrollContent.style.transform="translateX(".concat(-1*this.targetScroll,"px)"),this.shouldAnimate=!1)}},{key:"isTicking",get:function(){return this.shouldAnimate||!this.animComplete()}}]),n}();exports.Scroller=o;
},{"./mathUtils":"A6Gv"}],"bFFY":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Skew=void 0;var e=require("./mathUtils");function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function n(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}var o=function(){function r(){t(this,r),this.skew=0,this.cards=document.querySelectorAll(".card")}return n(r,[{key:"update",value:function(t){var r=this;this.skew=(0,e.map)(t.curScroll-t.targetScroll,0,t.scrollWidth,0,30),this.cards.forEach(function(e){e.style.transform="skewX(".concat(r.skew,"deg)")})}}]),r}();exports.Skew=o;
},{"./mathUtils":"A6Gv"}],"r3TZ":[function(require,module,exports) {
"use strict";var r=require("./mathUtils"),e=require("./cursor"),t=require("./scroller"),n=require("./skew");window.onload=function(){i()};var i=function(){var i=new e.Cursor,o=new t.Scroller,a=new n.Skew,l=document.querySelectorAll(".titles"),u=0;window.requestAnimationFrame(function e(t){var n=t-(u||0);window.requestAnimationFrame(e),u&&n<16||(u=t,o.update(),i.update(),a.update(o),o.isTicking&&l.forEach(function(e){e.style.transform="translateY(-".concat((0,r.map)(o.targetScroll,0,o.scrollWidth,0,e.scrollHeight),"px)")}))})};
},{"./mathUtils":"A6Gv","./cursor":"YiTT","./scroller":"bAUU","./skew":"bFFY"}]},{},["r3TZ"], null)
//# sourceMappingURL=main.25134090.js.map