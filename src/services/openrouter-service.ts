import OpenAI from "openai";
import axios from "axios";

const jobTitle = "Software Engineer";
const jobDescription = "Develop and maintain software applications.";
const companyName = "Tech Company";
const resume = "John Doe's Resume";

const systemContent = `You are a job candidate interviewing for the position of "${jobTitle}" at "${companyName}". Drawing on your experience in ${jobDescription} and the expertise showcased in your resume ("${resume}"), answer the interview question using clear and natural English at a B2 proficiency level. Your answer should be short and concise. Follow these guidelines:
1. **STAR Method** - Provide a brief overview of the Situation, Task, Action, and Result.
2. **Storytelling** - Share a concise narrative with a clear beginning, middle, and end.
3. **Positive Framing** - Quickly highlight your strengths and contributions.
4. **Honesty** - Briefly mention challenges and explain how you overcame them.
5. **Clarity and Enthusiasm** - Use straightforward language to express your passion.
6. **Professionalism** - Maintain a courteous and professional tone.
7. **Formatting** - Generate your response using the following structure:  
   Number. **Title** 
   - Sentence(s).  
   Each point must begin with a numeral, followed by a bold title, a dash, and a clear sentence or sentences that elaborate on the point.`;

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: import.meta.env.WXT_OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const openrouterService = async (
  questionText: string
): Promise<string> => {
  try {
    const rate = await axios.get("https://openrouter.ai/api/v1/auth/key", {
      headers: {
        Authorization: `Bearer ${import.meta.env.WXT_OPENROUTER_API_KEY}`,
      },
    });
    console.log(rate.data.data.limit);

    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-3.2-3b-instruct:free",
      messages: [
        {
          role: "system",
          content: systemContent,
        },
        {
          role: "user",
          content: questionText,
        },
      ],
      temperature: 0.5,
    });
    console.log(completion.choices[0].message);
    return completion.choices[0].message.content!;
  } catch (error) {
    console.error(error);
    return "Erro fetching answer";
  }
};
