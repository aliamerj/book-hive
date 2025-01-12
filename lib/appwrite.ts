import { Client, Avatars, Account, OAuthProvider } from "react-native-appwrite"
import * as Linking from 'expo-linking'
import { openAuthSessionAsync } from "expo-web-browser";

export const appwriteConfig = {
  platform: "com.dijlahTech.bookHive",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!
}

export const client = new Client();
client
  .setPlatform(appwriteConfig.platform)
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)

export const avatar = new Avatars(client)
export const account = new Account(client)

export async function login() {
  try {
    const redirectUrl = Linking.createURL("./");
    const res = account.createOAuth2Token(OAuthProvider.Google, redirectUrl)
    if (!res) throw new Error("Failed to login")

    const browserRes = await openAuthSessionAsync(res.toString(), redirectUrl)

    if (browserRes.type != "success") throw new Error("Failed to login")

    const url = new URL(browserRes.url);
    const secret = url.searchParams.get('secret')?.toString();
    const userId = url.searchParams.get('userId')?.toString();
    if (!secret || !userId) throw new Error("Failed to login")

    const session = await account.createSession(userId, secret);
    if (!session) throw new Error("Failed to create session");
    return true;
  } catch (error) {
    console.log(error)
    return false;

  }
}

export async function logout() {
  try {
    await account.deleteSession("current")
    return true
  } catch (error) {
    console.error(error);
    return false
  }
}

export async function getCurrentUser() {
  try {
    const result = await account.get();
    if (result.$id) {
      const userAvatar = avatar.getInitials(result.name);

      return {
        ...result,
        avatar: userAvatar.toString(),
      };
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

