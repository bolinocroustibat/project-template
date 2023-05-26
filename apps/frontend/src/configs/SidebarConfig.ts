import autoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import peopleAltIcon from "@mui/icons-material/PeopleAlt";

import { dashboardRoutes } from "@domains/dashboard/DashboardRoute";
import { userRoutes } from "@domains/user/UserRoute";
import { SidebarItemModel } from "@layouts/slidebar/SidebarLayout";

/**
 * Default sidebar config
 */
const sidebarConfig = {
  colors: {
    background: "#FFFFFF",
    sidebar: "#FFFFFF",
  },
  callDefault: dashboardRoutes.dashboard.call,
  items: [
    {
      translationKey: "dashboard.dashboard.title",
      icon: autoAwesomeMosaicIcon,
      call: dashboardRoutes.dashboard.call,
    },
    {
      translationKey: "user.users.title",
      icon: peopleAltIcon,
      call: userRoutes.users.call,
    },
  ] as SidebarItemModel[],
};

export { sidebarConfig };
