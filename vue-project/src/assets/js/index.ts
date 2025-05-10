export function debounce(func, delay = 200) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// const handleResize = debounce(() => {
//     console.log('防抖处理后的宽度:', window.innerWidth);
//     checkWindowWidth(); // 复用前文的判断函数
// });

// function checkWindowWidth() {
//     const isWide = window.innerWidth > 900;
//     console.log(`当前宽度 ${window.innerWidth}px，是否大于 900px：${isWide}`);
//     // 触发业务逻辑
//     if (isWide) {
//       // 执行宽度 > 900px 时的操作
//     } else {
//       // 执行宽度 ≤ 900px 时的操作
//     }
//   }
