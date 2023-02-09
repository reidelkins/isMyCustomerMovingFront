import { useEffect, useState } from "react";
// import { PostCard, PostWidget } from "../components/BlogComponents";
import PostCard from "../components/BlogComponents/PostCard";
import PostWidget from "../components/BlogComponents/PostWidget";
import { getPosts } from "./api/posts";

export default function BlogPage() {
  const [posts, setPosts] = useState<any>([]);
  useEffect(() => {
    getPosts().then((result: any) => {
      setPosts(result);
    });
  }, []);
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post: any, index: any) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget slug="" />
          </div>
        </div>
      </div>
    </div>
  );
}
