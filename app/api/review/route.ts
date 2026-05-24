import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  const { resumeText, jobDescription } = await req.json();

  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `You are an expert resume reviewer specializing in ATS (Applicant Tracking System) optimization. ATS systems scan resumes for exact keyword matches, proper formatting, and relevant experience. Keep this in mind when scoring and giving feedback.
          Resume:
          ${resumeText}

          Job Description:
          ${jobDescription}

          Scoring rules:
          - matchScore: score based on % of required job skills and experience found in the resume
            - 0-20: major gaps in core requirements
            - 21-40: some relevant skills but missing critical ones
            - 41-60: moderate match, has foundational skills but gaps exist
            - 61-80: good match, meets most requirements
            - 81-100: strong match, meets almost all requirements
          - atsScanScore: score based on how well the resume's keywords cover the *core required* skills in the job description, not all mentioned keywords. Focus on must-have technologies and experience.
            - count exact keyword matches vs total keywords in job description
            - score = (matched keywords / total keywords) * 100

          Rules:
          - strengths: exactly 3, most impactful only
          - improvements: exactly 3, most critical only
          - missingKeywords and keywordsFound must be mutually exclusive — a keyword cannot appear in both lists
          - missingKeywords: as many as relevant, no limit. Keywords from the job description NOT found anywhere in the resume
          - keywordsFound: all keywords and technologies from the resume that are relevant to the job description, be thorough. Keywords from the job description that ARE found in the resume
          - keywordsFound: match keywords even if slightly different format (e.g. "React" matches "React.js", "C#" matches "C#/.NET", "ASP.NET MVC" matches "ASP.NET MVC 5"). Be generous with partial matches.
          - summary: one sentence max

          Return exactly this JSON shape (no other text, no backticks):
          {
            "matchScore": <0-100 integer>,
            "atsScanScore": <0-100 integer>,
            "strengths": ["strength one", "strength two", "strength three"],
            "improvements": ["improvement one", "improvement two", "improvement three"],
            "missingKeywords": ["keyword1", "keyword2"],
            "keywordsFound": ["keyword1", "keyword2"],
            "summary": "One sentence overall assessment.",
            "atsWarnings": [
              "Avoid tables and columns — ATS can't parse them",
              "Use standard section headings like Experience not Career History"
            ]
          }`,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });

  const raw = chatCompletion.choices[0]?.message?.content || "";
  console.log("RAW RESPONSE:", raw); // add this
  const clean = raw.replace(/```json|```/g, "").trim();

  try {
    return Response.json({ feedback: JSON.parse(clean) });
  } catch (e) {
    console.error("Failed to parse response:", clean);
    return Response.json(
      { error: "Failed to parse AI response, please try again." },
      { status: 500 },
    );
  }
}
