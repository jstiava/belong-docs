import { Typography, useTheme, Tooltip, IconButton, Button, useMediaQuery, Badge, ButtonBase, TextField, Link, alpha } from "@mui/material";
import {
    ArrowBack,
    ArrowForward,
    ArrowLeftOutlined,
    ChevronLeft,
    ChevronRight,
    CloseOutlined,
    EditOutlined,
    EmailOutlined,
    Facebook,
    Instagram,
    MenuOutlined,
    PhoneOutlined,
    SearchOutlined,
    ShoppingBagOutlined
} from '@mui/icons-material';
import { useRouter } from "next/router";
import CoverImage from "@/components/CoverImage";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import anime from "animejs";
import { headerHeight } from "./AuthProvider";
import { DIVIDER_NO_ALPHA_COLOR } from "@/components/Divider";


export const menuItems = [
    {
        name: "Ponchos",
        value: "ponchos"
    },
    {
        name: "Outerwear",
        value: "outerwear"
    },
    {
        name: "Blankets",
        value: "blankets"
    },
    {
        name: "Jewelry",
        value: "jewelry"
    },
    {
        name: "Accessories",
        value: "accessories"
    }
]


export default function Header() {

    const theme = useTheme();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState('placeholder');
    const [email, setEmail] = useState("");

    const pleasePush: (...args: Parameters<typeof router.push>) => void = (
        ...args
    ) => {
        setIsSidebarOpen(false);
        router.push(...args);
    };

    const isSm = useMediaQuery(theme.breakpoints.down('sm'));
    // const isVerySmall = useMediaQuery("(max-width: 25rem)")
    const isVerySmall = false;


    useEffect(() => {
        anime({
            targets: "#logo",
            opacity: [0, 1],
            duration: 100,
            easing: "easeInOutQuad",
            delay: 100,
        });

        anime({
            targets: ".menuButton",
            opacity: [0, 1],
            duration: 300,
            easing: "easeInOutQuad",
            delay: (el, i) => (100 * i) + 100,
        });
    }, [isSm])

    const handleSwitchTab = (key: string) => {

        if (key === activeMenu) {
            return;
        }

        anime({
            targets: ".menuPanel",
            opacity: [1, 0],
            duration: 150,
            easing: "cubicBezier(.25, 1, .5, 1)",
            complete: (anim) => {
                console.log("Animation Complete!");
            }
        });

        if (key === 'menu') {
            setActiveMenu(key);
        }
        else {
            setTimeout(() => {
                setActiveMenu(key);
            }, 300);
        }

        setTimeout(() => {
            anime({
                targets: ".menuPanel",
                opacity: [0, 1],
                duration: 200,
                easing: "cubicBezier(.25, 1, .5, 1)",
                complete: (anim) => {
                    console.log("Animation Complete!");
                }
            });
        }, 350)



    }

    const handleCloseSidebar = () => {

        if (!isSidebarOpen) {
            return;
        }

        anime({
            targets: ".slide-in",
            translateX: ["0", "-150%"],
            duration: 750,
            delay: (el, i) => [0, 50, 150][i] || 0,
            easing: "cubicBezier(.25, 1, .5, 1)",
            complete: (anim) => {
                console.log("Animation Complete!");
            }
        });

        anime({
            targets: ".fade",
            opacity: [1, 0],
            duration: 300,
            easing: "cubicBezier(.25, 1, .5, 1)",
            complete: (anim) => {
                console.log("Animation Complete!");
            }
        });

        setTimeout(() => {
            setIsSidebarOpen(false);
        }, 750)
    }

    const handleOpenSidebar = () => {

        if (isSidebarOpen) {
            return;
        }


        setIsSidebarOpen(true);

        anime({
            targets: ".slide-in",
            translateX: ["-100%", "0%"],
            duration: 400,
            delay: (el, i) => [50, 0, 0][i] || 0,
            easing: "cubicBezier(.25, 1, .5, 1)",
            complete: (anim) => {
                console.log("Animation Complete!");
            }
        });

        anime({
            targets: ".fade",
            opacity: [0, 1],
            duration: 250,
            easing: "cubicBezier(.25, 1, .5, 1)",
            complete: (anim) => {
                console.log("Animation Complete!");
            }
        });
    }


    return (
        <>
            <header
                className="column snug center"
                style={{
                    position: 'fixed',
                    top: 0,
                    width: "100%",
                    backgroundColor: alpha(theme.palette.background.paper, 0.9),
                    color: theme.palette.text.primary,
                    height: isSm ? headerHeight : headerHeight,
                    zIndex: 6,
                    borderBottom: `0.1rem solid ${DIVIDER_NO_ALPHA_COLOR}`

                }}
            >
                <div className="flex between middle"
                    style={{
                        padding: isSm ? "1rem" : "1rem 1rem",
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                        height: '100%',
                        width: "100%",
                        // maxWidth: "100rem"
                    }}
                >

                    <div className="flex fit" style={isSm ? {
                        position: 'absolute',
                        top: isSm ? "0rem" : "0.5rem",
                        left: "50vw",
                        transform: 'translateX(-50%)'
                    } : {

                    }}>


                        {!isSm && (

                            <div className="flex">
                                <CoverImage
                                    height="2.5rem"
                                    width="2.5rem"
                                    url="./belong.png"
                                    caption={"Belong Icon"}
                                />
                                <Typography variant="h6" sx={{
                                    fontSize: "1rem"
                                }}>Belong Docs</Typography>
                               
                            </div>
                        )}
                    </div>
                    <div className="flex fit">

                    </div>
                </div>
            </header>
        </>
    )
}