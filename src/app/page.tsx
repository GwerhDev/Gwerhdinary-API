import s from './page.module.css';

export default function Home() {

  function handleClick() {
    return;
  }

  return (
    <main className={s.main}>
      <span className="title">
        <img src="/clan-shield-icon.svg" alt="Escudo" />
        <h1>Gwerhdinary</h1>
      </span>
      <a id="img-link" href="#">
        <div className="image-container" id="image-container">
          <img id="image-display" src="/logo.png" alt="Imagen" height="100%" />
        </div>
      </a>
      <span className='' id="imageForm">
        <div className="inner-container">
          <label>ID:</label>
          <div>
            <input list="options" type="text" id="image-id" placeholder="Ingresa una id válida" />
            <datalist id="options">
              <option value="65d8a2650106364fd5b5f10a">65d8a2650106364fd5b5f10a</option>
              <option value="65dc915e69c86360d1776de2">65dc915e69c86360d1776de2</option>
            </datalist>
            <button id="searchButton"><img src="/search-icon.svg" height="13px" alt="" /></button>
          </div>
        </div>
      </span>
      <i><span className="info-icon">i</span>
        <p>Plataforma de almacenamiento de <a href="https://gwerh.netlify.app" target="_blank">Gwerh</a></p>
      </i>
    </main>
  )
}
