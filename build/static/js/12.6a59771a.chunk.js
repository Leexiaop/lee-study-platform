(this["webpackJsonplee-study-platform"]=this["webpackJsonplee-study-platform"]||[]).push([[12],{138:function(e,t,n){"use strict";t.a={login:"/login",upload:"/upload",modules:"/modules",question:"/question",questionOnline:"/question/online",answer:"/answer",answerOnline:"/answer/online"}},153:function(e,t,n){"use strict";var a=n(17),r=n.n(a),o=n(3),s=n(49),u=n(1),c=n(4),i=n(5),l=n(13),d=n(809),p=n(197),f=n.n(p);n(200);f.a.interceptors.request.use((function(e){return e.headers.token=window.localStorage.getItem("token"),e})),f.a.interceptors.response.use((function(e){return 10001===e.data.code?(d.b.warning(e.data.msg,5),window.localStorage.clear(),window.location.href="/",!1):e}),(function(e){d.b.warning("\u54ce\u5440\uff0c\u51fa\u9519\u4e86\uff5e\uff5e",5),Promise.reject(e)}));var b=function(e){return new Promise((function(t,n){f()(e).then((function(a){a?"blob"===e.responseType?t(a):t(a.data):n(new Error)})).catch((function(e){n(e)}))}))},m=function(){function e(){Object(i.a)(this,e)}return Object(l.a)(e,null,[{key:"get",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return b(Object(c.a)({url:e,method:"get",params:t},n))}},{key:"post",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return b(Object(c.a)({url:e,method:"post",data:t},n))}},{key:"put",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return b(Object(c.a)({url:e,method:"put",data:t},n))}},{key:"delete",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return b(Object(c.a)({url:e,method:"delete",data:t},n))}},{key:"upload",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],a=arguments.length>3?arguments[3]:void 0,r=new FormData;t&&r.append("file",t);var o,s=Object(u.a)(n);try{for(s.s();!(o=s.n()).done;){var i=o.value;r.append(i.name,i.value)}}catch(l){s.e(l)}finally{s.f()}return b(Object(c.a)({url:e,method:"post",data:r},a))}},{key:"download",value:function(){var e=Object(s.a)(r.a.mark((function e(t,n){var a,s,u,i,l,p,f,m,h,j,v=arguments;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=v.length>2&&void 0!==v[2]?v[2]:{responseType:"blob"},s=null,e.next=4,b(Object(c.a)({url:t,method:"post",data:n},a)).catch((function(e){s=e}));case 4:if(u=e.sent,!s){e.next=7;break}return e.abrupt("return",{code:1,errorData:s});case 7:if(u.data){e.next=9;break}return e.abrupt("return",{code:1,data:null});case 9:if((i=null===a||void 0===a?void 0:a.filename)||(l=decodeURIComponent(u.headers["content-disposition"]||"").match(/filename=([^;]+)/)||[])[1]&&(p=Object(o.a)(l,1),i=p[0]),"json"!==(f="application/json"===u.data.type?"json":"xls")){e.next=17;break}return(m=new FileReader).onload=function(){var e="\u62a5\u9519";try{e=JSON.parse(m.result).msg}catch(t){console.log(t)}d.b.error(e)},m.readAsText(u.data),e.abrupt("return",!1);case 17:return h=window.URL.createObjectURL(new Blob([u.data],{type:u.data.type})),(j=document.createElement("a")).href=h,j.setAttribute("download",i||"\u5bfc\u51fa\u6587\u4ef6.".concat(f)),document.body.appendChild(j),j.click(),e.abrupt("return",{code:0,data:u.data,_raw:u});case 24:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()}]),e}();t.a=m},544:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var a=n(56),r=Object(a.b)({key:"userInfo",default:{username:""}})},656:function(e,t,n){},822:function(e,t,n){"use strict";n.r(t);var a=n(17),r=n.n(a),o=n(49),s=n(6),u=n(809),c=n(831),i=n(804),l=n(157),d=n(56),p=n(544),f=n(153),b=n(138),m=(n(656),n(8));t.default=function(){var e=Object(s.f)(),t=Object(d.e)(p.a),n=function(){var n=Object(o.a)(r.a.mark((function n(a){var o,s,c,i;return r.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,f.a.post(b.a.login,{username:a.username,password:a.password});case 2:if(o=n.sent,s=o.data,c=o.code,i=o.msg,u.b.success(i),!c){n.next=9;break}return n.abrupt("return");case 9:window.localStorage.setItem("token",s.token),t(s),e.push("/main/module");case 12:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}();return Object(m.jsx)("div",{className:"login",children:Object(m.jsx)("div",{className:"content",children:Object(m.jsxs)(c.a,{name:"basic",labelCol:{span:8},wrapperCol:{span:16},initialValues:{remember:!0},onFinish:n,autoComplete:"off",children:[Object(m.jsx)(c.a.Item,{label:"\u7528\u6237\u540d",name:"username",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u7528\u6237\u540d!"}],children:Object(m.jsx)(i.a,{})}),Object(m.jsx)(c.a.Item,{label:"\u5bc6\u7801",name:"password",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u5bc6\u7801!"}],children:Object(m.jsx)(i.a.Password,{})}),Object(m.jsx)(c.a.Item,{wrapperCol:{offset:8,span:16},children:Object(m.jsx)(l.a,{type:"primary",htmlType:"submit",children:"\u767b\u5f55"})})]})})})}}}]);
//# sourceMappingURL=12.6a59771a.chunk.js.map