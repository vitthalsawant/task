import { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the current session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          router.replace('/(onboarding)/signin');
          return;
        }

        if (session?.user) {
          // Check if profile exists
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', session.user.id)
            .single();

          if (profile && profile.username) {
            // Profile exists, go to home
            router.replace('/(tabs)');
          } else {
            // Profile exists but username is null, go to setup
            router.replace('/(onboarding)/setup-profile');
          }
        } else {
          router.replace('/(onboarding)/signin');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        router.replace('/(onboarding)/signin');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <ActivityIndicator size="large" color="#EC324E" />
      <Text className="mt-4 text-gray-600 font-poppins">
        Completing sign in...
      </Text>
    </View>
  );
}