(self.webpackChunkacnh_island_tracker=self.webpackChunkacnh_island_tracker||[]).push([[126],{9232:function(e,a,t){"use strict";t.r(a),t.d(a,{default:function(){return C}});var n=t(7294),l=t(920),r=t(9355),i=t(3792),c=t(9358),o=t(791),s=t(6799),u=t(7681),p=t(3729),m=t(4125),g=t(4711),d=t(8558),f=t(702),h=t(4969),b=t(5411),Z=t(2146),E=t(6157),P=t(2248),k=(0,l.Z)((function(e){return{list:{marginBottom:e.spacing(2)},subheader:{backgroundColor:e.palette.background.paper},customPagination:{flexShrink:0,marginLeft:e.spacing(2.5)},controlsWrapper:{margin:e.spacing(2,5,1),position:"relative"},formControl:{width:"100%",margin:0,"& .MuiInputLabel-outlined":{transform:"translate(48px, 20px) scale(1)"},"& .MuiInputLabel-outlined.MuiInputLabel-shrink":{transform:"translate(14px, -6px) scale(0.75)"}},searchInput:{paddingLeft:e.spacing(6)},searchIcon:{position:"absolute",left:e.spacing(2),top:"50%",transform:"translateY(-50%)",color:e.palette.text.hint},pagination:{"& .MuiTablePagination-toolbar":{padding:0}}}}));function v(e){var a=k(),t=(0,r.Z)(),l=e.count,i=e.page,c=e.rowsPerPage,o=e.onPageChange;return n.createElement("div",{className:a.customPagination},n.createElement(p.Z,{onClick:function(e){o(e,0)},disabled:0===i,"aria-label":"first page"},"rtl"===t.direction?n.createElement(f.Z,null):n.createElement(m.Z,null)),n.createElement(p.Z,{onClick:function(e){o(e,i-1)},disabled:0===i,"aria-label":"previous page"},"rtl"===t.direction?n.createElement(d.Z,null):n.createElement(g.Z,null)),n.createElement(p.Z,{onClick:function(e){o(e,i+1)},disabled:i>=Math.ceil(l/c)-1,"aria-label":"next page"},"rtl"===t.direction?n.createElement(g.Z,null):n.createElement(d.Z,null)),n.createElement(p.Z,{onClick:function(e){o(e,Math.max(0,Math.ceil(l/c)-1))},disabled:i>=Math.ceil(l/c)-1,"aria-label":"last page"},"rtl"===t.direction?n.createElement(m.Z,null):n.createElement(f.Z,null)))}function C(e){var a=[10,25,50,{label:"All",value:-1}],t=k(),l=(0,b.Z)().allVillagers,r=n.useState(0),p=r[0],m=r[1],g=n.useState(a[0]),d=g[0],f=g[1],C=n.useState(""),M=C[0],w=C[1],x=n.useMemo((function(){return(0,c.Lu)(l,M,{keys:["name","species","personality",function(e){return e.personality+" "+e.species},function(e){return e.species+" "+e.personality},"gender"]})}),[l,M]),I=n.useMemo((function(){return(0,i.D)(250,(function(e){m(0),w(e)}))}),[m,w]),N=Math.max(p*d,0),y=N+(d>=0?d:x.length),L=x.slice(N,y),S="Browse Villagers",_=S+" ("+x.length+")";return n.createElement(E.Z,{title:_},n.createElement(P.Z,{title:S,pathname:e.location.pathname}),n.createElement("div",{className:t.controlsWrapper},n.createElement(s.Z,{className:t.formControl,fullWidth:!0,id:"villager-search",label:"Name, species, personality",type:"search",variant:"outlined",inputProps:{className:t.searchInput},onChange:function(e){return I(e.target.value)}}),n.createElement(h.Z,{className:t.searchIcon})),n.createElement(o.Z,{className:t.list},L.map((function(e){return n.createElement(Z.Z,{key:e.id,villager:e})}))),n.createElement(u.Z,{className:t.pagination,component:"div",rowsPerPageOptions:a,count:x.length,rowsPerPage:d,page:p,SelectProps:{inputProps:{"aria-label":"villagers per page"},native:!0},onPageChange:function(e,a){m(a)},onRowsPerPageChange:function(e){f(parseInt(e.target.value,10)),m(0)},labelRowsPerPage:"",ActionsComponent:v}))}}}]);
//# sourceMappingURL=component---src-pages-villagers-js-f3fdef394c7d01f68cab.js.map