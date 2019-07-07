import styled from '@emotion/styled';
import {
  colors,
  fontSizes,
  fontWeights,
  radii,
  spacing,
} from '../../community-connect-ui/Constants';

export const OrganizationCardWrapper = styled('div')`
  border-radius: ${radii[0]};
  box-shadow: 0 4px 8px 0 ${colors.shadowBlack};
  transition: 0.3s;
  width: 100%;
  &:hover {
    box-shadow: 0 8px 16px 0 ${colors.shadowBlack};
  }
`;

export const OrganizationCardHeader = styled('div')`
  padding: 15px;
  background-color: ${colors.lightgray};
  text-align: center;
  overflow: hidden;
  border-radius: ${radii[0]} ${radii[0]} 0 0;
`;

export const OrganizationCardHeaderText = styled('h3')`
  font-size: ${fontSizes[2]};
  font-weight: ${fontWeights.bold};
  letter-spacing: 2px;
`;

export const OrganizationCardBodyWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  padding: ${spacing[1]};
  line-height: 1.5;
  a {
    color: ${colors.lightBlack};
    :hover {
      color: ${colors.blue};
    }
  }
`;

export const OrganizationCardSubtitle = styled('div')`
  font-size: ${fontSizes[1]};
  font-weight: ${fontWeights.bold};
  letter-spacing: 1.5px;
  line-height: ${fontSizes[2]};
  text-transform: uppercase;
  color: ${colors.black};
`;

export const OrganizationSocialMediaLinkWrapper = styled('a')`
  margin: ${spacing[1]};
  color: ${colors.gray};
  &:hover {
    color: ${colors.blue};
  }
`;
