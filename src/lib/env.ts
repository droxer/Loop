const ensure = (key: string) => {
    const value = process.env[key];
    if (!value) {
        console.warn(`Missing environment variable: ${key}`);
    }
    return value ?? '';
};

export const env = {
    supabaseUrl: ensure('EXPO_PUBLIC_SUPABASE_URL'),
    supabaseAnonKey: ensure('EXPO_PUBLIC_SUPABASE_ANON_KEY'),
    openaiApiKey: ensure('EXPO_PUBLIC_OPENAI_API_KEY')
};
