// components
import Header from "../components/Header";
import About from "../components/About";

export default function Success() {
  return (
    <div className="bg-background grid gap-y-16 overflow-hidden">
      <Header parent="termsofuse" />
      <div className={`container mx-auto px-2 pt-4 pb-12 text-primary `}>
        <h1
          className={`w-full my-2 text-5xl font-bold leading-tight text-center text-primary`}
        >
          🎉 Woohoo! 🎉
        </h1>
        <p className="mt-4 max-w-2xl text-2xl text-gray-900 lg:mx-auto text-center">
          You've successfully subscribed! You should have received an email from
          jb@ismycustomermoving.com to complete the sign up process.
        </p>
        <br />
        <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
          We also highly suggest signing up for a on-boarding meeting with one
          of our team members!
        </p>
      </div>
      <div className="flex flex-row justify-center items-center">
        <iframe
          src="https://letsmeet.io/jonathanbrewster/imcm-on-boarding-call"
          style={{ minHeight: "700px", minWidth: "100%", width: "100%" }}
          name="booking"
          scrolling="no"
          frameBorder="0"
          width="100%"
          height="100%"
          referrerPolicy="unsafe-url"
          allowFullScreen
        />
      </div>
      <About />
    </div>
  );
}
