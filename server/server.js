import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('OPENAI_API_KEY is missing or invalid.');
  process.exit(1);
}

const configuration = new Configuration({
  apiKey,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from Abhishek',
  });
});

app.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (typeof prompt !== 'string') {
      throw new Error('Invalid input data.');
    }

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message || 'Something went wrong.');
  }
});

app.listen(3000, () => console.log('AI server started on http://localhost:3000'));