import{_ as t}from"./index.5b3d3b8c.js";import{d as o,l as e,m as s,aA as a,o as n,c,g as d,n as i}from"./index.03c48972.js";const l=o({name:"FixedActionBar"});var m=t(Object.assign(l,{setup(t){const o=e({isBottom:!0});function l(){var t=document.documentElement.scrollTop||document.body.scrollTop,e=document.documentElement.clientHeight||document.body.clientHeight,s=document.documentElement.scrollHeight||document.body.scrollHeight;Math.ceil(t+e)>=s?o.value.isBottom=!0:o.value.isBottom=!1}return s((()=>{l(),window.addEventListener("scroll",l)})),a((()=>{window.removeEventListener("scroll",l)})),(t,e)=>(n(),c("div",{class:i(["actionbar",{shadow:!o.value.isBottom}]),"data-fixed-calc-width":""},[d(t.$slots,"default",{},void 0,!0)],2))}}),[["__scopeId","data-v-1048a486"]]);export{m as _};
