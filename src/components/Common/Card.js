import React from 'react';
import styled from '@emotion/styled';
import { radii } from 'community-connect-ui/constants';

const CardWrapper = styled('div')`
    border-radius: ${radii[1]};
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    :hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
`;

export const Card = ({ organization }) => {
    { 
        name,
        distance,
        location,
        distanceElement,
        directionUrl,
        mapUrl,
        overview,
        url,
        phone,
        facebookUrl,
        instragramUrl,
        twitterUrl
    } = organization;
    return (
        <CardWrapper>
            <h3>{ name }</h3>
        </CardWrapper>
    )
};
