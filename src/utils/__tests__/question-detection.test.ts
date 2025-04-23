import { describe, test, expect } from "vitest";
import { detectQuestion, QUESTION_THRESHOLD } from "@/utils/question-detection";

describe("Question Detection System", () => {
  test("detects explicit questions with question marks", () => {
    const result = detectQuestion("What is your greatest strength?");
    expect(result.score).toBeGreaterThan(QUESTION_THRESHOLD);
    expect(result.matchedRules).toContain("Explicit Question Mark");
    expect(result.matchedRules).toContain("Interrogative Words");
  });

  test("recognizes command-based interview prompts", () => {
    const result = detectQuestion(
      "Tell me about your experience with TypeScript."
    );
    expect(result.score).toBeGreaterThan(QUESTION_THRESHOLD);
    expect(result.matchedRules).toContain("Command/Request Prompts");
    expect(result.matchedRules).toContain("Interview Keywords");
  });

  test("identifies behavioral interview questions", () => {
    const result = detectQuestion(
      "Describe a time you faced a challenging situation at work."
    );
    expect(result.score).toBeGreaterThan(QUESTION_THRESHOLD);
    expect(result.matchedRules).toContain("Behavioral Markers");
    expect(result.matchedRules).toContain("Command/Request Prompts");
  });

  test("handles exclusionary phrases with negative weight", () => {
    const result = detectQuestion(
      "Note: The following section contains interview tips."
    );
    expect(result.score).toBeLessThan(QUESTION_THRESHOLD);
    expect(result.matchedRules).toContain("Exclusionary Phrases");
  });

  test("correctly scores multi-factor questions", () => {
    const result = detectQuestion(
      "Could you tell me about a time you demonstrated leadership skills?"
    );
    expect(result.score).toBeGreaterThan(QUESTION_THRESHOLD);
    expect(result.matchedRules).toContain("Explicit Question Mark");
    expect(result.matchedRules).toContain("Command/Request Prompts");
    expect(result.matchedRules).toContain("Interview Keywords");
  });

  test("ignores non-question text but detects work-related keywords", () => {
    const result = detectQuestion(
      "This is just a regular statement about work."
    );
    expect(result.score).toBeLessThan(QUESTION_THRESHOLD);
    expect(result.matchedRules).toEqual(["Interview Keywords"]);
    expect(result.matchedRules.length).toBe(1);
  });
});
