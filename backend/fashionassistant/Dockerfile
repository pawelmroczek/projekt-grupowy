FROM maven:3.9.6-eclipse-temurin-17-alpine
COPY . /fashion
WORKDIR /fashion
RUN mvn package -DskipTests
ENTRYPOINT ["java","-jar","/fashion/target/fashion-app.jar"]