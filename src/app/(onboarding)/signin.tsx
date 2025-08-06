import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { icons } from '../../constants/icons';

export default function SignInScreen() {
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
    } catch (error) {
      Alert.alert(
        'Sign In Error',
        'Failed to sign in with Google. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-1 justify-center items-center px-6">
        <Image
          source={icons.splashscreen}
          className="w-32 h-32 mb-8"
          resizeMode="contain"
        />
        
        <Text className="text-3xl font-poppins-bold text-black-300 text-center mb-4">
          Welcome to Swaraj
        </Text>
        
        <Text className="text-lg font-poppins text-black-100 text-center mb-12 leading-6">
          Your voice matters. Join the conversation and make your voice heard.
        </Text>

        {/* Google Sign In Button */}
        <TouchableOpacity
          onPress={handleGoogleSignIn}
          disabled={loading}
          className="w-full bg-white border border-gray-300 rounded-xl py-4 px-6 flex-row items-center justify-center shadow-sm active:scale-95"
          style={{ elevation: 2 }}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#EC324E" />
          ) : (
            <>
              <Image
                source={icons.google}
                className="w-6 h-6 mr-3"
                resizeMode="contain"
              />
              <Text className="text-lg font-poppins-medium text-gray-700">
                Continue with Google
              </Text>
            </>
          )}
        </TouchableOpacity>

        <Text className="text-sm font-poppins text-black-100 text-center mt-8 leading-5">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </View>
  );
}