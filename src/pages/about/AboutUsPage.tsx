import { CircleCheck } from "lucide-react"
import whoWeAre from "./../../assets/images/whoWeAre.svg"
import aboutBanner from "./../../assets/images/aboutBanner.svg"
import emailSubs from "./../../assets/images/email-subs.svg"
import { useSelector } from "react-redux"
import { selectAuthenticatedUser } from "../../redux/reducers/userReducer"
import SimilarProducts from "../../components/SimilarProducts"

const AboutUsPage = () => {

    const foundingMembers = [
        {
            "id": 1,
            "name": "Ariyan Rahman Anas",
            "photo": "https://example.com/photos/amelia_profile.jpg",
            "designation": "CEO & Founder"
        },
        {
            "id": 2,
            "name": "Liam Chen",
            "photo": "https://example.com/photos/liam_profile.jpg",
            "designation": "Chief Technology Officer"
        },
        {
            "id": 3,
            "name": "Sophia Patel",
            "photo": "https://example.com/photos/sophia_profile.jpg",
            "designation": "Chief Marketing Officer"
        },
        {
            "id": 4,
            "name": "Ethan Kim",
            "photo": "https://example.com/photos/ethan_profile.jpg",
            "designation": "Head of Product"
        },
        {
            "id": 5,
            "name": "Olivia Garcia",
            "photo": "https://example.com/photos/olivia_profile.jpg",
            "designation": "Lead Designer"
        },
        {
            "id": 6,
            "name": "James Wang",
            "photo": "https://example.com/photos/james_profile.jpg",
            "designation": "Head of Operations"
        },
        {
            "id": 7,
            "name": "Mia Johnson",
            "photo": "https://example.com/photos/mia_profile.jpg",
            "designation": "Chief Financial Officer"
        },
        {
            "id": 8,
            "name": "Noah Lee",
            "photo": "https://example.com/photos/noah_profile.jpg",
            "designation": "Customer Success Manager"
        }
    ]

    const user = useSelector(selectAuthenticatedUser)

    return (
        <div>
            <section className="w-[95%] lg:w-[90%] mx-auto py-10 flex flex-col-reverse md:flex-row items-start justify-between gap-6 ">
                <div className="flex-1 section-grant p-4 ">
                    <h1 className="font-semibold text-xl bg-myBlue text-white w-fit p-3 rounded-tl-xl " >Who We Are</h1>
                    <p className="font-semibold mt-5 " ><span className=" text-xl font-semibold">✨ Welcome to Vistaralux </span><br /> – Your Ultimate Destination for Premium Shopping! ✨</p>
                    <p className="my-8" >Elevate your lifestyle with Vistaralux’s curated collection of quality essentials and luxury items. Exceptional value, effortless shopping—discover the best with us!</p>

                    <div className="flex items-center gap-2 mt-4  ">
                        <div className="space-y-2">
                            <CircleCheck color="white" fill="blue" />
                            <CircleCheck color="white" fill="blue" />
                            <CircleCheck color="white" fill="blue" />

                        </div>
                        <div className="space-y-2">
                            <p>Great 24/7 customer services.</p>
                            <p>600+ Dedicated employee.</p>
                            <p>50+ Branches all over the world.</p>
                        </div>
                    </div>

                </div>

                <div className="flex-1">
                    <img src={whoWeAre} alt="about us image" className="w-full h-full rounded-r-md " />
                </div>
            </section>

            <section className="w-[95%] md:w-[90%] mx-auto my-16 ">
                <h1 className="heading" >Meet our founding members</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {
                        foundingMembers?.map(member => <div key={member.id} className="section-grant p-4 flex items-start justify-start gap-4 " >
                            <div className="border rounded-full w-[4rem] h-[4rem] ">
                                <img src={member.photo} alt={member.name} className="w-full h-full rounded-full" />
                            </div>
                            <div>
                                <h1 className="font-bold" >{member.name}</h1>
                                <p className="text-sm">{member.designation} </p>
                            </div>
                        </div>)
                    }
                </div>
            </section>

            <section className="pt-12 my-16">
                <div>
                    <img src={aboutBanner} alt="banner image" />
                </div>
            </section>

            <section className="pt-12 my-16">
                <SimilarProducts />
            </section>

            <section className="p-4 flex flex-col md:flex-row items-center justify-between gap-x-10 gap-y-4 border- w-[95%] md:w-[90%] mx-auto ">
                <div className="border2 flex-1 ">
                    <img src={emailSubs} alt="email subscription alarm" className="w-full h-full" />
                </div>
                <div className="flex-1">
                    <h1 className="font-semibold text-xl" >Subscribe & Elevate Your Style</h1>
                    <p className="text-sm mt-2 mb-4 ">Subscribe and stay connected with updates on premium products and luxury finds—right at your fingertips!</p>

                    <form className="flex flex-col gap-4 ">
                        <input type="email" required placeholder="e.g. dev.m.ar.anas@gmail.com" className="text-input" defaultValue={user?.email} />
                        <button type="submit" className="primary-btn md:w-fit " >Subscribe</button>
                    </form>
                </div>
            </section>
        </div>
    )
}
export default AboutUsPage