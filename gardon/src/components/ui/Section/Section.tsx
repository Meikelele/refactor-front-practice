import "./Section.scss";
import type { ReactNode } from "react"; 
import Divider from "../Divider/Divider";

type Props = {
    children?: ReactNode,
    title?: string
}

export default function Section({children, title}: Props) {
    return(
        <div className="section">
            <div className="section__header">
                <h1>{title ? title : '<your_title_here>'}</h1>
            </div>
            <Divider w={90} h={0.12} borderType="solid" color="gray"/>
            <div style={{marginBottom: `0.8rem`}} />
            {children}
        </div>
    )    
}