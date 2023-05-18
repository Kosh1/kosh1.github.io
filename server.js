const express = require('express');
const OpenAI = require('openai');

const app = express();
app.use(express.json());

const openai = new OpenAI('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');

app.post('/message', async (req, res) => {
    const prompt = req.body.message;
    const gptResponse = await openai.complete({
        engine: 'text-davinci-002',
        prompt: prompt,
        max_tokens: 60,
    });

    res.json({ message: gptResponse.choices[0].text.trim() });
});

app.listen(3000, () => console.log('Listening on port 3000'));
