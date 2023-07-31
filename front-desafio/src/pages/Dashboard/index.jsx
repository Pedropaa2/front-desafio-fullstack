import { useNavigate } from "react-router-dom";
import { ThemeH1, ThemeP } from "../../styles/typography";
import { StyledSection, StyledContent, StyledDashHeader } from "./styledDash";
import { DialogTech } from "../../components/DialogCreateTech/index";
import { DialogCreate } from "../../components/DialogEditAndExclude/index";
import { useContext, useEffect, useState } from "react";
import { DashContext } from "../../providers/DashBoardContext";
import { api } from "../../services/api";
import add from "../../assets/mais.svg";
import { LiFunction } from "../../components/CardTech/index";

export function Dash() {
  const {
    open,
    openDialog,
    setOpen,
    setOpenDialog,
    contacts,
    setContacts,
    setContactName,
    setContactId,
    setContactEmail,
    setContactTel,
    contactPatch,
    number,
  } = useContext(DashContext);

  const [client, setClient] = useState("");
  const [email, setEmail] = useState("");

  const handleClickToOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("@TOKEN");
      const response = await api.get("/contacts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setContacts(response.data.contacts);
      setClient(response.data.name);
      setEmail(response.data.email);
    })();
  }, [setContacts, contactPatch, number]);
  const handleClickToOpenDialog = () => {
    setOpenDialog(true);
  };

  const navigate = useNavigate();
  function clearStorage() {
    window.localStorage.clear();
  }
  function onclick() {
    handleClickToOpenDialog();
  }

  const setContactInfo = (id, name, email, telephone) => {
    setContactId(id);
    setContactName(name);
    setContactEmail(email);
    setContactTel(telephone);
    onclick();
  };

  return (
    <div>
      <StyledDashHeader>
        <div className="header_Container">
          <button
            onClick={() => {
              navigate("/");
              clearStorage();
            }}
          >
            Sair
          </button>
        </div>
      </StyledDashHeader>
      <StyledSection>
        <div className="text_Container">
          <ThemeH1 color="--Grey-05">Hello, {client} </ThemeH1>
          <ThemeP color="--Grey-04"> {email} </ThemeP>
        </div>
      </StyledSection>
      <StyledContent className="content">
        <div className="create">
          <ThemeH1 color="--Grey-05">Contacts</ThemeH1>

          <div className="img_Container" onClick={handleClickToOpen}>
            <img src={add} alt="" />
          </div>
        </div>

        <ul>
          {contacts.map((li) => (
            <LiFunction
              id={li.id}
              key={li.id}
              title={li.name}
              status={li.email}
              open={() =>
                setContactInfo(li.id, li.name, li.email, li.telephone)
              }
            ></LiFunction>
          ))}
        </ul>
      </StyledContent>
      <DialogTech open={open} />
      <DialogCreate open={openDialog} />
    </div>
  );
}
