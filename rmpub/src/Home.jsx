import React, { useEffect } from 'react'
import bootstrap from '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

import { Splide, SplideSlide } from "@splidejs/react-splide";

import "@splidejs/splide/dist/css/themes/splide-default.min.css";

const Home = () => {
    const images = ["d1.jpg", "d2.jpg", "d3.jpg", "d4.jpg", "d5.jpg", "d6.jpg", "d7.jpg"];
    const titles = [
        "Progressive web app ready",
        "Reusable components",
        "Great for phones & tablets",
        "Change the styles in sass",
        "Sketch source file included",
        "RTL (Right to Left) Support",
        "Written with a code structure"
    ];
    useEffect(() => {


        const Mobilekit = {
            version: "2.9", // Mobilekit version

            PWA: {
                enable: true, // Enable or disable PWA
            },

            Dark_Mode: {
                default: false, // Set dark mode as main theme
                night_mode: { // Activate dark mode between certain times of the day
                    enable: false, // Enable or disable night mode
                    start_time: 20, // Start at 20:00
                    end_time: 7, // End at 07:00
                },
                auto_detect: { // Auto detect user's preferences and activate dark mode
                    enable: false,
                }
            },
            //-------------------------------------------------------------------
            // Right to Left (RTL) Settings
            RTL: {
                enable: false, // Enable or disable RTL Mode
            },
            //-------------------------------------------------------------------
            // Test Mode
            Test: {
                enable: true, // Enable or disable test mode
                word: "testmode", // The word that needs to be typed to activate test mode
                alert: true, // Enable or disable alert when test mode is activated
                alertMessage: "Test mode has been activated. Look at the developer console!" // Alert message
            }
            //-------------------------------------------------------------------
        }
        //-----------------------------------------------------------------------


        //-----------------------------------------------------------------------
        // Elements
        //-----------------------------------------------------------------------
        var pageBody = document.querySelector("body");
        var appSidebar = document.getElementById("sidebarPanel")
        var loader = document.getElementById('loader');
        //-----------------------------------------------------------------------


        //-----------------------------------------------------------------------
        // Service Workers
        //-----------------------------------------------------------------------
        if (Mobilekit.PWA.enable) {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('service-worker.js')
                    .then(reg => console.log('service worker registered'))
                    .catch(err => console.log('service worker not registered - there is an error.', err));
            }
        }
        //-----------------------------------------------------------------------


        //-----------------------------------------------------------------------
        // Page Loader
        //----------------------------------------------------------------------
        setTimeout(() => {
            loader.setAttribute("style", "pointer-events: none; opacity: 0; transition: 0.2s ease-in-out;");
            setTimeout(() => {
                loader.setAttribute("style", "display: none;")
            }, 1000);
        }, 450);
        //-----------------------------------------------------------------------


        //-----------------------------------------------------------------------
        // RTL (Right to Left)
        //-----------------------------------------------------------------------
        if (Mobilekit.RTL.enable) {
            var pageHTML = document.querySelector("html")
            pageHTML.dir = "rtl"
            document.querySelector("body").classList.add("rtl-mode")
            if (appSidebar != null) {
                appSidebar.classList.remove("offcanvas-start")
                appSidebar.classList.add("offcanvas-end")
            }
            document.querySelectorAll(".carousel-full, .carousel-single, .carousel-multiple, .carousel-small, .carousel-slider, .story-block").forEach(function (el) {
                el.setAttribute('data-splide', '{"direction":"rtl"}')
            })
        }
        //-----------------------------------------------------------------------

        //-----------------------------------------------------------------------
        // Fix for # href
        //-----------------------------------------------------------------------
        var aWithHref = document.querySelectorAll('a[href*="#"]');
        aWithHref.forEach(function (el) {
            el.addEventListener("click", function (e) {
                e.preventDefault();
            })
        });
        //-----------------------------------------------------------------------


        //-----------------------------------------------------------------------
        // Go Top Button
        //-----------------------------------------------------------------------
        var goTopButton = document.querySelectorAll(".goTop");
        goTopButton.forEach(function (el) {
            // show fixed button after some scrolling
            window.addEventListener("scroll", function () {
                var scrolled = window.scrollY;
                if (scrolled > 100) {
                    el.classList.add("show")
                }
                else {
                    el.classList.remove("show")
                }
            })
            // go top on click
            el.addEventListener("click", function (e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            })

        })
        //-----------------------------------------------------------------------


        //-----------------------------------------------------------------------
        // Go Back Button
        var goBackButton = document.querySelectorAll(".goBack");
        goBackButton.forEach(function (el) {
            el.addEventListener("click", function () {
                window.history.go(-1);
            })
        })
        //-----------------------------------------------------------------------


        //-----------------------------------------------------------------------
        // Adbox Close
        var adboxCloseButton = document.querySelectorAll(".adbox .closebutton");
        adboxCloseButton.forEach(function (el) {
            el.addEventListener("click", function () {
                var adbox = this.parentElement
                adbox.classList.add("hide");
            })
        })
        //-----------------------------------------------------------------------


        //-----------------------------------------------------------------------
        // Copyright Year
        var date = new Date();
        var nowYear = date.getFullYear();
        var copyrightYear = document.querySelectorAll('.yearNow');
        copyrightYear.forEach(function (el) {
            el.innerHTML = nowYear
        })
        //-----------------------------------------------------------------------


        //-----------------------------------------------------------------------
        // Stories Component
        var storiesButton = document.querySelectorAll("[data-component='stories']");
        storiesButton.forEach(function (el) {
            el.addEventListener("click", function () {
                var target = this.getAttribute("data-bs-target");
                var content = document.querySelector(target + " .modal-content");
                var storytime = this.getAttribute("data-time");
                target = document.querySelector(target);
                if (storytime) {
                    target.classList.add("with-story-bar");
                    content.appendChild(document.createElement("div")).className = "story-bar";
                    var storybar = document.querySelector("#" + target.id + " .story-bar")
                    storybar.innerHTML = "<span></span>";
                    //
                    document.querySelector("#" + target.id + " .story-bar span").animate({
                        width: '100%'
                    }, storytime)

                    var storyTimeout = setTimeout(() => {
                        var modalEl = document.getElementById(target.id)
                        var modal = bootstrap.Modal.getInstance(modalEl)
                        modal.hide();
                        storybar.remove();
                        target.classList.remove("with-story-bar");
                    }, storytime);

                    var closeButton = document.querySelectorAll(".close-stories")
                    closeButton.forEach(function (el) {
                        el.addEventListener("click", function () {
                            clearTimeout(storyTimeout);
                            storybar.remove();
                            target.classList.remove("with-story-bar");
                        })
                    })

                }
            })
        })
        //-----------------------------------------------------------------------


        //-----------------------------------------------------------------------
        // OS Detection
        var osDetection = navigator.userAgent || navigator.vendor || window.opera;
        var windowsPhoneDetection = /windows phone/i.test(osDetection);
        var androidDetection = /android/i.test(osDetection);
        var iosDetection = /iPad|iPhone|iPod/.test(osDetection) && !window.MSStream;

        var detectionWindowsPhone = document.querySelectorAll(".windowsphone-detection");
        var detectionAndroid = document.querySelectorAll(".android-detection");
        var detectioniOS = document.querySelectorAll(".ios-detection");
        var detectionNone = document.querySelectorAll(".non-mobile-detection");

        if (windowsPhoneDetection) {
            // Windows Phone Detected
            detectionWindowsPhone.forEach(function (el) {
                el.classList.add("is-active");
            })
        }
        else if (androidDetection) {
            // Android Detected
            detectionAndroid.forEach(function (el) {
                el.classList.add("is-active");
            })
        }
        else if (iosDetection) {
            // iOS Detected
            detectioniOS.forEach(function (el) {
                el.classList.add("is-active");
            })
        }
        else {
            // Non-Mobile Detected
            detectionNone.forEach(function (el) {
                el.classList.add("is-active");
            })

        }
        //-----------------------------------------------------------------------


        //-----------------------------------------------------------------------
        // Tooltip
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        })
        //-----------------------------------------------------------------------


        //-----------------------------------------------------------------------
        // Input
        // Clear input
        var clearInput = document.querySelectorAll(".clear-input");
        clearInput.forEach(function (el) {
            el.addEventListener("click", function () {
                var parent = this.parentElement
                var input = parent.querySelector(".form-control")
                input.focus();
                input.value = "";
                parent.classList.remove("not-empty");
            })
        })
        // active
        var formControl = document.querySelectorAll(".form-group .form-control");
        formControl.forEach(function (el) {
            // active
            el.addEventListener("focus", () => {
                var parent = el.parentElement
                parent.classList.add("active")
            });
            el.addEventListener("blur", () => {
                var parent = el.parentElement
                parent.classList.remove("active")
            });
            // empty check
            el.addEventListener("keyup", log);
            function log(e) {
                var inputCheck = this.value.length;
                if (inputCheck > 0) {
                    this.parentElement.classList.add("not-empty")
                }
                else {
                    this.parentElement.classList.remove("not-empty")
                }
            }
        })
        //-----------------------------------------------------------------------


        //-----------------------------------------------------------------------
        // Searchbox Toggle
        var searchboxToggle = document.querySelectorAll(".toggle-searchbox")
        searchboxToggle.forEach(function (el) {
            el.addEventListener("click", function () {
                var search = document.getElementById("search")
                var a = search.classList.contains("show")
                if (a) {
                    search.classList.remove("show")
                }
                else {
                    search.classList.add("show")
                    search.querySelector(".form-control").focus();
                }
            })
        });
        //-----------------------------------------------------------------------


        //-----------------------------------------------------------------------
        // Stepper
        var stepperUp = document.querySelectorAll(".stepper-up");
        stepperUp.forEach(function (el) {
            el.addEventListener("click", function () {
                var input = el.parentElement.querySelector(".form-control");
                input.value = parseInt(input.value) + 1
            })
        })
        var stepperDown = document.querySelectorAll(".stepper-down");
        stepperDown.forEach(function (el) {
            el.addEventListener("click", function () {
                var input = el.parentElement.querySelector(".form-control");
                if (parseInt(input.value) > 0) {
                    input.value = parseInt(input.value) - 1
                }
            })
        })
        //-----------------------------------------------------------------------


        //-----------------------------------------------------------------------
        // Carousel
        // Splide Carousel
        document.addEventListener('DOMContentLoaded', function () {

            // Full Carousel
            document.querySelectorAll('.carousel-full').forEach(carousel => new Splide(carousel, {
                perPage: 1,
                rewind: true,
                type: "loop",
                gap: 0,
                arrows: false,
                pagination: false,
            }).mount());

            // Single Carousel
            document.querySelectorAll('.carousel-single').forEach(carousel => new Splide(carousel, {
                perPage: 3,
                rewind: true,
                type: "loop",
                gap: 16,
                padding: 16,
                arrows: false,
                pagination: false,
                breakpoints: {
                    768: {
                        perPage: 1
                    },
                    991: {
                        perPage: 2
                    }
                }
            }).mount());

            // Multiple Carousel
            document.querySelectorAll('.carousel-multiple').forEach(carousel => new Splide(carousel, {
                perPage: 4,
                rewind: true,
                type: "loop",
                gap: 16,
                padding: 16,
                arrows: false,
                pagination: false,
                breakpoints: {
                    768: {
                        perPage: 2
                    },
                    991: {
                        perPage: 3
                    }
                }
            }).mount());

            // Small Carousel
            document.querySelectorAll('.carousel-small').forEach(carousel => new Splide(carousel, {
                perPage: 9,
                rewind: false,
                type: "loop",
                gap: 16,
                padding: 16,
                arrows: false,
                pagination: false,
                breakpoints: {
                    768: {
                        perPage: 5
                    },
                    991: {
                        perPage: 7
                    }
                }
            }).mount());

            // Slider Carousel
            document.querySelectorAll('.carousel-slider').forEach(carousel => new Splide(carousel, {
                perPage: 1,
                rewind: false,
                type: "loop",
                gap: 16,
                padding: 16,
                arrows: false,
                pagination: true
            }).mount());

            // Stories Carousel
            document.querySelectorAll('.story-block').forEach(carousel => new Splide(carousel, {
                perPage: 16,
                rewind: false,
                type: "slide",
                gap: 16,
                padding: 16,
                arrows: false,
                pagination: false,
                breakpoints: {
                    500: {
                        perPage: 4
                    },
                    768: {
                        perPage: 7
                    },
                    1200: {
                        perPage: 11
                    }
                }
            }).mount());
        });
        //-----------------------------------------------------------------------


        //-----------------------------------------------------------------------
        // Notification
        // trigger notification
        var notificationCloseButton = document.querySelectorAll(".notification-box .close-button");
        var notificationTaptoClose = document.querySelectorAll(".tap-to-close .notification-dialog");
        var notificationBox = document.querySelectorAll(".notification-box");
        var autoCloseNotification;

        function closeNotificationBox() {
            notificationBox.forEach(function (el) {
                el.classList.remove("show")
                clearTimeout(autoCloseNotification)
            })
        }
        function notification(target, time) {
            var a = document.getElementById(target);
            closeNotificationBox()
            setTimeout(() => {
                a.classList.add("show")
            }, 250);
            if (time) {
                time = time + 250;
                autoCloseNotification = setTimeout(() => {
                    closeNotificationBox()
                }, time);
            }
        }
        // close notification
        notificationCloseButton.forEach(function (el) {
            el.addEventListener("click", function (e) {
                e.preventDefault();
                closeNotificationBox();
            })
        });

        // tap to close notification
        notificationTaptoClose.forEach(function (el) {
            el.addEventListener("click", function (e) {
                closeNotificationBox();
            })
        });
        //-----------------------------------------------------------------------


        //-----------------------------------------------------------------------
        // Toast
        // trigger toast
        var toastCloseButton = document.querySelectorAll(".toast-box .close-button");
        var toastTaptoClose = document.querySelectorAll(".toast-box.tap-to-close");
        var toastBoxes = document.querySelectorAll(".toast-box");
        var autoCloseToast;

        function closeToastBox() {
            toastBoxes.forEach(function (el) {
                el.classList.remove("show")
                clearTimeout(autoCloseToast)
            })
        }
        function toastbox(target, time) {
            var a = document.getElementById(target);
            closeToastBox()
            setTimeout(() => {
                a.classList.add("show")
            }, 100);
            if (time) {
                time = time + 100;
                autoCloseToast = setTimeout(() => {
                    closeToastBox()
                }, time);
            }
        }
        // close button toast
        toastCloseButton.forEach(function (el) {
            el.addEventListener("click", function (e) {
                e.preventDefault();
                closeToastBox();
            })
        })
        // tap to close toast
        toastTaptoClose.forEach(function (el) {
            el.addEventListener("click", function (e) {
                closeToastBox();
            })
        })
        //-----------------------------------------------------------------------


        //-----------------------------------------------------------------------
        // Header Scrolled
        // Animated header style
        var appHeader = document.querySelector(".appHeader.scrolled");
        function animatedScroll() {
            var scrolled = window.scrollY;
            if (scrolled > 20) {
                appHeader.classList.add("is-active")
            }
            else {
                appHeader.classList.remove("is-active")
            }
        }
        if (document.body.contains(appHeader)) {
            animatedScroll();
            window.addEventListener("scroll", function () {
                animatedScroll();
            })
        }
        //-----------------------------------------------------------------------


        //-----------------------------------------------------------------------
        // Offline Mode / Online Mode Detection

        // You can change the text here
        var OnlineText = "Connected to Internet";
        var OfflineText = "No Internet Connection";

        // Online Mode Toast Append
        function onlineModeToast() {
            var check = document.getElementById("online-toast");
            if (document.body.contains(check)) {
                check.classList.add("show")
            }
            else {
                pageBody.appendChild(document.createElement("div")).id = "online-toast";
                var toast = document.getElementById("online-toast");
                toast.className = "toast-box bg-success toast-top tap-to-close";
                toast.innerHTML =
                    "<div class='in'><div class='text'>"
                    +
                    OnlineText
                    +
                    "</div></div>"
                setTimeout(() => {
                    toastbox('online-toast', 3000);
                }, 500);
            }
        }

        // Offline Mode Toast Append
        function offlineModeToast() {
            var check = document.getElementById("offline-toast");
            if (document.body.contains(check)) {
                check.classList.add("show")
            }
            else {
                pageBody.appendChild(document.createElement("div")).id = "offline-toast";
                var toast = document.getElementById("offline-toast");
                toast.className = "toast-box bg-danger toast-top tap-to-close";
                toast.innerHTML =
                    "<div class='in'><div class='text'>"
                    +
                    OfflineText
                    +
                    "</div></div>"
                setTimeout(() => {
                    toastbox('offline-toast', 3000);
                }, 500);
            }
        }

        // Online Mode Function
        function onlineMode() {
            var check = document.getElementById("offline-toast");
            if (document.body.contains(check)) {
                check.classList.remove("show")
            }
            onlineModeToast();
            var toast = document.getElementById("online-toast")
            toast.addEventListener("click", function () {
                this.classList.remove("show")
            })
            setTimeout(() => {
                toast.classList.remove("show")
            }, 3000);
        }

        // Online Mode Function
        function offlineMode() {
            var check = document.getElementById("online-toast");
            if (document.body.contains(check)) {
                check.classList.remove("show")
            }
            offlineModeToast();
            var toast = document.getElementById("offline-toast")
            toast.addEventListener("click", function () {
                this.classList.remove("show")
            })
            setTimeout(() => {
                toast.classList.remove("show")
            }, 3000);
        }

        // Check with event listener if online or offline
        window.addEventListener('online', onlineMode);
        window.addEventListener('offline', offlineMode);
        //-----------------------------------------------------------------------



        //-----------------------------------------------------------------------


        //-----------------------------------------------------------------------
        // Multi-level Listview
        var multiListview = document.querySelectorAll(".listview .multi-level > a.item");

        multiListview.forEach(function (el) {
            el.addEventListener("click", function () {
                var parent = this.parentNode;
                var listview = parent.parentNode;
                var container = parent.querySelectorAll('.listview')
                var activated = listview.querySelectorAll('.multi-level.active');
                var activatedContainer = listview.querySelectorAll('.multi-level.active .listview')

                function openContainer() {
                    container.forEach(function (e) {
                        e.style.height = 'auto';
                        var currentheight = e.clientHeight + 10 + 'px';
                        e.style.height = '0px'
                        setTimeout(() => {
                            e.style.height = currentheight
                        }, 0);
                    })
                }
                function closeContainer() {
                    container.forEach(function (e) {
                        e.style.height = '0px';
                    })
                }
                if (parent.classList.contains('active')) {
                    parent.classList.remove('active');
                    closeContainer();
                }
                else {
                    parent.classList.add('active');
                    openContainer();
                }
                activated.forEach(function (element) {
                    element.classList.remove('active');
                    activatedContainer.forEach(function (e) {
                        e.style.height = '0px'
                    })
                })
            });

        })
        //-----------------------------------------------------------------------



        //-----------------------------------------------------------------------
        // Add to Home
        function iosAddtoHome() {
            var offcanvas = new bootstrap.Offcanvas(document.getElementById('ios-add-to-home-screen'))
            offcanvas.toggle();
        }
        function androidAddtoHome() {
            var offcanvas = new bootstrap.Offcanvas(document.getElementById('android-add-to-home-screen'))
            offcanvas.toggle();
        }
        function AddtoHome(time, once) {
            if (once) {
                var AddHomeStatus = localStorage.getItem("MobilekitAddHomeStatus");
                if (AddHomeStatus === "1" || AddHomeStatus === 1) {
                    // already showed up
                }
                else {
                    localStorage.setItem("MobilekitAddHomeStatus", 1)
                    window.addEventListener('load', () => {
                        if (navigator.standalone) {
                            // if app installed ios home screen
                        }
                        else if (matchMedia('(display-mode: standalone)').matches) {
                            // if app installed android home screen
                        }
                        else {
                            // if app is not installed
                            if (androidDetection) {
                                setTimeout(() => {
                                    androidAddtoHome()
                                }, time);
                            }
                            if (iosDetection) {
                                setTimeout(() => {
                                    iosAddtoHome()
                                }, time);
                            }
                        }
                    });
                }
            }
            else {
                window.addEventListener('load', () => {
                    if (navigator.standalone) {
                        // app loaded to ios
                    }
                    else if (matchMedia('(display-mode: standalone)').matches) {
                        // app loaded to android
                    }
                    else {
                        // app not loaded
                        if (androidDetection) {
                            setTimeout(() => {
                                androidAddtoHome()
                            }, time);
                        }
                        if (iosDetection) {
                            setTimeout(() => {
                                iosAddtoHome()
                            }, time);
                        }
                    }
                });
            }

        }
        //-----------------------------------------------------------------------


        //-----------------------------------------------------------------------
        // Dark Mode Detection
        var checkDarkModeStatus = localStorage.getItem("MobilekitDarkMode");
        var switchDarkMode = document.querySelectorAll(".dark-mode-switch");
        var pageBodyActive = pageBody.classList.contains("dark-mode-active");

        // Check if enable as default
        if (Mobilekit.Dark_Mode.default) {
            pageBody.classList.add("dark-mode-active");
        }

        // Night Mode
        if (Mobilekit.Dark_Mode.night_mode.enable) {
            var nightStart = Mobilekit.Dark_Mode.night_mode.start_time;
            var nightEnd = Mobilekit.Dark_Mode.night_mode.end_time;
            var currentDate = new Date();
            var currentHour = currentDate.getHours();
            if (currentHour >= nightStart || currentHour < nightEnd) {
                // It is night time
                pageBody.classList.add("dark-mode-active");
            }
        }

        // Auto Detect Dark Mode
        if (Mobilekit.Dark_Mode.auto_detect.enable)
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                pageBody.classList.add("dark-mode-active");
            }

        function switchDarkModeCheck(value) {
            switchDarkMode.forEach(function (el) {
                el.checked = value
            })
        }
        // if dark mode on
        if (checkDarkModeStatus === 1 || checkDarkModeStatus === "1" || pageBody.classList.contains('dark-mode-active')) {
            switchDarkModeCheck(true);
            if (pageBodyActive) {
                // dark mode already activated
            }
            else {
                pageBody.classList.add("dark-mode-active")
            }
        }
        else {
            switchDarkModeCheck(false);
        }
        switchDarkMode.forEach(function (el) {
            el.addEventListener("click", function () {
                var darkmodeCheck = localStorage.getItem("MobilekitDarkMode");
                var bodyCheck = pageBody.classList.contains('dark-mode-active');
                if (darkmodeCheck === 1 || darkmodeCheck === "1" || bodyCheck) {
                    pageBody.classList.remove("dark-mode-active");
                    localStorage.setItem("MobilekitDarkMode", "0");
                    switchDarkModeCheck(false);
                }
                else {
                    pageBody.classList.add("dark-mode-active")
                    switchDarkModeCheck(true);
                    localStorage.setItem("MobilekitDarkMode", "1");
                }
            })
        })
        //-----------------------------------------------------------------------


        //-----------------------------------------------------------------------
        // Countdown
        function countdownTimer(time) {
            var end = time;
            end = new Date(end).getTime();
            var d, h, m, s;
            setInterval(() => {
                let now = new Date().getTime();
                let r = parseInt((end - now) / 1000);
                if (r >= 0) {
                    // days
                    d = parseInt(r / 86400);
                    r = (r % 86400);
                    // hours
                    h = parseInt(r / 3600);
                    r = (r % 3600);
                    // minutes
                    m = parseInt(r / 60);
                    r = (r % 60);
                    // seconds
                    s = parseInt(r);
                    d = parseInt(d, 10);
                    h = h < 10 ? "0" + h : h;
                    m = m < 10 ? "0" + m : m;
                    s = s < 10 ? "0" + s : s;
                    document.getElementById("countDown").innerHTML =
                        "<div>" + d + "<span>Days</span></div>"
                        +
                        "<div>" + h + "<span>Hours</span></div>"
                        +
                        "<div>" + m + "<span>Minutes</span></div>"
                        +
                        "<div>" + s + "<span>Seconds</span></div>"
                } else {
                    document.getElementById("countDown").innerHTML = "<p class='alert alert-outline-warning'>The countdown is over.</p>"
                }
            }, 1000);
        }
        //-----------------------------------------------------------------------


        //-----------------------------------------------------------------------
        // Cookies Box
        if (document.querySelector(".cookies-modal") === null) {
            // Doesn't exist.
        }
        else {
            var elCookies = document.getElementById("cookies-box");
            var CookiesStatus = localStorage.getItem("MobilekitCookiesStatus");
            function CookiesBox(time) {
                if (CookiesStatus === "1" || CookiesStatus === 1) {
                    // Cookies already accepted.
                }
                else {
                    if (time) {
                        setTimeout(() => {
                            elCookies.classList.add("show");
                        }, time);
                    }
                    else {
                        elCookies.classList.add("show");
                    }
                }
            }
            document.querySelectorAll(".accept-cookies").forEach(function (el) {
                el.addEventListener("click", function () {
                    localStorage.setItem("MobilekitCookiesStatus", "1");
                })
            })
            document.querySelectorAll(".toggle-cookies").forEach(function (el) {
                el.addEventListener("click", function () {
                    elCookies.classList.toggle("show");
                })
            })
        }
        //-----------------------------------------------------------------------



        //-----------------------------------------------------------------------
        // Test Mode
        function testMode() {
            var colorDanger = "color: #EC4433; font-weight:bold;"
            var colorSuccess = "color: #34C759; font-weight:bold;"

            console.clear();
            console.log("%cMobilekit (v" + Mobilekit.version + ")", "font-size: 1.3em; font-weight: bold; color: #FFF; background-color: #1E74FD; padding: 14px 70px; margin-bottom: 16px;")
            console.log("%c🚀 TEST MODE ACTIVATED ..!", "font-size: 1em; font-weight: bold; margin: 4px 0;");

            function testModeMsg(value, msg) {
                if (value) {
                    console.log("%c|" + "%c " + msg + " : " + "%cEnabled", "color: #444; font-size :1.2em; font-weight: bold;", "color: inherit", colorSuccess);
                }
                else if (value == false) {
                    console.log("%c|" + "%c " + msg + " : " + "%cDisabled", "color: #444; font-size :1.2em; font-weight: bold;", "color: inherit", colorDanger);
                }
            }
            function testModeInfo(value, msg) {
                console.log("%c|" + "%c " + msg + " : " + "%c" + value, "color: #444; font-size :1.2em; font-weight: bold;", "color: inherit", "color:#1E74FD; font-weight: bold;");
            }
            function testModeSubtitle(msg) {
                console.log("%c # " + msg, "color: #FFF; background: #444; font-size: 1.2em; padding: 8px 16px; margin-top: 16px; border-radius: 12px 12px 0 0");
            }

            testModeSubtitle("THEME SETTINGS")
            testModeMsg(Mobilekit.PWA.enable, "PWA")
            testModeMsg(Mobilekit.Dark_Mode.default, "Set dark mode as default theme")
            testModeMsg(Mobilekit.Dark_Mode.night_mode.enable, "Night mode (between " + Mobilekit.Dark_Mode.night_mode.start_time + ":00 and " + Mobilekit.Dark_Mode.night_mode.end_time + ":00)")
            testModeMsg(Mobilekit.Dark_Mode.auto_detect.enable, "Auto detect dark mode")
            testModeMsg(Mobilekit.RTL.enable, "RTL")
            testModeMsg(Mobilekit.Test.enable, "Test mode")
            testModeMsg(Mobilekit.Test.alert, "Test mode alert")

            testModeSubtitle("PREVIEW INFOS")
            // Resolution
            testModeInfo(window.screen.availWidth + " x " + window.screen.availHeight, "Resolution")
            // Device
            if (iosDetection) {
                testModeInfo("iOS", "Device")
            }
            else if (androidDetection) {
                testModeInfo("Android", "Device")
            }
            else if (windowsPhoneDetection) {
                testModeInfo("Windows Phone", "Device")
            }
            else {
                testModeInfo("Not a Mobile Device", "Device")
            }
            //Language
            testModeInfo(window.navigator.language, "Language")
            // Theme
            if (pageBody.classList.contains("dark-mode-active")) {
                testModeInfo("Dark Mode", "Current theme")
            }
            else {
                testModeInfo("Light Mode", "Current theme")
            }
            // Online Status
            if (window.navigator.onLine) {
                testModeInfo("Online", "Internet connection")
            }
            else {
                testModeInfo("Offline", "Internet connection")
            }
        }
        function themeTesting() {
            var word = Mobilekit.Test.word;
            var value = "";
            window.addEventListener('keypress', function (e) {
                value = value + String.fromCharCode(e.keyCode).toLowerCase();
                if (value.length > word.length) {
                    value = value.slice(1);
                }
                if (value == word || value === word) {
                    value = ""
                    if (Mobilekit.Test.alert) {
                        var content = document.getElementById("appCapsule")
                        content.appendChild(document.createElement("div")).className = "test-alert-wrapper";
                        var alert =
                            "<div id='alert-toast' class='toast-box toast-center tap-to-close'>"
                            +
                            "<div class='in'>"
                            +
                            "<div class='text'><h1 class='text-light mb-05'>🤖</h1><strong>"
                            +
                            Mobilekit.Test.alertMessage
                            +
                            "</strong></div></div></div>"
                        var wrapper = document.querySelector(".test-alert-wrapper")
                        wrapper.innerHTML = alert;
                        toastbox('alert-toast');
                        setTimeout(() => {
                            this.document.getElementById("alert-toast").classList.remove("show")
                        }, 4000);
                    }
                    testMode();
                }

            })
        }

        if (Mobilekit.Test.enable) {
            themeTesting();
        }
        //-----------------------------------------------------------------------
        var pageBody = document.body;

        // Other parts of your code...

        // if dark mode on
        if (checkDarkModeStatus === "1" || pageBody.classList.contains('dark-mode-active')) {
            switchDarkModeCheck(true);
            if (pageBodyActive) {
                // dark mode already activated
            }
            else {
                pageBody.classList.add("dark-mode-active")
            }
        }
        else {
            switchDarkModeCheck(false);
        }
        switchDarkMode.forEach(function (el) {
            el.addEventListener("change", function () {
                var darkmodeCheck = localStorage.getItem("MobilekitDarkMode");
                var bodyCheck = pageBody.classList.contains('dark-mode-active');
                if (darkmodeCheck === "1" || bodyCheck) {
                    pageBody.classList.remove("dark-mode-active");
                    localStorage.setItem("MobilekitDarkMode", "0");
                    switchDarkModeCheck(false);
                }
                else {
                    pageBody.classList.add("dark-mode-active")
                    switchDarkModeCheck(true);
                    localStorage.setItem("MobilekitDarkMode", "1");
                }
            })
        })
    }, []);

    return (
        <>
            <div id="loader">
                <div class="spinner-border text-primary" role="status"></div>
            </div>

            <div id="notification-welcome" class="notification-box">
                <div class="notification-dialog android-style">
                    <div class="notification-header">
                        <div class="in">
                            <img src="assets/img/icon/72x72.png" alt="image" class="imaged w24" />
                            <strong>Mobilekit</strong>
                            <span>just now</span>
                        </div>
                        <a href="/" class="close-button">
                            <ion-icon name="close"></ion-icon>
                        </a>
                    </div>
                    <div class="notification-content">
                        <div class="in">
                            <h3 class="subtitle">Welcome to Mobilekit</h3>
                            <div class="text">
                                Mobilekit is a PWA ready Mobile UI Kit Template.
                                Great way to start your mobile websites and pwa projects.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="appHeader bg-primary scrolled">
                <div class="left">
                    <a href="/" class="headerButton" data-bs-toggle="offcanvas" data-bs-target="#sidebarPanel">
                        <ion-icon name="menu-outline"></ion-icon>
                    </a>
                </div>
                <div class="pageTitle">
                    Discover
                </div>
                <div class="right">
                    <a href="/" class="headerButton toggle-searchbox">
                        <ion-icon name="search-outline"></ion-icon>
                    </a>
                </div>
            </div>

            <div id="search" class="appHeader">
                <form class="search-form">
                    <div class="form-group searchbox">
                        <input type="text" class="form-control" placeholder="Search..." />
                        <i class="input-icon">
                            <ion-icon name="search-outline"></ion-icon>
                        </i>
                        <a href="/" class="ms-1 close toggle-searchbox">
                            <ion-icon name="close-circle"></ion-icon>
                        </a>
                    </div>
                </form>
            </div>

            <div id="appCapsule">

                <div class="header-large-title">
                    <h1 class="title">Discover</h1>
                    <h4 class="subtitle">Welcome to Mobilekit</h4>
                </div>

                <div class="section full mt-3 mb-3">


                    <div class="carousel-multiple splide">


                        <div className="section full mt-3 mb-3">
                            <div className="section full mt-3 mb-3">



                                {/* Slider Carousel */}
                                <Splide options={{ perPage: 4, rewind: true, type: "loop", gap: 16, padding: 16, arrows: false, pagination: true }}>
                                    <SplideSlide>
                                        <div className="card">
                                            <img src="assets/img/sample/photo/wide4.jpg" width={40} height={40} className="card-img-top" alt="carousel" />
                                            <div className="card-body pt-2">
                                                <h4 className="mb-0">Your Title</h4>
                                            </div>
                                        </div>
                                    </SplideSlide>

                                </Splide>


                            </div>
                        </div>
                    </div>


                </div>


                <div class="section mt-3 mb-3">
                    <div class="card">
                        <div class="card-body d-flex justify-content-between align-items-end">
                            <div>
                                <h6 class="card-subtitle">Discover</h6>
                                <h5 class="card-title mb-0 d-flex align-items-center justify-content-between">
                                    Dark Mode
                                </h5>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input dark-mode-switch" type="checkbox" id="darkmodecontent" />
                                <label class="form-check-label" for="darkmodecontent"></label>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="section mt-3 mb-3">
                    <div class="card">
                        <img src="assets/img/sample/photo/wide4.jpg" class="card-img-top" alt="image" />
                        <div class="card-body">
                            <h6 class="card-subtitle">Discover</h6>
                            <h5 class="card-title">Components</h5>
                            <p class="card-text">
                                Reusable components designed for the mobile interface and ready to use.
                            </p>
                            <a href="/" class="btn btn-primary">
                                <ion-icon name="cube-outline"></ion-icon>
                                Preview
                            </a>
                        </div>
                    </div>
                </div>

                <div class="section mt-3 mb-3">
                    <div class="card">
                        <img src="assets/img/sample/photo/wide2.jpg" class="card-img-top" alt="image" />
                        <div class="card-body">
                            <h6 class="card-subtitle">Discover</h6>
                            <h5 class="card-title">Pages</h5>
                            <p class="card-text">
                                Mobilekit comes with basic pages you may need and use in your projects easily.
                            </p>
                            <a href="/" class="btn btn-primary">
                                <ion-icon name="layers-outline"></ion-icon>
                                Preview
                            </a>
                        </div>
                    </div>
                </div>



                <div class="appFooter">
                    <img src="assets/img/logo.png" alt="icon" class="footer-logo mb-2" />
                    <div class="footer-title">
                        Copyright © Mobilekit <span class="yearNow"></span>. All Rights Reserved.
                    </div>
                    <div>Mobilekit is PWA ready Mobile UI Kit Template.</div>
                    Great way to start your mobile websites and pwa projects.

                    <div class="mt-2">
                        <a href="/" class="btn btn-icon btn-sm btn-facebook">
                            <ion-icon name="logo-facebook"></ion-icon>
                        </a>
                        <a href="/" class="btn btn-icon btn-sm btn-twitter">
                            <ion-icon name="logo-twitter"></ion-icon>
                        </a>
                        <a href="/" class="btn btn-icon btn-sm btn-linkedin">
                            <ion-icon name="logo-linkedin"></ion-icon>
                        </a>
                        <a href="/" class="btn btn-icon btn-sm btn-instagram">
                            <ion-icon name="logo-instagram"></ion-icon>
                        </a>
                        <a href="/" class="btn btn-icon btn-sm btn-whatsapp">
                            <ion-icon name="logo-whatsapp"></ion-icon>
                        </a>
                        <a href="/" class="btn btn-icon btn-sm btn-secondary goTop">
                            <ion-icon name="arrow-up-outline"></ion-icon>
                        </a>
                    </div>

                </div>

                <div class="appBottomMenu">
                    <a href="/" class="item active">
                        <div class="col">
                            <ion-icon name="home-outline"></ion-icon>
                        </div>
                    </a>
                    <a href="/" class="item">
                        <div class="col">
                            <ion-icon name="cube-outline"></ion-icon>
                        </div>
                    </a>
                    <a href="/" class="item">
                        <div class="col">
                            <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
                            <span class="badge badge-danger">5</span>
                        </div>
                    </a>
                    <a href="/" class="item">
                        <div class="col">
                            <ion-icon name="layers-outline"></ion-icon>
                        </div>
                    </a>
                    <a href="#sidebarPanel" class="item" data-bs-toggle="offcanvas">
                        <div class="col">
                            <ion-icon name="menu-outline"></ion-icon>
                        </div>
                    </a>
                </div>

                <div class="offcanvas offcanvas-start" tabindex="-1" id="sidebarPanel">
                    <div class="offcanvas-body">

                        <div class="profileBox">
                            <div class="image-wrapper">
                                <img src="assets/img/sample/avatar/avatar1.jpg" alt="image" class="imaged rounded" />
                            </div>
                            <div class="in">
                                <strong>Julian Gruber</strong>
                                <div class="text-muted">
                                    <ion-icon name="location"></ion-icon>
                                    California
                                </div>
                            </div>
                            <a href="/" class="close-sidebar-button" data-bs-dismiss="offcanvas">
                                <ion-icon name="close"></ion-icon>
                            </a>
                        </div>


                        <ul class="listview flush transparent no-line image-listview mt-2">
                            <li>
                                <a href="/" class="item">
                                    <div class="icon-box bg-primary">
                                        <ion-icon name="home-outline"></ion-icon>
                                    </div>
                                    <div class="in">
                                        Discover
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="/" class="item">
                                    <div class="icon-box bg-primary">
                                        <ion-icon name="cube-outline"></ion-icon>
                                    </div>
                                    <div class="in">
                                        Components
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="/" class="item">
                                    <div class="icon-box bg-primary">
                                        <ion-icon name="layers-outline"></ion-icon>
                                    </div>
                                    <div class="in">
                                        <div>Pages</div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="/" class="item">
                                    <div class="icon-box bg-primary">
                                        <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
                                    </div>
                                    <div class="in">
                                        <div>Chat</div>
                                        <span class="badge badge-danger">5</span>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <div class="item">
                                    <div class="icon-box bg-primary">
                                        <ion-icon name="moon-outline"></ion-icon>
                                    </div>
                                    <div class="in">
                                        <div>Dark Mode</div>
                                        <div class="form-check form-switch">
                                            <input class="form-check-input dark-mode-switch" type="checkbox" id="darkmodesidebar" />
                                            <label class="form-check-label" for="darkmodesidebar"></label>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>

                        <div class="listview-title mt-2 mb-1">
                            <span>Friends</span>
                        </div>
                        <ul class="listview image-listview flush transparent no-line">
                            <li>
                                <a href="/" class="item">
                                    <img src="assets/img/sample/avatar/avatar7.jpg" alt="image" class="image" />
                                    <div class="in">
                                        <div>Sophie Asveld</div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="/" class="item">
                                    <img src="assets/img/sample/avatar/avatar3.jpg" alt="image" class="image" />
                                    <div class="in">
                                        <div>Sebastian Bennett</div>
                                        <span class="badge badge-danger">6</span>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="/" class="item">
                                    <img src="assets/img/sample/avatar/avatar10.jpg" alt="image" class="image" />
                                    <div class="in">
                                        <div>Beth Murphy</div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="/" class="item">
                                    <img src="assets/img/sample/avatar/avatar2.jpg" alt="image" class="image" />
                                    <div class="in">
                                        <div>Amelia Cabal</div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="/" class="item">
                                    <img src="assets/img/sample/avatar/avatar5.jpg" alt="image" class="image" />
                                    <div class="in">
                                        <div>Henry Doe</div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div class="sidebar-buttons">
                        <a href="/" class="button">
                            <ion-icon name="person-outline"></ion-icon>
                        </a>
                        <a href="/" class="button">
                            <ion-icon name="archive-outline"></ion-icon>
                        </a>
                        <a href="/" class="button">
                            <ion-icon name="settings-outline"></ion-icon>
                        </a>
                        <a href="/" class="button">
                            <ion-icon name="log-out-outline"></ion-icon>
                        </a>
                    </div>

                </div>


            </div>
        </>
    )
}

export default Home