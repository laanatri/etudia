# build
FROM maven:3.8.7-eclipse-temurin-17 AS builder
WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline

COPY . .
RUN mvn clean package -DskipTests

# image
FROM openjdk:17-jdk-slim
WORKDIR /app

# fichier .jar
COPY --from=builder /app/target/etudia-0.0.1-SNAPSHOT.jar app.jar

# port
ENV PORT=8080

EXPOSE $PORT

# démarrage sur render
CMD ["java", "-jar", "app.jar", "--server.port=${PORT}"]