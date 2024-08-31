import { PencilLine } from '@phosphor-icons/react'

import styles from './Sidebar.module.css';
import { Avatar } from './Avatar';

export function Sidebar() {
  return (
    <aside className={styles.aside}>
      <img
        className={styles.cover}
        src="https://images.unsplash.com/photo-1629904853716-f0bc54eea481?q=50&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""
      />

      <div className={styles.profile}>
        <Avatar src="https://github.com/gisleisilva.png" />
        <strong>Gislei Silva</strong>
        <span>Web Developer</span>
      </div>

      <footer>
        <a href="#">
          <PencilLine size={20} />  Editar seu perfil
        </a>
      </footer>

    </aside>
  );
}

