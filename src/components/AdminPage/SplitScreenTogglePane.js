import React from "react";
import styled from "@emotion/styled";

const TogglePane = styled("div")`
    display: ${props => props.isOpen ? "block" : "none"};
    position: absolute;
    height: 100%;
    width: 33%;
    border: 0;
    top: 60px;
    right:0;
    background-color: white;
    border-radius: 4px 4px 0 0;
    margin-left: -50px;
    font-size: 1.4rem;
    @media (max-width: 768px) {
        width: 50%;
    }
`;

export const SplitScreenTogglePane = ({ isOpen, children }) => (
    <TogglePane isOpen={isOpen}>
        { children }
    </TogglePane>
);
