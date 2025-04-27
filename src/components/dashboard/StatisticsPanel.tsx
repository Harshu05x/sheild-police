import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getStatistics } from '../../utils/complaintUtils';
import {
  Activity,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2
} from 'lucide-react';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const StatisticsPanel: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [chartData, setChartData] = useState<any>({
    labels: ['Pending', 'Resolved', 'Rejected'],
    datasets: [
      {
        data: [stats?.pending, stats?.resolved, stats?.rejected],
        backgroundColor: ['#FBBF24', '#10B981', '#EF4444'],
        borderColor: ['#F59E0B', '#059669', '#DC2626'],
        borderWidth: 1,
      },
    ],
  });
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stats = await getStatistics();
        console.log(stats);
        setStats(stats);
        setLoading(false);
        setChartData({
          labels: ['Pending', 'Resolved', 'Rejected'],
          datasets: [
            {
              data: [stats?.pending, stats?.resolved, stats?.rejected],
              backgroundColor: ['#FBBF24', '#10B981', '#EF4444'],
              borderColor: ['#F59E0B', '#059669', '#DC2626'],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-slide-in">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Activity className="h-5 w-5 text-purple-600 mr-2" />
        Complaint Statistics
      </h2>

      {
        loading ? ( 
          <div className="flex justify-center items-center h-full">
            <Loader2 className="h-5 w-5 text-purple-600 animate-spin" />
          </div>
        ) : (
          <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Complaints"
          value={stats.total}
          icon={<Activity className="h-5 w-5" />}
          colorClass="bg-purple-50 text-purple-700"
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          percentage={stats.pendingPercentage}
          icon={<Clock className="h-5 w-5" />}
          colorClass="bg-yellow-50 text-yellow-700"
        />
        <StatCard
          title="Resolved"
          value={stats.resolved}
          percentage={stats.resolvedPercentage}
          icon={<CheckCircle2 className="h-5 w-5" />}
          colorClass="bg-green-50 text-green-700"
        />
        <StatCard
          title="Rejected"
          value={stats.rejected}
          percentage={stats.rejectedPercentage}
          icon={<XCircle className="h-5 w-5" />}
          colorClass="bg-red-50 text-red-700"
        />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="w-full md:w-1/3 h-64">
          <Doughnut data={chartData} options={chartOptions} />
        </div>
        <div className="w-full md:w-2/3">
          <h3 className="text-lg font-medium text-gray-700 mb-3">Status Breakdown</h3>
          <div className="space-y-2">
            <ProgressBar
              label="Pending"
              percentage={stats.pendingPercentage}
              color="bg-yellow-500"
            />
            <ProgressBar
              label="Resolved"
              percentage={stats.resolvedPercentage}
              color="bg-green-500"
            />
            <ProgressBar
              label="Rejected"
              percentage={stats.rejectedPercentage}
              color="bg-red-500"
            />
          </div>
        </div>
      </div>
          </>
        )
      }
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  percentage?: number;
  icon: React.ReactNode;
  colorClass: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  percentage,
  icon,
  colorClass
}) => {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {percentage !== undefined && (
            <p className="text-xs text-gray-500">{percentage}% of total</p>
          )}
        </div>
        <div className={`${colorClass} p-3 rounded-full`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

interface ProgressBarProps {
  label: string;
  percentage: number;
  color: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, percentage, color }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-medium text-gray-700">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`${color} h-2.5 rounded-full transition-all duration-500 ease-in-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StatisticsPanel;