import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { db } from "../../../firebaseConfig";
import "../../global.css";

export default function PinnedReport() {
    const [message, setMessage] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true); // for first load

    // 🔄 Load existing pinned report data on mount
    useEffect(() => {
        const fetchPinnedReport = async () => {
            try {
                const docRef = doc(db, "pinned", "report");
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setMessage(data.message || "");
                    setImage(data.imageBase64 || null);
                } else {
                    console.log(
                        "No pinned report found, creating default placeholder..."
                    );
                    // Optional: create an empty doc so it's always available
                    await setDoc(docRef, {
                        message: "",
                        imageBase64: null,
                        createdAt: serverTimestamp(),
                    });
                }
            } catch (error) {
                console.error("Error fetching pinned report:", error);
            } finally {
                setInitialLoading(false);
            }
        };

        fetchPinnedReport();
    }, []);

    // 📸 Pick image and convert to Base64
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            base64: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled) {
            const asset = result.assets[0];
            setImage(`data:image/jpeg;base64,${asset.base64}`);
        }
    };

    // 💾 Save message and base64 image to Firestore
    const handleSave = async () => {
        if (!message.trim() && !image) {
            Alert.alert(
                "Empty Report",
                "Please enter a message or attach an image."
            );
            return;
        }

        setLoading(true);

        try {
            await setDoc(doc(db, "pinned", "report"), {
                message: message.trim(),
                imageBase64: image || null,
                createdAt: serverTimestamp(),
            });

            Alert.alert("Success", "Pinned report saved successfully!");
        } catch (error) {
            console.error("Error saving pinned report:", error);
            Alert.alert("Error", "Failed to save report. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDiscard = () => {
        setMessage("");
        setImage(null);
    };

    if (initialLoading) {
        return (
            <View className="flex-1 items-center justify-center bg-gray-50">
                <ActivityIndicator size="large" color="#4D96FF" />
                <Text className="mt-4 text-gray-600 font-medium">
                    Loading pinned report...
                </Text>
            </View>
        );
    }

    return (
        <ScrollView
            className="flex-1 bg-gray-50"
            contentContainerStyle={{
                paddingBottom: 100,
                paddingHorizontal: 20,
            }}
            showsVerticalScrollIndicator={false}
        >
            {/* AirMap Button */}
            <View className="mb-8 mt-4 rounded-[12px] p-[2px]">
                <LinearGradient
                    colors={[
                        "#FF6B6B",
                        "#FFD93D",
                        "#6BCB77",
                        "#4D96FF",
                        "#A66BFF",
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        borderRadius: 12,
                        padding: 2,
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className="flex items-center justify-center bg-white rounded-[10px] p-4"
                        style={{
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: 0.15,
                            shadowRadius: 6,
                            elevation: 6,
                        }}
                    >
                        <Text className="font-semibold text-lg text-gray-800">
                            Air-Health Map
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>

            {/* Message Input */}
            <View className="mb-6">
                <Text className="text-lg font-semibold text-gray-900 mb-2">
                    Message
                </Text>
                <TextInput
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Enter report message..."
                    multiline
                    className="bg-white p-4 rounded-2xl text-base text-gray-800 border border-gray-200 min-h-[100px]"
                />
            </View>

            {/* Image Picker */}
            <View className="mb-6">
                <Text className="text-lg font-semibold text-gray-900 mb-2">
                    Attach Image
                </Text>

                {image ? (
                    <TouchableOpacity
                        onPress={pickImage}
                        activeOpacity={0.8}
                        className="rounded-2xl overflow-hidden border border-gray-200"
                    >
                        <Image
                            source={{ uri: image }}
                            className="w-full h-52"
                            resizeMode="cover"
                        />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={pickImage}
                        activeOpacity={0.7}
                        className="bg-white border border-dashed border-gray-400 rounded-2xl h-40 items-center justify-center"
                    >
                        <Text className="text-gray-500 font-medium">
                            Tap to upload an image
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Buttons */}
            <View className="flex-row justify-between mt-6">
                <TouchableOpacity
                    onPress={handleDiscard}
                    disabled={loading}
                    className="flex-1 bg-gray-200 py-4 rounded-2xl mr-3"
                    activeOpacity={0.8}
                >
                    <Text className="text-center text-gray-700 font-semibold text-base">
                        Discard
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleSave}
                    disabled={loading}
                    className={`flex-1 py-4 rounded-2xl ml-3 ${
                        loading ? "bg-blue-300" : "bg-blue-600"
                    }`}
                    activeOpacity={0.8}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text className="text-center text-white font-semibold text-base">
                            Save Changes
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
