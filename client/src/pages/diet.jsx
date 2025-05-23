export default function Diet() {
  return (
      <div className="p-4 md:p-6 text-black min-h-screen ">
          <div className="max-w-[1200px] mx-auto w-full">
              <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                  Meal Analysis & Workout Suggestions
              </h1>

              {/* Responsive iframe */}
              <div className="relative w-full pt-[56.25%] mb-6"> {/* 16:9 aspect ratio */}
                  <iframe
                      src="https://peshimaammuzammil-healthapp.hf.space"
                      frameBorder="0"
                      className="absolute top-0 left-0 w-full h-full rounded shadow"
                      allowFullScreen
                      title="Health App"
                  />
              </div>

              <div className="bg-white rounded-lg shadow p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-semibold mb-3">Need More Help?</h2>
                  <p className="mb-3">
                      For a more specific workout plan, consider:
                  </p>
                  <ul className="list-disc pl-5 mb-4">
                      <li>Visiting our gyms</li>
                      <li>Consulting with a personal trainer</li>
                  </ul>
                  <button 
                      onClick={() => window.location.href = '/chat'}
                      className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                  >
                      Chat with a Trainer
                  </button>
              </div>
          </div>
      </div>
  );
}
