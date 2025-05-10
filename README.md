# IoT Dashboard Platform

A comprehensive platform for creating, managing, and simulating IoT projects with real-time control capabilities, combining the power of web interfaces with Wokwi simulation.

## 🎯 Platform Overview

This platform enables users to:

1. Create and manage IoT projects through a web interface
2. Design custom project dashboards using drag-and-drop widgets
3. Control simulated IoT devices in real-time
4. Connect their own Firebase instance for secure device communication

## 🏗️ System Architecture

The platform consists of three main components:

### 1. Web Dashboard (Next.js)

- User authentication and project management
- Customizable project dashboards
- Drag-and-drop widget system
- Real-time device state monitoring
- Firebase integration for device communication

### 2. Device Simulation (Wokwi + VS Code)

- IoT device simulation using Wokwi
- VS Code integration for code development
- Real-time communication with the web dashboard
- Support for various IoT devices and sensors

### 3. Communication Layer (Firebase)

- User-provided Firebase instance for each project
- Real-time database for state synchronization
- Secure communication between dashboard and simulation
- Independent credential management per project

## 🔄 Workflow

1. **Project Creation**

   - User creates an account on the platform
   - Creates a new IoT project
   - Configures project settings and Firebase credentials

2. **Dashboard Design**

   - Add widgets to the project dashboard
   - Configure widget properties and behaviors
   - Available widgets include:
     - Switches
     - Buttons
     - Sensors readings
     - Charts and graphs
     - Custom controls

3. **Device Simulation**

   - Set up Wokwi simulation in VS Code
   - Configure Firebase communication in the device code
   - Run simulation to test device behavior

4. **Real-time Interaction**
   - Control simulated devices through the web dashboard
   - Monitor device states and sensor readings
   - Analyze device performance and behavior

## 🎯 Automated Configuration System

The platform includes an intelligent automation system that:

### Firebase Auto-Configuration

- Automatically creates necessary collections and fields in Firebase
- Sets up database structure based on selected widgets
- Generates and configures security rules
- Provides guided setup for Firebase credentials

### Widget-Driven Database Structure

- Each widget type has a predefined database schema
- Adding a widget automatically creates required database fields
- Example automations:
  ```
  Switch Widget → creates: {projectId}/devices/{deviceId}/switches/{switchId}
  Sensor Widget → creates: {projectId}/devices/{deviceId}/sensors/{sensorId}/readings
  Chart Widget → creates: {projectId}/devices/{deviceId}/analytics/{metricId}
  ```

### Developer Experience

- No manual database setup required
- Automatic code generation for simulation
- Pre-configured Firebase rules templates
- Built-in validation and error checking

## 🔐 Security Model

- Each project uses its own Firebase instance
- Users manage their own Firebase credentials
- Platform acts as a mediator without storing sensitive credentials
- Secure communication between all components

## 🧩 Widget System

The platform provides a flexible widget system that allows:

- Adding multiple widgets to a project dashboard
- Customizing widget appearance and behavior
- Real-time state synchronization with devices
- Data visualization and analytics capabilities

## 🔄 Platform Extensibility

### Widget Development

- Modular widget architecture
- Standard interface for creating new widgets
- Automated database schema generation
- Built-in testing framework

### Database Integration

- Each new widget automatically:
  1. Defines its database requirements
  2. Creates necessary structures
  3. Sets up real-time listeners
  4. Configures security rules

### Custom Widgets

- Developers can create custom widgets
- Platform provides:
  - Widget development toolkit
  - Database schema generator
  - Auto-configuration helpers
  - Documentation generator

## 🛠️ Technical Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Simulation**: Wokwi, VS Code
- **Communication**: Firebase Realtime Database
- **Authentication**: Firebase Auth
- **State Management**: React Hooks
- **Real-time Updates**: Firebase Listeners

## 🚀 Development Setup

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the platform in action.

## 📝 Project Structure

```
my-iot-dashboard/
├── src/
│   ├── app/              # Next.js pages and API routes
│   ├── components/       # React components including widgets
│   ├── hooks/           # Custom React hooks
│   ├── services/        # Backend services
│   ├── types/           # TypeScript definitions
│   └── utils/           # Utility functions
```

## 🔮 Future Enhancements

- Advanced analytics dashboard
- More widget types and customization options
- Support for physical IoT devices
- Data logging and history tracking
- Multiple simulation environments
- Custom widget creation interface
