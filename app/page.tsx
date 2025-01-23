'use client';
import { useState } from 'react';
import Image from "next/image";
import AppointmentModal from './components/AppointmentModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-lg shadow-sm z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-gray-800">دکتر مریم حاجی بابایی</div>
          <div className="flex gap-6">
            <button className="text-gray-600 hover:text-gray-800 transition-colors">تماس</button>
            <button className="text-gray-600 hover:text-gray-800 transition-colors">خدمات</button>
            <button className="text-gray-600 hover:text-gray-800 transition-colors">درباره ما</button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-right space-y-8">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 leading-tight">
              به وبسایت
              <span className="block text-rose-600">دکتر مریم حاجی بابایی</span>
              خوش آمدید
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              من دستیار هوش مصنوعی‌شان هستم. چطور می‌توانم کمکتان کنم؟
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 bg-rose-600 text-white rounded-full hover:bg-rose-700 transition-colors shadow-lg hover:shadow-xl"
              >
                نوبت‌دهی آنلاین
              </button>
              <button className="px-8 py-4 bg-white text-rose-600 rounded-full hover:bg-gray-50 transition-colors border-2 border-rose-600 shadow-lg hover:shadow-xl">
                مشاوره آنلاین
              </button>
            </div>
          </div>

          {/* Image Container */}
          <div className="relative flex-1">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-200 to-pink-200 rounded-full blur-3xl opacity-30"></div>
            <Image
              src="/avatar.jpg"
              alt="دکتر مریم حاجی بابایی"
              width={500}
              height={500}
              priority
              className="relative rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">تجربه و تخصص</h3>
            <p className="text-gray-600">سال‌ها تجربه در ارائه خدمات پزشکی با بالاترین استانداردها</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">مراقبت ویژه</h3>
            <p className="text-gray-600">توجه خاص به نیازهای هر بیمار با رویکردی شخصی‌سازی شده</p>
          </div>

          <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">تجهیزات مدرن</h3>
            <p className="text-gray-600">استفاده از پیشرفته‌ترین تجهیزات پزشکی روز دنیا</p>
          </div>
        </div>
      </main>

      <AppointmentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
