import { getInterviewAnswer } from "@/services/openrouter";
import useOpenRouterStore from "@/stores/openrouter-store";

const useOpenRouter = () => {
  const { setAnswer, setIsLoading, setError } = useOpenRouterStore();

  const getAnswer = async (question: string, questionNumber: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const answer = await getInterviewAnswer(question);
      setAnswer(questionNumber, answer);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to get answer");
    } finally {
      setIsLoading(false);
    }
  };

  return { getAnswer };
};

export default useOpenRouter;
