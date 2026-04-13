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
  --category <slug>     Category slug (e.g., models, dev-environments)
  --tag <tag>           Add a tag (can be specified multiple times)
  --evaluating          Mark as currently being evaluated
  --planned             Mark as planned for future evaluation
  --notes <text>        Add personal notes or experience
  --replaced-by <name>  Tool that replaced this one
  --replacement-reason <text> Why the switch was made

Options for 'category':
  catalog category list                           List all categories
  catalog category add <id> <name> <description>  Add a new category
  catalog list --category <slug>                  List entries in a category

Examples:
  catalog add "Claude" "An AI assistant made by Anthropic"
  catalog add "Goose" "Local AI agent" --planned --website https://block.github.io/goose
  catalog update "Goose" --pressure-tested --replaced-by "Gemini CLI" --replacement-reason "Crashed during test"
  catalog what "Claude"
  catalog list
`);
}

function formatEntry(entry: CatalogEntry): string {
  const flags = [];
  if (entry.inCurrentStack) flags.push("in-stack");
  if (entry.pressureTested) flags.push("pressure-tested");
  if (entry.evaluating) flags.push("evaluating");
  if (entry.planned) flags.push("planned");
  const flagStr = flags.length > 0 ? ` [${flags.join(", ")}]` : "";

  let output = `${entry.name}${flagStr}\n  ${entry.description}`;
  if (entry.category) {
    output += `\n  Category: ${entry.category}`;
  }
  if (entry.tags && entry.tags.length > 0) {
    output += `\n  Tags: ${entry.tags.join(", ")}`;
  }
  if (entry.replacedBy) {
    output += `\n  Replaced by: ${entry.replacedBy}`;
  }
  if (entry.replacementReason) {
    output += `\n  Reason: ${entry.replacementReason}`;
  }
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
  if (entry.notes) {
    output += `\n  Notes: ${entry.notes}`;
  }
  return output;
}

function listEntries(): void {
  let entries = service.list();
  
  const categoryIndex = process.argv.indexOf("--category");
  if (categoryIndex > -1 && process.argv[categoryIndex + 1]) {
    const category = process.argv[categoryIndex + 1];
    entries = entries.filter(e => e.category === category);
    console.log(`Category: ${category} (${entries.length} entries)\n`);
  } else {
    console.log(`Catalog (${entries.length} entries):\n`);
  }
  
  if (entries.length === 0) {
    console.log("No entries found.");
    return;
  }
  entries.forEach((entry) => {
    console.log(formatEntry(entry));
    console.log();
  });
}

function listCategories(): void {
  const categories = service.listCategories();
  if (categories.length === 0) {
    console.log("No categories defined yet.");
    console.log("Use 'catalog category add <id> <name> <description>' to add one.");
    return;
  }
  console.log(`Categories (${categories.length}):\n`);
  categories.forEach((cat) => {
    const count = service.list().filter(e => e.category === cat.id).length;
    console.log(`${cat.id}`);
    console.log(`  Name: ${cat.name}`);
    console.log(`  Description: ${cat.description}`);
    console.log(`  Entries: ${count}`);
    console.log();
  });
}

function addCategory(args: string[]): void {
  if (args.length < 3) {
    console.error("Error: 'category add' requires an id, name, and description");
    console.error("Usage: catalog category add <id> <name> <description>");
    process.exit(1);
  }
  const [id, name, ...descParts] = args;
  const description = descParts.join(" ");
  
  try {
    service.addCategory({ id, name, description });
    console.log(`Added category: ${id}`);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
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
  let evaluating = false;
  let planned = false;
  let websiteUrl: string | undefined;
  let pricingUrl: string | undefined;
  let affiliateUrl: string | undefined;
  let apiUrl: string | undefined;
  let category: string | undefined;
  let tags: string[] = [];
  let notes: string | undefined;
  let replacedBy: string | undefined;
  let replacementReason: string | undefined;

  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--in-stack") {
      inCurrentStack = true;
    } else if (arg === "--pressure-tested") {
      pressureTested = true;
    } else if (arg === "--evaluating") {
      evaluating = true;
    } else if (arg === "--planned") {
      planned = true;
    } else if (arg === "--website" && args[i + 1]) {
      websiteUrl = args[++i];
    } else if (arg === "--pricing" && args[i + 1]) {
      pricingUrl = args[++i];
    } else if (arg === "--affiliate" && args[i + 1]) {
      affiliateUrl = args[++i];
    } else if (arg === "--api" && args[i + 1]) {
      apiUrl = args[++i];
    } else if (arg === "--category" && args[i + 1]) {
      category = args[++i];
    } else if (arg === "--tag" && args[i + 1]) {
      tags.push(args[++i]);
    } else if (arg === "--notes" && args[i + 1]) {
      notes = args[++i];
    } else if (arg === "--replaced-by" && args[i + 1]) {
      replacedBy = args[++i];
    } else if (arg === "--replacement-reason" && args[i + 1]) {
      replacementReason = args[++i];
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
    service.add({
      name,
      description,
      inCurrentStack,
      pressureTested,
      evaluating,
      planned,
      websiteUrl,
      pricingUrl,
      affiliateUrl,
      apiUrl,
      category,
      tags: tags.length > 0 ? tags : undefined,
      notes,
      replacedBy,
      replacementReason,
    });
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
    } else if (arg === "--evaluating") {
      updates.evaluating = true;
    } else if (arg === "--planned") {
      updates.planned = true;
    } else if (arg === "--website" && args[i + 1]) {
      updates.websiteUrl = args[++i];
    } else if (arg === "--pricing" && args[i + 1]) {
      updates.pricingUrl = args[++i];
    } else if (arg === "--affiliate" && args[i + 1]) {
      updates.affiliateUrl = args[++i];
    } else if (arg === "--api" && args[i + 1]) {
      updates.apiUrl = args[++i];
    } else if (arg === "--category" && args[i + 1]) {
      updates.category = args[++i];
    } else if (arg === "--tag" && args[i + 1]) {
      if (!updates.tags) updates.tags = [];
      updates.tags.push(args[++i]);
    } else if (arg === "--description" && args[i + 1]) {
      updates.description = args[++i];
    } else if (arg === "--notes" && args[i + 1]) {
      updates.notes = args[++i];
    } else if (arg === "--replaced-by" && args[i + 1]) {
      updates.replacedBy = args[++i];
    } else if (arg === "--replacement-reason" && args[i + 1]) {
      updates.replacementReason = args[++i];
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
    case "category":
      if (args[1] === "list") {
        listCategories();
      } else if (args[1] === "add") {
        addCategory(args.slice(2));
      } else {
        console.error("Unknown category command. Use 'list' or 'add'.");
        console.error("Usage: catalog category list");
        console.error("       catalog category add <id> <name> <description>");
        process.exit(1);
      }
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
