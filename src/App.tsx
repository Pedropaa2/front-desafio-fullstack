import { LoginProvider } from "./providers/LoginContext";
import { RegisterProvider } from "./providers/RegisterContext";
import { RoutesMain } from "./routes/index";
import { GlobalStyle } from "./styles/GlobalStyle";
import { DashProvider } from "./providers/DashBoardContext";

function App() {
  return (
    <>
      <GlobalStyle />
      <DashProvider>
        <RegisterProvider>
          <LoginProvider>
            <RoutesMain />;
          </LoginProvider>
        </RegisterProvider>
      </DashProvider>
    </>
  );
}

export default App;
