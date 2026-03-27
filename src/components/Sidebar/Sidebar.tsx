import { useState } from "react";
import {
    Box,
    Drawer,
    List,
    //   Typography,
    Divider,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    //   Avatar,
    Tooltip,
    useTheme,
    useMediaQuery,
    Button
} from "@mui/material";

import {
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    BarChart as BarChartIcon,
    Logout as LogoutIcon,
} from "@mui/icons-material";
import BasicSelect from "../Form/Dropdow";


export const Sidebar = ({ open, mobileOpen, onMobileClose }) => {
    const muiTheme = useTheme();
    const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
    const [selected, setSelected] = useState();
    const [watchlist, setWatchlist] = useState<string[]>([]);
    const DRAWER_WIDTH = 240;
    const DRAWER_COLLAPSED = 72;

    const BOTTOM_ITEMS = [
        { label: "Cerrar sesión", icon: <LogoutIcon /> },
    ];

    const drawerWidth = open ? DRAWER_WIDTH : DRAWER_COLLAPSED;

    const drawerContent = (
        <Box
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                bgcolor: "background.paper",
                overflow: "hidden",
            }}
        >
            {/* <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          px: open ? 2 : 1,
          py: 2,
          justifyContent: open ? "flex-start" : "center",
        }}
      >
        <Avatar
          sx={{
            width: 36,
            height: 36,
            bgcolor: "primary.main",
            fontSize: 14,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          JD
        </Avatar>
        {open && (
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="body2" fontWeight={600} noWrap>
              Juan Díaz
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              Administrador
            </Typography>
          </Box>
        )}
      </Box> */}

            <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />

            {/* Navegación principal */}
            <List sx={{ px: 1, pt: 1, flexGrow: 1 }}>
                <BasicSelect
                    label="Stocks"
                    options={[
                        { value: "AAPL", label: "Apple" },
                        { value: "GOOGL", label: "Google" },
                        { value: "MSFT", label: "Microsoft" }
                    ]}
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth sx={{ mt: 2 }}
                    disabled={!selected}
                    onClick={() => setWatchlist((prev) => [...prev, selected])}
                >
                    Subscribe
                </Button>
                {
                    watchlist.map((stock) => (
                        <ListItem key={stock} disablePadding sx={{ mb: 0.5 }}>
                            {stock}
                        </ListItem>
                    ))
                }
            </List>



            {/* Navegación inferior */}
            <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />
            <List sx={{ px: 1, pb: 1 }}>
                {BOTTOM_ITEMS.map(({ label, icon }) => (
                    <Tooltip key={label} title={!open ? label : ""} placement="right">
                        <ListItem disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                                sx={{
                                    borderRadius: 2,
                                    justifyContent: open ? "flex-start" : "center",
                                    px: open ? 1.5 : 1,
                                    minHeight: 44,
                                    "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: open ? 36 : "auto",
                                        color: "text.secondary",
                                        justifyContent: "center",
                                    }}
                                >
                                    {icon}
                                </ListItemIcon>
                                {open && (
                                    <ListItemText
                                        primary={label}
                                    />
                                )}
                            </ListItemButton>
                        </ListItem>
                    </Tooltip>
                ))}
            </List>
        </Box>
    );

    if (isMobile) {
        return (
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={onMobileClose}
                ModalProps={{ keepMounted: true }}
                sx={{
                    "& .MuiDrawer-paper": {
                        width: DRAWER_WIDTH,
                        border: "none",
                        backgroundImage: "none",
                    },
                }}
            >
                {drawerContent}
            </Drawer>
        );
    }

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                whiteSpace: "nowrap",
                transition: "width 0.25s ease",
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    border: "none",
                    backgroundImage: "none",
                    transition: "width 0.25s ease",
                    overflowX: "hidden",
                },
            }}
        >
            {drawerContent}
        </Drawer>
    );
}