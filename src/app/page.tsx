"use client";

import { createClient } from "@/src/utils/supabase/client";
import Link from "next/link";
import Image from "next/image";
import PlaceholderImage from "@/public/icons/Logo-Mine.png";
import { useEffect, useState } from "react";
import Navbar from "@/src/components/navigation/Navbar";
import {
  NAV_ADMIN,
  NAV_INVENTARIS,
  NAV_KASIR,
  NAV_PUBLIC,
} from "@/src/constants";
import AuthButton from "@/src/components/button/AuthButton";
import ImageCommerce from "@/public/icons/commerce.png";
import Button from "@/src/components/button/Button";

export default function Homepage() {
  const supabase = createClient();
  const [roleUser, setRoleUser] = useState("");
  useEffect(() => {
    const getRole = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: roles, error } = await supabase
          .from("account")
          .select("role")
          .eq("email", user?.email);
        if (error) {
          console.log(error);
        }
        setRoleUser(roles?.[0]?.role);
      } else {
        setRoleUser("norole");
      }
    };
    getRole();
  });
  return (
    <div>
      {roleUser === "norole" ? (
        <Navbar listOfNav={NAV_PUBLIC} />
      ) : roleUser === "admin" ||
        roleUser === "kasir" ||
        roleUser === "inventaris" ? (
        <Navbar
          listOfNav={
            roleUser === "admin"
              ? NAV_ADMIN
              : roleUser === "kasir"
              ? NAV_KASIR
              : NAV_INVENTARIS
          }
        />
      ) : (
        <nav className="flexBetween max-container padding-container bg-white relative z-30 py-3">
          <Link href="/">
            <Image src={PlaceholderImage} alt="logo" width={88} />
          </Link>
          <div className="flex flex-row gap-12 items-center">
            <div>
              <AuthButton />
            </div>
          </div>
        </nav>
      )}
      <div className="bg-gradient-to-l from-sky-100 via-transparent to-sky-100">
        <div className={`container p-8 mx-auto xl:px-0 flex flex-wrap`}>
          <div className="flex items-center w-full lg:w-1/2">
            <div className="max-w-2xl my-15">
              <h1 className="text-5xl font-bold leading-snug tracking-tight text-blue-600 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight">
                Selamat datang di Bormy Online !
              </h1>
              <p className="py-5 px-2 text-base font-medium leading-normal text-gray-500 lg:text-base xl:text-base ">
                sistem manajemen Point of Sales (POS) yang dirancang khusus
                untuk mendukung kelancaran operasional swalayan Bormy. Mine
                memberikan solusi yang intuitif dan efisien untuk membantu Anda
                mengelola transaksi, inventaris, dan aspek bisnis lainnya secara
                lebih efektif.
              </p>

              <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
                {roleUser === "norole" ? (
                  <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
                    <a href="/login">
                      <Button
                        type="button"
                        title="login"
                        round="rounded-lg"
                        variant="btn_blue"
                        size="semibold-16"
                      />
                    </a>
                    <a href="/register">
                      <Button
                        type="button"
                        title="register"
                        round="rounded-lg"
                        variant="btn_blue_outline"
                        size="semibold-16"
                      />
                    </a>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-full lg:w-1/2">
            <div className="">
              <Image
                src={ImageCommerce}
                width="625"
                height="626"
                className={"object-cover"}
                alt="Commerce Illustration"
                loading="eager"
                // placeholder="blur"
              />
            </div>
          </div>
        </div>
        <div className={`container p-8 my-2 mx-auto xl:px-0`}>
          <div className="flex flex-col justify-center">
            <div className="text-xl font-medium text-center text-gray-700">
              Hai,{" "}
              {roleUser === "norole" ? (
                <span>Selamat datang di MINE!</span>
              ) : roleUser === "admin" ||
                roleUser === "kasir" ||
                roleUser === "inventaris" ? (
                <span>
                  <span className="text-blue-500 font-semibold">
                  {"pegawai "}{roleUser}{"! "}
                  </span>
                  Selamat bekerja hari ini!
                </span>
              ) : (
                <span>
                  <span className="text-blue-500 font-semibold">
                    Pengguna Baru!{" "}
                  </span>
                  Silahkan hubungi admin agar Anda mendapatkan akses
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-5 mt-10 md:justify-around bg-blue-600"></div>
        </div>
      </div>
    </div>
  );
}
