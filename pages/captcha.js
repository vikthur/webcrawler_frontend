import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
const CaptchaSolver = () => {
    const [screenshotUrl, setScreenshotUrl] = useState(null);


    const solveCaptcha = async () => {
        const response = await axios.get("http://localhost:4000/solve-captcha");
        console.log(response, "captcha")
        setScreenshotUrl(response.data.url);
    };


    return (

        <section className="captcha">

            <Link href="/">
                <button className="goBackButton">
                    {"<"} go back
                </button>
            </Link>

            <div className="">
                <button id="capButton" onClick={solveCaptcha}>Start captcha demo</button>
            </div>



            <div className="">

                <header className="header">Captcha Screenshot Result</header>
                {screenshotUrl ? (
                    <img src={screenshotUrl} alt="Screenshot" />
                ) : (
                    <p className="">Loading...</p>
                )}
            </div>
        </section>

    );
};

export default CaptchaSolver;


