import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { AuthProvider, useAuth } from "./context/authContext";

function RootNavigator() {
    const { user } = useAuth();

    // Redirect depending on login status
    if (user === null) {
        return <Redirect href="/(auth)" />;
    } else {
        return <Redirect href="/(tabs)" />;
    }
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <StatusBar style="dark" />
            <RootNavigator />
            <Stack initialRouteName="(auth)">
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </AuthProvider>
    );
}
