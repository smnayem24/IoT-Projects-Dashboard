export interface Project {
  id: string;
  name: string;
  description: string;
  type: string;
  // Add any other fields your projects might have
  data: Record<string, any>; // This allows for flexible, project-specific data
}