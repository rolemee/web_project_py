var e=Object.defineProperty,a=Object.defineProperties,t=Object.getOwnPropertyDescriptors,l=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,o=(a,t,l)=>t in a?e(a,t,{enumerable:!0,configurable:!0,writable:!0,value:l}):a[t]=l,i=(e,a)=>{for(var t in a||(a={}))n.call(a,t)&&o(e,t,a[t]);if(l)for(var t of l(a))s.call(a,t)&&o(e,t,a[t]);return e},r=(e,l)=>a(e,t(l));import{L as c,ay as u,b as d,R as f,ap as v,am as p,d as m,bS as b,bT as g,bU as y,u as w,bl as k,l as h,bV as x,ar as O,X as I,Z as C,I as z,m as _,o as E,a as T,s as L,w as S,p as N,n as A,e as j,D as B,f as Y,E as $,bF as D,c as P,bJ as R,b0 as X,K as M,bW as F,bN as W,r as V,bX as q,bY as H,b6 as K,q as Z,v as G,ad as J,g as Q,ae as U,bn as ee,_ as ae,aO as te,aS as le,bz as ne,h as se,aq as oe,av as ie,bk as re,V as ce,A as ue,aQ as de}from"./index.03c48972.js";import{u as fe}from"./index.52c3fe84.js";import{d as ve}from"./debounce.acd355f1.js";import{u as pe}from"./index.285dd25f.js";import{g as me}from"./scroll.aace12bc.js";function be(e,a,t){var l=!0,n=!0;if("function"!=typeof e)throw new TypeError("Expected a function");return c(t)&&(l="leading"in t?!!t.leading:l,n="trailing"in t?!!t.trailing:n),ve(e,a,{leading:l,maxWait:a,trailing:n})}const ge=d({urlList:{type:f(Array),default:()=>v([])},zIndex:{type:Number},initialIndex:{type:Number,default:0},infinite:{type:Boolean,default:!0},hideOnClickModal:{type:Boolean,default:!1},teleported:{type:Boolean,default:!1},closeOnPressEscape:{type:Boolean,default:!0}}),ye={close:()=>!0,switch:e=>p(e)},we=["src"];const ke=se(ae(m(r(i({},{name:"ElImageViewer"}),{props:ge,emits:ye,setup(e,{emit:a}){const t=e,l={CONTAIN:{name:"contain",icon:b(g)},ORIGINAL:{name:"original",icon:b(y)}},n=u&&/firefox/i.test(window.navigator.userAgent)?"DOMMouseScroll":"mousewheel",{t:s}=fe(),o=w("image-viewer"),{nextZIndex:c}=k(),d=h(),f=h([]),v=x(),m=h(!0),ae=h(t.initialIndex),se=O(l.CONTAIN),oe=h({scale:1,deg:0,offsetX:0,offsetY:0,enableTransition:!1}),ie=I((()=>{const{urlList:e}=t;return e.length<=1})),re=I((()=>0===ae.value)),ce=I((()=>ae.value===t.urlList.length-1)),ue=I((()=>t.urlList[ae.value])),de=I((()=>{const{scale:e,deg:a,offsetX:t,offsetY:n,enableTransition:s}=oe.value;let o=t/e,i=n/e;switch(a%360){case 90:case-270:[o,i]=[i,-o];break;case 180:case-180:[o,i]=[-o,-i];break;case 270:case-90:[o,i]=[-i,o]}const r={transform:`scale(${e}) rotate(${a}deg) translate(${o}px, ${i}px)`,transition:s?"transform .3s":""};return se.value.name===l.CONTAIN.name&&(r.maxWidth=r.maxHeight="100%"),r})),ve=I((()=>p(t.zIndex)?t.zIndex:c()));function pe(){v.stop(),a("close")}function me(){m.value=!1}function ge(e){m.value=!1,e.target.alt=s("el.image.error")}function ye(e){if(m.value||0!==e.button||!d.value)return;oe.value.enableTransition=!1;const{offsetX:a,offsetY:t}=oe.value,l=e.pageX,n=e.pageY,s=be((e=>{oe.value=r(i({},oe.value),{offsetX:a+e.pageX-l,offsetY:t+e.pageY-n})})),o=te(document,"mousemove",s);te(document,"mouseup",(()=>{o()})),e.preventDefault()}function ke(){oe.value={scale:1,deg:0,offsetX:0,offsetY:0,enableTransition:!1}}function he(){if(m.value)return;const e=ne(l),a=Object.values(l),t=se.value.name,n=(a.findIndex((e=>e.name===t))+1)%e.length;se.value=l[e[n]],ke()}function xe(){if(re.value&&!t.infinite)return;const e=t.urlList.length;ae.value=(ae.value-1+e)%e}function Oe(){if(ce.value&&!t.infinite)return;const e=t.urlList.length;ae.value=(ae.value+1)%e}function Ie(e,a={}){if(m.value)return;const{zoomRate:t,rotateDeg:l,enableTransition:n}=i({zoomRate:1.4,rotateDeg:90,enableTransition:!0},a);switch(e){case"zoomOut":oe.value.scale>.2&&(oe.value.scale=Number.parseFloat((oe.value.scale/t).toFixed(3)));break;case"zoomIn":oe.value.scale<7&&(oe.value.scale=Number.parseFloat((oe.value.scale*t).toFixed(3)));break;case"clockwise":oe.value.deg+=l;break;case"anticlockwise":oe.value.deg-=l}oe.value.enableTransition=n}return C(ue,(()=>{z((()=>{const e=f.value[0];(null==e?void 0:e.complete)||(m.value=!0)}))})),C(ae,(e=>{ke(),a("switch",e)})),_((()=>{var e,a;!function(){const e=be((e=>{switch(e.code){case le.esc:t.closeOnPressEscape&&pe();break;case le.space:he();break;case le.left:xe();break;case le.up:Ie("zoomIn");break;case le.right:Oe();break;case le.down:Ie("zoomOut")}})),a=be((e=>{Ie((e.wheelDelta?e.wheelDelta:-e.detail)>0?"zoomIn":"zoomOut",{zoomRate:1.2,enableTransition:!1})}));v.run((()=>{te(document,"keydown",e),te(document,n,a)}))}(),null==(a=null==(e=d.value)?void 0:e.focus)||a.call(e)})),(e,a)=>(E(),T(ee,{to:"body",disabled:!e.teleported},[L(U,{name:"viewer-fade",appear:""},{default:S((()=>[N("div",{ref_key:"wrapper",ref:d,tabindex:-1,class:A(j(o).e("wrapper")),style:J({zIndex:j(ve)})},[N("div",{class:A(j(o).e("mask")),onClick:a[0]||(a[0]=B((a=>e.hideOnClickModal&&pe()),["self"]))},null,2),Y(" CLOSE "),N("span",{class:A([j(o).e("btn"),j(o).e("close")]),onClick:pe},[L(j($),null,{default:S((()=>[L(j(D))])),_:1})],2),Y(" ARROW "),j(ie)?Y("v-if",!0):(E(),P(M,{key:0},[N("span",{class:A([j(o).e("btn"),j(o).e("prev"),j(o).is("disabled",!e.infinite&&j(re))]),onClick:xe},[L(j($),null,{default:S((()=>[L(j(R))])),_:1})],2),N("span",{class:A([j(o).e("btn"),j(o).e("next"),j(o).is("disabled",!e.infinite&&j(ce))]),onClick:Oe},[L(j($),null,{default:S((()=>[L(j(X))])),_:1})],2)],64)),Y(" ACTIONS "),N("div",{class:A([j(o).e("btn"),j(o).e("actions")])},[N("div",{class:A(j(o).e("actions__inner"))},[L(j($),{onClick:a[1]||(a[1]=e=>Ie("zoomOut"))},{default:S((()=>[L(j(F))])),_:1}),L(j($),{onClick:a[2]||(a[2]=e=>Ie("zoomIn"))},{default:S((()=>[L(j(W))])),_:1}),N("i",{class:A(j(o).e("actions__divider"))},null,2),L(j($),{onClick:he},{default:S((()=>[(E(),T(V(j(se).icon)))])),_:1}),N("i",{class:A(j(o).e("actions__divider"))},null,2),L(j($),{onClick:a[3]||(a[3]=e=>Ie("anticlockwise"))},{default:S((()=>[L(j(q))])),_:1}),L(j($),{onClick:a[4]||(a[4]=e=>Ie("clockwise"))},{default:S((()=>[L(j(H))])),_:1})],2)],2),Y(" CANVAS "),N("div",{class:A(j(o).e("canvas"))},[(E(!0),P(M,null,K(e.urlList,((e,a)=>Z((E(),P("img",{ref_for:!0,ref:e=>f.value[a]=e,key:e,src:e,style:J(j(de)),class:A(j(o).e("img")),onLoad:me,onError:ge,onMousedown:ye},null,46,we)),[[G,a===ae.value]]))),128))],2),Q(e.$slots,"default")],6)])),_:3})],8,["disabled"]))}})),[["__file","/home/runner/work/element-plus/element-plus/packages/components/image-viewer/src/image-viewer.vue"]])),he=d({hideOnClickModal:{type:Boolean,default:!1},src:{type:String,default:""},fit:{type:String,values:["","contain","cover","fill","none","scale-down"],default:""},loading:{type:String,values:["eager","lazy"]},lazy:{type:Boolean,default:!1},scrollContainer:{type:f([String,Object])},previewSrcList:{type:f(Array),default:()=>v([])},previewTeleported:{type:Boolean,default:!1},zIndex:{type:Number},initialIndex:{type:Number,default:0},infinite:{type:Boolean,default:!0},closeOnPressEscape:{type:Boolean,default:!0}}),xe={load:e=>e instanceof Event,error:e=>e instanceof Event,switch:e=>p(e),close:()=>!0},Oe=["src","loading"],Ie={key:0};const Ce=se(ae(m(r(i({},{name:"ElImage",inheritAttrs:!1}),{props:he,emits:xe,setup(e,{emit:a}){const t=e;let l="";const{t:n}=fe(),s=w("image"),o=oe(),i=pe(),r=h(),c=h(!1),d=h(!0),f=h(!1),v=h(),p=h(),m=u&&"loading"in HTMLImageElement.prototype;let b,g;const y=I((()=>o.style)),k=I((()=>{const{fit:e}=t;return u&&e?{objectFit:e}:{}})),x=I((()=>{const{previewSrcList:e}=t;return Array.isArray(e)&&e.length>0})),O=I((()=>{const{previewSrcList:e,initialIndex:a}=t;let l=a;return a>e.length-1&&(l=0),l})),L=I((()=>"eager"!==t.loading&&(!m&&"lazy"===t.loading||t.lazy))),B=()=>{u&&(d.value=!0,c.value=!1,r.value=t.src)};function $(e){d.value=!1,c.value=!1,a("load",e)}function D(e){d.value=!1,c.value=!0,a("error",e)}function R(){((e,a)=>{if(!u||!e||!a)return!1;const t=e.getBoundingClientRect();let l;return l=a instanceof Element?a.getBoundingClientRect():{top:0,right:window.innerWidth,bottom:window.innerHeight,left:0},t.top<l.bottom&&t.bottom>l.top&&t.right>l.left&&t.left<l.right})(v.value,p.value)&&(B(),W())}const X=de(R,200);async function F(){var e;if(!u)return;await z();const{scrollContainer:a}=t;re(a)?p.value=a:ce(a)&&""!==a?p.value=null!=(e=document.querySelector(a))?e:void 0:v.value&&(p.value=me(v.value)),p.value&&(b=te(p,"scroll",X),setTimeout((()=>R()),100))}function W(){u&&p.value&&X&&(null==b||b(),p.value=void 0)}function V(e){if(e.ctrlKey)return e.deltaY<0||e.deltaY>0?(e.preventDefault(),!1):void 0}function q(){x.value&&(g=te("wheel",V,{passive:!1}),l=document.body.style.overflow,document.body.style.overflow="hidden",f.value=!0)}function H(){null==g||g(),document.body.style.overflow=l,f.value=!1,a("close")}function K(e){a("switch",e)}return C((()=>t.src),(()=>{L.value?(d.value=!0,c.value=!1,W(),F()):B()})),_((()=>{L.value?F():B()})),(e,a)=>(E(),P("div",{ref_key:"container",ref:v,class:A([j(s).b(),e.$attrs.class]),style:J(j(y))},[void 0===r.value||c.value?Y("v-if",!0):(E(),P("img",ie({key:0},j(i),{src:r.value,loading:e.loading,style:j(k),class:[j(s).e("inner"),j(x)&&j(s).e("preview"),d.value&&j(s).is("loading")],onClick:q,onLoad:$,onError:D}),null,16,Oe)),d.value||c.value?(E(),P("div",{key:1,class:A(j(s).e("wrapper"))},[d.value?Q(e.$slots,"placeholder",{key:0},(()=>[N("div",{class:A(j(s).e("placeholder"))},null,2)])):c.value?Q(e.$slots,"error",{key:1},(()=>[N("div",{class:A(j(s).e("error"))},ue(j(n)("el.image.error")),3)])):Y("v-if",!0)],2)):Y("v-if",!0),j(x)?(E(),P(M,{key:2},[f.value?(E(),T(j(ke),{key:0,"z-index":e.zIndex,"initial-index":j(O),infinite:e.infinite,"url-list":e.previewSrcList,"hide-on-click-modal":e.hideOnClickModal,teleported:e.previewTeleported,"close-on-press-escape":e.closeOnPressEscape,onClose:H,onSwitch:K},{default:S((()=>[e.$slots.viewer?(E(),P("div",Ie,[Q(e.$slots,"viewer")])):Y("v-if",!0)])),_:3},8,["z-index","initial-index","infinite","url-list","hide-on-click-modal","teleported","close-on-press-escape"])):Y("v-if",!0)],64)):Y("v-if",!0)],6))}})),[["__file","/home/runner/work/element-plus/element-plus/packages/components/image/src/image.vue"]]));export{Ce as E,ke as a};
