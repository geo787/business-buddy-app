
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface DocumentConfirmationEmailProps {
  userName: string;
  documentType: string;
  documentId: string;
}

export const DocumentConfirmationEmail = ({
  userName,
  documentType,
  documentId,
}: DocumentConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Document scanat cu succes</Preview>
      <Body style={main}>
        <Container>
          <Section>
            <Heading>Document Procesat - Business Buddy Transport</Heading>
            <Text>Bună {userName},</Text>
            <Text>
              Documentul tău de tip {documentType} cu ID-ul {documentId} a fost scanat și procesat cu succes.
              Poți accesa documentul în platformă pentru verificare.
            </Text>
            <Text style={footer}>
              Acest email este generat automat. Pentru asistență, contactează-ne la support@businessbuddy.ro
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

const footer = {
  color: '#666666',
  fontSize: '12px',
};

