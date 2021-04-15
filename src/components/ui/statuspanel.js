import * as React from "react"

const StatusPanel = () => (
    <>
        <div id={"status"} className={"panel"}>
            <p>
                Please run a MST algorithm first to see the
                <br />
                program status
            </p>
        </div>
        <div id={"status-hide"} className={"panel-hide"}>
            <img
                src={"./img/arrow_white_right.webp"}
                alt={"&gt;"}
                title={"show/hide status panel"}
                className={"rotateRight unselectable"}
                unselectable={"on"}
            />
        </div>
    </>
)

export default StatusPanel
