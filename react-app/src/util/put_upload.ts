import axios from 'axios';
import {API_URL} from "./const";

export class PutFile {
    static xhr(file: File, url: string) {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', url, true);
        xhr.send(file);

        xhr.onload = () => {
            if (xhr.status === 200 || xhr.status === 204) {
                console.info(`[${xhr.status}] ${file.name} upload success!`);
            } else {
                console.error(`[${xhr.status}] ${file.name} upload failed!`);
            }
        };
    }

    static fetch(file: File, url: string) {
        fetch(url, {
            method: 'PUT',
            body: file,
        })
            .then((response) => {
                if (response.status === 204 || response.status === 204) {
                    console.info(`${file.name} upload success!`, response);
                } else {
                    console.error(`${file.name} upload failed!`, response);
                }
            })
            .catch((error) => {
                console.error(`${file.name} upload exception!`, error);
            });
    }

    static axios(file: File, url: string) {
        axios
            .put(url, file, {
                headers: {
                    'Content-Type': file.type,
                },
            })
            .then(function (response) {
                if (response.status === 204 || response.status === 204) {
                    console.info(`${file.name} upload success!`, response);
                } else {
                    console.error(`${file.name} upload failed!`, response);
                }
            })
            .catch(function (error) {
                console.error(`${file.name} upload exception!`, error);
            });
    }
}

export function retrievePutUrl(file: File, cb: (file: File, url: string) => void) {
    const url = `${API_URL}/presignedPutUrl/${file.name}`;
    axios.get(url)
        .then(function (response) {
            cb(file, response.data.data.url);
        })
        .catch(function (error) {
            console.error(error);
        });
}

export function xhrPutFile(file?: File) {
    console.log('Xhr.PutFile', file);
    if (file) {
        retrievePutUrl(file, (file, url) => {
            PutFile.xhr(file, url);
        });
    }
}

export function fetchPutFile(file?: File) {
    console.log('Fetch.PutFile', file);
    if (file) {
        retrievePutUrl(file, (file, url) => {
            PutFile.fetch(file, url);
        });
    }
}

export function axiosPutFile(file?: File) {
    console.log('Axios.PutFile', file);
    if (file) {
        retrievePutUrl(file, (file, url) => {
            PutFile.axios(file, url);
        });
    }
}
