(()=>{var e={};e.id=973,e.ids=[973],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},9121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},5511:e=>{"use strict";e.exports=require("crypto")},4985:e=>{"use strict";e.exports=require("dns")},4735:e=>{"use strict";e.exports=require("events")},9021:e=>{"use strict";e.exports=require("fs")},1630:e=>{"use strict";e.exports=require("http")},3496:e=>{"use strict";e.exports=require("http2")},1645:e=>{"use strict";e.exports=require("net")},1820:e=>{"use strict";e.exports=require("os")},3873:e=>{"use strict";e.exports=require("path")},9771:e=>{"use strict";e.exports=require("process")},7910:e=>{"use strict";e.exports=require("stream")},4631:e=>{"use strict";e.exports=require("tls")},9551:e=>{"use strict";e.exports=require("url")},8354:e=>{"use strict";e.exports=require("util")},4075:e=>{"use strict";e.exports=require("zlib")},8578:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>n.a,__next_app__:()=>u,pages:()=>c,routeModule:()=>p,tree:()=>l});var o=r(260),s=r(8203),i=r(5155),n=r.n(i),a=r(7292),d={};for(let e in a)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>a[e]);r.d(t,d);let l=["",{children:["(protected)",{children:["quiz",{children:["edit",{children:["[id]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,4349)),"D:\\WSEI_FF\\frontend-lab-app\\app\\(protected)\\quiz\\edit\\[id]\\page.js"]}]},{}]},{}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,2165)),"D:\\WSEI_FF\\frontend-lab-app\\app\\(protected)\\layout.js"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,9116,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,1485,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,6055))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,9019)),"D:\\WSEI_FF\\frontend-lab-app\\app\\layout.js"],"not-found":[()=>Promise.resolve().then(r.bind(r,1617)),"D:\\WSEI_FF\\frontend-lab-app\\app\\not-found.js"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,9116,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,1485,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,6055))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],c=["D:\\WSEI_FF\\frontend-lab-app\\app\\(protected)\\quiz\\edit\\[id]\\page.js"],u={require:r,loadChunk:()=>Promise.resolve()},p=new o.AppPageRouteModule({definition:{kind:s.RouteKind.APP_PAGE,page:"/(protected)/quiz/edit/[id]/page",pathname:"/quiz/edit/[id]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},2549:(e,t,r)=>{Promise.resolve().then(r.bind(r,2165))},6117:(e,t,r)=>{Promise.resolve().then(r.bind(r,7409))},5406:(e,t,r)=>{Promise.resolve().then(r.bind(r,4349))},7158:(e,t,r)=>{Promise.resolve().then(r.bind(r,9113))},7409:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>n});var o=r(5512),s=r(5674);r(8009);var i=r(9334);let n=function({children:e}){let{user:t,loading:r}=(0,s.A)();return((0,i.useRouter)(),(0,i.usePathname)(),r)?(0,o.jsx)("div",{children:"Loading..."}):(0,o.jsx)(o.Fragment,{children:e})}},9113:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>l});var o=r(5512),s=r(8009),i=r(9334),n=r(2374),a=r(4034),d=r(7656);function l({params:e}){let{id:t}=e;(0,n.xI)();let r=(0,i.useRouter)(),[l,c]=(0,s.useState)(""),[u,p]=(0,s.useState)([]),[m,x]=(0,s.useState)(""),h=e=>{let t=[...u];t.splice(e,1),p(t)},b=(e,t,r)=>{let o=[...u];o[e][t]=r,p(o)},g=(e,t,r,o)=>{let s=[...u];s[e].options[t][r]=o,p(s)},f=(e,t)=>{let r=[...u];r[e].correctAnswer=t,p(r)},v=(e,t)=>{let r=[...u],o=r[e].correctAnswer||[];o.includes(t)?r[e].correctAnswer=o.filter(e=>e!==t):r[e].correctAnswer=[...o,t],p(r)},y=e=>{let t=[...u];"matching"===t[e].type?(t[e].options.push({pair1:"",pair2Options:[]}),t[e].correctAnswer=t[e].correctAnswer||[]):t[e].options.push({text:""}),p(t)},j=(e,t)=>{let r=[...u];r[e].options.splice(t,1),p(r)},w=(e,t)=>{let r=[...u];r[e].options[t].pair2Options.push(""),p(r)},k=(e,t,r,o)=>{let s=[...u];s[e].options[t].pair2Options[r]=o,p(s)},q=(e,t,r)=>{let o=[...u];o[e].correctAnswer[t]=r,p(o)},N=async()=>{try{await (0,d.mZ)((0,d.H9)(a.db,"quizzes",t),{title:l});let e=(0,d.rJ)(a.db,"quizzes",t,"questions");for(let t of u)t.id?await (0,d.mZ)((0,d.H9)(e,t.id),t):await (0,d.gS)(e,t);r.push("/quiz/edit")}catch(e){x("Error saving quiz."),console.error("Error saving quiz:",e)}};return(0,o.jsx)("section",{className:"bg-white",children:(0,o.jsx)("div",{className:"lg:grid lg:min-h-screen lg:grid-cols-12",children:(0,o.jsx)("main",{className:"flex items-center justify-center p-8 sm:p-12 lg:col-span-12",children:(0,o.jsxs)("div",{className:"max-w-xl lg:max-w-3xl",children:[(0,o.jsx)("h1",{className:"text-2xl font-bold text-gray-900 sm:text-3xl",children:"Edit Quiz"}),m&&(0,o.jsx)("p",{className:"mt-4 text-red-600",children:m}),(0,o.jsxs)("div",{className:"mt-8 space-y-6",children:[(0,o.jsxs)("div",{children:[(0,o.jsx)("label",{htmlFor:"title",className:"block text-sm font-medium text-gray-700",children:"Quiz Title"}),(0,o.jsx)("input",{id:"title",name:"title",type:"text",value:l,onChange:e=>c(e.target.value),className:"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"})]}),u.map((e,t)=>(0,o.jsxs)("div",{className:"border p-4 rounded-md shadow-sm",children:[(0,o.jsx)("label",{className:"block text-sm font-medium text-gray-700",children:"Question"}),(0,o.jsx)("input",{type:"text",value:e.question,onChange:e=>b(t,"question",e.target.value),className:"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"}),(0,o.jsx)("label",{className:"block text-sm font-medium text-gray-700 mt-4",children:"Type"}),(0,o.jsxs)("select",{value:e.type,onChange:e=>b(t,"type",e.target.value),className:"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",children:[(0,o.jsx)("option",{value:"single",children:"Single Choice"}),(0,o.jsx)("option",{value:"multiple",children:"Multiple Choice"}),(0,o.jsx)("option",{value:"list",children:"List"}),(0,o.jsx)("option",{value:"matching",children:"Matching"})]}),"matching"===e.type?e.options.map((e,r)=>(0,o.jsxs)("div",{className:"mt-4",children:[(0,o.jsx)("label",{className:"block text-sm font-medium text-gray-700",children:"Pair 1"}),(0,o.jsx)("input",{type:"text",value:e.pair1,onChange:e=>g(t,r,"pair1",e.target.value),className:"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"}),(0,o.jsx)("label",{className:"block text-sm font-medium text-gray-700 mt-2",children:"Pair 2 Options"}),e.pair2Options.map((e,s)=>(0,o.jsx)("input",{type:"text",value:e,onChange:e=>k(t,r,s,e.target.value),className:"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"},s)),(0,o.jsx)("button",{type:"button",onClick:()=>w(t,r),className:"inline-block rounded-sm border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden",children:"Add Pair Option"})]},r)):e.options.map((e,r)=>(0,o.jsxs)("div",{className:"mt-4",children:[(0,o.jsx)("label",{className:"block text-sm font-medium text-gray-700",children:"Option"}),(0,o.jsx)("input",{type:"text",value:e.text,onChange:e=>g(t,r,"text",e.target.value),className:"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"}),(0,o.jsx)("button",{type:"button",onClick:()=>j(t,r),className:"inline-block rounded-sm border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden",children:"Remove Option"})]},r)),(0,o.jsx)("label",{className:"block text-sm font-medium text-gray-700 mt-4",children:"Correct Answer"}),"single"===e.type||"list"===e.type?e.options.map((r,s)=>(0,o.jsxs)("div",{className:"mt-2",children:[(0,o.jsx)("input",{type:"radio",id:`correct-${t}-${s}`,name:`correct-${t}`,value:r.text,checked:e.correctAnswer===r.text,onChange:e=>f(t,e.target.value)}),(0,o.jsx)("label",{htmlFor:`correct-${t}-${s}`,className:"ml-2",children:r.text})]},s)):"multiple"===e.type?e.options.map((r,s)=>(0,o.jsxs)("div",{className:"mt-2",children:[(0,o.jsx)("input",{type:"checkbox",class:"size-4 rounded-sm border-gray-300",id:`correct-${t}-${s}`,name:`correct-${t}`,value:r.text,checked:e.correctAnswer?.includes(r.text),onChange:()=>v(t,r.text)}),(0,o.jsx)("label",{htmlFor:`correct-${t}-${s}`,className:"ml-2",children:r.text})]},s)):"matching"===e.type?e.options.map((r,s)=>(0,o.jsxs)("div",{className:"mt-2",children:[(0,o.jsxs)("label",{className:"block text-sm font-medium text-gray-700",children:["Correct Pair for ",r.pair1]}),(0,o.jsxs)("select",{value:e.correctAnswer[s]||"",onChange:e=>q(t,s,e.target.value),className:"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",children:[(0,o.jsx)("option",{value:"",disabled:!0,children:"Select a match"}),r.pair2Options.map((e,t)=>(0,o.jsx)("option",{value:e,children:e},t))]})]},s)):null,(0,o.jsx)("button",{type:"button",onClick:()=>y(t),className:"inline-block rounded-sm border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden",children:"Add Option"}),(0,o.jsx)("button",{type:"button",onClick:()=>h(t),className:"inline-block rounded-sm border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden",children:"Remove Question"})]},t)),(0,o.jsx)("button",{type:"button",onClick:()=>{p([...u,{question:"",options:[],type:"single",correctAnswer:""}])},className:"inline-block rounded-sm border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden",children:"Add Question"}),(0,o.jsx)("div",{children:(0,o.jsx)("button",{onClick:N,className:"inline-block rounded-sm border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden",children:"Save Changes"})})]})]})})})})}},9334:(e,t,r)=>{"use strict";var o=r(8686);r.o(o,"usePathname")&&r.d(t,{usePathname:function(){return o.usePathname}}),r.o(o,"useRouter")&&r.d(t,{useRouter:function(){return o.useRouter}})},2165:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});let o=(0,r(6760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"D:\\\\WSEI_FF\\\\frontend-lab-app\\\\app\\\\(protected)\\\\layout.js\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"D:\\WSEI_FF\\frontend-lab-app\\app\\(protected)\\layout.js","default")},4349:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});let o=(0,r(6760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"D:\\\\WSEI_FF\\\\frontend-lab-app\\\\app\\\\(protected)\\\\quiz\\\\edit\\\\[id]\\\\page.js\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"D:\\WSEI_FF\\frontend-lab-app\\app\\(protected)\\quiz\\edit\\[id]\\page.js","default")}};var t=require("../../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[638,644,367],()=>r(8578));module.exports=o})();