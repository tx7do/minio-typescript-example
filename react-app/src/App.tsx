import React from 'react';
import axios from 'axios';
import './App.css';
import FileInput from "./FileInput";

function retrieveNewURL(file: File, cb: (file: File, url: string) => void) {
    const url = `http://localhost:8080/presignedUrl/${file.name}`;
    axios.get(url)
        .then(function (response) {
            cb(file, response.data.data.url);
        })
        .catch(function (error) {
            console.error(error);
        });
}

function xhrUploadFile(file: File, url: string) {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url, true);
    xhr.send(file);

    xhr.onload = () => {
        if (xhr.status === 200) {
            console.log(`${file.name} 上传成功`);
        } else {
            console.error(`${file.name} 上传失败`);
        }
    };
}

function fetchUploadFile(file: File, url: string) {
    fetch(url, {
        method: 'PUT',
        body: file,
    })
        .then((response) => {
            console.log(`${file.name} 上传成功`, response);
        })
        .catch((error) => {
            console.error(`${file.name} 上传失败`, error);
        });
}

function axiosUploadFile(file: File, url: string) {
    const instance = axios.create();
    instance
        .put(url, file, {
            headers: {
                'Content-Type': file.type,
            },
        })
        .then(function (response) {
            console.log(`${file.name} 上传成功`, response);
        })
        .catch(function (error) {
            console.error(`${file.name} 上传失败`, error);
        });
}

class App extends React.Component {
    onXhrUploadFile(file?: File) {
        console.log('onXhrUploadFile', file);
        if (file) {
            retrieveNewURL(file, (file, url) => {
                xhrUploadFile(file, url);
            });
        }
    }

    onFetchUploadFile(file?: File) {
        console.log('onFetchUploadFile', file);
        if (file) {
            retrieveNewURL(file, (file, url) => {
                fetchUploadFile(file, url);
            });
        }
    }

    onAxiosUploadFile(file?: File) {
        console.log('onAxiosUploadFile', file);
        if (file) {
            retrieveNewURL(file, (file, url) => {
                axiosUploadFile(file, url);
            });
        }
    }

    render() {
        return (
            <div className="App">
                <FileInput onUploadFile={this.onXhrUploadFile}/>
                <FileInput onUploadFile={this.onFetchUploadFile}/>
                <FileInput onUploadFile={this.onAxiosUploadFile}/>
            </div>
        );
    }
}

export default App;
