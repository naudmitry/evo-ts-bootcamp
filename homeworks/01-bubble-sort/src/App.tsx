import React, {Component} from 'react';
import './App.css';
import {bubbleSortInit, bubbleSortStep, convertArrayToData} from "./bubleSort";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
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
    data: any[];
    timer: NodeJS.Timeout;
}

class App extends Component<IProps, IState> {
    componentWillUnmount() {
        clearInterval(this.state.timer!);
    }

    private handleClick = () => {
        this.setState({
            ...bubbleSortInit(this.props.array),
            timer: setInterval(() => this.handleTimer(), 1000)
        });
    };

    private handleTimer = () => {
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
            <div className="App" ref={React.createRef()}>
                <Box width={1 / 4} className="Container">
                    <Paper>
                        <Chart data={this.state? this.state.data : convertArrayToData(this.props.array)}>
                            <ArgumentAxis/>
                            <BarSeries
                                valueField="value"
                                argumentField="key"
                            />
                            <Title text="Bubble sort"/>
                            <Animation/>
                        </Chart>
                        <Button color="primary" onClick={this.handleClick}>
                            Sort
                        </Button>
                    </Paper>
                </Box>
            </div>
        );
    }
}

export default App;
