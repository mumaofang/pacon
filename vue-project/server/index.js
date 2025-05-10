import express from 'express';
import cors from 'cors'

import { baiduTranslate } from './getBaidu.js';
import { getPhonetic } from './useCidian.js'
import { getPronunciationUrl, getYoudaoPronunciationUrl } from './getWordMp3.js'
import { saveJSON, getJSON } from './saveData.js'
import { getAiAnswer } from './puppeteer.js'
import { getPrompts } from './genterationPrompt.js'
// import shoucan from './data.json' with { type: 'json' };

const app = express();
app.use(cors());
app.use(express.json())
const port = 3002;
app.get('/', (req, res) => {
    res.send('hello world')
})

app.post('/api/getData', async (req, res) => {

    const word = req.body.data
    const test = req.body.test
    if (test) {
        res.json({
            from: word,
            "translation": "你好",
            "phonetic": {
                "uk": "/heˈləʊ/",
                "us": "/heˈloʊ/"
            },
            "mp3": {
                "google": "https://ssl.gstatic.com/dictionary/static/sounds/oxford/hello--_us_1.mp3",
                "youdao": "https://ssl.gstatic.com/dictionary/static/sounds/oxford/hello--_us_1.mp3"
            }
        })
        return true
    }
    const translation = await baiduTranslate(word);
    const phonetic = await getPhonetic(word);
    // const phonetic = {};
    const mp3 = {
        google: getPronunciationUrl(word),
        youdao: getYoudaoPronunciationUrl(word)
    }
    res.json({
        from: word,
        translation,
        phonetic,
        mp3,
    })
})

app.post('/api/get/wrolds', async (req, res) => {
    const shoucan = await getJSON();
    res.json({
        success: true,
        code: 1,
        shoucan
    })
})

app.post('/api/save/wrold', async (req, res) => {
    const data = req.body;
    // console.log(data)
    // const shoucan = await import('../data/shoucan.json', { with: { type: 'json' } });
    const shoucan = await getJSON();
    // shoucan[data.word] = data;
    let newShoucan = { ...shoucan }
    if (!newShoucan[data.from]) {
        newShoucan[data.from] = { ...data }
    }
    const success = await saveJSON(newShoucan);
    if (success)
        res.json({
            success: true,
            code: 1,
            shoucan: newShoucan
        })
    else res.json({
        success: false,
        code: -1
    })
})
app.post('/api/saveNotes', async (req, res) => {
    const data = req.body;
    const shoucan = await getJSON();
    shoucan[data.word] = { ...data }
    const success = await saveJSON(shoucan);
    if (success)
        res.json({
            success: true,
            code: 1,
            shoucan: shoucan
        })
    else res.json({
        success: false,
        code: -1
    })
})
app.post('/api/cancelShoucan', async (req, res) => {
    const data = req.body.data;
    const shoucan = await getJSON();
    delete shoucan[data];
    const success = await saveJSON(shoucan);
    if (success)
        res.json({
            success: true,
            code: 1,
            shoucan: shoucan
        })
    else res.json({
        success: false,
        code: -1
    })
})

app.post('/api/getAiAnswer', async (req, res) => {
    let word = req.body.data;
    let clickNum = req.body.clickNum;
    // 每增加一次点击就需要修改提示词

    let promptWord = '如何快速的记住单词' + word;
    if (clickNum > 1) {
        promptWord = `如何快速${getPrompts(clickNum)}的记住单词` + word;
    }
    console.log(promptWord)
    let items = await getAiAnswer(promptWord);
    res.json({
        success: true,
        code: 1,
        items
    })
})

app.listen(port, () => {
    console.log("example app listening on port 3002")
})

//sk-3ec6d42c764d48a1b61c29293d25d2ec
