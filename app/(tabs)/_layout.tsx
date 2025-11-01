import { Stack } from "expo-router";
import React from "react";

export default function TabLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                headerBackTitle: "Back",
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
                }}
            />
        </Stack>
    );
}
