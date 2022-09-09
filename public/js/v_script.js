const fileUploader = document.getElementById('file1');
const reader = new FileReader();

const load = (event) => {
  const files = event.files
  const file = files[0];
  
  reader.readAsDataURL(file);
  
  reader.addEventListener('load', (event) => {
    const img = document.createElement('img');
    img.width = 480
    img.height = 320
    img.src = event.target.result;
    img.alt = file.name;
    document.getElementById('mini1').appendChild(img);
  });
};