["header","footer"].forEach(name=>{
  fetch(`./partials/${name}.html`)
    .then(res=>res.text())
    .then(html=>document.getElementById(name).innerHTML=html);
});