import {
    FaCheckCircle,
    FaGithubSquare,
    FaLinkedin,
    FaSpinner,
    FaTwitterSquare,
} from "react-icons/fa";
import { MdOutlineErrorOutline } from "react-icons/md";
import { GrDocumentText } from "react-icons/gr";

import styled from "styled-components";

export const ResumeIcon = styled(GrDocumentText)`
    margin: "0em 0.5em";
`;

export const GithubIcon = styled(FaGithubSquare)`
    margin: "0em 0.5em";
`;

export const LinkedInIcon = styled(FaLinkedin)`
    margin: "0em 0.5em";
`;

export const TwitterIcon = styled(FaTwitterSquare)`
    margin: "0em 0.5em";
`;

export const LoadingIcon = () => <FaSpinner className="fa-pulse" />;
export const SuccessIcon = () => <FaCheckCircle color="green" />;
export const ErrorIcon = () => <MdOutlineErrorOutline color="red" />;
