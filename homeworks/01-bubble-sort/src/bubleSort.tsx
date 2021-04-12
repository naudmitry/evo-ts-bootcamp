import {IState} from "./App";

export function bubbleSortInit(array: number[]): IState {
    return {
        array,
        swaps: 0,
        comparisons: 0,
        i: array.length - 1,
        j: 0,
        done: false,
        timer: setInterval(() => {}, 1000),
        data: convertArrayToData(array)
    };
}

export function bubbleSortStep(state: IState): Partial<IState> {
    let {array, swaps, comparisons, i, j} = state;

    if (i <= 0) {
        return {
            done: true
        };
    }

    if (array[j] > array[j + 1]) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        swaps++;
    }

    comparisons++;

    if (++j >= i) {
        i--;
        j = 0;
    }

    return {
        array,
        swaps,
        comparisons,
        i,
        j,
        data: convertArrayToData(array)
    };
}

export function convertArrayToData(array: number[]) {
    let data: any[] = [];

    array.forEach((value, index) => {
        data.push({
            key: index.toString(),
            value
        })
    });

    return data;
}