(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[202],{7515:function(e,t,s){Promise.resolve().then(s.bind(s,1714))},2242:function(e,t,s){"use strict";s.d(t,{Q:function(){return n}});let n={siteurl:"https://chipshop.baiggroupltd.co.uk/",printerID:"WFAtODBD",porrtName:"COM3"}},1714:function(e,t,s){"use strict";s.r(t);var n=s(7437),l=s(8002),r=s(2513),a=s(5862),i=s(6463),c=s(2265),o=s(2242),d=s(6648),u=s(7223),x=s(4546),f=s(2204),p=s.n(f);t.default=()=>{let e=(0,i.useRouter)(),[t,s]=(0,c.useState)([]),[f,h]=(0,c.useState)(null),m=e=>t.find(t=>t.id===e),g=(e,n)=>{let l=t.findIndex(e=>e.id===n);s(t=>{let s=[...t];return s[l]=e,s})},b=async(e,t)=>{let s=await m(e);if(1==t){if(s&&(0==s.status||1==s.status)){let t=s.status+1;g({...s,status:t},e)}}else if(s&&(1==s.status||2==s.status)){let t=s.status-1;g({...s,status:t},e)}},j=()=>{let e=localStorage.getItem("addons");console.log(JSON.parse(e)),e&&s(JSON.parse(e))};return(0,c.useEffect)(()=>{j()},[]),(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)(x.Z,{children:[(0,n.jsx)(u.l,{}),(0,n.jsx)("div",{className:"flex-grow px-2 flex flex-col pt-10 pr-4 pl-6 lg:px-16 lg:pb-24",children:t.map((e,t)=>(0,n.jsxs)("div",{className:"flex w-full py-5 md:px-3 lg:px-5 lg:py-4 border-b border-b-gray-200 items-center justify-between",children:[(0,n.jsxs)("div",{className:"flex p-0 lg:p-5 justify-center items-center gap-4 lg:gap-2",children:[(0,n.jsxs)("div",{className:"flex items-center justify-center",children:[(0,n.jsx)("div",{className:"bg-black h-10 w-10 flex justify-center items-center text-white rounded-full ".concat(0==e.status?p().disabledBtn:""),children:(0,n.jsx)("button",{type:"button","data-quantity":"minus","data-field":"quantity",onClick:()=>b(e.id,0),children:(0,n.jsx)(l.Z,{size:20})})}),(0,n.jsx)("p",{className:"border border-gray-400 px-6 lg:px-8 py-2 rounded-full mx-4 flex items-center font-semibold min-w-32 justify-center",style:{userSelect:"none"},children:1!=e.status?0==e.status?"No":"Extra":"Regular"}),(0,n.jsx)("div",{className:"bg-black h-10 w-10 flex justify-center items-center text-white rounded-full ".concat(2==e.status?p().disabledBtn:""),children:(0,n.jsx)("button",{type:"button","data-quantity":"plus","data-field":"quantity",onClick:()=>b(e.id,1),children:(0,n.jsx)(r.Z,{size:20})})})]}),(0,n.jsxs)("p",{className:"font-semibold text-base lg:text-b lg:ml-5 uppercase",children:[e.addon_name,1==e.pivot.has_price&&(0,n.jsx)("span",{className:"text-sm",children:" ("+e.pivot.price+" for extra)"})]})]}),(0,n.jsx)(d.default,{src:o.Q.siteurl+"storage/"+e.addon_image,alt:"",className:"w-12 md:w-14",width:50,height:50})]},t))}),(0,n.jsxs)("div",{className:"grid grid-cols-2 justify-center py-6 px-5 bg-white shadow-[0_-2px_4px_rgba(0,0,0,0.1)] fixed w-full bottom-0 font-semibold gap-3",children:[(0,n.jsx)("button",{className:"py-4 cursor-pointer rounded-full border border-black",onClick:()=>{e.back()},children:"Cancel"}),(0,n.jsxs)("button",{onClick:()=>{localStorage.setItem("addons",JSON.stringify(t)),e.back()},className:"py-4 cursor-pointer rounded-full bg-black text-white flex items-center justify-center gap-1",children:[" ",(0,n.jsx)(a.Z,{size:18}),"Save Changes"]})]}),f?(0,n.jsx)("div",{className:"fixed px-5 py-10 bg-slate-950 bg-opacity-60 top-0 w-full flex justify-center min-h-screen",children:(0,n.jsx)("div",{className:"px-5 py-3 bg-red-800 w-fit h-fit text-white capitalize",children:"You have reached the maximum limit"})}):""]})})}},7223:function(e,t,s){"use strict";s.d(t,{l:function(){return a}});var n=s(7437),l=s(6463);s(2265);var r=s(6648);let a=e=>{let{title:t="Take Me Back",onClick:s,background:a="bg-transparent",textColor:i="bg-dark",iconInvert:c=!1}=e,o=(0,l.useRouter)();return(0,n.jsx)("div",{className:"flex w-100 justify-end px-12 pt-10 ".concat(a," ").concat(i),children:(0,n.jsxs)("button",{className:"flex items-center",onClick:()=>{s?s():o.back()},children:[(0,n.jsx)("div",{className:"icon px-1",children:(0,n.jsx)(r.default,{src:"/assets/images/goBack.svg",height:20,width:20,alt:"Go Back Button",className:c&&"invert"})}),(0,n.jsx)("div",{className:"font-semibold",children:t})]})})}},4546:function(e,t,s){"use strict";s.d(t,{Z:function(){return c}});var n=s(7437),l=s(6648),r=s(2265),a=()=>{let[e,t]=(0,r.useState)("");(0,r.useEffect)(()=>{let e=localStorage.getItem("orderType");e||(e="Eat In",localStorage.setItem("orderType",JSON.stringify(e))),t(e)},[]);let s=e=>{t(e),localStorage.setItem("orderType",e)};return(0,n.jsx)("div",{className:"w-full p-5 flex justify-center gap-2",children:"Eat In"===e?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("div",{className:"w-40 h-14 cursor-pointer bg-black text-white content-center text-center rounded-full",onClick:()=>s("Eat In"),children:"Eat In"}),(0,n.jsx)("div",{className:"w-40 h-14 cursor-pointer border border-black content-center text-center rounded-full",onClick:()=>s("Takeaway"),children:"Takeaway"})]}):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("div",{className:"w-40 h-14 cursor-pointer border border-black content-center text-center rounded-full",onClick:()=>s("Eat In"),children:"Eat In"}),(0,n.jsx)("div",{className:"w-40 h-14 cursor-pointer bg-black text-white content-center text-center rounded-full",onClick:()=>s("Takeaway"),children:"Takeaway"})]})})},i=()=>(0,n.jsxs)("nav",{className:"navbar flex flex-col justify-between px-5 items-center pb-5 pt-10 sticky top-0 gap-4",children:[(0,n.jsxs)("div",{className:"flex flex-col justify-between items-center",children:[(0,n.jsx)("div",{className:"logo-img",children:(0,n.jsx)(l.default,{src:"/assets/images/logo.png",alt:"LOGO",className:"w-20",height:100,width:200})}),(0,n.jsxs)("div",{className:"title flex",children:[(0,n.jsx)("div",{className:"home-icon"}),(0,n.jsx)("p",{className:"text-xl uppercase",children:"Papaz Pizza"})]})]}),(0,n.jsx)(a,{})]}),c=e=>{let{children:t,showNavbar:s=!0}=e;return(0,n.jsxs)("div",{className:"flex flex-col min-h-screen",children:[s&&(0,n.jsx)(i,{}),(0,n.jsx)("div",{className:"flex-1 flex flex-col",children:t})]})}},1066:function(e,t,s){"use strict";s.d(t,{Z:function(){return a}});var n=s(2265),l={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.314.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),a=(e,t)=>{let s=(0,n.forwardRef)((s,a)=>{let{color:i="currentColor",size:c=24,strokeWidth:o=2,absoluteStrokeWidth:d,className:u="",children:x,...f}=s;return(0,n.createElement)("svg",{ref:a,...l,width:c,height:c,stroke:i,strokeWidth:d?24*Number(o)/Number(c):o,className:["lucide","lucide-".concat(r(e)),u].join(" "),...f},[...t.map(e=>{let[t,s]=e;return(0,n.createElement)(t,s)}),...Array.isArray(x)?x:[x]])});return s.displayName="".concat(e),s}},5862:function(e,t,s){"use strict";s.d(t,{Z:function(){return n}});/**
 * @license lucide-react v0.314.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let n=(0,s(1066).Z)("CheckCircle",[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14",key:"g774vq"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]])},8002:function(e,t,s){"use strict";s.d(t,{Z:function(){return n}});/**
 * @license lucide-react v0.314.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let n=(0,s(1066).Z)("Minus",[["path",{d:"M5 12h14",key:"1ays0h"}]])},2513:function(e,t,s){"use strict";s.d(t,{Z:function(){return n}});/**
 * @license lucide-react v0.314.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let n=(0,s(1066).Z)("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]])},2204:function(e){e.exports={plusMinusInput:"counter_plusMinusInput__GnR3F",inputGroupField:"counter_inputGroupField__V2bqe",disabledBtn:"counter_disabledBtn__QlDCW"}}},function(e){e.O(0,[226,595,971,23,744],function(){return e(e.s=7515)}),_N_E=e.O()}]);