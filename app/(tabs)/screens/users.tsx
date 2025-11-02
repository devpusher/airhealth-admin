import {
    collection,
    getFirestore,
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { app } from "../../../firebaseConfig";
import "../../global.css";

export default function Users() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const db = getFirestore(app);

    useEffect(() => {
        const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const list: any[] = [];
            snapshot.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
            setUsers(list);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" />
                <Text className="text-gray-600 mt-2">Loading users...</Text>
            </View>
        );
    }

    if (users.length === 0) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-gray-600">No users found.</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={users}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 16 }}
            renderItem={({ item }) => (
                <View className="bg-white rounded-2xl p-4 mb-3 shadow">
                    <Text className="text-lg font-semibold text-gray-800">
                        {item.name || "Unnamed User"}
                    </Text>
                    <Text className="text-sm text-gray-500 mt-1">
                        {item.email}
                    </Text>
                    <Text className="text-xs text-gray-400 mt-2">
                        Joined:{" "}
                        {item.createdAt?.toDate
                            ? item.createdAt.toDate().toLocaleDateString()
                            : "Unknown date"}
                    </Text>
                </View>
            )}
        />
    );
}
