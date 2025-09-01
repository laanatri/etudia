import { supabase } from "./supabase";

export default async function supabaseUpload(fileDatas: File): Promise<string | null> {
    try {
        const filePath = `${Date.now()}-${fileDatas.name}`;
    
        const {error: uploadError} = await supabase
            .storage
            .from('courses')
            .upload(filePath, fileDatas);
    
        if (uploadError) {
            console.error("Upload error :", uploadError.message, uploadError);
            return null;
        }
    
        const {data} = supabase
            .storage
            .from('courses')
            .getPublicUrl(filePath);
    
        if (!data.publicUrl) {
            console.error("URL error");
            return null;
        }
    
        return data.publicUrl;
    } catch(error) {
        console.log("Unexpected upload error");
        return null;
    }
}