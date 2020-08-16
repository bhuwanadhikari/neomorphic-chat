import Navigation from "../components/Navigation";
import Layout from "../components/Layout";
import { appName } from "../constants";

function Chat() {
    return <>
        <Layout>
            <div style={{ marginTop: '20px' }} className="chip">
                <div className="chip__icon">
                    <ion-icon name="color-palette"></ion-icon></div>
                <p>
                    {appName} is not availabe is the best chat in the world and you
                    have to use this side
                    as the best
                </p>
                <div className="chip__close">
                    <ion-icon name="close"></ion-icon>
                </div>
            </div>
        </Layout>
    </>
}

export default Chat;