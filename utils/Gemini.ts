import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_NAME = "gemini-1.5-pro";
const API_KEY1 = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;

const chatHistory = [
  {
    role: "user",
    parts: [
      {
        text: `You are an expert in generating cover letter. Your task is to generate cover letter for given job description and resume details. If you are unable to generate then provide output as Information is insufficient!!`,
      },
    ],
  },
  {
    role: "model",
    parts: [{ text: "How can I help you ?" }],
  },
];

type Props = {
  jobDescription: string;
  project: string;
  skills: string;
  experience: string;
};

export async function getCoverLetter({
  jobDescription,
  project,
  skills,
  experience,
}: Props) {
  if (!API_KEY1) throw new Error("Invalid Api Key!");

  const genAI = new GoogleGenerativeAI(API_KEY1);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  model.generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
  };

  const chat = model.startChat({
    history: chatHistory,
  });

  const result = await chat.sendMessage(
    `Job Description : \n${jobDescription}.\n Projects : \n${project} \nSkills: \n${skills} \nExperience: \n${experience}`
  );
  const response = result.response;
  return response.text();
}
