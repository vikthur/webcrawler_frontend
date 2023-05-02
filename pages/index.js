import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleClear, handleReload } from "../utils/helperFunctions";
import Link from "next/link";
function App() {
  const [urlArray, setUrlArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [ip, setIp] = useState("");
  const [url, setUrl] = useState("");
  const [depth, setDepth] = useState("");

  // on component mount == fetch pagination and data
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/urls?page=${currentPage}`
        );

        setUrlArray(data.urls);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, [currentPage]);

  // pagination function
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSubmit = async () => {
    // clearing inputs after submission
    // setDepth("")
    // setUrl("")

    await axios
      .get(`http://localhost:4000/?url=${url}&depth=${depth}`)
      .then((response) => {
        setIp(response.data.ip);
      })
      .catch((error) => {
        // console.log('Error:', error.message);
      });
  };

  return (
    <div className="App">
      <ToastContainer />
      <h1 className="webCrawler">Web crawler</h1>
      <div className="captchaContainer">
        <Link href="/captcha">
          <button className="goBackButton">view ReCAPTCHA demo</button>
        </Link>
      </div>
      <main className="inputContainer">
        <div>
          <input
            type="text"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="input"
            placeholder="enter URL"
          />
        </div>

        <div>
          <input
            type="number"
            required
            value={depth}
            onChange={(e) => setDepth(e.target.value)}
            className="input"
            placeholder="enter  depth value"
          />
        </div>
      </main>

      <div className="submitContainer">
        <button onClick={handleSubmit} className="submit">
          submit
        </button>
      </div>

      <div className="controller">
        <div className="butCont">
          <button onClick={() => handleClear()}>Clear database</button>
          <button onClick={() => handleReload()}>Fetch data</button>
        </div>

        <div className="ipCont">
          <h2>current IP</h2>
          <div>{ip}</div>
        </div>
      </div>

      <div className="navCont">
        <h2>Navigation</h2>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <ul>
        {urlArray?.map((item) => (
          <>
            <li key={item._id} id="url_header">
              <div className="url_title">
                <h3>Page Title</h3>
                <p>{item.title}</p>
              </div>
              <div className="url_title">
                <h3>Page Header</h3>

                <p>{item.header}</p>
              </div>
            </li>
            <main className="urlContainer">
              {item.urls?.map((item) => (
                <a href={item} className="url">
                  {item}
                </a>
              ))}
            </main>
          </>
        ))}
      </ul>
    </div>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="paginate_container">
      {pages.map((page) => (
        <button
          className="paginate_buttons"
          key={page}
          onClick={() => onPageChange(page)}
          disabled={currentPage === page}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export default App;
