const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");t.addEventListener("click",(function(){d=setInterval((()=>{const t=`#${Math.floor(16777215*Math.random()).toString(16)}`;document.body.style.backgroundColor=t}),1e3),t.setAttribute("disabled",!0),e.disabled=!1})),e.addEventListener("click",(function(){clearInterval(d),e.setAttribute("disabled",!0),t.disabled=!1}));let d=null;
//# sourceMappingURL=01-color-switcher.d9fe2885.js.map
