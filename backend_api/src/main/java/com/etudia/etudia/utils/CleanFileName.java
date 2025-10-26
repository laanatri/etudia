package com.etudia.etudia.utils;

public class CleanFileName {

    public static String clean(String name) {
        // Normalization Form Decomposition è => e + `
        String normalized = java.text.Normalizer.normalize(name, java.text.Normalizer.Form.NFD);
        // enlève les accents
        normalized = normalized.replaceAll("[\\p{InCombiningDiacriticalMarks}]", "");
        // remplace ce qui n'est pas alphanumérique par un _
        return normalized.replaceAll("[^a-zA-Z0-9.\\-_]", "_");
    }

}