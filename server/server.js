const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');

const app = express();
app.use(cors());

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

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});