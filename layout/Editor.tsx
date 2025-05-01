"use client"
import { Button, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import EditorJS from '@editorjs/editorjs';
import { lexend, source_sans_3 } from "@/styles/theme";



export interface OutputData {
    "time": number,
    "blocks": any[]
}


export default function Editor({ slug, data }: { slug: string, data: OutputData }) {

    const editorRef = useRef<EditorJS | any>(null);
    const holderRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true); // Prevent SSR crash
    }, []);

    const saveData = async () => {
        if (!editorRef.current) {
            console.log("No editor.")
            return;
        }

        if (!editorRef.current) return;

        try {
            const editor = editorRef.current as EditorJS;
            const output = await editor.save();
            // Send to backend or store locally
            console.log('Saved data:', output);

            await fetch('/api/pages', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: output, slug }),
            });

        } catch (err) {
            console.error('Saving failed:', err);
        }

    }

    useEffect(() => {

        if (!isMounted || !holderRef.current || editorRef.current) {
            return;
        }

        const initEditor = async () => {

            const EditorJS = (await import('@editorjs/editorjs')).default;
            const Header = (await import('@editorjs/header')).default;
            const Paragraph = (await import('@editorjs/paragraph')).default;
            const Code = (await import('@editorjs/code')).default;
            const List = (await import('@editorjs/list')).default;

            const editor = new EditorJS({
                holder: holderRef.current as any,
                onReady: () => {
                    console.log('Editor.js is ready');
                },
                tools: {
                    header: {
                        class: Header as any,
                        inlineToolbar: true,
                        toolbox: {
                            title: 'Heading 1',
                            icon: 'h1', // You can customize the icon
                        },
                        config: {
                            levels: [1],
                            defaultLevel: 1,
                            placeholder: 'Heading 1',
                          },
                    },
                    heading2: {
                        class: Header as any,
                        inlineToolbar: true,
                        toolbox: {
                            title: 'Heading 2',
                            icon: 'h2', // You can customize the icon
                        },
                        config: {
                            levels: [2],
                            defaultLevel: 2,
                            placeholder: 'Heading 2',
                          },
                    },
                    heading3: {
                        class: Header as any,
                        inlineToolbar: true,
                        toolbox: {
                            title: 'Heading 3',
                            icon: 'h3', // You can customize the icon
                        },
                        config: {
                            levels: [3],
                            defaultLevel: 3,
                            placeholder: 'Heading 3',
                          },
                    },
                    paragraph: {
                        class: Paragraph as any,
                        inlineToolbar: true,
                        config: {
                            preserveBlank: true,

                        },
                    },
                    code: {
                        class: Code as any
                    },
                    list: {
                        class: List as any,
                        inlineToolbar: true,
                        config: {
                            defaultStyle: 'unordered'
                        },
                    },
                },
                onChange: (api, event) => {
                    console.log({
                        api, event
                    })
                },
                autofocus: true,
                data,
            });
            editorRef.current = editor;
        };

        if (!editorRef.current) {
            initEditor();
        }

        return () => {
            if (editorRef.current?.destroy) {
                editorRef.current.destroy();
                editorRef.current = null;
            }
        };
    }, [isMounted]);


    return (
        <div className="column" style={{
            width: "100%"
        }}>
            <div className="flex fit"><Button
                size="small"
                variant="contained"
                onClick={() => {
                    saveData();
                }}>Save</Button></div>
            <div style={{
                fontFamily: [
                    source_sans_3.style.fontFamily,
                    'sans-serif',
                ].join(','),
            }}>

                <div ref={holderRef} id="editorjs" className="editorjs" />
            </div>
        </div>

    )
}