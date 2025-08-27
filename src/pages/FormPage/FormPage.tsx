import "./FormPage.css";
import Header from "../../components/Header/Header.tsx";
import Form from "../../components/Form/Form.tsx";
import Footer from "../../components/Footer/Footer.tsx";

interface FormPageProps {
  status: string;
}

const FormPage = ({ status }: FormPageProps) => {
  return (
    <div className="formPage">
      <Header />
      <Form status={status} />
      <Footer />
    </div>
  );
};

export default FormPage;
