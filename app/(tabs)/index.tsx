import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Platform,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import "../global.css";

const Index = () => {
    const paddingTop =
        Platform.OS === "ios" ? 44 : StatusBar.currentHeight || 0;

    // Sample data
    const usersNotOnline = 42;
    const [announcement, setAnnouncement] = useState("");
    const router = useRouter();

    // Handle Notify Users button press
    const handleNotifyUsers = () => {
        console.log("Notify Users clicked! Message:", announcement);
        setAnnouncement("");
    };

    return (
        <ScrollView
            className="flex-1 bg-gray-50"
            contentContainerStyle={{
                paddingTop,
                paddingBottom: 100,
                paddingHorizontal: 20,
            }}
            showsVerticalScrollIndicator={false}
        >
            {/* Header */}
            <View className="flex-row items-center justify-between mb-8 mt-4">
                <View>
                    <Text className="text-base text-gray-600">
                        Welcome back 👋
                    </Text>
                    <Text className="text-3xl font-extrabold text-gray-800">
                        Admin
                    </Text>
                </View>

                <TouchableOpacity
                    className="bg-white p-3 rounded-full shadow-sm border border-gray-200"
                    onPress={() => {
                        router.push("/settings");
                    }}
                >
                    <MaterialCommunityIcons
                        name="face-man-profile"
                        size={28}
                        color="#16a34a"
                    />
                </TouchableOpacity>
            </View>

            {/* User Summary Card */}
            <View className="bg-white rounded-2xl p-6 mb-8 flex-row items-center shadow-sm border border-gray-100">
                <View className="bg-green-100 p-3 rounded-xl">
                    <Entypo name="user" size={32} color="#16a34a" />
                </View>
                <View className="ml-4">
                    <Text className="text-gray-600 text-base font-medium">
                        Total Users
                    </Text>
                    <Text className="text-3xl font-bold text-green-700">
                        {usersNotOnline}
                    </Text>
                </View>
            </View>

            {/* Announcement Section */}
            <Text className="text-xl font-semibold text-gray-800 mb-3">
                Notification Message
            </Text>

            <View className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-5">
                <Text className="text-gray-600 mb-2 font-medium">Message</Text>
                <TextInput
                    className="text-base text-gray-800 border border-gray-300 rounded-xl p-4 min-h-[160px] max-h-[280px]"
                    placeholder="Type your announcement or update for users here..."
                    placeholderTextColor="#999"
                    multiline
                    textAlignVertical="top"
                    value={announcement}
                    onChangeText={setAnnouncement}
                />
            </View>

            {/* Button */}
            <TouchableOpacity
                onPress={handleNotifyUsers}
                className="bg-green-600 rounded-xl py-4 shadow-sm active:opacity-80"
            >
                <Text className="text-white text-center text-lg font-semibold">
                    Notify Users
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default Index;
