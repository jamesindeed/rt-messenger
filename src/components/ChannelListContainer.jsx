import React, { useState } from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import styled from 'styled-components';
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';
import Cookies from 'universal-cookie';
import { BiMessageRoundedMinus, BiLogOutCircle } from 'react-icons/bi';

const cookies = new Cookies();

const SiderBar = ({ logout }) => (
  <ChannelListSideBar>
    <ChannelListSideBarIcon>
      <IconInner>
        <BiMessageRoundedMinus size={25} alt='Message' />
      </IconInner>
    </ChannelListSideBarIcon>
    <ChannelListSideBarIcon>
      <IconInner onClick={logout}>
        <BiLogOutCircle size={25} alt='Logout' />
      </IconInner>
    </ChannelListSideBarIcon>
  </ChannelListSideBar>
);

const CompanyHeader = () => (
  <ChannelListHeader>
    <ChannelListHeaderText>Messenger</ChannelListHeaderText>
  </ChannelListHeader>
);

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'team');
};

const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'messaging');
};

const ChannelListContent = ({
  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
  setToggleContainer,
}) => {
  const { client } = useChatContext();

  const logout = () => {
    cookies.remove('token');
    cookies.remove('userId');
    cookies.remove('username');
    cookies.remove('fullName');
    cookies.remove('avatarURL');
    cookies.remove('hashedPassword');
    cookies.remove('phoneNumber');

    window.location.reload();
  };

  const filters = { members: { $in: [client.userID] } };

  return (
    <>
      <SiderBar logout={logout} />
      <ChannelListListWrapper>
        <CompanyHeader />
        <ChannelSearch />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type='team'
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type='team'
            />
          )}
        />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type='messaging'
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type='messaging'
            />
          )}
        />
      </ChannelListListWrapper>
    </>
  );
};

const ChannelListContainer = ({
  setCreateType,
  setIsCreating,
  setIsEditing,
}) => {
  const [toggleContainer, setToggleContainer] = useState(false);

  return (
    <>
      <ChannelListWrapper>
        <ChannelListContent
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
      </ChannelListWrapper>

      <ChannelListWrapperResponsive
        style={{
          left: toggleContainer ? '0%' : '-89%',
          backgroundColor: '#2d2d2d',
        }}
      >
        <ChannelListWrapperToggle
          onClick={() =>
            setToggleContainer((prevToggleContainer) => !prevToggleContainer)
          }
        ></ChannelListWrapperToggle>
        <ChannelListContent
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          setToggleContainer={setToggleContainer}
        />
      </ChannelListWrapperResponsive>
    </>
  );
};

export default ChannelListContainer;

// SideBar
const ChannelListSideBar = styled.div`
  width: 72px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    var(--primary-color-alpha);
  box-shadow: 1px 0px 0px rgba(0, 0, 0, 0.25);

  @media screen and (max-width: 320px) {
    display: none;
  }
`;

const ChannelListSideBarIcon = styled.div`
  width: 40px;
  height: 40px;
  margin: 15px auto;
  background: linear-gradient(
      150.64deg,
      rgba(0, 0, 0, 0.1) 12.73%,
      rgba(0, 0, 0, 0) 89.32%
    ),
    #ffffff;
  border-radius: 50px;
  box-shadow: 0px 4px 8px rgba(1, 0, 0, 0.13);
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
  background: var(--primary-color-alpha);
  width: 240px;

  /* @media screen and (max-width: 960px) {
    width: 100%;
  } */
`;

const ChannelListWrapper = styled.div`
  display: flex;
  /* height: 800px; */
  height: 100%;
  box-shadow: inset 1px 0px 0px rgba(0, 0, 0, 0.1);
`;

const ChannelListWrapperResponsive = styled.div`
  display: none;
  height: 100%;
  box-shadow: inset 1px 0px 0px rgba(0, 0, 0, 0.1);
  position: absolute;
  width: 90%;
  top: 0%;
  z-index: 5;
  transition: 0.8s ease;
`;

const ChannelListWrapperToggle = styled.div`
  display: none;
  height: 50px;
  width: 50px;
  background: #2d2d2d;
  position: absolute;
  right: -2%;
  top: 50%;
  border-radius: 50%;
  z-index: 2;
`;
