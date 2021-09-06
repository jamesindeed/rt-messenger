import React from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import styled from "styled-components";

import { ChannelContainer, ChannelListContainer, Auth } from "./components";

//Global Styles
import "./App.css";

const cookies = new Cookies();
// const apiKey = process.env.REACT_APP_API_KEY;
const apiKey = "ayx4bv5ktc44";

const client = StreamChat.getInstance(apiKey);

const authToken = cookies.get("token");

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
  if (!authToken) return <Auth />;

  return (
    <AppWrapper>
      <Chat client={client} theme="team light">
        <ChannelListContainer />
        <ChannelContainer />
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
