
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.00c7d295594846da93349e0a90abef41',
  appName: 'Business-Buddy',
  webDir: 'dist',
  server: {
    url: 'https://00c7d295-5948-46da-9334-9e0a90abef41.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#ffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP"
    }
  },
  android: {
    allowMixedContent: true
  },
  ios: {
    contentInset: "always"
  }
};

export default config;
