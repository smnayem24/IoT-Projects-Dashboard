import { NextResponse } from 'next/server';
import { db } from '@/utils/firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    const { name, description } = await request.json();
    const docRef = await addDoc(collection(db, 'projects'), { name, description });
    return NextResponse.json({ id: docRef.id, name, description });
  } catch (error) {
    console.error('Error adding project:', error);
    return NextResponse.json({ error: 'Failed to add project' }, { status: 500 });
  }
}