import axios from "axios";

interface OpenRouterMessage {
  role: "user" | "assistant";
  content: string;
}

interface OpenRouterResponse {
  choices: {
    message: OpenRouterMessage;
  }[];
}

export const getInterviewAnswer = async (question: string): Promise<string> => {
  try {
    const response = await axios.post<OpenRouterResponse>(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "microsoft/mai-ds-r1:free",
        messages: [
          {
            role: "assistant",
            content: `You are an interview candidate. Provide a concise answer (maximum 3 sentences) to this interview question: ${question}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.WXT_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const answer = response.data.choices[0]?.message?.content || "";
    return answer.trim();
  } catch (error) {
    console.error("OpenRouter API Error:", error);
    throw new Error("Failed to get interview answer");
  }
};
