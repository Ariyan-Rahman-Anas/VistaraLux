import { FormEvent, useEffect, useState } from "react"
import AdminSidebar from "../../../components/adminDashboard/AdminSidebar"

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
const numbers = "1234567890"
const symbols = "!@#$%^&*()_+"

const Coupon = () => {

    const [size, setSize] = useState<number>(8)
    const [prefix, setPrefix] = useState<string>("")
    const [includeNumbers, setIncludeNumbers] = useState<boolean>(false)
    const [includeCharacters, setIncludeCharacters] = useState<boolean>(false)
    const [includeSymbols, setIncludeSymbols] = useState<boolean>(false)
    const [isCopied, setIsCopied] = useState<boolean>(false)
    const [coupon, setCoupon] = useState<string>("")

    const couponCopyHandler = async (coupon: string) => {
        await window.navigator.clipboard.writeText(coupon)
        setIsCopied(true)
    }

    const submitHandler = (e: FormEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (!includeNumbers && !includeCharacters && !includeSymbols) return alert("Please Select One At Least")
        let result: string = prefix || ""
        const loopLength: number = size - result.length
        for (let i = 0; i < loopLength; i++) {
            let entireString: string = ""
            if (includeNumbers) entireString += numbers
            if (includeCharacters) entireString += letters
            if (includeSymbols) entireString += symbols

            const randomNumber: number = ~~(Math.random() * entireString.length)
            result += entireString[randomNumber]
        }
        setCoupon(result)
    }

    useEffect(() => {
        setIsCopied(false)
    }, [coupon])

    return (
        <div className="dashboard-container">
            <main className="app-container">
                <h1 className="heading">Coupon</h1>
                <section className="section-grant pt-16 pb-8 px-8 mb-4 flex items-center justify-center flex-col gap-4" >
                    <form className="coupon-form w-full md:w-2/3 space-y-4" onSubmit={submitHandler} >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input
                                type="text"
                                placeholder="Text to include"
                                value={prefix}
                                onChange={(e) => setPrefix(e.target.value)}
                                maxLength={size}
                                className="text-input col-span-2"
                            />
                            <input
                                type="number"
                                placeholder="Coupon Length"
                                value={size}
                                onChange={(e) => setSize(Number(e.target.value))}
                                min={8}
                                max={25}
                                className="text-input col-span-2 md:col-span-1 "
                            />
                        </div>

                        <fieldset className="border-[1px] border-black/40 rounded-md px-4 py-2 ">
                            <legend>Include</legend>
                            <div className="flex items-center justify-around">
                                <div className="flex items-center gap-1">
                                    <input
                                        type="checkbox"
                                        checked={includeNumbers}
                                        onChange={() => setIncludeNumbers(prev => !prev)}
                                        className="cursor-pointer"
                                    />
                                    <span>Numbers</span>
                                </div>

                                <div className="flex items-center gap-1">
                                    <input
                                        type="checkbox"
                                        checked={includeCharacters}
                                        onChange={() => setIncludeCharacters(prev => !prev)}
                                        className="cursor-pointer"
                                    />
                                    <span>Characters</span>
                                </div>

                                <div className="flex items-center gap-1">
                                    <input
                                        type="checkbox"
                                        checked={includeSymbols}
                                        onChange={() => setIncludeSymbols(prev => !prev)}
                                        className="cursor-pointer"
                                    />
                                    <span>Symbols</span>
                                </div>
                            </div>
                        </fieldset>
                        <button type="submit" className="full-w-btn" >Generate</button>
                    </form>
                    {
                        coupon && <code className="relative text-center w-fit px-4 py-2 tracking-wider cursor-pointer group " >{coupon} <span onClick={() => couponCopyHandler(coupon)} className="opacity-0 group-hover:opacity-100 absolute top-0 left-0 rounded-md font-semibold h-full w-full text-white bg-black/80 " >{isCopied ? "Copied" : "Copy"} </span> </code>
                    }
                </section>
            </main>
        </div>
    )
}

export default Coupon