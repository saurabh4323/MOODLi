import Image from "next/image";
import Link from "next/link";
import "./Header.css";
const Header = () => {
  return (
    <header className="header-container">
      <div className="header-content">
        <Image src="/logo.svg" alt="Description" width={500} height={500} />

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
