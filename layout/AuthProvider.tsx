"use client"
import { ThemeProvider } from "@mui/material";
import { NextComponentType, NextPageContext } from "next";
import NextNProgress from 'nextjs-progressbar';
import theme from '@/styles/theme';
import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
// import { Category } from "@/types";
import CoverImage from "@/components/CoverImage";
import Sidebar, { SIDEBAR_WIDTH } from "./Sidebar";
import Divider from "@/components/Divider";



declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        flipped: true;
    }
}

export const headerHeight = "4rem";
const isProduction = true;

const protectedRoutes = ['/admin'];

export default function AuthProvider({
    Component,
    pageProps,
}: {
    Component: NextComponentType<NextPageContext, any, any>;
    pageProps: any;
}) {

    const router = useRouter();

    const verifySession = async () => {

        const verifyFetch = await fetch(`/api/verify`);

        if (!verifyFetch.ok) {
            return false;
        }

        const response = await verifyFetch.json();
        return true;
    }

    useEffect(() => {

        if (protectedRoutes.some(path => router.pathname.startsWith(path))) {

            verifySession()
                .then((res) => {
                    if (!res) {
                        router.push('/')
                    }
                    console.log("Case 0")
                    return;
                })
            return;
        }
        else if (router.pathname === '/login') {
            verifySession()
                .then((res) => {

                    if (!res) {
                        return;
                    }
                    router.push('/admin')
                    return;
                })
        }
        else {
            return;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.asPath]);

    return (
        <>
            <ThemeProvider theme={theme}>
                <Head>
                    <meta name="theme-color" content={theme.palette.background.paper} />
                </Head>
                <NextNProgress color={theme.palette.primary.main} />
                <Header />
                <div className="flex snug top" style={{
                    minHeight: "100vh",
                    marginTop: headerHeight,
                }}>
                    <Sidebar />
                    <div id="content" className="column snug" style={{
                        // backgroundColor: theme.palette.background.paper,
                        // backgroundColor: 'green',
                        padding: "3rem",
                        width: `calc(100% - ${SIDEBAR_WIDTH})`,
                        height: "300vh",
                    }}>

                        <Component {...pageProps} />
                    </div>
                </div>
                <Footer />
            </ThemeProvider>
        </>
    )
}