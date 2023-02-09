import{L as e,ay as a,b as l,R as n,ap as t,am as s,d as i,bS as o,bT as r,bU as u,u as c,bl as d,l as f,bV as v,ar as p,X as m,Z as g,I as b,m as y,o as w,a as k,s as h,w as x,p as I,n as C,e as z,B as _,f as O,E as T,bF as E,c as L,bJ as N,b0 as S,K as A,bW as B,bN as Y,r as $,bX as R,bY as X,b6 as j,q as M,v as D,ad as F,g as W,ae as P,bn as V,_ as q,aO as H,aS as K,bz as Z,h as G,aq as J,av as Q,y as U,bk as ee,V as ae,aQ as le}from"./index.10862972.js";import{u as ne}from"./index.bf82bf90.js";import{d as te}from"./debounce.8db0ae9f.js";import{u as se}from"./index.a1792b3c.js";import{g as ie}from"./scroll.aaa4d4ca.js";function oe(a,l,n){var t=!0,s=!0;if("function"!=typeof a)throw new TypeError("Expected a function");return e(n)&&(t="leading"in n?!!n.leading:t,s="trailing"in n?!!n.trailing:s),te(a,l,{leading:t,maxWait:l,trailing:s})}const re=l({urlList:{type:n(Array),default:()=>t([])},zIndex:{type:Number},initialIndex:{type:Number,default:0},infinite:{type:Boolean,default:!0},hideOnClickModal:{type:Boolean,default:!1},teleported:{type:Boolean,default:!1},closeOnPressEscape:{type:Boolean,default:!0}}),ue=["src"];const ce=G(q(i({name:"ElImageViewer",props:re,emits:{close:()=>!0,switch:e=>s(e)},setup(e,{emit:l}){const n=e,t={CONTAIN:{name:"contain",icon:o(r)},ORIGINAL:{name:"original",icon:o(u)}},i=a&&/firefox/i.test(window.navigator.userAgent)?"DOMMouseScroll":"mousewheel",{t:q}=ne(),G=c("image-viewer"),{nextZIndex:J}=d(),Q=f(),U=f([]),ee=v(),ae=f(!0),le=f(n.initialIndex),te=p(t.CONTAIN),se=f({scale:1,deg:0,offsetX:0,offsetY:0,enableTransition:!1}),ie=m((()=>{const{urlList:e}=n;return e.length<=1})),re=m((()=>0===le.value)),ce=m((()=>le.value===n.urlList.length-1)),de=m((()=>n.urlList[le.value])),fe=m((()=>{const{scale:e,deg:a,offsetX:l,offsetY:n,enableTransition:s}=se.value;let i=l/e,o=n/e;switch(a%360){case 90:case-270:[i,o]=[o,-i];break;case 180:case-180:[i,o]=[-i,-o];break;case 270:case-90:[i,o]=[-o,i]}const r={transform:`scale(${e}) rotate(${a}deg) translate(${i}px, ${o}px)`,transition:s?"transform .3s":""};return te.value.name===t.CONTAIN.name&&(r.maxWidth=r.maxHeight="100%"),r})),ve=m((()=>s(n.zIndex)?n.zIndex:J()));function pe(){ee.stop(),l("close")}function me(){ae.value=!1}function ge(e){ae.value=!1,e.target.alt=q("el.image.error")}function be(e){if(ae.value||0!==e.button||!Q.value)return;se.value.enableTransition=!1;const{offsetX:a,offsetY:l}=se.value,n=e.pageX,t=e.pageY,s=oe((e=>{se.value={...se.value,offsetX:a+e.pageX-n,offsetY:l+e.pageY-t}})),i=H(document,"mousemove",s);H(document,"mouseup",(()=>{i()})),e.preventDefault()}function ye(){se.value={scale:1,deg:0,offsetX:0,offsetY:0,enableTransition:!1}}function we(){if(ae.value)return;const e=Z(t),a=Object.values(t),l=te.value.name,n=(a.findIndex((e=>e.name===l))+1)%e.length;te.value=t[e[n]],ye()}function ke(){if(re.value&&!n.infinite)return;const e=n.urlList.length;le.value=(le.value-1+e)%e}function he(){if(ce.value&&!n.infinite)return;const e=n.urlList.length;le.value=(le.value+1)%e}function xe(e,a={}){if(ae.value)return;const{zoomRate:l,rotateDeg:n,enableTransition:t}={zoomRate:1.4,rotateDeg:90,enableTransition:!0,...a};switch(e){case"zoomOut":se.value.scale>.2&&(se.value.scale=Number.parseFloat((se.value.scale/l).toFixed(3)));break;case"zoomIn":se.value.scale<7&&(se.value.scale=Number.parseFloat((se.value.scale*l).toFixed(3)));break;case"clockwise":se.value.deg+=n;break;case"anticlockwise":se.value.deg-=n}se.value.enableTransition=t}return g(de,(()=>{b((()=>{const e=U.value[0];(null==e?void 0:e.complete)||(ae.value=!0)}))})),g(le,(e=>{ye(),l("switch",e)})),y((()=>{var e,a;!function(){const e=oe((e=>{switch(e.code){case K.esc:n.closeOnPressEscape&&pe();break;case K.space:we();break;case K.left:ke();break;case K.up:xe("zoomIn");break;case K.right:he();break;case K.down:xe("zoomOut")}})),a=oe((e=>{xe((e.wheelDelta?e.wheelDelta:-e.detail)>0?"zoomIn":"zoomOut",{zoomRate:1.2,enableTransition:!1})}));ee.run((()=>{H(document,"keydown",e),H(document,i,a)}))}(),null==(a=null==(e=Q.value)?void 0:e.focus)||a.call(e)})),(e,a)=>(w(),k(V,{to:"body",disabled:!e.teleported},[h(P,{name:"viewer-fade",appear:""},{default:x((()=>[I("div",{ref_key:"wrapper",ref:Q,tabindex:-1,class:C(z(G).e("wrapper")),style:F({zIndex:z(ve)})},[I("div",{class:C(z(G).e("mask")),onClick:a[0]||(a[0]=_((a=>e.hideOnClickModal&&pe()),["self"]))},null,2),O(" CLOSE "),I("span",{class:C([z(G).e("btn"),z(G).e("close")]),onClick:pe},[h(z(T),null,{default:x((()=>[h(z(E))])),_:1})],2),O(" ARROW "),z(ie)?O("v-if",!0):(w(),L(A,{key:0},[I("span",{class:C([z(G).e("btn"),z(G).e("prev"),z(G).is("disabled",!e.infinite&&z(re))]),onClick:ke},[h(z(T),null,{default:x((()=>[h(z(N))])),_:1})],2),I("span",{class:C([z(G).e("btn"),z(G).e("next"),z(G).is("disabled",!e.infinite&&z(ce))]),onClick:he},[h(z(T),null,{default:x((()=>[h(z(S))])),_:1})],2)],64)),O(" ACTIONS "),I("div",{class:C([z(G).e("btn"),z(G).e("actions")])},[I("div",{class:C(z(G).e("actions__inner"))},[h(z(T),{onClick:a[1]||(a[1]=e=>xe("zoomOut"))},{default:x((()=>[h(z(B))])),_:1}),h(z(T),{onClick:a[2]||(a[2]=e=>xe("zoomIn"))},{default:x((()=>[h(z(Y))])),_:1}),I("i",{class:C(z(G).e("actions__divider"))},null,2),h(z(T),{onClick:we},{default:x((()=>[(w(),k($(z(te).icon)))])),_:1}),I("i",{class:C(z(G).e("actions__divider"))},null,2),h(z(T),{onClick:a[3]||(a[3]=e=>xe("anticlockwise"))},{default:x((()=>[h(z(R))])),_:1}),h(z(T),{onClick:a[4]||(a[4]=e=>xe("clockwise"))},{default:x((()=>[h(z(X))])),_:1})],2)],2),O(" CANVAS "),I("div",{class:C(z(G).e("canvas"))},[(w(!0),L(A,null,j(e.urlList,((e,a)=>M((w(),L("img",{ref_for:!0,ref:e=>U.value[a]=e,key:e,src:e,style:F(z(fe)),class:C(z(G).e("img")),onLoad:me,onError:ge,onMousedown:be},null,46,ue)),[[D,a===le.value]]))),128))],2),W(e.$slots,"default")],6)])),_:3})],8,["disabled"]))}}),[["__file","/home/runner/work/element-plus/element-plus/packages/components/image-viewer/src/image-viewer.vue"]])),de=l({hideOnClickModal:{type:Boolean,default:!1},src:{type:String,default:""},fit:{type:String,values:["","contain","cover","fill","none","scale-down"],default:""},loading:{type:String,values:["eager","lazy"]},lazy:{type:Boolean,default:!1},scrollContainer:{type:n([String,Object])},previewSrcList:{type:n(Array),default:()=>t([])},previewTeleported:{type:Boolean,default:!1},zIndex:{type:Number},initialIndex:{type:Number,default:0},infinite:{type:Boolean,default:!0},closeOnPressEscape:{type:Boolean,default:!0}}),fe=["src","loading"],ve={key:0};const pe=G(q(i({name:"ElImage",inheritAttrs:!1,props:de,emits:{load:e=>e instanceof Event,error:e=>e instanceof Event,switch:e=>s(e),close:()=>!0},setup(e,{emit:l}){const n=e;let t="";const{t:s}=ne(),i=c("image"),o=J(),r=se(),u=f(),d=f(!1),v=f(!0),p=f(!1),h=f(),_=f(),T=a&&"loading"in HTMLImageElement.prototype;let E,N;const S=m((()=>o.style)),B=m((()=>{const{fit:e}=n;return a&&e?{objectFit:e}:{}})),Y=m((()=>{const{previewSrcList:e}=n;return Array.isArray(e)&&e.length>0})),$=m((()=>{const{previewSrcList:e,initialIndex:a}=n;let l=a;return a>e.length-1&&(l=0),l})),R=m((()=>"eager"!==n.loading&&(!T&&"lazy"===n.loading||n.lazy))),X=()=>{a&&(v.value=!0,d.value=!1,u.value=n.src)};function j(e){v.value=!1,d.value=!1,l("load",e)}function M(e){v.value=!1,d.value=!0,l("error",e)}function D(){((e,l)=>{if(!a||!e||!l)return!1;const n=e.getBoundingClientRect();let t;return t=l instanceof Element?l.getBoundingClientRect():{top:0,right:window.innerWidth,bottom:window.innerHeight,left:0},n.top<t.bottom&&n.bottom>t.top&&n.right>t.left&&n.left<t.right})(h.value,_.value)&&(X(),q())}const P=le(D,200);async function V(){var e;if(!a)return;await b();const{scrollContainer:l}=n;ee(l)?_.value=l:ae(l)&&""!==l?_.value=null!=(e=document.querySelector(l))?e:void 0:h.value&&(_.value=ie(h.value)),_.value&&(E=H(_,"scroll",P),setTimeout((()=>D()),100))}function q(){a&&_.value&&P&&(null==E||E(),_.value=void 0)}function K(e){if(e.ctrlKey)return e.deltaY<0||e.deltaY>0?(e.preventDefault(),!1):void 0}function Z(){Y.value&&(N=H("wheel",K,{passive:!1}),t=document.body.style.overflow,document.body.style.overflow="hidden",p.value=!0)}function G(){null==N||N(),document.body.style.overflow=t,p.value=!1,l("close")}function te(e){l("switch",e)}return g((()=>n.src),(()=>{R.value?(v.value=!0,d.value=!1,q(),V()):X()})),y((()=>{R.value?V():X()})),(e,a)=>(w(),L("div",{ref_key:"container",ref:h,class:C([z(i).b(),e.$attrs.class]),style:F(z(S))},[void 0===u.value||d.value?O("v-if",!0):(w(),L("img",Q({key:0},z(r),{src:u.value,loading:e.loading,style:z(B),class:[z(i).e("inner"),z(Y)&&z(i).e("preview"),v.value&&z(i).is("loading")],onClick:Z,onLoad:j,onError:M}),null,16,fe)),v.value||d.value?(w(),L("div",{key:1,class:C(z(i).e("wrapper"))},[v.value?W(e.$slots,"placeholder",{key:0},(()=>[I("div",{class:C(z(i).e("placeholder"))},null,2)])):d.value?W(e.$slots,"error",{key:1},(()=>[I("div",{class:C(z(i).e("error"))},U(z(s)("el.image.error")),3)])):O("v-if",!0)],2)):O("v-if",!0),z(Y)?(w(),L(A,{key:2},[p.value?(w(),k(z(ce),{key:0,"z-index":e.zIndex,"initial-index":z($),infinite:e.infinite,"url-list":e.previewSrcList,"hide-on-click-modal":e.hideOnClickModal,teleported:e.previewTeleported,"close-on-press-escape":e.closeOnPressEscape,onClose:G,onSwitch:te},{default:x((()=>[e.$slots.viewer?(w(),L("div",ve,[W(e.$slots,"viewer")])):O("v-if",!0)])),_:3},8,["z-index","initial-index","infinite","url-list","hide-on-click-modal","teleported","close-on-press-escape"])):O("v-if",!0)],64)):O("v-if",!0)],6))}}),[["__file","/home/runner/work/element-plus/element-plus/packages/components/image/src/image.vue"]]));export{pe as E,ce as a};
