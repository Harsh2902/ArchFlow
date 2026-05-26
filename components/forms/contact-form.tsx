"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const PROJECT_TYPES = [
  "Quotation & MIS Platform",
  "End-to-End Workflow System",
  "Sales CRM (custom-built)",
  "Production & Dispatch Coordination",
  "Multi-location Operations",
  "Leadership MIS Dashboards",
  "Not sure yet — let's talk"
];

const schema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  company: z.string().min(2, "Company name is required."),
  email: z.string().email("That doesn't look like a valid email."),
  phone: z.string().min(6, "Phone number looks too short."),
  projectType: z.string().min(2, "Please choose a project type."),
  message: z
    .string()
    .min(10, "Tell us a little more — at least 10 characters.")
    .max(4000)
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      projectType: "",
      message: ""
    }
  });

  async function onSubmit(values: FormValues) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
      reset();
      toast.success("Message received. We'll be in touch within 24 hours.");
    } catch (err) {
      toast.error("Something went wrong. Please email harsh@archflow.co.in.");
    }
  }

  return (
    <div className="surface p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-14 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.1 }}
              className="grid h-16 w-16 place-items-center rounded-full bg-emerald-500/10 text-emerald-400"
            >
              <Check className="h-8 w-8" />
            </motion.div>
            <h3 className="mt-6 heading-display text-3xl">Got it.</h3>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              We&apos;ll be in touch within 24 hours. In the meantime, feel free
              to email{" "}
              <a
                href="mailto:harsh@archflow.co.in"
                className="text-emerald-400 hover:underline"
              >
                harsh@archflow.co.in
              </a>
              .
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-8"
              onClick={() => setSubmitted(false)}
            >
              Send another
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Your name" id="name" error={errors.name?.message}>
                <Input
                  id="name"
                  autoComplete="name"
                  placeholder="Harsh Dhankhar"
                  {...register("name")}
                />
              </Field>
              <Field label="Company" id="company" error={errors.company?.message}>
                <Input
                  id="company"
                  autoComplete="organization"
                  placeholder="Acme Industries"
                  {...register("company")}
                />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Email" id="email" error={errors.email?.message}>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  {...register("email")}
                />
              </Field>
              <Field label="Phone" id="phone" error={errors.phone?.message}>
                <Input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+91 98765 43210"
                  {...register("phone")}
                />
              </Field>
            </div>

            <Field
              label="Project type"
              id="projectType"
              error={errors.projectType?.message}
            >
              <select
                id="projectType"
                {...register("projectType")}
                className="flex h-11 w-full appearance-none rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-sm text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:border-emerald-500/40"
                defaultValue=""
              >
                <option value="" disabled className="bg-background">
                  Choose a project type
                </option>
                {PROJECT_TYPES.map((t) => (
                  <option key={t} value={t} className="bg-background">
                    {t}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              label="What are you trying to solve?"
              id="message"
              error={errors.message?.message}
            >
              <Textarea
                id="message"
                rows={5}
                placeholder="Tell us a bit about your business, your team size, and what's not working today."
                {...register("message")}
              />
            </Field>

            <div className="pt-2">
              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {isSubmitting ? "Sending…" : "Send enquiry"}
              </Button>
              <p className="mt-4 text-xs text-muted-foreground">
                We typically respond within 24 hours, Mon–Fri.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  id,
  error,
  children
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p role="alert" className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
