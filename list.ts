/**
 * Functional Programming Lists
 * Inspired by Haskell, Implemented in TypeScript
 * https://wiki.haskell.org/How_to_work_on_lists
 */

// head :: [T] -> T
export const head = <T>(a: T[]): T => {
    if (length(a) === 0) return null;
    else return a[0];
};

// tail :: [T] -> [T]
export const tail = <T>(a: T[]): T[] => {
    if (length(a) === 0) return [];
    else return a.slice(1, length(a));
};

// init :: [T] -> [T]
export const init = <T>(a: T[]): T[] => {
    if (length(a) === 0) return [];
    else return a.slice(0, length(a) - 1);
};

// map :: (T -> B) -> [T] -> [B]
export const map = <T, B>(f: (x: T) => B) => (a: T[]): B[] => {
    if (head(a) === null) return [];
    else return [f(head(a)), ...map(f)(tail(a))];
};

// zip :: [T] -> [B] -> [[T, B]]
export const zip = <T>(f: T[]) => <B>(l: B[]): [T, B][] => {
    if (head(f) === null) return [];
    if (head(l) === null) return [];
    else return [[head(f), head(l)], ...zip(tail(f))(tail(l))];
};

// zipWith :: (T -> B -> C) -> [T] -> [B] -> [C]
export const zipWith = <T, B, C>(f: (x: T) => (y: B) => C) =>
    (t: T[]) => (b: B[]): C[] => {
        if (head(t) === null) return [];
        if (head(b) === null) return [];
        else return [f(head(t))(head(b)), ...zipWith(f)(tail(t))(tail(b))];
    };

// filter :: (T -> boolean) -> [T] -> [T]
export const filter = <T>(f: (x: T) => boolean) => (a: T[]): T[] => {
    if (head(a) === null) return [];
    if (f(head(a))) return [head(a), ...filter(f)(tail(a))];
    else return filter(f)(tail(a));
};

// foldr :: (T -> B -> B) -> B -> [T] -> B
export const foldr = <T, B>(f: (x: T) => (y: B) => B) =>
    (z: B) => (a: T[]): B => {
        if (head(a) === null) return z;
        else return f(head(a))(foldr(f)(z)(tail(a)));
    };

// foldl :: (T -> B -> B) -> B -> [T] -> B
export const foldl = <T, B>(f: (x: T) => (y: B) => B) =>
    (z: B) => (a: T[]): B => {
        if (head(a) === null) return z;
        else return foldl(f)(f(head(a))(z))(tail(a));
    };

// length :: [T] -> number
export const length = <T>(a: T[]): number => a.length;

// reverse :: [T] -> [T]
export const reverse = <T>(a: T[]): T[] =>
    foldl((x: T) => (y: T[]) => [x, ...y])([])(a);

// find :: [T] -> number
export const find = <T>(a: T[]) => (n: number): T => {
    if (head(a) === null) return null;
    if (n < 0 || n >= length(a)) return null;
    else return a[n];
};

// minimum :: [number] -> number
export const minimum = (a: number[]): number => {
    if (head(a) === null) return null;
    else return head(quicksort(a));
};

// maximum :: [number] -> number
export const maximum = (a: number[]): number => {
    if (head(a) === null) return null;
    else return head(reverse(quicksort(a)));
};

// prepend :: T -> [T] -> [T]
export const prepend = <T>(t: T) => (a: T[]): T[] => [t, ...a];

// append :: [T] -> T -> [T]
export const append = <T>(a: T[]) => (t: T): T[] => [...a, t];

// join :: [T] -> [T] -> [T]
export const join = <T>(f: T[]) => (l: T[]): T[] => {
    if (head(f) === null) return l;
    if (head(l) === null) return f;
    else return [...f, ...l];
};

// drop :: number -> [T] -> [T]
export const drop = (n: number) => <T>(a: T[]): T[] => {
    if (n < 0 || n > length(a)) return null;
    if (n === 0) return a;
    else return a.slice(n);
};

// take :: number -> [T] -> [T]
export const take = (n: number) => <T>(a: T[]): T[] => {
    if (n < 0 || n > length(a)) return null;
    if (n === 0) return [];
    else return a.slice(0, n);
};

// splitAt :: number -> [T] -> [[T]]
export const splitAt = (n: number) => <T>(a: T[]): [T[], T[]] => {
    if (n < 0 || n > length(a)) return null;
    if (head(a) === null) return [[], []];
    else return [take(n)(a), drop(n)(a)];
};

// empty :: [T] -> boolean
export const empty = <T>(a: T[]): boolean => length(a) === 0;

// some :: (T -> boolean) -> [T] -> boolean
export const some = <T>(f: (x: T) => boolean) => (a: T[]): boolean => {
    if (head(a) === null) return false;
    if (tail(a) === []) return f(head(a));
    else return f(head(a)) || some(f)(tail(a));
};

// all :: (T -> boolean) -> [T] -> boolean
export const all = <T>(f: (x: T) => boolean) => (a: T[]): boolean => {
    if (head(a) === null) return false;
    if (tail(a) === []) return f(head(a));
    else return f(head(a)) && some(f)(tail(a));
};

// quicksort :: [number] -> [number]
export const quicksort = (a: number[]): number[] => {
    if (length(a) === 0) return [];
    else return [
        ...quicksort(filter((x: number) => x <= head(a))(tail(a))),
        head(a),
        ...quicksort(filter((x: number) => x > head(a))(tail(a)))
    ];
};

// includes :: T -> [T] -> boolean
export const includes = <T>(t: T) => (a: T[]): boolean => a.includes(t);
