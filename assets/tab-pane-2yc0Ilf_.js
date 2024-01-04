import{aL as ge,bg as Ne,ax as Ce,b as I,e as Y,bh as le,j as F,k as K,aB as G,Q as Z,m as U,r as C,w as R,O as ee,bi as oe,o as re,c as ie,y as ce,x as B,L as Te,_ as ue,bj as k,bk as Pe,bl as we,q as L,v as de,aM as Se,J as v,E as V,bm as Ee,bn as $e,bo as xe,aO as D,N as Be,aD as Oe,K as X,av as ke,U as be,b1 as ae,g as Re,h as ze,bp as Ae,bq as se,T as Fe,br as Le,a7 as Me,aJ as Ve,F as De,R as Ie,bs as Ke}from"./index-C-tyC_6H.js";const Ue=(e,n,d)=>Ne(e.subTree).filter(t=>{var l;return Ce(t)&&((l=t.type)==null?void 0:l.name)===n&&!!t.component}).map(t=>t.component.uid).map(t=>d[t]).filter(t=>!!t),qe=(e,n)=>{const d={},T=ge([]);return{children:T,addChild:l=>{d[l.uid]=l,T.value=Ue(e,n,d)},removeChild:l=>{delete d[l],T.value=T.value.filter($=>$.uid!==l)}}},q=Symbol("tabsRootContextKey"),je=I({tabs:{type:Y(Array),default:()=>le([])}}),ve="ElTabBar",He=F({name:ve}),Je=F({...He,props:je,setup(e,{expose:n}){const d=e,T=K(),i=G(q);i||Z(ve,"<el-tabs><el-tab-bar /></el-tabs>");const t=U("tabs"),l=C(),$=C(),b=()=>{let f=0,m=0;const c=["top","bottom"].includes(i.props.tabPosition)?"width":"height",o=c==="width"?"x":"y",O=o==="x"?"left":"top";return d.tabs.every(E=>{var a,w;const _=(w=(a=T.parent)==null?void 0:a.refs)==null?void 0:w[`tab-${E.uid}`];if(!_)return!1;if(!E.active)return!0;f=_[`offset${k(O)}`],m=_[`client${k(c)}`];const S=window.getComputedStyle(_);return c==="width"&&(d.tabs.length>1&&(m-=Number.parseFloat(S.paddingLeft)+Number.parseFloat(S.paddingRight)),f+=Number.parseFloat(S.paddingLeft)),!1}),{[c]:`${m}px`,transform:`translate${k(o)}(${f}px)`}},h=()=>$.value=b();return R(()=>d.tabs,async()=>{await ee(),h()},{immediate:!0}),oe(l,()=>h()),n({ref:l,update:h}),(f,m)=>(re(),ie("div",{ref_key:"barRef",ref:l,class:ce([B(t).e("active-bar"),B(t).is(B(i).props.tabPosition)]),style:Te($.value)},null,6))}});var We=ue(Je,[["__file","tab-bar.vue"]]);const Qe=I({panes:{type:Y(Array),default:()=>le([])},currentName:{type:[String,Number],default:""},editable:Boolean,type:{type:String,values:["card","border-card",""],default:""},stretch:Boolean}),Xe={tabClick:(e,n,d)=>d instanceof Event,tabRemove:(e,n)=>n instanceof Event},ne="ElTabNav",Ye=F({name:ne,props:Qe,emits:Xe,setup(e,{expose:n,emit:d}){const T=K(),i=G(q);i||Z(ne,"<el-tabs><tab-nav /></el-tabs>");const t=U("tabs"),l=Pe(),$=we(),b=C(),h=C(),f=C(),m=C(),c=C(!1),o=C(0),O=C(!1),E=C(!0),a=L(()=>["top","bottom"].includes(i.props.tabPosition)?"width":"height"),w=L(()=>({transform:`translate${a.value==="width"?"X":"Y"}(-${o.value}px)`})),_=()=>{if(!b.value)return;const r=b.value[`offset${k(a.value)}`],u=o.value;if(!u)return;const s=u>r?u-r:0;o.value=s},S=()=>{if(!b.value||!h.value)return;const r=h.value[`offset${k(a.value)}`],u=b.value[`offset${k(a.value)}`],s=o.value;if(r-s<=u)return;const g=r-s>u*2?s+u:r-u;o.value=g},z=async()=>{const r=h.value;if(!c.value||!f.value||!b.value||!r)return;await ee();const u=f.value.querySelector(".is-active");if(!u)return;const s=b.value,g=["top","bottom"].includes(i.props.tabPosition),N=u.getBoundingClientRect(),y=s.getBoundingClientRect(),x=g?r.offsetWidth-y.width:r.offsetHeight-y.height,P=o.value;let p=P;g?(N.left<y.left&&(p=P-(y.left-N.left)),N.right>y.right&&(p=P+N.right-y.right)):(N.top<y.top&&(p=P-(y.top-N.top)),N.bottom>y.bottom&&(p=P+(N.bottom-y.bottom))),p=Math.max(p,0),o.value=Math.min(p,x)},M=()=>{var r;if(!h.value||!b.value)return;e.stretch&&((r=m.value)==null||r.update());const u=h.value[`offset${k(a.value)}`],s=b.value[`offset${k(a.value)}`],g=o.value;s<u?(c.value=c.value||{},c.value.prev=g,c.value.next=g+s<u,u-g<s&&(o.value=u-s)):(c.value=!1,g>0&&(o.value=0))},pe=r=>{const u=r.code,{up:s,down:g,left:N,right:y}=D;if(![s,g,N,y].includes(u))return;const x=Array.from(r.currentTarget.querySelectorAll("[role=tab]:not(.is-disabled)")),P=x.indexOf(r.target);let p;u===N||u===s?P===0?p=x.length-1:p=P-1:P<x.length-1?p=P+1:p=0,x[p].focus({preventScroll:!0}),x[p].click(),te()},te=()=>{E.value&&(O.value=!0)},j=()=>O.value=!1;return R(l,r=>{r==="hidden"?E.value=!1:r==="visible"&&setTimeout(()=>E.value=!0,50)}),R($,r=>{r?setTimeout(()=>E.value=!0,50):E.value=!1}),oe(f,M),de(()=>setTimeout(()=>z(),0)),Se(()=>M()),n({scrollToActiveTab:z,removeFocus:j}),R(()=>e.panes,()=>T.update(),{flush:"post",deep:!0}),()=>{const r=c.value?[v("span",{class:[t.e("nav-prev"),t.is("disabled",!c.value.prev)],onClick:_},[v(V,null,{default:()=>[v(Ee,null,null)]})]),v("span",{class:[t.e("nav-next"),t.is("disabled",!c.value.next)],onClick:S},[v(V,null,{default:()=>[v($e,null,null)]})])]:null,u=e.panes.map((s,g)=>{var N,y,x,P;const p=s.uid,H=s.props.disabled,J=(y=(N=s.props.name)!=null?N:s.index)!=null?y:`${g}`,W=!H&&(s.isClosable||e.editable);s.index=`${g}`;const he=W?v(V,{class:"is-icon-close",onClick:A=>d("tabRemove",s,A)},{default:()=>[v(xe,null,null)]}):null,ye=((P=(x=s.slots).label)==null?void 0:P.call(x))||s.props.label,_e=!H&&s.active?0:-1;return v("div",{ref:`tab-${p}`,class:[t.e("item"),t.is(i.props.tabPosition),t.is("active",s.active),t.is("disabled",H),t.is("closable",W),t.is("focus",O.value)],id:`tab-${J}`,key:`tab-${p}`,"aria-controls":`pane-${J}`,role:"tab","aria-selected":s.active,tabindex:_e,onFocus:()=>te(),onBlur:()=>j(),onClick:A=>{j(),d("tabClick",s,J,A)},onKeydown:A=>{W&&(A.code===D.delete||A.code===D.backspace)&&d("tabRemove",s,A)}},[ye,he])});return v("div",{ref:f,class:[t.e("nav-wrap"),t.is("scrollable",!!c.value),t.is(i.props.tabPosition)]},[r,v("div",{class:t.e("nav-scroll"),ref:b},[v("div",{class:[t.e("nav"),t.is(i.props.tabPosition),t.is("stretch",e.stretch&&["top","bottom"].includes(i.props.tabPosition))],ref:h,style:w.value,role:"tablist",onKeydown:pe},[e.type?null:v(We,{ref:m,tabs:[...e.panes]},null),u])])])}}}),Ge=I({type:{type:String,values:["card","border-card",""],default:""},activeName:{type:[String,Number]},closable:Boolean,addable:Boolean,modelValue:{type:[String,Number]},editable:Boolean,tabPosition:{type:String,values:["top","right","bottom","left"],default:"top"},beforeLeave:{type:Y(Function),default:()=>!0},stretch:Boolean}),Q=e=>Re(e)||ze(e),Ze={[be]:e=>Q(e),tabClick:(e,n)=>n instanceof Event,tabChange:e=>Q(e),edit:(e,n)=>["remove","add"].includes(n),tabRemove:e=>Q(e),tabAdd:()=>!0},et=F({name:"ElTabs",props:Ge,emits:Ze,setup(e,{emit:n,slots:d,expose:T}){var i,t;const l=U("tabs"),{children:$,addChild:b,removeChild:h}=qe(K(),"ElTabPane"),f=C(),m=C((t=(i=e.modelValue)!=null?i:e.activeName)!=null?t:"0"),c=async(a,w=!1)=>{var _,S,z;if(!(m.value===a||ae(a)))try{await((_=e.beforeLeave)==null?void 0:_.call(e,a,m.value))!==!1&&(m.value=a,w&&(n(be,a),n("tabChange",a)),(z=(S=f.value)==null?void 0:S.removeFocus)==null||z.call(S))}catch{}},o=(a,w,_)=>{a.props.disabled||(c(w,!0),n("tabClick",a,_))},O=(a,w)=>{a.props.disabled||ae(a.props.name)||(w.stopPropagation(),n("edit",a.props.name,"remove"),n("tabRemove",a.props.name))},E=()=>{n("edit",void 0,"add"),n("tabAdd")};return Be({from:'"activeName"',replacement:'"model-value" or "v-model"',scope:"ElTabs",version:"2.3.0",ref:"https://element-plus.org/en-US/component/tabs.html#attributes",type:"Attribute"},L(()=>!!e.activeName)),R(()=>e.activeName,a=>c(a)),R(()=>e.modelValue,a=>c(a)),R(m,async()=>{var a;await ee(),(a=f.value)==null||a.scrollToActiveTab()}),Oe(q,{props:e,currentName:m,registerPane:b,unregisterPane:h}),T({currentName:m}),()=>{const a=d.addIcon,w=e.editable||e.addable?v("span",{class:l.e("new-tab"),tabindex:"0",onClick:E,onKeydown:z=>{z.code===D.enter&&E()}},[a?X(d,"addIcon"):v(V,{class:l.is("icon-plus")},{default:()=>[v(ke,null,null)]})]):null,_=v("div",{class:[l.e("header"),l.is(e.tabPosition)]},[w,v(Ye,{ref:f,currentName:m.value,editable:e.editable,type:e.type,panes:$.value,stretch:e.stretch,onTabClick:o,onTabRemove:O},null)]),S=v("div",{class:l.e("content")},[X(d,"default")]);return v("div",{class:[l.b(),l.m(e.tabPosition),{[l.m("card")]:e.type==="card",[l.m("border-card")]:e.type==="border-card"}]},[...e.tabPosition!=="bottom"?[_,S]:[S,_]])}}}),tt=I({label:{type:String,default:""},name:{type:[String,Number]},closable:Boolean,disabled:Boolean,lazy:Boolean}),at=["id","aria-hidden","aria-labelledby"],fe="ElTabPane",st=F({name:fe}),nt=F({...st,props:tt,setup(e){const n=e,d=K(),T=Ae(),i=G(q);i||Z(fe,"usage: <el-tabs><el-tab-pane /></el-tabs/>");const t=U("tab-pane"),l=C(),$=L(()=>n.closable||i.props.closable),b=se(()=>{var o;return i.currentName.value===((o=n.name)!=null?o:l.value)}),h=C(b.value),f=L(()=>{var o;return(o=n.name)!=null?o:l.value}),m=se(()=>!n.lazy||h.value||b.value);R(b,o=>{o&&(h.value=!0)});const c=Fe({uid:d.uid,slots:T,props:n,paneName:f,active:b,index:l,isClosable:$});return de(()=>{i.registerPane(c)}),Le(()=>{i.unregisterPane(c.uid)}),(o,O)=>B(m)?Me((re(),ie("div",{key:0,id:`pane-${B(f)}`,class:ce(B(t).b()),role:"tabpanel","aria-hidden":!B(b),"aria-labelledby":`tab-${B(f)}`},[X(o.$slots,"default")],10,at)),[[Ve,B(b)]]):De("v-if",!0)}});var me=ue(nt,[["__file","tab-pane.vue"]]);const ot=Ie(et,{TabPane:me}),rt=Ke(me);export{rt as E,ot as a};
