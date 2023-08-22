import React from 'react';
import './App.css';
import FileInput from "./components/FileInput";
import {xhrPutFile, fetchPutFile, axiosPutFile} from './util/put_upload';
import {xhrPostFile, fetchPostFile, axiosPostFile} from './util/post_upload';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <FileInput title="XHR&nbsp;&nbsp;&nbsp;PUT" onUploadFile={xhrPutFile}/>
                <FileInput title="Fetch PUT" onUploadFile={fetchPutFile}/>
                <FileInput title="Axios PUT" onUploadFile={axiosPutFile}/>
                <br/>
                <br/>
                <FileInput title="XHR&nbsp;&nbsp;&nbsp;POST" onUploadFile={xhrPostFile}/>
                <FileInput title="Fetch POST" onUploadFile={fetchPostFile}/>
                <FileInput title="Axios POST" onUploadFile={axiosPostFile}/>
            </div>
        );
    }
}

export default App;
