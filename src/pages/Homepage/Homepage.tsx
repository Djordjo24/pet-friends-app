import "./Homepage.css";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import detective from "../../assets/images/detective.png";

const Homepage = () => {
  return (
    <div className="homepage">
      <Header />
      <main>
        <section>
          <div className="heroSection">
            <div>
              <h1>Help lost pets reunite</h1>
              <h1>with their owners</h1>
              <p>
                Digital platform dedicated to supporting pet owners and animal
                lovers in the search for missing pets. Through easy-to-use
                reporting forms, categorized animal listings, and
                community-driven updates, we help reunite lost pets with their
                families quickly and effectively. Fill out the form, report a
                disappearance, or help with the search.
              </p>
              <div className="reportButtons">
                <Link to="/MissingForm">
                  <button>REPORT MISSING</button>
                </Link>
                <Link to="/FoundForm">
                  <button>REPORT FOUND</button>
                </Link>
              </div>
            </div>
            <div className="detectiveColumn">
              <img src={detective} className="detective" />
            </div>
          </div>
        </section>

        <div className="tips">
          <h1>Pet Care Tips</h1>
          <p>
            Here are some useful tips to help you take care of your pet. "Lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum."
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;
