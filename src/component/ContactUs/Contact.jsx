import { useState } from "react";
import { Helmet } from "react-helmet-async";
import emailjs from "@emailjs/browser";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaFan,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const Contact = () => {
  const [sentEmail, setSentEmail] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {
    setSentEmail(true);
    emailjs
      .sendForm(
        import.meta.env.VITE_email_service_id,
        import.meta.env.VITE_email_Tamplates_id,
        e.target,
        {
          publicKey: import.meta.env.VITE_email_public_key,
        }
      )
      .then(
        (res) => {
          console.log(res);
          if (res.status === 200) {
            setSentEmail(false);
            toast.success("Your Subscription Is Complete");
            reset();
          }
        },
        (error) => {
          console.log("FAILED...", error);
          setSentEmail(false);
        }
      );
  };

  return (
    <div className="py-4">
      <Helmet>
        <title>SmartLearning | Contact info</title>
      </Helmet>
      <div className="container mx-auto px-6">
        <h2 className="text-white text-4xl text-center py-4 font-bold">
          Contact Us
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Details */}
          <div className="flex flex-col gap-6">
            <h3 className="text-2xl font-semibold text-white">Get in Touch</h3>
            <p className="text-white">
              Feel free to reach out to us for any inquiries, feedback, or
              assistance.
            </p>
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-[#57A9AE] text-2xl" />
              <p className="text-white">123 Main Street, Dhaka, Bangladesh</p>
            </div>
            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-[#57A9AE]  text-2xl" />
              <p className="text-white">+880 123 456 7890</p>
            </div>
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-[#57A9AE]  text-2xl" />
              <p className="text-white">mhneloy708@gmail.com</p>
            </div>
            {/* Social Icons */}
            <div className="flex gap-4 mt-4">
              <a
                href="#"
                className="text-white bg-[#57A9AE]  p-3 rounded-full hover:bg-blue-700"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="text-white bg-[#57A9AE] p-3 rounded-full hover:bg-blue-700"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-white bg-[#57A9AE] p-3 rounded-full hover:bg-blue-700"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-6">
              Mail Us Your Message
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Your Name</span>
                </label>
                <input
                  type="text"
                  name="to_name"
                  placeholder="Enter your name"
                  className="input input-bordered w-full"
                  {...register("to_name", { required: "Name is required" })}
                />
                {errors.to_name && (
                  <p className="text-red-500">{errors.to_name.message}</p>
                )}
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Your Email</span>
                </label>
                <input
                  type="email"
                  name="from_email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                  {...register("from_email", { required: "Email is required" })}
                />
                {errors.from_email && (
                  <p className="text-red-500">{errors.from_email.message}</p>
                )}
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Your Message</span>
                </label>
                <textarea
                  name="message"
                  placeholder="Enter your message"
                  className="textarea textarea-bordered w-full"
                  {...register("message", { required: "Message is required" })}
                ></textarea>
                {errors.message && (
                  <p className="text-red-500">{errors.message.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-primary w-full flex justify-center"
              >
                {sentEmail ? (
                  <FaFan className="animate-spin" />
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
