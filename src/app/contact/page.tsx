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
      message: "O seu nome deve ter pelo menos 3 caracteres.",
    })
    .max(30, {
      message: "O seu nome não deve ter mais de 30 caracteres.",
    }),
  email: z
    .string({
      required_error: "Escreva seu E-mail",
    })
    .email(),
  message: z
    .string()
    .max(160, {
      message: "Sua mensagem não deve ter mais 160 caracteres.",
    })
    .min(7, {
      message: "Sua mensagem deve ter pelo menos 7 caracteres.",
    }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function Contact() {
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
    <div className="flex h-full w-full flex-col items-center justify-center p-2">
      <div className="flex flex-col gap-4 h-full w-full items-center justify-center">
        <h1 className="uppercase font-bold text-sm sm:text-base md:text-lg lg:text-2xl my-5">
          Entre em contato
        </h1>
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
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome" {...field} />
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
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu e-mail" {...field} />
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
                    <FormLabel>Mensagem</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Conte-me um pouco da solução que deseja..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full rounded-lg uppercase">
                Enviar
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
