"use client";

import { IoIosCall } from "react-icons/io";
import { LuMapPin } from "react-icons/lu";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <>
      <footer className="bg-gradient-to-b from-[#0d0213] to-[#040107] py-16 border-t border-orange-500/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="h-[300px] sm:h-[400px] rounded-3xl overflow-hidden shadow-lg border border-orange-500/10 hover:border-amber-500/30 hover:shadow-[0_8px_30px_rgba(245,158,11,0.1)] transition-all duration-300"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3496.329490092428!2d75.9150784745704!3d14.451935480700214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bba256dffbbba99%3A0x2e095478f115a69b!2sUniversity%20BDT%20College%20of%20Engineering%20(UBDT)%20%7C%7C%20Davangere!5e1!3m2!1sen!2sin!4v1767428870179!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-black mb-4 text-gold-gradient">
                  Event Venue
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <LuMapPin className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0 animate-pulse" />
                    <p className="text-muted-foreground font-medium">
                      Hadadi Road, Post Box No. 304, Davangere-577004. Karnataka
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black mb-4 text-gold-gradient">
                  Contacts & Support
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/[0.02] backdrop-blur-md p-4 rounded-2xl border border-orange-500/10 hover:border-amber-500/30 hover:shadow-[0_4px_20px_rgba(245,158,11,0.1)] transition-all duration-300">
                    <span className="font-bold block mb-1 text-white/90">Student Support</span>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <IoIosCall className="h-4 w-4 text-amber-500" />
                      <Link href="tel:+919876543210" className="hover:text-amber-400 transition-colors font-medium">
                        +91 98765 43210
                      </Link>
                    </div>
                  </div>
                  <div className="bg-white/[0.02] backdrop-blur-md p-4 rounded-2xl border border-orange-500/10 hover:border-amber-500/30 hover:shadow-[0_4px_20px_rgba(245,158,11,0.1)] transition-all duration-300">
                    <span className="font-bold block mb-1 text-white/90">Staff Coordinator</span>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <IoIosCall className="h-4 w-4 text-amber-500" />
                      <Link href="tel:+919123456789" className="hover:text-amber-400 transition-colors font-medium">
                        +91 91234 56789
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black mb-4 text-gold-gradient">
                  Social Media
                </h3>
                <div className="flex items-center gap-4">
                  <Link
                    href="https://instagram.com/yourfest_handle"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white/[0.02] backdrop-blur-md px-4 py-3 rounded-2xl border border-orange-500/10 hover:border-amber-500/30 hover:shadow-[0_4px_20px_rgba(245,158,11,0.1)] transition-all duration-300 group"
                  >
                    <FaInstagram className="h-5 w-5 text-rose-500 group-hover:scale-110 transition-transform" />
                    <span className="text-muted-foreground group-hover:text-amber-400 transition-colors font-semibold">
                      @yourfest_handle
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 md:mt-16 pt-8 border-t border-orange-500/10 text-center"
          >
            <p className="text-sm text-muted-foreground font-medium">
              &copy; {new Date().getFullYear()} UBDT Utkarsh. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground mt-2 font-medium">
              Developed  by{" "}
              <Link
                href="www.linkedin.com/in/sridhar-patil-m-74192a404"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 transition-colors font-semibold"
              >
                SRIDHAR PATIL M
              </Link>
            </p>
          </motion.div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
