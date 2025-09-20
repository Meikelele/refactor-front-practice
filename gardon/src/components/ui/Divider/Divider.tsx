
type DividerProps = {
    h: number,
    color: string
    w?: number,
    borderType?: string,
}


export default function Divider(props: DividerProps) {
    return (
        <div style={{
            width: `${props.w}%`,
            borderTop: `${props.h}em ${props.borderType} ${props.color}`,
            margin: `auto`,
        }}></div>
    );
}