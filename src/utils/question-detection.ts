const keywords: KeywordSet = {
  interrogatives: ["what", "why", "how", "when", "where", "who"],
  commandPrompts: [
    "tell me",
    "describe",
    "explain",
    "walk me through",
    "give an example",
  ],
  interviewKeywords: [
    "interview",
    "expectations",
    "role",
    "skill",
    "experience",
    "strength",
    "weakness",
    "opportunity",
    "work",
  ],
  behavioralMarkers: [
    "time you",
    "how do you handle",
    "what would you do if",
    "scenario where",
    "challenge you faced",
  ],
  exclusionaryPhrases: ["disclaimer:", "note:", "section:", "chapter"],
};

const rules: DetectionRule[] = [
  {
    name: "Explicit Question Mark",
    weight: 5,
    test: (text) => text.includes("?"),
  },
  {
    name: "Interrogative Words",
    weight: 3,
    test: (text) =>
      keywords.interrogatives.some((word) => text.toLowerCase().includes(word)),
  },
  {
    name: "Command/Request Prompts",
    weight: 4,
    test: (text) =>
      keywords.commandPrompts.some((phrase) =>
        text.toLowerCase().includes(phrase)
      ),
  },
  {
    name: "Interview Keywords",
    weight: 2,
    test: (text) =>
      keywords.interviewKeywords.some((word) =>
        text.toLowerCase().includes(word)
      ),
  },
  {
    name: "Behavioral Markers",
    weight: 4,
    test: (text) =>
      keywords.behavioralMarkers.some((phrase) =>
        text.toLowerCase().includes(phrase)
      ),
  },
  {
    name: "Exclusionary Phrases",
    weight: -3,
    test: (text) =>
      keywords.exclusionaryPhrases.some((phrase) =>
        text.toLowerCase().includes(phrase)
      ),
  },
];

export function detectQuestion(text: string): QuestionIndicator {
  const matchedRules = rules.filter((rule) => rule.test(text));
  const score = matchedRules.reduce((sum, rule) => sum + rule.weight, 0);

  return {
    score,
    matchedRules: matchedRules.map((rule) => rule.name),
  };
}

export const QUESTION_THRESHOLD = 5;
