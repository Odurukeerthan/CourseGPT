import axios from 'axios';

const COHERE_API_URL = 'https://api.cohere.ai/generate';
const COHERE_API_KEY = import.meta.env.VITE_COHERE_API_KEY;

export const generateLesson = async (topic) => {
  try {
    const prompt = `Provide lesson content in JSON format about ${topic} with these keys: 
    title, objectives (array), summary, activities (array), keyTerms (array of objects), 
    duration (number), difficulty (string). Only return valid JSON.`;
    
    const response = await axios.post(
      COHERE_API_URL,
      {
        model: 'command',
        prompt,
        max_tokens: 500,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${COHERE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Try to extract JSON from response
    try {
      const jsonString = response.data.text.match(/\{[\s\S]*\}/)?.[0];
      return jsonString ? JSON.parse(jsonString) : null;
    } catch (e) {
      console.error('JSON parse error:', e);
      return null;
    }
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};