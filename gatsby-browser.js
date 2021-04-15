import { withPrefix } from "gatsby-link"

import "./src/styles/pathfinder.min.css"

const scripts = [
	"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js",
	"https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js",
	withPrefix("js/graph.min.js"),
	withPrefix("js/pathfinder.min.js")
]

export const onClientEntry = () => {
	window.onload = () => {
		scripts.forEach(function(url) {
			let script = document.createElement("script")
			script.src = url
			script.async = false
			document.body.appendChild(script)
		})
	}
}
