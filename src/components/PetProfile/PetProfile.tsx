import "./PetProfile.css";
import { useParams } from "react-router-dom";
import { toUpperCase } from "../../utils/utils";
import Header from "../Header/Header";
import Map from "../Map/Map.tsx";
import Footer from "../Footer/Footer.tsx";

interface PetProfileProps {
  status: string;
}

interface PetObject {
  id: string;
  images: [string, string, string];
  petName: string;
  category: string;
  address: string;
}

const PetProfile = ({ status }: PetProfileProps) => {
  const { id } = useParams();
  const dataStatus = status === "missing" ? "MissingPets" : "FoundPets";
  const data = JSON.parse(localStorage.getItem(dataStatus) || "[]");
  const pet = data.find((pet: PetObject) => pet.id === id);

  return (
    <div className="petProfile">
      <Header />
      <main>
        <section className="one">
          <div className="large">
            <img className="petImage" src={pet?.images[0]} alt="Pet Image" />
          </div>

          <div className="small">
            {pet?.images.slice(1).map((image: string, index: number) => (
              <img
                key={index}
                className="petImage"
                src={image}
                alt="Pet Image"
              />
            ))}
          </div>
        </section>

        <section className="two">
          <h1>{pet?.petName}</h1>
          <p>{pet?.description}</p>
        </section>
        <section className="three">
          <div>
            <h3>{status === "missing" ? "Disappeared" : "Found"} on:</h3>
            <p>
              {pet?.date}/{pet?.time}
            </p>
          </div>
          {status === "missing" && (
            <div>
              <h3>Chipped:</h3>
              <p>{toUpperCase(pet?.chipped)}</p>
            </div>
          )}
          {status === "missing" && (
            <div>
              <h3>Medication:</h3>
              <p>{pet?.medication}</p>
            </div>
          )}
          {status === "missing" && (
            <div>
              <h3>Owner:</h3>
              <p>{pet?.owner}</p>
            </div>
          )}
          {status === "missing" && (
            <div>
              <h3>Contact:</h3>
              <p>{pet?.contact}</p>
            </div>
          )}
          {status === "missing" && (
            <div>
              <h3>Reward:</h3>
              <p>{pet?.reward} $</p>
            </div>
          )}
        </section>
        {pet?.notes && status === "missing" && (
          <section className="four">
            <h3>Notes:</h3>
            <p>{pet?.notes}</p>
          </section>
        )}
        {pet?.address && (
          <section className="five">
            <h3>Location:</h3>
            <p>{pet?.address}</p>
            <Map lat={pet?.lat} lng={pet?.lng} />
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};
export default PetProfile;
