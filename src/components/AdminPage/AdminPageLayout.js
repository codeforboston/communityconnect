import styled from '@emotion/styled';
import { breakPoints, spacing } from "../../community-connect-ui/Constants";

export const AdminPageWrapper = styled('div')`
    display: grid;
    grid-template-columns: auto;
    padding: ${spacing[2]};
    gap: ${spacing[2]};
    @media screen and (min-width: ${breakPoints[1]}) {
        grid-template-columns: 200px auto;
    }
`;

export const CardGridWrapper = styled("div")`
    display: grid;
    grid-template-rows: ${spacing[2]} auto;
`;

export const SearchAndSortWrapper = styled("div")`
    display: grid;
    grid-template-columns: auto auto;
    justify-content: space-between;
    border: 3px solid #73AD21;
`;

export const CardListWrapper = styled("div")`
    display: grid;
    grid-template-columns: auto;
    gap: ${spacing[2]};
    padding: ${spacing[2]} 0;
    @media screen and (min-width: ${breakPoints[2]}) {
        grid-template-columns: repeat(2, 1fr); 
    }
    @media screen and (min-width: ${breakPoints[3]}) {
        grid-template-columns: repeat(3, 1fr); 
    }
    @media screen and (min-width: ${breakPoints[4]}) {
        grid-template-columns: repeat(4, 1fr); 
    }
`;
