import {splitCSVButIgnoreCommasInDoublequotes} from './splitInQuotes'

export const transform = (doc: string): string[][] => {
    return doc.split("\n").map(splitCSVButIgnoreCommasInDoublequotes);
}

