import React from "react";
import { BrowserRouter, Route, Routes,} from "react-router-dom";
import LoginRoute from "./LoginRoute";
import UserRoute from "./UserRoute";
import {
  ChatScreen,
  HandleLikeScreen,
  HomeScreen,
  LikesScreen,
  ProfileScreen,
  SendLikeScreen,
  BasicInfo,
  BirthScreen,
  DatingType,
  EmailScreen,
  GenderScreen,
  HomeTownScreen,
  LocationScreen,
  MainScreen,
  LookingFor,
  AdminScreen,
  PasswordScreen,
  PhotoScreen,
  PreFinalScreen,
  PromptsScreen,
  ShowPromptsScreen,
  TypeScreen,
  ChatRoom,
  LiveStream,
} from "../screens/index";

const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginRoute />}>
          <Route path="" element={<MainScreen />} />
          {/* <Route path="login" element={<LoginScreen />} /> */}
          <Route path="basic" element={<BasicInfo />} />
          <Route path="birth" element={<BirthScreen />} />
          <Route path="dating" element={<DatingType />} />
          <Route path="email" element={<EmailScreen />} />
          <Route path="gender" element={<GenderScreen />} />
          <Route path="hometown" element={<HomeTownScreen />} />
          <Route path="location" element={<LocationScreen />} />
          <Route path="looking-for" element={<LookingFor />} />
          <Route path="admin" element={<AdminScreen />} />
          <Route path="password" element={<PasswordScreen />} />
          <Route path="photo" element={<PhotoScreen />} />
          <Route path="pre-final" element={<PreFinalScreen />} />
          <Route path="prompts" element={<PromptsScreen />} />
          <Route path="show-prompts" element={<ShowPromptsScreen />} />
          <Route path="type" element={<TypeScreen />} />
          <Route path="LiveStream" element={<LiveStream />} />
        </Route>
        <Route path="/login" element={<LoginRoute />} />
        <Route path="/user" element={<UserRoute />}>
          <Route path="" element={<HomeScreen />} />
          <Route path="chat" element={<ChatScreen />} />
          <Route path="handle-like" element={<HandleLikeScreen />} />
          {/* <Route path="home" element={<HomeScreen />} /> */}
          <Route path="likes" element={<LikesScreen />} />
          <Route path="profile" element={<ProfileScreen />} />
          <Route path="send-like" element={<SendLikeScreen />} />
          <Route path="chat-room" element={<ChatRoom />} />
          

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
