import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyAs4y5XGQ24c-m-rf6_Pv8qcqEnd7cFCJQ");

export const translateWithGemini = async (
  baseLanguage: any,
  selectedLanguage: any,
  value: any
) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });
    const prompt = `Translate the following text from ${baseLanguage} to ${selectedLanguage}  and please return the translated text only : "${value}"`;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const translatedText = response.text();
    const reText = translatedText
      .replace(/^["']|["']$/g, "")
      .replace(/\n/g, "");
    return reText;
  } catch (e) {
    return "translate error";
  }
};
