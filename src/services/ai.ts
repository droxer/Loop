import { env } from '../lib/env';

export interface AnalyzedQuestion {
    question: string;
    studentAnswer?: string;
    correctAnswer?: string;
    subject?: string;
    topic?: string;
}

export const analyzeImage = async (base64Image: string): Promise<AnalyzedQuestion> => {
    const apiKey = env.openaiApiKey;

    if (!apiKey) {
        throw new Error('OpenAI API key is missing. Please set EXPO_PUBLIC_OPENAI_API_KEY in your .env file.');
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    {
                        role: 'system',
                        content: `You are an AI assistant helping a student record wrong questions. 
            Analyze the image provided and extract the following information into a JSON object:
            - question: The main text of the question.
            - studentAnswer: The student's answer if visible or marked.
            - correctAnswer: The correct answer or solution if visible.
            - subject: The likely subject (e.g., Math, Physics, English).
            - topic: The specific topic (e.g., Calculus, Newton's Laws).
            
            If you cannot determine a field, leave it as an empty string.
            Return ONLY the JSON object, no markdown formatting.`
                    },
                    {
                        role: 'user',
                        content: [
                            { type: 'text', text: 'Analyze this image.' },
                            {
                                type: 'image_url',
                                image_url: {
                                    url: `data:image/jpeg;base64,${base64Image}`,
                                },
                            },
                        ],
                    },
                ],
                max_tokens: 1000,
            }),
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        const content = data.choices[0].message.content;
        // Clean up markdown code blocks if present
        const jsonString = content.replace(/```json\n|\n```/g, '').trim();

        return JSON.parse(jsonString) as AnalyzedQuestion;
    } catch (error) {
        console.error('AI Analysis failed:', error);
        throw error;
    }
};
