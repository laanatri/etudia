import { supabase } from "./supabase";

export default async function supabaseDownload(filePath: string): Promise<string | null> {
    try {
        const { data, error } = await supabase
            .storage
            .from('summaries')
            .download(filePath);

        if (error || !data) {
            console.error("Download error:", error?.message, error);
            return null;
        }

        const text = await data.text();
        return text;
    } catch (err) {
        console.error("Unexpected download error", err);
        return null;
    }
}