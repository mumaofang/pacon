export function getPronunciationUrl(word,) {
    // 美式发音
    return `https://ssl.gstatic.com/dictionary/static/sounds/oxford/${word}--_us_1.mp3`;

    // 英式发音（部分单词可用）
    // return `https://ssl.gstatic.com/dictionary/static/sounds/oxford/${word}--_gb_1.mp3`;
}
export function getYoudaoPronunciationUrl(word) {
    const encodedWord = encodeURIComponent(word);
    return `https://dict.youdao.com/dictvoice?audio=${encodedWord}&type=1`; // 1-美音 2-英音
}