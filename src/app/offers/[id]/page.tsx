"use client";

import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import { Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface ItemTransportationProps {
  type: string;
  brand: string;
  model: string;
  year: string;
  id: string;
  photos: ListImageProps[];
  description: string;
  price: string | number;
  dateRange: {
    from: TimestampProps;
    to: TimestampProps;
  };
  state: string;
  city: string;
  address: string;
  whatsapp: string;
  created: string;
  owner: string;
  uid: string;
  createType: string;
}

interface ItemAccommodationProps {
  type: string;
  establishmentName: string;
  servicesIncluded: string[];
  id: string;
  photos: ListImageProps[];
  description: string;
  price: string | number;
  dateRange: {
    from: TimestampProps;
    to: TimestampProps;
  };
  state: string;
  city: string;
  address: string;
  whatsapp: string;
  created: string;
  owner: string;
  uid: string;
  createType: string;
}

interface ListImageProps {
  name: string;
  uid: string;
  url: string;
}

interface TimestampProps {
  seconds: number;
  nanoseconds: number;
}

export default function OffersDetails({ params }: { params: { id: string } }) {
  const itemID = params.id;
  const router = useRouter();
  const [itemListAccommodation, setItemListAccommodation] =
    useState<ItemAccommodationProps>();
  const [itemListTransportation, setItemListTransportation] =
    useState<ItemTransportationProps>();

  useEffect(() => {
    const loadList = async () => {
      if (!itemID) {
        console.error("User ID not found.");
        return;
      }
      try {
        const docRef = doc(db, "manage", itemID);
        const returnedDoc = await getDoc(docRef);

        if (returnedDoc.exists()) {
          const itemData = returnedDoc.data();
          if (itemData.createType === "transportation") {
            setItemListTransportation({
              id: itemID,
              type: itemData.type,
              brand: itemData.brand,
              model: itemData.model,
              year: itemData.year,
              photos: itemData.photos,
              description: itemData.description,
              price: itemData.price,
              dateRange: itemData.dateRange,
              state: itemData.state,
              city: itemData.city,
              address: itemData.address,
              whatsapp: itemData.whatsapp,
              created: itemData.created,
              owner: itemData.owner,
              uid: itemData.uid,
              createType: "transportation",
            });
          } else if (itemData.createType === "accommodation") {
            setItemListAccommodation({
              id: itemID,
              type: itemData.type,
              establishmentName: itemData.establishmentName,
              servicesIncluded: itemData.servicesIncluded,
              photos: itemData.photos,
              description: itemData.description,
              price: itemData.price,
              dateRange: itemData.dateRange,
              state: itemData.state,
              city: itemData.city,
              address: itemData.address,
              whatsapp: itemData.whatsapp,
              created: itemData.created,
              owner: itemData.owner,
              uid: itemData.uid,
              createType: "accommodation",
            });
          } else {
            toast.error("Does not exist in the database");
          }
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching establishment:", error);
        toast.error("Error fetching establishment");
      }
    };

    loadList();
  }, [itemID, router]);

  function timestampToDate(timestamp: TimestampProps) {
    const date = new Date(timestamp.seconds * 1000);
    return date;
  }

  return (
    <main className="mt-[57px] max-w-7xl flex flex-col justify-center items-center p-2 w-full rounded-xl gap-4 uppercase">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full flex justify-center items-center h-auto"
      >
        <CarouselContent>
          {itemListTransportation &&
            itemListTransportation?.photos.map((photo, index) => (
              <CarouselItem
                key={index}
                className="basis-1/1 sm:basis-1/2 lg:basis-1/3 h-[230px] md-h-[250px] w-full"
              >
                <div className="h-full w-full flex justify-center items-center rounded-xl">
                  <Card className="rounded-xl bg-primary hover:bg-primary/90 duration-300 w-full">
                    <CardContent className="group flex flex-col w-full h-full items-center justify-start bg-primary rounded-xl text-secondary p-0">
                      <Image
                        src={photo.url}
                        alt="transport image"
                        layout="responsive"
                        quality={100}
                        unoptimized={true}
                        width={100}
                        height={100}
                        style={{
                          height: "250px",
                          width: "300px",
                          objectFit: "cover",
                        }}
                        className=" w-full h-full justify-center items-center rounded-xl"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          {itemListAccommodation &&
            itemListAccommodation?.photos.map((photo, index) => (
              <CarouselItem
                key={index}
                className="basis-1/1 sm:basis-1/2 lg:basis-1/3 h-[230px] md-h-[250px]  w-full"
              >
                <div className="h-full w-full flex justify-center items-center ">
                  <Card className=" bg-primary duration-300 w-full">
                    <CardContent className="group flex flex-col w-full h-full items-center justify-start bg-primary text-secondary p-0">
                      <Image
                        src={photo.url}
                        alt="transport image"
                        layout="responsive"
                        quality={100}
                        unoptimized={true}
                        width={100}
                        height={100}
                        style={{
                          height: "250px",
                          width: "300px",
                          objectFit: "cover",
                        }}
                        className="w-full h-full justify-center items-center rounded-xl"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>
      <section className="w-full flex justify-center items-center flex-col lg:w-[80%] gap-2">
        {itemListTransportation && (
          <div className="flex flex-col gap-2 w-full items-center justify-center">
            <h1 className="font-bold text-base sm:text-lg md:text-xl">
              {itemListTransportation?.createType}
            </h1>
            <div className="border-2 border-primary p-2 rounded-xl w-full text-justify text-sm sm:text-base md:text-lg">
              <strong>Description: </strong> ${" "}
              {itemListTransportation?.description}
            </div>
            {itemListTransportation && itemListTransportation.dateRange && (
              <div className="border-2 border-primary p-2 rounded-xl w-full text-justify text-sm sm:text-base md:text-lg flex justify-center items-center gap-2">
                <span>
                  <strong>from: </strong>{" "}
                  {format(
                    timestampToDate(itemListTransportation?.dateRange.from),
                    "MM/dd/yyyy"
                  )}{" "}
                </span>
                <span>
                  <strong>to: </strong>{" "}
                  {format(
                    timestampToDate(itemListTransportation?.dateRange.to),
                    "MM/dd/yyyy"
                  )}
                </span>
              </div>
            )}
          </div>
        )}
        {itemListAccommodation && (
          <div className="flex flex-col gap-2 w-full items-center justify-center">
            <h1 className="font-bold my-2 text-base sm:text-lg md:text-xl">
              {itemListAccommodation?.createType}
            </h1>
            <div className="border-2 border-primary p-2 rounded-xl w-full text-justify text-sm sm:text-base md:text-lg">
              <strong>Description: </strong>
              {itemListAccommodation?.description}
            </div>
            <div className="border-2 border-primary p-2 rounded-xl w-full text-xs sm:text-sm md:text-base text-justify">
              <strong>Services: </strong>{" "}
              {itemListAccommodation?.servicesIncluded?.join("; ") ||
                "No services included."}
            </div>
          </div>
        )}
        {itemListTransportation && (
          <div className="flex justify-center items-center w-full gap-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <div className="border-2 border-primary p-2 rounded-xl text-center w-full text-xs sm:text-sm md:text-base">
                <strong>Brand: </strong> {itemListTransportation?.brand}
              </div>
              <div className="border-2 border-primary p-2 rounded-xl text-center w-full text-xs sm:text-sm md:text-base">
                <strong>Model: </strong> {itemListTransportation?.model}
              </div>
              <div className="border-2 border-primary p-2 rounded-xl text-center w-full text-xs sm:text-sm md:text-base">
                <strong>Year: </strong> {itemListTransportation?.year}
              </div>
              <div className="border-2 border-primary p-2 rounded-xl text-center w-full text-xs sm:text-sm md:text-base">
                <strong>State: </strong> {itemListTransportation?.state}
              </div>
              <div className="border-2 border-primary p-2 rounded-xl text-center w-full text-xs sm:text-sm md:text-base">
                <strong>City: </strong> {itemListTransportation?.city}
              </div>
              <div className="border-2 border-primary p-2 rounded-xl text-center w-full text-xs sm:text-sm md:text-base">
                <strong>Price: </strong> $ {itemListTransportation?.price}
              </div>
              <div className="border-2 border-primary p-2 rounded-xl text-center w-full text-xs sm:text-sm md:text-base">
                <strong>City: </strong> {itemListTransportation?.address}
              </div>
              <div className="border-2 border-primary p-2 rounded-xl text-center w-full text-xs sm:text-sm md:text-base">
                <strong>Owner: </strong> {itemListTransportation?.owner}
              </div>
              <div className="border-2 border-primary p-2 rounded-xl text-center w-full text-xs sm:text-sm md:text-base">
                <strong>WhatsApp: </strong> {itemListTransportation?.whatsapp}
              </div>
            </div>
          </div>
        )}
        {itemListAccommodation && (
          <div className="flex justify-center items-center w-full gap-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <div className="border-2 border-primary p-2 rounded-xl text-center w-full text-xs sm:text-sm md:text-base">
                <strong>Name: </strong>{" "}
                {itemListAccommodation?.establishmentName}
              </div>
              <div className="border-2 border-primary p-2 rounded-xl w-full text-justify text-sm sm:text-base md:text-lg flex justify-center items-center gap-2">
                <span>
                  <strong>from: </strong>{" "}
                  {format(
                    timestampToDate(itemListAccommodation?.dateRange.from),
                    "MM/dd/yyyy"
                  )}{" "}
                </span>
              </div>
              <div className="border-2 border-primary p-2 rounded-xl w-full text-justify text-sm sm:text-base md:text-lg flex justify-center items-center gap-2">
                <span>
                  <strong>to: </strong>{" "}
                  {format(
                    timestampToDate(itemListAccommodation?.dateRange.to),
                    "MM/dd/yyyy"
                  )}
                </span>
              </div>
              <div className="border-2 border-primary p-2 rounded-xl text-center w-full text-xs sm:text-sm md:text-base">
                <strong>State: </strong> {itemListAccommodation?.state}
              </div>
              <div className="border-2 border-primary p-2 rounded-xl text-center w-full text-xs sm:text-sm md:text-base">
                <strong>City: </strong> {itemListAccommodation?.city}
              </div>
              <div className="border-2 border-primary p-2 rounded-xl text-center w-full text-xs sm:text-sm md:text-base">
                <strong>Price: </strong> $ {itemListAccommodation?.price}
              </div>
              <div className="border-2 border-primary p-2 rounded-xl text-center w-full text-xs sm:text-sm md:text-base">
                <strong>City: </strong> {itemListAccommodation?.address}
              </div>
              <div className="border-2 border-primary p-2 rounded-xl text-center w-full text-xs sm:text-sm md:text-base">
                <strong>Owner: </strong> {itemListAccommodation?.owner}
              </div>
              <div className="border-2 border-primary p-2 rounded-xl text-center w-full text-xs sm:text-sm md:text-base">
                <strong>WhatsApp: </strong> {itemListAccommodation?.whatsapp}
              </div>
            </div>
          </div>
        )}
      </section>
      <div className="w-full flex justify-center items-center gap-2">
        {itemListAccommodation && (
          <Link
            href={`https://api.whatsapp.com/send?phone=55${itemListAccommodation?.whatsapp.replace(
              /[\s()]/g,
              ""
            )}`}
            target="_blank"
            className="bg-green-600 w-full max-w-[310px] flex items-center justify-center gap-2 my-6 h-11 text-xl rounded-xl font-bold text-secondary"
          >
            owner contact
            <Phone className="w-[22px]" />
          </Link>
        )}
        {itemListTransportation && (
          <Link
            href={`https://api.whatsapp.com/send?phone=55${itemListTransportation?.whatsapp.replace(
              /[\s()]/g,
              ""
            )}`}
            target="_blank"
            className="bg-green-600 w-full max-w-[310px] flex items-center justify-center gap-2 my-6 h-11 text-xl rounded-xl font-bold text-secondary"
          >
            owner contact
            <Phone className="w-[22px]" />
          </Link>
        )}
      </div>

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
    </main>
  );
}
