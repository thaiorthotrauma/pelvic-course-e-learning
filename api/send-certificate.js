export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, name, date, lessonCount } = req.body || {};
  if (!email || !name) return res.status(400).json({ error: 'Missing fields' });

  const html = `<html><body style="margin:0;padding:0;background:#f0f4ff;font-family:sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:32px 16px;">
<div style="background:linear-gradient(135deg,#0d1b3e,#1e3063);border-radius:12px 12px 0 0;padding:36px 32px;text-align:center;">
<div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#93c5fd;margin-bottom:8px;">4TH TOTS INTERNATIONAL PELVIC COURSE</div>
<h1 style="font-size:26px;color:#fff;margin:0;font-weight:800;">Certificate of Completion</h1></div>
<div style="height:4px;background:linear-gradient(90deg,#f59e0b,#fbbf24);"></div>
<div style="background:#fff;border-radius:0 0 12px 12px;padding:40px 32px;text-align:center;">
<p style="font-size:13px;color:#6b7fa8;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px;">This certifies that</p>
<p style="font-size:30px;font-weight:800;color:#0d1b3e;margin:0 0 6px;">${name}</p>
<p style="font-size:14px;color:#6b7fa8;margin:0 0 28px;">has successfully completed all pre-course e-learning lessons</p>
<table style="width:100%;border-collapse:collapse;text-align:center;background:#f0f4ff;border-radius:10px;margin-bottom:28px;"><tr>
<td style="padding:16px;"><div style="font-size:28px;font-weight:800;color:#22c55e;">${lessonCount}</div><div style="font-size:11px;color:#6b7fa8;text-transform:uppercase;">Lessons</div></td>
<td style="padding:16px;"><div style="font-size:28px;font-weight:800;color:#22c55e;">100%</div><div style="font-size:11px;color:#6b7fa8;text-transform:uppercase;">Complete</div></td>
<td style="padding:16px;"><div style="font-size:28px;font-weight:800;color:#2563eb;">&#10003;</div><div style="font-size:11px;color:#6b7fa8;text-transform:uppercase;">Verified</div></td>
</tr></table>
<p style="font-size:13px;color:#6b7fa8;margin:0;">Date of completion: <strong style="color:#0d1b3e;">${date}</strong></p>
<hr style="border:none;border-top:1px solid #dde4f0;margin:24px 0"/>
<p style="font-size:11px;color:#9caec7;">4th TOTS International Pelvic Course &middot; Pre-course e-learning</p>
</div></div></body></html>`;

  const r = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': process.env.BREVO_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: 'TOTS Pelvic Course', email: 'pong.poti@gmail.com' },
      to: [{ email }],
      subject: 'Certificate of Completion : 4th TOTS International Pelvic Course',
      htmlContent: html,
    }),
  });

  if (!r.ok) {
    const err = await r.json().catch(() => ({}));
    return res.status(500).json({ error: err.message || JSON.stringify(err) });
  }

  res.status(200).json({ ok: true });
}
