import { Bell, Search, TrendingDown, TrendingUp } from "lucide-react"
import { BarChart, DoughnutChart } from "../../../components/adminDashboard/Charts"
import maleFemaleIcon from "./../../../assets/maleFemaleIcon.png"
import DashboardTable from "../../../components/adminDashboard/DashboardTable"
import { useStatsQuery } from "../../../redux/api/dashboardApi"
import { useEffect, useRef } from "react"
import { toast } from "sonner"
import { SkeletonWidgetItem } from "../../../components/adminDashboard/adminDashboardSkeletons/SkeletonWidgetItem "

function AdminDashboard() {

    const { data, isLoading, isError, error } = useStatsQuery("")
    const stats = data?.adminDashboardStats 
    console.log("Res", stats?.auditPercentages)
    
    return (
        <div className="dashboard-container " >
            <main >
                <section id="top-search-section" className="flex items-center  w-full py-2  ">
                    <div className="flex items-center gap-2 w-full">
                        <Search />
                        <input type="text" placeholder="Search for data users, docs" className=" bg-inherit w-full p-1 outline-none  " />
                    </div>
                    <div className="flex items-center gap-4 ">
                        <Bell />
                        <div className="h-8 w-8">
                            <img src="https://icon-library.com/images/account-icon-png/account-icon-png-10.jpg" alt="user icon" className="h-full w-full" />
                        </div>
                    </div>
                </section>
                <hr className="hr" />

                <section id="widget-section" className="my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
                    <WidgetItem percent={stats?.auditPercentages.revenue} amount={true} value={stats?.revenue} heading="Revenue" color="rgb(0,115,255)" />

                    <WidgetItem percent={stats?.auditPercentages.order} value={stats?.audit.users} heading="Users" color="rgb(0,198,202)" />
                    <WidgetItem percent={stats?.auditPercentages.order} value={stats?.audit.orders} heading="Transaction" color="rgb(255,196,0)" />
                    <WidgetItem percent={stats?.auditPercentages.product} value={stats?.audit.products} heading="Products" color="rgb(76, 0,255)" />
                </section>

                <section id="graph-section" className="graph-container my-4 grid grid-cols-1 md:grid-cols-10 gap-4 ">
                    <div className="revenue-chart col-span-1 md:col-span-7 pt-0 pb-4 px-8 section-grant">
                        <h2 className="heading" >Revenue & Transaction</h2>
                        <BarChart
                            data_1={stats?.charts.revenue}
                            data_2={stats?.charts.order}
                            title_1="Revenue"
                            title_2="Transaction"
                            bgColor_1="rgb(0,115,255)"
                            bgColor_2="rgba(53,162,235, 0.8)"
                        />
                    </div>
                    <div className="categories min-h-full col-span-1 md:col-span-3 pt-0 pb-4 px-8 section-grant">
                        <h2 className="heading">Inventory</h2>
                        <div>
                            {stats?.categoryCount?.map((item, index) => {
                                const [heading, value ] = Object.entries(item)[0]
                                return (
                                    <CategoryItem
                                        key={index}
                                        heading={heading}
                                        value={value}
                                        color={`hsl(${value * 4}, ${value}%,50%)`} 
                                    />
                                )
                            })}
                        </div>
                    </div>
                </section>

                <section id="transaction-section" className="transaction-container my-4 grid grid-cols-1 md:grid-cols-10 gap-4">
                    <div className="gender-chart p-2 relative col-span-1 md:col-span-4 section-grant">
                        <h2 className="heading">Gender Ratio</h2>
                        <DoughnutChart
                            labels={["Female", "Male"]}
                            data={[stats?.userRatio.female, stats?.userRatio.male]}
                            bgColor={["hsl(340,82%, 56%)", "rgba(53,162,235,0.8)"]}
                            cutout={100}
                        />
                        <img src={maleFemaleIcon} alt="male female icon" className="absolute top-[50%] left-[45%] translate-[-50%, 50%] h-[2.5rem] w-[2.5rem] " />
                    </div>
                    <div className="table col-span-1 md:col-span-6 section-grant px-4 ">
                        <DashboardTable />
                    </div>
                </section>
            </main>
        </div>
    )
}


interface WidgetItemProps {
    heading: string,
    value: number,
    percent: number,
    color: string,
    amount?: boolean
}
const WidgetItem = ({ heading, value, percent, color, amount = false }: WidgetItemProps) => {
    const isLoading = !value;  // Example loading state check

    if (isLoading) {
        return <SkeletonWidgetItem />;
    }
    return (
        <article className="flex items-center justify-between gap-4 p-4 section-grant">
            <div>
                <p className="opacity-70">{heading} </p>
                <h4 className="text-xl font-bold opacity-80 ">
                    {amount ? `$${value}` : value}
                </h4>
                {
                    percent > 0
                        ? <span className="flex items-center gap-3 text-green-500">
                            <TrendingUp />
                            <span>+{`${percent > 10000 ? 9999 : percent}%`}</span>
                        </span>
                        : <span className="flex items-center gap-3 text-red-500">
                            <TrendingDown />
                            <span>{`${percent < -10000 ? -9999 : percent}%`}</span>
                        </span>
                }
            </div>
            <div className="relative h-[5rem] w-[5rem] rounded-full grid place-items-center bg-green-500 flex-none" style={{
                background: `conic-gradient(${color} ${Math.abs(percent) / 100 * 360}deg, rgb(255,255,255)0)`
            }}>
                <div className="absolute w-16 h-16 bg-white rounded-full"></div>
                <span color={color} className="relative">
                    {percent > 0 && `${percent > 10000 ? 9999 : percent}%`}
                    {percent < 0 && `${percent < -10000 ? -9999 : percent}%`}
                </span>
            </div>
        </article>
    );
};



interface CategoryItem {
    color: string
    value: number
    heading: string
}
const CategoryItem = ({ color, value, heading }: CategoryItem) =>
    <div className="category-item flex items-center justify-between gap-4 my-6 ">
        <h5 className="text-gray-700 text-sm capitalize ">{heading}</h5>
        <div className="w-[6rem] bg-gray-300 rounded-md h-[.5rem] flex-none ">
            <div style={{
                backgroundColor: color,
                width: `${value}%`
            }} className="rounded-md h-full" ></div>
        </div>
        <span className="font-semibold text-sm ">{value}%</span>
    </div>
export default AdminDashboard