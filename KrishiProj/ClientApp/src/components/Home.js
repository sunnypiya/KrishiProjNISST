import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const Home = () => {
    const url = window.location.href.includes("test.rscyou.in") ? "/SVSRegistrations" : 'https://localhost:7095/SVSRegistrations';
    let RegisterEmptyObject = { data: null, success: false, message: "" };
    const [appointmentData, setAppointmentData] = useState(RegisterEmptyObject);
    useEffect(() => {
        axios.get(url).then((response) => {
        //axios.get(`${url}SVSRegistrations/`).then((response) => {
            setAppointmentData(response.data);
        });

        axios.get('https://localhost:7095/api/PushNotify').then((response) => {
            //axios.get(`${url}SVSRegistrations/`).then((response) => {
            console.log(response.data);
        });
    }, []);

    return (
        <>
            <h1>Hello, Farmers!</h1>
            <h4>Welcome Farmer Registration Form SVS</h4>
            <h5>Total Registration under village seed scheme are
                {appointmentData.success == false ? (<h2>Loading.....</h2>) : 
                    (<span className="text-success badge"><b><h5> {appointmentData.data.length}</h5></b></span>)}
                </h5>
            <br />
            <hr />

           
            <div class="alert alert-info" role="alert" style={{display:'none'} }><h2>
                {/*पुनः पंजीकरण दिनांक 16-11-2024 को किया जायेगा*/}

                <h3>किसी भी जानकारी के लिए सम्पर्क करे</h3>
                <h4>
                <ul>
                        <li>डा. अंजनी कुमार सिंह  9419171123</li>
                        <li>विकाश सिंह   6392848728</li>
                </ul>
                </h4>
            </h2>
                <hr />
            </div>
           
            <div class="alert alert-success" role="alert" style={{display:'block'} }><h2> पंजीकरण चालू कर दिया गया है।</h2></div>
            <div class="alert alert-danger" role="alert" style={{ display: 'none' }}><h2> पंजीकरण बंद कर दिया गया है। बीज समाप्त हो गए हैं।</h2></div>
            <hr />
            <div className="alert alert-primary" role="alert" >
                गेहूं का दाम - 1680/- रुपये प्रति 40 किलो
                <br />
                बिना पंजिकरण के ले सकते हैं गेहु HD2967
            </div>
            <div className="alert alert-secondary" role="alert" style={{display:'none'} } >
                सरसों का दाम - 140/- रुपये प्रति 2 किलो
            </div>
            <div className="alert alert-success" role="alert" style={{ display: 'none' }}>
                चना का दाम - 960/- रुपये प्रति 15 किग्रा
            </div>
            
          
            <Link className='btn btn-info btn-lg text-white' to= '/scscp-registration' >Click here for start your registration</Link>
        </>);
}
