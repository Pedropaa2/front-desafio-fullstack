import { createContext, useState } from "react";
import { ContactData } from "../components/DialogCreateTech/validator";
import { ContactDataUpdate } from "../components/DialogEditAndExclude/validator";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const DashContext = createContext({});
interface IDefaultProviderProps {
  children: React.ReactNode;
}

export const DashProvider = ({ children }: IDefaultProviderProps) => {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [contactId, setContactId] = useState();
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactTel, setContactTel] = useState("");
  const [contactPatch, setContactPatch] = useState({});
  const [number, setNumber] = useState<number>();
  const id = contactId;
  const token = localStorage.getItem("@TOKEN");

  const navigate = useNavigate();
  async function registerContact(data: ContactData) {
    try {
      await api.post("/contacts", data);

      toast.success("Registro de contato efetuado com sucesso");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
      const randomInt = Math.floor(Math.random() * 100);
      setNumber(randomInt);
    } catch (error) {
      toast.error("Email ou senha incorretos");
    }
  }

  async function updateContact(data: ContactDataUpdate) {
    try {
      await api.patch(`/contacts/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Tecnologia atualizada com sucesso");
      setOpenDialog(false);

      const randomInt = Math.floor(Math.random() * 100);
      setNumber(randomInt);
    } catch (error) {
      toast.error("Algo deu errado!");
    }
  }

  async function deleteContact() {
    try {
      await api.delete(`/contacts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Contact deletedo sucesso");
      setOpenDialog(false);
      const randomInt = Math.floor(Math.random() * 100);
      setNumber(randomInt);
    } catch (error) {
      toast.error("Algo deu errado!");
    }
  }
  return (
    <DashContext.Provider
      value={{
        open,
        setOpen,
        openDialog,
        setOpenDialog,
        registerContact,
        contacts,
        setContacts,
        contactName,
        setContactName,
        contactId,
        setContactId,
        setContactEmail,
        contactEmail,
        setContactTel,
        contactTel,
        updateContact,
        contactPatch,
        setContactPatch,
        deleteContact,
        number,
      }}
    >
      {" "}
      {children}{" "}
    </DashContext.Provider>
  );
};
