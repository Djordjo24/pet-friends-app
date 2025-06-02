import "./Form.css";
import "leaflet/dist/leaflet.css";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getFormattedDate, toUpperCase } from "../../utils/utils.ts";
import Map from "../Map/Map.tsx";

const GEOAPIFY_API_KEY = "7e260f7da7d34691831f99c1ac4f8371";

interface SugesstionsArray {
  properties: {
    formatted: string;
  };
}

interface FormProps {
  status: string;
}

const Form = (props: FormProps) => {
  const navigate = useNavigate();
  const [petName, setPetName] = useState("");
  const [category, setCategory] = useState("dog");
  const [images, setImages] = useState<string[]>(["", "", ""]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [sugesstions, setSuggestions] = useState<SugesstionsArray[]>([]);
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [owner, setOwner] = useState("");
  const [contact, setContact] = useState("");
  const [chipped, setChipped] = useState("");
  const [medication, setMedication] = useState("");
  const [reward, setReward] = useState(0);
  const [notes, setNotes] = useState("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getSuggestions = async (query: string) => {
    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${GEOAPIFY_API_KEY}&limit=20`
      );
      const result = await response.json();
      setSuggestions(result?.features);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPetName(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedIndex !== null) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedImages = [...images];
        updatedImages[selectedIndex] = reader.result as string;
        setImages(updatedImages);
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
    setDescription(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (value.trim() !== "") {
        getSuggestions(value);
      }
    }, 500);
  };

  const handleSugesstionClick = (formatted: string) => {
    const getCoordinates = async () => {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${formatted}&apiKey=${GEOAPIFY_API_KEY}`
      );
      const result = await response.json();
      const coords = result?.features?.[0].geometry?.coordinates;
      const [lng, lat] = coords;
      setLat(lat);
      setLng(lng);
    };
    getCoordinates();
    setAddress(formatted);
    setSuggestions([]);
  };

  const handleOwnerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOwner(e.target.value);
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContact(e.target.value);
  };

  const handleChippedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChipped(e.target.value);
  };

  const handleMedicationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMedication(e.target.value);
  };

  const handleRewardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReward(Number(e.target.value));
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!lat && !lng) {
      alert(
        "To continue, please choose an address from the suggestions below."
      );
      return;
    }
    const dataStatus = props.status === "missing" ? "MissingPets" : "FoundPets";
    const id = uuidv4();
    const existingData = JSON.parse(localStorage.getItem(dataStatus) || "[]");
    const updatedData = [
      ...existingData,
      props.status === "missing"
        ? {
            id,
            petName,
            category,
            images,
            description,
            date,
            time,
            address,
            lat,
            lng,
            owner,
            contact,
            chipped,
            medication,
            reward,
            notes,
          }
        : {
            id,
            category,
            images,
            description,
            date,
            time,
            address,
            lat,
            lng,
          },
    ];
    localStorage.setItem(dataStatus, JSON.stringify(updatedData));
    navigate(`/${toUpperCase(props.status)}PetProfile/${id}`);
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <fieldset>
        <legend>Basic information about the pet</legend>

        {props.status === "missing" && (
          <section>
            <label>Pet's name</label>
            <input type="text" value={petName} onChange={handleNameChange} />
          </section>
        )}

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
                  {images[index] ? (
                    <img src={images[index]} alt="Preview" />
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
            value={description}
            placeholder="..."
            maxLength={500}
            name="description"
            onChange={handleDescriptionChange}
          />
        </section>
      </fieldset>
      <fieldset>
        <legend>Details of the disappearance</legend>
        <section>
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            name="disappearance-date"
            value={date}
            onChange={handleDateChange}
            min="2025-01-01"
            max={getFormattedDate(new Date())}
          />
        </section>
        <section>
          <label htmlFor="time">Time</label>
          <input
            id="time"
            name="time"
            type="time"
            value={time}
            onChange={handleTimeChange}
          />
        </section>
        <section>
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            name="address"
            value={address}
            onChange={handleAddressChange}
          />
          {address && sugesstions.length > 0 && (
            <ul className="suggestions">
              {sugesstions.map((sug, i) => (
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
          {lat !== null && lng !== null && <Map lat={lat} lng={lng} />}
        </section>
      </fieldset>
      {props.status === "missing" && (
        <fieldset>
          <legend>Contact information</legend>

          <section>
            <label htmlFor="owner">Owner</label>
            <input
              id="owner"
              type="text"
              name="owner"
              value={owner}
              onChange={handleOwnerChange}
            />
          </section>

          <section>
            <label htmlFor="contact">Contact</label>
            <input
              id="contact"
              type="tel"
              value={contact}
              name="contact"
              placeholder="+123456789"
              pattern="^\+?[0-9]{7,15}$"
              title="Enter a valid phone number (e.g. +1234567890)"
              onChange={handleContactChange}
            />
          </section>
        </fieldset>
      )}
      {props.status === "missing" && (
        <fieldset>
          <legend>Additional information</legend>
          <section>
            <p>Is the pet chipped?</p>
            <div>
              <input
                id="yes"
                type="radio"
                name="chipped"
                value="yes"
                onChange={handleChippedChange}
              />
              <label htmlFor="yes">Yes</label>
            </div>
            <div>
              <input
                id="no"
                type="radio"
                name="chipped"
                value="no"
                onChange={handleChippedChange}
              />
              <label htmlFor="no">No</label>
            </div>
          </section>

          <section>
            <label htmlFor="medication">
              If the pet is taking medication, what kind?
            </label>
            <input
              id="medication"
              type="text"
              value={medication}
              onChange={handleMedicationChange}
            />
          </section>

          <section>
            <label htmlFor="reward">Pet finder reward ($)</label>
            <input
              id="reward"
              value={reward}
              type="number"
              onChange={handleRewardChange}
            />
          </section>

          <section>
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              value={notes}
              placeholder="..."
              maxLength={500}
              name="notes"
              onChange={handleNotesChange}
            />
          </section>
        </fieldset>
      )}
      <div className="formSubmit">
        <button type="submit" className="submitBtn">
          Submit Report
        </button>
      </div>
    </form>
  );
};

export default Form;
