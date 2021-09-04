import React, { useState, useEffect } from "react";
import { useChatContext } from "stream-chat-react";
import styled from "styled-components";

import { SearchIcon } from "../assets";

const ChannelSearch = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const getChannels = async () => {
    try {
      //   TODO: Fetch Channels
    } catch (error) {
      setQuery("");
    }
  };

  const onSearch = (e) => {
    e.preventDefault();

    setLoading(true);
    setQuery(e.target.value);
    getChannels(e.target.value);
  };

  return (
    <ChannelSearchContainer>
      <ChannelSearchInputWrapper>
        <ChannelSearchInputIcon>
          <SearchIcon />
        </ChannelSearchInputIcon>
        <ChannelSearchInputText
          placeholder="Search"
          type="text"
          value={query}
          onChange={onSearch}
        ></ChannelSearchInputText>
      </ChannelSearchInputWrapper>
    </ChannelSearchContainer>
  );
};

export default ChannelSearch;

const ChannelSearchContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #00000033;
`;

const ChannelSearchInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  margin-bottom: 8px;
  border: 1px solid transparent;
  width: 90%;
  justify-content: flex-start;

  :hover {
    border: 1px solid #fff;
  }
`;

const ChannelSearchInputIcon = styled.div`
  width: 32px;
  display: flex;
  justify-content: center;
`;

const ChannelSearchInputText = styled.input`
  background: none;
  border: none;
  color: #fff;
  font-family: Helvetica Neue, sans-serif;
  font-size: 16px;
  outline: none;
`;
