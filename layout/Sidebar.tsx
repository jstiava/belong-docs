import { Typography } from "@mui/material";
import { headerHeight } from "./AuthProvider";
import FileExplorer from "@/components/TreeView";
import { DIVIDER_NO_ALPHA_COLOR } from "@/components/Divider";



export const SIDEBAR_WIDTH = "20rem";
export default function Sidebar() {

    return (

        <div style={{
            width: SIDEBAR_WIDTH,
            padding: "1rem",
            // backgroundColor: "#e6e6e6",
            height: `calc(100vh - ${headerHeight})`,
            position: "sticky",
            top: headerHeight,
            borderRight: `0.1rem solid ${DIVIDER_NO_ALPHA_COLOR}`
        }}>
            <FileExplorer />
        </div>
    )
}