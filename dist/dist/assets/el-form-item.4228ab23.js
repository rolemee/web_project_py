var e=Object.defineProperty,r=Object.defineProperties,t=Object.getOwnPropertyDescriptors,n=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable,o=(r,t,n)=>t in r?e(r,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):r[t]=n,u=(e,r)=>{for(var t in r||(r={}))a.call(r,t)&&o(e,t,r[t]);if(n)for(var t of n(r))i.call(r,t)&&o(e,t,r[t]);return e},s=(e,n)=>r(e,t(n));import{L as l,M as f,N as c,O as d,P as p,S as v,Q as y,b as g,R as m,T as h,U as b,V as j,W as w,l as O,X as F,d as q,Y as x,u as A,Z as E,$ as P,a0 as S,a1 as k,a2 as R,o as I,c as $,g as M,n as B,e as W,_,a3 as V,a4 as D,a5 as N,m as z,a6 as C,a7 as T,a8 as L,s as U,K as Z,I as J,a9 as G,aa as Y,ab as K,ac as Q,w as X,a as H,ad as ee,r as re,f as te,p as ne,ae,F as ie,A as oe,h as ue,af as se}from"./index.03c48972.js";import{d as le,t as fe}from"./event.69d56c48.js";import{u as ce}from"./index.5b3d3b8c.js";import{i as de,a as pe,b as ve,o as ye,k as ge,g as me,s as he,c as be,d as je,U as we,e as Oe,n as Fe,f as qe,h as xe,S as Ae,j as Ee,l as Pe}from"./isEqual.47868e98.js";var Se=Object.create,ke=function(){function e(){}return function(r){if(!l(r))return{};if(Se)return Se(r);e.prototype=r;var t=new e;return e.prototype=void 0,t}}();function Re(e,r,t,n){var a=!t;t||(t={});for(var i=-1,o=r.length;++i<o;){var u=r[i],s=n?n(t[u],e[u],u,t,e):void 0;void 0===s&&(s=e[u]),a?f(t,u,s):c(t,u,s)}return t}var Ie=Object.prototype.hasOwnProperty;function $e(e){if(!l(e))return function(e){var r=[];if(null!=e)for(var t in Object(e))r.push(t);return r}(e);var r=de(e),t=[];for(var n in e)("constructor"!=n||!r&&Ie.call(e,n))&&t.push(n);return t}function Me(e){return pe(e)?ve(e,!0):$e(e)}var Be=ye(Object.getPrototypeOf,Object);function We(){if(!arguments.length)return[];var e=arguments[0];return d(e)?e:[e]}var _e="object"==typeof exports&&exports&&!exports.nodeType&&exports,Ve=_e&&"object"==typeof module&&module&&!module.nodeType&&module,De=Ve&&Ve.exports===_e?p.Buffer:void 0,Ne=De?De.allocUnsafe:void 0;var ze=Object.getOwnPropertySymbols?function(e){for(var r=[];e;)be(r,me(e)),e=Be(e);return r}:he;function Ce(e){return je(e,Me,ze)}var Te=Object.prototype.hasOwnProperty;function Le(e){var r=new e.constructor(e.byteLength);return new we(r).set(new we(e)),r}var Ue=/\w*$/;var Ze=v?v.prototype:void 0,Je=Ze?Ze.valueOf:void 0;function Ge(e,r,t){var n,a,i,o=e.constructor;switch(r){case"[object ArrayBuffer]":return Le(e);case"[object Boolean]":case"[object Date]":return new o(+e);case"[object DataView]":return function(e,r){var t=r?Le(e.buffer):e.buffer;return new e.constructor(t,e.byteOffset,e.byteLength)}(e,t);case"[object Float32Array]":case"[object Float64Array]":case"[object Int8Array]":case"[object Int16Array]":case"[object Int32Array]":case"[object Uint8Array]":case"[object Uint8ClampedArray]":case"[object Uint16Array]":case"[object Uint32Array]":return function(e,r){var t=r?Le(e.buffer):e.buffer;return new e.constructor(t,e.byteOffset,e.length)}(e,t);case"[object Map]":case"[object Set]":return new o;case"[object Number]":case"[object String]":return new o(e);case"[object RegExp]":return(i=new(a=e).constructor(a.source,Ue.exec(a))).lastIndex=a.lastIndex,i;case"[object Symbol]":return n=e,Je?Object(Je.call(n)):{}}}var Ye=Fe&&Fe.isMap,Ke=Ye?qe(Ye):function(e){return y(e)&&"[object Map]"==Oe(e)};var Qe=Fe&&Fe.isSet,Xe=Qe?qe(Qe):function(e){return y(e)&&"[object Set]"==Oe(e)},He={};function er(e,r,t,n,a,i){var o,u=1&r,s=2&r,f=4&r;if(t&&(o=a?t(e,n,a,i):t(e)),void 0!==o)return o;if(!l(e))return e;var p=d(e);if(p){if(o=function(e){var r=e.length,t=new e.constructor(r);return r&&"string"==typeof e[0]&&Te.call(e,"index")&&(t.index=e.index,t.input=e.input),t}(e),!u)return function(e,r){var t=-1,n=e.length;for(r||(r=Array(n));++t<n;)r[t]=e[t];return r}(e,o)}else{var v=Oe(e),y="[object Function]"==v||"[object GeneratorFunction]"==v;if(xe(e))return function(e,r){if(r)return e.slice();var t=e.length,n=Ne?Ne(t):new e.constructor(t);return e.copy(n),n}(e,u);if("[object Object]"==v||"[object Arguments]"==v||y&&!a){if(o=s||y?{}:function(e){return"function"!=typeof e.constructor||de(e)?{}:ke(Be(e))}(e),!u)return s?function(e,r){return Re(e,ze(e),r)}(e,function(e,r){return e&&Re(r,Me(r),e)}(o,e)):function(e,r){return Re(e,me(e),r)}(e,function(e,r){return e&&Re(r,ge(r),e)}(o,e))}else{if(!He[v])return a?e:{};o=Ge(e,v,u)}}i||(i=new Ae);var g=i.get(e);if(g)return g;i.set(e,o),Xe(e)?e.forEach((function(n){o.add(er(n,r,t,n,e,i))})):Ke(e)&&e.forEach((function(n,a){o.set(a,er(n,r,t,a,e,i))}));var m=p?void 0:(f?s?Ce:Ee:s?Me:ge)(e);return function(e,r){for(var t=-1,n=null==e?0:e.length;++t<n&&!1!==r(e[t],t,e););}(m||e,(function(n,a){m&&(n=e[a=n]),c(o,a,er(n,r,t,a,e,i))})),o}He["[object Arguments]"]=He["[object Array]"]=He["[object ArrayBuffer]"]=He["[object DataView]"]=He["[object Boolean]"]=He["[object Date]"]=He["[object Float32Array]"]=He["[object Float64Array]"]=He["[object Int8Array]"]=He["[object Int16Array]"]=He["[object Int32Array]"]=He["[object Map]"]=He["[object Number]"]=He["[object Object]"]=He["[object RegExp]"]=He["[object Set]"]=He["[object String]"]=He["[object Symbol]"]=He["[object Uint8Array]"]=He["[object Uint8ClampedArray]"]=He["[object Uint16Array]"]=He["[object Uint32Array]"]=!0,He["[object Error]"]=He["[object Function]"]=He["[object WeakMap]"]=!1;function rr(e){return er(e,4)}const tr=g({model:Object,rules:{type:m(Object)},labelPosition:{type:String,values:["left","right","top"],default:"right"},labelWidth:{type:[String,Number],default:""},labelSuffix:{type:String,default:""},inline:Boolean,inlineMessage:Boolean,statusIcon:Boolean,showMessage:{type:Boolean,default:!0},size:{type:String,values:h},disabled:Boolean,validateOnRuleChange:{type:Boolean,default:!0},hideRequiredAsterisk:{type:Boolean,default:!1},scrollToError:Boolean}),nr={validate:(e,r,t)=>(b(e)||j(e))&&w(r)&&j(t)};const ar=(e,r)=>{const t=We(r);return t.length>0?e.filter((e=>e.prop&&t.includes(e.prop))):e};var ir=_(q(s(u({},{name:"ElForm"}),{props:tr,emits:nr,setup(e,{expose:r,emit:t}){const n=e,a=[],i=x(),o=A("form"),l=F((()=>{const{labelPosition:e,inline:r}=n;return[o.b(),o.m(i.value||"default"),{[o.m(`label-${e}`)]:e,[o.m("inline")]:r}]})),f=(e=[])=>{n.model&&ar(a,e).forEach((e=>e.resetField()))},c=(e=[])=>{ar(a,e).forEach((e=>e.clearValidate()))},d=F((()=>!!n.model)),p=async e=>y(void 0,e),v=async(e=[])=>{if(!d.value)return!1;const r=(e=>{if(0===a.length)return[];const r=ar(a,e);return r.length?r:[]})(e);if(0===r.length)return!0;let t={};for(const a of r)try{await a.validate("")}catch(n){t=u(u({},t),n)}return 0===Object.keys(t).length||Promise.reject(t)},y=async(e=[],r)=>{const t=!V(r);try{const t=await v(e);return!0===t&&(null==r||r(t)),t}catch(a){const e=a;return n.scrollToError&&g(Object.keys(e)[0]),null==r||r(!1,e),t&&Promise.reject(e)}},g=e=>{var r;const t=ar(a,e)[0];t&&(null==(r=t.$el)||r.scrollIntoView())};return E((()=>n.rules),(()=>{n.validateOnRuleChange&&p().catch((e=>le()))}),{deep:!0}),P(R,S(u(s(u({},k(n)),{emit:t,resetFields:f,clearValidate:c,validateField:y,addField:e=>{a.push(e)},removeField:e=>{e.prop&&a.splice(a.indexOf(e),1)}}),function(){const e=O([]);function r(r){return e.value.indexOf(r)}return{autoLabelWidth:F((()=>{if(!e.value.length)return"0";const r=Math.max(...e.value);return r?`${r}px`:""})),registerLabelWidth:function(t,n){if(t&&n){const a=r(n);e.value.splice(a,1,t)}else t&&e.value.push(t)},deregisterLabelWidth:function(t){const n=r(t);n>-1&&e.value.splice(n,1)}}}()))),r({validate:p,validateField:y,resetFields:f,clearValidate:c,scrollToField:g}),(e,r)=>(I(),$("form",{class:B(W(l))},[M(e.$slots,"default")],2))}})),[["__file","/home/runner/work/element-plus/element-plus/packages/components/form/src/form.vue"]]);function or(){return or=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},or.apply(this,arguments)}function ur(e){return(ur=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function sr(e,r){return(sr=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,r){return e.__proto__=r,e})(e,r)}function lr(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}function fr(e,r,t){return(fr=lr()?Reflect.construct.bind():function(e,r,t){var n=[null];n.push.apply(n,r);var a=new(Function.bind.apply(e,n));return t&&sr(a,t.prototype),a}).apply(null,arguments)}function cr(e){var r="function"==typeof Map?new Map:void 0;return cr=function(e){if(null===e||(t=e,-1===Function.toString.call(t).indexOf("[native code]")))return e;var t;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==r){if(r.has(e))return r.get(e);r.set(e,n)}function n(){return fr(e,arguments,ur(this).constructor)}return n.prototype=Object.create(e.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),sr(n,e)},cr(e)}var dr=/%[sdj%]/g,pr=function(){};function vr(e){if(!e||!e.length)return null;var r={};return e.forEach((function(e){var t=e.field;r[t]=r[t]||[],r[t].push(e)})),r}function yr(e){for(var r=arguments.length,t=new Array(r>1?r-1:0),n=1;n<r;n++)t[n-1]=arguments[n];var a=0,i=t.length;if("function"==typeof e)return e.apply(null,t);if("string"==typeof e){var o=e.replace(dr,(function(e){if("%%"===e)return"%";if(a>=i)return e;switch(e){case"%s":return String(t[a++]);case"%d":return Number(t[a++]);case"%j":try{return JSON.stringify(t[a++])}catch(r){return"[Circular]"}break;default:return e}}));return o}return e}function gr(e,r){return null==e||(!("array"!==r||!Array.isArray(e)||e.length)||!(!function(e){return"string"===e||"url"===e||"hex"===e||"email"===e||"date"===e||"pattern"===e}(r)||"string"!=typeof e||e))}function mr(e,r,t){var n=0,a=e.length;!function i(o){if(o&&o.length)t(o);else{var u=n;n+=1,u<a?r(e[u],i):t([])}}([])}"undefined"!=typeof process&&process.env;var hr=function(e){var r,t;function n(r,t){var n;return(n=e.call(this,"Async Validation Error")||this).errors=r,n.fields=t,n}return t=e,(r=n).prototype=Object.create(t.prototype),r.prototype.constructor=r,sr(r,t),n}(cr(Error));function br(e,r,t,n,a){if(r.first){var i=new Promise((function(r,i){var o=function(e){var r=[];return Object.keys(e).forEach((function(t){r.push.apply(r,e[t]||[])})),r}(e);mr(o,t,(function(e){return n(e),e.length?i(new hr(e,vr(e))):r(a)}))}));return i.catch((function(e){return e})),i}var o=!0===r.firstFields?Object.keys(e):r.firstFields||[],u=Object.keys(e),s=u.length,l=0,f=[],c=new Promise((function(r,i){var c=function(e){if(f.push.apply(f,e),++l===s)return n(f),f.length?i(new hr(f,vr(f))):r(a)};u.length||(n(f),r(a)),u.forEach((function(r){var n=e[r];-1!==o.indexOf(r)?mr(n,t,c):function(e,r,t){var n=[],a=0,i=e.length;function o(e){n.push.apply(n,e||[]),++a===i&&t(n)}e.forEach((function(e){r(e,o)}))}(n,t,c)}))}));return c.catch((function(e){return e})),c}function jr(e,r){return function(t){var n,a;return n=e.fullFields?function(e,r){for(var t=e,n=0;n<r.length;n++){if(null==t)return t;t=t[r[n]]}return t}(r,e.fullFields):r[t.field||e.fullField],(a=t)&&void 0!==a.message?(t.field=t.field||e.fullField,t.fieldValue=n,t):{message:"function"==typeof t?t():t,fieldValue:n,field:t.field||e.fullField}}}function wr(e,r){if(r)for(var t in r)if(r.hasOwnProperty(t)){var n=r[t];"object"==typeof n&&"object"==typeof e[t]?e[t]=or({},e[t],n):e[t]=n}return e}var Or,Fr=function(e,r,t,n,a,i){!e.required||t.hasOwnProperty(e.field)&&!gr(r,i||e.type)||n.push(yr(a.messages.required,e.fullField))},qr=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,xr=/^#?([a-f0-9]{6}|[a-f0-9]{3})$/i,Ar={integer:function(e){return Ar.number(e)&&parseInt(e,10)===e},float:function(e){return Ar.number(e)&&!Ar.integer(e)},array:function(e){return Array.isArray(e)},regexp:function(e){if(e instanceof RegExp)return!0;try{return!!new RegExp(e)}catch(r){return!1}},date:function(e){return"function"==typeof e.getTime&&"function"==typeof e.getMonth&&"function"==typeof e.getYear&&!isNaN(e.getTime())},number:function(e){return!isNaN(e)&&"number"==typeof e},object:function(e){return"object"==typeof e&&!Ar.array(e)},method:function(e){return"function"==typeof e},email:function(e){return"string"==typeof e&&e.length<=320&&!!e.match(qr)},url:function(e){return"string"==typeof e&&e.length<=2048&&!!e.match(function(){if(Or)return Or;var e="[a-fA-F\\d:]",r=function(r){return r&&r.includeBoundaries?"(?:(?<=\\s|^)(?="+e+")|(?<="+e+")(?=\\s|$))":""},t="(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}",n="[a-fA-F\\d]{1,4}",a=("\n(?:\n(?:"+n+":){7}(?:"+n+"|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8\n(?:"+n+":){6}(?:"+t+"|:"+n+"|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4\n(?:"+n+":){5}(?::"+t+"|(?::"+n+"){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4\n(?:"+n+":){4}(?:(?::"+n+"){0,1}:"+t+"|(?::"+n+"){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4\n(?:"+n+":){3}(?:(?::"+n+"){0,2}:"+t+"|(?::"+n+"){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4\n(?:"+n+":){2}(?:(?::"+n+"){0,3}:"+t+"|(?::"+n+"){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4\n(?:"+n+":){1}(?:(?::"+n+"){0,4}:"+t+"|(?::"+n+"){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4\n(?::(?:(?::"+n+"){0,5}:"+t+"|(?::"+n+"){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4\n)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1\n").replace(/\s*\/\/.*$/gm,"").replace(/\n/g,"").trim(),i=new RegExp("(?:^"+t+"$)|(?:^"+a+"$)"),o=new RegExp("^"+t+"$"),u=new RegExp("^"+a+"$"),s=function(e){return e&&e.exact?i:new RegExp("(?:"+r(e)+t+r(e)+")|(?:"+r(e)+a+r(e)+")","g")};s.v4=function(e){return e&&e.exact?o:new RegExp(""+r(e)+t+r(e),"g")},s.v6=function(e){return e&&e.exact?u:new RegExp(""+r(e)+a+r(e),"g")};var l=s.v4().source,f=s.v6().source;return Or=new RegExp("(?:^(?:(?:(?:[a-z]+:)?//)|www\\.)(?:\\S+(?::\\S*)?@)?(?:localhost|"+l+"|"+f+'|(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:[/?#][^\\s"]*)?$)',"i")}())},hex:function(e){return"string"==typeof e&&!!e.match(xr)}},Er={required:Fr,whitespace:function(e,r,t,n,a){(/^\s+$/.test(r)||""===r)&&n.push(yr(a.messages.whitespace,e.fullField))},type:function(e,r,t,n,a){if(e.required&&void 0===r)Fr(e,r,t,n,a);else{var i=e.type;["integer","float","array","regexp","object","method","email","number","date","url","hex"].indexOf(i)>-1?Ar[i](r)||n.push(yr(a.messages.types[i],e.fullField,e.type)):i&&typeof r!==e.type&&n.push(yr(a.messages.types[i],e.fullField,e.type))}},range:function(e,r,t,n,a){var i="number"==typeof e.len,o="number"==typeof e.min,u="number"==typeof e.max,s=r,l=null,f="number"==typeof r,c="string"==typeof r,d=Array.isArray(r);if(f?l="number":c?l="string":d&&(l="array"),!l)return!1;d&&(s=r.length),c&&(s=r.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,"_").length),i?s!==e.len&&n.push(yr(a.messages[l].len,e.fullField,e.len)):o&&!u&&s<e.min?n.push(yr(a.messages[l].min,e.fullField,e.min)):u&&!o&&s>e.max?n.push(yr(a.messages[l].max,e.fullField,e.max)):o&&u&&(s<e.min||s>e.max)&&n.push(yr(a.messages[l].range,e.fullField,e.min,e.max))},enum:function(e,r,t,n,a){e.enum=Array.isArray(e.enum)?e.enum:[],-1===e.enum.indexOf(r)&&n.push(yr(a.messages.enum,e.fullField,e.enum.join(", ")))},pattern:function(e,r,t,n,a){if(e.pattern)if(e.pattern instanceof RegExp)e.pattern.lastIndex=0,e.pattern.test(r)||n.push(yr(a.messages.pattern.mismatch,e.fullField,r,e.pattern));else if("string"==typeof e.pattern){new RegExp(e.pattern).test(r)||n.push(yr(a.messages.pattern.mismatch,e.fullField,r,e.pattern))}}},Pr=function(e,r,t,n,a){var i=e.type,o=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(gr(r,i)&&!e.required)return t();Er.required(e,r,n,o,a,i),gr(r,i)||Er.type(e,r,n,o,a)}t(o)},Sr={string:function(e,r,t,n,a){var i=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(gr(r,"string")&&!e.required)return t();Er.required(e,r,n,i,a,"string"),gr(r,"string")||(Er.type(e,r,n,i,a),Er.range(e,r,n,i,a),Er.pattern(e,r,n,i,a),!0===e.whitespace&&Er.whitespace(e,r,n,i,a))}t(i)},method:function(e,r,t,n,a){var i=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(gr(r)&&!e.required)return t();Er.required(e,r,n,i,a),void 0!==r&&Er.type(e,r,n,i,a)}t(i)},number:function(e,r,t,n,a){var i=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(""===r&&(r=void 0),gr(r)&&!e.required)return t();Er.required(e,r,n,i,a),void 0!==r&&(Er.type(e,r,n,i,a),Er.range(e,r,n,i,a))}t(i)},boolean:function(e,r,t,n,a){var i=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(gr(r)&&!e.required)return t();Er.required(e,r,n,i,a),void 0!==r&&Er.type(e,r,n,i,a)}t(i)},regexp:function(e,r,t,n,a){var i=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(gr(r)&&!e.required)return t();Er.required(e,r,n,i,a),gr(r)||Er.type(e,r,n,i,a)}t(i)},integer:function(e,r,t,n,a){var i=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(gr(r)&&!e.required)return t();Er.required(e,r,n,i,a),void 0!==r&&(Er.type(e,r,n,i,a),Er.range(e,r,n,i,a))}t(i)},float:function(e,r,t,n,a){var i=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(gr(r)&&!e.required)return t();Er.required(e,r,n,i,a),void 0!==r&&(Er.type(e,r,n,i,a),Er.range(e,r,n,i,a))}t(i)},array:function(e,r,t,n,a){var i=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(null==r&&!e.required)return t();Er.required(e,r,n,i,a,"array"),null!=r&&(Er.type(e,r,n,i,a),Er.range(e,r,n,i,a))}t(i)},object:function(e,r,t,n,a){var i=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(gr(r)&&!e.required)return t();Er.required(e,r,n,i,a),void 0!==r&&Er.type(e,r,n,i,a)}t(i)},enum:function(e,r,t,n,a){var i=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(gr(r)&&!e.required)return t();Er.required(e,r,n,i,a),void 0!==r&&Er.enum(e,r,n,i,a)}t(i)},pattern:function(e,r,t,n,a){var i=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(gr(r,"string")&&!e.required)return t();Er.required(e,r,n,i,a),gr(r,"string")||Er.pattern(e,r,n,i,a)}t(i)},date:function(e,r,t,n,a){var i=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(gr(r,"date")&&!e.required)return t();var o;if(Er.required(e,r,n,i,a),!gr(r,"date"))o=r instanceof Date?r:new Date(r),Er.type(e,o,n,i,a),o&&Er.range(e,o.getTime(),n,i,a)}t(i)},url:Pr,hex:Pr,email:Pr,required:function(e,r,t,n,a){var i=[],o=Array.isArray(r)?"array":typeof r;Er.required(e,r,n,i,a,o),t(i)},any:function(e,r,t,n,a){var i=[];if(e.required||!e.required&&n.hasOwnProperty(e.field)){if(gr(r)&&!e.required)return t();Er.required(e,r,n,i,a)}t(i)}};function kr(){return{default:"Validation error on field %s",required:"%s is required",enum:"%s must be one of %s",whitespace:"%s cannot be empty",date:{format:"%s date %s is invalid for format %s",parse:"%s date could not be parsed, %s is invalid ",invalid:"%s date %s is invalid"},types:{string:"%s is not a %s",method:"%s is not a %s (function)",array:"%s is not an %s",object:"%s is not an %s",number:"%s is not a %s",date:"%s is not a %s",boolean:"%s is not a %s",integer:"%s is not an %s",float:"%s is not a %s",regexp:"%s is not a valid %s",email:"%s is not a valid %s",url:"%s is not a valid %s",hex:"%s is not a valid %s"},string:{len:"%s must be exactly %s characters",min:"%s must be at least %s characters",max:"%s cannot be longer than %s characters",range:"%s must be between %s and %s characters"},number:{len:"%s must equal %s",min:"%s cannot be less than %s",max:"%s cannot be greater than %s",range:"%s must be between %s and %s"},array:{len:"%s must be exactly %s in length",min:"%s cannot be less than %s in length",max:"%s cannot be greater than %s in length",range:"%s must be between %s and %s in length"},pattern:{mismatch:"%s value %s does not match pattern %s"},clone:function(){var e=JSON.parse(JSON.stringify(this));return e.clone=this.clone,e}}}var Rr=kr(),Ir=function(){function e(e){this.rules=null,this._messages=Rr,this.define(e)}var r=e.prototype;return r.define=function(e){var r=this;if(!e)throw new Error("Cannot configure a schema with no rules");if("object"!=typeof e||Array.isArray(e))throw new Error("Rules must be an object");this.rules={},Object.keys(e).forEach((function(t){var n=e[t];r.rules[t]=Array.isArray(n)?n:[n]}))},r.messages=function(e){return e&&(this._messages=wr(kr(),e)),this._messages},r.validate=function(r,t,n){var a=this;void 0===t&&(t={}),void 0===n&&(n=function(){});var i=r,o=t,u=n;if("function"==typeof o&&(u=o,o={}),!this.rules||0===Object.keys(this.rules).length)return u&&u(null,i),Promise.resolve(i);if(o.messages){var s=this.messages();s===Rr&&(s=kr()),wr(s,o.messages),o.messages=s}else o.messages=this.messages();var l={};(o.keys||Object.keys(this.rules)).forEach((function(e){var t=a.rules[e],n=i[e];t.forEach((function(t){var o=t;"function"==typeof o.transform&&(i===r&&(i=or({},i)),n=i[e]=o.transform(n)),(o="function"==typeof o?{validator:o}:or({},o)).validator=a.getValidationMethod(o),o.validator&&(o.field=e,o.fullField=o.fullField||e,o.type=a.getType(o),l[e]=l[e]||[],l[e].push({rule:o,value:n,source:i,field:e}))}))}));var f={};return br(l,o,(function(r,t){var n,a=r.rule,u=!("object"!==a.type&&"array"!==a.type||"object"!=typeof a.fields&&"object"!=typeof a.defaultField);function s(e,r){return or({},r,{fullField:a.fullField+"."+e,fullFields:a.fullFields?[].concat(a.fullFields,[e]):[e]})}function l(n){void 0===n&&(n=[]);var l=Array.isArray(n)?n:[n];!o.suppressWarning&&l.length&&e.warning("async-validator:",l),l.length&&void 0!==a.message&&(l=[].concat(a.message));var c=l.map(jr(a,i));if(o.first&&c.length)return f[a.field]=1,t(c);if(u){if(a.required&&!r.value)return void 0!==a.message?c=[].concat(a.message).map(jr(a,i)):o.error&&(c=[o.error(a,yr(o.messages.required,a.field))]),t(c);var d={};a.defaultField&&Object.keys(r.value).map((function(e){d[e]=a.defaultField})),d=or({},d,r.rule.fields);var p={};Object.keys(d).forEach((function(e){var r=d[e],t=Array.isArray(r)?r:[r];p[e]=t.map(s.bind(null,e))}));var v=new e(p);v.messages(o.messages),r.rule.options&&(r.rule.options.messages=o.messages,r.rule.options.error=o.error),v.validate(r.value,r.rule.options||o,(function(e){var r=[];c&&c.length&&r.push.apply(r,c),e&&e.length&&r.push.apply(r,e),t(r.length?r:null)}))}else t(c)}if(u=u&&(a.required||!a.required&&r.value),a.field=r.field,a.asyncValidator)n=a.asyncValidator(a,r.value,l,r.source,o);else if(a.validator){try{n=a.validator(a,r.value,l,r.source,o)}catch(c){console.error,o.suppressValidatorError||setTimeout((function(){throw c}),0),l(c.message)}!0===n?l():!1===n?l("function"==typeof a.message?a.message(a.fullField||a.field):a.message||(a.fullField||a.field)+" fails"):n instanceof Array?l(n):n instanceof Error&&l(n.message)}n&&n.then&&n.then((function(){return l()}),(function(e){return l(e)}))}),(function(e){!function(e){for(var r,t,n=[],a={},o=0;o<e.length;o++)r=e[o],t=void 0,Array.isArray(r)?n=(t=n).concat.apply(t,r):n.push(r);n.length?(a=vr(n),u(n,a)):u(null,i)}(e)}),i)},r.getType=function(e){if(void 0===e.type&&e.pattern instanceof RegExp&&(e.type="pattern"),"function"!=typeof e.validator&&e.type&&!Sr.hasOwnProperty(e.type))throw new Error(yr("Unknown rule type %s",e.type));return e.type||"string"},r.getValidationMethod=function(e){if("function"==typeof e.validator)return e.validator;var r=Object.keys(e),t=r.indexOf("message");return-1!==t&&r.splice(t,1),1===r.length&&"required"===r[0]?Sr.required:Sr[this.getType(e)]||void 0},e}();Ir.register=function(e,r){if("function"!=typeof r)throw new Error("Cannot register a validator by type, validator is not a function");Sr[e]=r},Ir.warning=pr,Ir.messages=Rr,Ir.validators=Sr;const $r=g({label:String,labelWidth:{type:[String,Number],default:""},prop:{type:m([String,Array])},required:{type:Boolean,default:void 0},rules:{type:m([Object,Array])},error:String,validateStatus:{type:String,values:["","error","validating","success"]},for:String,inlineMessage:{type:[String,Boolean],default:""},showMessage:{type:Boolean,default:!0},size:{type:String,values:h}});var Mr=q({name:"ElLabelWrap",props:{isAutoWidth:Boolean,updateAll:Boolean},setup(e,{slots:r}){const t=D(R,void 0);D(N)||fe("ElLabelWrap","usage: <el-form-item><label-wrap /></el-form-item>");const n=A("form"),a=O(),i=O(0),o=(n="update")=>{J((()=>{r.default&&e.isAutoWidth&&("update"===n?i.value=(()=>{var e;if(null==(e=a.value)?void 0:e.firstElementChild){const e=window.getComputedStyle(a.value.firstElementChild).width;return Math.ceil(Number.parseFloat(e))}return 0})():"remove"===n&&(null==t||t.deregisterLabelWidth(i.value)))}))},u=()=>o("update");return z((()=>{u()})),C((()=>{o("remove")})),T((()=>u())),E(i,((r,n)=>{e.updateAll&&(null==t||t.registerLabelWidth(r,n))})),L(F((()=>{var e,r;return null!=(r=null==(e=a.value)?void 0:e.firstElementChild)?r:null})),u),()=>{var o,u;if(!r)return null;const{isAutoWidth:s}=e;if(s){const e=null==t?void 0:t.autoLabelWidth,u={};if(e&&"auto"!==e){const r=Math.max(0,Number.parseInt(e,10)-i.value),n="left"===t.labelPosition?"marginRight":"marginLeft";r&&(u[n]=`${r}px`)}return U("div",{ref:a,class:[n.be("item","label-wrap")],style:u},[null==(o=r.default)?void 0:o.call(r)])}return U(Z,{ref:a},[null==(u=r.default)?void 0:u.call(r)])}}});const Br=["role","aria-labelledby"];var Wr=_(q(s(u({},{name:"ElFormItem"}),{props:$r,setup(e,{expose:r}){const t=e,o=G(),l=D(R,void 0),f=D(N,void 0),c=x(void 0,{formItem:!1}),d=A("form-item"),p=ce().value,v=O([]),y=O(""),g=Y(y,100),m=O(""),h=O();let b,q=!1;const _=F((()=>{if("top"===(null==l?void 0:l.labelPosition))return{};const e=K(t.labelWidth||(null==l?void 0:l.labelWidth)||"");return e?{width:e}:{}})),T=F((()=>{if("top"===(null==l?void 0:l.labelPosition)||(null==l?void 0:l.inline))return{};if(!t.label&&!t.labelWidth&&pe)return{};const e=K(t.labelWidth||(null==l?void 0:l.labelWidth)||"");return t.label||o.label?{}:{marginLeft:e}})),L=F((()=>[d.b(),d.m(c.value),d.is("error","error"===y.value),d.is("validating","validating"===y.value),d.is("success","success"===y.value),d.is("required",he.value||t.required),d.is("no-asterisk",null==l?void 0:l.hideRequiredAsterisk),{[d.m("feedback")]:null==l?void 0:l.statusIcon}])),Z=F((()=>w(t.inlineMessage)?t.inlineMessage:(null==l?void 0:l.inlineMessage)||!1)),ue=F((()=>[d.e("error"),{[d.em("error","inline")]:Z.value}])),se=F((()=>t.prop?j(t.prop)?t.prop:t.prop.join("."):"")),le=F((()=>!(!t.label&&!o.label))),fe=F((()=>t.for||1===v.value.length?v.value[0]:void 0)),de=F((()=>!fe.value&&le.value)),pe=!!f,ve=F((()=>{const e=null==l?void 0:l.model;if(e&&t.prop)return Q(e,t.prop).value})),ye=F((()=>{const e=t.rules?We(t.rules):[],r=null==l?void 0:l.rules;if(r&&t.prop){const n=Q(r,t.prop).value;n&&e.push(...We(n))}return void 0!==t.required&&e.push({required:!!t.required}),e})),ge=F((()=>ye.value.length>0)),me=e=>ye.value.filter((r=>!r.trigger||!e||(Array.isArray(r.trigger)?r.trigger.includes(e):r.trigger===e))).map((e=>{var r=e,{trigger:t}=r;return((e,r)=>{var t={};for(var o in e)a.call(e,o)&&r.indexOf(o)<0&&(t[o]=e[o]);if(null!=e&&n)for(var o of n(e))r.indexOf(o)<0&&i.call(e,o)&&(t[o]=e[o]);return t})(r,["trigger"])})),he=F((()=>ye.value.some((e=>!0===e.required)))),be=F((()=>{var e;return"error"===g.value&&t.showMessage&&(null==(e=null==l?void 0:l.showMessage)||e)})),je=F((()=>`${t.label||""}${(null==l?void 0:l.labelSuffix)||""}`)),we=e=>{y.value=e},Oe=async e=>{const r=se.value;return new Ir({[r]:e}).validate({[r]:ve.value},{firstFields:!0}).then((()=>(we("success"),null==l||l.emit("validate",t.prop,!0,""),!0))).catch((e=>((e=>{var r,n;const{errors:a,fields:i}=e;we("error"),m.value=a?null!=(n=null==(r=null==a?void 0:a[0])?void 0:r.message)?n:`${t.prop} is required`:"",null==l||l.emit("validate",t.prop,!1,m.value)})(e),Promise.reject(e))))},Fe=async(e,r)=>{if(q)return q=!1,!1;const t=V(r);if(!ge.value)return null==r||r(!1),!1;const n=me(e);return 0===n.length?(null==r||r(!0),!0):(we("validating"),Oe(n).then((()=>(null==r||r(!0),!0))).catch((e=>{const{fields:n}=e;return null==r||r(!1,n),!t&&Promise.reject(n)})))},qe=()=>{we(""),m.value=""},xe=async()=>{const e=null==l?void 0:l.model;if(!e||!t.prop)return;const r=Q(e,t.prop);Pe(r.value,b)||(q=!0),r.value=rr(b),await J(),qe()};E((()=>t.error),(e=>{m.value=e||"",we(e?"error":"")}),{immediate:!0}),E((()=>t.validateStatus),(e=>we(e||"")));const Ae=S(s(u({},k(t)),{$el:h,size:c,validateState:y,labelId:p,inputIds:v,isGroup:de,addInputId:e=>{v.value.includes(e)||v.value.push(e)},removeInputId:e=>{v.value=v.value.filter((r=>r!==e))},resetField:xe,clearValidate:qe,validate:Fe}));return P(N,Ae),z((()=>{t.prop&&(null==l||l.addField(Ae),b=rr(ve.value))})),C((()=>{null==l||l.removeField(Ae)})),r({size:c,validateMessage:m,validateState:y,validate:Fe,clearValidate:qe,resetField:xe}),(e,r)=>{var t;return I(),$("div",{ref_key:"formItemRef",ref:h,class:B(W(L)),role:W(de)?"group":void 0,"aria-labelledby":W(de)?W(p):void 0},[U(W(Mr),{"is-auto-width":"auto"===W(_).width,"update-all":"auto"===(null==(t=W(l))?void 0:t.labelWidth)},{default:X((()=>[W(le)?(I(),H(re(W(fe)?"label":"div"),{key:0,id:W(p),for:W(fe),class:B(W(d).e("label")),style:ee(W(_))},{default:X((()=>[M(e.$slots,"label",{label:W(je)},(()=>[ie(oe(W(je)),1)]))])),_:3},8,["id","for","class","style"])):te("v-if",!0)])),_:3},8,["is-auto-width","update-all"]),ne("div",{class:B(W(d).e("content")),style:ee(W(T))},[M(e.$slots,"default"),U(ae,{name:`${W(d).namespace.value}-zoom-in-top`},{default:X((()=>[W(be)?M(e.$slots,"error",{key:0,error:m.value},(()=>[ne("div",{class:B(W(ue))},oe(m.value),3)])):te("v-if",!0)])),_:3},8,["name"])],6)],10,Br)}}})),[["__file","/home/runner/work/element-plus/element-plus/packages/components/form/src/form-item.vue"]]);const _r=ue(ir,{FormItem:Wr}),Vr=se(Wr);export{Vr as E,_r as a};
