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

  const lineData = [
    { name: 'Jan', value: 20 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
    { name: 'Jun', value: 700 },
  ];


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

  const getUserUrls = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/url/user");
      if (response.status === 200) {
        console.log("r1-----", response.data)
        setUrls(response.data);
        setUrlsLoaded(true);
      }
    } catch (error) {
      toast.error('Failed to fetch URLs');
    } finally {
      setLoading(false);
    }
  };

  const getUrlsInfo = async () => {
    if (!urls.length) return;
    setLoading(true);
    try {
      const shortUrl = urls[0].shortUrl;
      console.log("sss--" + shortUrl)
      const response = await api.get('/api/url/info', {
        params: {
          shortUrl: shortUrl,
        }
      });
      if (response.status === 200) {
        setLinkData(response.data)
        console.log("res2-------", response.data);
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
    else {
      console.log("use2eeee---------")
    }
  }, [urlsLoaded, urls]);

  return (
    <div className="min-h-screen ">
      <Sidebar />
      {<div className="ml-60 p-8">
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
            <h3 className="font-semibold text-lg mb-4">Quick Stats</h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={lineData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="col-span-12 p-6">
            <h3 className="font-semibold text-lg mb-4">Activity Feed</h3>
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

          <Card className="col-span-12 p-6">
            <h3 className="font-semibold text-lg mb-4">Detailed Analytics</h3>
            <div className="h-32 bg-gray-50 rounded-lg" />
          </Card>
        </div>
      </div>}
    </div>
  );
};

export default Analytics;