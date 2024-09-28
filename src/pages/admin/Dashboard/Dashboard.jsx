import React from 'react';
import styles from './dashboard.module.css';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';

function Dashboard() {
  return (
    <div className={styles.page_container}>
      <div className={styles.container}>
        <BarChart
          xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
          series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
          width={500}
          height={300}
        />
      </div>
    </div>
  );
}

export default Dashboard;
