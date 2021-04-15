import * as React from "react"

const ActionPanel = () => (
    <>
        <div id={"actions"} className={"panel"}>
            <p
                id={"draw"}
                className={"execAction unselectable"}
                unselectable={"on"}
            >
                Draw Custom Graph
            </p>
            <p
                id={"examples"}
                className={"execAction unselectable"}
                unselectable={"on"}
            >
                Graphs Example
            </p>
            <p
                id={"kruskals"}
                className={"execAction unselectable"}
                unselectable={"on"}
            >
                Kruskal's Algorithm
            </p>
            <p id={"prims"} className={"execAction unselectable"} unselectable={"on"}>
                Prim's Algorithm
            </p>
        </div>
        <div id={"actions-hide"} className={"panel-hide"}>
            <img
                src={"./img/arrow_white_right.webp"}
                alt={"&gt;"}
                title={"show/hide actions panel"}
                className={"rotateRight unselectable"}
                unselectable={"on"}
            />
        </div>
        <div id={"actions-extras"}>
            <div className={"draw action-menu-pullout"}>
                <div id={"draw-err"} className={"err"} />
            </div>
            <div className={"examples action-menu-pullout"}>
                <div
                    id={"example1"}
                    className={"execAction new-menu-option coloured-menu-option"}
                >
                    <p className={"unselectable"} unselectable={"on"}>
                        CP 4.10
                    </p>
                </div>
                <div
                    id={"example2"}
                    className={"execAction new-menu-option coloured-menu-option"}
                >
                    <p className={"unselectable"} unselectable={"on"}>
                        CP 4.14
                    </p>
                </div>
                <div
                    id={"example3"}
                    className={"execAction new-menu-option coloured-menu-option"}
                >
                    <p className={"unselectable"} unselectable={"on"}>
                        K5
                    </p>
                </div>
                <div
                    id={"example4"}
                    className={"execAction new-menu-option coloured-menu-option"}
                >
                    <p className={"unselectable"} unselectable={"on"}>
                        Rail
                    </p>
                </div>
                <div
                    id={"example5"}
                    className={"execAction new-menu-option coloured-menu-option"}
                >
                    <p className={"unselectable"} unselectable={"on"}>
                        Tessellation
                    </p>
                </div>
            </div>
            <div className={"kruskals action-menu-pullout"}>
                <div id={"kruskals-err"} className={"err"} />
            </div>
            <div className={"prims action-menu-pullout"}>
                <div id={"prims-input"} className={"new-menu-option"}>
                    s =
                    <input
                        type={"number"}
                        id={"prim-v"}
                        title={"Enter the source vertex"}
                        autoComplete={"off"}
                        min={"0"}
                        max={"99"}
                        defaultValue={"0"}
                    />
                </div>
                <div
                    id={"prims-go"}
                    className={"execAction coloured-menu-option"}
                >
                    <p>Go</p>
                </div>
                <div id={"prims-err"} className={"err"} />
            </div>
        </div>
        <div id={"actions-toast"} hidden>
            <p id={"message"}>
                Please stop current program to start a new graph / algorithm
            </p>
        </div>
    </>
)

export default ActionPanel
