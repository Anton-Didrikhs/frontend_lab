(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[613],{8969:(e,s,r)=>{Promise.resolve().then(r.bind(r,5473))},5473:(e,s,r)=>{"use strict";r.r(s),r.d(s,{default:()=>d});var t=r(5155),a=r(2115),o=r(6046),l=r(399),n=r(5624);function d(){let{user:e}=(0,n.A)(),s=(0,o.useRouter)(),r=(0,l.xI)(),[d,i]=(0,a.useState)("");return e?null:(0,t.jsx)("section",{className:"bg-white",children:(0,t.jsxs)("div",{className:"lg:grid lg:min-h-screen lg:grid-cols-12",children:[(0,t.jsx)("aside",{className:"relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6",children:(0,t.jsx)("img",{alt:"Register",src:"https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",className:"absolute inset-0 h-full w-full object-cover"})}),(0,t.jsx)("main",{className:"flex items-center justify-center p-8 sm:p-12 lg:col-span-7 xl:col-span-6",children:(0,t.jsxs)("div",{className:"max-w-xl lg:max-w-3xl",children:[(0,t.jsx)("h1",{className:"text-2xl font-bold text-gray-900 sm:text-3xl",children:"Register"}),(0,t.jsx)("p",{class:"mt-4 leading-relaxed text-gray-500",children:"Please create an account to start creating quizzes."}),d&&(0,t.jsxs)("div",{role:"alert",class:"rounded border-s-4 border-red-500 bg-red-50 p-4",children:[(0,t.jsx)("strong",{class:"block font-medium text-red-800",children:" Something went wrong "}),(0,t.jsx)("p",{class:"mt-2 text-sm text-red-700",children:d})]}),(0,t.jsxs)("form",{onSubmit:e=>{e.preventDefault();let t={email:e.target.email.value,password:e.target.password.value,confirmPassword:e.target.confirmPassword.value};if(t.password!==t.confirmPassword){i("Passwords do not match");return}(0,l.eJ)(r,t.email,t.password).then(e=>{console.log("User registered!"),(0,l.gA)(r.currentUser).then(()=>{console.log("Email verification sent!"),s.push("/user/verify")})}).catch(e=>{i(e.message),console.dir(e)})},className:"mt-8 space-y-6",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{htmlFor:"email",className:"block text-sm font-medium text-gray-700",children:"Email address"}),(0,t.jsx)("input",{id:"email",name:"email",type:"email",autoComplete:"email",required:!0,className:"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{htmlFor:"password",className:"block text-sm font-medium text-gray-700",children:"Password"}),(0,t.jsx)("input",{id:"password",name:"password",type:"password",autoComplete:"current-password",required:!0,className:"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{htmlFor:"confirmPassword",className:"block text-sm font-medium text-gray-700",children:"Confirm Password"}),(0,t.jsx)("input",{id:"confirmPassword",name:"confirmPassword",type:"password",autoComplete:"current-password",required:!0,className:"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"})]}),(0,t.jsx)("div",{children:(0,t.jsx)("button",{type:"submit",class:"inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:ring-3 focus:outline-hidden",children:"Register"})})]})]})})]})})}},5624:(e,s,r)=>{"use strict";r.d(s,{A:()=>i,AuthProvider:()=>d});var t=r(5155),a=r(2115),o=r(1746),l=r(399);let n=(0,a.createContext)(),d=e=>{let{children:s}=e,[r,d]=(0,a.useState)(null),[i,c]=(0,a.useState)(!0);return(0,a.useEffect)(()=>{let e=(0,l.hg)(o.j,e=>{d(e),c(!1)});return()=>e()},[]),(0,t.jsx)(n.Provider,{value:{user:r,loading:i},children:s})},i=()=>(0,a.useContext)(n)},1746:(e,s,r)=>{"use strict";r.d(s,{db:()=>d,j:()=>n});var t=r(9904),a=r(399);r(2115);var o=r(7058);let l=(0,t.Dk)().length?(0,t.Sx)():(0,t.Wp)({apiKey:"AIzaSyC4alDMQyTE59y2R8moUthpfHb1xh5t1fk",authDomain:"frontendlaboratoryapp-e4d02.firebaseapp.com",projectId:"frontendlaboratoryapp-e4d02",storageBucket:"frontendlaboratoryapp-e4d02.firebasestorage.app",messagingSenderId:"235421501756",appId:"1:235421501756:web:39513633b0900ab1077639",measurementId:"G-24PFG7KK3J"}),n=(0,a.xI)(l),d=(0,o.aU)(l)},6046:(e,s,r)=>{"use strict";var t=r(6658);r.o(t,"usePathname")&&r.d(s,{usePathname:function(){return t.usePathname}}),r.o(t,"useRouter")&&r.d(s,{useRouter:function(){return t.useRouter}})}},e=>{var s=s=>e(e.s=s);e.O(0,[882,992,734,778,441,517,358],()=>s(8969)),_N_E=e.O()}]);