
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
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              className={`h-5 w-5 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} 
            />
          ))}
        </div>
        
        <blockquote className="text-lg italic mb-6 flex-grow">"{content}"</blockquote>
        
        <div className="flex items-center mt-auto">
          <Avatar className="h-10 w-10 mr-3">
            {avatar ? (
              <AvatarImage src={avatar} alt={author} />
            ) : (
              <AvatarFallback>{author.charAt(0)}</AvatarFallback>
            )}
          </Avatar>
          <div>
            <div className="font-semibold">{author}</div>
            <div className="text-sm text-muted-foreground">{role}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialItem;
