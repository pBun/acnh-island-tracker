(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{"469l":function(e,t,a){"use strict";var n=a("wx14"),r=a("Ff2n"),i=a("q1tI"),s=a("iuhU"),o=a("H2TA"),c=a("5AJ6"),l=Object(c.a)(i.createElement("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");var d=i.forwardRef((function(e,t){var a=e.alt,o=e.children,c=e.classes,d=e.className,m=e.component,u=void 0===m?"div":m,p=e.imgProps,f=e.sizes,g=e.src,b=e.srcSet,v=e.variant,y=void 0===v?"circle":v,h=Object(r.a)(e,["alt","children","classes","className","component","imgProps","sizes","src","srcSet","variant"]),O=null,j=function(e){var t=e.src,a=e.srcSet,n=i.useState(!1),r=n[0],s=n[1];return i.useEffect((function(){if(t||a){s(!1);var e=!0,n=new Image;return n.src=t,n.srcSet=a,n.onload=function(){e&&s("loaded")},n.onerror=function(){e&&s("error")},function(){e=!1}}}),[t,a]),r}({src:g,srcSet:b}),x=g||b,E=x&&"error"!==j;return O=E?i.createElement("img",Object(n.a)({alt:a,src:g,srcSet:b,sizes:f,className:c.img},p)):null!=o?o:x&&a?a[0]:i.createElement(l,{className:c.fallback}),i.createElement(u,Object(n.a)({className:Object(s.a)(c.root,c.system,c[y],d,!E&&c.colorDefault),ref:t},h),O)}));t.a=Object(o.a)((function(e){return{root:{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},colorDefault:{color:e.palette.background.default,backgroundColor:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[600]},circle:{},rounded:{borderRadius:e.shape.borderRadius},square:{borderRadius:0},img:{width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4},fallback:{width:"75%",height:"75%"}}}),{name:"MuiAvatar"})(d)},BEaf:function(e,t,a){"use strict";a.d(t,"a",(function(){return v}));a("rGqo"),a("yt8O"),a("Btvt"),a("RW0V"),a("f3/d"),a("91GP");var n=a("q1tI"),r=a.n(n),i=a("sWYD"),s=a("R/WZ"),o=a("tVbE"),c=a("SLcR"),l=a("IsqK"),d=a("469l"),m=a("csfp"),u=a("oPwv"),p=Object(s.a)((function(e){return{name:{verticalAlign:"middle"},meta:Object.assign({color:e.palette.text.secondary,verticalAlign:"middle"},e.typography.caption)}}));function f(e){var t=e.villager,a=p();return r.a.createElement(r.a.Fragment,null,r.a.createElement("span",{className:a.name},t.name)," ",r.a.createElement("span",{className:a.meta},"("+t.personality+" "+t.species+")"))}var g=Object(s.a)((function(e){return{listItemSecondary:Object.assign({color:e.palette.text.secondary},e.typography.caption)}}));function b(e,t){return void 0===t&&(t=1e3),(Math.round(1e4*e)/100).toFixed(2)+"%"}function v(e){var t=e.villager,a=e.timestamp,n=e.currentResidents,s=(e.pastResidents,function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,["villager","timestamp","currentResidents","pastResidents"])),p=g(),v=b(t.baseIslandChance),y=b(Object(u.c)(t.name,n));return r.a.createElement(o.a,Object.assign({button:!0,component:"a",href:"https://nookipedia.com/wiki/"+t.name,target:"_blank",rel:"noopener noreferrer"},s),r.a.createElement(c.a,null,r.a.createElement(d.a,{alt:t.name,src:t.icon})),r.a.createElement(l.a,{primary:r.a.createElement(f,{villager:t}),secondary:r.a.createElement(r.a.Fragment,null,a?Object(i.a)(a,"h:mm a")+" | ":"",r.a.createElement(m.a,{arrow:!0,title:"Base Chance: "+v,placement:"top"},r.a.createElement("span",null,"NMT: "+y))),secondaryTypographyProps:{className:p.listItemSecondary}}))}},IsqK:function(e,t,a){"use strict";var n=a("wx14"),r=a("Ff2n"),i=a("q1tI"),s=a("iuhU"),o=a("H2TA"),c=a("ofer"),l=a("MquD"),d=i.forwardRef((function(e,t){var a=e.children,o=e.classes,d=e.className,m=e.disableTypography,u=void 0!==m&&m,p=e.inset,f=void 0!==p&&p,g=e.primary,b=e.primaryTypographyProps,v=e.secondary,y=e.secondaryTypographyProps,h=Object(r.a)(e,["children","classes","className","disableTypography","inset","primary","primaryTypographyProps","secondary","secondaryTypographyProps"]),O=i.useContext(l.a).dense,j=null!=g?g:a;null==j||j.type===c.a||u||(j=i.createElement(c.a,Object(n.a)({variant:O?"body2":"body1",className:o.primary,component:"span",display:"block"},b),j));var x=v;return null==x||x.type===c.a||u||(x=i.createElement(c.a,Object(n.a)({variant:"body2",className:o.secondary,color:"textSecondary",display:"block"},y),x)),i.createElement("div",Object(n.a)({className:Object(s.a)(o.root,d,O&&o.dense,f&&o.inset,j&&x&&o.multiline),ref:t},h),j,x)}));t.a=Object(o.a)({root:{flex:"1 1 auto",minWidth:0,marginTop:4,marginBottom:4},multiline:{marginTop:6,marginBottom:6},dense:{},inset:{paddingLeft:56},primary:{},secondary:{}},{name:"MuiListItemText"})(d)},PUwh:function(e,t,a){"use strict";a.d(t,"a",(function(){return p}));a("91GP"),a("rGqo"),a("yt8O"),a("Btvt"),a("RW0V"),a("Vd3H");var n=a("q1tI"),r=a.n(n),i=a("sWYD"),s=a("R/WZ"),o=a("eD//"),c=a("hxuT"),l=a("uAWZ"),d=a("dCz8"),m=a("BEaf");var u=Object(s.a)((function(e){return{list:{marginBottom:e.spacing(2),padding:e.spacing(1,0,4)},listSubheader:{paddingLeft:e.spacing(5),paddingRight:e.spacing(5),backgroundColor:e.palette.background.paper}}}));function p(e){var t=u(),a=e.sightings,n=(e.currentResidents,e.pastResidents,function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,["sightings","currentResidents","pastResidents"])),s=Object(d.a)().getVillager,p=a.sort((function(e,t){return t.timestamp-e.timestamp})),f=p.map((function(e,t){var a=s(e.villager);return{timestamp:e.timestamp,date:Object(i.a)(e.timestamp,"MMM d, yyyy"),villager:a}})),g=Object(l.a)(f,"date");return r.a.createElement(o.a,Object.assign({className:t.list},n),p.length?Object.keys(g).map((function(e){return r.a.createElement(r.a.Fragment,{key:e},r.a.createElement(c.a,{className:t.listSubheader},e),g[e].map((function(e){return r.a.createElement(m.a,{key:e.timestamp,villager:e.villager,timestamp:e.timestamp})})))})):r.a.createElement(c.a,{className:t.listSubheader},"No villagers tracked"))}},SLcR:function(e,t,a){"use strict";var n=a("wx14"),r=a("Ff2n"),i=a("q1tI"),s=a("iuhU"),o=a("H2TA"),c=a("MquD"),l=i.forwardRef((function(e,t){var a=e.classes,o=e.className,l=Object(r.a)(e,["classes","className"]),d=i.useContext(c.a);return i.createElement("div",Object(n.a)({className:Object(s.a)(a.root,o,"flex-start"===d.alignItems&&a.alignItemsFlexStart),ref:t},l))}));t.a=Object(o.a)({root:{minWidth:56,flexShrink:0},alignItemsFlexStart:{marginTop:8}},{name:"MuiListItemAvatar"})(l)},tVbE:function(e,t,a){"use strict";var n=a("wx14"),r=a("Ff2n"),i=a("q1tI"),s=a("iuhU"),o=a("H2TA"),c=a("VD++"),l=a("ucBr"),d=a("bfFb"),m=a("MquD"),u=a("i8i4"),p="undefined"==typeof window?i.useEffect:i.useLayoutEffect,f=i.forwardRef((function(e,t){var a=e.alignItems,o=void 0===a?"center":a,f=e.autoFocus,g=void 0!==f&&f,b=e.button,v=void 0!==b&&b,y=e.children,h=e.classes,O=e.className,j=e.component,x=e.ContainerComponent,E=void 0===x?"li":x,N=e.ContainerProps,k=(N=void 0===N?{}:N).className,I=Object(r.a)(N,["className"]),R=e.dense,w=void 0!==R&&R,C=e.disabled,S=void 0!==C&&C,T=e.disableGutters,F=void 0!==T&&T,A=e.divider,P=void 0!==A&&A,q=e.focusVisibleClassName,M=e.selected,V=void 0!==M&&M,B=Object(r.a)(e,["alignItems","autoFocus","button","children","classes","className","component","ContainerComponent","ContainerProps","dense","disabled","disableGutters","divider","focusVisibleClassName","selected"]),D=i.useContext(m.a),L={dense:w||D.dense||!1,alignItems:o},W=i.useRef(null);p((function(){g&&W.current&&W.current.focus()}),[g]);var z=i.Children.toArray(y),G=z.length&&Object(l.a)(z[z.length-1],["ListItemSecondaryAction"]),H=i.useCallback((function(e){W.current=u.findDOMNode(e)}),[]),U=Object(d.a)(H,t),$=Object(n.a)({className:Object(s.a)(h.root,O,L.dense&&h.dense,!F&&h.gutters,P&&h.divider,S&&h.disabled,v&&h.button,"center"!==o&&h.alignItemsFlexStart,G&&h.secondaryAction,V&&h.selected),disabled:S},B),J=j||"li";return v&&($.component=j||"div",$.focusVisibleClassName=Object(s.a)(h.focusVisible,q),J=c.a),G?(J=$.component||j?J:"div","li"===E&&("li"===J?J="div":"li"===$.component&&($.component="div")),i.createElement(m.a.Provider,{value:L},i.createElement(E,Object(n.a)({className:Object(s.a)(h.container,k),ref:U},I),i.createElement(J,$,z),z.pop()))):i.createElement(m.a.Provider,{value:L},i.createElement(J,Object(n.a)({ref:U},$),z))}));t.a=Object(o.a)((function(e){return{root:{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",width:"100%",boxSizing:"border-box",textAlign:"left",paddingTop:8,paddingBottom:8,"&$focusVisible":{backgroundColor:e.palette.action.selected},"&$selected, &$selected:hover":{backgroundColor:e.palette.action.selected},"&$disabled":{opacity:.5}},container:{position:"relative"},focusVisible:{},dense:{paddingTop:4,paddingBottom:4},alignItemsFlexStart:{alignItems:"flex-start"},disabled:{},divider:{borderBottom:"1px solid ".concat(e.palette.divider),backgroundClip:"padding-box"},gutters:{paddingLeft:16,paddingRight:16},button:{transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:e.palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}}},secondaryAction:{paddingRight:48},selected:{}}}),{name:"MuiListItem"})(f)}}]);
//# sourceMappingURL=558a14822d7bc57620f71d517b8b9cf60091d94b-f9931283ee03492deffd.js.map