import { NextResponse } from 'next/server';
import { db } from '@/utils/firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    const { name, description, type, data } = await request.json();
    
    if (!name || !description || !type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const docRef = await addDoc(collection(db, 'projects'), {
      name,
      description,
      type,
      data: data || {}
    });

    return NextResponse.json({ 
      id: docRef.id, 
      name, 
      description, 
      type, 
      data: data || {} 
    });
  } catch (error) {
    console.error('Error adding project:', error);
    return NextResponse.json({ error: 'Failed to add project' }, { status: 500 });
  }
}