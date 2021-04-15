import * as React from "react"

export const onRenderBody = ({ setHeadComponents }) => {
    setHeadComponents([
        <link rel="preconnect" href="https://fonts.gstatic.com" />,
        <link
            rel="stylesheet"
            type="text/css"
            href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap"
        />
    ])
}
