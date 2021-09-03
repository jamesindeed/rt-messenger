import React from "react";
import { ChannelList, useChatContext } from "stream-chat-react";

import styled from "styled-components";
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from "./";
import Cookies from "universal-cookie";
import { BiMessageRoundedMinus, BiLogOutCircle } from "react-icons/bi";

const SiderBar = () => (
  <ChannelListSideBar>
    <ChannelListSideBarIcon>
      <IconInner>
        <BiMessageRoundedMinus size={30} alt="Message" />
      </IconInner>
    </ChannelListSideBarIcon>
    <ChannelListSideBarIcon>
      <IconInner>
        <BiLogOutCircle size={30} alt="Logout" />
      </IconInner>
    </ChannelListSideBarIcon>
  </ChannelListSideBar>
);

const CompanyHeader = () => (
  <ChannelListHeader>
    <ChannelListHeaderText>Messenger</ChannelListHeaderText>
  </ChannelListHeader>
);

const ChannelListContainer = () => {
  return (
    <>
      <SiderBar />
      <ChannelListListWrapper>
        <CompanyHeader />
      </ChannelListListWrapper>
    </>
  );
};

export default ChannelListContainer;

// SideBar
const ChannelListSideBar = styled.div`
  width: 72px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    var(--primary-color);
  box-shadow: 1px 0px 0px rgba(0, 0, 0, 0.25);
`;

const ChannelListSideBarIcon = styled.div`
  width: 44px;
  height: 44px;
  margin: 14px auto;
  background: linear-gradient(
      150.64deg,
      rgba(0, 0, 0, 0.1) 12.73%,
      rgba(0, 0, 0, 0) 89.32%
    ),
    #ffffff;
  border-radius: 50px;
  /* box-shadow: 0px 4px 8px rgba(1, 0, 0, 0.33); */
  cursor: pointer;
`;

const IconInner = styled.div`
  font-family: Helvetica Neue, sans-serif;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Company Header
const ChannelListHeader = styled.div`
  padding-left: 16px;
  height: 62px;
`;

const ChannelListHeaderText = styled.p`
  font-family: Helvetica Neue, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 28px;
  color: #ffffff;
`;

const ChannelListListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--primary-color);
  width: 240px;
`;
