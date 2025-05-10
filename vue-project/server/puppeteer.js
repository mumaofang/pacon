// const puppeteer = require('puppeteer');
import puppeteer from "puppeteer";

const AIEntry = {
    'baiduDeepseek': 'https://chat.baidu.com/search',
    'doubao': 'https://www.doubao.com/chat/'
}
// 判断是否存在某个元素
async function waitForSelector(page, selector, time) {
    let result = await page.waitForSelector(selector, { timeout: time }).catch(err => {
        console.log('未找到对应选择器' + selector)
        return false;
    })
    return result
}

async function baiduDeepseek(page, prompts, browser) {
    await page.waitForSelector('#chat-input-box')
    await page.tap('#chat-input-box')
    await page.type('#chat-input-box', prompts, { delay: 100 });
    page.on('response', async (response) => {
        const url = response.url();
        const status = response.status();
        const headers = response.headers();

        if (url.includes('/api/conversation')) { // 按接口特征过滤
            console.log(`接口完成: ${url}`);
            console.log(`状态码: ${status}`);
            // const stream = response.buffer();
            // stream.on('data', (chunk) => {
            //   console.log('收到分块数据:', chunk.toString());
            // });
            // stream.on('end', () => {
            //   console.log('数据传输完成');
            // });
            // console.log('响应内容:', body);
        }
    });
    await page.tap('.internet-search-icon');

    await page.tap('i.send-icon')
    // await page.screenshot({ path: 'example.png' });

    // 判断是否结果打印完
    await page.waitForSelector('.title_pb6wx_26');

    await isEquText(page, '回答完成')

    let items = await page.$$eval('.cosd-markdown-content.cosd-markdown-content-typingall', elements =>
        elements.map(el => el.innerText)
    );
    await browser.close();
    items = items.map(item => {
        return item.split('\n').map(i => i.trim()).filter(i => !!i)
    })

    return items
}

async function langjieRequest(page, urlE) {
    return new Promise((resolve, rejcet) => {
        const resultResponse = page.on('response', async (response) => {
            const url = response.url();
            const status = response.status();
            const headers = response.headers();

            if (url.includes('/samantha/chat/completion')) { // 按接口特征过滤
                console.log(`接口完成: ${url}`);
                console.log(`状态码: ${status}`);
                
                const stream = await response.buffer();
                console.log(stream)
                stream.on('data', (chunk) => {
                  console.log('收到分块数据:', chunk.toString());
                });
                stream.on('end', () => {
                  console.log('数据传输完成');
                });
                // console.log('响应内容:', body);
            }
        })
    })
}
async function doubao(page, prompts, browser) {
            await page.waitForSelector('.semi-input-textarea.semi-input-textarea-autosize')
            await page.type('.semi-input-textarea.semi-input-textarea-autosize', prompts, { delay: 100 });
            await page.tap('#flow-end-msg-send');
            // 判断是否有登录弹出框
            const res = await waitForSelector(page, '.semi-portal', 5 * 1000);

            const resultResponse = langjieRequest(page, '/samantha/chat/completion');
            if (res) {
                // await page.tap('.semi-portal .semi-modal-wrap.semi-modal-wrap-center')
                // 隐藏登录页面
                await page.evaluate(() => {
                    document.querySelector('.semi-portal').style.display = 'none';
                });
                await page.tap('#flow-end-msg-send');
            }
            const data = await resultResponse

            console.log(res)
        }
export async function getAiAnswer(prompts, key = 'baiduDeepseek', test = true) {
        const browser = await puppeteer.launch({
            headless: test,
            // args: [
            //   `--disable-extensions-except=${pathToExtension}`,
            //   `--load-extension=${pathToExtension}`
            // ]
        });

        const page = await browser.newPage();
        // 设置视口宽度为 1920px，高度为 1080px
        await page.setViewport({
            width: 800,
            height: 800,
            deviceScaleFactor: 1, // 设备缩放比例（默认 1）
            isMobile: false       // 是否模拟移动端（默认 false）
        });
        await page.goto(AIEntry[key]);

        if (key === 'baiduDeepseek') {
            return await baiduDeepseek(page, prompts, browser);
        }
        if (key === 'doubao') {
            return await doubao(page, prompts, browser);
        }
    }

    async function isEquText(page, text) {
        return new Promise((resole, rejcet) => {
            let timer = setInterval(async () => {
                const content = await page.$eval('.title_pb6wx_26', el => el.textContent);
                if (content.includes(text)) {
                    clearInterval(timer);
                    timer = null;
                    console.log(content)
                    resole(true)
                }
            }, 1000);
        })

    }

    // let msg = await getAiAnswer('你好', 'baiduDeepseek', false)
    // let msg = await getAiAnswer('你可以干什么', 'doubao', false)
    // console.log(msg)