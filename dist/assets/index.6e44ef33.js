import{o as e,c as a,p as s,ad as t,s as i,w as r,C as n,y as d,f as l,E as o}from"./index.10862972.js";/* empty css                */import{_ as u,a as p}from"./index.8b11fa54.js";const f={class:"detail-box"},m={class:"avatar"},c={key:1,class:"agree-box"},v={class:"content"},y={class:"expand-info-box"};var b=u({__name:"index",props:{userName:{type:String,default:"田木太太"},agreeNumber:{type:[String,Number],default:"4373"},detailInfo:{type:String,default:"detailInfo"},sendTime:{type:String,default:"2019-12-12 11:54"},userNameSize:{type:String,default:"15px"},showAvatar:{type:Boolean,default:!0}},setup(u){const b=u;return(u,g)=>{const h=p,x=o;return e(),a("div",null,[s("div",f,[b.showAvatar?(e(),a("div",{key:0,class:"user",style:t({"font-size":b.userNameSize})},[s("div",m,[i(x,{style:{width:"inherit",height:"inherit"}},{default:r((()=>[i(h,{style:{width:"100%",height:"100%"},name:"user-avatar"})])),_:1})]),n(" "+d(b.userName),1)],4)):l("",!0),0!==b.agreeNumber?(e(),a("div",c,[s("span",null,d(b.agreeNumber)+" 赞同了该回答",1)])):l("",!0),s("div",v,[s("span",null,d(b.detailInfo),1)]),s("div",y,[s("span",null,"发布于 "+d(b.sendTime),1)])])])}}},[["__scopeId","data-v-5ddeba0a"]]);export{b as _};
