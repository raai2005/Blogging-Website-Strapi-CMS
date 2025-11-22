import Hero from "./components/Hero";
import FeaturedPost from "./components/FeaturedPost";
import RecentPosts from "./components/RecentPosts";
import CategoryBrowse from "./components/CategoryBrowse";
import Newsletter from "./components/Newsletter";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Hero />
      <FeaturedPost />
      <RecentPosts />
      <CategoryBrowse />
      <Newsletter />
    </div>
  );
}
