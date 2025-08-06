import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, Edit3, Settings } from 'lucide-react-native';

export default function Profile() {
    const { user, profile, signOut } = useAuth();

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <ScrollView className="flex-1 bg-white">
            {/* Header */}
            <View className="bg-primary-300 pt-16 pb-8 px-6">
                <View className="items-center">
                    {profile?.avatar_url ? (
                        <Image
                            source={{ uri: profile.avatar_url }}
                            className="w-24 h-24 rounded-full mb-4"
                        />
                    ) : (
                        <View className="w-24 h-24 rounded-full bg-white/20 items-center justify-center mb-4">
                            <Text className="text-white font-poppins-bold text-2xl">
                                {profile?.full_name?.charAt(0) || user?.email?.charAt(0) || '?'}
                            </Text>
                        </View>
                    )}
                    
                    <Text className="text-white font-poppins-bold text-2xl text-center">
                        {profile?.full_name}
                    </Text>
                    <Text className="text-white/80 font-poppins text-lg">
                        @{profile?.username}
            {/* Profile Actions */}
            <View className="px-6 py-8">
                <TouchableOpacity className="flex-row items-center justify-between bg-gray-50 rounded-xl p-4 mb-4 active:scale-95">
                    <View className="flex-row items-center">
                        <Edit3 size={20} color="#EC324E" />
                        <Text className="ml-3 font-poppins-medium text-black-300">
                            Edit Profile
                        </Text>
                    </View>
                    <Text className="text-gray-400">›</Text>
                </TouchableOpacity>
                    </Text>
                <TouchableOpacity className="flex-row items-center justify-between bg-gray-50 rounded-xl p-4 mb-4 active:scale-95">
                    <View className="flex-row items-center">
                        <Settings size={20} color="#EC324E" />
                        <Text className="ml-3 font-poppins-medium text-black-300">
                            Settings
                        </Text>
                    </View>
                    <Text className="text-gray-400">›</Text>
                </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={handleSignOut}
                    className="flex-row items-center justify-between bg-red-50 rounded-xl p-4 active:scale-95"
                >
                    <View className="flex-row items-center">
                        <LogOut size={20} color="#F75555" />
                        <Text className="ml-3 font-poppins-medium text-danger">
                            Sign Out
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            </View>
            {/* Profile Stats */}
            <View className="px-6 pb-8">
                <Text className="text-xl font-poppins-bold text-black-300 mb-4">
                    Your Activity
                </Text>
                
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
        </ScrollView>
    );
}