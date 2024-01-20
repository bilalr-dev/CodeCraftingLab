import { sendContactForm } from '@/lib/api';
import React, { useState } from 'react';

const initValues = { name: "", email: "", message: "" };
const initState = { values: initValues, isLoading: false, isSuccess: false, error: null };

const ContactUs = () => {
  const [state, setState] = useState(initState);
  const { values, isLoading, isSuccess, error } = state;

  const handleChange = ({ target }) => {
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));

    try {
      await sendContactForm(values);
      setState((prev) => ({
        ...initState,  // Reset to initial state, including values
        isSuccess: true,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        isSuccess: false,
        error: error.message,
      }));
    }
  };

  return (
    <div className="contact-us section" id="contact">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 align-self-center">
            <div className="section-heading">
              <h6>Contact Us</h6>
              <h2>Feel free to contact us anytime</h2>
              <p>
                Thank you for choosing our CodeCraftingLab. If you have any questions, please feel free to send us a message.
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="contact-us-content">
              <form id="contact-form" onSubmit={onSubmit}>
                <div className="row">
                  <div className="col-lg-12">
                    <fieldset>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Your Name..."
                        autoComplete="on"
                        value={values.name}
                        onChange={handleChange}
                        required
                      />
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Your E-mail..."
                        value={values.email}
                        onChange={handleChange}
                        required
                      />
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <textarea
                        name="message"
                        id="message"
                        placeholder="Your Message"
                        value={values.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    )}
                    {isSuccess && (
                      <div className="alert alert-success" role="alert">
                        Email sent successfully!
                      </div>
                    )}

                    <fieldset>
                      <button
                        type="submit"
                        id="form-submit"
                        className="orange-button"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        ) : (
                          'Send Message Now'
                        )}
                      </button>
                    </fieldset>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
