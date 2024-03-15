"use client";

import { db } from "@/lib/firebase";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import Link from "next/link";

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

  function timestampToDate(timestamp: TimestampProps) {
    const date = new Date(timestamp.seconds * 1000);
    return date;
  }

  return (
    <main className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-cols-auto">
      {list.map((item) => (
        <Link key={item.id} href={`/offers/${item.id}`}>
          <section className="w-full flex gap-2 flex-col justify-center items-center bg-secondary rounded-xl uppercase p-2 text-xs sm:text-base">
            <Image
              src={item.photos[0].url}
              alt={item.createType}
              layout="responsive"
              quality={100}
              unoptimized={true}
              width={0}
              height={0}
              className="w-auto rounded-lg h-full mim-h-[150px] max-h-[200px] hover:scale-[104%] duration-300 object-cover"
            />
            <p className="font-bold uppercase text-center">{item.createType}</p>
            <span>
              <strong>from: </strong>
              {format(timestampToDate(item.dateRange.from), "MM/dd/yyyy")}
            </span>
            <span>
              <strong>to: </strong>
              {format(timestampToDate(item.dateRange.to), "MM/dd/yyyy")}
            </span>
            <span className="flex flex-wrap w-full gap-2 justify-center items-center">
              <strong>State: </strong>
              {item.state}
            </span>
            <span className="flex flex-wrap w-full gap-2 justify-center items-center">
              <strong>City: </strong>
              {item.city}
            </span>
            <span>
              <strong>Price:</strong> $ {item.price}
            </span>
          </section>
        </Link>
      ))}

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
