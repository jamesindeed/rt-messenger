import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import styled from 'styled-components';

import { ChannelContainer, ChannelListContainer, Auth } from './components';

//Global Styles
import './App.css';
import 'stream-chat-react/dist/css/index.css';

const cookies = new Cookies();
// const apiKey = process.env.REACT_APP_API_KEY;
const apiKey = process.env.REACT_APP_API_KEY;
const authToken = cookies.get('token');

const client = StreamChat.getInstance(apiKey);

if (authToken) {
  client.connectUser(
    {
      id: cookies.get('userId'),
      name: cookies.get('username'),
      fullName: cookies.get('fullName'),
      image: cookies.get('avatarURL'),
      hashedPassword: cookies.get('hashedPassword'),
      phoneNumber: cookies.get('phoneNumber'),
    },
    authToken
  );
}

const App = () => {
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loaded, setloaded] = useState(false);

  if (!authToken) return <Auth />;

  setTimeout(() => {
    setloaded(true);
  }, 1000);

  return (
    <>
      {loaded && (
        <NotificationWrapper>
          <Notification>Desktop only, mobile coming soon 🚧 </Notification>
        </NotificationWrapper>
      )}

      <AppWrapper>
        <Chat client={client} theme='team light'>
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

const NotificationWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
`;

const Notification = styled.div`
  text-align: center;
  background-color: #fcbb47;
  text-transform: uppercase;
  margin-top: 10px;
  padding: 8px 30px;
  border-radius: 5px;
  font-size: 1.8vmin;
  z-index: 100;
  color: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  animation: fadeIn linear 1s;
  -webkit-animation: fadeIn linear 1s;
  -moz-animation: fadeIn linear 1s;
  -o-animation: fadeIn linear 1s;
  -ms-animation: fadeIn linear 1s;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-moz-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-webkit-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-o-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-ms-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
