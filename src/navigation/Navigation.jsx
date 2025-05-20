// Navigation.jsx
import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import {
  Contact,
  StreamForm,
  ProgramScreen,
  TeenScreen,
  FoundationSchoolScreen,
  StreamList,
  GiveScreen,
  MainScreen,
  StreamPreview,
  AdminScreen,
  Children,
  StripeScreen,
  LiveStreamView,
  CommentSection,
  LiveStream,
  LiveStreamComment,
  TestifyScreen,
  BootCamp,
  Admin,
} from "../screens/index";

const Navigation = () => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<MainScreen />} />
      <Route path="contact" element={<Contact />} />
      <Route path="streamForm" element={<StreamForm />} />
      <Route path="Programs" element={<ProgramScreen />} />
      <Route path="teens" element={<TeenScreen />} />
      <Route path="foundationSchool" element={<FoundationSchoolScreen />} />
      <Route path="StreamList" element={<StreamList />} />
      <Route path="give" element={<GiveScreen />} />
      <Route path="StreamPreview" element={<StreamPreview />} />
      <Route path="admin" element={<AdminScreen />} />
      <Route path="children" element={<Children />} />
      <Route path="stripe" element={<StripeScreen />} />
      <Route path="LiveStreamView" element={<LiveStreamView />} />
      <Route path="commentSection" element={<CommentSection />} />
      <Route path="LiveStreamComment" element={<LiveStreamComment />} />
      <Route path="LiveStream" element={<LiveStream />} />
      <Route path="TestifyScreen" element={<TestifyScreen />} />
      <Route path="BootCamp" element={<BootCamp />} />
      <Route path="Admin" element={<Admin />} />


    </Routes>
  );
};

export default Navigation;



// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import {
//   Contact,
//   StreamForm,
//   ProgramScreen,
//   TeenScreen,
//   FoundationSchoolScreen,
//   StreamList,
//   GiveScreen,
//   MainScreen,
//   StreamPreview,
//   AdminScreen,
//   Children,
//   StripeScreen,
//   LiveStreamView,
//   CommentSection,
//   LiveStream,
//   LiveStreamComment,
//   TestifyScreen,
// } from "../screens/index";

// const Navigation = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<MainScreen />} />
//       <Route path="contact" element={<Contact />} />
//       <Route path="streamForm" element={<StreamForm />} />
//       <Route path="Programs" element={<ProgramScreen />} />
//       <Route path="teens" element={<TeenScreen />} />
//       <Route path="foundationSchool" element={<FoundationSchoolScreen />} />
//       <Route path="StreamList" element={<StreamList />} />
//       <Route path="give" element={<GiveScreen />} />
//       <Route path="StreamPreview" element={<StreamPreview />} />
//       <Route path="admin" element={<AdminScreen />} />
//       <Route path="children" element={<Children />} />
//       <Route path="stripe" element={<StripeScreen />} />
//       <Route path="LiveStreamView" element={<LiveStreamView />} />
//       <Route path="commentSection" element={<CommentSection />} />
//       <Route path="LiveStreamComment" element={<LiveStreamComment />} />
//       <Route path="LiveStream" element={<LiveStream />} />
//       <Route path="TestifyScreen" element={<TestifyScreen />} />

//     </Routes>
//   );
// };

// export default Navigation;