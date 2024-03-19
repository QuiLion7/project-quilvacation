"use client";

import { db, storage } from "@/lib/firebase";
import {
  collection,
  query,
  getDocs,
  orderBy,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { UserIDProps } from "@/lib/auth";
import { deleteObject, ref } from "firebase/storage";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface ListProps {
  id: string;
  type: string;
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

export function LoadingData() {
  const { data } = useSession();
  const user: UserIDProps | undefined = data?.user;
  const userID = user?.id;

  const [list, setList] = useState<ListProps[]>([]);

  useEffect(() => {
    const loadList = async () => {
      if (!userID) {
        console.error("User ID not found.");
        return;
      }
      try {
        const listRef = collection(db, "manage");
        const queryRef = query(
          listRef,
          where("uid", "==", userID),
          orderBy("created", "desc")
        );
        const snapshot = await getDocs(queryRef);

        let listManage = [] as ListProps[];

        snapshot.forEach((doc) => {
          listManage.push({
            id: doc.id,
            establishmentName: doc.data().establishmentName,
            type: doc.data().type,
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
  }, [userID]);

  function timestampToDate(timestamp: TimestampProps) {
    const date = new Date(timestamp.seconds * 1000);
    return date;
  }

  async function handleDeleteItem(establishment: ListProps) {
    const docRef = doc(db, "manage", establishment.id);

    establishment.photos.map(async (photo) => {
      const imagePath = `images/${photo.uid}/${photo.name}`;
      const imageRef = ref(storage, imagePath);

      try {
        await deleteDoc(docRef);
        await deleteObject(imageRef);
        setList(list.filter((item) => item.id !== establishment.id));
        toast.success("Deleted Item");
      } catch (error) {
        console.error("Error delete:", error);
        toast.error("Error delete");
      }
    });
  }

  return (
    <main className="w-full flex flex-col justify-center items-center">
      <h1 className="uppercase font-bold text-sm sm:text-base md:text-lg lg:text-2xl my-5">
        to manage
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 w-auto">
        {list.map((item) => (
          <Card
            key={item.id}
            className="rounded-xl bg-primary/80 hover:bg-primary duration-300 w-full h-full"
          >
            <CardContent className="relative group flex flex-col w-[300px] h-[350px] sm:w-[220px] sm:h-[340px] md:w-[240px] md:h-[360px] aspect-square items-center justify-center rounded-xl text-secondary p-0 ">
              <div className="flex justify-center items-center w-full  h-full rounded-xl">
                <Button
                  className="absolute z-10 top-0 right-[-8px] bg-transparent hover:bg-primary/0 duration-300 w-auto h-auto flex justify-center items-center drop-shadow"
                  onClick={() => handleDeleteItem(item)}
                >
                  <Trash2 className="text-primary bg-secondary p-1 rounded-xl w-[30px] h-auto cursor-pointer hover:scale-110 duration-300" />
                </Button>
                <Link href={`/offers/${item.id}`}>
                  <Image
                    src={item.photos[0].url}
                    alt={item.createType}
                    layout="responsive"
                    quality={100}
                    unoptimized={true}
                    width={0}
                    height={0}
                    style={{
                      height: "200px",
                      width: "300px",
                      objectFit: "cover",
                    }}
                    className="center w-auto h-full object-cover rounded-xl group-hover:scale-95 duration-300 cursor-pointer"
                  />
                </Link>
              </div>
              <div className="flex text-sm md:text-base flex-col gap-1 justify-center items-center p-2 w-full sm:w-full h-full uppercase group-hover:scale-105 duration-300">
                <p className="hidden sm:block font-bold text-center">
                  {item.createType}
                </p>
                <p className="cursor-default text-center">{item.type}</p>
                <span className="cursor-default text-center">
                  {item.city} / {item.state}
                </span>
                <span className="cursor-default hover:scale-105 duration-300">
                  from:{" "}
                  {format(timestampToDate(item.dateRange.from), "MM/dd/yyyy")}
                </span>
                <span className="cursor-default hover:scale-105 duration-300">
                  to: {format(timestampToDate(item.dateRange.to), "MM/dd/yyyy")}
                </span>
                <span className="cursor-default font-bold">
                  Price: $ {item.price}
                </span>
              </div>
            </CardContent>
          </Card>
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
      </div>
    </main>
  );
}
