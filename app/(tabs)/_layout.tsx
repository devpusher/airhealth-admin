import { Stack } from "expo-router";
import React from "react";

export default function TabLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    title: "Home",
                }}
            />
            <Stack.Screen
                name="settings"
                options={{
                    title: "Settings",
                    headerShown: true,
                    headerBackTitle: "Back",
                }}
            />
            <Stack.Screen
                name="screens/users"
                options={{
                    title: "Users",
                    headerShown: true,
                    headerBackTitle: "Back",
                }}
            />
        </Stack>
    );
}
