export function makeFormData(file: File, data: object) {
  const formData = new FormData();

  if (data !== null && data !== undefined) {
    Object.entries(data)
      .forEach(([k, v]) => {
        formData.append(k, v);
      });
  }

  formData.append('file', file);

  return formData;
}
