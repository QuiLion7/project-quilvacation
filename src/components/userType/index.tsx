"use client";

import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { UserIDProps } from "@/lib/auth";
import { db } from "@/lib/firebase";
import { UserContext } from "@/contexts/UserContext";

const UserType = () => {
  const { data } = useSession();
  const user: UserIDProps | undefined = data?.user;
  const userID = user?.id;

  const { setUserType } = useContext(UserContext);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!userID) {
        console.error("User ID not found.");
        return;
      }
      const userRef = doc(db, "users", userID);

      try {
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userTypeFromDB = userDoc.data().userType;
          if (userTypeFromDB) {
            setUserType(userTypeFromDB);
          } else {
            setIsDialogOpen(true);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (userID) {
      fetchData();
    }
  }, [userID, setUserType]);

  const handleUserTypeChoice = async (userType: string) => {
    setUserType(userType);
    setIsDialogOpen(false);
    if (!userID) {
      console.error("User ID not found.");
      return;
    }
    const userRef = doc(db, "users", userID);

    try {
      await updateDoc(userRef, { userType: userType });
      console.log("UserType updated successfully.");
    } catch (error) {
      console.error("Error updating UserType:", error);
    }
  };

  return (
    <div>
      <AlertDialog open={isDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>What is your profile?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. To change your profile, log in with
              another account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => handleUserTypeChoice("advertiser")}
            >
              Advertiser
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => handleUserTypeChoice("client")}>
              Client
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserType;
