import{_ as e}from"./index.18581e7f.js";import{l as a,o as l,c as t,p as n,A as s,f as o,a as i,s as r,w as u,ad as d,K as c,b6 as p,t as m,x as f,F as v,E as y}from"./index.03c48972.js";import"./el-tooltip.586473e3.js";import{E as b}from"./el-popper.37fe7769.js";import{E as g}from"./el-input.c98f0ce0.js";import{E as x}from"./el-avatar.791db0ef.js";import{E as h}from"./el-button.0f152581.js";/* empty css                */import{_ as k,a as N}from"./index.5b3d3b8c.js";import{_ as C}from"./index.aef88eb5.js";const _=e=>(m("data-v-956d468c"),e=e(),f(),e),w={class:"content-box"},S={key:0,class:"detail"},z={key:0},I={key:1},j={key:2,class:"tail"},A=_((()=>n("span",null,"阅读全文",-1))),V={key:0,class:"footer"},T=_((()=>n("div",{style:{"font-size":"20px"}},"🖒",-1))),B=v(" 赞同 "),D={style:{"letter-spacing":"1px","margin-left":"10px"}},E=_((()=>n("div",{style:{"font-size":"10px"}},"o(TヘTo)",-1))),H={style:{"font-size":"15px"}},U={style:{"font-size":"15px"}},M=_((()=>n("span",{style:{"font-size":"15px"}},"分享",-1))),P=_((()=>n("span",{style:{"font-size":"15px"}},"收藏",-1))),q=_((()=>n("span",{style:{"font-size":"15px"}},"收起",-1))),F={style:{display:"flex","margin-top":"10px"}},K={style:{padding:"0 10px 0 0"}},G=v(" 发表 "),J={class:"comment-box"},L={class:"comment-header"},O={class:"user"},Q={class:"detail-box"},R={style:{display:"flex","justify-content":"space-between","align-items":"center"}},W={class:"detail-head"},X={class:"userName"},Y=_((()=>n("div",{class:"time"}," 2019-12-12 11:54",-1))),Z={class:"detail-head-icon"},$=["onClick"],ee=_((()=>n("span",{style:{"letter-spacing":"1px"}},"回复",-1))),ae={class:"icon",style:{"margin-left":"5px"},viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"},le=[_((()=>n("path",{d:"M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z"},null,-1)))],te={class:"detail"},ne={key:0,style:{display:"flex"},class:"replay-box"},se=v(" 发布 ");var oe=k({__name:"index",props:{userId:{type:[String,Number],default:""},userAvatar:{type:String,default:""},problemId:{type:[String,Number],default:"",required:!0},title:{type:String,default:""},briefDetail:{type:String,default:""},detailInfo:{type:String,default:""},userName:{type:String,default:""},agreeNumber:{type:[String,Number],default:""},hasAgree:{type:Boolean,default:!1},hasStar:{type:Boolean,default:!1},commentNumber:{type:[String,Number],default:"4373"},sendTime:{type:String,default:"2019-12-12 11:54"},footerShow:{type:Boolean,default:!0},collaspeShow:{type:Boolean,default:!1},answerNumber:{type:[Number,String],default:""}},emits:["onAgree","unAgree","onCollection","enterNewPage","goDetail","onShare"],setup(m,{emit:f}){const v=m,k=a(!0),_=a(!1),oe=a(!1),ie=a([]),re=a({comment:[{name:"趣味运动会",content:"我觉得这和她原生家庭的家境好以及氛围好是密不可分的。比如家里父母社会地位本身就高，那么面对公司领导，根本不会发怵，反而很有底气。",agreeNum:3}],commentNumber:0,publishComment:"",replyText:[]});function ue(){_.value=!0}function de(){f("enterNewPage",v.problemId)}function ce(){f("goDetail",v.problemId)}function pe(){oe.value=!oe.value}function me(){}function fe(){k.value=!k.value}function ve(e){e.path[0].style.fill="red"===e.path[0].style.fill?"#909399":"red"}function ye(){}function be(){f("onShare",v.problemId)}return(a,m)=>{const ge=C,xe=N,he=y,ke=h,Ne=x,Ce=g,_e=b,we=e;return l(),t(c,null,[n("div",w,[n("div",{class:"title",onClick:de},s(v.title),1),n("div",{class:"content",onClick:ue},[_.value?o("",!0):(l(),t("div",S,[v.briefDetail?(l(),t("div",I,s(v.userName)+"： "+s(v.briefDetail),1)):(l(),t("div",z,"目前还未有回答..."))])),_.value?(l(),i(ge,{key:1,"user-name":v.userName,"agree-number":v.agreeNumber,"detail-info":v.detailInfo,"send-time":v.sendTime,"user-name-size":"15px"},null,8,["user-name","agree-number","detail-info","send-time"])):o("",!0),!_.value&&v.detailInfo?(l(),t("div",j,[A,r(he,null,{default:u((()=>[r(xe,{name:"ep:arrow-down"})])),_:1})])):o("",!0)]),v.footerShow?(l(),t("div",V,[r(ke,{type:"primary",plain:"",style:d(v.hasAgree?"background-color: #409eff;color: #ecf5ff":""),onClick:m[0]||(m[0]=e=>f("onAgree",v.problemId))},{default:u((()=>[T,B,n("span",D,s(0!==v.agreeNumber?v.agreeNumber:""),1)])),_:1},8,["style"]),r(ke,{type:"primary",plain:"",style:{padding:"5px"},onClick:m[1]||(m[1]=e=>f("unAgree",v.problemId))},{default:u((()=>[E])),_:1}),oe.value?(l(),t("div",{key:0,class:"icon-box",onClick:pe},[r(he,{class:"icon"},{default:u((()=>[r(xe,{name:"ep:chat-round"})])),_:1}),n("span",H,s(oe.value?"收起评论":v.commentNumber+"条评论"),1)])):o("",!0),v.answerNumber?(l(),t("div",{key:1,class:"icon-box",onClick:ce},[r(he,{class:"icon"},{default:u((()=>[r(xe,{name:"ep:chat-round"})])),_:1}),n("span",U,s(v.answerNumber+"条回复"),1)])):o("",!0),n("div",{class:"icon-box",onClick:be},[r(he,{class:"icon"},{default:u((()=>[r(xe,{name:"ep:promotion"})])),_:1}),M]),n("div",{class:"icon-box",onClick:m[2]||(m[2]=e=>f("onCollection",v.problemId))},[r(he,{class:"icon",style:d(v.hasStar?"color: red":"")},{default:u((()=>[r(xe,{name:"ep:star-filled"})])),_:1},8,["style"]),P]),_.value?(l(),t("div",{key:2,class:"icon-box",onClick:m[3]||(m[3]=e=>_.value=!_.value)},[r(he,{class:"icon"},{default:u((()=>[r(xe,{name:"ep:caret-top"})])),_:1}),q])):o("",!0)])):o("",!0),oe.value?(l(),t(c,{key:1},[n("div",F,[n("div",K,[r(Ne,{size:"default",fit:"cover",src:v.userAvatar},null,8,["src"])]),r(Ce,{modelValue:re.value.publishComment,"onUpdate:modelValue":m[4]||(m[4]=e=>re.value.publishComment=e),clearable:"",maxlength:"100",placeholder:"发表你的看法",class:"comment-input"},null,8,["modelValue"]),""!==re.value.publishComment&&void 0!==re.value.publishComment?(l(),i(ke,{key:0,type:"primary",size:"large",plain:"",style:{"margin-left":"10px"},onClick:me},{default:u((()=>[G])),_:1})):o("",!0)]),n("div",J,[n("div",L,[n("span",null,s(re.value.commentNumber)+" 条评论",1),n("div",{onClick:fe},[r(he,{class:"icon"},{default:u((()=>[r(_e,{effect:"dark",content:k.value?"逆序":"正序",placement:"bottom"},{default:u((()=>[r(xe,{name:k.value?"ep:caret-top":"ep:caret-bottom"},null,8,["name"])])),_:1},8,["content"])])),_:1})])]),(l(!0),t(c,null,p(re.value.comment,((e,a)=>(l(),t("div",{key:a,class:"comment"},[n("div",O,[r(he,{style:{width:"inherit",height:"inherit"}},{default:u((()=>[r(xe,{style:{width:"100%",height:"100%"},name:"user-avatar"})])),_:1})]),n("div",Q,[n("div",R,[n("div",W,[n("div",X,s(e.name),1),Y]),n("div",Z,[n("div",{class:"detail-icon-box",onClick:e=>ie.value[a]=!ie.value[a]},[r(he,{style:{"font-size":"large",color:"#909399"}},{default:u((()=>[r(xe,{name:"ep:chat-line-round"})])),_:1}),ee],8,$),n("div",{class:"detail-icon-box",onClick:ve},[(l(),t("svg",ae,le)),n("span",null,s(e.agreeNum),1)])])]),n("div",te,[n("span",null,s(e.content),1)]),ie.value[a]?(l(),t("div",ne,[r(Ce,{modelValue:re.value.replyText[a],"onUpdate:modelValue":e=>re.value.replyText[a]=e,placeholder:"回复 "+e.name,clearable:""},null,8,["modelValue","onUpdate:modelValue","placeholder"]),""!==re.value.replyText[a]&&void 0!==re.value.replyText[a]?(l(),i(ke,{key:0,type:"primary",plain:"",style:{"margin-left":"10px"},onClick:ye},{default:u((()=>[se])),_:1})):o("",!0)])):o("",!0)])])))),128))])],64)):o("",!0)]),v.collaspeShow?(l(),i(we,{key:0})):o("",!0)],64)}}},[["__scopeId","data-v-956d468c"]]);export{oe as _};
