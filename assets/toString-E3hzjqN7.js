import{az as ne,T as Ie,aA as Le,_ as ie,j as le,m as U,aB as H,aC as ue,K as me,aD as G,r as K,aE as _,aF as Be,aG as Me,E as ze,H as Fe,k as Ee,w as S,O as fe,aH as Pe,aI as $,a7 as oe,aJ as re,o as D,c as z,a as ae,A as M,B as ee,D as qe,y as w,M as x,F as R,J as te,L as Re,V as De,Z as Ke,aK as He,g as Ge,aL as pe,v as Ue,aM as Ye,aN as Je,aO as O,d as We,aP as Qe,q as Ze,aQ as Ve,G as Xe,aR as W}from"./index-C-tyC_6H.js";import{E as _e}from"./checkbox-t98SXIDk.js";const F="$treeNodeId",ge=function(e,t){!t||t[F]||Object.defineProperty(t,F,{value:e.id,enumerable:!1,configurable:!1,writable:!1})},ce=function(e,t){return e?t[e]:t[F]},de=(e,t,o)=>{const r=e.value.currentNode;o();const n=e.value.currentNode;r!==n&&t("current-change",n?n.data:null,n)},se=e=>{let t=!0,o=!0,r=!0;for(let n=0,a=e.length;n<a;n++){const i=e[n];(i.checked!==!0||i.indeterminate)&&(t=!1,i.disabled||(r=!1)),(i.checked!==!1||i.indeterminate)&&(o=!1)}return{all:t,none:o,allWithoutDisable:r,half:!t&&!o}},Z=function(e){if(e.childNodes.length===0||e.loading)return;const{all:t,none:o,half:r}=se(e.childNodes);t?(e.checked=!0,e.indeterminate=!1):r?(e.checked=!1,e.indeterminate=!0):o&&(e.checked=!1,e.indeterminate=!1);const n=e.parent;!n||n.level===0||e.store.checkStrictly||Z(n)},Q=function(e,t){const o=e.store.props,r=e.data||{},n=o[t];if(typeof n=="function")return n(r,e);if(typeof n=="string")return r[n];if(typeof n>"u"){const a=r[t];return a===void 0?"":a}};let et=0;class j{constructor(t){this.id=et++,this.text=null,this.checked=!1,this.indeterminate=!1,this.data=null,this.expanded=!1,this.parent=null,this.visible=!0,this.isCurrent=!1,this.canFocus=!1;for(const o in t)ne(t,o)&&(this[o]=t[o]);this.level=0,this.loaded=!1,this.childNodes=[],this.loading=!1,this.parent&&(this.level=this.parent.level+1)}initialize(){const t=this.store;if(!t)throw new Error("[Node]store is required!");t.registerNode(this);const o=t.props;if(o&&typeof o.isLeaf<"u"){const a=Q(this,"isLeaf");typeof a=="boolean"&&(this.isLeafByUser=a)}if(t.lazy!==!0&&this.data?(this.setData(this.data),t.defaultExpandAll&&(this.expanded=!0,this.canFocus=!0)):this.level>0&&t.lazy&&t.defaultExpandAll&&this.expand(),Array.isArray(this.data)||ge(this,this.data),!this.data)return;const r=t.defaultExpandedKeys,n=t.key;n&&r&&r.includes(this.key)&&this.expand(null,t.autoExpandParent),n&&t.currentNodeKey!==void 0&&this.key===t.currentNodeKey&&(t.currentNode=this,t.currentNode.isCurrent=!0),t.lazy&&t._initDefaultCheckedNode(this),this.updateLeafState(),this.parent&&(this.level===1||this.parent.expanded===!0)&&(this.canFocus=!0)}setData(t){Array.isArray(t)||ge(this,t),this.data=t,this.childNodes=[];let o;this.level===0&&Array.isArray(this.data)?o=this.data:o=Q(this,"children")||[];for(let r=0,n=o.length;r<n;r++)this.insertChild({data:o[r]})}get label(){return Q(this,"label")}get key(){const t=this.store.key;return this.data?this.data[t]:null}get disabled(){return Q(this,"disabled")}get nextSibling(){const t=this.parent;if(t){const o=t.childNodes.indexOf(this);if(o>-1)return t.childNodes[o+1]}return null}get previousSibling(){const t=this.parent;if(t){const o=t.childNodes.indexOf(this);if(o>-1)return o>0?t.childNodes[o-1]:null}return null}contains(t,o=!0){return(this.childNodes||[]).some(r=>r===t||o&&r.contains(t))}remove(){const t=this.parent;t&&t.removeChild(this)}insertChild(t,o,r){if(!t)throw new Error("InsertChild error: child is required.");if(!(t instanceof j)){if(!r){const n=this.getChildren(!0);n.includes(t.data)||(typeof o>"u"||o<0?n.push(t.data):n.splice(o,0,t.data))}Object.assign(t,{parent:this,store:this.store}),t=Ie(new j(t)),t instanceof j&&t.initialize()}t.level=this.level+1,typeof o>"u"||o<0?this.childNodes.push(t):this.childNodes.splice(o,0,t),this.updateLeafState()}insertBefore(t,o){let r;o&&(r=this.childNodes.indexOf(o)),this.insertChild(t,r)}insertAfter(t,o){let r;o&&(r=this.childNodes.indexOf(o),r!==-1&&(r+=1)),this.insertChild(t,r)}removeChild(t){const o=this.getChildren()||[],r=o.indexOf(t.data);r>-1&&o.splice(r,1);const n=this.childNodes.indexOf(t);n>-1&&(this.store&&this.store.deregisterNode(t),t.parent=null,this.childNodes.splice(n,1)),this.updateLeafState()}removeChildByData(t){let o=null;for(let r=0;r<this.childNodes.length;r++)if(this.childNodes[r].data===t){o=this.childNodes[r];break}o&&this.removeChild(o)}expand(t,o){const r=()=>{if(o){let n=this.parent;for(;n.level>0;)n.expanded=!0,n=n.parent}this.expanded=!0,t&&t(),this.childNodes.forEach(n=>{n.canFocus=!0})};this.shouldLoadData()?this.loadData(n=>{Array.isArray(n)&&(this.checked?this.setChecked(!0,!0):this.store.checkStrictly||Z(this),r())}):r()}doCreateChildren(t,o={}){t.forEach(r=>{this.insertChild(Object.assign({data:r},o),void 0,!0)})}collapse(){this.expanded=!1,this.childNodes.forEach(t=>{t.canFocus=!1})}shouldLoadData(){return this.store.lazy===!0&&this.store.load&&!this.loaded}updateLeafState(){if(this.store.lazy===!0&&this.loaded!==!0&&typeof this.isLeafByUser<"u"){this.isLeaf=this.isLeafByUser;return}const t=this.childNodes;if(!this.store.lazy||this.store.lazy===!0&&this.loaded===!0){this.isLeaf=!t||t.length===0;return}this.isLeaf=!1}setChecked(t,o,r,n){if(this.indeterminate=t==="half",this.checked=t===!0,this.store.checkStrictly)return;if(!(this.shouldLoadData()&&!this.store.checkDescendants)){const{all:i,allWithoutDisable:s}=se(this.childNodes);!this.isLeaf&&!i&&s&&(this.checked=!1,t=!1);const p=()=>{if(o){const g=this.childNodes;for(let d=0,f=g.length;d<f;d++){const N=g[d];n=n||t!==!1;const C=N.disabled?N.checked:n;N.setChecked(C,o,!0,n)}const{half:u,all:c}=se(g);c||(this.checked=c,this.indeterminate=u)}};if(this.shouldLoadData()){this.loadData(()=>{p(),Z(this)},{checked:t!==!1});return}else p()}const a=this.parent;!a||a.level===0||r||Z(a)}getChildren(t=!1){if(this.level===0)return this.data;const o=this.data;if(!o)return null;const r=this.store.props;let n="children";return r&&(n=r.children||"children"),o[n]===void 0&&(o[n]=null),t&&!o[n]&&(o[n]=[]),o[n]}updateChildren(){const t=this.getChildren()||[],o=this.childNodes.map(a=>a.data),r={},n=[];t.forEach((a,i)=>{const s=a[F];!!s&&o.findIndex(g=>g[F]===s)>=0?r[s]={index:i,data:a}:n.push({index:i,data:a})}),this.store.lazy||o.forEach(a=>{r[a[F]]||this.removeChildByData(a)}),n.forEach(({index:a,data:i})=>{this.insertChild({data:i},a)}),this.updateLeafState()}loadData(t,o={}){if(this.store.lazy===!0&&this.store.load&&!this.loaded&&(!this.loading||Object.keys(o).length)){this.loading=!0;const r=n=>{this.childNodes=[],this.doCreateChildren(n,o),this.loaded=!0,this.loading=!1,this.updateLeafState(),t&&t.call(this,n)};this.store.load(this,r)}else t&&t.call(this)}}class tt{constructor(t){this.currentNode=null,this.currentNodeKey=null;for(const o in t)ne(t,o)&&(this[o]=t[o]);this.nodesMap={}}initialize(){if(this.root=new j({data:this.data,store:this}),this.root.initialize(),this.lazy&&this.load){const t=this.load;t(this.root,o=>{this.root.doCreateChildren(o),this._initDefaultCheckedNodes()})}else this._initDefaultCheckedNodes()}filter(t){const o=this.filterNodeMethod,r=this.lazy,n=function(a){const i=a.root?a.root.childNodes:a.childNodes;if(i.forEach(s=>{s.visible=o.call(s,t,s.data,s),n(s)}),!a.visible&&i.length){let s=!0;s=!i.some(p=>p.visible),a.root?a.root.visible=s===!1:a.visible=s===!1}t&&a.visible&&!a.isLeaf&&!r&&a.expand()};n(this)}setData(t){t!==this.root.data?(this.root.setData(t),this._initDefaultCheckedNodes()):this.root.updateChildren()}getNode(t){if(t instanceof j)return t;const o=Le(t)?ce(this.key,t):t;return this.nodesMap[o]||null}insertBefore(t,o){const r=this.getNode(o);r.parent.insertBefore({data:t},r)}insertAfter(t,o){const r=this.getNode(o);r.parent.insertAfter({data:t},r)}remove(t){const o=this.getNode(t);o&&o.parent&&(o===this.currentNode&&(this.currentNode=null),o.parent.removeChild(o))}append(t,o){const r=o?this.getNode(o):this.root;r&&r.insertChild({data:t})}_initDefaultCheckedNodes(){const t=this.defaultCheckedKeys||[],o=this.nodesMap;t.forEach(r=>{const n=o[r];n&&n.setChecked(!0,!this.checkStrictly)})}_initDefaultCheckedNode(t){(this.defaultCheckedKeys||[]).includes(t.key)&&t.setChecked(!0,!this.checkStrictly)}setDefaultCheckedKey(t){t!==this.defaultCheckedKeys&&(this.defaultCheckedKeys=t,this._initDefaultCheckedNodes())}registerNode(t){const o=this.key;!t||!t.data||(o?t.key!==void 0&&(this.nodesMap[t.key]=t):this.nodesMap[t.id]=t)}deregisterNode(t){!this.key||!t||!t.data||(t.childNodes.forEach(r=>{this.deregisterNode(r)}),delete this.nodesMap[t.key])}getCheckedNodes(t=!1,o=!1){const r=[],n=function(a){(a.root?a.root.childNodes:a.childNodes).forEach(s=>{(s.checked||o&&s.indeterminate)&&(!t||t&&s.isLeaf)&&r.push(s.data),n(s)})};return n(this),r}getCheckedKeys(t=!1){return this.getCheckedNodes(t).map(o=>(o||{})[this.key])}getHalfCheckedNodes(){const t=[],o=function(r){(r.root?r.root.childNodes:r.childNodes).forEach(a=>{a.indeterminate&&t.push(a.data),o(a)})};return o(this),t}getHalfCheckedKeys(){return this.getHalfCheckedNodes().map(t=>(t||{})[this.key])}_getAllNodes(){const t=[],o=this.nodesMap;for(const r in o)ne(o,r)&&t.push(o[r]);return t}updateChildren(t,o){const r=this.nodesMap[t];if(!r)return;const n=r.childNodes;for(let a=n.length-1;a>=0;a--){const i=n[a];this.remove(i.data)}for(let a=0,i=o.length;a<i;a++){const s=o[a];this.append(s,r.data)}}_setCheckedKeys(t,o=!1,r){const n=this._getAllNodes().sort((s,p)=>p.level-s.level),a=Object.create(null),i=Object.keys(r);n.forEach(s=>s.setChecked(!1,!1));for(let s=0,p=n.length;s<p;s++){const g=n[s],u=g.data[t].toString();if(!i.includes(u)){g.checked&&!a[u]&&g.setChecked(!1,!1);continue}let d=g.parent;for(;d&&d.level>0;)a[d.data[t]]=!0,d=d.parent;if(g.isLeaf||this.checkStrictly){g.setChecked(!0,!1);continue}if(g.setChecked(!0,!0),o){g.setChecked(!1,!1);const f=function(N){N.childNodes.forEach(v=>{v.isLeaf||v.setChecked(!1,!1),f(v)})};f(g)}}}setCheckedNodes(t,o=!1){const r=this.key,n={};t.forEach(a=>{n[(a||{})[r]]=!0}),this._setCheckedKeys(r,o,n)}setCheckedKeys(t,o=!1){this.defaultCheckedKeys=t;const r=this.key,n={};t.forEach(a=>{n[a]=!0}),this._setCheckedKeys(r,o,n)}setDefaultExpandedKeys(t){t=t||[],this.defaultExpandedKeys=t,t.forEach(o=>{const r=this.getNode(o);r&&r.expand(null,this.autoExpandParent)})}setChecked(t,o,r){const n=this.getNode(t);n&&n.setChecked(!!o,r)}getCurrentNode(){return this.currentNode}setCurrentNode(t){const o=this.currentNode;o&&(o.isCurrent=!1),this.currentNode=t,this.currentNode.isCurrent=!0}setUserCurrentNode(t,o=!0){const r=t[this.key],n=this.nodesMap[r];this.setCurrentNode(n),o&&this.currentNode.level>1&&this.currentNode.parent.expand(null,!0)}setCurrentNodeKey(t,o=!0){if(t==null){this.currentNode&&(this.currentNode.isCurrent=!1),this.currentNode=null;return}const r=this.getNode(t);r&&(this.setCurrentNode(r),o&&this.currentNode.level>1&&this.currentNode.parent.expand(null,!0))}}const nt=le({name:"ElTreeNodeContent",props:{node:{type:Object,required:!0},renderContent:Function},setup(e){const t=U("tree"),o=H("NodeInstance"),r=H("RootTree");return()=>{const n=e.node,{data:a,store:i}=n;return e.renderContent?e.renderContent(ue,{_self:o,node:n,data:a,store:i}):me(r.ctx.slots,"default",{node:n,data:a},()=>[ue("span",{class:t.be("node","label")},[n.label])])}}});var ot=ie(nt,[["__file","tree-node-content.vue"]]);function Se(e){const t=H("TreeNodeMap",null),o={treeNodeExpand:r=>{e.node!==r&&e.node.collapse()},children:[]};return t&&t.children.push(o),G("TreeNodeMap",o),{broadcastExpanded:r=>{if(e.accordion)for(const n of o.children)n.treeNodeExpand(r)}}}const we=Symbol("dragEvents");function rt({props:e,ctx:t,el$:o,dropIndicator$:r,store:n}){const a=U("tree"),i=K({showDropIndicator:!1,draggingNode:null,dropNode:null,allowDrop:!0,dropType:null});return G(we,{treeNodeDragStart:({event:u,treeNode:c})=>{if(typeof e.allowDrag=="function"&&!e.allowDrag(c.node))return u.preventDefault(),!1;u.dataTransfer.effectAllowed="move";try{u.dataTransfer.setData("text/plain","")}catch{}i.value.draggingNode=c,t.emit("node-drag-start",c.node,u)},treeNodeDragOver:({event:u,treeNode:c})=>{const d=c,f=i.value.dropNode;f&&f.node.id!==d.node.id&&_(f.$el,a.is("drop-inner"));const N=i.value.draggingNode;if(!N||!d)return;let C=!0,v=!0,m=!0,A=!0;typeof e.allowDrop=="function"&&(C=e.allowDrop(N.node,d.node,"prev"),A=v=e.allowDrop(N.node,d.node,"inner"),m=e.allowDrop(N.node,d.node,"next")),u.dataTransfer.dropEffect=v||C||m?"move":"none",(C||v||m)&&(f==null?void 0:f.node.id)!==d.node.id&&(f&&t.emit("node-drag-leave",N.node,f.node,u),t.emit("node-drag-enter",N.node,d.node,u)),(C||v||m)&&(i.value.dropNode=d),d.node.nextSibling===N.node&&(m=!1),d.node.previousSibling===N.node&&(C=!1),d.node.contains(N.node,!1)&&(v=!1),(N.node===d.node||N.node.contains(d.node))&&(C=!1,v=!1,m=!1);const T=d.$el.querySelector(`.${a.be("node","content")}`).getBoundingClientRect(),I=o.value.getBoundingClientRect();let E;const Y=C?v?.25:m?.45:1:-1,J=m?v?.75:C?.55:0:1;let L=-9999;const h=u.clientY-T.top;h<T.height*Y?E="before":h>T.height*J?E="after":v?E="inner":E="none";const k=d.$el.querySelector(`.${a.be("node","expand-icon")}`).getBoundingClientRect(),b=r.value;E==="before"?L=k.top-I.top:E==="after"&&(L=k.bottom-I.top),b.style.top=`${L}px`,b.style.left=`${k.right-I.left}px`,E==="inner"?Be(d.$el,a.is("drop-inner")):_(d.$el,a.is("drop-inner")),i.value.showDropIndicator=E==="before"||E==="after",i.value.allowDrop=i.value.showDropIndicator||A,i.value.dropType=E,t.emit("node-drag-over",N.node,d.node,u)},treeNodeDragEnd:u=>{const{draggingNode:c,dropType:d,dropNode:f}=i.value;if(u.preventDefault(),u.dataTransfer.dropEffect="move",c&&f){const N={data:c.node.data};d!=="none"&&c.node.remove(),d==="before"?f.node.parent.insertBefore(N,f.node):d==="after"?f.node.parent.insertAfter(N,f.node):d==="inner"&&f.node.insertChild(N),d!=="none"&&n.value.registerNode(N),_(f.$el,a.is("drop-inner")),t.emit("node-drag-end",c.node,f.node,d,u),d!=="none"&&t.emit("node-drop",c.node,f.node,d,u)}c&&!f&&t.emit("node-drag-end",c.node,null,d,u),i.value.showDropIndicator=!1,i.value.draggingNode=null,i.value.dropNode=null,i.value.allowDrop=!0}}),{dragState:i}}const at=le({name:"ElTreeNode",components:{ElCollapseTransition:Me,ElCheckbox:_e,NodeContent:ot,ElIcon:ze,Loading:Fe},props:{node:{type:j,default:()=>({})},props:{type:Object,default:()=>({})},accordion:Boolean,renderContent:Function,renderAfterExpand:Boolean,showCheckbox:{type:Boolean,default:!1}},emits:["node-expand"],setup(e,t){const o=U("tree"),{broadcastExpanded:r}=Se(e),n=H("RootTree"),a=K(!1),i=K(!1),s=K(null),p=K(null),g=K(null),u=H(we),c=Ee();G("NodeInstance",c),e.node.expanded&&(a.value=!0,i.value=!0);const d=n.props.props.children||"children";S(()=>{const h=e.node.data[d];return h&&[...h]},()=>{e.node.updateChildren()}),S(()=>e.node.indeterminate,h=>{C(e.node.checked,h)}),S(()=>e.node.checked,h=>{C(h,e.node.indeterminate)}),S(()=>e.node.expanded,h=>{fe(()=>a.value=h),h&&(i.value=!0)});const f=h=>ce(n.props.nodeKey,h.data),N=h=>{const k=e.props.class;if(!k)return{};let b;if(He(k)){const{data:X}=h;b=k(X,h)}else b=k;return Ge(b)?{[b]:!0}:b},C=(h,k)=>{(s.value!==h||p.value!==k)&&n.ctx.emit("check-change",e.node.data,h,k),s.value=h,p.value=k},v=h=>{de(n.store,n.ctx.emit,()=>n.store.value.setCurrentNode(e.node)),n.currentNode.value=e.node,n.props.expandOnClickNode&&A(),n.props.checkOnClickNode&&!e.node.disabled&&T(null,{target:{checked:!e.node.checked}}),n.ctx.emit("node-click",e.node.data,e.node,c,h)},m=h=>{n.instance.vnode.props.onNodeContextmenu&&(h.stopPropagation(),h.preventDefault()),n.ctx.emit("node-contextmenu",h,e.node.data,e.node,c)},A=()=>{e.node.isLeaf||(a.value?(n.ctx.emit("node-collapse",e.node.data,e.node,c),e.node.collapse()):(e.node.expand(),t.emit("node-expand",e.node.data,e.node,c)))},T=(h,k)=>{e.node.setChecked(k.target.checked,!n.props.checkStrictly),fe(()=>{const b=n.store.value;n.ctx.emit("check",e.node.data,{checkedNodes:b.getCheckedNodes(),checkedKeys:b.getCheckedKeys(),halfCheckedNodes:b.getHalfCheckedNodes(),halfCheckedKeys:b.getHalfCheckedKeys()})})};return{ns:o,node$:g,tree:n,expanded:a,childNodeRendered:i,oldChecked:s,oldIndeterminate:p,getNodeKey:f,getNodeClass:N,handleSelectChange:C,handleClick:v,handleContextMenu:m,handleExpandIconClick:A,handleCheckChange:T,handleChildNodeExpand:(h,k,b)=>{r(k),n.ctx.emit("node-expand",h,k,b)},handleDragStart:h=>{n.props.draggable&&u.treeNodeDragStart({event:h,treeNode:e})},handleDragOver:h=>{h.preventDefault(),n.props.draggable&&u.treeNodeDragOver({event:h,treeNode:{$el:g.value,node:e.node}})},handleDrop:h=>{h.preventDefault()},handleDragEnd:h=>{n.props.draggable&&u.treeNodeDragEnd(h)},CaretRight:Pe}}}),dt=["aria-expanded","aria-disabled","aria-checked","draggable","data-key"],st=["aria-expanded"];function it(e,t,o,r,n,a){const i=$("el-icon"),s=$("el-checkbox"),p=$("loading"),g=$("node-content"),u=$("el-tree-node"),c=$("el-collapse-transition");return oe((D(),z("div",{ref:"node$",class:w([e.ns.b("node"),e.ns.is("expanded",e.expanded),e.ns.is("current",e.node.isCurrent),e.ns.is("hidden",!e.node.visible),e.ns.is("focusable",!e.node.disabled),e.ns.is("checked",!e.node.disabled&&e.node.checked),e.getNodeClass(e.node)]),role:"treeitem",tabindex:"-1","aria-expanded":e.expanded,"aria-disabled":e.node.disabled,"aria-checked":e.node.checked,draggable:e.tree.props.draggable,"data-key":e.getNodeKey(e.node),onClick:t[1]||(t[1]=x((...d)=>e.handleClick&&e.handleClick(...d),["stop"])),onContextmenu:t[2]||(t[2]=(...d)=>e.handleContextMenu&&e.handleContextMenu(...d)),onDragstart:t[3]||(t[3]=x((...d)=>e.handleDragStart&&e.handleDragStart(...d),["stop"])),onDragover:t[4]||(t[4]=x((...d)=>e.handleDragOver&&e.handleDragOver(...d),["stop"])),onDragend:t[5]||(t[5]=x((...d)=>e.handleDragEnd&&e.handleDragEnd(...d),["stop"])),onDrop:t[6]||(t[6]=x((...d)=>e.handleDrop&&e.handleDrop(...d),["stop"]))},[ae("div",{class:w(e.ns.be("node","content")),style:Re({paddingLeft:(e.node.level-1)*e.tree.props.indent+"px"})},[e.tree.props.icon||e.CaretRight?(D(),M(i,{key:0,class:w([e.ns.be("node","expand-icon"),e.ns.is("leaf",e.node.isLeaf),{expanded:!e.node.isLeaf&&e.expanded}]),onClick:x(e.handleExpandIconClick,["stop"])},{default:ee(()=>[(D(),M(qe(e.tree.props.icon||e.CaretRight)))]),_:1},8,["class","onClick"])):R("v-if",!0),e.showCheckbox?(D(),M(s,{key:1,"model-value":e.node.checked,indeterminate:e.node.indeterminate,disabled:!!e.node.disabled,onClick:t[0]||(t[0]=x(()=>{},["stop"])),onChange:e.handleCheckChange},null,8,["model-value","indeterminate","disabled","onChange"])):R("v-if",!0),e.node.loading?(D(),M(i,{key:2,class:w([e.ns.be("node","loading-icon"),e.ns.is("loading")])},{default:ee(()=>[te(p)]),_:1},8,["class"])):R("v-if",!0),te(g,{node:e.node,"render-content":e.renderContent},null,8,["node","render-content"])],6),te(c,null,{default:ee(()=>[!e.renderAfterExpand||e.childNodeRendered?oe((D(),z("div",{key:0,class:w(e.ns.be("node","children")),role:"group","aria-expanded":e.expanded},[(D(!0),z(De,null,Ke(e.node.childNodes,d=>(D(),M(u,{key:e.getNodeKey(d),"render-content":e.renderContent,"render-after-expand":e.renderAfterExpand,"show-checkbox":e.showCheckbox,node:d,accordion:e.accordion,props:e.props,onNodeExpand:e.handleChildNodeExpand},null,8,["render-content","render-after-expand","show-checkbox","node","accordion","props","onNodeExpand"]))),128))],10,st)),[[re,e.expanded]]):R("v-if",!0)]),_:1})],42,dt)),[[re,e.node.visible]])}var lt=ie(at,[["render",it],["__file","tree-node.vue"]]);function ct({el$:e},t){const o=U("tree"),r=pe([]),n=pe([]);Ue(()=>{i()}),Ye(()=>{r.value=Array.from(e.value.querySelectorAll("[role=treeitem]")),n.value=Array.from(e.value.querySelectorAll("input[type=checkbox]"))}),S(n,s=>{s.forEach(p=>{p.setAttribute("tabindex","-1")})}),Je(e,"keydown",s=>{const p=s.target;if(!p.className.includes(o.b("node")))return;const g=s.code;r.value=Array.from(e.value.querySelectorAll(`.${o.is("focusable")}[role=treeitem]`));const u=r.value.indexOf(p);let c;if([O.up,O.down].includes(g)){if(s.preventDefault(),g===O.up){c=u===-1?0:u!==0?u-1:r.value.length-1;const f=c;for(;!t.value.getNode(r.value[c].dataset.key).canFocus;){if(c--,c===f){c=-1;break}c<0&&(c=r.value.length-1)}}else{c=u===-1?0:u<r.value.length-1?u+1:0;const f=c;for(;!t.value.getNode(r.value[c].dataset.key).canFocus;){if(c++,c===f){c=-1;break}c>=r.value.length&&(c=0)}}c!==-1&&r.value[c].focus()}[O.left,O.right].includes(g)&&(s.preventDefault(),p.click());const d=p.querySelector('[type="checkbox"]');[O.enter,O.space].includes(g)&&d&&(s.preventDefault(),d.click())});const i=()=>{var s;r.value=Array.from(e.value.querySelectorAll(`.${o.is("focusable")}[role=treeitem]`)),n.value=Array.from(e.value.querySelectorAll("input[type=checkbox]"));const p=e.value.querySelectorAll(`.${o.is("checked")}[role=treeitem]`);if(p.length){p[0].setAttribute("tabindex","0");return}(s=r.value[0])==null||s.setAttribute("tabindex","0")}}const ht=le({name:"ElTree",components:{ElTreeNode:lt},props:{data:{type:Array,default:()=>[]},emptyText:{type:String},renderAfterExpand:{type:Boolean,default:!0},nodeKey:String,checkStrictly:Boolean,defaultExpandAll:Boolean,expandOnClickNode:{type:Boolean,default:!0},checkOnClickNode:Boolean,checkDescendants:{type:Boolean,default:!1},autoExpandParent:{type:Boolean,default:!0},defaultCheckedKeys:Array,defaultExpandedKeys:Array,currentNodeKey:[String,Number],renderContent:Function,showCheckbox:{type:Boolean,default:!1},draggable:{type:Boolean,default:!1},allowDrag:Function,allowDrop:Function,props:{type:Object,default:()=>({children:"children",label:"label",disabled:"disabled"})},lazy:{type:Boolean,default:!1},highlightCurrent:Boolean,load:Function,filterNodeMethod:Function,accordion:Boolean,indent:{type:Number,default:18},icon:{type:We}},emits:["check-change","current-change","node-click","node-contextmenu","node-collapse","node-expand","check","node-drag-start","node-drag-end","node-drop","node-drag-leave","node-drag-enter","node-drag-over"],setup(e,t){const{t:o}=Qe(),r=U("tree"),n=K(new tt({key:e.nodeKey,data:e.data,lazy:e.lazy,props:e.props,load:e.load,currentNodeKey:e.currentNodeKey,checkStrictly:e.checkStrictly,checkDescendants:e.checkDescendants,defaultCheckedKeys:e.defaultCheckedKeys,defaultExpandedKeys:e.defaultExpandedKeys,autoExpandParent:e.autoExpandParent,defaultExpandAll:e.defaultExpandAll,filterNodeMethod:e.filterNodeMethod}));n.value.initialize();const a=K(n.value.root),i=K(null),s=K(null),p=K(null),{broadcastExpanded:g}=Se(e),{dragState:u}=rt({props:e,ctx:t,el$:s,dropIndicator$:p,store:n});ct({el$:s},n);const c=Ze(()=>{const{childNodes:l}=a.value;return!l||l.length===0||l.every(({visible:y})=>!y)});S(()=>e.currentNodeKey,l=>{n.value.setCurrentNodeKey(l)}),S(()=>e.defaultCheckedKeys,l=>{n.value.setDefaultCheckedKey(l)}),S(()=>e.defaultExpandedKeys,l=>{n.value.setDefaultExpandedKeys(l)}),S(()=>e.data,l=>{n.value.setData(l)},{deep:!0}),S(()=>e.checkStrictly,l=>{n.value.checkStrictly=l});const d=l=>{if(!e.filterNodeMethod)throw new Error("[Tree] filterNodeMethod is required when filter");n.value.filter(l)},f=l=>ce(e.nodeKey,l.data),N=l=>{if(!e.nodeKey)throw new Error("[Tree] nodeKey is required in getNodePath");const y=n.value.getNode(l);if(!y)return[];const B=[y.data];let P=y.parent;for(;P&&P!==a.value;)B.push(P.data),P=P.parent;return B.reverse()},C=(l,y)=>n.value.getCheckedNodes(l,y),v=l=>n.value.getCheckedKeys(l),m=()=>{const l=n.value.getCurrentNode();return l?l.data:null},A=()=>{if(!e.nodeKey)throw new Error("[Tree] nodeKey is required in getCurrentKey");const l=m();return l?l[e.nodeKey]:null},T=(l,y)=>{if(!e.nodeKey)throw new Error("[Tree] nodeKey is required in setCheckedNodes");n.value.setCheckedNodes(l,y)},I=(l,y)=>{if(!e.nodeKey)throw new Error("[Tree] nodeKey is required in setCheckedKeys");n.value.setCheckedKeys(l,y)},E=(l,y,B)=>{n.value.setChecked(l,y,B)},Y=()=>n.value.getHalfCheckedNodes(),J=()=>n.value.getHalfCheckedKeys(),L=(l,y=!0)=>{if(!e.nodeKey)throw new Error("[Tree] nodeKey is required in setCurrentNode");de(n,t.emit,()=>n.value.setUserCurrentNode(l,y))},h=(l,y=!0)=>{if(!e.nodeKey)throw new Error("[Tree] nodeKey is required in setCurrentKey");de(n,t.emit,()=>n.value.setCurrentNodeKey(l,y))},k=l=>n.value.getNode(l),b=l=>{n.value.remove(l)},X=(l,y)=>{n.value.append(l,y)},xe=(l,y)=>{n.value.insertBefore(l,y)},Oe=(l,y)=>{n.value.insertAfter(l,y)},$e=(l,y,B)=>{g(y),t.emit("node-expand",l,y,B)},je=(l,y)=>{if(!e.nodeKey)throw new Error("[Tree] nodeKey is required in updateKeyChild");n.value.updateChildren(l,y)};return G("RootTree",{ctx:t,props:e,store:n,root:a,currentNode:i,instance:Ee()}),G(Ve,void 0),{ns:r,store:n,root:a,currentNode:i,dragState:u,el$:s,dropIndicator$:p,isEmpty:c,filter:d,getNodeKey:f,getNodePath:N,getCheckedNodes:C,getCheckedKeys:v,getCurrentNode:m,getCurrentKey:A,setCheckedNodes:T,setCheckedKeys:I,setChecked:E,getHalfCheckedNodes:Y,getHalfCheckedKeys:J,setCurrentNode:L,setCurrentKey:h,t:o,getNode:k,remove:b,append:X,insertBefore:xe,insertAfter:Oe,handleNodeExpand:$e,updateKeyChildren:je}}});function ut(e,t,o,r,n,a){const i=$("el-tree-node");return D(),z("div",{ref:"el$",class:w([e.ns.b(),e.ns.is("dragging",!!e.dragState.draggingNode),e.ns.is("drop-not-allow",!e.dragState.allowDrop),e.ns.is("drop-inner",e.dragState.dropType==="inner"),{[e.ns.m("highlight-current")]:e.highlightCurrent}]),role:"tree"},[(D(!0),z(De,null,Ke(e.root.childNodes,s=>(D(),M(i,{key:e.getNodeKey(s),node:s,props:e.props,accordion:e.accordion,"render-after-expand":e.renderAfterExpand,"show-checkbox":e.showCheckbox,"render-content":e.renderContent,onNodeExpand:e.handleNodeExpand},null,8,["node","props","accordion","render-after-expand","show-checkbox","render-content","onNodeExpand"]))),128)),e.isEmpty?(D(),z("div",{key:0,class:w(e.ns.e("empty-block"))},[me(e.$slots,"empty",{},()=>{var s;return[ae("span",{class:w(e.ns.e("empty-text"))},Xe((s=e.emptyText)!=null?s:e.t("el.tree.emptyText")),3)]})],2)):R("v-if",!0),oe(ae("div",{ref:"dropIndicator$",class:w(e.ns.e("drop-indicator"))},null,2),[[re,e.dragState.showDropIndicator]])],2)}var V=ie(ht,[["render",ut],["__file","tree.vue"]]);V.install=e=>{e.component(V.name,V)};const ft=V,nn=ft;var pt=typeof W=="object"&&W&&W.Object===Object&&W,gt=pt,yt=gt,Nt=typeof self=="object"&&self&&self.Object===Object&&self,kt=yt||Nt||Function("return this")(),Ct=kt,vt=Ct,bt=vt.Symbol,he=bt,ye=he,Te=Object.prototype,mt=Te.hasOwnProperty,Et=Te.toString,q=ye?ye.toStringTag:void 0;function Dt(e){var t=mt.call(e,q),o=e[q];try{e[q]=void 0;var r=!0}catch{}var n=Et.call(e);return r&&(t?e[q]=o:delete e[q]),n}var Kt=Dt,St=Object.prototype,wt=St.toString;function Tt(e){return wt.call(e)}var At=Tt,Ne=he,xt=Kt,Ot=At,$t="[object Null]",jt="[object Undefined]",ke=Ne?Ne.toStringTag:void 0;function It(e){return e==null?e===void 0?jt:$t:ke&&ke in Object(e)?xt(e):Ot(e)}var Lt=It,Bt=Array.isArray,Mt=Bt;function zt(e){return e!=null&&typeof e=="object"}var Ft=zt,Pt=Lt,qt=Ft,Rt="[object Symbol]";function Ht(e){return typeof e=="symbol"||qt(e)&&Pt(e)==Rt}var Gt=Ht;function Ut(e,t){for(var o=-1,r=e==null?0:e.length,n=Array(r);++o<r;)n[o]=t(e[o],o,e);return n}var Yt=Ut,Ce=he,Jt=Yt,Wt=Mt,Qt=Gt,Zt=1/0,ve=Ce?Ce.prototype:void 0,be=ve?ve.toString:void 0;function Ae(e){if(typeof e=="string")return e;if(Wt(e))return Jt(e,Ae)+"";if(Qt(e))return be?be.call(e):"";var t=e+"";return t=="0"&&1/e==-Zt?"-0":t}var Vt=Ae,Xt=Vt;function _t(e){return e==null?"":Xt(e)}var on=_t;export{nn as E,Lt as _,Ct as a,he as b,Ft as c,gt as d,Gt as e,Mt as i,on as t};
