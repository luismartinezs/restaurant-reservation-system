/**
 * asManager = show content only to manager
 * asUser = show content only to user
 * asLoggedIn = show content to logged in users, same as asUser and asManager
 * asGuest = show content to guests only
 * No "public" prop is required, as then you shouldn't use this wrapper at all
 * If no props are provided, the wrapper does nothing (public content)
 */

import React from "react";

interface IOnlyUserAsProps {
  children?: React.ReactNode;
  asManager?: boolean;
  asUser?: boolean;
  asLoggedIn?: boolean;
  asGuest?: boolean;
}

const OnlyUserAs = ({ children, ...rest }: IOnlyUserAsProps) => {
  const { asGuest, asLoggedIn, asUser, asManager } = rest;
  // const { userData } = useUserData();
  // let isManager = false;

  // if (userData) {
  //   isManager = !!userData.isManager;
  // }

  // const isGuest = !userData;
  // const isLoggedIn = !!userData;
  // const isUser = !!userData && !isManager;

  // // if all are undefined, show public content
  // let show = Object.values(rest).every((prop) => typeof prop === 'undefined');

  // if (isGuest && asGuest) {
  //   show = true;
  // }

  // if (isLoggedIn && asLoggedIn) {
  //   show = true;
  // }

  // if (isUser && asUser) {
  //   show = true;
  // }

  // if (isManager && asManager) {
  //   show = true;
  // }

  // return show ? <>{children}</> : <></>;
};

export default OnlyUserAs;
