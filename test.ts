import {
    head, tail, init, map, zip, zipWith, filter, foldr, foldl, length,
    reverse, find, minimum, maximum, prepend, append, join, drop, take,
    splitAt, empty, some, all, quicksort, includes
    // @ts-ignore
} from './list.ts';
// @ts-ignore
import { out, sequence, group } from './io.ts';
//@ts-ignore
import { dot } from './utils.ts';

// Data
const data: number[] = [2, 4, 6, 8];
const double: number[] = map((x: number) => 2 * x)(data);
const add = (x: number) => (y: number) => x + y;
const x2 = (x: number) => 2 * x;
const x3 = (x: number) => 3 * x;
const rev: number[] = reverse(data);

// Helpers
const C = (b: boolean): string => b ? '✓' : '✗';
const are = (a: any[]) => (b: any[]) => JSON.stringify(a) === JSON.stringify(b);

// head
sequence([
    [out, 'fn: head'],
    [group, [
        [out, `Declare data = [${data}]`],
        [out, `${C(head(data) === 2)} head(data) = 2`],
        [out, `${C(head([]) === null)} head([]) = null`]
    ]]
]);

// tail
sequence([
    [out, 'fn: tail'],
    [group, [
        [out, `Declare data = [${data}]`],
        [out, `${C(are(tail(data))([4, 6, 8]))} tail(data) = [4, 6, 8]`],
        [out, `${C(are(tail([]))([]))} tail([]) = []`]
    ]]
]);

// init
sequence([
    [out, 'fn: init'],
    [group, [
        [out, `Declare data = [${data}]`],
        [out, `${C(are(init(data))([2, 4, 6]))} init(data) = [2, 4, 6]`],
        [out, `${C(are(init([]))([]))} tail([]) = []`]
    ]]
]);

// map
sequence([
    [out, 'fn: map'],
    [group, [
        [out, `Declare data = [${data}]`],
        [out, `${C(are(map((x: number) => 2 * x)(data))([4, 8, 12, 16]))} map(x => 2 * x)(data) = [4, 8, 12, 16]`],
        [out, `${C(are(map((x: number) => 2 * x)([]))([]))} map(x => 2 * x)([]) = []`]
    ]]
]);

// zip
sequence([
    [out, 'fn: zip'],
    [group, [
        [out, `Declare data = [${data}]`],
        [out, `Declare double = [${double}]`],
        [out, `${C(are(zip(data)(double))([[2, 4], [4, 8], [6, 12], [8, 16]]))} zip(data)(double) = [[2, 4], [4, 8], [6, 12], [8, 16]]`],
        [out, `${C(are(zip(data)([]))([]))} zip(data)([]) = []`],
        [out, `${C(are(zip([])(data))([]))} zip([])(data) = []`],
        [out, `${C(are(zip(data)([1, 2]))([[2, 1], [4, 2]]))} zip(data)([1, 2]) = [[2, 1], [4, 2]]`],
        [out, `${C(are(zip([1, 2])(data))([[1, 2], [2, 4]]))} zip([1, 2])(data) = [[1, 2], [2, 4]]`],
    ]]
]);

// zipWith
sequence([
    [out, 'fn: zipWith'],
    [group, [
        [out, `Declare data = [${data}]`],
        [out, `Declare double = [${double}]`],
        [out, `${C(are(zipWith(x => y => `(${x},${y})`)(data)(double))(['(2,4)', '(4,8)', '(6,12)', '(8,16)']))} zipWith(x => y => \`(\${x},\${y})\`)(data)(double) = ['(2,4)', '(4,8)', '(6,12)', '(8,16)']`],
        [out, `${C(are(zipWith(x => y => `(${x},${y})`)(data)([]))([]))} zipWith(x => y => \`(\${x},\${y})\`)(data)([]) = []`],
        [out, `${C(are(zipWith(x => y => `(${x},${y})`)([])(data))([]))} zipWith(x => y => \`(\${x},\${y})\`)([])(data) = []`],
        [out, `${C(are(zipWith(x => y => `(${x},${y})`)(data)([1, 2]))(['(2,1)', '(4,2)']))} zipWith(x => y => \`(\${x},\${y})\`)(data)([1, 2]) = ['(2,1)', '(4,2)']`],
        [out, `${C(are(zipWith(x => y => `(${x},${y})`)([1, 2])(data))(['(1,2)', '(2,4)']))} zipWith(x => y => \`(\${x},\${y})\`)([1, 2])(data) = ['(1,2)', '(2,4)']`],
    ]]
]);

