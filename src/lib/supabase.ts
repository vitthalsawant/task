import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';
import * as Linking from 'expo-linking';
import { Database } from '../types/database';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_KEY!;

// Get the redirect URL based on platform
const getRedirectUrl = () => {
  if (Platform.OS === 'web') {
    return `${window.location.origin}/(auth)/callback`;
  }
  return Linking.createURL('/(auth)/callback');
};

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    redirectTo: getRedirectUrl(),
  },
});