require('dotenv').config();
const express = require('express');
const cors = require('cors');
const natural = require('natural'); // import natural npm package

const app = express();
app.use(cors());
app.use(express.json());

const analyzer = new natural.SentimentAnalyzer("English", natural.PorterStemmer, "afinn");
const tokenizer = new natural.WordTokenizer();

app.post('/sentiment', (req, res) => {
    const sentence = req.body.sentence;

    if (!sentence) {
        return res.status(400).json({ error: "Sentence is required" });
    }

    const analysis = analyzer.getSentiment(tokenizer.tokenize(sentence));

    res.json({ sentence, sentimentScore: analysis });
});

const PORT = process.env.PORT || 3050;
app.listen(PORT, () => {
    console.log(`Sentiment analysis service running on port ${PORT}`);
});