// filter
sequence([
    [out, 'fn: filter'],
    [group, [
        [out, `Declare data = [${data}]`],
        [out, `${C(are(filter(t => t > 5)(data))([6, 8]))} filter(t => t > 5)(data) = [6, 8]`],
        [out, `${C(are(filter(t => true)(data))(data))} filter(t => true)(data) = [2, 4, 6, 8]`],
        [out, `${C(are(filter(t => false)(data))([]))} filter(t => false)(data) = []`],
        [out, `${C(are(filter(t => t > 5)([]))([]))} filter(t => t > 5)([]) = []`]
    ]]
]);

// foldr
sequence([
    [out, 'fn: foldr'],
    [group, [
        [out, `Declare data = [${data}]`],
        [out, `Declare add = ${add}`],
        [out, `${C(foldr(add)(0)(data) === data.reduce((p, c) => p + c))} foldr(add)(0)(data) = 20`],
        [out, `${C(foldr(add)(5)(data) === data.reduce((p, c) => p + c) + 5)} foldr(add)(5)(data) = 25`],
        [out, `${C(foldr(add)(0)([]) === 0)} foldr(add)(0)([]) = 0`],
        [out, `${C(foldr(add)(5)([]) === 5)} foldr(add)(5)([]) = 5`],
    ]]
]);

// foldl
sequence([
    [out, 'fn: foldl'],
    [group, [
        [out, `Declare data = [${data}]`],
        [out, `Declare add = ${add}`],
        [out, `${C(foldl(add)(0)(data) === data.reduce((p, c) => p + c))} foldl(add)(0)(data) = 20`],
        [out, `${C(foldl(add)(5)(data) === data.reduce((p, c) => p + c) + 5)} foldl(add)(5)(data) = 25`],
        [out, `${C(foldl(add)(0)([]) === 0)} foldl(add)(0)([]) = 0`],
        [out, `${C(foldl(add)(5)([]) === 5)} foldl(add)(5)([]) = 5`],
    ]]
]);

// dot
sequence([
    [out, 'fn: dot'],
    [group, [
        [out, `Declare data = [${data}]`],
        [out, `Declare 2x = ${x2}`],
        [out, `Declare 3x = ${x3}`],
        [out, `${C(are(dot(map(x2))(map(x3))(data))([12, 24, 36, 48]))} dot(map(x2))(map(x3))(data) = [12, 24, 36, 48]`],
        [out, `${C(dot(x2)(x3)(2) === 12)} dot(x2)(x3)(2) = 12`],
    ]]
]);

// length
sequence([
    [out, 'fn: length'],
    [group, [
        [out, `Declare data = [${data}]`],
        [out, `${C(length(data) === 4)} length(data) = 4`],
        [out, `${C(length([]) === 0)} length([]) = 0`],
    ]]
]);

// reverse
sequence([
    [out, 'fn: reverse'],
    [group, [
        [out, `Declare data = [${data}]`],
        [out, `${C(are(reverse(data))([8, 6, 4, 2]))} reverse(data) = [8, 6, 4, 2]`],
        [out, `${C(are(reverse([]))([]))} reverse([]) = []`],
    ]]
]);

// find
sequence([
    [out, 'fn: find'],
    [group, [
        [out, `Declare data = [${data}]`],
        [out, `${C(find([])(0) === null)} find([])(0) = null`],
        [out, `${C(find(data)(-1) === null)} find(data)(-1) = null`],
        [out, `${C(find(data)(Infinity) === null)} find(data)(Infinity) = null`],
        [out, `${C(find(data)(0) === 2)} find(data)(0) = 2`],
        [out, `${C(find(data)(1) === 4)} find(data)(1) = 4`],
        [out, `${C(find(data)(2) === 6)} find(data)(2) = 6`],
        [out, `${C(find(data)(3) === 8)} find(data)(3) = 8`],
    ]]
]);

