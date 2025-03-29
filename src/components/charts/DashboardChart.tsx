
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';

type ChartType = 'bar' | 'line' | 'pie' | 'area';

interface DashboardChartProps {
  title: string;
  description?: string;
  type: ChartType;
  data: any[];
  xAxisKey: string;
  yAxisKey: string;
  height?: number;
  colors?: string[];
  formatter?: (value: any) => string;
  className?: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

const DashboardChart: React.FC<DashboardChartProps> = ({
  title,
  description,
  type,
  data,
  xAxisKey,
  yAxisKey,
  height = 300,
  colors = COLORS,
  formatter,
  className,
}) => {
  // Fonction pour rendre le bon type de graphique
  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisKey} />
              <YAxis />
              <Tooltip content={<CustomTooltip formatter={formatter} />} />
              <Legend />
              <Bar 
                dataKey={yAxisKey} 
                fill={colors[0]} 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'line':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisKey} />
              <YAxis />
              <Tooltip content={<CustomTooltip formatter={formatter} />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey={yAxisKey} 
                stroke={colors[0]} 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey={yAxisKey}
                nameKey={xAxisKey}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip formatter={formatter} />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      case 'area':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisKey} />
              <YAxis />
              <Tooltip content={<CustomTooltip formatter={formatter} />} />
              <Legend />
              <Area 
                type="monotone"
                dataKey={yAxisKey}
                stroke={colors[0]}
                fill={colors[0]}
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  const CustomTooltip = ({ active, payload, label, formatter }: any) => {
    if (active && payload && payload.length) {
      const value = formatter 
        ? formatter(payload[0].value) 
        : payload[0].value;
      
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-md">
          <p className="font-medium">{label}</p>
          <p className="text-sm">
            {payload[0].name}: {value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div style={{ height }}>
          {renderChart()}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardChart;
