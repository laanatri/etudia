# Étape 1 : Construire le projet avec Maven
FROM maven:3.8.7-eclipse-temurin-17 AS builder
WORKDIR /app

# Copier tout le code source dans le conteneur
COPY . .

# Construire le fichier JAR sans exécuter les tests
RUN mvn clean package -DskipTests

# Étape 2 : Exécuter l'application avec Java
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copier le fichier JAR généré depuis l'étape de construction
COPY --from=builder /app/target/etudia-0.0.1-SNAPSHOT.jar app.jar

# Exposer le port sur lequel l'application écoute
EXPOSE 8080

# Commande pour démarrer l'application
ENTRYPOINT ["java", "-jar", "app.jar"]