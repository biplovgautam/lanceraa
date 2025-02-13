import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="container py-24 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold sm:text-6xl">
            Find the Perfect Freelancer
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Connect with top talent from around the world and get your projects done.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <a href="/recruit">Hire Talent</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/work">Find Work</a>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="container py-24 space-y-8">
        <div className="grid gap-8 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <img
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952"
                alt="Team collaboration"
                className="rounded-lg mb-4 aspect-video object-cover"
              />
              <h3 className="text-xl font-bold mb-2">Expert Freelancers</h3>
              <p className="text-muted-foreground">
                Access a global network of skilled professionals ready to tackle your projects.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <img
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                alt="Freelancer working"
                className="rounded-lg mb-4 aspect-video object-cover"
              />
              <h3 className="text-xl font-bold mb-2">Quality Work</h3>
              <p className="text-muted-foreground">
                Get high-quality results from experienced professionals in their field.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <img
                src="https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf"
                alt="Professional environment"
                className="rounded-lg mb-4 aspect-video object-cover"
              />
              <h3 className="text-xl font-bold mb-2">Secure Platform</h3>
              <p className="text-muted-foreground">
                Work with confidence using our secure and reliable platform.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
