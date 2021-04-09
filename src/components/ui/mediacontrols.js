import * as React from "react"

const MediaControls = () => (
    <>
        <div id="media-controls" className="unselectable" unselectable="on">
            <div id="speed-control">
                slow
                <div
                    id="speed-input"
                    className="ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"
                >
                    <span
                        id="speed-input-handle"
                        tabIndex="0"
                        className="ui-slider-handle ui-corner-all ui-state-default"
                    ></span>
                </div>
                fast
            </div>
            <span
                id="go-to-beginning"
                className="media-control-button"
                title="go to beginning"
            >
                <img
                    src="./goToBeginning.png"
                    alt="go to beginning"
                />
            </span>
            <span
                id="previous"
                className="media-control-button"
                title="step backward"
            >
                <img src="./prevFrame.png" alt="previous frame" />
            </span>
            <span
                id="pause"
                className="media-control-button"
                title="pause"
            >
                <img src="./pause.png" alt="pause" />
            </span>
            <span
                id="play"
                className="media-control-button"
                title="play"
            >
                <img
                    src="./replay.png"
                    alt="replay"
                    title="replay"
                />
            </span>
            <span
                id="next"
                className="media-control-button"
                title="step forward"
            >
                <img src="./nextFrame.png" alt="next frame" />
            </span>
            <span
                id="go-to-end"
                className="media-control-button"
                title="go to end"
            >
                <img src="./goToEnd.png" alt="go to end" />
            </span>
            <div
                id="progress-bar"
                className="media-control-button ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"
            >
                <div className="ui-slider-range ui-corner-all ui-widget-header ui-slider-range-min"></div>
                <span
                    id="progress-bar-handle"
                    tabIndex="0"
                    className="ui-slider-handle ui-corner-all ui-state-default"
                ></span>
            </div>
        </div>
    </>
)

export default MediaControls
