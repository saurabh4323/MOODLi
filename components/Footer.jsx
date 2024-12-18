import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaYoutube,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  // const Blog = () => {
  //   window.location.href = "/blog";
  // };

  const socialLinks = [
    {
      icon: FaFacebook,
      href: "https://www.facebook.com/",
      label: "Facebook",
    },
    {
      icon: FaInstagram,
      href: "https://instagram.com/moodli.mine",
      label: "Instagram",
    },
  ];

  const footerSections = [
    {
      title: "Services",
      links: [
        { href: "/home", label: "Mood Driven" },
        { href: "/dashboard", label: "Mood with emoji" },
        { href: "/track", label: "Mood Track" },
        { href: "/community", label: "Community" },
        { href: "/Profile", label: "Profile" },
        { href: "/create", label: "Custom" },
      ],
    },
    { title: "Company", links: [{ href: "/", label: "About" }] },
    {
      title: "Helpful Links",
      links: [
        { href: "/contact", label: "Contact" },
        // Attach the onClick event to the "Blog" link
        { href: "/blog", label: "Blog" },
      ],
    },
    {
      title: "Legal",
      links: [
        {
          href: "/pc.pdf",
          label: "Privacy Policy",
        },
        { href: "/tc.pdf", label: "Terms and conditions" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-screen-xl px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="text-center lg:text-left">
            <div className="flex justify-center lg:justify-start">
              <Image
                src="/l.png"
                width={160}
                height={160}
                className="w-32 sm:w-40"
                alt="typefinance logo"
              />
            </div>
            <p className="mt-4 max-w-xs mx-auto lg:mx-0 text-sm text-gray-500">
              Get started with your Moodli right away. Track your mood with
              emoji chat with people analyse your mood and join the community.
              Get started now!
            </p>
            <ul className="mt-4 flex justify-center lg:justify-start gap-4">
              {socialLinks.map((social, index) => (
                <li key={index}>
                  <Link
                    href={social.href}
                    rel="noreferrer"
                    target="_blank"
                    className="transition hover:opacity-75"
                  >
                    <span className="sr-only">{social.label}</span>
                    <social.icon className="w-5 h-5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {footerSections.map((section, index) => (
                <div key={index} className="text-center sm:text-left">
                  <p className="font-medium text-base">{section.title}</p>
                  <nav className="mt-4 flex flex-col space-y-2">
                    {section.links.map((link, linkIndex) =>
                      link.onClick ? (
                        <button
                          key={linkIndex}
                          onClick={link.onClick}
                          className="text-sm text-gray-300 transition hover:opacity-75 text-left"
                        >
                          {link.label}
                        </button>
                      ) : (
                        <Link
                          key={linkIndex}
                          href={link.href}
                          className="text-sm text-gray-300 transition hover:opacity-75"
                        >
                          {link.label}
                        </Link>
                      )
                    )}
                  </nav>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-8 text-xs text-gray-500 text-center">
          All Rights Reserved. Moodli.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
