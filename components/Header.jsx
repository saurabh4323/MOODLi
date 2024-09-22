import Image from "next/image";
import Link from "next/link";
import "./Header.css";
const Header = () => {
  return (
    <header className="header-container">
      <div className="header-content">
        <img
          src="/logo.svg"
          alt="Logo"
          width={100}
          height={50} // Adjust as needed
        />

        <nav className="nav">
          <Link href="/dashboard" className="nav-item">
            Dashboard
          </Link>
          <Link href="/mood" className="nav-item">
            Mood
          </Link>
          <Link href="/community" className="nav-item">
            Community
          </Link>
          <Link href="/create" className="nav-item">
            Create
          </Link>
          <Link href="/profile" className="nav-item">
            Profile
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
