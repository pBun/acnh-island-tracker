(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{RXBc:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return I}));a("f3/d"),a("Vd3H");var r=a("q1tI"),n=a.n(r),s=a("sWYD"),c=a("R/WZ"),i=a("ofer"),l=a("eD//"),o=a("tVbE"),m=a("wx14"),u=a("Ff2n"),d=a("iuhU"),f=a("H2TA"),g=a("MquD"),p=r.forwardRef((function(e,t){var a=e.classes,n=e.className,s=Object(u.a)(e,["classes","className"]),c=r.useContext(g.a);return r.createElement("div",Object(m.a)({className:Object(d.a)(a.root,n,"flex-start"===c.alignItems&&a.alignItemsFlexStart),ref:t},s))})),h=Object(f.a)({root:{minWidth:56,flexShrink:0},alignItemsFlexStart:{marginTop:8}},{name:"MuiListItemAvatar"})(p),b=a("IsqK"),v=a("hxuT"),y=a("5AJ6"),x=Object(y.a)(r.createElement("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");var E=r.forwardRef((function(e,t){var a=e.alt,n=e.children,s=e.classes,c=e.className,i=e.component,l=void 0===i?"div":i,o=e.imgProps,f=e.sizes,g=e.src,p=e.srcSet,h=e.variant,b=void 0===h?"circle":h,v=Object(u.a)(e,["alt","children","classes","className","component","imgProps","sizes","src","srcSet","variant"]),y=null,E=function(e){var t=e.src,a=e.srcSet,n=r.useState(!1),s=n[0],c=n[1];return r.useEffect((function(){if(t||a){c(!1);var e=!0,r=new Image;return r.src=t,r.srcSet=a,r.onload=function(){e&&c("loaded")},r.onerror=function(){e&&c("error")},function(){e=!1}}}),[t,a]),s}({src:g,srcSet:p}),j=g||p,w=j&&"error"!==E;return y=w?r.createElement("img",Object(m.a)({alt:a,src:g,srcSet:p,sizes:f,className:s.img},o)):null!=n?n:j&&a?a[0]:r.createElement(x,{className:s.fallback}),r.createElement(l,Object(m.a)({className:Object(d.a)(s.root,s.system,s[b],c,!w&&s.colorDefault),ref:t},v),y)})),j=Object(f.a)((function(e){return{root:{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},colorDefault:{color:e.palette.background.default,backgroundColor:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[600]},circle:{},rounded:{borderRadius:e.shape.borderRadius},square:{borderRadius:0},img:{width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4},fallback:{width:"75%",height:"75%"}}}),{name:"MuiAvatar"})(E),w=(a("dRSK"),a("y0Xr")),O=w&&w.feed&&w.feed.entry&&w.feed.entry.map((function(e){return{name:e.gsx$villager.$t,species:e.gsx$species.$t,gender:e.gsx$gender.$t,personality:e.gsx$personality.$t}}));function S(e){return O&&O.find((function(t){return t.name===e}))}var k=a("Tx5Z"),N=a("RMc2"),R=Object(c.a)((function(e){return{text:{padding:e.spacing(2,2,0)},list:{marginBottom:e.spacing(2)},subheader:{backgroundColor:e.palette.background.paper}}}));function I(){var e=R(),t=n.a.useContext(k.b).session,a=t.sightings.sort((function(e,t){return t.timestamp-e.timestamp}));return n.a.createElement(N.a,null,n.a.createElement(i.a,{className:e.text,variant:"h5",gutterBottom:!0},"Recent Activity"),n.a.createElement(l.a,{className:e.list},a.length?a.map((function(a){var r=S(a.villager),c=a.timestamp+t.islandOffset;return n.a.createElement(n.a.Fragment,{key:a.timestamp},n.a.createElement(v.a,{className:e.subheader},Object(s.a)(c,"MMM d")),n.a.createElement(o.a,{button:!0},n.a.createElement(h,null,n.a.createElement(j,{alt:r.name,src:r.name})),n.a.createElement(b.a,{primary:r.name,secondary:Object(s.a)(c,"h:mm a")})))})):n.a.createElement(v.a,{className:e.subheader},"You haven't tracked any villagers yet!")))}}}]);
//# sourceMappingURL=component---src-pages-index-js-8c9aab178e8740f365f0.js.map