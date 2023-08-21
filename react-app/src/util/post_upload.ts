import axios from 'axios';

export class PostFile {
  static xhr(file: File, url: string, data: object) {
    const formData = new FormData();
    Object.entries(data)
      .forEach(([k, v]) => {
        formData.append(k, v);
      });
    formData.append('file', file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.send(formData);

    xhr.onload = () => {
      if (xhr.status === 200 || xhr.status === 204) {
        console.info(`[${xhr.status}] ${file.name} 上传成功`);
      } else {
        console.error(`[${xhr.status}] ${file.name} 上传失败`);
      }
    };
  }

  static fetch(file: File, url: string, data: object) {
    const formData = new FormData();
    Object.entries(data)
      .forEach(([k, v]) => {
        formData.append(k, v);
      });
    formData.append('file', file);

    fetch(url, {
      method: 'POST',
      body: formData,
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

  static axios(file: File, url: string, data: object) {
    const formData = new FormData();
    Object.entries(data)
      .forEach(([k, v]) => {
        formData.append(k, v);
      });
    formData.append('file', file);

    axios.post(
      url,
      formData
    )
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
  console.log('xhr.PostFile', file);
  if (file) {
    retrievePostUrl(file, (file: File, url: string, data: object) => {
      PostFile.xhr(file, url, data);
    });
  }
}

export function fetchPostFile(file?: File) {
  console.log('Fetch.PostFile', file);
  if (file) {
    retrievePostUrl(file, (file: File, url: string, data: object) => {
      PostFile.fetch(file, url, data);
    });
  }
}

export function axiosPostFile(file?: File) {
  console.log('Axios.PostFile', file);
  if (file) {
    retrievePostUrl(file, (file: File, url: string, data: object) => {
      PostFile.axios(file, url, data);
    });
  }
}
