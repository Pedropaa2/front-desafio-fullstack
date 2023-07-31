import { StyledDialog } from "./styledDialog";
import { ThemeH3 } from "../../styles/typography";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./validator";

import { DashContext } from "../../providers/DashBoardContext";
import { useAuth } from "../../hooks/registerContactAuth";

export function DialogTech() {
  const { setOpen, open } = useContext(DashContext);

  const handleToClose = () => {
    setOpen(false);
  };

  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(schema),
  });
  const { registerContact } = useAuth();
  const onSubmit = async (data) => {
    await registerContact(data);
    reset();
    handleToClose();
  };

  return (
    <StyledDialog open={open} className="modal">
      <div className="modal_Container">
        <form className="modal_Content" onSubmit={handleSubmit(onSubmit)}>
          <div className="modalHeader">
            <ThemeH3>Register Contact</ThemeH3>
            <p className="close" onClick={handleToClose}>
              X
            </p>
          </div>
          <div className="input_Container">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" {...register("name")} />
          </div>
          <div className="input_Container">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" {...register("email")} />
          </div>
          <div className="input_Container">
            <label htmlFor="tel">Telephone</label>
            <input type="text" id="tel" {...register("telephone")} />
          </div>

          <div className="button">
            <button type="submit">Register </button>
          </div>
        </form>
      </div>
    </StyledDialog>
  );
}
