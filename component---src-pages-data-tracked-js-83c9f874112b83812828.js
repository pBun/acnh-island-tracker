(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"469l":function(e,a,t){"use strict";var n=t("wx14"),c=t("Ff2n"),i=t("q1tI"),r=t("iuhU"),d=t("H2TA"),l=t("5AJ6"),o=Object(l.a)(i.createElement("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");var s=i.forwardRef((function(e,a){var t=e.alt,d=e.children,l=e.classes,s=e.className,f=e.component,b=void 0===f?"div":f,u=e.imgProps,p=e.sizes,m=e.src,g=e.srcSet,h=e.variant,R=void 0===h?"circle":h,y=Object(c.a)(e,["alt","children","classes","className","component","imgProps","sizes","src","srcSet","variant"]),L=null,v=function(e){var a=e.src,t=e.srcSet,n=i.useState(!1),c=n[0],r=n[1];return i.useEffect((function(){if(a||t){r(!1);var e=!0,n=new Image;return n.src=a,n.srcSet=t,n.onload=function(){e&&r("loaded")},n.onerror=function(){e&&r("error")},function(){e=!1}}}),[a,t]),c}({src:m,srcSet:g}),U=m||g,k=U&&"error"!==v;return L=k?i.createElement("img",Object(n.a)({alt:t,src:m,srcSet:g,sizes:p,className:l.img},u)):null!=d?d:U&&t?t[0]:i.createElement(o,{className:l.fallback}),i.createElement(b,Object(n.a)({className:Object(r.a)(l.root,l.system,l[R],s,!k&&l.colorDefault),ref:a},y),L)}));a.a=Object(d.a)((function(e){return{root:{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},colorDefault:{color:e.palette.background.default,backgroundColor:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[600]},circle:{},rounded:{borderRadius:e.shape.borderRadius},square:{borderRadius:0},img:{width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4},fallback:{width:"75%",height:"75%"}}}),{name:"MuiAvatar"})(s)},V81H:function(e,a,t){"use strict";t.r(a),t.d(a,"default",(function(){return S}));t("f3/d"),t("rGqo"),t("yt8O"),t("Btvt"),t("RW0V"),t("Vd3H");var n=t("q1tI"),c=t.n(n),i=t("sWYD"),r=t("R/WZ"),d=t("eD//"),l=t("tVbE"),o=t("wx14"),s=t("Ff2n"),f=t("iuhU"),b=t("H2TA"),u=t("MquD"),p=n.forwardRef((function(e,a){var t=e.classes,c=e.className,i=Object(s.a)(e,["classes","className"]),r=n.useContext(u.a);return n.createElement("div",Object(o.a)({className:Object(f.a)(t.root,c,"flex-start"===r.alignItems&&t.alignItemsFlexStart),ref:a},i))})),m=Object(b.a)({root:{minWidth:56,flexShrink:0},alignItemsFlexStart:{marginTop:8}},{name:"MuiListItemAvatar"})(p),g=t("IsqK"),h=t("hxuT"),R=t("469l"),y=t("oPwv"),L=t("Tx5Z"),v=t("k38N");var U=t("YQnL"),k=Object(r.a)((function(e){return{list:{marginBottom:e.spacing(2)},subheader:{backgroundColor:e.palette.background.paper},avatar:{color:"#30849e",backgroundColor:"#e5f4fc",borderColor:"#aadcf6",borderWidth:1,borderStyle:"solid"}}}));function S(){var e=k(),a=c.a.useContext(L.b).session,t=function(){var e=v.data,a={};return e.allFile.edges.forEach((function(e){a[e.node.name]=e.node.publicURL})),a}(),n=a.sightings.sort((function(e,a){return a.timestamp-e.timestamp})),r=n.map((function(e){var n=e.timestamp+a.islandOffset;return{villager:Object(y.b)(e.villager),date:Object(i.a)(n,"MMM d, yyyy"),time:Object(i.a)(n,"h:mm a"),icon:t[e.villager]}})).reduce((function(e,a){return(e[a.date]=e[a.date]||[]).push(a),e}),{}),o="Tracked Villagers "+(n.length?"("+n.length+")":"");return c.a.createElement(U.a,{title:o},c.a.createElement(d.a,{className:e.list},n.length?Object.keys(r).map((function(a){return c.a.createElement(c.a.Fragment,{key:a},c.a.createElement(h.a,{className:e.subheader},a),r[a].map((function(a){return c.a.createElement(l.a,{key:a.timestamp,button:!0,component:"a",href:"https://nookipedia.com/wiki/"+a.villager.name,target:"_blank",rel:"noopener noreferrer"},c.a.createElement(m,null,c.a.createElement(R.a,{className:e.avatar,alt:a.villager.name,src:a.icon})),c.a.createElement(g.a,{primary:a.villager.name+" ("+a.villager.personality+" "+a.villager.species+")",secondary:a.time}))})))})):""))}},k38N:function(e){e.exports=JSON.parse('{"data":{"allFile":{"edges":[{"node":{"publicURL":"/static/a9afffcad17c610ea980d54485791587/Apollo.png","name":"Apollo"}},{"node":{"publicURL":"/static/8fa61e2dab2870dae9c76c365bdfef02/Annalisa.png","name":"Annalisa"}},{"node":{"publicURL":"/static/a6e54f71ff5c4560d8d3af6ee43447b1/Audie.png","name":"Audie"}},{"node":{"publicURL":"/static/c11a2e4cd467821ebd85f59b44524b8a/Ankha.png","name":"Ankha"}},{"node":{"publicURL":"/static/6ffe63e80c849f8159b4a0a0a9a9cc67/Cheri.png","name":"Cheri"}},{"node":{"publicURL":"/static/b9383fabf467c9cae33022443acf2298/Cherry.png","name":"Cherry"}},{"node":{"publicURL":"/static/7567785fa6244ca359709d223cb937f7/Chester.png","name":"Chester"}},{"node":{"publicURL":"/static/5c0d91d634336bb16fba043164830632/Bob.png","name":"Bob"}},{"node":{"publicURL":"/static/e390f06cc4d63dcc484f45e2f5ae1d9b/Cyd.png","name":"Cyd"}},{"node":{"publicURL":"/static/c7a089767e006c88730e08741e9b0a1b/Dizzy.png","name":"Dizzy"}},{"node":{"publicURL":"/static/94ab48d458efdb2e7b1d9b0336d49752/Goldie.png","name":"Goldie"}},{"node":{"publicURL":"/static/8b283008b9d4b3f63d72ef11da8779bd/Jay.png","name":"Jay"}},{"node":{"publicURL":"/static/64a7b7be6ecd9716a45c14b4ea111ea1/Kabuki.png","name":"Kabuki"}},{"node":{"publicURL":"/static/0be69ed503bd7f742b06c7d897d7e446/Julian.png","name":"Julian"}},{"node":{"publicURL":"/static/f879f356651c4e2f18f567240c4ba775/Katt.png","name":"Katt"}},{"node":{"publicURL":"/static/91ab1c58d89512f8485ae60532502eea/Kid Cat.png","name":"Kid Cat"}},{"node":{"publicURL":"/static/84d4401f19fce0ed4f18394302c54e7f/Lucky.png","name":"Lucky"}},{"node":{"publicURL":"/static/b1b77a2c649ce711251863a76c77dd59/Lolly.png","name":"Lolly"}},{"node":{"publicURL":"/static/d91d1c3df887239b0b9c88440e768825/Kiki.png","name":"Kiki"}},{"node":{"publicURL":"/static/88f2d5e32bc2088ad904da045654ae08/Marina.png","name":"Marina"}},{"node":{"publicURL":"/static/ce67d2a164c213afd3b9f3f7b86eae30/Merengue.png","name":"Merengue"}},{"node":{"publicURL":"/static/1f144187b0dcd2f7128a17c9f21d35e3/Punchy.png","name":"Punchy"}},{"node":{"publicURL":"/static/53d033edecdacc941f8a0ff08177214d/Octavian.png","name":"Octavian"}},{"node":{"publicURL":"/static/7aa5c0c935c04bacd8453da3d744ec01/Mitzi.png","name":"Mitzi"}},{"node":{"publicURL":"/static/d9064ae2266773fce884ffa87df76c3d/Sherb.png","name":"Sherb"}},{"node":{"publicURL":"/static/d3ca14195331feeeaedafae069647373/Raymond.png","name":"Raymond"}},{"node":{"publicURL":"/static/eedc7aeea6743498f3d3b050f92da271/Snake.png","name":"Snake"}},{"node":{"publicURL":"/static/0601cbdb607304b10dd234e0fb2f3497/Rosie.png","name":"Rosie"}},{"node":{"publicURL":"/static/875031f4f1ca7cfc8ca8da784a49a9be/Stitches.png","name":"Stitches"}},{"node":{"publicURL":"/static/007c7ee3b7a259903f03cb290fd630ee/Sterling.png","name":"Sterling"}},{"node":{"publicURL":"/static/046fae540782d4d8f27ca6a5430605cc/Stinky.png","name":"Stinky"}},{"node":{"publicURL":"/static/8ea14b705eca16340f49e5ea6e3f9381/Tangy.png","name":"Tangy"}},{"node":{"publicURL":"/static/1c6587ac4f7f667a4f8802dbd63837d4/Zucker.png","name":"Zucker"}},{"node":{"publicURL":"/static/83aa822904c974c646d08a55a1a3f6cf/Villager.png","name":"Villager"}},{"node":{"publicURL":"/static/aefd45abfa274373bd39eabf240c8bc0/Yuka.png","name":"Yuka"}}]}}}')},oPwv:function(e,a,t){"use strict";t.d(a,"a",(function(){return c})),t.d(a,"b",(function(){return i}));t("f3/d"),t("dRSK");var n=t("y0Xr"),c=n&&n.feed&&n.feed.entry&&n.feed.entry.map((function(e){return{name:e.gsx$villager.$t,species:e.gsx$species.$t,gender:e.gsx$gender.$t,personality:e.gsx$personality.$t}}));function i(e){return c&&c.find((function(a){return a.name===e}))}}}]);
//# sourceMappingURL=component---src-pages-data-tracked-js-83c9f874112b83812828.js.map