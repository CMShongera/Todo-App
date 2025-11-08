# Todo App

A modern, responsive todo application built with React and TypeScript. Manage your daily tasks with style and efficiency.

## Live

Try the live demo: https://shonaprincetechnologies-todo-app.vercel.app/

## ✨ Features

- ✅ **Add, edit, and delete tasks** - Complete task management
- 🎯 **Mark tasks as completed** - Track your progress
- 📱 **Responsive design** - Works on desktop and mobile
- 🌙 **Dark/Light mode** - Choose your preferred theme
- 🎉 **Confetti celebrations** - Celebrate task completion
- 💾 **Mock API integration** - Simulates real backend interactions
- ⚡ **Loading states** - Smooth user experience with loading indicators
- 🚨 **Error handling** - Graceful error management and retry functionality

## 🚀 Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Beautiful, accessible UI components
- **Lucide React** - Modern icon library
- **Sonner** - Toast notifications
- **React Confetti Boom** - Celebration animations

## 📦 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/CMShongera/Todo-App.git
   cd todo-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

## 🏃‍♂️ Running the Application

### Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

### Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
# or
pnpm preview
```

## 🎯 Usage

### Adding a Task

1. Click the "Add Todo" button
2. Enter a title and description
3. Click "Add Todo" to save

### Managing Tasks

- **Complete a task**: Click the checkbox next to the task
- **Edit a task**: Click the edit icon and modify the details
- **Delete a task**: Click the delete icon

### Theme Toggle

Click the theme toggle button in the top right to switch between light and dark modes.

## 🔧 Available Scripts

| Script               | Description                   |
| -------------------- | ----------------------------- |
| `npm run dev`        | Start development server      |
| `npm run build`      | Build for production          |
| `npm run start`      | Start production server       |
| `npm run lint`       | Run ESLint                    |
| `npm run lint:fix`   | Fix ESLint issues             |
| `npm run type-check` | Run TypeScript compiler check |

## 🎨 Customization

### Themes

The app supports light, dark, and system themes. Themes are managed using CSS variables and can be customized in `styles/globals.css`.
