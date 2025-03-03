
import TestimonialItem from "./TestimonialItem";

const TestimonialsSection = () => {
  const testimonials = [
    {
      content: "This platform completely transformed how we manage customer relationships. Our retention rate increased by 35% in just three months.",
      author: "Sarah Johnson",
      role: "Customer Success Manager",
      rating: 5
    },
    {
      content: "The insights we gained helped us identify at-risk customers before they churned. Game changer for our subscription business.",
      author: "Michael Chen",
      role: "Marketing Director",
      rating: 5
    },
    {
      content: "Implementing the recommended strategies reduced our churn rate by 28%. The ROI has been incredible for our business growth.",
      author: "Emily Rodriguez",
      role: "CEO",
      rating: 4
    }
  ];

  return (
    <section className="py-16 md:py-20 px-4 bg-gradient-to-b from-background to-secondary/30">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto px-4">
            Don't just take our word for it. See how our platform has helped businesses like yours.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialItem
              key={index}
              content={testimonial.content}
              author={testimonial.author}
              role={testimonial.role}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
