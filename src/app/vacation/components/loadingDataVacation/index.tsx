"use client";

import { db } from "@/lib/firebase";
import {
  collection,
  query,
  getDocs,
  orderBy,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import Image from "next/image";
import { RefObject, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import { ScanSearch, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { UserIDProps } from "@/lib/auth";
import { useReactToPrint } from "react-to-print";

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

interface ItemVacationProps {
  id: string;
  uid: string;
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

type ManageItem = ItemTransportationProps | ItemAccommodationProps;

export function LoadingDataVacation() {
  const { data } = useSession();
  const user: UserIDProps | undefined = data?.user;
  const userID = user?.id;

  const [listVacation, setListVacation] = useState<ItemVacationProps[]>([]);
  const [showListVacation, setShowListVacation] = useState<ManageItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const documentPrint: RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    const loadListVacation = async () => {
      if (!userID) {
        console.error("User ID not found.");
        return;
      }
      try {
        const listRef = collection(db, "vacation");
        const queryRef = query(
          listRef,
          where("uid", "==", userID),
          orderBy("created", "desc")
        );
        const snapshot = await getDocs(queryRef);

        let listVacation = [] as ItemVacationProps[];

        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data && data.id) {
            listVacation.push({
              id: data.id,
              uid: data.uid,
            });
          } else {
            console.error("Invalid ID found in document:", doc.id);
          }
        });
        setListVacation(listVacation);
        setIsLoading(false);
      } catch (error) {
        console.error("Error when searching for item:", error);
        toast.error("Error when searching for item");
        setIsLoading(false);
      }
    };
    loadListVacation();
  }, [userID]);

  useEffect(() => {
    const loadListManage = async () => {
      try {
        const ids = listVacation.map((item) => item.id);

        let listManage = [] as ManageItem[];

        const promises = ids.map(async (id) => {
          const docRef = doc(db, "manage", id);
          const docSnapshot = await getDoc(docRef);
          if (docSnapshot.exists()) {
            listManage.push(docSnapshot.data() as ManageItem);
          }
        });

        await Promise.all(promises);

        setShowListVacation(listManage);
      } catch (error) {
        console.error("Error when searching for manage items:", error);
        toast.error("Error when searching for manage items");
      }
    };

    if (listVacation.length > 0) {
      loadListManage();
    }
  }, [listVacation]);

  function timestampToDate(timestamp: TimestampProps) {
    const date = new Date(timestamp.seconds * 1000);
    return date;
  }

  const handlePrint = useReactToPrint({
    documentTitle: "Print",
    content: () => documentPrint.current,
  });

  return (
    <main className="w-full h-full flex flex-col justify-center items-center">
      {isLoading && (
        <div className="w-full h-[65vh] uppercase flex flex-col justify-center items-center text-primary">
          <h1 className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl">
            Loading...
          </h1>
        </div>
      )}
      {!isLoading && listVacation.length === 0 && (
        <div className="w-full h-[65vh] uppercase flex flex-col justify-center items-center text-primary">
          <h1 className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl">
            no offers registered
          </h1>
          <h3 className="font-bold text-xs sm:text-sm md:text-lg lg:text-xl">
            click on any form to get started
          </h3>
        </div>
      )}
      {!isLoading && listVacation.length > 0 && (
        <div className=" flex flex-col justify-center items-center w-full">
          <h1 className="uppercase font-bold text-sm sm:text-base md:text-lg lg:text-2xl my-5">
            to manage
          </h1>
          <div className="flex justify-end items-center w-full">
            <Button className="right-2 uppercase" onClick={handlePrint}>
              print page
            </Button>
          </div>
        </div>
      )}

      <div
        ref={documentPrint}
        className="flex flex-row flex-wrap gap-4 justify-center items-center w-full h-full p-2"
      >
        {showListVacation.map((item, index) => (
          <div
            key={index}
            className="group flex w-full h-full md:max-h-[200px] flex-col sm:flex-row gap-2 bg-primary/80 hover:bg-primary/90 duration-300 rounded-xl p-2 text-secondary"
          >
            <div className="flex justify-center items-center ">
              <div className="w-full flex justify-center items-center relative">
                {/* <Button
                  className="absolute z-10 top-[-7px] left-[-15px] bg-transparent hover:bg-primary/0 duration-300 w-auto h-auto flex justify-center items-center drop-shadow"
                  onClick={() => console.log(item.id)}
                >
                  <X className="text-primary bg-secondary p-1 rounded-xl w-[35px] h-auto cursor-pointer hover:scale-110 duration-300" />
                </Button> */}
                <Image
                  src={item.photos[0].url}
                  alt={item.createType}
                  layout="fixed"
                  quality={100}
                  unoptimized={true}
                  width={0}
                  height={0}
                  style={{
                    height: "180px",
                    width: "400px",
                    objectFit: "cover",
                  }}
                  className="center w-full h-full object-cover object-center rounded-xl group-hover:scale-[102%] duration-300"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 uppercase w-full">
              <div className="gap-1 cursor-default p-1 flex justify-center items-center border border-secondary rounded-xl text-center w-full text-[0.7rem] sm:text-xs md:text-sm hover:bg-primary hover:scale-[101%] duration-300">
                Type: {""} {item?.createType}
              </div>
              <div className="gap-1 cursor-default p-1 flex justify-center items-center border border-secondary rounded-xl text-center w-full text-[0.7rem] sm:text-xs md:text-sm hover:bg-primary hover:scale-[101%] duration-300">
                <span>
                  from:{" "}
                  {format(timestampToDate(item?.dateRange.from), "MM/dd/yyyy")}{" "}
                </span>
              </div>
              <div className="gap-1 cursor-default p-1 flex justify-center items-center border border-secondary rounded-xl text-center w-full text-[0.7rem] sm:text-xs md:text-sm hover:bg-primary hover:scale-[101%] duration-300">
                <span>
                  to:{" "}
                  {format(timestampToDate(item?.dateRange.to), "MM/dd/yyyy")}
                </span>
              </div>
              <div className="col-span-3 gap-1 cursor-default p-1 flex justify-center items-center border border-secondary rounded-xl text-center w-full text-[0.7rem] sm:text-xs md:text-sm hover:bg-primary hover:scale-[101%] duration-300">
                Description: {""}
                {item?.description}
              </div>
              <div className="gap-1 cursor-default p-1 flex justify-center items-center border border-secondary rounded-xl text-center w-full text-[0.7rem] sm:text-xs md:text-sm hover:bg-primary hover:scale-[101%] duration-300">
                Address: {""} {item?.city}/{item?.state}
              </div>
              <div className="gap-1 cursor-default p-1 flex justify-center items-center border border-secondary rounded-xl text-center w-full text-[0.7rem] sm:text-xs md:text-sm hover:bg-primary hover:scale-[101%] duration-300">
                Price: {""} $ {item?.price}
              </div>
              <div className="gap-1 cursor-default p-1 flex justify-center items-center border border-secondary rounded-xl text-center w-full text-[0.7rem] sm:text-xs md:text-sm hover:bg-primary hover:scale-[101%] duration-300">
                WhatsApp: {""} {item?.whatsapp}
              </div>
            </div>
          </div>
        ))}
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
