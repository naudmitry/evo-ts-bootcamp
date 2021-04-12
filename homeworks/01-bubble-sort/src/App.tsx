import React, {Component} from 'react';
import './App.css';
import {bubbleSortInit, bubbleSortStep} from "./bubleSort";
import Paper from '@material-ui/core/Paper';
import {Chart, BarSeries, Title, ArgumentAxis} from '@devexpress/dx-react-chart-material-ui';
import {Animation} from "@devexpress/dx-react-chart";

interface IProps {
    array: number[]
}

export interface IState {
    array: number[];
    swaps: number;
    comparisons: number;
    i: number;
    j: number;
    done: boolean;
    timer: NodeJS.Timeout;
}

class App extends Component<IProps, IState> {
    componentWillUnmount() {
        // clearInterval(this.state.timer!);
    }

    handleClick = () => {
        this.setState({
            ...bubbleSortInit(this.props.array),
            timer: setInterval(() => this.handleTimer(), 250)
        });
    };

    handleTimer = () => {
        this.setState(oldState => {
            const newState = bubbleSortStep(oldState) as IState;
            if (newState.done) {
                clearInterval(oldState.timer!);
            }
            return newState;
        });
    };

    render() {
        return (
            <div className="App">
                <Paper>
                    <Chart
                        data={[
                            { key: "1", value: 2.525 },
                            { key: "2", value: 3.018 },
                            { key: "3", value: 3.682 },
                            { key: "4", value: 4.44 },
                            { key: "5", value: 5.31 },
                            { key: "6", value: 6.127 },
                            { key: "7", value: 6.93 }
                        ]}
                    >
                        <ArgumentAxis/>
                        <BarSeries
                            valueField="value"
                            argumentField="key"
                        />
                        <Title text="Bubble sort"/>
                        <Animation/>
                    </Chart>
                </Paper>
            </div>
        );
    }
}

export default App;
