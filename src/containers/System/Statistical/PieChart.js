import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './Statistical.scss'

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({sumMoney}) {
  const data = {
    labels: ['Phải trả', 'Nhận được', 'Tổng'],
    datasets: [
      {
        label: '# of Votes',
        data: [sumMoney-sumMoney*(90/100), sumMoney-sumMoney*(10/100), sumMoney],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
    return (
      <>
        <Pie data={data} />
        <div className='pie-chart'>
        <p className='sum'>Tổng: {`${sumMoney.toLocaleString()}VNĐ`}</p>
        <p className='take'>Nhận được: {`${(sumMoney-sumMoney*(10/100)).toLocaleString()}VNĐ`}</p>
        <p className='pay'>Phải trả: {`${(sumMoney-sumMoney*(90/100)).toLocaleString()}VNĐ`}</p>
        </div>
      </>
    );
}

export default PieChart;
