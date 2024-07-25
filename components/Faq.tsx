"use client";
import React, { use, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import faqs from "../config/content/faqs";
const Faq = () => {
  return (
    <>
      <h1 className="text-center text-3xl font-bold md:text-4xl mb-10 ">FAQs</h1>
      <div style={{maxWidth:"600px", margin:"20px"}}>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
};

export default Faq;
