const express = require("express");
//const OPENAI_API_KEY = "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";
const OPENAI_API_KEY = "4faf0501b5mshf10ca942e1d4af1p125acbjsn8eac38e404bd"
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const axios = require('axios');


try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
const app = express();
app.use(cors());

app.use(express.json());

app.get("/ping", (req, res) => {
  res.json({
    message: "pong",
  });
});
app.post("/chat", (req, res) => {
  const question = req.body.question;

  openai
    .createCompletion({
      model: "text-davinci-003",
      prompt: question,
      max_tokens: 4000,
      temperature: 0,
    })
    .then((response) => {
      console.log({ response });
      return response?.data?.choices?.[0]?.text;
    })
    .then((answer) => {
      console.log({ answer });
      const array = answer
        ?.split("\n")
        .filter((value) => value)
        .map((value) => value.trim());

      return array;
    })
    .then((answer) => {
      res.json({
        answer: answer,
        propt: question,
      });
    });
  console.log({ question });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
