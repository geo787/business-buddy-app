
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface PaymentFailedEmailProps {
  userName: string;
  amount: number;
  paymentLink: string;
}

export const PaymentFailedEmail = ({
  userName,
  amount,
  paymentLink,
}: PaymentFailedEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Plată eșuată - Acțiune necesară</Preview>
      <Body style={main}>
        <Container>
          <Section>
            <Heading>Plată eșuată - Business Buddy Transport</Heading>
            <Text>Bună {userName},</Text>
            <Text>
              Am identificat o problemă cu ultima plată de {amount} EUR. Pentru a continua utilizarea serviciilor, 
              te rugăm să actualizezi metoda de plată.
            </Text>
            <Button href={paymentLink} style={button}>
              Actualizează metoda de plată
            </Button>
            <Text style={footer}>
              Dacă ai întrebări, contactează departamentul financiar la support@businessbuddy.ro
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
};

const button = {
  backgroundColor: '#000000',
  borderRadius: '5px',
  color: '#fff',
  padding: '12px 24px',
};

const footer = {
  color: '#666666',
  fontSize: '12px',
};

