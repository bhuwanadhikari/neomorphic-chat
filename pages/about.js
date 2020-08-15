import Navigation from "../components/Navigation";
import Layout from "../components/Layout";

function Chat() {
    return <>
        <Layout>
            <div className="chip">
                <div className="chip__icon">
                    <ion-icon name="color-palette"></ion-icon></div>
                <p>Neumorphic Design</p>
                <div className="chip__close">
                    <ion-icon name="close"></ion-icon>
                </div>
            </div>
        </Layout>
    </>
}

export default Chat;