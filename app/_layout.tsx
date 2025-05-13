// Path: app\_layout.tsx
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import store from '../redux/store';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Stack>
        {/* SplashScreen as the initial screen */}
        <Stack.Screen name="splash" options={{ headerShown: false }} />
        
        {/* Main tabs screen */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        
        {/* Not Found screen */}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </Provider>
  );
}