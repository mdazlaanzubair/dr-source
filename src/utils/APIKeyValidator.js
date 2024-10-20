import { GoogleGenerativeAI } from "@google/generative-ai";

export const APIKeyValidator = async (api_key) => {
  try {
    // INITIALIZING GEMINI AI SDK
    // INITIALIZE THE AI MODEL WITH API KEY
    const genAI = new GoogleGenerativeAI(api_key);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Hello World!";

    // Try to generate content and await the result
    const result = await model.generateContent(prompt);

    if (!result || !result.response)
      throw new Error("No valid response from the model.");

    return true;
  } catch ({ status }) {
    if (status == 400) {
      throw {
        error: "Invalid API Key",
        message: "API key not valid. Please pass a valid API key.",
      };
    } else {
      throw error;
    }
  }
};
