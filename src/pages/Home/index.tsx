import React from "react";
import {
    GithubIcon,
    LinkedInIcon,
    ResumeIcon,
    TwitterIcon,
} from "../../components/Icons";
import { SocialButton } from "../../components/SocialButton";

const introduction = "Hi, my name is Cody!";
const tags = ["Technophile", "Mentor", "Woodcrafter", "Software Developer"];
const socialButtons = [
    {
        name: "linkedin",
        icon: <LinkedInIcon color="#0073b1" />,
        url: "https://www.linkedin.com/in/cody-heffner/",
        enabled: true,
    },
    {
        name: "github",
        icon: <GithubIcon color="black" />,
        url: "https://www.github.com/chodyo",
        enabled: true,
    },
    {
        name: "twitter",
        icon: <TwitterIcon color="#1da1f2" />,
        url: "https://www.twitter.com/cnheffner",
        enabled: true,
    },
    {
        name: "resume",
        icon: <ResumeIcon color="#3e94e4" />,
        url: "https://www.visualcv.com/cody-heffner",
        enabled: false, // visual CV now requires a paid subscription to view resumes
    },
];

export const Page: React.FC = () => {
    document.title = "Cody H";

    const delayStart = 0.5;
    const delayInterval = JSON.parse(localStorage.getItem("visited") || "false")
        ? 0.1
        : 0.4;
    localStorage.setItem("visited", JSON.stringify(true));

    const allElementsStyle = {
        animation: "fadein 1s",
        animationFillMode: "both",
        display: "inline-block",
    };

    return (
        <>
            <h1
                style={{
                    ...allElementsStyle,
                    animationDelay: delayStart + "s",
                    fontSize: "3.2em",
                    fontWeight: "800",
                    marginBottom: "1em",
                }}
            >
                {introduction}
            </h1>

            <div
                style={{
                    fontSize: "1.25em",
                    fontWeight: "300",
                    marginBottom: "1em",
                }}
            >
                {tags.map((tag, i) => {
                    const animationDelay =
                        delayStart + delayInterval * (i + 1) + "s";
                    return (
                        <p
                            style={{
                                ...allElementsStyle,
                                animationDelay: animationDelay,
                                margin: "0em 0.5em",
                            }}
                        >
                            {tag}
                        </p>
                    );
                })}
            </div>

            <div style={{ fontSize: "3em" }}>
                {socialButtons.map((social, i) => {
                    const animationDelay =
                        delayStart +
                        delayInterval * (tags.length + i + 1) +
                        "s";

                    return (
                        <SocialButton
                            style={{
                                ...allElementsStyle,
                                animationDelay: animationDelay,
                                display: social.enabled
                                    ? "inline-block"
                                    : "none",
                                margin: "0em 0.15em",
                            }}
                            link={social.url}
                            icon={social.icon}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default Page;
