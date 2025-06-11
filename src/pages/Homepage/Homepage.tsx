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
        <section className="heroSection">
          <div>
            <h1>Help lost pets reunite</h1>
            <h1>with their owners</h1>
            <p>
              Digital platform dedicated to supporting pet owners and animal
              lovers in the search for missing pets. Through easy-to-use
              reporting forms, categorized animal listings, and community-driven
              updates, we help reunite lost pets with their families quickly and
              effectively. Fill out the form, report a disappearance, or help
              with the search.
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
        </section>

        <section className="tips">
          <h1>Pet Care Tips</h1>
          <p>
            Caring for your pet doesn’t end once they’re safe — real love is
            shown in everyday routines. Here are some simple tips to help keep
            your furry friends healthy, safe, and happy:
          </p>
          <ul>
            <li>
              <strong>Always Use a Collar with an ID Tag</strong>
              Include a phone number that’s always active. Even if your pet is
              microchipped, an ID tag can save time and stress in emergencies.
            </li>
            <li>
              <strong>Don’t Skip Walks and Playtime</strong>
              Just like humans, pets need both physical and mental stimulation.
              A daily walk keeps them healthy — and makes them happy!
            </li>
            <li>
              <strong>Visit the Vet Regularly</strong>
              Even if your pet seems healthy, annual checkups can catch problems
              early. Prevention is the best medicine.
            </li>
            <li>
              <strong>Watch the Weather</strong>
              Hot pavement, storms, and freezing cold can be dangerous. Never
              leave pets in a car on a warm day — even with windows cracked.
            </li>
            <li>
              <strong>Keep Things Clean</strong>
              Regular grooming, clean water bowls, and fresh bedding help
              prevent infections and support your pet’s overall well-being.
            </li>
            <li>
              <strong>Bonus Tip: Secure Your Home and Yard</strong>
              Check gates, fences, and windows regularly. Many pets go missing
              simply because they find a way out of an unsecured space.
            </li>
          </ul>
        </section>

        <section className="aboutUs">
          <h1>About Us</h1>
          <p>
            Pet Friends was born out of a simple yet powerful desire — to help
            people reunite with their lost pets and make sure good news reaches
            the right ears (and paws). We started this platform as a small team
            of animal lovers, fully aware of how difficult and emotional it is
            when a pet goes missing. In those moments, speed and visibility are
            crucial — and that’s exactly what we aim to provide.
            <p>
              Our mission is to make it easier to quickly report a missing or
              found pet, display all important information in one place, connect
              pet owners and finders. We believe that a caring community can
              make a difference.
            </p>
            <p>
              Every report, share, or tip brings us one step closer to a happy
              reunion.
            </p>
          </p>
        </section>
        <section className="faqs">
          <h1>FAQs</h1>
          <ul>
            <li>
              <strong>How do I report a missing pet?</strong>
              Click on the "Report Missing" button on the homepage. Fill out the
              form with accurate details, upload a clear photo, and submit. The
              post will appear on the site after review.
            </li>
            <li>
              <strong>Can I report a pet I’ve found?</strong>
              Yes! Use the "Report Found" button and provide as much detail as
              possible — location, photo, time found, description.
            </li>
            <li>
              <strong> Is it free to use this site?</strong>
              Yes, all features — including reporting, searching, and browsing —
              are completely free.
            </li>
            <li>
              <strong>Do I need a photo to submit a report?</strong>
              While it’s not mandatory, a photo significantly increases the
              chances of someone recognizing the pet. We strongly recommend
              including one.
            </li>
            <li>
              <strong>Can I edit or remove my report later?</strong>
              Yes. After submitting a report, you’ll receive a link via email to
              edit or remove your listing anytime.
            </li>
            <li>
              <strong>Where is this service available?</strong>
              The platform is online and can be used anywhere. However, it’s
              most effective in areas where local users are active and share
              listings.
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;
