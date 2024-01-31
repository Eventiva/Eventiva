// File: projects/workflows/change-report/main.ts

// Function to retrieve and process commit messages
function retrieveCommitMessages(): string[] {
  // Implementation goes here
}

// Function to send Slack message
function sendSlackMessage(message: string): void {
  // Implementation goes here
}

// Function to send Discord message
function sendDiscordMessage(message: string): void {
  // Implementation goes here
}

// Main function
function main(): void {
  const commitMessages = retrieveCommitMessages();
  const report = composeReport(commitMessages);

  sendSlackMessage(report);
  sendDiscordMessage(report);
}

main();
