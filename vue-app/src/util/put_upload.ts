import axios from 'axios';

export class PutFile {
  static xhr(file: File, url: string) {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url, true);
    xhr.send(file);

    xhr.onload = () => {
      if (xhr.status === 200 || xhr.status === 204) {
        console.info(`[${xhr.status}] ${file.name} 上传成功`);
      } else {
        console.error(`[${xhr.status}] ${file.name} 上传失败`);
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
          console.info(`${file.name} 上传成功`, response);
        } else {
          console.error(`${file.name} 上传失败`, response);
        }
      })
      .catch((error) => {
        console.error(`${file.name} 上传异常`, error);
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
          console.info(`${file.name} 上传成功`, response);
        } else {
          console.error(`${file.name} 上传失败`, response);
        }
      })
      .catch(function (error) {
        console.error(`${file.name} 上传异常`, error);
      });
  }
}

export function retrievePutUrl(file: File, cb: (file: File, url: string) => void) {
  const url = `http://localhost:8080/presignedPutUrl/${file.name}`;
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
