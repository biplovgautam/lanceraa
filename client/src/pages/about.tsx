import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen pt-16">
      <section className="container py-24">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">About TASKURE</h1>
            <p className="text-muted-foreground text-lg">
              Connecting talented professionals with amazing opportunities
            </p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf"
            alt="Team collaboration"
            className="rounded-lg w-full aspect-video object-cover"
          />

          <div className="prose prose-lg dark:prose-invert mx-auto">
            <p>
              TASKURE is a leading platform that connects businesses with talented
              freelancers from around the world. Our mission is to create opportunities
              for professionals while helping businesses find the perfect talent for
              their projects.
            </p>

            <h2>Our Values</h2>
            <ul>
              <li>Quality work and professional excellence</li>
              <li>Transparent communication</li>
              <li>Fair compensation for freelancers</li>
              <li>Client satisfaction guarantee</li>
            </ul>

            <h2>Why Choose Us</h2>
            <p>
              We've built a community of trusted professionals and businesses who
              believe in the power of remote work and collaboration. Our platform
              provides the tools and support needed to make every project successful.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
