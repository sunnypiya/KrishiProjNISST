import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const AppointmentLetter = (props) => {
    const { code } = useParams();
    const url = window.location.href.includes("test.rscyou.in") ? "/SVSRegistrations" : 'https://localhost:7095/SVSRegistrations';
    let RegisterEmptyObject = { data: null, success: false, message: "" };

    const [appointmentData, setAppointmentData] = useState(RegisterEmptyObject);

    useEffect(() => {
        debugger;
        //alert(UniqueCode);
        //axios.get(`${url}SVSRegistrations/${code}`).then((response) => {
        axios.get(`${url}/${code}`).then((response) => {
            setAppointmentData(response.data);
            console.log(response.data);
        });
    }, []);


    return (
        <>
            <div>
                {appointmentData.success == false ? (<h2>Loading.....</h2>)
                    :
                    (
                        <div>
                            <ul className="list-group">
                                <li className="list-group-item bg-primary text-white shadow" aria-current="true">
                                    <span className="text-start fw-bold">Seed Village Scheme - </span> <span className="text-end"> Total Registration till now ({appointmentData.data.totalRegistration})</span></li>
                            </ul>
                            <table className="table table-striped">
                                <thead>
                                    <th colSpan="2">किसान का विवरण ({appointmentData.data.year})</th>
                                </thead>
                                <tbody>
                                    <tr className="table-active">
                                        <td>किसान का नाम</td>
                                        <td>:</td>
                                        <td>{appointmentData.data.name}</td>
                                    </tr>
                                    <tr>
                                        <td>पिता/पति का नाम</td>
                                        <td>:</td>
                                        <td>{appointmentData.data.fatherName}</td>
                                    </tr>
                                    <tr>
                                        <td>आधार नंबर</td>
                                        <td>:</td>
                                        <td>{appointmentData.data.adharNumber}</td>
                                    </tr>
                                    <tr>
                                        <td>मोबाइल नंबर</td>
                                        <td>:</td>
                                        <td>{appointmentData.data.mobileNumber}</td>
                                    </tr>
                                    <tr>
                                        <td>श्रेणी </td>
                                        <td>:</td>
                                        <td>{appointmentData.data.category}</td>
                                    </tr>
                                    <tr>
                                        <td>लिंग </td>
                                        <td>:</td>
                                        <td>{appointmentData.data.gender}</td>
                                    </tr>
                                    <tr>
                                        <td>पूरा पता</td>
                                        <td>:</td>
                                        <td>{appointmentData.data.village},  {appointmentData.data.block}, {appointmentData.data.district}</td>
                                    </tr>
                                    <tr>
                                        <td>फसल का नाम</td>
                                        <td>:</td>
                                        <td>{ appointmentData.data.cropName}</td>
                                    </tr>
                                    <tr>
                                        <td>Registeration Number</td>
                                        <td>:</td>
                                        <td>{appointmentData.data.id}</td>
                                    </tr>
                                    <tr>
                                        <td>Appointment Date</td>
                                        <td>:</td>
                                        <td className="text-success"><b><h4>{appointmentData.data.appointmentShift} - {appointmentData.data.appointmentDateFormated}</h4></b></td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3">
                                            <div style={{ display: 'flex', padding: '10px', margin: '10px', justifyContent: 'center', alignItems: 'center' } }>
                                                <button className="btn btn-success" onClick={() => window.print()}>Print Appointment Letter</button>
                                                <a className="btn btn-secondary" style={{ marginLeft: '10px' }} href="https://www.onlinesbi.sbi/sbicollect/icollecthome.htm?corpID=3825559" target='_blank'
                                                >Pay Now</a>
                                                {/*<button className="btn btn-secondary" style={{ marginLeft: '10px' }} onClick={() => window.location.href = '/'}*/}
                                                {/*>Back to home page</button>*/}
                                            </div>
                                        </td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )
                }

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
