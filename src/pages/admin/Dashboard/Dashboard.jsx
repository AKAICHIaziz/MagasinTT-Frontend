import React from 'react';
import styles from './dashboard.module.css';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';

function Dashboard() {
  return (
    <div className={styles.page_container}>
      <div className={styles.container}>
        <div className={styles.stat_container}>
          <BarChart
            series={[
              { data: [35, 44, 24, 34] },
              { data: [51, 6, 49, 30] },
              { data: [15, 25, 30, 50] },
              { data: [60, 50, 15, 25] },
            ]}
            height={290}
            xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          />
        </div>
        <div className={styles.stat_container}>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.stat_container}>
        </div>
        <div className={styles.stat_container}>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: 'series A' },
                  { id: 1, value: 15, label: 'series B' },
                  { id: 2, value: 20, label: 'series C' },
                ],
              },
            ]}
            width={400}
            height={200}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
