"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { Checkbox } from "../../../../components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { establishmentTypes, services } from "@/constants";
import { CalendarIcon, FileUp, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Calendar } from "../../../../components/ui/calendar";
import { useSession } from "next-auth/react";
import { UserIDProps } from "@/lib/auth";
import { v4 as uuidV4 } from "uuid";
import { storage, db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DayPicker } from "react-day-picker";

type IBGEUFResponse = {
  sigla: string;
  nome: string;
};

type IBGECITYResponse = {
  id: number;
  nome: string;
};

interface ImageItemProps {
  uid: string;
  name: string;
  previewUrl: string;
  url: string;
}

const profileFormSchema = z.object({
  type: z.string().min(1, { message: "Select the type of establishment" }),
  establishmentName: z
    .string()
    .min(3, { message: "At least 3 characters" })
    .max(30, { message: "Maximum 30 characters" }),
  price: z.string().min(1, { message: "Enter the price" }),
  servicesIncluded: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one service.",
    }),
  photos: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one service.",
  }),
  description: z.string().max(300, { message: "Maximum 300 characters" }),
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
  state: z.string().min(1, "Select the state"),
  city: z.string().min(1, "Select the city"),
  address: z.string().min(7, "Enter the address"),
  whatsapp: z.string().min(14, { message: "Enter the Phone" }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function FormAccommodation({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [ufs, setUfs] = useState<IBGEUFResponse[]>([]);
  const [cities, setCities] = useState<IBGECITYResponse[]>([]);
  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");

  const today = new Date();

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2024, 0, 20), 20),
  });

  const { data } = useSession();
  const user: UserIDProps | undefined = data?.user;
  const userID = user?.id;

  const [establishmentImage, setEstablishmentImage] = useState<
    ImageItemProps[]
  >([]);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      type: "",
      establishmentName: "",
      price: "",
      servicesIncluded: [],
      photos: [],
      description: "",
      dateRange: {
        from: new Date(),
        to: new Date(),
      },
      state: "",
      city: "",
      address: "",
      whatsapp: "",
    },
  });

  useEffect(() => {
    const fetchUfs = async () => {
      try {
        const response = await fetch(
          "https://servicodados.ibge.gov.br/api/v1/localidades/estados/"
        );
        const data = await response.json();
        setUfs(data);
      } catch (error) {
        console.error("Error fetching UF data:", error);
      }
    };

    fetchUfs();
  }, []);

  useEffect(() => {
    if (selectedUf === "0") {
      return;
    }
    const fetchCities = async () => {
      try {
        const response = await fetch(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
        );
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Error fetching city data:", error);
      }
    };

    fetchCities();
  }, [selectedUf]);

  function handleSelectUf(value: string) {
    setSelectedUf(value);
    setSelectedCity("0");
  }

  function handleSelectCity(value: string) {
    setSelectedCity(value);
    form.setValue("city", value);
  }

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === "image/jpeg" || image.type === "image/png") {
        await handleUpload(image);
      } else {
        toast.warning("Upload a jpeg or png image!");
        return;
      }
    }
  }

  async function handleUpload(image: File) {
    if (!userID) {
      console.error("User ID not found.");
      return;
    }

    try {
      const uuidImage = uuidV4();
      const uploadRef = ref(storage, `images/${userID}/${uuidImage}`);

      const snapshot = await uploadBytes(uploadRef, image);
      const downloadURL = await getDownloadURL(snapshot.ref);

      const imageItem = {
        name: uuidImage,
        uid: userID,
        previewUrl: URL.createObjectURL(image),
        url: downloadURL,
      };

      setEstablishmentImage((images) => [...images, imageItem]);
      toast.success("Image Added");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image");
    }
  }

  async function handleDeleteImage(photo: ImageItemProps) {
    const imagePath = `images/${photo.uid}/${photo.name}`;
    const imageRef = ref(storage, imagePath);

    try {
      await deleteObject(imageRef);
      setEstablishmentImage(
        establishmentImage.filter((image) => image.url !== photo.url)
      );
      toast.success("Deleted Image");
    } catch (error) {
      console.error("Error delete image:", error);
      toast.error("Error delete image");
    }
  }

  function onSubmit(data: ProfileFormValues) {
    const establishmentListImage = establishmentImage.map((uuidImage) => {
      return {
        name: uuidImage.name,
        uid: uuidImage.uid,
        url: uuidImage.url,
      };
    });

    try {
      addDoc(collection(db, "manage"), {
        establishmentName: data.establishmentName,
        type: data.type,
        price: data.price,
        servicesIncluded: data.servicesIncluded,
        description: data.description,
        dateRange: data.dateRange,
        state: data.state,
        city: data.city,
        address: data.address,
        whatsapp: data.whatsapp,
        created: new Date(),
        owner: user?.name,
        uid: userID,
        photos: establishmentListImage,
        createType: "accommodation",
      });

      form.reset();
      setEstablishmentImage([]);
      toast.success(`Accommodation registered successfully`);
    } catch (error) {
      console.log("Error add Establishment:", error);
      toast.error("Error add Establishment");
    }
  }

  return (
    <div className="flex flex-col gap-2 h-full w-full max-w-2xl items-center justify-center">
      <h1 className="uppercase font-bold text-sm sm:text-base md:text-lg lg:text-2xl my-5">
        Form Accommodation
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Type of Establishment</SelectLabel>
                        {establishmentTypes.map((establishment, index) => (
                          <SelectItem key={index} value={establishment}>
                            {establishment}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="establishmentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name of the establishment" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Price of stay"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9.,]/g, "");
                      const formattedValue = value.replace(/,/g, ".");
                      field.onChange(formattedValue);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="servicesIncluded"
            render={({ field }) => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Services</FormLabel>
                  <FormDescription>
                    Select the services you want to include.
                  </FormDescription>
                </div>
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="flex flex-row items-start space-x-3 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(service.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, service.id])
                            : field.onChange(
                                field.value?.filter(
                                  (value) => value !== service.id
                                )
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">
                      {service.label}
                    </FormLabel>
                  </div>
                ))}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="photos"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Photos</FormLabel>
                <FormControl>
                  <div className="w-full p-3 rounded-xl flex flex-col sm:flex-row justify-center items-center gap-2">
                    <div className="w-full sm:w-48 rounded-xl flex items-center gap-2">
                      <Button className="relative bg-secondary w-full sm:w-48 h-32 rounded-xl flex justify-center items-center border-2 border-primary hover:bg-secondary ">
                        <Input
                          type="file"
                          accept="image/*"
                          className="opacity-0 w-full h-full cursor-pointer"
                          onChange={(e) => {
                            if (e.target.files) {
                              const files = Array.from(e.target.files);
                              const imageUrls = files.map((file) =>
                                URL.createObjectURL(file)
                              );
                              field.onChange(imageUrls);
                              handleFile(e);
                            }
                          }}
                        />
                        <FileUp className="text-primary w-18 h-18 absolute cursor-pointer" />
                      </Button>
                    </div>
                    <div className="w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-2">
                      {establishmentImage.map((photo) => (
                        <div
                          key={photo.name}
                          className="w-full h-32 flex items-center justify-center relative border-2 border-primary rounded-xl"
                        >
                          <Button
                            className="absolute bg-transparent hover:bg-primary/10 duration-300 w-full h-32 flex justify-center items-center"
                            onClick={() => handleDeleteImage(photo)}
                          >
                            <Trash2 className="text-primary bg-secondary p-1 rounded-xl w-[30px] h-auto cursor-pointer hover:scale-110 duration-300" />
                          </Button>
                          <Image
                            src={photo.previewUrl}
                            alt={photo.name}
                            width={0}
                            height={0}
                            className="rounded-xl w-full h-32 object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
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

          <FormField
            control={form.control}
            name="dateRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Period</FormLabel>
                <FormControl>
                  <div className={cn("grid gap-2", className)}>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date?.from ? (
                            date.to ? (
                              <>
                                {format(date.from, "LLL dd, y")} -{" "}
                                {format(date.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(date.from, "LLL dd, y")
                            )
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="center">
                        <Controller
                          control={form.control}
                          name="dateRange"
                          render={({ field }) => (
                            <Calendar
                              initialFocus
                              mode="range"
                              defaultMonth={date?.from}
                              selected={date}
                              onDayClick={(date) => {
                                form.setValue("dateRange", {
                                  from: date,
                                  to: date,
                                });
                              }}
                              disabled={{ before: today }}
                              onSelect={(selectedDate) => {
                                setDate(selectedDate);
                                field.onChange(selectedDate);
                              }}
                              numberOfMonths={2}
                            />
                          )}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleSelectUf(value);
                    }}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>State</SelectLabel>
                        {ufs.map((uf) => (
                          <SelectItem key={uf.sigla} value={uf.sigla}>
                            {uf.nome}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleSelectCity(value);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>City</SelectLabel>
                        {cities.map((city) => (
                          <SelectItem key={city.id} value={city.nome}>
                            {city.nome}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Provide the address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="whatsapp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Whatsapp</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Inform your whatsapp"
                    {...field}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, "");
                      value = value.slice(0, 11);
                      const formattedValue =
                        value.length <= 2
                          ? `(${value})`
                          : `(${value.slice(0, 2)}) ${value.slice(2)}`;
                      field.onChange(formattedValue);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full rounded-lg uppercase">
            Register
          </Button>
        </form>
      </Form>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
