import { Platform, StatusBar, Text, View } from "react-native";

export default function HomeScreen() {
    const paddingTop =
        Platform.OS === "ios" ? 44 : StatusBar.currentHeight || 0;
    return (
        <>
            <View style={{ paddingTop }}>
                <Text>Hello World</Text>
            </View>
        </>
    );
}
