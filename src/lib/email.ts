import nodemailer from "nodemailer";

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Email templates
const baseEmailStyle = `
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; }
    .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .button { display: inline-block; background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
    .info-box { background: #f0fdf4; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
    .trip-details { margin: 20px 0; }
    .trip-details dt { font-weight: bold; color: #059669; margin-top: 10px; }
    .trip-details dd { margin-left: 0; margin-bottom: 5px; }
  </style>
`;

interface BookingConfirmationData {
  passengerName: string;
  passengerEmail: string;
  driverName: string;
  departure: string;
  destination: string;
  departureDate: string;
  departureTime: string;
  seatsBooked: number;
  totalPrice: number;
  carpoolId: string;
}

interface TripStartedData {
  passengerName: string;
  passengerEmail: string;
  driverName: string;
  departure: string;
  destination: string;
  carpoolId: string;
}

interface TripCompletedData {
  passengerName: string;
  passengerEmail: string;
  driverName: string;
  departure: string;
  destination: string;
  carpoolId: string;
}

interface TripCancelledData {
  recipientName: string;
  recipientEmail: string;
  departure: string;
  destination: string;
  departureDate: string;
  departureTime: string;
  refundAmount?: number;
  reason: string;
}

export async function sendBookingConfirmation(data: BookingConfirmationData) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>${baseEmailStyle}</head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚗 Réservation Confirmée</h1>
        </div>
        <div class="content">
          <p>Bonjour ${data.passengerName},</p>
          
          <p>Votre réservation a été confirmée avec succès !</p>
          
          <div class="info-box">
            <h3>Détails du trajet</h3>
            <dl class="trip-details">
              <dt>📍 Départ</dt>
              <dd>${data.departure}</dd>
              
              <dt>📍 Destination</dt>
              <dd>${data.destination}</dd>
              
              <dt>📅 Date</dt>
              <dd>${new Date(data.departureDate).toLocaleDateString("fr-FR", { 
                weekday: "long", 
                year: "numeric", 
                month: "long", 
                day: "numeric" 
              })}</dd>
              
              <dt>🕐 Heure de départ</dt>
              <dd>${data.departureTime}</dd>
              
              <dt>👤 Conducteur</dt>
              <dd>${data.driverName}</dd>
              
              <dt>💺 Places réservées</dt>
              <dd>${data.seatsBooked}</dd>
              
              <dt>💰 Coût total</dt>
              <dd>${data.totalPrice} crédits</dd>
            </dl>
          </div>
          
          <p>Vous recevrez une notification lorsque le conducteur démarrera le trajet.</p>
          
          <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/covoiturages/${data.carpoolId}" class="button">
            Voir les détails
          </a>
          
          <p>Bon voyage ! 🌱</p>
        </div>
        <div class="footer">
          <p>EcoRide - Covoiturage Écologique</p>
          <p>Cet email a été envoyé automatiquement, merci de ne pas y répondre.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return transporter.sendMail({
    from: `"EcoRide" <${process.env.SMTP_USER}>`,
    to: data.passengerEmail,
    subject: "✅ Réservation confirmée - EcoRide",
    html,
  });
}

export async function sendTripStartedNotification(data: TripStartedData) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>${baseEmailStyle}</head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 Trajet Démarré</h1>
        </div>
        <div class="content">
          <p>Bonjour ${data.passengerName},</p>
          
          <p>Le conducteur ${data.driverName} a démarré le trajet :</p>
          
          <div class="info-box">
            <h3>📍 ${data.departure} → ${data.destination}</h3>
          </div>
          
          <p>Bon voyage et profitez bien de cette expérience de covoiturage écologique ! 🌱</p>
          
          <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/covoiturages/${data.carpoolId}" class="button">
            Voir les détails
          </a>
        </div>
        <div class="footer">
          <p>EcoRide - Covoiturage Écologique</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return transporter.sendMail({
    from: `"EcoRide" <${process.env.SMTP_USER}>`,
    to: data.passengerEmail,
    subject: "🚀 Votre trajet a démarré - EcoRide",
    html,
  });
}

export async function sendTripCompletedNotification(data: TripCompletedData) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>${baseEmailStyle}</head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Trajet Terminé</h1>
        </div>
        <div class="content">
          <p>Bonjour ${data.passengerName},</p>
          
          <p>Le trajet avec ${data.driverName} est maintenant terminé :</p>
          
          <div class="info-box">
            <h3>📍 ${data.departure} → ${data.destination}</h3>
          </div>
          
          <p>Nous espérons que vous avez passé un bon voyage ! 🎉</p>
          
          <p><strong>Donnez votre avis :</strong><br>
          Votre feedback est précieux pour notre communauté. Prenez quelques instants pour évaluer votre conducteur.</p>
          
          <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/covoiturages/${data.carpoolId}" class="button">
            Laisser un avis
          </a>
          
          <p>Merci d'avoir choisi EcoRide pour vos déplacements ! 🌍</p>
        </div>
        <div class="footer">
          <p>EcoRide - Covoiturage Écologique</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return transporter.sendMail({
    from: `"EcoRide" <${process.env.SMTP_USER}>`,
    to: data.passengerEmail,
    subject: "✅ Trajet terminé - Donnez votre avis - EcoRide",
    html,
  });
}

export async function sendTripCancelledNotification(data: TripCancelledData) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>${baseEmailStyle}</head>
    <body>
      <div class="container">
        <div class="header">
          <h1>❌ Trajet Annulé</h1>
        </div>
        <div class="content">
          <p>Bonjour ${data.recipientName},</p>
          
          <p>Nous vous informons que le trajet suivant a été annulé :</p>
          
          <div class="info-box">
            <dl class="trip-details">
              <dt>📍 Trajet</dt>
              <dd>${data.departure} → ${data.destination}</dd>
              
              <dt>📅 Date</dt>
              <dd>${new Date(data.departureDate).toLocaleDateString("fr-FR", { 
                weekday: "long", 
                year: "numeric", 
                month: "long", 
                day: "numeric" 
              })} à ${data.departureTime}</dd>
              
              <dt>Raison</dt>
              <dd>${data.reason}</dd>
              
              ${data.refundAmount ? `
                <dt>💰 Remboursement</dt>
                <dd>${data.refundAmount} crédits ont été recrédités sur votre compte</dd>
              ` : ""}
            </dl>
          </div>
          
          <p>Nous sommes désolés pour ce désagrément. N'hésitez pas à rechercher d'autres trajets disponibles.</p>
          
          <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/covoiturages" class="button">
            Rechercher un trajet
          </a>
        </div>
        <div class="footer">
          <p>EcoRide - Covoiturage Écologique</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return transporter.sendMail({
    from: `"EcoRide" <${process.env.SMTP_USER}>`,
    to: data.recipientEmail,
    subject: "❌ Annulation de trajet - EcoRide",
    html,
  });
}

// Verify email configuration on startup (optional, for debugging)
export async function verifyEmailConfig() {
  try {
    await transporter.verify();
    console.log("✅ Email server is ready");
    return true;
  } catch (error) {
    console.error("❌ Email server configuration error:", error);
    return false;
  }
}
