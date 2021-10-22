import React, { useState } from "react";
import styled from "styled-components";
import {
  MessageList,
  MessageInput,
  Thread,
  Window,
  useChannelActionContext,
  Avatar,
  useChannelStateContext,
  useChatContext,
} from "stream-chat-react";

import { ChannelInfo } from "../assets";

export const GiphyContext = React.createContext({});

const ChannelInner = ({ setIsEditing }) => {
  const [giphyState, setGiphyState] = useState(false);
  const { sendMessage } = useChannelActionContext();

  const overrideSubmitHandler = (message) => {
    let updatedMessage = {
      attachments: message.attachments,
      mentioned_users: message.mentioned_users,
      parent_id: message.parent?.id,
      parent: message.parent,
      text: message.text,
    };

    if (giphyState) {
      updatedMessage = { ...updatedMessage, text: `/giphy ${message.text}` };
    }

    if (sendMessage) {
      sendMessage(updatedMessage);
      setGiphyState(false);
    }
  };

  return (
    <GiphyContext.Provider value={{ giphyState, setGiphyState }}>
      <div style={{ display: "flex", width: "100%" }}>
        <Window>
          <TeamChannelHeader setIsEditing={setIsEditing} />
          <MessageList />
          <MessageInput overrideSubmitHandler={overrideSubmitHandler} />
        </Window>
        <Thread />
      </div>
    </GiphyContext.Provider>
  );
};

const TeamChannelHeader = ({ setIsEditing }) => {
  const { channel, watcher_count } = useChannelStateContext();
  const { client } = useChatContext();

  const MessagingHeader = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );

    const additionalMembers = members.length - 3;

    if (channel.type === "messaging") {
      return (
        <TeamChannelHeaderNameWrapper>
          {members.map(({ user }, i) => (
            <TeamChannelHeaderNameMulti key={i}>
              <Avatar
                image={user.image}
                name={user.fullName || user.id}
                size={32}
              />
              <p>{user.fullName || user.id}</p>
            </TeamChannelHeaderNameMulti>
          ))}

          {additionalMembers > 0 && <p>and {additionalMembers} more</p>}
        </TeamChannelHeaderNameWrapper>
      );
    }

    return (
      <TeamChannelHeaderChannelWrapper>
        <p># {channel.data.name}</p>
        <span style={{ display: "flex" }} onClick={() => setIsEditing(true)}>
          <ChannelInfo />
        </span>
      </TeamChannelHeaderChannelWrapper>
    );
  };

  const getWatcherText = (watchers) => {
    if (!watchers) return "No users online";
    if (watchers === 1) return "1 user online";
    return `${watchers} users online`;
  };

  return (
    <TeamChannelHeaderContainer>
      <MessagingHeader />
      <TeamChannelHeaderRight>
        <TeamChannelHeaderRightText>
          {getWatcherText(watcher_count)}
        </TeamChannelHeaderRightText>
      </TeamChannelHeaderRight>
    </TeamChannelHeaderContainer>
  );
};

export default ChannelInner;

const TeamChannelHeaderNameWrapper = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  overflow-x: auto;
  max-width: 500px;
  white-space: nowrap;
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media screen and (min-width: 1070px) {
    max-width: 700px;
  }

  :webkit-scrollbar {
    display: none;
  }

  p {
    font-weight: 500;
    font-size: 14px;
  }
`;

const TeamChannelHeaderNameMulti = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;

  :nth-child(3) {
    margin-right: 0px;
  }

  p {
    font-weight: 500;
    font-size: 14px;
  }
`;

const TeamChannelHeaderChannelWrapper = styled.div`
  display: flex;
  align-items: center;

  svg {
    cursor: pointer;
  }

  p {
    font-weight: bold;
    font-size: 18px;
    color: #2c2c30;
    margin-right: 8px;
  }
`;

const TeamChannelHeaderContainer = styled.div`
  position: relative;
  height: 62px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background: #ffffff;
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.1);
  border-top-right-radius: 16px;
  z-index: 1;
`;

const TeamChannelHeaderRight = styled.div`
  flex: 0.55;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-align: right;

  svg {
    margin-left: 16px;
    margin-right: 4px;
  }
`;

const TeamChannelHeaderRightText = styled.p`
  font-size: 14px;
  color: #858688;
`;
