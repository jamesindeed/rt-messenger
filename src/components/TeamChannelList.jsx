import React from "react";
import styled from "styled-components";
import { AddChannel } from "../assets";

const TeamChannelList = ({ children, error = false, loading, type }) => {
  if (error) {
    return type === "team" ? (
      <TeamChannelListWrapper>
        <TeamChannelListMessage>
          Connection Error, please wait and try again.
        </TeamChannelListMessage>
      </TeamChannelListWrapper>
    ) : null;
  }

  if (loading) {
    return (
      <TeamChannelList>
        <TeamChannelListMessageLoading>
          {type === "team" ? "Channels" : "Messages"} Loading...
        </TeamChannelListMessageLoading>
      </TeamChannelList>
    );
  }

  return (
    <TeamChannelList>
      <TeamChannelListHeader>
        <TeamChannelListHeaderTitle>
          {type === "team" ? "Channels" : "Direct Messages"} Loading...
        </TeamChannelListHeaderTitle>
        {/* TODO: BUTTON - ADD CHANNEL */}
      </TeamChannelListHeader>
      {children}
    </TeamChannelList>
  );
};

export default TeamChannelList;

const TeamChannelListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TeamChannelListMessage = styled.p`
  color: #ffffff;
  padding: 0 16px;
`;

const TeamChannelListMessageLoading = styled.p`
  height: 115px;
`;

const TeamChannelListHeader = styled.div`
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    cursor: pointer;
  }
`;

const TeamChannelListHeaderTitle = styled.p`
  font-family: Helvetica Neue, sans-serif;
  font-size: 13px;
  line-height: 16px;
  height: 16px;
  color: rgba(255, 255, 255, 0.66);
  margin-bottom: 10px;
`;
