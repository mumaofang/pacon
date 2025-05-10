import dayjs from 'dayjs'
export function isAllEnglish(str) {
    return /^[A-Za-z]+$/.test(str); // 匹配纯英文字母（区分大小写）
}

export function becomeReviewPlan(arr) {
    // 判断是否已经生成复习机会
    const viewListStr = localStorage.getItem('reviewList');
    const day = dayjs().format('YYYY-MM-DD');
    let reviewList: any;
    if (viewListStr) {
        reviewList = JSON.parse(viewListStr)
    }
    // 如果存在 list 并且日期对，就返回list
    if (reviewList && reviewList.day === day) {
        return reviewList.list
    }
    // 否则存储list, 返回复习计划list
    reviewList = {
        day,
        list: arr
    }
    localStorage.setItem('reviewList', JSON.stringify(reviewList));
    return [...arr];
}

export function changeReviewPlan(arr) {
    const day = dayjs().format('YYYY-MM-DD');
    let reviewList = {
        day,
        list: arr
    }
    localStorage.setItem('reviewList', JSON.stringify(reviewList));
}