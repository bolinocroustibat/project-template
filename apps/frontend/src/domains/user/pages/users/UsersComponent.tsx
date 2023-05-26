import { useTranslation } from "react-i18next";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import SidebarLayout from "@layouts/slidebar/SidebarLayout";

/**
 * Users component
 * @constructor
 */
const UsersComponent = () => {
  const { t } = useTranslation();
  const createData = (email: string, name: string, country: string) => {
    return { email, name, country };
  };

  const rows = [
    createData("me@adriencarpentier.com.co", "bolino", "France"),
  ];

  return (
    <SidebarLayout>
      <Grid container spacing={3}>
        {/* LIST */}
        <Grid item xs={12}>
          <Paper>
            <TableContainer sx={{ borderRadius: "8px" }}>
              <Table>
                {/* HEAD */}
                <TableHead
                  sx={{
                    backgroundColor: "grey.200",
                    textTransform: "capitalize",
                  }}
                >
                  <TableRow>
                    <TableCell>{t("global.common.email")}</TableCell>
                    <TableCell>{t("global.common.name")}</TableCell>
                    <TableCell>{t("global.common.hub")}</TableCell>
                  </TableRow>
                </TableHead>

                {/* BODY */}
                <TableBody
                  sx={{
                    "tr:nth-child(even)": {
                      backgroundColor: "grey.50",
                    },
                  }}
                >
                  {rows.map((row) => (
                    <TableRow
                      key={row.email}
                      sx={{
                        // hide last border
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.country}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </SidebarLayout>
  );
};

export default UsersComponent;
