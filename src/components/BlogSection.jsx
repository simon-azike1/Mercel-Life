import React, { useState, useEffect } from "react";
import { Calendar, Clock, ArrowRight, X, BookOpen, Heart, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTheme } from './ThemeContext';

export default function BlogSection() {
  const { isDarkMode } = useTheme();
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const blogPosts = [
    {
      id: 1,
      title: "Unwavering Devotion",
      excerpt: "A heartfelt poem about a mother's enduring love, faith, and the beauty of God's gift through her life.",
      content: `A world of longing, where wishes fade,
Where life's brevity leaves hearts unmade.
My mother, my guiding light, my all,
The one whose love stands tall.

In darkest times, she found a way,
To bring hope forth, day by day.
She taught me faith, despite our strife,
And showed me God's love is life.

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
      publishDate: "Sept 16, 2024",
      tags: ["Poem", "Mother", "Love", "Faith"],
      featured: true,
      stats: { views: 245, likes: 18 }
    },
    {
      id: 2,
      title: "Dreamland Solace",
      excerpt: "A poem reflecting on finding peace and comfort in dreams when life feels overwhelming.",
      content: `In slumber's depths, she finds reprieve,
Lost in dreams, troubles fade away,
Alone with thoughts, her heart does grieve,
As worries dissipate in a peaceful sway.

In this dreamland, melodies unfold,
A soothing balm for her troubled soul.
The breeze whispers secrets, calming her pain,
As she floats on a sea of sweet refrain.

Comforted, she lingers, reluctant to wake,
The moonless night her peaceful slumber makes.
But dawn's early call, the cock's loud cry,
Pierces the night, and she begins to sigh.

Jolted awake, reality's chill descends,
The dreamland's solace, her heart now mends.
Though brief, the respite, it brings a smile,
A fleeting peace, worth holding awhile.`,
      image: "https://cdn.pixabay.com/photo/2019/06/03/15/31/bible-4249164_1280.jpg",
      category: "Christian Poetry",
      readTime: "2 min read",
      publishDate: "Sept 12, 2024",
      tags: ["Faith", "Dreams", "Peace", "Hope"],
      featured: false,
      stats: { views: 189, likes: 12 }
    },
    {
      id: 3,
      title: "Beyond the Pain",
      excerpt: "A poem reflecting on how God's sustaining power holds us when we go through overwhelming troubles of this world.",
      content: `When shadows fall and hope seems lost,
And every step bears heavy cost,
Beyond the pain, a light still shines,
God's love transcends these earthly lines.

Through valleys deep and mountains high,
When tears fall down and spirits cry,
His gentle hand will guide the way,
Beyond the pain of yesterday.

The storms may rage, the winds may blow,
But in His love, we'll always know,
That every trial, every strain,
Leads us beyond the earthly pain.

So hold on tight when darkness falls,
And listen close when Jesus calls,
For in His grace, we'll rise again,
Forever free, beyond the pain.`,
      image: "https://cdn.pixabay.com/photo/2023/10/08/01/19/ai-generated-8301294_1280.png",
      category: "Christian Poetry",
      readTime: "2 min read",
      publishDate: "Sept 8, 2024",
      tags: ["Faith", "Healing", "Hope", "Strength"],
      featured: false,
      stats: { views: 156, likes: 9 }
    },
  ];

  // Handle modal opening with animation
  const openModal = (post) => {
    setSelectedPost(post);
    setTimeout(() => setIsModalVisible(true), 10);
    document.body.style.overflow = 'hidden';
  };

  // Handle modal closing with animation
  const closeModal = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      setSelectedPost(null);
      document.body.style.overflow = '';
    }, 300);
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedPost) {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [selectedPost]);

  return (
    <div className={`
      min-h-screen pt-20 transition-colors duration-300
      ${isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' 
        : 'bg-gradient-to-br from-gray-50 via-white to-green-50'
      }
    `}>
      <section id="blog" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Enhanced Header with Theme */}
          <div className="text-center mb-16 opacity-0 animate-fade-in-up">
            <div className="flex items-center justify-center mb-6">
              <div className={`
                p-4 rounded-full mr-4 transition-colors duration-300
                ${isDarkMode ? 'bg-green-400/20' : 'bg-green-100'}
              `}>
                <BookOpen className={`h-8 w-8 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
              </div>
              <h2 className={`
                text-4xl lg:text-6xl font-bold transition-colors duration-300
                ${isDarkMode ? 'text-white' : 'text-gray-900'}
              `}>
                Poems & <span className={`
                  bg-gradient-to-r bg-clip-text text-transparent
                  ${isDarkMode 
                    ? 'from-green-400 via-emerald-300 to-green-300' 
                    : 'from-green-600 via-green-500 to-emerald-600'
                  }
                `}>Writings</span>
              </h2>
            </div>
            
            <div className={`
              h-1 mx-auto rounded-full mb-6 animate-expand transition-colors duration-300
              ${isDarkMode 
                ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                : 'bg-gradient-to-r from-green-500 to-black'
              }
            `}></div>
            
            <p className={`
              text-xl max-w-3xl mx-auto leading-relaxed transition-colors duration-300
              ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
            `}>
              Heartfelt Christian poems and reflections that inspire faith, hope, and love.
            </p>
          </div>

          {/* Enhanced Posts Grid with Theme */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card 
                key={post.id} 
                className={`
                  group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 animate-fade-in-up
                  ${isDarkMode 
                    ? 'bg-gray-800/80 backdrop-blur-sm shadow-black/50 hover:shadow-black/70' 
                    : 'bg-white/80 backdrop-blur-sm shadow-gray-300/50 hover:shadow-gray-400/50'
                  }
                `}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Enhanced Gradient Overlay */}
                  <div className={`
                    absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    ${isDarkMode 
                      ? 'bg-gradient-to-t from-black/80 via-gray-900/20 to-transparent' 
                      : 'bg-gradient-to-t from-black/60 via-transparent to-transparent'
                    }
                  `}>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between text-white text-sm">
                        <div className="flex items-center space-x-3">
                          <span className={`
                            flex items-center px-2 py-1 rounded-full backdrop-blur-sm
                            ${isDarkMode ? 'bg-white/10' : 'bg-white/20'}
                          `}>
                            <Eye className="h-3 w-3 mr-1" />
                            {post.stats.views}
                          </span>
                          <span className={`
                            flex items-center px-2 py-1 rounded-full backdrop-blur-sm
                            ${isDarkMode ? 'bg-white/10' : 'bg-white/20'}
                          `}>
                            <Heart className="h-3 w-3 mr-1 text-red-400" />
                            {post.stats.likes}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge 
                      variant="secondary" 
                      className={`
                        font-medium backdrop-blur-sm border transition-colors duration-300
                        ${isDarkMode 
                          ? 'bg-gray-800/95 text-green-400 border-green-400/30' 
                          : 'bg-white/95 text-green-700 border-green-200'
                        }
                      `}
                    >
                      {post.category}
                    </Badge>
                  </div>

                  {/* Featured Badge */}
                  {post.featured && (
                    <div className="absolute top-4 right-4">
                      <Badge className={`
                        border-none animate-pulse
                        ${isDarkMode 
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black' 
                          : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                        }
                      `}>
                        ⭐ Featured
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-6">
                  {/* Meta Info */}
                  <div className={`
                    flex items-center gap-4 mb-3 text-sm transition-colors duration-300
                    ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
                  `}>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {post.publishDate}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readTime}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`
                    text-xl font-bold mb-3 transition-colors duration-300 line-clamp-2
                    ${isDarkMode 
                      ? 'text-white group-hover:text-green-400' 
                      : 'text-gray-900 group-hover:text-green-600'
                    }
                  `}>
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className={`
                    mb-4 text-sm leading-relaxed line-clamp-3 transition-colors duration-300
                    ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
                  `}>
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className={`
                          text-xs transition-colors duration-200
                          ${isDarkMode 
                            ? 'border-green-400/30 text-green-400 hover:bg-green-400/10' 
                            : 'border-green-200 text-green-600 hover:bg-green-50'
                          }
                        `}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Enhanced Read Button */}
                  <Button
                    variant="ghost"
                    className={`
                      w-full font-medium group-hover:shadow-lg transform hover:scale-105 transition-all duration-300
                      ${isDarkMode 
                        ? 'text-green-400 hover:bg-green-400 hover:text-black' 
                        : 'text-green-600 hover:bg-green-600 hover:text-white'
                      }
                    `}
                    onClick={() => openModal(post)}
                  >
                    Read Full Poem
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Enhanced Modal with Theme Support */}
          {selectedPost && (
            <div 
              className={`
                fixed inset-0 backdrop-blur-sm flex justify-center items-center p-4 z-50 transition-opacity duration-300
                ${isDarkMode ? 'bg-black/80' : 'bg-black/60'}
                ${isModalVisible ? 'opacity-100' : 'opacity-0'}
              `}
              onClick={closeModal}
            >
              <div 
                className={`
                  p-8 rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl transform transition-all duration-300
                  ${isDarkMode 
                    ? 'bg-gray-800 border border-gray-700 shadow-black/70' 
                    : 'bg-white shadow-gray-400/50'
                  }
                  ${isModalVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}
                `}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className={`
                  flex justify-between items-start mb-6 pb-4 border-b transition-colors duration-300
                  ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}
                `}>
                  <div className="flex-1 pr-4">
                    <h2 className={`
                      text-3xl font-bold mb-2 transition-colors duration-300
                      ${isDarkMode ? 'text-white' : 'text-gray-900'}
                    `}>
                      {selectedPost.title}
                    </h2>
                    <div className={`
                      flex items-center gap-4 text-sm transition-colors duration-300
                      ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
                    `}>
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {selectedPost.publishDate}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {selectedPost.readTime}
                      </span>
                      <Badge 
                        variant="secondary" 
                        className={`
                          transition-colors duration-300
                          ${isDarkMode 
                            ? 'bg-green-400/20 text-green-400' 
                            : 'bg-green-100 text-green-700'
                          }
                        `}
                      >
                        {selectedPost.category}
                      </Badge>
                    </div>
                  </div>
                  <button 
                    onClick={closeModal}
                    className={`
                      p-3 rounded-full transition-all duration-200 hover:scale-110 flex-shrink-0
                      ${isDarkMode 
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                      }
                    `}
                  >
                    <X size={20} />
                  </button>
                </div>
                
                {/* Modal Content */}
                <div className="prose prose-lg max-w-none">
                  <div className={`
                    whitespace-pre-line leading-relaxed font-serif text-lg transition-colors duration-300
                    ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}
                  `}>
                    {selectedPost.content}
                  </div>
                </div>
                
                {/* Modal Footer */}
                <div className={`
                  mt-8 pt-6 border-t transition-colors duration-300
                  ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}
                `}>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedPost.tags.map((tag, i) => (
                      <Badge 
                        key={i} 
                        variant="outline"
                        className={`
                          transition-colors duration-200
                          ${isDarkMode 
                            ? 'border-green-400/30 text-green-400 hover:bg-green-400/10' 
                            : 'border-green-200 text-green-600 hover:bg-green-50'
                          }
                        `}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className={`
                    flex items-center justify-between text-sm transition-colors duration-300
                    ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
                  `}>
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {selectedPost.stats.views} views
                      </span>
                      <span className="flex items-center">
                        <Heart className="h-4 w-4 mr-1 text-red-400" />
                        {selectedPost.stats.likes} likes
                      </span>
                    </div>
                    <span className={`
                      font-medium transition-colors duration-300
                      ${isDarkMode ? 'text-green-400' : 'text-green-600'}
                    `}>
                      Thank you for reading ✨
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes expand {
          from {
            width: 0;
          }
          to {
            width: 6rem;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-expand {
          animation: expand 1s ease-out 0.5s forwards;
          width: 0;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Custom scrollbar for modal */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: ${isDarkMode ? '#374151' : '#f1f5f9'};
          border-radius: 3px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: ${isDarkMode ? '#10b981' : '#059669'};
          border-radius: 3px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: ${isDarkMode ? '#34d399' : '#047857'};
        }
      `}</style>
    </div>
  );
}
