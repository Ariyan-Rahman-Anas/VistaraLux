import { LineChart } from "../../../components/adminDashboard/Charts"
import { useLineChartsQuery } from "../../../redux/api/dashboardApi"

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

const LineCharts = () => {

  const { data, isLoading } = useLineChartsQuery("")
  const lineChartsData = data?.lineCharts
  console.log("lineChartsData", lineChartsData)

  return (
    <div className="dashboard-container">
      <main className="chart-container">
        <h1 className="heading">Line Charts</h1>
        <section className="section-grant pt-8 pb-4 px-8 mb-4 chart-size">
          <LineChart
            label="Users"
            data={lineChartsData?.users?.map(user=>user)}
            borderColor="rgb(53,162,255)"
            backgroundColor="rgba(53,162,255,0.5)"
            labels={months} />
          <h2 className="heading-down">ACTIVE USERS</h2>
        </section>

        <section className="section-grant pt-8 pb-4 px-8 mb-4 chart-size">
          <LineChart
            label="Products"
            data={lineChartsData?.products?.map(product=>product)}
            backgroundColor="hsla(269, 80%, 40%, 0.4)"
            borderColor="hsl(269, 80%, 40%)"
            labels={months} />
          <h2 className="heading-down">TOTAL PRODUCTS (SKU)</h2>
        </section>


        <section className="section-grant pt-8 pb-4 px-8 mb-4 chart-size ">
          <LineChart
            label="Revenue"
            data={lineChartsData?.revenue?.map(i=>i)}
            backgroundColor="hsla(129, 80%, 40%, 0.4)"
            borderColor="hsl(129, 80%, 40%)"
            labels={months} />
          <h2 className="heading-down">TOTAL REVENUE</h2>
        </section>


        <section className="section-grant pt-8 pb-4 px-8 mb-4 chart-size">
          <LineChart
            label="Discount"
            data={lineChartsData?.discount?.map(i=>i)}
            backgroundColor="hsla(29, 80%, 40%, 0.4)"
            borderColor="hsl(29, 80%, 40%)"
            labels={months} />
          <h2 className="heading-down">DISCOUNT ALLOTTED</h2>
        </section>
      </main>
    </div>
  )
}
export default LineCharts