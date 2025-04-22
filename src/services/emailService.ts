
import { Resend } from 'resend';
import { PaymentFailedEmail } from '../components/emails/PaymentFailedEmail';
import { DocumentConfirmationEmail } from '../components/emails/DocumentConfirmationEmail';

const resend = new Resend('re_123'); // Replace with your Resend API key

interface EmailService {
  sendPaymentFailedEmail: (params: {
    userEmail: string;
    userName: string;
    amount: number;
  }) => Promise<void>;
  
  sendDocumentConfirmationEmail: (params: {
    userEmail: string;
    userName: string;
    documentType: string;
    documentId: string;
  }) => Promise<void>;
}

class ResendEmailService implements EmailService {
  async sendPaymentFailedEmail({
    userEmail,
    userName,
    amount
  }: {
    userEmail: string;
    userName: string;
    amount: number;
  }) {
    try {
      await resend.emails.send({
        from: 'Business Buddy <no-reply@businessbuddy.app>',
        to: userEmail,
        subject: 'Plată eșuată - Acțiune necesară',
        react: PaymentFailedEmail({
          userName,
          amount,
          paymentLink: 'https://app.businessbuddy.ro/payment'
        })
      });
      console.log('Payment failed email sent successfully');
    } catch (error) {
      console.error('Failed to send payment failed email:', error);
      throw error;
    }
  }

  async sendDocumentConfirmationEmail({
    userEmail,
    userName,
    documentType,
    documentId
  }: {
    userEmail: string;
    userName: string;
    documentType: string;
    documentId: string;
  }) {
    try {
      await resend.emails.send({
        from: 'Business Buddy <no-reply@businessbuddy.app>',
        to: userEmail,
        subject: 'Document scanat cu succes',
        react: DocumentConfirmationEmail({
          userName,
          documentType,
          documentId
        })
      });
      console.log('Document confirmation email sent successfully');
    } catch (error) {
      console.error('Failed to send document confirmation email:', error);
      throw error;
    }
  }
}

export const emailService = new ResendEmailService();

