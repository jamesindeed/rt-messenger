import React from "react";
import styled from "styled-components";
import { Channel, MessageTeam } from "stream-chat-react";

import { ChannelInner, CreateChannel, EditChannel } from "./";

const ChannelContainer = ({
  createType,
  isCreating,
  isEditing,
  setIsCreating,
  setIsEditing,
}) => {
  // const { channel } = useChatContext();

  if (isCreating) {
    return (
      <ChannelContainerWrapper>
        <CreateChannel createType={createType} setIsCreating={setIsCreating} />
      </ChannelContainerWrapper>
    );
  }

  if (isEditing) {
    return (
      <ChannelContainerWrapper>
        <EditChannel setIsEditing={setIsEditing} />
      </ChannelContainerWrapper>
    );
  }

  const EmptyState = () => {
    return (
      <ChannelEmptyContainer>
        <p>This is the beginning of your chat history.</p>
        <p>Send messages, attachments, links, emojis, and more!</p>
      </ChannelEmptyContainer>
    );
  };

  return (
    <ChannelContainerWrapper>
      <Channel
        EmptyStateIndicator={EmptyState}
        Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
      >
        <ChannelInner setIsEditing={setIsEditing} />
      </Channel>
    </ChannelContainerWrapper>
  );
};

export default ChannelContainer;

const ChannelContainerWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const ChannelEmptyContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-end;
  margin-left: 20px;
  margin-right: 20px;
  padding-bottom: 20px;

  p:first-child {
    font-weight: bold;
    font-size: 18px;
    line-height: 120%;
    color: #2c2c30;
    margin-bottom: 10px;
  }

  p:nth-child(2) {
    font-size: 14px;
    line-height: 120%;
    margin: 0;
    color: #858688;
  }
`;
