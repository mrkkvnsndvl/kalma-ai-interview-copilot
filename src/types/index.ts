interface InterviewFormValues {
  jobTitle: string;
  jobDescription: string | undefined;
  companyName: string | undefined;
  resume: File | undefined;
  openRouterAPIKey: string;
  apiModel: string;
  deepgramAPIKey: string;
}

interface openRouterAPIModelsI {
  modelName: string;
  id: string;
}

interface DetectionRule {
  name: string;
  weight: number;
  test: (text: string) => boolean;
}

interface QuestionIndicator {
  score: number;
  matchedRules: string[];
}

interface KeywordSet {
  interrogatives: string[];
  commandPrompts: string[];
  interviewKeywords: string[];
  behavioralMarkers: string[];
  exclusionaryPhrases: string[];
}
