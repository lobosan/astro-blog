import fs from "node:fs";
import path from "node:path";

const POSTS_DIR = path.join(process.cwd(), "src/content/posts");
const files = fs.readdirSync(POSTS_DIR);

for (const file of files) {
  if (file.endsWith(".mdx")) {
    const filePath = path.join(POSTS_DIR, file);
    const data = fs.readFileSync(filePath, "utf8");
    if (/vfConversations:\s*true/.test(data)) {
      const updatedData = data.replace(/vfContainerId:\s*(\d+)/, (_, p1) => {
        const newId = Number.parseInt(p1, 10) + 1;
        console.log(`Updated vfContainerId for ${file} to ${newId}`);
        return `vfContainerId: ${newId}`;
      });
      fs.writeFileSync(filePath, updatedData, "utf8");
    }
  }
}
