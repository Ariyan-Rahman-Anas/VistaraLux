import { useState } from "react";

const Toss = () => {
    const [angle, setAngle] = useState<number>(0);

    const flipCoin = () => {
        if (Math.random() > 0.5) setAngle((prev) => prev + 180);
        else setAngle((prev) => prev + 360);
    };

    return (
        <div className="dashboard-container">
            <main className="app-container">
                <h1 className="heading">Toss</h1>
                <section className="section-grant pt-16 pb-8 px-8 mb-4 flex items-center justify-center ">
                    <article
                        className="toss-coin"
                        onClick={flipCoin}
                        style={{
                            transform: `rotateY(${angle}deg)`,
                        }}
                    >
                        <div>
                            <h1>Heads</h1>
                        </div>
                        <div>
                            <h1>Tails</h1>
                        </div>
                    </article>
                </section>
            </main>
        </div>
    );
};

export default Toss;