// minimum
sequence([
    [out, 'fn: minimum'],
    [group, [
        [out, `Declare data = [${data}]`],
        [out, `${C(minimum(data) === 2)} minimum(data) = 2`],
        [out, `${C(minimum([]) === null)} minimum([]) = null`],
    ]]
]);

// maximum
sequence([
    [out, 'fn: maximum'],
    [group, [
        [out, `Declare data = [${data}]`],
        [out, `${C(maximum(data) === 8)} maximum(data) = 8`],
        [out, `${C(maximum([]) === null)} maximum([]) = null`],
    ]]
]);

// prepend
sequence([
    [out, 'fn: prepend'],
    [group, [
        [out, `Declare data = [${data}]`],
        [out, `${C(are(prepend(1)(data))([1, ...data]))} prepend(1)(data) = [1, 2, 4, 6, 8]`],
        [out, `${C(are(prepend(1)([]))([1]))} prepend(1)([]) = []`],
    ]]
]);

// append
sequence([
    [out, 'fn: append'],
    [group, [
        [out, `Declare data = [${data}]`],
        [out, `${C(are(append(data)(1))([...data, 1]))} append(data)(1) = [2, 4, 6, 8, 1]`],
        [out, `${C(are(append([])(1))([1]))} append([])(1) = []`],
    ]]
]);

// join
sequence([
    [out, 'fn: join'],
    [group, [
        [out, `Declare data = [${data}]`],
        [out, `${C(are(join(data)(data))([...data, ...data]))} join(data)(data) = [2, 4, 6, 8, 2, 4, 6, 8]`],
        [out, `${C(are(join([])(data))(data))} join([])(data) = [2, 4, 6, 8]`],
        [out, `${C(are(join(data)([]))(data))} join(data)([]) = [2, 4, 6, 8]`],
        [out, `${C(are(join([])([]))([]))} join([])([]) = []`],
    ]]
]);

// drop
sequence([
    [out, 'fn: drop'],
    [group, [
        [out, `Declare data = [${data}]`],
        [out, `${C(are(drop(-1)(data))(null))} drop(-1)(data) = null`],
        [out, `${C(are(drop(0)(data))(data))} drop(0)(data) = [2, 4, 6, 8]`],
        [out, `${C(are(drop(1)(data))([4, 6, 8]))} drop(1)(data) = [4, 6, 8]`],
        [out, `${C(are(drop(2)(data))([6, 8]))} drop(2)(data) = [6, 8]`],
        [out, `${C(are(drop(3)(data))([8]))} drop(3)(data) = [8]`],
        [out, `${C(are(drop(4)(data))([]))} drop(4)(data) = []`],
        [out, `${C(are(drop(5)(data))(null))} drop(5)(data) = null`],
    ]]
]);

// take
sequence([
    [out, 'fn: take'],
    [group, [
        [out, `Declare data = [${data}]`],
        [out, `${C(are(take(-1)(data))(null))} take(-1)(data) = null`],
        [out, `${C(are(take(0)(data))([]))} take(0)(data) = []`],
        [out, `${C(are(take(1)(data))([2]))} take(1)(data) = [2]`],
        [out, `${C(are(take(2)(data))([2, 4]))} take(2)(data) = [2, 4]`],
        [out, `${C(are(take(3)(data))([2, 4, 6]))} take(3)(data) = [2, 4, 6]`],
        [out, `${C(are(take(4)(data))(data))} take(4)(data) = [2, 4, 6, 8]`],
        [out, `${C(are(take(5)(data))(null))} take(5)(data) = null`],
    ]]
]);

