import React from 'react';
import { Plus, Link, History, Settings, LogOut } from 'lucide-react';
import Sidebar from './Sidebar';

const Home = () => {
  const recentLinks = [
    { original: 'https://very-long-example-url.com/path/to/something/123', shortened: 'smart.url/abc123', clicks: 145, created: '2025-01-03' },
    { original: 'https://another-long-example.com/product/detail', shortened: 'smart.url/xyz789', clicks: 89, created: '2025-01-04' },
    { original: 'https://example-website.com/blog/article', shortened: 'smart.url/def456', clicks: 234, created: '2025-01-05' }
  ];

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        <Sidebar />

        <div className="flex justify-center">
          <div className="w-[80%] rounded-lg flex flex-col p-6 ml-64 mt-8">
            <h1 className="text-slate-800 text-3xl sm:text-4xl font-semibold mb-8">
              Dashboard
            </h1>

            {/* Create New URL Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 transition-all duration-300 hover:shadow-md">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Create New Short URL</h2>
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Paste your long URL here"
                  className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
                />
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 flex items-center transition-all duration-300 hover:shadow-md">
                  <Plus className="h-5 w-5 mr-2" />
                  Shorten
                </button>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">Total Links</h3>
                  <Link className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-3xl font-bold mt-3 text-gray-900">247</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">Total Clicks</h3>
                  <History className="h-8 w-8 text-emerald-600" />
                </div>
                <p className="text-3xl font-bold mt-3 text-gray-900">1,234</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">Active Links</h3>
                  <Link className="h-8 w-8 text-indigo-600" />
                </div>
                <p className="text-3xl font-bold mt-3 text-gray-900">180</p>
              </div>
            </div>

            {/* Recent Links Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">Recent Links</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-100">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Original URL</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Short URL</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Clicks</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Created</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {recentLinks.map((link, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 truncate max-w-md">
                          {link.original}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                          {link.shortened}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {link.clicks}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {link.created}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;