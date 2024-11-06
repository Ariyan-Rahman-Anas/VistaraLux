import { useSelector } from "react-redux"
import emailSubs from "./../assets/images/email-subs.svg"
import { selectAuthenticatedUser } from "../redux/reducers/userReducer"
import { useDoSubscribeMutation } from "../redux/api/subscriptionApi"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useEffect } from "react"

const NewsLetterSubscription = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const user = useSelector(selectAuthenticatedUser)

    const [doSubscribe, { data, isSuccess, isLoading, error }] = useDoSubscribeMutation()
    
    const handleSubscribe = async(formData) => {
        const payload = {
            name: formData.name,
            email: formData.email,
        }
        console.log("payload", payload)
        try {
            await doSubscribe(payload)
        } catch (error) {
            toast.error("Failed to do Subscribe")
        }
    }

    useEffect(() => {
        if (error?.data) {
            toast.error(error?.data?.message)
        }
        if (isSuccess) {
            toast.success(data?.message)
        }
    }, [data?.message, error?.data, isSuccess])


    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-x-10 gap-y-4 ">
            <div
                data-aos="fade-right"
                data-aos-duration="1000"
                className="border2 flex-1 ">
                <img src={emailSubs} alt="email subscription alarm" loading="lazy" className="w-full h-full" />
            </div>
            <div
                data-aos="fade-left"
                data-aos-duration="1000"
                className="flex-1">
                <h1 className="font-semibold text-xl" >Subscribe & Elevate Your Style</h1>
                <p className="text-sm mt-2 mb-4 ">Subscribe and stay connected with updates on premium products and luxury finds—right at your fingertips!</p>

                <form
                    onSubmit={handleSubmit(handleSubscribe)}
                    className="flex flex-col gap-4 ">
                    <div className="flex flex-col gap-0.5">
                        <input
                            type="text"
                            placeholder="e.g. Ariyan Rahman Anas"
                            className="text-input"
                            defaultValue={user?.name}
                            {...register("name", { required: "Please enter your name" })}
                        />
                        {errors.name && <span className="text-myRed font-semibold">{errors.name.message}</span>}
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <input
                            type="email"
                            placeholder="e.g. dev.m.ar.anas@gmail.com"
                            className="text-input"
                            defaultValue={user?.email}
                            {...register("email", {
                                required: "Please enter your email",
                                pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" }
                            })}
                        />
                        {errors.email && <span className="text-myRed font-semibold">{errors.email.message}</span>}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="primary-btn"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="spinner"></div>
                                <p>
                                    Subscription Loading
                                </p>
                            </div>
                        ) : (
                            "Subscribe"
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}
export default NewsLetterSubscription