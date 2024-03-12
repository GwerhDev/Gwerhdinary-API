
async function handleClick() {
  try {
    const id = document.getElementById('image-id').value;
    const imageDisplay = document.getElementById('image-display');
    const imgLink = document.getElementById('img-link');

    imageDisplay.src = `/i/${id}`;
    imgLink.href = `/i/${id}`;
    imgLink.target = "_blank";

  } catch (error) {
    console.error(error);
  }
}