import { ChartSpline, CircleQuestionMark, Target } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center">
      <div className="w-1/2">
        <section className="text-center">
          <div className="flex justify-center items-center w-fit gap-2 text-sm mx-auto border rounded-full px-4 py-2 scale-75">
            <div className="bg-green-300 rounded-full size-3 animate-pulse"></div>
            <p className="tracking-widest">AI-POWERED FEEDBACK</p>
          </div>
          <div className="mt-12">
            <p className="text-4xl font-serif">Get your resume</p>
            <p className="text-4xl font-serif italic">actually reviewed</p>
          </div>
          <div className="mt-8">
            <p>
              Paste your resume and a job description. Get a match score,
              missing
            </p>
            <p>keywords, and specific improvements — in seconds.</p>
          </div>
          <div className="flex gap-4 justify-center mt-12">
            <button className="border px-4 py-2 rounded-md hover:bg-foreground/20 transition-all active:scale-95 duration-100">
              Review my resume &rarr;
            </button>
            <button className="border px-4 py-2 rounded-md hover:bg-foreground/20 transition-all active:scale-95 duration-100">
              See a demo
            </button>
          </div>
        </section>
        <section className="mt-16 border rounded-md bg-accent">
          <div className="border-b flex py-2 px-4 gap-1">
            <div className="bg-red-300 rounded-full size-3"></div>
            <div className="bg-yellow-300 rounded-full size-3"></div>
            <div className="bg-green-300 rounded-full size-3"></div>
          </div>
          <div className="p-8">
            <div className="flex justify-center items-center gap-4 text-sm">
              <div className="basis-1/2 bg-background py-2 px-4 rounded-md">
                <h3 className="">YOUR RESUME</h3>
                <p className="mt-1 line-clamp-2">
                  5 years experience in React, Node.js, TypeScript. Led team of
                  4 engineers at startup...
                </p>
              </div>
              <div className="basis-1/2 bg-background py-2 px-4 rounded-md">
                <h3 className="">JOB DESCRIPTION</h3>
                <p className="mt-1 line-clamp-2">
                  Seeking senior full-stack engineer with Next.js, AWS,
                  PostgreSQL, CI/CD experience...
                </p>
              </div>
            </div>
            <hr className="mt-4" />
            <div className="mt-4">
              <h3>ANALYSIS RESULT</h3>
              <div className="flex justify-center items-center gap-4">
                <p className="text-6xl font-serif">74</p>
                <div className="basis-full">
                  <p>match score</p>
                  <div className="bg-gray-400 h-2">
                    <div className="bg-green-400 h-2 rounded-lg w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-center items-center gap-4">
              <div className="basis-1/2 self-stretch">
                <h3>Strengths</h3>
                <div className="mt-2 flex gap-2">
                  <p className="border w-fit py-1 px-2 rounded-full text-sm">
                    React expertise
                  </p>
                  <p className="border w-fit py-1 px-2 rounded-full text-sm">
                    Team leadership
                  </p>
                  <p className="border w-fit py-1 px-2 rounded-full text-sm">
                    TypeScript
                  </p>
                </div>
              </div>
              <div className="basis-1/2 self-stretch">
                <h3>Missing keywords</h3>
                <div className="mt-2 flex gap-2">
                  <p className="border w-fit py-1 px-2 rounded-full text-sm">
                    React expertise
                  </p>
                  <p className="border w-fit py-1 px-2 rounded-full text-sm">
                    Team leadership
                  </p>
                  <p className="border w-fit py-1 px-2 rounded-full text-sm">
                    TypeScript
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <hr className="mt-16" />
        <section className="flex flex-col items-center justify-center mt-16">
          <h3>WHAT YOU GET</h3>
          <div className="mt-12 border grid grid-cols-2 gap-0.5 rounded-md w-11/12">
            <div className="flex flex-col gap-2 p-8 bg-accent">
              <Target />
              <h4>Match score</h4>
              <p className="text-sm">
                See exactly how well your resume aligns with any job posting,
                from 0 to 100.
              </p>
            </div>
            <div className="flex flex-col gap-2 p-8 bg-accent">
              <CircleQuestionMark />
              <h4>Keyword gaps</h4>
              <p className="text-sm">
                Know which keywords you're missing before the recruiter's ATS
                filters you out.
              </p>
            </div>
            <div className="flex flex-col gap-2 p-8 bg-accent">
              <ChartSpline />
              <h4>Actionable fixes</h4>
              <p className="text-sm">
                Get specific, ranked improvements — not vague advice like "add
                more detail."
              </p>
            </div>
          </div>
        </section>
        <hr className="mt-16" />
        <section className="mt-16 px-8 space-y-4">
          <h3 className="mb-8">HOW IT WORKS</h3>
          <div className="flex items-center gap-8">
            <p className="text-4xl">1</p>
            <div className="flex flex-col">
              <p>Paste your resume</p>
              <p>
                Copy and paste your resume text. No formatting needed — plain
                text works perfectly.
              </p>
            </div>
          </div>
          <div className="w-0.5 h-8 border ml-2"></div>
          <div className="flex items-center gap-8">
            <p className="text-4xl">2</p>
            <div className="flex flex-col">
              <p>Add the job description</p>
              <p>
                Paste the full job posting you're targeting. The more detail,
                the better the analysis.
              </p>
            </div>
          </div>
          <div className="w-0.5 h-8 border ml-2"></div>
          <div className="flex items-center gap-8">
            <p className="text-4xl">3</p>
            <div className="flex flex-col">
              <p>Get your feedback</p>
              <p>
                Receive a match score, keyword gaps, and a ranked list of
                improvements in seconds.
              </p>
            </div>
          </div>
        </section>
        <section className="mt-32 flex flex-col justify-center items-center gap-2">
          <button className="border px-4 py-2 rounded-md hover:bg-foreground/20 transition-all active:scale-95 duration-100">Start for free &rarr;</button>
          <p>No credit card required</p>
        </section>
      </div>
    </main>
  );
}
