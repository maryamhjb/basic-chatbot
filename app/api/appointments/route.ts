import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import XLSX from 'xlsx-js-style';

const dataFilePath = path.join(process.cwd(), 'data', 'appointments.json');
const excelFilePath = path.join(process.cwd(), 'data', 'appointments.xlsx');

interface Appointment {
  fullName: string;
  nationalId: string;
  phone: string;
  date: string;
  time: string;
  createdAt: string;
}

async function updateExcelFile(appointments: Appointment[]) {
  const wb = XLSX.utils.book_new();
  
  const excelData = appointments.map(app => ({
    'نام و نام خانوادگی': app.fullName,
    'کد ملی': app.nationalId,
    'شماره تماس': app.phone,
    'تاریخ': app.date,
    'ساعت': app.time,
    'زمان ثبت': new Date(app.createdAt).toLocaleString('fa-IR')
  }));

  const ws = XLSX.utils.json_to_sheet(excelData, {
    header: ['نام و نام خانوادگی', 'کد ملی', 'شماره تماس', 'تاریخ', 'ساعت', 'زمان ثبت']
  });

  // Add styles
  const headerStyle = {
    font: { bold: true, color: { rgb: "FFFFFF" } },
    fill: { fgColor: { rgb: "E11D48" } },
    alignment: { horizontal: "center", vertical: "center", wrapText: true }
  };

  const cellStyle = {
    alignment: { horizontal: "center", vertical: "center" }
  };

  // Apply styles to header
  const range = XLSX.utils.decode_range(ws['!ref'] || 'A1');
  for (let C = range.s.c; C <= range.e.c; ++C) {
    const address = XLSX.utils.encode_cell({ r: 0, c: C });
    if (!ws[address]) continue;
    ws[address].s = headerStyle;
  }

  // Apply styles to cells and set column widths
  ws['!cols'] = [
    { wch: 25 }, // نام و نام خانوادگی
    { wch: 15 }, // کد ملی
    { wch: 15 }, // شماره تماس
    { wch: 12 }, // تاریخ
    { wch: 8 },  // ساعت
    { wch: 20 }  // زمان ثبت
  ];

  // Apply style to all cells
  for (let R = 1; R <= range.e.r; ++R) {
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const address = XLSX.utils.encode_cell({ r: R, c: C });
      if (!ws[address]) continue;
      ws[address].s = cellStyle;
    }
  }

  XLSX.utils.book_append_sheet(wb, ws, 'نوبت‌ها');

  // Create data directory if it doesn't exist
  await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true });
  
  // Write to file
  XLSX.writeFile(wb, excelFilePath);
}

export async function POST(request: Request) {
  try {
    const appointment = await request.json();
    
    let appointments: Appointment[] = [];
    try {
      const fileContent = await fs.readFile(dataFilePath, 'utf-8');
      appointments = JSON.parse(fileContent);
    } catch (error) {
      // File doesn't exist yet, start with empty array
    }
    
    const newAppointment: Appointment = {
      ...appointment,
      createdAt: new Date().toISOString()
    };
    
    appointments.push(newAppointment);
    
    await fs.writeFile(dataFilePath, JSON.stringify(appointments, null, 2));
    await updateExcelFile(appointments);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving appointment:', error);
    return NextResponse.json(
      { error: 'Failed to save appointment' },
      { status: 500 }
    );
  }
} 