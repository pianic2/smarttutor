import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { getCourses, createCourse } from "../../src/api/courses";
import STButton from "../../src/ui/atoms/STButton";
import STInput from "../../src/ui/atoms/STInput";
import { Link } from "expo-router";

export default function CoursesScreen() {
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState("");

  async function load() {
    const data = await getCourses();
    setCourses(data);
  }

  async function addCourse() {
    if (!name) return;
    await createCourse({ name, description: "" });
    setName("");
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <View style={{ padding: 20, marginTop: 40 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>I tuoi corsi</Text>

      <STInput placeholder="Nuovo corso" value={name} onChangeText={setName} />
      <STButton title="Crea" onPress={addCourse} />

      <FlatList
        data={courses}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }) => (
          <Link href={`/courses/${item.id}/notes`} style={{ padding: 10 }}>
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
          </Link>
        )}
      />
    </View>
  );
}
