"use client";

import { IoIosCall } from "react-icons/io";
import { LuMapPin } from "react-icons/lu";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <>
      <footer className="bg-gradient-to-b from-muted to-background py-16 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Map */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="h-[300px] sm:h-[400px] rounded-2xl overflow-hidden shadow-lg border border-border/50"
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
                <h3 className="text-xl sm:text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Event Venue
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <LuMapPin className="h-5 w-5 text-purple-400 mt-1 flex-shrink-0" />
                    <p className="text-muted-foreground">
                      Hadadi Road, Post Box No. 304, Davangere-577004. Karnataka
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Contacts
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-card/50 backdrop-blur-sm p-4 rounded-xl border border-border/50">
                    <span className="font-medium block mb-2">Vinay N</span>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <IoIosCall className="h-4 w-4 text-purple-400" />
                      <Link href="tel:+919008980114" className="hover:text-purple-400 transition-colors">
                        +91 9008980114
                      </Link>
                    </div>
                  </div>
                  <div className="bg-card/50 backdrop-blur-sm p-4 rounded-xl border border-border/50">
                    <span className="font-medium block mb-2">Shravan MS</span>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <IoIosCall className="h-4 w-4 text-purple-400" />
                      <Link href="tel:+917483855961" className="hover:text-purple-400 transition-colors">
                        +91 7483855961
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Social Media
                </h3>
                <div className="flex items-center gap-4">
                  <Link
                    href="https://instagram.com/ubdtutkarsh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-3 rounded-xl border border-border/50 hover:border-purple-500/50 transition-all group"
                  >
                    <FaInstagram className="h-5 w-5 text-pink-500 group-hover:scale-110 transition-transform" />
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                      @ubdtutkarsh
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
            className="mt-12 md:mt-16 pt-8 border-t border-border/50 text-center"
          >
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} UBDT Utkarsh. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Developed with ❤️ by{" "}
              <Link
                href="https://lnbg.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                Lakshminarayana BG
              </Link>
            </p>
          </motion.div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
