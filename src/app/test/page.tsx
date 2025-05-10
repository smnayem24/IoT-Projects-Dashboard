'use client';

import { useState } from 'react';
import { db } from '@/utils/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function TestPage() {
  const [led1State, setLed1State] = useState(false);
  const [led2State, setLed2State] = useState(false);

  const toggleLED = async (ledNumber: number) => {
    const newState = ledNumber === 1 ? !led1State : !led2State;
    
    try {
      await setDoc(doc(db, 'test', 'esp32_device'), {
        [`led${ledNumber}`]: newState,
        lastUpdated: new Date().toISOString()
      }, { merge: true });

      if (ledNumber === 1) {
        setLed1State(newState);
      } else {
        setLed2State(newState);
      }
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