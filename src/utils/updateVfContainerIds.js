import fs from "fs";
import path from "path";
import { cwd } from "process";

const POSTS_DIR = path.join(cwd(), "src/content/posts");
const files = fs.readdirSync(POSTS_DIR);

files.forEach(file => {
  if (file.endsWith(".mdx")) {
    const filePath = path.join(POSTS_DIR, file);
    const data = fs.readFileSync(filePath, "utf8");
    if (/vfConversations:\s*true/.test(data)) {
      const updatedData = data.replace(/vfContainerId:\s*(\d+)/, (_, p1) => {
        const newId = parseInt(p1, 10) + 1;
        // eslint-disable-next-line no-undef
        console.log(`Updated vfContainerId for ${file} to ${newId}`);
        return `vfContainerId: ${newId}`;
      });
      fs.writeFileSync(filePath, updatedData, "utf8");
    }
  }
});
