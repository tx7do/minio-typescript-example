import axios from 'axios';

export class PostFile {
  static xhr(file: File, url: string, data: object) {
    const formData = new FormData();
    formData.append('file', file);
    Object.entries(data).forEach(([k, v]) => {
      formData.append(k, v);
    });

    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.send(formData);

    xhr.onload = () => {
      if (xhr.status === 200 || xhr.status === 204) {
        console.log(`[${xhr.status}] ${file.name} 上传成功`);
      } else {
        console.error(`[${xhr.status}] ${file.name} 上传失败`);
      }
    };
  }

  static fetch(file: File, url: string, data: object) {
    const formData = new FormData();
    formData.append('file', file);
    Object.entries(data).forEach(([k, v]) => {
      formData.append(k, v);
    });

    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        console.log(`${file.name} 上传成功`, response);
      })
      .catch((error) => {
        console.error(`${file.name} 上传失败`, error);
      });
  }

  static axios(file: File, url: string, data: object) {
    const formData = new FormData();
    formData.append('file', file);
    Object.entries(data).forEach(([k, v]) => {
      formData.append(k, v);
    });

    axios.post(
      url,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(function (response) {
        console.log(`${file.name} 上传成功`, response);
      })
      .catch(function (error) {
        console.error(`${file.name} 上传失败`, error);
      });
  }
}

export function retrievePostUrl(file: File, cb: (file: File, url: string, data: object) => void) {
  const url = `http://localhost:8080/presignedPostUrl/${file.name}`;
  axios.get(url)
    .then(function (response) {
      cb(file, response.data.data.url, response.data.data.formData);
    })
    .catch(function (error) {
      console.error(error);
    });
}

export function xhrPostFile(file?: File) {
  console.log('xhrPostFile', file);
  if (file) {
    retrievePostUrl(file, (file: File, url: string, data: object) => {
      PostFile.xhr(file, url, data);
    });
  }
}

export function fetchPostFile(file?: File) {
  console.log('fetchPostFile', file);
  if (file) {
    retrievePostUrl(file, (file: File, url: string, data: object) => {
      PostFile.fetch(file, url, data);
    });
  }
}

export function axiosPostFile(file?: File) {
  console.log('axiosPostFile', file);
  if (file) {
    retrievePostUrl(file, (file: File, url: string, data: object) => {
      PostFile.axios(file, url, data);
    });
  }
}
