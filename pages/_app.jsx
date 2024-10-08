import "bootstrap/dist/css/bootstrap.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { SurveyProvider } from "../context/SurveyContext";
import { EntityProvider } from "../context/EntityContext";
import { UserProvider } from "../context/UserContext";
import { ModalProvider } from "../context/ModalContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <ModalProvider>
            <UserProvider>
                <EntityProvider>
                    <SurveyProvider>
                        <Component {...pageProps} />
                    </SurveyProvider>
                </EntityProvider>
            </UserProvider>
        </ModalProvider>
    );
}

export default MyApp;
