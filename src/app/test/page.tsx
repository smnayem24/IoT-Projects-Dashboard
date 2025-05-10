'use client';

import { useState, useEffect } from 'react';
import { TestDeviceService, TestDeviceState } from '@/services/testDeviceService';
import { testConfig } from '@/utils/testConfig';

export default function TestPage() {
  const [deviceState, setDeviceState] = useState<TestDeviceState>({
    led1: false,
    led2: false,
    lastUpdated: new Date().toISOString()
  });

  // Listen to LED states from Firebase
  useEffect(() => {
    const unsubscribe = TestDeviceService.subscribeToDeviceState((state) => {
      setDeviceState(state);
    });

    return () => unsubscribe();
  }, []);

  const toggleLED = async (ledNumber: number) => {
    try {
      await TestDeviceService.updateLEDState(ledNumber, deviceState);
      console.log(`LED ${ledNumber} toggled`);
    } catch (error) {
      console.error('Error updating LED state:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">IoT Dashboard Test</h1>
      <div className="space-y-4">
        {/* Last update timestamp */}
        <p className="text-sm text-gray-600">
          Last updated: {new Date(deviceState.lastUpdated).toLocaleString()}
        </p>
        <div>
          <button
            onClick={() => toggleLED(1)}
            className={`px-4 py-2 rounded ${
              deviceState.led1 ? 'bg-green-500' : 'bg-red-500'
            } text-white`}
          >
            LED 1: {deviceState.led1 ? 'ON' : 'OFF'}
          </button>
        </div>
        <div>
          <button
            onClick={() => toggleLED(2)}
            className={`px-4 py-2 rounded ${
              deviceState.led2 ? 'bg-green-500' : 'bg-red-500'
            } text-white`}
          >
            LED 2: {deviceState.led2 ? 'ON' : 'OFF'}
          </button>
        </div>

        {/* Document the test setup */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg text-green-700">
          <h2 className="text-lg font-semibold mb-2">Test Project Information</h2>
          <p className="text-sm">This is an isolated test project that demonstrates:</p>
          <ul className="list-disc ml-5 text-sm">
            <li>Real-time LED control using Firebase Realtime Database</li>
            <li>Two-way communication between the web interface and simulated device</li>
            <li>State synchronization across multiple browser windows</li>
          </ul>          <p className="text-sm mt-2">
           {/**  Firebase path: <code className="bg-gray-200 px-1">{testConfig.devicePath}</code> */}
          </p>
          <p className="text-sm mt-2">
           {/* Database URL: <code className="bg-gray-200 px-1">{testConfig.testFirebaseConfig.databaseURL}</code> */}
          </p>
        </div>
      </div>
    </div>
  );
}