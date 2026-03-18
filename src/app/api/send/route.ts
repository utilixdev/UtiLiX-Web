import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Extraemos los datos. Si viene del footer, solo tendremos 'websiteUrl'.
    const { 
      name, 
      email, 
      message, 
      websiteUrl, // Campo que viene del Footer
      telefono = 'No proporcionado',
      servicio = websiteUrl ? 'Auditoría de Marca & UI/UX' : 'Auditoría Visual / UI-UX', // Citado: Identificación clara del servicio
      apellidos = '', // Añadido para mantener consistencia con la función render
    } = body;

    // Lógica dinámica: Si viene del footer (websiteUrl), rellenamos los huecos por defecto
    const finalName = name || "Interesado (Footer)";
    const finalEmail = email || "info@utilix.es"; // Email por defecto si el footer no lo pide
    const finalMessage = websiteUrl ? `SOLICITUD DE ANÁLISIS WEB: ${websiteUrl}. Prioridad: Elevar autoridad digital.` : message;
    const finalWeb = websiteUrl || body.web || "";

    // Validación mínima
    if (!finalMessage) {
      return NextResponse.json({ error: 'Faltan datos (URL o mensaje)' }, { status: 400 });
    }

    // Citado: Personalizamos el asunto para que sepas qué eligió sin abrir el correo
    const subjectAdmin = websiteUrl 
      ? `AUDITORÍA SOLICITADA: ${websiteUrl.toUpperCase()}` 
      : `ADMISIÓN: ${finalName.toUpperCase()}`;

    // 1. CORREO PARA TI (ADMIN)
    await resend.emails.send({
      from: 'Utilix Intelligence <info@utilixstudio.com>',
      to: ['info@utilix.es'],
      replyTo: finalEmail,
      subject: subjectAdmin, // Usamos el asunto dinámico citado
      html: renderEmailTemplate(finalName, apellidos, finalEmail, telefono, servicio, finalWeb, finalMessage, true)
    });

    // 2. CORREO PARA EL CLIENTE (Solo si tenemos su email y no es el genérico)
    if (email && email !== "info@utilix.es") {
      await resend.emails.send({
        from: 'Utilix Studio <info@utilixstudio.com>',
        to: [email],
        subject: `Confirmación de Recepción: Protocolo Utilix`,
        html: renderEmailTemplate(finalName, apellidos, email, telefono, servicio, finalWeb, finalMessage, false)
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error en Resend:", err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Mantenemos tu función renderEmailTemplate igual que la tienes...
function renderEmailTemplate(nombre: any, apellidos: any, email: any, telefono: any, servicio: any, web: any, mensaje: any, isAdmin: boolean) {
    const titulo = isAdmin ? "Protocolo de Admisión" : "Confirmación de Recepción";
    const sublinea = isAdmin ? "Utilix.es // Digital Authority" : "Su solicitud ha sido registrada correctamente.";
    
    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="color-scheme" content="dark">
      </head>
      <body style="margin: 0; padding: 0; background-color: #000000; color: #ffffff; font-family: Helvetica, Arial, sans-serif;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #1c1c1c;">
          <tr>
            <td align="center" style="padding: 60px 20px;">
              <table role="presentation" width="100%" style="max-width: 500px; background-color: #050505; border: 1px solid #1a1a1a; margin: 0 auto;">
                <tr>
                  <td style="padding: 50px 40px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="border-bottom: 1px solid #1a1a1a; padding-bottom: 25px;">
                          <p style="margin: 0; font-family: 'Times New Roman', serif; font-size: 26px; font-style: italic; color: #ffffff; letter-spacing: -0.5px;">
                            ${titulo}
                          </p>
                          <p style="margin: 8px 0 0 0; font-size: 9px; text-transform: uppercase; letter-spacing: 5px; color: #c98628;">
                            ${sublinea}
                          </p>
                        </td>
                      </tr>
                    </table>
  
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top: 40px;">
                      <tr>
                        <td style="font-size: 13px; line-height: 1.6; color: #ffffff;">
                          ${isAdmin ? `
                            <div style="margin-bottom: 30px;">
                              <p style="margin: 0; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #c98628;">Solicitante</p>
                              <p style="margin: 4px 0 0 0; font-family: 'Times New Roman', serif; font-size: 18px; font-style: italic;">${nombre} ${apellidos}</p>
                            </div>
                          ` : `
                            <p style="color: #ffffff; font-size: 15px; font-family: 'Times New Roman', serif; font-style: italic; margin-bottom: 20px;">
                              Estimado/a ${nombre},
                            </p>
                            <p style="color: #cccccc; margin-bottom: 30px;">
                              Hemos recibido su solicitud. Nuestro equipo de analistas revisará la viabilidad del proyecto y se pondrá en contacto con usted en un plazo máximo de 48 horas.
                            </p>
                          `}
  
                          <div style="margin-bottom: 20px; padding: 25px; background-color: #080808; border: 1px solid #111;">
                            <p style="margin: 0 0 10px 0; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #c98628;">Servicio Seleccionado</p>
                            <p style="margin: 0; color: #ffffff; font-style: italic;">"${servicio}"</p>
                            <p style="margin: 15px 0 10px 0; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #c98628;">Mensaje del Sistema</p>
                            <p style="margin: 0; color: #ffffff; font-style: italic;">"${mensaje}"</p>
                          </div>
  
                          <div style="padding: 25px; background-color: #080808; border: 1px solid #111;">
                            <p style="margin: 0 0 10px 0; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #c98628;">Datos de Origen</p>
                            <p style="margin: 0; color: #ffffff;"><strong>Referencia:</strong> ${email}</p>
                            ${web ? `<p style="margin: 4px 0 0 0; color: #ffffff;"><strong>Web:</strong> ${web}</p>` : ''}
                          </div>
                        </td>
                      </tr>
                    </table>
  
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top: 50px;">
                      <tr>
                        <td align="center" style="border-top: 1px solid #1a1a1a; padding-top: 30px;">
                          <p style="margin: 0; font-size: 8px; text-transform: uppercase; letter-spacing: 6px; color: #c98628;">
                            Activos Digitales de Autor
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
}