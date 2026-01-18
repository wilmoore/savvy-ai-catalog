#!/usr/bin/env node
import { createCatalogService } from "./catalog";
import type { CatalogEntry } from "./types";

const service = createCatalogService();

function printUsage(): void {
  console.log(`
Savvy AI Catalog - A neutral reference for AI tools and terms

Usage:
  catalog list                                    List all entries
  catalog add <name> <description> [options]      Add a new entry
  catalog what <name>                             Look up an entry by name

Options for 'add':
  --in-stack          Mark as part of current working setup
  --pressure-tested   Mark as used in real work with real stakes

Examples:
  catalog add "Claude" "An AI assistant made by Anthropic"
  catalog add "TypeScript" "A typed superset of JavaScript" --in-stack --pressure-tested
  catalog what "Claude"
  catalog list
`);
}

function formatEntry(entry: CatalogEntry): string {
  const flags = [];
  if (entry.inCurrentStack) flags.push("in-stack");
  if (entry.pressureTested) flags.push("pressure-tested");
  const flagStr = flags.length > 0 ? ` [${flags.join(", ")}]` : "";
  return `${entry.name}${flagStr}\n  ${entry.description}`;
}

function listEntries(): void {
  const entries = service.list();
  if (entries.length === 0) {
    console.log("No entries in the catalog yet.");
    console.log("Use 'catalog add <name> <description>' to add one.");
    return;
  }
  console.log(`Catalog (${entries.length} entries):\n`);
  entries.forEach((entry) => {
    console.log(formatEntry(entry));
    console.log();
  });
}

function addEntry(args: string[]): void {
  if (args.length < 2) {
    console.error("Error: 'add' requires a name and description");
    console.error("Usage: catalog add <name> <description> [--in-stack] [--pressure-tested]");
    process.exit(1);
  }

  const name = args[0];
  const descriptionParts: string[] = [];
  let inCurrentStack = false;
  let pressureTested = false;

  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--in-stack") {
      inCurrentStack = true;
    } else if (arg === "--pressure-tested") {
      pressureTested = true;
    } else {
      descriptionParts.push(arg);
    }
  }

  const description = descriptionParts.join(" ");
  if (!description) {
    console.error("Error: Description cannot be empty");
    process.exit(1);
  }

  try {
    service.add({ name, description, inCurrentStack, pressureTested });
    console.log(`Added: ${name}`);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
}

function lookupEntry(name: string): void {
  if (!name) {
    console.error("Error: 'what' requires a name");
    console.error("Usage: catalog what <name>");
    process.exit(1);
  }

  const entry = service.findByName(name);
  if (!entry) {
    console.log(`"${name}" not found in the catalog.`);
    process.exit(1);
  }

  console.log();
  console.log(formatEntry(entry));
  console.log();
}

function main(): void {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    printUsage();
    process.exit(0);
  }

  const command = args[0];

  switch (command) {
    case "list":
      listEntries();
      break;
    case "add":
      addEntry(args.slice(1));
      break;
    case "what":
      lookupEntry(args[1]);
      break;
    case "help":
    case "--help":
    case "-h":
      printUsage();
      break;
    default:
      console.error(`Unknown command: ${command}`);
      printUsage();
      process.exit(1);
  }
}

main();
