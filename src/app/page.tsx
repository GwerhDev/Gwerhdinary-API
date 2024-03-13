import { ImageVisor } from '@/components/ImageVisor';
import s from './page.module.css';

export default function Home() {
  return (
    <main className={s.main}>
      <span className="title">
        <img src="/clan-shield-icon.svg" alt="Escudo" />
        <h1>Gwerhdinary</h1>
      </span>
      <ImageVisor/>
      <i><span className="info-icon">i</span>
        <p>Plataforma de almacenamiento de <a href="https://gwerh.netlify.app" target="_blank">Gwerh</a></p>
      </i>
    </main>
  )
}
