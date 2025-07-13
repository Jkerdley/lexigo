import { useState } from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SettingsIcon from "@mui/icons-material/Settings";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import PrintIcon from "@mui/icons-material/Face5";
import ShareIcon from "@mui/icons-material/Face2";
import CheckIcon from "@mui/icons-material/Check";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

const actions = [
    {
        id: "male",
        icon: <PrintIcon />,
        name: "Мужской голос",
        onClick: () => console.log("Мужской голос выбран"),
    },
    {
        id: "female",
        icon: <ShareIcon />,
        name: "Женский голос",
        onClick: () => console.log("Женский голос выбран"),
    },
    {
        id: "autoplay",
        icon: <PlayCircleOutlineIcon />,
        name: "Автопроигрывание",
        onClick: () => console.log("Автопроигрывание включено"),
    },
];

export const SettingsDial = () => {
    const [activeActions, setActiveActions] = useState<Record<string, boolean>>({
        male: false,
        female: false,
        autoplay: false,
    });

    const toggleAction = (actionId: string) => {
        setActiveActions((prev) => {
            if (actionId === "male" || actionId === "female") {
                return {
                    ...prev,
                    male: actionId === "male",
                    female: actionId === "female",
                    [actionId]: !prev[actionId],
                };
            }

            return {
                ...prev,
                [actionId]: !prev[actionId],
            };
        });
    };

    const handleActionClick = (actionId: string, actionName: string) => {
        toggleAction(actionId);
        console.log(`Выбрано действие: ${actionName}`);
    };

    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 2,
                left: 100,
                zIndex: 1100,
                "&:hover": {
                    "& .MuiSpeedDial-actions": {
                        visibility: "visible",
                    },
                },
            }}
        >
            <SpeedDial
                ariaLabel="Settings"
                direction="up"
                icon={
                    <SettingsIcon
                        sx={{
                            color: "rgba(0, 0, 0, 0.8)",
                            fontSize: "1rem",
                        }}
                    />
                }
                sx={{
                    "& .MuiSpeedDial-fab": {
                        width: 30,
                        height: 30,
                        minHeight: 30,
                        backgroundColor: "rgba(219, 226, 235, 1)",
                        "&:hover": {
                            backgroundColor: "rgba(219, 226, 235, 0.9)",
                        },
                    },
                }}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        tooltipTitle={action.name}
                        key={action.id}
                        icon={
                            <div
                                style={{
                                    position: "relative",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "100%",
                                    height: "100%",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                >
                                    {action.icon}
                                </div>
                                {activeActions[action.id] && (
                                    <CheckIcon
                                        sx={{
                                            position: "absolute",
                                            top: 0,
                                            right: 0,
                                            fontSize: "0.7rem",
                                            backgroundColor: "rgba(100, 200, 100, 0.8)",
                                            borderRadius: "50%",
                                            padding: "1px",
                                        }}
                                    />
                                )}
                            </div>
                        }
                        onClick={() => {
                            handleActionClick(action.id, action.name);
                            if (action.onClick) action.onClick();
                        }}
                        sx={{
                            width: 30,
                            height: 30,
                            minHeight: 30,
                            backgroundColor: activeActions[action.id]
                                ? "rgba(100, 200, 100, 0.3)"
                                : "rgba(235, 235, 235, 0.7)",
                            "&:hover": {
                                backgroundColor: activeActions[action.id]
                                    ? "rgba(100, 200, 100, 0.5)"
                                    : "rgba(235, 235, 235, 0.25)",
                            },
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 0,
                        }}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
};
