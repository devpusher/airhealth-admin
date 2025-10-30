import { Stack } from "expo-router";
import "react-native-reanimated";

export default function RootLayout() {
    return (
        // Initial route set to (auth) to show the login screen first
        <Stack initialRouteName="(auth)">
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    );
}
