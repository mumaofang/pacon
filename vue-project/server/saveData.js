import { writeFile, readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import fs from 'fs';



export async function saveJSON(data) {
    try {
        await writeFile(path.resolve(__dirname, '../data/shoucan.json'), JSON.stringify(data, null, 2));
        console.log('JSON 保存成功');
        return true
    } catch (err) {
        console.error('JSON 保存失败:', err);
        return false
    }
}

export async function getJSON(data) {
    try {
        const content = await readFile(path.resolve(__dirname, '../data/shoucan.json'), 'utf8');
        return JSON.parse(content);
    } catch (error) {
        console.error('加载失败:', error.code);  // 明确错误类型处理
        return [];
    }
}
