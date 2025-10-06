package com.etudia.etudia;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class EtudiaAppApplication {

	public static void main(String[] args) {

		String activeProfile = System.getProperty("spring.profiles.active", "dev");

		if ("dev".equals(activeProfile)) {

			try {

				Dotenv dotenv = Dotenv.configure()
						.ignoreIfMissing()
						.load();

				dotenv.entries().forEach(entry -> {
					System.setProperty(entry.getKey(), entry.getValue());
					System.out.println("Chargé : " + entry.getKey() + "=" + entry.getValue());
				});

				System.out.println("✅ Variables d'environnement chargées depuis .env");
			} catch (Exception e) {
				System.err.println("⚠️ Erreur lors du chargement du .env : " + e.getMessage());
			}

		} else {
			System.out.println("📋 Mode " + activeProfile + " - Variables d'environnement système utilisées");
		}

		SpringApplication.run(EtudiaAppApplication.class, args);
	}

}