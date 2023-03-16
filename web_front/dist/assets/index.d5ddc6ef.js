var e=Object.defineProperty,a=Object.defineProperties,l=Object.getOwnPropertyDescriptors,t=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,o=(a,l,t)=>l in a?e(a,l,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[l]=t;import{b as n,d as i,a4 as u,u as c,l as v,X as m,a6 as f,aO as p,al as d,o as y,a as h,w as b,q as g,v as w,p as S,n as z,e as x,ad as _,ae as E,_ as k,ay as L,c as O,s as T,K as j,R as H,am as $,ab as B,Z as C,a8 as N,I as P,$ as R,a0 as X,m as A,a7 as M,g as W,r as Y,f as I,az as K,h as q}from"./index.03c48972.js";import{t as D}from"./event.69d56c48.js";const Z=Symbol("scrollbarContextKey"),F={vertical:{offset:"offsetHeight",scroll:"scrollTop",scrollSize:"scrollHeight",size:"height",key:"vertical",axis:"Y",client:"clientY",direction:"top"},horizontal:{offset:"offsetWidth",scroll:"scrollLeft",scrollSize:"scrollWidth",size:"width",key:"horizontal",axis:"X",client:"clientX",direction:"left"}};var G=k(i({__name:"thumb",props:n({vertical:Boolean,size:String,move:Number,ratio:{type:Number,required:!0},always:Boolean}),setup(e){const a=e,l=u(Z),t=c("scrollbar");l||D("Thumb","can not inject scrollbar context");const r=v(),s=v(),o=v({}),n=v(!1);let i=!1,k=!1,O=L?document.onselectstart:null;const T=m((()=>F[a.vertical?"vertical":"horizontal"])),j=m((()=>(({move:e,size:a,bar:l})=>({[l.size]:a,transform:`translate${l.axis}(${e}%)`}))({size:a.size,move:a.move,bar:T.value}))),H=m((()=>r.value[T.value.offset]**2/l.wrapElement[T.value.scrollSize]/a.ratio/s.value[T.value.offset])),$=e=>{var a;if(e.stopPropagation(),e.ctrlKey||[1,2].includes(e.button))return;null==(a=window.getSelection())||a.removeAllRanges(),C(e);const l=e.currentTarget;l&&(o.value[T.value.axis]=l[T.value.offset]-(e[T.value.client]-l.getBoundingClientRect()[T.value.direction]))},B=e=>{if(!s.value||!r.value||!l.wrapElement)return;const a=100*(Math.abs(e.target.getBoundingClientRect()[T.value.direction]-e[T.value.client])-s.value[T.value.offset]/2)*H.value/r.value[T.value.offset];l.wrapElement[T.value.scroll]=a*l.wrapElement[T.value.scrollSize]/100},C=e=>{e.stopImmediatePropagation(),i=!0,document.addEventListener("mousemove",N),document.addEventListener("mouseup",P),O=document.onselectstart,document.onselectstart=()=>!1},N=e=>{if(!r.value||!s.value)return;if(!1===i)return;const a=o.value[T.value.axis];if(!a)return;const t=100*(-1*(r.value.getBoundingClientRect()[T.value.direction]-e[T.value.client])-(s.value[T.value.offset]-a))*H.value/r.value[T.value.offset];l.wrapElement[T.value.scroll]=t*l.wrapElement[T.value.scrollSize]/100},P=()=>{i=!1,o.value[T.value.axis]=0,document.removeEventListener("mousemove",N),document.removeEventListener("mouseup",P),R(),k&&(n.value=!1)};f((()=>{R(),document.removeEventListener("mouseup",P)}));const R=()=>{document.onselectstart!==O&&(document.onselectstart=O)};return p(d(l,"scrollbarElement"),"mousemove",(()=>{k=!1,n.value=!!a.size})),p(d(l,"scrollbarElement"),"mouseleave",(()=>{k=!0,n.value=i})),(e,a)=>(y(),h(E,{name:x(t).b("fade"),persisted:""},{default:b((()=>[g(S("div",{ref_key:"instance",ref:r,class:z([x(t).e("bar"),x(t).is(x(T).key)]),onMousedown:B},[S("div",{ref_key:"thumb",ref:s,class:z(x(t).e("thumb")),style:_(x(j)),onMousedown:$},null,38)],34),[[w,e.always||n.value]])])),_:1},8,["name"]))}}),[["__file","/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/thumb.vue"]]);var J=k(i({__name:"bar",props:n({always:{type:Boolean,default:!0},width:String,height:String,ratioX:{type:Number,default:1},ratioY:{type:Number,default:1}}),setup(e,{expose:a}){const l=e,t=v(0),r=v(0);return a({handleScroll:e=>{if(e){const a=e.offsetHeight-4,s=e.offsetWidth-4;r.value=100*e.scrollTop/a*l.ratioY,t.value=100*e.scrollLeft/s*l.ratioX}}}),(e,a)=>(y(),O(j,null,[T(G,{move:t.value,ratio:e.ratioX,size:e.width,always:e.always},null,8,["move","ratio","size","always"]),T(G,{move:r.value,ratio:e.ratioY,size:e.height,vertical:"",always:e.always},null,8,["move","ratio","size","always"])],64))}}),[["__file","/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/bar.vue"]]);const Q=n({height:{type:[String,Number],default:""},maxHeight:{type:[String,Number],default:""},native:Boolean,wrapStyle:{type:H([String,Object,Array]),default:""},wrapClass:{type:[String,Array],default:""},viewClass:{type:[String,Array],default:""},viewStyle:{type:[String,Array,Object],default:""},noresize:Boolean,tag:{type:String,default:"div"},always:Boolean,minSize:{type:Number,default:20}}),U={scroll:({scrollTop:e,scrollLeft:a})=>[e,a].every($)},V=i((ee=((e,a)=>{for(var l in a||(a={}))r.call(a,l)&&o(e,l,a[l]);if(t)for(var l of t(a))s.call(a,l)&&o(e,l,a[l]);return e})({},{name:"ElScrollbar"}),a(ee,l({props:Q,emits:U,setup(e,{expose:a,emit:l}){const t=e,r=c("scrollbar");let s,o;const n=v(),i=v(),u=v(),f=v("0"),d=v("0"),g=v(),w=v(1),E=v(1),k=m((()=>{const e={};return t.height&&(e.height=B(t.height)),t.maxHeight&&(e.maxHeight=B(t.maxHeight)),[t.wrapStyle,e]})),L=()=>{var e;i.value&&(null==(e=g.value)||e.handleScroll(i.value),l("scroll",{scrollTop:i.value.scrollTop,scrollLeft:i.value.scrollLeft}))},T=()=>{if(!i.value)return;const e=i.value.offsetHeight-4,a=i.value.offsetWidth-4,l=e**2/i.value.scrollHeight,r=a**2/i.value.scrollWidth,s=Math.max(l,t.minSize),o=Math.max(r,t.minSize);w.value=l/(e-l)/(s/(e-s)),E.value=r/(a-r)/(o/(a-o)),d.value=s+4<e?`${s}px`:"",f.value=o+4<a?`${o}px`:""};return C((()=>t.noresize),(e=>{e?(null==s||s(),null==o||o()):(({stop:s}=N(u,T)),o=p("resize",T))}),{immediate:!0}),C((()=>[t.maxHeight,t.height]),(()=>{t.native||P((()=>{var e;T(),i.value&&(null==(e=g.value)||e.handleScroll(i.value))}))})),R(Z,X({scrollbarElement:n,wrapElement:i})),A((()=>{t.native||P((()=>T()))})),M((()=>T())),a({wrap$:i,update:T,scrollTo:function(e,a){K(e)?i.value.scrollTo(e):$(e)&&$(a)&&i.value.scrollTo(e,a)},setScrollTop:e=>{$(e)&&(i.value.scrollTop=e)},setScrollLeft:e=>{$(e)&&(i.value.scrollLeft=e)},handleScroll:L}),(e,a)=>(y(),O("div",{ref_key:"scrollbar$",ref:n,class:z(x(r).b())},[S("div",{ref_key:"wrap$",ref:i,class:z([e.wrapClass,x(r).e("wrap"),{[x(r).em("wrap","hidden-default")]:!e.native}]),style:_(x(k)),onScroll:L},[(y(),h(Y(e.tag),{ref_key:"resize$",ref:u,class:z([x(r).e("view"),e.viewClass]),style:_(e.viewStyle)},{default:b((()=>[W(e.$slots,"default")])),_:3},8,["class","style"]))],38),e.native?I("v-if",!0):(y(),h(J,{key:0,ref_key:"barRef",ref:g,height:d.value,width:f.value,always:e.always,"ratio-x":E.value,"ratio-y":w.value},null,8,["height","width","always","ratio-x","ratio-y"]))],2))}}))));var ee;const ae=q(k(V,[["__file","/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/scrollbar.vue"]]));export{ae as E};