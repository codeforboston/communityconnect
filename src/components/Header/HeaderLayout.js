import styled from "@emotion/styled";
import { colors, radii, spacing, fontSizes } from "@community-connect-ui/constants";

export const Input = styled("input")`
    border-radius: ${radii[0]};
    border: 1px solid ${colors.lightgray};
    padding-left: ${spacing[0]};
    font-size: ${fontSizes[1]};
`;
