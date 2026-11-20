(function(){
var grid=document.getElementById('tools-grid'),tabs=document.getElementById('tools-tabs');if(!grid)return;
var T=[],k='Todas';
function render(){
 var kinds=['Todas'].concat(T.map(function(t){return t.kind}).filter(function(c,i,a){return a.indexOf(c)===i}));
 tabs.innerHTML=kinds.map(function(c){return '<button class="tab" aria-pressed="'+(c===k)+'" data-k="'+c+'">'+(c==='Todas'?c:c+'s')+'</button>'}).join('');
 grid.innerHTML=T.filter(function(t){return k==='Todas'||t.kind===k}).map(function(t,i){
  return '<a class="tool" href="'+t.url+'" target="_blank" rel="noopener" style="animation-delay:'+(i*50)+'ms"><div class="top"><span class="kind">'+t.kind+'</span><span class="repo">'+t.repo+'</span></div><h3>'+t.title+'</h3><p>'+t.description+'</p>'+(t.install?'<code>'+t.install+'</code>':'')+'<span class="open">abrir no GitHub ↗</span></a>'}).join('')}
tabs.addEventListener('click',function(e){var b=e.target.closest('.tab');if(b){k=b.dataset.k;render()}});
fetch('tools.json').then(function(r){return r.json()}).then(function(d){T=d;render()}).catch(function(){grid.innerHTML='<p class="mono">Não foi possível carregar as ferramentas.</p>'});
})();
