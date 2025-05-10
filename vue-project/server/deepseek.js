import axios from "axios";
import OpenAI from "openai";

const API_KEY = '/xmUL0Fu3iwI91N0DULjn0xIpb58sehbxLblOX219u8YRld76QGmeNaT6zUijs84';
const API_URL = 'https://chat.deepseek.com/api/v0/chat/completion';

async function callDeepSeek(prompt) {
    const headers = {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'x-ds-pow-response': 'eyJhbGdvcml0aG0iOiJEZWVwU2Vla0hhc2hWMSIsImNoYWxsZW5nZSI6ImUyN2YwODg1YzVmMzczNjM4OTFmYTdjYzhhODkzMTllN2Y2NDk5NTc5NzRhZDk5MmVjNGIxNzc3MmNjYWM5MGIiLCJzYWx0IjoiYmUzNjMwMjQ3ZDI5Mzg4YjVhMzgiLCJhbnN3ZXIiOjEwNjUyMSwic2lnbmF0dXJlIjoiNDE4MTc2OWI4NDAzZDljOTkzNTQ4OWUwODg2N2EyMDg2MmNiM2M5MWM2YzZhZjc5ZDY1NTBmM2ZkYmYyYTUwZiIsInRhcmdldF9wYXRoIjoiL2FwaS92MC9jaGF0L2NvbXBsZXRpb24ifQ==',
        'Cookie': 'Hm_lvt_1fff341d7a963a4043e858ef0e19a17c=1738722181; smidV2=20250205102301435c39e7932fc50f411b931aa98e210d007775cfd542f00d0; .thumbcache_6b2e5483f9d858d7c661c5e276b6a6ae=YvtQm9eZLIJZVqTBippmGYoE98L2hmsJE4RnZjX6Ud/kDGPfgvVSlup9g8ty2kE6sOh/0eXexmwuYwibCwtICA%3D%3D;  HWWAFSESID=a9ff0349bb2234372d5; HWWAFSESTIME=1746364216299; ds_session_id=8f62b6f9aab64586a923cd70c4647df9; intercom-session-guh50jw4=THFHMnBVaDZMZE5saWFXMlBwbzhsVmdzeXFTUWpBZnBBR1gvYWpoV2pMNThpblkxd2toV3RVc3RkbjdQa2FseUFlanE1S3NKR2RJKzBNS2dLa2Y4Zmx5RXgxdnRYZlNTUDhQZWtQaFYydk09LS1GYkJRai93S3ArUVZCb0U2cDNzaDdBPT0=--f7017fbbcf4ae309b564268c3118bb1065686f27'
    };

    const data = { 
        "chat_session_id": "d6db3678-8550-4fc2-bf52-355bd7be7f58", 
        "parent_message_id": null, 
        "prompt": "你好", 
        "ref_file_ids": [], 
        "thinking_enabled": true, 
        "search_enabled": false 
    }

    try {
        const response = await axios.post(API_URL, data, { headers });
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
    }
}

callDeepSeek('你好').then((res) => console.log(res.data))


// Please install OpenAI SDK first: `npm install openai`



const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: 'sk-3ec6d42c764d48a1b61c29293d25d2ec'
});

async function main() {
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "你好" }],
        model: "deepseek-chat",
    }).catch(err => {
        console.log(err)
    });

    console.log(completion.choices[0].message.content);
}

// main();




