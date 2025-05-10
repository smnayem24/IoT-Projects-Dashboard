'use client';

import { useState, useEffect } from 'react';
import { db } from '@/utils/firebase';
import { ref, set, onValue } from 'firebase/database';

export default function TestPage() {
  const [led1State, setLed1State] = useState(false);
  const [led2State, setLed2State] = useState(false);

  // Listen to LED states from Firebase
  useEffect(() => {
    const ledRef = ref(db, 'test/esp32_device');
    const unsubscribe = onValue(ledRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setLed1State(!!data.led1);
        setLed2State(!!data.led2);
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleLED = async (ledNumber: number) => {
    const newState = ledNumber === 1 ? !led1State : !led2State;
    
    try {
      // Update both LED states at once to maintain the other LED's state
      await set(ref(db, 'test/esp32_device'), {
        led1: ledNumber === 1 ? newState : led1State,
        led2: ledNumber === 2 ? newState : led2State,
        lastUpdated: new Date().toISOString()
      });

      console.log(`LED ${ledNumber} toggled to ${newState}`);
    } catch (error) {
      console.error('Error updating LED state:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">IoT Dashboard Test</h1>
      <div className="space-y-4">
        <div>
          <button
            onClick={() => toggleLED(1)}
            className={`px-4 py-2 rounded ${
              led1State ? 'bg-green-500' : 'bg-red-500'
            } text-white`}
          >
            LED 1: {led1State ? 'ON' : 'OFF'}
          </button>
        </div>
        <div>
          <button
            onClick={() => toggleLED(2)}
            className={`px-4 py-2 rounded ${
              led2State ? 'bg-green-500' : 'bg-red-500'
            } text-white`}
          >
            LED 2: {led2State ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>
    </div>
  );
}