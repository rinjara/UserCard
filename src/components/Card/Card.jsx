import React, { useEffect, useState } from 'react';
import {
  Avatar,
  AvatarWrapper,
  BackImg,
  HiddenTitle,
  Line,
  List,
  StyledButton,
  TweetCard,
  UserInfo,
} from './Card.styled';
import logo from '../../images/logo.png';
import avatar from '../../images/Hansel.png';
import { load, save } from '../../services/storage';

// load('stats').following ||
//   load('stats').followers ||

const Card = () => {
  const [following, setFollowing] = useState(loadFollowing());
  const [followers, setFollowers] = useState(loadFollowers());

  useEffect(() => {
    save('stats', { following, followers });
  }, [followers, following]);

  function loadFollowing() {
    const storedStats = load('stats');
    if (!storedStats) {
      return false;
    }
    return storedStats.following;
  }

  function loadFollowers() {
    const storedStats = load('stats');
    if (!storedStats) {
      return 100500;
    }
    return storedStats.followers;
  }

  const handleFollow = () => {
    if (following) {
      setFollowing(false);
      setFollowers(followers - 1);
    } else {
      setFollowing(true);
      setFollowers(followers + 1);
    }
  };

  return (
    <TweetCard>
      <BackImg>
        <img src={logo} alt="logo" />
      </BackImg>
      <UserInfo>
        <Line>
          <AvatarWrapper>
            <Avatar src={avatar} alt="avatar" />
          </AvatarWrapper>
        </Line>
        <HiddenTitle>Username</HiddenTitle>
        <List>
          <li>{777} tweets</li>
          <li>{followers.toLocaleString()} followers</li>
        </List>
        <StyledButton
          type="button"
          onClick={handleFollow}
          following={following}
        >
          {following ? 'Following' : 'Follow'}
        </StyledButton>
      </UserInfo>
    </TweetCard>
  );
};

export default Card;
