(self.webpackChunkacnh_island_tracker=self.webpackChunkacnh_island_tracker||[]).push([[912],{2846:function(e,t,n){"use strict";var a=n(2122),i=n(1253),r=n(7294),s=n(5505),l=n(4621),c=n(7595),o=r.forwardRef((function(e,t){var n=e.absolute,l=void 0!==n&&n,c=e.classes,o=e.className,m=e.component,d=void 0===m?"hr":m,g=e.flexItem,u=void 0!==g&&g,p=e.light,f=void 0!==p&&p,x=e.orientation,v=void 0===x?"horizontal":x,h=e.role,b=void 0===h?"hr"!==d?"separator":void 0:h,E=e.variant,Z=void 0===E?"fullWidth":E,y=(0,i.Z)(e,["absolute","classes","className","component","flexItem","light","orientation","role","variant"]);return r.createElement(d,(0,a.Z)({className:(0,s.Z)(c.root,o,"fullWidth"!==Z&&c[Z],l&&c.absolute,u&&c.flexItem,f&&c.light,"vertical"===v&&c.vertical),role:b,ref:t},y))}));t.Z=(0,l.Z)((function(e){return{root:{height:1,margin:0,border:"none",flexShrink:0,backgroundColor:e.palette.divider},absolute:{position:"absolute",bottom:0,left:0,width:"100%"},inset:{marginLeft:72},light:{backgroundColor:(0,c.U1)(e.palette.divider,.08)},middle:{marginLeft:e.spacing(2),marginRight:e.spacing(2)},vertical:{height:"100%",width:1},flexItem:{alignSelf:"stretch",height:"auto"}}}),{name:"MuiDivider"})(o)},5374:function(e,t,n){"use strict";var a=n(5318),i=n(862);t.Z=void 0;var r=i(n(7294)),s=(0,a(n(8786)).default)(r.createElement("path",{d:"M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"ExitToApp");t.Z=s},6159:function(e,t,n){"use strict";n.d(t,{Z:function(){return u}});var a=n(9756),i=n(7294),r=n(2631),s=n(920),l=n(791),c=n(5966),o=n(8605),m=n(5411),d=n(2146),g=(0,s.Z)((function(e){return{list:{marginBottom:e.spacing(2),padding:e.spacing(1,0,4)},listSubheader:{paddingLeft:e.spacing(5),paddingRight:e.spacing(5),backgroundColor:e.palette.background.paper}}}));function u(e){var t=g(),n=e.sightings,s=(0,a.Z)(e,["sightings"]),u=(0,m.Z)().getVillager,p=n.sort((function(e,t){return t.timestamp-e.timestamp})),f=p.map((function(e,t){var n=u(e.villager.id);return Object.assign({},e,{date:(0,r.Z)(e.timestamp,"MMM d, yyyy"),villager:n})})),x=(0,o.v)(f,"date");return i.createElement(l.Z,Object.assign({className:t.list},s),p.length?Object.keys(x).map((function(e){return i.createElement(i.Fragment,{key:e},i.createElement(c.Z,{className:t.listSubheader},e),x[e].map((function(e){return i.createElement(d.Z,{key:e.timestamp,villager:e.villager,sighting:e})})))})):i.createElement(c.Z,{className:t.listSubheader},"No encounters to display"))}},9516:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return M}});var a=n(7294),i=n(5444),r=n(920),s=n(453),l=n(1253),c=n(2122),o=n(5505),m=n(4621),d=[0,1,2,3,4,5,6,7,8,9,10],g=["auto",!0,1,2,3,4,5,6,7,8,9,10,11,12];function u(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=parseFloat(e);return"".concat(n/t).concat(String(e).replace(String(n),"")||"px")}var p=a.forwardRef((function(e,t){var n=e.alignContent,i=void 0===n?"stretch":n,r=e.alignItems,s=void 0===r?"stretch":r,m=e.classes,d=e.className,g=e.component,u=void 0===g?"div":g,p=e.container,f=void 0!==p&&p,x=e.direction,v=void 0===x?"row":x,h=e.item,b=void 0!==h&&h,E=e.justify,Z=void 0===E?"flex-start":E,y=e.lg,w=void 0!==y&&y,N=e.md,k=void 0!==N&&N,C=e.sm,S=void 0!==C&&C,j=e.spacing,I=void 0===j?0:j,M=e.wrap,W=void 0===M?"wrap":M,R=e.xl,z=void 0!==R&&R,L=e.xs,B=void 0!==L&&L,P=e.zeroMinWidth,T=void 0!==P&&P,G=(0,l.Z)(e,["alignContent","alignItems","classes","className","component","container","direction","item","justify","lg","md","sm","spacing","wrap","xl","xs","zeroMinWidth"]),V=(0,o.Z)(m.root,d,f&&[m.container,0!==I&&m["spacing-xs-".concat(String(I))]],b&&m.item,T&&m.zeroMinWidth,"row"!==v&&m["direction-xs-".concat(String(v))],"wrap"!==W&&m["wrap-xs-".concat(String(W))],"stretch"!==s&&m["align-items-xs-".concat(String(s))],"stretch"!==i&&m["align-content-xs-".concat(String(i))],"flex-start"!==Z&&m["justify-xs-".concat(String(Z))],!1!==B&&m["grid-xs-".concat(String(B))],!1!==S&&m["grid-sm-".concat(String(S))],!1!==k&&m["grid-md-".concat(String(k))],!1!==w&&m["grid-lg-".concat(String(w))],!1!==z&&m["grid-xl-".concat(String(z))]);return a.createElement(u,(0,c.Z)({className:V,ref:t},G))})),f=(0,m.Z)((function(e){return(0,c.Z)({root:{},container:{boxSizing:"border-box",display:"flex",flexWrap:"wrap",width:"100%"},item:{boxSizing:"border-box",margin:"0"},zeroMinWidth:{minWidth:0},"direction-xs-column":{flexDirection:"column"},"direction-xs-column-reverse":{flexDirection:"column-reverse"},"direction-xs-row-reverse":{flexDirection:"row-reverse"},"wrap-xs-nowrap":{flexWrap:"nowrap"},"wrap-xs-wrap-reverse":{flexWrap:"wrap-reverse"},"align-items-xs-center":{alignItems:"center"},"align-items-xs-flex-start":{alignItems:"flex-start"},"align-items-xs-flex-end":{alignItems:"flex-end"},"align-items-xs-baseline":{alignItems:"baseline"},"align-content-xs-center":{alignContent:"center"},"align-content-xs-flex-start":{alignContent:"flex-start"},"align-content-xs-flex-end":{alignContent:"flex-end"},"align-content-xs-space-between":{alignContent:"space-between"},"align-content-xs-space-around":{alignContent:"space-around"},"justify-xs-center":{justifyContent:"center"},"justify-xs-flex-end":{justifyContent:"flex-end"},"justify-xs-space-between":{justifyContent:"space-between"},"justify-xs-space-around":{justifyContent:"space-around"},"justify-xs-space-evenly":{justifyContent:"space-evenly"}},function(e,t){var n={};return d.forEach((function(a){var i=e.spacing(a);0!==i&&(n["spacing-".concat(t,"-").concat(a)]={margin:"-".concat(u(i,2)),width:"calc(100% + ".concat(u(i),")"),"& > $item":{padding:u(i,2)}})})),n}(e,"xs"),e.breakpoints.keys.reduce((function(t,n){return function(e,t,n){var a={};g.forEach((function(e){var t="grid-".concat(n,"-").concat(e);if(!0!==e)if("auto"!==e){var i="".concat(Math.round(e/12*1e8)/1e6,"%");a[t]={flexBasis:i,flexGrow:0,maxWidth:i}}else a[t]={flexBasis:"auto",flexGrow:0,maxWidth:"none"};else a[t]={flexBasis:0,flexGrow:1,maxWidth:"100%"}})),"xs"===n?(0,c.Z)(e,a):e[t.breakpoints.up(n)]=a}(t,e,n),t}),{}))}),{name:"MuiGrid"})(p),x=n(2846),v=n(3729),h=n(4685),b=n(4415),E=n(7519),Z=n(5411),y=n(3990),w=n(6157),N=n(2248),k=n(6159),C=n(5374),S=n(9159),j=n(7605),I=(0,r.Z)((function(e){return{container:{position:"relative",textAlign:"center"},divider:{margin:e.spacing(0,5)},title:{paddingBottom:e.spacing(2)},label:{fontWeight:"bold",textAlign:"right"},value:{textAlign:"left"},table:{marginTop:e.spacing(2),marginBottom:e.spacing(2)},extra:{position:"absolute",top:e.spacing(0),right:e.spacing(3)}}}));function M(e){var t=I(),n=e.data,r=n.site,l=n.allFile,c=l&&l.nodes,o=a.useContext(y.Z),m=o.currentResidents,d=o.pastResidents,g=o.session,u=(0,Z.Z)().allVillagers,p=e.pageContext&&e.pageContext.villagerId,M=u.find((function(e){return e.id===p})),W=c&&l.nodes.find((function(e){return e.name===M.id})).publicURL||M.icon,R=!!m.find((function(e){return e.villager.id===M.id})),z=!!d.find((function(e){return e.villager.id===M.id})),L=!!g.sightings.find((function(e){return e.villager.id===M.id&&"campsite"===e.type})),B=g.sightings.filter((function(e){return e.villager.id===M.id}));return M?a.createElement(w.Z,{title:M.name},a.createElement(N.Z,{title:M.name,pathname:e.location.pathname,meta:[{name:"og:image",content:""+r.siteMetadata.siteUrl+W}]}),a.createElement("div",{className:t.container},a.createElement("img",{src:W,alt:"Portrait of "+M.name}),a.createElement(s.Z,{className:t.title,variant:"h3"},M.name),a.createElement(x.Z,{className:t.divider}),a.createElement(f,{container:!0,justify:"center",alignItems:"center",spacing:2,className:t.table},a.createElement(f,{item:!0,xs:12},a.createElement("a",{href:"https://nookipedia.com/wiki/"+M.name,target:"_blank",rel:"noopener noreferrer"},"View "+M.name+" on Nookipedia")),a.createElement(f,{item:!0,xs:6,className:t.label},"Species:"),a.createElement(f,{item:!0,xs:6,className:t.value},M.species),a.createElement(f,{item:!0,xs:6,className:t.label},"Personality:"),a.createElement(f,{item:!0,xs:6,className:t.value},M.personality),a.createElement(f,{item:!0,xs:6,className:t.label},"Gender:"),a.createElement(f,{item:!0,xs:6,className:t.value},M.gender)),a.createElement("div",{className:t.extra},L?a.createElement(h.ZP,{arrow:!0,title:M.name+" has visited your campsite",placement:"bottom"},a.createElement(v.Z,{variant:"contained",component:i.Link,to:"/data/campsite/tracked/","aria-label":"go to campsite tracked page"},a.createElement(j.Z,null))):"",R?a.createElement(h.ZP,{arrow:!0,title:M.name+" is currently a resident on your island",placement:"bottom"},a.createElement(v.Z,{variant:"contained",component:i.Link,to:"/residents/","aria-label":"go to residents page"},a.createElement(S.Z,null))):z?a.createElement(h.ZP,{arrow:!0,title:M.name+" was previously a resident on your island",placement:"bottom"},a.createElement(v.Z,{variant:"contained",component:i.Link,to:"/residents/","aria-label":"go to residents page"},a.createElement(C.Z,null))):""),a.createElement(f,{container:!0,justify:"center",alignItems:"center",spacing:2,className:t.table},a.createElement(f,{item:!0,xs:12},a.createElement(s.Z,{variant:"h5"},"Campsite")),a.createElement(f,{item:!0,xs:6,className:t.label},"Your Encounter Rate:"),a.createElement(f,{item:!0,xs:6,className:t.value},(0,E.T)((0,b.mP)(M,m,d,g.sightings))),a.createElement(f,{item:!0,xs:6,className:t.label},"Base Encounter Rate:"),a.createElement(f,{item:!0,xs:6,className:t.value},(0,E.T)(M.baseCampsiteChance))),a.createElement(f,{container:!0,justify:"center",alignItems:"center",spacing:2,className:t.table},a.createElement(f,{item:!0,xs:12},a.createElement(s.Z,{variant:"h5"},"Mystery Islands")),a.createElement(f,{item:!0,xs:6,className:t.label},"Your Encounter Rate:"),a.createElement(f,{item:!0,xs:6,className:t.value},(0,E.T)((0,b.e8)(M,m))),a.createElement(f,{item:!0,xs:6,className:t.label},"Base Encounter Rate:"),a.createElement(f,{item:!0,xs:6,className:t.value},(0,E.T)(M.baseIslandChance))),a.createElement(s.Z,{variant:"h5"},"Recent Encounters"),a.createElement(k.Z,{sightings:B}))):"404"}}}]);
//# sourceMappingURL=component---src-components-villager-details-page-js-9c87a7a4adf8560825df.js.map