import {
  GiSittingDog,
  GiEgyptianBird,
  GiRabbit,
  GiSandSnake,
} from "react-icons/gi";
import { FaCat, FaUndo } from "react-icons/fa";
import { IoPaw } from "react-icons/io5";
import { getFormattedDate } from "../utils/utils";

export const petCategories = [
  {
    icon: <GiSittingDog />,
    title: "Dogs",
    petCategory: "dog",
  },
  {
    icon: <FaCat />,
    title: "Cats",
    petCategory: "cat",
  },
  {
    icon: <GiEgyptianBird />,
    title: "Birds",
    petCategory: "bird",
  },

  {
    icon: <GiRabbit />,
    title: "Rodents",
    petCategory: "rodent",
  },
  {
    icon: <GiSandSnake />,
    title: "Reptiles",
    petCategory: "reptile",
  },
  {
    icon: <IoPaw />,
    title: "Other Pets",
    petCategory: "other",
  },
  {
    icon: <FaUndo />,
    title: "Reset",
    petCategory: "reset",
  },
];

export const Inputs = [
  {
    id: "petName",
    label: "*Pet name",
    type: "text",
    name: "petName",
    required: true,
    errormessage: "Please enter the pet's name.",
  },
  {
    id: "date",
    label: "*Date",
    type: "date",
    name: "date",
    min: "2025-01-01",
    max: getFormattedDate(new Date()),
    required: true,
    errormessage: "Please enter the date date. Date cannot be in the future.",
  },
  {
    id: "time",
    label: "*Time",
    type: "time",
    name: "time",
    required: true,
    errormessage: "Please enter the time.",
  },
  {
    id: "formattedAddress",
    label: "*Address",
    type: "text",
    name: "formattedAddress",
    required: true,
    errormessage:
      "Please enter the addres and select a location from the suggestions.",
  },
  {
    id: "owner",
    label: "*Owner",
    type: "text",
    name: "owner",
    placeholder: "John Doe",
    pattern: "^([A-ZŠĐŽČĆ][a-zšđžčć]+)(\\s[A-ZŠĐŽČĆ][a-zšđžčć]+)*$",
    required: true,
    errormessage: "Please enter the owner's full name.",
  },
  {
    id: "contact",
    label: "*Contact",
    type: "tel",
    name: "contact",
    placeholder: "+381641234567 or 0641234567",
    pattern: "^(\\+3816[0-6,89]|06[0-6,89])\\d{6,7}$",
    required: true,
    errormessage: "Please enter a valid phone number.",
  },
  {
    id: "medication",
    label: "If the pet is taking medication, what kind?",
    type: "text",
    name: "medication",
  },
  {
    id: "reward",
    label: "Pet finder reward (€)",
    type: "number",
    name: "reward",
  },
];

export const requiredInputs = [
  "petName",
  "date",
  "time",
  "formattedAddress",
  "owner",
  "contact",
];
