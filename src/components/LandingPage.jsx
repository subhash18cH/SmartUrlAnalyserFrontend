import React from 'react';
import { Link } from 'react-router-dom';
import {
  LinkIcon,
  BarChart3,
  QrCode,
  ChevronRight,
  Globe,
  LineChart
} from 'lucide-react';
import Navbar from './Navbar';
import FeatureCard from './FeatureCard ';
import FeatureListItem from './FeatureListItem ';
const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <section className="pt-24  bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 mt-20">
                More than just shorter links
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                SmartUrl helps you create shorter, memorable links and track their performance with comprehensive analytics
              </p>
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-500 transition-colors inline-flex items-center group"
              >
                Start for Free
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<LinkIcon className="h-6 w-6 text-blue-600" />}
                title="Link Shortening"
                description="Transform long, unwieldy links into clean, memorable URLs that are easy to share and track."
              />
              <FeatureCard
                icon={<BarChart3 className="h-6 w-6 text-blue-600" />}
                title="Click Analytics"
                description="Track clicks, locations, and referring sources in real-time with detailed analytics."
              />
              <FeatureCard
                icon={<QrCode className="h-6 w-6 text-blue-600" />}
                title="QR Codes"
                description="Generate QR codes for your shortened links instantly for seamless offline-to-online experiences."
              />
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Powerful Analytics at Your Fingertips
                </h2>
                <ul className="space-y-4">
                  <FeatureListItem
                    icon={<Globe className="h-5 w-5 text-blue-600" />}
                    title="Geographic Data"
                    description="See where your clicks are coming from around the world"
                  />
                  <FeatureListItem
                    icon={<LineChart className="h-5 w-5 text-blue-600" />}
                    title="Click Tracking"
                    description="Monitor click patterns and engagement over time"
                  />
                  <FeatureListItem
                    icon={<BarChart3 className="h-5 w-5 text-blue-600" />}
                    title="Performance Insights"
                    description="Get detailed reports on link performance and user behavior"
                  />
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg">
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="h-20 bg-blue-100 rounded"></div>
                      <div className="h-20 bg-blue-100 rounded"></div>
                    </div>
                    <div className="h-32 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to get started?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust SmartUrl for their link management needs
            </p>
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-500 transition-colors inline-flex items-center group"
            >
              Create Free Account
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};
export default LandingPage;