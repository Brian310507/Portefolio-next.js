import { NextResponse } from "next/server";
import { Resend } from "resend";

const fromEmail = process.env.FROM_EMAIL;

// Initialisation paresseuse : évite de planter le build quand la clé API est absente
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new Resend(apiKey);
}

export async function POST(req) {
  let email, subject, message;
  try {
    ({ email, subject, message } = await req.json());
  } catch (error) {
    return NextResponse.json(
      { error: "Corps de requête invalide" },
      { status: 400 }
    );
  }

  const resend = getResendClient();
  if (!resend || !fromEmail) {
    console.error(
      "RESEND_API_KEY ou FROM_EMAIL manquant dans les variables d'environnement"
    );
    return NextResponse.json(
      { error: "Service d'envoi d'email non configuré" },
      { status: 500 }
    );
  }

  try {
    const data = await resend.emails.send({
      from: fromEmail,
      to: [fromEmail, email],
      subject: subject,
      react: (
        <>
          <h1>{subject}</h1>
          <p>Thank you for contacting us!</p>
          <p>New message submitted:</p>
          <p>{message}</p>
        </>
      ),
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return NextResponse.json(
      { error: "Échec de l'envoi du message" },
      { status: 500 }
    );
  }
}
