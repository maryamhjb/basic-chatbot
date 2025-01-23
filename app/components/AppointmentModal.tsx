import { useState } from 'react';
import DatePicker, { Value } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { DateObject } from "react-multi-date-picker";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PatientInfo {
  fullName: string;
  nationalId: string;
  phone: string;
}

const timeSlots = [
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00"
];

export default function AppointmentModal({ isOpen, onClose }: AppointmentModalProps) {
  const [selectedDate, setSelectedDate] = useState<Value | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
  const [step, setStep] = useState<'date' | 'time' | 'info'>('date');
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    fullName: '',
    nationalId: '',
    phone: ''
  });

  if (!isOpen) return null;

  const handleDateSelect = (date: DateObject | null) => {
    if (date && 'format' in date) {
      setSelectedDate(date);
      setStep('time');
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep('info');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate && typeof selectedDate === 'object' && 'format' in selectedDate) {
      try {
        const response = await fetch('/api/appointments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName: patientInfo.fullName,
            nationalId: patientInfo.nationalId,
            phone: patientInfo.phone,
            date: selectedDate.format('YYYY/MM/DD'),
            time: selectedTime
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to save appointment');
        }

        alert(
          `نوبت شما با مشخصات زیر ثبت شد:\n\n` +
          `نام و نام خانوادگی: ${patientInfo.fullName}\n` +
          `کد ملی: ${patientInfo.nationalId}\n` +
          `شماره تماس: ${patientInfo.phone}\n` +
          `تاریخ: ${selectedDate.format('DD MMMM YYYY')}\n` +
          `ساعت: ${selectedTime}`
        );
        
        onClose();
        setStep('date');
        setSelectedDate(undefined);
        setSelectedTime(undefined);
        setPatientInfo({ fullName: '', nationalId: '', phone: '' });
      } catch (error) {
        alert('متاسفانه مشکلی در ثبت نوبت پیش آمده. لطفا دوباره تلاش کنید.');
        console.error('Error saving appointment:', error);
      }
    }
  };

  const inputClassName = "w-full p-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            {step === 'date' ? 'انتخاب تاریخ' : 
             step === 'time' ? 'انتخاب ساعت' : 
             'اطلاعات شخصی'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {step === 'date' ? (
          <div className="flex justify-center">
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              value={selectedDate}
              onChange={handleDateSelect}
              minDate={new Date()}
              format="YYYY/MM/DD"
              className="custom-calendar"
              calendarPosition="bottom-right"
              inputClass="w-full p-3 text-lg text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
          </div>
        ) : step === 'time' ? (
          <div className="grid grid-cols-3 gap-3">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => handleTimeSelect(time)}
                className="p-3 text-sm rounded-lg hover:bg-rose-50 border border-rose-200 text-rose-600 transition-colors"
              >
                {time}
              </button>
            ))}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                نام و نام خانوادگی
              </label>
              <input
                type="text"
                required
                value={patientInfo.fullName}
                onChange={(e) => setPatientInfo(prev => ({ ...prev, fullName: e.target.value }))}
                className={inputClassName}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                کد ملی
              </label>
              <input
                type="text"
                required
                pattern="[0-9]{10}"
                value={patientInfo.nationalId}
                onChange={(e) => setPatientInfo(prev => ({ ...prev, nationalId: e.target.value }))}
                className={inputClassName}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                شماره تماس
              </label>
              <input
                type="tel"
                required
                pattern="[0-9]{11}"
                value={patientInfo.phone}
                onChange={(e) => setPatientInfo(prev => ({ ...prev, phone: e.target.value }))}
                className={inputClassName}
              />
            </div>
            <div className="text-gray-800 font-bold mt-4 flex items-center gap-2">
              <span>زمان انتخاب شده:</span>
              {selectedDate && typeof selectedDate === 'object' && 'format' in selectedDate && (
                <div className="bg-rose-50 px-4 py-2 rounded-lg">
                  <span className="text-rose-700 font-extrabold">
                    {selectedDate.format('DD MMMM YYYY')}
                  </span>
                  <span className="text-rose-600 mx-2">-</span>
                  <span className="text-rose-700 font-bold">
                    ساعت {selectedTime}
                  </span>
                </div>
              )}
            </div>
            <div className="flex gap-2 mt-6">
              <button
                type="submit"
                className="flex-1 bg-rose-600 text-white py-2 rounded-lg hover:bg-rose-700 transition-colors"
              >
                ثبت نوبت
              </button>
              <button
                type="button"
                onClick={() => setStep('time')}
                className="flex-1 border border-rose-600 text-rose-600 py-2 rounded-lg hover:bg-rose-50 transition-colors"
              >
                بازگشت
              </button>
            </div>
          </form>
        )}

        {step === 'time' && (
          <button
            onClick={() => setStep('date')}
            className="mt-4 text-rose-600 hover:text-rose-700"
          >
            بازگشت به انتخاب تاریخ
          </button>
        )}
      </div>
    </div>
  );
} 