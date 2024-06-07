"use client";
import * as React from "react";
import { courses } from "../../../../../data/courses";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../../../../../components/ui/resizable";
import { usePathname } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import { cn } from "../../../../../utils/cn";
import { buttonVariants } from "../../../../../components/ui/button";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
  AccordionItem,
} from "../../../../../components/ui/accordion";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../../../components/ui/sheet";
import { ChevronLeft, ChevronRight } from "lucide-react";
const page = () => {
  const pathname = usePathname();
  const [index, setIndex] = React.useState(1);
  const selectedCourse = courses.filter(
    (course) => course.path === pathname
  )[0];
  const [panelIsOpened, setPanelIsOpened] = React.useState(false);
  return (
    <>
      <div className="hidden sm:block min-h-fit --font-abz sticky">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={35} className={"hidden sm:block"}>
            <>
              <Card key={selectedCourse.id} className="m-4 min-w-80">
                <CardHeader>
                  <CardTitle>{selectedCourse.title}</CardTitle>
                  <CardDescription>
                    {selectedCourse.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className={
                      "flex-col justify-center items-center sm:flex mt-5 w-full"
                    }
                  >
                    {selectedCourse.chapters.map((chapter, idx) => (
                      <button
                        onClick={() => {
                          setIndex(idx + 1);
                        }}
                        className={cn(
                          "w-full my-1 text-left",
                          buttonVariants({ variant: "outline" })
                        )}
                        key={chapter.chapterId}
                      >
                        {idx + 1}. {chapter.title}
                      </button>
                    ))}
                    <Link
                      href={selectedCourse.quiz}
                      className={cn("my-2", buttonVariants())}
                    >
                      Take quiz
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </>
          </ResizablePanel>
          <ResizableHandle withHandle className={"min-h-[91dvh]"} />
          <ResizablePanel defaultSize={65} className="z-[40] w-full">
            <div className="flex items-center space-x-2">
              <Sheet>
                <SheetTrigger>
                  <button
                    className="relative -left-3 top-3 bg-muted/100 p-2 rounded-full block sm:hidden"
                    onClick={() => setPanelIsOpened((prev) => !prev)}
                  >
                    {panelIsOpened ? <ChevronRight /> : <ChevronLeft />}
                  </button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className={
                    "flex-col justify-center items-center sm:flex mt-5 w-full"
                  }
                >
                  <SheetHeader>
                    <SheetTitle>{selectedCourse.title} </SheetTitle>
                    <SheetDescription>
                      {selectedCourse.chapters.map((chapter, idx) => (
                        <button
                          onClick={() => {
                            setIndex(idx + 1);
                          }}
                          className={cn(
                            "w-full my-1 text-left",
                            buttonVariants({ variant: "outline" })
                          )}
                          key={chapter.chapterId}
                        >
                          {idx + 1}. {chapter.title}
                        </button>
                      ))}
                      <Link
                        href={selectedCourse.quiz}
                        className={cn("my-2", buttonVariants())}
                      >
                        Take quiz
                      </Link>
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>

            <Visualisation index={index} courseSelected={selectedCourse} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
};

export default page;
const Visualisation = ({ courseSelected, index }) => {
  let idx;
  idx = index;
  const filterChapter = (i) => {
    return courseSelected?.chapters.filter((chapter) => chapter.chapterId == i);
  };
  let filteredChapter;

  filteredChapter = filterChapter(idx);
  return (
    <div className="min-h-[85dvh] max-h-[91dvh] border-2 rounded-sm m-0 p-0 dark:bg-background overflow-y-scroll w-full">
      <div className={"flex-col justify-center items-center sm:flex"}>
        <Card className="m-4">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              {filteredChapter[0]?.chapterId}. {filteredChapter[0]?.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion
              key={filteredChapter[0]?.chapterId}
              className="w-full"
              collapsible
            >
              {filteredChapter[0]?.subChapter?.map(
                (subChapter, subChapterId) => {
                  return (
                    <AccordionItem value={subChapterId + 1}>
                      <AccordionTrigger>
                        <h3 className="font-bold mt-3">{subChapter?.title}</h3>
                      </AccordionTrigger>
                      <AccordionContent>
                        {subChapter.subChapterContent ?? (
                          <p className="text-orange-400">
                            (This chapter has no desciption)
                          </p>
                        )}
                      </AccordionContent>
                      {subChapter?.subChapterVisualisation}
                    </AccordionItem>
                  );
                }
              )}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
