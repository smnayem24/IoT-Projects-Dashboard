import { NextResponse } from 'next/server';
import { db } from '@/utils/firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    const { name, description, widgets, deviceId, owner, isSimulation, connectionStatus, lastDataUpdate, config } = await request.json();

    if (!name || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const docRef = await addDoc(collection(db, 'projects'), {
      name,
      description,
      widgets: widgets || [],
      deviceId: deviceId || null,
      owner,
      isSimulation: isSimulation || false,
      connectionStatus: connectionStatus || 'disconnected',
      lastDataUpdate: lastDataUpdate || null,
      config: config || {}
    });

    return NextResponse.json({
      id: docRef.id,
      name,
      description,
      widgets: widgets || [],
      deviceId: deviceId || null,
      owner,
      isSimulation: isSimulation || false,
      connectionStatus: connectionStatus || 'disconnected',
      lastDataUpdate: lastDataUpdate || null,
      config: config || {}
    });
  } catch (error) {
    console.error('Error adding project:', error);
    return NextResponse.json({ error: 'Failed to add project' }, { status: 500 });
  }
}