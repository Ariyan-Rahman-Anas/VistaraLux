import { DoughnutChart, PieChart } from "../../../components/adminDashboard/Charts"
import { usePieChartsQuery } from "../../../redux/api/dashboardApi"

const PieCharts = () => {

    const { data, isLoading } = usePieChartsQuery("")
    const pieChartsData = data?.pieCharts

    return (
        <div className="dashboard-container">
            <main className="chart-container overflow-y-auto ">
                <h1 className="heading">Pie & Doughnut Charts</h1>

                <section className="section-grant pt-8 pb-4 px-8 mb-4 chart-size">
                    <div className="max-w-[20rem] mx-auto ">
                        <PieChart
                            labels={["Processing", "Shipped", "Delivered"]} data={[pieChartsData?.orderFulfillment?.processing, pieChartsData?.orderFulfillment?.shipped, pieChartsData?.orderFulfillment?.delivered]}
                            bgColor={[`hsl(110, 80%, 80%)`,
                                `hsl(110,80%,50%)`,
                                `hsl(110,40%,50%)`
                            ]}
                            offset={[0, 0, 50]}
                        />
                    </div>
                    <h2 className="heading-down" >ORDER FULFILLMENT RATIO</h2>
                </section>

                <section className="section-grant pt-8 pb-4 px-8 mb-4 chart-size">
                    <div className="max-w-[20rem] mx-auto ">
                        <DoughnutChart
                            labels={pieChartsData?.productCategories?.map(category => Object.keys(category)[0])}
                            data={pieChartsData?.productCategories?.map(category => Object.values(category)[0])}
                            bgColor={pieChartsData?.productCategories?.map((category, index) => `hsl(${index * 592}, 70%, 50%)`)}
                            legends={false}
                            offset={[0, 50, 0, 0]}
                            cutout={"70%"}
                        />
                    </div>
                    <h2 className="heading-down" >PRODUCTS CATEGORY RATIO</h2>
                </section>

                <section className="section-grant pt-8 pb-4 px-8 mb-4 chart-size">
                    <div className="max-w-[20rem] mx-auto ">
                        <DoughnutChart
                            labels={["In Stock", "Out Of Stock"]}
                            data={[pieChartsData?.stockAvailability?.inStock, pieChartsData?.stockAvailability?.outOfStock]}
                            bgColor={["hsl(269,80%,40%)", "rgb(53,162,255)"]}
                            legends={false}
                            offset={[0, 80]}
                            cutout={"70%"}
                        />
                    </div>
                    <h2 className="heading-down" >STOCK AVAILABILITY</h2>
                </section>

                <section className="section-grant pt-8 pb-4 px-8 mb-4 chart-size">
                    <div className="max-w-[20rem] mx-auto ">
                        <DoughnutChart
                            labels={["Marketing Cost", "Discount", "Brunt", "Production Cost", "Net Margin"]}
                            data={[pieChartsData?.revenueDistribution?.marketingCost, pieChartsData?.revenueDistribution?.discount, pieChartsData?.revenueDistribution?.burnt, pieChartsData?.revenueDistribution?.productionCost, pieChartsData?.revenueDistribution?.netMargin]}
                            bgColor={["hsl(110,80%,40%)",
                                "hsl(19,80%,40%)",
                                "hsl(69,80%,40%)",
                                "hsl(300,80%,40%)",
                                "rgb(53,162,255)"]}
                            legends={false}
                            offset={[50, 10, 25, 18, 16]}
                        />
                    </div>
                    <h2 className="heading-down" >REVENUE DISTRIBUTION</h2>
                </section>

                <section className="section-grant pt-8 pb-4 px-8 mb-4 chart-size ">
                    <div className="max-w-[20rem] mx-auto ">
                        <PieChart
                            labels={[
                                "Teenager (Below 20)",
                                "Adult (Between 20-40)",
                                "Older (Above 40)"
                            ]}
                            data={[pieChartsData?.usersAgeGroups?.teen, pieChartsData?.usersAgeGroups?.adult, pieChartsData?.usersAgeGroups?.old]}
                            bgColor={[`hsl(10, 80%, 80%)`,
                                `hsl(10,80%,50%)`,
                                `hsl(10,40%,50%)`
                            ]}
                            offset={[30, 0, 0]}
                        />
                    </div>
                    <h2 className="heading-down" >USERS AGE GROUP</h2>
                </section>

                <section className="section-grant pt-8 pb-4 px-8 mb-4 chart-size">
                    <div className="max-w-[20rem] mx-auto ">
                        <DoughnutChart
                            labels={["Admin", "Customers"]}
                            data={[pieChartsData?.adminCustomer?.admins, pieChartsData?.adminCustomer?.customers,]}
                            bgColor={[
                                "hsl(335,100%,38%)",
                                "hsl(44, 95%,50%)",
                            ]}
                            offset={[30, 10]}
                        />
                    </div>
                </section>
            </main>
        </div>
    )
}
export default PieCharts