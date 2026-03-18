import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { websiteUrl, servicio, message } = body;

    if (!websiteUrl) {
      return NextResponse.json({ error: 'Falta la URL' }, { status: 400 });
    }

    // Almacenamos la respuesta de Resend en una constante
    const { data, error } = await resend.emails.send({
      from: 'Utilix Studio <info@utilixstudio.com>', 
      to: ['info@utilix.es'], // Verifica que este email sea el correcto
      subject: `SOLICITUD AUDITORÍA: ${websiteUrl.toUpperCase()}`,
      html: `
        <div style="background-color: #050505; color: #ffffff; padding: 40px; font-family: sans-serif;">
          <h2 style="color: #00ff9d;">Protocolo de Auditoría</h2>
          <p><strong>URL:</strong> ${websiteUrl}</p>
          <p><strong>Servicio:</strong> ${servicio}</p>
          <p><strong>Mensaje:</strong> ${message}</p>
        </div>
      `
    });

    // Si Resend devuelve un error (ej: dominio no validado)
    if (error) {
      console.error("❌ Error de Resend:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, id: data?.id });
    
  } catch (error: any) {
    console.error("💥 Error Crítico en el Servidor:", error);
    return NextResponse.json({ 
      error: 'Error interno', 
      details: error.message 
    }, { status: 500 });
  }
}