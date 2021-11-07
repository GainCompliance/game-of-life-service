require('dotenv').config()

const express = require('express');
const app = express();
const { nanoid } = require('nanoid');
const seedrandom = require('seedrandom');
const { generateWorld } = require('./game-of-life-world');
const {Storage} = require('@google-cloud/storage');
const path = require('path');

const PORT = process.env.PORT || 8080;
const GENERATION_RANGE = {min: 50, max: 500}
const WORLD_SIZE_RANGE = {min: 10, max: 100}

const storage = new Storage();
const BUCKET_NAME = process.env.BUCKET_NAME
const HOST = process.env.K_SERVICE || 'http://localhost.com'

app.use(express.json({limit:"50mb"}));

app.get('/world', (req, res) => {
  const id = nanoid(8);
  res.redirect(302, `/world/${id}`)
})

app.get('/world/:id', (req, res) => {
  const {id} = req.params;
  const seededRandom = seedrandom(id);
  const generationCount = Math.max(Math.round(seededRandom() * GENERATION_RANGE.max), GENERATION_RANGE.min)
  const worldSize = Math.max(Math.round(seededRandom() * WORLD_SIZE_RANGE.max), WORLD_SIZE_RANGE.min)

  res.json({
    id,
    generationCount,
    size: worldSize,
    world: generateWorld({id, size: worldSize})
  })
})

app.post('/results', async (req, res) => {
  if(!req.body.generationCount) {
    res.status(400).send('The "generationCount" key is missing from your submission');
    return;
  }

  if(!req.body.id) {
    res.status(400).send('The "id" key is missing from your submission');
    return;
  }

  if(!req.body.generations) {
    res.status(400).send('The "generations" key is missing from your submission');
    return;
  }

  if(req.body.generations.length !== parseInt(req.body.generationCount)) {
    res.status(400).send('The "runs" length and generation count does not match');
    return;
  }

  const {id} = req.body;
  const submissionId = `${id}-${nanoid()}`
  const gameOfLifeBucket = storage.bucket(BUCKET_NAME);
  const file = gameOfLifeBucket.file(`${submissionId}.json`);

  await file.save(JSON.stringify(req.body), { metadata: {contentType: 'application/json'}})
  console.log(`saved to ${gameOfLifeBucket.name}/${file.name}`)
  res.redirect(302, `${HOST}/viewer/${submissionId}`)
})

app.get('/results/:submissionId', async (req, res) => {
  const {submissionId} = req.params;
  const gameOfLifeBucket = storage.bucket(BUCKET_NAME);
  const file = gameOfLifeBucket.file(`${submissionId}.json`);
  console.log(`retreiving ${gameOfLifeBucket.name}/${file.name}`)
  try{
    const [contents] = await file.download();
    res.send(contents);
  } catch {
    res.status(404).send(`Life not available. (Can't find submission ${submissionId})`);
  }
})

app.get('/viewer/:id', async (req, res) => {
  res.sendFile(path.join(__dirname, 'viewer.html'));
})

app.listen(PORT, () => {
  console.log(`World generator started on port ${PORT}`);
});