// splitAt
sequence([
    [out, 'fn: splitAt'],
    [group, [
        [out, `Declare data = [${data}]`],
        [out, `${C(are(splitAt(-1)(data))(null))} splitAt(-1)(data) = null`],
        [out, `${C(are(splitAt(0)(data))([[], data]))} splitAt(0)(data) = [[], [2, 4, 6, 8]]`],
        [out, `${C(are(splitAt(1)(data))([[2], [4, 6, 8]]))} splitAt(1)(data) = [[2], [4, 6, 8]]`],
        [out, `${C(are(splitAt(2)(data))([[2, 4], [6, 8]]))} splitAt(2)(data) = [[2, 4], [6, 8]]`],
        [out, `${C(are(splitAt(3)(data))([[2, 4, 6], [8]]))} splitAt(3)(data) = [[2, 4, 6], [8]]`],
        [out, `${C(are(splitAt(4)(data))([[2, 4, 6, 8], []]))} splitAt(4)(data) = [[2, 4, 6, 8], []]`],
        [out, `${C(are(splitAt(5)(data))(null))} splitAt(5)(data) = null`],
    ]]
]);

// empty
sequence([
    [out, 'fn: empty'],
    [group, [
        [out, `Declare data = [${data}]`],
        [out, `${C(empty(data) === false)} empty(data) = false`],
        [out, `${C(empty([]) === true)} empty([]) = true`],
    ]]
]);

// some
sequence([
    [out, 'fn: some'],
    [group, [
        [out, `Declare data = [${data}]`],
        [out, `${C(some(x => x > 7)([]) === false)} some(x => x > 7)([]) = false`],
        [out, `${C(some(x => x < 2)([]) === false)} some(x => x < 2)([]) = false`],
        [out, `${C(some(x => x > 7)(data) === true)} some(x => x > 7)(data) = true`],
        [out, `${C(some(x => x < 2)(data) === false)} some(x => x < 2)(data) = false`],
        [out, `${C(some(x => false)(data) === false)} some(x => false)(data) = false`],
        [out, `${C(some(x => true)(data) === true)} some(x => true)(data) = true`],
    ]]
]);

// all
sequence([
    [out, 'fn: all'],
    [group, [
        [out, `Declare data = [${data}]`],
        [out, `${C(all(x => x > 7)([]) === false)} all(x => x > 7)([]) = false`],
        [out, `${C(all(x => x < 2)([]) === false)} all(x => x < 2)([]) = false`],
        [out, `${C(all(x => x > 7)(data) === false)} all(x => x > 7)(data) = false`],
        [out, `${C(all(x => x >= 2)(data) === true)} true(x => x < 2)(data) = true`],
        [out, `${C(all(x => false)(data) === false)} all(x => false)(data) = false`],
        [out, `${C(all(x => true)(data) === true)} all(x => true)(data) = true`],
    ]]
]);

// quicksort
sequence([
    [out, 'fn: quicksort'],
    [group, [
        [out, `Declare data = [${data}]`],
        [out, `Declare rev = [${rev}]`],
        [out, `${C(are(quicksort(data))(data))} quicksort(data) = [2, 4, 6, 8]`],
        [out, `${C(are(quicksort(rev))(data))} quicksort(rev) = [2, 4, 6, 8]`],
        [out, `${C(are(quicksort([]))([]))} quicksort([]) = []`],
    ]]
]);

// includes
sequence([
    [out, 'fn: includes'],
    [group, [
        [out, `Declare data = [${data}]`],
        [out, `${C(includes(1)(data) === false)} includes(1)(data) = false`],
        [out, `${C(includes(2)(data) === true)} includes(2)(data) = true`],
        [out, `${C(includes(3)(data) === false)} includes(3)(data) = false`],
        [out, `${C(includes(4)(data) === true)} includes(4)(data) = true`],
        [out, `${C(includes(5)(data) === false)} includes(5)(data) = false`],
        [out, `${C(includes(6)(data) === true)} includes(6)(data) = true`],
        [out, `${C(includes(7)(data) === false)} includes(7)(data) = false`],
        [out, `${C(includes(8)(data) === true)} includes(8)(data) = true`],
        [out, `${C(includes(9)(data) === false)} includes(9)(data) = false`],
        [out, `${C(includes(1)([]) === false)} includes(1)([]) = false`],
    ]]
]);
