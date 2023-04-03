import { useState } from "react";
import axios from "axios";
export default function Home() {
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState("");
  const [state, setState] = useState("");

  const handleChange = (event) => {
    console.log(event.target.value);
    setUrl(event.target.value);
  };

  const handleRequest = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:4000", { url })
      .then((response) => {
        setState("loading");

        console.log(response.data);
        setResponse(response.data[0]);
        setState("successful");
      })
      .catch((error) => {
        console.error(error);
      });

    e.target.value = "";
    setUrl("");
  };

  return (
    <>
      <form className="form" onSubmit={handleRequest}>
        <header>Web Crawler</header>
        <main className="formInput">
          <input
            className="input"
            type="text"
            placeholder="Add URL"
            value={url}
            onChange={handleChange}
          />
          <button>search</button>
        </main>
      </form>

      <aside className="result">
        <header className="resultHeader">
          <div>Result:</div>
        </header>
        <main>
          {state === "loading" ? (
            "loading ..."
          ) : state === "successful" ? (
            <div>
              <div
                style={{
                  color: "#000",
                  width: "80%",
                  lineHeight: 2,
                  margin: "auto",
                  listStyle: "none",
                  textAlign: "center",
                }}
              >
                <div>URL:</div> {response.url}
              </div>
              <header
                style={{
                  color: "#000",
                  width: "80%",
                  lineHeight: 2,
                  margin: "auto",
                  listStyle: "none",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    color: "#000",
                    width: "80%",
                    lineHeight: 2,
                    margin: "auto",
                    listStyle: "none",
                    textAlign: "center",
                  }}
                >
                  Title:
                </div>{" "}
                {response.title}
              </header>
              <div
                className="list"
                style={{
                  color: "#000",
                  width: "80%",
                  lineHeight: 2,
                  margin: "auto",
                  fontWeight: "600",
                  listStyle: "none",
                  textAlign: "center",
                }}
              >
                Links found:
              </div>
              <main>
                {response.linksFound.map((link, indx) => (
                  <li
                    className="list"
                    style={{
                      color: "#000",
                      width: "100%",
                      lineHeight: 2,
                      margin: "auto",
                      listStyle: "none",
                      textAlign: "start",
                    }}
                    l
                  >
                    <a
                      style={{
                        color: "#000",
                        fontWeight: 800,
                      }}
                      key={indx}
                      href={link}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </main>
            </div>
          ) : null}
        </main>
      </aside>
    </>
  );
}
