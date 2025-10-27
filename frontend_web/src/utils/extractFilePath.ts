export default function extractFilePath(publicUrl: string): string {
    // public/summaries/name.txt
    const parts = publicUrl.split("/summaries/");
    return parts[1] ?? publicUrl;
}