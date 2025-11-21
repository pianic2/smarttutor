import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import STFadeInDown from "../../src/ui/atoms/STFadeInDown";
import STHeader from "../../src/ui/atoms/STHeader";
import { COLOR_MAP } from "../../src/utils/colors";

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);
  const [courseName, setCourseName] = useState("");

  // MOCK esempio corsi — da sostituire con API reali
  const [courses, setCourses] = useState([
    { id: 1, name: "Analisi 1" },
    { id: 2, name: "Programmazione" },
    { id: 3, name: "Fisica" },
  ]);

  function addCourse() {
    if (!courseName.trim()) return;
    setCourses([...courses, { id: Date.now(), name: courseName.trim() }]);
    setCourseName("");
    setModalVisible(false);
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFF8F1",
        paddingHorizontal: 20,
        paddingTop: 40,
      }}
    >
      {/* HEADER */}
      <STFadeInDown duration={400} delay={0} style={{ width: "100%" }}>
        <STHeader level={2}>Benvenuto!</STHeader>
      </STFadeInDown>

      {/* TITOLO + AGGIUNGI */}
      <View
        style={{
          marginTop: 30,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <STFadeInDown duration={400} delay={400}>
          <STHeader level={3}>I tuoi corsi</STHeader>
        </STFadeInDown>
        <STFadeInDown duration={400} delay={500}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 14,
              backgroundColor: COLOR_MAP.light.primary.bg,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>+ Aggiungi</Text>
          </TouchableOpacity>
        </STFadeInDown>
      </View>

      {/* CAROSELLO CORSI */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 20 }}
        contentContainerStyle={{ paddingRight: 40 }}
      >
        {courses.map((c) => (
          <View
            key={c.id}
            style={{
              width: 140,
              height: 100,
              backgroundColor: "white",
              borderRadius: 14,
              marginRight: 12,
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 4 },
              elevation: 4,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600" }}>{c.name}</Text>
          </View>
        ))}
      </ScrollView>

      {/* MODALE PER AGGIUNGERE CORSO */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Aggiungi corso</Text>

            <TextInput
              placeholder="Nome del corso"
              style={styles.input}
              value={courseName}
              onChangeText={setCourseName}
            />

            <TouchableOpacity style={styles.addBtn} onPress={addCourse}>
              <Text style={styles.addBtnText}>Aggiungi</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Annulla</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    marginBottom: 20,
  },
  addBtn: {
    backgroundColor: COLOR_MAP.light.primary.bg,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
  },
  addBtnText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  cancelText: {
    color: "#555",
    marginTop: 6,
  },
});
