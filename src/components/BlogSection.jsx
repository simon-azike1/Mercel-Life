import { useState } from "react";
import { Calendar, Clock, ArrowRight, BookOpen, TrendingUp, Users, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState(null);

  const blogPosts = [
    {
      id: 1,
      title: "Unwavering Devotion",
      excerpt:
        "A heartfelt poem about a mother’s enduring love, faith, and the beauty of God’s gift through her life.",
      content: `A world of longing, where wishes fade,
Where life’s brevity leaves hearts unmade.
My mother, my guiding light, my all,
The one whose love stands tall.

In darkest times, she found a way,
To bring hope forth, day by day.
She taught me faith, despite our strife,
And showed me God’s love is life.

Your role, dear mother, etched in my heart,
Uncommon love, a work of art.
Your care, a treasure to behold,
Unspeakable, yet forever told.

The pain of birth, a memory so dear,
The love that followed, pure, sincere.
I pray to God, with a grateful soul,
To preserve your life, make it whole.`,
      image: "https://cdn.pixabay.com/photo/2016/04/05/03/18/prayer-1308663_1280.jpg",
      category: "Poetry",
      readTime: "3 min read",
      publishDate: "Sept 16, 2025",
      tags: ["Poem", "Mother", "Love", "Faith"],
      featured: true,
    },
    {
      id: 2,
      title: "Dreamland solace",
      excerpt:
        "A poem reflecting on God’s sustaining power when life feels overwhelming.",
      content: `In slumber’s depths, she finds reprieve,

Lost in dreams, troubles fade away,

Alone with thoughts, her heart does grieve.

As worries dissipate in a peaceful sway.

In this dreamland, melodies unfold,

A soothing balm for her troubled soul.

The breeze whispers secrets, calming her pain,

As she floats on a sea of sweet refrain.

Comforted, she lingers, reluctant to wake,

The moonless night her peaceful slumber makes.

But dawn’s early call, the cock’s loud cry,

Pierces the night, and she begins to sigh.

Jolted awake, reality’s chill descends,

The dreamland’s solace, her heart now mends.

Though brief, the respite, it brings a smile,

A fleeting peace, worth holding awhile.`,
      image: "https://cdn.pixabay.com/photo/2019/06/03/15/31/bible-4249164_1280.jpg",
      category: "Christian Poem",
      readTime: "2 min read",
      publishDate: "Sept 12, 2025",
      tags: ["Faith", "Poem", "Hope"],
      featured: false,
    },
    {
      id: 2,
      title: "Beyond the pain",
      excerpt:
       "A poem reflecting on how God’s sustaining power holds us when lives when we go through overwhelming trubles of this world.",
      content: `In slumber’s depths, she finds reprieve,

Lost in dreams, troubles fade away,

Alone with thoughts, her heart does grieve.

As worries dissipate in a peaceful sway.

In this dreamland, melodies unfold,

A soothing balm for her troubled soul.

The breeze whispers secrets, calming her pain,

As she floats on a sea of sweet refrain.

Comforted, she lingers, reluctant to wake,

The moonless night her peaceful slumber makes.

But dawn’s early call, the cock’s loud cry,

Pierces the night, and she begins to sigh.

Jolted awake, reality’s chill descends,

The dreamland’s solace, her heart now mends.

Though brief, the respite, it brings a smile,

A fleeting peace, worth holding awhile.`,
      image: "https://cdn.pixabay.com/photo/2023/10/08/01/19/ai-generated-8301294_1280.png",
      category: "Christian Poem",
      readTime: "2 min read",
      publishDate: "Sept 12, 2025",
      tags: ["Faith", "Poem", "Hope"],
      featured: false,
    },
  ];

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Poems & Writings
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Sharing heartfelt Christian poems, devotionals, and reflections that inspire faith and love.
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-green-700">
                    {post.category}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {post.publishDate}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors cursor-pointer line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-700 mb-4 text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <Button
                  variant="ghost"
                  className="w-full text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300"
                  onClick={() => setSelectedPost(post)}
                >
                  Read Full Poem
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modal for full content */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full p-6 relative overflow-y-auto max-h-[90vh]">
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-green-600"
                onClick={() => setSelectedPost(null)}
              >
                <X className="h-6 w-6" />
              </button>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                {selectedPost.title}
              </h2>
              <div className="text-sm text-gray-500 mb-6">
                {selectedPost.publishDate} • {selectedPost.readTime}
              </div>
              <p className="whitespace-pre-line text-gray-800 leading-relaxed">
                {selectedPost.content}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
