import "./PetDirectory.css";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
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
  images: string[];
  category: string;
  petName: string;
  city: string;
}

const PetDirectory = ({ status }: PetDirectoryProps) => {
  const [searchByName, setSearchByName] = useState("");
  const [searchByCity, setSearchByCity] = useState("");
  const [category, setCategory] = useState("");
  const dataStatus = status === "missing" ? "MissingPets" : "FoundPets";
  const data = JSON.parse(localStorage.getItem(dataStatus) || "[]");
  const filteredData =
    !searchByName && !searchByCity && category === "reset"
      ? data
      : data
          .filter((pet: PetObject) =>
            status === "missing" ? pet.petName.includes(searchByName) : true
          )
          .filter((pet: PetObject) => pet.city.includes(searchByCity))
          .filter((pet: PetObject) =>
            category && category !== "reset" ? pet.category === category : true
          );

  useEffect(() => {
    if (status !== "missing") setCategory("");
    if (status !== "found") setCategory("");
  }, [status]);

  const handleSearchByName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchByName(e.target.value);
  };

  const handleSearchByCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchByCity(e.target.value);
  };

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
                  city={pet.city}
                />
              ))
            ) : (
              <p>There are currently no missing pets.</p>
            )}
          </div>
          <div className="sidebar">
            {status === "missing" && (
              <div className="searchByName">
                <FaSearch className="searchIcon" />
                <input
                  type="text"
                  name="searchByName"
                  placeholder="Search pets by name"
                  onChange={handleSearchByName}
                  value={searchByName}
                />
              </div>
            )}
            <div className="searchByCity">
              <FaSearch className="searchIcon" />
              <input
                type="text"
                name="searchByCity"
                placeholder="Search pets by city"
                onChange={handleSearchByCity}
                value={searchByCity}
              />
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
                      category={category}
                    />
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PetDirectory;
