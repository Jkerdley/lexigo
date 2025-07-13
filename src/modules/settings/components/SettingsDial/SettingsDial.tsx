import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SettingsIcon from "@mui/icons-material/Settings";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import PrintIcon from "@mui/icons-material/Face5";
import ShareIcon from "@mui/icons-material/Face2";
import CheckIcon from "@mui/icons-material/Check";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import {useAppDispatch, useAppSelector} from "../../../../core/store/store.ts";
import {setGender, toggleAutoPlay} from "../../../../core/store/settingsSlice.ts";

export const SettingsDial = () => {
    const dispatch = useAppDispatch();
    const { gender, autoPlayVoice } = useAppSelector(s => s.settings);

    const actions = [
        {
            id: "male",
            icon: <PrintIcon />,
            active: gender === 'MALE',
            name: "Мужской голос",
            onClick: () => dispatch(setGender('MALE')),
        },
        {
            id: "female",
            icon: <ShareIcon />,
            active: gender === 'FEMALE',
            name: "Женский голос",
            onClick: () => dispatch(setGender('FEMALE')),
        },
        {
            id: "autoplay",
            icon: <PlayCircleOutlineIcon />,
            active: autoPlayVoice,
            name: "Автопроигрывание",
            onClick: () => dispatch(toggleAutoPlay()),
        },
    ];

    return (
        <Box sx={{
            position:'fixed', bottom:2, left:100, zIndex:1100,
            '&:hover .MuiSpeedDial-actions':{ visibility:'visible' },
        }}>
            <SpeedDial
                ariaLabel="Settings"
                direction="up"
                icon={<SettingsIcon sx={{ color:'rgba(0,0,0,.8)', fontSize:'1rem' }} />}
                sx={{
                    '& .MuiSpeedDial-fab':{
                        width:30, height:30, minHeight:30,
                        bgcolor:'rgba(219,226,235,1)',
                        '&:hover':{ bgcolor:'rgba(219,226,235,.9)' },
                    },
                }}
            >
                {actions.map((a) => (
                    <SpeedDialAction
                        key={a.id}
                        tooltipTitle={a.name}
                        onClick={a.onClick}
                        icon={
                            <div style={{ position:'relative', width:'100%', height:'100%', display:'flex', justifyContent:'center', alignItems:'center' }}>
                                {a.icon}
                                {a.active && (
                                    <CheckIcon sx={{
                                        position:'absolute', top:0, right:0,
                                        fontSize:'0.7rem', bgcolor:'rgba(100,200,100,.8)',
                                        borderRadius:'50%', p:'1px',
                                    }}/>
                                )}
                            </div>
                        }
                        sx={{
                            width:30, height:30, minHeight:30,
                            bgcolor: a.active ? 'rgba(100,200,100,.3)' : 'rgba(235,235,235,.7)',
                            '&:hover':{
                                bgcolor: a.active ? 'rgba(100,200,100,.5)' : 'rgba(235,235,235,.25)',
                            },
                            p:0,
                        }}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
};
