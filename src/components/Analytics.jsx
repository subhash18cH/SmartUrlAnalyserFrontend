import { Card } from '@mui/material';
import React, { PureComponent } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, Legend, Tooltip, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import Sidebar from './Sidebar';

const data = [
  { name: 'Desktop', value: 400 },
  { name: 'Tablet', value: 300 },
  { name: 'Mobile', value: 600 },
  { name: 'Unknown', value: 800 },
];

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

const lineData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 700 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Analytics = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-60 p-8">
        <div className="grid grid-cols-12 gap-6">

          <Card className="col-span-6 row-span-4 p-7">
            <h3 className="font-semibold text-xl mb-4">Clicks + scans by device</h3>
            <div className="h-96">
              <PieChart width={800} height={400}>
                <Pie
                  className=''
                  data={data}
                  cx="25%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={160}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
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
      </div>
    </div>
  );
};

export default Analytics;