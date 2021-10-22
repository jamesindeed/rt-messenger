import React from "react";
import { Avatar, useChatContext } from "stream-chat-react";
import styled from "styled-components";

const TeamChannelPreview = ({
  setActiveChannel,
  setIsCreating,
  setIsEditing,
  setToggleContainer,
  channel,
  type,
}) => {
  const { channel: activeChannel, client } = useChatContext();

  // console.log(channel.data.id);

  const ChannelPreview = () => {
    <ChannelPreviewItem>
      # {channel?.data?.name || channel?.data?.id}
    </ChannelPreviewItem>;
  };

  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );

    return (
      <ChannelPreviewItem>
        <Avatar
          image={members[0]?.user?.image}
          name={members[0]?.user?.fullName || members[0]?.user?.id}
          size={24}
        />
        <p>{members[0]?.user?.fullName || members[0]?.user?.id}</p>
      </ChannelPreviewItem>
    );
  };

  return (
    // <ChannelPreviewWrapper
    //   selected={channel?.id === activeChannel?.id ? true : false}
    //   onClick={() => {
    //     console.log(channel);
    //   }}
    // >
    //   {type === "team" ? <ChannelPreview /> : <DirectPreview />}
    // </ChannelPreviewWrapper>
    <>
      {channel?.id === activeChannel?.id ? (
        <ChannelPreviewWrapperSelected
          onClick={() => {
            setIsCreating(false);
            setIsEditing(false);
            setActiveChannel(channel);
            if (setToggleContainer) {
              setToggleContainer((prevState) => !prevState);
            }
          }}
        >
          {type === "team" ? <ChannelPreview /> : <DirectPreview />}
        </ChannelPreviewWrapperSelected>
      ) : (
        <ChannelPreviewWrapper
          onClick={() => {
            setIsCreating(false);
            setIsEditing(false);
            setActiveChannel(channel);
            if (setToggleContainer) {
              setToggleContainer((prevState) => !prevState);
            }
          }}
        >
          {type === "team" ? <ChannelPreview /> : <DirectPreview />}
        </ChannelPreviewWrapper>
      )}
    </>
  );
};

export default TeamChannelPreview;

const ChannelPreviewItem = styled.p`
  display: flex;
  align-items: center;
  font-family: Helvetica Neue, sans-serif;
  font-size: 14px;
  color: #ffffff;
  padding: 0px 20px;
  height: 100%;
  width: 100%;
  text-overflow: ellipsis;
  word-break: break-all;
`;

// TODO: Figure out styled component props in commented out code below
const ChannelPreviewWrapper = styled.div`
  height: 37px;
  display: flex;
  align-items: center;
  :hover {
    background: rgba(0, 0, 0, 0.2);
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    /* font-weight: bold; */
    margin-right: 16px;
    cursor: pointer;
  }
`;

const ChannelPreviewWrapperSelected = styled.div`
  height: 37px;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  font-weight: bold;
  margin-right: 16px;
  cursor: pointer;
`;

// const ChannelPreviewWrapper = styled.div`
//   height: 37px;
//   display: flex;
//   align-items: center;

//   ${(props) =>
//     props.selected &&
//     css`
//       height: auto;
//       display: flex;
//       align-items: center;
//       background: rgba(0, 0, 0, 0.2);
//       border-top-right-radius: 8px;
//       border-bottom-right-radius: 8px;
//       font-weight: bold;
//       margin-right: 16px;
//       cursor: pointer;
//       z-index: 2;
//     `}

//     :hover {
//       background: rgba(0, 0, 0, 0.2);
//       border-top-right-radius: 8px;
//       border-bottom-right-radius: 8px;
//       margin-right: 16px;
//       cursor: pointer;c
//   }
// `;
