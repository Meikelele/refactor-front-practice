
type DividerProps = {
    w?: number,
    h: number,
    borderType?: string,
    color: string
}


export default function Divider(props: DividerProps) {
    return (
        <div style={{
            width: `${props.w}%`,
            borderTop: `${props.h}em ${props.borderType} ${props.color}`
        }}></div>
    );
}