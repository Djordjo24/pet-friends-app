import "./PetCard.css";
import noImage from "../../assets/images/nema-slike.jpg";
import { toUpperCase } from "../../utils/utils";
import { Link } from "react-router-dom";

interface PetCardProps {
  status: string;
  id: string;
  images: [string, string, string];
  category: string;
  petName: string;
}

const PetCard = ({ status, id, images, category, petName }: PetCardProps) => {
  return (
    <Link to={`/${toUpperCase(status)}PetProfile/${id}`} className="petCard">
      {images?.[0] ? (
        <img src={images?.[0]} alt="Pet Image" />
      ) : (
        <img src={noImage} alt="no-image" />
      )}
      <p>{toUpperCase(category)}</p>
      <h3>{petName}</h3>
    </Link>
  );
};

export default PetCard;
