import { useEffect, useState } from "react"


const formateTime = (timeInSecond: number) => {
    const hours = String(Math.floor(timeInSecond / 3600))
    const minutes = String(Math.floor((timeInSecond % 3600) / 60))
    const seconds = String(timeInSecond % 60)

    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`
}

const Stopwatch = () => {

    const [time, setTime] = useState<number>(0)
    const [isRunning, setIsRunning] = useState<boolean>(false)

    const resetHandler = () => {
        setTime(0)
        setIsRunning(false)
    }

    useEffect(() => {
        let intervalId: number
        if (isRunning) {
            intervalId = setInterval(() => {
                setTime(prev => prev + 1)
            }, 1000)
        }

        return () => {
            clearInterval(intervalId)
        }

    }, [isRunning])

    return (
        <div className="dashboard-container">

            <main className="app-container">
                <h1 className="heading">Stopwatch</h1>
                <section className="section-grant pt-16 pb-8 px-8 mb-4 flex items-center justify-center ">
                    <div className="stopwatch">
                        <h2 className="heading" >{formateTime(time)}</h2>
                        <div className="flex items-center gap-8">
                            <button
                                onClick={() => setIsRunning(prev => !prev)}
                                className={`${isRunning ? "yellow" : "purple"} danger-btn`}
                            >{isRunning ? "Stop" : "Start"} </button>
                            <button onClick={resetHandler} className="primary-btn" >Reset</button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Stopwatch