import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import STHeader from "../src/ui/atoms/STHeader";
import STButton from "../src/ui/atoms/STButton"
import { Link, useRouter } from "expo-router";

export default function TermsScreen() {
  const router = useRouter();

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={{ backgroundColor: "#FFF8F1" }}
    >
      <STHeader level={1} align="left" style={{ marginBottom: 20 }}>
        Termini e Condizioni
      </STHeader>

      <Text style={styles.paragraph}>
        Benvenuto in SmartTutor. Utilizzando la nostra applicazione, accetti i
        presenti Termini e Condizioni. Ti invitiamo a leggerli attentamente.
      </Text>

      <STHeader level={3} align="left" style={styles.sectionTitle}>
        1. Introduzione
      </STHeader>
      <Text style={styles.paragraph}>
        SmartTutor è un assistente digitale dedicato allo studio e
        all’organizzazione accademica. L’uso dell’app implica l’accettazione
        completa e incondizionata dei presenti Termini.
      </Text>

      <STHeader level={3} align="left" style={styles.sectionTitle}>
        2. Uso dell’app
      </STHeader>
      <Text style={styles.paragraph}>
        L’utente si impegna a utilizzare SmartTutor in modo lecito,
        rispettoso e conforme alle normative vigenti. È vietato:
      </Text>
      <Text style={styles.listItem}>• tentare di accedere a dati non autorizzati</Text>
      <Text style={styles.listItem}>• utilizzare l’app a fini commerciali non autorizzati</Text>
      <Text style={styles.listItem}>• fornire contenuti dannosi, fraudolenti o illegali</Text>

      <STHeader level={3} align="left" style={styles.sectionTitle}>
        3. Creazione dell’account
      </STHeader>
      <Text style={styles.paragraph}>
        Per utilizzare alcune funzionalità è necessario creare un account.
        L’utente è responsabile della correttezza dei dati forniti e della
        sicurezza delle proprie credenziali.
      </Text>

      <STHeader level={3} align="left" style={styles.sectionTitle}>
        4. Trattamento dei dati personali
      </STHeader>
      <Text style={styles.paragraph}>
        I dati personali vengono trattati secondo la nostra Informativa sulla
        Privacy. Raccolta, conservazione e trattamento sono effettuati in modo
        trasparente e nel rispetto delle normative GDPR.
      </Text>

      <STHeader level={3} align="left" style={styles.sectionTitle}>
        5. Contenuti generati dall’utente
      </STHeader>
      <Text style={styles.paragraph}>
        L’utente mantiene la proprietà dei propri contenuti (appunti, testi,
        documenti). Caricando contenuti nell’app concede a SmartTutor il solo
        diritto non esclusivo di elaborarli ai fini delle funzionalità richieste
        (riassunti, quiz, analisi del testo).
      </Text>

      <STHeader level={3} align="left" style={styles.sectionTitle}>
        6. Limitazioni di responsabilità
      </STHeader>
      <Text style={styles.paragraph}>
        SmartTutor non garantisce l’assenza totale di errori nei contenuti
        generati automaticamente. Le funzionalità dell’app sono di supporto allo
        studio e non sostituiscono la verifica delle informazioni da parte
        dell’utente.
      </Text>

      <STHeader level={3} align="left" style={styles.sectionTitle}>
        7. Modifiche ai Termini
      </STHeader>
      <Text style={styles.paragraph}>
        SmartTutor si riserva il diritto di aggiornare o modificare questi
        Termini. Gli utenti verranno avvisati in caso di cambiamenti rilevanti.
      </Text>

      <STHeader level={3} align="left" style={styles.sectionTitle}>
        8. Contatti
      </STHeader>
      <Text style={styles.paragraph}>
        Per domande relative ai Termini o alla Privacy puoi contattarci
        all’indirizzo:
      </Text>
      <Text style={styles.paragraphBold}>support@smarttutor.app</Text>

      <View style={{ marginTop: 40 }}>
        <STButton title="Indietro" onPress={() => router.back()} type="secondary" />

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  paragraph: {
    fontSize: 15,
    color: "#3A2F2A",
    lineHeight: 22,
    marginBottom: 12,
  },
  paragraphBold: {
    fontSize: 15,
    fontWeight: "700",
    color: "#3A2F2A",
    marginBottom: 12,
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 8,
  },
  listItem: {
    fontSize: 15,
    color: "#3A2F2A",
    marginLeft: 10,
    marginBottom: 6,
  },
});
