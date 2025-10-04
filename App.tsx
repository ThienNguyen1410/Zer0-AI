/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import FloatCard from './src/components/cards/float-card';
import { colors } from './src/utils/colors';
import { useRenderTracker } from './src/hook/use-re-render-track';
import { useEffect, useState } from 'react';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const [renderCount, setRenderCount] = useState(0);

  useRenderTracker("AppContent");

  useEffect(() => {
    console.log("AppContent render count:", renderCount);
    if (renderCount < 3) {
      const timer = setTimeout(() => {
        setRenderCount(prev => prev + 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [renderCount]);

  return (
    <SafeAreaView style={styles.safeContainer} edges={['top', 'bottom', 'left', 'right']}>
      <View style={styles.appContainer}>
        <FloatCard />
        <FloatCard />
        <FloatCard />
        <FloatCard />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  appContainer: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colors.transparent,


  },
});

export default App;
