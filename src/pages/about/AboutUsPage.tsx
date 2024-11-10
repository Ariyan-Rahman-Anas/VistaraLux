import { CircleCheck } from "lucide-react"
import whoWeAre from "./../../assets/images/whoWeAre.svg"
import aboutBanner from "./../../assets/images/aboutBanner.svg"
import SimilarProducts from "../../components/SimilarProducts"
import NewsLetterSubscription from "../../components/NewsLetterSubscription"
import usePageTitle from "../../customHooks/usePageTitle"

const AboutUsPage = () => {
    usePageTitle("About us")

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

    return (
        <div className="w-[95%] lg:w-[90%] mx-auto">
            <section className=" py-10 flex flex-col-reverse md:flex-row items-start justify-between gap-6 ">
                <div
                    data-aos="fade-right"
                    data-aos-duration="1000"
                    className="flex-1 section-grant p-4 ">
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

                <div
                    data-aos="fade-left"
                    data-aos-duration="1000"
                    className="flex-1">
                    <img src={whoWeAre} alt="about us image" className="w-full h-full rounded-r-md " />
                </div>
            </section>

            <section
                data-aos="zoom-in-up"
                data-aos-duration="1000"
                className="my-16 ">
                <h1 className="heading" >Meet our founding members</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {
                        foundingMembers?.map(member => <div key={member.id}
                            data-aos="zoom-in-up"
                            data-aos-duration="1000"
                            className="section-grant p-4 flex items-start justify-start gap-4 " >
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

            <section
                data-aos="zoom-out"
                data-aos-duration="1000"
                className="my-20 rounded-md  shadow hover:shadow-md duration-300 ">
                <div>
                    <img src={aboutBanner} alt="banner image" className="w-full h-full rounded-md dark:bg-gray-200 " />
                </div>
            </section>

            <section className="pt-12 my-16">
                <SimilarProducts />
            </section>

            <NewsLetterSubscription />
        </div>
    )
}
export default AboutUsPage