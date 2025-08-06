import React, { useEffect } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import { icons } from '../constants/icons';

export default function WelcomeScreen() {
  const { session, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!session) {
        // Not authenticated, go to sign in
        router.replace('/(onboarding)/signin');
      } else if (!profile || !profile.username) {
        // Authenticated but no profile, go to setup
        router.replace('/(onboarding)/setup-profile');
      } else {
        // Authenticated with profile, go to home
        router.replace('/(tabs)');
      }
    }
  }, [session, profile, loading, router]);

  return (
    <View className="flex-1 bg-white justify-center items-center">
      <Image
        source={icons.splashscreen}
        className="w-32 h-32 mb-8"
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#EC324E" />
      <Text className="mt-4 text-gray-600 font-poppins">
        Loading...
      </Text>
    </View>
  );
}