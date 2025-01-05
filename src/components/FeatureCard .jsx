const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default FeatureCard