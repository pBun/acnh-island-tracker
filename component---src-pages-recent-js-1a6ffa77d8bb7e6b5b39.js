(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"469l":function(e,t,a){"use strict";var r=a("wx14"),n=a("Ff2n"),c=a("q1tI"),s=a("iuhU"),i=a("H2TA"),l=a("5AJ6"),o=Object(l.a)(c.createElement("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");var u=c.forwardRef((function(e,t){var a=e.alt,i=e.children,l=e.classes,u=e.className,m=e.component,d=void 0===m?"div":m,f=e.imgProps,g=e.sizes,p=e.src,b=e.srcSet,h=e.variant,v=void 0===h?"circle":h,y=Object(n.a)(e,["alt","children","classes","className","component","imgProps","sizes","src","srcSet","variant"]),x=null,E=function(e){var t=e.src,a=e.srcSet,r=c.useState(!1),n=r[0],s=r[1];return c.useEffect((function(){if(t||a){s(!1);var e=!0,r=new Image;return r.src=t,r.srcSet=a,r.onload=function(){e&&s("loaded")},r.onerror=function(){e&&s("error")},function(){e=!1}}}),[t,a]),n}({src:p,srcSet:b}),w=p||b,S=w&&"error"!==E;return x=S?c.createElement("img",Object(r.a)({alt:a,src:p,srcSet:b,sizes:g,className:l.img},f)):null!=i?i:w&&a?a[0]:c.createElement(o,{className:l.fallback}),c.createElement(d,Object(r.a)({className:Object(s.a)(l.root,l.system,l[v],u,!S&&l.colorDefault),ref:t},y),x)}));t.a=Object(i.a)((function(e){return{root:{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},colorDefault:{color:e.palette.background.default,backgroundColor:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[600]},circle:{},rounded:{borderRadius:e.shape.borderRadius},square:{borderRadius:0},img:{width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4},fallback:{width:"75%",height:"75%"}}}),{name:"MuiAvatar"})(u)},SLcR:function(e,t,a){"use strict";var r=a("wx14"),n=a("Ff2n"),c=a("q1tI"),s=a("iuhU"),i=a("H2TA"),l=a("MquD"),o=c.forwardRef((function(e,t){var a=e.classes,i=e.className,o=Object(n.a)(e,["classes","className"]),u=c.useContext(l.a);return c.createElement("div",Object(r.a)({className:Object(s.a)(a.root,i,"flex-start"===u.alignItems&&a.alignItemsFlexStart),ref:t},o))}));t.a=Object(i.a)({root:{minWidth:56,flexShrink:0},alignItemsFlexStart:{marginTop:8}},{name:"MuiListItemAvatar"})(o)},"Zgk/":function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return y}));a("f3/d"),a("Vd3H");var r=a("q1tI"),n=a.n(r),c=a("sWYD"),s=a("R/WZ"),i=a("eD//"),l=a("tVbE"),o=a("SLcR"),u=a("IsqK"),m=a("hxuT"),d=a("469l"),f=a("oPwv"),g=a("Tx5Z"),p=a("vrFN"),b=a("RMc2"),h=a("S7Tf"),v=Object(s.a)((function(e){return{list:{marginBottom:e.spacing(2)},subheader:{backgroundColor:e.palette.background.paper}}}));function y(){var e=v(),t=n.a.useContext(g.b).session,a=t.sightings.sort((function(e,t){return t.timestamp-e.timestamp}));return n.a.createElement(b.a,null,n.a.createElement(p.a,{title:"ACNH Island Tracker"}),n.a.createElement(h.a,null,"Recent Activity"),n.a.createElement(i.a,{className:e.list},a.length?a.map((function(a){var r=Object(f.b)(a.villager),s=a.timestamp+t.islandOffset;return n.a.createElement(n.a.Fragment,{key:a.timestamp},n.a.createElement(m.a,{className:e.subheader},Object(c.a)(s,"MMM d")),n.a.createElement(l.a,{button:!0},n.a.createElement(o.a,null,n.a.createElement(d.a,{alt:r.name,src:r.name})),n.a.createElement(u.a,{primary:r.name,secondary:Object(c.a)(s,"h:mm a")})))})):n.a.createElement(m.a,{className:e.subheader},"You haven't tracked any villagers yet!")))}},oPwv:function(e,t,a){"use strict";a.d(t,"a",(function(){return n})),a.d(t,"b",(function(){return c}));a("f3/d"),a("dRSK");var r=a("y0Xr"),n=r&&r.feed&&r.feed.entry&&r.feed.entry.map((function(e){return{name:e.gsx$villager.$t,species:e.gsx$species.$t,gender:e.gsx$gender.$t,personality:e.gsx$personality.$t}}));function c(e){return n&&n.find((function(t){return t.name===e}))}}}]);
//# sourceMappingURL=component---src-pages-recent-js-1a6ffa77d8bb7e6b5b39.js.map