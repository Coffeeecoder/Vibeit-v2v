import { createServerFn } from "@tanstack/react-start";
import { generateText, Output, NoObjectGeneratedError } from "ai";
import { z } from "zod";
import { createGateway, DEFAULT_MODEL } from "./ai-gateway.server";

// ============ Resume Analyzer ============
const ResumeReport = z.object({
  atsScore: z.number(),
  strengthScore: z.number(),
  readabilityScore: z.number(),
  summary: z.string(),
  technicalSkills: z.array(z.string()),
  softSkills: z.array(z.string()),
  missingKeywords: z.array(z.string()),
  weakBullets: z.array(z.object({ original: z.string(), improved: z.string() })),
  actionVerbs: z.array(z.string()),
  grammar: z.array(z.string()),
  formatting: z.array(z.string()),
  industryTips: z.array(z.string()),
  missingProjects: z.array(z.string()),
  missingCertifications: z.array(z.string()),
  portfolioSuggestions: z.array(z.string()),
  profileSuggestions: z.array(z.string()),
  gapDetected: z.boolean(),
  gapRecovery: z.array(z.string()),
  gapExplanation: z.string(),
});
export type ResumeReport = z.infer<typeof ResumeReport>;

export const analyzeResume = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({ resumeText: z.string().min(20), targetRole: z.string().optional() }).parse(input),
  )
  .handler(async ({ data }): Promise<ResumeReport> => {
    const gateway = createGateway();
    const prompt = `Analyze this resume like a senior tech recruiter. Target role: ${data.targetRole || "not specified"}.
Return honest scores 0-100. Detect any employment/education/career gaps and populate gap fields. For each field, keep lists concise (3-8 items each). Provide 2-5 weakBullets with concrete improved rewrites.

RESUME:\n${data.resumeText}`;

    try {
      const { output } = await generateText({
        model: gateway(DEFAULT_MODEL),
        output: Output.object({ schema: ResumeReport }),
        prompt,
      });
      return output;
    } catch (err) {
      if (NoObjectGeneratedError.isInstance(err)) {
        try {
          return ResumeReport.parse(JSON.parse(err.text ?? "{}"));
        } catch {
          /* fall through */
        }
      }
      throw err;
    }
  });

// ============ Roadmap ============
const Roadmap = z.object({
  title: z.string(),
  overview: z.string(),
  totalWeeks: z.number(),
  milestones: z.array(
    z.object({
      week: z.string(),
      title: z.string(),
      description: z.string(),
      category: z.string(),
      tasks: z.array(z.string()),
      resources: z.array(z.object({ name: z.string(), type: z.string() })),
    }),
  ),
});
export type Roadmap = z.infer<typeof Roadmap>;

export const generateRoadmap = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z
      .object({
        currentRole: z.string(),
        dreamRole: z.string(),
        skills: z.string(),
        experience: z.string(),
        timeframe: z.string(),
      })
      .parse(input),
  )
  .handler(async ({ data }): Promise<Roadmap> => {
    const gateway = createGateway();
    const prompt = `Create a personalized, step-by-step career roadmap.
Current role: ${data.currentRole}
Dream role: ${data.dreamRole}
Current skills: ${data.skills}
Experience: ${data.experience}
Timeframe: ${data.timeframe}

Generate 6-10 milestones spanning categories: Skills, Certifications, Projects, Open Source, Portfolio, Networking, Interviews, Applications. Each milestone should have a realistic week range like "Week 1-2" and 3-5 concrete tasks plus 2-3 resources.`;

    try {
      const { output } = await generateText({
        model: gateway(DEFAULT_MODEL),
        output: Output.object({ schema: Roadmap }),
        prompt,
      });
      return output;
    } catch (err) {
      if (NoObjectGeneratedError.isInstance(err)) {
        return Roadmap.parse(JSON.parse(err.text ?? "{}"));
      }
      throw err;
    }
  });

// ============ Skill Gap ============
const SkillGap = z.object({
  targetRole: z.string(),
  overallReadiness: z.number(),
  mastered: z.array(z.object({ skill: z.string(), level: z.number() })),
  missing: z.array(z.object({ skill: z.string(), priority: z.string(), estimatedWeeks: z.number() })),
  learningOrder: z.array(z.string()),
  projects: z.array(z.string()),
  certifications: z.array(z.string()),
  courses: z.array(z.object({ name: z.string(), platform: z.string() })),
  books: z.array(z.string()),
  practicePlatforms: z.array(z.string()),
  interviewResources: z.array(z.string()),
});
export type SkillGap = z.infer<typeof SkillGap>;

export const analyzeSkillGap = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({ targetRole: z.string(), currentSkills: z.string() }).parse(input),
  )
  .handler(async ({ data }): Promise<SkillGap> => {
    const gateway = createGateway();
    const prompt = `Compare this candidate's skills to the ${data.targetRole} role. Score overallReadiness 0-100. For mastered skills give level 0-100. For missing skills mark priority (high/medium/low). Provide 4-6 items per list.

CURRENT SKILLS:\n${data.currentSkills}`;
    try {
      const { output } = await generateText({
        model: gateway(DEFAULT_MODEL),
        output: Output.object({ schema: SkillGap }),
        prompt,
      });
      return output;
    } catch (err) {
      if (NoObjectGeneratedError.isInstance(err)) {
        return SkillGap.parse(JSON.parse(err.text ?? "{}"));
      }
      throw err;
    }
  });

// ============ Interview Questions ============
const InterviewSet = z.object({
  role: z.string(),
  company: z.string(),
  questions: z.array(
    z.object({
      category: z.string(),
      question: z.string(),
      whyAsked: z.string(),
      strongAnswerFramework: z.string(),
      exampleAnswer: z.string(),
    }),
  ),
  tips: z.array(z.string()),
});
export type InterviewSet = z.infer<typeof InterviewSet>;

export const generateInterview = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z
      .object({
        role: z.string(),
        company: z.string().optional(),
        background: z.string(),
      })
      .parse(input),
  )
  .handler(async ({ data }): Promise<InterviewSet> => {
    const gateway = createGateway();
    const prompt = `Generate 8 realistic interview questions for the role "${data.role}" at "${data.company || "a top tech company"}" tailored to this candidate:\n${data.background}\n\nMix behavioral, technical, system design, and role-specific questions. For each, explain why it's asked, give a strong answer framework (STAR-style when relevant), and a concise example answer.`;
    try {
      const { output } = await generateText({
        model: gateway(DEFAULT_MODEL),
        output: Output.object({ schema: InterviewSet }),
        prompt,
      });
      return output;
    } catch (err) {
      if (NoObjectGeneratedError.isInstance(err)) {
        return InterviewSet.parse(JSON.parse(err.text ?? "{}"));
      }
      throw err;
    }
  });
