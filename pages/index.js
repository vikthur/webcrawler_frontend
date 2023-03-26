import Head from "next/head";

export default function Home() {
  return (
    <form className="form">
      <header>Web Crawler</header>
      <main className="formInput">
        <input className="input" placeholder="add URL" />
        <button>search</button>
      </main>

      <aside className="result">
        <header className="resultHeader">
          <div>Result:</div>
        </header>
      </aside>
    </form>
  );
}
