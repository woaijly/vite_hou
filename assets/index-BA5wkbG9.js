import{_ as B,b as g,u as I,o as P,ac as T,d as b,e as j,f as e,g as w,i as E,w as o,h as s,t as u,v as h,ad as O,F as U,ae as q,l as A,p as R,q as $,n as G,s as H}from"./index-CHJFmuEZ.js";import{E as J,a as K,b as L,c as Q}from"./el-table-column-CJIZKxM3.js";import{E as W,a as X}from"./el-image-viewer-BvOql8ye.js";import{d as y}from"./dayjs.min-CxMP4GVf.js";const Z={class:"form"},ee={class:"pagination-info"},te={__name:"index",setup(ae){const r=g({pageNum:1,pageSize:10}),i=g({list:[],total:0}),v=I();P(()=>{_()});const _=(l={})=>{T({...r,...l}).then(({data:t})=>{const{list:d,total:m}=t.data;d.forEach(p=>{p.create_time=y(p.create_time).format("YYYY-MM-DD")}),i.list=d,i.total=m})},x=l=>({已取消:"info",待支付:"warning",已完成:"success"})[l],c=g({out_trade_no:""}),C=async l=>{const{data:t}=await q({id:l});t.code===1e4&&_()},k=()=>{_(c)},z=l=>{r.value.pageSize=l,_()},Y=l=>{r.value.pageNum=l,_()};return(l,t)=>{const d=A,m=R,p=$,f=G,D=H,n=J,N=W,F=K,M=X,S=L,V=Q;return b(),j(U,null,[e(d,{route:w(v)},null,8,["route"]),E("div",Z,[e(D,{inline:!0,model:c},{default:o(()=>[e(p,{prop:"out_trade_no"},{default:o(()=>[e(m,{modelValue:c.out_trade_no,"onUpdate:modelValue":t[0]||(t[0]=a=>c.out_trade_no=a),placeholder:"请输入订单号"},null,8,["modelValue"])]),_:1}),e(p,null,{default:o(()=>[e(f,{type:"primary",onClick:k},{default:o(()=>t[2]||(t[2]=[s("查询")])),_:1})]),_:1})]),_:1},8,["model"])]),e(S,{data:i.list},{default:o(()=>[e(n,{prop:"out_trade_no",label:"订单号",fixed:"left",width:"151"}),e(n,{prop:"hospital_name",label:"就诊医院"}),e(n,{prop:"service_name",label:"陪诊服务"}),e(n,{label:"陪护师头像"},{default:o(a=>[e(N,{style:{width:"40px",height:"40px"},src:a.row.companion.avatar},null,8,["src"])]),_:1}),e(n,{label:"陪护师手机",width:"120"},{default:o(a=>[s(u(a.row.companion.mobile),1)]),_:1}),e(n,{prop:"price",label:"总价"}),e(n,{prop:"paidPrice",label:"已付"}),e(n,{label:"下单时间",width:"120"},{default:o(a=>[s(u(w(y)(a.row.order_start_time).format("YYYY-MM-DD")),1)]),_:1}),e(n,{label:"订单状态"},{default:o(a=>[e(F,{type:x(a.row.trade_state)},{default:o(()=>[s(u(a.row.trade_state),1)]),_:2},1032,["type"])]),_:1}),e(n,{prop:"service_state",label:"接单状态"}),e(n,{prop:"tel",label:"联系人电话",width:"120"}),e(n,{label:"操作",width:"100",fixed:"right"},{default:o(a=>[a.row.trade_status==="待服务"?(b(),h(M,{key:0,title:"确定要完成嘛？","confirm-button-text":"是","cancel-button-text":"否",icon:w(O),"icon-color":"#626AEF",onConfirm:oe=>C(a.row.out_trade_no),onCancel:l.cancelEvent},{reference:o(()=>[e(f,{type:"primary",link:""},{default:o(()=>t[3]||(t[3]=[s("服务完成")])),_:1})]),_:2},1032,["icon","onConfirm","onCancel"])):(b(),h(f,{key:1,type:"primary",link:"",disabled:""},{default:o(()=>t[4]||(t[4]=[s("暂无服务")])),_:1}))]),_:1})]),_:1},8,["data"]),E("div",ee,[e(V,{"current-page":r.pageNum,"onUpdate:currentPage":t[1]||(t[1]=a=>r.pageNum=a),"page-size":r.pageSize,size:"small",background:!1,layout:"slot, prev, pager, next",total:i.total,onSizeChange:z,onCurrentChange:Y},{default:o(()=>[E("span",null,"总页数："+u(i.total),1)]),_:1},8,["current-page","page-size","total"])])],64)}}},ie=B(te,[["__scopeId","data-v-47762c9f"]]);export{ie as default};