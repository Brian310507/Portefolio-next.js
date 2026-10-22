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
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neon-pink/30 via-neon-cyan/20 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2"></div>
      <div className="z-10">
        <h5 className="text-2xl font-display font-bold uppercase italic text-white my-2">
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
          <p className="text-toxic text-sm mt-2 font-semibold">
            Email envoyé avec succès !
          </p>
        ) : (
          <form className="flex flex-col" onSubmit={handleSubmit}>
            {submitError && (
              <p className="text-neon-pink text-sm mb-4" role="alert">
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
                className="input-hud"
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
                className="input-hud"
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
                className="input-hud"
                placeholder="Décrivez votre projet ou votre proposition..."
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="btn-acid py-3 px-5 w-full"
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
