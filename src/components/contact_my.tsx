import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import emailjs from 'emailjs-com';
import { useTranslation } from 'react-i18next';

export const ContactMy = () => {
    const [t] = useTranslation();

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors }
    } = useForm();

    const notify = () => toast.success(t('toast.success'), {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const validateEmailWithZeroBounce = async (email: string) => {
        try {
            const response = await fetch(
                `https://api.zerobounce.net/v2/validate?api_key=769a6efce3554afcb82c88c83b43c60a&email=${encodeURIComponent(email)}`,
                {
                    method: 'GET',
                }
            );

            if (!response.ok) {
                throw new Error('Email verification failed');
            }

            const data = await response.json();

            if (data.status !== 'valid') {
                return false;
            }
        } catch (err) {
            console.error('Error:', err);
            return false;
        }
        return true;
    };

    const onSubmit: any = async (data: { email: string; name: any; phone: any; message: any; }) => {
        const isEmailValid = await validateEmailWithZeroBounce(data.email);
        if (!isEmailValid) {
            setError("email", { type: "manual", message: t("errors.invalidEmail") });
            return;
        }

        try {
            await emailjs.send(
                'service_au36n7r',
                'template_3ydh4qk',
                {
                    to_name: 'Omar Alkadri',
                    name: data.name,
                    from_name: data.name,
                    email: data.email,
                    reply_to: data.email,
                    phone: data.phone,
                    message: data.message,
                },
                '0Duit5ctOLrKA_TL0'
            );

            clearErrors();
            notify();
        } catch (err) {
            console.error('Error:', err);
            setError("general", { type: "manual", message: t("errors.sendEmail") });
        }
    };

    return (
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 grid-cols-1">
                <div className="lg:mb-0 mb-10">
                    <div className="group w-full h-full">
                        <div className="relative h-full">
                            <img
                                src="https://pagedone.io/asset/uploads/1696488602.png"
                                alt={t("contactImage.alt")}
                                className="w-full h-full lg:rounded-l-2xl rounded-2xl bg-blend-multiply bg-indigo-700 object-cover"
                            />
                            <div className='absolute flex flex-col items-start justify-between top-11 left-11 h-14'>
                                <h1 className="font-manrope text-white text-4xl font-bold leading-10 ">{t("contactUs")}</h1>
                                <hr className="relative top-2 w-28 h-1 bg-black border-0 rounded dark:bg-gray-700" />
                            </div>
                            <div className="absolute bottom-0 w-full lg:p-11 p-5">
                                <div className="bg-white rounded-lg p-6 block">
                                    <a href="javascript:;" className="flex items-center mb-6">
                                        <span className="icon-[healthicons--phone-outline] w-9 h-9 text-indigo-600"></span>
                                        <h5 className="text-black text-base font-normal leading-6 ml-5">{t("contactInfo.phone")}</h5>
                                    </a>
                                    <a href="javascript:;" className="flex items-center mb-6">
                                        <span className="icon-[proicons--mail] w-9 h-9 text-indigo-600"></span>
                                        <h5 className="text-black text-base font-normal leading-6 ml-5">{t("contactInfo.email")}</h5>
                                    </a>
                                    <a href="javascript:;" role="button" className="flex items-center" aria-label={t("contactInfo.addressLabel")}>
                                        <span className="icon-[ph--map-pin] w-9 h-9 text-indigo-600"></span>
                                        <h5 className="text-black text-base font-normal leading-6 ml-5">
                                            {t("contactInfo.address")}
                                        </h5>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-50 p-5 lg:p-11 lg:rounded-r-2xl rounded-2xl">
                    <h2 className="text-indigo-600 font-manrope text-4xl font-semibold leading-10 mb-11">{t("sendMessage")}</h2>
                    <div className="mb-4">
                        <input
                            {...register("name", { required: t("errors.nameRequired") })}
                            type="text"
                            className={`w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 rounded-full border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:outline-none pl-4 hover:border-indigo-400`}
                            placeholder={t("form.name")}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message as any}</p>}
                    </div>
                    <div className="mb-4">
                        <input
                            {...register("email", { required: t("errors.emailRequired") })}
                            type="text"
                            className={`w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 rounded-full border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:outline-none pl-4 hover:border-indigo-400`}
                            placeholder={t("form.email")}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message as any}</p>}
                    </div>
                    <div className="mb-4">
                        <input
                            {...register("phone", { required: t("errors.phoneRequired") })}
                            type="text"
                            className={`w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 rounded-full border ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:outline-none pl-4 hover:border-indigo-400`}
                            placeholder={t("form.phone")}
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message as any}</p>}
                    </div>
                    <div className="mb-4">
                        <textarea
                            {...register("message", { required: t("errors.messageRequired") })}
                            rows={4}
                            className={`w-full h-32 p-2.5 text-gray-600 placeholder-gray-400 bg-transparent text-lg shadow-sm font-normal leading-7 rounded-xl border ${errors.message ? 'border-red-500' : 'border-gray-200'} focus:outline-none pl-4 hover:border-indigo-400`}
                            placeholder={t("form.message")}
                        ></textarea>
                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message as any}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full h-12 text-white text-base font-semibold leading-6 rounded-full transition-all duration-700 hover:bg-indigo-800 bg-indigo-600 shadow-sm"
                    >
                        {t("form.send")}
                    </button>
                </form>
            </div>
        </div>
    )
}
