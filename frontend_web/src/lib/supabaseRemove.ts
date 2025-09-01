import { supabase } from "./supabase";

export default async function supabaseRemove(url: string): Promise<boolean> {
    try {
    
        const { error } = await supabase
            .storage
            .from('courses')
            .remove([url]);
    
        if (error) {
            console.error("Remove error :", error.message, error);
            return false;
        }
    
        return true;
    } catch(error) {
        console.log("Unexpected remove error", error);
        return false;
    }
}