import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { PlusIcon } from "lucide-react";

const faq = [
  {
    question: "Bagaimana cara saya menerima tiket?",
    answer:
      "Tiket dikirim instan ke email Anda setelah pembelian dan juga dapat diakses di aplikasi kami untuk masuk ke venue.",
  },
  {
    question: "Bisakah saya transfer tiket ke teman?",
    answer:
      "Ya! Anda dapat mentransfer tiket dengan aman ke teman atau keluarga langsung melalui aplikasi atau website kami.",
  },
  {
    question: "Apa yang terjadi jika konser batal?",
    answer:
      "Jika acara dibatalkan, Anda akan menerima pengembalian dana penuh secara otomatis ke metode pembayaran asli dalam 5-7 hari kerja.",
  },
  {
    question: "Apakah ada batasan usia untuk konser?",
    answer:
      "Batasan usia bervariasi tergantung acara. Silakan cek halaman detail acara untuk info batasan usia dan persyaratan ID.",
  },
  {
    question: "Apakah tersedia kursi aksesibilitas?",
    answer:
      "Ya, kami berusaha menyediakan kursi aksesibilitas untuk semua acara. Anda dapat memfilter kursi aksesibilitas saat memilih tiket.",
  },
  {
    question: "Bagaimana cara menghubungi support?",
    answer:
      "Tim support fans kami tersedia 24/7. Anda dapat menghubungi kami via live chat di website atau email support@concertticketing.com.",
  },
];

const FAQ = () => {
  return (
    <div
      id="faq"
      className="w-full max-w-(--breakpoint-xl) mx-auto py-8 xs:py-16 px-6"
    >
      <h2 className="md:text-center text-3xl xs:text-4xl md:text-5xl leading-[1.15]! font-bold tracking-tighter">
        Pertanyaan Umum
      </h2>
      <p className="mt-1.5 md:text-center xs:text-lg text-muted-foreground">
        Jawaban cepat untuk pertanyaanmu seputar tiket dan acara.
      </p>

      <div className="min-h-[550px] md:min-h-[320px] xl:min-h-[300px]">
        <Accordion
          type="single"
          collapsible
          className="mt-8 space-y-4 md:columns-2 gap-4"
        >
          {faq.map(({ question, answer }, index) => (
            <AccordionItem
              key={question}
              value={`question-${index}`}
              className="bg-accent py-1 px-4 rounded-xl border-none mt-0! mb-4! break-inside-avoid"
            >
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger
                  className={cn(
                    "flex flex-1 items-center justify-between py-4 font-semibold tracking-tight transition-all hover:underline [&[data-state=open]>svg]:rotate-45",
                    "text-start text-lg"
                  )}
                >
                  {question}
                  <PlusIcon className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200" />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="text-[15px]">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
