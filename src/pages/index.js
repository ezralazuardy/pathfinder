import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Overlays from "../components/overlays"
import Dialogs from "../components/dialogs"
import Footer from "../components/footer"
import Graph from "../components/ui/graph"
import ActionPanel from "../components/ui/actionpanel"
import ActionInfo from "../components/ui/actioninfo"
import StatusPanel from "../components/ui/statuspanel"
import CodeTracePanel from "../components/ui/codetracepanel"

const IndexPage = () => (
    <Layout>
        <Seo />
        <Overlays />
        <Graph />
        <ActionPanel />
        <ActionInfo />
        <StatusPanel />
        <CodeTracePanel />
        <Dialogs />
        <Footer />
    </Layout>
)

export default IndexPage
