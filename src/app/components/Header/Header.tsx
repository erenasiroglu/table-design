import React from "react";
import Link from "next/link";
import { HiUser, HiSparkles } from "react-icons/hi";
import styles from "./Header.module.css";

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.link}>
        <HiSparkles
          className={styles.sparklesIcon}
          stroke="currentColor"
          size={30}
          style={{ color: "gold" }}
        />
        Table Design
      </Link>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/login">
              <HiUser stroke="currentColor" size={24} />
            </Link>
          </li>
          <div className={styles.cta}>
            <button className={styles.button}>Buy Now</button>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
