const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/similar-words', (req, res) => {
  const targetWords = req.query.words.split(',');
  const pythonProcess = spawn('python', ['../algos/nlp.py', ...targetWords]);
  let result = '';

  pythonProcess.stdout.on('data', (data) => {
    result += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    res.json(JSON.parse(result));
  });
});

app.get('/phonemic-breakdown', (req, res) => {
  const word = req.query.word;
  const pythonProcess = spawn('python', ['../algos/phonemic_breakdown.py', word]);
  let result = '';

  pythonProcess.stdout.on('data', (data) => {
    result += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    res.json(result.trim());
  });
});

app.post('/api/chatbot', (req, res) => {
  const { message } = req.body;

  const pythonProcess = spawn('python', ['../algos/gpt2_chatbot.py', message]);
  let result = '';

  pythonProcess.stdout.on('data', (data) => {
    result += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    res.json({ response: result.trim() });
  });
});

app.get('/decodable-books', (req, res) => {
  const words = req.query.words.split(',');
  const pythonProcess = spawn('python', ['../algos/generate_decodable_books.py', ...words]);
  let result = '';

  pythonProcess.stdout.on('data', (data) => {
    result += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    res.json(JSON.parse(result));
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});