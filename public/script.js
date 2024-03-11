let id = '';

function handleInput() {
  id = document.getElementById('imageId').value;
}

async function handleClick() {
  try {
    const id = document.getElementById('imageId').value;
    imageDisplay.src = `/i/${id}`;

  } catch (error) {
    console.error(error);
  }
}