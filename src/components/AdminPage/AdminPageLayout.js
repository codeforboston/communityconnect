import styled from '@emotion/styled';
import { breakPoints } from '../../@community-connect-ui/constants';

const AdminPageLayout = styled('div')`
    display: grid;
    grid-template-columns: auto;
    padding: 30px;
    @media screen and (min-width: ${breakPoints[0]}px) {
        grid-template-columns: 200px auto;
    }
`;

export default AdminPageLayout;
