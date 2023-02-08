(this.webpackJsonptodo16v2=this.webpackJsonptodo16v2||[]).push([[0],{132:function(t,e,n){},133:function(t,e,n){},159:function(t,e,n){"use strict";n.r(e);var a,r,c,i=n(0),s=n.n(i),o=n(34),u=n.n(o),l=(n(132),function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,225)).then((function(e){var n=e.getCLS,a=e.getFID,r=e.getFCP,c=e.getLCP,i=e.getTTFB;n(t),a(t),r(t),c(t),i(t)}))}),d=(n(133),n(23)),j=n(14),b=n.n(j),O=n(19),f=n(17),p=n(18),h=n(67),m=n.n(h),v=m.a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"API-KEY":"ccd72c64-da46-4e68-ace8-41333a566ebf"}}),x=function(){return v.get("todo-lists")},T=function(t){return v.post("todo-lists",{title:t})},g=function(t){return v.delete("todo-lists/".concat(t))},k=function(t,e){return v.put("todo-lists/".concat(t),{title:e})},I=function(t){return v.get("todo-lists/".concat(t,"/tasks"))},S=function(t,e){return v.delete("todo-lists/".concat(t,"/tasks/").concat(e))},C=function(t,e){return v.post("todo-lists/".concat(t,"/tasks"),{title:e})},y=function(t,e,n){return v.put("todo-lists/".concat(t,"/tasks/").concat(e),n)},E=function(t){return v.post("auth/login",t)},w=function(){return v.get("auth/me")},A=function(){return v.delete("auth/login")};!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(a||(a={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.Hi=2]="Hi",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(r||(r={})),function(t){t[t.OK=0]="OK",t[t.ERROR=1]="ERROR",t[t.CAPTCHA=10]="CAPTCHA"}(c||(c={}));var L=function(t,e){t.messages.length?e(F(t.messages[0])):e(F("Some error occurred")),e(K("failed"))},D=function(t,e){e(F(t.message?t.message:"Some error occurred")),e(K("failed"))},P={isLoggedIn:!1},R=function(t){return{type:"login/SET-IS-LOGGED-IN",value:t}},N={status:"idle",error:null,isInitialized:!1},F=function(t){return{type:"APP/SET-ERROR",error:t}},K=function(t){return{type:"APP/SET-STATUS",status:t}},G=function(t){return{type:"APP/SET-INITIALIZED",value:t}},H=n(3),M={},U=function(t,e){return{type:"REMOVE-TASK",taskId:t,todolistId:e}},B=function(t){return{type:"ADD-TASK",task:t}},V=function(t,e,n){return{type:"UPDATE-TASK",model:e,todolistId:n,taskId:t}},Z=function(t,e){return{type:"SET-TASKS",tasks:t,todolistId:e}},q=function(t,e,n){return function(){var a=Object(O.a)(b.a.mark((function a(r,c){var i,s,o,u,l;return b.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(a.prev=0,i=c(),s=i.tasks[n].find((function(e){return e.id===t}))){a.next=6;break}return console.warn("task not found in the state"),a.abrupt("return");case 6:return o=Object(f.a)({deadline:s.deadline,description:s.description,priority:s.priority,startDate:s.startDate,title:s.title,status:s.status},e),a.next=9,y(n,t,o);case 9:0===(u=a.sent).data.resultCode?r(V(t,e,n)):L(u.data,r),a.next=17;break;case 13:a.prev=13,a.t0=a.catch(0),l=a.t0,D(l,r);case 17:case"end":return a.stop()}}),a,null,[[0,13]])})));return function(t,e){return a.apply(this,arguments)}}()},z=[],J=function(t){return{type:"REMOVE-TODOLIST",id:t}},Y=function(t,e){return{type:"CHANGE-TODOLIST-TITLE",id:t,title:e}},_=function(){return{type:"CLEAR-DATA"}},$=n(213),Q=n(221),W=n(10),X=n(206),tt=n(214),et=n(202),nt=n(1),at=s.a.memo((function(t){var e=t.addItem,n=t.disabled,a=void 0!==n&&n;console.log("AddItemForm called");var r=Object(i.useState)(""),c=Object(W.a)(r,2),s=c[0],o=c[1],u=Object(i.useState)(null),l=Object(W.a)(u,2),d=l[0],j=l[1],b=function(){""!==s.trim()?(e(s),o("")):j("Title is required")};return Object(nt.jsxs)("div",{children:[Object(nt.jsx)(X.a,{variant:"outlined",disabled:a,error:!!d,value:s,onChange:function(t){o(t.currentTarget.value)},onKeyPress:function(t){null!==d&&j(null),13===t.charCode&&b()},label:"Title",helperText:d}),Object(nt.jsx)(tt.a,{color:"primary",onClick:b,disabled:a,children:Object(nt.jsx)(et.a,{})})]})})),rt=n(113),ct=s.a.memo((function(t){console.log("EditableSpan called");var e=Object(i.useState)(!1),n=Object(W.a)(e,2),a=n[0],r=n[1],c=Object(i.useState)(t.value),s=Object(W.a)(c,2),o=s[0],u=s[1];return a?Object(nt.jsx)(X.a,{value:o,onChange:function(t){u(t.currentTarget.value)},autoFocus:!0,onBlur:function(){r(!1),t.onChange(o)}}):Object(nt.jsx)("span",{onDoubleClick:function(){r(!0),u(t.value)},children:t.value})})),it=n(215),st=n(203),ot=n(208),ut=s.a.memo((function(t){var e=Object(i.useCallback)((function(){return t.removeTask(t.task.id,t.todolistId)}),[t.task.id,t.todolistId]),n=Object(i.useCallback)((function(e){var n=e.currentTarget.checked;t.changeTaskStatus(t.task.id,n?a.Completed:a.New,t.todolistId)}),[t.task.id,t.todolistId]),r=Object(i.useCallback)((function(e){t.changeTaskTitle(t.task.id,e,t.todolistId)}),[t.task.id,t.todolistId]);return Object(nt.jsxs)("div",{className:t.task.status===a.Completed?"is-done":"",children:[Object(nt.jsx)(ot.a,{checked:t.task.status===a.Completed,color:"primary",onChange:n}),Object(nt.jsx)(ct,{value:t.task.title,onChange:r}),Object(nt.jsx)(tt.a,{onClick:e,children:Object(nt.jsx)(st.a,{})})]},t.task.id)})),lt=s.a.memo((function(t){t.demo;var e=Object(rt.a)(t,["demo"]);console.log("Todolist called");Object(d.b)();var n=Object(i.useCallback)((function(t){e.addTask(t,e.todolist.id)}),[e.addTask,e.todolist.id]),r=Object(i.useCallback)((function(t){e.changeTodolistTitle(e.todolist.id,t)}),[e.todolist.id,e.changeTodolistTitle]),c=Object(i.useCallback)((function(){return e.changeFilter("all",e.todolist.id)}),[e.todolist.id,e.changeFilter]),s=Object(i.useCallback)((function(){return e.changeFilter("active",e.todolist.id)}),[e.todolist.id,e.changeFilter]),o=Object(i.useCallback)((function(){return e.changeFilter("completed",e.todolist.id)}),[e.todolist.id,e.changeFilter]),u=e.tasks;return"active"===e.todolist.filter&&(u=e.tasks.filter((function(t){return t.status===a.New}))),"completed"===e.todolist.filter&&(u=e.tasks.filter((function(t){return t.status===a.Completed}))),Object(nt.jsxs)("div",{children:[Object(nt.jsxs)("h3",{children:[Object(nt.jsx)(ct,{value:e.todolist.title,onChange:r}),Object(nt.jsx)(tt.a,{onClick:function(){e.removeTodolist(e.todolist.id)},disabled:"loading"===e.todolist.entityStatus,children:Object(nt.jsx)(st.a,{})})]}),Object(nt.jsx)(at,{addItem:n,disabled:"loading"===e.todolist.entityStatus}),Object(nt.jsx)("div",{children:u.map((function(t){return Object(nt.jsx)(ut,{task:t,todolistId:e.todolist.id,removeTask:e.removeTask,changeTaskTitle:e.changeTaskTitle,changeTaskStatus:e.changeTaskStatus},t.id)}))}),Object(nt.jsxs)("div",{style:{paddingTop:"10px"},children:[Object(nt.jsx)(it.a,{variant:"all"===e.todolist.filter?"outlined":"text",onClick:c,color:"inherit",children:"All"}),Object(nt.jsx)(it.a,{variant:"active"===e.todolist.filter?"outlined":"text",onClick:s,color:"primary",children:"Active"}),Object(nt.jsx)(it.a,{variant:"completed"===e.todolist.filter?"outlined":"text",onClick:o,color:"secondary",children:"Completed"})]})]})})),dt=n(13),jt=function(t){var e=t.demo,n=void 0!==e&&e,a=Object(d.c)((function(t){return t.todolists})),r=Object(d.c)((function(t){return t.tasks})),c=Object(d.b)(),s=Object(i.useCallback)((function(t,e){c(function(t,e){return function(){var n=Object(O.a)(b.a.mark((function n(a){return b.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,S(e,t);case 2:a(U(t,e));case 3:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}()}(t,e))}),[]),o=Object(i.useCallback)((function(t,e){c(function(t,e){return function(){var n=Object(O.a)(b.a.mark((function n(a){var r,c,i;return b.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,a(K("loading")),n.next=4,C(e,t);case 4:0===(r=n.sent).data.resultCode?(c=r.data.data.item,a(B(c)),a(K("succeeded"))):L(r.data,a),n.next=12;break;case 8:n.prev=8,n.t0=n.catch(0),i=n.t0,D(i,a);case 12:case"end":return n.stop()}}),n,null,[[0,8]])})));return function(t){return n.apply(this,arguments)}}()}(t,e))}),[]),u=Object(i.useCallback)((function(t,e,n){c(q(t,{status:e},n))}),[]),l=Object(i.useCallback)((function(t,e,n){c(q(t,{title:e},n))}),[]),j=Object(i.useCallback)((function(t,e){c({type:"CHANGE-TODOLIST-FILTER",id:e,filter:t})}),[]),f=Object(i.useCallback)((function(t){var e;c((e=t,function(){var t=Object(O.a)(b.a.mark((function t(n){return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n(K("loading")),n({type:"CHANGE-TODOLIST-ENTITY-STATUS",id:e,status:"loading"}),t.next=4,g(e);case 4:n(J(e)),n(K("succeeded"));case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()))}),[]),p=Object(i.useCallback)((function(t,e){c(function(t,e){return function(){var n=Object(O.a)(b.a.mark((function n(a){return b.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,k(t,e);case 2:a(Y(t,e));case 3:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}()}(t,e))}),[]),h=Object(i.useCallback)((function(t){c(function(t){return function(){var e=Object(O.a)(b.a.mark((function e(n){var a;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n(K("loading")),e.next=3,T(t);case 3:a=e.sent,n({type:"ADD-TODOLIST",todolist:a.data.data.item}),n(K("succeeded"));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}(t))}),[c]);Object(i.useEffect)((function(){!n&&m&&c(function(){var t=Object(O.a)(b.a.mark((function t(e){var n;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e(K("loading")),t.next=3,x();case 3:n=t.sent,e({type:"SET-TODOLISTS",todolists:n.data}),e(K("succeeded")),n.data.forEach((function(t){var n;e((n=t.id,function(){var t=Object(O.a)(b.a.mark((function t(e){var a,r;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e(K("loading")),t.next=3,I(n);case 3:a=t.sent,r=a.data.items,e(Z(r,n)),e(K("succeeded"));case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()))}));case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}),[]);var m=Object(d.c)((function(t){return t.auth.isLoggedIn}));return m?Object(nt.jsxs)(nt.Fragment,{children:[Object(nt.jsx)($.a,{container:!0,style:{padding:"20px"},children:Object(nt.jsx)(at,{addItem:h})}),Object(nt.jsx)($.a,{container:!0,spacing:3,children:a.map((function(t){var e=r[t.id];return Object(nt.jsx)($.a,{item:!0,children:Object(nt.jsx)(Q.a,{style:{padding:"10px"},children:Object(nt.jsx)(lt,{todolist:t,tasks:e,removeTask:s,changeFilter:j,addTask:o,changeTaskStatus:u,removeTodolist:f,changeTaskTitle:l,changeTodolistTitle:p,demo:n})})},t.id)}))})]}):Object(nt.jsx)(dt.a,{to:"/login"})},bt=n(217),Ot=n(218),ft=n(216),pt=n(220),ht=n(219),mt=n(205),vt=n(210),xt=n(209),Tt=s.a.forwardRef((function(t,e){return Object(nt.jsx)(xt.a,Object(f.a)({elevation:6,ref:e,variant:"filled"},t))}));function gt(){var t=Object(d.c)((function(t){return t.app.error})),e=Object(d.b)(),n=function(t,n){"clickaway"!==n&&e(F(null))};return Object(nt.jsx)(vt.a,{open:null!==t,autoHideDuration:6e3,onClose:n,children:Object(nt.jsx)(Tt,{onClose:n,severity:"error",sx:{width:"100%"},children:t})})}var kt=n(211),It=n(223),St=n(222),Ct=n(200),yt=n(112),Et=function(){var t=Object(d.b)(),e=Object(yt.a)({initialValues:{email:"",password:"",rememberMe:!1},validate:function(t){var e={};return t.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(t.email)||(e.email="Invalid email address"):e.email="Required",t.password?t.password.length<3&&(e.password="Invalid password length! It should be more then 3 symbols!"):e.password="Required",e},onSubmit:function(n){var a;alert(JSON.stringify(n)),e.resetForm(),t((a=n,function(){var t=Object(O.a)(b.a.mark((function t(e){var n,r,i,s;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e(K("loading")),t.next=4,E(a);case 4:(n=t.sent).data.resultCode===c.OK?(e(R(!0)),e(K("succeeded"))):L(n.data,e),t.next=13;break;case 8:t.prev=8,t.t0=t.catch(0),r=t.t0,m.a.isAxiosError(r)&&(s=(null===(i=r.response)||void 0===i?void 0:i.data)?r.response.data.error:r.message,e(F(s))),e(K("failed"));case 13:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(e){return t.apply(this,arguments)}}()))}});return Object(d.c)((function(t){return t.auth.isLoggedIn}))?Object(nt.jsx)(dt.a,{to:"/"}):Object(nt.jsx)($.a,{container:!0,justifyContent:"center",children:Object(nt.jsx)($.a,{item:!0,justifyContent:"center",children:Object(nt.jsx)("form",{onSubmit:e.handleSubmit,children:Object(nt.jsxs)(kt.a,{children:[Object(nt.jsxs)(Ct.a,{children:[Object(nt.jsxs)("p",{children:["To log in get registered",Object(nt.jsx)("a",{href:"https://social-network.samuraijs.com/",target:"_blank",children:" here"})]}),Object(nt.jsx)("p",{children:"or use common test account credentials:"}),Object(nt.jsx)("p",{children:"Email: free@samuraijs.com"}),Object(nt.jsx)("p",{children:"Password: free"})]}),Object(nt.jsxs)(St.a,{children:[Object(nt.jsx)(X.a,Object(f.a)(Object(f.a)({label:"Email",margin:"normal"},e.getFieldProps("email")),{},{onBlur:e.handleBlur})),e.touched.email&&e.errors.email?Object(nt.jsx)("div",{style:{color:"red"},children:e.errors.email}):null,Object(nt.jsx)(X.a,Object(f.a)(Object(f.a)({type:"password",label:"Password",margin:"normal"},e.getFieldProps("password")),{},{onBlur:e.handleBlur})),e.touched.password&&e.errors.password?Object(nt.jsx)("div",{style:{color:"red"},children:e.errors.password}):null,Object(nt.jsx)(It.a,{label:"Remember me",control:Object(nt.jsx)(ot.a,{onChange:e.handleChange,checked:e.values.rememberMe,name:"rememberMe"})}),Object(nt.jsx)(it.a,{type:"submit",variant:"contained",color:"primary",children:"Login"})]})]})})})})},wt=n(224);var At=function(t){var e=t.demo,n=void 0!==e&&e,a=Object(d.c)((function(t){return t.app.status})),r=Object(d.c)((function(t){return t.app.isInitialized})),s=Object(d.c)((function(t){return t.auth.isLoggedIn})),o=Object(d.b)();return Object(i.useEffect)((function(){o(function(){var t=Object(O.a)(b.a.mark((function t(e){return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,w();case 2:t.sent.data.resultCode===c.OK?(e(R(!0)),e(G(!0))):e(G(!0));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}),[]),r?Object(nt.jsxs)("div",{className:"App",children:[Object(nt.jsx)(gt,{}),Object(nt.jsxs)(bt.a,{position:"static",children:[Object(nt.jsxs)(Ot.a,{children:[Object(nt.jsx)(tt.a,{edge:"start",color:"inherit","aria-label":"menu",children:Object(nt.jsx)(mt.a,{})}),Object(nt.jsx)(ft.a,{variant:"h6",children:"News"}),s?Object(nt.jsx)(it.a,{color:"inherit",onClick:function(){o(function(){var t=Object(O.a)(b.a.mark((function t(e){var n;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e(K("loading")),t.next=3,A();case 3:n=t.sent;try{n.data.resultCode===c.OK?(e(R(!1)),e(K("succeeded")),e(_())):L(n.data,e)}catch(a){D(a,e)}case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},children:"Log out"}):Object(nt.jsx)(it.a,{color:"inherit",children:"Log in"})]}),"loading"===a&&Object(nt.jsx)(ht.a,{})]}),Object(nt.jsx)(pt.a,{fixed:!0,children:Object(nt.jsxs)(dt.d,{children:[Object(nt.jsx)(dt.b,{path:"/",element:Object(nt.jsx)(jt,{demo:n})}),Object(nt.jsx)(dt.b,{path:"/login",element:Object(nt.jsx)(Et,{})}),Object(nt.jsx)(dt.b,{path:"/404",element:Object(nt.jsx)("h1",{children:"404: PAGE NOT FOUND"})}),Object(nt.jsx)(dt.b,{path:"*",element:Object(nt.jsx)(dt.a,{to:"/404"})})]})})]}):Object(nt.jsx)("div",{style:{position:"fixed",top:"30%",textAlign:"center",width:"100%"},children:Object(nt.jsx)(wt.a,{})})},Lt=n(76),Dt=n(111),Pt=Object(Lt.b)({tasks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:M,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE-TASK":return Object(f.a)(Object(f.a)({},t),{},Object(H.a)({},e.todolistId,t[e.todolistId].filter((function(t){return t.id!==e.taskId}))));case"ADD-TASK":return Object(f.a)(Object(f.a)({},t),{},Object(H.a)({},e.task.todoListId,[e.task].concat(Object(p.a)(t[e.task.todoListId]))));case"UPDATE-TASK":return Object(f.a)(Object(f.a)({},t),{},Object(H.a)({},e.todolistId,t[e.todolistId].map((function(t){return t.id===e.taskId?Object(f.a)(Object(f.a)({},t),e.model):t}))));case"ADD-TODOLIST":return Object(f.a)(Object(f.a)({},t),{},Object(H.a)({},e.todolist.id,[]));case"REMOVE-TODOLIST":var n=Object(f.a)({},t);return delete n[e.id],n;case"SET-TODOLISTS":var a=Object(f.a)({},t);return e.todolists.forEach((function(t){a[t.id]=[]})),a;case"SET-TASKS":return Object(f.a)(Object(f.a)({},t),{},Object(H.a)({},e.todolistId,e.tasks));case"CLEAR-DATA":return{};default:return t}},todolists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:z,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE-TODOLIST":return t.filter((function(t){return t.id!==e.id}));case"ADD-TODOLIST":return[Object(f.a)(Object(f.a)({},e.todolist),{},{filter:"all",entityStatus:"idle"})].concat(Object(p.a)(t));case"CHANGE-TODOLIST-TITLE":return t.map((function(t){return t.id===e.id?Object(f.a)(Object(f.a)({},t),{},{title:e.title}):t}));case"CHANGE-TODOLIST-FILTER":return t.map((function(t){return t.id===e.id?Object(f.a)(Object(f.a)({},t),{},{filter:e.filter}):t}));case"CHANGE-TODOLIST-ENTITY-STATUS":return t.map((function(t){return t.id===e.id?Object(f.a)(Object(f.a)({},t),{},{entityStatus:e.status}):t}));case"SET-TODOLISTS":return e.todolists.map((function(t){return Object(f.a)(Object(f.a)({},t),{},{filter:"all",entityStatus:"idle"})}));case"CLEAR-DATA":return[];default:return t}},app:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:N,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"APP/SET-STATUS":return Object(f.a)(Object(f.a)({},t),{},{status:e.status});case"APP/SET-ERROR":return Object(f.a)(Object(f.a)({},t),{},{error:e.error});case"APP/SET-INITIALIZED":return Object(f.a)(Object(f.a)({},t),{},{isInitialized:e.value});default:return Object(f.a)({},t)}},auth:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:P,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"login/SET-IS-LOGGED-IN":return Object(f.a)(Object(f.a)({},t),{},{isLoggedIn:e.value});default:return t}}}),Rt=Object(Lt.c)(Pt,Object(Lt.a)(Dt.a));window.store=Rt;var Nt=n(57);u.a.render(Object(nt.jsx)(s.a.StrictMode,{children:Object(nt.jsx)(d.a,{store:Rt,children:Object(nt.jsx)(Nt.a,{children:Object(nt.jsx)(At,{})})})}),document.getElementById("root")),l()}},[[159,1,2]]]);
//# sourceMappingURL=main.555f2b08.chunk.js.map