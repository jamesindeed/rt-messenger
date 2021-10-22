import React, { useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import styled from "styled-components";

import { ChannelContainer, ChannelListContainer, Auth } from "./components";

//Global Styles
import "./App.css";
import "stream-chat-react/dist/css/index.css";

const cookies = new Cookies();
// const apiKey = process.env.REACT_APP_API_KEY;
const apiKey = process.env.REACT_APP_API_KEY;
const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);

if (authToken) {
  client.connectUser(
    {
      id: cookies.get("userId"),
      name: cookies.get("username"),
      fullName: cookies.get("fullName"),
      image: cookies.get("avatarURL"),
      hashedPassword: cookies.get("hashedPassword"),
      phoneNumber: cookies.get("phoneNumber"),
    },
    authToken
  );
}

const App = () => {
  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if (!authToken) return <Auth />;

  return (
    <AppWrapper>
      <Chat client={client} theme="team light">
        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
        <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
        />
      </Chat>
    </AppWrapper>
  );
};

export default App;

const AppWrapper = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.33) 0px 1px 4px 0px;
`;
