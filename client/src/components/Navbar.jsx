import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">AI Fitness Tracker</h1>
        <ul className="flex gap-6">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/chat" className="hover:underline">AI Chat</Link></li>
          <li><Link to="/workout" className="hover:underline">Workout</Link></li>
          <li><Link to="/diet" className="hover:underline">Diet Plan</Link></li>
        </ul>
      </div>
    </nav>
  );
}
