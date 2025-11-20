import * as SecureStore from 'expo-secure-store';

export async function saveTokenPair(access: string, refresh: string) {
  await SecureStore.setItemAsync("access", access);
  await SecureStore.setItemAsync("refresh", refresh);
}

export async function clearTokens() {
  await SecureStore.deleteItemAsync("access");
  await SecureStore.deleteItemAsync("refresh");
}
