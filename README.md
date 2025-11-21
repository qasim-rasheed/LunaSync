# LunaSync - Cycle Syncing Planner

LunaSync is a holistic cycle-syncing lifestyle planner that uses AI to tailor your goals, workouts, and productivity to your natural biological rhythm.

## Features

- **Cycle Tracking**: Tracks Menstrual, Follicular, Ovulatory, and Luteal phases.
- **AI-Powered Planning**: Generates tailored, bite-sized action lists for Work, Movement, Nutrition, and Self-Care based on your specific interests and diet.
- **Interactive Dashboard**: Build your "Phase Plan" by selecting AI suggestions and organizing them on a drag-and-drop calendar.
- **Smart Calendar Sync**: Bulk export your entire phase plan to Google Calendar (.ics) or add specific "Save the Date" reminders for upcoming phases.
- **Lifestyle Integration**: Custom onboarding for diet, sleep chronotype, and interests.
- **Responsive Design**: Modern glassmorphism aesthetic with full Dark Mode support.

## Installation Guide

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

1.  **Node.js** (v18.0.0 or higher)
    * Required to run the React development environment.
    * [Download Node.js](https://nodejs.org/)
2.  **npm** (Node Package Manager)
    * Usually comes bundled with the Node.js installation.
3.  **Git**
    * Required to clone the repository.
    * [Download Git](https://git-scm.com/)

### 1. Clone the Repository

Open your terminal or command prompt and run:

```bash
git clone https://github.com/qasim-rasheed/LunaSync.git
cd LunaSync
```

### 2. Install Dependencies

Install the required libraries (React, Gemini SDK, Tailwind, etc.):

```bash
npm install
```

### 3. Configure Environment Variables

The app requires a Gemini API Key to generate personalized recommendations.

1. Create a file named `.env` in the root directory.
2. Add your API key to the file like this:

```env
GEMINI_API_KEY=your_actual_api_key_here
```

> **Note**: Do not put quotes around the key.

### 4. Run the Application

Start the local development server:

```bash
npm run dev
```

Open your browser and visit `http://localhost:3000`.

## Project Structure

- **`index.tsx`**: The entry point of the application.
- **`App.tsx`**: Main router and layout logic.
- **`pages/`**: Contains the Landing, Onboarding, How It Works, and Dashboard views.
- **`services/geminiService.ts`**: Handles interactions with the Gemini API.
- **`types.ts`**: TypeScript definitions for User Profile, Day Plans, and Calendar Events.