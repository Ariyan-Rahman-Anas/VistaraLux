import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
    ChartOptions,
    ArcElement,
    PointElement, 
    LineElement,
    Filler
} from 'chart.js';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    Filler
);

// bar chart
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
interface BarChartProps {
    horizontal?: boolean
    data_1: number[]
    data_2: number[]
    title_1: string
    title_2: string
    bgColor_1: string
    bgColor_2: string
    labels?: string[]
}
export const BarChart = ({ data_1 = [], data_2 = [], title_1, title_2, bgColor_1, bgColor_2, labels = months, horizontal = false }: BarChartProps) => {

    const options: ChartOptions<"bar"> = {
        responsive: true,
        indexAxis: horizontal ? "y" : "x",
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    };



    const data: ChartData<"bar", number[], string> = {
        labels,
        datasets: [
            {
                label: title_1,
                data: data_1,
                backgroundColor: bgColor_1,
                barThickness: "flex",
                barPercentage: 1,
                categoryPercentage: .4
            },
            {
                label: title_2,
                data: data_2,
                backgroundColor: bgColor_2,
                barThickness: "flex",
                barPercentage: 1,
                categoryPercentage: .4
            },
        ],
    };

    return <Bar options={options} data={data} />;
}


// doughnut chart
interface DoughnutChatProps {
    labels: string[]
    data: number[]
    bgColor: string[]
    cutout?: number | string
    legends?: boolean
    offset?: number[]
}
export const DoughnutChart = ({
    labels,
    data,
    bgColor,
    cutout,
    legends = true,
    offset }: DoughnutChatProps) => {

    const doughnutData: ChartData<"doughnut", number[], string> = {
        labels,
        datasets: [{
            data,
            backgroundColor: bgColor,
            borderWidth: 0,
            offset

        }]
    }

    const doughnutOptions: ChartOptions<"doughnut"> = {
        responsive: true,
        plugins: {
            legend: {
                display: legends,
                position: 'bottom',
                labels: {
                    padding: 40
                }
            }
        },
        cutout,
    }

    return <Doughnut data={doughnutData} options={doughnutOptions} />
}


// pie chart
interface PieChatProps {
    labels: string[]
    data: number[]
    bgColor: string[]
    offset?: number[]
}
export const PieChart = ({
    labels,
    data,
    bgColor,
    offset }: PieChatProps) => {

    const pieChartData: ChartData<"pie", number[], string> = {
        labels,
        datasets: [{
            data,
            backgroundColor: bgColor,
            borderWidth: 1,
            offset
        }]
    }

    const pieChartOptions: ChartOptions<"pie"> = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            }
        },
    }
    return <Pie data={pieChartData} options={pieChartOptions} />
}


// line chart
interface LineChartProps {
    horizontal?: boolean
    data: number[]
    label: string
    backgroundColor: string
    borderColor: string
    labels?:  string[]
}
export const LineChart = (
    {
        data = [],
        label,
        backgroundColor,
        borderColor,
        labels = months,
    }: LineChartProps) => {

    const options: ChartOptions<"line"> = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    };

    const lineChartData: ChartData<"line", number[], string> = {
        labels,
        datasets: [
            {
                fill:true,
                label,
                data,
                backgroundColor,
                borderColor

            }
        ],
    };
    return <Line options={options} data={lineChartData} />;
}