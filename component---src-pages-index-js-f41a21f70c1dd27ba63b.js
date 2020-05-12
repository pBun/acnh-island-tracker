(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{IsqK:function(e,a,t){"use strict";var n=t("wx14"),o=t("Ff2n"),r=t("q1tI"),i=t("iuhU"),s=t("H2TA"),c=t("ofer"),l=t("MquD"),d=r.forwardRef((function(e,a){var t=e.children,s=e.classes,d=e.className,m=e.disableTypography,u=void 0!==m&&m,p=e.inset,g=void 0!==p&&p,y=e.primary,b=e.primaryTypographyProps,f=e.secondary,v=e.secondaryTypographyProps,h=Object(o.a)(e,["children","classes","className","disableTypography","inset","primary","primaryTypographyProps","secondary","secondaryTypographyProps"]),E=r.useContext(l.a).dense,k=null!=y?y:t;null==k||k.type===c.a||u||(k=r.createElement(c.a,Object(n.a)({variant:E?"body2":"body1",className:s.primary,component:"span",display:"block"},b),k));var N=f;return null==N||N.type===c.a||u||(N=r.createElement(c.a,Object(n.a)({variant:"body2",className:s.secondary,color:"textSecondary",display:"block"},v),N)),r.createElement("div",Object(n.a)({className:Object(i.a)(s.root,d,E&&s.dense,g&&s.inset,k&&N&&s.multiline),ref:a},h),k,N)}));a.a=Object(s.a)({root:{flex:"1 1 auto",minWidth:0,marginTop:4,marginBottom:4},multiline:{marginTop:6,marginBottom:6},dense:{},inset:{paddingLeft:56},primary:{},secondary:{}},{name:"MuiListItemText"})(d)},Qik0:function(e){e.exports=JSON.parse('{"data":{"site":{"siteMetadata":{"title":"Dodo Tracker","author":"@peebun"}}}}')},RXBc:function(e,a,t){"use strict";t.r(a),t.d(a,"default",(function(){return h}));var n=t("Qik0"),o=t("q1tI"),r=t.n(o),i=t("R/WZ"),s=t("ofer"),c=t("eD//"),l=t("tVbE"),d=t("IsqK"),m=t("eHoR"),u=t.n(m),p=t("Rme4"),g=t.n(p),y=t("T5a2"),b=t.n(y),f=t("uVCN"),v=Object(i.a)((function(e){return{intro:{margin:e.spacing(2,5,2)},listTitle:{margin:e.spacing(3,5,0)},list:{paddingBottom:e.spacing(3)},inlineIcon:{verticalAlign:"middle",backgroundColor:e.palette.primary.main,color:e.palette.primary.contrastText,borderRadius:"1em",padding:"0.2em"},inlinePrimaryIcon:{verticalAlign:"middle",backgroundColor:e.palette.secondary.main,color:e.palette.secondary.contrastText,borderRadius:"1em",padding:"0.2em"}}}));function h(){var e=v(),a=n.data.site;return r.a.createElement(f.a,{title:a.siteMetadata.title},r.a.createElement(s.a,{variant:"body1",component:"p",className:e.intro},"Hi! Dodo Tracker is a tool for tracking and analyzing villager spawn rates at the campsite and on mystery islands for the game Animal Crossing: New Horizons."),r.a.createElement(s.a,{variant:"body1",component:"p",className:e.intro},"There have been a ton of learnings about spawn rates recently and I encourage you to dig into ",r.a.createElement("a",{href:"https://docs.google.com/document/d/1c8rsKWWtwsOo_JOxwO-lVRx2MUhc-bcdZg1mhXgtRPg/edit",target:"_blank",rel:"noopener noreferrer"},"drjay's doc on campsites")," ","and/or"," ",r.a.createElement("a",{href:"https://docs.google.com/document/d/16yHQzdYx4VznhnKSGZdtaKi_Yo8NpDwCYK8dmpR481s/edit",target:"_blank",rel:"noopener noreferrer"},"ctar17's doc on mystery islands")," for details. I will be adding a calculator soon with estimated likelihoods of an encoutering each villager based on your sighting and resident data. Until then I encourage you to continue tracking those villagers!"),r.a.createElement(s.a,{variant:"h6",component:"h2",className:e.listTitle},"Getting started"),r.a.createElement(c.a,{component:"div",dense:!0,className:e.list},r.a.createElement(l.a,null,r.a.createElement(d.a,{primary:"1. Add your current island residents",secondary:r.a.createElement(r.a.Fragment,null,"By clicking ",r.a.createElement(g.a,{className:e.inlineIcon})," (My Island Residents).")})),r.a.createElement(l.a,null,r.a.createElement(d.a,{primary:"2. Track each villager you see at the campsite or on mystery islands",secondary:r.a.createElement(r.a.Fragment,null,"By clicking ",r.a.createElement(u.a,{className:e.inlinePrimaryIcon})," ","(Track Villager).")})),r.a.createElement(l.a,null,r.a.createElement(d.a,{primary:"3. Analyze your data",secondary:r.a.createElement(r.a.Fragment,null,"By clicking ",r.a.createElement(b.a,{className:e.inlineIcon})," (My Data).")}))))}},tVbE:function(e,a,t){"use strict";var n=t("wx14"),o=t("Ff2n"),r=t("q1tI"),i=t("iuhU"),s=t("H2TA"),c=t("VD++"),l=t("ucBr"),d=t("bfFb"),m=t("MquD"),u=t("i8i4"),p="undefined"==typeof window?r.useEffect:r.useLayoutEffect,g=r.forwardRef((function(e,a){var t=e.alignItems,s=void 0===t?"center":t,g=e.autoFocus,y=void 0!==g&&g,b=e.button,f=void 0!==b&&b,v=e.children,h=e.classes,E=e.className,k=e.component,N=e.ContainerComponent,x=void 0===N?"li":N,C=e.ContainerProps,I=(C=void 0===C?{}:C).className,O=Object(o.a)(C,["className"]),T=e.dense,w=void 0!==T&&T,j=e.disabled,R=void 0!==j&&j,V=e.disableGutters,A=void 0!==V&&V,B=e.divider,D=void 0!==B&&B,P=e.focusVisibleClassName,F=e.selected,M=void 0!==F&&F,q=Object(o.a)(e,["alignItems","autoFocus","button","children","classes","className","component","ContainerComponent","ContainerProps","dense","disabled","disableGutters","divider","focusVisibleClassName","selected"]),S=r.useContext(m.a),z={dense:w||S.dense||!1,alignItems:s},H=r.useRef(null);p((function(){y&&H.current&&H.current.focus()}),[y]);var K=r.Children.toArray(v),L=K.length&&Object(l.a)(K[K.length-1],["ListItemSecondaryAction"]),G=r.useCallback((function(e){H.current=u.findDOMNode(e)}),[]),J=Object(d.a)(G,a),U=Object(n.a)({className:Object(i.a)(h.root,E,z.dense&&h.dense,!A&&h.gutters,D&&h.divider,R&&h.disabled,f&&h.button,"center"!==s&&h.alignItemsFlexStart,L&&h.secondaryAction,M&&h.selected),disabled:R},q),W=k||"li";return f&&(U.component=k||"div",U.focusVisibleClassName=Object(i.a)(h.focusVisible,P),W=c.a),L?(W=U.component||k?W:"div","li"===x&&("li"===W?W="div":"li"===U.component&&(U.component="div")),r.createElement(m.a.Provider,{value:z},r.createElement(x,Object(n.a)({className:Object(i.a)(h.container,I),ref:J},O),r.createElement(W,U,K),K.pop()))):r.createElement(m.a.Provider,{value:z},r.createElement(W,Object(n.a)({ref:J},U),K))}));a.a=Object(s.a)((function(e){return{root:{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",width:"100%",boxSizing:"border-box",textAlign:"left",paddingTop:8,paddingBottom:8,"&$focusVisible":{backgroundColor:e.palette.action.selected},"&$selected, &$selected:hover":{backgroundColor:e.palette.action.selected},"&$disabled":{opacity:.5}},container:{position:"relative"},focusVisible:{},dense:{paddingTop:4,paddingBottom:4},alignItemsFlexStart:{alignItems:"flex-start"},disabled:{},divider:{borderBottom:"1px solid ".concat(e.palette.divider),backgroundClip:"padding-box"},gutters:{paddingLeft:16,paddingRight:16},button:{transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:e.palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}}},secondaryAction:{paddingRight:48},selected:{}}}),{name:"MuiListItem"})(g)}}]);
//# sourceMappingURL=component---src-pages-index-js-f41a21f70c1dd27ba63b.js.map