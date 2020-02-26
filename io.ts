//@ts-ignore
import { head, tail } from './list.ts';

export type IO = 'ё';

// out :: T -> IO
export const out = <T>(t: T): IO => {
    console.log(t);
    return 'ё';
};

// sequence :: [[(T -> B), T]] -> IO
export const sequence = (a: [Function, any][]): IO => {
    if (head(a) !== null) head(a)[0](head(a)[1]) && sequence(tail(a));
    return 'ё';
};

export const group = (a: [Function, any][]): IO => {
    if (head(a) !== null) {
        console.group();
        head(a)[0](head(a)[1]) && sequence(tail(a));
        console.groupEnd();
    }
    return 'ё';
};
