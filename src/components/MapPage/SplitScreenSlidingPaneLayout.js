import styled from '@emotion/styled';
import {colors, radii} from '../../community-connect-ui/Constants';

export const SlidingPaneToggle = styled('button')`
    display: none;
    position: absolute;
    height: 40px;
    width: 100px;
    border: 0;
    top: -40px;
    left: 50%;
    background-color: ${colors.transparentWhite};
    border-radius: ${radii[0]} ${radii[0]} 0 0;
    margin-left: -50px;
    font-size: 1.4rem; 
    @media (max-width: 768px) {
        display: block;
        text-align: center;
    }
`;

export const SlidingPaneWrapper = styled('div')`
    position: absolute;
    top: 0;
    right: 70%;
    bottom: 0;
    left: 0;
    padding: 10px;
    transition: bottom 0.3s ease-in-out;
    @media screen and (max-width: 768px) {
        background-color: ${colors.transparentWhite};
        bottom: -64%;
        right: 0;
        z-index: 10;
        height: ${(props) => props.open ? 'calc(100% - 40px)' : 'calc(70%)'};
        top: ${(props) => props.open ? '60px' : 'auto'};
        bottom: ${(props) => props.open ? '0' : '-64%'};
    }
`;
