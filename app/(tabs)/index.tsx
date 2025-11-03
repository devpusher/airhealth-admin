import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Platform,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { db } from "../../firebaseConfig"; // ✅ make sure this path is correct
import "../global.css";

const Index = () => {
    const paddingTop =
        Platform.OS === "ios" ? 44 : StatusBar.currentHeight || 0;

    const [totalUsers, setTotalUsers] = useState<number | null>(null);
    const [announcement, setAnnouncement] = useState("");
    const router = useRouter();

    // ✅ Fetch total number of users from Firestore collection "users"
    useEffect(() => {
        const fetchUserCount = async () => {
            try {
                const snapshot = await getDocs(collection(db, "users"));
                setTotalUsers(snapshot.size); // snapshot.size returns total doc count
            } catch (error) {
                console.error("Error fetching user count:", error);
                setTotalUsers(0);
            }
        };

        fetchUserCount();
    }, []);

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
                    onPress={() => router.push("/settings")}
                >
                    <MaterialCommunityIcons
                        name="face-man-profile"
                        size={28}
                        color="#16a34a"
                    />
                </TouchableOpacity>
            </View>

            {/* User Summary Card */}
            <TouchableOpacity
                onPress={() => router.push("/screens/users")}
                className="bg-white rounded-2xl p-6 mb-8 flex-row items-center shadow-sm"
            >
                <View className="bg-green-100 p-3 rounded-xl">
                    <Entypo name="user" size={32} color="#16a34a" />
                </View>
                <View className="ml-4">
                    <Text className="text-gray-600 text-base font-medium">
                        Total Users
                    </Text>
                    {totalUsers === null ? (
                        <ActivityIndicator color="#16a34a" size="small" />
                    ) : (
                        <Text className="text-3xl font-bold text-green-700">
                            {totalUsers}
                        </Text>
                    )}
                </View>
            </TouchableOpacity>

            {/* Report Hotspot */}
            <Text className="text-xl font-semibold text-gray-800 mb-3">
                Report Hotspot
            </Text>
            <TouchableOpacity
                onPress={() => router.push("/(tabs)/screens/pinnedReport")}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 py-4 active:opacity-80 mb-8"
            >
                <Text className="text-black text-center text-lg font-base">
                    View Pinned Report
                </Text>
            </TouchableOpacity>

            {/* Notification Section */}
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
