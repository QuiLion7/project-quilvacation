"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const profileFormSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Must be at least 3 characters long.",
    })
    .max(30, {
      message: "Must be no more than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Write your email",
    })
    .email(),
  message: z
    .string()
    .max(160, {
      message: "Your message should be no longer than 160 characters.",
    })
    .min(7, {
      message: "Your message must be at least 7 characters long.",
    }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function FormContact() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(data: ProfileFormValues) {
    const messageWithUserInfo = `Nome: ${data.name}\nE-mail: ${data.email}\n\nMensagem: ${data.message}`;

    const whatsappUrl = `https://wa.me/5588981062656?text=${encodeURIComponent(
      messageWithUserInfo
    )}`;

    window.open(whatsappUrl, "_blank");

    form.reset();
  }

  return (
    <div className="flex h-full w-full max-w-[800px] items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell me a little about the solution you want..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full rounded-lg uppercase">
            to send
          </Button>
        </form>
      </Form>
    </div>
  );
}
