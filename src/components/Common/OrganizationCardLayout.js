import styled from "@emotion/styled";
import { colors, fontSizes, fontWeights, radii, spacing } from "../../community-connect-ui/constants";

export const Card = styled("div")`
    border-radius: ${radii[0]};
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    width: 100%;
    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
`;

export const CardHeader = styled("div")`
    padding: 15px;
    background-color: ${colors.lightgray};
    text-align: center;
    overflow: hidden;
    border-radius: ${radii[0]} ${radii[0]} 0 0;
`;

export const CardHeaderText = styled("h3")`
    font-size: ${fontSizes[2]};
    font-weight: ${fontWeights.bold};
    letter-spacing: 2px;
`;

export const CardBody = styled("div")`
    padding: ${spacing[1]};
`;

export const CardSubtitle = styled("div")`
    font-size: ${fontSizes[1]};
    font-weight: ${fontWeights.bold};
    letter-spacing: 1.5px;
    line-height: ${fontSizes[2]};
    text-transform: uppercase;
    color: ${colors.black};
`;