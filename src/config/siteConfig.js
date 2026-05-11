export const siteConfig = {
  tenantSlug: import.meta.env.VITE_TENANT_SLUG || "legends",
  name: import.meta.env.VITE_SITE_NAME || "Legends Lounge & Events Center",
  phone: import.meta.env.VITE_PUBLIC_PHONE || "(661) 218-9789",
  phoneHref: "tel:+16612189789",
  address: import.meta.env.VITE_PUBLIC_ADDRESS || "7900 Downing Avenue, Bakersfield, CA 93308",
  mapHref: "https://www.google.com/maps/search/?api=1&query=7900%20Downing%20Avenue%20Bakersfield%20CA%2093308",
  facebookHref: "https://www.facebook.com/search/top?q=legends%20lounge%20%26%20events%20center",
  instagramHref: "https://www.instagram.com/explore/search/keyword/?q=legends%20lounge%20bakersfield",
  logo: "/images/logo/legends-logo.jpg",
};

export const galleryImages = [
  {
    src: "/images/gallery/events-center.jpg",
    alt: "Legends event center exterior and venue branding",
  },
  {
    src: "/images/gallery/line-dancing.jpg",
    alt: "Line dancing event at Legends",
  },
  {
    src: "/images/gallery/kentucky-derby-watch.jpg",
    alt: "Kentucky Derby watch event at Legends",
  },
  {
    src: "/images/gallery/hockey-watch.jpg",
    alt: "Sports watch event at Legends",
  },
  {
    src: "/images/gallery/brunch-menu.jpg",
    alt: "Legends brunch menu",
  },
];
