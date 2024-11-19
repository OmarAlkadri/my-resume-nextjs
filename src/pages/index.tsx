import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MyStory } from '../components/my_story';
import { Skills } from '../components/skills';
import { CurriculumVitae } from '../components/curriculum_vitae';
import { References } from '../components/references';
import { ContactMy } from '../components/contact_my';
import { Footer } from '../components/footer';
import { NavBar } from '../components/navBar';
import { useTranslation } from 'react-i18next';
import { Header } from '../components/header';
import { useEffect, useState } from 'react';

export default function Home() {
  const { i18n } = useTranslation();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    const savedMode = localStorage.getItem('mode') === 'true';

    document.body.classList.toggle("dark", savedMode);
    i18n?.changeLanguage(savedLanguage);
    setTimeout(() => {
      setLoader(true);
    }, 100);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("dir", i18n.language === 'ar' ? "rtl" : "ltr");
    setLoader(false);
    setTimeout(() => {
      setLoader(true);
    }, 100);
  }, [i18n.language]);

  if (!loader) return '';

  return (
    <div className='bg-white dark:bg-black'>
      <nav className="block w-full px-4 py-2 mx-auto bg-white bg-opacity-60 sticky top-0 shadow lg:px-8 lg:py-3 backdrop-blur-lg backdrop-saturate-150 z-[9999]">
        <NavBar />
      </nav>
      <header>
        <Header />
      </header>
      <main className='w-full flex items-center justify-center relative xl:mr-0 lg:mr-5 mr-0  py-24'>
        <div className='max-w-7xl flex flex-col gap-y-20'>
          <section id='my_story' className="w-full sm:px-5 px-4 md:px-5 lg:px-5 mx-auto">
            <MyStory />
          </section>
          <section id='skills'>
            <Skills />
          </section>
          <section id='curriculum_vitae' className="">
            <CurriculumVitae />
          </section>
          <section id='references' className="">
            <References />
          </section>
          <section id='contact_my' className="contact_my">
            <ContactMy />
          </section>
        </div>
      </main>
      <footer className="bg-gray-200 dark:bg-gray-900">
        <Footer />
      </footer>
      <ToastContainer />
    </div>
  );
}
