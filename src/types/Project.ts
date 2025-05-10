

export interface Project {
  id: string;
  name: string;
  description: string;
  widgets: Widget[];
  deviceId?: string;
  createdAt: Date;
  updatedAt: Date;
  owner: string;
  isSimulation: boolean;
  connectionStatus: 'connected' | 'disconnected' | 'error';
  lastDataUpdate?: Date;
  config: Record<string, any>;
  firebaseConfig?: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    databaseURL: string;
  };
}

export interface Widget {
  id: string;
  type: 'toggle' | 'slider' | 'graph'; // Add more types as needed
  label: string;
  config?: {
    min?: number;
    max?: number;
    dependsOn?: string; // ID of another widget this one depends on
    // Add any other configuration options needed for specific widget types
  };
}