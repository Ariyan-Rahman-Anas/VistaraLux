import { BarChart } from '../../../components/adminDashboard/Charts';
import { useBarChartsQuery } from '../../../redux/api/dashboardApi';

const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
]

const BarCharts = () => {

    const { data, isLoading } = useBarChartsQuery("")
    const barChartsData = data?.barCharts

    return (
        <div className="dashboard-container" >
            <main className="chart-container">
                <h1 className="heading">Bar Charts</h1>
                <section className="section-grant pt-8 pb-4 px-8 mb-4 chart-size">
                    <BarChart
                        data_1={barChartsData?.products?.map(product=>product)}
                        data_2={barChartsData?.users?.map(user=>user)}
                        title_1="Products"
                        title_2="Users"
                        bgColor_1={`hsl(26,50%,30%)`}
                        bgColor_2={`hsl(360, 90%, 90%)`}
                    />
                    <h2 className="heading-down">TOP SELLING PRODUCTS AND TOP CUSTOMERS</h2>
                </section>

                <section className="section-grant pt-8 pb-4 px-8 mb-4 chart-size">
                    <BarChart
                        horizontal={true}
                        data_1={barChartsData?.orders?.map(order=>order)}
                        data_2={[]}
                        title_1="Products"
                        title_2=""
                        bgColor_1={`hsl(180,40%,50%)`}
                        bgColor_2=""
                        labels={months}
                    />
                    <h2 className="heading-down">ORDER THROUGHOUT THE YEAR</h2>
                </section>
            </main>
        </div>
    )
}
export default BarCharts