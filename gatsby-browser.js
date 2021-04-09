import { withPrefix } from "gatsby-link"

import "./src/styles/pathfinder.min.css"
import "./src/styles/app.css"

const addScript = url => {
    const script = document.createElement("script")
    script.src = url
    script.async = false
    document.body.appendChild(script)
}

export const onClientEntry = () => {
    window.onload = () => {
        addScript(withPrefix("jquery.min.js"))
        addScript(withPrefix("jquery-ui.min.js"))
        addScript(withPrefix("d3.min.js"))
        addScript(withPrefix("pathfinder.min.js"))
        addScript(withPrefix("overlay.js"))
        addScript(withPrefix("app.js"))
    }
}
