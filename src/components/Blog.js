const BlogCard = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <div className="mb-4 overflow-hidden rounded-lg aspect-video">
        <img
          src="https://via.placeholder.com/600x300.png?text=Blog+Image+Placeholder"
          alt="Blog Placeholder"
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>
      <h2 className="text-xl font-bold text-black mb-1">Letter From the Editor</h2>
      <p className="text-gray-600 text-sm mb-2">By Rob Croley</p>
      <p className="text-gray-800 text-sm line-clamp-4">
        In this week’s letter, we reflect on the shifting narratives surrounding the NFL’s preseason and how team dynamics are evolving. Stay tuned for deeper insights and exclusive commentary.
      </p>
    </div>
  );
};

export default BlogCard;
