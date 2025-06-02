import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Background from "./components/Background/Background";
import Wrapper from "./components/Wrapper/Wrapper";
import Homepage from "./pages/Homepage/Homepage";
import PetDirectory from "./pages/PetDirectory/PetDirectory.tsx";
import FormPage from "./pages/FormPage/FormPage.tsx";
import PetProfile from "./components/PetProfile/PetProfile.tsx";

function App() {
  return (
    <Background>
      <Wrapper>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route
              path="/MissingPets"
              element={<PetDirectory status="missing" />}
            />
            <Route
              path="/FoundPets"
              element={<PetDirectory status="found" />}
            />
            <Route
              path="/MissingForm"
              element={<FormPage status="missing" />}
            />
            <Route path="/FoundForm" element={<FormPage status="found" />} />
            <Route
              path="/MissingPetProfile/:id"
              element={<PetProfile status="missing" />}
            />
            <Route
              path="/FoundPetProfile/:id"
              element={<PetProfile status="found" />}
            />
          </Routes>
        </BrowserRouter>
      </Wrapper>
    </Background>
  );
}

export default App;
