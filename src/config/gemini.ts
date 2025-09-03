export const GEMINI_API_KEY = 'AIzaSyDAwQNVmF3VRXRTNqj9WKzl6AvDMjmSC7w';
export const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export interface GeminiRequest {
  contents: {
    parts: {
      text: string;
    }[];
  }[];
}

export interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}
