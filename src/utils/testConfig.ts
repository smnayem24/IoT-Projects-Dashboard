// We'll use the main Firebase instance but with a different path for isolation
// This ensures the test project stays simple but isolated
export // Use same config but with explicit path for test project
    const testFirebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        databaseURL: "https://iot-projects-12454-default-rtdb.asia-southeast1.firebasedatabase.app"
    };

// Export test configuration
export const testConfig = {
    devicePath: 'test/esp32_device',
    testFirebaseConfig  // Export the config so it's accessible
};
