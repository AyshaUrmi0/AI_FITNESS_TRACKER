import FloatingAssistant from "../components/FloatingAssistant";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome to FitSync</h1>
      <p className="text-center mb-4">Your fitness companion with voice support!</p>

      {/* Floating voice assistant button */}
      <FloatingAssistant />
    </div>
  );
}
