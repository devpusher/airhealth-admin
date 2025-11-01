import { useRouter } from "expo-router";
import React, { useState } from "react";

import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

// css
import "../global.css";

const Index = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signingIn, setSigningIn] = useState(false);
    const router = useRouter();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 bg-white"
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className="flex-1 justify-center px-8">
                    <View className="mb-10">
                        <Text className="text-4xl font-bold text-gray-800 mb-2 text-center">
                            Air Health Admin
                        </Text>
                    </View>

                    <View className="space-y-4">
                        <View>
                            <Text className="text-gray-700 mb-2 font-medium">
                                Email
                            </Text>
                            <TextInput
                                className="bg-gray-100 rounded-xl px-4 py-4 text-base"
                                placeholder="Enter your email"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View className="mt-4">
                            <Text className="text-gray-700 mb-2 font-medium">
                                Password
                            </Text>
                            <TextInput
                                className="bg-gray-100 rounded-xl px-4 py-4 text-base"
                                placeholder="Enter your password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>

                        <TouchableOpacity
                            className={`rounded-xl py-4 mt-6 ${
                                signingIn ? "bg-gray-400" : "bg-green-600"
                            }`}
                            onPress={() => {
                                router.replace("/(tabs)");
                            }}
                            disabled={signingIn}
                        >
                            {signingIn ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text className="text-white text-center font-bold text-base">
                                    Sign In
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Index;
