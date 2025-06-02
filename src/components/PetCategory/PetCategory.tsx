import "./PetCategory.css";
import type { Dispatch, SetStateAction } from "react";

interface PetCategoryProps {
  petCategory: string;
  icon: React.ReactNode;
  title: string;
  setCategory: Dispatch<SetStateAction<string>>;
}

const PetCategory = ({
  petCategory,
  icon,
  title,
  setCategory,
}: PetCategoryProps) => {
  const handleCategoryClick = () => {
    setCategory(petCategory);
  };
  return (
    <li className="petCategory">
      <p>{title}</p>
      <button onClick={handleCategoryClick}>{icon}</button>
    </li>
  );
};

export default PetCategory;
