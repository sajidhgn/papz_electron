(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[767],{7684:function(e,t,s){Promise.resolve().then(s.bind(s,4063))},2242:function(e,t,s){"use strict";s.d(t,{Q:function(){return l}});let l={siteurl:"https://chipshop.baiggroupltd.co.uk/",printerID:"WFAtODBD",porrtName:"COM3"}},4063:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return f}});var l=s(7437),a=s(2242);let c=async()=>{let e=await fetch(a.Q.siteurl+"api/get-deals",{next:{revalidate:3}});if(e.ok)return e.json()};var r=s(2265),n=s(7223),i=s(4546),d=s(7138),o=s(6648),x=s(2345),u=s(6463),f=()=>{let e=(0,u.useRouter)(),[t,s]=(0,r.useState)([]),[f,m]=(0,r.useState)([]),[h,g]=(0,r.useState)(!0);return(0,r.useEffect)(()=>{(async()=>{try{let e=await c();s(e),localStorage.setItem("allDeals",JSON.stringify(e)),console.log(e);let t=localStorage.getItem("ProductCategories");m(JSON.parse(t))}catch(e){console.error("Error fetching deal items:",e)}finally{g(!1)}})()},[]),(0,l.jsx)(l.Fragment,{children:(0,l.jsx)(i.Z,{children:(0,l.jsxs)("div",{className:"flex w-full flex-1 pb-36",children:[(0,l.jsx)("div",{className:"w-1/5",children:(0,l.jsx)(x.Z,{data:f})}),(0,l.jsxs)("div",{className:"w-4/5 flex flex-col",children:[(0,l.jsx)(n.l,{title:"Main Menu",onClick:()=>e.push("/category")}),h?(0,l.jsx)("p",{children:"Loading..."}):t&&(0,l.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-3 gap-3",children:t.map((e,t)=>(0,l.jsx)("div",{children:(0,l.jsxs)(d.default,{href:"deals/".concat(e.id),className:"flex flex-col items-center mb-8",children:[(0,l.jsx)(o.default,{src:a.Q.siteurl+"storage/"+e.deal_image,className:"w-36 lg:w-64 object-contain aspect-square",alt:e.deal_name+" Image",width:50,height:50}),(0,l.jsxs)("div",{className:"flex flex-col items-center",children:[(0,l.jsx)("p",{className:"text-center text-xl lg:text-3xl",children:e.deal_name}),(0,l.jsx)("p",{className:"text-center text-base",children:e.description})]})]})},t))})]})]})})})}},7223:function(e,t,s){"use strict";s.d(t,{l:function(){return r}});var l=s(7437),a=s(6463);s(2265);var c=s(6648);let r=e=>{let{title:t="Take Me Back",onClick:s,background:r="bg-transparent",textColor:n="bg-dark",iconInvert:i=!1}=e,d=(0,a.useRouter)();return(0,l.jsx)("div",{className:"flex w-100 justify-end px-12 pt-10 ".concat(r," ").concat(n),children:(0,l.jsxs)("button",{className:"flex items-center",onClick:()=>{s?s():d.back()},children:[(0,l.jsx)("div",{className:"icon px-1",children:(0,l.jsx)(c.default,{src:"/assets/images/goBack.svg",height:20,width:20,alt:"Go Back Button",className:i&&"invert"})}),(0,l.jsx)("div",{className:"font-semibold",children:t})]})})}},4546:function(e,t,s){"use strict";s.d(t,{Z:function(){return i}});var l=s(7437),a=s(6648),c=s(2265),r=()=>{let[e,t]=(0,c.useState)("");(0,c.useEffect)(()=>{let e=localStorage.getItem("orderType");e||(e="Eat In",localStorage.setItem("orderType",JSON.stringify(e))),t(e)},[]);let s=e=>{t(e),localStorage.setItem("orderType",e)};return(0,l.jsx)("div",{className:"w-full p-5 flex justify-center gap-2",children:"Eat In"===e?(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("div",{className:"w-40 h-14 cursor-pointer bg-black text-white content-center text-center rounded-full",onClick:()=>s("Eat In"),children:"Eat In"}),(0,l.jsx)("div",{className:"w-40 h-14 cursor-pointer border border-black content-center text-center rounded-full",onClick:()=>s("Takeaway"),children:"Takeaway"})]}):(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("div",{className:"w-40 h-14 cursor-pointer border border-black content-center text-center rounded-full",onClick:()=>s("Eat In"),children:"Eat In"}),(0,l.jsx)("div",{className:"w-40 h-14 cursor-pointer bg-black text-white content-center text-center rounded-full",onClick:()=>s("Takeaway"),children:"Takeaway"})]})})},n=()=>(0,l.jsxs)("nav",{className:"navbar flex flex-col justify-between px-5 items-center pb-5 pt-10 sticky top-0 gap-4",children:[(0,l.jsxs)("div",{className:"flex flex-col justify-between items-center",children:[(0,l.jsx)("div",{className:"logo-img",children:(0,l.jsx)(a.default,{src:"/assets/images/logo.png",alt:"LOGO",className:"w-20",height:100,width:200})}),(0,l.jsxs)("div",{className:"title flex",children:[(0,l.jsx)("div",{className:"home-icon"}),(0,l.jsx)("p",{className:"text-xl uppercase",children:"Papaz Pizza"})]})]}),(0,l.jsx)(r,{})]}),i=e=>{let{children:t,showNavbar:s=!0}=e;return(0,l.jsxs)("div",{className:"flex flex-col min-h-screen",children:[s&&(0,l.jsx)(n,{}),(0,l.jsx)("div",{className:"flex-1 flex flex-col",children:t})]})}},2345:function(e,t,s){"use strict";var l=s(7437),a=s(7138);s(2265);var c=s(2242),r=s(6648);t.Z=e=>(0,l.jsx)("div",{className:"h-full fixed flex items-start pt-20 w-1/5",children:(0,l.jsx)("div",{className:"flex flex-col overflow-y-scroll w-full gap-2",style:{scrollbarWidth:"none",maxHeight:"60%"},children:e.data.map((e,t)=>(0,l.jsx)(a.default,{href:"/category/".concat(e.id),children:(0,l.jsxs)("div",{className:"my-2 flex flex-col items-center",children:[(0,l.jsx)(r.default,{src:(null===c.Q||void 0===c.Q?void 0:c.Q.siteurl)+"storage/"+e.image,className:"w-12 md:w-16 lg:w-28",alt:e.name,width:50,height:50}),(0,l.jsx)("div",{className:"font-semibold",children:e.name})]})},t))})})}},function(e){e.O(0,[595,138,971,23,744],function(){return e(e.s=7684)}),_N_E=e.O()}]);