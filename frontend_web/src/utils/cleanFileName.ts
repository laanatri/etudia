export default function sanitizeFileName(name: string): string {
    return name
        .normalize("NFD") // Normalization Form Decomposition è => e + `
        .replace(/[\u0300-\u036f]/g, "") // enlève les accents
        .replace(/[^a-zA-Z0-9.\-_]/g, "_"); // remplace ce qui n'est pas alphanumérique par un _
}