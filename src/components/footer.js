import * as React from "react"

import MediaControl from "./ui/mediacontrol"

const Footer = () => (
    <footer>
        <MediaControl />
        <div id={"bottom-bar"}>
            <a id={"trigger-about"} title={"Information about this application"} href={"#about"}>
                About Application
            </a>
        </div>
    </footer>
)

export default Footer
