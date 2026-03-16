import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  const { resumeText, jobDescription } = await req.json();

  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `You are an expert resume reviewer.

            Resume:
            ${resumeText}

            Job Description:
            ${jobDescription}

            Give structured feedback with:
            1. Match score (0-100)
            2. Top 3 strengths
            3. Top 3 improvements
            4. Missing keywords
            Keep it concise and actionable.`,
      },
    ],
    model: "openai/gpt-oss-20b",
  });

  const feedback = chatCompletion.choices[0]?.message?.content || "";
  return Response.json({ feedback });
}
