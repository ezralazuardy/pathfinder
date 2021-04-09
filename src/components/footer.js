import * as React from "react"
import MediaControls from "./ui/mediacontrols"

const Footer = () => (
    <footer>
        <MediaControls />
        <div id="bottom-bar">
            <a id="trigger-about" title="Information about this application">
                About Application
            </a>
        </div>
    </footer>
)

export default Footer
