import{l as e,o as a,c as s,s as t,w as n,B as r,t as o,x as l,E as c,p as i}from"./index.03c48972.js";import{E as m}from"./el-button.0f152581.js";import{E as p}from"./el-input.c98f0ce0.js";/* empty css                */import{_ as u,a as d}from"./index.5b3d3b8c.js";const f={class:"search-box"},h=(e=>(o("data-v-220a1ec2"),e=e(),l(),e))((()=>i("span",null,"搜索",-1)));var x=u({__name:"index",props:{max:{type:[Number,String],default:20},min:{type:[Number,String],default:0},searchData:{type:String,default:""}},emits:["onSearch"],setup(o,{emit:l}){const i=o,u=e(i.searchData);function x(){l("onSearch",u.value)}return(e,o)=>{const l=d,b=c,_=p,y=m;return a(),s("div",f,[t(_,{modelValue:u.value,"onUpdate:modelValue":o[0]||(o[0]=e=>u.value=e),type:"text",placeholder:"请输入搜索内容",clearable:"",maxlength:i.max,minlength:i.min,class:"search",onKeyup:r(x,["enter"])},{prefix:n((()=>[t(b,{class:"search-icon",onClick:x},{default:n((()=>[t(l,{name:"ep:search"})])),_:1})])),_:1},8,["modelValue","maxlength","minlength","onKeyup"]),t(y,{round:"",type:"primary","suffix-icon":"ep:search",class:"search-button",onClick:x},{default:n((()=>[h])),_:1})])}}},[["__scopeId","data-v-220a1ec2"]]);export{x as _};
