import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
const CaptchaSolver = () => {
  const [screenshotUrl, setScreenshotUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const solveCaptcha = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/recaptcha_demo?rootUrl=${query}`
      );
      setLoading(false);
      console.log(response, "captcha");
      setScreenshotUrl(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="captcha">
      <Link href="/">
        <button className="goBackButton">{"<"} go back</button>
      </Link>

      <section className="container">
        <label className="submitLabel">
          <input
            className="submitInput"
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="enter url"
            value={query}
          />
        </label>
        <button className="submit" onClick={solveCaptcha}>
          submit
        </button>
      </section>

      <div className="">
        <header className="header">Captcha Screenshot Result</header>
        {screenshotUrl ? (
          <img
            src={screenshotUrl}
            alt="Screenshot"
            width="500px"
            height="500px"
          />
        ) : (
          <p className="">{loading ? 'Loading...' : ''}</p>
        )}
      </div>
    </section>
  );
};

export default CaptchaSolver;
