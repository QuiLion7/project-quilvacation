"use client";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SmilePlus } from "lucide-react";
import { useSession } from "next-auth/react";
import { UserIDProps } from "@/lib/auth";

interface ListProps {
  type: string;
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

export function ShowOffers() {
  const { data } = useSession();
  const user: UserIDProps | undefined = data?.user;
  const userID = user?.id;

  const [list, setList] = useState<ListProps[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    loadList();
  }, []);

  const loadList = async () => {
    try {
      const listRef = collection(db, "manage");
      const queryRef = query(listRef, orderBy("created", "desc"));
      const snapshot = await getDocs(queryRef);

      let listManage = [] as ListProps[];

      snapshot.forEach((doc) => {
        listManage.push({
          type: doc.data().type,
          id: doc.id,
          price: doc.data().price,
          description: doc.data().description,
          dateRange: doc.data().dateRange,
          state: doc.data().state,
          city: doc.data().city,
          address: doc.data().address,
          whatsapp: doc.data().whatsapp,
          created: doc.data().created,
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

  function timestampToDate(timestamp: TimestampProps) {
    const date = new Date(timestamp.seconds * 1000);
    return date;
  }

  async function handleSearchItem() {
    if (input === "") {
      loadList();
      return;
    }

    setList([]);

    const consult = query(
      collection(db, "manage"),
      where("createType", ">=", input),
      where("createType", "<=", input + "\uf8ff")
    );

    const querySnapshot = await getDocs(consult);

    let listManage = [] as ListProps[];

    querySnapshot.forEach((doc) => {
      listManage.push({
        type: doc.data().type,
        id: doc.id,
        price: doc.data().price,
        description: doc.data().description,
        dateRange: doc.data().dateRange,
        state: doc.data().state,
        city: doc.data().city,
        address: doc.data().address,
        whatsapp: doc.data().whatsapp,
        created: doc.data().created,
        owner: doc.data().owner,
        uid: doc.data().uid,
        photos: doc.data().photos,
        createType: doc.data().createType,
      });
    });

    setList(listManage);
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    if (event.target.value === "") {
      loadList();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearchItem();
    }
  };

  async function handleAddItemVacation(item: string) {
    if (!userID) {
      console.error("User ID not found.");
      return;
    }

    try {
      addDoc(collection(db, "vacation"), {
        id: item,
        uid: userID,
        created: new Date(),
      });

      toast.success(`Adding To Vacation`);
    } catch (error) {
      console.log("Error add Vacation:", error);
      toast.error("Error add Vacation");
    }
  }

  return (
    <div className="w-full flex flex-col gap-2 justify-center items-center">
      <main className="w-full flex justify-center items-center flex-col gap-4">
        <h1 className="uppercase font-bold text-sm sm:text-base md:text-lg lg:text-2xl bg-blend-exclusion">
          choose for you
        </h1>
        <div className="w-full md:max-w-[80%] flex items-center justify-center bg-transparent rounded-full p-2 relative ">
          <Input
            type="text"
            placeholder="Search By Desired Category"
            className="rounded-full bg-transparent border-2 border-primary"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <Button
            onClick={handleSearchItem}
            className="absolute group right-2 rounded-r-full bg-transparent text-primary hover:bg-transparent"
          >
            <Search
              size={0}
              className="w-6 h-6 group-hover:scale-125 duration-300"
            />
          </Button>
        </div>
        <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 w-auto">
          {list.map((item) => (
            <Card
              key={item.id}
              className="rounded-xl bg-primary/80 hover:bg-primary duration-300 w-full h-full"
            >
              <CardContent className="relative group flex flex-col w-[150px] h-[210px] sm:w-[220px] sm:h-[340px] md:w-[240px] md:h-[360px] aspect-square items-center justify-center rounded-xl text-secondary p-0 ">
                <div className="flex justify-center items-center w-full  h-full rounded-xl">
                  <Button
                    className="absolute z-10 top-0 right-[-8px] bg-transparent hover:bg-primary/0 duration-300 w-auto h-auto flex justify-center items-center drop-shadow"
                    onClick={() => handleAddItemVacation(item.id)}
                  >
                    <SmilePlus className="text-primary bg-secondary p-1 rounded-xl w-[40px] h-auto cursor-pointer hover:scale-110 duration-300" />
                  </Button>
                  <Link href={`/offers/${item.id}`} className="block sm:hidden">
                    <Image
                      src={item.photos[0].url}
                      alt={item.createType}
                      layout="fixed"
                      quality={100}
                      unoptimized={true}
                      width={0}
                      height={0}
                      style={{
                        height: "100px",
                        width: "150px",
                        objectFit: "cover",
                      }}
                      className="center w-auto h-full object-cover rounded-xl group-hover:scale-95 duration-300 cursor-pointer"
                    />
                  </Link>
                  <Link href={`/offers/${item.id}`} className="hidden sm:block">
                    <Image
                      src={item.photos[0].url}
                      alt={item.createType}
                      layout="fixed"
                      quality={100}
                      unoptimized={true}
                      width={0}
                      height={0}
                      style={{
                        height: "175px",
                        width: "250px",
                        objectFit: "cover",
                      }}
                      className="center w-auto h-full object-cover rounded-xl group-hover:scale-95 duration-300 cursor-pointer"
                    />
                  </Link>
                </div>
                <div className="flex text-xs md:text-sm lg:text-base flex-col gap-1 justify-center items-center p-2 w-full sm:w-full h-full uppercase group-hover:scale-105 duration-300">
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
                    to:{" "}
                    {format(timestampToDate(item.dateRange.to), "MM/dd/yyyy")}
                  </span>
                  <span className="cursor-default font-bold">
                    Price: $ {item.price}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
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
