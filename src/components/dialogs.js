import * as React from "react"

const Dialogs = () => (
    <>
        <div id={"popup"} hidden>
            <div id={"popup-content"} />
            <span id={"hide-popup"} hidden>
                X <u>Close</u>
            </span>
        </div>
        <div id={"drawgraph"} className={"overlays"}>
            <div id={"main"}>
                <div id={"draw-status"}>
                    <p>Status</p>
                </div>
                <div id={"draw-warn"}>
                    <p>No Warning</p>
                </div>
                <div id={"draw-err"}>
                    <p>No Error</p>
                </div>
                <div id={"viz"}>
                    {" "}
                    <svg
                        id={"drawgraph-visualizer"}
                        width={"640"}
                        height={"360"}
                    >
                        <defs>
                            <marker
                                id={"end-arrow"}
                                viewBox={"0 -5 10 10"}
                                refX={"6"}
                                markerWidth={"3"}
                                markerHeight={"3"}
                                orient={"auto"}
                            >
                                <path d={"M0,-5L10,0L0,5"} fill={"#000"} />
                            </marker>
                        </defs>
                        <path
                            className={"link dragline hidden"}
                            d={"M0,0L0,0"} />
                        <g>
                            <path
                                className={"link"}
                                d={"M108.48528137423857,108.48528137423857L191.51471862576142,191.51471862576142"} />
                            <path
                                className={"link"}
                                d={"M208.48528137423858,208.48528137423858L291.5147186257614,291.5147186257614"} />
                        </g>
                        <g>
                            <g>
                                <circle
                                    className={"node"}
                                    r={"16"}
                                    cx={"100"}
                                    cy={"100"} />
                                <text
                                    x={"100"}
                                    y={"105.33333333333333"}
                                    className={"id"}
                                >
                                    0
                                </text>
                            </g>
                            <g>
                                <circle
                                    className={"node"}
                                    r={"16"}
                                    cx={"200"}
                                    cy={"200"} />
                                <text
                                    x={"200"}
                                    y={"205.33333333333334"}
                                    className={"id"}
                                >
                                    1
                                </text>
                            </g>
                            <g>
                                <circle
                                    className={"node"}
                                    r={"16"}
                                    cx={"300"}
                                    cy={"300"} />
                                <text
                                    x={"300"}
                                    y={"305.3333333333333"}
                                    className={"id"}
                                >
                                    2
                                </text>
                            </g>
                        </g>
                        <g />
                        {" "}
                        <text x={"250"} y={"100"}>
                            {" "}
                            • Click on empty space to add vertex
                        </text>
                        {" "}
                        <text x={"250"} y={"125"}>
                            {" "}
                            • Drag from vertex to vertex to add edge
                        </text>
                        {" "}
                        <text x={"250"} y={"150"}>
                            {" "}
                            • Select + Delete to delete vertex/edge
                        </text>
                        <text x={"250"} y={"175"}>
                            {" "}
                            • Select Edge + Enter to change edge's weight
                        </text>
                    </svg>
                    {" "}
                </div>
                <div id={"drawgraph-actions"}>
                    <p id={"drawgraph-btn-cancel"}>Cancel</p>
                    <p id={"drawgraph-btn-clear"}>Clear</p>
                    <p id={"drawgraph-btn-done"}>Done</p>
                    <form id={"drawgraph-form"}>
                        <input
                            type={"checkbox"}
                            id={"copy"}
                            name={"submit"}
                            defaultValue={"submit"}
                        />
                        Copy JSON text to clipboard
                    </form>
                </div>
            </div>
        </div>
        <div id={"about"} className={"overlays"}>
            <h4>About Application</h4>
            <span className={"close-overlay"}>✕</span>
            <div className={"content"}>
                <p>
                    <b>Minimum Spanning Tree Pathfinding</b> is a web
                    application intended to help visualize the MST pathfinding
                    algorithm with simple, easy-to-use user interface. Developed
                    with references from{" "}
                    <a
                        href={"https://visualgo.net/en"}
                        rel={"noopener noreferrer"}
                        target={"_blank"}
                    >
                        VisuAlgo
                    </a>{" "}
                    and{" "}
                    <a
                        href={"https://github.com/clementmihailescu/Pathfinding-Visualizer"}
                        rel={"noopener noreferrer"}
                        target={"_blank"}
                    >
                        Pathfinding-Visualizer
                    </a>{" "}
                    by{" "}
                    <a
                        href={"https://www.clementmihailescu.com"}
                        rel={"noopener noreferrer"}
                        target={"_blank"}
                    >
                        Clement Mihailescu
                    </a>
                    .
                </p>
                <p>
                    This project was crafted with <span role={"img"} aria-label={"heartbroken"}>💔</span> by{" "}
                    <a
                        href={"https://ezralazuardy.com"}
                        rel={"noopener noreferrer"}
                        target={"_blank"}
                    >
                        Ezra Lazuardy
                    </a>
                    .
                </p>
            </div>
        </div>
    </>
)

export default Dialogs
