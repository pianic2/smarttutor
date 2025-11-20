import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { getNotes, createNote } from "../../../src/api/notes";
import STInput from "../../../src/ui/atoms/STInput";
import STButton from "../../../src/ui/atoms/STButton";

export default function NotesScreen() {
  const { id } = useLocalSearchParams();
  const courseId = Number(id);

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function load() {
    const data = await getNotes(courseId);
    setNotes(data);
  }

  async function addNote() {
    if (!title) return;
    await createNote(courseId, { title, content });
    setTitle("");
    setContent("");
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <View style={{ padding: 20, marginTop: 40 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Note</Text>

      <STInput placeholder="Titolo" value={title} onChangeText={setTitle} />
      <STInput
        placeholder="Contenuto"
        value={content}
        onChangeText={setContent}
        multiline
        style={{ height: 100 }}
      />

      <STButton title="Aggiungi nota" onPress={addNote} />

      <FlatList
        data={notes}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>{item.title}</Text>
            <Text>{item.content}</Text>
          </View>
        )}
      />
    </View>
  );
}
