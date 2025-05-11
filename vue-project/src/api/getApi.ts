import Axios from './Axios';
interface ApiResponseCommon {
    success: boolean,
    code: number
}


export async function getData(word: string, test: boolean = false) {
    interface ApiResponse {
        phonetic: {
            uk: string,
            us: string
        };
        from: string,
        translation: string;  // 明确声明所需属性
        mp3: {
            google: string,
            youdao: string
        }; // 可选属性标记
        notes: string
    }
    let result: ApiResponse = await Axios.post('/api/getData', {
        data: word,
        test
    })
    return result
}
export async function save(wordInfo: object) {
    interface ApiResponse {
        success: boolean,
        code: number,
        shoucan?: object
    }
    let result: ApiResponse = await Axios.post('/api/save/wrold', wordInfo)
    return result;
}

export async function getWrods() {
    interface ApiResponse {
        success: boolean,
        code: number,
        shoucan: object
    }
    let res: ApiResponse = await Axios.post('/api/get/wrolds', {});
    
    return res;
}

export async function getAiAnswer(data) {
    interface ApiResponse {
        success: boolean,
        code: number,
        items?: object
    }
    let res: ApiResponse = await Axios.post('/api/getAiAnswer', { ...data });
    return res;
}
export async function getAiAnswerForPrompt(data) {
    interface ApiResponse {
        success: boolean,
        code: number,
        items?: object
    }
    let res: ApiResponse = await Axios.post('/api/getAiAnswerForPrompt', { ...data });
    return res;
}

export async function saveNotesApi(data) {
    interface ApiResponse {
        success: boolean,
        code: number,
        shoucan?: object
    }
    let res: ApiResponse = await Axios.post('/api/saveNotes', { ...data });
    return res;
}
export async function cancelShoucanApi(data) {
    interface ApiResponse {
        success: boolean,
        code: number,
        shoucan?: object
    }
    let res: ApiResponse = await Axios.post('/api/cancelShoucan', { data });
    return res;
}


