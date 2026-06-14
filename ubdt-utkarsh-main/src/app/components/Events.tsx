"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaLongArrowAltRight, FaRegClock, FaUsers } from "react-icons/fa";
import { getAllEvents } from "@/src/lib/api/events";
import { getFilePreviewUrl, EVENTS_STORAGE_BUCKET_ID } from "@/src/lib/appwrite";
import type { Event } from "@/src/types/event";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Skeleton component for loading state
function EventCardSkeleton() {
  return (
    <div className="bg-card/50 rounded-2xl overflow-hidden animate-pulse border border-border/50">
      <div className="h-48 bg-muted" />
      <div className="p-6 space-y-4">
        <div className="h-6 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-2/3" />
        <div className="h-4 bg-muted rounded w-1/2" />
        <div className="flex gap-2 mt-4">
          <div className="h-10 bg-muted rounded flex-1" />
          <div className="h-10 bg-muted rounded flex-1" />
        </div>
      </div>
    </div>
  );
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await getAllEvents();
        // Sort events by eventId for consistent display order
        const sortedEvents = data.sort((a, b) => {
          // Handle both string and number eventIds
          const aId = typeof a.eventId === 'string' ? parseInt(a.eventId) : a.eventId;
          const bId = typeof b.eventId === 'string' ? parseInt(b.eventId) : b.eventId;
          return aId - bId;
        });
        setEvents(sortedEvents);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  // Helper to get thumbnail URL
  // The eventThumbnail can be either a full URL or just a file ID
  const getThumbnailUrl = (event: Event): string | null => {
    if (!event.eventThumbnail) return null;
    
    // Check if it's already a full URL
    if (event.eventThumbnail.startsWith('http://') || event.eventThumbnail.startsWith('https://')) {
      return event.eventThumbnail;
    }
    
    // Otherwise, construct the URL from file ID
    return getFilePreviewUrl(EVENTS_STORAGE_BUCKET_ID, event.eventThumbnail);
  };

  // Helper to slice description
  const getShortDescription = (description: string, maxLength: number = 50): string => {
    if (description.length <= maxLength) return description;
    return description.slice(0, maxLength) + "...";
  };

  const formatEventDateTime = (value?: string): string | null => {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    // Shift month from February (1) to June (5)
    if (date.getMonth() === 1) {
      date.setMonth(5);
    }
    const datePart = date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const timePart = date.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });
    return `${datePart} | ${timePart}`;
  };

  return (
    <>
      <section id="events" className="py-20 md:py-28 scroll-mt-16 bg-gradient-to-b from-[#0d0213] via-[#1e0329]/10 to-[#0d0213]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16 md:mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 bg-clip-text text-transparent">
                Featured Events
              </span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              Explore our exciting lineup of technical and cultural events packed with high energy and massive prizes.
            </p>
          </motion.div>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <EventCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <motion.div
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {events.map((event) => (
                <motion.div
                  key={event.$id}
                  variants={fadeIn}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group"
                >
                  <Card className="flex h-full flex-col bg-card/40 backdrop-blur-md overflow-hidden border border-orange-500/10 hover:border-amber-500/50 transition-all duration-300 rounded-3xl hover:shadow-[0_8px_30px_rgba(245,158,11,0.15)]">
                    {getThumbnailUrl(event) && (
                      <div className="w-full h-48 sm:h-52 relative overflow-hidden">
                        <Image
                          src={getThumbnailUrl(event)!}
                          alt={event.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    )}
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl sm:text-2xl font-bold line-clamp-2 group-hover:text-amber-400 transition-colors">
                        {event.name}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="flex-1 pt-2">
                      <p className="mb-4 text-muted-foreground text-sm sm:text-base line-clamp-2">
                        {getShortDescription(event.eventDescription, 80)}
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2.5 text-sm font-semibold text-muted-foreground">
                          <FaUsers className="h-4 w-4 text-orange-400" />
                          <span>
                            {event.maxParticipants === 1
                              ? "Individual Participation"
                              : `Team of ${event.maxParticipants} Members`}
                          </span>
                        </div>
                        {formatEventDateTime(event.eventDateTime) && (
                          <div className="flex items-center gap-2.5 text-sm font-semibold text-muted-foreground">
                            <FaRegClock className="h-4 w-4 text-rose-400" />
                            <span>{formatEventDateTime(event.eventDateTime)}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-4">
                      <div className="flex w-full gap-2 flex-col sm:flex-row">
                        <Link href={`/events/${event.eventId}`} className="flex-1">
                          <Button className="w-full bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 font-bold transition-all duration-300 group/btn">
                            Explore <FaLongArrowAltRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                        <Link href={`/register?event=${event.collectionId}`} className="flex-1">
                          <Button
                            variant="outline"
                            className="w-full border-orange-500/40 text-orange-200 hover:bg-orange-500/10 hover:border-orange-500 font-bold transition-all duration-300"
                          >
                            Register
                          </Button>
                        </Link>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          {!loading && events.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <FaUsers className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg">No events found.</p>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default Events;