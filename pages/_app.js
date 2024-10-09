import "bootstrap/dist/css/bootstrap.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { SurveyProvider } from "../context/SurveyContext";
import { EntityProvider } from "../context/EntityContext";
import { ModalProvider } from "../context/ModalContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <ModalProvider>
            <EntityProvider>
                <SurveyProvider>
                    <Component {...pageProps} />
                </SurveyProvider>
            </EntityProvider>
        </ModalProvider>
    );
}

export default MyApp;
