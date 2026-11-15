const M = require('../materials.json');
const clean = (v, n) => String(v || '').trim().slice(0, n);

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido.' });
  let b = req.body;
  try { if (typeof b === 'string') b = JSON.parse(b || '{}'); } catch { b = {}; }
  b = b || {};
  if (b.website) return res.status(200).json({ ok: true }); // honeypot (robôs)

  const name = clean(b.name, 100);
  const email = clean(b.email, 150).toLowerCase();
  const phone = String(b.phone || '').replace(/\D/g, '');
  const m = M.find((x) => x.id === b.materialId);
  const okEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  if (!m || name.length < 2 || !okEmail || phone.length < 10 || phone.length > 11 || b.consent !== true) {
    return res.status(400).json({ error: 'Confira nome, e-mail, WhatsApp e o aceite.' });
  }

  const kind = m.status === 'soon' ? 'waitlist' : 'download';
  const U = process.env.SUPABASE_URL, K = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (U && K) {
    const u = b.utm || {};
    const r = await fetch(U + '/rest/v1/rpc/register_download', {
      method: 'POST',
      headers: { apikey: K, Authorization: 'Bearer ' + K, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        p_name: name, p_email: email, p_phone: phone, p_consent: true,
        p_material_id: m.id, p_material_title: m.title, p_category: m.category, p_kind: kind,
        p_utm_source: clean(u.utm_source, 100) || null, p_utm_medium: clean(u.utm_medium, 100) || null,
        p_utm_campaign: clean(u.utm_campaign, 100) || null, p_utm_content: clean(u.utm_content, 100) || null,
        p_referrer: clean(u.referrer, 200) || null,
      }),
    });
    if (!r.ok) {
      console.error('Supabase:', r.status, await r.text());
      return res.status(500).json({ error: 'Não foi possível salvar agora. Tente de novo em instantes.' });
    }
  } else {
    console.warn('Supabase não configurado: o lead NÃO foi salvo.');
  }
  return res.status(200).json({ ok: true, kind, title: m.title, url: kind === 'download' ? m.file : null });
};
