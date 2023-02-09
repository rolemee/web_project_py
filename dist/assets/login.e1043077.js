import{_ as e}from"./index.ab5ba8bc.js";import{b as a,i as l,d as s,u as o,o as t,c as r,a as u,w as n,r as i,e as d,E as c,f as p,n as m,g as f,_ as v,h as g,j as b,k as w,l as y,m as _,p as h,q as k,v as x,s as V,t as C,x as j,y as P,z as q,A as E,B as F,C as U,D as $,F as I,G as R,H as S,I as z,J as B}from"./index.10862972.js";import{E as K,a as L}from"./el-form-item.2bce87b5.js";import{E as A}from"./el-button.b516a904.js";import{E as D}from"./el-checkbox.a8d4a77f.js";import{E as G}from"./el-input.2ed03bb1.js";/* empty css                */import{_ as H,a as J}from"./index.8b11fa54.js";import{b as M}from"./route-block.b5bad31b.js";import"./event.4982e83d.js";import"./isEqual.5524155d.js";import"./index.a1792b3c.js";const O=a({type:{type:String,values:["primary","success","warning","info","danger","default"],default:"default"},underline:{type:Boolean,default:!0},disabled:{type:Boolean,default:!1},href:{type:String,default:""},icon:{type:l,default:""}}),N=["href"];const Q=g(v(s({name:"ElLink",props:O,emits:{click:e=>e instanceof MouseEvent},setup(e,{emit:a}){const l=e,s=o("link");function v(e){l.disabled||a("click",e)}return(e,a)=>(t(),r("a",{class:m([d(s).b(),d(s).m(e.type),d(s).is("disabled",e.disabled),d(s).is("underline",e.underline&&!e.disabled)]),href:e.disabled||!e.href?void 0:e.href,onClick:v},[e.icon?(t(),u(d(c),{key:0},{default:n((()=>[(t(),u(i(e.icon)))])),_:1})):p("v-if",!0),e.$slots.default?(t(),r("span",{key:1,class:m(d(s).e("inner"))},[f(e.$slots,"default")],2)):p("v-if",!0),e.$slots.icon?f(e.$slots,"icon",{key:2}):p("v-if",!0)],10,N))}}),[["__file","/home/runner/work/element-plus/element-plus/packages/components/link/src/link.vue"]]));const T=e=>($("data-v-2e6b389b"),e=e(),I(),e),W=T((()=>h("div",{class:"bg-banner"},null,-1))),X={id:"login-box"},Y={class:"title-container"},Z={class:"title"},ee={class:"flex-bar"},ae=U("记住我"),le=U("忘记密码了?"),se=U("登录"),oe={class:"sub-link"},te=T((()=>h("span",{class:"text"},"还没有帐号?",-1))),re=U("创建新帐号"),ue=T((()=>h("div",{class:"title-container"},[h("h3",{class:"title"},"探索从这里开始! 🚀")],-1))),ne=U("注册"),ie={class:"sub-link"},de=T((()=>h("span",{class:"text"},"已经有帐号?",-1))),ce=U("去登录"),pe=T((()=>h("div",{class:"title-container"},[h("h3",{class:"title"},"修改密码")],-1))),me=U("确认"),fe={class:"sub-link"},ve=U("返回登录"),ge=s({name:"Login"}),be=Object.assign(ge,{setup(a){const{proxy:l}=B(),s=C(),o=j(),i=b(),m=w();let f=y("login");const v=y({account:localStorage.login_account||"",password:"",remember:!!localStorage.login_account}),g=y({account:[{required:!0,trigger:"blur",message:"请输入用户名"}],password:[{required:!0,trigger:"blur",message:"请输入密码"}]});function $(){l.$refs.loginFormRef.validate((e=>{if(e){_e.value=!0;let e={userId:v.value.account,password:v.value.password};m.login(e).then((()=>{_e.value=!1,v.value.remember?localStorage.setItem("login_account",v.value.account):localStorage.removeItem("login_account"),o.push(ke.value)})).catch((()=>{_e.value=!1}))}}))}const I=y({account:"",password:"",checkPassword:""}),H=y({account:[{required:!0,trigger:"blur",message:"请输入用户名"}],password:[{required:!0,trigger:"blur",message:"请输入密码"}],checkPassword:[{required:!0,trigger:"blur",message:"请再次输入密码"},{validator:(e,a,l)=>{a!==I.value.password?l(new Error("两次输入的密码不一致")):l()}}]});function M(){l.$refs.registerFormRef.validate((e=>{e&&R.post("/api/register",{userId:I.value.account,username:I.value.account,password:I.value.password}).then((e=>{S.success(e.message),f.value="login"}))}))}const O=y({email:"",captcha:"",newPassword:""});let N=y("获取验证码"),T=y(!1),ge=y(25);const be=y({email:[{required:!0,trigger:"blur",message:"请输入用户名"},{type:"email",trigger:"blur",message:"请输入正确的邮箱格式"}],captcha:[{required:!0,trigger:"blur",message:"请输入验证码"}],newPassword:[{required:!0,trigger:"blur",message:"请输入新密码"}]});function we(){l.$refs.resetFormRef.validateField("email",(e=>{if(e){T.value=!0,new Promise(((e,a)=>{R.post("/api/sendmail",{mail:O.value.email}).then((()=>{S({type:"success",message:"验证码已经发至邮箱"})})).catch((e=>{a(e)}))}));const e="{{time}}s后重新获取";N.value=e.replace("{{time}}",ge.value);let a=setInterval((()=>{ge.value--,ge.value<=0?(N.value="获取验证码",clearInterval(a),T.value=!1,ge.value=25):N.value=e.replace("{{time}}",ge.value)}),1e3)}}))}function ye(){l.$refs.resetFormRef.validate((e=>{if(e){const e={mail:O.value.email,newpassword:O.value.newPassword,checknum:O.value.captcha};R.post("/api/forgetpassword",e).then((()=>{S({type:"success",message:"密码修改成功"}),f.value="login"})).catch((e=>{}))}}))}const _e=y(!1),he=y("password"),ke=y(null);function xe(){he.value="password"===he.value?"":"password",z((()=>{l.$refs.password.focus()}))}return _((()=>{var e;ke.value=null!=(e=s.query.redirect)?e:"/"})),(a,l)=>{const s=J,o=c,m=G,b=K,w=D,y=Q,_=A,C=L,j=e;return t(),r("div",null,[W,h("div",X,[k(V(C,{ref:"loginFormRef",model:v.value,rules:g.value,class:"login-form",autocomplete:"on"},{default:n((()=>[h("div",Y,[h("h3",Z,"欢迎来到 "+P(d("问答平台"))+" ! ",1)]),h("div",null,[V(b,{prop:"account"},{default:n((()=>[V(m,{ref:"name",modelValue:v.value.account,"onUpdate:modelValue":l[0]||(l[0]=e=>v.value.account=e),placeholder:"用户名",text:"",tabindex:"1",autocomplete:"on"},{prefix:n((()=>[V(o,null,{default:n((()=>[V(s,{name:"user"})])),_:1})])),_:1},8,["modelValue"])])),_:1}),V(b,{prop:"password"},{default:n((()=>[V(m,{ref:"password",modelValue:v.value.password,"onUpdate:modelValue":l[1]||(l[1]=e=>v.value.password=e),type:he.value,placeholder:"密码",tabindex:"2",autocomplete:"on",onKeyup:q($,["enter"])},{prefix:n((()=>[V(o,null,{default:n((()=>[V(s,{name:"password"})])),_:1})])),suffix:n((()=>[V(o,null,{default:n((()=>[V(s,{name:"password"===he.value?"eye":"eye-open",onClick:xe},null,8,["name"])])),_:1})])),_:1},8,["modelValue","type","onKeyup"])])),_:1})]),h("div",ee,[V(w,{modelValue:v.value.remember,"onUpdate:modelValue":l[2]||(l[2]=e=>v.value.remember=e)},{default:n((()=>[ae])),_:1},8,["modelValue"]),V(y,{type:"primary",underline:!1,onClick:l[3]||(l[3]=e=>E(f)?f.value="reset":f="reset")},{default:n((()=>[le])),_:1})]),V(_,{loading:_e.value,type:"primary",size:"large",style:{width:"100%"},onClick:F($,["prevent"])},{default:n((()=>[se])),_:1},8,["loading","onClick"]),h("div",oe,[te,V(y,{class:"register-link",type:"primary",underline:!1,onClick:l[4]||(l[4]=e=>E(f)?f.value="register":f="register")},{default:n((()=>[re])),_:1})])])),_:1},8,["model","rules"]),[[x,"login"===d(f)]]),k(V(C,{ref:"registerFormRef",model:I.value,rules:H.value,class:"login-form","auto-complete":"on"},{default:n((()=>[ue,h("div",null,[V(b,{prop:"account"},{default:n((()=>[V(m,{ref:"name",modelValue:I.value.account,"onUpdate:modelValue":l[5]||(l[5]=e=>I.value.account=e),placeholder:"用户名",tabindex:"1",autocomplete:"on"},{prefix:n((()=>[V(o,null,{default:n((()=>[V(s,{name:"user"})])),_:1})])),_:1},8,["modelValue"])])),_:1}),V(b,{prop:"password"},{default:n((()=>[V(m,{ref:"password",modelValue:I.value.password,"onUpdate:modelValue":l[6]||(l[6]=e=>I.value.password=e),type:he.value,placeholder:"密码",tabindex:"3",autocomplete:"on"},{prefix:n((()=>[V(o,null,{default:n((()=>[V(s,{name:"password"})])),_:1})])),suffix:n((()=>[V(o,null,{default:n((()=>[V(s,{name:"password"===he.value?"eye":"eye-open",onClick:xe},null,8,["name"])])),_:1})])),_:1},8,["modelValue","type"])])),_:1}),V(b,{prop:"checkPassword"},{default:n((()=>[V(m,{ref:"checkPassword",modelValue:I.value.checkPassword,"onUpdate:modelValue":l[7]||(l[7]=e=>I.value.checkPassword=e),type:he.value,placeholder:"确认密码",tabindex:"4",autocomplete:"on"},{prefix:n((()=>[V(o,null,{default:n((()=>[V(s,{name:"password"})])),_:1})])),suffix:n((()=>[V(o,null,{default:n((()=>[V(s,{name:"password"===he.value?"eye":"eye-open",onClick:xe},null,8,["name"])])),_:1})])),_:1},8,["modelValue","type"])])),_:1})]),V(_,{loading:_e.value,type:"primary",size:"large",style:{width:"100%","margin-top":"20px"},onClick:F(M,["prevent"])},{default:n((()=>[ne])),_:1},8,["loading","onClick"]),h("div",ie,[de,V(y,{type:"primary",underline:!1,onClick:l[8]||(l[8]=e=>E(f)?f.value="login":f="login")},{default:n((()=>[ce])),_:1})])])),_:1},8,["model","rules"]),[[x,"register"===d(f)]]),k(V(C,{ref:"resetFormRef",model:O.value,rules:be.value,class:"login-form","auto-complete":"on"},{default:n((()=>[pe,h("div",null,[V(b,{prop:"account"},{default:n((()=>[V(m,{ref:"name",modelValue:O.value.email,"onUpdate:modelValue":l[9]||(l[9]=e=>O.value.email=e),placeholder:"邮箱",tabindex:"1",autocomplete:"on"},{prefix:n((()=>[V(o,null,{default:n((()=>[V(s,{name:"user"})])),_:1})])),_:1},8,["modelValue"])])),_:1}),V(b,{prop:"captcha"},{default:n((()=>[V(m,{ref:"captcha",modelValue:O.value.captcha,"onUpdate:modelValue":l[10]||(l[10]=e=>O.value.captcha=e),placeholder:"验证码",tabindex:"2",autocomplete:"on"},{prefix:n((()=>[V(o,null,{default:n((()=>[V(s,{name:"captcha"})])),_:1})])),append:n((()=>[V(_,{disabled:d(T),onClick:we},{default:n((()=>[U(P(d(N)),1)])),_:1},8,["disabled"])])),_:1},8,["modelValue"])])),_:1}),V(b,{prop:"newPassword"},{default:n((()=>[V(m,{ref:"newPassword",modelValue:O.value.newPassword,"onUpdate:modelValue":l[11]||(l[11]=e=>O.value.newPassword=e),type:he.value,placeholder:"新密码",tabindex:"3",autocomplete:"on"},{prefix:n((()=>[V(o,null,{default:n((()=>[V(s,{name:"password"})])),_:1})])),suffix:n((()=>[V(o,null,{default:n((()=>[V(s,{name:"password"===he.value?"eye":"eye-open",onClick:xe},null,8,["name"])])),_:1})])),_:1},8,["modelValue","type"])])),_:1})]),V(_,{loading:_e.value,type:"primary",size:"large",style:{width:"100%","margin-top":"20px"},onClick:F(ye,["prevent"])},{default:n((()=>[me])),_:1},8,["loading","onClick"]),h("div",fe,[V(y,{type:"primary",underline:!1,onClick:l[12]||(l[12]=e=>E(f)?f.value="login":f="login")},{default:n((()=>[ve])),_:1})])])),_:1},8,["model","rules"]),[[x,"reset"===d(f)]])]),d(i).copyright.enable?(t(),u(j,{key:0,style:{color:"#606266"}})):p("",!0)])}}});"function"==typeof M&&M(be);var we=H(be,[["__scopeId","data-v-2e6b389b"]]);export{we as default};
