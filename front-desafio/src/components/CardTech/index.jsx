import { StyledLi } from "./styledLi";
import { ThemeH2 } from "../../styles/typography";

export function LiFunction({ title, id, open }) {
  return (
    <StyledLi id={id} onClick={open} title={title}>
      <ThemeH2 id={id} title={title}>
        {" "}
        {title}{" "}
      </ThemeH2>
    </StyledLi>
  );
}
