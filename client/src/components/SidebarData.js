import React from "react";

import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";

import * as FiIcons from "react-icons/fi";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Explorer",
    path: "/explorer",
    icon: <AiIcons.AiFillEye />,
    cName: "nav-text",
  },
  {
    title: "Gallery",
    path: "/gallery",
    icon: <MdIcons.MdOutlineMonochromePhotos />,

    cName: "nav-text",
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <FiIcons.FiSettings />,
    cName: "nav-text",
  },

  {
    title: "Upload",
    path: "/upload",
    icon: <AiIcons.AiOutlineCloudUpload />,
    cName: "nav-text",
  },

  {
    title: "Logout",
    path: "/logout",
    icon: <FiIcons.FiLogOut />,
    cName: "nav-text",
  },
];
