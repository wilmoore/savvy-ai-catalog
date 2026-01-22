/**
 * A catalog entry represents a "thing encountered in modern work."
 *
 * Each entry captures exactly four attributes per the product brief.
 * The catalog is descriptive, not prescriptive - it records exposure
 * and experience, not judgment.
 */
export interface CatalogEntry {
  /**
   * The commonly used name.
   * No renaming or branding spin.
   */
  name: string;

  /**
   * One plain-language sentence explaining what it is.
   * Boring and clear beats clever.
   */
  description: string;

  /**
   * Whether the tool or concept is actively part of the creator's working setup.
   */
  inCurrentStack: boolean;

  /**
   * Whether it has been used in real work with real stakes.
   * Not demos, reading, or hype exposure.
   */
  pressureTested: boolean;

  /**
   * The primary website URL for the tool or concept.
   */
  websiteUrl?: string;

  /**
   * URL to pricing information, if applicable.
   */
  pricingUrl?: string;

  /**
   * Affiliate program URL, if applicable.
   */
  affiliateUrl?: string;

  /**
   * API documentation URL, if applicable.
   */
  apiUrl?: string;

  /**
   * Name of the tool that replaced this one in the stack.
   * Implies this tool was previously in the stack.
   */
  replacedBy?: string;

  /**
   * Why the switch was made to the replacement tool.
   */
  replacementReason?: string;
}

/**
 * The catalog is a collection of entries.
 */
export type Catalog = CatalogEntry[];
