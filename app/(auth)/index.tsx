import { useRouter } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
    collection,
    getDocs,
    getFirestore,
    query,
    where,
} from "firebase/firestore";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { app } from "../../firebaseConfig";
import "../global.css";

const Index = () => {
    const router = useRouter();
    const auth = getAuth(app);
    const db = getFirestore(app);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signingIn, setSigningIn] = useState(false);

    const handleSignIn = async () => {
        if (!email || !password) {
            Alert.alert("Missing fields", "Please fill in all fields.");
            return;
        }

        setSigningIn(true);

        try {
            // check firestore first if email has role = admin
            const q = query(
                collection(db, "users"),
                where("email", "==", email)
            );
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                Alert.alert("Access Denied", "Account not found.");
                setSigningIn(false);
                return;
            }

            const userData = querySnapshot.docs[0].data();

            if (userData.role !== "admin") {
                Alert.alert(
                    "Access Denied",
                    "You are not authorized to access this app."
                );
                setSigningIn(false);
                return;
            }

            // Admin only first
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log("Signed in as admin:", userCredential.user.email);

            router.replace("/(tabs)"); // navigate to main admin dashboard
        } catch (error: any) {
            console.error("Login Error:", error);
            Alert.alert("Login Failed", error.message);
        } finally {
            setSigningIn(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 bg-white"
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className="flex-1 justify-center px-8">
                    <View className="mb-10">
                        <Text className="text-4xl font-bold text-gray-800 mb-2 text-center">
                            AirHealth Admin
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
                            onPress={handleSignIn}
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
