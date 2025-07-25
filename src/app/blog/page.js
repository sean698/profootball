// File: app/blog/page.jsx

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function BlogPage() {
  return (
    <div className="bg-[#ECCE8B] min-h-screen font-['DM Sans']">
      <Nav />

      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-4 text-black">
          Letter From the Editor
        </h1>

        <div className="w-full h-64 relative mb-6">
          <Image
            src="/images/editor-placeholder.jpg"
            alt="Editor Header"
            layout="fill"
            objectFit="cover"
            className="rounded-md"
            placeholder="blur"
            blurDataURL="/images/editor-placeholder.jpg"
          />
        </div>

        <p className="text-sm text-gray-600 mb-2 text-right">By Rob Croley</p>

        <article className="prose lg:prose-lg text-black">
          <p>
            Welcome to the first edition of our new blog here at Pro Football
            Report. Each week, I'll be sharing thoughts, insights, and behind-the-scenes
            details from our newsroom.
          </p>

          <p>
            Whether you're a diehard NFL fan or just enjoy catching up on highlights,
            we hope this space offers a more personal connection to the people
            behind the content you read every day.
          </p>

          <p>
            Stay tuned — much more to come.
          </p>
        </article>
      </main>

      <Footer />
    </div>
  );
}
