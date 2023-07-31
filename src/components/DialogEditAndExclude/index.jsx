import { ThemeH3 } from "../../styles/typography";
import { useContext } from "react";
import { DashContext } from "../../providers/DashBoardContext";
import { StyledDialogCreate } from "./styledDialodCreate";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchemaUpdateRequest } from "./validator";
import { useAuth } from "../../hooks/updateContactAuth";

export function DialogCreate() {
  const {
    openDialog,
    setOpenDialog,
    contactName,
    contactEmail,
    contactTel,
    deleteContact,
  } = useContext(DashContext);

  const handleToClose = () => {
    setOpenDialog(false);
  };
  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(contactSchemaUpdateRequest),
  });
  const { updateContact } = useAuth();

  const onSubmit = async (data) => {
    if (data.email.length <= 1) {
      data.email = contactEmail;
    }

    if (data.name.length <= 1) {
      data.name = contactName;
    }

    if (data.telephone.length <= 1) {
      data.telephone = contactTel;
    }
    console.log(data);

    await updateContact(data);

    reset();
    handleToClose();
  };

  return (
    <StyledDialogCreate open={openDialog} className="modal">
      <div className="modal_Container">
        <form className="modal_Content" onSubmit={handleSubmit(onSubmit)}>
          <div className="modalHeader">
            <ThemeH3>Contact Details</ThemeH3>
            <p onClick={handleToClose}>X</p>
          </div>
          <div className="input_Container">
            <label htmlFor="input">Name</label>
            <input
              type="text"
              id="input"
              placeholder={contactName}
              {...register("name")}
            />
          </div>
          <div className="input_Container">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder={contactEmail}
              {...register("email")}
            />
          </div>
          <div className="input_Container">
            <label htmlFor="tel">Telephone</label>
            <input
              type="text"
              id="tel"
              placeholder={contactTel}
              {...register("telephone")}
            />
          </div>

          <div className="button">
            <button type="submit" className="save">
              Save changes
            </button>
            <button type="button" className="exclude" onClick={deleteContact}>
              Delete
            </button>
          </div>
        </form>
      </div>
    </StyledDialogCreate>
  );
}
