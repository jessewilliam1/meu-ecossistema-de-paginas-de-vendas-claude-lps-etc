(function(){
var $=function(s){return document.querySelector(s)},M=[],cat='Todos',cur=null,dlg=$('#dlg');
var qs=new URLSearchParams(location.search);
['utm_source','utm_medium','utm_campaign','utm_content'].forEach(function(k){if(qs.get(k))try{sessionStorage.setItem(k,qs.get(k))}catch(e){}});
function utm(){var o={referrer:document.referrer};['utm_source','utm_medium','utm_campaign','utm_content'].forEach(function(k){try{o[k]=sessionStorage.getItem(k)||''}catch(e){o[k]=''}});return o}
fetch('materials.json').then(function(r){return r.json()}).then(function(d){M=d;if($('#grid'))render()}).catch(function(){if(window.MATERIALS_LOCAL){M=window.MATERIALS_LOCAL;if($('#grid'))render();return}var g=$('#grid');if(g)g.innerHTML='<p>Não foi possível carregar os materiais. Recarregue a página.</p>'});
function render(){
 var cats=['Todos'].concat(M.map(function(m){return m.category}).filter(function(c,i,a){return a.indexOf(c)===i}));
 $('#tabs').innerHTML=cats.map(function(c){return '<button class="tab" aria-pressed="'+(c===cat)+'" data-c="'+c+'">'+c+'</button>'}).join('');
 $('#grid').innerHTML=M.filter(function(m){return cat==='Todos'||m.category===cat}).map(function(m,i){var s=m.status==='soon';
  return '<article class="card'+(s?' soon':'')+'" style="animation-delay:'+(i*60)+'ms"><div class="top"><span class="mono">'+m.category+'</span><span class="fmt">'+(s?'Em breve':m.format)+'</span></div><h3>'+m.title+'</h3><p>'+m.description+'</p>'+(m.page?'<a class="btn sm" href="'+m.page+'">Acessar gratuitamente</a>':'<button class="btn sm'+(s?' ol':'')+'" data-id="'+m.id+'">'+(s?'Quero ser avisado':'Baixar material grátis')+'</button>')+'</article>'}).join('')}
if($('#tabs'))$('#tabs').addEventListener('click',function(e){var b=e.target.closest('.tab');if(b){cat=b.dataset.c;render()}});
if($('#grid'))$('#grid').addEventListener('click',function(e){var b=e.target.closest('[data-id]');if(b)open(b.dataset.id)});
function open(id){cur=M.find(function(m){return m.id===id});if(!cur)return;
 var soon=cur.status==='soon',sv={};try{sv=JSON.parse(localStorage.getItem('lead')||'{}')}catch(e){}
 $('#mt').textContent=cur.title;$('#mk').textContent=soon?'Lista de espera':'Material gratuito';
 $('#ms').textContent=soon?'Deixe seus dados e avise você quando este material sair.':'Informe seus dados para liberar o acesso.';
 $('#sb').textContent=soon?'Quero ser avisado':'Liberar meu acesso';
 $('#n').value=sv.name||'';$('#e').value=sv.email||'';$('#z').value=sv.phone||'';$('#c').checked=false;$('#er').textContent='';
 $('#fv').hidden=false;$('#ov').hidden=true;dlg.showModal()}
$('#cl').onclick=function(){dlg.close()};
dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close()});
$('#z').addEventListener('input',function(){var v=this.value.replace(/\D/g,'').slice(0,11);
 this.value=v.length>6?'('+v.slice(0,2)+') '+v.slice(2,7)+'-'+v.slice(7):v.length>2?'('+v.slice(0,2)+') '+v.slice(2):v.length?'('+v:''});
$('#f').addEventListener('submit',function(e){e.preventDefault();var er=$('#er'),b=$('#sb'),f=e.target;er.textContent='';
 var body={name:f.name.value,email:f.email.value,phone:f.phone.value,consent:$('#c').checked,website:f.website.value,materialId:cur.id,utm:utm()};
 if(body.name.trim().length<2||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(body.email)||body.phone.replace(/\D/g,'').length<10||!body.consent){er.textContent='Confira nome, e-mail, WhatsApp e marque o aceite.';return}
 b.disabled=true;var t=b.textContent;b.textContent='Enviando...';
 fetch('/api/lead',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}).then(function(r){return r.json().then(function(j){return{ok:r.ok,j:j}})}).then(function(x){
  if(!x.ok)throw new Error(x.j.error||'Erro ao enviar.');
  try{localStorage.setItem('lead',JSON.stringify({name:body.name,email:body.email,phone:body.phone}))}catch(e){}
  $('#fv').hidden=true;$('#ov').hidden=false;var a=$('#ol');
  if(x.j.url){$('#om').textContent='Seu acesso a "'+cur.title+'" foi liberado.';a.hidden=false;a.href=x.j.url}
  else{$('#om').textContent='Combinado! Avisamos você quando "'+cur.title+'" estiver disponível.';a.hidden=true}
 }).catch(function(err){er.textContent=err.message||'Erro ao enviar. Tente de novo.'}).then(function(){b.disabled=false;b.textContent=t})});
document.addEventListener('click',function(e){var b=e.target.closest('[data-open]');if(b){e.preventDefault();open(b.dataset.open)}});
})();
