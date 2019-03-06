import styled from '@emotion/styled';
import { breakPoints, spacing } from "../../@community-connect-ui/constants";

export const AdminPageWrapper = styled('div')`
    display: grid;
    grid-template-columns: auto;
    padding: 30px;
    @media screen and (min-width: ${breakPoints[0]}) {
        grid-template-columns: 200px auto;
    }
`;

export const CardGridWrapper = styled("div")`
    display: grid;
    grid-template-rows: auto auto;
`;

export const SearchAndSortWrapper = styled("div")`
    display: grid;
    grid-template-columns: auto auto;
    justify-content: space-between;
`;

export const CardListWrapper = styled("div")`
    display: grid;
    grid-template-columns: auto;
    gap: ${spacing[2]};
    @media screen and (min-width: ${breakPoints[2]}) {
        grid-template-columns: auto auto; 
    }
`;
