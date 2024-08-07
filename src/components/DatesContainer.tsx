"use client";
import React, { useState } from "react";
import Calendar from "@/components/Calendar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DatesContainer({ events }) {
  const [visibleItems, setVisibleItems] = useState(5);

  const loadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 3); // Aumentar el número de elementos visibles
  };

  return (
    <div>
      {events.slice(0, visibleItems).map((event, index) => (
        <div className="mt-5 flex" key={index}>
          <Calendar month={event.month} day={event.day} />
          <Card className="flex h-20 w-full items-center">
            <CardContent className="flex">
              <p className="mb-[-18px] text-xs font-semibold leading-7 sm:text-xl sm:font-normal [&:not(:first-child)]:mt-6">
                {event.description}
              </p>
            </CardContent>
          </Card>
        </div>
      ))}

      {visibleItems < events.length && (
        <div className="mt-5 flex w-full items-center justify-center">
          <Button onClick={loadMore}>Ver Más</Button>
        </div>
      )}
    </div>
  );
}
