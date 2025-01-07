import React, { Component, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { AppointmentLetter } from './AppointmentLetter';
import { Link, useParams } from 'react-router-dom';

import { useReactToPrint } from 'react-to-print';
//import { confirm } from "react-confirm-box";

function AppointmentsDetails() {

    const [resgistrationData, setResgistrationData] = useState([]);
    let RegisterEmptyObject = { data: null, success: false, message: "" };
    const url = window.location.href.includes("test.rscyou.in") ? "/SVSRegistrations" : 'https://localhost:7095/SVSRegistrations';
    //const url = window.location.href.includes("test.itsrsc.in") ? "/SVSRegistrations" : 'https://localhost:7095/SVSRegistrations';
    const urlBase = window.location.href.includes("test.rscyou.in") ? "/" : 'https://localhost:7095/';
    const { pass } = useParams();
    const componentRef = useRef();
    const dateInputRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const handleCropNameFilter = (e) => {
        console.log(e.target.value);
        setResgistrationData(e => e = []);
        axios.get(`${url}/AppointmentList/cropName:${e.target.value}`).then((response) => {
            console.log(response.data);
            setResgistrationData(response.data);

        });
    }
    const handleAppointmentDateFilter = (e) => {
       // console.log();
        setResgistrationData(e => e = []);
        axios.get(`${url}/AppointmentList/AppointmentDate:${e.target.value}`).then((response) => {
            console.log(response.data);
            setResgistrationData(response.data);
            //dateInputRef.current.value = formatDate(e.target.value); 
        });
    }
    const handleDelete = async (Id) => {
        const result = window.confirm(`Are you sure, you want to delete this record with SVS ID- ${Id} `);

        if (result) {

            axios.post(`${url}/${Id}`, {
                _method: 'DELETE'
            }).then((response) => {
                //console.log(response.data);
                if (response.data.success === true) {
                    let tempData = resgistrationData.data.filter((e) => { return e.id !== Id });
                    RegisterEmptyObject.data = tempData;
                    RegisterEmptyObject.success = true;
                    RegisterEmptyObject.message = "deleted";
                    console.log(RegisterEmptyObject);
                    setResgistrationData(RegisterEmptyObject);
                }


            });
        }

    }

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    function formatDate(date = new Date()) {
        return [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-');
    }



    useEffect(() => {
        // logic for fetecing the appointment details
        if (pass !== 'pass:1111') {

            axios.get(`${url}/AppointmentList/FirstLoad:True`).then((response) => {
                console.log(response.data);
                setResgistrationData(response.data);

            });

            console.log(formatDate());
            dateInputRef.current.value = formatDate(); 
        }
        else {
            alert('No Authorized');
            window.location.href = '/';
        }

        //   return () => {

        //   }
    }, [])





    return (
        <>
            <div style={{ display: 'flex', padding: '10px', margin: '10px', justifyContent: 'space-between', alignItems: 'center' }}>
                <div><h4>Appointments Details</h4></div>
                <div style={{ display: 'flex', padding: '10px', margin: '10px', justifyContent: 'center', alignItems: 'center' }}>
                    <span>Filter By: </span>
                    <span>
                        <select className='form-control mx-2 form-select' onChange={handleCropNameFilter}>
                            <option value="-1">Select</option>
                            <option value="all">All</option>
                            <option value="गेहूँ">गेहूँ</option>
                            <option value="गेहूँ-DBW187">गेहूँ - DBW 187</option>
                            <option value="चना">चना</option>
                             <option value="चना-RVG202">चना - RVG202</option>
                            <option value="सरसो">सरसो</option>
                            <option value="सरसो-GIRIRAJ">सरसो - GIRIRAJ</option>
                            <option value="धान">धान</option>
                        </select>
                    </span>
                    <span>
                        <input type="date" className="form-control mx-2 " ref={dateInputRef}  onChange={handleAppointmentDateFilter} />
                    </span>
                    <span>
                        <button type="button" className="btn btn-primary" onClick={(e) => handlePrint(e)}>
                            <svg className="mx-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-printer-fill" viewBox="0 0 16 16">
                                <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z"></path>
                                <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"></path>
                            </svg>
                            <span className='mr-2'> Print</span>
                        </button>
                    </span>
                  {/*  Total Record(s) - {resgistrationData.length == 0 ? <h2></h2> : <h6>{resgistrationData.length}</h6>}*/} 
                </div>
            </div>
            <hr></hr>
            <table className="table table-responsive table-hover table_id" id="printablediv" ref={componentRef}>
                <thead>
                    <tr>
                        <td>Item</td>
                        <td>SVS Id</td>
                        <td>Name</td>
                        <td>Father/Husband</td>
                        <td>Adhar No.</td>
                        <td>Mobile</td>
                        <td>Category</td>
                        <td>Gender</td>
                        <td>Address</td>
                        <td>Appointment Date</td>
                        <td>Crop Name</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {resgistrationData.length == 0 ? <span><h4>Loading Appointments <img src={'../Images/Loading.svg'} width={70} height={70 } /></h4></span> :

                        resgistrationData.data.map((data, i) => {
                            return (

                                <tr key={i}>
                                    <td>
                                        {i + 1}
                                    </td>
                                    <td>
                                        <a className='btn btn-link btn-sm' target={'_blank'} href={`/svs-appointment-lettter/${data.uniqeCode}`} >{data.id}</a>
                                    </td>
                                    <td className='text-capitalize'>
                                        {data.name}
                                    </td>
                                    <td className='text-capitalize'>
                                        {data.fatherName}
                                    </td>
                                    <td>
                                        {data.adharNumber}

                                        <a className='btn btn-link btn-sm' target={'_blank'} href={`/UploadedFiles/${data.adharFilePath}`} >View File</a>
                                    </td>
                                    <td>
                                        {data.mobileNumber}
                                    </td>
                                    <td>
                                        {data.category}
                                    </td>
                                    <td>
                                        {data.gender}
                                    </td>
                                    <td>
                                        {data.village},{data.block}, {data.district}
                                    </td>
                                    <td>
                                        {data.appointmentDateFormated} <br /> {data.appointmentShift}
                                    </td>


                                    <td>
                                        {data.cropName}
                                    </td>
                                    <td>
                                        <button className='btn btn-danger btn-sm' onClick={() => { handleDelete(data.id) }}>Delete</button>
                                    </td>


                                </tr>

                            )

                        })
                    }
                </tbody>
            </table>

        </>
    )
}

export default AppointmentsDetails