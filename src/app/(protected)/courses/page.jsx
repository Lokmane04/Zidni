"use client";
import * as React from "react";

import { buttonVariants } from "../../../components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { courses } from "../../../data/courses";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../utils/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import React from "react";
import { BentoGrid, BentoGridItem } from "../../../components/ui/bento-grid";
import { AlignVerticalSpaceAround } from "lucide-react";
const Courses = () => {
  const [user] = useAuthState(auth);
  // const user = true;
  React.useEffect(() => {
    const getUsers = async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      console.log("Profile updated", docSnap.data());
      if (!auth.currentUser.displayName && docSnap.exists()) {
        const res = await updateProfile(auth.currentUser, {
          displayName: docSnap.data().userName,
        });
      }
    };
    if (!user) {
      return;
    }
    getUsers();
  }, [user]);
  const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
  );

  return (
    <>
      <div className="bg-muted/40 py-1 rounded-lg mt-1">
        {user && (
          <div className="text-center ml-4">
            <h1 className="text-xl sm:text-3xl mt-28">
              Hi there {user?.displayName}👋,
            </h1>
            <p className="lg:text-lg text-base ml-2 ">
              Glad to see you , excited to explore our new way of learning
              together. Let's dive in!
            </p>
          </div>
        )}
        {user ? (
          <BentoGrid className="mt-7 mx-auto">
            {courses.map((course, i) => (
              <BentoGridItem
                key={i}
                title={course.title}
                description={course.description}
                header={<Skeleton />}
                icon={
                  course.icon ?? (
                    <AlignVerticalSpaceAround className="h-4 w-4 text-neutral-500" />
                  )
                }
                className={i === 3 || i === 6 ? "md:col-span-2" : ""}
              />
            ))}
          </BentoGrid>
        ) : (
          <div className="py-20 mx-2 md:mx-[35dvw] text-center">
            <Card className="py-3">
              <CardHeader>
                <CardTitle>Sign in to access courses</CardTitle>
              </CardHeader>
              <CardFooter className="flex justify-center items-center">
                <Link className={buttonVariants()} href="/signin">
                  Sign In
                </Link>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </>
  );
};
export default Courses;
