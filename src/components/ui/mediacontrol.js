import * as React from "react"

const MediaControl = () => (
    <>
        <div id={"media-controls"} className={"unselectable"} unselectable={"on"}>
            <div id={"speed-control"}>
                slow
                <div
                    id={"speed-input"}
                    className={"ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"}
                >
                    <span id={"speed-input-handle"} className={"ui-slider-handle ui-corner-all ui-state-default"} />
                </div>
                fast
            </div>
            <span
                id={"go-to-beginning"}
                className={"media-control-button"}
                title={"go to beginning"}
            >
                <img
                    src={"./img/goToBeginning.webp"}
                    alt={"go to beginning"}
                />
            </span>
            <span
                id={"previous"}
                className={"media-control-button"}
                title={"step backward"}
            >
                <img src={"./img/prevFrame.webp"} alt={"previous frame"} />
            </span>
            <span
                id={"pause"}
                className={"media-control-button"}
                title={"pause"}
            >
                <img src={"./img/pause.webp"} alt={"pause"} />
            </span>
            <span
                id={"play"}
                className={"media-control-button"}
                title={"play"}
            >
                <img
                    src={"./img/replay.webp"}
                    alt={"replay"}
                    title={"replay"}
                />
            </span>
            <span
                id={"next"}
                className={"media-control-button"}
                title={"step forward"}
            >
                <img src={"./img/nextFrame.webp"} alt={"next frame"} />
            </span>
            <span
                id={"go-to-end"}
                className={"media-control-button"}
                title={"go to end"}
            >
                <img src={"./img/goToEnd.webp"} alt={"go to end"} />
            </span>
            <div
                id={"progress-bar"}
                className={"media-control-button ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"}
            >
                <div className={"ui-slider-range ui-corner-all ui-widget-header ui-slider-range-min"} />
                <span id={"progress-bar-handle"} className={"ui-slider-handle ui-corner-all ui-state-default"} />
            </div>
        </div>
    </>
)

export default MediaControl
