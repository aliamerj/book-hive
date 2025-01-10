import { Link } from "expo-router";
import { Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView className="bg-primary h-screen">
      <ScrollView contentContainerStyle={{height: "100%"}} >
        <View className="flex justify-center items-center h-screen">
          <Text className="text-blue-500" >Edit app/index.tsx to edit this screen.</Text>
          <Link href="/home" className="text-white underline">Go to start</Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
