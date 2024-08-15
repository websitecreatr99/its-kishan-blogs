'use client'
import React from "react";
// import { useForm } from "react-hook-form";
import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });
  const [notification, setNotification] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log("formData",formData);
      const response = await fetch('https://its-kishan-blogs.vercel.app/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setNotification("Thank you for contacting us!");
        setFormData({
          name: "",
          email: "",
          number: "",
          message: "",
        });
      } else {
        setNotification("Something went wrong, please try again later.");
      }
    } catch (error) {
      setNotification("Error submitting the form. Please try again.");
    }
  };


  return (
    <form onSubmit={handleSubmit}
      className="mt-12 text-base xs:text-lg sm:text-xl font-medium leading-relaxed font-in">
      {notification && <div className="mb-4 text-green-600">{notification}</div>}
      Hello! My name is{" "}
      <input
        type="text"
        name="name"
        id="name"
        value={formData.name}
        onChange={handleChange}
        required
        placeholder="your name"
        // {...register("name", { required: true, maxLength: 80 })}
        className="outline-none border-0 p-0 mx-2 focus:ring-0 placeholder:text-center placeholder:text-lg border-b border-gray 
        focus:border-gray bg-transparent"
      />
      and I want to discuss a potential project. You can email me at
      <input 
      type="email" 
      name="email"
      id="email"
      value={formData.email}
      onChange={handleChange}
      required
      placeholder="your@email" 
      // {...register("email", {})}  
      className="outline-none border-0 p-0 mx-2 focus:ring-0 placeholder:text-center placeholder:text-lg border-b border-gray 
        focus:border-gray bg-transparent"/>
      or reach out to me on
      <input
        type="tel"
        name="number"
        id="number"
        value={formData.number}
        onChange={handleChange}
        required
        placeholder="your phone"
        // {...register("phone number", {})}
        className="outline-none border-0 p-0 mx-2 focus:ring-0 placeholder:text-center placeholder:text-lg border-b border-gray 
        focus:border-gray bg-transparent"
      />
      Here are some details about my project: <br />
      <textarea 
      name="message"
      id="message"
      value={formData.message}
      onChange={handleChange}
      required
      // {...register("project details", {})} 
      placeholder="My project is about..."
      rows={3}
      className="w-full outline-none border-0 p-0 mx-0 focus:ring-0  placeholder:text-lg border-b border-gray 
        focus:border-gray bg-transparent" />

<input type="submit" value="send request" className="mt-8 font-medium inline-block capitalize text-lg sm:text-xl py-2 sm:py-3 px-6 sm:px-8 border-2 border-solid border-dark dark:border-light rounded cursor-pointer" />
          {/* <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
  <button
    onClick={async function handleOnClick() {
      try {
        const response = await fetch('/api/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userFirstName: "Jane",
            email : "kishanvir4321@gmail.com",
            number : "8511705342",
            message : "Testing email"
          })
        });

        if (!response.ok) {
          // If the response status is not in the 200-299 range, throw an error
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('results', data);
      } catch (error) {
        console.error('Error:', error);
      }
    }}
    className="mt-8 font-medium inline-block capitalize text-lg sm:text-xl py-2 sm:py-3 px-6 sm:px-8 border-2 border-solid border-dark dark:border-light rounded cursor-pointer"
  >
    Send Request
  </button>
</div> */}
      {/* <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <button
          onClick={async function handleOnClick() {
            const results = await fetch('/api/login', {
              method: 'POST',
              body: JSON.stringify({
                userFirstName: "Jane",
                loginDate: new Date("2024-07-29T10:00:00Z"),
                loginDevice: "iPhone 14",
                loginLocation: "San Francisco, CA, USA",
                loginIp: "192.168.1.1"
              })
            });
            console.log('results', results)
          }}
        >
           <input type="submit" value="send request" className="mt-8 font-medium inline-block capitalize text-lg sm:text-xl py-2 sm:py-3 px-6 sm:px-8 border-2 border-solid border-dark dark:border-light rounded cursor-pointer" />
        </button>
      </div> */}

    </form>
  );
}

export default ContactForm;
