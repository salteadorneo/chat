import{S as h,i as g,s as b,F as y,e as u,k as v,G as k,c as m,d as p,m as x,a as w,b as f,H as z,g as d,I as E,J as S,K as q,q as A,o as I,L as G,v as M}from"../chunks/index-8d614d0f.js";import"../chunks/browser-3fd718e3.js";import{u as _}from"../chunks/navigation-27e09178.js";import"../chunks/singletons-4a6438bd.js";function $(s){let o,i,t,n;const l=s[1].default,e=y(l,s,s[0],null);return{c(){o=u("meta"),i=v(),t=u("main"),e&&e.c(),this.h()},l(a){const r=k('[data-svelte="svelte-18o5qeh"]',document.head);o=m(r,"META",{name:!0,content:!0}),r.forEach(p),i=x(a),t=m(a,"MAIN",{});var c=w(t);e&&e.l(c),c.forEach(p),this.h()},h(){document.title="El juego de Alice",f(o,"name","description"),f(o,"content","El juego de Alice")},m(a,r){z(document.head,o),d(a,i,r),d(a,t,r),e&&e.m(t,null),n=!0},p(a,[r]){e&&e.p&&(!n||r&1)&&E(e,l,a,a[0],n?q(l,a[0],r,null):S(a[0]),null)},i(a){n||(A(e,a),n=!0)},o(a){I(e,a),n=!1},d(a){p(o),a&&p(i),a&&p(t),e&&e.d(a)}}}function j(s,o,i){let t;G(s,_,e=>i(2,t=e));let{$$slots:n={},$$scope:l}=o;return M(()=>{const e=localStorage.user?JSON.parse(localStorage.user):{};_.set(e),!t||(t==null?void 0:t.token)==null}),s.$$set=e=>{"$$scope"in e&&i(0,l=e.$$scope)},[l,n]}class H extends h{constructor(o){super(),g(this,o,j,$,b,{})}}export{H as default};
