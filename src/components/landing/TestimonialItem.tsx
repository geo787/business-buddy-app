
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialItemProps {
  content: string;
  author: string;
  role: string;
  avatar?: string;
  rating: number;
}

const TestimonialItem = ({ content, author, role, avatar, rating }: TestimonialItemProps) => {
  return (
    <Card className="h-full">
      <CardContent className="p-4 sm:p-6 flex flex-col h-full">
        <div className="flex mb-3 sm:mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 sm:h-5 sm:w-5 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} 
            />
          ))}
        </div>
        
        <blockquote className="text-sm sm:text-base md:text-lg italic mb-4 sm:mb-6 flex-grow line-clamp-6">"{content}"</blockquote>
        
        <div className="flex items-center mt-auto">
          <Avatar className="h-8 w-8 sm:h-10 sm:w-10 mr-2 sm:mr-3">
            {avatar ? (
              <AvatarImage src={avatar} alt={author} />
            ) : (
              <AvatarFallback>{author.charAt(0)}</AvatarFallback>
            )}
          </Avatar>
          <div>
            <div className="font-semibold text-sm sm:text-base">{author}</div>
            <div className="text-xs sm:text-sm text-muted-foreground">{role}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialItem;
