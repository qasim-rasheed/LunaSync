# LunaSync - Cycle Syncing Planner

LunaSync is a holistic cycle-syncing lifestyle planner that uses AI (Google Gemini) to tailor your goals, workouts, and productivity to your natural biological rhythm.

## Features

- **Cycle Tracking**: Tracks Menstrual, Follicular, Ovulatory, and Luteal phases.
- **AI Recommendations**: Daily advice for nutrition, workouts, and productivity.
- **Lifestyle Integration**: Custom onboarding for diet, sleep chronotype, and interests.
- **Calendar Integration**: Generate Google Calendar events for wellness activities.
- **Responsive Design**: Pastel aesthetic with full Dark Mode support.

## Installation Guide

### 1. Clone the Repository

Open your terminal or command prompt and run:

```bash
git clone <your-repo-url>
cd lunasync
```

### 2. Install Dependencies

Install the required libraries (React, Gemini SDK, Tailwind, etc.):

```bash
npm install
```

### 3. Configure Environment Variables

The app requires a Gemini API Key to generate recommendations.

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
- **`pages/`**: Contains the Landing, Onboarding, and Dashboard views.
- **`services/geminiService.ts`**: Handles interactions with the Google Gemini API.
- **`constants.ts`**: Configuration for interests, symptoms, and lifestyle options.
