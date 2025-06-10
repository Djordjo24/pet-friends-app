import "./Footer.css";
import { IoPaw } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { TfiYoutube } from "react-icons/tfi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <section className="sectionOne">
        <div>
          <Link to="/" className="logo">
            <IoPaw className="icon" />
            <h1>Pet friends</h1>
          </Link>
        </div>
        <div className="footerContent">
          <section>
            <h3>Navigation</h3>
            <nav>
              <Link to="/MissingPets">Missing Pets</Link>
              <Link to="/FoundPets">Found Pets</Link>
            </nav>
          </section>
          <section>
            <h3>Contact</h3>
            <a href="mailto:contact@petfriends.rs">contact@petfriends.rs</a>
          </section>
        </div>
      </section>

      <section className="sectionTwo"></section>

      <section className="sectionThree">
        <div>
          <p>© 2025 Pet Friends. All rights reserved.</p>
          <Link to="/">Privacy Policy</Link>
          <Link to="/">Terms of Use</Link>
        </div>
        <div className="social">
          <a>
            <FaInstagram />
          </a>
          <a>
            <TfiYoutube />
          </a>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
