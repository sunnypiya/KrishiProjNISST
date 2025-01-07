import React, { Component, useState } from 'react';
import axios from 'axios';

export const Registration = () => {
    const [file, setFile] = useState();
    const [text, setText] = useState('shyam');

    const handleChange = (event) => {
        setFile(() => event.target.files[0]);
    }
    const handleTextChange = (event) => {
        setText(event.target.value);
        console.log(text);
    }

    function handleSubmit(event) {
        event.preventDefault()
        const url = 'http://localhost:3000/uploadFile';
        const formData = new FormData();
        //formData.append('FileData',url);
        //formData.append('file', file);
        //formData.append('fileName', file.name);
        //formData.append('Text', text);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };


        var formdata = new FormData();
        formdata.append("File1", file);
        formdata.append("Name", text);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("weatherforecast", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        //for (var key of formData.entries()) {
        //    console.log(key[0] + ', ' + key[1])
        //}

        //console.log(formData);
        //console.log(file);
        //console.log(text);
        //axios.post('weatherforecast', formData, config).then((response) => {
        //    console.log(response);
        //});
        //axios.get('weatherforecast').then((res) => {
        //    console.log(res);
        //});

    }
    return (
        <>
            <div className='shadow-lg p-4' style={{ borderTop: '1.5px solid black', borderBottom: '1.5px solid black', BorderRadius: 50 }}>
                <h1>FARMER REGISTRATION FORM SCSP</h1>
                {/*<form onSubmit={handleSubmit}>*/}
                <form>
                    {/*<input type="file" onChange={handleChange} />*/}
                   {/* <input type="text" value={text} onChange={handleTextChange} />*/}
                    
                    <div className='shadow-lg p-5' style={{ borderTop: '1.5px solid black', borderBottom: '1.5px solid black', BorderRadius: 50 }}>

                        <label for="">वित्तीय वर्ष : <span>*</span></label>
                        <select className="form-select mb-4" aria-label="Default select example">
                            <option selected>..................................कृपया वर्ष चुनें..........................</option>
                            <option value="2019-2020">2019-2020</option>
                            <option value="2020-2021">2020-2021</option>
                            <option value="2021-2022">2021-2022</option>
                            <option value="2022-2023">2022-2023</option>
                        </select>


                        <div className="mb-3">
                            <label for="exampleInputText1" class="form-label">नाम: <span>*</span></label>
                            <input type="text" class="form-control" id="exampleInputText1" value={text} onChange={handleTextChange} required aria-describedby="textHelp" />
                        </div>


                        <label for="exampleInputText1" class="form-label">वितरित सामग्री :</label>
                        <div className="row g-3 align-items-center">


                            <div className="col-4">
                                <input type="text" class="form-control" id="exampleInputText1" required aria-describedby="textHelp" />
                            </div>


                            <div className="col-4">
                                <input type="text" class="form-control" id="exampleInputText1" required aria-describedby="textHelp" />

                            </div>

                            <div className="col-4">
                                <input type="text" class="form-control" id="exampleInputText1" required aria-describedby="textHelp" />
                            </div>


                            <div className="col-4">
                                <input type="text" class="form-control" id="exampleInputText1" required aria-describedby="textHelp" />

                            </div>


                            <div className="col-4">
                                <input type="text" class="form-control" id="exampleInputText1" required aria-describedby="textHelp" />
                            </div>

                            <div className="col-4">
                                <input type="text" class="form-control" id="exampleInputText1" required aria-describedby="textHelp" />
                            </div>


                        </div>



                        <label for="exampleInputEmail1" class=" mt-4 form-label">मात्रा :</label>
                        <div className="row g-3 align-items-center">


                            <div className="col-4">
                                <input type="text" class="form-control" id="exampleInputText1" required aria-describedby="textHelp" />

                            </div>


                            <div className="col-4">
                                <input type="text" class="form-control" id="exampleInputText1" required aria-describedby="textHelp" />
                            </div>

                            <div className="col-4">
                                <input type="text" class="form-control" id="exampleInputText1" required aria-describedby="textHelp" />
                            </div>


                            <div className="col-4">
                                <input type="text" class="form-control" id="exampleInputText1" required aria-describedby="textHelp" />

                            </div>


                            <div className="col-4">
                                <input type="text" class="form-control" id="exampleInputText1" required aria-describedby="textHelp" />
                            </div>

                            <div className="col-4">
                                <input type="text" class="form-control" id="exampleInputText1" required aria-describedby="textHelp" />
                            </div>


                        </div>


                        <div className="mb-3 mt-4">
                            <label for="exampleInputText1" class="form-label">पिता/पति का नाम : <span>*</span></label>
                            <input type="text" class="form-control" id="exampleInputText1" required aria-describedby="textHelp" />
                        </div>

                        <div class="mt-4 mb-4">
                            <label for="exampleInputText1" class="form-label">आधार नंबर : <span>*</span></label>
                            <input type="text" class="form-control" id="exampleInputText1" required aria-describedby="textHelp" />
                        </div>


                        <label for="" class="">लिंग : <span>*</span> </label>
                        <select className="form-select mt-2" aria-label="Default select example">
                            <option value="पुरुष">पुरुष</option>
                            <option value="महिला ">महिला </option>
                        </select>



                        <div class="mb-3 mt-4">
                            <label for="exampleInputText1" class="form-label">मोबाइल नंबर: <span>*</span> </label>
                            <input type="text" class="form-control" id="exampleInputText1" required aria-describedby="textHelp" />

                        </div>

                        <label for="" class="">जिला: <span>*</span></label>
                        <select className="form-select mt-2" aria-label="Default select example">

                            <option value="जिला:">जिला :</option>
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

                        <div class="mb-3 mt-4">
                            <label for="exampleFormControlTextarea1" class="form-label">पूरा पता: <span>*</span> </label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>

                        <div className="mb-3 mt-4">
                            <label for="exampleInputFile1" class="form-label">खसरा खतौनी अपलोड करे: (Max size 500KB): <span>*</span> </label>
                            <input type="file" onChange={handleChange} class="form-control" id="exampleInputFile1" required aria-describedby="emailHelp" />
                        </div>


                        <div className="mb-3 mt-4">
                            <label for="exampleInputFile1" class="form-label">आधार अपलोड करे: (Max size 500KB) <span>*</span> </label>
                            <input type="file" class="form-control" id="exampleInputFile1" required aria-describedby="emailHelp" />
                        </div>



                        <div className="mb-3 mt-4">
                            <label for="exampleInputFile1" class="form-label">अनुसूचित जाति प्रमाणपत्र अपलोड करे: (Max size 500KB) <span>*</span>
                            </label>
                            <input type="file" class="form-control" id="exampleInputFile1" required aria-describedby="emailHelp" />
                        </div>

                    </div>
                    <input type="button" onClick={handleSubmit} value="Submit Form" className='btn btn-info text-white' />
                    <button className='btn btn-danger text-white m-1'>Reset</button>
                </form>
            </div>
        </>);
}
