import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Pressable, Text, View } from "react-native";
import { useAuth } from "../context/authContext";
import "../global.css";

export default function Settings() {
    const { logout } = useAuth();
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await logout();
            Alert.alert("Signed Out", "You have been signed out.");
        } catch (error: any) {
            Alert.alert("Error", error.message);
        }
    };

    function confirmSignOut() {
        Alert.alert("Sign out", "Are you sure you want to sign out?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Sign Out",
                style: "destructive",
                onPress: () => {
                    console.log("Signed out");
                    handleSignOut();
                },
            },
        ]);
    }

    return (
        <View className="flex-1 bg-gray-50">
            <View className="px-6 pt-6">
                {/* Header */}
                <View className="flex-row items-center justify-between mb-6">
                    <View>
                        <Text className="text-2xl font-bold text-gray-900">
                            Settings
                        </Text>
                        <Text className="text-sm text-gray-500">
                            Manage the account
                        </Text>
                    </View>
                    <Image
                        source={{
                            uri: "https://api.dicebear.com/6.x/initials/svg?seed=AH",
                        }}
                        style={{ width: 48, height: 48, borderRadius: 12 }}
                    />
                </View>

                {/* Profile Card */}
                {/* <View className="bg-white rounded-xl p-4 shadow-sm mb-4">
                    <View className="flex-row items-center">
                        <View className="w-14 h-14 rounded-full bg-indigo-500 items-center justify-center mr-4">
                            <Text className="text-white font-bold">AH</Text>
                        </View>
                        <View className="flex-1">
                            <Text className="text-lg font-semibold text-gray-900">
                                Air Health
                            </Text>
                            <Text className="text-sm text-gray-500">
                                admin@airhealth.example
                            </Text>
                        </View>
                        <Pressable
                            accessibilityRole="button"
                            className="px-3 py-1 bg-indigo-50 rounded-md"
                            onPress={() =>
                                Alert.alert(
                                    "Edit profile",
                                    "Edit profile placeholder"
                                )
                            }
                        >
                            <Text className="text-indigo-600 font-medium">
                                Edit
                            </Text>
                        </Pressable>
                    </View>
                </View> */}

                {/* Sign Out */}
                <View className="mb-4">
                    <Pressable
                        onPress={confirmSignOut}
                        className="bg-red-600 rounded-xl py-3 items-center shadow"
                        accessibilityRole="button"
                    >
                        <Text className="text-white font-semibold">
                            Sign Out
                        </Text>
                    </Pressable>
                </View>

                {/* App version */}
                <View className="mt-6 items-center">
                    <Text className="text-xs text-gray-400">
                        App version 1.0.0
                    </Text>
                </View>
            </View>
        </View>
    );
}
