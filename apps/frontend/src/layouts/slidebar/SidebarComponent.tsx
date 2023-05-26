import { FC, MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

import { ReactComponent as BrandingLogo } from "@assets/branding/logo.svg";
import { UserModel } from "@domains/auth/stores/auth/AuthModel";
import { style } from "@layouts/slidebar/_sidebarStyle";
import { SidebarItemModel } from "@layouts/slidebar/SidebarLayout";
import { upFirstChar } from "@utils/TextUtil";

/**
 * Sidebar layout properties
 */
interface ISidebarComponentProps {
  children: JSX.Element;
  data: {
    user?: UserModel;

    // sidebar items
    items: SidebarItemModel[];

    // HTML element used to set the position of the profile menu
    anchorElement?: HTMLElement;

    // selected item
    itemSelected: SidebarItemModel;

    // true : sidebar responsive opened
    responsiveOpened: boolean;

    // handle when user clicks on logo
    handleDefaultCall: () => void;

    // handle the selected sidebar item
    handleItemSelected: (item: SidebarItemModel) => void;

    // handle the responsive sidebar
    handleResponsiveSidebar: () => void;

    // handle logout
    handleLogout: () => void;

    // handle anchor element
    handleAnchorElement: (event: MouseEvent<HTMLElement> | undefined) => void;
  };
}

/**
 * Sidebar Component
 */
const SidebarComponent: FC<ISidebarComponentProps> = (props) => {
  const { t } = useTranslation();

  /**
   * Sidebar items
   */
  const SidebarItems: FC = () => (
    <Box sx={style.containerItems}>
      {props.data.items.map((item) => {
        const activated = item === props.data.itemSelected;
        return (
          <Link
            key={`sidebar_item_${item.translationKey}`}
            sx={style.containerItem(activated)}
            component={"button"}
            underline={"none"}
            onClick={() => props.data.handleItemSelected(item)}
          >
            <Box sx={style.iconItem(activated)}>
              <item.icon />
            </Box>

            <Typography variant={activated ? "subtitle2" : "body2"}>
              {t(item.translationKey)}
            </Typography>
          </Link>
        );
      })}
    </Box>
  );

  return (
    <Box sx={style.container}>
      {/* SIDEBAR */}
      <Box component={"nav"} sx={style.containerLeft}>
        {/* BRAND LOGO */}
        <Link
          component={"button"}
          sx={style.iconBranding}
          onClick={props.data.handleDefaultCall}
        >
          <BrandingLogo width={"70%"} />
        </Link>

        {/* SIDEBAR ITEMS */}
        <SidebarItems />
      </Box>

      {/* NAVBAR + CONTENT */}
      <Box sx={style.containerRight}>
        {/* NAVBAR */}
        <Box
          component={"nav"}
          sx={style.containerAppbar(props.data.responsiveOpened)}
        >
          {/* NAVBAR */}
          <Box sx={style.toolbar}>
            {/* MENU ICON */}
            <IconButton
              edge={"start"}
              color={"inherit"}
              sx={style.iconNavResponsible}
              onClick={props.data.handleResponsiveSidebar}
            >
              {props.data.responsiveOpened ? <CloseIcon /> : <MenuIcon />}
            </IconButton>

            {/* ITEM NAME */}
            <Typography variant={"h6"}>
              {t(props.data.itemSelected.translationKey)}
            </Typography>

            {/* PROFILE BUTTON */}
            <Box>
              {/* BUTTON */}
              <IconButton
                //edge={"end"}
                size={"small"}
                onClick={props.data.handleAnchorElement}
              >
                <Avatar
                  sx={{
                    backgroundColor: "primary.main",
                  }}
                >
                  {props.data.user?.username.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>

              {/* MENU */}
              <Menu
                disableScrollLock
                anchorEl={props.data.anchorElement}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                PaperProps={{
                  elevation: 0,
                  sx: style.containerMenu,
                }}
                open={Boolean(props.data.anchorElement)}
                onClick={() => props.data.handleAnchorElement(undefined)}
                onClose={() => props.data.handleAnchorElement(undefined)}
              >
                {/* USER INFO */}
                <Box sx={style.containerUserInfo}>
                  <Typography variant={"subtitle2"} sx={style.textUp}>
                    {props.data.user?.username}
                  </Typography>
                  <Typography variant={"body2"} color={"grey.500"}>
                    {props.data.user?.email}
                  </Typography>
                </Box>

                <Divider sx={{ borderStyle: "dotted" }} />

                {/* LOGOUT */}
                <MenuItem sx={style.menuItem} onClick={props.data.handleLogout}>
                  <Typography>
                    {upFirstChar(t("global.common.logout"))}
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          {/* RESPONSIVE SIDEBAR ITEMS */}
          {props.data.responsiveOpened && (
            <Box sx={style.iconNavResponsible}>
              <SidebarItems />
            </Box>
          )}
        </Box>

        {/* CONTENT */}
        <Box component={"main"} padding={"50px 40px"}>
          <Box height={"80px"} />

          {props.children}
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarComponent;
