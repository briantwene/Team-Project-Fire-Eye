import { HiHome, HiEye, HiCog, HiPhotograph, HiLogout } from "react-icons/hi";
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sub-bar sidebar-top">
        <SidebarIcon text={"Home"} icon={<HiHome />} />
        <SidebarIcon text={"Live Stream"} icon={<HiEye />} />
        <SidebarIcon text={"Gallery"} icon={<HiPhotograph />} />
      </div>
      <div className="sub-bar sidebar-bottom">
        <SidebarIcon text={"Settings"} icon={<HiCog />} />
        <SidebarIcon text={"Logout"} icon={<HiLogout />} />
        <SidebarIcon text = {"Hahahaha"} icon={<HiEye/>}/>
      </div>
    </div>
  );
}

const SidebarIcon = ({ icon, text }) => (
  <div className="sidebar-icon">
    <span className="text">{icon}</span>
    {/* chile element of the div is given a scale of 100 when the "group"(parent) is hovered over...  */}
    <span className="text">{text}</span>
  </div>
);

export default Sidebar;
