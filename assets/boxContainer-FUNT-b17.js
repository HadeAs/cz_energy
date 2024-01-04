import{j as w,aB as W,c1 as Z,s as j,m as M,a7 as P,aC as $,b4 as H,b as A,e as Q,x as n,o as l,c as m,a as b,V as v,Z as B,A as k,J as F,_ as T,b3 as X,l as Y,bp as ee,aD as te,q as se,y as S,K as I,a8 as K,G as x,F as le,bg as ae,R as ne,bs as re,S as ie,B as oe}from"./index-C-tyC_6H.js";import{M as ce}from"./MainContentContainer-utiYTNDP.js";const V=Symbol("elDescriptions");var C=w({name:"ElDescriptionsCell",props:{cell:{type:Object},tag:{type:String,default:"td"},type:{type:String}},setup(){return{descriptions:W(V,{})}},render(){var h,a,t,N,r,c,D;const o=Z(this.cell),e=(((h=this.cell)==null?void 0:h.dirs)||[]).map(G=>{const{dir:J,arg:L,modifiers:O,value:U}=G;return[J,U,L,O]}),{border:d,direction:i}=this.descriptions,s=i==="vertical",_=((N=(t=(a=this.cell)==null?void 0:a.children)==null?void 0:t.label)==null?void 0:N.call(t))||o.label,u=(D=(c=(r=this.cell)==null?void 0:r.children)==null?void 0:c.default)==null?void 0:D.call(c),f=o.span,g=o.align?`is-${o.align}`:"",y=o.labelAlign?`is-${o.labelAlign}`:g,E=o.className,R=o.labelClassName,z={width:j(o.width),minWidth:j(o.minWidth)},p=M("descriptions");switch(this.type){case"label":return P($(this.tag,{style:z,class:[p.e("cell"),p.e("label"),p.is("bordered-label",d),p.is("vertical-label",s),y,R],colSpan:s?f:1},_),e);case"content":return P($(this.tag,{style:z,class:[p.e("cell"),p.e("content"),p.is("bordered-content",d),p.is("vertical-content",s),g,E],colSpan:s?f:f*2-1},u),e);default:return P($("td",{style:z,class:[p.e("cell"),g],colSpan:f},[H(_)?void 0:$("span",{class:[p.e("label"),R]},_),$("span",{class:[p.e("content"),E]},u)]),e)}}});const pe=A({row:{type:Q(Array),default:()=>[]}}),de={key:1},ue=w({name:"ElDescriptionsRow"}),fe=w({...ue,props:pe,setup(h){const a=W(V,{});return(t,N)=>n(a).direction==="vertical"?(l(),m(v,{key:0},[b("tr",null,[(l(!0),m(v,null,B(t.row,(r,c)=>(l(),k(n(C),{key:`tr1-${c}`,cell:r,tag:"th",type:"label"},null,8,["cell"]))),128))]),b("tr",null,[(l(!0),m(v,null,B(t.row,(r,c)=>(l(),k(n(C),{key:`tr2-${c}`,cell:r,tag:"td",type:"content"},null,8,["cell"]))),128))])],64)):(l(),m("tr",de,[(l(!0),m(v,null,B(t.row,(r,c)=>(l(),m(v,{key:`tr3-${c}`},[n(a).border?(l(),m(v,{key:0},[F(n(C),{cell:r,tag:"td",type:"label"},null,8,["cell"]),F(n(C),{cell:r,tag:"td",type:"content"},null,8,["cell"])],64)):(l(),k(n(C),{key:1,cell:r,tag:"td",type:"both"},null,8,["cell"]))],64))),128))]))}});var me=T(fe,[["__file","descriptions-row.vue"]]);const be=A({border:{type:Boolean,default:!1},column:{type:Number,default:3},direction:{type:String,values:["horizontal","vertical"],default:"horizontal"},size:X,title:{type:String,default:""},extra:{type:String,default:""}}),he=w({name:"ElDescriptions"}),ye=w({...he,props:be,setup(h){const a=h,t=M("descriptions"),N=Y(),r=ee();te(V,a);const c=se(()=>[t.b(),t.m(N.value)]),D=(e,d,i,s=!1)=>(e.props||(e.props={}),d>i&&(e.props.span=i),s&&(e.props.span=d),e),o=()=>{if(!r.default)return[];const e=ae(r.default()).filter(u=>{var f;return((f=u==null?void 0:u.type)==null?void 0:f.name)==="ElDescriptionsItem"}),d=[];let i=[],s=a.column,_=0;return e.forEach((u,f)=>{var g;const y=((g=u.props)==null?void 0:g.span)||1;if(f<e.length-1&&(_+=y>s?s:y),f===e.length-1){const E=a.column-_%a.column;i.push(D(u,E,s,!0)),d.push(i);return}y<s?(s-=y,i.push(u)):(i.push(D(u,y,s)),d.push(i),s=a.column,i=[])}),d};return(e,d)=>(l(),m("div",{class:S(n(c))},[e.title||e.extra||e.$slots.title||e.$slots.extra?(l(),m("div",{key:0,class:S(n(t).e("header"))},[b("div",{class:S(n(t).e("title"))},[I(e.$slots,"title",{},()=>[K(x(e.title),1)])],2),b("div",{class:S(n(t).e("extra"))},[I(e.$slots,"extra",{},()=>[K(x(e.extra),1)])],2)],2)):le("v-if",!0),b("div",{class:S(n(t).e("body"))},[b("table",{class:S([n(t).e("table"),n(t).is("bordered",e.border)])},[b("tbody",null,[(l(!0),m(v,null,B(o(),(i,s)=>(l(),k(me,{key:s,row:i},null,8,["row"]))),128))])],2)],2)],2))}});var ve=T(ye,[["__file","description.vue"]]);const _e=A({label:{type:String,default:""},span:{type:Number,default:1},width:{type:[String,Number],default:""},minWidth:{type:[String,Number],default:""},align:{type:String,default:"left"},labelAlign:{type:String,default:""},className:{type:String,default:""},labelClassName:{type:String,default:""}}),q=w({name:"ElDescriptionsItem",props:_e}),Ce=ne(ve,{DescriptionsItem:q}),ke=re(q),ge={class:"cs-box-title"},Se={class:"cs-title-text"},we={class:"cs-box-wrap"},Ne={__name:"boxContainer",props:["title"],setup(h){return(a,t)=>(l(),k(ce,{class:"contain"},{default:oe(()=>[b("div",ge,[b("span",Se,x(h.title),1),I(a.$slots,"extra",{},void 0,!0)]),b("div",we,[I(a.$slots,"default",{},void 0,!0)])]),_:3}))}},Ee=ie(Ne,[["__scopeId","data-v-50e70c57"]]);export{Ee as B,ke as E,Ce as a};
