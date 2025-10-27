import ExtendedSession from "@/types/ExtendedSession";
import Summary from "@/types/Summary";
import supabaseDownload from "./supabaseDownload";
import extractFilePath from "@/utils/extractFilePath";
import parse from "html-react-parser";
import React from "react";

const getSummaries = async (session: ExtendedSession | null): Promise<Summary[]> => {

    if (!session?.user?.id) return [];

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/summary/user/${session.user.id}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.user.jwtToken}`
            }
        }
    );

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP error, status: ${response.status}, body: ${errorBody}`);
    }

    return await response.json();
}

const getSummary = async (summaryUrl: string): Promise<React.ReactNode | null> => {

    const filePath = extractFilePath(summaryUrl);

    const content = await supabaseDownload(filePath);

    if (content) {

        return parse(content);
    }
    return null;
}

export {getSummaries, getSummary};