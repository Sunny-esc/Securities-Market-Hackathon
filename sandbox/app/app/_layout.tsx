import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { LanguageProvider } from '../contexts/LanguageContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

function RootLayoutNav() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner text="Loading..." />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {user ? (
        // Authenticated user - show main app
        <>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="quiz/[moduleId]" />
        </>
      ) : (
        // Not authenticated - show auth flow
        <>
          <Stack.Screen name="intro" />
          <Stack.Screen name="auth/login" />
          <Stack.Screen name="auth/signup" />
        </>
      )}
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <RootLayoutNav />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
