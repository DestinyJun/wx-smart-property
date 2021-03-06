// blob 转 dataURL
export function blobToDataURL(blob, callback) {
  const a = new FileReader();
  a.onload = function (e) {
    callback(e.target['result']);
  };
  a.readAsDataURL(blob);
}

// dataURL 转 file
export function dataURLtoFile(dataurl, filename) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type: mime});
}

// image/jpeg base64 转 blob
export function headerBase64DataToBlob(base64Data) {
  let blob = null;
  const format = 'image/jpeg';
  const code = atob(base64Data.split(',')[1]);
  const aBuffer = new ArrayBuffer(code.length);
  const uBuffer = new Uint8Array(aBuffer);
  for (let i = 0; i < code.length; i++) {
    uBuffer[i] = code.charCodeAt(i) & 0xff;
  }
  blob = new Blob([uBuffer], {type: format});
  return blob;
}

// no image/jpeg base64 转 blob
export function noHeaderBase64DataToBlob(urlData) {
  const binary = atob(urlData);
  const array = [];
  for (let i = 0, len = binary.length; i < len; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
}


