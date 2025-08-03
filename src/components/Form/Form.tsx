import "./Form.css";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { toUpperCase } from "../../utils/utils.ts";
import { Inputs, requiredInputs } from "../../mockData/mockData.tsx";
import Map from "../Map/Map.tsx";
import Input from "../Input/Input.tsx";

const GEOAPIFY_API_KEY = "7e260f7da7d34691831f99c1ac4f8371";

interface FormProps {
  status: string;
}

interface SugesstionsArray {
  properties: {
    formatted: string;
  };
}

type PetInfo = {
  petName: string;
  category: string;
  images: string[];
  description: string;
  date: string;
  time: string;
  formattedAddress: string;
  city: string;
  owner: string;
  contact: string;
  medication: string;
  reward?: number;
};

type RequiredInputs = {
  petName: boolean;
  date: boolean;
  time: boolean;
  formattedAddress: boolean;
  owner: boolean;
  contact: boolean;
};

const Form = (props: FormProps) => {
  const navigate = useNavigate();
  const [petInfo, setPetInfo] = useState({
    petName: "",
    category: "dog",
    images: ["", "", ""],
    description: "",
    date: "",
    time: "",
    formattedAddress: "",
    city: "",
    owner: "",
    contact: "",
    medication: "",
    reward: undefined,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [address, setAddress] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<SugesstionsArray[]>([]);
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [suggestionsError, setSuggestionsError] = useState<string>("");
  const [emptyRequiredInputs, setEmptyRequiredInputs] = useState({
    petName: false,
    date: false,
    time: false,
    formattedAddress: false,
    owner: false,
    contact: false,
  });

  //Debouncing
  useEffect(() => {
    const addressTimeout = setTimeout(() => {
      if (address.trim() !== "") {
        getSuggestions(address);
      }
    }, 500);
    return () => clearTimeout(addressTimeout);
  }, [address]);

  const getSuggestions = async (query: string) => {
    try {
      setSuggestionsError("");
      setIsLoading(true);
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${GEOAPIFY_API_KEY}&limit=20`
      );
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      setSuggestions(result?.features);
    } catch (error) {
      console.log(error);
      setSuggestions([]);
      setSuggestionsError(
        "Unable to fetch address suggestions. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPetInfo((prev) => ({ ...prev, category: e.target.value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedIndex !== null) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedImages = [...petInfo.images];
        updatedImages[selectedIndex] = reader.result as string;
        setPetInfo((prev) => ({ ...prev, images: updatedImages }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePreviewClick = (index: number) => {
    setSelectedIndex(index);
    fileInputRef.current?.click();
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPetInfo((prev) => ({ ...prev, description: e.target.value }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "formattedAddress") setAddress(e.target.value);
    setPetInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setEmptyRequiredInputs((prev) => ({ ...prev, [e.target.name]: false }));
  };

  const handleSugesstionClick = (formatted: string) => {
    const getCoordinates = async () => {
      try {
        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/search?text=${formatted}&apiKey=${GEOAPIFY_API_KEY}`
        );
        if (!response.ok)
          throw new Error(`Response status: ${response.status}`);
        const result = await response.json();
        const coords = result?.features?.[0].geometry?.coordinates;
        const [lng, lat] = coords;
        setLat(lat);
        setLng(lng);
        const city = result?.features?.[0].properties?.city;
        setPetInfo((prev) => ({ ...prev, city: city }));
      } catch (error) {
        console.log(error);
      }
    };
    getCoordinates();
    setSuggestions([]);
    setPetInfo((prev) => ({ ...prev, formattedAddress: formatted }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    requiredInputs.forEach((input) => {
      if (!petInfo[input as keyof PetInfo])
        setEmptyRequiredInputs((prev) => ({ ...prev, [input]: true }));
    });
    if (!petInfo.date || !petInfo.time || !petInfo.formattedAddress) return;
    if (
      props.status === "missing" &&
      (!petInfo.petName || !petInfo.owner || !petInfo.contact)
    )
      return;

    if (!lat && !lng) return;

    const dataStatus = props.status === "missing" ? "MissingPets" : "FoundPets";
    const id = uuidv4();
    const existingData = JSON.parse(localStorage.getItem(dataStatus) || "[]");
    const updatedData = [
      ...existingData,
      props.status === "missing"
        ? {
            id,
            lat,
            lng,
            ...petInfo,
          }
        : {
            id,
            lat,
            lng,
            category: petInfo.category,
            images: petInfo.images,
            description: petInfo.description,
            date: petInfo.date,
            time: petInfo.time,
            formattedAddress: petInfo.formattedAddress,
            city: petInfo.city,
          },
    ];
    localStorage.setItem(dataStatus, JSON.stringify(updatedData));
    navigate(`/${toUpperCase(props.status)}PetProfile/${id}`);
  };

  return (
    <form noValidate className="form" onSubmit={handleSubmit}>
      <fieldset>
        <legend>
          {props.status === "missing"
            ? "Report Missing Pet"
            : "Report Found Pet"}
        </legend>
        <p style={{ textAlign: "end" }}>
          *Fields marked with an asterisk are required.
        </p>

        <section>
          <label htmlFor="category">Category</label>
          <select id="category" name="category" onChange={handleCategoryChange}>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="bird">Bird</option>
            <option value="rodent">Rodent</option>
            <option value="reptile">Reptile</option>
            <option value="other">Other Pets</option>
          </select>
        </section>

        <section>
          <label>Add a photo</label>
          <div className="photoFrames">
            {[0, 1, 2].map((index) => (
              <React.Fragment key={index}>
                <div
                  className={`photoFrame ${["one", "two", "three"][index]}`}
                  onClick={() => handlePreviewClick(index)}
                >
                  {petInfo.images[index] ? (
                    <img src={petInfo.images[index]} alt="Preview" />
                  ) : (
                    "+"
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                  ref={fileInputRef}
                />
              </React.Fragment>
            ))}
          </div>
        </section>

        <section>
          <label htmlFor="description">Pet Description</label>
          <textarea
            id="description"
            value={petInfo.description}
            placeholder="..."
            maxLength={500}
            name="description"
            onChange={handleDescriptionChange}
          />
        </section>

        {Inputs.map((input) => {
          if (
            props.status === "found" &&
            (input.name === "petName" ||
              input.name === "owner" ||
              input.name === "contact" ||
              input.name === "medication" ||
              input.name === "reward")
          )
            return;
          return (
            <section key={input.id}>
              <label>
                {props.status === "missing"
                  ? input.missinglabel
                  : input.foundlabel}
              </label>
              <Input
                {...input}
                value={petInfo[input.name as keyof PetInfo]}
                onChange={handleInputChange}
                emptyRequiredInput={
                  emptyRequiredInputs[input.name as keyof RequiredInputs]
                }
              />

              {input.name === "formattedAddress" &&
                isLoading &&
                suggestions.length === 0 && (
                  <p className="loadingSuggestions">Loading suggestions...</p>
                )}
              {input.name === "formattedAddress" &&
                address &&
                suggestions.length > 0 && (
                  <ul className="suggestions">
                    {suggestions.map((sug, i) => (
                      <li
                        key={i}
                        onClick={() =>
                          handleSugesstionClick(sug?.properties?.formatted)
                        }
                      >
                        {sug?.properties?.formatted}
                      </li>
                    ))}
                  </ul>
                )}
              {input.name === "formattedAddress" &&
                address &&
                !isLoading &&
                suggestionsError && (
                  <span className="suggestionError">{suggestionsError}</span>
                )}
              {input.name === "formattedAddress" &&
                lat !== null &&
                lng !== null && <Map lat={lat} lng={lng} />}
              <span className="errorMessage">{input.errormessage}</span>
            </section>
          );
        })}
      </fieldset>

      <div className="formSubmit">
        <button type="submit" className="submitBtn">
          Submit Report
        </button>
      </div>
    </form>
  );
};

export default Form;
