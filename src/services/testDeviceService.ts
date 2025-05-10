import { ref, set, onValue } from 'firebase/database';
import { db } from '@/utils/firebase';
import { testConfig } from '@/utils/testConfig';

export interface TestDeviceState {
    led1: boolean;
    led2: boolean;
    lastUpdated: string;
}

export class TestDeviceService {
    private static readonly TEST_DEVICE_PATH = testConfig.devicePath; static getDeviceRef() {
        return ref(db, this.TEST_DEVICE_PATH);
    }

    static subscribeToDeviceState(callback: (state: TestDeviceState) => void) {
        const deviceRef = this.getDeviceRef();
        return onValue(deviceRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                callback({
                    led1: !!data.led1,
                    led2: !!data.led2,
                    lastUpdated: data.lastUpdated || new Date().toISOString()
                });
            }
        });
    }

    static async updateLEDState(ledNumber: number, currentState: TestDeviceState) {
        const newLEDState = ledNumber === 1 ? !currentState.led1 : !currentState.led2;
        const deviceRef = this.getDeviceRef();

        await set(deviceRef, {
            led1: ledNumber === 1 ? newLEDState : currentState.led1,
            led2: ledNumber === 2 ? newLEDState : currentState.led2,
            lastUpdated: new Date().toISOString()
        });

        return newLEDState;
    }
}
