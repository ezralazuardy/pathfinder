import * as React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Overlays from "../components/overlays"
import Dialogs from "../components/dialogs"
import Footer from "../components/footer"
import Graph from "../components/ui/graph"
import Actions from "../components/ui/actions"
import ActionInfo from "../components/ui/actioninfo"
import Status from "../components/ui/status"
import CodeTrace from "../components/ui/codetrace"

const IndexPage = () => (
    <Layout>
        <SEO />
        <Overlays />
        <Graph />
        <Actions />
        <ActionInfo />
        <Status />
        <CodeTrace />
        <Dialogs />
        <Footer />
    </Layout>
)

export default IndexPage
