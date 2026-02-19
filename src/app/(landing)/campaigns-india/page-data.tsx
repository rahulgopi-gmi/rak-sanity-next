'use client'

import { Fragment, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

import styles from './styles.module.css'
import CampaignsForm from '@/components/CampaignsForm'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

export function PageData() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const formRef = useRef<HTMLDivElement | null>(null)
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        })
      },
      {
        threshold: 0.6,
      },
    )

    observer.observe(video)

    return () => observer.disconnect()
  }, [])

  return (
    <Fragment>
        <section className="relative text-white">
          {/* Desktop Banner */}

          <Image
            alt="uaebanner"
            src="/images/campaign/uaebanner.jpg"
            width={1440}
            height={593}
            className="w-full hidden md:block"
          />

          {/* Mobile Banner */}
          <Image
            alt="mobbanuae"
            src="/images/campaign/mobbanuae.png"
            width={1440}
            height={593}
            className="w-full block md:hidden"
          />

          <div className="absolute top-0 left-0 w-full h-full">
            {/* Top Navigation */}
            <div className="relative z-20 container mx-auto flex items-center justify-between pt-10">
              {/* Logo */}
              <Image
                alt="campaign-header"
                src="/images/campaign/campaign-header-logo.svg"
                width={225}
                height={48}
                className="sm:max-w-full max-w-39"
              />
            </div>

            {/* Main Headline */}
            <div
              className="relative z-20 container sm:mt-5 mt-21.25 xl:mt-20 ls-heading-mt "
              data-aos="fade-up"
            >
              <div className=" h-width max-w-70.5 sm:max-w-69.5 lg:max-w-91.5 xl:max-w-151.75">
                <h1
                  className={
                    'text-white font-extrabold font-proxima-nova uppercase text-30 leading-8 tracking-[-1px] sm:text-36 sm:leading-9.5 md:text-45 md:leading-11.5 lg:text-[56px] lg:leading-14.5 xl:text-[72px] xl:leading-18 main-header-fsize'
                  }
                >
                  <span
                    className={
                      'block font-medium text-22 leading-6.5 tracking-[-0.8px] sm:text-[26px] md:text-[32px] lg:text-[40px] xl:text-[56px]'
                    }
                  >
                    Launch Your
                  </span>
                  UAE Business
                </h1>

                {/* Underline Bar */}
                <div
                  className={
                    'w-full h-3 bg-[linear-gradient(90deg,#5EBED3_0%,#5752A3_100%)] lg:mt-2.5 lg:mb-10 sm:mt-3 sm:mb-4 mt-6 mb-7.5'
                  }
                ></div>
              </div>
              {/* Price Section */}
              <div className="xl:max-w-full lg:max-w-41.25 sm:max-w-27.5 max-w-45.25 ">
                <Image alt="uaestart" src="/images/campaign/uaestart.svg" width={278} height={81} />
              </div>
            </div>
          </div>
        </section>

        {/* form */}

        <section className="w-full pt-10 pb-18.75 md:pb-0 md:pt-0">
          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 sm:gap-6 gap-8 ">
            {/* ================= LEFT CONTENT ================= */}
            <div className="space-y-10" data-aos="fade-up">
              <div className="country-wrap flex pb-12 border-b border-[rgba(255,255,255,0.20)] ">
                <div className="cntry-img mr-6">
                  <Image alt="cntry" src="/images/campaign/cntry.svg" width={116} height={45} />
                </div>
                <div className="cntry-img">
                  <p className="text-white/80 font-montserrat text-base font-normal leading-6 tracking-[0.16px]">
                    Trusted by founders from
                  </p>
                  <p className="text-white/80 font-montserrat text-base font-bold leading-6 tracking-[0.16px]">
                    India, UAE & 150+ countries
                  </p>
                </div>
              </div>

              {/* Feature List */}
              <ul className="space-y-8">
                <li className="flex items-center gap-6">
                  <div
                    className={
                      'w-15 h-15 flex items-center justify-center bg-[#5FC2D5]/20 rounded-2xl rounded-br-none p-4'
                    }
                  >
                    <Image alt="u1" src="/images/campaign/u1.svg" width={24} height={24} />
                  </div>
                  <div>
                    <h4
                      className={
                        'text-[rgba(255,255,255,0.80)] font-montserrat text-base leading-7 font-bold tracking-[0.16px]'
                      }
                    >
                      UAE Business License
                    </h4>
                    <p className="text-[rgba(255,255,255,0.80)] font-montserrat text-base leading-7 font-normal tracking-[0.16px]">
                      Fast, compliant UAE company setup.
                    </p>
                  </div>
                </li>

                <li className="flex items-center gap-6">
                  <div
                    className={
                      'w-15 h-15 flex items-center justify-center bg-[#5FC2D5]/20 rounded-2xl rounded-br-none p-4'
                    }
                  >
                    <Image alt="u2" src="/images/campaign/u2.svg" width={24} height={24} />
                  </div>
                  <div>
                    <h4 className="text-[rgba(255,255,255,0.80)] font-montserrat text-base leading-7 font-bold tracking-[0.16px]">
                      Residency Visa Support
                    </h4>
                    <p className="text-[rgba(255,255,255,0.80)] font-montserrat text-base leading-7 font-normal tracking-[0.16px]">
                      End-to-end UAE residency assistance.
                    </p>
                  </div>
                </li>

                <li className="flex items-center gap-6">
                  <div
                    className={
                      'w-15 h-15 flex items-center justify-center bg-[#5FC2D5]/20 rounded-2xl rounded-br-none p-4'
                    }
                  >
                    <Image alt="u3" src="/images/campaign/u3.svg" width={24} height={24} />
                  </div>
                  <div>
                    <h4 className="text-[rgba(255,255,255,0.80)] font-montserrat text-base leading-7 font-bold tracking-[0.16px]">
                      Multiple Shareholders Allowed
                    </h4>
                    <p className="text-[rgba(255,255,255,0.80)] font-montserrat text-base leading-7 font-normal tracking-[0.16px]">
                      Flexible ownership for growing teams.
                    </p>
                  </div>
                </li>

                <li className="flex items-center gap-6">
                  <div
                    className={
                      'w-15 h-15 flex items-center justify-center bg-[#5FC2D5]/20 rounded-2xl rounded-br-none p-4'
                    }
                  >
                    <Image alt="u4" src="/images/campaign/u4.svg" width={28} height={28} />
                  </div>
                  <div>
                    <h4 className="text-[rgba(255,255,255,0.80)] font-montserrat text-base leading-7 font-bold tracking-[0.16px]">
                      Built for Tech, Trading & Digital Businesses
                    </h4>
                    <p className="text-[rgba(255,255,255,0.80)] font-montserrat text-base leading-7 font-normal tracking-[0.16px]">
                      Designed for modern digital enterprises.
                    </p>
                  </div>
                </li>
              </ul>

              <div className="bg-[rgba(255,255,255,0.08)]  border-l-[3px] border-[#6FCCDD] rounded-r-xl p-6 max-w-111 mb-5!">
                <p className="font-montserrat font-normal text-base leading-7 tracking-[1%] text-white/80">
                  If you’re interested in working at Innovation City, please{' '}
                  <a
                    href="https://www.linkedin.com/company/innovationcityinc/jobs"
                    className="font-montserrat font-semibold text-base leading-7 tracking-[1%] underline decoration-text-white/80 decoration-1"
                  >
                    apply here.
                  </a>
                </p>
              </div>
            </div>

            {/* ================= RIGHT FORM ================= */}
            <div className="w-full" id="contact" tabIndex={-1}>
              <div id="contact-view" ref={formRef}>
                <CampaignsForm />
              </div>
            </div>
          </div>
        </section>

        {/* box */}

        <div className="large-bg bg-[url('/images/campaign/largebg.png')] bg-cover  bg-no-repeat">
          <section className="w-full bg-black text-white md:mt-20 mt-0">
            <div className="container" data-aos="fade-up">
              {/* Top Section */}
              <div className="flex flex-col sm:flex-row sm:items-end items-start sm:justify-between justify-start mb-9 gap-2">
                <h2
                  className={
                    'text-white font-proxima-nova font-bold xl:text-[56px] xl:leading-14 lg:text-[40px] lg:leading-10 sm:text-35 sm:leading-8.75 text-[40px] leading-10 tracking-[-1.12px] sm:max-w-full max-w-[320px]'
                  }
                >
                  What Makes Innovation City <br />
                  the Choice for{' '}
                  <span className="bg-linear-to-r from-[#5EBED3] to-custom bg-clip-text text-transparent">
                    Indian Founders
                  </span>
                </h2>
                <button
                  type="button"
                  onClick={scrollToForm}
                  className={
                    'max-md:mx-auto flex h-10.5 px-10 py-3 justify-end items-center gap-2.5 rounded-lg bg-[#5EBED3] text-[#212121] font-montserrat text-[12px] font-bold leading-none sm:mt-0 mt-6 hover:bg-white transition'
                  }
                >
                  START TODAY
                </button>
              </div>

              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-6 aos-init aos-animate mb-6  "
                data-aos="fade-up"
              >
                <div className={`${styles.boxBg} px-8 rt-padding  lg:py-10 py-8.5`}>
                  <h3
                    className={
                      'text-white font-proxima-nova font-bold xl:text-28 xl:leading-8 text-20 leading-6 -tracking-05 rt-box mb-2.5'
                    }
                  >
                    100% Ownership
                  </h3>
                  <p className="text-white/80 font-montserrat text-base font-normal leading-6">
                    No local partner required
                  </p>

                  <div className="xl:mt-15 md:mt-10 mt-8 ls-box-mt xl:max-w-18 md:max-w-10 max-w-18">
                    <Image
                      alt="key-blue-bg"
                      src="/images/campaign/key-blue-bg.svg"
                      width={72}
                      height={72}
                    />
                  </div>
                </div>

                <div className={`${styles.boxBg} px-8 rt-padding lg:py-10 py-8.5`}>
                  <h3
                    className={
                      'text-white font-proxima-nova font-bold xl:text-28 xl:leading-8 text-20 leading-6 -tracking-05 rt-box mb-2.5'
                    }
                  >
                    Operate Globally
                  </h3>
                  <p className="text-white/80 font-montserrat text-base font-normal leading-6">
                    UAE credibility for banking & clients
                  </p>

                  <div className="xl:mt-15 md:mt-10 mt-8 ls-box-mt xl:max-w-18 md:max-w-10 max-w-18">
                    <Image alt="glob1" src="/images/campaign/glob1.svg" width={72} height={72} />
                  </div>
                </div>
              </div>

              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-6 aos-init aos-animate mb-6  "
                data-aos="fade-up"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Top Right Card 1 */}
                  <div className={`${styles.boxBg} px-8 rt-padding lg:py-10 py-8.5`}>
                    <h3
                      className={
                        'text-white font-proxima-nova font-bold xl:text-28 xl:leading-8 text-20 leading-6 -tracking-05 rt-box mb-2.5'
                      }
                    >
                      Fast Setup
                    </h3>
                    <p className="text-white/80 font-montserrat text-base font-normal leading-6">
                      Start your company without complex paperwork
                    </p>

                    <div className="lg:absolute bottom-10 ls-box-mt xl:max-w-18 md:max-w-10 max-w-18 lg:mt-0 md:mt-10 mt-8">
                      <Image alt="fast" src="/images/campaign/fast.svg" width={108} height={20} />
                    </div>
                  </div>

                  {/* Top Right Card 2 */}
                  <div className={`${styles.boxBg} px-8 rt-padding py-10`}>
                    <h3
                      className={
                        'text-white font-proxima-nova font-bold xl:text-28 xl:leading-8 text-20 leading-6 -tracking-05 rt-box mb-2.5'
                      }
                    >
                      Founder-Friendly
                    </h3>
                    <p className="text-white/80 font-montserrat text-base font-normal leading-6">
                      Clear pricing,real humans, real support
                    </p>

                    <div className="lg:absolute bottom-10 xl:max-w-18 md:max-w-10 max-w-18 ls-box-mt lg:mt-0 md:mt-10 mt-8">
                      <Image alt="hrt" src="/images/campaign/hrt.svg" width={72} height={72} />
                    </div>
                  </div>
                </div>

                <div className={`${styles.boxBg} px-8 rt-padding lg:py-10 py-8.5`}>
                  <h3
                    className={
                      'text-white font-proxima-nova font-bold xl:text-28 xl:leading-8 text-20 leading-6 -tracking-05 rt-box mb-2.5'
                    }
                  >
                    Future-Ready Ecosystem
                  </h3>
                  <p className="text-white/80 lg:mb-37.5 font-montserrat text-base font-normal leading-8">
                    Tech, digital, trading & innovation-led businesses
                  </p>

                  <div className="lg:absolute bottom-10 ls-box-mt xl:max-w-18 md:max-w-10 max-w-18 lg:mt-0 md:mt-10 mt-8">
                    <Image alt="el" src="/images/campaign/el.svg" width={72} height={72} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* LEFT BIG CARD */}
                <div className="bg-[#0A0A0F] rounded-3xl relative ">
                  <Image
                    alt="grid-10-bg"
                    src="/images/campaign/grid-10-bg.png"
                    width={588}
                    height={589}
                    className="w-full lg:min-h-max sm:min-h-101 min-h-max"
                  />
                  <div className="absolute w-full flex flex-col justify-center items-center sm-bottom-[72px] bottom-10.5">
                    <p className="mt-4 text-center text-white [leading-trim:both] [text-edge:cap] ont-proxima-nova sm:text-28 text-20  font-bold sm:leading-10 leading-6.25 -tracking-05">
                      Tech Activities
                    </p>

                    <p className="text-white/80 [leading-trim:both] [text-edge:cap] font-proxima-nova sm:text-20 text-[14px] font-normal sm:leading-10 leading-6.25 tracking-[-0.4px]">
                      on One Business License*
                    </p>
                  </div>
                </div>

                {/* RIGHT SIDE (2 cols top + 1 full bottom) */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2 bg-[#0A0A0F] rounded-3xl relative">
                    <Image
                      alt="grid-10-bg"
                      src="/images/campaign/grid-office-bg.png"
                      width={588}
                      height={283}
                      className="w-full"
                    />
                    <div className="absolute bottom-0 lg:px-8 lg:py-10  px-6 py-7.5">
                      <p
                        className={
                          'mt-4 text-white font-proxima-nova font-bold xl:text-28 xl:leading-8 text-20 leading-6 -tracking-05'
                        }
                      >
                        Premier
                        <br />
                        Office Spaces
                      </p>
                      <p className="text-white/80 [leading-trim:both] [text-edge:cap] ont-proxima-nova text-20 font-normal leading-8 tracking-[-0.4px]">
                        at Innovation City HQ
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#0A0A0F] rounded-3xl relative col-span-2  ">
                    <Image
                      alt="grid-10-bg"
                      src="/images/campaign/grid-tree-bg.png"
                      width={588}
                      height={283}
                      className="w-full"
                    />
                    <div className="absolute  bottom-10 right-8">
                      <p className="text-white/80 text-right [leading-trim:both] [text-edge:cap] font-proxima-nova sm:text-20 text-base font-normal sm:leading-8 leading-5.5 tracking-[-0.4px]">
                        Access to
                      </p>

                      <p className=" mt-0 text-white [leading-trim:both] [text-edge:cap] font-proxima-nova lg:text-28 text-20 font-bold lg:leading-8 leading-5.5 -tracking-05 text-right">
                        Creator Studio &amp; <br /> Event Space
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* All-InclusiveUAE Business Setup */}

          <section className="pt-20 pb-12">
            <div className="container" data-aos="fade-up">
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-8">
                  <h2 className="xl:mb-5 lg:mb-5 sm:mb-16 mb-12.5 font-bold sm:text-35 sm:leading-8.75 xl:text-[56px] xl:leading-14 tracking-[-1.12px] text-white font-proxima-nova sm:max-w-full max-w-[320px]">
                    <span className="bg-linear-to-r from-[#5EBED3] to-custom bg-clip-text text-transparent">
                      All-Inclusive
                    </span>{' '}
                    <br />
                    UAE Business Setup
                  </h2>
                  <h3 className="text-white font-montserrat text-base font-normal leading-4 tracking-[0.16px]">
                    Starting from
                  </h3>
                  <h4 className="text-white font-proxima text-36 font-bold leading-14 mb-6.5">
                    ₹1.65 <span className="text-white  text-20 leading-4 font-[400px]">LAC*</span>
                  </h4>
                  <div className="point-wrap mb-6.5">
                    <div className="flex items-center gap-3 min-h-15.75 border-b border-[rgba(255,255,255,0.18)] ">
                      <Image
                        alt="allpoint"
                        src="/images/campaign/allpoint.svg"
                        width={20}
                        height={20}
                      />
                      <p className="text-white/80 font-montserrat text-base font-normal leading-4 tracking-[0.16px]">
                        Business License
                      </p>
                    </div>

                    <div className="flex items-center gap-3 min-h-15.75 border-b border-[rgba(255,255,255,0.18)] ">
                      <Image
                        alt="allpoint"
                        src="/images/campaign/allpoint.svg"
                        width={20}
                        height={20}
                      />
                      <p className="text-white/80 font-montserrat text-base font-normal leading-4 tracking-[0.16px]">
                        Registered Business Address
                      </p>
                    </div>

                    <div className="flex items-center gap-3 min-h-15.75 border-b border-[rgba(255,255,255,0.18)] ">
                      <Image
                        alt="allpoint"
                        src="/images/campaign/allpoint.svg"
                        width={20}
                        height={20}
                      />
                      <p className="text-white/80 font-montserrat text-base font-normal leading-4 tracking-[0.16px]">
                        Visa Assistance & Guidance
                      </p>
                    </div>

                    <div className="flex items-center gap-3 min-h-15.75 border-b border-[rgba(255,255,255,0.18)] ">
                      <Image
                        alt="allpoint"
                        src="/images/campaign/allpoint.svg"
                        width={20}
                        height={20}
                      />
                      <p className="text-white/80 font-montserrat text-base font-normal leading-4 tracking-[0.16px]">
                        Access to Innovation City Ecosystem
                      </p>
                    </div>

                    <div className="flex items-center gap-3 min-h-15.75  ">
                      <Image
                        alt="allpoint"
                        src="/images/campaign/allpoint.svg"
                        width={20}
                        height={20}
                      />
                      <p className="text-white/80 font-montserrat text-base font-normal leading-4 tracking-[0.16px]">
                        Dedicated Setup Support
                      </p>
                    </div>
                  </div>
                  <h3 className="text-white/80 font-montserrat text-base font-bold leading-4 tracking-[0.16px] max-md:mt-12">
                    No hidden charges. No confusing fine print.
                  </h3>
                </div>
                <div className="col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-4 max-md:mt-12">
                  <div className="rounded-3xl border border-white/20 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(87,82,163,0.40)_100%)] backdrop-blur-sm p-14 h-full flex flex-col justify-between">
                    <div className="con-all">
                      <h2 className="text-white font-proxima text-[40px] font-bold leading-11 tracking-[-0.8px] mb-6">
                        Speak to a UAE Business Expert Now
                      </h2>
                      <p className="text-white/80 font-montserrat text-base font-normal leading-7 mb-5">
                        Get personalized guidance and take the next step toward setting up and
                        scaling your business.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={scrollToForm}
                      className="flex h-10.5 px-10 py-3 justify-center items-center gap-2.5 rounded-lg bg-[#5EBED3] text-[#212121] font-montserrat text-[12px] font-bold leading-none sm:mt-0 mt-6 hover:bg-white transition w-full text-center"
                    >
                      Get in Touch
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* rate */}

          <section className="rate pt-20">
            <div className="container" data-aos="fade-up">
              <h2 className="text-white max-md:text-left font-proxima-nova font-bold xl:text-45 leading-11.75 lg:text-[40px] lg:leading-10 sm:text-35 sm:leading-8.75 text-[40px] tracking-[-1.12px] mb-9 text-center">
                Trusted by
                <span className="bg-linear-to-r from-[#5EBED3] to-custom bg-clip-text text-transparent">
                  Founders Like You
                </span>
              </h2>
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-4">
                  <div className="rate-box rounded-3xl border border-white/20 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(87,82,163,0.40)_100%)] backdrop-blur-sm p-14">
                    <p className="text-white/80 text-center font-montserrat text-20 font-normal leading-7.5 mb-9">
                      “Highly recommended for Indian entrepreneurs looking to go global.”
                    </p>
                    <div className="rate-img-wrap flex justify-center mb-3">
                      <Image
                        alt="g"
                        src="/images/campaign/g.svg"
                        width={24}
                        height={24}
                        className="mr-2"
                      />
                      <Image alt="st" src="/images/campaign/st.svg" width={108} height={20} />
                    </div>
                    <p className="text-white/80 text-center font-montserrat text-base font-bold leading-7.5">
                      Founder from Mumbai
                    </p>
                  </div>
                </div>

                <div className="col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-4">
                  <div className="rate-box rounded-3xl border border-white/20 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(87,82,163,0.40)_100%)] backdrop-blur-sm p-14">
                    <p className="text-white/80 text-center font-montserrat text-20 font-normal leading-7.5 mb-9">
                      “Smooth process, clear communication, and no false promises. We set up our UAE
                      company faster than expected.”
                    </p>
                    <div className="rate-img-wrap flex justify-center mb-3">
                      <Image
                        alt="g"
                        src="/images/campaign/g.svg"
                        width={24}
                        height={24}
                        className="mr-2"
                      />
                      <Image alt="st" src="/images/campaign/st.svg" width={108} height={20} />
                    </div>
                    <p className="text-white/80 text-center font-montserrat text-base font-bold leading-7.5">
                      Founder from Bangalore
                    </p>
                  </div>
                </div>

                <div className="col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-4">
                  <div className="rate-box rounded-3xl border border-white/20 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(87,82,163,0.40)_100%)] backdrop-blur-sm p-14">
                    <p className="text-white/80 text-center font-montserrat text-20 font-normal leading-7.5 mb-9">
                      “Clear guidance, fast execution, and a team that actually understands what
                      founders need.”
                    </p>
                    <div className="rate-img-wrap flex justify-center mb-3">
                      <Image
                        alt="g"
                        src="/images/campaign/g.svg"
                        width={24}
                        height={24}
                        className="mr-2"
                      />
                      <Image alt="st" src="/images/campaign/st.svg" width={108} height={20} />
                    </div>
                    <p className="text-white/80 text-center font-montserrat text-base font-bold leading-7.5">
                      Founder from Delhi
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* team */}

          <section data-aos="fade-up" className="w-full text-white mt-20">
            <div className="container">
              <div
                className="flex flex-col sm:flex-row sm:items-end items-start sm:justify-between justify-start mb-12 gap-2"
                data-aos="fade-up"
              >
                <h2
                  className={
                    'text-white font-proxima-nova font-bold xl:text-45 leading-11.75 lg:text-[40px] lg:leading-10 sm:text-35 sm:leading-8.75 text-[40px] tracking-[-1.12px]'
                  }
                >
                  <span className="bg-linear-to-r from-[#5EBED3] to-custom bg-clip-text text-transparent">
                    The Team Behind
                  </span>
                  Innovation City
                </h2>

                <div className="w-auto flex gap-4 max-md:mt-6 max-md:ml-auto">
                  <button type="button" className="swiper-button-custom-prev">
                    <span className="sr-only">Previous Slide</span>
                    <svg
                      width="51"
                      height="51"
                      viewBox="0 0 51 51"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="24.5"
                        cy="24.5"
                        r="25"
                        transform="matrix(-1 0 0 1 50 1)"
                        fill="url(#paint0_linear_10193_2126)"
                        fillOpacity="0.36"
                        stroke="url(#paint1_linear_10193_2126)"
                      />
                      <path
                        d="M33.5713 26L16.4284 26"
                        stroke="#5FC2D5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22.4287 20L16.4287 26L22.4287 32"
                        stroke="#5FC2D5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_10193_2126"
                          x1="11.5"
                          y1="7"
                          x2="38"
                          y2="45"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#5FC2D5" stopOpacity="0.49" />
                          <stop offset="1" stopColor="#5FC2D5" stopOpacity="0.25" />
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_10193_2126"
                          x1="24.5"
                          y1="0"
                          x2="24.5"
                          y2="49"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#5FC2D5" stopOpacity="0.27" />
                          <stop offset="1" stopColor="#5FC2D5" stopOpacity="0.04" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </button>

                  <button type="button" className="swiper-button-custom-next">
                    <span className="sr-only">Next Slide</span>
                    <svg
                      width="51"
                      height="51"
                      viewBox="0 0 51 51"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="25.5"
                        cy="25.5"
                        r="25"
                        fill="url(#paint0_linear_10193_2121)"
                        fillOpacity="0.36"
                        stroke="url(#paint1_linear_10193_2121)"
                      />
                      <path
                        d="M17.4287 26L34.5716 26"
                        stroke="#5FC2D5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M28.5713 20L34.5713 26L28.5713 32"
                        stroke="#5FC2D5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_10193_2121"
                          x1="12.5"
                          y1="8"
                          x2="39"
                          y2="46"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#5FC2D5" stopOpacity="0.49" />
                          <stop offset="1" stopColor="#5FC2D5" stopOpacity="0.25" />
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_10193_2121"
                          x1="25.5"
                          y1="1"
                          x2="25.5"
                          y2="50"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#5FC2D5" stopOpacity="0.27" />
                          <stop offset="1" stopColor="#5FC2D5" stopOpacity="0.04" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="w-full">
                <div className="w-full">
                  <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    slidesPerView={1}
                    spaceBetween={20}
                    centeredSlides={false}
                    loop
                    navigation={{
                      nextEl: '.swiper-button-custom-next',
                      prevEl: '.swiper-button-custom-prev',
                    }}
                    breakpoints={{
                      0: {
                        slidesPerView: 1.3, // mobile
                      },
                      768: {
                        slidesPerView: 2, // tablet
                      },
                      1024: {
                        slidesPerView: 4, // desktop
                      },
                    }}
                    className="team-swiper w-full"
                  >
                    <SwiperSlide className="swiper-slide">
                      <div className="rounded-xl overflow-hidden border border-transparent transition">
                        <Image
                          alt="Paul Dawalibi"
                          src="/images/team/team-1.png"
                          width={282}
                          height={352}
                          className="w-full rounded-2xl"
                        />
                        <div className="py-4 text-left">
                          <h3 className="text-white font-proxima-nova font-semibold text-22 leading-[24.2px]">
                            Paul Dawalibi
                          </h3>
                          <p className="text-white/80 font-mon text-sm mt-0 leading-6">
                            Chief Executive Officer
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide className="swiper-slide">
                      <div className="rounded-xl overflow-hidden border border-transparent transition">
                        <Image
                          alt="Nabil Arnous"
                          src="/images/team/team-2.png"
                          width={282}
                          height={352}
                          className="w-full rounded-2xl"
                        />
                        <div className="py-4 text-left">
                          <h3 className="text-white font-proxima-nova font-semibold text-22 leading-[24.2px]">
                            Nabil Arnous
                          </h3>
                          <p className="text-white/80 font-mon text-sm mt-0 leading-6">
                            Chief Commercial Officer
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide className="swiper-slide">
                      <div className="rounded-xl overflow-hidden border border-transparent transition">
                        <Image
                          alt="Yahya Abu Hlwa"
                          src="/images/team/team-3.png"
                          width={282}
                          height={352}
                          className="w-full rounded-2xl"
                        />
                        <div className="py-4 text-left">
                          <h3 className="text-white font-proxima-nova font-semibold text-22 leading-[24.2px]">
                            Yahya Abu Hlwa
                          </h3>
                          <p className="text-white/80 font-mon text-sm mt-0 leading-6">
                            Head of B2B
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide className="swiper-slide">
                      <div className="rounded-xl overflow-hidden border border-transparent transition">
                        <Image
                          alt="Nicolas El Fata"
                          src="/images/team/team-4.png"
                          width={282}
                          height={352}
                          className="w-full rounded-2xl"
                        />
                        <div className="py-4 text-left">
                          <h3 className="text-white font-proxima-nova font-semibold text-22 leading-[24.2px]">
                            Nicolas El Fata
                          </h3>
                          <p className="text-white/80 font-mon text-sm mt-0 leading-6">
                            Business Setup Advisor
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide className="swiper-slide">
                      <div className="rounded-xl overflow-hidden border border-transparent transition">
                        <Image
                          alt="Hanan Kacem"
                          src="/images/team/team-5-new-u.png"
                          width={282}
                          height={352}
                          className="w-full rounded-2xl"
                        />
                        <div className="py-4 text-left">
                          <h3 className="text-white font-proxima-nova font-semibold text-22 leading-[24.2px]">
                            Hanan Kacem
                          </h3>
                          <p className="text-white/80 font-mon text-sm mt-0 leading-6">
                            Business Setup Advisor
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide className="swiper-slide">
                      <div className="rounded-xl overflow-hidden border border-transparent transition">
                        <Image
                          alt="Paul Dawalibi"
                          src="/images/team/team-1.png"
                          width={282}
                          height={352}
                          className="w-full rounded-2xl"
                        />
                        <div className="py-4 text-left">
                          <h3 className="text-white font-proxima-nova font-semibold text-22 leading-[24.2px]">
                            Paul Dawalibi
                          </h3>
                          <p className="text-white/80 font-mon text-sm mt-0 leading-6">
                            Chief Executive Officer
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide className="swiper-slide">
                      <div className="rounded-xl overflow-hidden border border-transparent transition">
                        <Image
                          alt="Nabil Arnous"
                          src="/images/team/team-2.png"
                          width={282}
                          height={352}
                          className="w-full rounded-2xl"
                        />
                        <div className="py-4 text-left">
                          <h3 className="text-white font-proxima-nova font-semibold text-22 leading-[24.2px]">
                            Nabil Arnous
                          </h3>
                          <p className="text-white/80 font-mon text-sm mt-0 leading-6">
                            Chief Commercial Officer
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide className="swiper-slide">
                      <div className="rounded-xl overflow-hidden border border-transparent transition">
                        <Image
                          alt="Yahya Abu Hlwa"
                          src="/images/team/team-3.png"
                          width={282}
                          height={352}
                          className="w-full rounded-2xl"
                        />
                        <div className="py-4 text-left">
                          <h3 className="text-white font-proxima-nova font-semibold text-22 leading-[24.2px]">
                            Yahya Abu Hlwa
                          </h3>
                          <p className="text-white/80 font-mon text-sm mt-0 leading-6">
                            Head of B2B
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide className="swiper-slide">
                      <div className="rounded-xl overflow-hidden border border-transparent transition">
                        <Image
                          alt="Nicolas El Fata"
                          src="/images/team/team-4.png"
                          width={282}
                          height={352}
                          className="w-full rounded-2xl"
                        />
                        <div className="py-4 text-left">
                          <h3 className="text-white font-proxima-nova font-semibold text-22 leading-[24.2px]">
                            Nicolas El Fata
                          </h3>
                          <p className="text-white/80 font-mon text-sm mt-0 leading-6">
                            Business Setup Advisor
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide className="swiper-slide">
                      <div className="rounded-xl overflow-hidden border border-transparent transition">
                        <Image
                          alt="Hanan Kacem"
                          src="/images/team/team-5.png"
                          width={282}
                          height={352}
                          className="w-full rounded-2xl"
                        />
                        <div className="py-4 text-left">
                          <h3 className="text-white font-proxima-nova font-semibold text-22 leading-[24.2px]">
                            Hanan Kacem
                          </h3>
                          <p className="text-white/80 font-mon text-sm mt-0 leading-6">
                            Business Setup Advisor
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>

                <div className="w-full">
                  <div className="text-white [--scroll-bar:0px] relative z-10">
                    <div className="container">
                      <div
                        className="flex flex-col md:flex-row items-start justify-between gap-10"
                        data-aos="fade-up"
                      >
                        <div className="w-full pt-20 max-md:pt-0 order-2 md:order-1 ">
                          <h2 className="xl:mb-16 lg:mb-8.5 sm:mb-16 mb-5.75 font-bold sm:text-35 sm:leading-8.75 lg:text-45 lg:leading-11.75 tracking-[-1.12px] text-white font-proxima-nova sm:max-w-full max-w-[320px] hidden lg:block">
                            <span className="bg-linear-to-r from-[#5EBED3] to-custom bg-clip-text text-transparent">
                              The Fastest Way
                            </span>{' '}
                            <br />
                            to Launch Your Business
                          </h2>

                          <Accordion
                            type="single"
                            collapsible
                            defaultValue="item-0"
                            className="xl:space-y-5 lg:space-y-6 space-y-9  lg:max-w-[384px] max-w-full"
                          >
                            <AccordionItem
                              value="item-0"
                              className="border-b border-white/20  xl:pb-3 lg:pb-3 pb-6"
                            >
                              <AccordionTrigger className="py-0 cursor-pointer text-white font-proxima-nova text-22 leading-normal font-bold [&>svg]:hidden [&[data-state=open]>span]:text-white">
                                <span className="text-white/80">Select Your Package</span>
                              </AccordionTrigger>
                              <AccordionContent className="pt-0 pb-2">
                                <p className="text-base leading-7 font-normal text-white/80 font-montserrat py-2 transition-all duration-500 ease-in-out translate-y-3 accordion-text">
                                  Choose your preferred package from the different options we
                                  provide.
                                </p>
                              </AccordionContent>
                            </AccordionItem>
                            <AccordionItem
                              value="item-1"
                              className="border-b border-white/20  xl:pb-3 lg:pb-3 pb-6"
                            >
                              <AccordionTrigger className="py-0 cursor-pointer text-white font-proxima-nova text-22 leading-normal font-bold [&>svg]:hidden [&[data-state=open]>span]:text-white">
                                <span className="text-white/80">
                                  Choose Your Business Activities
                                </span>
                              </AccordionTrigger>
                              <AccordionContent className="pt-0 pb-2">
                                <p className="text-base leading-7 font-normal text-white/80 font-montserrat py-2 transition-all duration-500 ease-in-out translate-y-3 accordion-text">
                                  Select future-forward activities - AI, Web3, Gaming, Robotics and
                                  more - fully aligned with global standards.
                                </p>
                              </AccordionContent>
                            </AccordionItem>
                            <AccordionItem
                              value="item-2"
                              className="border-b border-white/20  xl:pb-3 lg:pb-3 pb-6"
                            >
                              <AccordionTrigger className="py-0 cursor-pointer text-white font-proxima-nova text-22 leading-normal font-bold [&>svg]:hidden [&[data-state=open]>span]:text-white">
                                <span className="text-white/80">Submit Your Application</span>
                              </AccordionTrigger>
                              <AccordionContent className="pt-0 pb-2">
                                <p className="text-base leading-7 font-normal text-white/80 font-montserrat py-2 transition-all duration-500 ease-in-out translate-y-3 accordion-text">
                                  Upload your documents and complete the process through our
                                  seamless, digital platform.
                                </p>
                              </AccordionContent>
                            </AccordionItem>
                            <AccordionItem
                              value="item-3"
                              className="border-b border-white/20  xl:pb-3 lg:pb-3 pb-6"
                            >
                              <AccordionTrigger className="py-0 cursor-pointer text-white font-proxima-nova text-22 leading-normal font-bold [&>svg]:hidden [&[data-state=open]>span]:text-white">
                                <span className="text-white/80">Start Your Business</span>
                              </AccordionTrigger>
                              <AccordionContent className="pt-0 pb-2">
                                <p className="text-base leading-7 font-normal text-white/80 font-montserrat py-2 transition-all duration-500 ease-in-out translate-y-3 accordion-text">
                                  Launch and scale within a next-generation ecosystem built to
                                  accelerate innovators and disruptors.
                                </p>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>

                          <button
                            type="button"
                            onClick={scrollToForm}
                            className={
                              'mt-12 flex h-10.5 px-10 py-3 justify-center items-center gap-2.5 rounded-lg bg-[#5EBED3] text-[#212121] font-montserrat text-[12px] font-bold leading-none hover:bg-white transition mx-auto lg:mx-0'
                            }
                          >
                            START TODAY
                          </button>
                        </div>

                        <div className="relative w-full max-md:h-full h-200 overflow-hidden order-1 md:order-2 ">
                          <h2 className="xl:mb-16 lg:mb-8.5 sm:mb-16 mb-7.5 font-bold sm:text-35 sm:leading-8.75 lg:text-45 lg:leading-11.75 tracking-[-1.12px] text-white font-proxima-nova sm:max-w-full max-w-[320px] block lg:hidden">
                            <span className="bg-linear-to-r from-[#5EBED3] to-custom bg-clip-text text-transparent">
                              The Fastest Way
                            </span>
                            to Launch Your Business
                          </h2>

                          <video
                            ref={videoRef}
                            id="introVideo"
                            src="/videos/campaign/video-1.mp4"
                            className="w-full h-full object-cover rounded-3xl"
                            style={{ objectPosition: '0% 10%' }}
                            autoPlay
                            loop
                            playsInline
                            muted
                          ></video>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="w-full bg-black relative overflow-hidden">
          {/* Desktop Background */}
          <Image
            alt="bg-bottom-wrapper"
            src="/images/campaign/bg-bottom-wrapper.png"
            width={1440}
            height={947}
            className="w-full absolute hidden md:block bottom-0"
          />

          {/* Mobile Background */}
          <Image
            alt="bg-bottom-wrapper-mob"
            src="/images/campaign/bg-bottom-wrapper-mob.png"
            width={390}
            height={234}
            className="w-full absolute bottom-0 block md:hidden"
          />

          {/* accordion */}

          <div className="text-white  pt-20 [--scroll-bar:0px] relative z-10">
            <div className="container">
              <div className="flex items-start justify-between gap-10" data-aos="fade-up">
                {/* LEFT */}
                <div className=" w-full">
                  {/* ACCORDION */}

                  {/* ACCORDION WRAPPER */}
                  <div id="faqAccordion" className="max-w-200 mx-auto text-white font-sans">
                    <h2
                      className={
                        'text-white font-proxima-nova font-bold xl:text-[56px] xl:leading-14 lg:text-[40px] lg:leading-10 sm:text-35 sm:leading-8.75 text-[40px] tracking-[-1.12px] mb-6'
                      }
                    >
                      Your Common Questions
                      <br />
                      <span className="bg-linear-to-r from-[#5EBED3] to-custom bg-clip-text text-transparent">
                        Answered
                      </span>
                    </h2>

                    <Accordion
                      type="single"
                      collapsible
                      defaultValue="item-0"
                      className="space-y-6"
                    >
                      <AccordionItem
                        value="item-0"
                        className="rounded-3xl border border-white/20 bg-white/10 py-7.5 px-5"
                      >
                        <AccordionTrigger className="px-4 py-2 flex justify-between items-center cursor-pointer text-white font-montserrat text-base font-semibold leading-4 [&>svg]:hidden [&[data-state=open]>span]:after:scale-y-0">
                          Can Indians own 100% of the company?
                          <span
                            className={cn(
                              'text-[#5EBED3] relative w-3 h-3',
                              'after:transition-all after:duration-300',
                              "before:content[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:w-full before:h-px before:bg-current before:content['']",
                              "after:absolute after:left-1/2 after:-translate-x-1/2 after:top-1/2 after:-translate-y-1/2 after:w-px after:h-full after:bg-current before:content['']",
                            )}
                            aria-hidden="true"
                          />
                        </AccordionTrigger>
                        <AccordionContent className="px-4 py-0">
                          <p className="mt-3 text-base leading-7 font-normal text-white/60 font-montserrat">
                            Yes. You get full ownership — no local sponsor required.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem
                        value="item-1"
                        className="rounded-3xl border border-white/20 bg-white/10 py-7.5 px-5"
                      >
                        <AccordionTrigger className="px-4 py-2 flex justify-between items-center cursor-pointer text-white font-montserrat text-base font-semibold leading-4 [&>svg]:hidden [&[data-state=open]>span]:after:scale-y-0">
                          Do you help with visas?
                          <span
                            className={cn(
                              'text-[#5EBED3] relative w-3 h-3',
                              'after:transition-all after:duration-300',
                              "before:content[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:w-full before:h-px before:bg-current before:content['']",
                              "after:absolute after:left-1/2 after:-translate-x-1/2 after:top-1/2 after:-translate-y-1/2 after:w-px after:h-full after:bg-current before:content['']",
                            )}
                            aria-hidden="true"
                          />
                        </AccordionTrigger>
                        <AccordionContent className="px-4 py-0">
                          <p className="mt-3 text-base leading-7 font-normal text-white/60 font-montserrat">
                            Yes. We guide you through the full residency visa process.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem
                        value="item-2"
                        className="rounded-3xl border border-white/20 bg-white/10 py-7.5 px-5"
                      >
                        <AccordionTrigger className="px-4 py-2 flex justify-between items-center cursor-pointer text-white font-montserrat text-base font-semibold leading-4 [&>svg]:hidden [&[data-state=open]>span]:after:scale-y-0">
                          Can I operate from India?
                          <span
                            className={cn(
                              'text-[#5EBED3] relative w-3 h-3',
                              'after:transition-all after:duration-300',
                              "before:content[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:w-full before:h-px before:bg-current before:content['']",
                              "after:absolute after:left-1/2 after:-translate-x-1/2 after:top-1/2 after:-translate-y-1/2 after:w-px after:h-full after:bg-current before:content['']",
                            )}
                            aria-hidden="true"
                          />
                        </AccordionTrigger>
                        <AccordionContent className="px-4 py-0">
                          <p className="mt-3 text-base leading-7 font-normal text-white/60 font-montserrat">
                            Yes. Many founders manage their UAE company remotely.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem
                        value="item-3"
                        className="rounded-3xl border border-white/20 bg-white/10 py-7.5 px-5"
                      >
                        <AccordionTrigger className="px-4 py-2 flex justify-between items-center cursor-pointer text-white font-montserrat text-base font-semibold leading-4 [&>svg]:hidden [&[data-state=open]>span]:after:scale-y-0">
                          Can I pay from India?
                          <span
                            className={cn(
                              'text-[#5EBED3] relative w-3 h-3',
                              'after:transition-all after:duration-300',
                              "before:content[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:w-full before:h-px before:bg-current before:content['']",
                              "after:absolute after:left-1/2 after:-translate-x-1/2 after:top-1/2 after:-translate-y-1/2 after:w-px after:h-full after:bg-current before:content['']",
                            )}
                            aria-hidden="true"
                          />
                        </AccordionTrigger>
                        <AccordionContent className="px-4 py-0">
                          <p className="mt-3 text-base leading-7 font-normal text-white/60 font-montserrat">
                            Yes. Payment options and guidance are provided during consultation.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem
                        value="item-4"
                        className="rounded-3xl border border-white/20 bg-white/10 py-7.5 px-5"
                      >
                        <AccordionTrigger className="px-4 py-2 flex justify-between items-center cursor-pointer text-white font-montserrat text-base font-semibold leading-4 [&>svg]:hidden [&[data-state=open]>span]:after:scale-y-0">
                          How long does the setup take?
                          <span
                            className={cn(
                              'text-[#5EBED3] relative w-3 h-3',
                              'after:transition-all after:duration-300',
                              "before:content[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:w-full before:h-px before:bg-current before:content['']",
                              "after:absolute after:left-1/2 after:-translate-x-1/2 after:top-1/2 after:-translate-y-1/2 after:w-px after:h-full after:bg-current before:content['']",
                            )}
                            aria-hidden="true"
                          />
                        </AccordionTrigger>
                        <AccordionContent className="px-4 py-0">
                          <p className="mt-3 text-base leading-7 font-normal text-white/60 font-montserrat">
                            Typically a few working days, depending on activity
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="text-white md:pt-20 md:pb-20 pt-20 pb-20 relative z-10"
            data-aos="fade-up"
          >
            <div className="container">
              <div className="relative">
                {/* Background Image Section */}
                {/* Desktop Image */}
                <Image
                  alt="launch-ur-business"
                  src="/images/campaign/launch-ur-business.png"
                  width={1200}
                  height={372}
                  className="w-full hidden md:block"
                />

                {/* Mobile Image */}
                <Image
                  alt="Launch Your Business Mobile View"
                  src="/images/campaign/launch-ur-business-mobile-view.png"
                  width={350}
                  height={509}
                  className="w-full block md:hidden"
                />

                {/* Content Section */}
                <div className="absolute z-10 launch-heading-top xl:top-23 lg:left-14 sm:left-5 left-auto top-15.75 max-md:top-[30%] sm:px-0 px-11.25 sm:top-7.5 sm:text-left text-center launch-pd">
                  <div className=" sm:block flex flex-col justify-center items-center m-auto">
                    <h2
                      className={
                        'text-white font-proxima-nova font-bold lg:text-[56px] lg:leading-12.75 md:text-35 md:leading-8.75 sm:text-35 sm:leading-8.75 text-[40px] leading-10 tracking-[-1.12px] mb-6'
                      }
                    >
                      Start Your UAE Business <br />
                      Journey Today
                    </h2>

                    <p className="text-white/80 font-montserrat text-base font-normal leading-7 mb-6 sm:text-left text-center">
                      Get expert guidance, transparent pricing, and a setup that actually works.
                    </p>

                    <button
                      type="button"
                      onClick={scrollToForm}
                      className={
                        'flex h-10.5 px-10 py-3 justify-end items-center gap-2.5 rounded-lg bg-[#5EBED3] text-[#212121] font-montserrat text-[12px] font-bold leading-none hover:bg-white transition'
                      }
                    >
                      START TODAY
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </Fragment>
  )
}
