import { StatusBar } from "expo-status-bar";
import { View, Text, Image, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from '@expo/vector-icons/AntDesign';
import { login } from "@/lib/appwrite";
import CustomButton from "@/components/ui/CustomButton";
import { useGlobalContext } from "@/lib/global-provider";
import { Redirect } from "expo-router";


const Login = () => {
  const { refetch, loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/" />;

  const handleLogin = async () => {
    const result = await login();
    if (result) {
      refetch({});
    } else {
      Alert.alert("Error", "Failed to login");
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <View className="flex-row items-center">
            <Image
              source={require("../assets/images/logo.png")}
              className="w-[130px] h-[84px]"
              resizeMode="contain"
            />
            <Text className="text-4xl font-psemibold italic text-white">Book Hive</Text>
          </View>

          <Image
            source={require("../assets/images/intro.png")}
            className="max-w-[380px] w-full h-[298px]"
            resizeMode="contain"
          />

          <Text className="text-3xl text-white font-bold text-center">
            Unlock the wisdom of every book with AI-powered insights.
          </Text>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Discover a smarter way to read. Upload your favorite books, dive into chapters, and unlock clear, concise insights for every section!
          </Text>

          <CustomButton
            title="Continue with Google"
            handlePress={handleLogin}
            containerStyles="w-full mt-7"
            textStyles="px-4"
            isLoading={false}
            startIcon={<AntDesign name="google" size={24} color="#161622" />}
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="auto" />

    </SafeAreaView>

  )
}

export default Login
