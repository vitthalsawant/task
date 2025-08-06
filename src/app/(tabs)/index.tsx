import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut } from 'lucide-react-native';

export default function App() {
  const { user, profile, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-primary-300 pt-16 pb-6 px-6">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            {profile?.avatar_url ? (
              <Image
                source={{ uri: profile.avatar_url }}
                className="w-12 h-12 rounded-full mr-4"
              />
            ) : (
              <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center mr-4">
                <Text className="text-white font-poppins-bold text-lg">
                  {profile?.full_name?.charAt(0) || user?.email?.charAt(0) || '?'}
                </Text>
              </View>
            )}
            <View>
              <Text className="text-white font-poppins-semibold text-lg">
                Welcome back!
              </Text>
              <Text className="text-white/80 font-poppins">
                {profile?.full_name || user?.email}
              </Text>
            </View>
          </View>
          
          <TouchableOpacity
            onPress={handleSignOut}
            className="p-2 rounded-full bg-white/20 active:scale-95"
          >
            <LogOut size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View className="flex-1 px-6 py-8">
        <Text className="text-2xl font-poppins-bold text-black-300 mb-4">
          Your Voice Dashboard
        </Text>
        
        <Text className="text-black-100 font-poppins mb-8">
          Welcome to Swaraj! Your authentication is working perfectly.
        </Text>

        {/* Profile Info Card */}
        <View className="bg-gray-50 rounded-xl p-6 mb-6">
          <Text className="text-lg font-poppins-semibold text-black-300 mb-4">
            Profile Information
          </Text>
          
          <View className="space-y-3">
            <View>
              <Text className="text-sm font-poppins-medium text-gray-600">Username</Text>
              <Text className="text-black-300 font-poppins">@{profile?.username}</Text>
            </View>
            
            <View>
              <Text className="text-sm font-poppins-medium text-gray-600">Full Name</Text>
              <Text className="text-black-300 font-poppins">{profile?.full_name}</Text>
            </View>
            
            <View>
              <Text className="text-sm font-poppins-medium text-gray-600">Email</Text>
              <Text className="text-black-300 font-poppins">{user?.email}</Text>
            </View>
          </View>
        </View>

        {/* Quick Stats */}
        <View className="flex-row space-x-4">
          <View className="flex-1 bg-primary-100 rounded-xl p-4">
            <Text className="text-2xl font-poppins-bold text-primary-300">0</Text>
            <Text className="text-black-100 font-poppins">Voices Created</Text>
          </View>
          
          <View className="flex-1 bg-primary-100 rounded-xl p-4">
            <Text className="text-2xl font-poppins-bold text-primary-300">0</Text>
            <Text className="text-black-100 font-poppins">Voices Heard</Text>
          </View>
        </View>
      </View>
    </View>
  );
}