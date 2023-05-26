import {
  FC,
  FunctionComponent,
  MouseEvent,
  SVGProps,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { sidebarConfig } from "@configs/SidebarConfig";
import { logout } from "@domains/auth/stores/auth/AuthService";
import { useDispatch, useSelector } from "@hooks/StoreHook";
import SidebarComponent from "@layouts/slidebar/SidebarComponent";

/**
 * Sidebar layout properties
 */
interface ISidebarLayoutProps {
  children: JSX.Element;
}

/**
 * Sidebar item model
 */
type SidebarItemModel = {
  translationKey: string;
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  call: () => string;
};

/**
 *Sidebar Layout
 */
const SidebarLayout: FC<ISidebarLayoutProps> = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const authReducer = useSelector((state) => state.authReducer);

  const [itemSelected, setItemSelected] = useState<SidebarItemModel>(
    sidebarConfig.items[0]
  );
  const [responsiveOpened, setResponsiveOpened] = useState<boolean>(false);
  const [anchorElement, setAnchorElement] = useState<HTMLElement | undefined>(
    undefined
  );

  /**
   * Set the item selected according to the location path
   */
  useEffect(() => {
    const itemSelectedLocal = sidebarConfig.items.find((item) =>
      item.call().startsWith(location.pathname)
    );
    itemSelectedLocal && setItemSelected(itemSelectedLocal);
  }, []);

  /**
   * Handle the sidebar item navigation
   * @param item
   */
  const handleItemSelected = (item: SidebarItemModel) => {
    navigate(item.call());
    if (responsiveOpened) setResponsiveOpened(false);
  };

  /**
   * Default call
   */
  const handleDefaultCall = () => navigate(sidebarConfig.callDefault());

  /**
   * Handle sidebar responsible
   */
  const handleResponsiveSidebar = () => setResponsiveOpened((prev) => !prev);

  /**
   * Handle layout
   */
  const handleLogout = () => dispatch(logout());

  /**
   * Handle anchor element
   */
  const handleAnchorElement = (event: MouseEvent<HTMLElement> | undefined) =>
    setAnchorElement(event?.currentTarget);

  return (
    <SidebarComponent
      data={{
        user: authReducer.user,
        items: sidebarConfig.items,
        anchorElement,
        itemSelected,
        responsiveOpened,
        handleDefaultCall,
        handleResponsiveSidebar,
        handleItemSelected,
        handleLogout,
        handleAnchorElement,
      }}
    >
      {props.children}
    </SidebarComponent>
  );
};

export default SidebarLayout;
export type { SidebarItemModel };
