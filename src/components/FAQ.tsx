import { motion } from "framer-motion";
import { Flower } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  return (
    <section className="py-24 px-4 bg-[#FFF5F6] relative overflow-hidden">
      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute left-5 top-20"
      >
        <Flower className="w-16 h-16 text-primary/30" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute right-5 bottom-20"
      >
        <Flower className="w-16 h-16 text-primary/30" />
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Images Section */}
        <div className="relative w-full h-[600px] hidden lg:block">
          <div className="absolute left-0 top-0 w-[45%] h-[45%] rounded-full overflow-hidden border-8 border-white/80">
            <img
              src="/lovable-uploads/44fca727-0676-4911-8db1-9cd5b2dfba42.png"
              alt="Wedding couple"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute right-0 bottom-0 w-[65%] h-[65%] rounded-full overflow-hidden border-8 border-white/80">
            <img
              src="/lovable-uploads/44fca727-0676-4911-8db1-9cd5b2dfba42.png"
              alt="Bride with bouquet"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* FAQ Content */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-4xl font-serif text-gray-800">Frequently Asked Questions</h2>
            <p className="text-gray-600">
              Here are some commonly asked questions from clients regarding full planning,
              coordination, and elopement services.
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg bg-white px-4">
              <AccordionTrigger className="hover:no-underline">
                <span className="flex items-center gap-2 text-left">
                  <Flower className="w-5 h-5 text-pink-400" />
                  <span className="font-medium text-gray-800">How Do You Charge for Services?</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                We offer customized packages based on your specific needs. Our full-service wedding planning starts from $X and includes comprehensive planning and coordination throughout your wedding journey.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-lg bg-white px-4">
              <AccordionTrigger className="hover:no-underline">
                <span className="flex items-center gap-2 text-left">
                  <Flower className="w-5 h-5 text-pink-400" />
                  <span className="font-medium text-gray-800">What is Included in Wedding Planning Services?</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Our wedding planning services include vendor coordination, timeline creation, budget management, design consultation, and day-of coordination to ensure every detail is perfectly executed.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-lg bg-white px-4">
              <AccordionTrigger className="hover:no-underline">
                <span className="flex items-center gap-2 text-left">
                  <Flower className="w-5 h-5 text-pink-400" />
                  <span className="font-medium text-gray-800">How Much Time Do You Need to Plan?</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Ideally, we recommend starting the planning process 12-18 months before your wedding date. However, we can accommodate shorter timelines and have experience with last-minute planning as well.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border rounded-lg bg-white px-4">
              <AccordionTrigger className="hover:no-underline">
                <span className="flex items-center gap-2 text-left">
                  <Flower className="w-5 h-5 text-pink-400" />
                  <span className="font-medium text-gray-800">Do You Do Destination Weddings?</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes! We love planning destination weddings and have experience coordinating events worldwide. We handle all the logistics including venue selection, local vendor coordination, and travel arrangements.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border rounded-lg bg-white px-4">
              <AccordionTrigger className="hover:no-underline">
                <span className="flex items-center gap-2 text-left">
                  <Flower className="w-5 h-5 text-pink-400" />
                  <span className="font-medium text-gray-800">How Much Experience Do You Have?</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                With over 16 years of expertise in the wedding planning industry, We've built a reputation for creating unforgettable and seamless wedding experiences for our clients. We are supportive from initial consultations to the final goodbye.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};