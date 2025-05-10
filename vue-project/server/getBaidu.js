import crypto from 'crypto'
function getsign(query) {
    // 配置参数

    const appid = '20250509002353217';
    const secretKey = 'rPKyL0aLpg3ce2Jg0JTA';
    const salt = Math.floor(Math.random() * 100000);
    const signStr = appid + query + salt + secretKey;
    // 生成签名（不同环境选择一种）
    // Node.js 方式：
    const sign = crypto.createHash('md5').update(signStr).digest('hex');
    // 浏览器方式（需引入 crypto-js）：
    // const sign = CryptoJS.MD5(signStr).toString();
    return { appid, salt, sign }
}

export async function baiduTranslate(query, fromLang = 'en', toLang = 'zh') {

    const { appid, salt, sign } = getsign(query)
    // 构造请求URL
    const url = new URL('https://api.fanyi.baidu.com/api/trans/vip/translate');
    const params = {
        q: query,
        from: fromLang,
        to: toLang,
        appid: appid,
        salt: salt,
        sign: sign
    };

    // 添加查询参数
    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
    });

    try {
        // 发送请求
        const response = await fetch(url.toString());
        const result = await response.json();

        // 错误处理
        if (result.error_code) {
            console.error(`错误 ${result.error_code}: ${result.error_msg}`);
            return null;
        }

        // 返回翻译结果
        // console.log(result)
        return result.trans_result[0].dst;
    } catch (error) {
        console.error('请求失败:', error);
        return null;
    }
}


// baiduTranslate('hello')
//     .then(translation => console.log(translation)) // 输出：你好
//     .catch(error => console.error(error));

