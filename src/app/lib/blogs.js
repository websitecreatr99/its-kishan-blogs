import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export function getAllPosts() {
  return fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        frontMatter: {
          title: data.title || slug,
          description: data.description || "",
          publishedAt: data.publishedAt || new Date().toISOString(),
          updatedAt: data.updatedAt || data.publishedAt || new Date().toISOString(),
          image: data.image || null,
          author: data.author || null,
          tags: data.tags || [],
        },
      };
    });
}

export function getPostBySlug(slug) {
  const fullPath = path.join(contentDir, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    frontMatter: data,
    content,
  };
}
