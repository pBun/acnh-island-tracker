(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"469l":function(e,t,a){"use strict";var r=a("wx14"),n=a("Ff2n"),c=a("q1tI"),s=a("iuhU"),l=a("H2TA"),i=a("5AJ6"),o=Object(i.a)(c.createElement("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");var m=c.forwardRef((function(e,t){var a=e.alt,l=e.children,i=e.classes,m=e.className,u=e.component,d=void 0===u?"div":u,f=e.imgProps,p=e.sizes,g=e.src,h=e.srcSet,b=e.variant,v=void 0===b?"circle":b,y=Object(n.a)(e,["alt","children","classes","className","component","imgProps","sizes","src","srcSet","variant"]),k=null,E=function(e){var t=e.src,a=e.srcSet,r=c.useState(!1),n=r[0],s=r[1];return c.useEffect((function(){if(t||a){s(!1);var e=!0,r=new Image;return r.src=t,r.srcSet=a,r.onload=function(){e&&s("loaded")},r.onerror=function(){e&&s("error")},function(){e=!1}}}),[t,a]),n}({src:g,srcSet:h}),j=g||h,w=j&&"error"!==E;return k=w?c.createElement("img",Object(r.a)({alt:a,src:g,srcSet:h,sizes:p,className:i.img},f)):null!=l?l:j&&a?a[0]:c.createElement(o,{className:i.fallback}),c.createElement(d,Object(r.a)({className:Object(s.a)(i.root,i.system,i[v],m,!w&&i.colorDefault),ref:t},y),k)}));t.a=Object(l.a)((function(e){return{root:{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},colorDefault:{color:e.palette.background.default,backgroundColor:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[600]},circle:{},rounded:{borderRadius:e.shape.borderRadius},square:{borderRadius:0},img:{width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4},fallback:{width:"75%",height:"75%"}}}),{name:"MuiAvatar"})(m)},RXBc:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return v}));a("rGqo"),a("yt8O"),a("Btvt"),a("RW0V"),a("Vd3H");var r=a("q1tI"),n=a.n(r),c=a("sWYD"),s=a("R/WZ"),l=a("eD//"),i=a("tVbE"),o=a("SLcR"),m=a("IsqK"),u=a("hxuT"),d=a("469l"),f=a("Tx5Z"),p=a("vrFN"),g=a("RMc2"),h=a("S7Tf"),b=Object(s.a)((function(e){return{list:{marginBottom:e.spacing(2)},subheader:{backgroundColor:e.palette.background.paper}}}));function v(){var e=b(),t=n.a.useContext(f.b).session,a=t.sightings.sort((function(e,t){return t.timestamp-e.timestamp})),r=a.map((function(e){var a=e.timestamp+t.islandOffset;return{timestamp:e.timestamp,villager:e.villager,date:Object(c.a)(a,"MMM d, yyyy"),time:Object(c.a)(a,"h:mm a")}})).reduce((function(e,t){return(e[t.date]=e[t.date]||[]).push(t),e}),{});return n.a.createElement(g.a,null,n.a.createElement(p.a,{title:"ACNH Island Tracker"}),n.a.createElement(h.a,null,"Recent Activity"),n.a.createElement(l.a,{className:e.list},a.length?Object.keys(r).map((function(t){return n.a.createElement(n.a.Fragment,{key:t},n.a.createElement(u.a,{className:e.subheader},t),r[t].map((function(e){return n.a.createElement(i.a,{key:e.timestamp,button:!0,component:"a",href:"https://nookipedia.com/wiki/"+e.villager,target:"_blank",rel:"noopener noreferrer"},n.a.createElement(o.a,null,n.a.createElement(d.a,{alt:e.villager,src:e.villagerImage})),n.a.createElement(m.a,{primary:e.villager,secondary:e.time}))})))})):n.a.createElement(u.a,{className:e.subheader},"You haven't tracked any villagers yet!")))}},SLcR:function(e,t,a){"use strict";var r=a("wx14"),n=a("Ff2n"),c=a("q1tI"),s=a("iuhU"),l=a("H2TA"),i=a("MquD"),o=c.forwardRef((function(e,t){var a=e.classes,l=e.className,o=Object(n.a)(e,["classes","className"]),m=c.useContext(i.a);return c.createElement("div",Object(r.a)({className:Object(s.a)(a.root,l,"flex-start"===m.alignItems&&a.alignItemsFlexStart),ref:t},o))}));t.a=Object(l.a)({root:{minWidth:56,flexShrink:0},alignItemsFlexStart:{marginTop:8}},{name:"MuiListItemAvatar"})(o)}}]);
//# sourceMappingURL=component---src-pages-index-js-454d45233c40ba292f3a.js.map