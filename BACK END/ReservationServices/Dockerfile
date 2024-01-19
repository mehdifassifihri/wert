FROM maven:3.8.4-openjdk-17 as builder
WORKDIR /app
COPY . .

FROM openjdk:17
VOLUME /tmp
EXPOSE 8761
COPY --from=builder /app/target/*.jar sr.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/sr.jar"]