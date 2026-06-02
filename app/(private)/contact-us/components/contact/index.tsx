"use client"
import { useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import Button from "@/app/components/button/Button";
import { useFormik } from "formik";
import * as Yup from "yup";


export default function Contact() {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      subject: Yup.string().required("Subject is required"),
      message: Yup.string().required("Message is required"),
    }),
    validateOnMount: true,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setSubmitting(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setSubmitStatus("success");
        resetForm();
        setTimeout(() => setSubmitStatus("idle"), 3000);
      } catch (error) {
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus("idle"), 3000);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-card to-background px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            We&apos;d love to hear from you. Send us a message and we&apos;ll
            respond as soon as possible.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                {/* Email */}
                <div>
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <Mail className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <p className="mt-2 text-muted-foreground">
                    support@store.com
                  </p>
                  <p className="text-sm text-muted-foreground">
                    We&apos;ll get back to you within 24 hours
                  </p>
                </div>

                {/* Phone */}
                <div>
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <Phone className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground">Phone</h3>
                  <p className="mt-2 text-muted-foreground">
                    +1 (555) 000-0000
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Monday to Friday, 9am to 6pm
                  </p>
                </div>

                {/* Address */}
                <div>
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <MapPin className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground">Address</h3>
                  <p className="mt-2 text-muted-foreground">
                    123 Commerce Street
                  </p>
                  <p className="text-sm text-muted-foreground">
                    San Francisco, CA 94105
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form
                onSubmit={formik.handleSubmit}
                className="space-y-6 rounded-xl border border-border bg-card p-8"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground"
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                      placeholder="Enter name"
                    />
                    {formik.touched.name && formik.errors.name && (
                      <p className="mt-1 text-xs text-red-500">
                        {formik.errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                      placeholder="Enter email"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="mt-1 text-xs text-red-500">
                        {formik.errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-foreground"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    placeholder="How can we help?"
                  />
                  {formik.touched.subject && formik.errors.subject && (
                    <p className="mt-1 text-xs text-red-500">
                      {formik.errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    rows={5}
                    className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    placeholder="Tell us more about your inquiry..."
                  />
                  {formik.touched.message && formik.errors.message && (
                    <p className="mt-1 text-xs text-red-500">
                      {formik.errors.message}
                    </p>
                  )}
                </div>

                {submitStatus === "success" && (
                  <div className="rounded-lg bg-green-50 p-4 text-sm text-green-700">
                    Thank you! We&apos;ve received your message and will get
                    back to you soon.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
                    Something went wrong. Please try again later.
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={
                    !formik.isValid || !formik.dirty || formik.isSubmitting
                  }
                  loading={formik.isSubmitting}
                  className="w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
                >
                     Send Message
                
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
