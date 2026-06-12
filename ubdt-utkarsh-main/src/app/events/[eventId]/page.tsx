"use client";

import React, { useEffect, useState, use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { PageLoader } from "@/src/components/ui/page-loader";
import { FaDownload, FaPhoneAlt, FaArrowLeft, FaUsers, FaRupeeSign, FaRegClock } from "react-icons/fa";
import { getEventBySlug } from "@/src/lib/api/events";
import { getCoordinatorsByEventLabel } from "@/src/lib/api/coordinators";
import { getFileDownloadUrl, EVENTS_STORAGE_BUCKET_ID } from "@/src/lib/appwrite";
import type { Event, Coordinator } from "@/src/types/event";

interface EventPageProps {
  params: Promise<{ eventId: string }>;
}

// Loading component with logo
function EventDetailsSkeleton() {
  return <PageLoader />;
}

export default function EventPage({ params }: EventPageProps) {
  const { eventId } = use(params);
  const [event, setEvent] = useState<Event | null>(null);
  const [coordinators, setCoordinators] = useState<Coordinator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const eventData = await getEventBySlug(eventId);
        setEvent(eventData);

        if (eventData) {
          const coordData = await getCoordinatorsByEventLabel(eventData.collectionId);
          setCoordinators(coordData);
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [eventId]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const formatEventDateTime = (value?: string): string | null => {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;
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

  if (loading) {
    return <EventDetailsSkeleton />;
  }

  if (!event) {
    return (
      <div className="min-h-screen relative overflow-hidden pt-16 flex items-center justify-center">
        {/* Background Gradient */}
        <div className="fixed inset-0 bg-gradient-to-br from-purple-950 via-background to-blue-950 -z-10">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        </div>
        <div className="text-center px-4">
          <h1 className="text-xl sm:text-2xl font-bold mb-4 text-white">Event Not Found</h1>
          <p className="text-white/60 mb-6">
            The event you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
              <FaArrowLeft className="mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden pt-16">
      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-950 via-background to-blue-950 -z-10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      </div>
      
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div 
          className="absolute w-48 sm:w-72 h-48 sm:h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{ top: "10%", left: "5%" }}
        />
        <div 
          className="absolute w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse"
          style={{ bottom: "10%", right: "5%", animationDelay: "1s" }}
        />
      </div>

      <div className="container mx-auto md:px-10 lg:px-8 px-3 py-8 sm:py-12 relative z-10">
        <div className="mb-6 sm:mb-8 flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon" 
            asChild
            className="border-white/20 text-white hover:bg-white/10 shrink-0"
          >
            <Link href="/">
              <FaArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
            {event.name}
          </h1>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="space-y-6 sm:space-y-8"
        >
          {/* Event Description Card */}
          <Card className="bg-white/5 backdrop-blur-md border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-lg sm:text-xl">About the Event</CardTitle>
              <CardDescription className="text-white/60">{event.eventDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
                <div className="flex items-center gap-2 text-white/80">
                  <FaUsers className="h-5 w-5 text-purple-400 shrink-0" />
                  <span className="text-sm sm:text-base">
                    {event.maxParticipants === 1
                      ? "Individual Participation"
                      : `Maximum ${event.maxParticipants} members per team`}
                  </span>
                </div>
                {formatEventDateTime(event.eventDateTime) && (
                  <div className="flex items-center gap-2 text-white/80">
                    <FaRegClock className="h-5 w-5 text-blue-400 shrink-0" />
                    <span className="text-sm sm:text-base">
                      {formatEventDateTime(event.eventDateTime)}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-white/80">
                  <FaRupeeSign className="h-5 w-5 text-blue-400 shrink-0" />
                  <span className="text-sm sm:text-base">Registration Fee: ₹{event.price}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rules Card */}
          <Card className="bg-white/5 backdrop-blur-md border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-lg sm:text-xl">Rules & Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div variants={fadeIn}>
                <div 
                  className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-white/70 prose-li:text-white/70 prose-strong:text-white prose-a:text-purple-400 prose-a:hover:text-purple-300 prose-ul:list-disc prose-ol:list-decimal prose-ul:pl-6 prose-ol:pl-6 prose-sm sm:prose-base"
                  dangerouslySetInnerHTML={{ 
                    __html: event.eventRules || "<p>Rules will be announced soon.</p>" 
                  }}
                />
              </motion.div>
            </CardContent>
          </Card>

          {/* Coordinators Card */}
          <Card className="bg-white/5 backdrop-blur-md border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-lg sm:text-xl">Event Coordinators</CardTitle>
              <CardDescription className="text-white/60">
                Contact the coordinators for any queries
              </CardDescription>
            </CardHeader>
            <CardContent>
              {coordinators.length > 0 ? (
                <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {coordinators.map((coordinator) => (
                    <motion.div
                      key={coordinator.$id}
                      variants={fadeIn}
                      className="flex items-center gap-4 p-3 sm:p-4 rounded-lg bg-white/5 border border-white/10"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white text-sm sm:text-base truncate">{coordinator.name}</h4>
                        {coordinator.phone && (
                          <a
                            href={`tel:${coordinator.phone}`}
                            className="flex items-center gap-2 text-xs sm:text-sm text-purple-400 hover:text-purple-300 transition-colors mt-1"
                          >
                            <FaPhoneAlt className="h-3 w-3 shrink-0" />
                            {coordinator.phone}
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-white/60 text-sm sm:text-base">
                  Coordinator details will be announced soon.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-6 sm:mt-8 px-4 sm:px-0">
            <Link href={`/register?event=${event.collectionId}`} className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]"
              >
                Register Now
              </Button>
            </Link>
            {event.eventBrochure && (
              <a
                href={
                  event.eventBrochure.startsWith('http://') || event.eventBrochure.startsWith('https://')
                    ? event.eventBrochure
                    : getFileDownloadUrl(EVENTS_STORAGE_BUCKET_ID, event.eventBrochure)
                }
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full border-white/20 text-white hover:bg-white/10 transition-all duration-300"
                >
                  <FaDownload className="mr-2 h-4 w-4" />
                  Brochure
                </Button>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
