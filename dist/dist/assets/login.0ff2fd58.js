var e=Object.defineProperty,a=Object.defineProperties,l=Object.getOwnPropertyDescriptors,s=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,t=(a,l,s)=>l in a?e(a,l,{enumerable:!0,configurable:!0,writable:!0,value:s}):a[l]=s;import{_ as n}from"./index.e876bfd6.js";import{b as u,i,d,u as c,o as p,c as m,a as f,w as v,r as g,e as b,E as w,f as y,n as _,g as h,_ as k,h as x,j as V,k as j,l as P,m as C,p as q,q as E,v as O,s as F,t as I,x as U,y as $,z as R,A as S,B as z,C as B,D,F as K,G as L,H as A,I as G,J as H}from"./index.03c48972.js";import{E as J,a as M}from"./el-form-item.4228ab23.js";import{E as N}from"./el-button.0f152581.js";import{E as Q}from"./el-checkbox.078f288b.js";import{E as T}from"./el-input.c98f0ce0.js";/* empty css                */import{_ as W,a as X}from"./index.5b3d3b8c.js";import{b as Y}from"./route-block.7fdbc26a.js";import"./event.69d56c48.js";import"./isEqual.47868e98.js";import"./index.285dd25f.js";const Z=u({type:{type:String,values:["primary","success","warning","info","danger","default"],default:"default"},underline:{type:Boolean,default:!0},disabled:{type:Boolean,default:!1},href:{type:String,default:""},icon:{type:i,default:""}}),ee={click:e=>e instanceof MouseEvent},ae=["href"],le=d((se=((e,a)=>{for(var l in a||(a={}))o.call(a,l)&&t(e,l,a[l]);if(s)for(var l of s(a))r.call(a,l)&&t(e,l,a[l]);return e})({},{name:"ElLink"}),a(se,l({props:Z,emits:ee,setup(e,{emit:a}){const l=e,s=c("link");function o(e){l.disabled||a("click",e)}return(e,a)=>(p(),m("a",{class:_([b(s).b(),b(s).m(e.type),b(s).is("disabled",e.disabled),b(s).is("underline",e.underline&&!e.disabled)]),href:e.disabled||!e.href?void 0:e.href,onClick:o},[e.icon?(p(),f(b(w),{key:0},{default:v((()=>[(p(),f(g(e.icon)))])),_:1})):y("v-if",!0),e.$slots.default?(p(),m("span",{key:1,class:_(b(s).e("inner"))},[h(e.$slots,"default")],2)):y("v-if",!0),e.$slots.icon?h(e.$slots,"icon",{key:2}):y("v-if",!0)],10,ae))}}))));var se;const oe=x(k(le,[["__file","/home/runner/work/element-plus/element-plus/packages/components/link/src/link.vue"]]));const re=e=>(I("data-v-2e6b389b"),e=e(),U(),e),te=re((()=>q("div",{class:"bg-banner"},null,-1))),ne={id:"login-box"},ue={class:"title-container"},ie={class:"title"},de={class:"flex-bar"},ce=K("记住我"),pe=K("忘记密码了?"),me=K("登录"),fe={class:"sub-link"},ve=re((()=>q("span",{class:"text"},"还没有帐号?",-1))),ge=K("创建新帐号"),be=re((()=>q("div",{class:"title-container"},[q("h3",{class:"title"},"探索从这里开始! 🚀")],-1))),we=K("注册"),ye={class:"sub-link"},_e=re((()=>q("span",{class:"text"},"已经有帐号?",-1))),he=K("去登录"),ke=re((()=>q("div",{class:"title-container"},[q("h3",{class:"title"},"修改密码")],-1))),xe=K("确认"),Ve={class:"sub-link"},je=K("返回登录"),Pe=d({name:"Login"}),Ce=Object.assign(Pe,{setup(e){const{proxy:a}=H(),l=$(),s=R(),o=V(),r=j();let t=P("login");const u=P({account:localStorage.login_account||"",password:"",remember:!!localStorage.login_account}),i=P({account:[{required:!0,trigger:"blur",message:"请输入用户名"}],password:[{required:!0,trigger:"blur",message:"请输入密码"}]});function d(){a.$refs.loginFormRef.validate((e=>{if(e){Z.value=!0;let e={userId:u.value.account,password:u.value.password};r.login(e).then((()=>{Z.value=!1,u.value.remember?localStorage.setItem("login_account",u.value.account):localStorage.removeItem("login_account"),s.push(ae.value)})).catch((()=>{Z.value=!1}))}}))}const c=P({account:"",password:"",checkPassword:""}),g=P({account:[{required:!0,trigger:"blur",message:"请输入用户名"}],password:[{required:!0,trigger:"blur",message:"请输入密码"}],checkPassword:[{required:!0,trigger:"blur",message:"请再次输入密码"},{validator:(e,a,l)=>{a!==c.value.password?l(new Error("两次输入的密码不一致")):l()}}]});function _(){a.$refs.registerFormRef.validate((e=>{e&&L.post("/api/register",{userId:c.value.account,username:c.value.account,password:c.value.password}).then((e=>{A.success(e.message),t.value="login"}))}))}const h=P({email:"",captcha:"",newPassword:""});let k=P("获取验证码"),x=P(!1),I=P(25);const U=P({email:[{required:!0,trigger:"blur",message:"请输入用户名"},{type:"email",trigger:"blur",message:"请输入正确的邮箱格式"}],captcha:[{required:!0,trigger:"blur",message:"请输入验证码"}],newPassword:[{required:!0,trigger:"blur",message:"请输入新密码"}]});function W(){a.$refs.resetFormRef.validateField("email",(e=>{if(e){x.value=!0,new Promise(((e,a)=>{L.post("/api/sendmail",{mail:h.value.email}).then((()=>{A({type:"success",message:"验证码已经发至邮箱"})})).catch((e=>{a(e)}))}));const e="{{time}}s后重新获取";k.value=e.replace("{{time}}",I.value);let a=setInterval((()=>{I.value--,I.value<=0?(k.value="获取验证码",clearInterval(a),x.value=!1,I.value=25):k.value=e.replace("{{time}}",I.value)}),1e3)}}))}function Y(){a.$refs.resetFormRef.validate((e=>{if(e){const e={mail:h.value.email,newpassword:h.value.newPassword,checknum:h.value.captcha};L.post("/api/forgetpassword",e).then((()=>{A({type:"success",message:"密码修改成功"}),t.value="login"})).catch((e=>{}))}}))}const Z=P(!1),ee=P("password"),ae=P(null);function le(){ee.value="password"===ee.value?"":"password",G((()=>{a.$refs.password.focus()}))}return C((()=>{var e;ae.value=null!=(e=l.query.redirect)?e:"/"})),(e,a)=>{const l=X,s=w,r=T,V=J,j=Q,P=oe,C=N,I=M,$=n;return p(),m("div",null,[te,q("div",ne,[E(F(I,{ref:"loginFormRef",model:u.value,rules:i.value,class:"login-form",autocomplete:"on"},{default:v((()=>[q("div",ue,[q("h3",ie,"欢迎来到 "+S(b("问答平台"))+" ! ",1)]),q("div",null,[F(V,{prop:"account"},{default:v((()=>[F(r,{ref:"name",modelValue:u.value.account,"onUpdate:modelValue":a[0]||(a[0]=e=>u.value.account=e),placeholder:"用户名",text:"",tabindex:"1",autocomplete:"on"},{prefix:v((()=>[F(s,null,{default:v((()=>[F(l,{name:"user"})])),_:1})])),_:1},8,["modelValue"])])),_:1}),F(V,{prop:"password"},{default:v((()=>[F(r,{ref:"password",modelValue:u.value.password,"onUpdate:modelValue":a[1]||(a[1]=e=>u.value.password=e),type:ee.value,placeholder:"密码",tabindex:"2",autocomplete:"on",onKeyup:z(d,["enter"])},{prefix:v((()=>[F(s,null,{default:v((()=>[F(l,{name:"password"})])),_:1})])),suffix:v((()=>[F(s,null,{default:v((()=>[F(l,{name:"password"===ee.value?"eye":"eye-open",onClick:le},null,8,["name"])])),_:1})])),_:1},8,["modelValue","type","onKeyup"])])),_:1})]),q("div",de,[F(j,{modelValue:u.value.remember,"onUpdate:modelValue":a[2]||(a[2]=e=>u.value.remember=e)},{default:v((()=>[ce])),_:1},8,["modelValue"]),F(P,{type:"primary",underline:!1,onClick:a[3]||(a[3]=e=>B(t)?t.value="reset":t="reset")},{default:v((()=>[pe])),_:1})]),F(C,{loading:Z.value,type:"primary",size:"large",style:{width:"100%"},onClick:D(d,["prevent"])},{default:v((()=>[me])),_:1},8,["loading","onClick"]),q("div",fe,[ve,F(P,{class:"register-link",type:"primary",underline:!1,onClick:a[4]||(a[4]=e=>B(t)?t.value="register":t="register")},{default:v((()=>[ge])),_:1})])])),_:1},8,["model","rules"]),[[O,"login"===b(t)]]),E(F(I,{ref:"registerFormRef",model:c.value,rules:g.value,class:"login-form","auto-complete":"on"},{default:v((()=>[be,q("div",null,[F(V,{prop:"account"},{default:v((()=>[F(r,{ref:"name",modelValue:c.value.account,"onUpdate:modelValue":a[5]||(a[5]=e=>c.value.account=e),placeholder:"用户名",tabindex:"1",autocomplete:"on"},{prefix:v((()=>[F(s,null,{default:v((()=>[F(l,{name:"user"})])),_:1})])),_:1},8,["modelValue"])])),_:1}),F(V,{prop:"password"},{default:v((()=>[F(r,{ref:"password",modelValue:c.value.password,"onUpdate:modelValue":a[6]||(a[6]=e=>c.value.password=e),type:ee.value,placeholder:"密码",tabindex:"3",autocomplete:"on"},{prefix:v((()=>[F(s,null,{default:v((()=>[F(l,{name:"password"})])),_:1})])),suffix:v((()=>[F(s,null,{default:v((()=>[F(l,{name:"password"===ee.value?"eye":"eye-open",onClick:le},null,8,["name"])])),_:1})])),_:1},8,["modelValue","type"])])),_:1}),F(V,{prop:"checkPassword"},{default:v((()=>[F(r,{ref:"checkPassword",modelValue:c.value.checkPassword,"onUpdate:modelValue":a[7]||(a[7]=e=>c.value.checkPassword=e),type:ee.value,placeholder:"确认密码",tabindex:"4",autocomplete:"on"},{prefix:v((()=>[F(s,null,{default:v((()=>[F(l,{name:"password"})])),_:1})])),suffix:v((()=>[F(s,null,{default:v((()=>[F(l,{name:"password"===ee.value?"eye":"eye-open",onClick:le},null,8,["name"])])),_:1})])),_:1},8,["modelValue","type"])])),_:1})]),F(C,{loading:Z.value,type:"primary",size:"large",style:{width:"100%","margin-top":"20px"},onClick:D(_,["prevent"])},{default:v((()=>[we])),_:1},8,["loading","onClick"]),q("div",ye,[_e,F(P,{type:"primary",underline:!1,onClick:a[8]||(a[8]=e=>B(t)?t.value="login":t="login")},{default:v((()=>[he])),_:1})])])),_:1},8,["model","rules"]),[[O,"register"===b(t)]]),E(F(I,{ref:"resetFormRef",model:h.value,rules:U.value,class:"login-form","auto-complete":"on"},{default:v((()=>[ke,q("div",null,[F(V,{prop:"account"},{default:v((()=>[F(r,{ref:"name",modelValue:h.value.email,"onUpdate:modelValue":a[9]||(a[9]=e=>h.value.email=e),placeholder:"邮箱",tabindex:"1",autocomplete:"on"},{prefix:v((()=>[F(s,null,{default:v((()=>[F(l,{name:"user"})])),_:1})])),_:1},8,["modelValue"])])),_:1}),F(V,{prop:"captcha"},{default:v((()=>[F(r,{ref:"captcha",modelValue:h.value.captcha,"onUpdate:modelValue":a[10]||(a[10]=e=>h.value.captcha=e),placeholder:"验证码",tabindex:"2",autocomplete:"on"},{prefix:v((()=>[F(s,null,{default:v((()=>[F(l,{name:"captcha"})])),_:1})])),append:v((()=>[F(C,{disabled:b(x),onClick:W},{default:v((()=>[K(S(b(k)),1)])),_:1},8,["disabled"])])),_:1},8,["modelValue"])])),_:1}),F(V,{prop:"newPassword"},{default:v((()=>[F(r,{ref:"newPassword",modelValue:h.value.newPassword,"onUpdate:modelValue":a[11]||(a[11]=e=>h.value.newPassword=e),type:ee.value,placeholder:"新密码",tabindex:"3",autocomplete:"on"},{prefix:v((()=>[F(s,null,{default:v((()=>[F(l,{name:"password"})])),_:1})])),suffix:v((()=>[F(s,null,{default:v((()=>[F(l,{name:"password"===ee.value?"eye":"eye-open",onClick:le},null,8,["name"])])),_:1})])),_:1},8,["modelValue","type"])])),_:1})]),F(C,{loading:Z.value,type:"primary",size:"large",style:{width:"100%","margin-top":"20px"},onClick:D(Y,["prevent"])},{default:v((()=>[xe])),_:1},8,["loading","onClick"]),q("div",Ve,[F(P,{type:"primary",underline:!1,onClick:a[12]||(a[12]=e=>B(t)?t.value="login":t="login")},{default:v((()=>[je])),_:1})])])),_:1},8,["model","rules"]),[[O,"reset"===b(t)]])]),b(o).copyright.enable?(p(),f($,{key:0,style:{color:"#606266"}})):y("",!0)])}}});"function"==typeof Y&&Y(Ce);var qe=W(Ce,[["__scopeId","data-v-2e6b389b"]]);export{qe as default};
