import { createClient, SupabaseClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { env } from './env';

let client: SupabaseClient | null = null;

export const getSupabaseClient = () => {
    if (client) return client;
    if (!env.supabaseUrl || !env.supabaseAnonKey) {
        throw new Error('Supabase credentials are missing. Set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY.');
    }

    client = createClient(env.supabaseUrl, env.supabaseAnonKey, {
        auth: {
            storage: AsyncStorage,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true
        }
    });

    return client;
};
