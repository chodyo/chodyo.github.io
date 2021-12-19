import CSS from "csstype";

export const SocialButton: React.FC<{
    icon: JSX.Element;
    link: string;
    style: CSS.Properties;
}> = (props) => {
    return (
        <a
            href={props.link}
            target="_blank"
            rel="noreferrer"
            style={props.style}
        >
            {props.icon}
        </a>
    );
};
