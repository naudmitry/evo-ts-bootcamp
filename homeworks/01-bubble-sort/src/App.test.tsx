import React from 'react';
import {render, screen} from '@testing-library/react';
import {bubbleSortInit, bubbleSortStep} from "./bubleSort";
import App from "./App";

test('renders learn react link', () => {
    render(<App array={[10, 20, 30, 40, 50, 60]}/>);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});

describe('bubbleSort', () => {
    const random = [...new Array(100)]
        .map(_ => Math.random() * 100);

    const sorted = [...random]
        .sort((a, b) => a - b);

    const cases = [
        {input: [10, 20, 30, 40, 50, 60], expected: [10, 20, 30, 40, 50, 60]},
        {input: [60, 50, 40, 30, 20, 10], expected: [10, 20, 30, 40, 50, 60]},
        {input: [20, 60, 10, 40, 50, 30], expected: [10, 20, 30, 40, 50, 60]},
        {input: random, expected: sorted},
    ];

    cases.forEach(({input, expected}, i) => {
        it(`case ${i + 1}`, () => {
            let state = bubbleSortInit(input);

            while (!state.done) {
                state = {
                    ...state,
                    ...bubbleSortStep(state)
                };
            }

            expect(state.array).toEqual(expected);
        });
    });
});
