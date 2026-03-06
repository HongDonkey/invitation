import { PostFrontmatter } from "@/features/posts/types/post";
import { promises as fs } from "fs";
import { evaluate } from "next-mdx-remote-client/rsc";
import path from "path";
import { PostsGrid } from "@/components/posts/posts-grid";


async function getPostImages(slug: string) {
  const dir = path.join(process.cwd(), "public/images", slug);

  try {
    const files = await fs.readdir(dir);

    return files
      .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((file) => `/images/${slug}/${file}`);
  } catch {
    return [];
  }
}

const PostsPage = async() => {
   const postFileNames = await fs.readdir(path.join(process.cwd(), "src/data/posts"));
 
  const posts = await Promise.all(
    postFileNames
      .filter((filename) => filename.endsWith(".mdx"))
      .map(async (filename, index) => {
        const slug = filename.replace(".mdx", "");
        const content = await fs.readFile(path.join(process.cwd(), "src/data/posts", filename), "utf-8");
        const { frontmatter } = await evaluate<PostFrontmatter>({
          source: content,
          options: {
            parseFrontmatter: true,
          },
        });

        const images = await getPostImages(slug);

        return {
          id: index,
          path: "/posts/" + slug,
          images,
          ...frontmatter,
        };
      }),
  );

    return (
    <div className="container mx-auto py-8 px-3">
      <h1 className="text-3xl font-bold mb-8">블로그 포스트</h1>
      <PostsGrid posts={posts} />
    </div>
  );
}
export default PostsPage