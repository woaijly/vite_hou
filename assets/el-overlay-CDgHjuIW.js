import{o as te,aL as de,aM as fe,aN as j,ap as ve,aE as me,C as x,a5 as k,aO as se,aP as J,N as K,aQ as ye,K as pe,aR as ge,J as be,aS as W,af as G,aT as H,B as X,f as R,aU as U,H as h,G as he,a3 as Ce,a4 as we,D as Q,aV as Ee,d as N,e as _,i as V,T as w,g as o,t as ke,w as E,v as q,S as Me,E as Te,V as Z,W as ne,A as ae,aW as Se,aX as Be,ah as le,aj as Ie,aY as De,ar as ee,r as O,aZ as Le,a_ as Pe,a$ as Oe,O as Ae,X as $e,b0 as oe,b1 as Fe,an as Ne,I as ze,b2 as Ye,Q as Re,b3 as Xe,b4 as Ve,b5 as He,R as We,b6 as Ue,a7 as _e}from"./index-BTl7R4UL.js";import{g as je}from"./el-table-column-BbWqOXkO.js";const Ke=(e,s,n,d)=>{let a={offsetX:0,offsetY:0};const r=u=>{const y=u.clientX,b=u.clientY,{offsetX:g,offsetY:v}=a,m=e.value.getBoundingClientRect(),C=m.left,c=m.top,A=m.width,M=m.height,z=document.documentElement.clientWidth,Y=document.documentElement.clientHeight,$=-C+g,T=-c+v,S=z-C-A+g,B=Y-c-M+v,I=t=>{let L=g+t.clientX-y,F=v+t.clientY-b;d!=null&&d.value||(L=Math.min(Math.max(L,$),S),F=Math.min(Math.max(F,T),B)),a={offsetX:L,offsetY:F},e.value&&(e.value.style.transform=`translate(${j(L)}, ${j(F)})`)},D=()=>{document.removeEventListener("mousemove",I),document.removeEventListener("mouseup",D)};document.addEventListener("mousemove",I),document.addEventListener("mouseup",D)},i=()=>{s.value&&e.value&&s.value.addEventListener("mousedown",r)},f=()=>{s.value&&e.value&&s.value.removeEventListener("mousedown",r)},l=()=>{a={offsetX:0,offsetY:0},e.value&&(e.value.style.transform="none")};return te(()=>{de(()=>{n.value?i():f()})}),fe(()=>{f()}),{resetPosition:l}},qe=(e,s={})=>{ve(e)||me("[useLockscreen]","You need to pass a ref param to this function");const n=s.ns||x("popup"),d=k(()=>n.bm("parent","hidden"));if(!se||J(document.body,d.value))return;let a=0,r=!1,i="0";const f=()=>{setTimeout(()=>{be(document==null?void 0:document.body,d.value),r&&document&&(document.body.style.width=i)},200)};K(e,l=>{if(!l){f();return}r=!J(document.body,d.value),r&&(i=document.body.style.width),a=je(n.namespace.value);const u=document.documentElement.clientHeight<document.body.scrollHeight,y=ye(document.body,"overflowY");a>0&&(u||y==="scroll")&&r&&(document.body.style.width=`calc(100% - ${a}px)`),pe(document.body,d.value)}),ge(()=>f())},ie=e=>{if(!e)return{onClick:W,onMousedown:W,onMouseup:W};let s=!1,n=!1;return{onClick:i=>{s&&n&&e(i),s=n=!1},onMousedown:i=>{s=i.target===i.currentTarget},onMouseup:i=>{n=i.target===i.currentTarget}}},Ze=G({mask:{type:Boolean,default:!0},customMaskEvent:Boolean,overlayClass:{type:H([String,Array,Object])},zIndex:{type:H([String,Number])}}),xe={click:e=>e instanceof MouseEvent},Ge="overlay";var Je=X({name:"ElOverlay",props:Ze,emits:xe,setup(e,{slots:s,emit:n}){const d=x(Ge),a=l=>{n("click",l)},{onClick:r,onMousedown:i,onMouseup:f}=ie(e.customMaskEvent?void 0:a);return()=>e.mask?R("div",{class:[d.b(),e.overlayClass],style:{zIndex:e.zIndex},onClick:r,onMousedown:i,onMouseup:f},[h(s,"default")],U.STYLE|U.CLASS|U.PROPS,["onClick","onMouseup","onMousedown"]):he("div",{class:e.overlayClass,style:{zIndex:e.zIndex,position:"fixed",top:"0px",right:"0px",bottom:"0px",left:"0px"}},[h(s,"default")])}});const Qe=Je,re=Symbol("dialogInjectionKey"),ue=G({center:Boolean,alignCenter:Boolean,closeIcon:{type:Ce},draggable:Boolean,overflow:Boolean,fullscreen:Boolean,showClose:{type:Boolean,default:!0},title:{type:String,default:""},ariaLevel:{type:String,default:"2"}}),eo={close:()=>!0},oo=X({name:"ElDialogContent"}),to=X({...oo,props:ue,emits:eo,setup(e,{expose:s}){const n=e,{t:d}=we(),{Close:a}=Se,{dialogRef:r,headerRef:i,bodyId:f,ns:l,style:u}=Q(re),{focusTrapRef:y}=Q(Ee),b=k(()=>[l.b(),l.is("fullscreen",n.fullscreen),l.is("draggable",n.draggable),l.is("align-center",n.alignCenter),{[l.m("center")]:n.center}]),g=Be(y,r),v=k(()=>n.draggable),m=k(()=>n.overflow),{resetPosition:C}=Ke(r,i,v,m);return s({resetPosition:C}),(c,A)=>(N(),_("div",{ref:o(g),class:w(o(b)),style:ne(o(u)),tabindex:"-1"},[V("header",{ref_key:"headerRef",ref:i,class:w([o(l).e("header"),{"show-close":c.showClose}])},[h(c.$slots,"header",{},()=>[V("span",{role:"heading","aria-level":c.ariaLevel,class:w(o(l).e("title"))},ke(c.title),11,["aria-level"])]),c.showClose?(N(),_("button",{key:0,"aria-label":o(d)("el.dialog.close"),class:w(o(l).e("headerbtn")),type:"button",onClick:M=>c.$emit("close")},[R(o(Te),{class:w(o(l).e("close"))},{default:E(()=>[(N(),q(Me(c.closeIcon||o(a))))]),_:1},8,["class"])],10,["aria-label","onClick"])):Z("v-if",!0)],2),V("div",{id:o(f),class:w(o(l).e("body"))},[h(c.$slots,"default")],10,["id"]),c.$slots.footer?(N(),_("footer",{key:0,class:w(o(l).e("footer"))},[h(c.$slots,"footer")],2)):Z("v-if",!0)],6))}});var so=ae(to,[["__file","dialog-content.vue"]]);const no=G({...ue,appendToBody:Boolean,appendTo:{type:H([String,Object]),default:"body"},beforeClose:{type:H(Function)},destroyOnClose:Boolean,closeOnClickModal:{type:Boolean,default:!0},closeOnPressEscape:{type:Boolean,default:!0},lockScroll:{type:Boolean,default:!0},modal:{type:Boolean,default:!0},openDelay:{type:Number,default:0},closeDelay:{type:Number,default:0},top:{type:String},modelValue:Boolean,modalClass:String,width:{type:[String,Number]},zIndex:{type:Number},trapFocus:Boolean,headerAriaLevel:{type:String,default:"2"}}),ao={open:()=>!0,opened:()=>!0,close:()=>!0,closed:()=>!0,[le]:e=>Ie(e),openAutoFocus:()=>!0,closeAutoFocus:()=>!0},lo=(e,s)=>{var n;const a=$e().emit,{nextZIndex:r}=De();let i="";const f=ee(),l=ee(),u=O(!1),y=O(!1),b=O(!1),g=O((n=e.zIndex)!=null?n:r());let v,m;const C=Le("namespace",Pe),c=k(()=>{const p={},P=`--${C.value}-dialog`;return e.fullscreen||(e.top&&(p[`${P}-margin-top`]=e.top),e.width&&(p[`${P}-width`]=j(e.width))),p}),A=k(()=>e.alignCenter?{display:"flex"}:{});function M(){a("opened")}function z(){a("closed"),a(le,!1),e.destroyOnClose&&(b.value=!1)}function Y(){a("close")}function $(){m==null||m(),v==null||v(),e.openDelay&&e.openDelay>0?{stop:v}=oe(()=>I(),e.openDelay):I()}function T(){v==null||v(),m==null||m(),e.closeDelay&&e.closeDelay>0?{stop:m}=oe(()=>D(),e.closeDelay):D()}function S(){function p(P){P||(y.value=!0,u.value=!1)}e.beforeClose?e.beforeClose(p):T()}function B(){e.closeOnClickModal&&S()}function I(){se&&(u.value=!0)}function D(){u.value=!1}function t(){a("openAutoFocus")}function L(){a("closeAutoFocus")}function F(p){var P;((P=p.detail)==null?void 0:P.focusReason)==="pointer"&&p.preventDefault()}e.lockScroll&&qe(u);function ce(){e.closeOnPressEscape&&S()}return K(()=>e.modelValue,p=>{p?(y.value=!1,$(),b.value=!0,g.value=Oe(e.zIndex)?r():g.value++,Ae(()=>{a("open"),s.value&&(s.value.scrollTop=0)})):u.value&&T()}),K(()=>e.fullscreen,p=>{s.value&&(p?(i=s.value.style.transform,s.value.style.transform=""):s.value.style.transform=i)}),te(()=>{e.modelValue&&(u.value=!0,b.value=!0,$())}),{afterEnter:M,afterLeave:z,beforeLeave:Y,handleClose:S,onModalClick:B,close:T,doClose:D,onOpenAutoFocus:t,onCloseAutoFocus:L,onCloseRequested:ce,onFocusoutPrevented:F,titleId:f,bodyId:l,closed:y,style:c,overlayDialogStyle:A,rendered:b,visible:u,zIndex:g}},io=X({name:"ElDialog",inheritAttrs:!1}),ro=X({...io,props:no,emits:ao,setup(e,{expose:s}){const n=e,d=Fe();Ne({scope:"el-dialog",from:"the title slot",replacement:"the header slot",version:"3.0.0",ref:"https://element-plus.org/en-US/component/dialog.html#slots"},k(()=>!!d.title));const a=x("dialog"),r=O(),i=O(),f=O(),{visible:l,titleId:u,bodyId:y,style:b,overlayDialogStyle:g,rendered:v,zIndex:m,afterEnter:C,afterLeave:c,beforeLeave:A,handleClose:M,onModalClick:z,onOpenAutoFocus:Y,onCloseAutoFocus:$,onCloseRequested:T,onFocusoutPrevented:S}=lo(n,r);ze(re,{dialogRef:r,headerRef:i,bodyId:y,ns:a,rendered:v,style:b});const B=ie(z),I=k(()=>n.draggable&&!n.fullscreen);return s({visible:l,dialogContentRef:f,resetPosition:()=>{var t;(t=f.value)==null||t.resetPosition()}}),(t,L)=>(N(),q(o(Ue),{to:t.appendTo,disabled:t.appendTo!=="body"?!1:!t.appendToBody},{default:E(()=>[R(Ye,{name:"dialog-fade",onAfterEnter:o(C),onAfterLeave:o(c),onBeforeLeave:o(A),persisted:""},{default:E(()=>[Re(R(o(Qe),{"custom-mask-event":"",mask:t.modal,"overlay-class":t.modalClass,"z-index":o(m)},{default:E(()=>[V("div",{role:"dialog","aria-modal":"true","aria-label":t.title||void 0,"aria-labelledby":t.title?void 0:o(u),"aria-describedby":o(y),class:w(`${o(a).namespace.value}-overlay-dialog`),style:ne(o(g)),onClick:o(B).onClick,onMousedown:o(B).onMousedown,onMouseup:o(B).onMouseup},[R(o(Xe),{loop:"",trapped:o(l),"focus-start-el":"container",onFocusAfterTrapped:o(Y),onFocusAfterReleased:o($),onFocusoutPrevented:o(S),onReleaseRequested:o(T)},{default:E(()=>[o(v)?(N(),q(so,Ve({key:0,ref_key:"dialogContentRef",ref:f},t.$attrs,{center:t.center,"align-center":t.alignCenter,"close-icon":t.closeIcon,draggable:o(I),overflow:t.overflow,fullscreen:t.fullscreen,"show-close":t.showClose,title:t.title,"aria-level":t.headerAriaLevel,onClose:o(M)}),He({header:E(()=>[t.$slots.title?h(t.$slots,"title",{key:1}):h(t.$slots,"header",{key:0,close:o(M),titleId:o(u),titleClass:o(a).e("title")})]),default:E(()=>[h(t.$slots,"default")]),_:2},[t.$slots.footer?{name:"footer",fn:E(()=>[h(t.$slots,"footer")])}:void 0]),1040,["center","align-center","close-icon","draggable","overflow","fullscreen","show-close","title","aria-level","onClose"])):Z("v-if",!0)]),_:3},8,["trapped","onFocusAfterTrapped","onFocusAfterReleased","onFocusoutPrevented","onReleaseRequested"])],46,["aria-label","aria-labelledby","aria-describedby","onClick","onMousedown","onMouseup"])]),_:3},8,["mask","overlay-class","z-index"]),[[We,o(l)]])]),_:3},8,["onAfterEnter","onAfterLeave","onBeforeLeave"])]),_:3},8,["to","disabled"]))}});var uo=ae(ro,[["__file","dialog.vue"]]);const vo=_e(uo);export{vo as E};