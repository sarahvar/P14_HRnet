import{j as e,r as p,L}from"./index-C_M-bbxH.js";import{P as s}from"./index-GW6P57JY.js";const f=()=>`_${crypto.getRandomValues(new Uint32Array(1))[0].toString(36)}`,g=t=>t?t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim():"";function R({value:t,handleChange:r}){return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"table-utils-1",children:[e.jsx("label",{htmlFor:"choose-entries",children:"Show: "}),e.jsxs("select",{name:"choose-entries",id:"choose-entries",value:t,onChange:l=>r(l),children:[e.jsx("option",{value:"5",children:"5"}),e.jsx("option",{value:"10",children:"10"}),e.jsx("option",{value:"25",children:"25"}),e.jsx("option",{value:"50",children:"50"}),e.jsx("option",{value:"100",children:"100"})]}),e.jsx("span",{children:" entries"})]})})}R.propTypes={value:s.number.isRequired,handleChange:s.func.isRequired};function q({data:t,handleDisplayedData:r,handleIsSearching:l}){const a=o=>{const n=g(o.target.value);if(n.length>0){const u=t.filter(i=>Object.values(i).map(c=>g(c)).join(" ").includes(n));r(u),l(!0)}else r(t),l(!1)};return e.jsxs("div",{className:"table-utils-2",children:[e.jsx("label",{htmlFor:"dtb-search",children:"Search: "}),e.jsx("input",{type:"search",id:"dtb-search",name:"dtb-search",onChange:o=>a(o)})]})}q.propTypes={data:s.array.isRequired,handleDisplayedData:s.func.isRequired,handleIsSearching:s.func.isRequired};function w({labels:t,data:r,minRows:l,maxRows:a,handleSort:o,sort:n,sortedData:u}){const{column:i,isDesc:h}=n;return e.jsxs("table",{className:"table-main",children:[e.jsx("caption",{className:"table-title",children:"Current Employees"}),e.jsx("thead",{children:e.jsx("tr",{className:"table-header-row",children:t.map(c=>e.jsx("th",{className:"table-header-cells",onClick:()=>o(c.value),children:e.jsxs("div",{className:"table-header-cell",children:[e.jsx("span",{children:c.text}),e.jsxs("div",{className:"sort-icons",children:[e.jsx("div",{className:i===c.value?h?"sort-icons-up icon-up-inactive":"sort-icons-up icon-up-active":"sort-icons-up"}),e.jsx("div",{className:i===c.value?h?"sort-icons-down icon-down-active":"sort-icons-down icon-inactive":"sort-icons-down"})]})]})},f()))})}),e.jsxs("tbody",{children:[u.length===0&&e.jsx("tr",{children:e.jsx("td",{className:"nodata",colSpan:t.length,children:"No data available in table"})}),r.map((c,b)=>b+1>=l&&b<a?e.jsx("tr",{className:"dtb-table-row",children:Object.values(c).map((m,x)=>e.jsx("td",{className:x===0?"dtb-table-cell first-cell":"dtb-table-cell",children:m},f()))},f()):null)]})]})}w.propTypes={labels:s.array.isRequired,data:s.array.isRequired,sortedData:s.array.isRequired,sort:s.object.isRequired,minRows:s.number.isRequired,maxRows:s.number.isRequired,handleSort:s.func.isRequired};function D({minRows:t,maxRows:r,totalEntries:l,isSearching:a,minFilteredShow:o,maxFilteredShow:n,totalEntriesShow:u}){return e.jsx("div",{className:"table-footer",children:l===0?e.jsx("p",{className:"table-footer-p"}):[a?e.jsx("span",{className:"table-footer-p",children:`Showing ${o} to ${n} of ${u} entries (filtered from ${l} total entries)`},"entries-filtered"):e.jsx("span",{className:"table-footer-p",children:`Showing ${t} to ${r} of ${l} entries`},"entries")]})}D.propTypes={minRows:s.number.isRequired,maxRows:s.number.isRequired,totalEntries:s.number.isRequired,minFilteredShow:s.number.isRequired,maxFilteredShow:s.number.isRequired,totalEntriesShow:s.number.isRequired,isSearching:s.bool};function C({currentPage:t,totalEntries:r,displayedEntries:l,handleClick:a}){const o=Math.ceil(r/l),n=new Array(o).fill(0),u=()=>{t>1&&a(t-1)},i=()=>{t<o&&a(t+1)};return e.jsxs("div",{className:"pagination",children:[e.jsx("button",{type:"button",onClick:u,className:t===1?"number number-disabled":"number",children:"Previous"}),n.map((h,c)=>e.jsx("button",{type:"button",onClick:()=>a(c+1),className:t===c+1?"number number-active":"number",children:c+1},f())),e.jsx("button",{type:"button",onClick:i,className:t===o||r===0?"number number-disabled":"number",children:"Next"})]})}C.propTypes={currentPage:s.number.isRequired,totalEntries:s.number.isRequired,displayedEntries:s.number.isRequired,handleClick:s.func.isRequired};function T({labels:t,data:r}){const l=r,[a,o]=p.useState(1),[n,u]=p.useState(10),[i,h]=p.useState(l),[c,b]=p.useState(!1),[m,x]=p.useState({column:"",isDesc:!0}),y=a===1?1:(a-1)*n+1,N=a*n<r.length?a*n:r.length,E=a===1?i.length>0?1:0:(a-1)*n+1,P=a*n<i.length?a*n:i.length,F=d=>{u(parseInt(d.target.value)),o(1)},$=d=>{m.column===d?x({...m,isDesc:!m.isDesc}):x({column:d,isDesc:!1});const S=k(d);h(S)},k=d=>i.sort((I,A)=>{const j=g(I[d]),v=g(A[d]);if(m.isDesc){if(j<v)return-1;if(j>v)return 1}else{if(j<v)return 1;if(j>v)return-1}return 0});return e.jsxs("div",{className:"MyTable",children:[e.jsxs("div",{className:"table-utils",children:[e.jsx(R,{value:n,handleChange:F}),e.jsx(q,{data:r,handleDisplayedData:h,handleIsSearching:b})]}),e.jsx(w,{labels:t,data:i,minRows:y,maxRows:N,handleSort:$,sort:m,sortedData:i}),e.jsxs("div",{className:"table-footer",children:[e.jsx(D,{minRows:y,maxRows:N,totalEntries:r.length,isSearching:c,minFilteredShow:E,maxFilteredShow:P,totalEntriesShow:i.length}),e.jsx(C,{totalEntries:i.length,displayedEntries:n,handleClick:o,currentPage:a})]})]})}T.propTypes={labels:s.array.isRequired,data:s.array.isRequired};const z=[{text:"First Name",value:"firstName"},{text:"Last Name",value:"lastName"},{text:"Start Date",value:"startDate"},{text:"Department",value:"department"},{text:"Date of birth",value:"birthDate"},{text:"Street",value:"street"},{text:"City",value:"city"},{text:"State",value:"State"},{text:"Zip Code",value:"zipCode"}],M=z;function H(){const t=JSON.parse(localStorage.getItem("employees"));return e.jsxs("div",{className:"employees",children:[e.jsx("div",{className:"table",children:e.jsx(T,{labels:M,data:t})}),e.jsx("div",{className:"employees-link",children:e.jsx(L,{to:"/",children:" ↩ Home"})})]})}export{H as default};
