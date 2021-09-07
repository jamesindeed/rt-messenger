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
      <TeamChannelListWrapper>
        <TeamChannelListMessageLoading>
          {type === "team" ? "Channels" : "Messages"} Loading...
        </TeamChannelListMessageLoading>
      </TeamChannelListWrapper>
    );
  }

  return (
    <TeamChannelListWrapper>
      <TeamChannelListHeader>
        <TeamChannelListHeaderTitle>
          {type === "team" ? "Channels" : "Direct Messages"}
        </TeamChannelListHeaderTitle>
        {/* TODO: BUTTON - ADD CHANNEL */}
      </TeamChannelListHeader>
      {children}
    </TeamChannelListWrapper>
  );
};

export default TeamChannelList;

const TeamChannelListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  p {
    color: pink;
    padding-left: 16px;
    /* font-family: Helvetica Neue, sans-serif; */
    font-size: 13px;
    line-height: 16px;
    height: 16px;
    color: rgba(255, 255, 255, 0.66);
  }
`;

const TeamChannelListMessage = styled.div`
  color: #ffffff;
  padding: 10 16px;
`;

const TeamChannelListMessageLoading = styled.div`
  height: 60px; /* 115px */
  color: #ffffff;
  padding: 10px 16px;
  /* font-family: Helvetica Neue, sans-serif; */
  font-size: 13px;
  line-height: 16px;
  color: rgba(255, 255, 255, 0.66);
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

const TeamChannelListHeaderTitle = styled.div`
  /* font-family: Helvetica Neue, sans-serif; */
  font-size: 13px;
  line-height: 16px;
  height: 16px;
  color: #fff;
  margin-bottom: 10px;
  margin-top: 10px;
`;
