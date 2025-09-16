import { Box } from "@mantine/core";
import "./Section.scss";
import type { ReactNode } from "react"; 

type Props = {
    children?: ReactNode
}

export default function Section({children}: Props) {
    return(
        <Box className="section">
            {children}
        </Box>
    )    
}