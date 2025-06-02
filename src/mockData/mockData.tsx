import {
  GiSittingDog,
  GiEgyptianBird,
  GiRabbit,
  GiSandSnake,
} from "react-icons/gi";
import { FaCat, FaUndo } from "react-icons/fa";
import { IoPaw } from "react-icons/io5";

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
