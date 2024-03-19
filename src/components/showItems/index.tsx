"use client";

import { db } from "@/lib/firebase";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";

interface ListProps {
  id: string;
  establishmentType: string;
  establishmentName: string;
  price: string | number;
  servicesIncluded: string[];
  photos: ListImageProps[];
  description: string;
  dateRange: {
    from: TimestampProps;
    to: TimestampProps;
  };
  state: string;
  city: string;
  address: string;
  whatsapp: string;
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

export function ShowItems() {
  const [list, setList] = useState<ListProps[]>([]);

  useEffect(() => {
    const loadList = async () => {
      try {
        const listRef = collection(db, "manage");
        const queryRef = query(listRef, orderBy("created", "desc"));
        const snapshot = await getDocs(queryRef);

        let listManage = [] as ListProps[];

        snapshot.forEach((doc) => {
          listManage.push({
            id: doc.id,
            establishmentName: doc.data().establishmentName,
            establishmentType: doc.data().establishmentType,
            price: doc.data().price,
            servicesIncluded: doc.data().servicesIncluded,
            description: doc.data().description,
            dateRange: doc.data().dateRange,
            state: doc.data().state,
            city: doc.data().city,
            address: doc.data().address,
            whatsapp: doc.data().whatsapp,
            owner: doc.data().owner,
            uid: doc.data().uid,
            photos: doc.data().photos,
            createType: doc.data().createType,
          });
        });

        setList(listManage);
      } catch (error) {
        console.error("Error fetching establishment:", error);
        toast.error("Error fetching establishment");
      }
    };

    loadList();
  }, []);

  return (
    <main className=" sm:px-[50px] w-full flex justify-center items-center flex-col">
      <motion.h1
        variants={fadeIn("up", 0.4)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.5 }}
        className="uppercase font-bold text-sm sm:text-base md:text-lg lg:text-2xl my-5 bg-blend-exclusion"
      >
        Most accessed
      </motion.h1>
      <motion.section
        className="w-full h-full flex justify-center items-center"
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.4 }}
      >
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-7xl"
        >
          <CarouselContent>
            {list.map((item, index) => (
              <Link key={index} href={`/offers/${item.id}`}>
                <CarouselItem className="basis-1/2 sm:basis-1/3 w-full">
                  <div className="h-full w-[300px] flex justify-center items-center">
                    <Card className="rounded-xl bg-primary hover:bg-primary/80 duration-300 w-full h-full">
                      <CardContent className="group flex flex-col items-center justify-start rounded-xl text-secondary p-0 h-full">
                        <div className="flex flex-1 justify-center items-center w-full h-full rounded-xl ">
                          <Image
                            src={item.photos[0].url}
                            alt={item.createType}
                            layout="fixed"
                            quality={100}
                            unoptimized={true}
                            width={0}
                            height={0}
                            style={{
                              height: "200px",
                              width: "300px",
                              objectFit: "cover",
                            }}
                            className="w-full h-full object-cover overflow-hidden rounded-xl group-hover:scale-95 duration-300"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-center items-center pb-1 w-full h-full uppercase group-hover:scale-105 duration-300">
                          <p className="font-bold uppercase text-center">
                            {item.createType}
                          </p>
                          <span className="flex flex-wrap w-full gap-2 justify-center items-center">
                            {item.city} / {item.state}
                          </span>
                          <span className="font-bold">
                            Price: $ {item.price}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              </Link>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </motion.section>

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
