"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { PostModal } from "./post-modal";
import { evaluate, EvaluateOptions } from "next-mdx-remote-client/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkFlexibleToc, { type TocItem } from "remark-flexible-toc";
import { mdxComponents } from "@/features/posts/components/mdx-components";
import { PostFrontmatter } from "@/features/posts/types/post";
import { PostHeader } from "@/features/posts/components/post-header";
import { TableOfContents } from "@/features/posts/components/table-of-contents";
import { cn } from "@/lib/utils";
import ImageSlider from "@/components/image-slider"

interface Post extends PostFrontmatter {
  id: number;
  path: string;
  images?: string[];
}

interface PostsGridProps {
  posts: Post[];
}

type Scope = {
  toc?: TocItem[];
};

interface RenderedContent {
  frontmatter: PostFrontmatter;
  content: React.ReactNode;
  toc?: TocItem[];
}

export function PostsGrid({ posts }: PostsGridProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [renderedContent, setRenderedContent] = useState<RenderedContent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(false);

  const handleCardClick = async (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/posts/${post.path.split("/").pop()}`);
      console.log("API Response:", response);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error Data:", errorData);
        throw new Error(errorData.details || errorData.error || "Failed to load post");
      }

      const { content } = await response.json();

      const options: EvaluateOptions = {
        mdxOptions: {
          remarkPlugins: [remarkFlexibleToc],
          rehypePlugins: [
            rehypePrettyCode,
            rehypeSlug,
            [
              rehypeAutolinkHeadings,
              {
                behavior: "wrap",
                properties: { className: ["heading-link"], ariaLabel: "Link to this heading" },
              },
            ],
          ],
        },
        parseFrontmatter: true,
        vfileDataIntoScope: "toc",
      };

      const { content: evaluatedContent, frontmatter, scope } = await evaluate<PostFrontmatter, Scope>({
        source: content,
        options,
        components: mdxComponents,
      });

      setRenderedContent({
        frontmatter,
        content: evaluatedContent,
        toc: scope?.toc,
      });
    } catch (error) {
      console.error("Failed to load post:", error);
      setError("포스트를 불러올 수 없습니다.");
      setRenderedContent(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
    setRenderedContent(null);
    setError(null);
    setShowContent(false);
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <button
            key={post.id}
            onClick={() => handleCardClick(post)}
            className="text-left hover:outline-none focus:outline-none transition-all"
          >
            <Card className="hover:border-amber-500 h-full flex flex-col overflow-hidden rounded-xl cursor-pointer hover:shadow-lg transition-shadow">
              {post.thumbnail && (
                <div>
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    width={800}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{post.category}</span>
                  <span>{post.date}</span>
                </div>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>

      <PostModal isOpen={isModalOpen} onClose={handleCloseModal}>
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto mb-4"></div>
              <p>포스트를 불러오는 중...</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[65vh]">
            <div
              className="flip-container w-full h-full"
            >
              <div className={`flip-card-inner ${showContent ? "flipped" : ""}`} >
                <div className={cn("flip-card-front flex items-center justify-center h-full", showContent ? "pointer-events-none cursor-default" : "cursor-pointer"
             )} onClick={() => setShowContent((prev) => !prev)}>
                  {selectedPost?.thumbnail ? (
                    // <Image
                    //   src={selectedPost.thumbnail}
                    //   alt={selectedPost.title}
                    //   width={800}
                    //   height={600}
                    //   className="max-w-[500px] max-h-[60vh] object-contain rounded-lg"
                      
                    // />
                    <ImageSlider images={selectedPost.images ?? [selectedPost.thumbnail]} />
                  ) : (
                    <p className="text-red-500">{error}</p>
                  )}
                </div>
                <div className={cn("flip-card-back flex flex-col h-full cursor-default")}>
                <div className="sticky top-0 z-10 bg-white dark:bg-slate-950 px-6 py-3 border-b">
                    <button
                    onClick={() => setShowContent(false)}
                    className="cursor-pointer px-3 py-1 bg-amber-500 text-white rounded-lg text-sm hover:bg-amber-600 transition"
                  >
                    이미지로 돌아가기
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  {renderedContent ? (
                    <div className="mt-4 flex gap-6">
                      <div className="flex-1">
                        <PostHeader frontmatter={renderedContent.frontmatter} />
                        {renderedContent.content}
                      </div>
                      <aside className="w-56 flex-shrink-0 hidden lg:block">
                        {renderedContent.toc && <TableOfContents toc={renderedContent.toc} />}
                      </aside>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center min-h-96">
                      <p className="text-red-500">{error}</p>
                    </div>
                  )}
                </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </PostModal>
    </>
  );
}
