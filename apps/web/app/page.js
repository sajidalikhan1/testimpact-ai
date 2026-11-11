// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert h-5 w-[100px]"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the{" "}
//             <code className="rounded bg-black/[.06] px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-white/[.08]">
//               page.js
//             </code>{" "}
//             file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert h-[14px] w-4"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={14}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }


"use client";

import { useState } from "react";

export default function HomePage() {
  const [apiStatus, setApiStatus] = useState("Not checked");
  const [checking, setChecking] = useState(false);

  async function checkApi() {
    setChecking(true);
    setApiStatus("Checking...");

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const response = await fetch(`${apiUrl}/api/v1/health`);

      if (!response.ok) {
        throw new Error("API returned an unsuccessful response");
      }

      const data = await response.json();

      setApiStatus(data.status === "healthy" ? "Connected" : "Unavailable");
    } catch (error) {
      console.error("API health check failed:", error);
      setApiStatus("Connection failed");
    } finally {
      setChecking(false);
    }
  }

  return (
    <main className="page">
      <nav className="navbar">
        <a href="/" className="brand">
          TestImpact<span>AI</span>
        </a>

        <span className="nav-label">Regression Intelligence</span>
      </nav>

      <section className="hero">
        <p className="eyebrow">SMARTER REGRESSION TESTING</p>

        <h1>
          Change code.
          <br />
          <span>Know what to test.</span>
        </h1>

        <p className="description">
          Analyze software changes, discover relevant tests, and understand
          which areas may need attention before a release.
        </p>

        <div className="actions">
          <button
            className="primary-button"
            onClick={checkApi}
            disabled={checking}
          >
            {checking ? "Checking API..." : "Check API connection"}
          </button>
        </div>

        <div className="status-card">
          <div>
            <p className="status-label">Backend status</p>
            <p className="status-value">{apiStatus}</p>
          </div>

          <span
            className={`status-indicator ${
              apiStatus === "Connected" ? "online" : ""
            }`}
          />
        </div>
      </section>

      <section className="features">
        <article className="feature-card">
          <span className="feature-number">01</span>
          <h2>Change analysis</h2>
          <p>
            Identify modified files and understand the structure of code
            changes.
          </p>
        </article>

        <article className="feature-card">
          <span className="feature-number">02</span>
          <h2>Test recommendations</h2>
          <p>
            Map source files to potentially affected tests using dependencies
            and test discovery.
          </p>
        </article>

        <article className="feature-card">
          <span className="feature-number">03</span>
          <h2>Explainable risk</h2>
          <p>
            Prioritize tests using transparent rules instead of presenting
            heuristic scores as failure probabilities.
          </p>
        </article>
      </section>

      <footer className="footer">
        TestImpact AI · Built to make regression testing more informed.
      </footer>
    </main>
  );
}
