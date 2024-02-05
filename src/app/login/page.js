"use client"
import InputComponent from '@/components/FormElements/InputComponent';
import { loginNewUser } from '@/services/login';
import { loginFormControls } from '@/utils';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const router = useRouter();

  const isFormValid = () =>{
        return formData
        && formData.email && formData.email.trim() !== '' 
        && formData.password && formData.password.trim() !== ''  ? true : false
  }

  const handleRegSubmit = async () => {
    const data = await loginNewUser(formData);
    console.log(data);
  };

  return (
    <div className="bg-white relative">
      <div className="flex flex-col items-center justify-between py-0 px-10 mt-8 mr-auto xl:px-5 lg:flex-row">
        <div className="flex flex-col justify-center items-center w-full px-10 lg:flex-row">
          <div className="w-full mt-10 mx-0 mb-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start p-10 bg-white shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-4xl text-center font-serif font-medium">
                Login
              </p>
              <div className="w-full mt-6 mx-0 mb-0 relative space-y-8">
                {loginFormControls.map((controlItem) =>
                  controlItem.componentType === "input" ? (
                    <InputComponent
                      type={controlItem.type}
                      placeholder={controlItem.placeholder}
                      label={controlItem.label}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          [controlItem.id]: e.target.value,
                        });
                      }}
                      value={formData[controlItem.id]}
                    />
                  ) : null
                )}
                <div className="flex flex-col gap-1">
                  <button
                    className="disabled:opacity-45 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg
                  text-white font-medium transition-all duration-200 ease-in-out focus:shadow uppercase tracking-wide"
                    disabled={!isFormValid()}
                    onClick={handleRegSubmit}
                  >
                    Login
                  </button>
                  <p>
                    Don't have an accout ?{" "}
                    <span
                      className="hover:underline cursor-pointer"
                      onClick={() => router.push("/register")}
                    >
                      Register
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

