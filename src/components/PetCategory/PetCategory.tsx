import "./PetCategory.css";
import type { Dispatch, SetStateAction } from "react";

interface PetCategoryProps {
  petCategory: string;
  icon: React.ReactNode;
  title: string;
  setCategory: Dispatch<SetStateAction<string>>;
  category: string;
}

const PetCategory = ({
  petCategory,
  icon,
  title,
  setCategory,
  category,
}: PetCategoryProps) => {
  const handleCategoryClick = () => {
    setCategory(petCategory);
  };
  return (
    <li className="petCategory">
      <p>{title}</p>
      <button
        style={{
          backgroundColor:
            petCategory === category ? "black" : "var(--green-color)",
        }}
        onClick={handleCategoryClick}
      >
        {icon}
      </button>
    </li>
  );
};

export default PetCategory;
