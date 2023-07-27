import React, { useRef, useState, useEffect } from "react";

import { Container, Text } from "@chakra-ui/react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import * as Chakra from "@chakra-ui/react";
import * as Components from "../components/index";

export default function Index() {
    const [code, setCode] = useState(undefined);
    const scope = { React };

    useEffect(() => {
        function getImportedComponents(codigoReact) {
            const regex = /import\s+([\w{},\s]+)\s+from\s+['"](.+?)['"]/g;
            const imports = [];
            let match;

            while ((match = regex.exec(codigoReact))) {
                const importStatement = match[1];
                let importNames = importStatement.split(/\s*,\s*|\s+/).map((name) => {
                    return name.replace(/[{}\s]/g, ""); // Removemos llaves y espacios en blanco
                });

                importNames = importNames.filter((item) => item !== "");
                imports.push(...importNames);
            }

            return imports;
        }

        if (code) {
            const importedComponents = getImportedComponents(code);
            console.log(
                "🚀 ~ file: new-page.js:39 ~ useEffect ~ importedComponents:",
                importedComponents
            );

            importedComponents.forEach((name) => {
                console.log(
                    "🚀 ~ file: new-page.js:40 ~ importedComponents.forEach ~ name:",
                    name
                );
                if (name != "react")
                    if (Chakra[name]) scope[name] = Chakra[name];
                    else scope[name] = Components[name];
            });
            console.log(
                "🚀 ~ file: new-page.js:42 ~ importedComponents.forEach ~ scope:",
                scope
            );
        }
    }, [code]);

    useEffect(() => {
        window.addEventListener("message", (e) => {
            console.log(e.data, "================================");
            setCode(e.data);
        })
    }, []);

    return (
        <Container mt={16} maxW="1200px" justify="center" align="center">
            <LiveProvider
                code={code?.replace(
                    /import\s+[\w{},\s]+?\s+from\s+['"].+?['"];\s*/g,
                    ""
                )}
                scope={scope}
            >
                <div>
                    {code ? (
                        <>
                            <LivePreview />
                            <LiveEditor />
                            <LiveError />
                        </>
                    ) : (
                        ""
                    )}
                </div>
            </LiveProvider>
        </Container>
    );
}