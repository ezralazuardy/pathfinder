import * as React from "react"

const CodeTracePanel = () => (
    <>
        <div id={"codetrace"} className={"panel"}>
            <p id={"codetrace-placeholder"}>
                Please run a MST algorithm first to see the
                <br />
                program pseudocodes
            </p>
            <p id={"code1"} hidden>
                Sort E edges by increasing weight
            </p>
            <p id={"code2"} hidden>
                T = {}
            </p>
            <p id={"code3"} hidden>
                for (i = 0; i &lt; edges.length; i++)
            </p>
            <p id={"code4"} hidden>
                &nbsp;&nbsp;if adding e = edges[i] does not form a cycle
            </p>
            <p id={"code5"} hidden>
                &nbsp;&nbsp;&nbsp;&nbsp;add e to T
            </p>
            <p id={"code6"} hidden>
                &nbsp;&nbsp;else ignore e
            </p>
            <p id={"code7"} hidden>
                MST = T
            </p>
        </div>
        <div id={"codetrace-hide"} className={"panel-hide"}>
            <img
                src={"./img/arrow_white_right.webp"}
                alt={"&gt;"}
                title={"show/hide codetrace panel"}
                className={"rotateRight unselectable"}
                unselectable={"on"}
            />
        </div>
    </>
)

export default CodeTracePanel
