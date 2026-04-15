const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  let email;
  try {
    const body = JSON.parse(event.body);
    email = body.email;
  } catch {
    return { statusCode: 400, body: JSON.stringify({ success: false, message: 'Dados inválidos.' }) };
  }

  if (!email || !email.includes('@')) {
    return { statusCode: 400, body: JSON.stringify({ success: false, message: 'E-mail inválido.' }) };
  }

  try {
    // 1. E-mail de confirmação para o usuário
    await resend.emails.send({
      from: 'tijolo <contato@mail.tijolo.app.br>',
      to: email,
      subject: 'Você está na lista — tijolo',
      html: `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head><meta charset="UTF-8"></head>
        <body style="margin:0;padding:0;background:#f7f7f7;font-family:Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="padding:48px 24px;">
            <tr><td align="center">
              <table width="100%" style="max-width:520px;background:#ffffff;border-radius:16px;border:1px solid #e5e5e5;">
                <tr><td style="padding:36px 40px 0;">
                  <p style="margin:0;font-size:22px;font-weight:500;color:#111;">tijolo</p>
                </td></tr>
                <tr><td style="padding:28px 40px 36px;">
                  <h1 style="margin:0 0 12px;font-size:24px;font-weight:400;color:#111;">Você está na lista. ✓</h1>
                  <p style="margin:0 0 20px;font-size:15px;color:#555;line-height:1.7;">
                    Obrigado pelo interesse no <strong>tijolo</strong> — a plataforma de gestão de projetos feita por arquiteto, para arquitetos.
                  </p>
                  <p style="margin:0 0 28px;font-size:15px;color:#555;line-height:1.7;">
                    Você será um dos primeiros a receber acesso quando abrirmos as portas. Fique de olho no seu e-mail.
                  </p>
                  <div style="border-top:1px solid #e5e5e5;padding-top:24px;">
                    <p style="margin:0;font-size:13px;color:#888;">
                      Acompanhe no Instagram: 
                      <a href="https://instagram.com/tijolo.app" style="color:#111;font-weight:500;text-decoration:none;">@tijolo.app</a>
                    </p>
                  </div>
                </td></tr>
                <tr><td style="padding:20px 40px;background:#f7f7f7;border-top:1px solid #e5e5e5;">
                  <p style="margin:0;font-size:12px;color:#aaa;">
                    tijolo.com.br · São Paulo, Brasil
                  </p>
                </td></tr>
              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `
    });

    // 2. Notificação interna para o Murilo
    await resend.emails.send({
      from: 'tijolo <contato@mail.tijolo.app.br>',
      to: 'contato@mail.tijolo.app.br',
      subject: `Nova entrada na waitlist: ${email}`,
      html: `<p style="font-family:Arial;font-size:15px;">Novo cadastro na waitlist do tijolo:<br><strong>${email}</strong></p>`
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true })
    };

  } catch (err) {
    console.error('Resend error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: 'Erro interno. Tente novamente.' })
    };
  }
};
