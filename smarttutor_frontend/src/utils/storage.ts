import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const isWeb = Platform.OS === "web";

// fallback su localStorage quando sei sul web
async function webStoreSet(key: string, value: string) {
  localStorage.setItem(key, value);
}

async function webStoreGet(key: string) {
  return localStorage.getItem(key) || null;
}

async function webStoreDelete(key: string) {
  localStorage.removeItem(key);
}

export async function saveTokenPair(access: string, refresh: string) {
  if (isWeb) {
    await webStoreSet("access", access);
    await webStoreSet("refresh", refresh);
    return;
  }

  await SecureStore.setItemAsync("access", access);
  await SecureStore.setItemAsync("refresh", refresh);
}

export async function getAccessToken() {
  if (isWeb) return webStoreGet("access");
  return SecureStore.getItemAsync("access");
}

export async function getRefreshToken() {
  if (isWeb) return webStoreGet("refresh");
  return SecureStore.getItemAsync("refresh");
}

export async function clearTokens() {
  if (isWeb) {
    await webStoreDelete("access");
    await webStoreDelete("refresh");
    return;
  }

  await SecureStore.deleteItemAsync("access");
  await SecureStore.deleteItemAsync("refresh");
}
