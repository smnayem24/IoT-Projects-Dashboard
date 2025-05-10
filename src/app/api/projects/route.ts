import { NextResponse } from 'next/server';
import { db } from '@/utils/firebase';
import { ref, push, set } from 'firebase/database';

export async function POST(request: Request) {
  try {
    const { name, description, widgets, deviceId, owner, isSimulation, connectionStatus, lastDataUpdate, config } = await request.json();

    if (!name || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const projectsRef = ref(db, 'projects');
    const newProjectRef = push(projectsRef);
    const projectId = newProjectRef.key!;

    await set(newProjectRef, {
      id: projectId,
      name,
      description,
      widgets: widgets || [],
      deviceId: deviceId || null,
      owner,
      isSimulation: isSimulation || false,
      connectionStatus: connectionStatus || 'disconnected',
      lastDataUpdate: lastDataUpdate || null,
      config: config || {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }); return NextResponse.json({
      id: projectId,
      name,
      description,
      widgets: widgets || [],
      deviceId: deviceId || null,
      owner,
      isSimulation: isSimulation || false,
      connectionStatus: connectionStatus || 'disconnected',
      lastDataUpdate: lastDataUpdate || null,
      config: config || {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error adding project:', error);
    return NextResponse.json({ error: 'Failed to add project' }, { status: 500 });
  }
}