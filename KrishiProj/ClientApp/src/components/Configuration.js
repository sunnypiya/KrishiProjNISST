import React, { Component, useEffect, useState } from 'react';
import AppointmentsDetails from './AppointmentsDetails';
import axios from 'axios';

export const Configuration = () => {

    const [isAuthenticated, SetIsAuthenticated] = useState(false);
    const [mode, SetMode] = useState('update');
    const [password, SetPassword] = useState('');
    const [updateTextboxConfig, SetUpdateTextboxConfig] = useState('');
    const [updateDropdownConfig, SetUpdateDropdownConfig] = useState('-1');
    const [addTextboxKeyConfig, SetAddTextboxKeyConfig] = useState('');
    const [addTextboxValueConfig, SetAddTextboxValueConfig] = useState('');
    const [configAdded, SetConfigAdded] = useState(0);
    const [configsList, SetConfigsList] = useState([{}]);
    const passcodev = "SVS#Farmer@2022";


    useEffect(() => {
        // logic for fetecing the config details
        if (isAuthenticated) {

            axios.get(`"https:test.rscyou.in/api/UpdateConfig`).then((response) => {
            //axios.get(`https://localhost:7095/api/UpdateConfig`).then((response) => {
                console.log(response.data);
                SetConfigsList(response.data.data);
            });
        }

    }, [configAdded, isAuthenticated])


    const handleAuth = () => {
        if (passcodev === password) {
            SetIsAuthenticated(true);
        }
        else {
            alert('Passcode is wrong!!! Please try again');
            SetPassword('');
        }
    }

    const handleUpdateConfig = () => {

        if (updateDropdownConfig == '-1') {
            alert('please select config name');
            return;
        }
        debugger;
        //var content = { Id: 0, Key: updateDropdownConfig, Value: updateTextboxConfig };
        //const config = { headers: { 'Content-Type': 'application/json' } };

        //axios.put('https://localhost:7095/api/UpdateConfig/1', content, config).then((response) => {
        //    if (response.data.success) {
        //        alert('Data updated');
        //        SetUpdateDropdownConfig('-1');
        //        SetUpdateTextboxConfig('');
        //    }
        //});


        var myHeaders = new Headers();
        myHeaders.append("content-type", "application/json");

        let keyText = updateDropdownConfig.split(':')[0];
        var raw = JSON.stringify({
            "Id": "0",
            "Key": keyText,
            "Value": updateTextboxConfig
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https:test.rscyou.in/api/UpdateConfig/1", requestOptions)
        //fetch("https://localhost:7095/api/UpdateConfig/1", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    alert('Data updated');
                    SetUpdateDropdownConfig('-1');
                    SetUpdateTextboxConfig('');
                }
                else {
                    alert('Data not updated');
                }
            })
            .catch(error => console.log('error', error));
    }

    const handleAddConfig = () => {

        if (addTextboxKeyConfig == '' || addTextboxValueConfig == '') {
            alert('please enter values');
            return;
        }

        var content = { Id: 0, Key: addTextboxKeyConfig, Value: addTextboxValueConfig };
        const config = { headers: { 'Content-Type': 'application/json' } };

        axios.post('"https:test.rscyou.in/api/UpdateConfig', content, config).then((response) => {
        //axios.post('https://localhost:7095/api/UpdateConfig', content, config).then((response) => {
            if (response.data.success) {
                alert('Data Added');
                SetConfigAdded(content);
                SetAddTextboxKeyConfig('');
                SetAddTextboxValueConfig('');
            }
            else {
                alert('Data not Added');
            }
        });
    }
    return (
        <>
            {!isAuthenticated &&
                <div>
                    <h3>In this section you can add update common configs</h3>
                    <br />
                    <div>
                        Enter Passcode to continue <input type="password" className="form-control" value={password} onChange={(e) => SetPassword(e.target.value)} />
                        <button className="btn btn-success" onClick={handleAuth}>Authenticate</button>
                    </div>
                </div>
            }
            {isAuthenticated &&

                <>
                    <div>
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a className={`nav-link ponter ${mode === 'add' ? 'active active_border_add' : ''}`} aria-current="page" onClick={() => SetMode('add')} >Add</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ponter ${mode === 'update' ? 'active active_border_update' : ''}`} onClick={() => SetMode('update')}>Update</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ponter ${mode === 'svs_Appoinment' ? 'active active_border_svs_Appoinment' : ''}`} onClick={() => SetMode('svs_Appoinment')}>SVS Appointments</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link ponter text-danger" onClick={() => SetIsAuthenticated(false)}>Logout</a>
                            </li>
                        </ul>
                    </div>
                    {mode === "update" ?

                        <div>
                            <br />
                            <h4>Update common configs</h4>

                            <select className='form-control mt-2' value={updateDropdownConfig} onChange={(e) => SetUpdateDropdownConfig(e.target.value)}>
                                { configsList &&
                                    //?
                                    //<>
                                    //    <option value="-1">Select Config</option>
                                    //    <option value="PerDayLimit">Per Day Limit</option>
                                    //</>
                                    //:
                                    <>
                                        <option value="-1">Select Config</option>
                                        {configsList.map((c, i) => <option value={c.key + ":" + c.value} key={`config-${i}`}>{c.key}</option>)}


                                    </>
                                }
                            </select>
                            Enter New value <input type="text" className="form-control" value={updateTextboxConfig} onChange={(e) => SetUpdateTextboxConfig(e.target.value)} />
                            <button className="btn btn-success" onClick={handleUpdateConfig}>Update</button>
                        </div>
                        :
                        ''
                    }
                    {mode === "add" ?

                        <div>
                            <br />
                            <h4>Add common configs</h4>
                            Enter New key <input type="text" className="form-control" value={addTextboxKeyConfig} onChange={(e) => SetAddTextboxKeyConfig(e.target.value)} />
                            Enter key's value <input type="text" className="form-control" value={addTextboxValueConfig} onChange={(e) => SetAddTextboxValueConfig(e.target.value)} />
                            <button className="btn btn-success" onClick={handleAddConfig}>Add</button>
                        </div>
                        :
                        ''
                    }

                    {mode === "svs_Appoinment" ?

                        <div>
                            <AppointmentsDetails />
                        </div>
                        :
                        ''
                    }
                </>
            }

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
