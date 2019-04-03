import styled from '@emotion/styled';
import { breakPoints } from "../../community-connect-ui/constants";

export const Results = styled("div")`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 50px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    width: 60%;
    @media screen and (min-width: ${breakPoints[1]}) {
        width: 100%;
    }
`;

