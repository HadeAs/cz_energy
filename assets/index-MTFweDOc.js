import{r as U,T as q,w as H,o as d,A as m,B as l,x as B,aw as K,V,Z as g,c as i,J as t,a8 as b,a1 as F,a2 as M,a0 as N,a6 as Q,a7 as x,a9 as W,aa as X,ab as Y,ac as ee,ad as te,S as le}from"./index-C-tyC_6H.js";import{v as ae}from"./loading-asc02wkW.js";import{M as oe}from"./MainContentContainer-utiYTNDP.js";import{_ as re}from"./ProTable-g_K91LbJ.js";import{_ as ne}from"./ProPopConfirm-zKBuYRGE.js";import{E as P,a as T}from"./form-item-2Qq2kISt.js";import{E as de,a as ue}from"./radio-button-MIy5jZGq.js";import{P as me}from"./ProDrawer-80_OB0OG.js";import{C as pe}from"./formConfig-7IyXZZgD.js";/* empty css                                                                  */import"./overlay-tk1qTxpW.js";/* empty css                 *//* empty css                */import{E as se}from"./index-6f9Nkb3A.js";import{E as ie}from"./index-EB5xhOSR.js";import"./checkbox-t98SXIDk.js";const fe={__name:"detail",props:{title:{type:String},data:{type:Object,default:{}}},emits:["submit"],setup(E,{expose:C,emit:v}){const n={project:"",name:"",label:"",type:"",temp:"",temp2:"",relation:"",gateway:"",template:"",state:"",time:"",positionNo:"",status:"1",hide:"1"},h=v,k=E,D=U(),O=U(),a=q({form:{...n,...k.data},projectOpts:[{id:"1",text:"网关1"},{id:"2",text:"网关2"}],timeOpts:[{id:"1",text:"1分钟"},{id:"2",text:"2分钟"}]}),R=async()=>{await O.value.validate(w=>{w&&(D.value.close(),h("submit",a.form))})};return H(()=>k.data,w=>{a.form={...n,...w}}),C({open:()=>{D.value.open()}}),(w,o)=>{const f=F,u=M,r=P,p=N,c=de,_=ue,y=T;return d(),m(me,{title:E.title,ref_key:"handleDrawerRef",ref:D,onConfirm:R},{default:l(()=>[t(y,K({ref_key:"formRef",ref:O},B(pe),{model:a.form}),{default:l(()=>[t(r,{label:"所属项目",required:"",prop:"project"},{default:l(()=>[t(u,{modelValue:a.form.project,"onUpdate:modelValue":o[0]||(o[0]=e=>a.form.project=e)},{default:l(()=>[(d(!0),i(V,null,g(a.projectOpts,e=>(d(),m(f,{key:e.id,label:e.text,value:e.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),t(r,{label:"点位名称",required:"",prop:"name"},{default:l(()=>[t(p,{placeholder:"请输入点位名称",modelValue:a.form.name,"onUpdate:modelValue":o[1]||(o[1]=e=>a.form.name=e)},null,8,["modelValue"])]),_:1}),t(r,{label:"点位标签",required:"",prop:"label"},{default:l(()=>[t(p,{placeholder:"请输入点位标签",modelValue:a.form.label,"onUpdate:modelValue":o[2]||(o[2]=e=>a.form.label=e)},null,8,["modelValue"])]),_:1}),t(r,{label:"点位类型",required:"",prop:"type"},{default:l(()=>[t(p,{placeholder:"请输入点位类型",modelValue:a.form.type,"onUpdate:modelValue":o[3]||(o[3]=e=>a.form.type=e)},null,8,["modelValue"])]),_:1}),t(r,{label:"最大阈值",required:"",prop:"temp"},{default:l(()=>[t(p,{placeholder:"请输入最大阈值",modelValue:a.form.temp,"onUpdate:modelValue":o[4]||(o[4]=e=>a.form.temp=e)},null,8,["modelValue"])]),_:1}),t(r,{label:"最小阈值",required:"",prop:"temp2"},{default:l(()=>[t(p,{placeholder:"请输入最小阈值",modelValue:a.form.temp2,"onUpdate:modelValue":o[5]||(o[5]=e=>a.form.temp2=e)},null,8,["modelValue"])]),_:1}),t(r,{label:"关联变量",required:"",prop:"relation"},{default:l(()=>[t(u,{modelValue:a.form.relation,"onUpdate:modelValue":o[6]||(o[6]=e=>a.form.relation=e)},{default:l(()=>[(d(!0),i(V,null,g(a.projectOpts,e=>(d(),m(f,{key:e.id,label:e.text,value:e.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),t(r,{label:"智能网关",required:"",prop:"gateway"},{default:l(()=>[t(u,{modelValue:a.form.gateway,"onUpdate:modelValue":o[7]||(o[7]=e=>a.form.gateway=e)},{default:l(()=>[(d(!0),i(V,null,g(a.projectOpts,e=>(d(),m(f,{key:e.id,label:e.text,value:e.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),t(r,{label:"点位模板",required:"",prop:"template"},{default:l(()=>[t(u,{modelValue:a.form.template,"onUpdate:modelValue":o[8]||(o[8]=e=>a.form.template=e)},{default:l(()=>[(d(!0),i(V,null,g(a.projectOpts,e=>(d(),m(f,{key:e.id,label:e.text,value:e.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),t(r,{label:"通讯站号",required:"",prop:"state"},{default:l(()=>[t(p,{modelValue:a.form.state,"onUpdate:modelValue":o[9]||(o[9]=e=>a.form.state=e),placeholder:"请输入"},null,8,["modelValue"])]),_:1}),t(r,{label:"检测周期",required:"",prop:"time"},{default:l(()=>[t(u,{modelValue:a.form.time,"onUpdate:modelValue":o[10]||(o[10]=e=>a.form.time=e)},{default:l(()=>[(d(!0),i(V,null,g(a.timeOpts,e=>(d(),m(f,{key:e.id,label:e.text,value:e.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),t(r,{label:"点位编号",required:"",prop:"positionNo"},{default:l(()=>[t(u,{modelValue:a.form.positionNo,"onUpdate:modelValue":o[11]||(o[11]=e=>a.form.positionNo=e)},{default:l(()=>[(d(!0),i(V,null,g(a.timeOpts,e=>(d(),m(f,{key:e.id,label:e.text,value:e.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),t(r,{label:"启用状态",required:"",prop:"status"},{default:l(()=>[t(_,{modelValue:a.form.status,"onUpdate:modelValue":o[12]||(o[12]=e=>a.form.status=e)},{default:l(()=>[t(c,{label:"1"},{default:l(()=>[b("启用")]),_:1}),t(c,{label:"2"},{default:l(()=>[b("停用")]),_:1})]),_:1},8,["modelValue"])]),_:1}),t(r,{label:"是否隐藏",required:"",prop:"hide"},{default:l(()=>[t(_,{modelValue:a.form.hide,"onUpdate:modelValue":o[13]||(o[13]=e=>a.form.hide=e)},{default:l(()=>[t(c,{label:"1"},{default:l(()=>[b("展示")]),_:1}),t(c,{label:"2"},{default:l(()=>[b("隐藏")]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1},16,["model"])]),_:1},8,["title"])}}},ce=["onClick"],_e={class:"table-operator-btn"},be={__name:"index",setup(E){const C=[{checkBox:"",project:"项目001",name:"压力传感器",label:"开关量",type:"--",gateway:"网关1",temp:"--",temp2:"--",state:"1",time:"6分钟",status:0},{checkBox:"",project:"项目001",name:"压力传感器",label:"开关量",type:"--",gateway:"网关1",temp:"--",temp2:"--",state:"1",time:"6分钟",status:1},{checkBox:"",project:"项目001",name:"压力传感器",label:"开关量",type:"--",gateway:"网关1",temp:"20",temp2:"5",state:"1",time:"6分钟",status:0},{checkBox:"",project:"项目001",name:"压力传感器",label:"开关量",type:"--",gateway:"网关1",temp:"20",temp2:"10",state:"1",time:"6分钟",status:1}],v=U(),n=q({searchFormData:{nameType:"all",name:""},nameOpts:[{id:"all",text:"全部项目名称"},{id:"1",text:"项目名称1"},{id:"2",text:"项目名称2"}],dataSource:[],loading:!0,selectRows:[],currentData:{},title:""}),h=q({total:100,currentPage:1,pageSize:10,pageSizes:[10,15,20,50]}),k=[{prop:"name",label:"点位名称",width:110,fixed:!0,render:u=>t("div",{className:"text-overflow",title:u.row.name},[t("b",null,[u.row.name])])},{prop:"project",label:"所属项目",width:180},{prop:"gateway",label:"智能网关",width:100},{prop:"label",label:"单位",width:100},{prop:"state",label:"通讯号",width:80},{prop:"time",label:"采集频率"},{prop:"temp",label:"最大阈值"},{prop:"temp2",label:"最小阈值"}];(async()=>{const u=await new Promise(r=>{setTimeout(()=>{n.loading=!1;const p=new Array(10).fill("").map((c,_)=>{const y=_%4;return{...C[y],project:C[y].project+"00"+_,id:_}});r(p)},600)});n.dataSource=u})();const O=()=>{se.confirm("确认删除选中的内容？","警告",{confirmButtonText:"确认",cancelButtonText:"取消",type:"warning"}).then(()=>{ie({type:"success",message:"删除成功"})}).catch(()=>{})},a=(u,r)=>{console.log(u,r)},R=u=>{n.selectRows=u},S=()=>{n.title="新增",n.currentData={},v.value.open()},w=u=>{n.currentData=u,n.title="编辑",v.value.open()},o=u=>{},f=u=>{};return(u,r)=>{const p=W,c=X,_=F,y=M,e=P,I=N,A=T,L=Y,$=ne,z=re,G=oe,j=Q("auth"),J=ae;return d(),m(G,null,{default:l(()=>[x((d(),m(z,{multiple:"",column:k,pageInfo:h,datasource:n.dataSource,onPageChange:a,onSelectionChange:R},{toolbar:l(()=>[t(L,{align:"middle",gutter:5},{default:l(()=>[t(c,{span:6},{default:l(()=>[x((d(),m(p,{type:"primary",onClick:S},{default:l(()=>[b("新增")]),_:1})),[[j,"point_add"]]),x((d(),m(p,{disabled:!n.selectRows.length,onClick:O},{default:l(()=>[b("批量删除")]),_:1},8,["disabled"])),[[j,"point_batch_delete"]])]),_:1}),t(c,{span:18},{default:l(()=>[t(A,{class:"search-form",inline:!0,model:n.searchFormData},{default:l(()=>[t(e,null,{default:l(()=>[t(y,{modelValue:n.searchFormData.nameType,"onUpdate:modelValue":r[0]||(r[0]=s=>n.searchFormData.nameType=s)},{default:l(()=>[(d(!0),i(V,null,g(n.nameOpts,s=>(d(),m(_,{key:s.id,label:s.text,value:s.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),t(e,null,{default:l(()=>[t(I,{modelValue:n.searchFormData.name,"onUpdate:modelValue":r[1]||(r[1]=s=>n.searchFormData.name=s),placeholder:"项目名称","suffix-icon":B(ee)},null,8,["modelValue","suffix-icon"])]),_:1})]),_:1},8,["model"])]),_:1})]),_:1})]),operation:l(s=>[x((d(),i("a",{class:"table-operator-btn",onClick:Z=>w(s.row)},[b("编辑")],8,ce)),[[j,"point_edit"]]),t($,{title:"你确定要删除该设备吗?",icon:B(te),iconColor:"red",onConfirm:Z=>o(s.row)},{default:l(()=>[x((d(),i("a",_e,[b("删除")])),[[j,"point_delete"]])]),_:2},1032,["icon","onConfirm"])]),_:1},8,["pageInfo","datasource"])),[[J,n.loading]]),t(fe,{ref_key:"detailRef",ref:v,title:n.title,data:n.currentData,onSubmit:f},null,8,["title","data"])]),_:1})}}},Be=le(be,[["__scopeId","data-v-34ad8578"]]);export{Be as default};
