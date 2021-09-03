import React from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyle";

import { ChannelContainer, ChannelListContainer } from "./components";

const client = StreamChat.getInstance(process.env.API_KEY);

const App = () => {
  return (
    <>
      <GlobalStyle />
      <AppWrapper>
        <Chat client={client} theme="team light">
          <ChannelListContainer />
          <ChannelContainer />
        </Chat>
      </AppWrapper>
    </>
  );
};

export default App;

const AppWrapper = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.33) 0px 1px 4px 0px;
`;
