import styled from "@emotion/styled";
import { colors, spacing, fontSizes } from "../../@community-connect-ui/constants";

export const Input = styled("input")`
    border-radius: 4px;
    border: 1px solid ${colors.gray};
    padding-left: ${spacing[0]};
    font-size: ${fontSizes[1]};
`;
