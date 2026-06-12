"use client";

import React, { useEffect, useState, Suspense, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { FaArrowLeft, FaCheckCircle, FaQrcode } from "react-icons/fa";
import { getEventCollections } from "@/src/lib/api/events";
import {
  uploadPaymentScreenshot,
  registerForEvent,
} from "@/src/lib/api/registration";
import type { EventCollection } from "@/src/types/event";
import { QRCodeSVG } from "qrcode.react";
import { PageLoader } from "@/src/components/ui/page-loader";

// Registration Form Content Component
function RegistrationFormContent() {
  const searchParams = useSearchParams();
  const preselectedEventId = searchParams.get("event");

  const [eventCollections, setEventCollections] = useState<EventCollection[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [usn, setUsn] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [selectedEventId, setSelectedEventId] = useState(
    preselectedEventId || ""
  );
  const [teamMemberNames, setTeamMemberNames] = useState<string[]>([]);
  const [teamMemberUSNs, setTeamMemberUSNs] = useState<string[]>([]);
  const [teamId, setTeamId] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState("");
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);

  // Get selected event details
  const selectedEvent = eventCollections.find((e) => e.id === selectedEventId);

  // Fetch event collections on mount
  useEffect(() => {
    async function fetchCollections() {
      try {
        const collections = await getEventCollections();
        setEventCollections(collections);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCollections();
  }, []);

  // Update team member arrays when event selection changes
  useEffect(() => {
    if (selectedEvent && selectedEvent.maxParticipants > 1) {
      const additionalMembers = selectedEvent.maxParticipants - 1;
      setTeamMemberNames(new Array(additionalMembers).fill(""));
      setTeamMemberUSNs(new Array(additionalMembers).fill(""));
    } else {
      setTeamMemberNames([]);
      setTeamMemberUSNs([]);
    }
  }, [selectedEvent]);

  // Generate UPI payment link
  const upiLink = selectedEvent
    ? `upi://pay?pa=${selectedEvent.upiId}&mc=0000&mode=02&purpose=00&am=${selectedEvent.price}&cu=INR`
    : "";

  const handleTeamMemberNameChange = (index: number, value: string) => {
    const newNames = [...teamMemberNames];
    newNames[index] = value;
    setTeamMemberNames(newNames);
  };

  const handleTeamMemberUSNChange = (index: number, value: string) => {
    const newUSNs = [...teamMemberUSNs];
    newUSNs[index] = value;
    setTeamMemberUSNs(newUSNs);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Check if spot registration mode is active
    const isSpotRegistration = selectedEvent?.spotRegistration === true;

    if (!selectedEventId || (!isSpotRegistration && !paymentScreenshot)) {
      setError("Please fill all required fields");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // Check if spot registration mode is active
      const isSpotRegistration = selectedEvent?.spotRegistration === true;

      // Upload payment screenshot (or use demo URL for spot registration)
      const screenshotUrl = isSpotRegistration
        ? "https://cloud.appwrite.io/v1/storage/buckets/6842b1c10035ca8ec839/files/6842df51000b0f7bcdd9/view?project=683ba1920018a06a9ecc&mode=admin"
        : await uploadPaymentScreenshot(paymentScreenshot!);

      // Filter out empty team member entries
      const filteredNames = teamMemberNames.filter((n) => n.trim() !== "");
      const filteredUSNs = teamMemberUSNs.filter((u) => u.trim() !== "");

      // Register for event
      const result = await registerForEvent(selectedEventId, {
        Name: name,
        Email: email,
        Phone_Number: phone,
        USN: usn,
        College_Name: collegeName,
        Other_Team_Members_Name:
          filteredNames.length > 0 ? filteredNames : undefined,
        Other_Team_Members_USN:
          filteredUSNs.length > 0 ? filteredUSNs : undefined,
        Transaction_ID: isSpotRegistration ? "On Spot Registration" : transactionId,
        Payment_Screenshot_Link: screenshotUrl,
      });

      if (result.success) {
        setSuccess(true);
        setTeamId(result.teamId || null);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            <img
              src="/loader_logo.svg"
              alt="Loading"
              className="w-full h-full object-contain animate-pulse"
            />
          </div>
          <p className="text-white/60 text-sm">Loading events...</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8 sm:py-12"
      >
        <FaCheckCircle className="text-green-400 text-5xl sm:text-6xl mx-auto mb-4 sm:mb-6" />
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">
          Registration Successful!
        </h2>
        {teamId && (
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-lg inline-block mb-6">
            <p className="text-sm text-white/60 mb-1">Your Reference Number:</p>
            <p className="font-mono text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {teamId}
            </p>
          </div>
        )}
        <p className="text-white/60 mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base px-4">
          Your registration is pending verification. You will receive a
          confirmation once your payment is verified. 
          Please take and keep a screenshot of your reference number for future correspondence.
        </p>
        <Link href="/">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Button>
        </Link>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 text-red-400 border border-red-500/20 p-4 rounded-md text-sm">
          {error}
        </div>
      )}

      {/* Personal Details */}
      <div className="space-y-4">
        <h3 className="text-base sm:text-lg font-semibold text-white">
          Personal Details
        </h3>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-2 text-white/80">
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-md border border-white/20 bg-white/5 backdrop-blur-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-2 text-white/80">
            Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-md border border-white/20 bg-white/5 backdrop-blur-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="Enter your email"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium mb-2 text-white/80">
            Phone Number <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            required
            pattern="[0-9]{10}"
            maxLength={10}
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            className="w-full px-4 py-3 rounded-md border border-white/20 bg-white/5 backdrop-blur-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="Enter 10-digit phone number"
          />
        </div>

        {/* USN */}
        <div>
          <label className="block text-sm font-medium mb-2 text-white/80">
            USN <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            required
            maxLength={11}
            value={usn}
            onChange={(e) => setUsn(e.target.value.toUpperCase())}
            className="w-full px-4 py-3 rounded-md border border-white/20 bg-white/5 backdrop-blur-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="Enter your USN"
          />
        </div>

        {/* College Name */}
        <div>
          <label className="block text-sm font-medium mb-2 text-white/80">
            College Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            required
            value={collegeName}
            onChange={(e) => setCollegeName(e.target.value)}
            className="w-full px-4 py-3 rounded-md border border-white/20 bg-white/5 backdrop-blur-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="Enter your college name"
          />
        </div>
      </div>

      {/* Event Selection */}
      <div className="space-y-4">
        <h3 className="text-base sm:text-lg font-semibold text-white">
          Event Selection
        </h3>

        <div>
          <label className="block text-sm font-medium mb-2 text-white/80">
            Select Event <span className="text-red-400">*</span>
          </label>
          <select
            required
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="w-full px-4 py-3 rounded-md border border-white/20 bg-white/5 backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          >
            <option value="" className="bg-gray-900">
              -- Select an event --
            </option>
            {eventCollections
              .sort((a, b) => {
                const aId = parseInt(a.eventId) || 0;
                const bId = parseInt(b.eventId) || 0;
                return aId - bId;
              })
              .map((event) => (
                <option key={event.id} value={event.id} className="bg-gray-900">
                  {event.name} - ₹{event.price}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Team Members (if applicable) */}
      {selectedEvent && selectedEvent.maxParticipants > 1 && (
        <div className="space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-white">
            Team Members{" "}
            <span className="text-sm font-normal text-white/50">
              (Optional - Max {selectedEvent.maxParticipants - 1} additional
              members)
            </span>
          </h3>

          {teamMemberNames.map((_, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-white/80">
                  Member {index + 2} Name
                </label>
                <input
                  type="text"
                  value={teamMemberNames[index]}
                  onChange={(e) =>
                    handleTeamMemberNameChange(index, e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-md border border-white/20 bg-white/5 backdrop-blur-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder={`Team member ${index + 2} name`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white/80">
                  Member {index + 2} USN
                </label>
                <input
                  type="text"
                  value={teamMemberUSNs[index]}
                  onChange={(e) =>
                    handleTeamMemberUSNChange(
                      index,
                      e.target.value.toUpperCase()
                    )
                  }
                  className="w-full px-4 py-3 rounded-md border border-white/20 bg-white/5 backdrop-blur-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder={`Team member ${index + 2} USN`}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Spot Registration Notice */}
      {selectedEvent && selectedEvent.spotRegistration && (
        <Card className="bg-green-500/10 backdrop-blur-sm border-green-500/30">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-green-400 text-xl flex-shrink-0" />
              <div>
                <p className="text-green-400 font-medium">Spot Registration Mode</p>
                <p className="text-white/60 text-sm">
                  Pay the amount at registration desk during the event. And provide the reference number generated after registration for verification.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment Section - Hidden for Spot Registration */}
      {selectedEvent && !selectedEvent.spotRegistration && (
        <div className="space-y-6">
          <h3 className="text-base sm:text-lg font-semibold text-white">
            Payment Details
          </h3>

          <Card className="bg-white/5 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-white">
                <span>Total Amount</span>
                <span className="text-2xl sm:text-3xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  ₹{selectedEvent.price}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* QR Code */}
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-white p-3 sm:p-4 rounded-lg">
                  <QRCodeSVG
                    value={upiLink}
                    size={180}
                    className="sm:w-[200px] sm:h-[200px]"
                  />
                </div>
                <p className="text-sm text-white/50 text-center">
                  Scan QR code with any UPI app to pay
                </p>
              </div>

              {/* Transaction ID */}
              <div>
                <label className="block text-sm font-medium mb-2 text-white/80">
                  Transaction ID / UTR Number{" "}
                  <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="w-full px-4 py-3 rounded-md border border-white/20 bg-white/5 backdrop-blur-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter UPI transaction ID"
                />
              </div>

              {/* Payment Screenshot */}
              <div>
                <label className="block text-sm font-medium mb-2 text-white/80">
                  Payment Screenshot <span className="text-red-400">*</span>
                </label>
                <input
                  type="file"
                  required
                  accept="image/*"
                  onChange={(e) =>
                    setPaymentScreenshot(e.target.files?.[0] || null)
                  }
                  className="w-full px-4 py-3 rounded-md border border-white/20 bg-white/5 backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-gradient-to-r file:from-purple-600 file:to-blue-600 file:text-white file:cursor-pointer file:text-sm"
                />
                <p className="text-xs text-white/40 mt-2">
                  Upload a screenshot of your payment confirmation (Image files
                  only)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        disabled={submitting || !selectedEvent}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        {submitting ? (
          <span className="flex items-center justify-center gap-2">
            <div className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full" />
            Submitting...
          </span>
        ) : (
          "Submit Registration"
        )}
      </Button>
    </form>
  );
}

// Loading skeleton for suspense
function FormSkeleton() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <img
            src="/loader_logo.svg"
            alt="Loading"
            className="w-full h-full object-contain animate-pulse"
          />
        </div>
        <p className="text-white/60 text-sm">Loading form...</p>
      </div>
    </div>
  );
}

// Main page component
export default function RegisterPage() {
  return (
    <div className="min-h-screen relative overflow-hidden pt-16">
      {/* Background Gradient - Same as Hero */}
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

      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-2xl relative z-10">
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
            Event Registration
          </h1>
        </div>

        <Card className="bg-white/5 backdrop-blur-md border-white/10 shadow-2xl">
          <CardContent className="pt-6">
            <Suspense fallback={<FormSkeleton />}>
              <RegistrationFormContent />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
