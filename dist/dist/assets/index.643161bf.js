import{d as defineComponent,k as useUserStore,l as ref,m as onMounted,a6 as onBeforeUnmount,G as api,E as ElIcon,c as createElementBlock,p as createBaseVNode,s as createVNode,w as withCtx,ad as normalizeStyle,K as Fragment,b6 as renderList,f as createCommentVNode,q as withDirectives,t as pushScopeId,x as popScopeId,y as useRoute,z as useRouter,o as openBlock,a as createBlock,A as toDisplayString,F as createTextVNode,H as ElMessage}from"./index.03c48972.js";import{v as vLoading}from"./el-loading.7ea27e0d.js";import{_ as __unplugin_components_9}from"./index.c3bae937.js";import{_ as __unplugin_components_10}from"./index.18581e7f.js";import{_ as __unplugin_components_0$1}from"./index.f5397d76.js";import{_ as __unplugin_components_0}from"./index.1dec5e8c.js";import{E as ElButton}from"./el-button.0f152581.js";/* empty css                */import{_ as _export_sfc,a as _sfc_main$1}from"./index.5b3d3b8c.js";import"./el-tooltip.586473e3.js";import"./el-popper.37fe7769.js";import"./focus-trap.05b6ecac.js";import"./event.69d56c48.js";import"./el-input.c98f0ce0.js";import"./index.285dd25f.js";import"./el-avatar.791db0ef.js";import"./index.aef88eb5.js";var index_vue_vue_type_style_index_0_scoped_true_lang="";const _withScopeId=e=>(pushScopeId("data-v-490568b4"),e=e(),popScopeId(),e),_hoisted_1={class:"header-icon-box"},_hoisted_2=createTextVNode(" 返回 "),_hoisted_3=_withScopeId((()=>createBaseVNode("span",null,"筛选",-1))),_hoisted_4={key:0,class:"filter-box"},_hoisted_5={key:0,style:{"text-align":"center",width:"100%"}},_hoisted_6={key:0,class:"answer-box"},_hoisted_7={class:"content-box"},_hoisted_8={class:"user"},_hoisted_9={class:"avatar"},_hoisted_10={class:"extend"},_hoisted_11=createTextVNode(" 的提问 · "),_hoisted_12=createTextVNode(" · 期待你的回答 "),_hoisted_13={class:"title"},_hoisted_14={class:"foot-box"},_hoisted_15={key:0},_hoisted_16={key:1},_hoisted_17=createTextVNode(" 写回答 "),_hoisted_18={key:1,class:"view-box"},__default__=defineComponent({name:"ModuleInterface"}),_sfc_main=Object.assign(__default__,{setup(__props){const userStore=useUserStore(),route=useRoute(),router=useRouter(),data=ref({changeHead:!1,userId:userStore.account,sort:{default:["默认排序","最近发布"]},sortCheck:{default:""},sortOpen:!1,type:route.params.type,sortType:"",agreeNumber:123,problems:[],loading:!1,searchData:"search-high"===route.params.type?"":route.params.keyword,searchKeywords:route.params.keyword,showMoreLoading:!1,sortShow:!0,showMore:!0,highSearch:{keywords:"",startTime:"",endTime:""},totalNum:0});function handleScroll(){data.value.changeHead=window.pageYOffset>0}function getList(type,start_time="1970-01-01",end_time=format(new Date)){api.get("api/getquiz",{params:{sort:type,start_time:start_time,end_time:end_time,userId:data.value.userId}}).then((res=>{let i=0,length=res.data.quiz_list.length;length<10&&(data.value.showMore=!1),length>0?res.data.quiz_list.forEach((item=>{api.get("api/search_answer",{params:{aid:item.max_like_reply_id,userId:data.value.userId}}).then((answer=>{++i,data.value.problems.push({title:item.title,qid:item.qid,aid:item.max_like_reply_id,username:answer.data.answer_list[0].username,agreeNum:answer.data.answer_list[0].like,hasAgree:answer.data.answer_list[0].is_like,hasStar:item.is_star,answerNum:item.ans_num,sendTime:answer.data.answer_list[0].time.replace("T"," ").split(".")[0],detailInfo:answer.data.answer_list[0].content.replace(eval("/\\\\/g"),"\\").replace(/(。|！|？)/g,"$1\n"),briefDetail:answer.data.answer_list[0].content.substring(0,100).replace(eval("/\\\\/g"),"\\").replace(/(。|！|？)/g,"$1\n")+"...."}),i===length&&(data.value.loading=!1)})).catch((()=>{++i,i===length&&(data.value.loading=!1)}))})):data.value.loading=!1})).catch((()=>data.value.loading=!1))}function getNoAnswer(){api.get("api/getquiz",{params:{sort:"noanswer"}}).then((e=>{e.data.quiz_list.forEach((e=>{data.value.problems.push({title:e.title,sendTime:e.time.replace("T"," ").split(".")[0],keyWords:""===e.keyWords[0]?[]:e.keyWords,username:e.username,qid:e.qid})})),data.value.loading=!1}))}function getSearch(q,offset=0,limit=10,start_time="1970-01-01",end_time=format(new Date)){api.get("api/search",{params:{q:q,start_time:start_time,end_time:end_time,offset:offset,limit:limit,userId:data.value.userId}}).then((res=>{let i=0,length=res.data.quiz_list.length;data.value.totalNum=res.data.total_num,length>0?res.data.quiz_list.forEach((item=>{++i,0!==item.max_like_reply_id?api.get("api/search_answer",{params:{aid:item.max_like_reply_id,userId:data.value.userId}}).then((answer=>{data.value.problems.push({title:item.title,qid:item.qid,aid:item.max_like_reply_id,username:answer.data.answer_list[0].username,agreeNum:answer.data.answer_list[0].like,hasAgree:answer.data.answer_list[0].is_like,hasStar:item.is_star,sendTime:answer.data.answer_list[0].time.replace("T"," ").split(".")[0],detailInfo:answer.data.answer_list[0].content.replace(eval("/\\\\/g"),"\\").replace(/(。|！|？)/g,"$1\n"),briefDetail:answer.data.answer_list[0].content.substring(0,100).replace(eval("/\\\\/g"),"\\").replace(/(。|！|？)/g,"$1\n")+"...."})})):data.value.problems.push({title:item.title,qid:item.qid,aid:item.max_like_reply_id,hasStar:item.is_star}),i===length&&(data.value.totalNum===data.value.problems.length&&(data.value.showMore=!1),data.value.loading=!1,data.value.showMoreLoading=!1)})):(data.value.loading=!1,data.value.showMoreLoading=!1,data.value.showMore=!1)})).catch((()=>{data.value.loading=!1,data.value.showMoreLoading=!1,data.value.showMore=!1}))}function getSearchKeywords(keywords,limit=10,offset=0){api.get("/api/searchkeywords",{params:{keywords:keywords,limit:limit,offset:offset,userId:data.value.userId}}).then((res=>{let length=res.data.quiz_list.length;length<limit&&(data.value.showMore=!1),data.value.totalNum=res.data.total_num;let i=0;length>0?res.data.quiz_list.forEach((item=>{++i,0!==item.max_like_reply_id?api.get("api/search_answer",{params:{aid:item.max_like_reply_id,userId:data.value.userId}}).then((answer=>{data.value.problems.push({title:item.title,qid:item.qid,aid:item.max_like_reply_id,username:answer.data.answer_list[0].username,agreeNum:answer.data.answer_list[0].like,hasAgree:answer.data.answer_list[0].is_like,hasStar:item.is_star,answerNum:item.ans_num,sendTime:answer.data.answer_list[0].time.replace("T"," ").split(".")[0],detailInfo:answer.data.answer_list[0].content.replace(eval("/\\\\/g"),"\\").replace(/(。|！|？)/g,"$1\n"),briefDetail:answer.data.answer_list[0].content.substring(0,100).replace(eval("/\\\\/g"),"\\").replace(/(。|！|？)/g,"$1\n")+"...."})})):data.value.problems.push({title:item.title,qid:item.qid,aid:item.max_like_reply_id,hasStar:item.is_star}),i===length&&(data.value.loading=!1,data.value.showMoreLoading=!1)})):(data.value.showMore=!1,data.value.loading=!1,data.value.showMoreLoading=!1,data.value.showMore=!1)})).catch((()=>{data.value.loading=!1,data.value.showMoreLoading=!1,data.value.showMore=!1}))}function goBack(){"search-issues"!==data.value.type&&"search-high"!==data.value.type?router.push({name:"findPageList"}):router.push({name:"searchIndex"})}function onSearch(e){router.push({name:"resultsInterface",params:{type:"search-issues",keyword:e}})}function format(e){let a,t;return a=e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1,t=e.getDate()<10?"0"+e.getDate():e.getDate(),e.getFullYear()+"-"+a+"-"+t}function sortChange(e,a){if("search-issues"!==data.value.type&&"search-keywords"!==data.value.type&&"search-high"!==data.value.type&&"answer-issues"!==data.value.type){if(data.value.sortCheck[a]=e,data.value.problems=[],"最近发布"===data.value.sortCheck.default&&"hot-issues"===data.value.type){data.value.loading=!0,getList("haveanswer",format(new Date((new Date).setFullYear((new Date).getFullYear()-1))))}"默认排序"===data.value.sortCheck.default&&(data.value.loading=!0,getList(data.value.sortType)),"最多回答"===data.value.sortCheck.default&&"new-issues"===data.value.type&&(data.value.loading=!0,getList(data.value.sortType+"sort"))}}function handleWrite(e){router.push({name:"answerQuestion",params:{problemId:e}})}function enterNewPage(e){router.push({name:"detailProblem",params:{id:e}})}function onAgree(e,a){userStore.isLogin?data.value.problems[a].hasAgree?api.get("api/removelike",{params:{aid:e}}).then((e=>{--data.value.problems[a].agreeNum,data.value.problems[a].hasAgree=!data.value.problems[a].hasAgree,ElMessage.success(e.message)})):api.get("api/like",{params:{aid:e}}).then((e=>{++data.value.problems[a].agreeNum,data.value.problems[a].hasAgree=!data.value.problems[a].hasAgree,ElMessage.success(e.message)})):ElMessage.error("当前未登录!!请先登录")}function onCollection(e,a){userStore.isLogin?data.value.problems[a].hasStar?api.get("api/removestar",{params:{qid:e}}).then((e=>{data.value.problems[a].hasStar=!data.value.problems[a].hasStar,ElMessage.success(e.message)})):api.get("api/star",{params:{qid:e}}).then((e=>{data.value.problems[a].hasStar=!data.value.problems[a].hasStar,ElMessage.success(e.message)})):ElMessage.error("当前未登录!!请先登录")}function showMore(val,callback){data.value.showMoreLoading=!0,"search-keywords"===data.value.type?getSearchKeywords(data.value.searchKeywords,10,data.value.problems.length):"search-issues"===data.value.type?getSearch(data.value.searchData,data.value.problems.length,10):"search-high"===data.value.type?data.value.startTime?getSearch(data.value.highSearch.keywords,data.value.problems.length,10,data.value.startTime,data.value.endTime):getSearch(data.value.highSearch.keywords,data.value.problems.length,10):api.get("api/getquiz",{params:{sort:data.sortType,offset:data.value.problems.length,limit:10,userId:data.value.userId}}).then((res=>{let i=0,length=res.data.quiz_list.length,cache=[];"noanswer"!==data.value.sortType?res.data.quiz_list.forEach((item=>{api.get("api/search_answer",{params:{aid:item.max_like_reply_id,userId:data.value.userId}}).then((answer=>{++i,cache.push({title:item.title,qid:item.qid,aid:item.max_like_reply_id,username:answer.data.answer_list[0].username,agreeNum:answer.data.answer_list[0].like,hasAgree:answer.data.answer_list[0].is_like,hasStar:item.is_star,answerNum:item.ans_num,sendTime:answer.data.answer_list[0].time.replace("T"," ").split(".")[0],detailInfo:answer.data.answer_list[0].content.replace(eval("/\\\\/g"),"\\").replace(/(。|！|？)/g,"$1\n"),briefDetail:answer.data.answer_list[0].content.substring(0,100).replace(eval("/\\\\/g"),"\\").replace(/(。|！|？)/g,"$1\n")+"...."}),i===length&&(data.value.problems=data.value.problems.concat(cache),data.value.showMoreLoading=!1)})).catch((()=>{++i,i===length&&(data.value.problems=data.value.problems.concat(cache),data.value.showMoreLoading=!1)}))})):(res.data.quiz_list.forEach((e=>{cache.push({title:e.title,sendTime:e.time.replace("T"," ").split(".")[0],keyWords:""===e.keyWords[0]?[]:e.keyWords,username:e.username,qid:e.qid})})),data.value.problems.concat(cache),data.value.showMoreLoading=!1,data.value.showMore=!1)})).catch((()=>{data.value.showMoreLoading=!1})),callback(!0)}return onMounted((()=>{if(data.value.sortCheck.default="默认排序",data.value.sortCheck.time="不限时间",data.value.loading=!0,data.value.problems=[],"answer-issues"===data.value.type&&(data.value.sortShow=!1,getNoAnswer()),"hot-issues"===data.value.type&&(data.value.sort={default:["默认排序","最近发布"]},getList("popular"),data.value.sortType="popular"),"new-issues"===data.value.type&&(data.value.sort={default:["默认排序","最多回答"]},getList("haveanswer"),data.value.sortType="haveanswer"),"search-issues"===data.value.type&&(data.value.sortShow=!1,getSearch(data.value.searchData),data.value.sortType="search"),"search-keywords"===data.value.type&&(data.value.sortShow=!1,getSearchKeywords(data.value.searchKeywords),data.value.sortType="searchKeywords"),"search-high"===data.value.type){let keywords,num,startTime,endTime;if(data.value.sortShow=!1,keywords=data.value.searchKeywords.split("|K")[0],eval("/T/g").test(data.value.searchKeywords.split("|K")[1])&&eval("/E/g").test(data.value.searchKeywords.split("|K")[1])){let cacheTime=data.value.searchKeywords.split("T")[1];eval("/-l/g").test(data.value.searchKeywords.split("|K")[1])&&(cacheTime=cacheTime.split("-l")[0]),startTime=cacheTime.split("E")[0],endTime=cacheTime.split("E")[1]}eval("/-l/g").test(data.value.searchKeywords.split("|K")[1])&&(num=data.value.searchKeywords.split("-l")[1]),startTime?getSearch(keywords,0,num||10,startTime,endTime):num?getSearch(keywords,0,num):getSearch(keywords),data.value.highSearch.keywords=keywords,data.value.highSearch.startTime=startTime,data.value.highSearch.endTime=endTime,data.value.sortType="searchHigh"}window.addEventListener("scroll",handleScroll)})),onBeforeUnmount((()=>{window.removeEventListener("scroll",handleScroll)})),(e,a)=>{const t=_sfc_main$1,s=ElIcon,r=ElButton,l=__unplugin_components_0,i=__unplugin_components_0$1,o=__unplugin_components_10,d=__unplugin_components_9,n=vLoading;return openBlock(),createElementBlock("div",null,[createBaseVNode("div",{class:"page-header",style:normalizeStyle(data.value.changeHead?"position: fixed;z-index: 2":"")},[createBaseVNode("div",_hoisted_1,[createVNode(r,{style:normalizeStyle({opacity:"search-keywords"!==data.value.type?1:0}),size:"default",text:"",round:"",onClick:goBack},{icon:withCtx((()=>[createVNode(s,null,{default:withCtx((()=>[createVNode(t,{name:"ep:arrow-left"})])),_:1})])),default:withCtx((()=>[_hoisted_2])),_:1},8,["style"]),createVNode(l,{"search-data":data.value.searchData,onOnSearch:onSearch},null,8,["search-data"]),createBaseVNode("div",{style:normalizeStyle({opacity:data.value.sortShow?1:0}),class:"header-icon",onClick:a[0]||(a[0]=e=>data.value.sortOpen=!data.value.sortOpen)},[createVNode(s,null,{default:withCtx((()=>[createVNode(t,{name:"ep:filter"})])),_:1}),_hoisted_3],4)]),data.value.sortOpen?(openBlock(),createElementBlock("div",_hoisted_4,[createBaseVNode("div",null,[(openBlock(!0),createElementBlock(Fragment,null,renderList(data.value.sort,((e,a)=>(openBlock(),createElementBlock("div",{key:a,class:"filter-content"},[(openBlock(!0),createElementBlock(Fragment,null,renderList(e,((e,t)=>(openBlock(),createBlock(r,{key:t,type:data.value.sortCheck[a]===e?"primary":"default",plain:"",text:"",style:normalizeStyle(data.value.sortCheck[a]===e?"background-color: #E6F0FD; color: #056DE8":""),onClick:t=>sortChange(e,a)},{default:withCtx((()=>[createBaseVNode("span",null,toDisplayString(e),1)])),_:2},1032,["type","style","onClick"])))),128))])))),128))])])):createCommentVNode("",!0)],4),withDirectives((openBlock(),createElementBlock("div",{style:normalizeStyle([{display:"flex","justify-content":"center"},data.value.changeHead?"padding-top: 60px":""])},[createVNode(d,{style:{width:"60%"}},{default:withCtx((()=>[0===data.value.problems.length?(openBlock(),createElementBlock("div",_hoisted_5,"抱歉还没该结果テ_デ")):createCommentVNode("",!0),(openBlock(!0),createElementBlock(Fragment,null,renderList(data.value.problems,((e,a)=>(openBlock(),createElementBlock(Fragment,{key:a},["answer-issues"===data.value.type?(openBlock(),createElementBlock("div",_hoisted_6,[createBaseVNode("div",_hoisted_7,[createBaseVNode("div",_hoisted_8,[createBaseVNode("div",_hoisted_9,[createVNode(s,{style:{width:"inherit",height:"inherit"}},{default:withCtx((()=>[createVNode(t,{style:{width:"100%",height:"100%"},name:"user-avatar"})])),_:1})]),createTextVNode(" "+toDisplayString(e.username)+" ",1),createBaseVNode("span",_hoisted_10,[_hoisted_11,createBaseVNode("span",null,toDisplayString(e.sendTime),1),_hoisted_12])]),createBaseVNode("div",_hoisted_13,toDisplayString(e.title),1),createBaseVNode("div",_hoisted_14,[(openBlock(!0),createElementBlock(Fragment,null,renderList(e.keyWords,((a,t)=>(openBlock(),createElementBlock("div",{key:t},[t!==e.keyWords.length-1?(openBlock(),createElementBlock("span",_hoisted_15,toDisplayString(a)+" · ",1)):(openBlock(),createElementBlock("span",_hoisted_16,toDisplayString(a),1))])))),128))])]),createVNode(r,{type:"primary",onClick:a=>handleWrite(e.qid)},{default:withCtx((()=>[createVNode(s,{style:{"margin-right":"5px"}},{default:withCtx((()=>[createVNode(t,{name:"ep:edit-pen"})])),_:1}),_hoisted_17])),_:2},1032,["onClick"])])):(openBlock(),createElementBlock("div",_hoisted_18,[createVNode(i,{"problem-id":e.qid,title:e.title,"brief-detail":e.briefDetail,"detail-info":e.detailInfo,"user-name":e.username,"agree-number":e.agreeNum,"has-agree":e.hasAgree,"has-star":e.hasStar,"send-time":e.sendTime,"answer-number":e.answerNum,onEnterNewPage:a=>enterNewPage(e.qid),onOnAgree:t=>onAgree(e.aid,a),onGoDetail:a=>enterNewPage(e.qid),onOnCollection:t=>onCollection(e.qid,a)},null,8,["problem-id","title","brief-detail","detail-info","user-name","agree-number","has-agree","has-star","send-time","answer-number","onEnterNewPage","onOnAgree","onGoDetail","onOnCollection"])]))],64)))),128)),0!==data.value.problems.length&&data.value.showMore?withDirectives((openBlock(),createBlock(o,{key:1,onUnCollaspe:showMore},null,512)),[[n,data.value.showMoreLoading]]):createCommentVNode("",!0)])),_:1})],4)),[[n,data.value.loading]])])}}});var index=_export_sfc(_sfc_main,[["__scopeId","data-v-490568b4"]]);export{index as default};
