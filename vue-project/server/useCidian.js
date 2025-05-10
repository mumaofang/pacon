
import { JSDOM } from 'jsdom'
import fetch from 'node-fetch';
export async function getPhonetic(word) {
    try {
        const response = await fetch(`https://dictionary.cambridge.org/dictionary/english/${word}`);
        const html = await response.text();

        // 使用 jsdom 解析
        const dom = new JSDOM(html);
        const doc = dom.window.document;
        const ukPhonetic = doc.querySelector('.uk.dpron-i .pron')?.textContent;
        const usPhonetic = doc.querySelector('.us.dpron-i .pron')?.textContent;
        return {
            uk: ukPhonetic?.trim() || '',
            us: usPhonetic?.trim() || ''
        };
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// 使用示例
// getPhonetic('hello').then(console.log);