import { ThemeProvider } from "./components/ThemeProvider"
import { Toaster } from "sonner"
import Home from "./pages/Home"
import Particles from "./components/Particles"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen min-w-screen bg-background px-4 sm:px-6 py-6 relative font-sans">
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <Particles
            particleColors={['#6366f1', '#666666', '#10b981', '#f59e0b']}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={false}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Home />
        </div>
      </div>
      <Toaster position="top-center" theme="system" richColors />
    </ThemeProvider>
  )
}

export default App
