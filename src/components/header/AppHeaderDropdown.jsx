import React from "react";
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import { cilAccountLogout } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

import avatar8 from "./../../assets/images/avatars/8.jpg";
import Api from "../../services/Api";
import Cookies from "js-cookie";
import { redirect, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const user = JSON.parse(Cookies.get("user"));

const AppHeaderDropdown = () => {
  const navigate = useNavigate();

  const logout = async (e) => {
    e.preventDefault();
    try {
      await Api.post("/api/logout");
      Cookies.remove("user");
      Cookies.remove("token");
      Cookies.remove("permissions");
      toast.success("Logout Successfully!", {
        position: "bottom-right",
        duration: 4000,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      // Tangani kesalahan logout di sini
      console.error("Logout failed:", error);
      toast.error("Logout Failed. Please try again.", {
        position: "bottom-right",
        duration: 4000,
      });
    }
  };
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        {user.email}
        <CDropdownItem href="#" onClick={logout}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Logout Account
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
