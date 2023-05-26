import { useTranslation } from "react-i18next";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Grid } from "@mui/material";

import Card from "@domains/dashboard/components/card/Card";
import SidebarLayout from "@layouts/slidebar/SidebarLayout";

/**
 * Dashboard component
 * @constructor
 */
const DashboardComponent = () => {
  const { t } = useTranslation();

  return (
    <SidebarLayout>
      <Grid container spacing={3}>
        {/* TOTAL USERS */}
        <Grid item xs={12} md={4}>
          <Card
            data={{
              title: t("dashboard.dashboard.total_users"),
              value: "85,862",
              variation: "+25.9%",
              variationUnit: t("dashboard.dashboard.than_last_month"),
              icon: (
                <PeopleAltIcon
                  sx={{ fontSize: "50px", color: "primary.main" }}
                />
              ),
            }}
          />
        </Grid>

        {/* INCOME */}
        <Grid item xs={12} md={4}>
          <Card
            data={{
              title: t("dashboard.dashboard.income"),
              value: "$5,693",
              variation: "+9.0%",
              variationUnit: t("dashboard.dashboard.than_last_month"),
              icon: (
                <AttachMoneyIcon
                  sx={{ fontSize: "50px", color: "primary.main" }}
                />
              ),
            }}
          />
        </Grid>

        {/* Current balance */}
        <Grid item xs={12} md={4}>
          <Card
            data={{
              title: t("dashboard.dashboard.current_balance"),
              value: "$8,586",
              variation: "+2.7%",
              variationUnit: t("dashboard.dashboard.than_last_month"),
              icon: (
                <AccountBalanceIcon
                  sx={{ fontSize: "50px", color: "primary.main" }}
                />
              ),
            }}
          />
        </Grid>

        {/* WEB VISITS */}
        <Grid item xs={12} md={8}>
          <Card
            data={{
              title: t("dashboard.dashboard.website_visits"),
              value: "",
              variation: "",
              variationUnit: "",
              icon: <></>,
            }}
          />
        </Grid>

        {/* BUGS */}
        <Grid item xs={12} md={4}>
          <Card
            data={{
              title: t("dashboard.dashboard.bug_reports"),
              value: "",
              variation: "",
              variationUnit: "",
              icon: <></>,
            }}
          />
        </Grid>
      </Grid>
    </SidebarLayout>
  );
};

export default DashboardComponent;
