import "./Header.css";
import { IoPaw } from "react-icons/io5";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/" state={{ scrollTo: "heroSection" }} className="logo">
        <IoPaw className="icon" />
        <h1>Pet friends</h1>
      </Link>
      <nav>
        <Link to="/MissingPets">Missing Pets</Link>
        <Link to="/FoundPets">Found Pets</Link>
        <Link to="/" state={{ scrollTo: "tips" }}>
          Pet Care Tips
        </Link>
        <Link to="/" state={{ scrollTo: "aboutUs" }}>
          About Us
        </Link>
        <Link to="/" state={{ scrollTo: "faqs" }}>
          FAQs
        </Link>
      </nav>
    </header>
  );
};

export default Header;
