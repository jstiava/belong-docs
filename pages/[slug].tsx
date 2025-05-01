"use client"
import { Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import fs from 'fs';
import path from 'path';

export async function getStaticPaths() {
    const dir = path.join(process.cwd(), 'content');
    const files = fs.readdirSync(dir);

    const paths = files.map((filename) => ({
        params: { slug: filename.replace('.json', '') },
    }));

    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({ params }: any) {
    try {
        const filePath = path.join(process.cwd(), 'content', `${params.slug}.json`);
        const file = fs.readFileSync(filePath, 'utf-8');
        const parsed = JSON.parse(file);

        console.log(parsed)

        const theStatic = {
            success: true,
            data: parsed ? parsed : [],
            slug: params.slug,
        };

        console.log(theStatic)

        return {
            props: {
                static: theStatic
            },
        };
    }
    catch (err) {
        console.log(err);
        return {
            props: {
                static: {
                    success: false
                }
            }
        }
    }
}

const Editor = dynamic(() => import('../layout/Editor'), { ssr: false });


export default function ContentPage(props: {
    static: {
        data? : any
        success: boolean,
        slug?: string
    }
}) {
    console.log(props);

    const router = useRouter();


    if (!props.static || !props.static.success) {
        return <></>
    }


    return (

        <div className="column left"
        style={{
            width: "100%",
            maxWidth: "60rem"
        }}
        >
            {props.static.data && props.static.slug && <><Editor key={props.static.slug} slug={props.static.slug} data={props.static.data} /></>}
        </div>
    )
}