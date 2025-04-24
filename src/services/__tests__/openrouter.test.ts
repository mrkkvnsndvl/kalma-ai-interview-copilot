import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { getInterviewAnswer } from "../openrouter";

vi.mock("axios");

describe("OpenRouter Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return a valid answer for a successful API call", async () => {
    const mockResponse = {
      data: {
        choices: [
          {
            message: {
              content: "This is a test answer.",
              role: "assistant",
            },
          },
        ],
      },
    };

    (axios.post as any).mockResolvedValueOnce(mockResponse);

    const question = "What is your greatest strength?";
    const answer = await getInterviewAnswer(question);

    expect(axios.post).toHaveBeenCalledWith(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "microsoft/mai-ds-r1:free",
        messages: [
          {
            role: "user",
            content: expect.stringContaining(question),
          },
        ],
      },
      expect.objectContaining({
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
      })
    );

    expect(answer).toBe("This is a test answer.");
  });

  it("should throw an error when API call fails", async () => {
    (axios.post as any).mockRejectedValueOnce(new Error("API Error"));

    await expect(getInterviewAnswer("Any question")).rejects.toThrow(
      "Failed to get interview answer"
    );
  });

  it("should return empty string when API response is malformed", async () => {
    const mockResponse = {
      data: {
        choices: [],
      },
    };

    (axios.post as any).mockResolvedValueOnce(mockResponse);

    const answer = await getInterviewAnswer("Test question");
    expect(answer).toBe("");
  });
});
