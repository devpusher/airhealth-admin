import { AntDesign } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    collection,
    deleteDoc,
    doc,
    getFirestore,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    Platform,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { app } from "../../../firebaseConfig";
import "../../global.css";

export default function SpecificUser() {
    const paddingTop =
        Platform.OS === "ios" ? 44 : StatusBar.currentHeight || 0;

    const { userId, userName } = useLocalSearchParams<{
        userId: string;
        userName: string;
    }>();

    const db = getFirestore(app);
    const router = useRouter();

    const [reports, setReports] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) return;

        // NOTE: removed orderBy — returning to previous ordering behavior
        const q = query(
            collection(db, "reports"),
            where("uidPoster", "==", userId)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const list: any[] = [];
            snapshot.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
            setReports(list);
            setLoading(false);
        });

        return unsubscribe;
    }, [userId]);

    // Delete handler with double confirmation
    const handleDeleteReport = (reportId: string) => {
        Alert.alert(
            "Delete Report",
            "Are you sure you want to delete this report?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Continue",
                    style: "destructive",
                    onPress: () => {
                        Alert.alert(
                            "Final Confirmation",
                            "This action cannot be undone. Do you really want to delete this report?",
                            [
                                { text: "Cancel", style: "cancel" },
                                {
                                    text: "Delete Permanently",
                                    style: "destructive",
                                    onPress: async () => {
                                        try {
                                            await deleteDoc(
                                                doc(db, "reports", reportId)
                                            );
                                            Alert.alert(
                                                "Deleted",
                                                "Report has been permanently removed."
                                            );
                                        } catch (error) {
                                            console.error(
                                                "Error deleting report:",
                                                error
                                            );
                                            Alert.alert(
                                                "Error",
                                                "Failed to delete report."
                                            );
                                        }
                                    },
                                },
                            ]
                        );
                    },
                },
            ]
        );
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-gray-50">
                <ActivityIndicator size="large" color="#22c55e" />
                <Text className="text-gray-600 mt-2">
                    Loading user reports...
                </Text>
            </View>
        );
    }

    return (
        <ScrollView
            className="flex-1 bg-gray-50 w-[100%]"
            contentContainerStyle={{
                paddingTop,
                paddingBottom: 100,
                paddingHorizontal: 16,
            }}
            showsVerticalScrollIndicator={false}
        >
            {/* Back Button */}
            <TouchableOpacity
                onPress={() => router.back()}
                activeOpacity={0.8}
                className="flex-row items-center mb-6 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 w-[100px]"
            >
                <AntDesign name="left" size={18} color="#16a34a" />
                <Text className="text-gray-700 font-medium ml-2">Back</Text>
            </TouchableOpacity>

            {/* Header */}
            <Text className="text-2xl font-bold text-gray-800 mb-6">
                {userName}’s Reports
            </Text>

            {/* Reports */}
            {reports.length === 0 ? (
                <Text className="text-gray-500 text-center mt-10">
                    This user hasn’t posted any reports yet.
                </Text>
            ) : (
                reports.map((item) => {
                    const createdAt = item.createdAt?.toDate
                        ? new Date(item.createdAt.toDate()).toLocaleString()
                        : "Unknown date";

                    return (
                        <View
                            key={item.id}
                            className="bg-white rounded-2xl p-4 mb-4 shadow"
                        >
                            {/* Text */}
                            <Text className="text-base text-gray-800 mb-2">
                                {item.text || "No message"}
                            </Text>

                            {/* Image */}
                            {item.image && (
                                <Image
                                    source={{ uri: item.image }}
                                    className="w-full h-48 rounded-lg mb-3"
                                    resizeMode="cover"
                                />
                            )}

                            {/* Date */}
                            <Text className="text-xs text-gray-500 mb-3">
                                Posted: {createdAt}
                            </Text>

                            {/* Delete Button */}
                            <TouchableOpacity
                                onPress={() => handleDeleteReport(item.id)}
                                className="bg-red-500 py-2 rounded-xl active:opacity-80"
                            >
                                <Text className="text-white text-center font-semibold">
                                    Delete Report
                                </Text>
                            </TouchableOpacity>
                        </View>
                    );
                })
            )}
        </ScrollView>
    );
}
