import { workspaceRoot } from "@nx/devkit";
/* eslint-disable no-console */
import { MongoDBContainer, RabbitMQContainer } from "@ecoma/common-testing";
import { execSync } from "child_process";
import { GenericContainer, Wait, Network } from "testcontainers";

async function deployLocalTestingEnviroment() {
  console.log("Deploying local testing environment containers...");

  // Create a network for all containers
  const network = await new Network().start();
  console.log(`Created network: ${network.getName()}`);

  // start mongodb
  console.log("Starting MongoDB container...");
  const mongodbContainer = await new MongoDBContainer()
    .withNetwork(network)
    .start();
  console.log(
    `MongoDB container started at ${mongodbContainer.getConnectionString()}`
  );

  // start rabbitmq
  console.log("Starting RabbitMQ container...");
  const rabbitMQcontainer = await new RabbitMQContainer()
    .withNetwork(network)
    .start();
  console.log(
    `RabbitMQ container started at ${rabbitMQcontainer.getAmqpUrl()}`
  );

  // start backend
  console.log("Starting Backend container...");
  const backendContainer = await new GenericContainer("internal-backend:latest")
    .withNetwork(network)
    .withEnvironment({
      PORT: "3000",
      MONGODB_URI: mongodbContainer.getConnectionString(),
      RABBITMQ_URI: rabbitMQcontainer.getAmqpUrl(),
    })
    .withLogConsumer((stream) => {
      stream.on("data", (line: string) => {
        console.log(line);
      });
      stream.on("error", (error: Error) => {
        console.log(error);
      });
    })
    .withExposedPorts(3000)
    .withWaitStrategy(Wait.forHttp("/health", 3000))
    .start();
  console.log(
    `Backend container started at http://${backendContainer.getHost()}:${backendContainer.getMappedPort(
      3000
    )}`
  );

  // start frontend
  console.log("Starting Frontend container...");
  const fontendContainer = await new GenericContainer(
    "internal-frontend:latest"
  )
    .withNetwork(network)
    .withEnvironment({
      PORT: "4200",
      API_BASE_URL: `http://${backendContainer.getHost()}:${backendContainer.getMappedPort(
        3000
      )}`,
    })
    .withLogConsumer((stream) => {
      stream.on("data", (line: string) => {
        console.log(line);
      });
      stream.on("error", (error: Error) => {
        console.log(error);
      });
    })
    .withExposedPorts(4200)
    .withWaitStrategy(Wait.forHttp("/", 4200))
    .start();
  console.log(
    `Frontend container started at http://${fontendContainer.getHost()}:${fontendContainer.getMappedPort(
      4200
    )}`
  );

  return `http://${fontendContainer.getHost()}:${fontendContainer.getMappedPort(
    4200
  )}`;
}

async function globalSetup() {
  // If BASE_URL is provided, use it directly and skip container deployment
  if (process.env["BASE_URL"]) {
    console.log(`Using provided BASE_URL: ${process.env["BASE_URL"]}`);
    // Optionally, you might still want to set PLAYWRIGHT_TEST_BASE_URL for consistency
    process.env["PLAYWRIGHT_TEST_BASE_URL"] = process.env["BASE_URL"];
    return; // Skip the rest of the setup
  }

  console.log("Building and loading containers...");
  try {
    execSync("INPUT_TAGS=internal-backend nx containerize backend --load", {
      stdio: "inherit",
      cwd: workspaceRoot,
    });
    execSync("INPUT_TAGS=internal-frontend nx containerize frontend --load", {
      stdio: "inherit",
      cwd: workspaceRoot,
    });
    console.log("Containers built and loaded successfully");
  } catch (error) {
    console.error("Error building/loading containers:", error);
    process.exit(1);
  }

  const baseUrl = await deployLocalTestingEnviroment();

  // Set the base URL for playwright.config.ts to use
  process.env["PLAYWRIGHT_TEST_BASE_URL"] = baseUrl; // Using env var for simplicity

  console.log(`Test base URL: ${baseUrl}`);
}

export default globalSetup;
