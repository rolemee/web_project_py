import{_ as e}from"./index.5b797a78.js";import{d as a,k as t,l,c as s,s as o,w as i,x as n,o as r,p,C as c,bR as u,H as d,G as m,D as f,F as g}from"./index.10862972.js";import{E as b}from"./el-button.b516a904.js";import{_ as v}from"./index.6ab35508.js";import{E as x}from"./el-input.2ed03bb1.js";import{_ as h}from"./index.8b11fa54.js";import{c as j}from"./index.511b01b2.js";/* empty css                */import"./event.4982e83d.js";import"./index.a1792b3c.js";import"./aria.75ec5909.js";import"./focus-trap.f06a5d9a.js";import"./validator.9b90cba6.js";import"./index.bf82bf90.js";import"./scroll.aaa4d4ca.js";const y=e=>(f("data-v-4cc0c08a"),e=e(),g(),e),w=y((()=>p("div",{class:"title"}," 描述您的问题 ",-1))),z=y((()=>p("i",{style:{color:"red","font-size":"15px","margin-right":"5px"}},"*",-1))),D=y((()=>p("span",{style:{"font-weight":"bold","font-size":"16px"}},"问题描述",-1))),E=y((()=>p("span",{style:{"font-size":"12px",color:"#8a8f97"}},"（必填）",-1))),R={style:{"margin-left":"10px"}},U=y((()=>p("span",{style:{"font-weight":"bold","font-size":"14px",color:"#8a8f97"}},"问题补充说明:",-1))),V={style:{"margin-left":"10px"}},_=y((()=>p("i",{style:{color:"red","font-size":"15px","margin-right":"5px"}},"*",-1))),k=y((()=>p("span",{style:{"font-weight":"bold","font-size":"16px"}},"问题标签",-1))),C={class:"foot-button"},L=c("提交"),B=a({name:"PutQuestion"});var F=h(Object.assign(B,{setup(a){const c=t(),f=n(),g=l({labelData:"",title:"",ext:["jpg","png","jpeg","tif"],content:"",images:""}),h=l(!0);function y(){h.value&&(j.confirm('标签输入的格式为<span style="color:red;font-size: large">每个标签之间以空格分离</span><div style="color: #909399">合适标签可以提高回答的专业率<br>让你的问题被更多人看到</div>',"提示",{type:"success",showCancelButton:!1,showConfirmButton:!1,dangerouslyUseHTMLString:!0}).catch((()=>{h.value=!1})),h.value=!1)}function B(e){let a;if(e=e.replace(new RegExp("<p>","g"),"").replace(new RegExp("</p>","g"),""),new RegExp("img").test(e)){e=e.replace(new RegExp("image/","g"),"http://121.5.161.87:8888/image/");let t=new RegExp("/","g");a=e.replace(t,"\\\\/").replace(/"/g,"\\\\x22")}else{let t=new RegExp("<.+?>","g");a=e.replace(t,"")}g.value.content=a}function F(e,a){var t;c.isLogin?(t=e.filename,new Promise(((e,a)=>{const l=t().split("."),s=l[l.length-1];-1!==g.value.ext.indexOf(s)?e():(d.error(`图片上传只支持${g.value.ext.join("/")}格式`),a())}))).then((()=>{let t=new FormData;t.append("file",e.blob(),e.filename()),u({baseURL:"http://121.5.161.87:8888/",url:"/api/uploadfile",method:"post",headers:{"Content-Type":"multipart/form-data",Authorization:"Bearer "+c.token},data:t}).then((e=>{if(200===e.status)if(200===e.data.code){let t="http://121.5.161.87:8888/"+e.data.data.imageurl.replace("/","");a({imageUrl:t,status:200})}else"未检测到token"===e.data.message?d.error("登录信息已过期, 请重新登录"):d.error(e.data.message)})).catch((e=>{a({status:404})}))})):(d.error("当前未登录!!请先登录"),a({status:404}))}function P(){if(c.isLogin)if(g.value.title&&g.value.labelData){let e=new RegExp(" ","g");g.value.labelData=g.value.labelData.trim().replace(e,","),m.post("/api/postquiz",{title:g.value.title,content:g.value.content?g.value.content:" ",keywords:g.value.labelData}).then((e=>{d.success("提问提交成功"),f.push({name:"detailProblem",params:{id:e.data.qid}})}))}else g.value.title?d.success("提问时关键字不能为空,输入关键字可以得到更精准的回答哦"):d.success("提问时标题不能为空");else d.error("当前未登录!!请先登录")}return(a,t)=>{const l=x,n=v,c=b,u=e;return r(),s("div",null,[o(u,null,{default:i((()=>[w,p("div",null,[z,D,E,o(l,{modelValue:g.value.title,"onUpdate:modelValue":t[0]||(t[0]=e=>g.value.title=e),clearable:"",class:"input-title",placeholder:"一句话描述你的问题"},null,8,["modelValue"])]),p("div",R,[U,o(n,{style:{margin:"10px"},"onUpdate:modelValue":B,onUploadImage:F})]),p("div",V,[_,k,o(l,{modelValue:g.value.labelData,"onUpdate:modelValue":t[1]||(t[1]=e=>g.value.labelData=e),clearable:"",class:"input-title",placeholder:"输入标签 每个标签以空格隔开",onFocus:y},null,8,["modelValue"])]),p("div",C,[o(c,{type:"primary",plain:"",onClick:P},{default:i((()=>[L])),_:1})])])),_:1})])}}}),[["__scopeId","data-v-4cc0c08a"]]);export{F as default};
