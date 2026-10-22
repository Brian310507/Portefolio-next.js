"use client";
import React, { useState } from "react";
import GithubIcon from "../../../public/github-icon.svg";
import LinkedinIcon from "../../../public/linkedin-icon.svg";
import Link from "next/link";
import Image from "next/image";

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitting(true);

    const data = {
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };
    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/send";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSONdata,
      });

      if (response.status === 200) {
        setEmailSubmitted(true);
      } else {
        setSubmitError(
          "L'envoi du message a échoué. Merci de réessayer plus tard."
        );
      }
    } catch (err) {
      console.error("Erreur lors de l'envoi du message:", err);
      setSubmitError("Impossible de joindre le serveur. Merci de réessayer.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative"
    >
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-violet-900 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2"></div>
      <div className="z-10">
        <h5 className="text-xl font-bold text-white my-2">
          Contactez-moi
        </h5>
        <p className="text-[#ADB7BE] mb-4 max-w-md">
          Je suis ouvert aux opportunités de stage, d&apos;alternance ou de projets collaboratifs. 
          N&apos;hésitez pas à me contacter pour discuter de vos idées ou pour en savoir plus sur mon parcours !
        </p>
        <div className="socials flex flex-row gap-2">
          <Link
            href="https://github.com/Brian310507"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Profil GitHub"
          >
            <Image src={GithubIcon} alt="Github Icon" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/alexandre-roques-73b070297/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Profil LinkedIn"
          >
            <Image src={LinkedinIcon} alt="Linkedin Icon" />
          </Link>
        </div>
      </div>
      <div>
        {emailSubmitted ? (
          <p className="text-green-500 text-sm mt-2">
            Email envoyé avec succès !
          </p>
        ) : (
          <form className="flex flex-col" onSubmit={handleSubmit}>
            {submitError && (
              <p className="text-red-400 text-sm mb-4" role="alert">
                {submitError}
              </p>
            )}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="text-white block mb-2 text-sm font-medium"
              >
                Votre email
              </label>
              <input
                name="email"
                type="email"
                id="email"
                required
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="votre@email.com"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="subject"
                className="text-white block text-sm mb-2 font-medium"
              >
                Sujet
              </label>
              <input
                name="subject"
                type="text"
                id="subject"
                required
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="Proposition de stage"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="text-white block text-sm mb-2 font-medium"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                required
                rows={5}
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="Décrivez votre projet ou votre proposition..."
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="bg-gradient-to-r from-blue-400 via-blue-600 to-violet-700 hover:from-blue-500 hover:via-blue-700 hover:to-violet-800 text-white font-medium py-2.5 px-5 rounded-lg w-full transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Envoi en cours..." : "Envoyer le message"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default EmailSection;
