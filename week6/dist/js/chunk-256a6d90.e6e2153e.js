(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-256a6d90"],{"5a8c":function(e,t,n){"use strict";n.r(t);var c=n("7a23"),o={class:"container"},a={class:"row mt-4"};function r(e,t,n,r,i,l){var d=Object(c["resolveComponent"])("ProductsList");return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",o,[Object(c["createElementVNode"])("div",a,[Object(c["createVNode"])(d)])])}var i={class:"table align-middle"},l=Object(c["createElementVNode"])("thead",null,[Object(c["createElementVNode"])("tr",null,[Object(c["createElementVNode"])("th",null,"圖片"),Object(c["createElementVNode"])("th",null,"商品名稱"),Object(c["createElementVNode"])("th",null,"價格"),Object(c["createElementVNode"])("th")])],-1),d={style:{width:"200px"}},u={key:0,class:"h5"},b={key:1},s={class:"h6"},p={class:"h5"},j={class:"btn-group btn-group-sm"},O=["onClick"],g=["onClick","disabled"],m={class:"spinner-grow spinner-grow-sm"},v=Object(c["createTextVNode"])(" 加到購物車 ");function f(e,t,n,o,a,r){var f,h=Object(c["resolveComponent"])("UiPagination");return Object(c["openBlock"])(),Object(c["createElementBlock"])(c["Fragment"],null,[Object(c["createElementVNode"])("table",i,[l,Object(c["createElementVNode"])("tbody",null,[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(o.products,(function(e){return Object(c["openBlock"])(),Object(c["createElementBlock"])("tr",{key:e.id},[Object(c["createElementVNode"])("td",d,[Object(c["createElementVNode"])("div",{style:Object(c["normalizeStyle"])([{backgroundImage:"url(".concat(e.imageUrl,")")},{width:"100px",height:"150px","background-size":"cover","background-position":"center"}])},null,4)]),Object(c["createElementVNode"])("td",null,Object(c["toDisplayString"])(e.title),1),Object(c["createElementVNode"])("td",null,[e.price===e.origin_price?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",u,Object(c["toDisplayString"])(e.price)+" 元 ",1)):(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",b,[Object(c["createElementVNode"])("del",s,"原價 "+Object(c["toDisplayString"])(e.origin_price)+" 元",1),Object(c["createElementVNode"])("div",p,"現在只要 "+Object(c["toDisplayString"])(e.price)+" 元",1)]))]),Object(c["createElementVNode"])("td",null,[Object(c["createElementVNode"])("div",j,[Object(c["createElementVNode"])("button",{onClick:function(t){return o.checkDetail(e.id)},type:"button",class:"btn btn-outline-secondary"}," 查看更多 ",8,O),Object(c["createElementVNode"])("button",{onClick:function(t){return o.addToCart(e.id)},type:"button",class:"btn btn-danger",disabled:o.isLoadingItem===e.id},[Object(c["withDirectives"])(Object(c["createElementVNode"])("span",m,null,512),[[c["vShow"],o.isLoadingItem===e.id]]),v],8,g)])])])})),128))])]),(null===(f=o.pagination)||void 0===f?void 0:f.total_pages)>1?(Object(c["openBlock"])(),Object(c["createBlock"])(h,{key:0,pages:o.pagination,onChangePage:o.changePager},null,8,["pages","onChangePage"])):Object(c["createCommentVNode"])("",!0)],64)}var h=n("c4c8"),k=n("6c02"),E=n("5502"),N={name:"ProductsList",setup:function(){var e=Object(c["ref"])(null),t=Object(c["ref"])(null);Object(h["e"])().then((function(n){e.value=n.products,t.value=n.pagination}));var n=Object(k["d"])(),o=function(e){n.push("/product/".concat(e))},a=Object(c["ref"])(""),r=Object(E["b"])(),i=function(e){a.value=e,r.dispatch("cart/addToCart",{id:e,count:1}).then((function(){a.value=""}))},l=function(n){Object(h["e"])(n).then((function(n){e.value=n.products,t.value=n.pagination}))};return{products:e,checkDetail:o,isLoadingItem:a,addToCart:i,pagination:t,changePager:l}}},V=n("6b0d"),y=n.n(V);const B=y()(N,[["render",f]]);var w=B,C={name:"ProductsPage",components:{ProductsList:w}};const P=y()(C,[["render",r]]);t["default"]=P},c4c8:function(e,t,n){"use strict";n.d(t,"e",(function(){return a})),n.d(t,"d",(function(){return r})),n.d(t,"c",(function(){return i})),n.d(t,"f",(function(){return l})),n.d(t,"b",(function(){return d})),n.d(t,"a",(function(){return u}));var c=n("b775"),o="sheep-api",a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return Object(c["a"])("/api/".concat(o,"/products?page=").concat(e),"get")},r=function(e){return Object(c["a"])("/api/".concat(o,"/product/").concat(e),"get")},i=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return Object(c["a"])("/api/".concat(o,"/admin/products?page=").concat(e),"get",{category:t})},l=function(e){return Object(c["a"])("/api/".concat(o,"/admin/product"),"post",{data:e})},d=function(e,t){return Object(c["a"])("/api/".concat(o,"/admin/product/").concat(e),"put",{data:t})},u=function(e){return Object(c["a"])("/api/".concat(o,"/admin/product/").concat(e),"delete")}}}]);
//# sourceMappingURL=chunk-256a6d90.e6e2153e.js.map