/* eslint-disable no-undef */
import express from 'express';
import cors from 'cors';
import { OpenAI } from 'openai';
import * as dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 3005;
const apiKey = process.env.VITE_OPEN_AI_KEY;
const openai = new OpenAI({ apiKey: apiKey });

app.use(cors());
app.use(express.json());
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Here, we define the '/chatbot' route to handle questions from our
// frontend React application
app.post('/chatbot', async (req, res) => {
  // The 'question' variable is the user's input from the frontend
  const { question } = req.body;
  // Here is where we communicate with the OpenAI API to create our chatbot.
  // We store the chatbot's response in the 'response' variable
  const response = await openai.chat.completions.create({
    messages: [
      // We give the chatbot a role with some content to determine how it will behave
      {
        role: 'system',
        content:
          'You are a FullStack Engineer with more than 15 years of experince. You are an expert in databases, backend and frontend. You know everything about technologies from C language to AI basics.',
      },
      // We ask the chatbot to generate an answer based on the user's question
      // Remember, this question will come from the frontend
      {
        role: 'user',
        content: question,
      },
    ],
    // We choose the model we want to use for our chatbot
    model: 'gpt-3.5-turbo',
    // We add a value for max_tokens to ensure the response won't exceed 300 tokens
    // This is to make sure the responses aren't too long
    max_tokens: 300,
  });
  // Then we take the text response and display it on the server
  res.send(response.choices[0].message.content);
});
