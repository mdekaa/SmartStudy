// components/LineChart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const LineChart: React.FC = (props:any) => {
    const {label,title,datas}=props
    const data = {
        labels: label,
        datasets: [
            {
                label: title,
                data: datas,
                fill: false,
                // borderColor: 'rgb(75, 192, 192)',
                tension: 0.5,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                  ],
                  borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                  ],
                  borderWidth: 1
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'SCGPA Graph for each Subject',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                min: 0, // Minimum value for the y-axis
                max: 10, // Maximum value for the y-axis
            },
        }
    };

    return <Bar data={data} options={options} width={5} height={5}/>;
};

export default LineChart;
