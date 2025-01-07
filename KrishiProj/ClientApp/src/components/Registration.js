import React, { Component, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { AppointmentLetter } from './AppointmentLetter';
import { Link } from 'react-router-dom';

export const Registration = () => {

    let RegisterEmptyObject = { data: null, success: false, message: "" };
    const [file, setFile] = useState();
    //const [name, setName] = useState('shyam');
    //const [fatherName, setFatherName] = useState('babban');
    //const [adharNumber, setAdharNumber] = useState('112564526726');
    //const [mobile, setMobile] = useState('7048983960');
    //const [category, setCategory] = useState('GEN');
    //const [gender, setGender] = useState('पुरुष');
    //const [village, setVillage] = useState('d');
    //const [block, setBlock] = useState('d');
    //const [district, setDistrict] = useState('आगरा');
    //const [cropName, setCropName] = useState('गेहूँ');
    //const [errorCount, setErrorCount] = useState(0);
    //const [resgistrationResponseData, setResgistrationResponseData] = useState(RegisterEmptyObject);
    //let errorCounter = 0;

    const [name, setName] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [adharNumber, setAdharNumber] = useState('');
    const [mobile, setMobile] = useState('');
    const [category, setCategory] = useState('-1');
    const [gender, setGender] = useState('-1');
    const [village, setVillage] = useState('');
    const [block, setBlock] = useState('');
    const [district, setDistrict] = useState('-1');
    const [cropName, setCropName] = useState('-1');
    const [errorCount, setErrorCount] = useState(0);
    const [subDistrict, setSubDistrict] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [resgistrationResponseData, setResgistrationResponseData] = useState(RegisterEmptyObject);
    let errorCounter = 0;

    //useEffect(() => {

    //},[resgistrationResponseData]);

    const nameInput = useRef();
    const fatherNameInput = useRef();
    const adharNumberInput = useRef();
    const mobileInput = useRef();
    const categoryInput = useRef();
    const genderInput = useRef();
    const villageInput = useRef();
    const blockInput = useRef();
    const districtInput = useRef();
    const cropNameInput = useRef();
    const fileInput = useRef();
    const subDistrictInput = useRef();
    const submitBtn = useRef();



    useEffect(() => {
        let url = window.location.href.includes("test.rscyou.in") ? "/api/UpdateConfig" : 'https://localhost:7095/api/UpdateConfig';
        
        axios.get(`${url}`).then((response) => {
            if (response.data.success) {
                if (response.data.data[2].value == 1) {
                    setIsOpen(true);
                    console.log(response.data.data[2].value);
                }
                else {
                    setIsOpen(false);
                    console.log(response.data.data[2].value);
                }
                
            }
        });
    }, []);


    const handleChange = (event) => {
        setFile(() => event.target.files[0]);
    }
    const handleTextChange = (event) => {
        setName(event.target.value);
        console.log(name);
    }

    const FlagErrorToTextControl = (inputControl, value) => {
        if (value === "") {
            inputControl.current.classList.add("errorTextbox");
            //setErrorCount(currCount => currCount + 1);
            errorCounter = errorCounter + 1;
            console.log(errorCount);
            return
        }
        else {
            inputControl.current.classList.remove("errorTextbox");
            return
        }
    }

    const FlagErrorToSelectControl = (inputControl, value) => {
        if (value === "-1") {
            inputControl.current.classList.add("errorTextbox");
            //setErrorCount(currCount => currCount + 1);
            errorCounter = errorCounter + 1;
            console.log(errorCount);
            return
        }
        else {
            inputControl.current.classList.remove("errorTextbox");
            return
        }
    }
    async function ValidateForm() {
        errorCounter = 0;
        FlagErrorToTextControl(nameInput, name);
        FlagErrorToTextControl(fatherNameInput, fatherName);
        FlagErrorToTextControl(adharNumberInput, adharNumber);
        FlagErrorToTextControl(mobileInput, mobile);
        FlagErrorToSelectControl(genderInput, gender);
        FlagErrorToSelectControl(categoryInput, category);
        FlagErrorToTextControl(villageInput, village);
        FlagErrorToTextControl(blockInput, block);
        FlagErrorToTextControl(subDistrictInput, subDistrict);
        FlagErrorToSelectControl(districtInput, district);
        FlagErrorToSelectControl(cropNameInput, cropName);
        FlagErrorToTextControl(fileInput, file, 'File');
        nameInput.current.focus();
        //setErrorCount(currCount => currCount = currCount + 0);
        //alert(errorCounter);
        //debugger;
        if (errorCounter === 0) {
            return true
        }
        else {
            return false;
        }
    }


    function handleReset(event) {
        event.preventDefault();
        ResetForm();
        setResgistrationResponseData(RegisterEmptyObject);
        window.location.href = '/scscp-registration';
    }
    const ResetForm = () => {
        setFile(null);
        setName('');
        fileInput.current.value = '';
        setFatherName('');
        setAdharNumber('');
        setBlock('');
        setVillage('');
        setDistrict('-1');
        setCropName('-1');
        setCategory('-1');
        setGender('-1');
        setMobile('');
        setSubDistrict('');
        //window.location.href = '/scscp-registration';
        //setResgistrationResponseData(RegisterEmptyObject)
    }
    async function handleSubmit(event) {
        event.preventDefault()
        event.currentTarget.disabled = true;
        ValidateForm();
        if (adharNumber.length != 12) {
            errorCounter += 1;
            adharNumberInput.current.classList.add("errorTextbox");
        }
        else {
            adharNumberInput.current.classList.remove("errorTextbox");
            //errorCounter -= 1;
        }
        if (mobile.length != 10) {
            errorCounter += 1;
            mobileInput.current.classList.add("errorTextbox");
        }
        else {
            mobileInput.current.classList.remove("errorTextbox");
            //errorCounter -= 1;
        }
        //console.log(file);
        if (file === undefined) {
            alert('please upload adharcard file');
            errorCounter = errorCounter + 1;
        }
        else {
            if (file.size >= 510000) {
                errorCounter = errorCounter + 1;
                alert("फ़ाइल का आकार 500kb से बड़ा है!!! File Size is bigger than 500kb!!!");
            }
        }


        if (errorCounter > 0) {
            console.log(nameInput.current.value);
            alert('Not Validated');
            event.currentTarget.disabled = false;
            return false;
        }
        else {
            event.currentTarget.disabled = true;
            errorCounter = 0;
            alert('Validated');

            const url = window.location.href.includes("test.rscyou.in") ? "/SVSRegistrations" : 'https://localhost:7095/SVSRegistrations';

            var formdata = new FormData();
            formdata.append("FileAdhar", file);
            formdata.append("Name", name);
            formdata.append("fatherName", fatherName);
            formdata.append("adharNumber", adharNumber);
            formdata.append("mobile", mobile);
            formdata.append("category", category);
            formdata.append("gender", gender);
            formdata.append("village", village);
            formdata.append("block", block + ' | उप जिला - ' + subDistrict);
            formdata.append("district", district);
            formdata.append("cropName", cropName);

            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };

            axios.post(url, formdata, requestOptions).then((response) => {
                setResgistrationResponseData(response.data);
                ResetForm();
                if (!response.data.success) {
                    alert(response.data.message);
                }
            });
        }


    }
    return (
        <>
            {isOpen === true ?
                <div className='shadow-lg p-4' style={{ borderTop: '1.5px solid black', borderBottom: '1.5px solid black', BorderRadius: 50 }}>
                    <h1 className="text-success">FARMER REGISTRATION FORM Under Seed Village Scheme</h1>
                    <form>
                        <div className='shadow-lg p-5' style={{ borderTop: '1.5px solid black', borderBottom: '1.5px solid black', BorderRadius: 50 }}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputText1" className="form-label">नाम: <span>*</span></label>
                                <input type="text" className="form-control" id="exampleInputText1" value={name} onChange={handleTextChange} required aria-describedby="textHelp" ref={nameInput} />
                            </div>

                            <div className="mb-3 mt-4">
                                <label htmlFor="exampleInputText1" className="form-label">पिता/पति का नाम : <span>*</span></label>
                                <input type="text" className="form-control" id="exampleInputText1" value={fatherName} onChange={(e) => setFatherName(e.target.value)} required aria-describedby="textHelp" ref={fatherNameInput} />
                            </div>

                            <div className="mt-4 mb-4">
                                <label htmlFor="exampleInputText1" className="form-label">आधार नंबर : <span>*</span></label>
                                <input type="text" className="form-control" id="exampleInputText1" required aria-describedby="textHelp"
                                    ref={adharNumberInput} value={adharNumber} onChange={(e) => setAdharNumber(e.target.value)}
                                />
                            </div>

                            <div className="mb-3 mt-4">
                                <label htmlFor="exampleInputText1" className="form-label">मोबाइल नंबर: <span>*</span> </label>
                                <input type="text" className="form-control" id="exampleInputText1" required aria-describedby="textHelp"
                                    ref={mobileInput} value={mobile} onChange={(e) => setMobile(e.target.value)}
                                />

                            </div>

                            <label htmlFor="" className="form-label">श्रेणी : <span>*</span> </label>
                            <select className="form-select mt-2" aria-label="Default select example"
                                ref={categoryInput} value={category} onChange={(e) => { setCategory(e.target.value) }}>
                                <option value="-1">**कृपया चयन कीजिए**</option>
                                <option value="GEN">सामान्य</option>
                                <option value="OBC ">अन्य पिछड़ा वर्ग </option>
                                <option value="SC">अनुसूचित जाति </option>
                                <option value="ST">अनुसूचित जनजाति </option>
                            </select>


                            <label htmlFor="" className="form-label">लिंग : <span>*</span> </label>
                            <select className="form-select mt-2" aria-label="Default select example"
                                ref={genderInput} value={gender} onChange={(e) => { setGender(e.target.value) }}>
                                <option value="-1">**कृपया चयन कीजिए**</option>
                                <option value="पुरुष">पुरुष</option>
                                <option value="महिला">महिला </option>
                            </select>

                            <div className="mb-3 mt-4">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">पूरा पता: <span>*</span> </label>
                                <div style={{ borderTop: '1.5px solid black', borderBottom: '1.5px solid black', BorderRadius: 50 }}>
                                    गांव : <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                                        ref={villageInput} value={village} onChange={(e) => setVillage(e.target.value)}
                                    ></textarea>
                                    खंड <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                                        ref={blockInput} value={block} onChange={(e) => setBlock(e.target.value)}
                                    ></textarea>
                                    {/* District: <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>*/}
                                    <label htmlFor="" className="">जिला: <span>*</span></label>
                                    <select className="form-select mt-2" aria-label="Default select example"
                                        ref={districtInput} value={district} onChange={(e) => { setDistrict(e.target.value) }}>
                                        <option value="-1">**कृपया चयन कीजिए**</option>
                                        <option value="आगरा">आगरा</option>
                                        <option value="अलीगढ">अलीगढ</option>
                                        <option value="खैर">खैर</option>
                                        <option value="प्रयागराज">प्रयागराज</option>
                                        <option value="अम्बेडकरनगर">अम्बेडकरनगर</option>
                                        <option value="औरैया]">औरैया]</option>
                                        <option value="आजमगढ">आजमगढ</option>
                                        <option value="बागपत[मृत कड़ियाँ]">बागपत[मृत कड़ियाँ]</option>
                                        <option value="बहराइच">बहराइच</option>
                                        <option value="बलिया">बलिया</option>
                                        <option value="बलरामपुर">बलरामपुर</option>
                                        <option value="बाँदा">बाँदा</option>
                                        <option value="बाराबंकी">बाराबंकी</option>
                                        <option value="बरेली">बरेली</option>
                                        <option value="बस्ती">बस्ती</option>
                                        <option value="बिजनौर">बिजनौर</option>
                                        <option value="बदायूँ">बदायूँ</option>
                                        <option value="बुलंदशहर">बुलंदशहर</option>
                                        <option value="चंदौली">चंदौली</option>
                                        <option value="चित्रकूट">चित्रकूट</option>
                                        <option value="देवरिया">देवरिया</option>
                                        <option value="एटा">एटा</option>
                                        <option value="इटावा">इटावा</option>
                                        <option value="अयोध्या">अयोध्या</option>
                                        <option value="फ़र्रूख़ाबाद">फ़र्रूख़ाबाद</option>
                                        <option value="फतेहपुर">फतेहपुर</option>
                                        <option value="फ़िरोजाबाद">फ़िरोजाबाद</option>
                                        <option value="गौतमबुद्ध नगर">गौतमबुद्ध नगर</option>
                                        <option value="गाजियाबाद">गाजियाबाद</option>
                                        <option value="ग़ाज़ीपुर">ग़ाज़ीपुर</option>
                                        <option value="गोंडा">गोंडा</option>
                                        <option value="गोरखपुर">गोरखपुर</option>
                                        <option value="हमीरपुर">हमीरपुर</option>
                                        <option value="हरदोई">हरदोई</option>
                                        <option value="हाथरस">हाथरस</option>
                                        <option value="जलौन">जलौन</option>
                                        <option value="जौनपुर">जौनपुर</option>
                                        <option value="झाँसी">झाँसी</option>
                                        <option value="ज्योतिबा फुले नगर">ज्योतिबा फुले नगर</option>
                                        <option value="कन्नौज">कन्नौज</option>
                                        <option value="कानपुर देहात">कानपुर देहात</option>
                                        <option value="कानपुर नगर">कानपुर नगर</option>
                                        <option value="कौशाम्बी">कौशाम्बी</option>
                                        <option value="कुशीनगर (पड़रौना)">कुशीनगर (पड़रौना)</option>
                                        <option value="लखीमपुर-खिरी">लखीमपुर-खिरी</option>
                                        <option value="ललितपुर">ललितपुर</option>
                                        <option value="लखनऊ">लखनऊ</option>
                                        <option value="महाराजगंज">महाराजगंज</option>
                                        <option value="महोबा">महोबा</option>
                                        <option value="मैनपुरी">मैनपुरी</option>
                                        <option value="मथुरा">मथुरा</option>
                                        <option value="मऊ">मऊ</option>
                                        <option value="मेरठ">मेरठ</option>
                                        <option value="मिर्ज़ापुर">मिर्ज़ापुर</option>
                                        <option value="मुरादाबाद">मुरादाबाद</option>
                                        <option value="मुजफ्फरनगर">मुजफ्फरनगर</option>
                                        <option value="पीलीभीत">पीलीभीत</option>
                                        <option value="प्रतापगढ">प्रतापगढ</option>
                                        <option value="रायबरेली">रायबरेली</option>
                                        <option value="रामपुर">रामपुर</option>
                                        <option value="सहारनपुर">सहारनपुर</option>
                                        <option value="संत कबीरनगर">संत कबीरनगर</option>
                                        <option value="संत रविदास नगर">संत रविदास नगर</option>
                                        <option value="शाहजहाँपुर">शाहजहाँपुर</option>
                                        <option value="श्रावस्ती">श्रावस्ती</option>
                                        <option value="सिद्धार्थनगर">सिद्धार्थनगर</option>
                                        <option value="सीतापुर">सीतापुर</option>
                                        <option value="सोनभद्र">सोनभद्र</option>
                                        <option value="सुल्तानपुर">सुल्तानपुर</option>
                                        <option value="उन्नाव">उन्नाव</option>
                                        <option value="वाराणसी">वाराणसी</option>
                                    </select>
                                    <br />
                                </div>
                            </div>

                            <div className="mb-3 mt-4">
                                <label htmlFor="exampleInputText1" className="form-label">तहसील / उप जिला: <span>*</span> </label>
                                <input type="text" className="form-control" id="exampleInputText1" required aria-describedby="textHelp"
                                    ref={subDistrictInput} value={subDistrict} onChange={(e) => setSubDistrict(e.target.value)}
                                />

                            </div>

                            <label htmlFor="" className="form-label">फसल का नाम : <span>*</span> </label>
                            <select className="form-select mt-2" aria-label="Default select example"
                                ref={cropNameInput} value={cropName} onChange={(e) => { setCropName(e.target.value) }}>
                                <option value="-1">**कृपया चयन कीजिए**</option>
                                {/*<option value="गेहूँ-DBW222">गेहूँ - DBW 222</option>*/}
                                <option value="गेहूँ-DBW187">गेहूँ - DBW 187</option>
                                {/*<option value="गेहूँ-HD3271">गेहूँ - HD 3271</option>*/}
                                {/*<option value="गेहूँ-DBW187">गेहूँ - DBW187</option>*/}
                                {/*<option value="गेहूँ-DBW173">गेहूँ - DBW173</option>*/}
                                {/*<option value="गेहूँ-HD2967">गेहूँ - HD2967</option>*/}
                                {/*<option value="गेहूँ-HD3249">गेहूँ - HD3249</option>*/}
                                {/*<option value="गेहूँ">गेहूँ</option>*/}
                                {/*<option value="चना-पूसा-3043">चना - पूसा 3043</option>*/}
                                {/*<option value="सरसो-DRMRIJ-31">सरसो - DRMRIJ-31</option>*/}
                                {/*<option value="सरसो-150-35">सरसो - 150-35</option>*/}
                                {/*<option value="धान">धान</option>*/}
                            </select>


                            <div className="mb-3 mt-4">
                                <label htmlFor="exampleInputFile1" className="form-label">आधार अपलोड करे: (Max size 500KB) <span>*</span> </label>
                                <input type="file"
                                    ref={fileInput}
                                    onChange={handleChange} className="form-control" id="exampleInputFile1" required aria-describedby="emailHelp" />
                                <h4 className='text-danger'>Please bring your original Adhar Card with you.</h4>
                                <h4 className='text-danger'>कृपया अपना मूल आधार कार्ड अपने साथ लाएं।</h4>
                            </div>

                        </div>
                        {/*rendering the button for reset and register*/}

                        {resgistrationResponseData.success == false &&
                            (<div>
                                <h3 className="text-danger shadow">{resgistrationResponseData.message}</h3>
                                <br />
                                <div style={{ display: 'flex', padding: '10px', margin: '10px', justifyContent: 'center', alignItems: 'center' }}><input type="button" onClick={handleSubmit} ref={submitBtn} value="Submit Form" className='btn btn-info text-white' />
                                    <button className='btn btn-danger text-white m-1' onClick={handleReset} >Reset</button>
                                </div>
                            </div>)}

                        {/*rendering the button to get the appointment letter*/}
                        {resgistrationResponseData.success == true &&
                            (<div>
                                <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Your Registration Number is - {resgistrationResponseData.data.id} & Year is {resgistrationResponseData.data.year}</h3>
                                <br />
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Link className='btn btn-success btn-lg text-white m-1' to={`/svs-appointment-lettter/${resgistrationResponseData.data.uniqeCode}`} >Click here to generate appointment letter</ Link>
                                    <button className='btn btn-danger text-white m-1' onClick={handleReset} >New Registration</button>
                                </div>
                            </div>)}
                    </form>


                </div>
                :
                <div>
                    <h3 className="text-danger">Registrations are closed for sometime please revisit the website again!!!</h3>
                </div>
            }
        </>);
}
