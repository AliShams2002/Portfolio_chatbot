import { readFile } from "node:fs/promises";
import path from "node:path";

export async function getPortfolioContent(): Promise<string> {
  const portfolioPath = path.join(process.cwd(), "content", "portfolio.md");
  return readFile(portfolioPath, "utf8");
}
