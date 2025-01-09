import { Card } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, Legend, Tooltip, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import Sidebar from './Sidebar';
import api from './Api';
import toast from 'react-hot-toast';

const barData = [
  { name: 'LinkedIn', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Facebook', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Twitter', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Google', uv: 2780, pv: 3908, amt: 2000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Analytics = () => {
  const [loading, setLoading] = useState(false);
  const [urls, setUrls] = useState([]);
  const [urlsLoaded, setUrlsLoaded] = useState(false);
  const [linkData, setLinkData] = useState([]);

  const processDeviceData = () => {
    if (!linkData.length) return [];
    const deviceMap = linkData.reduce((acc, item) => {
      const deviceType = item.deviceType || 'Unknown';
      acc[deviceType] = (acc[deviceType] || 0) + item.clickCount;
      return acc;
    }, {});
    return Object.entries(deviceMap).map(([name, value]) => ({
      name,
      value
    }));
  };

  const processClickData = () => {
    if (!linkData.length) return [];
    const clicksByDate = {};
    linkData.forEach(item => {
      const date = item.accessTime.split('T')[0];
      if (!clicksByDate[date]) {
        clicksByDate[date] = { date, clicks: 0 };
      }
      clicksByDate[date].clicks += item.clickCount;
    });
    const sortedData = Object.values(clicksByDate).sort((a, b) =>
      new Date(a.date) - new Date(b.date)
    );
    return sortedData.map(item => ({
      name: new Date(item.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      }),
      clicks: item.clicks
    }));
  };

  const getUserUrls = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/url/user");
      if (response.status === 200) {
        setUrls(response.data);
        setUrlsLoaded(true);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getUrlsInfo = async () => {
    if (!urls.length) return;
    setLoading(true);
    try {
      const shortUrl = urls[0].shortUrl;
      const response = await api.get('/api/url/info', {
        params: { shortUrl }
      });
      if (response.status === 200) {
        setLinkData(response.data);
      }
    } catch (err) {
      toast.error('Failed to fetch URL information');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserUrls();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("JWT");
    if (token && urlsLoaded && urls.length > 0) {
      getUrlsInfo();
    }
  }, [urlsLoaded, urls]);

  const data = processDeviceData();
  const lineChartData = processClickData();
  const isDataAvailable = linkData.length > 0 || urls.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className={`sm:ml-52 p-4 sm:p-6 md:p-8 ${!isDataAvailable ? 'filter blur-sm' : ''}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          <Card className="lg:col-span-6 p-4 sm:p-6 md:p-7 mt-12">
            <h3 className="font-semibold text-lg sm:text-xl mb-4 sm:mb-5">
              Clicks + scans by device
            </h3>
            <div className="h-[300px] sm:h-[350px] md:h-[380px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={({ height }) => Math.min(height * 0.35, 140)}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{
                      paddingTop: "20px",
                      fontSize: '12px',
                      '@media (min-width: 640px)': {
                        fontSize: '14px'
                      }
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Time Analytics Card */}
          <Card className="lg:col-span-6 p-4 sm:p-6 mt-12">
            <h3 className="font-semibold text-lg sm:text-xl mb-4">
              Clicks + scans Over Time
            </h3>
            <div className="h-[300px] sm:h-[350px] md:h-[380px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={lineChartData}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Line
                    type="monotone"
                    dataKey="clicks"
                    name="Clicks + scans"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Bar Chart Card */}
          <Card className="lg:col-span-12 p-4 sm:p-6 blur-sm mt-12">
            <h3 className="font-semibold text-lg sm:text-xl mb-4">
              I will do later
            </h3>
            <div className="h-[300px] sm:h-[350px] md:h-[380px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barData}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 0,
                    bottom: 5,
                  }}
                  barSize={60}
                >
                  <XAxis
                    dataKey="name"
                    scale="point"
                    padding={{ left: 10, right: 10 }}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Bar dataKey="pv" fill="#8884d8" background={{ fill: '#eee' }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Detailed Analytics Card */}
          <Card className="lg:col-span-12 p-4 sm:p-6 filter blur-sm mt-12">
            <h3 className="font-semibold text-lg sm:text-xl mb-4">
              Detailed Analytics
            </h3>
            <div className="h-24 sm:h-32 bg-gray-50 rounded-lg" />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;