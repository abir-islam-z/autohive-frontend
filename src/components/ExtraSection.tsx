import { Card, CardContent } from "./ui/card"

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    text: "I found my dream car on this website. The process was smooth and the customer service was excellent!",
  },
  {
    id: 2,
    name: "Jane Smith",
    text: "Great selection of cars and competitive prices. I highly recommend this platform to anyone looking for a new vehicle.",
  },
  {
    id: 3,
    name: "Mike Johnson",
    text: "The detailed product information and high-quality images made it easy for me to make an informed decision.",
  },
]

export default function ExtraSection() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">&quot;{testimonial.text}&quot;</p>
                <p className="font-semibold">{testimonial.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

