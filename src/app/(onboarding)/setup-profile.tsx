import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Camera, User } from 'lucide-react-native';

export default function SetupProfileScreen() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  
  const { user, refreshProfile } = useAuth();
  const router = useRouter();

  const validateUsername = async (value: string) => {
    setUsername(value);
    setUsernameError('');

    if (value.length < 3) {
      setUsernameError('Username must be at least 3 characters');
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      setUsernameError('Username can only contain letters, numbers, and underscores');
      return;
    }

    // Check if username is taken
    const { data } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', value.toLowerCase())
      .single();

    if (data) {
      setUsernameError('Username is already taken');
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Please grant camera roll permissions to upload an avatar.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const uploadAvatar = async (uri: string): Promise<string | null> => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      
      const fileExt = uri.split('.').pop()?.toLowerCase() ?? 'jpg';
      const fileName = `${user!.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, blob);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading avatar:', error);
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }

    if (!username.trim()) {
      Alert.alert('Error', 'Please enter a username');
      return;
    }

    if (usernameError) {
      Alert.alert('Error', usernameError);
      return;
    }

    if (!user) {
      Alert.alert('Error', 'User not found');
      return;
    }

    setLoading(true);

    try {
      let avatarUrl = null;
      
      if (avatarUri) {
        avatarUrl = await uploadAvatar(avatarUri);
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          username: username.toLowerCase(),
          full_name: fullName.trim(),
          avatar_url: avatarUrl,
        })
        .eq('user_id', user.id);

      if (error) {
        throw error;
      }

      await refreshProfile();
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error creating profile:', error);
      Alert.alert(
        'Error',
        'Failed to create profile. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex-1 px-6 pt-16 pb-8">
          <Text className="text-3xl font-poppins-bold text-black-300 text-center mb-2">
            Complete Your Profile
          </Text>
          
          <Text className="text-lg font-poppins text-black-100 text-center mb-12">
            Let's set up your profile to get started
          </Text>

          {/* Avatar Section */}
          <View className="items-center mb-8">
            <TouchableOpacity
              onPress={pickImage}
              className="w-32 h-32 rounded-full bg-gray-100 items-center justify-center border-2 border-dashed border-gray-300 active:scale-95"
            >
              {avatarUri ? (
                <Image
                  source={{ uri: avatarUri }}
                  className="w-full h-full rounded-full"
                  resizeMode="cover"
                />
              ) : (
                <View className="items-center">
                  <Camera size={32} color="#9CA3AF" />
                  <Text className="text-sm font-poppins text-gray-500 mt-2">
                    Add Photo
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity onPress={pickImage} className="mt-3">
              <Text className="text-primary-300 font-poppins-medium">
                {avatarUri ? 'Change Photo' : 'Upload Avatar'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Full Name Input */}
          <View className="mb-6">
            <Text className="text-lg font-poppins-medium text-black-300 mb-3">
              Full Name
            </Text>
            <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4 border border-gray-200">
              <User size={20} color="#9CA3AF" />
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                placeholder="Enter your full name"
                className="flex-1 ml-3 font-poppins text-black-300"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          {/* Username Input */}
          <View className="mb-8">
            <Text className="text-lg font-poppins-medium text-black-300 mb-3">
              Username
            </Text>
            <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4 border border-gray-200">
              <Text className="font-poppins text-gray-500">@</Text>
              <TextInput
                value={username}
                onChangeText={validateUsername}
                placeholder="username"
                className="flex-1 ml-2 font-poppins text-black-300"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            {usernameError ? (
              <Text className="text-danger font-poppins text-sm mt-2">
                {usernameError}
              </Text>
            ) : null}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={loading || !fullName.trim() || !username.trim() || !!usernameError}
            className={`w-full py-4 rounded-xl items-center justify-center ${
              loading || !fullName.trim() || !username.trim() || !!usernameError
                ? 'bg-gray-300'
                : 'bg-primary-300 active:scale-95'
            }`}
          >
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text className="text-white font-poppins-semibold text-lg">
                Complete Setup
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}