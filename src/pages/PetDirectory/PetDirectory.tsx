import "./PetDirectory.css";
import { useState } from "react";
import { toUpperCase } from "../../utils/utils.ts";
import { petCategories } from "../../mockData/mockData.tsx";
import Header from "../../components/Header/Header.tsx";
import PetCategory from "../../components/PetCategory/PetCategory.tsx";
import PetCard from "../../components/PetCard/PetCard.tsx";
import Footer from "../../components/Footer/Footer.tsx";

interface PetDirectoryProps {
  status: string;
}

interface PetObject {
  id: string;
  images: [string, string, string];
  category: string;
  petName: string;
}

const PetDirectory = ({ status }: PetDirectoryProps) => {
  const [category, setCategory] = useState("");
  const dataStatus = status === "missing" ? "MissingPets" : "FoundPets";
  const data = JSON.parse(localStorage.getItem(dataStatus) || "[]");
  const filteredData =
    category === "reset"
      ? data
      : data.filter((pet: PetObject) =>
          category ? pet.category === category : true
        );

  return (
    <div className="petDirectory">
      <Header />
      <main>
        <h1>{toUpperCase(status)} Pets</h1>
        <div className="layout">
          <div className="pets">
            {filteredData.length > 0 ? (
              filteredData.map((pet: PetObject) => (
                <PetCard
                  status={status}
                  key={pet.id}
                  id={pet.id}
                  images={pet.images}
                  category={pet.category}
                  petName={pet.petName}
                />
              ))
            ) : (
              <p>There are currently no missing pets.</p>
            )}
          </div>
          <div className="category">
            <h2>Categories</h2>
            <ul>
              {petCategories.map((item) => {
                return (
                  <PetCategory
                    key={item.petCategory}
                    petCategory={item.petCategory}
                    icon={item.icon}
                    title={item.title}
                    setCategory={setCategory}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PetDirectory;
