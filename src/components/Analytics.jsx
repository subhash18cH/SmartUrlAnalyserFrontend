import { Card } from '@mui/material';
import React, { PureComponent, useEffect, useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, Legend, Tooltip, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import Sidebar from './Sidebar';
import api from './Api';
import toast from 'react-hot-toast';

const barData = [
  {
    name: 'LinkedIn',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Facebook',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Twitter',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Google',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
];


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Analytics = () => {
  const [loading, setLoading] = useState(false);
  const [urls, setUrls] = useState([]);
  const [urlsLoaded, setUrlsLoaded] = useState(false);
  const [linkData, setLinkData] = useState([])

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
  const data = processDeviceData();

  const processClickData = () => {
    if (!linkData.length) return [];
    const clicksByDate = {};
    linkData.forEach(item => {
      const date = item.accessTime.split('T')[0];
      if (!clicksByDate[date]) {
        clicksByDate[date] = {
          date: date,
          clicks: 0
        };
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
  const lineChartData = processClickData();
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
        params: {
          shortUrl: shortUrl,
        }
      });
      if (response.status === 200) {
        setLinkData(response.data)
      }
    } catch (err) {
      toast.error('Failed to shorten URL');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserUrls();

  }, []);

  useEffect(() => {
    const token = localStorage.getItem("JWT")
    if (token && urlsLoaded && urls.length > 0) {
      getUrlsInfo();
    }
  }, [urlsLoaded, urls]);
  const isDataAvailable = linkData.length > 0 || urls.length > 0;
  return (
    <div className="min-h-screen ">
      <Sidebar />
      {<div className={`ml-60 p-8 ${!isDataAvailable ? 'filter blur-sm' : ''}`}>
        <div className="grid grid-cols-12 gap-6">
          <Card className="col-span-6 row-span-4 p-7">
            <h3 className="font-semibold text-xl mb-5">Clicks + scans by device</h3>
            <div className="h-96 flex items-center justify-center">
              <PieChart width={400} height={380}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={140}
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
                    paddingTop: "20px"
                  }}
                />
              </PieChart>
            </div>
          </Card>

          <Card className="col-span-6 row-span-4 p-6">
            <h3 className="font-semibold text-lg mb-4">Clicks + scans Over Time</h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={lineChartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="clicks"
                    name="Clicks + scans"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>


          <Card className={`col-span-12 p-6 blur-sm`}>
            <h3 className="font-semibold text-lg mb-4">i will do later</h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={barData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                  barSize={60}
                >
                  <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Bar dataKey="pv" fill="#8884d8" background={{ fill: '#eee' }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className={`col-span-12 p-6 filter blur-sm`}>
            <h3 className="font-semibold text-lg mb-4">Detailed Analytics</h3>
            <div className="h-32 bg-gray-50 rounded-lg" />
          </Card>
        </div>
      </div>}
    </div>
  );
};

export default Analytics;