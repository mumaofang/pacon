export function getPrompts(n) {
    let promptsArr = ['有趣', '生动', '搞笑', '夸张', '拟人']
    // 随机获得一个提示语
    const index = Math.floor(Math.random() * 5);
    return promptsArr[index]
}