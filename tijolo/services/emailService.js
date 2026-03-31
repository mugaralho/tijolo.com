const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const sendConfirmationEmail = async (email) => {
  try {
    const data = await resend.emails.send({
      from: 'Tijolo <contato@mail.tijolo.app.br>', // Seu domínio verificado
      to: email,
      subject: 'Solicitação de Acesso | Tijolo',
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #ffffff; padding: 60px 20px; color: #000000; line-height: 1.6;">
          <div style="max-width: 500px; margin: 0 auto; border: 1px solid #f0f0f0; padding: 40px; border-radius: 4px;">
            
            <h1 style="font-size: 22px; font-weight: 500; letter-spacing: -0.5px; margin-bottom: 30px; border-bottom: 1px solid #000; display: inline-block; padding-bottom: 5px;">
              tijolo.
            </h1>

            <p style="font-size: 16px; margin-bottom: 20px;">Olá,</p>
            
            <p style="font-size: 15px; color: #333; margin-bottom: 25px;">
              Sua solicitação para a lista de espera foi registrada com sucesso. Estamos construindo uma forma mais inteligente e rastreável de gerenciar seus projetos de arquitetura.
            </p>

            <div style="background-color: #fafafa; border-radius: 2px; padding: 20px; margin-bottom: 25px; border-left: 2px solid #000;">
              <p style="font-size: 13px; margin: 0; color: #666; text-transform: uppercase; letter-spacing: 1px;">Status da Solicitação</p>
              <p style="font-size: 16px; margin: 5px 0 0 0; font-weight: 500;">Aguardando Aprovação</p>
            </div>

            <p style="font-size: 14px; color: #888;">
              Você será notificado assim que sua conta estiver pronta para o primeiro acesso.
            </p>

            <hr style="border: 0; border-top: 1px solid #eee; margin: 40px 0;">

            <p style="font-size: 12px; color: #aaa; text-align: center;">
              © 2026 Tijolo — Rastreabilidade na ponta dos dedos.<br>
              São Paulo, Brasil.
            </p>
          </div>
        </div>
      `,
    });

    console.log('E-mail enviado para:', email, 'ID:', data.id);
    return { success: true, data };
  } catch (error) {
    console.error('Erro no envio do e-mail:', error);
    return { success: false, error };
  }
};

module.exports = { sendConfirmationEmail };