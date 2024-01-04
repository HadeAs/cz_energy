import{r as k,T as S,cl as T,aZ as E,j as N,aV as P,aC as g,B as O,J as j,aJ as z,a7 as R,a_ as Z,aE as x,a$ as F,O as w,g as A,bZ as b,aF as L,aA as I,bV as J,cm as q}from"./index-C-tyC_6H.js";function D(t){let e;const l=k(!1),s=S({...t,originalPosition:"",originalOverflow:"",visible:!1});function a(n){s.text=n}function o(){const n=s.parent,r=d.ns;if(!n.vLoadingAddClassList){let c=n.getAttribute("loading-number");c=Number.parseInt(c)-1,c?n.setAttribute("loading-number",c.toString()):(x(n,r.bm("parent","relative")),n.removeAttribute("loading-number")),x(n,r.bm("parent","hidden"))}i(),m.unmount()}function i(){var n,r;(r=(n=d.$el)==null?void 0:n.parentNode)==null||r.removeChild(d.$el)}function v(){var n;t.beforeClose&&!t.beforeClose()||(l.value=!0,clearTimeout(e),e=window.setTimeout(f,400),s.visible=!1,(n=t.closed)==null||n.call(t))}function f(){if(!l.value)return;const n=s.parent;l.value=!1,n.vLoadingAddClassList=void 0,o()}const u=N({name:"ElLoading",setup(n,{expose:r}){const{ns:c,zIndex:V}=P("loading");return r({ns:c,zIndex:V}),()=>{const C=s.spinner||s.svg,$=g("svg",{class:"circular",viewBox:s.svgViewBox?s.svgViewBox:"0 0 50 50",...C?{innerHTML:C}:{}},[g("circle",{class:"path",cx:"25",cy:"25",r:"20",fill:"none"})]),B=s.text?g("p",{class:c.b("text")},[s.text]):void 0;return g(Z,{name:c.b("fade"),onAfterLeave:f},{default:O(()=>[R(j("div",{style:{backgroundColor:s.background||""},class:[c.b("mask"),s.customClass,s.fullscreen?"is-fullscreen":""]},[g("div",{class:c.b("spinner")},[$,B])]),[[z,s.visible]])])})}}}),m=T(u),d=m.mount(document.createElement("div"));return{...E(s),setText:a,removeElLoadingChild:i,close:v,handleAfterLeave:f,vm:d,get $el(){return d.$el}}}let p;const G=function(t={}){if(!F)return;const e=H(t);if(e.fullscreen&&p)return p;const l=D({...e,closed:()=>{var a;(a=e.closed)==null||a.call(e),e.fullscreen&&(p=void 0)}});K(e,e.parent,l),_(e,e.parent,l),e.parent.vLoadingAddClassList=()=>_(e,e.parent,l);let s=e.parent.getAttribute("loading-number");return s?s=`${Number.parseInt(s)+1}`:s="1",e.parent.setAttribute("loading-number",s),e.parent.appendChild(l.$el),w(()=>l.visible.value=e.visible),e.fullscreen&&(p=l),l},H=t=>{var e,l,s,a;let o;return A(t.target)?o=(e=document.querySelector(t.target))!=null?e:document.body:o=t.target||document.body,{parent:o===document.body||t.body?document.body:o,background:t.background||"",svg:t.svg||"",svgViewBox:t.svgViewBox||"",spinner:t.spinner||!1,text:t.text||"",fullscreen:o===document.body&&((l=t.fullscreen)!=null?l:!0),lock:(s=t.lock)!=null?s:!1,customClass:t.customClass||"",visible:(a=t.visible)!=null?a:!0,target:o}},K=async(t,e,l)=>{const{nextZIndex:s}=l.vm.zIndex||l.vm._.exposed.zIndex,a={};if(t.fullscreen)l.originalPosition.value=b(document.body,"position"),l.originalOverflow.value=b(document.body,"overflow"),a.zIndex=s();else if(t.parent===document.body){l.originalPosition.value=b(document.body,"position"),await w();for(const o of["top","left"]){const i=o==="top"?"scrollTop":"scrollLeft";a[o]=`${t.target.getBoundingClientRect()[o]+document.body[i]+document.documentElement[i]-Number.parseInt(b(document.body,`margin-${o}`),10)}px`}for(const o of["height","width"])a[o]=`${t.target.getBoundingClientRect()[o]}px`}else l.originalPosition.value=b(e,"position");for(const[o,i]of Object.entries(a))l.$el.style[o]=i},_=(t,e,l)=>{const s=l.vm.ns||l.vm._.exposed.ns;["absolute","fixed","sticky"].includes(l.originalPosition.value)?x(e,s.bm("parent","relative")):L(e,s.bm("parent","relative")),t.fullscreen&&t.lock?L(e,s.bm("parent","hidden")):x(e,s.bm("parent","hidden"))},y=Symbol("ElLoading"),h=(t,e)=>{var l,s,a,o;const i=e.instance,v=n=>I(e.value)?e.value[n]:void 0,f=n=>{const r=A(n)&&(i==null?void 0:i[n])||n;return r&&k(r)},u=n=>f(v(n)||t.getAttribute(`element-loading-${q(n)}`)),m=(l=v("fullscreen"))!=null?l:e.modifiers.fullscreen,d={text:u("text"),svg:u("svg"),svgViewBox:u("svgViewBox"),spinner:u("spinner"),background:u("background"),customClass:u("customClass"),fullscreen:m,target:(s=v("target"))!=null?s:m?void 0:t,body:(a=v("body"))!=null?a:e.modifiers.body,lock:(o=v("lock"))!=null?o:e.modifiers.lock};t[y]={options:d,instance:G(d)}},M=(t,e)=>{for(const l of Object.keys(e))J(e[l])&&(e[l].value=t[l])},Q={mounted(t,e){e.value&&h(t,e)},updated(t,e){const l=t[y];e.oldValue!==e.value&&(e.value&&!e.oldValue?h(t,e):e.value&&e.oldValue?I(e.value)&&M(e.value,l.options):l==null||l.instance.close())},unmounted(t){var e;(e=t[y])==null||e.instance.close()}};export{Q as v};
