import "./FormPage.css";
import Header from "../../components/Header/Header.tsx";
import Form from "../../components/Form/Form.tsx";

interface FormPageProps {
  status: string;
}

const FormPage = ({ status }: FormPageProps) => {
  return (
    <div className="formPage">
      <Header />
      <Form status={status} />
    </div>
  );
};

export default FormPage;
