import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import {Text} from "../components/text.tsx";
import {Textarea} from "../components/textarea.tsx";
import {BadgeButton} from "../components/badge.tsx";

function Settings() {
    const [greetMsg, setGreetMsg] = useState("");
    const [name, setName] = useState("");

    async function greet() {
        // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
        setGreetMsg(await invoke("greet", { name }));
    }

    return (
        <div className="container">
            <Text className="text-3xl text-tc font-bold underline">Settings!</Text>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    greet();
                }}
            >
                <Textarea
                    onChange={(e) => setName(e.currentTarget.value)}
                />
                <BadgeButton className="bg-bc" type="submit">Greet</BadgeButton>
            </form>

            <Text className="text-tc">{greetMsg}</Text>
        </div>
    );
}

export default Settings;