#!/usr/bin/env node
import { createCatalogService } from "./catalog.js";
import type { CatalogEntry } from "./types.js";

const service = createCatalogService();

function printUsage(): void {
  console.log(`
Savvy AI Catalog - A neutral reference for AI tools and terms

Usage:
  catalog list                                    List all entries
  catalog add <name> <description> [options]      Add a new entry
  catalog update <name> [options]                 Update an existing entry
  catalog what <name>                             Look up an entry by name

Options for 'add' and 'update':
  --in-stack            Mark as part of current working setup
  --pressure-tested     Mark as used in real work with real stakes
  --website <url>       Primary website URL
  --pricing <url>       Pricing page URL
  --affiliate <url>     Affiliate program URL
  --api <url>           API documentation URL
  --description <text>  Update the description (update only)

Examples:
  catalog add "Claude" "An AI assistant made by Anthropic"
  catalog add "TypeScript" "A typed superset of JavaScript" --in-stack --pressure-tested
  catalog add "Artisan" "AI-powered SDR platform" --website https://artisan.co --affiliate https://artisan.co/affiliates
  catalog update "Artisan" --affiliate https://artisan.co/affiliates
  catalog what "Claude"
  catalog list
`);
}

function formatEntry(entry: CatalogEntry): string {
  const flags = [];
  if (entry.inCurrentStack) flags.push("in-stack");
  if (entry.pressureTested) flags.push("pressure-tested");
  const flagStr = flags.length > 0 ? ` [${flags.join(", ")}]` : "";

  let output = `${entry.name}${flagStr}\n  ${entry.description}`;
  if (entry.websiteUrl) {
    output += `\n  Website: ${entry.websiteUrl}`;
  }
  if (entry.pricingUrl) {
    output += `\n  Pricing: ${entry.pricingUrl}`;
  }
  if (entry.affiliateUrl) {
    output += `\n  Affiliate: ${entry.affiliateUrl}`;
  }
  if (entry.apiUrl) {
    output += `\n  API: ${entry.apiUrl}`;
  }
  return output;
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
    console.error("Usage: catalog add <name> <description> [options]");
    process.exit(1);
  }

  const name = args[0];
  const descriptionParts: string[] = [];
  let inCurrentStack = false;
  let pressureTested = false;
  let websiteUrl: string | undefined;
  let pricingUrl: string | undefined;
  let affiliateUrl: string | undefined;
  let apiUrl: string | undefined;

  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--in-stack") {
      inCurrentStack = true;
    } else if (arg === "--pressure-tested") {
      pressureTested = true;
    } else if (arg === "--website" && args[i + 1]) {
      websiteUrl = args[++i];
    } else if (arg === "--pricing" && args[i + 1]) {
      pricingUrl = args[++i];
    } else if (arg === "--affiliate" && args[i + 1]) {
      affiliateUrl = args[++i];
    } else if (arg === "--api" && args[i + 1]) {
      apiUrl = args[++i];
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
    service.add({ name, description, inCurrentStack, pressureTested, websiteUrl, pricingUrl, affiliateUrl, apiUrl });
    console.log(`Added: ${name}`);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
}

function updateEntry(args: string[]): void {
  if (args.length < 2) {
    console.error("Error: 'update' requires a name and at least one option");
    console.error("Usage: catalog update <name> [options]");
    process.exit(1);
  }

  const name = args[0];
  const updates: Partial<CatalogEntry> = {};

  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--in-stack") {
      updates.inCurrentStack = true;
    } else if (arg === "--pressure-tested") {
      updates.pressureTested = true;
    } else if (arg === "--website" && args[i + 1]) {
      updates.websiteUrl = args[++i];
    } else if (arg === "--pricing" && args[i + 1]) {
      updates.pricingUrl = args[++i];
    } else if (arg === "--affiliate" && args[i + 1]) {
      updates.affiliateUrl = args[++i];
    } else if (arg === "--api" && args[i + 1]) {
      updates.apiUrl = args[++i];
    } else if (arg === "--description" && args[i + 1]) {
      updates.description = args[++i];
    }
  }

  if (Object.keys(updates).length === 0) {
    console.error("Error: At least one option must be provided");
    console.error("Usage: catalog update <name> [--description <text>] [--website <url>] [--pricing <url>] [--affiliate <url>]");
    process.exit(1);
  }

  try {
    service.update(name, updates);
    console.log(`Updated: ${name}`);
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
    case "update":
      updateEntry(args.slice(1));
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
