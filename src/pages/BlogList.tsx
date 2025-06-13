import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useBlog } from "@/context/BlogContext";
import { useAuth } from "@/context/AuthContext";
import { Search, Plus, Calendar, User, BookOpen } from "lucide-react";

const BLOGS_PER_PAGE = 6;

const BlogList = () => {
  const { blogs } = useBlog();
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.isPublished &&
      (blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${blog.author.firstName} ${blog.author.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE);
  const startIndex = (currentPage - 1) * BLOGS_PER_PAGE;
  const paginatedBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + BLOGS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset to first page when search term changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              Blog Posts
            </h1>
            <p className="text-gray-600 text-sm md:text-base lg:text-lg max-w-2xl">
              Discover insights and stories from our creative community
            </p>
          </div>

          {isAuthenticated && (
            <Link to="/create-blog" className="w-full lg:w-auto">
              <Button className="w-full lg:w-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Plus className="h-4 w-4 mr-2" />
                Write Blog
              </Button>
            </Link>
          )}
        </div>

        {/* Search Section */}
        <div className="relative mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400 h-5 w-5" />
            <Input
              placeholder="Search blogs, authors, or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 text-base border-orange-200 focus:border-orange-400 focus:ring-orange-400 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm"
            />
          </div>
        </div>

        {/* Results count */}
        {filteredBlogs.length > 0 && (
          <div className="mb-6 text-center">
            <p className="text-sm text-gray-600">
              Showing {startIndex + 1}-
              {Math.min(startIndex + BLOGS_PER_PAGE, filteredBlogs.length)} of{" "}
              {filteredBlogs.length} blog{filteredBlogs.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}

        {/* Blog Grid */}
        {paginatedBlogs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 mb-8">
              {paginatedBlogs.map((blog) => (
                <Card
                  key={blog.id}
                  className="group relative bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] rounded-2xl overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,237,213,0.6) 100%)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                  }}
                >
                  {/* Glossy overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-orange-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"></div>

                  <CardHeader className="relative z-10 pb-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <Avatar className="h-12 w-12 md:h-14 md:w-14 border-3 border-orange-200 shadow-lg">
                        <AvatarFallback className="bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold text-lg">
                          {blog.author.firstName.charAt(0)}
                          {blog.author.lastName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm md:text-base font-semibold text-gray-800 truncate">
                          {blog.author.firstName} {blog.author.lastName}
                        </p>
                        <p className="text-xs md:text-sm text-orange-600 flex items-center mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(blog.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                    <CardTitle className="text-lg md:text-xl lg:text-2xl line-clamp-2 text-gray-800 group-hover:text-orange-700 transition-colors duration-300">
                      {blog.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="relative z-10 pt-0">
                    <CardDescription className="text-sm md:text-base line-clamp-3 mb-6 text-gray-600 leading-relaxed">
                      {blog.content}
                    </CardDescription>

                    <div className="flex justify-between items-center">
                      <Badge
                        variant="secondary"
                        className="bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 border-0 px-3 py-1 rounded-full font-medium"
                      >
                        <BookOpen className="h-3 w-3 mr-1" />
                        Published
                      </Badge>
                      <Link to={`/blog/${blog.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-orange-300 text-orange-600 hover:bg-orange-50 hover:border-orange-400 transition-all duration-300 rounded-full px-4"
                        >
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination>
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => handlePageChange(currentPage - 1)}
                          className="cursor-pointer hover:bg-orange-50"
                        />
                      </PaginationItem>
                    )}

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => handlePageChange(page)}
                            isActive={currentPage === page}
                            className={`cursor-pointer ${
                              currentPage === page
                                ? "bg-orange-500 text-white hover:bg-orange-600"
                                : "hover:bg-orange-50"
                            }`}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}

                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationNext
                          onClick={() => handlePageChange(currentPage + 1)}
                          className="cursor-pointer hover:bg-orange-50"
                        />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 md:py-24">
            <div className="max-w-md mx-auto">
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-orange-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                No blogs found
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm
                  ? "Try adjusting your search terms to find what you're looking for."
                  : "Be the first to share your story with our community!"}
              </p>
              {!searchTerm && isAuthenticated && (
                <Link to="/create-blog">
                  <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                    <Plus className="h-4 w-4 mr-2" />
                    Write Your First Blog
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
