import React, { Component, useState } from 'react';


export const Counter = () => {
    const [currentCount, SetCurrentCount] = useState(0);

    const incrementCounter = () => {
        SetCurrentCount((prev) => prev + 1);
    }

    const decrementCounter = () => {
        SetCurrentCount((prev) => prev - 1);
    }

    return (
        <>
            <div>
                <button className='btn btn-info' onClick={() => alert('hello shyam')}>Click me!</button>
                <h1>Counter by functional component</h1>

                <p>This is a simple example of a React component.</p>

                <p aria-live="polite">Current count: <strong>{currentCount}</strong></p>

                <button className="btn btn-primary m-2" onClick={incrementCounter}>Increment</button>
                <button className="btn btn-danger" onClick={decrementCounter}>Dencrement</button>
            </div>
        </>);
}


//export class Counter extends Component {
//    static displayName = Counter.name;

//    constructor(props) {
//        super(props);
//        this.state = { currentCount: 0 };
//        this.incrementCounter = this.incrementCounter.bind(this);
//    }

//    incrementCounter() {
//        this.setState({
//            currentCount: this.state.currentCount + 1
//        });
//    }

//    render() {
//        return (

//            <div>
//                <button className='btn btn-info' onClick={() => alert('hello shyam')}>Click me!</button>
//                <h1>Counter</h1>

//                <p>This is a simple example of a React component.</p>

//                <p aria-live="polite">Current count: <strong>{this.state.currentCount}</strong></p>

//                <button className="btn btn-primary" onClick={this.incrementCounter}>Increment</button>
//            </div>
//        );
//    }
//}
