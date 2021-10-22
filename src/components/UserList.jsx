import React, { useEffect, useState } from "react";
import { Avatar, useChatContext } from "stream-chat-react";
import styled from "styled-components";

import { InviteIcon } from "../assets";

const ListContainer = ({ children }) => {
  return (
    <UserListContainer>
      <UserListHeader>
        <p>User</p>
        <p>Invite</p>
      </UserListHeader>
      {children}
    </UserListContainer>
  );
};

const UserItem = ({ user, setSelectedUsers }) => {
  const [selected, setSelected] = useState(false);

  const handleSelect = () => {
    if (selected) {
      setSelectedUsers((prevUsers) =>
        prevUsers.filter((prevUser) => prevUser !== user.id)
      );
    } else {
      setSelectedUsers((prevUsers) => [...prevUsers, user.id]);
    }

    setSelected((prevSelected) => !prevSelected);
  };

  return (
    <UserItemWrapper onClick={handleSelect}>
      <UserItemNameWrapper>
        <Avatar image={user.image} name={user.fullName || user.id} size={32} />
        <p className="user-item__name">{user.fullName || user.id}</p>
      </UserItemNameWrapper>
      {selected ? <InviteIcon /> : <UserItemEmptyInvite />}
    </UserItemWrapper>
  );
};

const UserList = ({ setSelectedUsers }) => {
  const { client } = useChatContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listEmpty, setListEmpty] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      if (loading) return;

      setLoading(true);

      try {
        const response = await client.queryUsers(
          { id: { $ne: client.userID } },
          { id: 1 },
          { limit: 8 }
        );

        if (response.users.length) {
          setUsers(response.users);
        } else {
          setListEmpty(true);
        }
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };

    if (client) getUsers();
  }, []);

  if (error) {
    return (
      <ListContainer>
        <UserListMessage>
          Error loading, please refresh and try again.
        </UserListMessage>
      </ListContainer>
    );
  }

  if (listEmpty) {
    return (
      <ListContainer>
        <UserListMessage>No users found.</UserListMessage>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      {loading ? (
        <UserListMessage>Loading users...</UserListMessage>
      ) : (
        users?.map((user, i) => (
          <UserItem
            index={i}
            key={user.id}
            user={user}
            setSelectedUsers={setSelectedUsers}
          />
        ))
      )}
    </ListContainer>
  );
};

export default UserList;

const UserListContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const UserListHeader = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 20px;
  justify-content: space-between;

  p {
    font-family: Helvetica Neue, sans-serif;
    font-size: 14px;
    line-height: 17px;
    color: #858688;
    margin-top: 16px;
  }
  p:first-child {
    flex: 2;
  }
  p:nth-child(2) {
    flex: 0.5;
    text-align: right;
    margin: 0px 20px;
  }
`;
const UserListMessage = styled.div`
  font-family: Helvetica Neue, sans-serif;
  font-size: 16px;
  color: #2c2c30;
  margin: 20px;
`;

const UserItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 20px;
  justify-content: space-between;

  p {
    font-family: Helvetica Neue, sans-serif;
    font-size: 14px;
    line-height: 17px;
    color: #2c2c30;
    word-break: break-all;
  }

  :hover {
    background: #f7f6f8;
    cursor: pointer;
  }
`;

const UserItemNameWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 2;
  text-align: left;

  p {
    font-weight: 500;
  }
`;

const UserItemEmptyInvite = styled.div`
  height: 28px;
  width: 28px;
  background: #f7f6f8;
  border: 1px solid #dedddf;
  border-radius: 14px;
  box-sizing: border-box;
  margin-left: 2px;
`;
