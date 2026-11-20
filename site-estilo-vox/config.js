/* ===== EDITE AQUI: links e números usados no site todo ===== */
window.SITE = {
  whatsapp: '5549988046856',            // DDI + DDD + número, só dígitos
  whatsMsg: 'Oi Jesse! Vi sua página e quero mais clientes para o meu negócio.',
  youtube: 'https://www.youtube.com/@jessewilliam1',
  instagram: 'https://instagram.com/eusoujessewilliam',
  metaPixelId: ''                        // cole aqui o ID do Pixel da Meta para medir as campanhas
};
/* ============================================================ */
(function(S){
  function wa(msg){return 'https://wa.me/'+S.whatsapp+'?text='+encodeURIComponent(msg||S.whatsMsg)}
  document.querySelectorAll('[data-wa]').forEach(function(a){a.href=wa(a.getAttribute('data-wa'));a.target='_blank';a.rel='noopener'});
  document.querySelectorAll('[data-yt]').forEach(function(a){a.href=S.youtube;a.target='_blank';a.rel='noopener'});
  document.querySelectorAll('[data-ig]').forEach(function(a){a.href=S.instagram;a.target='_blank';a.rel='noopener'});
  if(S.metaPixelId){
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init',S.metaPixelId);fbq('track','PageView');
  }
  document.addEventListener('click',function(e){
    var a=e.target.closest('[data-wa]');if(a&&window.fbq)fbq('track','Contact');
  });
})(window.SITE);
