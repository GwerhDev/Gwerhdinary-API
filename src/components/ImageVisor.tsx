"use client"

import { useState } from "react";

export const ImageVisor = () => { 
  const apiUrl = "http://localhost:1312/";
  const [image, setImage] = useState("/logo.png");
  const [imageId, setImageId] = useState("");
  
  const getImage = async (id: string) => {
    try {
      const response = await fetch( apiUrl + "api/images/" + id, { cache: "no-store" });
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  function handleInput(e: any) {
    setImageId(e.target.value);
    return;
  }

  async function handleClick(e: any) {
    e.preventDefault();
    const res = await getImage(imageId);
    setImage(res.data);
    return;
  }

  return (
    <div>
      <a id="img-link" href="#">
        <div className="image-container" id="image-container">
          <img id="image-display" src={image} alt="Imagen" height="100%" />
        </div>
      </a>
      <form id="image-form">
        <div className="inner-container">
          <label>ID:</label>
          <div>
            <input list="options" type="text" id="image-id" onInput={(e) => handleInput(e)} placeholder="Ingresa una id válida" />
            <datalist id="options">
              <option value="65d8a2650106364fd5b5f10a">65d8a2650106364fd5b5f10a</option>
              <option value="65dc915e69c86360d1776de2">65dc915e69c86360d1776de2</option>
            </datalist>
            <button id="searchButton" onClick={(e) => handleClick(e)}><img src="/search-icon.svg" height="13px" alt="" /></button>
          </div>
        </div>
      </form>
    </div>
  );
}
