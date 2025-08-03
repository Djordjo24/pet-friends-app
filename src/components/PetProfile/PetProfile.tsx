import "./PetProfile.css";
import { useParams } from "react-router-dom";
import { MdOutlineNoPhotography } from "react-icons/md";
import { langmap } from "../../mockData/mockData.tsx";
import Header from "../Header/Header";
import Map from "../Map/Map.tsx";
import Footer from "../Footer/Footer.tsx";

type Langmap = {
  А: string;
  Б: string;
  В: string;
  Г: string;
  Д: string;
  Ђ: string;
  Е: string;
  Ж: string;
  З: string;
  И: string;
  Ј: string;
  К: string;
  Л: string;
  Љ: string;
  М: string;
  Н: string;
  Њ: string;
  О: string;
  П: string;
  Р: string;
  С: string;
  Т: string;
  Ћ: string;
  У: string;
  Ф: string;
  Х: string;
  Ц: string;
  Ч: string;
  Џ: string;
  Ш: string;
  а: string;
  б: string;
  в: string;
  г: string;
  д: string;
  ђ: string;
  е: string;
  ж: string;
  з: string;
  и: string;
  ј: string;
  к: string;
  л: string;
  љ: string;
  м: string;
  н: string;
  њ: string;
  о: string;
  п: string;
  р: string;
  с: string;
  т: string;
  ћ: string;
  у: string;
  ф: string;
  х: string;
  ц: string;
  ч: string;
  џ: string;
  ш: string;
};

interface PetProfileProps {
  status: string;
}

interface PetObject {
  id: string;
  images: string[];
  petName: string;
  category: string;
  address: string;
}

const PetProfile = ({ status }: PetProfileProps) => {
  const { id } = useParams();
  const dataStatus = status === "missing" ? "MissingPets" : "FoundPets";
  const data = JSON.parse(localStorage.getItem(dataStatus) || "[]");
  const pet = data.find((pet: PetObject) => pet.id === id);

  const updatedLocation = (address: string) => {
    return address
      .split("")
      .map((char) => {
        if (langmap[char as keyof Langmap] !== undefined) {
          return langmap[char as keyof Langmap];
        } else {
          return char;
        }
      })
      .join("")
      .split(" Urban Municipality")
      .join("");
  };

  return (
    <div className="petProfile">
      <Header />
      <main>
        <section className="images">
          <div className="large">
            {pet?.images[0] ? (
              <img className="petImage" src={pet?.images[0]} alt="Pet Image" />
            ) : (
              <MdOutlineNoPhotography className="petImage" />
            )}
          </div>

          <div className="small">
            {pet?.images
              ?.slice(1)
              .map((image: string, index: number) =>
                image ? (
                  <img
                    key={index}
                    className="petImage"
                    src={image}
                    alt="Pet Image"
                  />
                ) : (
                  <MdOutlineNoPhotography key={index} className="petImage" />
                )
              )}
          </div>
        </section>

        <section className="info">
          <div className="basicInfo">
            <h1>{pet?.petName}</h1>
            <p>{pet?.description || "No pet description."}</p>
          </div>

          <div className="additionalInfo">
            <div>
              <h3>{status === "missing" ? "Disappeared" : "Found"} on:</h3>
              <p>
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(new Date(pet?.date))}{" "}
                // {pet?.time + "h"}
              </p>
            </div>
            {status === "missing" && (
              <>
                <div>
                  <h3>Medication:</h3>
                  <p>{pet?.medication || "Does not use medications."}</p>
                </div>

                <div>
                  <h3>Owner:</h3>
                  <p>{pet?.owner}</p>
                </div>

                <div>
                  <h3>Contact:</h3>
                  <a href={`tel:${pet?.contact}`}>{pet?.contact}</a>
                </div>

                <div>
                  <h3>Reward:</h3>
                  <p>{pet?.reward ? pet?.reward + " €" : "No rewards."}</p>
                </div>
              </>
            )}
          </div>
        </section>

        <section className="address">
          <h3>
            Location:{" "}
            <span className="noBold">
              {updatedLocation(pet?.formattedAddress)}
            </span>
          </h3>
          <Map lat={pet?.lat} lng={pet?.lng} />
        </section>
      </main>
      <Footer />
    </div>
  );
};
export default PetProfile;
