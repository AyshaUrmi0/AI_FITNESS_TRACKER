import React from 'react';

const FeatureStep = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-white text-center p-6  rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
      <div className="text-4xl  mb-4">{icon}</div>
      <h3 className="text-xl font-bold  mb-2">{title}</h3>
      <p className="">{description}</p>
    </div>
  );
};

const HowItWorks = () => {
  const features = [
    {
      icon: "📝",
      title: "Sign Up & Set Goals",
      description: "Create your account and define your fitness goals to kickstart your journey.",
    },
    {
      icon: "💪",
      title: "Personalized Plans",
      description: "Receive tailored workout and diet plans designed just for you.",
    },
    {
      icon: "📊",
      title: "Track Progress",
      description: "Monitor your achievements with AI-powered insights and analytics.",
    },
    {
      icon: "💬",
      title: "AI Coach Support",
      description: "Chat or talk to your AI coach anytime for guidance and motivation.",
    },
  ];

  return (
    <div className=" py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center mb-10 text-orange-500">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureStep
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;