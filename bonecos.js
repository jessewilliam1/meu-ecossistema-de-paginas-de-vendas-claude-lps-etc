/* Bonequinho 2D do Jesse: <div class="boneco" data-pose="acena|aponta|joinha|cruzado|notebook|megafone|placa" data-text="texto da placa" data-flip></div> */
(function(){
var G='#5b7d45',S='#d6966b',P='#2b3550',O='#ff6b1a';
function arm(pts){var d='M'+pts.map(function(p){return p.join(' ')}).join(' L');
 return '<path d="'+d+'" stroke="#000" stroke-width="15"/><path d="'+d+'" stroke="'+G+'" stroke-width="11"/>'}
function hand(x,y){return '<circle cx="'+x+'" cy="'+y+'" r="8" fill="'+S+'" stroke="#000" stroke-width="2"/>'}
function g(inner,cls){return '<g'+(cls?' class="'+cls+'"':'')+' stroke-linecap="round" stroke-linejoin="round" fill="none">'+inner+'</g>'}
var L_DOWN=g(arm([[46,14],[25,60],[23,102]]))+hand(23,106);
var base='<ellipse cx="70" cy="188" rx="48" ry="6" fill="rgba(0,0,0,.45)"/>';
var legs='<rect x="52" y="100" width="12" height="80" fill="'+P+'"/><rect x="76" y="100" width="12" height="80" fill="'+P+'"/><ellipse cx="56" cy="182" rx="12" ry="5" fill="#0a0a0a"/><ellipse cx="84" cy="182" rx="12" ry="5" fill="#0a0a0a"/>';
var shirt='<path d="M44 0h52q8 0 8 8v96H36V8q0-8 8-8z" fill="'+G+'"/><rect x="62" y="0" width="16" height="7" fill="#b87650"/>';
var poses={
 acena:function(){return L_DOWN+legs+shirt+'<g class="arm-wave">'+g(arm([[94,14],[118,-8],[128,-32]]))+hand(128,-36)+'</g>'},
 aponta:function(){return L_DOWN+legs+shirt+'<g class="arm-point">'+g(arm([[94,14],[124,26],[154,18]]))+'<path d="M160 16 l12 -3" stroke="#000" stroke-width="7" stroke-linecap="round"/><path d="M160 16 l12 -3" stroke="'+S+'" stroke-width="4" stroke-linecap="round"/>'+hand(158,17)+'</g>'},
 joinha:function(){return L_DOWN+legs+shirt+g(arm([[94,14],[124,40],[126,8]]))+'<rect x="122" y="-14" width="8" height="16" rx="4" fill="'+S+'" stroke="#000" stroke-width="2"/>'+hand(126,4)},
 cruzado:function(){return legs+shirt+g(arm([[94,14],[102,44],[46,46]]))+hand(44,46)+g(arm([[46,14],[38,54],[96,56]]))+hand(98,56)},
 notebook:function(){return legs+shirt+g(arm([[46,14],[36,58],[52,70]])+arm([[94,14],[104,58],[88,70]]))+
  '<rect x="30" y="40" width="80" height="44" rx="4" fill="#2b2b2b" stroke="#000" stroke-width="2.5"/><rect x="36" y="46" width="68" height="32" rx="2" fill="#151515"/><rect x="42" y="52" width="30" height="5" rx="2" fill="'+O+'"/><rect x="42" y="61" width="44" height="3" rx="1.5" fill="#555"/><rect x="42" y="67" width="36" height="3" rx="1.5" fill="#555"/><path d="M24 84h92l-6 8H30z" fill="#3a3a3a" stroke="#000" stroke-width="2.5" stroke-linejoin="round"/>'+hand(50,88)+hand(90,88)},
 megafone:function(){return L_DOWN+legs+shirt+g(arm([[94,14],[118,26],[128,6]]))+'<g class="mega"><path d="M126 -4 L162 -26 L166 22 L128 10 Z" fill="'+O+'" stroke="#000" stroke-width="2.5" stroke-linejoin="round"/><rect x="118" y="-6" width="12" height="18" rx="3" fill="#fff" stroke="#000" stroke-width="2.5"/><path d="M174 -16 l10 -6 M176 0 h12 M174 16 l10 6" stroke="'+O+'" stroke-width="3.5" stroke-linecap="round" class="waves"/></g>'+hand(128,6)},
 placa:function(){return legs+shirt+g(arm([[46,14],[28,50],[30,80]])+arm([[94,14],[112,50],[110,80]]))+hand(30,82)+hand(110,82)}
};
document.querySelectorAll('.boneco').forEach(function(el){
 if(el.dataset.ok)return;el.dataset.ok=1;
 var pose=poses[el.dataset.pose]?el.dataset.pose:'acena';
 var svg='<svg viewBox="-10 -40 200 232" overflow="visible" aria-hidden="true"'+(el.hasAttribute('data-flip')?' class="flip"':'')+'>'+base+poses[pose]()+'</svg>';
 var head='<img class="head" src="img/jesse-rosto.png" alt="'+(el.getAttribute('aria-label')||'')+'" width="300" height="401" loading="lazy" decoding="async">';
 var placa=pose==='placa'?'<span class="placa">'+(el.dataset.text||'')+'</span>':'';
 el.insertAdjacentHTML('afterbegin',head+svg+placa);
 el.classList.add('p-'+pose);
});
})();
