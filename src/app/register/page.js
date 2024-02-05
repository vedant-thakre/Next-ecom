"use client"
import InputComponent from '@/components/FormElements/InputComponent';
import SelectComponent from '@/components/FormElements/SelectComponent';
import ComponentLoader from '@/components/Loader/ComponentLoader';
import Notification from '@/components/Notification';
import { GlobalContext } from '@/context';
import { registerNewUser } from '@/services/register';
import { registrationFormControls } from '@/utils';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';


const initialState = {
  name: '',
  email: '',
  password: '',
  role: 'customer'
}

const Register = () => {
    const [formData, setFormData] = useState(initialState);
    const [isRegistered, setIsRegistered] = useState(false);
    const { pageLoader, setpageLoader, isAuthUser } = useContext(GlobalContext);
    const router = useRouter();

    const isFormValid = () =>{
        return formData && formData.name && formData.name.trim() !== '' 
        && formData.email && formData.email.trim() !== '' 
        && formData.password && formData.password.trim() !== ''  ? true : false
    }

    const handleRegSubmit = async() => {
        setpageLoader(true);
        const data  = await registerNewUser(formData);

        if(data.success){
          toast.success(data.message);
          setpageLoader(false);
          setIsRegistered(true);
          setFormData(initialState);
        }else{
          toast.error(data.message, );
          setpageLoader(false);
          setFormData(initialState);
        }
    }

    useEffect(() => {
      if (isAuthUser) router.push("/");
    }, [isAuthUser]);

    return (
      <div className="bg-white relative">
        <div className="flex flex-col items-center justify-between py-0 px-10 mt-8 mr-auto xl:px-5 lg:flex-row">
          <div className="flex flex-col justify-center items-center w-full px-10 lg:flex-row">
            <div className="w-full mt-10 mx-0 mb-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
              <div className="flex flex-col items-center justify-start p-10 bg-white shadow-2xl rounded-xl relative z-10">
                <p className="w-full text-4xl font-serif text-center font-medium">
                  {isRegistered ? "Registration Successfull !" : "Sign up "}
                </p>
                {isRegistered ? (
                  <button
                    className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg
                 text-white font-medium transition-all duration-200 ease-in-out focus:shadow uppercase tracking-wide"
                    onClick={() => router.push("/login")}
                  >
                    Login
                  </button>
                ) : (
                  <div className="w-full mt-6 mx-0 mb-0 relative space-y-8">
                    {registrationFormControls.map((controlItem) =>
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
                      ) : controlItem.componentType === "select" ? (
                        <SelectComponent
                          options={controlItem.options}
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
                        {pageLoader ? (
                          <ComponentLoader
                            loading={pageLoader}
                            color={"#ffffff"}
                          />
                        ) : (
                          "Register"
                        )}
                      </button>
                      <p>
                        Already have an accout ?{" "}
                        <span
                          className="hover:underline cursor-pointer"
                          onClick={() => router.push("/login")}
                        >
                          Login
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Notification />
      </div>
    );
}

export default Register;